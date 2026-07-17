import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk";
import { LegacyOrderViewService } from "../../orders/application/LegacyOrderViewService";
import { LegacyInvoiceViewService } from "../../invoices/application/LegacyInvoiceViewService";
import { CUSTOMER_B } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("Commerce relation scope isolation", () => {
  it("keeps stored snapshots but never joins a foreign Customer", async () => {
    const order = { ...ORDER_A, customerId: CUSTOMER_B.id };
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_B], orders: [order], invoices: [{ ...INVOICE_A, orderId: order.id, customerId: CUSTOMER_B.id }] });
    const customers = new MockCustomersRepository(store); const orders = new MockOrdersRepository(store); const invoices = new MockInvoicesRepository(store);
    const orderView = await new LegacyOrderViewService(orders, customers, invoices).getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: order.id });
    expect(orderView.customer).toBeNull(); expect(orderView.order.items[0].name).toBe("Snapshot");
    const invoiceView = await new LegacyInvoiceViewService(invoices, orders, customers).getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: INVOICE_A.id, viewKind: "document" });
    expect(invoiceView.customer).toBeNull();
  });
});
