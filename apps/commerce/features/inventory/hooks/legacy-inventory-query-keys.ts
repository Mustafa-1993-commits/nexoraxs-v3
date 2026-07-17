import type { LegacyCommerceBranchScope } from "@nexoraxs/contracts";
export const legacyInventoryKeys = {
  scope: (scope: LegacyCommerceBranchScope) => ["commerce", "legacy-inventory", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), scope.branchId.trim()] as const,
  list: (scope: LegacyCommerceBranchScope, search = "") => ["commerce", "legacy-inventory", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), scope.branchId.trim(), "list", search.trim().toLocaleLowerCase("en-US")] as const,
};
