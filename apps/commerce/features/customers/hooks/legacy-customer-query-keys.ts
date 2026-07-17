import type { LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
const normalized = (value?: string) => value?.trim().toLocaleLowerCase("en-US") ?? "";
export const legacyCustomerKeys = {
  list: (scope: LegacyCommerceBusinessUnitScope, search?: string) => ["commerce", "legacy-customers", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), "list", normalized(search)] as const,
  item: (scope: LegacyCommerceBusinessUnitScope, id: string) => ["commerce", "legacy-customers", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), "item", id.trim()] as const,
  history: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null, id: string) => ["commerce", "legacy-customer-history", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, id.trim()] as const,
  histories: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null) => ["commerce", "legacy-customer-history", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "list"] as const,
};
