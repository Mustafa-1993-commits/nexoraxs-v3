"use client";

import { useQuery } from "@tanstack/react-query";
import type { LegacyProductScope, ListLegacyProductsQuery } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyProductKeys } from "./legacy-product-query-keys";

const DISABLED_SCOPE: LegacyProductScope = { workspaceId: "", legacyBusinessUnitId: "" };

export function useLegacyProducts(
  scope: LegacyProductScope | null,
  query: ListLegacyProductsQuery = {},
) {
  const { services } = useCommerceServices();
  const effectiveScope = scope ?? DISABLED_SCOPE;
  return useQuery({
    queryKey: legacyProductKeys.list(effectiveScope, query),
    queryFn: () => services.productsRepository.list(effectiveScope, query),
    enabled: scope !== null,
  });
}

export function useLegacyProduct(scope: LegacyProductScope | null, productId: string | null) {
  const { services } = useCommerceServices();
  const effectiveScope = scope ?? DISABLED_SCOPE;
  const effectiveId = productId ?? "";
  return useQuery({
    queryKey: legacyProductKeys.item(effectiveScope, effectiveId),
    queryFn: () => services.productsRepository.getById(effectiveScope, effectiveId),
    enabled: scope !== null && productId !== null,
  });
}
