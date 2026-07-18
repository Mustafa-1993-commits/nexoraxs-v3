# Quickstart: Feature 055 Commerce Order Command Boundary

**Purpose**: Implement the clarified command boundary incrementally while preserving every current
Order/POS/Inventory effect and leaving deferred backend and lifecycle decisions unresolved.

## 1. Read Before Editing

Read in authority order:

1. `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md` and the applicable Core freeze.
2. Commerce Readiness/Wave 1 plus Accepted ADR-004, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035,
   ADR-036, ADR-038, and ADR-040.
3. `.specify/memory/constitution.md` and repository `AGENTS.md`.
4. Features 052-054 specs, plans, contracts, and implementation evidence.
5. Feature 055 [spec](./spec.md), [plan](./plan.md), [research](./research.md),
   [data model](./data-model.md), and [contracts](./contracts/).

Stop and route through Governance if a step would:

- treat the POS draft as a canonical Order or POS Transaction;
- let Orders calculate or persist Inventory, Price, Tax, Invoice, Payment, or Return-owned state;
- let Returns or Core write an Order collection directly;
- introduce a general update/delete/cancel/status/reservation command absent from characterization;
- change current commit/partial-failure ordering;
- define a public API, HTTP timing, DTO, pagination, error, authorization, idempotency, locking,
  lifecycle, or offline contract; or
- infer canonical Business or final organization ownership from `legacyBusinessUnitId`.

## 2. Establish the Baseline

Before structural changes, run:

```bash
pnpm architecture:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm --filter commerce build
pnpm build
bash scripts/validate-commerce-052-determinism.sh
git diff --check
```

Run current Commerce regressions:

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
  tests/e2e/commerce-053-localization-accessibility.spec.ts \
  tests/e2e/commerce-054-characterization.spec.ts \
  tests/e2e/commerce-054-characterization-accessibility.spec.ts \
  tests/e2e/commerce-054-architecture-regression.spec.ts
```

Run affected Core regressions separately:

```bash
pnpm exec playwright test --config=playwright.core.config.ts \
  tests/e2e/core-050-shell.spec.ts \
  tests/e2e/core-050-performance.spec.ts \
  tests/e2e/core-054-commerce-handoff.spec.ts
```

Record a pre-existing failure before migration; do not change application behavior merely to make
an unrelated baseline green.

## 3. Characterize Before Moving

Add Feature 055 characterization tests before editing the production responsibility they cover.

### POS draft and calculations

Capture after every draft action:

- add, repeated add/coalescing, quantity increase/decrease/minimum, remove, clear;
- zero-stock rejection and current missing/untracked Product behavior;
- Customer/payment selection and removal;
- discount string/number/negative/non-finite normalization and removal;
- taxable/non-taxable, inclusive/exclusive VAT, subtotal/discount/VAT/net/total floating results;
- the current `subtotal = net` Order payload quirk; and
- the explicit absence of price editing and durable draft persistence.

### Order and Inventory sequence

Capture:

- exact `ord`, `bi`, and `sm` identifier/time call ordering;
- `ORD-0001` onward count behavior, gaps, nonstandard numbers, same-Business-Unit Branches, and
  overlapping legacy IDs across Workspaces;
- Product/position complete-scope lookup, repeated lines, null stock, missing Product, no Product
  ID, existing and new positions;
- validation before Order write and the Order → positions → Movements write sequence;
- Order/Inventory notification timing, including no tracked Stock change;
- browser collection shapes, unknown fields, array order, refresh, and corruption/failure; and
- every partial failure after a successful earlier stage.

### Checkout and compatibility

Capture:

- Order → provider publication → Invoice → provider publication → last-Order → navigation;
- same-tick synchronous Order consumption by Invoice creation;
- Invoice or last-Order failure after an Order commit;
- provider callback identity across rerenders and exactly one write path;
- success-page read/clear behavior for `nx_last_order_id`;
- Return's Order patch and its existing later notification point; and
- demo bootstrap's current empty scoped Order write.

### Command inventory

Add an executable/source-backed matrix proving that general update, delete/remove, cancel, status,
persisted item/quantity/price/discount/recalculate, reservation, release, and Order-owned restore do
not exist. Do not create interfaces for the absent entries.

## 4. Implement in Bounded Checkpoints

### A. Add ports and architecture fixtures

Add application-facing POS draft/checkout, Order command repository/number/Return handoff,
Inventory effect, publication, and last-Order contracts. Add valid/invalid architecture fixtures.
No production behavior moves in this checkpoint.

Gate:

```bash
pnpm exec vitest run tests/architecture/frontend-boundaries.test.ts
pnpm architecture:check
```

### B. Add local and memory Order command repositories

Extend `BrowserStorageCommerceStore` and `MemoryCommerceStore` with distinctly named synchronous
Order command-storage methods. Add the private local command repository and reusable contract
suite. Keep Feature 053 async Order reads unchanged and preserve the exact browser key/shape.

### C. Extract the Inventory sale-effect port

Move the characterized sale sufficiency/read and deduction/write behavior into Inventory-owned
prepare/commit operations. Prove byte-equivalent positions/Movements and the same partial failures.
The existing Order service may temporarily delegate while its broad store access is removed.

### D. Rebuild Order create orchestration on narrow ports

Inject command repository, number, Inventory effect, deterministic clock/ID, and change
notification ports. Remove Product/Inventory/storage access from Orders. Keep the call synchronous
and preserve every return snapshot and notification point.

### E. Route Return and bootstrap Order writes

Replace Return's direct Order read/replace with the Orders-owned handoff while leaving all Return
rules and ordering in place. Route the demo empty seed through the narrow bootstrap seam. Then prove
there is no active Order writer on `LegacyCommerceOperationsStore`.

### F. Extract POS draft and checkout

Move draft rules to the POS service and `computeDoc` use behind the commercial snapshot port. Add
the checkout coordinator over Order, existing Invoice, publication, and last-Order ports. The page
retains only view state, rendering, localized feedback, and navigation.

### G. Reduce provider and success page

Make `AppProvider` publish returned committed snapshots and delegate retained callbacks only. Move
session access behind the last-Order adapter/hook. Remove obsolete callbacks only after a full
consumer scan and regression proof.

### H. Compose once and enforce

Select private browser/memory implementations only in the SDK Commerce factory, assemble
application/outer adapters only in the Commerce composition root, and retain one stable graph in
`CommerceServicesProvider`. Enable new architecture rules only after production violations are
removed; add no permanent legacy exemption.

## 5. Focused Verification During Implementation

Run after every checkpoint:

```bash
pnpm architecture:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm --filter commerce build
git diff --check
```

Use focused Vitest files while iterating, but do not substitute them for the final full suite.

## 6. Final Validation

```bash
pnpm architecture:check
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm exec vitest run tests/architecture/frontend-boundaries.test.ts
pnpm --filter commerce build
pnpm build
bash scripts/validate-commerce-052-determinism.sh
git diff --check
```

Run the Commerce and Core Playwright commands from section 2 plus the new Feature 055
characterization, command, localization/accessibility, persistence, and architecture suites.

Repeat the focused Feature 055 deterministic command suite twenty times through a checked-in script
or deterministic wrapper. All runs must produce identical results and diagnostics.

## 7. Completion Evidence

Before marking Feature 055 complete, record:

- the final supported/indirect/absent command inventory;
- source-scan evidence for zero direct Order writes from UI, hooks, providers, Returns, and Core;
- reusable browser/memory repository contract results;
- exact-scope number, persistence, publication, and cache-isolation results;
- commit-order and partial-failure equivalence evidence;
- one stable runtime across provider rerenders;
- POS/Order/Inventory/Invoice/Return relationship compatibility;
- English/Arabic, RTL/LTR, keyboard, focus, and screen-reader evidence;
- Feature 044 and Features 052-054 regression results; and
- strict type, zero-warning lint, architecture, deterministic, build, Vitest, and Playwright results.

Document any intentionally deferred production concern as deferred. Do not describe the browser
compatibility seam as backend-ready authorization, Audit, idempotency, transaction, or lifecycle
behavior.
