import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockCustomersRepository, MockOrdersRepository } from "@nexoraxs/sdk";
import { LegacyCustomerHistoryService } from "../application/LegacyCustomerHistoryService";
import { CUSTOMER_A } from "../../../../../packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("LegacyCustomerHistoryService", () => {
  it("derives metrics from scoped stored Order snapshots", async () => {
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A], orders: [{ ...ORDER_A, customerId: CUSTOMER_A.id }] });
    const service = new LegacyCustomerHistoryService(new MockCustomersRepository(store), new MockOrdersRepository(store));
    const view = await service.getCustomerHistory({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, branchId: "br-a", customerId: CUSTOMER_A.id });
    expect(view).toMatchObject({ count: 1, spent: 11 });
    expect(view.orders[0].subtotal).toBe(10);
  });
});
