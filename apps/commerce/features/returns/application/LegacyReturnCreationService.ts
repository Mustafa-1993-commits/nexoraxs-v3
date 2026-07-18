import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyCreateReturnCommand,
  LegacyCreateReturnResult,
  LegacyReturnCreationPort,
  LegacyOrderReturnHandoffPort,
} from "@nexoraxs/contracts";
import type { CommerceReturnItem, StockMovement } from "@nexoraxs/types";
import { createLegacyStockMovement, legacyEffectiveStock } from "../../inventory/application/legacy-inventory-policy";
import { createLegacyReturn, legacyReturnTotals } from "./legacy-return-compatibility-policy";

export class LegacyReturnCreationService implements LegacyReturnCreationPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
    private readonly orders: LegacyOrderReturnHandoffPort,
  ) {}

  create(context: LegacyCommerceCommandContext, command: LegacyCreateReturnCommand): LegacyCreateReturnResult {
    const scope = {
      workspaceId: context.workspaceId,
      legacyBusinessUnitId: context.legacyBusinessUnitId,
      branchId: context.branchId ?? "",
    };
    const order = this.orders.getOrder(scope, command.orderId);
    if (!order || command.items.length === 0) {
      return { ok: false, error: "return_rejected" };
    }
    const returns = [...this.store.readReturns()];
    const existingReturns = returns.filter((item) => item.orderId === order.id);
    const returned: Record<string, number> = {};
    for (const record of existingReturns) for (const item of record.items) returned[item.productId] = (returned[item.productId] || 0) + item.qty;
    for (const item of command.items) {
      if (!Number.isInteger(item.qty) || item.qty <= 0) return { ok: false, error: "return_rejected" };
      const original = order.items.find((candidate) => candidate.productId === item.productId || candidate.id === item.productId);
      if (!original || item.qty > original.qty - (returned[item.productId] || 0)) return { ok: false, error: "return_rejected" };
    }
    const totals = legacyReturnTotals(order, command.items);
    const returnItems: CommerceReturnItem[] = totals.lines.map((line) => {
      const original = order.items.find((item) => item.productId === line.productId || item.id === line.productId);
      return { productId: line.productId, name: line.name, sku: original?.sku, qty: line.qty, price: line.price, taxable: original?.taxable !== false };
    });
    const invoices = [...this.store.readInvoices()];
    const invoice = invoices.find((item) => item.orderId === order.id) ?? null;
    const number = `RET-${String(returns.filter((item) => item.businessUnitId === context.legacyBusinessUnitId).length + 1).padStart(4, "0")}`;
    const record = createLegacyReturn({
      returnNumber: number, workspaceId: order.workspaceId, businessUnitId: order.businessUnitId,
      branchId: order.branchId, orderId: order.id, invoiceId: invoice?.id ?? null,
      items: returnItems, reason: command.reason, refundMethod: command.refundMethod,
      restock: command.restock, subtotal: totals.subtotal, vat: totals.vat, total: totals.total,
      cashierId: context.actorId, cashierName: context.actorDisplayName || "Cashier",
    }, this.deterministic);
    const products = this.store.readProducts();
    let positions = [...this.store.readPositions()];
    const createdMovements: StockMovement[] = [];
    if (command.restock) {
      for (const item of command.items) {
        const product = products.find((candidate) => candidate.id === item.productId);
        if (!product) continue;
        const effective = legacyEffectiveStock(product, order.branchId, positions);
        const existing = positions.find((candidate) => candidate.productId === product.id && candidate.branchId === order.branchId);
        const qty = effective.qty + item.qty;
        positions = existing
          ? positions.map((candidate) => candidate.id === existing.id ? { ...candidate, qty, updatedAt: this.deterministic.now() } : candidate)
          : [...positions, {
              id: this.deterministic.createId("bi"), workspaceId: order.workspaceId, businessUnitId: order.businessUnitId,
              branchId: order.branchId, productId: product.id, qty,
              lowStockThreshold: effective.lowStockThreshold, updatedAt: this.deterministic.now(),
            }];
        createdMovements.push(createLegacyStockMovement({
          workspaceId: order.workspaceId, businessUnitId: order.businessUnitId, branchId: order.branchId,
          productId: product.id, qtyChange: item.qty, reason: "return", reference: { type: "return", id: record.id },
          performedBy: context.actorId, performedByName: context.actorDisplayName || "Cashier",
        }, this.deterministic));
      }
    }
    const fullyReturned = order.items.every((item) => {
      const key = item.productId || item.id || "";
      return (returned[key] || 0) + (command.items.find((candidate) => candidate.productId === key)?.qty || 0) >= item.qty;
    });
    const nextOrders = this.orders.applyPatch(scope, order.id, {
      returnStatus: fullyReturned ? "returned" : "partial",
      returnedTotalIncrement: totals.total,
      returnId: record.id,
    });
    const nextInvoices = invoice
      ? invoices.map((item) => item.id === invoice.id ? { ...item, returnIds: [...(item.returnIds || []), record.id] } : item)
      : invoices;
    if (invoice) this.store.replaceInvoices(nextInvoices);
    const nextReturns = [...returns, record];
    this.store.replaceReturns(nextReturns);
    let movements = [...this.store.readMovements()];
    if (command.restock) {
      movements = [...movements, ...createdMovements];
      this.store.replacePositions(positions);
      this.store.replaceMovements(movements);
    }
    void this.changes.ordersChanged({ scope, orderId: order.id, customerId: order.customerId }).catch(() => undefined);
    if (invoice) void this.changes.invoicesChanged({ scope, invoiceId: invoice.id, orderId: order.id }).catch(() => undefined);
    if (command.restock) void this.changes.inventoryChanged({ scope }).catch(() => undefined);
    return { ok: true, returnRecord: record, orders: nextOrders, invoices: nextInvoices, returns: nextReturns, branchInventory: positions, stockMovements: movements };
  }
}
