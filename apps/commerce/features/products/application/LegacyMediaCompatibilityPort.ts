/** Existing media behavior used by the combined Product form; not Product persistence. */
export interface LegacyMediaCompatibilityPort {
  saveProductImage(input: {
    readonly productId: string;
    readonly file: File;
  }): Promise<string | null>;
}
