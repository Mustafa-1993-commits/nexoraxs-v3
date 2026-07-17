import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyStockTransferService } from "../application/LegacyStockTransferService";
import { deterministic, notificationSpies, operationBranches, operationContext, operationProduct } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

describe("LegacyStockTransferService", () => {
  it("creates a completed numbered Transfer, two movements, ordered writes, and both-Branch notifications", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ products: [operationProduct], branches: operationBranches });
    const changes = notificationSpies();
    const result = new LegacyStockTransferService(store, deterministic(), changes).transfer(operationContext, { toBranchId: "br-b", items: [{ productId: "p", qty: 2 }] });
    expect(result).toMatchObject({ ok: true, transfer: { transferNumber: "TRF-0001", status: "completed" } });
    expect(result.ok && result.stockMovements.map((item) => item.reason)).toEqual(["transfer_out", "transfer_in"]);
    expect(store.writes).toEqual(["positions", "movements", "transfers"]);
    expect(changes.inventoryChanged).toHaveBeenCalledTimes(2);
  });

  it("preserves destination and insufficient-stock failures", () => {
    const service = new LegacyStockTransferService(new MemoryLegacyCommerceOperationsStore({ products: [operationProduct], branches: operationBranches }), deterministic(), notificationSpies());
    expect(service.transfer(operationContext, { toBranchId: "br-a", items: [{ productId: "p", qty: 1 }] })).toEqual({ ok: false, error: "transfer_rejected" });
    expect(service.transfer(operationContext, { toBranchId: "br-b", items: [{ productId: "p", qty: 11 }] })).toEqual({ ok: false, error: "insufficient_stock" });
  });
});
