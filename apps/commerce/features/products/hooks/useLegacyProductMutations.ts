"use client";

import { useMutation } from "@tanstack/react-query";
import type {
  CreateLegacyProductCommand,
  LegacyProductScope,
  UpdateLegacyProductCommand,
} from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyProductEditor } from "@/lib/commerce/CommerceProviders";
import {
  invalidateLegacyProductScope,
  removeLegacyProductFromScopeCache,
  replaceLegacyProductInScopeCache,
} from "./legacy-product-cache";

export function useLegacyProductMutations(scope: LegacyProductScope) {
  const { services, queryClient } = useCommerceServices();
  const editor = useLegacyProductEditor();

  const create = useMutation({
    mutationFn: ({ command, imageFile }: { command: CreateLegacyProductCommand; imageFile?: File | null }) => (
      imageFile
        ? editor.create(scope, command, imageFile)
        : services.productsRepository.create(scope, command)
    ),
    onSuccess: async (product) => {
      replaceLegacyProductInScopeCache(queryClient, scope, product);
      await Promise.all([
        invalidateLegacyProductScope(queryClient, scope),
        services.productsFacade.list(scope),
      ]);
    },
  });

  const update = useMutation({
    mutationFn: ({
      productId,
      command,
      imageFile,
    }: {
      productId: string;
      command: UpdateLegacyProductCommand;
      imageFile?: File | null;
    }) => (
      imageFile
        ? editor.update(scope, productId, command, imageFile)
        : services.productsRepository.update(scope, productId, command)
    ),
    onSuccess: async (product) => {
      replaceLegacyProductInScopeCache(queryClient, scope, product);
      await Promise.all([
        invalidateLegacyProductScope(queryClient, scope),
        services.productsFacade.list(scope),
      ]);
    },
  });

  const remove = useMutation({
    mutationFn: (productId: string) => services.productsRepository.remove(scope, productId),
    onSuccess: async ({ removedId }) => {
      removeLegacyProductFromScopeCache(queryClient, scope, removedId);
      await Promise.all([
        invalidateLegacyProductScope(queryClient, scope),
        services.productsFacade.list(scope),
      ]);
    },
  });

  return { create, update, remove };
}
