# Validation Quickstart: Frontend Repository Foundation

## Prerequisites

- Use the repository-pinned pnpm toolchain.
- Install the dependency changes recorded in `package.json` and `pnpm-lock.yaml`.
- Keep unrelated dirty-worktree changes intact.
- Default local Commerce configuration to mock mode; no backend is required.

## Required Delivery Order

1. Run and preserve the Products characterization tests before structural Product edits.
2. Add contracts/SDK/test harness and pass repository/store tests.
3. Add composition, query keys, provider, and facade; pass identity/cache/facade tests.
4. Migrate Product pages and pass route/UI/refresh/localization/accessibility regression.
5. Prove zero consumers before deleting old Product callbacks.
6. Run all final gates and record evidence.

## Focused Commands

```bash
pnpm test:unit
pnpm exec vitest run packages/sdk apps/commerce/features/products
pnpm --filter commerce exec tsc --noEmit
pnpm --filter commerce lint
pnpm --filter commerce build
pnpm exec playwright test tests/e2e/commerce-052-products-characterization.spec.ts
pnpm exec playwright test tests/e2e/commerce-052-products.spec.ts
pnpm exec playwright test tests/e2e/commerce-052-products-accessibility.spec.ts
pnpm exec playwright test tests/e2e/commerce-052-product-compatibility.spec.ts
scripts/validate-commerce-052-determinism.sh
```

The implementation-provided script runs the deterministic suite 20 times and requires zero
failures. Do not add random retries to make the gate pass.

## Source-Boundary Checks

```bash
rg -n "localStorage|fetch\(|process\.env|NEXT_PUBLIC" apps/commerce/features/products apps/commerce/app/\(commerce\)/products
rg -n "addProduct|updateProduct|deleteProduct" apps/commerce --glob '!**/.next/**'
rg -n "archive|archived|draft|active" packages/contracts/src/commerce/products packages/sdk/src/commerce/products
rg -n "businessId" packages/contracts/src/commerce/products packages/sdk/src/commerce/products apps/commerce/features/products
```

Expected final results:

- no Product page/hook accesses storage, fetch, or environment values;
- no old Product write callback remains before its consumer count reaches zero;
- no Product status/archive vocabulary exists in the Feature 052 boundary;
- no canonical `businessId` is introduced; only explicit legacy scope naming appears.

## Contract and Adapter Evidence

Verify the shared repository suite against:

- `MemoryCommerceStore` in Node;
- `BrowserStorageCommerceStore` in jsdom using `nexoraxs.db.commerceProducts`;
- corrupt/unavailable/quota storage cases;
- two Workspace/two legacy-`BusinessUnit` isolation;
- optional Branch cache separation;
- duplicate normalized SKU;
- not found and non-leaking foreign-scope access;
- stored-order pagination;
- deterministic latency/failure/clock/ID behavior; and
- unknown-field round-trip preservation.

## UI Regression Evidence

In both English/LTR and Arabic/RTL:

- `/products` lists the same seeded IDs and visible combined columns;
- search, category filters, totals, empty results, and links remain unchanged in English;
- `/products/new` creates and persists a compatible record;
- `/products/new?edit=<id>` updates the same ID and preserves unknown/non-Product fields;
- refresh reloads the same storage record;
- invalid/not-found/duplicate/storage states are readable and recoverable;
- controls are keyboard-operable, semantically named, focus-safe, and axe-clean for applicable rules;
- user-entered Arabic/Latin mixed text remains unchanged; and
- no visible remove/archive control is added unless separately specified.

## Runtime Configuration Checks

Construct `CommerceRuntimeConfig` only in the designated runtime-config module.

- `mock` with omitted latency uses deterministic zero-delay behavior.
- negative/non-finite latency fails early.
- unknown data source fails early.
- `http` without `apiBaseUrl` fails early.
- `http` with a base URL still reports the implementation unavailable and issues no request.
- 100 provider re-renders preserve repository/facade/service/query-client identity.

## Recorded Final Result

On 2026-07-17: strict contracts/SDK/Commerce types passed; 14 Vitest files and 58 tests passed;
Commerce lint passed with zero warnings; the production build generated all 18 pages; all four
Feature 052 Playwright files passed together (6 tests); the existing Commerce 044 excluded-domain
regression passed; and the deterministic script passed all 20 runs. See `evidence/` and
`docs/12-release/FEATURE-052-VALIDATION-REPORT.md`.

## Final Constitution Gate

Before merge, confirm:

- DD-02: no canonical lifecycle/archive/removal/retention decision;
- DD-14: no canonical Product scope or fabricated Business identity;
- DD-29: no platform/API contract or network idempotency decision;
- Product Catalog ownership and all Price/Tax/Inventory/media/Core owners remain unchanged;
- `AppProvider` remains for excluded behavior but is not Product persistence source;
- no other domain was migrated;
- documentation/evidence is synchronized; and
- type, lint, unit, contract, integration, E2E, a11y, localization, and build gates pass.
