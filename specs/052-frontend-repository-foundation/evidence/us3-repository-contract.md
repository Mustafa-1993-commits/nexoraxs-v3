# US3 Internal Repository Contract Evidence

**Date**: 2026-07-17

## Commands

```text
apps/commerce/node_modules/.bin/tsc -p packages/sdk/tsconfig.json --noEmit
pnpm exec vitest run \
  packages/sdk/src/commerce/products/__tests__/memory-products-repository.test.ts \
  packages/sdk/src/commerce/products/__tests__/browser-products-repository.test.ts \
  packages/sdk/src/commerce/products/__tests__/product-storage-errors.test.ts
```

## Result

```text
Test Files  3 passed (3)
Tests       18 passed (18)
```

The shared seven-case repository contract passes unchanged over both `MemoryCommerceStore` and
`BrowserStorageCommerceStore`. Evidence covers scoped list/get, compatible create, immutable-ID and
creation-time update, unknown-field preservation, `remove`, stored-order pagination, duplicate SKU,
not found, clone isolation, corrupt/unavailable storage, quota failure, and last-commit preservation.

Only `BrowserStorageCommerceStore.ts` accesses localStorage. The repository depends on
`MockCommerceStore` and defines no status/archive behavior or HTTP contract.
