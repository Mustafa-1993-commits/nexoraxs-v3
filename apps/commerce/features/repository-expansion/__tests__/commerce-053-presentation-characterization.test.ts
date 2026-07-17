import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("Feature 053 pre-change presentation characterization", () => {
  it("derives Inventory from the existing Product effective-stock overlay", () => {
    const provider = source("apps/commerce/lib/store/AppProvider.tsx");
    expect(provider).toContain("legacyEffectiveStock(p, state.currentBranchId, state.branchInventory)");
    expect(provider).toContain("stock: eff.qty, lowStockThreshold: eff.lowStockThreshold");
  });

  it("keeps Customer metrics based on active-Branch Orders", () => {
    const customers = source("apps/commerce/app/(commerce)/customers/page.tsx");
    expect(customers).toContain("orders.forEach");
    expect(customers).toContain("map[o.customerId].spent += o.total || 0");
  });

  it("preserves the current Invoice list calculation and detail/document relation sources", () => {
    const list = source("apps/commerce/app/(commerce)/invoices/page.tsx");
    const viewService = source("apps/commerce/features/invoices/application/LegacyInvoiceViewService.ts");
    expect(list).toContain("computeDoc(inv.items, setup, inv.discount || 0)");
    expect(viewService).toContain('input.viewKind === "detail" ? order?.customerId : invoice.customerId');
  });
});
