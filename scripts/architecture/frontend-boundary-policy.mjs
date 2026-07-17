export const FRONTEND_SOURCE_ROOTS = Object.freeze(["apps", "packages"]);

export const FRONTEND_SOURCE_EXTENSIONS = Object.freeze([
  ".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs",
]);

export const FRONTEND_EXCLUDED_SEGMENTS = Object.freeze([
  "__tests__", "__fixtures__", ".next", ".turbo", "node_modules", "dist", "build",
  "out", "coverage", "playwright-report", "test-results",
]);

export const COMPOSITION_ALLOWLIST = Object.freeze([
  "packages/sdk/src/commerce/runtime/createCommerceServices.ts",
  "apps/commerce/lib/commerce/createCommerceApplicationServices.ts",
  "apps/commerce/lib/commerce/CommerceServicesProvider.tsx",
  "apps/core-platform/lib/commerce/createCoreCommerceIntegration.ts",
]);

export const BROWSER_STORAGE_ALLOWLIST = Object.freeze([
  "packages/shared/src/mock-db/storage.ts",
  "packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts",
  "packages/sdk/src/commerce/operations/BrowserLegacyCommerceOperationsStore.ts",
  "packages/sdk/src/commerce/integration/BrowserLegacyCommerceIntegrationStore.ts",
  "packages/sdk/src/core/BrowserLegacyCorePlatformStore.ts",
  "apps/core-platform/lib/infrastructure/browser/core-session-storage.ts",
  "apps/core-platform/lib/infrastructure/browser/core-theme-storage.ts",
  "apps/core-platform/lib/infrastructure/browser/core-locale-storage.ts",
]);

export const COMMERCE_ENVIRONMENT_ALLOWLIST = Object.freeze([
  "apps/commerce/lib/commerce/commerce-runtime-config.ts",
]);

export const SDK_RUNTIME_EXPORTS = Object.freeze([
  "createCommerceServices",
  "createCommerceProjectionPort",
  "createCoreStorageCoordination",
  "createCorePlatformCompatibility",
  "CommerceRuntimeConfig",
  "CommerceServices",
]);

export const REMOVED_SHARED_COMMERCE_EXPORTS = Object.freeze([
  "effectiveStock",
  "createStockMovement",
  "createStockTransfer",
  "createCommerceReturn",
  "calculateTax",
  "calculateDiscount",
  "calculateRefund",
]);
