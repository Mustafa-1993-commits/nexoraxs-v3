import type {
  LegacyCompressedImage,
  LegacyMediaSource,
  LegacyThumbnailOptions,
  LegacyThumbnailPort,
} from "@nexoraxs/contracts";

export class BrowserCanvasThumbnailAdapter implements LegacyThumbnailPort {
  async compress(source: LegacyMediaSource, options?: LegacyThumbnailOptions): Promise<LegacyCompressedImage | null> {
    if (typeof document === "undefined" || typeof Image === "undefined") return null;
    const maxDimension = options?.maxDimension ?? 200;
    const quality = options?.quality ?? 0.7;
    const maxBytes = options?.maxBytes ?? 60 * 1024;
    const bytes = source.bytes.buffer.slice(
      source.bytes.byteOffset,
      source.bytes.byteOffset + source.bytes.byteLength,
    ) as ArrayBuffer;
    const file = new File([bytes], source.fileName, { type: source.mediaType });
    try {
      const objectUrl = URL.createObjectURL(file);
      try {
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
          const element = new Image();
          element.onload = () => resolve(element);
          element.onerror = () => reject(new Error("image_load_failed"));
          element.src = objectUrl;
        });
        const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * ratio));
        const height = Math.max(1, Math.round(image.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) return null;
        context.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const sizeBytes = Math.round((dataUrl.length * 3) / 4);
        if (sizeBytes > maxBytes) return null;
        return { dataUrl, mimeType: "image/jpeg", sizeBytes, width, height };
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      return null;
    }
  }
}
