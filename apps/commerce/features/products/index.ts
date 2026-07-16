/** Commerce Product presentation/application boundary. No storage, transport, or config reads. */
export type { LegacyMediaCompatibilityPort } from "./application/LegacyMediaCompatibilityPort";
export { LegacyProductEditorService } from "./application/LegacyProductEditorService";
export { productMessage } from "./i18n/product-messages";
export type { ProductMessageKey } from "./i18n/product-messages";
export {
  legacyProductKeys,
  normalizeLegacyProductListQuery,
} from "./hooks/legacy-product-query-keys";
export {
  invalidateLegacyProductScope,
  removeLegacyProductFromScopeCache,
  replaceLegacyProductInScopeCache,
} from "./hooks/legacy-product-cache";
export { useLegacyProduct, useLegacyProducts } from "./hooks/useLegacyProducts";
export { useLegacyProductMutations } from "./hooks/useLegacyProductMutations";
