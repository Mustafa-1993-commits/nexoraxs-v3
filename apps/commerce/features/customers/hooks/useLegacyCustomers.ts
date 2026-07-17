"use client";
import { useQuery } from "@tanstack/react-query";
import type { LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyCustomerKeys } from "./legacy-customer-query-keys";
const DISABLED = { workspaceId: "", legacyBusinessUnitId: "" };
export function useLegacyCustomers(scope: LegacyCommerceBusinessUnitScope | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED;
  return useQuery({ queryKey: legacyCustomerKeys.list(effective), queryFn: () => services.customersRepository.list(effective), enabled: scope !== null });
}
export function useLegacyCustomer(scope: LegacyCommerceBusinessUnitScope | null, customerId: string | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED; const id = customerId ?? "";
  return useQuery({ queryKey: legacyCustomerKeys.item(effective, id), queryFn: () => services.customersRepository.getById(effective, id), enabled: scope !== null && customerId !== null });
}
export function useLegacyCustomerHistory(scope: LegacyCommerceBusinessUnitScope | null, branchId: string | null, customerId: string | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED; const id = customerId ?? "";
  return useQuery({ queryKey: legacyCustomerKeys.history(effective, branchId, id), queryFn: () => services.customerHistoryService.getCustomerHistory({ scope: effective, ...(branchId ? { branchId } : {}), customerId: id }), enabled: scope !== null && customerId !== null });
}
export function useLegacyCustomerHistories(scope: LegacyCommerceBusinessUnitScope | null, branchId: string | null) {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED;
  return useQuery({ queryKey: legacyCustomerKeys.histories(effective, branchId), queryFn: () => services.customerHistoryService.listCustomerHistories({ scope: effective, ...(branchId ? { branchId } : {}) }), enabled: scope !== null });
}
