import type { LegacyMediaSource } from "@nexoraxs/contracts";

/** React/browser edge mapping; application services never receive File. */
export async function browserFileToLegacyMediaSource(file: File): Promise<LegacyMediaSource> {
  return {
    fileName: file.name,
    mediaType: file.type,
    sizeBytes: file.size,
    bytes: new Uint8Array(await file.arrayBuffer()),
  };
}
