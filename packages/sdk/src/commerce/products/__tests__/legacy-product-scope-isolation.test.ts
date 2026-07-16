import { describe, expect, it } from "vitest";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";
import {
  createLegacyProductFixtures,
  LEGACY_SCOPE_A,
  LEGACY_SCOPE_B,
  LEGACY_SCOPE_C,
} from "./legacy-product-fixtures";

const createCommand = (sku: string) => ({
  name: "Scoped Product",
  category: "General",
  sku,
  barcode: "",
  price: 12,
  cost: 4,
  taxable: true,
  stock: 3,
  lowStockThreshold: 1,
  notes: "",
});

function repository() {
  return new MockProductsRepository(
    new MemoryCommerceStore(createLegacyProductFixtures()),
    { now: () => new Date("2026-02-01T00:00:00.000Z"), createId: () => "created-in-scope" },
  );
}

describe("Legacy Product repository scope isolation", () => {
  it("isolates lists by Workspace plus legacy BusinessUnit", async () => {
    const subject = repository();

    await expect(subject.list(LEGACY_SCOPE_A)).resolves.toMatchObject({
      items: [expect.objectContaining({ name: "Workspace A Product" })],
      total: 1,
    });
    await expect(subject.list(LEGACY_SCOPE_B)).resolves.toMatchObject({
      items: [expect.objectContaining({ name: "Workspace B Product" })],
      total: 1,
    });
    await expect(subject.list(LEGACY_SCOPE_C)).resolves.toMatchObject({
      items: [expect.objectContaining({ name: "Legacy BU C Product" })],
      total: 1,
    });
  });

  it("does not use optional Branch as Product ownership but accepts it as view identity", async () => {
    const subject = repository();
    const alternateBranch = { ...LEGACY_SCOPE_A, branchId: "branch-a-2" };

    const result = await subject.list(alternateBranch);

    expect(result.items.map((item) => item.name)).toEqual(["Workspace A Product"]);
  });

  it("fails closed for foreign overlapping IDs without disclosing the foreign record", async () => {
    const subject = repository();
    const foreignScope = { workspaceId: "ws-foreign", legacyBusinessUnitId: "legacy-bu-shared" };

    const error = await subject.getById(foreignScope, "shared-product-id").catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(LegacyProductRepositoryError);
    expect(error).toMatchObject({ code: "not_found", messageKey: "products.errors.not_found" });
    expect(JSON.stringify(error)).not.toContain("Workspace A Product");
    expect(JSON.stringify(error)).not.toContain("Workspace B Product");
  });

  it("updates and removes only the matching scoped copy of an overlapping ID", async () => {
    const subject = repository();

    await subject.update(LEGACY_SCOPE_A, "shared-product-id", { name: "Updated only in A" });
    await expect(subject.getById(LEGACY_SCOPE_B, "shared-product-id")).resolves.toMatchObject({
      name: "Workspace B Product",
    });

    await subject.remove(LEGACY_SCOPE_A, "shared-product-id");
    await expect(subject.getById(LEGACY_SCOPE_A, "shared-product-id")).rejects.toMatchObject({ code: "not_found" });
    await expect(subject.getById(LEGACY_SCOPE_B, "shared-product-id")).resolves.toMatchObject({
      name: "Workspace B Product",
    });
  });

  it("enforces duplicate SKU only inside the matching Workspace and legacy BusinessUnit", async () => {
    const subject = repository();

    await expect(subject.create(LEGACY_SCOPE_A, createCommand(" shared-sku "))).rejects.toMatchObject({
      code: "duplicate_sku",
    });
    await expect(subject.create(
      { workspaceId: "ws-new", legacyBusinessUnitId: LEGACY_SCOPE_A.legacyBusinessUnitId },
      createCommand("SHARED-SKU"),
    )).resolves.toMatchObject({ workspaceId: "ws-new", sku: "SHARED-SKU" });
  });

  it.each([
    [{ ...LEGACY_SCOPE_A, workspaceId: " " }, "workspaceId"],
    [{ ...LEGACY_SCOPE_A, legacyBusinessUnitId: "" }, "legacyBusinessUnitId"],
    [{ ...LEGACY_SCOPE_A, branchId: " " }, "branchId"],
  ])("rejects an incomplete legacy scope", async (scope, field) => {
    await expect(repository().list(scope)).rejects.toMatchObject({
      code: "validation",
      fieldIssues: [expect.objectContaining({ field })],
    });
  });
});
