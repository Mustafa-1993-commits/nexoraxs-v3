import type { QueryClient } from "@tanstack/react-query";
import type {
  LegacyProductListResult,
  LegacyProductRecord,
  LegacyProductScope,
} from "@nexoraxs/contracts";
import { legacyProductKeys } from "./legacy-product-query-keys";

export function replaceLegacyProductInScopeCache(
  queryClient: QueryClient,
  scope: LegacyProductScope,
  product: LegacyProductRecord,
): void {
  queryClient.setQueryData(legacyProductKeys.item(scope, product.id), product);
  queryClient.setQueriesData<LegacyProductListResult>(
    { queryKey: [...legacyProductKeys.scope(scope), "list"] },
    (current) => {
      if (!current) return current;
      return {
        ...current,
        items: current.items.map((item) => item.id === product.id ? product : item),
      };
    },
  );
}

export function removeLegacyProductFromScopeCache(
  queryClient: QueryClient,
  scope: LegacyProductScope,
  productId: string,
): void {
  queryClient.removeQueries({ queryKey: legacyProductKeys.item(scope, productId), exact: true });
  queryClient.setQueriesData<LegacyProductListResult>(
    { queryKey: [...legacyProductKeys.scope(scope), "list"] },
    (current) => {
      if (!current) return current;
      const items = current.items.filter((item) => item.id !== productId);
      return items.length === current.items.length
        ? current
        : { ...current, items, total: Math.max(0, current.total - 1) };
    },
  );
}

export function invalidateLegacyProductScope(
  queryClient: QueryClient,
  scope: LegacyProductScope,
): Promise<void> {
  return queryClient.invalidateQueries({ queryKey: legacyProductKeys.scope(scope) });
}
