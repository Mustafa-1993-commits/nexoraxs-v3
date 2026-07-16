# US5 Compatibility Facade Evidence

Date: 2026-07-17

## Direction and cutover

The temporary direction is now:

```text
LegacyProductsRepository + Product hooks
  -> LegacyProductsCompatibilityFacade publication
  -> AppProvider.products compatibility projection
  -> existing POS / Inventory readers
```

The facade delegates list/create/update/remove to the repository, publishes only after successful
operations, and clone-isolates subscriber data. AppProvider no longer reads or writes the Product
browser collection. It hydrates and changes active legacy scope through facade lists, subscribes
to successful compatible-list publication, and otherwise retains all existing state/actions for
Orders, Inventory, Customers, Invoices, Workspaces, Businesses, Branches, Team, Subscriptions, and
OS compatibility behavior.

Demo Product records are seeded through the facade/store seam, preserving the characterized
`nexoraxs.db.commerceProducts` key, `p1` and `p2`, and full compatible record shape. All non-Product
seed behavior remains in the existing bootstrap.

## Tests and source proof

The initial facade test run failed on the intentionally absent facade module, and the provider test
failed because no facade service existed. After implementation:

```text
pnpm exec vitest run \
  packages/sdk/src/commerce/products/__tests__/compatibility-facade.test.ts \
  apps/commerce/features/products/__tests__/app-provider-product-facade.test.tsx \
  apps/commerce/features/products/__tests__/commerce-services-provider.test.tsx

Test Files  3 passed (3)
Tests       6 passed (6)

pnpm exec playwright test tests/e2e/commerce-052-product-compatibility.spec.ts --project=chromium
1 passed
```

The browser test creates through `/products/new`, then observes the same Product immediately in
the unchanged `/pos` and `/inventory` legacy readers and again after refresh.

An `rg` source check finds no `addProduct`, `updateProduct`, or `deleteProduct` callback declaration,
implementation, or consumer in AppProvider/app/feature runtime. Remaining `addProduct` text is only
the localized presentation message key. There is no `readCollection<CommerceProduct>` or
`writeCollection(STORAGE_KEYS.products, ...)` in AppProvider.

## Reversibility

The reversible seams are the provider composition root, repository-backed hooks, facade
subscription, and isolated browser store. `AppProvider` itself was not removed, and no excluded
domain was migrated. This compatibility bridge remains frontend-internal pending DD-02, DD-14,
and DD-29.
