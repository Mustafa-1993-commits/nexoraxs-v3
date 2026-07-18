# Implementation Plan: Commerce Order Command Boundary

**Branch**: `055-commerce-order-command-boundary` | **Date**: 2026-07-17 | **Spec**:
[spec.md](./spec.md)  
**Input**: Feature specification from `/specs/055-commerce-order-command-boundary/spec.md`

## Summary

Move the current Commerce Order write side behind owner-aligned, frontend-internal command
boundaries without changing behavior or defining a backend. The implementation extracts transient
cart/calculation behavior into a POS-owned draft service, coordinates the current Order → Invoice →
last-Order sequence in a POS-owned checkout service, narrows persisted Order creation to an
Orders-owned service and repository, delegates sale stock effects to Inventory, routes Return's
existing Order-field change through an Orders-owned handoff, and keeps browser storage behind the
established Commerce store.

Research proves that the active persisted surface is deliberately small: create Order, an indirect
Return compatibility patch, and an empty demo bootstrap write. General update, remove/delete,
cancel, status change, persisted line/discount/price changes, reservation, release, and Order-owned
restoration do not exist and remain absent.

```text
POS UI
  -> POS command hooks
  -> POS draft / checkout services
  -> Orders, Invoice, publication, and last-Order application ports

Orders create service
  -> Order command repository + number port
  -> Inventory-owned prepare/commit port
  -> framework-neutral change notification port

Private local repositories
  -> storage ports
  -> BrowserStorageCommerceStore or memory test store
```

All active local commands remain synchronous. React Query remains an outer exact-scope cache
adapter and is not command truth. `CommerceServicesProvider` creates one stable runtime;
`AppProvider` remains only a compatibility publisher/delegator. No HTTP repository, Laravel/API
shape, canonical lifecycle, canonical Business mapping, transaction, locking, or idempotency
behavior is introduced.

## Technical Context

**Language/Version**: TypeScript 5.9.3 strict mode; React 19.2.4; Node.js 24.15.0  
**Primary Dependencies**: Next.js 16.2.6 App Router, TanStack React Query 5.101.2 for existing
read-cache orchestration only, ESLint 9.39.4, existing `@nexoraxs/contracts`, `@nexoraxs/sdk`,
`@nexoraxs/types`, `@nexoraxs/shared`, and `@nexoraxs/ui`; no new dependency  
**Storage**: Existing browser `localStorage` collection keys and `nx_last_order_id` session key
behind approved infrastructure adapters; `BrowserStorageCommerceStore` plus memory stores for
deterministic tests; no network/database  
**Testing**: Vitest 4.1.10, jsdom 29.1.1, Testing Library React 16.3.2, Playwright 1.61.0,
axe-playwright 4.12.1, TypeScript-AST architecture fixtures, strict type checks, zero-warning
ESLint, production builds, twenty-run deterministic validation  
**Target Platform**: Commerce OS Next.js web application in supported modern desktop browsers;
English/LTR and Arabic/RTL; current Core shell/handoff regression surface only  
**Project Type**: pnpm 9.15.9/Turborepo 2.9.12 frontend monorepo with shared TypeScript packages;
no backend change  
**Performance Goals**: Preserve current synchronous same-tick Order result and checkout response;
create services/repositories once and retain identity through 100 provider rerenders; invalidate
only exact applicable scope; produce identical results across twenty deterministic executions  
**Constraints**: No route, UI, callback timing, identifier, number, timestamp, key, serialized
shape, seed, applied calculation, stock effect, Invoice/Return behavior, manual recovery,
localization, direction, accessibility, or characterized partial-failure regression; no direct
browser/framework/concrete-infrastructure dependency in application code; no new automatic retry,
pending guard, compensation, rollback, transaction, lifecycle, backend, or transport semantics  
**Scale/Scope**: One POS route and success route; one active persisted Order-create path; one
Return-to-Order patch; one demo bootstrap path; Order/Inventory/Movement/Invoice/provider/cache
relationships; existing Feature 053 Order queries; all active frontend production-source
architecture coverage; Features 044 and 052-054 plus affected Core 050/054 regressions

## Constitution Check

*GATE: Passed before Phase 0 research and re-checked after Phase 1 design.*

| Gate | Required evidence | Result |
|---|---|---|
| Frozen authority | Controlling Freeze/Accepted ADR references; no unresolved contradiction | **PASS** — Controlled by the Commerce OS v1.0 Freeze, Commerce Readiness/Wave 1, the applicable Core Platform v1.0 Freeze, Accepted ADR-004/024/025/033/034/035/036/038/040, and Constitution v2.0.0. The design follows the frozen POS, Orders, Inventory, Pricing/Taxes, Returns, Invoice/Documents, and Core ownership boundaries. DD-01, DD-14-25, DD-29/30, and DD-34-40 remain unresolved. |
| Ownership | Owning domain, canonical facts, write models, and target validation are explicit | **PASS** — POS owns transient sale interaction and checkout coordination; Orders alone creates/patches Order records and retains applied snapshots; Inventory alone owns Stock/Movement rules and writes; Invoice/Documents retains Invoice creation; Returns retains Return behavior; Core performs no Order write. No new canonical model is declared. |
| Organization and tenancy | Workspace, Business, Business Unit, Department, Branch, OS, actor, and resource scope are explicit as applicable | **PASS** — Commands require Workspace, explicit legacy Business Unit, applicable Branch, Commerce OS, actor, action, and resource context. Numbering uses Workspace + legacy Business Unit because Branch is not currently applicable. Canonical Business/Department are unavailable and not inferred; client IDs are inputs, not authorization proof. |
| OS independence | No core workflow requires another OS; no direct cross-OS database/internal-state access | **PASS** — Commerce remains independently usable. No other OS is introduced, no app imports another app, and Core neither writes nor provides fallback Order state. Existing Core projection/handoff behavior remains contract-only and unchanged. |
| Knowledge and AI order | Capability/Knowledge/Rules/Business Brain/Recommendation/AI boundaries are preserved | **N/A with rationale** — The feature changes only current local Commerce command boundaries. It introduces no Capability, Knowledge, Rule, Business Brain, Recommendation, Marketplace, or AI behavior. |
| Lifecycle separation | Entitlement, Subscription, installation, setup, configuration, activation, readiness, and access remain distinct as applicable | **PASS** — No commercial or OS lifecycle is changed. Absent Order cancel/delete/status/reservation operations remain absent; the Return patch and demo seed are explicitly compatibility-only and establish no canonical lifecycle. |
| Contracts and compatibility | Boundary contracts are owner-governed, versioned, and backward-compatible or have an approved migration | **PASS** — Ports are additive, visibly legacy, frontend-internal seams. Feature 053 read contracts remain unchanged. Existing record/key/callback shapes and sync timing remain compatible. No port is described as a public API, Event, DTO, or final backend contract. |
| Security and operations | Authorization, privacy, Audit, observability, failure, and recovery requirements are planned | **PASS** — Complete legacy scope fails closed, foreign rows are neither counted nor disclosed, deterministic/storage/unknown failures remain explicit, and diagnostics omit tenant data. Current sequential partial failures/manual recovery remain characterized. Production authorization, append-only Audit, server observability, idempotency, and reconciliation stay mandatory future gates rather than invented browser guarantees. |
| Product quality | Arabic/English, RTL/LTR, accessibility, and measurable UX criteria are planned | **PASS** — No redesign occurs. Existing localized stock/sale failures, route/dialog/toast/pending/success states, keyboard shortcuts, accessible names, focus, screen-reader semantics, non-color cues, and logical direction are regression gates. |
| Verification | Risk-appropriate automated/manual tests cover invariants and acceptance scenarios | **PASS** — Characterization precedes movement. Planned evidence covers the supported/absent inventory, POS draft, calculations, repository/service/port contracts, scope, number/ID/time order, Inventory effects, browser refresh, every failure stage, Return/bootstrap handoffs, provider/cache behavior, architecture fixtures, stable composition, deterministic repetition, Features 044/052-054, Core 050/054, type/lint/build, localization, accessibility, and Playwright. |
| Documentation sync | Specs, tasks, contracts, and affected docs will change with implementation; deferrals remain unresolved | **PASS** — `spec.md`, this plan, research, data model, three internal contracts, quickstart, future tasks, architecture fixtures/rules, implementation evidence, and AGENTS plan context remain synchronized. Frozen/historical sources are not rewritten and every Deferred Decision remains explicitly open. |

**Pre-research verdict**: **PASS** — The clarified boundary resolves the apparent POS/Orders and
Return/Orders ownership ambiguities without changing frozen ownership. The known current lookup and
numbering scope weakness is narrowed by explicit Workspace isolation as required by ADR-034 and the
specification; it is not preserved as unsafe compatibility behavior.

**Post-design verdict**: **PASS** — Phase 1 maintains owner-specific ports, synchronous local
compatibility timing, one storage adapter and composition locus, exact-scope change intent, and an
explicit supported/absent command inventory. No artifact creates a lifecycle, public contract,
backend, transaction, pricing/tax, Inventory reservation, authorization, idempotency, or canonical
Business decision.

## Phase 0: Research Outcome

[research.md](./research.md) resolves all planning choices. Key decisions are:

1. Freeze the real command inventory before movement and keep all unimplemented commands absent.
2. Keep transient draft rules under POS and persisted Order changes under Orders.
3. Preserve a single synchronous local command contract; do not add Promise/HTTP timing or React
   Query mutations to the application layer.
4. Add a narrow synchronous Order command repository beside the unchanged Feature 053 async read
   repository.
5. Extend `BrowserStorageCommerceStore` and `MemoryCommerceStore` with distinct command methods so
   one adapter owns the unchanged Order key.
6. Split Inventory sale effects into read/validate `prepare` and post-Order `commit` operations so
   Inventory retains ownership while current write order remains unchanged.
7. Apply complete Workspace/legacy-Business-Unit/Branch isolation; scope numbering by Workspace +
   legacy Business Unit only.
8. Put the current `computeDoc` result behind a compatibility composite port without promoting it
   to canonical Pricing or Tax policy.
9. Coordinate Order → provider publication → Invoice → publication → last-Order in POS and leave
   navigation in the UI.
10. Put `nx_last_order_id` behind a POS port/browser adapter.
11. Route only Return's Order-owned field patch through Orders while preserving the surrounding
    Return write and notification sequence.
12. Extend the established two-stage SDK/application composition root and keep concrete command
    infrastructure private.
13. Reuse the framework-neutral exact-scope change port and outer React Query adapter.
14. Enforce Order write authority and dependency direction through the existing AST/source rules,
    ESLint, SDK exports, and deterministic fixtures.
15. Preserve sequential partial failures and visible error mapping; add no retry, rollback,
    pending guard, or idempotency behavior.
16. Use the existing quality toolchain and repeat focused deterministic suites twenty times.

No `NEEDS CLARIFICATION` remains.

## Phase 1: Design Outcome

- [data-model.md](./data-model.md) defines existing persistent records/keys, scope/context, the
  transient POS draft and commands, applied commercial snapshot, Order command/repository/number
  values, opaque Inventory effect, Return handoff, checkout/publication/last-Order ports, commit
  transitions, failure states, and supported/absent matrix.
- [pos-command-boundary.md](./contracts/pos-command-boundary.md) defines POS draft and checkout
  orchestration, sync timing, publication, last-Order, failure ordering, UI compatibility, and
  contract evidence.
- [order-command-boundary.md](./contracts/order-command-boundary.md) defines the narrow persisted
  Order surface, create orchestration, repository/number/Return handoff, notification, failure,
  composition, and replaceability rules.
- [inventory-storage-and-enforcement.md](./contracts/inventory-storage-and-enforcement.md) defines
  Inventory prepare/commit ownership, storage adapters, two-stage composition, SDK privacy,
  architecture rules, deterministic failures, and verification.
- [quickstart.md](./quickstart.md) defines the authority-first, characterization-first migration
  sequence and complete validation commands.

## Project Structure

### Documentation (this feature)

```text
specs/055-commerce-order-command-boundary/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── pos-command-boundary.md
│   ├── order-command-boundary.md
│   └── inventory-storage-and-enforcement.md
├── checklists/
│   └── requirements.md
└── tasks.md                         # Phase 2 output from /speckit-tasks; not created here
```

### Source Code (repository root)

```text
packages/contracts/src/commerce/
├── common/
│   └── legacy-commerce-handoff.ts                  # existing scoped command context
├── pos/
│   ├── legacy-pos-draft-commands.ts                # transient draft values/service port
│   ├── legacy-pos-checkout.ts                      # checkout/result/publication ports
│   ├── legacy-pos-commercial-snapshot.ts           # compatibility calculator port
│   └── legacy-pos-last-order.ts                    # browser-neutral session reference port
├── orders/
│   ├── legacy-orders-repository.ts                 # unchanged Feature 053 read contract
│   ├── legacy-order-command-repository.ts          # narrow sync persistence contract
│   ├── legacy-order-number-port.ts                 # scoped compatibility sequence
│   └── legacy-order-return-handoff.ts              # explicit Return patch contract
├── inventory/
│   └── legacy-order-inventory-effects.ts           # opaque prepare/commit owner port
└── operations/
    └── legacy-order-commands.ts                    # narrowed create command/result/service port

packages/sdk/src/commerce/
├── products/
│   ├── BrowserStorageCommerceStore.ts              # unchanged keys + sync command store methods
│   └── MemoryCommerceStore.ts                       # deterministic substitute
├── orders/
│   ├── LocalOrderCommandRepository.ts              # private contract implementation
│   ├── legacy-order-serialization.ts               # existing compatible mapping reused
│   └── __tests__/legacy-order-command-repository.contract.ts
├── operations/
│   └── BrowserLegacyCommerceOperationsStore.ts     # Order write authority removed after migration
└── runtime/createCommerceServices.ts               # only SDK implementation-selection locus

apps/commerce/features/
├── pos/
│   ├── application/LegacyPosDraftService.ts
│   ├── application/LegacyPosCheckoutService.ts
│   ├── hooks/useLegacyPosDraftCommands.ts
│   ├── hooks/useLegacyPosCheckout.ts
│   └── hooks/useLegacyPosLastOrder.ts
├── orders/
│   ├── application/LegacyOrderCreationService.ts   # narrow ports only
│   ├── application/LegacyOrderNumberService.ts
│   └── hooks/useLegacyOrderCommands.ts             # if retained consumers need direct adaptation
├── inventory/
│   └── application/LegacyOrderInventoryEffectService.ts
├── returns/application/LegacyReturnCreationService.ts
│                                                   # Order patch delegates through owner handoff
└── setup/application/LegacyCommerceDemoBootstrapService.ts
                                                    # narrow Order bootstrap seam

apps/commerce/lib/commerce/
├── CommerceApplicationServices.ts                 # application-facing port types only
├── createCommerceApplicationServices.ts            # stable app/outer adapter assembly
├── CommerceServicesProvider.tsx                    # one runtime per application lifetime
├── cache/ReactQueryCommerceChangeAdapter.ts         # exact-scope cache mapping only
├── pos/LegacyDocumentSnapshotAdapter.ts             # delegates to existing computeDoc
├── pos/BrowserLegacyPosLastOrderAdapter.ts           # approved session infrastructure
└── publication/LegacyCommandPublicationHub.ts       # React-neutral committed snapshots

apps/commerce/
├── app/(commerce)/pos/page.tsx                     # presentation + navigation only
├── app/(commerce)/pos/success/page.tsx             # hook, no browser storage helper
└── lib/store/AppProvider.tsx                       # compatibility context/delegation/publication

scripts/architecture/
├── frontend-boundaries.mjs                         # Order/POS layer and writer rules
├── frontend-boundary-policy.mjs                    # approved roots/allowlists
└── source-inventory.mjs                            # unchanged full production inventory

tests/architecture/
├── frontend-boundaries.test.ts
├── sdk-exports.test.ts
├── sdk-runtime-substitution.test.ts
└── fixtures/
    ├── valid/order-command-boundary.ts
    └── invalid/order-command-*.ts

tests/e2e/
├── commerce-055-characterization.spec.ts
├── commerce-055-order-commands.spec.ts
├── commerce-055-localization-accessibility.spec.ts
└── existing Commerce 044/052/053/054 and Core 050/054 suites
```

**Structure Decision**: Extend the existing `packages/contracts` → private `packages/sdk`
implementations → `apps/commerce/features` application services/hooks → app presentation layout.
Feature 053 read contracts remain intact. POS is added as its own feature boundary rather than
misclassifying cart state under Orders. Existing `BrowserStorageCommerceStore` remains the named
Order browser adapter. No new deployable service, backend directory, shared business-policy
package, generic command framework, Event bus, or app-to-app import is introduced.

## Dependency and Composition Design

### Allowed runtime direction

```text
POS page / success page / compatibility provider
  -> POS or Order React hook
  -> POS/Order application port or service
  -> owner repository/effect/number/publication/session contract
  -> private SDK or outer adapter implementation
  -> storage port
  -> browser or memory adapter
```

Cross-owner orchestration is explicit:

```text
POS checkout
  -> Orders create port
  -> Invoice creation port
  -> compatibility publication port
  -> last-Order port

Orders create
  -> Inventory prepare/commit port
  -> Order repository
  -> Order number port
  -> change notification port

Returns
  -> Order Return-handoff port
```

An arrow means the left side depends on an inward application-owned interface. Concrete
implementations point inward by implementing that interface. No service imports another owner's
storage or implementation.

### Two-stage composition

1. `packages/sdk/src/commerce/runtime/createCommerceServices.ts` selects browser/local or supplied
   memory test infrastructure and exposes contract-typed runtime values.
2. `apps/commerce/lib/commerce/createCommerceApplicationServices.ts` creates application services,
   the React Query change adapter, commercial-snapshot adapter, publication hub, and last-Order
   browser adapter exactly once.
3. `CommerceServicesProvider` retains the resulting runtime across renders. `AppProvider` consumes
   application ports and publication snapshots; it does not construct implementations.

The existing `dataSource: "http"` configuration remains an unavailable governed extension point.
Feature 055 adds no HTTP repository and makes no claim that the synchronous local port is the final
network contract.

## Behavior and Commit Design

### Current sale draft

The POS hook delegates immutable draft actions to `LegacyPosDraftService`. The service preserves
current Product coalescing, quantity minimum, Customer/payment selection, discount coercion, and
calculator output. Search, category filtering, modal visibility, tender display, focus, keyboard
listeners, toasts, and navigation remain presentation concerns.

### Completed sale

```text
Inventory prepare/read/validate
  -> scoped number read
  -> construct compatible Order
  -> persist Orders
  -> persist Branch Inventory
  -> persist Stock Movements
  -> request Order/Inventory cache refresh
  -> return Order/Inventory/Movement snapshots
  -> provider publication
  -> existing Invoice create
  -> Invoice publication
  -> last-Order session write
  -> UI reset/navigation
```

The Inventory prepare value is opaque to Orders. The sequence intentionally preserves existing
partial writes. The plan does not add transaction, compensation, retry, locking, reconciliation,
or double-submit protection.

### Return compatibility update

The Return service keeps its validation, commercial calculation, Invoice/Return/Inventory writes,
and final notifications. Its first Order write becomes an exact scoped request to the Orders-owned
handoff. The handoff does not notify independently, preserving the current Return notification
point and partial-failure order.

## Incremental Migration Strategy

1. Add characterization and the executable supported/indirect/absent inventory before moving code.
2. Add contracts, valid/invalid architecture fixtures, and contract-only runtime types.
3. Add browser/memory Order command storage methods and private repository contract tests without
   changing the Feature 053 read path.
4. Extract Inventory prepare/commit behavior and prove identical calculations/write order.
5. Rewire `LegacyOrderCreationService` to narrow repository/number/Inventory/change ports and
   remove broad operations-store access.
6. Route Return and demo bootstrap Order writes through the owner boundary; source-scan zero
   alternate active Order writers.
7. Extract POS draft/calculator orchestration, then checkout/publication/session coordination.
8. Migrate the POS/success pages and reduce `AppProvider` to compatibility delegation/publication.
9. Extend composition, SDK export restrictions, full-source architecture rules, and deterministic
   fixtures; remove obsolete paths only after consumer/regression proof.
10. Run focused gates after every checkpoint and the complete regression matrix before completion.

No checkpoint changes storage keys/data or requires an all-at-once AppProvider rewrite.

## Testing Strategy

### Characterization and unit evidence

- Current POS draft transitions, exact calculation values, payload quirks, errors, modal/navigation,
  and unsupported command absence.
- Current Order number/ID/time construction, duplicate/untracked/missing Product behavior,
  Inventory fallback/deduction/Movement behavior, notifications, and every sequential failure.
- Current Order → Invoice → last-Order → success flow and provider publication timing.
- Current Return Order-field patch and demo bootstrap behavior before delegation.

### Contract and integration evidence

- One reusable Order command repository suite for browser and memory stores.
- Application-service tests with substitutes for every port, exact call order, scope, success,
  deterministic failure, and no hidden retry.
- Complete Workspace/legacy-Business-Unit/Branch isolation for Product references, Customer
  references, Orders, numbering, positions, Movements, publication, and cache refresh.
- Browser key/shape/unknown-field/refresh/corruption compatibility.
- Stable composed service/repository/adapter identity through 100 provider rerenders.
- Feature 053 Order reads remain source- and behavior-compatible.

### Architecture evidence

- Full active production-source scan plus valid/invalid fixtures for application, UI/hook/provider,
  repository, owner-write, browser-storage, app-to-app, composition, and SDK-export rules.
- Explicit source evidence that UI/hooks/providers/Core/Returns do not persist Orders and Orders
  does not persist Inventory.
- Standard SDK root cannot import private command repositories/stores/simulators.

### Product and regression evidence

- Existing Commerce 044, Feature 052 Product, Feature 053 read/relationship, and Feature 054
  architecture/browser/accessibility suites.
- Existing affected Core 050 and Core 054 handoff suites.
- Feature 055 English/LTR and Arabic/RTL, keyboard, focus, semantic, screen-reader, and critical axe
  coverage with no visual redesign.
- Strict TypeScript, architecture check, zero-warning ESLint, all Vitest, Commerce/root production
  builds, relevant Playwright, `git diff --check`, and twenty identical deterministic runs.

## Security, Audit, and Observability Posture

This browser compatibility slice enforces complete available tenant scope and prevents foreign
records from influencing numbering, validation, mutation, publication, or cache. It passes only
minimum actor identifiers/display snapshots already required by current records and ensures
diagnostics exclude raw tenant/customer data.

It does not claim server authorization, append-only Audit, production logs/metrics/traces,
correlation, durability, idempotency, or recovery. Those controls remain required before a future
network mutation boundary is approved under DD-29 and DD-34-40. Cache notifications remain
frontend refresh intent, not Events or Audit Records.

## Deferred Decisions Preserved

- canonical Business mapping and final Order command scoping;
- Order/POS/Inventory/Payment/Return/Document lifecycle and transaction boundaries;
- final pricing, discount, tax, refund, rounding, and numbering policies;
- HTTP/REST/GraphQL contracts, DTOs, API errors, pagination, async timing, and versioning;
- backend authentication/authorization, Audit, observability, privacy/retention, and SLOs;
- idempotency, concurrency, Inventory locking, rollback, compensation, and reconciliation;
- physical persistence, Laravel, queues, Events, offline sync, and runtime/infrastructure choices.

Frontend compatibility ports and stored shapes must not be promoted into answers to these
decisions.

## Complexity Tracking

No Constitution violation or exceptional project complexity is required. The design reuses the
existing contracts/SDK/application/composition/architecture-test structure. The two-stage
Inventory prepare/commit port is the minimum owner-aligned seam that preserves the already
characterized pre-Order validation and post-Order write sequence; it is not a new transaction
model.
