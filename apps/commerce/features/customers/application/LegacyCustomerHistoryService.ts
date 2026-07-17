import type { LegacyCommerceBusinessUnitScope, LegacyCustomerCompatibilityRecord, LegacyCustomersRepository, LegacyOrderCompatibilityRecord, LegacyOrdersRepository } from "@nexoraxs/contracts";

export interface LegacyCustomerHistoryView {
  readonly customer: LegacyCustomerCompatibilityRecord;
  readonly orders: readonly LegacyOrderCompatibilityRecord[];
  readonly count: number;
  readonly spent: number;
}

export class LegacyCustomerHistoryService {
  constructor(private readonly customers: LegacyCustomersRepository, private readonly orders: LegacyOrdersRepository) {}
  async getCustomerHistory(input: { scope: LegacyCommerceBusinessUnitScope; branchId?: string; customerId: string }): Promise<LegacyCustomerHistoryView> {
    const [customer, orderResult] = await Promise.all([
      this.customers.getById(input.scope, input.customerId),
      this.orders.list(input.scope, input.branchId ? { branchId: input.branchId } : {}),
    ]);
    const orders = orderResult.items.filter((order) => order.customerId === customer.id)
      .slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { customer, orders, count: orders.length, spent: orders.reduce((sum, order) => sum + order.total, 0) };
  }

  async listCustomerHistories(input: { scope: LegacyCommerceBusinessUnitScope; branchId?: string }): Promise<readonly LegacyCustomerHistoryView[]> {
    const [customers, orders] = await Promise.all([
      this.customers.list(input.scope),
      this.orders.list(input.scope, input.branchId ? { branchId: input.branchId } : {}),
    ]);
    return customers.items.map((customer) => {
      const history = orders.items.filter((order) => order.customerId === customer.id)
        .slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return { customer, orders: history, count: history.length, spent: history.reduce((sum, order) => sum + order.total, 0) };
    });
  }
}
