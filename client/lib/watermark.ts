/**
 * Server-side-baked watermarking for CarMarket365.
 *
 * The watermark is applied to the image pixels using Canvas API BEFORE the file
 * is uploaded to Cloudinary. This means even scraping the raw CDN URL yields a
 * watermarked image — there is no "clean" copy stored anywhere.
 *
 * Strategy: a tiled diagonal repeat of "carmarket365.com", angled at -30°,
 * with semi-transparent white text + dark stroke so it is legible on any
 * background colour. The tile is dense enough that no reasonable crop removes
 * all marks while still being unobtrusive to genuine buyers.
 */

const WATERMARK_TEXT = 'carmarket365.com';

/**
 * Applies the watermark to a single image File.
 * Falls back silently to the original file if Canvas is unavailable.
 */
export function applyWatermark(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const { naturalWidth: w, naturalHeight: h } = img;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      // 1 — Draw original image
      ctx.drawImage(img, 0, 0);

      // 2 — Calculate size proportional to image
      const minDim = Math.min(w, h);
      const fontSize = Math.max(13, Math.round(minDim * 0.034));
      ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textWidth = ctx.measureText(WATERMARK_TEXT).width;

      // Tile pitch — tight enough that any ¼-image crop still shows a mark
      const pitchX = textWidth + fontSize * 3;   // horizontal gap between copies
      const pitchY = fontSize * 4.5;             // vertical gap between rows

      // 3 — Draw tiled diagonal watermark
      //     Rotate around the image centre so the tile covers the full canvas
      const diagonal = Math.ceil(Math.hypot(w, h));

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 6); // −30°

      for (let y = -diagonal; y < diagonal; y += pitchY) {
        // Offset every other row for a brick-pattern stagger
        const rowOffset = (Math.round(y / pitchY) % 2 === 0) ? 0 : pitchX / 2;
        for (let x = -diagonal; x < diagonal; x += pitchX) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
          ctx.lineWidth = Math.max(1, fontSize * 0.07);
          ctx.strokeText(WATERMARK_TEXT, x + rowOffset, y);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
          ctx.fillText(WATERMARK_TEXT, x + rowOffset, y);
        }
      }

      ctx.restore();

      // 4 — Convert back to File
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          resolve(
            new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: file.lastModified,
            })
          );
        },
        'image/jpeg',
        0.92
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // fail-open: upload without watermark rather than block the user
    };

    img.src = objectUrl;
  });
}
