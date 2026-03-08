/**
 * Cloudinary direct upload utility for CarMarket365
 * Uses unsigned upload preset for client-side uploads
 */

import { applyWatermark } from './watermark';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResult {
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  fileSize: number;
  originalFileName: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
  }

  // Bake the watermark into the pixels before the file reaches Cloudinary.
  // Any copy scraped directly from the CDN URL will still carry the mark.
  const watermarkedFile = await applyWatermark(file);

  const formData = new FormData();
  formData.append('file', watermarkedFile);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'carmarket365');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();

  // Generate thumbnail URL using Cloudinary transformations
  const thumbnailUrl = data.secure_url.replace(
    '/upload/',
    '/upload/c_fill,w_400,h_300,q_auto,f_auto/'
  );

  return {
    url: data.secure_url,
    thumbnailUrl,
    width: data.width,
    height: data.height,
    fileSize: data.bytes,
    originalFileName: file.name,
  };
}

/**
 * Injects a Cloudinary text-overlay watermark transformation into a CDN URL.
 * Works for both old (unwatermarked) and new (canvas-baked) images.
 * Only applied to URLs in the carmarket365 folder to avoid affecting logos etc.
 */
export function getWatermarkedUrl(url: string): string {
  if (!url?.includes('res.cloudinary.com')) return url;
  if (!url.includes('/carmarket365/')) return url; // skip non-listing images
  if (url.includes('l_text')) return url; // already has text overlay

  const watermark = 'l_text:Arial_36_bold:carmarket365.com,o_35,co_white,g_center';
  const uploadMarker = '/upload/';
  const idx = url.indexOf(uploadMarker);
  if (idx === -1) return url;

  const afterUpload = url.slice(idx + uploadMarker.length);
  const slashIdx = afterUpload.indexOf('/');
  if (slashIdx !== -1) {
    const firstSeg = afterUpload.slice(0, slashIdx);
    // If first segment is a Cloudinary transformation (e.g. c_fill,w_400,...)
    if (/^[a-z]_/.test(firstSeg) || firstSeg.includes(',')) {
      // Inject watermark AFTER existing transformations so it respects final size
      return (
        url.slice(0, idx + uploadMarker.length) +
        afterUpload.slice(0, slashIdx + 1) +
        watermark + '/' +
        afterUpload.slice(slashIdx + 1)
      );
    }
  }

  // No existing transformations — inject before the path
  return url.slice(0, idx + uploadMarker.length) + watermark + '/' + afterUpload;
}

export async function uploadMultipleToCloudinary(
  files: File[],
  onProgress?: (completed: number, total: number) => void
): Promise<CloudinaryUploadResult[]> {
  const results: CloudinaryUploadResult[] = [];
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const result = await uploadToCloudinary(files[i]);
    results.push(result);
    onProgress?.(i + 1, total);
  }

  return results;
}
