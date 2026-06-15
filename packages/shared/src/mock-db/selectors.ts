import type { CommerceCustomer, CommerceOrder, CommerceProduct, WorkspaceStorageUsage } from "@nexoraxs/types";
import type { Lang } from "./schema";

export function money(n: number, lang: Lang = "en"): string {
  const v = (Math.round(n * 100) / 100).toLocaleString("en-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return lang === "ar" ? `${v} ج.م` : `${v} EGP`;
}

export function taxBreak(
  gross: number,
  rate: number,
  taxable: boolean,
): { net: number; vat: number; total: number } {
  if (!taxable || !rate) return { net: gross, vat: 0, total: gross };
  const net = gross / (1 + rate / 100);
  const vat = gross - net;
  return { net, vat, total: gross };
}

export function nxOrderDate(o: CommerceOrder | null): Date | null {
  if (!o) return null;
  const raw = o.createdAt || null;
  if (!raw) return null;
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d;
  const m = String(raw).match(/(\d{4})-(\d{2})-(\d{2})[ T]?(\d{2})?:?(\d{2})?/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0));
  return null;
}

export function nxOrderTotal(o: CommerceOrder): number {
  if (typeof o.total === "number") return o.total;
  const items = o.items || [];
  const gross = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);
  return Math.max(0, gross - (o.discount || 0));
}

function nxPeriodFilter(period: string, now?: Date): (d: Date | null) => boolean {
  const ref = now || new Date();
  if (period === "today") {
    return (d) =>
      !!d &&
      d.getFullYear() === ref.getFullYear() &&
      d.getMonth() === ref.getMonth() &&
      d.getDate() === ref.getDate();
  }
  if (period === "week") {
    const start = new Date(ref);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);
    return (d) => !!d && d >= start && d <= ref;
  }
  return (d) => !!d && d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function nxOrdersForPeriod(orders: CommerceOrder[], period: string, now?: Date): CommerceOrder[] {
  const inP = nxPeriodFilter(period, now);
  return (orders || []).filter((o) => {
    const d = nxOrderDate(o);
    return d ? inP(d) : period === "month" || period === "week";
  });
}

export function nxRevenue(
  orders: CommerceOrder[],
): { gross: number; vat: number; net: number; count: number } {
  let gross = 0, vat = 0, net = 0;
  (orders || []).forEach((o) => {
    gross += nxOrderTotal(o);
    vat += o.vat || 0;
    net += o.net || nxOrderTotal(o);
  });
  return { gross, vat, net, count: orders.length };
}

export function nxBestSellers(
  orders: CommerceOrder[],
  products: CommerceProduct[],
  limit = 5,
): Array<{ name: string; category: string; qty: number; rev: number }> {
  const byProd: Record<string, { name: string; category: string; qty: number; rev: number }> = {};
  (orders || []).forEach((o) =>
    (o.items || []).forEach((i) => {
      const key = i.productId || i.name;
      if (!byProd[key]) {
        const prod = (products || []).find((p) => p.id === i.productId || p.name === i.name);
        byProd[key] = { name: i.name || prod?.name || "Item", category: prod?.category || "—", qty: 0, rev: 0 };
      }
      byProd[key].qty += i.qty || 0;
      byProd[key].rev += (i.qty || 0) * (i.price || 0);
    }),
  );
  return Object.values(byProd)
    .sort((a, b) => b.rev - a.rev)
    .slice(0, limit);
}

export interface SalesBucket { label: string | number; total: number; key?: string }
export interface SalesGroup { buckets: SalesBucket[]; axis: string[]; kind: "hour" | "day" }

export function nxGroupSales(orders: CommerceOrder[], period: string, now?: Date): SalesGroup {
  const ref = now || new Date();
  if (period === "today") {
    const buckets: SalesBucket[] = Array.from({ length: 24 }, (_, h) => ({ label: h, total: 0 }));
    (orders || []).forEach((o) => {
      const d = nxOrderDate(o);
      if (d) buckets[d.getHours()].total += nxOrderTotal(o);
    });
    return { buckets, axis: ["00", "06", "12", "18", "24"], kind: "hour" };
  }
  if (period === "week") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const buckets: SalesBucket[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(ref);
      d.setDate(d.getDate() - i);
      buckets.push({ label: days[d.getDay()], total: 0, key: d.toDateString() });
    }
    (orders || []).forEach((o) => {
      const d = nxOrderDate(o);
      if (!d) return;
      const b = buckets.find((x) => x.key === d.toDateString());
      if (b) b.total += nxOrderTotal(o);
    });
    return { buckets, axis: buckets.map((b) => String(b.label)), kind: "day" };
  }
  const daysIn = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate();
  const buckets: SalesBucket[] = Array.from({ length: daysIn }, (_, i) => ({ label: i + 1, total: 0 }));
  (orders || []).forEach((o) => {
    const d = nxOrderDate(o);
    if (d && d.getMonth() === ref.getMonth()) buckets[d.getDate() - 1].total += nxOrderTotal(o);
  });
  return { buckets, axis: ["1", String(Math.ceil(daysIn / 2)), String(daysIn)], kind: "day" };
}

export function nxNewCustomers(customers: CommerceCustomer[], period: string, now?: Date): number {
  const inP = nxPeriodFilter(period, now);
  return (customers || []).filter((c) => {
    if (!c.createdAt) return false;
    const d = new Date(c.createdAt);
    return !isNaN(d.getTime()) && inP(d);
  }).length;
}

export function storageUsagePercent(usage: WorkspaceStorageUsage | null): number {
  if (!usage || !usage.limitBytes) return 0;
  const pct = (usage.usedBytes / usage.limitBytes) * 100;
  return Math.max(0, Math.min(100, pct));
}

export function formatBytes(bytes: number, lang: Lang = "en"): string {
  const safe = Math.max(0, bytes || 0);
  const units = lang === "ar" ? ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"] : ["B", "KB", "MB", "GB"];
  let value = safe;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = unitIndex === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

export function remainingBytes(usage: WorkspaceStorageUsage | null): number {
  if (!usage) return 0;
  return Math.max(0, usage.limitBytes - usage.usedBytes);
}

export { computeDoc, fmtDate } from "../commerce/documents";
