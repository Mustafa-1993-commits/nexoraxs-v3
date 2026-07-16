import { describe, expect, it, vi } from "vitest";
import type { CreateLegacyProductCommand, LegacyProductScope } from "@nexoraxs/contracts";
import { LegacyProductsCompatibilityFacade } from "../LegacyProductsCompatibilityFacade";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";
import { createLegacyProductFixtures, LEGACY_SCOPE_A, LEGACY_SCOPE_B } from "./legacy-product-fixtures";

const createCommand: CreateLegacyProductCommand = {
  name: "Facade Product",
  category: "General",
  sku: "FACADE-1",
  barcode: "",
  price: 10,
  cost: 4,
  taxable: true,
  stock: 1,
  lowStockThreshold: 0,
  notes: "",
};

function setup() {
  const store = new MemoryCommerceStore(createLegacyProductFixtures());
  const repository = new MockProductsRepository(store, {
    now: () => new Date("2026-02-01T00:00:00.000Z"),
    createId: () => "facade-created",
  });
  return { store, repository, facade: new LegacyProductsCompatibilityFacade(repository, store) };
}

describe("LegacyProductsCompatibilityFacade", () => {
  it("delegates list/create/update/remove and publishes the final compatible scoped list", async () => {
    const { facade } = setup();
    const listener = vi.fn();
    facade.subscribe(listener);

    await expect(facade.list(LEGACY_SCOPE_A)).resolves.toMatchObject({ total: 1 });
    const created = await facade.create(LEGACY_SCOPE_A, createCommand);
    await expect(facade.update(LEGACY_SCOPE_A, created.id, { name: "Facade Product Updated" }))
      .resolves.toMatchObject({ name: "Facade Product Updated" });
    await expect(facade.remove(LEGACY_SCOPE_A, created.id)).resolves.toEqual({ removedId: created.id });

    expect(listener).toHaveBeenLastCalledWith(
      LEGACY_SCOPE_A,
      [expect.objectContaining({ name: "Workspace A Product" })],
    );
  });

  it("does not publish another scope or publish after a failed mutation", async () => {
    const { facade } = setup();
    const listener = vi.fn();
    facade.subscribe(listener);
    await facade.list(LEGACY_SCOPE_B);
    listener.mockClear();

    await expect(facade.create(LEGACY_SCOPE_A, { ...createCommand, sku: "SHARED-SKU" }))
      .rejects.toMatchObject({ code: "duplicate_sku" });

    expect(listener).not.toHaveBeenCalled();
  });

  it("unsubscribes and clone-isolates published records", async () => {
    const { facade } = setup();
    const received: Array<readonly { name: string }[]> = [];
    const unsubscribe = facade.subscribe((_scope: LegacyProductScope, records) => received.push(records));
    await facade.list(LEGACY_SCOPE_A);
    unsubscribe();
    await facade.list(LEGACY_SCOPE_A);

    expect(received).toHaveLength(1);
    expect(() => {
      (received[0][0] as { name: string }).name = "consumer mutation";
    }).not.toThrow();
    await expect(facade.list(LEGACY_SCOPE_A)).resolves.toMatchObject({
      items: [expect.objectContaining({ name: "Workspace A Product" })],
    });
  });

  it("routes compatible demo seeding through the store without rewriting IDs", async () => {
    const { facade } = setup();
    const fixtures = createLegacyProductFixtures().slice(0, 2);

    await facade.seedCompatibleProducts(fixtures);

    await expect(facade.list(LEGACY_SCOPE_A)).resolves.toMatchObject({
      items: [expect.objectContaining({ id: "shared-product-id" })],
    });
  });
});
