import type { LegacyCommerceBranchScope, LegacyCommerceBusinessUnitScope, LegacyCustomerCompatibilityRecord, LegacyCustomersRepository, LegacyInvoiceCompatibilityRecord, LegacyInvoicesRepository, LegacyOrderCompatibilityRecord, LegacyOrdersRepository } from "@nexoraxs/contracts";

export interface LegacyOrderView {
  readonly order: LegacyOrderCompatibilityRecord;
  readonly customer: LegacyCustomerCompatibilityRecord | null;
  readonly invoice: LegacyInvoiceCompatibilityRecord | null;
}
async function optional<T>(read: () => Promise<T>): Promise<T | null> { try { return await read(); } catch { return null; } }
export class LegacyOrderViewService {
  constructor(private readonly orders: LegacyOrdersRepository, private readonly customers: LegacyCustomersRepository, private readonly invoices: LegacyInvoicesRepository) {}
  async listOrders(input: { scope: LegacyCommerceBranchScope }): Promise<readonly LegacyOrderView[]> {
    const [orders, invoices] = await Promise.all([
      this.orders.list(input.scope, { branchId: input.scope.branchId }),
      this.invoices.list(input.scope, { branchId: input.scope.branchId }),
    ]);
    const invoiceByOrder = new Map(invoices.items.map((invoice) => [invoice.orderId, invoice]));
    return Promise.all(orders.items.map(async (order) => ({
      order,
      customer: order.customerId ? await optional(() => this.customers.getById(input.scope, order.customerId!)) : null,
      invoice: invoiceByOrder.get(order.id) ?? null,
    })));
  }
  async getOrder(input: { scope: LegacyCommerceBusinessUnitScope; orderId: string }): Promise<LegacyOrderView> {
    const order = await this.orders.getById(input.scope, input.orderId);
    const [customer, invoices] = await Promise.all([
      order.customerId ? optional(() => this.customers.getById(input.scope, order.customerId!)) : Promise.resolve(null),
      this.invoices.list(input.scope),
    ]);
    return { order, customer, invoice: invoices.items.find((invoice) => invoice.orderId === order.id) ?? null };
  }
}
