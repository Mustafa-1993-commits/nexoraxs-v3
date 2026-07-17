import type {
  CoreStorageCoordinationCompatibilityPort,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyMediaSource,
  LegacyThumbnailPort,
} from "@nexoraxs/contracts";
import type { MediaAsset, MediaOwnerType } from "@nexoraxs/types";
import type { WorkspaceStorageUsage } from "@nexoraxs/types";

export interface LegacyAttachMediaInput {
  readonly source: LegacyMediaSource;
  readonly workspaceId: string;
  readonly legacyBusinessUnitId?: string | null;
  readonly branchId?: string | null;
  readonly ownerType: MediaOwnerType;
  readonly ownerId?: string | null;
  readonly fileName: string;
}

export interface LegacyAttachMediaResult {
  readonly asset: MediaAsset;
  readonly reference: { readonly mediaAssetId: string; readonly thumbnailUrl: string };
  readonly mediaAssets: readonly MediaAsset[];
  readonly storageUsage: readonly WorkspaceStorageUsage[];
}

export type LegacyAttachMediaOutcome =
  | ({ readonly ok: true } & LegacyAttachMediaResult)
  | { readonly ok: false; readonly error: "image_too_large" | "storage_limit_reached" };

export class LegacyProductMediaService {
  constructor(
    private readonly thumbnail: LegacyThumbnailPort,
    private readonly storageCoordination: CoreStorageCoordinationCompatibilityPort,
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
  ) {}

  async attach(input: LegacyAttachMediaInput): Promise<LegacyAttachMediaOutcome> {
    const compressed = await this.thumbnail.compress(input.source);
    if (!compressed) return { ok: false, error: "image_too_large" };
    if (!this.storageCoordination.assessAllocation({
      workspaceId: input.workspaceId,
      candidateBytes: compressed.sizeBytes,
    }).allowed) return { ok: false, error: "storage_limit_reached" };
    const timestamp = this.deterministic.now();
    const asset: MediaAsset = {
      id: this.deterministic.createId("media"), workspaceId: input.workspaceId,
      businessUnitId: input.legacyBusinessUnitId ?? null, branchId: input.branchId ?? null,
      ownerType: input.ownerType, ownerId: input.ownerId ?? null, fileName: input.fileName,
      mimeType: compressed.mimeType, sizeBytes: compressed.sizeBytes, width: compressed.width,
      height: compressed.height, url: compressed.dataUrl, thumbnailUrl: compressed.dataUrl,
      createdAt: timestamp, updatedAt: timestamp,
    };
    const mediaAssets = [...this.store.readMediaAssets(), asset];
    this.store.replaceMediaAssets(mediaAssets);
    this.storageCoordination.commitUsageDelta({ workspaceId: input.workspaceId, deltaBytes: asset.sizeBytes });
    return {
      ok: true,
      asset,
      reference: { mediaAssetId: asset.id, thumbnailUrl: asset.thumbnailUrl ?? asset.url },
      mediaAssets,
      storageUsage: this.store.readStorageUsage(),
    };
  }
}
