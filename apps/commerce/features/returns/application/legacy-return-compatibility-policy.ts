import type { LegacyCommerceDeterministicDependencies } from "@nexoraxs/contracts";
import type { CommerceOrder, CommerceReturn, CommerceReturnItem, RefundMethod } from "@nexoraxs/types";

export function legacyReturnTotals(order: CommerceOrder, items: readonly { productId: string; qty: number }[]) {
  const gross = order.subtotal || 0;
  const discount = order.discount || 0;
  const taxableGross = order.items.filter((item) => item.taxable !== false)
    .reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
  const discountRatio = gross > 0 ? discount / gross : 0;
  const taxablePortion = Math.max(0, taxableGross * (1 - discountRatio));
  const vatRatio = taxablePortion > 0 ? (order.vat || 0) / taxablePortion : 0;
  const afterDiscount = gross - discount;
  const inclusive = Math.abs((order.total ?? afterDiscount) - afterDiscount) < 0.01;
  let subtotal = 0, vat = 0, total = 0;
  const lines = items.map((requested) => {
    const original = order.items.find((item) => item.productId === requested.productId || item.id === requested.productId);
    const price = original?.price || 0;
    const lineGross = price * requested.qty;
    const afterLineDiscount = lineGross * (1 - discountRatio);
    const lineVat = original?.taxable !== false ? afterLineDiscount * vatRatio : 0;
    const lineTotal = inclusive ? afterLineDiscount : afterLineDiscount + lineVat;
    subtotal += lineGross; vat += lineVat; total += lineTotal;
    return { productId: requested.productId, name: original?.name || "", qty: requested.qty, price };
  });
  return { lines, subtotal, vat, total };
}

export function createLegacyReturn(input: {
  returnNumber: string; workspaceId: string; businessUnitId: string; branchId: string;
  orderId: string; invoiceId: string | null; items: CommerceReturnItem[]; reason: string;
  refundMethod: RefundMethod; restock: boolean; subtotal: number; vat: number; total: number;
  cashierId: string; cashierName: string;
}, deterministic: LegacyCommerceDeterministicDependencies): CommerceReturn {
  return { id: deterministic.createId("ret"), ...input, createdAt: deterministic.now() };
}
