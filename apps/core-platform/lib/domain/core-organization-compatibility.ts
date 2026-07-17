import type { Branch, OSEnablement, OSSubscription } from "@nexoraxs/types";
import { getCurrentOSEnablement, normalizeOSEnablement, nowISO, uid } from "@nexoraxs/shared";

/** Existing Core compatibility behavior; no final OS lifecycle is defined here. */
export function ensureCommerceBusinessEnablement(input: {
  enablements: OSEnablement[]; subscriptions: OSSubscription[]; workspaceId: string | null | undefined;
  businessUnitId: string | null | undefined; branchIds?: string[];
}): { enablements: OSEnablement[]; enablement: OSEnablement | null; created: boolean } {
  if (!input.workspaceId || !input.businessUnitId) return { enablements: input.enablements, enablement: null, created: false };
  const existing = getCurrentOSEnablement({ enablements: input.enablements, workspaceId: input.workspaceId, osId: "commerce", businessUnitId: input.businessUnitId });
  if (existing?.scope === "business") return { enablements: input.enablements.map(normalizeOSEnablement), enablement: existing, created: false };
  const subscription = input.subscriptions.find((item) => item.workspaceId === input.workspaceId && item.osId === "commerce" && (item.status === "trialing" || item.status === "active"));
  if (!subscription) return { enablements: input.enablements.map(normalizeOSEnablement), enablement: null, created: false };
  const createdAt = nowISO();
  const enablement: OSEnablement = {
    id: uid("ose"), workspaceId: input.workspaceId, osId: "commerce", osSubscriptionId: subscription.id,
    scope: "business", businessUnitId: input.businessUnitId,
    branchIds: [...new Set((input.branchIds || []).map((id) => id.trim()).filter(Boolean))],
    status: "active", createdAt, updatedAt: createdAt,
  };
  return { enablements: [...input.enablements.map(normalizeOSEnablement), enablement], enablement, created: true };
}

export function isBranchNameAvailableForBusiness(
  branches: Branch[], businessUnitId: string | null | undefined, name: string, excludeBranchId?: string | null,
): boolean {
  const normalized = name.trim().toLowerCase();
  if (!businessUnitId || !normalized) return false;
  return !branches.some((branch) => branch.businessUnitId === businessUnitId && branch.id !== excludeBranchId && branch.name.trim().toLowerCase() === normalized);
}
