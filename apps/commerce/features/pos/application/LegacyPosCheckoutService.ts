import type {
  LegacyCommerceCommandPublicationPort,
  LegacyInvoiceCreationPort,
  LegacyOrderCreationPort,
  LegacyPosCheckoutInput,
  LegacyPosCheckoutPort,
  LegacyPosCheckoutResult,
  LegacyPosLastOrderPort,
} from "@nexoraxs/contracts";

/** POS-owned synchronous multi-owner coordination; it adds no retry, rollback, or compensation. */
export class LegacyPosCheckoutService implements LegacyPosCheckoutPort {
  constructor(
    private readonly orders: LegacyOrderCreationPort,
    private readonly invoices: LegacyInvoiceCreationPort,
    private readonly publication: LegacyCommerceCommandPublicationPort,
    private readonly lastOrder: LegacyPosLastOrderPort,
  ) {}

  checkout(input: LegacyPosCheckoutInput): LegacyPosCheckoutResult {
    const orderResult = this.orders.create(input.context, {
      items: input.draft.items.map((item) => ({
        productId: item.id,
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        sku: item.sku,
        taxable: item.taxable,
      })),
      customerId: input.draft.customerId,
      payment: input.draft.payment,
      discount: input.draft.discount,
      vat: input.commercialSnapshot.vat,
      subtotal: input.commercialSnapshot.net,
      total: input.commercialSnapshot.total,
      net: input.commercialSnapshot.net,
    });
    this.publication.publishOrderResult(orderResult);
    const invoiceResult = this.invoices.create({
      ...input.context,
      action: "invoice.create",
      resourceId: orderResult.order.id,
    }, { orderId: orderResult.order.id });
    this.publication.publishInvoiceResult({
      invoice: invoiceResult.invoice,
      invoices: invoiceResult.invoices.filter((invoice) => (
        invoice.workspaceId === input.context.workspaceId
        && invoice.businessUnitId === input.context.legacyBusinessUnitId
        && invoice.branchId === (input.context.branchId ?? "")
      )),
    });
    this.lastOrder.write(orderResult.order.id);
    return {
      order: orderResult.order,
      invoice: invoiceResult.invoice,
      successRoute: "/pos/success",
    };
  }
}
