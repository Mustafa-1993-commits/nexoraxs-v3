import type { LegacyCommerceBranchScope, LegacyCommerceBusinessUnitScope, LegacyCustomerCompatibilityRecord, LegacyCustomersRepository, LegacyInvoiceCompatibilityRecord, LegacyInvoicesRepository, LegacyOrderCompatibilityRecord, LegacyOrdersRepository } from "@nexoraxs/contracts";

export interface LegacyInvoiceView {
  readonly invoice: LegacyInvoiceCompatibilityRecord;
  readonly order: LegacyOrderCompatibilityRecord | null;
  readonly customer: LegacyCustomerCompatibilityRecord | null;
}
async function optional<T>(read: () => Promise<T>): Promise<T | null> { try { return await read(); } catch { return null; } }
export class LegacyInvoiceViewService {
  constructor(private readonly invoices: LegacyInvoicesRepository, private readonly orders: LegacyOrdersRepository, private readonly customers: LegacyCustomersRepository) {}
  async listInvoices(input: { scope: LegacyCommerceBranchScope }): Promise<readonly LegacyInvoiceView[]> {
    const invoices = await this.invoices.list(input.scope, { branchId: input.scope.branchId });
    return Promise.all(invoices.items.map(async (invoice) => {
      const order = await optional(() => this.orders.getById(input.scope, invoice.orderId));
      return { invoice, order, customer: null };
    }));
  }
  async getInvoice(input: { scope: LegacyCommerceBusinessUnitScope; invoiceId: string; viewKind: "detail" | "document" }): Promise<LegacyInvoiceView> {
    const invoice = await this.invoices.getById(input.scope, input.invoiceId);
    const order = await optional(() => this.orders.getById(input.scope, invoice.orderId));
    const customerId = input.viewKind === "detail" ? order?.customerId : invoice.customerId;
    const customer = customerId ? await optional(() => this.customers.getById(input.scope, customerId)) : null;
    return { invoice, order, customer };
  }
}
