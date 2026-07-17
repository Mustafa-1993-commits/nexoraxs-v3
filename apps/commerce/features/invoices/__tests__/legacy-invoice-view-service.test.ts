import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk";
import { LegacyInvoiceViewService } from "../application/LegacyInvoiceViewService";
import { CUSTOMER_A } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("Invoice view service", () => { it("preserves detail/document Customer-source compatibility and snapshots", async () => {
  const order = { ...ORDER_A, customerId: CUSTOMER_A.id }; const invoice = { ...INVOICE_A, orderId: order.id, customerId: null };
  const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A], orders: [order], invoices: [invoice] });
  const service = new LegacyInvoiceViewService(new MockInvoicesRepository(store), new MockOrdersRepository(store), new MockCustomersRepository(store));
  expect((await service.getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: invoice.id, viewKind: "detail" })).customer?.id).toBe(CUSTOMER_A.id);
  expect((await service.getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: invoice.id, viewKind: "document" })).customer).toBeNull();
}); });
