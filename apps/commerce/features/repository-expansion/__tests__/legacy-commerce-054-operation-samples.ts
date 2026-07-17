import type { CommerceChangeNotificationPort, LegacyCommerceCommandContext } from "@nexoraxs/contracts";
import type { Branch, CommerceInvoice, CommerceOrder, CommerceProduct } from "@nexoraxs/types";
import { vi } from "vitest";

export const operationContext: LegacyCommerceCommandContext = {
  workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br-a",
  actorId: "user", actorDisplayName: "Cashier", osId: "commerce", action: "test",
};

export const operationProduct: CommerceProduct = {
  id: "p", workspaceId: "ws", businessUnitId: "bu", branchId: "br-a", osSubscriptionId: "sub",
  name: "Product", category: "General", sku: "SKU", barcode: "", price: 100, cost: 50,
  taxable: true, stock: 10, lowStockThreshold: 2, notes: "", createdAt: "created", updatedAt: "updated",
};

export const operationBranches: Branch[] = [
  { id: "br-a", workspaceId: "ws", businessUnitId: "bu", name: "A", isMain: true, createdAt: "created" },
  { id: "br-b", workspaceId: "ws", businessUnitId: "bu", name: "B", isMain: false, createdAt: "created" },
];

export const operationOrder: CommerceOrder = {
  id: "ord", orderNumber: "ORD-0001", workspaceId: "ws", businessUnitId: "bu", branchId: "br-a",
  customerId: "customer", items: [{ productId: "p", name: "Product", qty: 2, price: 100, taxable: true }],
  payment: "cash", discount: 20, vat: 27, subtotal: 200, total: 180, net: 153,
  cashierId: "user", cashierName: "Cashier", createdAt: "created",
};

export const operationInvoice: CommerceInvoice = {
  id: "inv", invoiceNumber: "INV-1001", orderId: "ord", workspaceId: "ws", businessUnitId: "bu",
  branchId: "br-a", customerId: "customer", items: operationOrder.items, subtotal: 200, discount: 20,
  vat: 27, total: 180, net: 153, cashierId: "user", cashierName: "Cashier", createdAt: "created",
};

export function deterministic() {
  let index = 0;
  return {
    createId: (prefix: string) => `${prefix}-${++index}`,
    now: () => "2026-07-17T00:00:00.000Z",
  };
}

export function notificationSpies(): CommerceChangeNotificationPort {
  return {
    productsChanged: vi.fn(async () => undefined),
    customersChanged: vi.fn(async () => undefined),
    inventoryChanged: vi.fn(async () => undefined),
    ordersChanged: vi.fn(async () => undefined),
    invoicesChanged: vi.fn(async () => undefined),
  };
}
