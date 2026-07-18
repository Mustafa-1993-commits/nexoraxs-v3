import type { LegacyCommerceCommandContext } from "@nexoraxs/contracts";
import type {
  BranchInventory,
  CommerceCustomer,
  CommerceInvoice,
  CommerceOrder,
  CommerceProduct,
  CommerceReturn,
  StockMovement,
} from "@nexoraxs/types";

export const commerce055Scope = Object.freeze({
  workspaceId: "ws-055",
  legacyBusinessUnitId: "bu-055",
  branchId: "br-055",
});

export const commerce055ForeignScope = Object.freeze({
  workspaceId: "ws-foreign-055",
  legacyBusinessUnitId: "bu-055",
  branchId: "br-foreign-055",
});

export const commerce055Context: LegacyCommerceCommandContext = Object.freeze({
  ...commerce055Scope,
  actorId: "usr-055",
  actorDisplayName: "Feature 055 Cashier",
  osId: "commerce" as const,
  action: "order.create",
});

export const commerce055Product: CommerceProduct = Object.freeze({
  id: "product-055",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  osSubscriptionId: "sub-055",
  name: "Feature 055 Product",
  category: "General",
  sku: "SKU-055",
  barcode: "0550000000001",
  price: 100,
  cost: 50,
  taxable: true,
  stock: 10,
  lowStockThreshold: 2,
  notes: "",
  createdAt: "2026-07-17T00:00:00.000Z",
  updatedAt: "2026-07-17T00:00:00.000Z",
});

export const commerce055Customer: CommerceCustomer = Object.freeze({
  id: "customer-055",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  name: "Feature 055 Customer",
  phone: "+201000000055",
  email: "feature055@example.test",
  notes: "",
  createdAt: "2026-07-17T00:00:00.000Z",
  updatedAt: "2026-07-17T00:00:00.000Z",
});

export const commerce055Order: CommerceOrder = Object.freeze({
  id: "ord-055",
  orderNumber: "ORD-0001",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  customerId: commerce055Customer.id,
  items: [{ productId: commerce055Product.id, id: commerce055Product.id, name: commerce055Product.name, qty: 2, price: 100, taxable: true, sku: commerce055Product.sku }],
  payment: "cash",
  discount: 20,
  vat: 27,
  subtotal: 180,
  total: 207,
  net: 180,
  cashierId: commerce055Context.actorId,
  cashierName: commerce055Context.actorDisplayName,
  createdAt: "2026-07-17T00:00:01.000Z",
});

export const commerce055Position: BranchInventory = Object.freeze({
  id: "bi-055",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  productId: commerce055Product.id,
  qty: 8,
  lowStockThreshold: 2,
  updatedAt: "2026-07-17T00:00:02.000Z",
});

export const commerce055Movement: StockMovement = Object.freeze({
  id: "sm-055",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  productId: commerce055Product.id,
  qtyChange: -2,
  reason: "sale",
  reference: { type: "order" as const, id: commerce055Order.id },
  performedBy: commerce055Context.actorId,
  performedByName: commerce055Context.actorDisplayName,
  createdAt: "2026-07-17T00:00:03.000Z",
});

export const commerce055Invoice: CommerceInvoice = Object.freeze({
  id: "inv-055",
  invoiceNumber: "INV-1001",
  orderId: commerce055Order.id,
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  customerId: commerce055Customer.id,
  items: commerce055Order.items,
  subtotal: commerce055Order.subtotal,
  discount: commerce055Order.discount,
  vat: commerce055Order.vat,
  total: commerce055Order.total,
  net: commerce055Order.net,
  cashierId: commerce055Order.cashierId,
  cashierName: commerce055Order.cashierName,
  createdAt: "2026-07-17T00:00:04.000Z",
});

export const commerce055Return: CommerceReturn = Object.freeze({
  id: "ret-055",
  returnNumber: "RET-0001",
  workspaceId: commerce055Scope.workspaceId,
  businessUnitId: commerce055Scope.legacyBusinessUnitId,
  branchId: commerce055Scope.branchId,
  orderId: commerce055Order.id,
  invoiceId: commerce055Invoice.id,
  items: [{ productId: commerce055Product.id, name: commerce055Product.name, sku: commerce055Product.sku, qty: 1, price: 100, taxable: true }],
  reason: "Fixture return",
  refundMethod: "original",
  restock: true,
  subtotal: 100,
  vat: 15,
  total: 115,
  cashierId: commerce055Context.actorId,
  cashierName: commerce055Context.actorDisplayName,
  createdAt: "2026-07-17T00:00:05.000Z",
});

export type Commerce055FailureStage =
  | "inventory.prepare"
  | "orders.read"
  | "orders.create"
  | "inventory.positions.write"
  | "inventory.movements.write"
  | "orders.notify"
  | "inventory.notify"
  | "provider.order.publish"
  | "invoices.create"
  | "provider.invoice.publish"
  | "pos.last-order.write";

export function createCommerce055Deterministic(values: {
  readonly ids?: readonly string[];
  readonly times?: readonly string[];
} = {}) {
  const ids = values.ids ?? ["ord-055", "bi-055", "sm-055", "inv-055"];
  const times = values.times ?? [
    "2026-07-17T00:00:01.000Z",
    "2026-07-17T00:00:02.000Z",
    "2026-07-17T00:00:03.000Z",
    "2026-07-17T00:00:04.000Z",
  ];
  let idIndex = 0;
  let timeIndex = 0;
  return {
    createId: (prefix: string) => ids[idIndex++] ?? `${prefix}-${idIndex}`,
    now: () => times[timeIndex++] ?? times.at(-1) ?? "2026-07-17T00:00:00.000Z",
  };
}
