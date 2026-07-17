import type { LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
export const legacyOrderKeys = {
  list: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null, filters = "") => ["commerce", "legacy-orders", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "list", filters.trim().toLocaleLowerCase("en-US")] as const,
  item: (scope: LegacyCommerceBusinessUnitScope, id: string) => ["commerce", "legacy-orders", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), null, "item", id.trim()] as const,
};
