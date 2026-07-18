# Tasks: Commerce Order Command Boundary

**Input**: Design documents from `/specs/055-commerce-order-command-boundary/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Verification is mandatory because Feature 055 explicitly requires characterization,
unit, application-service, repository-contract, storage, scope-isolation, deterministic-failure,
architecture, build, localization, accessibility, and end-to-end evidence. Add characterization
tests before moving behavior. Add new-boundary tests before implementation and observe their
expected failure.

**Organization**: Tasks are grouped by user story. US2, US4, US3, and US1 are all P1; they are
ordered by implementation dependency so the POS draft, Inventory effect, and persisted Order owner
boundaries are ready before US1 integrates the complete sale. No task adds a missing command,
backend contract, canonical lifecycle, or user-visible redesign.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it targets different files and has no incomplete dependency
- **[Story]**: User-story traceability label
- Every task names an exact file path

---

## Phase 1: Setup (Shared Evidence and Fixtures)

**Purpose**: Establish the behavior baseline, deterministic fixtures, and implementation-evidence
surface before any production responsibility moves.

- [X] T001 Create the Feature 055 baseline, supported/indirect/absent command inventory, checkpoint, failure-order, scope, regression, and deferred-decision evidence matrix in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T002 [P] Create reusable Workspace, legacy Business Unit, Branch, actor, Product, Customer, Order, Inventory, Invoice, Return, clock, identifier, and failure-stage fixtures in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures.ts`
- [X] T003 [P] Create browser seed, refresh, overlapping-scope, POS interaction, and accessibility fixtures in `tests/e2e/fixtures/commerce-055.ts`
- [X] T004 Run the pre-movement architecture, lint, type, unit, build, deterministic, Commerce 044/052/053/054, and affected Core 050/054 commands from `specs/055-commerce-order-command-boundary/quickstart.md` and record immutable results in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

---

## Phase 2: Foundational (Blocking Contracts and Runtime Surface)

**Purpose**: Add framework-neutral, visibly legacy contracts and contract-typed runtime slots before
any user-story implementation.

**⚠️ CRITICAL**: Complete this phase before moving POS, Order, Inventory, Return, bootstrap,
provider, or browser-storage behavior. These contracts are frontend-internal compatibility seams,
not future HTTP/API contracts.

- [X] T005 [P] Define immutable POS draft, Product snapshot, supported draft command, result, validation-failure, and service-port values in `packages/contracts/src/commerce/pos/legacy-pos-draft-commands.ts`
- [X] T006 [P] Define synchronous POS checkout input/result, checkout port, and React-neutral committed-snapshot publication port in `packages/contracts/src/commerce/pos/legacy-pos-checkout.ts`
- [X] T007 [P] Define the compatibility commercial-snapshot calculator port and last-Order read/write/clear port in `packages/contracts/src/commerce/pos/legacy-pos-commercial-snapshot.ts` and `packages/contracts/src/commerce/pos/legacy-pos-last-order.ts`
- [X] T008 [P] Define the scoped synchronous Order command repository with numbering-list, get, create, Return-patch, and demo-seed operations only in `packages/contracts/src/commerce/orders/legacy-order-command-repository.ts`
- [X] T009 [P] Define the Workspace-plus-legacy-Business-Unit number port and exact scoped Return-to-Order compatibility handoff in `packages/contracts/src/commerce/orders/legacy-order-number-port.ts` and `packages/contracts/src/commerce/orders/legacy-order-return-handoff.ts`
- [X] T010 [P] Define opaque sale-effect prepare/commit values, Product snapshot port, Inventory persistence port, and Inventory-owned effect port in `packages/contracts/src/commerce/inventory/legacy-order-inventory-effects.ts`
- [X] T011 Narrow the synchronous create command/result/service contract and remove the broad `LegacyOrderWritePort` from `packages/contracts/src/commerce/operations/legacy-order-commands.ts`
- [X] T012 Export only the new contract-safe POS, Order-command, and Inventory-effect types from `packages/contracts/src/commerce/pos/index.ts`, `packages/contracts/src/commerce/orders/index.ts`, `packages/contracts/src/commerce/inventory/index.ts`, `packages/contracts/src/commerce/operations/index.ts`, and `packages/contracts/src/commerce/index.ts`
- [X] T013 Add contract-typed POS draft/checkout, Order command/number/Return handoff, Inventory effect, publication, and last-Order slots without concrete SDK types in `apps/commerce/lib/commerce/CommerceApplicationServices.ts`

**Checkpoint**: Contract packages compile with no React, React Query, Next.js, browser API,
provider, concrete SDK, transport, DTO, pagination, idempotency, or backend-authorization imports.

---

## Phase 3: User Story 2 - Preserve Current POS Draft Commands (Priority: P1)

**Goal**: Move every supported transient cart, Customer/payment selection, discount, and
commercial-snapshot action from the POS page into a POS-owned application boundary while leaving
unsupported price-edit and durable draft behavior absent.

**Independent Test**: Replay add/coalesce, quantity, remove/clear, Customer/payment, discount,
taxable/non-taxable, inclusive/exclusive tax, zero-stock, and empty-draft sequences and compare the
draft and numeric snapshot after every action; prove no Order record is persisted.

### Tests for User Story 2

- [X] T014 [P] [US2] Characterize current POS add/coalesce, quantity minimum, remove/clear, Product snapshot, zero-stock feedback, Customer/payment selection, discount coercion, and absent price-edit behavior in `tests/e2e/commerce-055-characterization.spec.ts`
- [X] T015 [P] [US2] Add failing POS draft service contract tests for every supported command, immutable output, line ordering, no persistence, and explicit unsupported-command absence in `apps/commerce/features/pos/__tests__/legacy-pos-draft-service.test.ts`
- [X] T016 [P] [US2] Add failing commercial-snapshot equivalence tests for inclusive/exclusive VAT, taxable allocation, floating behavior, non-clamped totals, and the `subtotal = net` payload quirk in `apps/commerce/features/pos/__tests__/legacy-pos-commercial-snapshot.test.ts`
- [X] T017 [P] [US2] Add failing hook tests proving React state adapts synchronous commands without React Query, browser storage, persistence, retry, or implementation selection in `apps/commerce/features/pos/__tests__/legacy-pos-draft-hooks.test.tsx`

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement the outer compatibility calculator adapter by delegating unchanged arithmetic to `computeDoc` in `apps/commerce/lib/commerce/pos/LegacyDocumentSnapshotAdapter.ts`
- [X] T019 [US2] Implement immutable supported draft transitions and current validation/coercion behavior in `apps/commerce/features/pos/application/LegacyPosDraftService.ts`
- [X] T020 [US2] Implement the React adapter over the synchronous draft service with no cache or persistence responsibility in `apps/commerce/features/pos/hooks/useLegacyPosDraftCommands.ts`
- [X] T021 [P] [US2] Export only application-facing POS draft types and hooks from `apps/commerce/features/pos/index.ts`
- [X] T022 [US2] Replace page-owned add/coalesce, quantity, remove, and clear rule bodies with POS hook commands while retaining rendering/search/modal state in `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T023 [US2] Route Customer/payment selection and discount apply/remove through the POS draft hook without changing current controls or feedback in `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T024 [US2] Remove direct `computeDoc` use and draft business calculations from the POS page while retaining current displayed values, tender calculation, keyboard shortcuts, and modal behavior in `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T025 [US2] Run the POS draft service, hook, calculator, and characterization suites and record exact numeric/UI equivalence plus the absent-command matrix in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: POS owns transient sale state behind an application hook; the page contains no
cart, discount, Pricing/Tax compatibility, or recalculation rule, and no persisted Order behavior
has been added.

---

## Phase 4: User Story 4 - Preserve Inventory Ownership and Effects (Priority: P1)

**Goal**: Give Inventory sole ownership of sale stock validation, effective-stock fallback,
position construction, Movement construction, and persistence through a prepare/commit port while
preserving the existing pre-Order validation and post-Order write sequence.

**Independent Test**: Execute tracked, untracked, repeated, missing, null-stock, existing-position,
new-position, sufficient, insufficient, foreign-scope, and no-change inputs directly through the
Inventory effect port and compare positions, Movements, errors, identifiers, timestamps, and write
order with the characterization baseline.

### Tests for User Story 4

- [X] T026 [P] [US4] Characterize duplicate accumulation, tracked/untracked/missing/null-stock Products, existing/new positions, `insufficient_stock`, `bi`/`sm` generation, and positions-before-Movements ordering in `apps/commerce/lib/store/__tests__/commerce-055-order-inventory-characterization.test.ts`
- [X] T027 [P] [US4] Add failing prepare/commit application-service tests proving prepare performs no write and commit returns exact Inventory/Movement snapshots in `apps/commerce/features/inventory/__tests__/legacy-order-inventory-effect-service.test.ts`
- [X] T028 [P] [US4] Add failing complete Workspace/legacy-Business-Unit/Branch scope-isolation tests with overlapping Product and position IDs in `apps/commerce/features/inventory/__tests__/legacy-order-inventory-effect-scope.test.ts`
- [X] T029 [P] [US4] Add failing reusable browser/memory gateway contract tests for Product snapshots, positions, Movements, cloning, unchanged keys, corruption, and write order in `packages/sdk/src/commerce/inventory/__tests__/legacy-order-inventory-gateway.contract.test.ts`
- [X] T030 [P] [US4] Add failing deterministic failure tests for prepare read, validation, position write, Movement write, and current partial effects in `apps/commerce/features/inventory/__tests__/legacy-order-inventory-effect-failures.test.ts`

### Implementation for User Story 4

- [X] T031 [P] [US4] Implement the private local Product-snapshot and Inventory-persistence gateway over approved storage ports in `packages/sdk/src/commerce/inventory/LocalOrderInventoryGateway.ts`
- [X] T032 [US4] Implement Inventory-owned prepare/commit orchestration using unchanged effective-stock, threshold, position, and Movement policy in `apps/commerce/features/inventory/application/LegacyOrderInventoryEffectService.ts`
- [X] T033 [US4] Keep the prepared Inventory value opaque outside Inventory and preserve deterministic identifier/time call order in `apps/commerce/features/inventory/application/LegacyOrderInventoryEffectService.ts`
- [X] T034 [US4] Expose only contract-typed Product-snapshot and Inventory-persistence ports from the SDK composition factory in `packages/sdk/src/commerce/runtime/createCommerceServices.ts`
- [X] T035 [US4] Assemble the Inventory effect service once with deterministic clock/identifier dependencies in `apps/commerce/lib/commerce/createCommerceApplicationServices.ts`
- [X] T036 [US4] Extend retained-write boundary tests to reject Inventory store/policy imports and Branch Inventory/Movement construction from Orders in `apps/commerce/features/orders/__tests__/legacy-order-retained-writes.test.tsx`
- [X] T037 [US4] Run the Inventory effect, gateway, scope, failure, and existing Inventory read/adjustment regressions and record owner/write-order equivalence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: Inventory owns all current sale stock rules and writes behind one effect port; no
reservation, release, restoration, locking, transaction, rollback, or retry semantics exist.

---

## Phase 5: User Story 3 - Preserve Every Existing Durable Order Command (Priority: P1)

**Goal**: Route create, the indirect Return compatibility patch, and required demo seed through one
Orders-owned persistence boundary while proving every other listed durable command remains absent.

**Independent Test**: Run each supported/indirect path directly and through retained consumers;
verify exact records, numbers, IDs, timestamps, partial effects, notifications, and one write path,
then source-check that generic update/remove/cancel/status/item/price/discount/reservation commands
do not exist.

### Tests for User Story 3

- [X] T038 [P] [US3] Add the executable supported/indirect/absent production-writer and callback inventory in `apps/commerce/features/orders/__tests__/commerce-055-order-command-inventory.test.ts`
- [X] T039 [P] [US3] Define the reusable synchronous Order command repository contract suite for numbering-list, get, create, Return patch, demo seed, cloning, foreign-row preservation, and failures in `packages/sdk/src/commerce/orders/__tests__/legacy-order-command-repository.contract.ts`
- [X] T040 [P] [US3] Add failing browser-backed repository contract and exact-key/unknown-field/corruption tests in `packages/sdk/src/commerce/orders/__tests__/browser-order-command-repository.test.ts`
- [X] T041 [P] [US3] Add failing memory-backed repository contract and deterministic failure tests in `packages/sdk/src/commerce/orders/__tests__/memory-order-command-repository.test.ts`
- [X] T042 [P] [US3] Add failing number-service tests for no Orders, gaps, duplicate/nonstandard numbers, same-Business-Unit Branches, and overlapping legacy Business Unit IDs across Workspaces in `apps/commerce/features/orders/__tests__/legacy-order-number-service.test.ts`
- [X] T043 [P] [US3] Rewrite Order create service tests around repository, number, Inventory effect, clock/ID, and change-port substitutes with exact synchronous call and partial-failure order in `apps/commerce/features/orders/__tests__/legacy-order-creation-service.test.ts`
- [X] T044 [P] [US3] Add failing Orders-owned lookup/Return-patch tests and preserve Return's first-write and post-sequence notification behavior in `apps/commerce/features/returns/__tests__/legacy-return-order-handoff.test.ts`
- [X] T045 [P] [US3] Add failing demo bootstrap tests proving the empty scoped Order seed uses the owner boundary while preserving foreign-scope rows and all other setup behavior in `apps/commerce/features/setup/__tests__/legacy-commerce-demo-bootstrap-orders.test.ts`

### Implementation for User Story 3

- [X] T046 [P] [US3] Add distinctly named synchronous Order command read/replace methods over `nexoraxs.db.commerceOrders` without changing async Feature 053 reads in `packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts`
- [X] T047 [P] [US3] Add matching synchronous Order command storage methods and explicit deterministic failures in `packages/sdk/src/commerce/products/MemoryCommerceStore.ts`
- [X] T048 [US3] Implement the private scope-safe local Order command repository with compatible mapping, cloning, foreign-row preservation, and no generic lifecycle methods in `packages/sdk/src/commerce/orders/LocalOrderCommandRepository.ts`
- [X] T049 [US3] Implement Workspace-plus-legacy-Business-Unit count-based `ORD-####` generation without Branch, max parsing, reservation, or collision repair in `apps/commerce/features/orders/application/LegacyOrderNumberService.ts`
- [X] T050 [US3] Refactor synchronous Order creation to depend only on command repository, number, Inventory effect, deterministic dependencies, and change notification ports in `apps/commerce/features/orders/application/LegacyOrderCreationService.ts`
- [X] T051 [US3] Implement the Orders-owned scoped Return lookup and exact return-status/total/ID patch adapter without independent notification in `apps/commerce/features/orders/application/LegacyOrderReturnHandoffService.ts`
- [X] T052 [US3] Replace Return's direct Order collection read/write with the Orders-owned handoff while preserving all Return validation, calculation, Invoice, restock, write, and notification behavior in `apps/commerce/features/returns/application/LegacyReturnCreationService.ts`
- [X] T053 [US3] Route only demo bootstrap's Order seed through the narrow repository seam while retaining other setup seed owners and ordering in `apps/commerce/features/setup/application/LegacyCommerceDemoBootstrapService.ts`
- [X] T054 [US3] Construct and expose the contract-typed Order command repository from the sole SDK implementation-selection locus in `packages/sdk/src/commerce/runtime/createCommerceServices.ts`
- [X] T055 [US3] Remove active `replaceOrders` authority after the consumer scan while retaining required read-only compatibility access in `packages/contracts/src/commerce/operations/legacy-operations-store.ts`, `packages/sdk/src/commerce/operations/BrowserLegacyCommerceOperationsStore.ts`, and `packages/sdk/src/commerce/operations/MemoryLegacyCommerceOperationsStore.ts`
- [X] T056 [US3] Run Order repository, number, create, Return, bootstrap, source-inventory, Feature 053 Order-read, and partial-failure suites and record one-writer/absent-command evidence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: Every existing Order write reaches the Orders-owned command repository exactly
once; the Feature 053 read repository is unchanged and no new durable command or lifecycle exists.

---

## Phase 6: User Story 1 - Complete the Existing Sale Without Any Regression (Priority: P1) 🎯 MVP

**Goal**: Integrate the owner boundaries into the complete POS sale so the UI requests one
synchronous checkout service and preserves Order, Inventory, provider publication, Invoice,
last-Order, visible feedback, and success navigation exactly.

**Independent Test**: Complete the same scoped anonymous and Customer-linked sale before/after
migration and compare every displayed value, persisted record, key, reference, effect, publication,
error, route, refresh result, language, direction, keyboard action, focus, and semantic state.

### Tests for User Story 1

- [X] T057 [P] [US1] Characterize Order → provider publication → Invoice → provider publication → last-Order → navigation, same-tick lookup, and every later-stage partial failure in `apps/commerce/lib/store/__tests__/commerce-055-checkout-characterization.test.tsx`
- [X] T058 [P] [US1] Add failing POS checkout service tests for payload mapping, exact synchronous call order, exactly-once owner calls, result route, and no retry/rollback/compensation in `apps/commerce/features/pos/__tests__/legacy-pos-checkout-service.test.ts`
- [X] T059 [P] [US1] Add failing publication-hub/provider tests for committed Order/Inventory/Movement and Invoice snapshots, subscription cleanup, cloning, and partial visibility in `apps/commerce/lib/store/__tests__/commerce-055-command-publication.test.tsx`
- [X] T060 [P] [US1] Add failing last-Order adapter and hook tests for exact `nx_last_order_id` raw value, read/write/clear, refresh, unavailable session, and no page storage access in `apps/commerce/features/pos/__tests__/legacy-pos-last-order.test.tsx`
- [X] T061 [P] [US1] Add full browser sale coverage for anonymous/Customer-linked success, insufficient Stock, exact records/keys/references, refresh, and unchanged `/pos/success` routing in `tests/e2e/commerce-055-order-commands.spec.ts`

### Implementation for User Story 1

- [X] T062 [P] [US1] Implement the React-neutral committed-snapshot publication hub with stable subscription identity in `apps/commerce/lib/commerce/publication/LegacyCommandPublicationHub.ts`
- [X] T063 [P] [US1] Implement the approved browser session adapter over the existing last-Order helper/key in `apps/commerce/lib/commerce/pos/BrowserLegacyPosLastOrderAdapter.ts`
- [X] T064 [US1] Implement synchronous POS checkout orchestration over Order create, publication, existing Invoice create, Invoice publication, and last-Order ports in `apps/commerce/features/pos/application/LegacyPosCheckoutService.ts`
- [X] T065 [P] [US1] Implement React adapters for checkout state/error mapping and success-page last-Order read/clear without React Query or browser APIs in `apps/commerce/features/pos/hooks/useLegacyPosCheckout.ts` and `apps/commerce/features/pos/hooks/useLegacyPosLastOrder.ts`
- [X] T066 [US1] Assemble checkout, publication, session, Order, Inventory, and existing Invoice services once and expose only application-facing types in `apps/commerce/lib/commerce/createCommerceApplicationServices.ts` and `apps/commerce/lib/commerce/CommerceApplicationServices.ts`
- [X] T067 [US1] Make `AppProvider` subscribe to committed snapshots and publish scoped compatibility state without Order/Invoice construction, persistence, validation, pricing, numbering, or Inventory rules in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T068 [US1] Replace page-owned Order/Invoice/session orchestration with one checkout-hook call while retaining error toast mapping, transient reset, modal behavior, and router navigation in `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T069 [US1] Replace direct last-Order storage-helper access with the POS last-Order hook while preserving refresh and clear behavior in `apps/commerce/app/(commerce)/pos/success/page.tsx`
- [X] T070 [US1] Scan all consumers and remove only proved-obsolete `createOrder`/`createInvoice` provider callbacks and types without changing retained consumers in `apps/commerce/lib/store/AppProvider.tsx` and `apps/commerce/lib/store/index.ts`
- [X] T071 [US1] Add English/LTR, Arabic/RTL, keyboard shortcuts, focus, semantic names, disabled states, non-color feedback, screen-reader, and critical axe sale coverage in `tests/e2e/commerce-055-localization-accessibility.spec.ts`
- [X] T072 [US1] Run the checkout, publication, session, provider, Order, Invoice, POS browser, localization, accessibility, and Commerce 044 regression suites and record exact journey equivalence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: The complete existing sale is independently demonstrable through one POS checkout
hook; UI navigates only from the result, provider publishes only committed snapshots, and every
current partial failure remains observable in the same order.

---

## Phase 7: User Story 5 - Keep Compatibility, Scope, and Recovery Stable (Priority: P2)

**Goal**: Prove complete legacy tenant isolation, unchanged browser persistence, deterministic
failure/recovery, exact cache refresh, stable instances, and no duplicate compatibility write.

**Independent Test**: Execute retained callbacks and hooks with overlapping IDs across Workspaces,
legacy Business Units, and Branches; inject every supported failure stage, rerender providers,
refresh the browser, and verify only the intended records/publications/cache keys change with no
automatic retry.

### Tests for User Story 5

- [X] T073 [P] [US5] Add integrated overlapping Workspace/legacy-Business-Unit/Branch isolation tests for Order numbering, Customer/Product references, Inventory effects, publication, and no foreign disclosure in `apps/commerce/features/orders/__tests__/commerce-055-order-command-scope-isolation.test.ts`
- [X] T074 [P] [US5] Add deterministic stage-failure tests for Order read/create, position/Movement write, notifications, publication, Invoice creation/publication, and last-Order write with exact partial effects in `apps/commerce/features/pos/__tests__/commerce-055-checkout-failures.test.ts`
- [X] T075 [P] [US5] Add exact Order/Inventory/Movement/Invoice/last-Order key, serialized-shape, unknown-field, corruption, quota, unavailable-storage, and refresh tests in `apps/commerce/lib/store/__tests__/commerce-055-browser-persistence.test.tsx`
- [X] T076 [P] [US5] Add exact Workspace/legacy-Business-Unit/Branch Order-item/list and Inventory cache refresh tests, including overlapping IDs and notification failure, in `apps/commerce/features/repository-expansion/__tests__/commerce-055-order-cache-isolation.test.ts`
- [X] T077 [P] [US5] Add provider rerender tests proving stable service/repository/store/adapter/callback identity, one delegation, and no hook/provider double write across 100 rerenders in `apps/commerce/lib/store/__tests__/commerce-055-runtime-identity.test.tsx`
- [X] T078 [P] [US5] Add browser error/manual-recovery cases proving existing visible feedback, refresh persistence, and no mount/focus/reconnect/timer retry in `tests/e2e/commerce-055-order-commands.spec.ts`

### Implementation for User Story 5

- [X] T079 [P] [US5] Implement explicit operation/stage deterministic failure controls with no randomness or artificial latency in `packages/sdk/src/commerce/orders/legacy-order-command-behavior.ts`
- [X] T080 [US5] Consolidate fail-closed complete-scope validation and non-disclosing same-ID handling across the command repository, number service, and Inventory gateway in `packages/sdk/src/commerce/orders/LocalOrderCommandRepository.ts`, `apps/commerce/features/orders/application/LegacyOrderNumberService.ts`, and `packages/sdk/src/commerce/inventory/LocalOrderInventoryGateway.ts`
- [X] T081 [US5] Preserve exact post-commit scoped Order/Inventory invalidation and fire-and-forget notification failures in `apps/commerce/lib/commerce/cache/ReactQueryCommerceChangeAdapter.ts` and `apps/commerce/features/orders/application/LegacyOrderCreationService.ts`
- [X] T082 [US5] Stabilize publication subscription and compatibility delegation across provider rerenders without an alternate write path in `apps/commerce/lib/commerce/publication/LegacyCommandPublicationHub.ts` and `apps/commerce/lib/store/AppProvider.tsx`
- [X] T083 [US5] Run scope, deterministic-failure, persistence, cache, provider-identity, manual-recovery, and Feature 052/053 refresh regressions and record exact isolation/recovery evidence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: No foreign scope influences a command, number, publication, or cache; refresh uses
unchanged keys/shapes; failures remain explicit and manually recoverable with no duplicate write.

---

## Phase 8: User Story 6 - Keep the Command Side Replaceable Without Defining a Backend (Priority: P3)

**Goal**: Make implementation selection composition-only and enforce the inward dependency/write
direction while proving no HTTP, DTO, lifecycle, idempotency, authorization, or other backend
contract was introduced.

**Independent Test**: Substitute memory implementations at composition and run the same services,
hooks, provider, and sale journey without source changes; then run the full production scanner and
SDK surface tests so every invalid dependency/writer fixture fails and every valid fixture passes.

### Tests for User Story 6

- [X] T084 [P] [US6] Add invalid application/UI fixtures for React/React Query/browser/provider imports, concrete Order infrastructure selection, and page-owned checkout orchestration in `tests/architecture/fixtures/invalid/order-command-boundaries/application-framework.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/ui-concrete-repository.ts`, and `tests/architecture/fixtures/invalid/order-command-boundaries/page-checkout-orchestration.ts`
- [X] T085 [P] [US6] Add invalid owner-writer fixtures for Orders writing Inventory, Returns/Core/provider writing Orders, repository importing UI, direct browser storage, and non-root construction in `tests/architecture/fixtures/invalid/order-command-boundaries/order-inventory-writer.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/return-order-writer.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/core-order-writer.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/provider-order-writer.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/repository-ui.ts`, `tests/architecture/fixtures/invalid/order-command-boundaries/browser-storage.ts`, and `tests/architecture/fixtures/invalid/order-command-boundaries/non-root-construction.ts`
- [X] T086 [P] [US6] Add a valid POS → hook → application ports and Orders → repository/effect/notification fixture with composition-only concrete construction in `tests/architecture/fixtures/valid/order-command-boundary.ts`
- [X] T087 [P] [US6] Extend deterministic rule-ID, normalized-location, full-production-inventory, valid/invalid fixture, and repeated-output assertions in `tests/architecture/frontend-boundaries.test.ts`
- [X] T088 [P] [US6] Extend SDK root/testing export tests to reject local command repositories, stores, serializers, simulators, and concrete facades from production imports in `tests/architecture/sdk-exports.test.ts`
- [X] T089 [P] [US6] Add composition-substitution tests that inject memory repository, Inventory effect, number, clock, ID, commercial snapshot, notification, publication, and last-Order ports without changing hooks/services/provider in `tests/architecture/sdk-runtime-substitution.test.ts`

### Implementation for User Story 6

- [X] T090 [US6] Implement Order/POS application, UI/concrete, repository/UI, owner-writer, browser-storage, and construction-locus rules with stable safe diagnostics in `scripts/architecture/frontend-boundaries.mjs`
- [X] T091 [US6] Add exact approved composition, storage-adapter, and testing-path allowlists without legacy-debt exemptions in `scripts/architecture/frontend-boundary-policy.mjs`
- [X] T092 [P] [US6] Add immediate restricted-import feedback for Order/POS application, UI/provider/Core, SDK-private, and cross-app violations in `apps/commerce/eslint.config.mjs` and `apps/core-platform/eslint.config.mjs`
- [X] T093 [US6] Keep concrete command repositories, stores, serializers, and failure simulators private while exposing only stable factories/types and controlled test imports in `packages/sdk/src/index.ts`, `packages/sdk/src/testing/index.ts`, and `packages/sdk/package.json`
- [X] T094 [US6] Finalize sole SDK implementation selection and one stable app-level service graph with contract-typed test overrides in `packages/sdk/src/commerce/runtime/createCommerceServices.ts`, `apps/commerce/lib/commerce/createCommerceApplicationServices.ts`, and `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`
- [X] T095 [US6] Prove runtime configuration is the only Commerce environment reader and HTTP remains explicitly unavailable without requests in `packages/sdk/src/commerce/common/__tests__/commerce-runtime-configuration.test.ts` and `apps/commerce/lib/commerce/commerce-runtime-config.ts`
- [X] T096 [US6] Record substitute-runtime results, SDK privacy, zero architecture violations, and explicit non-introduction of HTTP/API/DTO/pagination/idempotency/authorization/lifecycle contracts in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

**Checkpoint**: Browser and memory implementations substitute only at composition; application
and presentation code are unchanged, concrete infrastructure is private, and no backend decision
has been made.

---

## Phase 9: Polish & Cross-Cutting Quality Gates

**Purpose**: Prove complete behavior preservation, boundary conformance, deterministic delivery,
localization/accessibility, regression safety, and documentation synchronization.

- [X] T097 Extend the existing twenty-pass deterministic validation additively with focused Feature 055 POS, Order, Inventory, failure, and architecture suites in `scripts/validate-commerce-052-determinism.sh`
- [X] T098 [P] Run `pnpm architecture:check`, `pnpm lint`, and `pnpm typecheck` and record zero-violation/zero-warning results in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T099 [P] Run `pnpm test:unit` and the focused architecture fixture suite and record unit, contract, integration, and architecture results in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T100 [P] Run Commerce and root production builds from `specs/055-commerce-order-command-boundary/quickstart.md` and record results in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T101 Run Commerce 044/052/053/054/055 Playwright suites from `specs/055-commerce-order-command-boundary/quickstart.md` and record route, record, persistence, manual-recovery, localization, RTL/LTR, keyboard, semantic, and accessibility results in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T102 Run affected Core 050 and Core 054 handoff Playwright suites from `specs/055-commerce-order-command-boundary/quickstart.md` and record no-Core-Order-writer and no-journey-regression evidence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T103 Run the twenty-pass deterministic validator and record identical IDs, times, results, diagnostics, partial effects, stable instances, no randomness, no retry, and no duplicate writes in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T104 Run the complete source inventory and record zero UI/hook/provider/Core/Return direct Order writes, zero Orders-owned Inventory writes, zero browser-storage violations, and zero private SDK production imports in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T105 Review English/Arabic, LTR/RTL, keyboard, focus, screen-reader, non-color, pending, validation, success, error, and manual-recovery evidence in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T106 Synchronize the final supported/indirect/absent matrix, scope, commit ordering, compatibility paths, architecture rules, and unchanged Deferred Decisions in `specs/055-commerce-order-command-boundary/data-model.md`, `specs/055-commerce-order-command-boundary/contracts/pos-command-boundary.md`, `specs/055-commerce-order-command-boundary/contracts/order-command-boundary.md`, and `specs/055-commerce-order-command-boundary/contracts/inventory-storage-and-enforcement.md`
- [X] T107 Re-run the post-implementation Constitution Check and record controlling Freezes/ADRs, owner/scope preservation, security/privacy limitations, test evidence, documentation sync, and all unresolved DD IDs in `specs/055-commerce-order-command-boundary/implementation-evidence.md`
- [X] T108 Run `git diff --check`, verify no backend/frozen/historical architecture source or browser data migration changed, and record final scope/no-regression conformance in `specs/055-commerce-order-command-boundary/implementation-evidence.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup and blocks every user-story implementation.
- **US2 (Phase 3, P1)**: Depends on Foundational; extracts the independently testable POS draft.
- **US4 (Phase 4, P1)**: Depends on Foundational and can run in parallel with US2; creates the
  Inventory owner effect needed by persisted Order creation.
- **US3 (Phase 5, P1)**: Depends on US4's Inventory effect and Foundational Order contracts; routes
  all durable Order writes through the owner boundary.
- **US1 (Phase 6, P1)**: Depends on US2, US4, and US3; integrates the complete sale and is the MVP
  vertical-slice checkpoint.
- **US5 (Phase 7, P2)**: Depends on the integrated US1 path; hardens scope, recovery, refresh,
  stable identity, and duplicate-write protection without changing behavior.
- **US6 (Phase 8, P3)**: Depends on the final command surface from US1/US3/US4/US5 so production
  architecture enforcement and substitution can pass without a debt allowlist.
- **Polish (Phase 9)**: Depends on all six user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US2 ------------------+
                      US4 -> US3 ------------+-> US1 -> US5 -> US6 -> Final Quality Gate
```

US2 and US4 are independent after the shared contracts. US3 needs Inventory's owner port, and US1
then composes the POS, Orders, Inventory, Invoice, publication, and session paths. This ordering is
dependency-driven; all four remain P1.

### Within Each User Story

- Add and pass characterization tests against the existing behavior before moving that behavior.
- Add new-boundary tests and observe the expected failure before implementing the new boundary.
- Define contracts before concrete adapters, adapters before application orchestration, and
  application orchestration before hooks/pages/providers.
- Preserve one active write path; remove old authority only after consumer scans and regression
  proof.
- Run the story checkpoint before beginning a dependent story.

### Parallel Opportunities

- T002 and T003 can run in parallel after T001.
- T005-T010 can run in parallel; T011-T013 then consolidate exports/runtime types.
- US2 test tasks T014-T017 can run in parallel; T018 can run while T019 waits for its calculator
  contract.
- US4 test tasks T026-T030 can run in parallel; T031 can run separately from T032 after contracts.
- US3 test tasks T038-T045 can run in parallel; browser and memory storage work T046/T047 can run
  in parallel.
- US1 test tasks T057-T061 can run in parallel; publication and session adapters T062/T063 can run
  in parallel.
- US5 test tasks T073-T078 can run in parallel before the focused hardening tasks.
- US6 fixture/test tasks T084-T089 can run in parallel; T092 can run alongside scanner-rule work.
- Final static checks, unit tests, and builds T098-T100 can run in parallel when resource limits
  allow; browser suites remain sequenced to avoid shared-port collisions.

---

## Parallel Examples by User Story

### User Story 2

Run T014, T015, T016, and T017 concurrently to establish the UI, service, calculator, and hook
contracts before implementing T018-T024.

### User Story 4

Run T026-T030 concurrently, then implement the SDK gateway (T031) and Inventory application service
(T032-T033) as separate file streams before composing them.

### User Story 3

Run T038-T045 concurrently; implement browser and memory command-store methods (T046/T047) in
parallel, then converge on the repository and services (T048-T055).

### User Story 1

Run T057-T061 concurrently; implement the publication hub and last-Order adapter (T062/T063) in
parallel before checkout composition and UI migration.

### User Story 5

Run T073-T078 concurrently using isolated deterministic fixtures, then address scope, failure,
cache, and stable-publication gaps in T079-T082.

### User Story 6

Run T084-T089 concurrently to freeze enforcement and substitution expectations, then implement the
scanner/policy, ESLint, SDK-surface, and composition changes in T090-T095.

---

## Implementation Strategy

### MVP First: Existing Sale Vertical Slice

1. Complete Setup and Foundational contracts.
2. Complete US2 and US4 in parallel where possible.
3. Complete US3 so every persisted Order write is owner-controlled.
4. Complete US1 checkout integration.
5. Stop and validate the complete existing sale independently before P2/P3 hardening.

The suggested MVP is the US1 sale journey, but it is truthful only with its P1 owner-boundary
dependencies US2, US4, and US3 completed. Shipping US1 alone on the broad legacy store would not
satisfy the feature objective.

### Incremental Delivery

1. Setup + Foundational → contracts and evidence ready.
2. US2 → POS draft boundary independently verified.
3. US4 → Inventory effect boundary independently verified.
4. US3 → one durable Order writer independently verified.
5. US1 → complete sale journey independently verified.
6. US5 → scope/persistence/recovery compatibility hardened.
7. US6 → substitution and enforcement proven.
8. Final quality gate → feature ready for review.

### Safe Migration Rules

- Keep commands synchronous until a separately governed future contract changes timing.
- Keep Feature 053 Order reads active and unchanged throughout.
- Never leave both old and new Order writers active after a checkpoint.
- Never broaden a repository to add an absent command.
- Never convert cache notification into persistence truth, an Event, or Audit evidence.
- Never change keys, records, identifiers, calculations, write order, error mapping, routes, or
  visual behavior to simplify the migration.
- Stop and route through Governance if implementation requires a deferred lifecycle, ownership,
  backend, authorization, idempotency, transaction, locking, or offline decision.

---

## Notes

- `[P]` means different files or isolated evidence with no incomplete dependency.
- Characterization tests should pass before movement; new-boundary tests should fail before their
  implementation and pass afterward.
- Every user-story checkpoint is independently testable even though the integrated MVP follows the
  dependency graph above.
- `AppProvider` may remain only as a compatibility context/delegation/publication adapter.
- All new contract and repository names remain explicitly legacy/frontend-internal.
- Do not create commits automatically; commit only when separately requested.
