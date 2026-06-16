import type { OrderItem, CommerceSetup, CommerceOrder } from "@nexoraxs/types";

export function computeDoc(
  items: OrderItem[],
  setup: Partial<CommerceSetup>,
  discount = 0,
): {
  lines: Array<{ name: string; qty: number; price: number; vat: number; total: number }>;
  gross: number;
  subtotal: number;
  discount: number;
  net: number;
  vat: number;
  total: number;
  rate: number;
} {
  // rate is 0 if not VAT-registered — matches prototype computeDoc exactly
  const rate = setup.vatRegistered ? (+setup.vatRate! || 0) : 0;
  const incl = setup.pricesIncludeTax ?? true;
  let gross = 0;
  let taxableGross = 0;
  const lines = (items || []).map((i) => {
    const lineTotal = (+i.price || 0) * (+i.qty || 0);
    gross += lineTotal;
    if (i.taxable !== false) taxableGross += lineTotal;
    const lineVat =
      i.taxable !== false && rate > 0
        ? incl
          ? lineTotal - lineTotal / (1 + rate / 100)
          : lineTotal * (rate / 100)
        : 0;
    return { name: i.name, qty: i.qty, price: i.price, vat: lineVat, total: lineTotal };
  });
  // distribute discount proportionally onto taxable portion
  const afterDiscount = gross - discount;
  const taxablePortion =
    gross > 0 ? Math.max(0, taxableGross - discount * (taxableGross / gross)) : 0;
  const vat = incl
    ? taxablePortion - taxablePortion / (1 + rate / 100)
    : taxablePortion * (rate / 100);
  const net = afterDiscount - (incl ? vat : 0);
  const total = incl ? afterDiscount : afterDiscount + vat;
  return { lines, gross, subtotal: gross, discount, net, vat, total, rate };
}

/**
 * Pro-rates refund totals for a partial/full return from the *original* Order's own
 * items/subtotal/discount/vat/total ratios — never from current CommerceSetup or catalog
 * prices (FR-018). Mirrors computeDoc's discount-distribution and inclusive/exclusive-tax
 * rounding by reconstructing an effective discount ratio and VAT ratio from the order's
 * stored aggregates.
 */
export function computeReturnTotals(
  originalOrder: CommerceOrder,
  returnItems: { productId: string; qty: number }[],
): {
  lines: Array<{ productId: string; name: string; qty: number; price: number; vat: number; total: number }>;
  subtotal: number;
  vat: number;
  total: number;
  rate: number;
} {
  const gross = originalOrder.subtotal || 0;
  const discount = originalOrder.discount || 0;
  const taxableGross = (originalOrder.items || [])
    .filter((i) => i.taxable !== false)
    .reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);

  const discountRatio = gross > 0 ? discount / gross : 0;
  const taxablePortion = Math.max(0, taxableGross * (1 - discountRatio));
  const vatRatio = taxablePortion > 0 ? (originalOrder.vat || 0) / taxablePortion : 0;

  const afterDiscount = gross - discount;
  const incl = Math.abs((originalOrder.total ?? afterDiscount) - afterDiscount) < 0.01;
  const rate = incl
    ? (vatRatio > 0 && vatRatio < 1 ? (vatRatio / (1 - vatRatio)) * 100 : 0)
    : vatRatio * 100;

  let subtotal = 0;
  let vat = 0;
  let total = 0;
  const lines = (returnItems || []).map((ri) => {
    const original = (originalOrder.items || []).find(
      (i) => i.productId === ri.productId || i.id === ri.productId,
    );
    const price = original?.price || 0;
    const taxable = original?.taxable !== false;
    const qty = ri.qty;
    const lineGross = price * qty;
    const lineAfterDiscount = lineGross * (1 - discountRatio);
    const lineVat = taxable ? lineAfterDiscount * vatRatio : 0;
    const lineTotal = incl ? lineAfterDiscount : lineAfterDiscount + lineVat;
    subtotal += lineGross;
    vat += lineVat;
    total += lineTotal;
    return { productId: ri.productId, name: original?.name || "", qty, price, vat: lineVat, total: lineTotal };
  });

  return { lines, subtotal, vat, total, rate };
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
