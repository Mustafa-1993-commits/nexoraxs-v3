import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyReturnCreationService } from "../application/LegacyReturnCreationService";
import { deterministic, notificationSpies, operationContext, operationInvoice, operationOrder, operationProduct } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

describe("LegacyReturnCreationService", () => {
  it("preserves refund snapshots, numbering, owner-effect order, restock, and notifications", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ products: [operationProduct], orders: [operationOrder], invoices: [operationInvoice] });
    const changes = notificationSpies();
    const result = new LegacyReturnCreationService(store, deterministic(), changes).create(operationContext, { orderId: "ord", items: [{ productId: "p", qty: 1 }], reason: "reason", refundMethod: "cash", restock: true });
    expect(result).toMatchObject({ ok: true, returnRecord: { returnNumber: "RET-0001", subtotal: 100, total: 90 }, orders: [{ returnStatus: "partial", returnedTotal: 90 }] });
    expect(result.ok && result.branchInventory[0]).toMatchObject({ qty: 11 });
    expect(store.writes).toEqual(["orders", "invoices", "returns", "positions", "movements"]);
    expect(changes.ordersChanged).toHaveBeenCalledTimes(1);
    expect(changes.invoicesChanged).toHaveBeenCalledTimes(1);
    expect(changes.inventoryChanged).toHaveBeenCalledTimes(1);
  });

  it("rejects missing and over-returned items without writes", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ orders: [operationOrder] });
    const service = new LegacyReturnCreationService(store, deterministic(), notificationSpies());
    expect(service.create(operationContext, { orderId: "missing", items: [{ productId: "p", qty: 1 }], reason: "", refundMethod: "cash", restock: false })).toEqual({ ok: false, error: "return_rejected" });
    expect(service.create(operationContext, { orderId: "ord", items: [{ productId: "p", qty: 3 }], reason: "", refundMethod: "cash", restock: false })).toEqual({ ok: false, error: "return_rejected" });
    expect(store.writes).toEqual([]);
  });
});
