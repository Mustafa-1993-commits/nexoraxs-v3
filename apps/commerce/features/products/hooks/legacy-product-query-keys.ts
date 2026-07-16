import type { LegacyProductScope, ListLegacyProductsQuery } from "@nexoraxs/contracts";

export interface NormalizedLegacyProductListQuery {
  readonly page?: number;
  readonly pageSize?: number;
}

function normalizedScopeParts(scope: LegacyProductScope) {
  return [
    scope.workspaceId.trim(),
    scope.legacyBusinessUnitId.trim(),
    scope.branchId?.trim() || null,
  ] as const;
}

export function normalizeLegacyProductListQuery(
  query: ListLegacyProductsQuery = {},
): NormalizedLegacyProductListQuery {
  return {
    ...(query.page === undefined ? {} : { page: query.page }),
    ...(query.pageSize === undefined ? {} : { pageSize: query.pageSize }),
  };
}

/** Complete temporary scope identity; this is not a canonical organization key. */
export const legacyProductKeys = {
  scope: (scope: LegacyProductScope) => [
    "commerce",
    "legacy-products",
    ...normalizedScopeParts(scope),
  ] as const,
  list: (scope: LegacyProductScope, query: ListLegacyProductsQuery = {}) => [
    ...legacyProductKeys.scope(scope),
    "list",
    normalizeLegacyProductListQuery(query),
  ] as const,
  item: (scope: LegacyProductScope, productId: string) => [
    ...legacyProductKeys.scope(scope),
    "item",
    productId.trim(),
  ] as const,
};
