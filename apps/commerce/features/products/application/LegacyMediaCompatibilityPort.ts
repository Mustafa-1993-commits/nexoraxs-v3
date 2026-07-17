import type { LegacyMediaSource } from "@nexoraxs/contracts";

/** Existing media behavior used by the combined Product form; not Product persistence. */
export interface LegacyMediaCompatibilityPort {
  saveProductImage(input: {
    readonly productId: string;
    readonly source: LegacyMediaSource;
  }): Promise<string | null>;
}
