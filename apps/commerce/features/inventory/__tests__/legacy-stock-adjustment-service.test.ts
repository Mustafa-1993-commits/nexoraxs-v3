import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyStockAdjustmentService } from "../application/LegacyStockAdjustmentService";
import { deterministic, notificationSpies, operationContext, operationProduct } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

describe("LegacyStockAdjustmentService", () => {
  it("uses Product fallback stock, persists position before Movement, and notifies exact scope", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ products: [operationProduct] });
    const changes = notificationSpies();
    const result = new LegacyStockAdjustmentService(store, deterministic(), changes).adjust(operationContext, { productId: "p", qty: 7, lowStockThreshold: 1 });
    expect(result).toMatchObject({ ok: true, branchInventory: [{ qty: 7, lowStockThreshold: 1 }], stockMovements: [{ qtyChange: -3, reason: "adjustment", performedByName: "Cashier" }] });
    expect(store.writes).toEqual(["positions", "movements"]);
    expect(changes.inventoryChanged).toHaveBeenCalledWith({ scope: { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br-a" }, productIds: ["p"] });
  });

  it("preserves exact errors and suppresses a zero-delta Movement", () => {
    const empty = new LegacyStockAdjustmentService(new MemoryLegacyCommerceOperationsStore(), deterministic(), notificationSpies());
    expect(empty.adjust({ ...operationContext, branchId: null }, { productId: "p", qty: 1 })).toEqual({ ok: false, error: "no_active_branch" });
    expect(empty.adjust(operationContext, { productId: "missing", qty: 1 })).toEqual({ ok: false, error: "product_not_found" });
    const store = new MemoryLegacyCommerceOperationsStore({ products: [operationProduct] });
    const result = new LegacyStockAdjustmentService(store, deterministic(), notificationSpies()).adjust(operationContext, { productId: "p", qty: 10 });
    expect(result.ok && result.stockMovements).toEqual([]);
    expect(store.writes).toEqual(["positions"]);
  });
});
