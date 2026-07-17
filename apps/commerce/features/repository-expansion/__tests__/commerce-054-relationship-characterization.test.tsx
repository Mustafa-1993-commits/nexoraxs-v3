import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LegacyCommerceRepositoryError } from "@nexoraxs/contracts";
import { LegacyOrderViewService } from "../../orders/application/LegacyOrderViewService";

describe("Feature 054 relationship and retry characterization", () => {
  it("renders a genuinely missing related Customer as optional in the current Order view", async () => {
    const order = {
      id: "ord", orderNumber: "ORD-1", workspaceId: "ws", businessUnitId: "bu", branchId: "br",
      customerId: "missing", items: [], payment: "cash" as const, discount: 0, vat: 0,
      subtotal: 0, total: 0, net: 0, cashierId: "u", cashierName: "U", createdAt: "now",
    };
    const orders = { getById: async () => order, list: async () => ({ items: [order] }) };
    const customers = {
      getById: async () => { throw new LegacyCommerceRepositoryError({ code: "not_found", operation: "customers.getById" }); },
      list: async () => ({ items: [] }), create: async () => { throw new Error(); }, update: async () => { throw new Error(); },
    };
    const invoices = { list: async () => ({ items: [] }), getById: async () => { throw new Error(); } };
    const service = new LegacyOrderViewService(orders, customers, invoices);
    await expect(service.getOrder({ scope: { workspaceId: "ws", legacyBusinessUnitId: "bu" }, orderId: "ord" }))
      .resolves.toMatchObject({ customer: null, invoice: null });
  });

  it("keeps explicit user retry controls and retry:false on relationship queries", () => {
    const sources = [
      "apps/commerce/features/orders/hooks/useLegacyOrders.ts",
      "apps/commerce/features/invoices/hooks/useLegacyInvoices.ts",
      "apps/commerce/lib/commerce/CommerceServicesProvider.tsx",
    ].map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");
    const retryTest = readFileSync(join(process.cwd(), "apps/commerce/features/repository-expansion/__tests__/commerce-053-manual-retry.test.tsx"), "utf8");
    expect(sources).toContain("retry: false");
    expect(retryTest).toContain("Retry");
  });
});
