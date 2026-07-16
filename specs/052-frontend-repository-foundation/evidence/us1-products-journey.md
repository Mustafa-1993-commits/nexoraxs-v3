# US1 Products Journey Evidence

Date: 2026-07-17

## Cutover result

The existing `/products` and `/products/new?edit=<id>` routes now obtain Product request/cache state
through `LegacyProductsRepository` hooks. The combined Product/image form delegates only its actual
media coordination to `LegacyProductEditorService`; simple Product operations still call the
repository directly. The app-level provider constructs the repository, QueryClient, and editor
service outside page renders and retains `AppProvider` for compatibility and all excluded domains.

The table, filters, categories, form sections, button hierarchy, routes, browser key, `p1`/`p2`
seed IDs, generated `p_` ID prefix, and current English copy remain unchanged. Product messages now
also have an Arabic path; user-entered mixed Arabic/Latin content is not translated or rewritten.

## Automated evidence

```text
pnpm exec vitest run \
  apps/commerce/features/products/__tests__/legacy-product-editor-service.test.ts \
  apps/commerce/features/products/__tests__/legacy-product-query-keys.test.ts \
  apps/commerce/features/products/__tests__/legacy-product-cache-isolation.test.tsx \
  packages/sdk/src/commerce/products/__tests__/memory-products-repository.test.ts \
  packages/sdk/src/commerce/products/__tests__/browser-products-repository.test.ts

Test Files  5 passed (5)
Tests       24 passed (24)
```

The editor-service suite was first observed failing because the service module did not exist. It
then proved successful no-media create, separate media-port coordination, create rollback after
failed media, and no edit commit after failed media.

```text
pnpm exec playwright test tests/e2e/commerce-052-products-characterization.spec.ts --project=chromium
1 passed

pnpm exec playwright test tests/e2e/commerce-052-products.spec.ts --project=chromium
first full journey passed; the search assertion exposed an incorrect test SKU and passed after
correcting the fixture expectation to the characterized MED-0001 value

pnpm exec playwright test tests/e2e/commerce-052-products-accessibility.spec.ts --project=chromium
2 passed
```

The unchanged characterization passes after cutover, including create, edit, browser refresh,
opaque-field round trip, route preservation, and stable seeded/generated IDs. English/LTR and
Arabic/RTL each pass language/direction assertions, translated Product names, auto-focus/keyboard
reachability, mixed-direction input, and axe checks with no critical violations. The first axe run
identified the two existing icon-only toggle names; both now have localized accessible names.

## Deliberate compatibility boundary

The Product list uses repository records as its Product source and temporarily composes the
existing Branch inventory stock projection by matching ID. That projection remains
`AppProvider`-owned compatibility data until the excluded Inventory domain has its own approved
migration. No canonical Product lifecycle, canonical Business ancestry, HTTP contract, production
authorization, or Audit behavior is asserted by this slice.
