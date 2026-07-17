import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyCreateInvoiceCommand,
  LegacyCreateInvoiceResult,
  LegacyInvoiceCreationPort,
} from "@nexoraxs/contracts";
import { virtualLegacyCommerceSetup } from "../../setup/application/legacy-commerce-setup-policy";
import { createLegacyInvoice } from "./legacy-invoice-compatibility-policy";

export class LegacyInvoiceCreationService implements LegacyInvoiceCreationPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
  ) {}

  create(context: LegacyCommerceCommandContext, command: LegacyCreateInvoiceCommand): LegacyCreateInvoiceResult {
    const order = this.store.readOrders().find((item) => item.id === command.orderId);
    if (!order) throw new Error(`Order not found: ${command.orderId}`);
    const setup = this.store.readSetups().find((item) =>
      item.workspaceId === context.workspaceId && item.businessUnitId === context.legacyBusinessUnitId
    ) ?? virtualLegacyCommerceSetup({
      workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId,
      osSubscriptionId: "", industryOrPreset: "retail",
    });
    const invoices = [...this.store.readInvoices()];
    const scopedCount = invoices.filter((item) => item.businessUnitId === context.legacyBusinessUnitId).length;
    const invoice = createLegacyInvoice(
      order,
      `${setup.invoicePrefix}-${(setup.invoiceStart || 1001) + scopedCount}`,
      this.deterministic,
    );
    const nextInvoices = [...invoices, invoice];
    this.store.replaceInvoices(nextInvoices);
    void this.changes.invoicesChanged({
      scope: {
        workspaceId: invoice.workspaceId,
        legacyBusinessUnitId: invoice.businessUnitId,
        branchId: invoice.branchId,
      },
      invoiceId: invoice.id,
      orderId: order.id,
    }).catch(() => undefined);
    return { invoice, invoices: nextInvoices };
  }
}
