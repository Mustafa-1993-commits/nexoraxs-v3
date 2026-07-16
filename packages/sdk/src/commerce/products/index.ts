/** Feature 052 mock/frontend SDK. These exports are not platform or HTTP API contracts. */
export type { MockCommerceStore } from "./MockCommerceStore";
export { BrowserStorageCommerceStore, LEGACY_PRODUCTS_STORAGE_KEY } from "./BrowserStorageCommerceStore";
export type { LegacyProductStorageLike } from "./BrowserStorageCommerceStore";
export { MemoryCommerceStore } from "./MemoryCommerceStore";
export { MockProductsRepository } from "./MockProductsRepository";
export { LegacyProductsCompatibilityFacade } from "./LegacyProductsCompatibilityFacade";
export type { LegacyProductsCompatibilityListener } from "./LegacyProductsCompatibilityFacade";
export type {
  MockProductBehaviorOptions,
  MockProductDiagnosticEvent,
  MockProductFailureRule,
  LegacyProductOperation,
} from "./mock-product-behavior";
export type {
  CommerceRuntimeConfig,
  CommerceServiceOverrides,
  CommerceServices,
} from "./createCommerceServices";
export { createCommerceServices } from "./createCommerceServices";
