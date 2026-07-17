# Implementation Plan: Architecture Hardening

**Branch**: `054-architecture-hardening` | **Date**: 2026-07-17 | **Spec**:
[spec.md](./spec.md)  
**Input**: Feature specification from `/specs/054-architecture-hardening/spec.md`

## Summary

Harden the frontend repository foundation from Features 052 and 053 without changing business
behavior. The implementation removes framework and concrete-infrastructure dependencies from
application code, makes retained Commerce operations owner-aligned and provider-independent,
removes Commerce write authority from Core, relocates Commerce policy out of `packages/shared`,
isolates browser storage, narrows SDK exports, classifies relationship failures, and enforces the
approved dependency direction across all active frontend production source.

The design is incremental and compatibility-first:

```text
UI / React adapters
  -> Feature hooks
  -> Application ports and focused owner services
  -> Repository / compatibility contracts
  -> SDK implementations
  -> Storage and browser infrastructure adapters
```

React Query remains an outer cache adapter. `CommerceServicesProvider` creates one stable runtime.
`AppProvider` remains temporarily as a compatibility publisher/delegator, not a business-rule or
write owner. Product-media association remains Commerce-owned, while Workspace storage quota and
usage delegate to a Core Storage Coordination compatibility port in accordance with the frozen
Core boundary.

## Technical Context

**Language/Version**: TypeScript 5.9.3 strict mode; React 19.2.4; Node.js 24.15.0  
**Primary Dependencies**: Next.js 16.2.6 App Router, TanStack React Query 5.101.2, ESLint 9.39.4,
existing NexoraXS contracts/SDK/shared/UI packages; no architecture framework  
**Storage**: Existing `localStorage`/`sessionStorage` compatibility keys behind exact approved
browser adapters/helpers; existing memory stores for deterministic tests; no database/network  
**Testing**: Vitest 4.1.10, jsdom 29.1.1, Testing Library React 16.3.2, Playwright 1.61.0,
axe-playwright 4.12.1, TypeScript compiler API architecture fixtures, strict type checks, zero-warning
ESLint, production builds  
**Target Platform**: Current Core Platform and Commerce OS Next.js web applications in supported
modern desktop browsers; English/LTR and Arabic/RTL  
**Project Type**: pnpm 9.15.9/Turborepo 2.9.12 frontend monorepo with multiple Next.js apps and
shared TypeScript packages; no backend change  
**Performance Goals**: Preserve current route/render/interaction behavior; keep repositories,
services, ports, cache adapter, and client stable through 100 provider rerenders; keep exact-scope
invalidation bounded to the changed scope; produce identical results across 20 deterministic runs  
**Constraints**: No business-behavior, route, UI, identifier, key, seed, persistence, numbering,
calculation, retry, localization, direction, or accessibility regression; no direct app-to-app
internal imports; no React/React Query/browser/SDK concrete dependency in application modules; no
HTTP/Laravel/API/DTO/pagination/idempotency/backend authorization/upload/offline design  
**Scale/Scope**: All active frontend production files under `apps/**` and `packages/**` after the
clarified exclusions; seven focused retained-operation areas (setup, media, Inventory, Transfers,
Returns, Orders, Invoices); Core shell/Product Hub/billing projections and handoff; Feature 052/053,
Commerce 044, and affected Core 050 regression surfaces

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Gate | Required evidence | Result |
|---|---|---|
| Frozen authority | Controlling Freeze/Accepted ADR references; no unresolved contradiction | **PASS** — Controlled by the Core Platform and Commerce OS v1.0 Freezes, Accepted ADR-004/024/025/033/034/035/036/038/040, approved Core/Commerce baselines, and Constitution v2.0.0. Proposed ADR-041 is excluded. The initial media/quota wording is narrowed by higher authority: Commerce owns Product-media association/orchestration; Core Storage Coordination retains Workspace quota/usage policy. |
| Ownership | Owning domain, canonical facts, write models, and target validation are explicit | **PASS** — Core retains identity, organization, commercial context, and Storage Coordination. Commerce Setup, Product, Inventory, Transfers, Returns, Orders, Customers, Invoices/Documents, Taxes/Pricing, and Reporting retain their frozen logical ownership. The extracted browser-demo services are temporary compatibility behavior, not new canonical write models. |
| Organization and tenancy | Workspace, Business, Business Unit, Department, Branch, OS, actor, and resource scope are explicit as applicable | **PASS** — Every protected compatibility operation uses Workspace plus explicit legacy Business Unit and applicable Branch, actor, OS, action, and resource. Canonical Business/Department are unavailable and are not inferred. Client/handoff IDs remain inputs, never proof of authorization. |
| OS independence | No core workflow requires another OS; no direct cross-OS database/internal-state access | **PASS** — Commerce remains independently usable and imports no Core internal module. Core consumes only a public read-only Commerce projection/handoff port and never writes Commerce records or relies on fallback mutation. |
| Knowledge and AI order | Capability/Knowledge/Rules/Business Brain/Recommendation/AI boundaries are preserved | **N/A with rationale** — The feature introduces no Capability, Knowledge, Rule, Business Brain, Recommendation, Marketplace, or AI behavior; their order and ownership remain untouched. |
| Lifecycle separation | Entitlement, Subscription, installation, setup, configuration, activation, readiness, and access remain distinct as applicable | **PASS** — Existing setup/handoff behavior is relocated only. No lifecycle state, `OSEnablement` successor, Product/Customer/Order/Invoice lifecycle, or readiness meaning is created or changed. |
| Contracts and compatibility | Boundary contracts are owner-governed, versioned, and backward-compatible or have an approved migration | **PASS** — New ports are visibly legacy, frontend-internal, additive seams. They preserve 052/053 repository/record behavior and do not define public API, DTO, pagination, error, Event, idempotency, or upload contracts. SDK export narrowing includes controlled test migration. |
| Security and operations | Authorization, privacy, Audit, observability, failure, and recovery requirements are planned | **PASS** — Scope mismatch fails closed; foreign records are not disclosed; diagnostics contain rule/file metadata only; storage/deterministic/unknown failures remain visible; manual retry remains explicit. Existing browser-demo writes are noncanonical compatibility behavior. Production authorization, append-only Audit, transport reliability, and backend observability remain mandatory blockers for future backend integration. |
| Product quality | Arabic/English, RTL/LTR, accessibility, and measurable UX criteria are planned | **PASS** — No redesign occurs. Existing localized loading/empty/error/manual-retry/validation/pending/success states, keyboard operation, focus, semantics, logical direction, and assistive behavior are regression gates. |
| Verification | Risk-appropriate automated/manual tests cover invariants and acceptance scenarios | **PASS** — Characterization precedes each move. Planned evidence covers ports, services, ownership, exact-scope cache changes, storage, package exports, architecture fixtures, relationship errors, media conversion, deterministic behavior, Feature 052/053, Commerce 044, Core 050, strict type/lint/build, Playwright, localization, and accessibility. |
| Documentation sync | Specs, tasks, contracts, and affected docs will change with implementation; deferrals remain unresolved | **PASS** — `spec.md`, this plan, research, data model, three internal contracts, quickstart, future tasks, package-boundary notes, AGENTS context, and implementation evidence remain synchronized. Frozen/historical sources are cited, not rewritten; all listed Deferred Decisions remain unresolved. |

**Pre-research verdict**: **PASS** — Research may proceed because the only apparent conflict is
resolved by preserving Core Storage Coordination ownership while still extracting media/quota
behavior from Commerce `AppProvider`.

**Post-design verdict**: **PASS** — Phase 1 uses owner-specific compatibility ports, a Core-owned
quota seam, no mega-owner, framework-neutral application boundaries, read-only Core projections,
private SDK infrastructure, exact-scope cache adaptation, and comprehensive source enforcement.
No design artifact resolves a canonical ownership, lifecycle, API, DTO, pagination, idempotency,
authorization, upload, storage-product, aggregate, transaction, or offline decision.

## Phase 0: Research Outcome

[research.md](./research.md) resolves the implementation choices. Key decisions are:

1. Extract retained behavior into focused owner-aligned services and narrow ports, not one general
   operational owner.
2. Keep Workspace storage quota/usage under Core Storage Coordination; Commerce owns only
   Product-media association/orchestration.
3. Replace the application-layer `QueryClient` coordinator with a framework-neutral change port
   and an outer React Query adapter.
4. Type Product/Customer compatibility through interfaces and keep SDK facade classes private.
5. Select infrastructure in one SDK Commerce factory and assemble React/application adapters once
   at the app runtime root.
6. Replace Core Commerce writes with a narrow read-only projection and explicit handoff/bootstrap
   port that tolerates absence/failure.
7. Reduce `AppProvider` to context gathering, delegation, publication, and current UI feedback.
8. Move Commerce policy out of `packages/shared` once, into its frozen owner-aligned module.
9. Use exact-file browser-storage allowlists and preserve each helper's existing failure semantics.
10. Enforce all active frontend production source through a TypeScript-AST scanner plus targeted
    ESLint restrictions; add only root TypeScript, no architecture framework.
11. Limit the SDK root to composition/stable runtime types and provide one controlled testing path.
12. Convert only typed compatibility `not_found` relationship failures to optional absence.
13. Replace application-layer `File` with byte/metadata `LegacyMediaSource` and an outer browser
    canvas adapter.
14. Characterize ID/time ordering, sequential commits, partial failures, duplicate-item quirks,
    same-tick Order→Invoice, separate-origin handoff, and refresh behavior before movement.

No `NEEDS CLARIFICATION` remains.

## Phase 1: Design Outcome

- [data-model.md](./data-model.md) defines the temporary scopes, change inputs, compatibility ports,
  owner-command inputs/results, media source, projection/handoff values, relationship failure
  classification, architecture rules, and state/publication transitions.
- [application-runtime-boundaries.md](./contracts/application-runtime-boundaries.md) defines the
  dependency direction, stable composition, facade ports, cache adapter, media/quota split, and
  relationship-error behavior.
- [legacy-operational-handoffs.md](./contracts/legacy-operational-handoffs.md) defines owner-specific
  retained command/store ports, Core projection/handoff behavior, provider delegation, commit
  ordering, and no-parallel-write rules.
- [architecture-enforcement.md](./contracts/architecture-enforcement.md) defines scan coverage,
  layer/import/browser rules, SDK exports, allowlists, diagnostics, and valid/invalid fixtures.
- [quickstart.md](./quickstart.md) defines the characterization-first implementation sequence and
  complete quality evidence.

## Project Structure

### Documentation (this feature)

```text
specs/054-architecture-hardening/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── application-runtime-boundaries.md
│   ├── legacy-operational-handoffs.md
│   └── architecture-enforcement.md
├── checklists/
│   └── requirements.md
└── tasks.md                         # Phase 2 output from /speckit-tasks; not created here
```

### Source Code (repository root)

```text
packages/contracts/src/commerce/
├── common/
│   ├── legacy-commerce-contracts.ts             # existing scope/error compatibility types
│   ├── legacy-compatibility-ports.ts             # Product/Customer port interfaces
│   ├── legacy-commerce-change-port.ts            # framework-neutral notification inputs
│   ├── legacy-commerce-handoff.ts                # Core projection/handoff compatibility values
│   └── legacy-media-source.ts                    # browser-neutral media value
└── operations/
    ├── legacy-inventory-commands.ts              # temporary command/result/owner ports
    ├── legacy-transfer-commands.ts
    ├── legacy-return-commands.ts
    ├── legacy-order-commands.ts
    ├── legacy-invoice-commands.ts
    ├── legacy-setup-commands.ts
    └── legacy-storage-coordination.ts            # Core-owned quota/usage compatibility port

packages/sdk/src/
├── index.ts                                      # composition factory + stable runtime types only
├── testing/index.ts                              # explicit test-only infrastructure surface
└── commerce/
    ├── runtime/createCommerceServices.ts         # only implementation-selection locus
    ├── products/                                 # private concrete facades/repos/stores
    ├── customers/                                # private concrete facades/repos/stores
    ├── inventory/                                # private concrete repos/stores
    ├── orders/                                   # private concrete repos/stores
    ├── invoices/                                 # private concrete repos/stores
    ├── operations/                               # private browser/memory owner-port adapters
    └── integration/                              # private Core projection/handoff + storage adapters

apps/commerce/features/
├── products/
│   ├── application/                              # Product compatibility/media ports and editor
│   └── adapters/                                 # browser File -> LegacyMediaSource mapping
├── setup/application/                            # setup compatibility service/policy
├── media/application/                            # Product-media orchestration only
├── inventory/application/                       # projection + stock adjustment service/policy
├── transfers/application/                       # transfer coordinator/compatibility policy
├── returns/application/                         # return coordinator/refund compatibility policy
├── orders/application/                          # read view + Order creation service
├── invoices/application/                        # read view + Invoice creation service
├── reporting/application/                       # moved Commerce projections/calculations
└── repository-expansion/application/
    └── CommerceChangeNotificationPort.ts         # no React/QueryClient/key imports

apps/commerce/lib/commerce/
├── createCommerceApplicationServices.ts          # application + outer adapter assembly
├── CommerceServicesProvider.tsx                  # one stable runtime and QueryClient
├── cache/ReactQueryCommerceChangeAdapter.ts       # only cache/key invalidation adapter
├── media/BrowserCanvasThumbnailAdapter.ts         # browser image/canvas infrastructure
└── commerce-runtime-config.ts                     # sole Commerce NEXT_PUBLIC environment reader

apps/commerce/lib/store/
└── AppProvider.tsx                               # compatibility state/delegation/publication only

apps/core-platform/
├── lib/commerce/
│   ├── CommerceProjectionPort.ts                 # narrow read-only consumer boundary
│   └── CommerceHandoffAdapter.ts                 # public port consumer, no Commerce internals
├── lib/infrastructure/browser/                   # session/theme/locale adapters
├── components/dashboard/ThemeToggle.tsx          # delegates; no browser storage
└── lib/store/AppProvider.tsx                     # Core state only + Commerce projections

packages/shared/src/
├── ids/                                          # generic ID helpers
├── dates/                                        # generic date helpers
├── formatting/                                   # generic formatting only
├── validation/                                   # generic validation primitives
└── mock-db/storage.ts                            # explicitly approved generic browser adapter

scripts/architecture/
├── frontend-boundaries.mjs                       # reusable TypeScript-AST rule engine
└── source-inventory.mjs                          # deterministic include/exclude/resolution logic

scripts/check-frontend-architecture.mjs            # standard nonzero-exit architecture gate

tests/architecture/
├── frontend-boundaries.test.ts
└── fixtures/
    ├── valid/
    └── invalid/

tests/e2e/
├── commerce-054-characterization.spec.ts
├── commerce-054-architecture-regression.spec.ts
└── existing Commerce 044/052/053 and Core 050 suites
```

**Structure Decision**: Preserve the current `packages/contracts` → `packages/sdk` →
`apps/commerce/features` layering and the existing app routes. Add only frontend-internal ports and
focused owner modules needed to remove current violations. Concrete SDK infrastructure stays inside
the package and is reachable only by its composition factory or test entry. No new deployable
service, backend package, generic CRUD framework, or app-to-app import is introduced.

## Dependency and Composition Design

### Allowed runtime direction

```text
Page / Component
  -> Feature Hook
  -> Application Port or focused Application Service
  -> Repository / owner compatibility Contract
  -> Private SDK implementation
  -> Storage Port
  -> Browser or Memory Adapter

Focused Application Service
  -> CommerceChangeNotificationPort
  <- ReactQueryCommerceChangeAdapter (outer runtime adapter)

Product media orchestration
  -> Browser-neutral media/thumbnail port
  -> Core Storage Coordination compatibility port for quota/usage

Core UI / Provider
  -> Read-only CommerceProjectionPort or Commerce handoff port
  <- Commerce-owned compatibility adapter selected by composition
```

### Stable runtime shape

The provider-facing service object contains only:

- Product, Customer, Inventory, Order, and Invoice repository contracts;
- Product and Customer compatibility port interfaces;
- Customer history, Inventory projection, Order view, and Invoice view application services;
- focused setup/media/Inventory/Transfer/Return/Order/Invoice compatibility services; and
- the framework-neutral Commerce change port where required by inward services.

It contains no concrete facade/repository/store/serializer/simulator type. The `QueryClient` and
React Query adapter remain in the outer provider context and are not exposed to application
services. A test-only factory may inject contract-typed services without widening production types.

## Ownership-Preserving Operational Design

| Coordinator | Narrow dependencies | Provider receives |
|---|---|---|
| Setup compatibility service | Setup read/write port, Core organization context projection, ID/clock | Existing/default or committed setup snapshot |
| Product media service | Browser-neutral thumbnail port, Product association port, Core Storage Coordination port | Existing media reference/result and usage projection |
| Stock adjustment service | Product read contract, Inventory position/movement ports, ID/clock, change port | Existing success/error and committed Inventory/Movement snapshots |
| Transfer service | Transfer record port, Inventory effect port, Product read contract, actor/scope, ID/clock, change port | Existing success/error, Transfer, Inventory, Movement snapshots |
| Return service | Return port plus Order/Invoice/Inventory effect ports, actor/scope, ID/clock, change port | Existing success/error and all committed snapshots |
| Order service | Order port, Product/Inventory ports, actor/scope, ID/clock, change port | Existing Order and Stock/Movement snapshots |
| Invoice service | Invoice port, Order read port, Setup read port, ID/clock, change port | Existing Invoice snapshot |

These are compatibility responsibilities, not final aggregate or transaction boundaries. Each
keeps the current synchronous/sequential browser behavior until a future governed backend design.

## Incremental Migration Sequence

### Checkpoint 0 — Characterize before movement

- Capture every direct storage read/write, validation branch, error/toast, UID/time call, record
  byte shape, write order, partial failure, state publication, and cache invalidation.
- Add Core projection/handoff tests on both normal navigation and separate-origin refresh.
- Add media no-file/cancel/compression/quota/success/create-rollback/edit-failure cases.
- Add relationship not-found, foreign-scope, configured, storage, configuration, and unknown cases.
- Confirm all Feature 052/053, Commerce 044, and affected Core 050 baselines pass before structural
  edits.

### Checkpoint 1 — Add ports and architecture fixtures

- Add application-facing Product/Customer interfaces, change port, media source, Core projection,
  handoff, Storage Coordination, and focused owner command/store ports.
- Build valid/invalid architecture fixtures and rule-engine unit tests before enabling the real
  production scan.
- Keep every port explicitly legacy/frontend-internal and free of React/browser/transport types.

### Checkpoint 2 — Invert cache coordination

- Implement the outer React Query change adapter with exact current key factories.
- Replace `LegacyCommerceReadCoordinator` injection with the application port.
- Preserve post-commit timing and full scope; add Customer history-list invalidation where the
  active Customer projection depends on changed Orders.
- Prove no application file imports React Query or query-key modules.

### Checkpoint 3 — Hide compatibility implementations

- Type hooks/provider/services against Product/Customer ports.
- Keep concrete SDK facade creation private to the composition factory.
- Migrate implementation-dependent tests to `@nexoraxs/sdk/testing`.
- Narrow package exports only after production consumers use ports.

### Checkpoint 4 — Correct relationship error classification

- Make repositories distinguish genuine absence from a non-disclosing foreign-scope match.
- Convert only typed `not_found` to optional relation absence.
- Propagate every other error to the current React Query error/manual-retry UI.
- Preserve `retry: false` and prohibit effect/timer/focus/reconnect retries.

### Checkpoint 5 — Move policy from shared by owner

- Move one policy family at a time with byte/numeric equivalence tests.
- Update Commerce consumers and Core projection consumers through approved ports.
- Remove the old export immediately after zero-consumer proof; never keep two active copies.
- Leave shared with only the generic capabilities approved by this plan.

### Checkpoint 6 — Extract setup and media

- Extract setup defaults/read/save and Product-media association from the provider.
- Move browser `File` conversion and canvas work outward; keep application media byte-based.
- Delegate quota/usage to Core Storage Coordination and preserve current missing-usage, overflow,
  write-order, and toast results.
- Keep Product create compensation and edit ordering unchanged.

### Checkpoint 7 — Extract operational writes in bounded slices

Migrate and verify separately:

1. Stock adjustment;
2. Transfer;
3. Order creation and Stock effects;
4. Invoice creation;
5. Return and its affected-owner effects.

For each slice, the old callback delegates before its internal rule body is removed. Tests prove one
write path, one current result, one provider publication, and exact-scope notification. Never stage
parallel writes.

### Checkpoint 8 — Remove Core Commerce ownership

- Replace Core operational arrays with the narrow Commerce projection needed by shell/Product Hub/
  billing.
- Route demo/setup initiation through the explicit Commerce handoff/bootstrap port.
- Remove unused Core Product/Customer/Order/Invoice/setup write callbacks after source-scan and
  behavior evidence.
- Remove Core writes to Commerce keys and Commerce fallback construction of Core identities.
- Persist only a read-only handoff context projection required for Commerce refresh compatibility.

### Checkpoint 9 — Isolate browser storage

- Route provider/demo/theme/session operations through exact approved infrastructure helpers.
- Make Core `ThemeToggle` call provider/theme behavior only.
- Delete unused legacy helpers after zero imports or move them into the classified infrastructure
  path without changing keys or storage selection.
- Run the whole-source storage-global rule with no debt allowlist.

### Checkpoint 10 — Enable comprehensive enforcement and finish encapsulation

- Enable the production architecture CLI in root lint/quality scripts.
- Add zero-warning lint and strict typecheck tasks for all apps/packages.
- Finalize SDK root/testing exports and verify package-manifest plus barrel surfaces.
- Remove superseded selected-directory assertions or adapt them to the central rule engine without
  losing Feature 052/053 compatibility checks.

### Checkpoint 11 — Full no-regression gate

- Run architecture, lint, type, unit, build, Commerce and Core Playwright, localization,
  accessibility, and twenty-run deterministic gates.
- Confirm routes, IDs, keys, seed relationships, browser refresh, Order/Invoice numbering, Stock
  effects, tax/discount/refund/return values, retry behavior, and UI remain unchanged.
- Synchronize internal contracts, package boundary notes, migration/zero-consumer evidence, and
  implementation validation report.

## Test and Delivery Strategy

### Automated evidence

- Port/service unit tests with memory owner-port fixtures.
- Browser adapter and persistence/refresh tests for every unchanged key.
- Exact-scope cache adapter tests for Product, Customer, Customer histories, Inventory, Order,
  Invoice detail/document, and relationships.
- Provider-delegation tests proving zero business-rule tokens and one service invocation/result
  publication.
- Core source/behavior tests proving no Commerce record construction or key writes.
- Shared ownership tests proving no moved Commerce policy or active duplicate export.
- SDK package export tests plus production rejection of `@nexoraxs/sdk/testing`.
- Relationship classification tests for typed absence and every propagated failure family.
- Product media byte-source, browser adapter, compensation, and visible-behavior tests.
- Whole-tree valid/invalid architecture fixtures and deterministic real-source diagnostics.
- Existing Feature 052/053, Commerce 044, Core 050, English/Arabic, RTL/LTR, keyboard, screen-reader,
  focus, and axe regression evidence.

### Required validation commands

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
pnpm exec playwright test tests/e2e/commerce-044.spec.ts tests/e2e/commerce-052-products-characterization.spec.ts tests/e2e/commerce-052-products.spec.ts tests/e2e/commerce-052-products-accessibility.spec.ts tests/e2e/commerce-052-product-compatibility.spec.ts tests/e2e/commerce-053-characterization.spec.ts tests/e2e/commerce-053-characterization-accessibility.spec.ts tests/e2e/commerce-053-customers.spec.ts tests/e2e/commerce-053-read-models.spec.ts tests/e2e/commerce-053-localization-accessibility.spec.ts tests/e2e/commerce-054-characterization.spec.ts tests/e2e/commerce-054-architecture-regression.spec.ts
pnpm exec playwright test --config=playwright.core.config.ts tests/e2e/core-050-shell.spec.ts tests/e2e/core-050-performance.spec.ts
git diff --check
```

The exact deterministic script may be extended additively for Feature 054, but it must execute the
relevant deterministic suite twenty consecutive times with identical results.

## Complexity Tracking

No Constitution violation or architecture exception is accepted. The TypeScript-AST scanner and
controlled SDK testing entry are bounded implementation mechanisms required to enforce existing
rules, not new architectural owners or runtime services.
