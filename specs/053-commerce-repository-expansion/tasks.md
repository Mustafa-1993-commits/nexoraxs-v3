# Tasks: Commerce Repository Pattern Expansion

**Input**: Design documents from `/specs/053-commerce-repository-expansion/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`,
`quickstart.md`

**Tests**: Tests are mandatory for this feature. Characterization tests must pass before structural
changes. For every later story, add the listed failing contract/integration/browser tests before its
implementation and make them pass without weakening scope or compatibility assertions.

**Organization**: Tasks are grouped by user story. User Story 1 is a hard gate for all structural
work. User Stories 2 and 3 establish the Customer vertical slice and shared scope-safe read seams;
the P2 route migrations then remain independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it uses different files and has no dependency on another
  incomplete task in the same phase.
- **[Story]**: Maps the task to a user story from `spec.md`.
- Every task names the exact file or files it changes or the evidence file where command output is
  recorded.

---

## Phase 1: Setup (Evidence and Delivery Skeleton)

**Purpose**: Prepare traceable implementation evidence without changing a runtime data source.

- [X] T001 Create the Feature 053 gate/evidence ledger with authority, Deferred Decision, ownership, scope, test, and rollback sections in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T002 Inventory current Customer, Inventory, Order, Invoice, Product-reference, POS, and retained-write consumers plus their source callbacks in `specs/053-commerce-repository-expansion/compatibility-mapping.md`
- [X] T003 Define the acceptance-to-test matrix for FR-001 through FR-092 and SC-001 through SC-014 in `specs/053-commerce-repository-expansion/test-matrix.md`
- [X] T004 Record the current branch, Node/pnpm versions, package scripts, affected dependency graph, and exact validation commands in `specs/053-commerce-repository-expansion/implementation-evidence.md`

---

## Phase 2: Foundational (Characterization Harness and Guardrails)

**Purpose**: Build deterministic fixtures and boundary checks required to characterize existing
behavior. No repository contract, store, hook, or production route changes may begin in this phase.

**⚠️ CRITICAL**: User Story 1 must pass after this phase before T017 or any later structural task
starts.

- [X] T005 [P] Create isolated overlapping-Workspace/legacy-Business-Unit/Branch Product, Customer, Inventory, Order, and Invoice unit fixtures with injected IDs/clocks in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-fixtures.ts`
- [X] T006 [P] Create browser seed/reset/snapshot helpers for all four Feature 053 storage keys and existing Product relationships in `tests/e2e/fixtures/commerce-053.ts`
- [X] T007 [P] Add the initial source-boundary guard suite for Product compatibility, forbidden cross-app imports, environment reads, direct browser storage, and transport calls in `apps/commerce/features/repository-expansion/__tests__/commerce-053-source-boundaries.test.ts`
- [X] T008 Run the current Feature 052 Product unit/browser suites and Commerce 044 Playwright suite unchanged, then record commands and results in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T009 Complete the pre-characterization Constitution and no-structural-change checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Deterministic fixtures and governance guardrails are ready; production behavior is
still unchanged.

---

## Phase 3: User Story 1 — Characterize Every Affected Journey Before Migration (Priority: P1) 🎯 Gate

**Goal**: Establish executable, passing evidence for every affected route, storage shape,
relationship, retained write, refresh, language/direction, and accessible interaction before any
source cutover.

**Independent Test**: Run the Characterization suites against the untouched application and verify
that exact routes, fields, filters, IDs, serialized records, relationship fallbacks, mutations,
refresh persistence, English/LTR, Arabic/RTL, and keyboard/semantic behavior are captured and pass.

### Tests and characterization for User Story 1

- [X] T010 [US1] Characterize `/customers`, `/customers/<id>`, POS Customer selection/create, search, metrics, drawer behavior, Customer update, IDs, ordering, and refresh persistence in `tests/e2e/commerce-053-characterization.spec.ts`
- [X] T011 [US1] Extend route characterization for `/inventory`, `/orders`, `/orders/<id>`, `/invoices`, `/invoices/<id>`, Invoice document, retained writes, filters, links, and visible commercial snapshots in `tests/e2e/commerce-053-characterization.spec.ts`
- [X] T012 [P] [US1] Characterize current `AppProvider` Customer writes and retained Inventory/Order/Invoice/return writes, including exactly one storage effect, in `apps/commerce/lib/store/__tests__/commerce-053-app-provider-characterization.test.tsx`
- [X] T013 [P] [US1] Characterize English/LTR and Arabic/RTL route direction, keyboard names, focus behavior, and currently missing async/accessibility states in `tests/e2e/commerce-053-characterization-accessibility.spec.ts`
- [X] T014 [P] [US1] Characterize effective Inventory fallback, Customer history metrics, Order/Invoice relationship fallbacks, and Invoice detail/document Customer-source differences in `apps/commerce/features/repository-expansion/__tests__/commerce-053-presentation-characterization.test.ts`
- [X] T015 [P] [US1] Characterize byte-compatible storage keys, field names, insertion order, unknown serializable fields, and refresh round trips in `apps/commerce/lib/store/__tests__/commerce-053-storage-characterization.test.ts`
- [X] T016 [US1] Run every User Story 1 characterization test, freeze the observed outcomes and already-missing required states, and record the passing structural-change gate in `specs/053-commerce-repository-expansion/compatibility-mapping.md` and `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: The pre-migration baseline passes. Structural implementation may now begin.

---

## Phase 4: User Story 2 — Complete the Current Customers Journey Through One Boundary (Priority: P1)

**Goal**: Move Customer list/get/create/update, Customer history, POS selection/create, and remaining
legacy Customer publication to one repository-backed boundary while preserving IDs, storage,
references, routes, and visible behavior.

**Independent Test**: Use `/customers`, `/customers/<id>`, and POS to list, search, create, select,
and update Customers; verify pending/validation/manual retry, exact persistence after refresh,
unchanged Order/Invoice references, scope-safe history, one facade publication, and zero active
provider write callback.

### Tests for User Story 2 — write before implementation

- [X] T017 [P] [US2] Write the failing Customer list/get/create/update conformance suite plus the read-only Order list/get conformance suite needed by Customer history in `packages/sdk/src/commerce/customers/__tests__/legacy-customers-repository.contract.ts` and `packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract.ts`
- [X] T018 [P] [US2] Write failing memory/browser-compatible Customer and Order store/repository parity, corrupt-storage, unavailable-storage, and no-read-rewrite tests in `packages/sdk/src/commerce/customers/__tests__/memory-customers-repository.test.ts`, `packages/sdk/src/commerce/customers/__tests__/browser-customers-repository.test.ts`, `packages/sdk/src/commerce/orders/__tests__/memory-orders-repository.test.ts`, and `packages/sdk/src/commerce/orders/__tests__/browser-orders-repository.test.ts`
- [X] T019 [P] [US2] Write failing Customer validation, not-found, corrupt/unavailable/quota storage, configured-failure, mutation-queue, injected-clock/ID, and no-partial-write tests in `packages/sdk/src/commerce/customers/__tests__/customer-writes-and-failures.test.ts`
- [X] T020 [P] [US2] Write failing facade tests for post-commit exactly-once publication, scoped subscriptions, and no publication/delegation on failure in `packages/sdk/src/commerce/customers/__tests__/compatibility-facade.test.ts`
- [X] T021 [P] [US2] Write failing Customer query-key, cache-update, pending, duplicate-submit, manual-retry, and no-automatic-retry hook tests in `apps/commerce/features/customers/__tests__/legacy-customer-hooks.test.tsx`
- [X] T022 [P] [US2] Write failing scope-safe Customer-history tests using stored Order snapshots without Order writes or recalculation in `apps/commerce/features/customers/__tests__/legacy-customer-history-service.test.ts`
- [X] T023 [P] [US2] Write failing Customer list/detail/POS migration, validation, pending, reference, refresh, and unchanged-route regression scenarios in `tests/e2e/commerce-053-customers.spec.ts`

### Implementation for User Story 2

- [X] T024 [P] [US2] Implement visibly frontend-internal legacy scope, list/result, operation, field-issue, and error primitives in `packages/contracts/src/commerce/common/legacy-commerce-contracts.ts` and `packages/contracts/src/commerce/common/index.ts`
- [X] T025 [P] [US2] Implement the legacy Customer record, create/update commands, repository interface, and internal errors in `packages/contracts/src/commerce/customers/legacy-customer-record.ts`, `packages/contracts/src/commerce/customers/legacy-customer-errors.ts`, `packages/contracts/src/commerce/customers/legacy-customers-repository.ts`, and `packages/contracts/src/commerce/customers/index.ts`
- [X] T026 [P] [US2] Implement the read-only legacy Order item/record and list/get repository contract required by Customer history in `packages/contracts/src/commerce/orders/legacy-order-record.ts`, `packages/contracts/src/commerce/orders/legacy-orders-repository.ts`, and `packages/contracts/src/commerce/orders/index.ts`
- [X] T027 [US2] Export only the new frontend-internal common, Customer, and Order contracts/subpaths while retaining Feature 052 Product exports in `packages/contracts/src/index.ts` and `packages/contracts/package.json`
- [X] T028 [US2] Implement narrow Customer/Order mock-store ports and compatibility serializers that preserve ordering and unknown Customer fields in `packages/sdk/src/commerce/customers/MockCustomersStore.ts`, `packages/sdk/src/commerce/customers/legacy-customer-serialization.ts`, `packages/sdk/src/commerce/orders/MockOrdersStore.ts`, and `packages/sdk/src/commerce/orders/legacy-order-serialization.ts`
- [X] T029 [US2] Extend the existing browser and memory Commerce stores additively for Customer/Order collections without changing Product constructor/import behavior in `packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts` and `packages/sdk/src/commerce/products/MemoryCommerceStore.ts`
- [X] T030 [P] [US2] Implement shared deterministic latency/failure invocation matching, injected clock/ID handling, and sanitized local diagnostics without randomness in `packages/sdk/src/commerce/common/legacy-commerce-mock-behavior.ts`
- [X] T031 [P] [US2] Implement scoped, atomic `MockCustomersRepository` list/get/create/update behavior through `MockCustomersStore` in `packages/sdk/src/commerce/customers/MockCustomersRepository.ts`
- [X] T032 [P] [US2] Implement and export the business-unit-scoped read-only `MockOrdersRepository` needed for Customer history without any Order mutation in `packages/sdk/src/commerce/orders/MockOrdersRepository.ts` and `packages/sdk/src/commerce/orders/index.ts`
- [X] T033 [US2] Implement and export the repository-upstream Customer compatibility facade with scoped snapshots and post-commit publication in `packages/sdk/src/commerce/customers/LegacyCustomersCompatibilityFacade.ts` and `packages/sdk/src/commerce/customers/index.ts`
- [X] T034 [US2] Implement full-scope Customer query keys/cache helpers, list/item/create/update hooks, localized English/Arabic messages, and feature exports in `apps/commerce/features/customers/hooks/legacy-customer-query-keys.ts`, `apps/commerce/features/customers/hooks/legacy-customer-cache.ts`, `apps/commerce/features/customers/hooks/useLegacyCustomers.ts`, `apps/commerce/features/customers/hooks/useLegacyCustomerMutations.ts`, `apps/commerce/features/customers/i18n/customer-messages.ts`, and `apps/commerce/features/customers/index.ts`
- [X] T035 [US2] Implement `LegacyCustomerHistoryService` with independently scoped Customer and Order repository reads and stored-snapshot metrics in `apps/commerce/features/customers/application/LegacyCustomerHistoryService.ts`
- [X] T036 [US2] Extend SDK composition/exports additively for Customer/Order repositories and the Customer facade, construct the Customer history service once, and disable automatic retry-on-mount/focus/reconnect in `packages/sdk/src/commerce/products/createCommerceServices.ts`, `packages/sdk/src/commerce/products/index.ts`, `packages/sdk/src/index.ts`, `packages/sdk/package.json`, and `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`
- [X] T037 [P] [US2] Migrate the Customer list/search/metrics/drawer/create flow to Customer hooks while preserving visible ordering, fields, routes, and pending/validation behavior in `apps/commerce/app/(commerce)/customers/page.tsx`
- [X] T038 [P] [US2] Migrate Customer detail/history/update to scoped hooks, initialize/reset the form after async data resolves, and preserve safe not-found/navigation behavior in `apps/commerce/app/(commerce)/customers/[id]/page.tsx`
- [X] T039 [P] [US2] Migrate only POS Customer selection and inline Customer creation to the new hooks while retaining existing Order/Invoice creation and commercial writes in `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T040 [US2] Make the Customer facade upstream for remaining legacy consumers, prove zero active `createCustomer`/`updateCustomer` caller, then remove only those obsolete callbacks while retaining `AppProvider` in `apps/commerce/lib/store/AppProvider.tsx` and record the source scan in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T041 [US2] Run all User Story 2 contract, hook, integration, browser, persistence, and Feature 052 regression tests and record the Customer checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Customers have one active persistence boundary; Orders/Invoices retain unchanged
Customer IDs and their operational writers remain legacy.

---

## Phase 5: User Story 3 — Prevent Cross-Scope Records and Cache Collisions (Priority: P1)

**Goal**: Make every included repository, relation, query key, publication, and retained-write
notification fail closed across Workspace, legacy Business Unit, and applicable Branch using
overlapping IDs.

**Independent Test**: Execute the complete multi-Workspace/multi-Business-Unit/multi-Branch overlap
matrix against all repositories, services, caches, Customer writes, relationships, scope switches,
and invalidations; observe zero foreign return, join, mutation, disclosure, or cache activity.

### Tests for User Story 3 — write before implementation

- [X] T042 [P] [US3] Write failing Inventory and Invoice conformance suites plus memory/browser runners and read-only surface assertions in `packages/sdk/src/commerce/inventory/__tests__/legacy-inventory-repository.contract.ts`, `packages/sdk/src/commerce/inventory/__tests__/memory-inventory-repository.test.ts`, `packages/sdk/src/commerce/inventory/__tests__/browser-inventory-repository.test.ts`, `packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract.ts`, `packages/sdk/src/commerce/invoices/__tests__/memory-invoices-repository.test.ts`, and `packages/sdk/src/commerce/invoices/__tests__/browser-invoices-repository.test.ts`
- [X] T043 [P] [US3] Write failing deterministic latency/failure/diagnostic tests for Customer, Inventory, Order, and Invoice operations with stable invocation rules in `packages/sdk/src/commerce/common/__tests__/legacy-commerce-mock-behavior.test.ts`
- [X] T044 [P] [US3] Write failing overlapping-ID scope-isolation tests across every repository operation and Customer mutation in `packages/sdk/src/commerce/common/__tests__/legacy-commerce-scope-isolation.test.ts`
- [X] T045 [P] [US3] Write failing full-scope query-key, scope-switch, cache-update, and unrelated-cache-invocation tests for all four domains in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-cache-isolation.test.tsx`
- [X] T046 [P] [US3] Write failing cross-scope/missing/dangling Product-Customer-Inventory-Order-Invoice relationship tests in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-relationship-isolation.test.ts`
- [X] T047 [P] [US3] Write failing exact-scope retained-write coordinator tests that assert no persistence and no global-prefix invalidation in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-read-coordinator.test.ts`
- [X] T048 [P] [US3] Extend source-boundary tests to forbid Inventory/Order/Invoice repository writes, generic CRUD/pagination, direct storage/fetch/env access, and canonical `businessId` in `apps/commerce/features/repository-expansion/__tests__/commerce-053-source-boundaries.test.ts`

### Implementation for User Story 3

- [X] T049 [P] [US3] Implement the Branch Inventory compatibility record and read-only list repository contract in `packages/contracts/src/commerce/inventory/legacy-inventory-record.ts`, `packages/contracts/src/commerce/inventory/legacy-inventory-repository.ts`, and `packages/contracts/src/commerce/inventory/index.ts`
- [X] T050 [P] [US3] Implement the legacy Invoice compatibility record and read-only list/get repository contract in `packages/contracts/src/commerce/invoices/legacy-invoice-record.ts`, `packages/contracts/src/commerce/invoices/legacy-invoices-repository.ts`, and `packages/contracts/src/commerce/invoices/index.ts`
- [X] T051 [US3] Export Inventory and Invoice frontend-internal contracts/subpaths without changing Product/Customer/Order exports in `packages/contracts/src/index.ts` and `packages/contracts/package.json`
- [X] T052 [US3] Implement narrow Inventory/Invoice store ports and non-rewriting serializers, then extend the browser/memory stores additively in `packages/sdk/src/commerce/inventory/MockInventoryStore.ts`, `packages/sdk/src/commerce/inventory/legacy-inventory-serialization.ts`, `packages/sdk/src/commerce/invoices/MockInvoicesStore.ts`, `packages/sdk/src/commerce/invoices/legacy-invoice-serialization.ts`, `packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts`, and `packages/sdk/src/commerce/products/MemoryCommerceStore.ts`
- [X] T053 [P] [US3] Implement and export Branch-scoped read-only `MockInventoryRepository` list behavior with safe storage/failure outcomes in `packages/sdk/src/commerce/inventory/MockInventoryRepository.ts` and `packages/sdk/src/commerce/inventory/index.ts`
- [X] T054 [P] [US3] Implement and export business-unit-scoped and optional-Branch-filtered read-only `MockInvoicesRepository` list/get behavior in `packages/sdk/src/commerce/invoices/MockInvoicesRepository.ts` and `packages/sdk/src/commerce/invoices/index.ts`
- [X] T055 [P] [US3] Implement normalized full-scope key factories for Inventory, Orders, Invoices, composed views, explicit null Branches, filters, IDs, and view kind in `apps/commerce/features/inventory/hooks/legacy-inventory-query-keys.ts`, `apps/commerce/features/orders/hooks/legacy-order-query-keys.ts`, and `apps/commerce/features/invoices/hooks/legacy-invoice-query-keys.ts`
- [X] T056 [US3] Implement scope-rechecking Inventory, Order, and Invoice read services without source writes or commercial recalculation in `apps/commerce/features/inventory/application/LegacyInventoryProjectionService.ts`, `apps/commerce/features/orders/application/LegacyOrderViewService.ts`, and `apps/commerce/features/invoices/application/LegacyInvoiceViewService.ts`
- [X] T057 [US3] Implement the no-write exact-scope React Query coordinator for Inventory/Order/Invoice/return commit notifications in `apps/commerce/features/repository-expansion/application/LegacyCommerceReadCoordinator.ts`
- [X] T058 [US3] Extend SDK exports/subpaths/composition with all read-only repositories, propagate configured latency/deterministic overrides, and construct all app-owned read services and the coordinator once per provider runtime in `packages/sdk/src/index.ts`, `packages/sdk/package.json`, `packages/sdk/src/commerce/products/createCommerceServices.ts`, and `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`
- [X] T059 [US3] Run repository parity, scope/relationship/cache isolation, deterministic behavior, source-boundary, and Feature 052 regression tests and record the tenant-safety checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Every raw included seam and composed relation fails closed by the complete available
legacy scope; this remains documented as mock defense in depth, not production authorization.

---

## Phase 6: User Story 4 — Read Current Inventory Projections Without Migrating Stock Writes (Priority: P2)

**Goal**: Cut `/inventory` to a Branch-scoped Product/Inventory read projection while all stock
adjustment, transfer, sale deduction, return restock, movement, and lifecycle writes remain on their
single existing path.

**Independent Test**: Load and filter Inventory in two Branches with Product rows both with and
without Inventory records, force loading/failure/manual retry, execute retained stock writes, and
verify the exact projected quantity appears once without repository mutation or foreign cache use.

### Tests for User Story 4 — write before implementation

- [X] T060 [P] [US4] Write failing Inventory projection, missing-row fallback, filter/summary, Branch-switch, hook state, and manual-retry tests in `apps/commerce/features/inventory/__tests__/legacy-inventory-projection.test.ts` and `apps/commerce/features/inventory/__tests__/legacy-inventory-hooks.test.tsx`
- [X] T061 [P] [US4] Write failing Inventory route, refresh, Branch isolation, retained adjustment/transfer/order/return observation, and unchanged UI regression scenarios in `tests/e2e/commerce-053-read-models.spec.ts`

### Implementation for User Story 4

- [X] T062 [US4] Implement the Inventory query hook, localized English/Arabic state messages, and feature exports over `LegacyInventoryProjectionService` in `apps/commerce/features/inventory/hooks/useLegacyInventory.ts`, `apps/commerce/features/inventory/i18n/inventory-messages.ts`, and `apps/commerce/features/inventory/index.ts`
- [X] T063 [US4] Migrate only Inventory reads/presentation to the hook while preserving current search/status summaries, fallback values, rows, and the retained `adjustStock` control in `apps/commerce/app/(commerce)/inventory/page.tsx`
- [X] T064 [US4] Notify exact affected Branch Inventory keys only after existing adjustment, transfer, Order deduction, and restocking return commits without moving or repeating their writes in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T065 [US4] Add exactly-once retained Inventory-write and unrelated-scope-invalidation regression coverage in `apps/commerce/features/inventory/__tests__/legacy-inventory-retained-writes.test.tsx`
- [X] T066 [US4] Run all Inventory contract/projection/hook/browser tests and record the read-only/no-duplicate-write checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Inventory reads are repository-backed; every stock-changing operation remains
legacy and single-source.

---

## Phase 7: User Story 5 — Read Current Order Lists and Details Without Moving Order Logic (Priority: P2)

**Goal**: Cut Order list/detail reads to scoped hooks/services while keeping creation, commercial
calculation, payment, cancellation, fulfillment, return, Invoice, and Inventory side effects on the
retained paths.

**Independent Test**: Open filtered Branch Orders and business-unit-safe details, resolve current
Customer/Product/Invoice references and missing cases, create/return an Order through retained paths,
and observe the exact stored record once with no repository write or recalculation.

### Tests for User Story 5 — write before implementation

- [X] T067 [P] [US5] Write failing Order list/detail view-service, linked Invoice/Customer, stored-snapshot, query-hook, not-found, and manual-retry tests in `apps/commerce/features/orders/__tests__/legacy-order-view-service.test.ts` and `apps/commerce/features/orders/__tests__/legacy-order-hooks.test.tsx`
- [X] T068 [P] [US5] Extend Order list/detail, filter, route, reference, refresh, retained POS-create/return, and no-recalculation scenarios in `tests/e2e/commerce-053-read-models.spec.ts`

### Implementation for User Story 5

- [X] T069 [US5] Implement Order list/detail query hooks, localized English/Arabic state messages, and feature exports in `apps/commerce/features/orders/hooks/useLegacyOrders.ts`, `apps/commerce/features/orders/i18n/order-messages.ts`, and `apps/commerce/features/orders/index.ts`
- [X] T070 [P] [US5] Migrate `/orders` to the Branch-scoped Order view hook while preserving filters, ordering, stored totals/status/date, linked Invoice, and route presentation in `apps/commerce/app/(commerce)/orders/page.tsx`
- [X] T071 [P] [US5] Migrate `/orders/<id>` to the business-unit-scoped detail hook while retaining the existing return mutation/provider inputs and cross-Branch badge/fallback behavior in `apps/commerce/app/(commerce)/orders/[id]/page.tsx`
- [X] T072 [US5] Notify exact Order list/item, Customer-history, and linked views only after retained Order/return commits without duplicating creation, return, payment, tax, or Inventory effects in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T073 [US5] Add retained Order-writer exactly-once, read-only export, commercial-snapshot, and unrelated-cache regression tests in `apps/commerce/features/orders/__tests__/legacy-order-retained-writes.test.tsx`
- [X] T074 [US5] Run all Order contract/service/hook/browser tests and record the read-only/no-commercial-write checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Order list/detail reads are repository-backed; the retained POS/return paths remain
the only Order writers.

---

## Phase 8: User Story 6 — Read Current Invoice Lists, Details, and Documents Without Moving Issuance (Priority: P2)

**Goal**: Cut Invoice list/detail/document reads to scoped hooks/services while preserving stored
IDs, numbers, Order/Customer references, presentation fallbacks, and the single retained issuance
path.

**Independent Test**: Open Branch Invoice lists plus business-unit-safe detail/document views for
complete, missing, dangling, and cross-scope relations; create an Invoice through the retained path
and verify it appears once with unchanged stored fields and no repository issuance/recalculation.

### Tests for User Story 6 — write before implementation

- [X] T075 [P] [US6] Write failing Invoice list/detail/document view-service, relationship-fallback, stored-snapshot, query-hook, not-found, and manual-retry tests in `apps/commerce/features/invoices/__tests__/legacy-invoice-view-service.test.ts` and `apps/commerce/features/invoices/__tests__/legacy-invoice-hooks.test.tsx`
- [X] T076 [P] [US6] Extend Invoice list/detail/document, route, fallback, refresh, retained-create, and unchanged-reference scenarios in `tests/e2e/commerce-053-read-models.spec.ts`

### Implementation for User Story 6

- [X] T077 [US6] Implement Invoice list/detail/document query hooks, localized English/Arabic state messages, and feature exports in `apps/commerce/features/invoices/hooks/useLegacyInvoices.ts`, `apps/commerce/features/invoices/i18n/invoice-messages.ts`, and `apps/commerce/features/invoices/index.ts`
- [X] T078 [P] [US6] Migrate `/invoices` to the Branch-scoped view hook while preserving filters, drawer, current `computeDoc` presentation compatibility, links, and visible totals without moving calculation into the repository in `apps/commerce/app/(commerce)/invoices/page.tsx`
- [X] T079 [P] [US6] Migrate `/invoices/<id>` to the business-unit-scoped detail hook while retaining current return/provider inputs and characterized Order/Customer fallbacks in `apps/commerce/app/(commerce)/invoices/[id]/page.tsx`
- [X] T080 [P] [US6] Migrate the Invoice document route to the document view hook while preserving IDs, numbers, stored records, setup presentation, and its characterized Customer-source fallback in `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`
- [X] T081 [US6] Notify exact Invoice list/item/document and linked Order views only after retained Invoice/return commits without duplicating issuance, numbering, tax, payment, credit-note, or accounting behavior in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T082 [US6] Add retained Invoice-writer exactly-once, read-only export, source-record immutability, and unrelated-cache regression tests in `apps/commerce/features/invoices/__tests__/legacy-invoice-retained-writes.test.tsx`
- [X] T083 [US6] Run all Invoice contract/service/hook/browser tests and record the read-only/no-issuance checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Invoice list/detail/document reads are repository-backed; issuance and accounting
semantics remain outside Feature 053.

---

## Phase 9: User Story 7 — Reuse One Stable Commerce Runtime and Compatibility Direction (Priority: P2)

**Goal**: Prove one stable Commerce composition owns implementation selection, repositories,
facades, bounded services, and cache coordination while pages/hooks remain implementation- and
storage-agnostic and Feature 052 Product identity remains compatible.

**Independent Test**: Construct isolated runtimes, render consumers 100 times, switch scopes,
select mock/unavailable HTTP modes, trigger included operations and retained writes, and verify
stable identities, deterministic outcomes, no request, correct facade direction, and no forbidden
source import/access.

### Tests for User Story 7 — write before final runtime hardening

- [X] T084 [P] [US7] Extend composition tests for additive Product compatibility, all repository/facade/service identities, memory/browser overrides, and stable instances in `packages/sdk/src/commerce/products/__tests__/commerce-composition.test.ts`
- [X] T085 [P] [US7] Write runtime configuration and deterministic HTTP-unavailable/no-request tests for every new domain in `packages/sdk/src/commerce/common/__tests__/commerce-runtime-configuration.test.ts`
- [X] T086 [P] [US7] Extend source-boundary tests for page-to-hook direction, simple repository calls, bounded service use, storage/env/fetch isolation, shared-package ownership, and cross-app imports in `apps/commerce/features/repository-expansion/__tests__/commerce-053-source-boundaries.test.ts`

### Implementation for User Story 7

- [X] T087 [US7] Finalize one-time construction of app-owned read services and `LegacyCommerceReadCoordinator` alongside the stable SDK services/QueryClient without recreating instances during render in `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`
- [X] T088 [US7] Finalize additive domain exports and runtime override types while preserving every Feature 052 Product import and unavailable HTTP behavior in `packages/sdk/src/index.ts` and `packages/sdk/src/commerce/products/createCommerceServices.ts`
- [X] T089 [US7] Extend provider integration tests to 100 rerenders, provider-order preservation, Customer-facade upstream direction, and retained `AppProvider` responsibilities in `apps/commerce/features/products/__tests__/commerce-services-provider.test.tsx` and `apps/commerce/features/products/__tests__/app-provider-product-facade.test.tsx`
- [X] T090 [US7] Run runtime composition, 100-rerender identity, deterministic failure, unavailable-HTTP, source-boundary, and Feature 052 compatibility suites and record results in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T091 [US7] Update the compatibility responsibility and zero-consumer tables with the final repository→facade→legacy direction in `specs/053-commerce-repository-expansion/compatibility-mapping.md`

**Checkpoint**: One stable Commerce runtime selects implementations; pages/components never do and
`AppProvider` is not the architectural center.

---

## Phase 10: User Story 8 — Recover Accessibly in English and Arabic (Priority: P2)

**Goal**: Make all migrated loading, empty, error/manual-retry, not-found, Customer pending, and
validation states understandable and operable in English/LTR and Arabic/RTL without redesign.

**Independent Test**: Force every state on each migrated surface, exercise retry and Customer forms
by keyboard, inspect labels/errors/focus/announcements, switch EN/AR and LTR/RTL with mixed-direction
data, and obtain zero critical accessibility violations and zero automatic retries.

### Tests for User Story 8 — write before accessibility hardening

- [X] T092 [P] [US8] Write English/LTR and Arabic/RTL Playwright coverage for every required async, empty, not-found, pending, validation, retry, focus, mixed-direction, and axe state in `tests/e2e/commerce-053-localization-accessibility.spec.ts`
- [X] T093 [P] [US8] Write component/hook tests for semantic names, field error association, busy announcements, focus safety, duplicate-submit prevention, and explicit retry only in `apps/commerce/features/repository-expansion/__tests__/commerce-053-accessible-states.test.tsx`

### Implementation for User Story 8

- [X] T094 [P] [US8] Complete Customer English/Arabic messages, logical layout, field associations, pending semantics, focus recovery, and mixed-direction preservation in `apps/commerce/features/customers/i18n/customer-messages.ts`, `apps/commerce/app/(commerce)/customers/page.tsx`, `apps/commerce/app/(commerce)/customers/[id]/page.tsx`, and `apps/commerce/app/(commerce)/pos/page.tsx`
- [X] T095 [P] [US8] Complete Inventory English/Arabic loading/empty/error/manual-retry messages, logical direction, semantic status, and focus behavior in `apps/commerce/features/inventory/i18n/inventory-messages.ts` and `apps/commerce/app/(commerce)/inventory/page.tsx`
- [X] T096 [P] [US8] Complete Order English/Arabic loading/empty/error/manual-retry/not-found messages, logical direction, semantic status, and focus behavior in `apps/commerce/features/orders/i18n/order-messages.ts`, `apps/commerce/app/(commerce)/orders/page.tsx`, and `apps/commerce/app/(commerce)/orders/[id]/page.tsx`
- [X] T097 [P] [US8] Complete Invoice English/Arabic loading/empty/error/manual-retry/not-found messages, logical direction, semantic status, and focus behavior in `apps/commerce/features/invoices/i18n/invoice-messages.ts`, `apps/commerce/app/(commerce)/invoices/page.tsx`, `apps/commerce/app/(commerce)/invoices/[id]/page.tsx`, and `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`
- [X] T098 [US8] Prove timer, rerender, remount, focus, and reconnect events never automatically reinvoke failed reads or Customer mutations while explicit controls do in `apps/commerce/features/repository-expansion/__tests__/commerce-053-manual-retry.test.tsx`
- [X] T099 [US8] Run keyboard, screen-reader semantic, EN/AR, RTL/LTR, mixed-direction, focus, non-color-only, and axe checks and record manual/automated evidence in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T100 [US8] Re-run the complete localized browser suite and record the no-redesign/no-visible-regression checkpoint in `specs/053-commerce-repository-expansion/implementation-evidence.md`

**Checkpoint**: Every migrated surface exposes accessible localized recovery with user-triggered
retry only.

---

## Phase 11: Polish and Cross-Cutting Validation

**Purpose**: Synchronize documentation, validate all retained boundaries, and run the complete
delivery gate without waiving tenant isolation or compatibility failures.

- [X] T101 [P] Document the bounded Feature 052/053 frontend-internal contracts/mock SDK exception and unchanged shared-package ownership in `packages/contracts/README.md`, `packages/sdk/README.md`, and `AGENTS.md`
- [X] T102 Run the final storage-key, browser-global, environment, fetch, read-only export, cross-app import, active Customer callback, canonical `businessId`, and prohibited API/lifecycle source audit from `quickstart.md` and record results in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T103 [P] Run strict TypeScript for Commerce and affected contract/SDK packages and record zero errors in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T104 [P] Run Commerce and affected root ESLint gates with zero warnings and record results in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T105 Run the complete Vitest repository/store/service/hook/integration suite and record zero failures in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T106 Run the deterministic latency/failure suites 20 consecutive times and record identical outcomes with no random/timing/test-order flakes in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T107 [P] Run the Commerce and root production builds and record successful outputs in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T108 Run every Feature 052 Product unit/integration/Playwright regression unchanged and record zero Feature 053 regressions in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T109 Run Commerce Feature 044 regression coverage and record zero Feature 053 regressions in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T110 Run all Feature 053 characterization, Customer, read-model, localization, accessibility, persistence, relationship, and retained-write Playwright suites and record results in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T111 Analyze Core Feature 050 impact from shared-package changes, run its build/Playwright suites when affected or record dependency-based N/A rationale, and capture the result in `specs/053-commerce-repository-expansion/implementation-evidence.md`
- [X] T112 Complete the post-implementation Constitution Check, confirm production authorization/Audit/observability remain explicit mock-only N/A cutover prerequisites, and synchronize final spec/plan/tasks/contracts/evidence status in `specs/053-commerce-repository-expansion/implementation-evidence.md`

---

## Dependencies and Execution Order

### Phase dependencies

```text
Phase 1 Setup
  -> Phase 2 Characterization Foundation
  -> US1 Characterization Gate
  -> US2 Customer Vertical Slice
  -> US3 Scope-Safe Shared Read Seams
  -> US4 Inventory Reads ─┐
  -> US5 Order Reads ─────┼-> US7 Runtime Proof -> US8 Accessibility -> Final Validation
  -> US6 Invoice Reads ───┘
```

- **Setup (Phase 1)**: Starts immediately and changes documentation/evidence only.
- **Foundational (Phase 2)**: Depends on Setup; may add test fixtures/guard tests but no runtime
  source cutover.
- **US1**: Depends on Phase 2 and blocks every structural task from T017 onward.
- **US2**: Depends on the passing US1 baseline. It introduces common scope behavior, Customers, the
  minimal read-only Order seam needed for history, and the first additive runtime extension.
- **US3**: Depends on US2. It completes all raw read seams, cross-scope relationship services,
  query-key isolation, and retained-write coordination before route cutovers.
- **US4, US5, US6**: Each depends on US3 and may develop feature-specific files in parallel.
  Their tasks that edit `apps/commerce/lib/store/AppProvider.tsx` must be serialized in the order
  T064 → T072 → T081 to avoid overlapping retained-writer changes.
- **US7**: Runtime tests can start after US3; final runtime proof T090/T091 depends on US4-US6
  integration completion.
- **US8**: Depends on US2 and all three migrated read-route stories because it verifies every
  visible state together.
- **Polish/Validation**: Depends on every desired story and checkpoint.

### User story dependencies and independence

- **US1 (P1)**: No story dependency; independently proves the pre-migration baseline.
- **US2 (P1)**: Depends only on US1; independently delivers the complete Customer journey and one
  persistence source.
- **US3 (P1)**: Depends on US2 shared contracts/runtime; independently proves fail-closed scope,
  relationship, cache, and invalidation behavior for all raw seams.
- **US4 (P2)**: Depends on US3 raw Inventory/Product composition; independently migrates Inventory
  reads while all writes remain retained.
- **US5 (P2)**: Depends on US3 raw Order seam; independently migrates Order reads while all writes
  remain retained.
- **US6 (P2)**: Depends on US3 raw Invoice/Order/Customer seams; independently migrates Invoice
  reads while issuance remains retained.
- **US7 (P2)**: Builds on the shared runtime from US2/US3 and independently proves implementation
  selection, stable identity, and compatibility direction.
- **US8 (P2)**: Builds on migrated visible surfaces and independently proves localized accessible
  recovery and manual retry.

### Within each user story

1. Add the listed tests before implementation.
2. Confirm migration tests fail for the expected missing seam/state; US1 characterization is the
   deliberate exception and must pass before structural work.
3. Implement contracts before repositories, repositories before services/hooks, and hooks before
   route cutover.
4. Integrate a retained writer only after its read key/service exists.
5. Run the independent story checkpoint before starting the next dependent story.
6. Never clear or rewrite valid browser data as a rollback/recovery mechanism.

---

## Parallel Opportunities by User Story

### User Story 1

```text
In parallel after T010/T011 establish the primary route baseline:
- T012 AppProvider write characterization
- T013 language/direction/accessibility characterization
- T014 presentation fallback characterization
- T015 storage compatibility characterization
```

### User Story 2

```text
In parallel before implementation: T017, T018, T019, T020, T021, T022, T023
In parallel after the tests exist: T024 common contracts, T025 Customer contracts,
T026 Order read contract, and T030 deterministic behavior
After T024-T026: T028 store ports/serializers
After store contracts exist: T031 Customer repository and T032 Order repository
```

### User Story 3

```text
In parallel before implementation: T042, T043, T044, T045, T046, T047, T048
In parallel after tests exist: T049 Inventory contracts and T050 Invoice contracts
After T052 store ports: T053 Inventory repository and T054 Invoice repository
T055 query keys can proceed in parallel with repository implementation
```

### User Story 4

```text
In parallel: T060 Inventory unit/hook tests and T061 Inventory browser tests
After T062 hook exists: T063 route cutover; T065 regression test can be prepared while T064
integrates retained-write notifications
```

### User Story 5

```text
In parallel: T067 Order unit/hook tests and T068 Order browser tests
After T069 hooks: T070 list and T071 detail can be developed in separate route files
```

### User Story 6

```text
In parallel: T075 Invoice unit/hook tests and T076 Invoice browser tests
After T077 hooks: T078 list, T079 detail, and T080 document route work can proceed in parallel
```

### User Story 7

```text
In parallel: T084 composition tests, T085 runtime-configuration tests, T086 source-boundary tests
T087 provider hardening and T088 SDK export hardening use separate files after those tests exist
```

### User Story 8

```text
In parallel: T092 browser accessibility tests and T093 component/hook accessibility tests
After test states exist: T094 Customer, T095 Inventory, T096 Order, and T097 Invoice hardening
can proceed in their separate feature/route files
```

---

## Implementation Strategy

### MVP and first shippable increment

1. Complete Setup and Foundational phases.
2. Complete **US1** and stop until the characterization gate passes. This is the minimum safe
   planning/delivery checkpoint, but it intentionally changes no user-facing data source.
3. Complete **US2** and validate independently. **US1 + US2 is the first shippable vertical slice**:
   complete Customers through one repository boundary with preserved POS/history compatibility.
4. Do not remove any additional provider responsibility in the MVP.

### Incremental delivery

1. Setup + Foundation → deterministic evidence harness.
2. US1 → frozen no-regression baseline.
3. US2 → complete Customers slice.
4. US3 → all raw seams tenant-safe before route migration.
5. US4 → Inventory reads only.
6. US5 → Order reads only.
7. US6 → Invoice reads only.
8. US7 → stable runtime and compatibility-direction proof.
9. US8 → complete localized accessible recovery.
10. Final validation → merge readiness.

Each checkpoint retains valid browser data and can be reverted without deleting `AppProvider` or
moving excluded operational writes.

### Parallel team strategy

After US3 completes, separate developers may implement Inventory, Order, and Invoice feature files
in parallel. Changes to `AppProvider.tsx`, the shared browser/memory stores, root exports, and the
Commerce services provider remain serialized integration points. Accessibility hardening can split
by domain after all visible state tests are written.

---

## Notes

- `[P]` tasks touch different files and have no unfinished prerequisite in the same phase.
- Every new type and diagnostic must remain visibly legacy/frontend-internal.
- `businessId`, canonical Business records, HTTP adapters, Laravel DTOs, API pagination/error
  taxonomies, network idempotency, MSW, production Audit, and lifecycle decisions are prohibited.
- Customers are the only new write repository. Inventory, Order, and Invoice repositories remain
  read-only even when their retained writers notify caches.
- Simple CRUD hooks call one repository; only scope-safe multi-repository reads use application
  services.
- React Query orchestrates cache/request state only and performs no automatic retry.
- Feature 052 Product behavior and imports remain compatible throughout.
- Preserve unrelated user work and commit after each completed task or coherent checkpoint.
