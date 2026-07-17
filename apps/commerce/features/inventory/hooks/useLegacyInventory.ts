"use client";
import { useQuery } from "@tanstack/react-query";
import type { LegacyCommerceBranchScope } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyInventoryKeys } from "./legacy-inventory-query-keys";
const DISABLED = { workspaceId: "", legacyBusinessUnitId: "", branchId: "" };
export function useLegacyInventory(scope: LegacyCommerceBranchScope | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED;
  return useQuery({ queryKey: legacyInventoryKeys.list(effective), queryFn: () => services.inventoryProjectionService.listInventory({ scope: effective }), enabled: scope !== null });
}
