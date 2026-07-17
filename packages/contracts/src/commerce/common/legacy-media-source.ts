export interface LegacyMediaSource {
  readonly fileName: string;
  readonly mediaType: string;
  readonly sizeBytes: number;
  readonly bytes: Uint8Array;
}

export interface LegacyCompressedImage {
  readonly dataUrl: string;
  readonly mimeType: "image/jpeg";
  readonly sizeBytes: number;
  readonly width: number;
  readonly height: number;
}

export interface LegacyThumbnailOptions {
  readonly maxDimension?: number;
  readonly quality?: number;
  readonly maxBytes?: number;
}

/** Browser-neutral application port; it defines no upload or object-storage transport. */
export interface LegacyThumbnailPort {
  compress(
    source: LegacyMediaSource,
    options?: LegacyThumbnailOptions,
  ): Promise<LegacyCompressedImage | null>;
}

/** Product-media association persistence; not an upload or object-storage contract. */
export interface LegacyProductMediaAssociationPort {
  saveProductImage(input: {
    readonly workspaceId: string;
    readonly legacyBusinessUnitId: string;
    readonly branchId?: string | null;
    readonly productId: string;
    readonly fileName: string;
    readonly image: LegacyCompressedImage;
  }): Promise<string | null>;
}
