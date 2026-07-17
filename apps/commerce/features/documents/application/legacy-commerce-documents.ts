import type { Branch, CommerceOrder, CommerceSetup, OrderItem } from "@nexoraxs/types";

/** Frontend-internal compatibility calculation. It is not a canonical tax contract. */
export function computeDoc(items: OrderItem[], setup: Partial<CommerceSetup>, discount = 0) {
  const rate = setup.vatRegistered ? (+setup.vatRate! || 0) : 0;
  const incl = setup.pricesIncludeTax ?? true;
  let gross = 0;
  let taxableGross = 0;
  const lines = (items || []).map((item) => {
    const lineTotal = (+item.price || 0) * (+item.qty || 0);
    gross += lineTotal;
    if (item.taxable !== false) taxableGross += lineTotal;
    const vat = item.taxable !== false && rate > 0
      ? incl ? lineTotal - lineTotal / (1 + rate / 100) : lineTotal * (rate / 100)
      : 0;
    return { name: item.name, qty: item.qty, price: item.price, vat, total: lineTotal };
  });
  const afterDiscount = gross - discount;
  const taxablePortion = gross > 0 ? Math.max(0, taxableGross - discount * (taxableGross / gross)) : 0;
  const vat = incl
    ? taxablePortion - taxablePortion / (1 + rate / 100)
    : taxablePortion * (rate / 100);
  const net = afterDiscount - (incl ? vat : 0);
  const total = incl ? afterDiscount : afterDiscount + vat;
  return { lines, gross, subtotal: gross, discount, net, vat, total, rate };
}

/** Uses only the stored Order snapshot; final refund policy remains deferred. */
export function computeReturnTotals(
  originalOrder: CommerceOrder,
  returnItems: { productId: string; qty: number }[],
) {
  const gross = originalOrder.subtotal || 0;
  const discount = originalOrder.discount || 0;
  const taxableGross = (originalOrder.items || [])
    .filter((item) => item.taxable !== false)
    .reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
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
  const lines = (returnItems || []).map((requested) => {
    const original = (originalOrder.items || []).find(
      (item) => item.productId === requested.productId || item.id === requested.productId,
    );
    const price = original?.price || 0;
    const qty = requested.qty;
    const lineGross = price * qty;
    const lineAfterDiscount = lineGross * (1 - discountRatio);
    const lineVat = original?.taxable !== false ? lineAfterDiscount * vatRatio : 0;
    const lineTotal = incl ? lineAfterDiscount : lineAfterDiscount + lineVat;
    subtotal += lineGross;
    vat += lineVat;
    total += lineTotal;
    return { productId: requested.productId, name: original?.name || "", qty, price, vat: lineVat, total: lineTotal };
  });
  return { lines, subtotal, vat, total, rate };
}

export interface ResolvedAddress {
  line1: string; line2: string; city: string; country: string; postalCode: string;
  lines: string[]; singleLine: string;
}

function compactAddress(input: {
  line1?: string | null; line2?: string | null; city?: string | null;
  country?: string | null; postalCode?: string | null;
}): ResolvedAddress {
  const line1 = input.line1?.trim() || "";
  const line2 = input.line2?.trim() || "";
  const city = input.city?.trim() || "";
  const country = input.country?.trim() || "";
  const postalCode = input.postalCode?.trim() || "";
  const lines = [line1, line2, [city, postalCode].filter(Boolean).join(" "), country].filter(Boolean);
  return { line1, line2, city, country, postalCode, lines, singleLine: lines.join(", ") };
}

export function getBusinessBillingAddress(setup: Partial<CommerceSetup> | null | undefined): ResolvedAddress {
  return compactAddress({
    line1: setup?.billingAddressLine1 || setup?.address,
    line2: setup?.billingAddressLine2,
    city: setup?.billingCity || setup?.city,
    country: setup?.billingCountry || setup?.country,
    postalCode: setup?.billingPostalCode,
  });
}

export function getBranchOperationalAddress(branch: Partial<Branch> | null | undefined): ResolvedAddress {
  return compactAddress({
    line1: branch?.branchAddressLine1 || branch?.address,
    line2: branch?.branchAddressLine2,
    city: branch?.branchCity || branch?.city,
    country: branch?.branchCountry || branch?.country,
    postalCode: branch?.postalCode,
  });
}
