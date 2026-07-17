import { describe, expect, it, vi } from "vitest";
import { createCoreStorageCoordination } from "@nexoraxs/sdk";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyProductMediaService } from "../application/LegacyProductMediaService";
import { deterministic } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

const input = { source: { fileName: "p.png", mediaType: "image/png", sizeBytes: 3, bytes: new Uint8Array([1, 2, 3]) }, workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br", ownerType: "product_image" as const, ownerId: "p", fileName: "p.png" };

describe("LegacyProductMediaService", () => {
  it("writes media before committing usage and returns the same thumbnail association", async () => {
    const store = new MemoryLegacyCommerceOperationsStore({ storageUsage: [{ workspaceId: "ws", usedBytes: 0, limitBytes: 100, updatedAt: "before" }] });
    const thumbnail = { compress: vi.fn(async () => ({ dataUrl: "data:image/jpeg;base64,x", mimeType: "image/jpeg" as const, sizeBytes: 10, width: 1, height: 1 })) };
    const result = await new LegacyProductMediaService(thumbnail, createCoreStorageCoordination(store, deterministic()), store, deterministic()).attach(input);
    expect(result).toMatchObject({ ok: true, reference: { thumbnailUrl: "data:image/jpeg;base64,x" } });
    expect(store.writes).toEqual(["mediaAssets", "storageUsage"]);
  });

  it("preserves compression and quota failures without writes", async () => {
    const store = new MemoryLegacyCommerceOperationsStore({ storageUsage: [{ workspaceId: "ws", usedBytes: 100, limitBytes: 100, updatedAt: "before" }] });
    const tooLarge = new LegacyProductMediaService({ compress: async () => null }, createCoreStorageCoordination(store, deterministic()), store, deterministic());
    await expect(tooLarge.attach(input)).resolves.toEqual({ ok: false, error: "image_too_large" });
    const quota = new LegacyProductMediaService({ compress: async () => ({ dataUrl: "x", mimeType: "image/jpeg" as const, sizeBytes: 1, width: 1, height: 1 }) }, createCoreStorageCoordination(store, deterministic()), store, deterministic());
    await expect(quota.attach(input)).resolves.toEqual({ ok: false, error: "storage_limit_reached" });
    expect(store.writes).toEqual([]);
  });
});
