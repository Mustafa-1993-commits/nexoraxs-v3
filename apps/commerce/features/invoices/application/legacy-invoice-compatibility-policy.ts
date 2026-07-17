import type { LegacyCommerceDeterministicDependencies } from "@nexoraxs/contracts";
import type { CommerceInvoice, CommerceOrder } from "@nexoraxs/types";

export function createLegacyInvoice(
  order: CommerceOrder,
  invoiceNumber: string,
  deterministic: LegacyCommerceDeterministicDependencies,
): CommerceInvoice {
  return {
    id: deterministic.createId("inv"), invoiceNumber, orderId: order.id,
    workspaceId: order.workspaceId, businessUnitId: order.businessUnitId, branchId: order.branchId,
    customerId: order.customerId, items: structuredClone(order.items), subtotal: order.subtotal,
    discount: order.discount, vat: order.vat, total: order.total, net: order.net,
    cashierId: order.cashierId, cashierName: order.cashierName, createdAt: deterministic.now(),
  };
}
