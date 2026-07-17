# Implementation Plan: Commerce Repository Pattern Expansion

**Branch**: `053-commerce-repository-pattern-expansion` | **Date**: 2026-07-17 | **Spec**:
[spec.md](./spec.md)  
**Input**: Feature specification from `/specs/053-commerce-repository-expansion/spec.md`

**Implementation status**: Complete; all required quality and regression gates passed on
2026-07-17. See [implementation-evidence.md](./implementation-evidence.md).

## Summary

Expand Feature 052's frontend-internal Commerce repository seam in reversible vertical slices.
Customers become the only complete new read/write migration (`list`, `getById`, `create`,
`update`), including Customer pages and POS selection/creation. Inventory, Orders, and Invoices
receive read-only repositories, scoped query hooks, and bounded read services only where existing
presentation combines multiple repositories. The existing browser keys, record shapes, routes,
Product behavior, retained operational writers, and `AppProvider` remain compatible.

The implementation adds narrow legacy scope contracts, deterministic mock repositories, additive
browser/memory store ports, exact-scope React Query keys, one repository-backed Customer facade,
and a no-write cache coordinator that makes retained Inventory/Order/Invoice commits visible in the
same tab. No HTTP adapter, backend, canonical Business, public SDK/API contract, lifecycle rule,
automatic retry, or UI redesign is introduced.

## Technical Context

**Language/Version**: TypeScript 5.9.3 in strict mode; React 19.2.4; Node.js 24.x  
**Primary Dependencies**: Next.js 16.2.6 App Router, TanStack React Query 5.101.x, existing
Commerce localization/UI packages; no new dependency  
**Storage**: Existing browser `localStorage` compatibility keys behind an additive browser store;
isolated in-memory store for tests; no server/database/network persistence  
**Testing**: Vitest 4.1.x, jsdom 29.x, Testing Library React 16.3.x, Playwright 1.61.x, axe-core
4.12.x, strict TypeScript, ESLint zero-warning, Next.js production builds  
**Target Platform**: Current Commerce OS web application in supported modern desktop browsers;
English/LTR and Arabic/RTL  
**Project Type**: pnpm/Turborepo monorepo; Next.js frontend plus shared TypeScript contract/SDK
packages; no backend change  
**Performance Goals**: Preserve current route interaction and render behavior; keep service identity
stable through 100 consumer rerenders; produce identical outcomes across 20 deterministic
failure/latency runs; prevent duplicate Customer submission while pending  
**Constraints**: Incremental/no-regression migration; Feature 052 Product surface unchanged;
`AppProvider` retained; Customers are the only new write seam; Inventory/Order/Invoice repositories
read-only; four storage keys byte-compatible; exact full-scope cache keys; no automatic retry,
randomness, HTTP, MSW, Laravel, canonical Business, public contracts, or lifecycle decisions  
**Scale/Scope**: Four additional frontend-internal repositories; four existing storage collections;
Customer list/detail/POS journey; Inventory list/projection; Order list/detail; Invoice
list/detail/document; existing related dashboard/report/return/transfer consumers remain legacy
unless directly required by an included flow

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Gate | Required evidence | Result |
|---|---|---|
| Frozen authority | Controlling Freeze/Accepted ADR references; no unresolved contradiction | **PASS** — Controlled by `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`, Commerce OS Wave 1, Accepted ADR-004, ADR-034, ADR-035, ADR-036, ADR-038, ADR-040, and Constitution v2.0.0. Proposed ADR-041 is excluded. The plan preserves DD-01, DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19, DD-21, DD-23, DD-24, DD-25, and DD-29. |
| Ownership | Owning domain, canonical facts, write models, and target validation are explicit | **PASS** — Transactional Customers, Inventory, Orders, Invoices/Documents, Product Catalog, and Core Organization Registry retain their frozen ownership. No canonical write moves. Only current browser-demo Customer create/update is relocated; Inventory/Order/Invoice repositories are read-only and services own no source facts. |
| Organization and tenancy | Workspace, Business, Business Unit, Department, Branch, OS, actor, and resource scope are explicit as applicable | **PASS** — Every operation includes Workspace plus explicit legacy Business Unit and Branch where results vary. Canonical Business is unavailable and must not be inferred. Department is N/A to current Commerce records. Existing session actor, Commerce OS action, and resource ID remain compatibility inputs; frontend scope checks are not production authorization. |
| OS independence | No core workflow requires another OS; no direct cross-OS database/internal-state access | **PASS** — Commerce owns all included operational domains, imports no other application, and does not depend on CRM for Customer behavior. Cross-owner composition is scoped, read-only, and reconstructable. |
| Knowledge and AI order | Capability/Knowledge/Rules/Business Brain/Recommendation/AI boundaries are preserved | **N/A** — Feature 053 adds no Capability, Knowledge, Rule, Recommendation, Business Brain, Marketplace, or AI behavior; their frozen order and ownership remain untouched. |
| Lifecycle separation | Entitlement, Subscription, installation, setup, configuration, activation, readiness, and access remain distinct as applicable | **PASS** — Commercial/OS lifecycle state is not read or changed. Existing Product/Customer/Inventory/Order/Invoice status and removal presentation is preserved only as legacy data and does not answer any lifecycle Deferred Decision. |
| Contracts and compatibility | Boundary contracts are owner-governed, versioned, and backward-compatible or have an approved migration | **PASS** — No public architecture/API contract is created. New shapes are explicitly frontend-internal and additive; Product exports, storage keys, IDs, routes, serialized relationships, and active legacy consumers remain compatible. Canonical contract versioning, pagination, errors, and idempotency remain deferred to DD-29. |
| Security and operations | Authorization, privacy, Audit, observability, failure, and recovery requirements are planned | **PASS** — Mock operations fail closed by available scope; joins re-check scope; deterministic failures and manual recovery are tested; diagnostics exclude contact data, payloads, secrets, and foreign IDs. Production server authorization, append-only Audit, logging/metrics/traces, and network reliability are **N/A for this mock-only feature** and remain mandatory blockers for a separately governed backend cutover. |
| Product quality | Arabic/English, RTL/LTR, accessibility, and measurable UX criteria are planned | **PASS** — Every migrated route covers localized loading/empty/error/manual-retry/not-found states; Customer forms add pending/validation. Logical direction, mixed-direction user data, keyboard operation, semantic names, focus, announcements, and non-color-only meaning are acceptance gates without redesign. |
| Verification | Risk-appropriate automated/manual tests cover invariants and acceptance scenarios | **PASS** — Plan requires pre-change characterization, repository/store contracts, atomicity, scope/cache isolation, deterministic failure, retained-write observation, relationship compatibility, persistence, facade/composition, EN/AR, RTL/LTR, accessibility, Feature 052, Commerce 044, applicable Core 050, strict type, zero-warning lint, build, Vitest, and Playwright evidence. |
| Documentation sync | Specs, tasks, contracts, and affected docs will change with implementation; deferrals remain unresolved | **PASS** — `research.md`, `data-model.md`, two internal contract notes, `quickstart.md`, future `tasks.md`, package-boundary notes, AGENTS active-plan context, and final evidence must use the same temporary boundary and unchanged Deferred Decision IDs. Historical/frozen documents are not rewritten. |

**Pre-research verdict**: **PASS** — Research could proceed because the feature explicitly narrows
itself to current frontend compatibility and leaves all canonical scope, lifecycle, and API choices
unresolved.

**Post-design verdict**: **PASS** — Phase 1 uses visibly legacy scope names, Customers-only writes,
read-only Inventory/Order/Invoice ports, independently scoped relationship reads, one stable runtime,
manual retry, and non-authoritative diagnostics. No design artifact introduces a canonical
`businessId`, public transport contract, cross-owner write, or Deferred Decision answer.

## Phase 0: Research Outcome

All planning unknowns are resolved in [research.md](./research.md). The decisions most important to
implementation are:

1. Add common `LegacyCommerceBusinessUnitScope` and `LegacyCommerceBranchScope` without replacing
   Feature 052's Product scope export.
2. Preserve business-unit-wide Customer reads; carry active Branch only on Customer create.
3. Use Branch Inventory reads, Branch-filtered Order/Invoice route lists, and business-unit-scoped
   detail/link reads to reproduce existing cross-Branch navigation safely.
4. Extend the existing browser/memory stores through domain-narrow ports; never expose storage to a
   repository, hook, or page.
5. Use explicit repository surfaces and no new pagination or generic CRUD base.
6. Disable every automatic retry path; only users retry failed reads/mutations.
7. Use a repository-backed Customer facade for remaining consumers and delete provider callbacks
   only at zero callers.
8. Let retained writers notify an exact-scope React Query coordinator after successful commit;
   never duplicate operational writes.
9. Use application services only for scope-safe multi-repository read composition.
10. Preserve current fallbacks and monetary snapshots as presentation compatibility, not domain
    rules.

No new dependency or technology choice is required.

## Phase 1: Design Outcome

- [data-model.md](./data-model.md) records temporary scopes, exact legacy record fields,
  create/update transitions, read projections, error categories, relationship validation, and
  full-scope query-key shapes.
- [frontend-internal-commerce-repositories.md](./contracts/frontend-internal-commerce-repositories.md)
  defines the minimum repository and narrow store ports, deterministic options, and non-authority
  fence.
- [compatibility-read-models.md](./contracts/compatibility-read-models.md) defines bounded read
  services, hook/cache behavior, the Customer facade, retained-write coordinator, runtime direction,
  accessibility states, and responsibility matrix.
- [quickstart.md](./quickstart.md) defines characterization-first delivery and complete validation
  evidence.

## Project Structure

### Documentation (this feature)

```text
specs/053-commerce-repository-expansion/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── frontend-internal-commerce-repositories.md
│   └── compatibility-read-models.md
├── checklists/
│   └── requirements.md
└── tasks.md                  # Phase 2 output from /speckit-tasks; not created here
```

### Source Code (repository root)

```text
packages/contracts/src/commerce/
├── common/                   # new legacy scope/list/error primitives; no runtime code
├── customers/                # new Customer record/commands/repository contract
├── inventory/                # new read-only Inventory record/repository contract
├── orders/                   # new read-only Order record/repository contract
├── invoices/                 # new read-only Invoice record/repository contract
└── products/                 # existing Feature 052 exports remain compatible

packages/sdk/src/commerce/
├── common/                   # deterministic latency/failure/diagnostic mechanics only
├── customers/                # mock repository, serializer, facade, contract tests
├── inventory/                # read-only mock repository, serializer, contract tests
├── orders/                   # read-only mock repository, serializer, contract tests
├── invoices/                 # read-only mock repository, serializer, contract tests
└── products/
    ├── BrowserStorageCommerceStore.ts   # extend additively; only affected-key owner
    ├── MemoryCommerceStore.ts           # extend additively; Product construction compatible
    ├── MockCommerceStore.ts             # existing Product port stays source-compatible
    ├── createCommerceServices.ts        # extend the one composition root additively
    └── ...                              # all existing Product behavior/tests preserved

apps/commerce/features/
├── products/                 # existing Feature 052 hooks/services/tests unchanged
├── customers/
│   ├── application/          # Customer-history service only where composition is required
│   ├── hooks/                # list/item/create/update, query keys/cache publication
│   ├── i18n/                 # new async/validation/recovery messages
│   └── __tests__/
├── inventory/
│   ├── application/          # Product + Branch Inventory projection
│   ├── hooks/                # read queries and exact-scope keys
│   ├── i18n/
│   └── __tests__/
├── orders/
│   ├── application/          # read-only Customer/Invoice composition
│   ├── hooks/
│   ├── i18n/
│   └── __tests__/
└── invoices/
    ├── application/          # read-only Order/Customer detail/document composition
    ├── hooks/
    ├── i18n/
    └── __tests__/

apps/commerce/lib/commerce/
├── commerce-runtime-config.ts           # remains the sole environment reader
├── CommerceServicesProvider.tsx         # holds stable repositories/services once
└── CommerceProviders.tsx                # preserves provider order and AppProvider

apps/commerce/lib/store/
└── AppProvider.tsx                      # retain excluded writers/readers; remove Customer
                                         # callbacks only after zero-consumer proof

apps/commerce/app/(commerce)/
├── customers/{page.tsx,[id]/page.tsx}
├── inventory/page.tsx
├── orders/{page.tsx,[id]/page.tsx}
├── invoices/{page.tsx,[id]/page.tsx,[id]/document/page.tsx}
└── pos/page.tsx

tests/e2e/
├── commerce-044.spec.ts
├── commerce-052-*.spec.ts
├── commerce-053-characterization.spec.ts
├── commerce-053-customers.spec.ts
├── commerce-053-read-models.spec.ts
└── commerce-053-localization-accessibility.spec.ts
```

**Structure Decision**: Extend the existing `packages/contracts` → `packages/sdk` →
`apps/commerce/features` → app/provider layering established by Feature 052. Keep the current
Product-owned file paths and exports as compatibility anchors while extending store classes and the
single composition root additively. Domain-specific contracts/repositories prevent a generic CRUD
abstraction from accidentally granting writes. No application imports another application, and
`packages/shared` receives no Commerce persistence or business behavior.

`AGENTS.md` currently describes `packages/sdk` as API clients/fetch helpers and does not list the
already-established `packages/contracts` compatibility package. Implementation documentation must
add a bounded, explicit note for the Feature 052/053 frontend-internal mock SDK/contract seam rather
than silently broadening shared-package ownership or rewriting frozen history.

## Incremental Migration Sequence

### Checkpoint 0 — Characterize before structural change

- Seed deterministic complete, missing, corrupt, dangling, and cross-scope fixtures.
- Capture Customers, Inventory, Orders, Invoices, Invoice document, POS, storage/refresh,
  relationship, EN/AR, direction, keyboard, and assistive behavior.
- Record existing route-specific fallbacks, including Product-without-Inventory and Invoice
  detail/document Customer resolution.
- Do not change a data source until the corresponding baseline passes.

### Checkpoint 1 — Add contracts and store ports

- Add common visibly legacy scope/error/list primitives.
- Add Customers read/write and Inventory/Order/Invoice read-only contracts.
- Add domain-narrow store ports and serializers.
- Extend browser and memory stores without moving/removing Feature 052 Product exports.
- Run the same repository conformance cases against memory and browser-compatible stores.

### Checkpoint 2 — Compose a stable runtime

- Extend `createCommerceServices` with new repositories, Customer facade, bounded read services,
  and the read coordinator.
- Construct instances once in `CommerceServicesProvider`; keep `AppProvider` nested for excluded
  responsibilities.
- Strengthen QueryClient/hook defaults to prohibit automatic retry/focus/reconnect/remount refetch.
- Prove stable service identity, unavailable HTTP safety, and implementation-selection boundaries.

### Checkpoint 3 — Migrate Customers completely

- Cut Customer list/detail/search, metrics/history, POS selection, POS create, and Customer update to
  hooks/repository-backed composition.
- Preserve create/update ID/timestamp/trim/order behavior and unknown fields.
- Publish facade snapshots only after atomic success; invalidate only matching business-unit keys.
- Source-scan active Customer writers, then remove obsolete provider callbacks only at zero callers.
- Verify Order/Invoice references remain byte-identical and browser refresh persists the result.

### Checkpoint 4 — Migrate Inventory reads

- Compose Feature 052 Products with Branch Inventory through a read-only service.
- Preserve current effective quantity, missing-row fallback, ordering, summaries, filters, and
  low/out/in-stock presentation.
- Keep adjustment, movement, transfer, sale deduction, return restock, and other writes unchanged.
- Notify exact affected Branch projection keys only after retained writes commit.

### Checkpoint 5 — Migrate Order reads

- Cut `/orders` to the Branch-filtered query and `/orders/<id>` to business-unit-safe detail
  composition.
- Preserve stored item/commercial snapshots, Customer/Product links, Invoice links, filters, routes,
  and current return/provider input.
- Keep creation, pricing, discounts, tax, payment, cancellation, fulfillment, returns, and Inventory
  effects on their existing single paths.
- Notify Branch list, BU item, related Customer history, and Inventory views after retained commit.

### Checkpoint 6 — Migrate Invoice reads

- Cut Invoice list/detail/document to read-only repositories/services with scope-checked Order and
  Customer joins.
- Preserve identifiers, numbering snapshots, stored totals, routes, and characterized
  detail/document fallbacks.
- Keep issuance, numbering rules, tax authority integration, payment status, credit notes,
  accounting, and returns on retained paths.
- Notify exact Invoice and linked Order views only after retained commit.

### Checkpoint 7 — Consolidate compatibility and documentation

- Leave unrelated dashboard/report/notification/transfer/return consumers on `AppProvider` unless
  an included journey requires their read.
- Prove no partial scoped repository read replaces a full legacy mutable collection.
- Synchronize package-boundary notes, internal contracts, migration map, and zero-consumer evidence.
- Preserve `AppProvider`; do not treat it as the repository center.

### Checkpoint 8 — Full no-regression gate

- Run all repository/store/integration/hook tests, deterministic tests 20 times, and browser tests.
- Run Feature 052 Products, Commerce 044, and Core 050 when shared dependency/state impact applies.
- Run strict TypeScript, ESLint zero warnings, root/Commerce production builds, EN/AR, RTL/LTR,
  keyboard, screen-reader, and axe gates.
- Re-run the Constitution checklist and stop on any canonical scope, ownership, contract, lifecycle,
  or cross-domain conflict.

## Test Evidence and N/A Rationale

| Test/evidence category | Plan |
|---|---|
| Domain/unit invariants | Customer validation/atomicity/immutability; scope normalization; deterministic rule matching; query-key exactness |
| Repository/store contracts | Every included operation against memory and browser-compatible stores, including corrupt/unavailable storage and no read rewrite |
| Integration | Composition identity, facade publication, retained-write coordination, scope/cache isolation, relationship joins, refresh persistence |
| End-to-end | Characterized Customer/POS, Inventory, Order, Invoice/document routes and retained-write observation |
| Localization/direction | Every required state in EN/LTR and AR/RTL with mixed-direction data |
| Accessibility | Keyboard, semantic names/labels, focus, announcements, pending/error association, non-color-only, axe |
| Audit | **N/A** — no production/consequential canonical write or backend; local diagnostics explicitly make no Audit claim. Production append-only Audit remains a cutover prerequisite. |
| Production authorization | **N/A** — no backend and no canonical scope contract; frontend fail-closed tests are defense in depth only. Owner/server authorization remains a cutover prerequisite. |
| Observability | Sanitized deterministic local diagnostic contract/tests; production logs/metrics/traces/health are N/A until separately governed backend integration |
| Cross-OS contract | **N/A** — no other OS is consumed; all included references remain within Commerce compatibility reads |
| Core 050 | Required when shared-package dependency/state analysis finds impact; otherwise record explicit dependency-based N/A evidence |

## Complexity Tracking

No Constitution violation or exceptional project complexity is required. The four domain-specific
repositories are intentional ownership boundaries, not independent deployable projects. Bounded
application services exist only for multi-repository reads; simple CRUD remains direct.
