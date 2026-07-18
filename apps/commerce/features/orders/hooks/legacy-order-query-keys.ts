import type { LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
export const legacyOrderKeys = {
  listScope: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null) => ["commerce", "legacy-orders", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "list"] as const,
  list: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null, filters = "") => ["commerce", "legacy-orders", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "list", filters.trim().toLocaleLowerCase("en-US")] as const,
  item: (scope: LegacyCommerceBusinessUnitScope, id: string, branchId: string | null = null) => ["commerce", "legacy-orders", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "item", id.trim()] as const,
};
