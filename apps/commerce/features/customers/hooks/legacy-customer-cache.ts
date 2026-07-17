import type { QueryClient } from "@tanstack/react-query";
import type { LegacyCommerceBusinessUnitScope, LegacyCommerceListResult, LegacyCustomerCompatibilityRecord } from "@nexoraxs/contracts";
import { legacyCustomerKeys } from "./legacy-customer-query-keys";

export function commitLegacyCustomerCache(queryClient: QueryClient, scope: LegacyCommerceBusinessUnitScope, record: LegacyCustomerCompatibilityRecord): void {
  queryClient.setQueryData(legacyCustomerKeys.item(scope, record.id), record);
  queryClient.setQueryData<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>>(legacyCustomerKeys.list(scope), (current) => {
    const items = current?.items ?? [];
    const index = items.findIndex((candidate) => candidate.id === record.id);
    return { items: index < 0 ? [...items, record] : items.map((candidate) => candidate.id === record.id ? record : candidate) };
  });
}
