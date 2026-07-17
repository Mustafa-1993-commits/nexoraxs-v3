import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { computeReturnTotals } from "@/features/documents/application/legacy-commerce-documents";
import type { CommerceOrder } from "@nexoraxs/types";

const orderSource = readFileSync(join(process.cwd(), "apps/commerce/features/orders/application/LegacyOrderCreationService.ts"), "utf8");
const invoiceSource = readFileSync(join(process.cwd(), "apps/commerce/features/invoices/application/LegacyInvoiceCreationService.ts"), "utf8");
const returnSource = readFileSync(join(process.cwd(), "apps/commerce/features/returns/application/LegacyReturnCreationService.ts"), "utf8");

const order: CommerceOrder = {
  id: "ord", orderNumber: "ORD-0001", workspaceId: "ws", businessUnitId: "bu", branchId: "br",
  customerId: null,
  items: [{ productId: "p", name: "Product", qty: 2, price: 100, taxable: true }],
  payment: "cash", discount: 20, vat: 27, subtotal: 200, total: 180, net: 153,
  cashierId: "u", cashierName: "Cashier", createdAt: "2026-01-01T00:00:00.000Z",
};

describe("Feature 054 Order, Invoice, and Return characterization", () => {
  it("pro-rates returns from stored Order snapshots rather than current catalog policy", () => {
    const totals = computeReturnTotals(order, [{ productId: "p", qty: 1 }]);
    expect(totals).toMatchObject({ subtotal: 100, vat: 13.5, total: 90 });
    expect(totals.lines[0]).toMatchObject({ productId: "p", name: "Product", qty: 1, price: 100 });
  });

  it("preserves fresh-storage Order/Invoice numbering and same-tick Invoice lookup", () => {
    expect(orderSource).toContain("ORD-${String(scopedCount + 1).padStart(4, \"0\")}");
    expect(invoiceSource).toContain("this.store.readOrders().find");
    expect(invoiceSource).toContain("(setup.invoiceStart || 1001) + scopedCount");
  });

  it("preserves Order-before-Inventory and Return owner-effect commit ordering", () => {
    const orderWrite = orderSource.indexOf("replaceOrders");
    const orderInventoryWrite = orderSource.indexOf("replacePositions", orderWrite);
    expect(orderInventoryWrite).toBeGreaterThan(orderWrite);

    const returnOrderWrite = returnSource.indexOf("replaceOrders");
    const invoiceWrite = returnSource.indexOf("replaceInvoices", returnOrderWrite);
    const returnWrite = returnSource.indexOf("replaceReturns", returnOrderWrite);
    expect(invoiceWrite).toBeGreaterThan(returnOrderWrite);
    expect(returnWrite).toBeGreaterThan(invoiceWrite);
  });
});
