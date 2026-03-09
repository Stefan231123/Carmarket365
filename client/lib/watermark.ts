/**
 * Server-side-baked watermarking for CarMarket365.
 *
 * Applies the CarMarket365 logo as a watermark to the image pixels using
 * Canvas API BEFORE the file is uploaded to Cloudinary. The watermark is
 * placed in the bottom-right corner at 60% opacity.
 */

const LOGO_PATH = '/logo-watermark.png';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Applies the watermark to a single image File.
 * Falls back silently to the original file if Canvas or logo is unavailable.
 */
export async function applyWatermark(file: File): Promise<File> {
  try {
    const [carImg, logo] = await Promise.all([
      loadImage(URL.createObjectURL(file)),
      loadImage(LOGO_PATH),
    ]);

    const { naturalWidth: w, naturalHeight: h } = carImg;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    // 1 — Draw original image
    ctx.drawImage(carImg, 0, 0);
    URL.revokeObjectURL(carImg.src);

    // 2 — Scale logo to ~38% of image width
    const logoWidth = Math.round(w * 0.38);
    const logoHeight = Math.round((logo.naturalHeight / logo.naturalWidth) * logoWidth);
    const margin = Math.round(w * 0.025); // 2.5% margin from edges

    ctx.globalAlpha = 0.92;
    // Bottom-right
    ctx.drawImage(logo, w - logoWidth - margin, h - logoHeight - margin, logoWidth, logoHeight);
    // Top-left
    ctx.drawImage(logo, margin, margin, logoWidth, logoHeight);
    ctx.globalAlpha = 1.0;

    // 3 — Convert back to File
    return await new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: file.lastModified,
          }));
        },
        'image/jpeg',
        0.92
      );
    });
  } catch {
    // fail-open: upload without watermark rather than block the user
    return file;
  }
}
