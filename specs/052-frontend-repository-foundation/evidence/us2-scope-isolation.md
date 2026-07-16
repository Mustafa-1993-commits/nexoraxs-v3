# US2 Scope Isolation Evidence

Date: 2026-07-17

## Failing-first checkpoint

The three US2 suites were run before the query-key and cache helpers existed. The repository
matrix passed, while both hook-boundary suites failed to import the intentionally absent
`legacy-product-query-keys` and `legacy-product-cache` modules.

## Passing matrix

```text
apps/commerce/node_modules/.bin/tsc -p packages/sdk/tsconfig.json --noEmit
apps/commerce/node_modules/.bin/tsc -p apps/commerce/tsconfig.json --noEmit
pnpm exec vitest run \
  packages/sdk/src/commerce/products/__tests__/legacy-product-scope-isolation.test.ts \
  apps/commerce/features/products/__tests__/legacy-product-query-keys.test.ts \
  apps/commerce/features/products/__tests__/legacy-product-cache-isolation.test.tsx

Test Files  3 passed (3)
Tests       14 passed (14)
```

The fixture matrix proves:

- Workspace A, Workspace B, and a second legacy `BusinessUnit` in Workspace A list only their
  own records, even when Product IDs and SKUs overlap.
- get/update/remove fail closed with a generic `not_found` outcome for a foreign scoped record;
  the result contains no foreign Product name or payload.
- duplicate SKU comparison is normalized and limited to Workspace plus legacy `BusinessUnit`.
- Branch is included in query/cache identity because it can shape the legacy view, but is not
  treated as Product ownership by the repository.
- item/list cache replacement and invalidation use the complete normalized scope prefix, so an
  overlapping ID in another Workspace remains unchanged.

## Governance source check

`rg` over the non-test Feature 052 Product contracts, SDK, and feature modules found no
`businessId`. The only environment/storage boundary hit was the documented `localStorage` access
inside `BrowserStorageCommerceStore`. The temporary key remains
`workspaceId + legacyBusinessUnitId + optional branchId`; it is a mock isolation safeguard and
not proof of canonical organization ancestry or server-side authorization.
