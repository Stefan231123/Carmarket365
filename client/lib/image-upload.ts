/**
 * Direct-to-S3 image upload for CarMarket365.
 *
 * Flow: the server issues a short-lived presigned PUT URL to authenticated
 * users only, then the browser uploads straight to S3. Image bytes never pass
 * through our backend, and anonymous callers cannot write to the bucket.
 */

import { applyWatermark } from './watermark';

export interface ImageUploadResult {
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  fileSize: number;
  originalFileName: string;
}

interface PresignedUpload {
  uploadUrl: string;
  key: string;
  publicUrl: string;
}

const THUMBNAIL_MAX_WIDTH = 400;

function getApiBaseUrl(): string {
  const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
  if (graphqlEndpoint) return graphqlEndpoint.replace(/\/graphql\/?$/, '');
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://carmarket365-production.up.railway.app';
  }
  return 'http://localhost:3002';
}

/**
 * Auth headers for calls to our own API.
 *
 * The frontend and backend are on different sites, so the httpOnly auth cookie
 * is third-party and gets blocked by Safari's tracking prevention and Chrome's
 * third-party cookie restrictions. We therefore also send the JWT as a Bearer
 * token — the same belt-and-braces approach shared/api-client.ts uses. Sending
 * only the cookie makes uploads fail with 401 for a large share of users.
 */
function buildAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    // 'cm365_token' is what api-client persists on login; 'authToken' is the
    // legacy key still written by secureTokenManager.
    const token = localStorage.getItem('cm365_token') || localStorage.getItem('authToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  } catch {
    // localStorage unavailable (private mode) — fall back to the cookie alone.
  }
  return headers;
}

async function getPresignedUpload(fileName: string, contentType: string): Promise<PresignedUpload> {
  const response = await fetch(`${getApiBaseUrl()}/api/uploads/presign`, {
    method: 'POST',
    credentials: 'include', // send httpOnly auth cookie when the browser allows it
    headers: buildAuthHeaders(),
    body: JSON.stringify({ fileName, contentType }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('You must be logged in to upload images.');
    }
    throw new Error('Failed to prepare image upload.');
  }

  return response.json();
}

/** Upload a blob to S3 using a presigned PUT URL. */
async function putToS3(uploadUrl: string, blob: Blob, contentType: string): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: blob,
    headers: { 'Content-Type': contentType },
  });
  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }
}

/** Read pixel dimensions of an image blob. */
function readDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      const dims = { width: img.naturalWidth, height: img.naturalHeight };
      URL.revokeObjectURL(objectUrl);
      resolve(dims);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read image dimensions'));
    };
    img.src = objectUrl;
  });
}

/**
 * Produce a downscaled JPEG thumbnail. S3 has no on-the-fly transformations
 * (unlike Cloudinary), so list views would otherwise download full-size images.
 */
function makeThumbnail(blob: Blob, maxWidth = THUMBNAIL_MAX_WIDTH): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      if (img.naturalWidth <= maxWidth) {
        resolve(null); // already small enough — reuse the main image
        return;
      }
      const scale = maxWidth / img.naturalWidth;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((out) => resolve(out), 'image/jpeg', 0.8);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null); // non-fatal — fall back to the main image
    };

    img.src = objectUrl;
  });
}

export async function uploadImage(file: File): Promise<ImageUploadResult> {
  // Bake the watermark into the pixels before upload, so any copy scraped
  // straight from the CDN still carries the mark.
  const watermarked = await applyWatermark(file);
  const contentType = watermarked.type || 'image/jpeg';

  const [{ uploadUrl, publicUrl }, dimensions] = await Promise.all([
    getPresignedUpload(watermarked.name || file.name, contentType),
    readDimensions(watermarked),
  ]);

  await putToS3(uploadUrl, watermarked, contentType);

  // Upload a thumbnail alongside it when the image is large enough to warrant one.
  let thumbnailUrl = publicUrl;
  try {
    const thumb = await makeThumbnail(watermarked);
    if (thumb) {
      const thumbTarget = await getPresignedUpload(`thumb-${file.name}`, 'image/jpeg');
      await putToS3(thumbTarget.uploadUrl, thumb, 'image/jpeg');
      thumbnailUrl = thumbTarget.publicUrl;
    }
  } catch {
    // Thumbnail generation/upload is best-effort — fall back to the full image.
  }

  return {
    url: publicUrl,
    thumbnailUrl,
    width: dimensions.width,
    height: dimensions.height,
    fileSize: watermarked.size,
    originalFileName: file.name,
  };
}

export async function uploadMultipleImages(
  files: File[],
  onProgress?: (completed: number, total: number) => void,
): Promise<ImageUploadResult[]> {
  const results: ImageUploadResult[] = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    results.push(await uploadImage(files[i]));
    onProgress?.(i + 1, total);
  }

  return results;
}

/**
 * Returns the URL to display for a stored image.
 *
 * New uploads are S3 URLs with the watermark already baked into the pixels, so
 * they pass through untouched. Legacy Cloudinary URLs (older test listings) get
 * the logo-overlay transformation injected so they stay watermarked.
 */
// base64 of 'https://carmarket365.com/logo-watermark.png'
const LOGO_B64 = 'aHR0cHM6Ly9jYXJtYXJrZXQzNjUuY29tL2xvZ28td2F0ZXJtYXJrLnBuZw==';
const LOGO_OVERLAY = `l_fetch:${LOGO_B64},w_0.38,g_south_east,fl_relative,o_95/l_fetch:${LOGO_B64},w_0.38,g_north_west,fl_relative,o_95`;

export function getDisplayUrl(url: string): string {
  if (!url?.includes('res.cloudinary.com')) return url; // S3 (or anything else) — already watermarked
  if (!url.includes('/image/upload/')) return url;
  if (url.includes('l_fetch') || url.includes('l_text')) return url; // already transformed

  const uploadMarker = '/upload/';
  const idx = url.indexOf(uploadMarker);
  if (idx === -1) return url;

  const afterUpload = url.slice(idx + uploadMarker.length);
  const slashIdx = afterUpload.indexOf('/');
  if (slashIdx !== -1) {
    const firstSeg = afterUpload.slice(0, slashIdx);
    if (/^[a-z]_/.test(firstSeg) || firstSeg.includes(',')) {
      return (
        url.slice(0, idx + uploadMarker.length) +
        afterUpload.slice(0, slashIdx + 1) +
        LOGO_OVERLAY + '/' +
        afterUpload.slice(slashIdx + 1)
      );
    }
  }

  return url.slice(0, idx + uploadMarker.length) + LOGO_OVERLAY + '/' + afterUpload;
}
