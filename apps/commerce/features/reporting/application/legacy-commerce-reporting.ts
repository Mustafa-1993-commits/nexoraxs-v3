import type { CommerceCustomer, CommerceOrder, CommerceProduct, CommerceReturn } from "@nexoraxs/types";

export function nxOrderDate(order: CommerceOrder | null): Date | null {
  if (!order?.createdAt) return null;
  const date = new Date(order.createdAt);
  if (!Number.isNaN(date.getTime())) return date;
  const match = String(order.createdAt).match(/(\d{4})-(\d{2})-(\d{2})[ T]?(\d{2})?:?(\d{2})?/);
  return match ? new Date(+match[1], +match[2] - 1, +match[3], +(match[4] || 0), +(match[5] || 0)) : null;
}

export function nxOrderTotal(order: CommerceOrder): number {
  if (typeof order.total === "number") return order.total;
  const gross = (order.items || []).reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
  return Math.max(0, gross - (order.discount || 0));
}

function periodFilter(period: string, now?: Date): (date: Date | null) => boolean {
  const reference = now || new Date();
  if (period === "today") return (date) => !!date
    && date.getFullYear() === reference.getFullYear()
    && date.getMonth() === reference.getMonth()
    && date.getDate() === reference.getDate();
  if (period === "week") {
    const start = new Date(reference);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);
    return (date) => !!date && date >= start && date <= reference;
  }
  return (date) => !!date && date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
}

export function nxOrdersForPeriod(orders: CommerceOrder[], period: string, now?: Date): CommerceOrder[] {
  const included = periodFilter(period, now);
  return (orders || []).filter((order) => {
    const date = nxOrderDate(order);
    return date ? included(date) : period === "month" || period === "week";
  });
}

export function nxRevenue(orders: CommerceOrder[]) {
  let gross = 0, vat = 0, net = 0;
  for (const order of orders || []) {
    gross += nxOrderTotal(order);
    vat += order.vat || 0;
    net += order.net || nxOrderTotal(order);
  }
  return { gross, vat, net, count: orders.length };
}

export function nxBestSellers(orders: CommerceOrder[], products: CommerceProduct[], limit = 5) {
  const grouped: Record<string, { name: string; category: string; qty: number; rev: number }> = {};
  for (const order of orders || []) for (const item of order.items || []) {
    const key = item.productId || item.name;
    if (!grouped[key]) {
      const product = (products || []).find((candidate) => candidate.id === item.productId || candidate.name === item.name);
      grouped[key] = { name: item.name || product?.name || "Item", category: product?.category || "—", qty: 0, rev: 0 };
    }
    grouped[key].qty += item.qty || 0;
    grouped[key].rev += (item.qty || 0) * (item.price || 0);
  }
  return Object.values(grouped).sort((left, right) => right.rev - left.rev).slice(0, limit);
}

export interface SalesBucket { label: string | number; total: number; key?: string }
export interface SalesGroup { buckets: SalesBucket[]; axis: string[]; kind: "hour" | "day" }

export function nxGroupSales(orders: CommerceOrder[], period: string, now?: Date): SalesGroup {
  const reference = now || new Date();
  if (period === "today") {
    const buckets: SalesBucket[] = Array.from({ length: 24 }, (_, hour) => ({ label: hour, total: 0 }));
    for (const order of orders || []) { const date = nxOrderDate(order); if (date) buckets[date.getHours()].total += nxOrderTotal(order); }
    return { buckets, axis: ["00", "06", "12", "18", "24"], kind: "hour" };
  }
  if (period === "week") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const buckets: SalesBucket[] = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(reference); date.setDate(date.getDate() - offset);
      buckets.push({ label: days[date.getDay()], total: 0, key: date.toDateString() });
    }
    for (const order of orders || []) {
      const date = nxOrderDate(order); const bucket = date && buckets.find((item) => item.key === date.toDateString());
      if (bucket) bucket.total += nxOrderTotal(order);
    }
    return { buckets, axis: buckets.map((item) => String(item.label)), kind: "day" };
  }
  const daysInMonth = new Date(reference.getFullYear(), reference.getMonth() + 1, 0).getDate();
  const buckets: SalesBucket[] = Array.from({ length: daysInMonth }, (_, index) => ({ label: index + 1, total: 0 }));
  for (const order of orders || []) {
    const date = nxOrderDate(order);
    if (date && date.getMonth() === reference.getMonth()) buckets[date.getDate() - 1].total += nxOrderTotal(order);
  }
  return { buckets, axis: ["1", String(Math.ceil(daysInMonth / 2)), String(daysInMonth)], kind: "day" };
}

export function nxNewCustomers(customers: CommerceCustomer[], period: string, now?: Date): number {
  const included = periodFilter(period, now);
  return (customers || []).filter((customer) => {
    if (!customer.createdAt) return false;
    const date = new Date(customer.createdAt);
    return !Number.isNaN(date.getTime()) && included(date);
  }).length;
}

export function nxReturnsForPeriod(returns: CommerceReturn[], period: string, now?: Date): CommerceReturn[] {
  const included = periodFilter(period, now);
  return (returns || []).filter((record) => {
    const date = record.createdAt ? new Date(record.createdAt) : null;
    return date && !Number.isNaN(date.getTime()) ? included(date) : period === "month" || period === "week";
  });
}

export function nxNetSales(orders: CommerceOrder[], returns: CommerceReturn[]) {
  const { gross, vat, count } = nxRevenue(orders);
  let returnTotal = 0, vatRefunded = 0;
  for (const record of returns || []) { returnTotal += record.total || 0; vatRefunded += record.vat || 0; }
  return { gross, returns: returnTotal, net: gross - returnTotal, vat, vatRefunded, count };
}
