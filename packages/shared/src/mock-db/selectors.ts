import type {
  CommerceCustomer, CommerceOrder, CommerceProduct, WorkspaceStorageUsage,
  BranchInventory, CommerceReturn, Branch, BusinessUnit, OSEnablement, OSSubscription,
  CommerceSetup,
} from "@nexoraxs/types";
import type { Lang } from "./schema";
import { nowISO, uid } from "./actions";

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

export function nxBranchInventoryMap(
  branchInventory: BranchInventory[],
  branchId: string,
): Record<string, BranchInventory> {
  const map: Record<string, BranchInventory> = {};
  (branchInventory || []).forEach((bi) => {
    if (bi.branchId === branchId) map[bi.productId] = bi;
  });
  return map;
}

export function nxReturnsForPeriod(returns: CommerceReturn[], period: string, now?: Date): CommerceReturn[] {
  const inP = nxPeriodFilter(period, now);
  return (returns || []).filter((r) => {
    const d = r.createdAt ? new Date(r.createdAt) : null;
    return d && !isNaN(d.getTime()) ? inP(d) : period === "month" || period === "week";
  });
}

export function nxNetSales(
  periodOrders: CommerceOrder[],
  periodReturns: CommerceReturn[],
): { gross: number; returns: number; net: number; vat: number; vatRefunded: number; count: number } {
  const { gross, vat, count } = nxRevenue(periodOrders);
  let returnsTotal = 0;
  let vatRefunded = 0;
  (periodReturns || []).forEach((r) => {
    returnsTotal += r.total || 0;
    vatRefunded += r.vat || 0;
  });
  return { gross, returns: returnsTotal, net: gross - returnsTotal, vat, vatRefunded, count };
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

function normalizeId(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function normalizeBranchIds(enablement: OSEnablement): string[] {
  const ids = new Set<string>();
  enablement.branchIds?.forEach((id) => {
    const normalized = normalizeId(id);
    if (normalized) ids.add(normalized);
  });
  const legacyBranchId = normalizeId(enablement.branchId);
  if (legacyBranchId) ids.add(legacyBranchId);
  return [...ids];
}

export function normalizeOSEnablement(enablement: OSEnablement): OSEnablement {
  return {
    ...enablement,
    businessUnitId: enablement.businessUnitId ?? null,
    branchIds: normalizeBranchIds(enablement),
  };
}

export function getWorkspaceOSEnablements(
  enablements: OSEnablement[],
  workspaceId: string | null | undefined,
): OSEnablement[] {
  if (!workspaceId) return [];
  return (enablements || [])
    .map(normalizeOSEnablement)
    .filter((enablement) => enablement.workspaceId === workspaceId);
}

export function getBusinessOSEnablements(
  enablements: OSEnablement[],
  workspaceId: string | null | undefined,
  businessUnitId: string | null | undefined,
  options: { includeWorkspace?: boolean } = {},
): OSEnablement[] {
  if (!workspaceId || !businessUnitId) return [];
  return getWorkspaceOSEnablements(enablements, workspaceId).filter((enablement) => {
    if (enablement.scope === "workspace") return options.includeWorkspace === true;
    return enablement.businessUnitId === businessUnitId;
  });
}

export function getCurrentOSEnablement(input: {
  enablements: OSEnablement[];
  workspaceId: string | null | undefined;
  osId: string | null | undefined;
  businessUnitId?: string | null;
  branchId?: string | null;
}): OSEnablement | null {
  if (!input.workspaceId || !input.osId) return null;
  const active = getWorkspaceOSEnablements(input.enablements, input.workspaceId)
    .filter((enablement) => enablement.osId === input.osId && enablement.status === "active");
  const branchId = normalizeId(input.branchId);
  const businessUnitId = normalizeId(input.businessUnitId);

  if (branchId) {
    const branchScoped = active.find((enablement) =>
      enablement.scope === "branch" &&
      enablement.businessUnitId === businessUnitId &&
      normalizeBranchIds(enablement).includes(branchId),
    );
    if (branchScoped) return branchScoped;
  }

  if (businessUnitId) {
    const businessScoped = active.find((enablement) =>
      enablement.scope === "business" && enablement.businessUnitId === businessUnitId,
    );
    if (businessScoped) return businessScoped;
  }

  return active.find((enablement) => enablement.scope === "workspace") ?? null;
}

export function isOSEnabledForBusiness(
  enablements: OSEnablement[],
  workspaceId: string | null | undefined,
  osId: string | null | undefined,
  businessUnitId: string | null | undefined,
): boolean {
  if (!workspaceId || !osId || !businessUnitId) return false;
  return getBusinessOSEnablements(enablements, workspaceId, businessUnitId, { includeWorkspace: true })
    .some((enablement) => enablement.osId === osId && enablement.status === "active");
}

export function industryTypeFromPreset(preset: string | null | undefined): string {
  const value = normalizeId(preset);
  if (!value) return "other";
  if (value === "retail_store") return "retail";
  if (value === "restaurant_cafe") return "restaurant";
  if (value === "electronics_mobile") return "electronics";
  if (value === "clothing_fashion") return "fashion";
  return value;
}

export function getBusinessIndustryType(businessUnit: Pick<BusinessUnit, "industryType" | "presetId" | "preset"> | null | undefined): string {
  return businessUnit?.industryType || industryTypeFromPreset(businessUnit?.presetId || businessUnit?.preset);
}

export function suggestCommercePresetForIndustry(industryType: string | null | undefined): string {
  const value = normalizeId(industryType)?.toLowerCase().replace(/\s*\/\s*/g, "_").replace(/[\s-]+/g, "_");
  if (!value) return "retail_store";
  if (value === "retail" || value === "retail_store") return "retail_store";
  if (value === "pharmacy") return "pharmacy";
  if (value === "supermarket") return "supermarket";
  if (value === "restaurant" || value === "restaurant_cafe" || value === "cafe") return "restaurant_cafe";
  if (value === "electronics" || value === "electronics_mobile" || value === "mobile") return "electronics_mobile";
  if (value === "fashion" || value === "clothing" || value === "clothing_fashion" || value === "fashion_clothing") return "clothing_fashion";
  if (value === "cosmetics") return "cosmetics";
  if (value === "medical_supplies") return "medical_supplies";
  return "retail_store";
}

export interface ResolvedAddress {
  line1: string;
  line2: string;
  city: string;
  country: string;
  postalCode: string;
  lines: string[];
  singleLine: string;
}

function compactAddress(input: {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
}): ResolvedAddress {
  const line1 = input.line1?.trim() || "";
  const line2 = input.line2?.trim() || "";
  const city = input.city?.trim() || "";
  const country = input.country?.trim() || "";
  const postalCode = input.postalCode?.trim() || "";
  const lines = [
    line1,
    line2,
    [city, postalCode].filter(Boolean).join(" "),
    country,
  ].filter(Boolean);
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

export function ensureCommerceBusinessEnablement(input: {
  enablements: OSEnablement[];
  subscriptions: OSSubscription[];
  workspaceId: string | null | undefined;
  businessUnitId: string | null | undefined;
  branchIds?: string[];
}): { enablements: OSEnablement[]; enablement: OSEnablement | null; created: boolean } {
  if (!input.workspaceId || !input.businessUnitId) {
    return { enablements: input.enablements, enablement: null, created: false };
  }

  const existing = getCurrentOSEnablement({
    enablements: input.enablements,
    workspaceId: input.workspaceId,
    osId: "commerce",
    businessUnitId: input.businessUnitId,
  });
  if (existing && existing.scope === "business") {
    return { enablements: input.enablements.map(normalizeOSEnablement), enablement: existing, created: false };
  }

  const subscription = input.subscriptions.find((sub) =>
    sub.workspaceId === input.workspaceId &&
    sub.osId === "commerce" &&
    (sub.status === "trialing" || sub.status === "active"),
  );
  if (!subscription) {
    return { enablements: input.enablements.map(normalizeOSEnablement), enablement: null, created: false };
  }

  const branchIds = [...new Set((input.branchIds || []).map((id) => id.trim()).filter(Boolean))];
  const createdAt = nowISO();
  const enablement: OSEnablement = {
    id: uid("ose"),
    workspaceId: input.workspaceId,
    osId: "commerce",
    osSubscriptionId: subscription.id,
    scope: "business",
    businessUnitId: input.businessUnitId,
    branchIds,
    status: "active",
    createdAt,
    updatedAt: createdAt,
  };

  return {
    enablements: [...input.enablements.map(normalizeOSEnablement), enablement],
    enablement,
    created: true,
  };
}

export function isBranchNameAvailableForBusiness(
  branches: Branch[],
  businessUnitId: string | null | undefined,
  name: string,
  excludeBranchId?: string | null,
): boolean {
  const normalized = name.trim().toLowerCase();
  if (!businessUnitId || !normalized) return false;
  return !branches.some((branch) =>
    branch.businessUnitId === businessUnitId &&
    branch.id !== excludeBranchId &&
    branch.name.trim().toLowerCase() === normalized,
  );
}

export { computeDoc, fmtDate, computeReturnTotals } from "../commerce/documents";
