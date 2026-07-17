import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk";
import { LegacyOrderViewService } from "../application/LegacyOrderViewService";
import { CUSTOMER_A } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("Order view service", () => { it("joins scoped relations without recalculating stored totals", async () => {
  const store = new MemoryCommerceStore([], { customers: [{ ...CUSTOMER_A, id: "customer-a" }], orders: [ORDER_A], invoices: [{ ...INVOICE_A, orderId: ORDER_A.id }] });
  const view = await new LegacyOrderViewService(new MockOrdersRepository(store), new MockCustomersRepository(store), new MockInvoicesRepository(store)).getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: ORDER_A.id });
  expect(view.customer?.name).toBe("Alpha Customer"); expect(view.invoice?.invoiceNumber).toBe("INV-A"); expect(view.order.total).toBe(11);
}); });
