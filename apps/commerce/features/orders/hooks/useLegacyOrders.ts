"use client";
import { useQuery } from "@tanstack/react-query";
import type { LegacyCommerceBranchScope, LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyOrderKeys } from "./legacy-order-query-keys";
const DISABLED = { workspaceId: "", legacyBusinessUnitId: "" };
export function useLegacyOrders(scope: LegacyCommerceBranchScope | null) {
  const { services } = useCommerceServices(); const effective = scope ?? { ...DISABLED, branchId: "" };
  return useQuery({ queryKey: legacyOrderKeys.list(effective, effective.branchId), queryFn: () => services.orderViewService.listOrders({ scope: effective }), enabled: scope !== null });
}
export function useLegacyOrder(scope: LegacyCommerceBusinessUnitScope | null, orderId: string | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED; const id = orderId ?? "";
  return useQuery({ queryKey: legacyOrderKeys.item(effective, id), queryFn: () => services.orderViewService.getOrder({ scope: effective, orderId: id }), enabled: scope !== null && orderId !== null });
}
