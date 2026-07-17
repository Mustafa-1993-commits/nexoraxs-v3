import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createCoreStorageCoordination } from "@nexoraxs/sdk";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";

const setupSource = readFileSync(join(process.cwd(), "apps/commerce/features/setup/application/LegacyCommerceSetupService.ts"), "utf8");
const policySource = readFileSync(join(process.cwd(), "apps/commerce/features/setup/application/legacy-commerce-setup-policy.ts"), "utf8");
const mediaSource = readFileSync(join(process.cwd(), "apps/commerce/features/media/application/LegacyProductMediaService.ts"), "utf8");

describe("Feature 054 setup and media characterization", () => {
  it("keeps absent setup virtual and strips caller identity fields on first persistence", () => {
    expect(policySource).toContain('id: "", workspaceId: input.workspaceId');
    expect(setupSource).toContain("delete changes.id");
    expect(setupSource).toContain("delete changes.createdAt");
    expect(setupSource).toContain("delete changes.updatedAt");
    expect(setupSource).toContain("...LEGACY_COMMERCE_SETUP_DEFAULTS");
  });

  it("preserves the missing-usage allowance and exact quota boundary", () => {
    const missing = new MemoryLegacyCommerceOperationsStore();
    expect(createCoreStorageCoordination(missing, { createId: () => "id", now: () => "after" })
      .assessAllocation({ workspaceId: "ws", candidateBytes: Number.MAX_SAFE_INTEGER }).allowed).toBe(true);
    const store = new MemoryLegacyCommerceOperationsStore({ storageUsage: [{ workspaceId: "ws", usedBytes: 90, limitBytes: 100, updatedAt: "before" }] });
    const coordinator = createCoreStorageCoordination(store, { createId: () => "id", now: () => "after" });
    expect(coordinator.assessAllocation({ workspaceId: "ws", candidateBytes: 10 }).allowed).toBe(true);
    expect(coordinator.assessAllocation({ workspaceId: "ws", candidateBytes: 11 }).allowed).toBe(false);
    expect(coordinator.commitUsageDelta({ workspaceId: "ws", deltaBytes: 10 })).toMatchObject({ workspaceId: "ws", usedBytes: 100, limitBytes: 100 });
  });

  it("writes media before Workspace usage and publishes the same thumbnail reference", () => {
    const mediaWrite = mediaSource.indexOf("replaceMediaAssets(mediaAssets)");
    const usageWrite = mediaSource.indexOf("commitUsageDelta", mediaWrite);
    expect(mediaWrite).toBeGreaterThan(-1);
    expect(usageWrite).toBeGreaterThan(mediaWrite);
    expect(mediaSource).toContain("thumbnailUrl: asset.thumbnailUrl ?? asset.url");
  });
});
