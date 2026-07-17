import { describe, expect, it, vi } from "vitest";
import type { CreateLegacyProductCommand } from "@nexoraxs/contracts";
import { MemoryCommerceStore, MockProductsRepository } from "@nexoraxs/sdk/testing";
import { LegacyProductEditorService } from "../application/LegacyProductEditorService";

const scope = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "branch-a" };
const command: CreateLegacyProductCommand = {
  name: "Editor Product",
  category: "General",
  sku: "EDITOR-1",
  barcode: "",
  price: 10,
  cost: 5,
  taxable: true,
  stock: 2,
  lowStockThreshold: 1,
  notes: "",
};
const imageSource = { fileName: "product.png", mediaType: "image/png", sizeBytes: 1, bytes: new Uint8Array([1]) };

function setup(imageResult: string | null = "data:image/png;base64,ok") {
  const store = new MemoryCommerceStore();
  const repository = new MockProductsRepository(store, {
    now: () => new Date("2026-02-01T00:00:00.000Z"),
    createId: () => "p_editor",
  });
  const media = { saveProductImage: vi.fn().mockResolvedValue(imageResult) };
  return { store, repository, media, service: new LegacyProductEditorService(repository, media) };
}

describe("LegacyProductEditorService", () => {
  it("leaves simple create free of media orchestration when no file is present", async () => {
    const { media, service } = setup();

    await expect(service.create(scope, command)).resolves.toMatchObject({ id: "p_editor", image: undefined });
    expect(media.saveProductImage).not.toHaveBeenCalled();
  });

  it("coordinates Product persistence and the separate media port", async () => {
    const { media, service } = setup();
    const result = await service.create(scope, command, imageSource);

    expect(media.saveProductImage).toHaveBeenCalledWith({ productId: "p_editor", source: imageSource });
    expect(result.image).toBe("data:image/png;base64,ok");
  });

  it("rolls back a newly-created Product when media coordination fails", async () => {
    const { repository, service } = setup(null);

    await expect(service.create(scope, command, imageSource)).rejects.toThrow(
      "products.errors.image_upload",
    );
    await expect(repository.list(scope)).resolves.toMatchObject({ items: [], total: 0 });
  });

  it("does not update Product state when edit media coordination fails", async () => {
    const { repository, service } = setup(null);
    const created = await repository.create(scope, command);

    await expect(service.update(scope, created.id, { name: "Must not commit" }, imageSource))
      .rejects.toThrow("products.errors.image_upload");
    await expect(repository.getById(scope, created.id)).resolves.toMatchObject({ name: "Editor Product" });
  });
});
