import type { LegacyCommerceCommandContext, LegacyCommerceDeterministicDependencies, LegacyCreateOrderCommand } from "@nexoraxs/contracts";
import type { CommerceOrder } from "@nexoraxs/types";

export function createLegacyOrder(
  context: LegacyCommerceCommandContext,
  command: LegacyCreateOrderCommand,
  orderNumber: string,
  deterministic: LegacyCommerceDeterministicDependencies,
): CommerceOrder {
  return {
    id: deterministic.createId("ord"), orderNumber, workspaceId: context.workspaceId,
    businessUnitId: context.legacyBusinessUnitId, branchId: context.branchId ?? "",
    cashierId: context.actorId, cashierName: context.actorDisplayName || "Cashier",
    createdAt: deterministic.now(),
    items: structuredClone([...command.items]), customerId: command.customerId, payment: command.payment,
    discount: command.discount, vat: command.vat, subtotal: command.subtotal,
    total: command.total, net: command.net,
  };
}
