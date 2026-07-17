import { describe, expect, it } from "vitest";
import { LegacyCommerceRepositoryError, type LegacyOrdersRepository } from "@nexoraxs/contracts";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk/testing";
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

describe("Invoice view relationship failures", () => {
  const store = new MemoryCommerceStore([], { invoices: [INVOICE_A], orders: [] });
  it("maps a typed missing Order to null", async () => {
    const service = new LegacyInvoiceViewService(new MockInvoicesRepository(store), new MockOrdersRepository(store), new MockCustomersRepository(store));
    await expect(service.getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: INVOICE_A.id, viewKind: "detail" })).resolves.toMatchObject({ order: null, customer: null });
  });
  it.each(["invalid_scope", "scope_mismatch", "configured_failure", "storage_unavailable", "configuration"] as const)("propagates %s Order failures", async (code) => {
    const failure = new LegacyCommerceRepositoryError({ code, operation: "orders.getById" });
    const orders = { getById: async () => { throw failure; } } as unknown as LegacyOrdersRepository;
    const service = new LegacyInvoiceViewService(new MockInvoicesRepository(store), orders, new MockCustomersRepository(store));
    await expect(service.getInvoice({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, invoiceId: INVOICE_A.id, viewKind: "detail" })).rejects.toBe(failure);
  });

  it("propagates an actual foreign-scope same-ID relation without disclosure", async () => {
    const orderId = "same-order-id";
    const foreignStore = new MemoryCommerceStore([], {
      customers: [],
      orders: [{
        ...ORDER_A,
        id: orderId,
        workspaceId: "ws-foreign",
        businessUnitId: "bu-foreign",
      }],
      invoices: [{ ...INVOICE_A, orderId }],
    });
    const service = new LegacyInvoiceViewService(
      new MockInvoicesRepository(foreignStore),
      new MockOrdersRepository(foreignStore),
      new MockCustomersRepository(foreignStore),
    );

    await expect(service.getInvoice({
      scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
      invoiceId: INVOICE_A.id,
      viewKind: "detail",
    })).rejects.toMatchObject({ code: "scope_mismatch" });
  });

  it.each([new Error("transport"), { kind: "unknown-failure" }])(
    "propagates future transport and unknown failures unchanged",
    async (failure) => {
      const orders = {
        getById: async () => { throw failure; },
      } as unknown as LegacyOrdersRepository;
      const service = new LegacyInvoiceViewService(
        new MockInvoicesRepository(store),
        orders,
        new MockCustomersRepository(store),
      );

      await expect(service.getInvoice({
        scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
        invoiceId: INVOICE_A.id,
        viewKind: "detail",
      })).rejects.toBe(failure);
    },
  );
});
