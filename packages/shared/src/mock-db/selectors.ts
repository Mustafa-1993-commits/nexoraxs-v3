import type { BusinessUnit, OSEnablement, WorkspaceStorageUsage } from "@nexoraxs/types";
import type { Lang } from "./schema";

export function money(value: number, lang: Lang = "en"): string {
  const formatted = (Math.round(value * 100) / 100).toLocaleString("en-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return lang === "ar" ? `${formatted} ج.م` : `${formatted} EGP`;
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function storageUsagePercent(usage: WorkspaceStorageUsage | null): number {
  if (!usage || !usage.limitBytes) return 0;
  return Math.max(0, Math.min(100, (usage.usedBytes / usage.limitBytes) * 100));
}

export function formatBytes(bytes: number, lang: Lang = "en"): string {
  const units = lang === "ar" ? ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"] : ["B", "KB", "MB", "GB"];
  let value = Math.max(0, bytes || 0);
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) { value /= 1024; unitIndex += 1; }
  const rounded = unitIndex === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

export function remainingBytes(usage: WorkspaceStorageUsage | null): number {
  return usage ? Math.max(0, usage.limitBytes - usage.usedBytes) : 0;
}

function normalizeId(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function normalizeBranchIds(enablement: OSEnablement): string[] {
  const ids = new Set<string>();
  enablement.branchIds?.forEach((id) => { const normalized = normalizeId(id); if (normalized) ids.add(normalized); });
  const legacyBranchId = normalizeId(enablement.branchId);
  if (legacyBranchId) ids.add(legacyBranchId);
  return [...ids];
}

export function normalizeOSEnablement(enablement: OSEnablement): OSEnablement {
  return { ...enablement, businessUnitId: enablement.businessUnitId ?? null, branchIds: normalizeBranchIds(enablement) };
}

export function getWorkspaceOSEnablements(enablements: OSEnablement[], workspaceId: string | null | undefined): OSEnablement[] {
  if (!workspaceId) return [];
  return (enablements || []).map(normalizeOSEnablement).filter((item) => item.workspaceId === workspaceId);
}

export function getBusinessOSEnablements(
  enablements: OSEnablement[], workspaceId: string | null | undefined,
  businessUnitId: string | null | undefined, options: { includeWorkspace?: boolean } = {},
): OSEnablement[] {
  if (!workspaceId || !businessUnitId) return [];
  return getWorkspaceOSEnablements(enablements, workspaceId).filter((item) =>
    item.scope === "workspace" ? options.includeWorkspace === true : item.businessUnitId === businessUnitId,
  );
}

export function getCurrentOSEnablement(input: {
  enablements: OSEnablement[]; workspaceId: string | null | undefined; osId: string | null | undefined;
  businessUnitId?: string | null; branchId?: string | null;
}): OSEnablement | null {
  if (!input.workspaceId || !input.osId) return null;
  const active = getWorkspaceOSEnablements(input.enablements, input.workspaceId)
    .filter((item) => item.osId === input.osId && item.status === "active");
  const branchId = normalizeId(input.branchId);
  const businessUnitId = normalizeId(input.businessUnitId);
  if (branchId) {
    const branch = active.find((item) => item.scope === "branch"
      && item.businessUnitId === businessUnitId && normalizeBranchIds(item).includes(branchId));
    if (branch) return branch;
  }
  if (businessUnitId) {
    const business = active.find((item) => item.scope === "business" && item.businessUnitId === businessUnitId);
    if (business) return business;
  }
  return active.find((item) => item.scope === "workspace") ?? null;
}

export function isOSEnabledForBusiness(
  enablements: OSEnablement[], workspaceId: string | null | undefined,
  osId: string | null | undefined, businessUnitId: string | null | undefined,
): boolean {
  if (!workspaceId || !osId || !businessUnitId) return false;
  return getBusinessOSEnablements(enablements, workspaceId, businessUnitId, { includeWorkspace: true })
    .some((item) => item.osId === osId && item.status === "active");
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

export function getBusinessIndustryType(
  businessUnit: Pick<BusinessUnit, "industryType" | "presetId" | "preset"> | null | undefined,
): string {
  return businessUnit?.industryType || industryTypeFromPreset(businessUnit?.presetId || businessUnit?.preset);
}
