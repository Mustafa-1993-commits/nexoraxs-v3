import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyOrderCreationService } from "../application/LegacyOrderCreationService";
import { deterministic, notificationSpies, operationContext, operationProduct } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

const command = { items: [{ productId: "p", name: "Product", qty: 2, price: 100, taxable: true }], customerId: "customer", payment: "cash" as const, discount: 20, vat: 27, subtotal: 200, total: 180, net: 153 };

describe("LegacyOrderCreationService", () => {
  it("preserves caller totals, fresh numbering, order-first commits, stock effects, and scoped changes", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ products: [operationProduct] });
    const changes = notificationSpies();
    const result = new LegacyOrderCreationService(store, deterministic(), changes).create(operationContext, command);
    expect(result.order).toMatchObject({ orderNumber: "ORD-0001", subtotal: 200, total: 180, customerId: "customer" });
    expect(result.branchInventory[0]).toMatchObject({ qty: 8 });
    expect(store.writes).toEqual(["orders", "positions", "movements"]);
    expect(changes.ordersChanged).toHaveBeenCalledTimes(1);
    expect(changes.inventoryChanged).toHaveBeenCalledTimes(1);
  });

  it("accumulates duplicate cart quantities and leaves untracked Products unchanged", () => {
    const tracked = new LegacyOrderCreationService(new MemoryLegacyCommerceOperationsStore({ products: [operationProduct] }), deterministic(), notificationSpies());
    expect(() => tracked.create(operationContext, { ...command, items: [...command.items, { ...command.items[0], qty: 9 }] })).toThrow("insufficient_stock");
    const untracked = { ...operationProduct, id: "free", stock: null };
    const store = new MemoryLegacyCommerceOperationsStore({ products: [untracked] });
    const result = new LegacyOrderCreationService(store, deterministic(), notificationSpies()).create(operationContext, { ...command, items: [{ ...command.items[0], productId: "free" }] });
    expect(result.branchInventory).toEqual([]);
    expect(store.writes).toEqual(["orders"]);
  });
});
