"use client";
import { useMutation } from "@tanstack/react-query";
import type { CreateLegacyCustomerCommand, LegacyCommerceBusinessUnitScope, UpdateLegacyCustomerCommand } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { commitLegacyCustomerCache } from "./legacy-customer-cache";
import { legacyCustomerKeys } from "./legacy-customer-query-keys";
export function useLegacyCustomerMutations(scope: LegacyCommerceBusinessUnitScope) {
  const { services, queryClient } = useCommerceServices();
  const create = useMutation({ mutationFn: (command: CreateLegacyCustomerCommand) => services.customersCompatibility.create(scope, command), onSuccess: async (record) => {
    commitLegacyCustomerCache(queryClient, scope, record); await queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.list(scope), exact: true });
  } });
  const update = useMutation({ mutationFn: (command: UpdateLegacyCustomerCommand) => services.customersCompatibility.update(scope, command), onSuccess: async (record) => {
    commitLegacyCustomerCache(queryClient, scope, record); await Promise.all([
      queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.list(scope), exact: true }),
      queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.item(scope, record.id), exact: true }),
    ]);
  } });
  return { create, update };
}
