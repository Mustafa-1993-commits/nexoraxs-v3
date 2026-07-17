// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import type { LegacyProductsRepository } from "@nexoraxs/contracts";
import { LegacyProductEditorService } from "../application/LegacyProductEditorService";
import type { LegacyMediaCompatibilityPort } from "../application/LegacyMediaCompatibilityPort";

const mediaSource = { fileName: "product.png", mediaType: "image/png", sizeBytes: 3, bytes: new Uint8Array([1, 2, 3]) };

const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" };
const command = {
  name: "P", category: "C", sku: "S", barcode: "", price: 1, cost: 0,
  taxable: true, stock: 1, lowStockThreshold: 0, notes: "",
};
const created = {
  id: "p", workspaceId: "ws", businessUnitId: "bu", branchId: "br", osSubscriptionId: "sub",
  ...command, createdAt: "created", updatedAt: "updated",
};

describe("Feature 054 Product media characterization", () => {
  it("creates Product, saves File media, then updates Product association", async () => {
    const calls: string[] = [];
    const repository = {
      create: vi.fn(async () => { calls.push("create"); return created; }),
      update: vi.fn(async (_scope, _id, update) => { calls.push("update"); return { ...created, ...update }; }),
      remove: vi.fn(), list: vi.fn(), getById: vi.fn(),
    } as unknown as LegacyProductsRepository;
    const media = {
      saveProductImage: vi.fn(async (input) => { calls.push(`media:${input.source.fileName}`); return "data:image/jpeg;base64,current"; }),
    } satisfies LegacyMediaCompatibilityPort;
    const service = new LegacyProductEditorService(repository, media);
    await expect(service.create(scope, command, mediaSource)).resolves.toMatchObject({ image: "data:image/jpeg;base64,current" });
    expect(calls).toEqual(["create", "media:product.png", "update"]);
  });

  it("compensates failed create media/update and swallows compensation failure", async () => {
    const repository = {
      create: vi.fn(async () => created), update: vi.fn(async () => { throw new Error("update-failed"); }),
      remove: vi.fn(async () => { throw new Error("remove-failed"); }), list: vi.fn(), getById: vi.fn(),
    } as unknown as LegacyProductsRepository;
    const media = { saveProductImage: vi.fn(async () => "image") } satisfies LegacyMediaCompatibilityPort;
    const service = new LegacyProductEditorService(repository, media);
    await expect(service.create(scope, command, mediaSource)).rejects.toThrow("update-failed");
    expect(repository.remove).toHaveBeenCalledWith(scope, "p");
  });
});
