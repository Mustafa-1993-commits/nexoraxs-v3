import { describe, expect, it } from "vitest";
import { computeDoc, computeReturnTotals } from "../../documents/application/legacy-commerce-documents";
import { legacyEffectiveStock } from "../../inventory/application/legacy-inventory-policy";
import { legacyCommercePreset } from "../../setup/application/legacy-commerce-setup-policy";
import { nxNetSales, nxReturnsForPeriod } from "../../reporting/application/legacy-commerce-reporting";
import { operationOrder, operationProduct } from "./legacy-commerce-054-operation-samples";

describe("Commerce policy migration equivalence", () => {
  it("preserves exact document, return, stock, preset, and reporting results", () => {
    expect(computeDoc(operationOrder.items, { vatRegistered: true, vatRate: 14, pricesIncludeTax: true }, 20))
      .toMatchObject({ gross: 200, discount: 20, total: 180, vat: 22.10526315789477, net: 157.89473684210523 });
    expect(computeReturnTotals(operationOrder, [{ productId: "p", qty: 1 }]))
      .toMatchObject({ subtotal: 100, vat: 13.5, total: 90 });
    expect(legacyEffectiveStock(operationProduct, "br", [])).toEqual({ qty: 10, lowStockThreshold: 2, updatedAt: "updated", hasRecord: false });
    expect(legacyCommercePreset("Restaurant / Cafe")).toBe("restaurant_cafe");
    const returned = [{ id: "ret", workspaceId: "ws", businessUnitId: "bu", branchId: "br-a", orderId: "ord", invoiceId: null, returnNumber: "RET-0001", items: [], reason: "", refundMethod: "cash" as const, restock: false, subtotal: 10, vat: 1, total: 9, cashierId: "u", cashierName: "U", createdAt: "2026-07-17T00:00:00.000Z" }];
    expect(nxReturnsForPeriod(returned, "month", new Date("2026-07-17T01:00:00.000Z"))).toEqual(returned);
    expect(nxNetSales([operationOrder], returned)).toMatchObject({ gross: 180, returns: 9, net: 171, vat: 27, vatRefunded: 1 });
  });
});
