import type { LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
export const legacyInvoiceKeys = {
  list: (scope: LegacyCommerceBusinessUnitScope, branchId: string | null, filters = "") => ["commerce", "legacy-invoices", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), branchId?.trim() ?? null, "list", filters.trim().toLocaleLowerCase("en-US")] as const,
  item: (scope: LegacyCommerceBusinessUnitScope, id: string, viewKind: "detail" | "document") => ["commerce", "legacy-invoices", scope.workspaceId.trim(), scope.legacyBusinessUnitId.trim(), null, "item", id.trim(), viewKind] as const,
};
