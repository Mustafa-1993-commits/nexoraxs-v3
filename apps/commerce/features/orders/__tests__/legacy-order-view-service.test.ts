import { describe, expect, it } from "vitest";
import { LegacyCommerceRepositoryError, type LegacyCustomersRepository } from "@nexoraxs/contracts";
import { MemoryCommerceStore, MockCustomersRepository, MockInvoicesRepository, MockOrdersRepository } from "@nexoraxs/sdk/testing";
import { LegacyOrderViewService } from "../application/LegacyOrderViewService";
import { CUSTOMER_A } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("Order view service", () => { it("joins scoped relations without recalculating stored totals", async () => {
  const store = new MemoryCommerceStore([], { customers: [{ ...CUSTOMER_A, id: "customer-a" }], orders: [ORDER_A], invoices: [{ ...INVOICE_A, orderId: ORDER_A.id }] });
  const view = await new LegacyOrderViewService(new MockOrdersRepository(store), new MockCustomersRepository(store), new MockInvoicesRepository(store)).getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: ORDER_A.id });
  expect(view.customer?.name).toBe("Alpha Customer"); expect(view.invoice?.invoiceNumber).toBe("INV-A"); expect(view.order.total).toBe(11);
}); });

describe("Order view relationship failures", () => {
  const store = new MemoryCommerceStore([], { orders: [{ ...ORDER_A, customerId: "missing" }], invoices: [] });
  it("maps typed missing Customer to null", async () => {
    const service = new LegacyOrderViewService(new MockOrdersRepository(store), new MockCustomersRepository(store), new MockInvoicesRepository(store));
    await expect(service.getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: ORDER_A.id })).resolves.toMatchObject({ customer: null });
  });
  it.each(["invalid_scope", "scope_mismatch", "configured_failure", "storage_unavailable", "configuration"] as const)("propagates %s Customer failures", async (code) => {
    const failure = new LegacyCommerceRepositoryError({ code, operation: "customers.getById" });
    const customers = { getById: async () => { throw failure; } } as unknown as LegacyCustomersRepository;
    const service = new LegacyOrderViewService(new MockOrdersRepository(store), customers, new MockInvoicesRepository(store));
    await expect(service.getOrder({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, orderId: ORDER_A.id })).rejects.toBe(failure);
  });

  it("propagates an actual foreign-scope same-ID relation without disclosure", async () => {
    const customerId = "same-customer-id";
    const foreignStore = new MemoryCommerceStore([], {
      customers: [{
        ...CUSTOMER_A,
        id: customerId,
        workspaceId: "ws-foreign",
        businessUnitId: "bu-foreign",
      }],
      orders: [{ ...ORDER_A, customerId }],
      invoices: [],
    });
    const service = new LegacyOrderViewService(
      new MockOrdersRepository(foreignStore),
      new MockCustomersRepository(foreignStore),
      new MockInvoicesRepository(foreignStore),
    );

    await expect(service.getOrder({
      scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
      orderId: ORDER_A.id,
    })).rejects.toMatchObject({ code: "scope_mismatch" });
  });

  it.each([new Error("transport"), { kind: "unknown-failure" }])(
    "propagates future transport and unknown failures unchanged",
    async (failure) => {
      const customers = {
        getById: async () => { throw failure; },
      } as unknown as LegacyCustomersRepository;
      const service = new LegacyOrderViewService(
        new MockOrdersRepository(store),
        customers,
        new MockInvoicesRepository(store),
      );

      await expect(service.getOrder({
        scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
        orderId: ORDER_A.id,
      })).rejects.toBe(failure);
    },
  );
});
