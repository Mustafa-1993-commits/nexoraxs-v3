# Quickstart and Validation: Commerce Repository Pattern Expansion

**Feature**: 053 Commerce Repository Pattern Expansion  
**Branch**: `053-commerce-repository-pattern-expansion`

This guide is the implementation and evidence order for Feature 053. It does not authorize work
outside the approved frontend-internal compatibility boundary.

## Prerequisites

- Node.js 24.x (validated planning environment: 24.15.0)
- pnpm 9.15.9
- Chromium installed for the repository Playwright version
- No new dependency, backend service, database, or HTTP server is required
- Work only from an approved Feature 053 spec, plan, and generated tasks

Before implementation, confirm:

```bash
git branch --show-current
git status --short
pnpm --version
node --version
```

Expected branch: `053-commerce-repository-pattern-expansion`. Preserve unrelated worktree changes.

## Mandatory delivery order

1. Add characterization fixtures and tests before changing data sources.
2. Add frontend-internal scope/domain contracts and contract suites.
3. Extend browser/memory stores and deterministic repository behavior additively.
4. Extend the single Commerce runtime/provider without changing Product identity or behavior.
5. Migrate Customers completely; delete provider write callbacks only after zero-caller evidence.
6. Migrate Inventory reads while retaining every stock write.
7. Migrate Order list/detail reads while retaining every Order/return/commercial write.
8. Migrate Invoice list/detail/document reads while retaining issuance and return paths.
9. Verify exact-scope retained-write notifications, relationships, localization, and accessibility.
10. Run Feature 052, Commerce 044, applicable Core 050, lint, type, test, and build gates.

Each domain checkpoint must be independently revertible without clearing browser storage.

## 1. Capture characterization evidence

Use deterministic fixtures with at least:

- two Workspaces;
- two legacy Business Units;
- two Branches in one legacy Business Unit;
- overlapping Product, Customer, Inventory, Order, and Invoice IDs across scopes;
- an in-scope complete relation chain;
- missing and out-of-scope relations;
- a Product without a Branch Inventory row;
- Customer creation/update through `/customers` and POS; and
- retained Order, Invoice, Inventory, and return writes.

Record current behavior for:

```text
/customers
/customers/<id>
/inventory
/orders
/orders/<id>
/invoices
/invoices/<id>
the current Invoice document route
/pos
```

The baseline must include route paths, list order, fields, empty/not-found fallbacks, filters,
drawers, Customer metrics, linked navigation, storage keys, serialized records, refresh behavior,
English/LTR, Arabic/RTL, keyboard behavior, and current screen-reader names.

Run the characterization file before structural changes and save the result with Feature 053 test
evidence:

```bash
pnpm exec playwright test tests/e2e/commerce-053-characterization.spec.ts
```

## 2. Verify package and source boundaries

Expected additions are limited to:

```text
packages/contracts/src/commerce/{common,customers,inventory,orders,invoices}/
packages/sdk/src/commerce/{storage,customers,inventory,orders,invoices}/
apps/commerce/features/{customers,inventory,orders,invoices}/
apps/commerce/lib/commerce/
tests/e2e/commerce-053-*.spec.ts
```

Feature 052 Product modules remain source-compatible. Browser key names occur only in the browser
compatibility store. Environment reads remain only in the existing runtime-config constructor.

Useful checks:

```bash
rg -n 'nexoraxs\.db\.(commerceCustomers|branchInventory|commerceOrders|commerceInvoices)' \
  packages apps/commerce
rg -n 'NEXT_PUBLIC_|process\.env' \
  packages/contracts packages/sdk apps/commerce/features apps/commerce/lib/commerce
rg -n 'localStorage|sessionStorage|fetch\(' \
  apps/commerce/features packages/contracts packages/sdk/src/commerce
rg -n 'create|update|delete|archive|adjust|transfer|return' \
  packages/contracts/src/commerce/inventory \
  packages/contracts/src/commerce/orders \
  packages/contracts/src/commerce/invoices
```

Review exceptions rather than relying only on raw matches: storage globals/keys are expected in
the browser adapter, and unavailable HTTP-mode configuration may be named but must not issue a
request.

## 3. Run repository and store contracts

The implementation tasks should place a shared conformance suite beside each SDK domain and run it
against isolated memory and browser-compatible stores. Execute all Feature 052 and Feature 053
repository tests:

```bash
pnpm exec vitest run packages/sdk/src/commerce/products
pnpm exec vitest run packages/sdk/src/commerce/customers
pnpm exec vitest run packages/sdk/src/commerce/inventory
pnpm exec vitest run packages/sdk/src/commerce/orders
pnpm exec vitest run packages/sdk/src/commerce/invoices
```

Required assertions:

- list/get for Customers, Orders, and Invoices;
- list for Inventory;
- Customer create/update final entity and atomicity;
- no write surface for Inventory, Orders, or Invoices;
- equivalent memory/browser-compatible outcomes;
- no storage rewrite on read;
- empty, corrupt, unavailable, and quota-failure behavior;
- unknown compatible Customer fields survive update;
- preserved order, keys, IDs, timestamps, and references;
- scope isolation with overlapping IDs; and
- Product contract and constructor compatibility.

## 4. Verify deterministic latency, failure, and retry

Run deterministic tests repeatedly:

```bash
for run in $(seq 1 20); do
  pnpm exec vitest run \
    packages/sdk/src/commerce/customers \
    packages/sdk/src/commerce/inventory \
    packages/sdk/src/commerce/orders \
    packages/sdk/src/commerce/invoices || exit 1
done
```

The same fixture, injected clock, ID source, latency, rule, and invocation number must produce the
same outcome every time. No test may depend on order or shared mutable fixtures.

Hook tests must prove that after a configured failure none of the following invokes the repository
again:

- timer advancement beyond stale time;
- rerender;
- component remount;
- window focus;
- reconnect/online event; or
- React Query default behavior.

Only activating the visible retry control or explicitly resubmitting a Customer form may invoke the
operation again. Successful retained-write invalidation is tested separately as a cache refresh.

## 5. Verify the scope matrix

For every included operation, cover:

| Dimension | Required evidence |
|---|---|
| Workspace | Same ID in another Workspace is not returned, joined, mutated, or invalidated |
| Legacy Business Unit | Same ID in another legacy Business Unit is non-disclosed |
| Branch | Inventory and route lists change with Branch; prior Branch cache is not shown |
| Customer cross-Branch | Customer list remains business-unit-wide as characterized |
| Order/Invoice detail | Business-unit-wide linked detail remains available without cross-BU leak |
| Invalid scope | Empty/malformed scope fails before storage publication or UI data |
| Relationship | Every relation is independently re-scoped before join |

Client-side success must be documented as a mock safeguard, not production authorization.

## 6. Verify Customer single-source migration

Before removing an `AppProvider` Customer callback:

```bash
rg -n 'createCustomer|updateCustomer' apps/commerce tests packages
```

Keep the callback until every active caller has moved to a Customer hook or the repository-backed
facade. Then prove:

- `/customers` and POS each create one record while pending duplicate submits are rejected;
- `/customers/<id>` updates only editable fields;
- ID, `createdAt`, scope, unknown fields, Order references, and Invoice references are unchanged;
- failure publishes no facade snapshot and makes no storage change;
- success publishes exactly once after commit;
- refresh restores the exact compatible Customer; and
- no active consumer calls the removed callback.

## 7. Verify read-only migration and retained-write observation

For Inventory, Orders, and Invoices, source tests must find no repository mutation. Exercise each
existing writer and assert one committed effect plus an exact-scope read refresh:

| Existing action | Expected read observation |
|---|---|
| Adjust/transfer stock | Affected Branch Inventory projection updates |
| Create Order | Branch Order list/detail and affected Branch Inventory update |
| Create Invoice | Branch Invoice list/detail/document and linked Order view update |
| Process return | Related Order/Invoice update; Inventory only when retained path restocks |

Seed an unrelated Workspace/Business Unit/Branch cache before every action and assert its data and
repository invocation count do not change.

## 8. Verify relationship compatibility

Run in-scope, missing, dangling, and cross-scope variants for:

```text
Product -> Branch Inventory
Order -> Customer
Order item -> Product
Invoice -> Order
Invoice -> Customer
Invoice item -> Product
```

Assert stored commercial fields are displayed without repository/service recalculation. Verify the
characterized Invoice detail/document Customer-source difference. The source Order or Invoice must
never be rewritten to repair a reference.

## 9. Verify language, direction, and accessibility

For every migrated route, exercise loading, empty, error/manual retry, not-found, and success in
English/LTR and Arabic/RTL. Customer forms also exercise pending and validation.

Check:

- translated state and control names;
- logical layout under LTR/RTL;
- unchanged Arabic/Latin mixed-direction user data;
- keyboard reachability and activation of retry/form controls;
- visible focus and safe focus after validation/failure;
- field label/error association and appropriate announcements;
- semantic busy/pending state and duplicate-submit prevention; and
- no critical axe violation or status conveyed only by color.

Run the focused browser suites after they are added:

```bash
pnpm exec playwright test \
  tests/e2e/commerce-053-customers.spec.ts \
  tests/e2e/commerce-053-read-models.spec.ts \
  tests/e2e/commerce-053-localization-accessibility.spec.ts
```

## 10. Run required quality gates

Focused unit/integration suite:

```bash
pnpm test:unit
```

Strict TypeScript, zero-warning ESLint, and Commerce production build:

```bash
pnpm --filter commerce exec tsc --noEmit
pnpm --filter commerce exec eslint . --max-warnings=0
pnpm --filter commerce build
```

Preserved Commerce browser regressions:

```bash
pnpm exec playwright test tests/e2e/commerce-044.spec.ts
pnpm exec playwright test tests/e2e/commerce-052-products.spec.ts
pnpm exec playwright test tests/e2e/commerce-053-characterization.spec.ts
pnpm exec playwright test tests/e2e/commerce-053-*.spec.ts
```

If actual Feature 052 filenames differ, run the committed Feature 052 unit/integration/E2E set by
its repository paths rather than inventing a replacement gate.

Because Feature 053 changes shared `packages/contracts` and `packages/sdk`, verify affected package
consumers. At minimum run the root build/lint graph. If the dependency graph or changed shared state
touches Core, run the Feature 050 production build/browser gate as well:

```bash
pnpm lint
pnpm build
pnpm --filter core-platform build
pnpm exec playwright test --config=playwright.core.config.ts
```

Record an explicit N/A with dependency evidence only if Core 050 is proven unaffected.

## 11. Final governance and no-regression review

Before merge, confirm:

- no canonical Business or `businessId` was introduced;
- all new domain shapes say legacy/frontend-internal;
- no future HTTP DTO, API pagination/error taxonomy, network idempotency, or backend behavior exists;
- Customer is the only new write repository;
- Inventory/Order/Invoice operational writes remain single and retained;
- Product contracts/behavior remain compatible;
- `AppProvider` remains and owns only still-legacy responsibilities;
- the Commerce provider remains the single stable composition root;
- diagnostics contain no Customer contact data, payloads, secrets, foreign IDs, or Audit claim;
- no lifecycle/deletion/status/tax/payment/stock/numbering Deferred Decision was answered;
- spec, plan, tasks, internal contracts, package-boundary documentation, and evidence agree; and
- every required automated/manual gate passed without a scope or compatibility waiver.
