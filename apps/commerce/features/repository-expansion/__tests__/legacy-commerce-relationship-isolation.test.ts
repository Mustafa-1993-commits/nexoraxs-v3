import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk/testing";
import { LegacyOrderViewService } from "../../orders/application/LegacyOrderViewService";
import { LegacyInvoiceViewService } from "../../invoices/application/LegacyInvoiceViewService";
import { CUSTOMER_B } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("Commerce relation scope isolation", () => {
  it("keeps stored snapshots but surfaces a foreign Customer scope violation", async () => {
    const order = { ...ORDER_A, customerId: CUSTOMER_B.id };
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_B], orders: [order], invoices: [{ ...INVOICE_A, orderId: order.id, customerId: CUSTOMER_B.id }] });
    const customers = new MockCustomersRepository(store); const orders = new MockOrdersRepository(store); const invoices = new MockInvoicesRepository(store);
    await expect(new LegacyOrderViewService(orders, customers, invoices).getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: order.id })).rejects.toMatchObject({ code: "scope_mismatch" });
    await expect(new LegacyInvoiceViewService(invoices, orders, customers).getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: INVOICE_A.id, viewKind: "document" })).rejects.toMatchObject({ code: "scope_mismatch" });
  });
});
