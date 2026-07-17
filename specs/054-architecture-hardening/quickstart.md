# Quickstart: Feature 054 Architecture Hardening

**Purpose**: Implement the plan incrementally without changing behavior or resolving deferred
architecture.

## 1. Read Before Editing

Read in this order:

1. Core Platform and Commerce OS v1.0 Freezes.
2. Accepted ADR-004, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035, ADR-036, ADR-038,
   and ADR-040.
3. Approved Core Platform architecture/technology baseline and Commerce OS Wave 1.
4. Constitution v2.0.0 and repository `AGENTS.md`.
5. Feature 052 and Feature 053 specs/plans/contracts/evidence.
6. Feature 054 [spec](./spec.md), [plan](./plan.md), [research](./research.md),
   [data model](./data-model.md), and [contracts](./contracts/).

Stop if an implementation step would:

- move Workspace quota/usage ownership into Commerce;
- let Core write a Commerce operational record;
- let Commerce create/mutate Core identity;
- create a mega-service that becomes a new Commerce owner;
- change write ordering/partial-failure behavior without characterization;
- define an HTTP/API/DTO/Event/upload/backend contract; or
- answer a listed Deferred Decision.

## 2. Establish the Baseline

Before structural edits, run the existing gates:

```bash
pnpm test:unit
pnpm lint
pnpm --filter commerce exec tsc --noEmit
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter commerce build
pnpm --filter core-platform build
pnpm build
bash scripts/validate-commerce-052-determinism.sh
```

Run the existing Commerce browser regressions:

```bash
pnpm exec playwright test \
  tests/e2e/commerce-044.spec.ts \
  tests/e2e/commerce-052-products-characterization.spec.ts \
  tests/e2e/commerce-052-products.spec.ts \
  tests/e2e/commerce-052-products-accessibility.spec.ts \
  tests/e2e/commerce-052-product-compatibility.spec.ts \
  tests/e2e/commerce-053-characterization.spec.ts \
  tests/e2e/commerce-053-characterization-accessibility.spec.ts \
  tests/e2e/commerce-053-customers.spec.ts \
  tests/e2e/commerce-053-read-models.spec.ts \
  tests/e2e/commerce-053-localization-accessibility.spec.ts
```

Run Core separately:

```bash
pnpm exec playwright test --config=playwright.core.config.ts \
  tests/e2e/core-050-shell.spec.ts \
  tests/e2e/core-050-performance.spec.ts
```

If a baseline fails, record and resolve the pre-existing failure before attributing any difference
to Feature 054.

## 3. Add Characterization First

Capture current behavior before moving each responsibility.

### Cache and service identity

- exact Product/Customer/Inventory/Order/Invoice query keys;
- exact post-commit invalidations, including Customer history-list metrics;
- no invalidation across W/BU/Branch;
- one stable repository/service/facade/cache identity across 100 rerenders; and
- notification failure never repeats a source write.

### Retained operational writes

For setup, media, adjustment, Transfer, Order, Invoice, and Return, assert:

- all current validation branches and exact error strings;
- ID prefix/value sequence and `nowISO` call ordering;
- exact serialized fields/order relationships/numbering;
- successful write sequence;
- current partial-write behavior when a later write fails;
- React publication and exact-scope notification timing; and
- exactly one persistence path.

Explicitly cover duplicate Transfer/Return items, missing Product during Return restock, untracked
Product sale, fresh-storage numbering, and same-tick Order→Invoice.

### Media and quota

Cover no file, cancel, browser conversion failure, size rejection, missing usage row, quota
overflow, success, media-before-usage ordering, Product create compensation, edit failure, and
existing localized toast/reference behavior.

### Core projection and handoff

Cover current shell/Product Hub/billing presentation, normal Core launch, separate-origin Commerce
handoff, refresh after handoff, missing/rejected handoff, and zero fallback writes.

### Relationship failures

Cover genuine not-found, foreign-scope same ID, invalid scope, deterministic failure, storage
failure, configuration failure, and unknown errors for both Order and Invoice views.

## 4. Implement in Bounded Checkpoints

### A. Ports and fixtures

Add contract/interface-only values for Product/Customer compatibility, cache change notification,
media source, Core projection/handoff, Storage Coordination, and focused owner commands/stores.
Build architecture-rule valid/invalid fixtures. Do not move behavior yet.

Gate:

```bash
pnpm exec vitest run tests/architecture/frontend-boundaries.test.ts
```

### B. Cache inversion

Move QueryClient/query-key mapping to the outer React Query adapter. Application code receives only
`CommerceChangeNotificationPort`. Run exact-scope cache and no-React-Query application tests.

### C. Compatibility interfaces and SDK privacy

Switch Product/Customer hooks/providers to interface types. Keep concrete facades private to SDK
composition. Migrate implementation-dependent tests to `@nexoraxs/sdk/testing`, then narrow package
exports.

### D. Relationship classification

Teach repositories to distinguish genuine absence from a foreign-scope ID without disclosure.
Map only typed `not_found` to `null`; rethrow everything else. Confirm manual retry remains the only
retry.

### E. Shared policy movement

Move one policy family at a time into its owner module. Keep equivalence tests green, update all
consumers, then remove the old shared export immediately. Never leave two active definitions.

### F. Setup and media extraction

Move setup policy/service first. Convert UI File to `LegacyMediaSource`, keep browser canvas work in
an outer adapter, delegate Workspace quota/usage to Core Storage Coordination, and preserve Product
media association/compensation behavior.

### G. Operational extraction

Migrate one operation at a time:

1. adjustment;
2. Transfer;
3. Order + Inventory effects;
4. Invoice;
5. Return + affected-owner effects.

For each, make the old provider callback delegate, prove one persisted result, remove its old rule
body, source-scan zero alternate writers, and rerun focused + regression tests before continuing.

### H. Core ownership cleanup

Replace Core operational arrays/writes with the read-only Commerce projection and explicit handoff.
Remove zero-consumer Core Commerce callbacks and seeding. Remove Commerce fallback construction of
Core identities; persist only read-only handoff context behind an approved adapter.

### I. Browser storage isolation and enforcement

Route provider/component browser access through approved exact adapters. Enable the real-source
architecture CLI only after all migrations remove violations. Do not add permanent exemptions for
legacy debt.

## 5. Focused Verification During Implementation

Run after every checkpoint:

```bash
pnpm architecture:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm --filter commerce build
pnpm --filter core-platform build
git diff --check
```

Use focused Vitest paths while iterating, but do not replace the full final gate with selected
tests.

## 6. Final Validation

```bash
pnpm architecture:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm exec vitest run tests/architecture/frontend-boundaries.test.ts
pnpm --filter commerce build
pnpm --filter core-platform build
pnpm build
bash scripts/validate-commerce-052-determinism.sh
pnpm exec playwright test \
  tests/e2e/commerce-044.spec.ts \
  tests/e2e/commerce-052-products-characterization.spec.ts \
  tests/e2e/commerce-052-products.spec.ts \
  tests/e2e/commerce-052-products-accessibility.spec.ts \
  tests/e2e/commerce-052-product-compatibility.spec.ts \
  tests/e2e/commerce-053-characterization.spec.ts \
  tests/e2e/commerce-053-characterization-accessibility.spec.ts \
  tests/e2e/commerce-053-customers.spec.ts \
  tests/e2e/commerce-053-read-models.spec.ts \
  tests/e2e/commerce-053-localization-accessibility.spec.ts \
  tests/e2e/commerce-054-characterization.spec.ts \
  tests/e2e/commerce-054-architecture-regression.spec.ts
pnpm exec playwright test --config=playwright.core.config.ts \
  tests/e2e/core-050-shell.spec.ts \
  tests/e2e/core-050-performance.spec.ts
git diff --check
```

Run the Feature 054 deterministic architecture/service suite twenty consecutive times. Every run
must produce identical diagnostics/results with no randomness, duplicate writes, or automatic
retry.

## 7. Final Review Checklist

- Zero application-layer React/React Query/browser/query-key/concrete SDK imports.
- Product/Customer consumers use ports; concrete facades are private.
- Core contains zero Commerce operational writers/record constructors.
- Commerce contains zero Core identity fallback writers.
- Commerce AppProvider contains zero Commerce business rules and delegates quota to Core Storage
  Coordination.
- Shared contains zero moved Commerce policy and no duplicate active implementation.
- Browser storage occurs only in exact approved infrastructure files.
- SDK root exposes no mock/store/serializer/simulator/concrete facade.
- Only typed not-found maps to an optional relationship.
- Product application code contains no browser `File` dependency.
- All routes, IDs, keys, seeds, refresh, calculations, numbering, effects, EN/AR, RTL/LTR,
  accessibility, and manual retry remain compatible.
- Every listed Deferred Decision remains explicitly unresolved.
- Spec, plan, tasks, contracts, package notes, AGENTS context, and implementation evidence agree.
