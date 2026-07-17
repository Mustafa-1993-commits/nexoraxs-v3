# Tasks: Architecture Hardening

**Input**: Design documents from `/specs/054-architecture-hardening/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Verification is mandatory because Feature 054 explicitly requires characterization,
contract, integration, architecture, deterministic, build, localization, accessibility, and
end-to-end evidence. In every migration slice, add the named test first and observe the expected
failure before changing production behavior.

**Organization**: Tasks are grouped by user story. User Story 2 remains P1, but its production gate
is deliberately scheduled after the other P1 ownership migrations so it can be enabled against a
clean source tree without a known-debt allowlist. No task introduces backend integration or changes
business behavior.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it targets different files and has no incomplete dependency
- **[Story]**: User-story traceability label
- Every task names an exact file path

---

## Phase 1: Setup (Shared Tooling and Evidence)

**Purpose**: Prepare the bounded tooling, test resolution, fixtures, and evidence surfaces required
for the architecture-hardening work.

- [X] T001 Add root `typescript@5.9.3` for the repository-owned AST scanner in `package.json` and `pnpm-lock.yaml`
- [X] T002 Configure exact-match aliases for `@nexoraxs/sdk` and `@nexoraxs/sdk/testing` and include architecture suites in `vitest.config.ts`
- [X] T003 [P] Create reusable Feature 054 browser-data, scope, actor, clock, and ID fixtures in `tests/e2e/fixtures/commerce-054.ts`
- [X] T004 [P] Create the baseline, checkpoint, command-result, deferred-decision, and zero-consumer evidence matrix in `specs/054-architecture-hardening/implementation-evidence.md`

---

## Phase 2: Foundational (Blocking Ports and Test Doubles)

**Purpose**: Add framework-neutral, visibly legacy contracts and deterministic test foundations
before moving any responsibility.

**⚠️ CRITICAL**: Complete this phase before any user-story migration. These are frontend-internal
compatibility seams, not canonical backend or public API contracts.

- [X] T005 [P] Define Product and Customer application-facing compatibility interfaces in `packages/contracts/src/commerce/common/legacy-compatibility-ports.ts`
- [X] T006 [P] Define fully scoped Product, Customer, Inventory, Order, and Invoice cache-change inputs and `CommerceChangeNotificationPort` in `packages/contracts/src/commerce/common/legacy-commerce-change-port.ts`
- [X] T007 [P] Define browser-neutral media values and thumbnail contract in `packages/contracts/src/commerce/common/legacy-media-source.ts`
- [X] T008 [P] Define read-only Commerce projection and explicit Core-to-Commerce handoff values in `packages/contracts/src/commerce/common/legacy-commerce-handoff.ts`
- [X] T009 [P] Define retained Inventory and Transfer command/result/write-port contracts in `packages/contracts/src/commerce/operations/legacy-inventory-commands.ts` and `packages/contracts/src/commerce/operations/legacy-transfer-commands.ts`
- [X] T010 [P] Define retained Order, Invoice, and Return command/result/write-port contracts in `packages/contracts/src/commerce/operations/legacy-order-commands.ts`, `packages/contracts/src/commerce/operations/legacy-invoice-commands.ts`, and `packages/contracts/src/commerce/operations/legacy-return-commands.ts`
- [X] T011 [P] Define Commerce setup and Core Storage Coordination compatibility contracts in `packages/contracts/src/commerce/operations/legacy-setup-commands.ts` and `packages/contracts/src/commerce/operations/legacy-storage-coordination.ts`
- [X] T012 Export only contract-safe Feature 054 types from `packages/contracts/src/commerce/index.ts` and `packages/contracts/src/index.ts`
- [X] T013 Define the contract-typed, concrete-free Commerce application runtime surface in `apps/commerce/lib/commerce/CommerceApplicationServices.ts`
- [X] T014 [P] Add deterministic memory write ports, failing ports, ID/clock controls, and write-order capture helpers in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-054-fixtures.ts`
- [X] T015 [P] Add Core projection, handoff, storage-coordination, and media-source test doubles in `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-054-boundary-fixtures.ts`
- [X] T016 Record exact composition, browser-storage, environment, shared-export, and SDK-export allowlists as data in `scripts/architecture/frontend-boundary-policy.mjs`

**Checkpoint**: Contract types compile without React, React Query, browser, SDK implementation,
transport, environment, DTO, pagination, idempotency, or backend authorization dependencies.

---

## Phase 3: User Story 1 - Preserve Every Existing Journey During Hardening (Priority: P1) 🎯 MVP

**Goal**: Freeze the current observable and persisted behavior before any architectural movement.

**Independent Test**: Run the new Feature 054 characterization suites against the untouched legacy
paths and compare routes, visible states, record bytes, IDs, time/order of writes, browser keys,
refresh results, failures, English/Arabic direction, accessibility, and explicit retry behavior.

### Tests for User Story 1

- [X] T017 [P] [US1] Characterize setup defaults, preset selection, save merging, media conversion, quota decisions, usage updates, and Product compensation in `apps/commerce/lib/store/__tests__/commerce-054-setup-media-characterization.test.tsx`
- [X] T018 [P] [US1] Characterize stock adjustment and Transfer validation, record bytes, duplicate-item quirks, write order, partial failures, and notifications in `apps/commerce/lib/store/__tests__/commerce-054-inventory-transfer-characterization.test.tsx`
- [X] T019 [P] [US1] Characterize Order, Invoice, and Return calculations, fresh numbering, same-tick lookup, stock effects, references, write order, and partial failures in `apps/commerce/lib/store/__tests__/commerce-054-order-invoice-return-characterization.test.tsx`
- [X] T020 [P] [US1] Characterize ID/clock call order, serialized field ordering, current error strings, and exactly-once persistence across retained writes in `apps/commerce/lib/store/__tests__/commerce-054-operational-byte-compatibility.test.ts`
- [X] T021 [P] [US1] Characterize provider publication, localized result/toast behavior, and one visible callback outcome per committed write in `apps/commerce/lib/store/__tests__/commerce-054-provider-publication-characterization.test.tsx`
- [X] T022 [P] [US1] Characterize Product editor `File` handling, create compensation, swallowed removal failure, edit ordering, and visible media failures in `apps/commerce/features/products/__tests__/commerce-054-product-media-characterization.test.ts`
- [X] T023 [P] [US1] Characterize exact existing scoped cache invalidations and notification-failure behavior in `apps/commerce/features/repository-expansion/__tests__/commerce-054-cache-characterization.test.ts`
- [X] T024 [P] [US1] Characterize genuine missing Order/Invoice relationships and the existing explicit manual-retry presentation contract in `apps/commerce/features/repository-expansion/__tests__/commerce-054-relationship-characterization.test.tsx`
- [X] T025 [P] [US1] Characterize current Core Commerce projections, launch/setup initiation, billing/shell summaries, and zero-user-visible fallback changes in `apps/core-platform/lib/store/__tests__/commerce-054-core-characterization.test.tsx`
- [X] T026 [P] [US1] Characterize every existing local/session storage key, value shape, corrupt-read behavior, exception behavior, and refresh order in `apps/commerce/lib/store/__tests__/commerce-054-storage-keys-characterization.test.ts` and `apps/core-platform/lib/store/__tests__/commerce-054-storage-keys-characterization.test.ts`
- [X] T027 [P] [US1] Prove repositories, facades, services, cache client, and provider callbacks retain identity through 100 rerenders in `apps/commerce/features/products/__tests__/commerce-054-runtime-identity-characterization.test.tsx`
- [X] T028 [P] [US1] Add route, record, operation, refresh, failure, and explicit-retry browser characterization in `tests/e2e/commerce-054-characterization.spec.ts`
- [X] T029 [P] [US1] Add English/LTR, Arabic/RTL, keyboard, focus, semantic-name, screen-reader, and axe characterization in `tests/e2e/commerce-054-characterization-accessibility.spec.ts`
- [X] T030 [US1] Run the pre-movement Feature 044/050/052/053 and new 054 baseline commands from `specs/054-architecture-hardening/quickstart.md` and record immutable results in `specs/054-architecture-hardening/implementation-evidence.md`

**Checkpoint**: The characterization baseline passes and no production responsibility has moved.

---

## Phase 4: User Story 3 - Restore Core and Commerce Ownership Boundaries (Priority: P1)

**Goal**: Keep Core as organization/platform-context owner while Commerce alone executes and
persists Commerce operational compatibility behavior.

**Independent Test**: Exercise Core shell, Product Hub, billing, launch/setup handoff, unavailable
handoff, separate-origin navigation, and refresh; prove Core writes no Commerce record/key, Commerce
constructs no Core identity, projections are read-only/scoped, and no fallback write occurs.

### Tests for User Story 3

- [X] T031 [P] [US3] Add contract tests for scope-filtered, cloned, read-only Product/Order/setup projections in `packages/sdk/src/commerce/integration/__tests__/legacy-commerce-projection.contract.test.ts`
- [X] T032 [P] [US3] Add contract tests for valid, missing, stale, rejected, and separate-origin handoff context without Core-identity construction in `packages/sdk/src/commerce/integration/__tests__/legacy-commerce-handoff.contract.test.ts`
- [X] T033 [P] [US3] Add a Core source/behavior test that rejects Commerce record factories, operational callbacks, storage-key writes, and fallback mutations in `apps/core-platform/lib/store/__tests__/commerce-054-core-ownership-boundary.test.ts`
- [X] T034 [P] [US3] Add a Commerce source/behavior test that rejects User, Workspace, Business Unit, Branch, Membership, Subscription, and enablement fallback writers in `apps/commerce/lib/store/__tests__/commerce-054-core-identity-boundary.test.ts`
- [X] T035 [P] [US3] Add Core consumer tests for shell, dashboard/Product Hub, and billing behavior through a read-only projection in `apps/core-platform/lib/shell/__tests__/commerce-054-commerce-projection.test.tsx`
- [X] T036 [P] [US3] Add browser tests for Core-to-Commerce handoff, separate origins, refresh, rejection, and zero fallback writes in `tests/e2e/core-054-commerce-handoff.spec.ts`

### Implementation for User Story 3

- [X] T037 [P] [US3] Implement the private browser integration storage port for projection and handoff compatibility in `packages/sdk/src/commerce/integration/BrowserLegacyCommerceIntegrationStore.ts`
- [X] T038 [P] [US3] Implement the scoped read-only Product/Order/setup projection adapter in `packages/sdk/src/commerce/integration/LegacyCommerceProjectionAdapter.ts`
- [X] T039 [P] [US3] Implement the Commerce handoff ingress that validates and persists context only in `packages/sdk/src/commerce/integration/LegacyCommerceHandoffIngress.ts`
- [X] T040 [US3] Move the composition factory to the runtime boundary and compose contract-typed projection/handoff ports without concrete leakage in `packages/sdk/src/commerce/runtime/createCommerceServices.ts`, removing the superseded `packages/sdk/src/commerce/products/createCommerceServices.ts`
- [X] T041 [P] [US3] Define Core's narrow local consumer interface for approved Commerce summaries in `apps/core-platform/lib/commerce/CommerceProjectionPort.ts`
- [X] T042 [P] [US3] Implement the Core-side handoff adapter without importing Commerce application/internal source in `apps/core-platform/lib/commerce/CommerceHandoffAdapter.ts`
- [X] T043 [P] [US3] Isolate Core session, theme, and locale browser access behind exact infrastructure helpers in `apps/core-platform/lib/infrastructure/browser/core-session-storage.ts`, `apps/core-platform/lib/infrastructure/browser/core-theme-storage.ts`, and `apps/core-platform/lib/infrastructure/browser/core-locale-storage.ts`
- [X] T044 [US3] Remove Commerce operational arrays, seeders, constructors, writers, and fallback callbacks from Core while retaining only Core state plus read-only projections in `apps/core-platform/lib/store/AppProvider.tsx` and `apps/core-platform/lib/store/index.ts`
- [X] T045 [US3] Migrate shell, dashboard/Product Hub, apps/integrations, and billing consumers to the read-only projection/handoff boundary in `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/lib/shell/presentation.ts`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `apps/core-platform/app/dashboard/page.tsx`, `apps/core-platform/app/dashboard/apps/page.tsx`, `apps/core-platform/app/dashboard/integrations/page.tsx`, and `apps/core-platform/app/dashboard/billing/page.tsx`
- [X] T046 [US3] Make Commerce consume only accepted handoff/context projections and remove Core-identity fallback construction in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T047 [US3] Make Core `ThemeToggle` delegate persistence through the Core theme adapter with unchanged key and behavior in `apps/core-platform/components/dashboard/ThemeToggle.tsx`
- [X] T048 [US3] Run the Core ownership, handoff, shell, billing, Core 050, and separate-origin suites and record zero-writer/zero-fallback evidence in `specs/054-architecture-hardening/implementation-evidence.md`

**Checkpoint**: Core reads approved Commerce projections and initiates explicit handoff only;
Commerce remains the sole operational compatibility executor.

---

## Phase 5: User Story 4 - Make Retained Commerce Writes Explicit and Owner-Controlled (Priority: P1)

**Goal**: Move every retained Commerce rule behind focused owner-aligned services so AppProvider
only gathers context, delegates once, and publishes committed snapshots.

**Independent Test**: Run each focused service directly and through the legacy provider callback;
compare exact validation, IDs, numbering, calculations, write order, partial failures, snapshots,
localized presentation, and scoped notifications, with exactly one persistence path.

### Tests for User Story 4

- [X] T049 [P] [US4] Add setup service tests for virtual defaults, presets, merge rules, identifiers, timestamps, one write, and failure behavior in `apps/commerce/features/setup/__tests__/legacy-commerce-setup-service.test.ts`
- [X] T050 [P] [US4] Add Product media service tests for compression result, quota assessment, missing usage, overflow, media-before-usage order, association, and partial failure in `apps/commerce/features/media/__tests__/legacy-product-media-service.test.ts`
- [X] T051 [P] [US4] Add Stock adjustment service tests for scope, Product presence, fallback Stock, threshold, zero-delta suppression, Movement fields, write order, and exact errors in `apps/commerce/features/inventory/__tests__/legacy-stock-adjustment-service.test.ts`
- [X] T052 [P] [US4] Add Transfer service tests for scope, destination, duplicates, numbering, completed status, two Movements, write order, partial failure, and both-Branch changes in `apps/commerce/features/transfers/__tests__/legacy-stock-transfer-service.test.ts`
- [X] T053 [P] [US4] Add Order service tests for duplicate-cart accumulation, untracked Products, insufficient Stock, caller snapshots, fresh numbering, commit order, and scoped changes in `apps/commerce/features/orders/__tests__/legacy-order-creation-service.test.ts`
- [X] T054 [P] [US4] Add Invoice service tests for fresh/same-tick Order lookup, setup prefix/start, copied snapshots, numbering, one write, and related changes in `apps/commerce/features/invoices/__tests__/legacy-invoice-creation-service.test.ts`
- [X] T055 [P] [US4] Add Return service tests for lookup, duplicate quirks, refund values, restock skips, numbering, statuses, owner effects, commit order, and partial failure in `apps/commerce/features/returns/__tests__/legacy-return-creation-service.test.ts`
- [X] T056 [P] [US4] Add browser and memory operational-store contract tests for copying, corruption, errors, exact keys, and write-order capture in `packages/sdk/src/commerce/operations/__tests__/legacy-commerce-operations-store.contract.test.ts`
- [X] T057 [P] [US4] Add byte/numeric equivalence tests for every Commerce policy currently exported from shared in `apps/commerce/features/repository-expansion/__tests__/commerce-054-shared-policy-equivalence.test.ts`
- [X] T058 [P] [US4] Add provider-delegation tests proving one service call, one persistence effect, committed-snapshot publication, and no rule fallback for every retained callback in `apps/commerce/lib/store/__tests__/commerce-054-provider-delegation.test.tsx`
- [X] T059 [P] [US4] Add application-boundary tests proving retained services receive compatibility ports and a framework-neutral change port rather than QueryClient, hooks, keys, or concrete facades in `apps/commerce/features/repository-expansion/__tests__/commerce-054-application-service-boundaries.test.ts`

### Owner-Aligned Services and Infrastructure for User Story 4

- [X] T060 [P] [US4] Move unchanged setup defaults, preset, read, merge, and save policy into `apps/commerce/features/setup/application/LegacyCommerceSetupService.ts` and `apps/commerce/features/setup/application/legacy-commerce-setup-policy.ts`
- [X] T061 [P] [US4] Implement browser-neutral Product media association/orchestration in `apps/commerce/features/media/application/LegacyProductMediaService.ts`
- [X] T062 [P] [US4] Implement the temporary Core-owned Workspace quota/usage compatibility adapter without moving policy into Commerce in `packages/sdk/src/commerce/integration/LegacyCoreStorageCoordinationAdapter.ts`
- [X] T063 [P] [US4] Move unchanged Stock fallback, adjustment, and Movement construction into `apps/commerce/features/inventory/application/LegacyStockAdjustmentService.ts` and `apps/commerce/features/inventory/application/legacy-inventory-policy.ts`
- [X] T064 [P] [US4] Move unchanged Transfer validation, record construction, numbering, and Inventory-effect coordination into `apps/commerce/features/transfers/application/LegacyStockTransferService.ts` and `apps/commerce/features/transfers/application/legacy-transfer-policy.ts`
- [X] T065 [P] [US4] Move unchanged Order construction, numbering, snapshot, and Inventory-effect coordination into `apps/commerce/features/orders/application/LegacyOrderCreationService.ts` and `apps/commerce/features/orders/application/legacy-order-compatibility-policy.ts`
- [X] T066 [P] [US4] Move unchanged Invoice construction, numbering, setup-prefix, and Order snapshot behavior into `apps/commerce/features/invoices/application/LegacyInvoiceCreationService.ts` and `apps/commerce/features/invoices/application/legacy-invoice-compatibility-policy.ts`
- [X] T067 [P] [US4] Move unchanged Return construction, refund, numbering, and affected-owner coordination into `apps/commerce/features/returns/application/LegacyReturnCreationService.ts` and `apps/commerce/features/returns/application/legacy-return-compatibility-policy.ts`
- [X] T068 [P] [US4] Move Order/revenue/return operational projections into the Commerce owner boundary in `apps/commerce/features/reporting/application/legacy-commerce-reporting.ts`
- [X] T069 [P] [US4] Implement exact-key browser persistence for retained owner ports in `packages/sdk/src/commerce/operations/BrowserLegacyCommerceOperationsStore.ts`
- [X] T070 [P] [US4] Implement deterministic memory persistence for retained owner-port tests in `packages/sdk/src/commerce/operations/MemoryLegacyCommerceOperationsStore.ts`

### Composition, Cache Inversion, and Compatibility Ports for User Story 4

- [X] T071 [US4] Compose focused application services from contract-typed SDK runtime ports in `apps/commerce/lib/commerce/createCommerceApplicationServices.ts`
- [X] T072 [P] [US4] Implement the outer React Query adapter that maps scoped change intent to existing key factories in `apps/commerce/lib/commerce/cache/ReactQueryCommerceChangeAdapter.ts`
- [X] T073 [US4] Replace `QueryClient` and hook-key dependencies with the inward notification interface in `apps/commerce/features/repository-expansion/application/CommerceChangeNotificationPort.ts` and remove `apps/commerce/features/repository-expansion/application/LegacyCommerceReadCoordinator.ts`
- [X] T074 [P] [US4] Type Product hooks and editor dependencies only against Product repository/compatibility/media ports in `apps/commerce/features/products/hooks/useLegacyProducts.ts`, `apps/commerce/features/products/hooks/useLegacyProductMutations.ts`, and `apps/commerce/features/products/application/LegacyProductEditorService.ts`
- [X] T075 [P] [US4] Type Customer hooks only against Customer repository and compatibility ports in `apps/commerce/features/customers/hooks/useLegacyCustomers.ts` and `apps/commerce/features/customers/hooks/useLegacyCustomerMutations.ts`
- [X] T076 [US4] Construct the SDK runtime, application services, QueryClient, and cache adapter once and expose only contract types in `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`

### Incremental AppProvider Delegation for User Story 4

- [X] T077 [US4] Replace setup policy/write code with one service delegation and committed-snapshot publication in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T078 [US4] Replace Product media compression/quota/usage/association code with one media-service delegation in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T079 [US4] Replace Stock adjustment rules and writes with one Inventory-service delegation in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T080 [US4] Replace Transfer rules and writes with one Transfer-service delegation in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T081 [US4] Replace Order creation and Stock-deduction rules/writes with one Order-service delegation in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T082 [US4] Replace Invoice creation/numbering rules and writes with one Invoice-service delegation in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T083 [US4] Replace Return/refund/restock/related-record rules and writes with one Return-service delegation in `apps/commerce/lib/store/AppProvider.tsx`

### Shared-Policy and Browser-Storage Cleanup for User Story 4

- [X] T084 [US4] Remove migrated Inventory, Movement, Transfer, Return, and setup writers/policy from `packages/shared/src/mock-db/actions.ts` after all production consumers use owner services
- [X] T085 [US4] Remove migrated tax, discount, refund, return, and Commerce-document calculations from `packages/shared/src/commerce/documents.ts` after equivalence tests pass
- [X] T086 [US4] Remove migrated operational reporting/selectors and Commerce setup seed decisions from `packages/shared/src/mock-db/selectors.ts` and `packages/shared/src/mock-db/seed.ts`
- [X] T087 [US4] Remove obsolete Commerce-specific shared barrels with zero remaining consumers in `packages/shared/src/mock-db/index.ts` and `packages/shared/src/index.ts`
- [X] T088 [P] [US4] Preserve Commerce session/theme/locale/POS-result semantics through the approved generic browser helper and remove direct provider access in `packages/shared/src/mock-db/storage.ts` and `apps/commerce/lib/store/AppProvider.tsx`
- [X] T089 [US4] Re-run provider delegation, owner-service, shared-policy equivalence, Feature 044/052/053, and focused operation suites and record one-writer/zero-policy evidence in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T090 [US4] Add full retained-operation route regression coverage without visual changes in `tests/e2e/commerce-054-architecture-regression.spec.ts`

**Checkpoint**: Commerce AppProvider contains no Commerce business rule or direct browser storage;
each legacy callback delegates once and each operational effect has exactly one owner path.

---

## Phase 6: User Story 2 - Enforce Dependency Direction at Every Production Boundary (Priority: P1)

**Goal**: Make every approved frontend dependency, ownership, browser, environment, and SDK export
boundary a deterministic delivery-blocking rule.

**Independent Test**: Run the architecture fixture suite and production scanner twice; every invalid
fixture fails at the normalized location with the expected rule ID, every valid fixture passes, all
active `apps/**` and `packages/**` production files are inventoried, and both runs produce identical
zero-violation output.

### Tests for User Story 2

- [X] T091 [P] [US2] Add deterministic include/exclude, extension, missing-root, and sorted-inventory tests in `tests/architecture/source-inventory.test.ts`
- [X] T092 [P] [US2] Add application-to-framework/key, contract-to-outward, repository-to-UI, and UI-to-concrete invalid fixtures in `tests/architecture/fixtures/invalid/layer-boundaries/application-react-query.ts`, `tests/architecture/fixtures/invalid/layer-boundaries/contract-sdk.ts`, `tests/architecture/fixtures/invalid/layer-boundaries/repository-provider.ts`, and `tests/architecture/fixtures/invalid/layer-boundaries/hook-concrete-facade.ts`
- [X] T093 [P] [US2] Add relative/alias cross-app, Core Commerce writer, Commerce Core-identity writer, shared owner-policy, and provider-rule invalid fixtures in `tests/architecture/fixtures/invalid/ownership-boundaries/cross-app-relative.ts`, `tests/architecture/fixtures/invalid/ownership-boundaries/cross-app-alias.ts`, `tests/architecture/fixtures/invalid/ownership-boundaries/core-commerce-writer.ts`, `tests/architecture/fixtures/invalid/ownership-boundaries/commerce-core-writer.ts`, `tests/architecture/fixtures/invalid/ownership-boundaries/shared-owner-policy.ts`, and `tests/architecture/fixtures/invalid/ownership-boundaries/provider-business-rule.ts`
- [X] T094 [P] [US2] Add browser-storage, SDK-testing/deep-import, environment-read, and unresolved-internal invalid fixtures in `tests/architecture/fixtures/invalid/infrastructure-boundaries/browser-storage.ts`, `tests/architecture/fixtures/invalid/infrastructure-boundaries/sdk-testing.ts`, `tests/architecture/fixtures/invalid/infrastructure-boundaries/environment-read.ts`, and `tests/architecture/fixtures/invalid/infrastructure-boundaries/unresolved-internal.ts`
- [X] T095 [P] [US2] Add valid inward-layer, composition, cache/storage adapter, Core projection, and test-only SDK fixtures in `tests/architecture/fixtures/valid/inward-layers.ts`, `tests/architecture/fixtures/valid/composition-root.ts`, `tests/architecture/fixtures/valid/outer-adapters.ts`, `tests/architecture/fixtures/valid/core-projection.ts`, and `tests/architecture/fixtures/valid/sdk-testing.test.ts`
- [X] T096 [P] [US2] Add rule-ID, location, barrel, alias, package-export, dynamic-import, require, deterministic-order, and fixture assertions in `tests/architecture/frontend-boundaries.test.ts`
- [X] T097 [P] [US2] Add SDK manifest/barrel surface tests that reject concrete infrastructure from root and production use of the testing path in `tests/architecture/sdk-exports.test.ts`

### Implementation for User Story 2

- [X] T098 [P] [US2] Implement deterministic production-source discovery and clarified exclusions in `scripts/architecture/source-inventory.mjs`
- [X] T099 [US2] Implement relative, alias, package-root/subpath, exports-map, and barrel-chain resolution in `scripts/architecture/frontend-boundaries.mjs`
- [X] T100 [US2] Implement framework/application/contract/repository/UI/composition/cache/environment rules with stable diagnostics in `scripts/architecture/frontend-boundaries.mjs`
- [X] T101 [US2] Implement cross-app, owner, provider-delegation, shared-policy, browser-storage, SDK-private, and unresolved-import rules with exact allowlists in `scripts/architecture/frontend-boundaries.mjs`
- [X] T102 [US2] Add the deterministic nonzero-exit production architecture command and safe summary output in `scripts/check-frontend-architecture.mjs`
- [X] T103 [US2] Narrow SDK package exports to root and testing only in `packages/sdk/package.json`, `packages/sdk/src/index.ts`, and `packages/sdk/src/testing/index.ts`
- [X] T104 [US2] Migrate concrete SDK test imports to `@nexoraxs/sdk/testing` in `apps/commerce/features/products/__tests__/legacy-product-editor-service.test.ts`, `apps/commerce/features/products/__tests__/app-provider-product-facade.test.tsx`, `apps/commerce/features/customers/__tests__/legacy-customer-history-service.test.ts`, `apps/commerce/features/customers/__tests__/legacy-customer-hooks.test.tsx`, `apps/commerce/features/inventory/__tests__/legacy-inventory-hooks.test.tsx`, `apps/commerce/features/inventory/__tests__/legacy-inventory-projection.test.ts`, `apps/commerce/features/orders/__tests__/legacy-order-hooks.test.tsx`, `apps/commerce/features/orders/__tests__/legacy-order-view-service.test.ts`, `apps/commerce/features/invoices/__tests__/legacy-invoice-hooks.test.tsx`, `apps/commerce/features/invoices/__tests__/legacy-invoice-view-service.test.ts`, `apps/commerce/features/repository-expansion/__tests__/commerce-053-manual-retry.test.tsx`, and `apps/commerce/features/repository-expansion/__tests__/legacy-commerce-relationship-isolation.test.ts`
- [X] T105 [P] [US2] Add immediate no-restricted-import feedback for application, UI, provider, cross-app, SDK-testing, and environment violations in `apps/commerce/eslint.config.mjs` and `apps/core-platform/eslint.config.mjs`
- [X] T106 [US2] Add zero-warning `architecture:check`, `lint`, `typecheck`, and `quality` workflows in `package.json`, `turbo.json`, `apps/commerce/package.json`, `apps/core-platform/package.json`, `packages/contracts/package.json`, `packages/sdk/package.json`, and `packages/shared/package.json`
- [X] T107 [US2] Replace selected-directory source assertions with the central rule engine while retaining Feature 052/053 regression checks in `apps/commerce/features/products/__tests__/commerce-runtime-boundaries.test.ts` and `apps/commerce/features/repository-expansion/__tests__/commerce-053-source-boundaries.test.ts`
- [X] T108 [US2] Run fixture and real-source architecture gates twice and record full inventory count, zero warnings, identical diagnostics, and no suppression list in `specs/054-architecture-hardening/implementation-evidence.md`

**Checkpoint**: Architecture validation is active in the standard quality workflow and the entire
clarified frontend production tree passes with no debt allowlist.

---

## Phase 7: User Story 5 - Keep Cache, Relationship, Storage, and Media Adapters Honest (Priority: P2)

**Goal**: Preserve exact cache scope, explicit recoverable failures, storage compatibility, and
Product media behavior while keeping application code framework- and browser-neutral.

**Independent Test**: Exercise same-ID records across scopes, all relationship error classes,
same-tab committed changes, uncached notifications, storage corruption/unavailability, refresh,
media selection/cancel/failure/compensation, and manual retry; prove only exact scoped caches move,
only typed not-found becomes `null`, and no automatic retry occurs.

### Tests for User Story 5

- [X] T109 [P] [US5] Add exact Product, Customer item/history/history-list, Inventory, Order item/list, Invoice detail/document, and relationship invalidation tests in `apps/commerce/features/repository-expansion/__tests__/commerce-054-cache-change-adapter.test.ts`
- [X] T110 [P] [US5] Add Product/Customer compatibility-port publication, cloning, unpaged-list, seed, subscription, and unsubscribe tests in `apps/commerce/features/repository-expansion/__tests__/commerce-054-compatibility-ports.test.ts`
- [X] T111 [P] [US5] Add typed optional-relation helper tests for not-found and every propagated failure class in `apps/commerce/features/repository-expansion/__tests__/optional-compatibility-relation.test.ts`
- [X] T112 [P] [US5] Add Order view tests for genuine absence, foreign-scope same ID, invalid scope, deterministic, storage, configuration, authorization-like, future transport, and unknown failures in `apps/commerce/features/orders/__tests__/legacy-order-view-service.test.ts`
- [X] T113 [P] [US5] Add Invoice view tests for genuine absence, foreign-scope same ID, invalid scope, deterministic, storage, configuration, authorization-like, future transport, and unknown failures in `apps/commerce/features/invoices/__tests__/legacy-invoice-view-service.test.ts`
- [X] T114 [P] [US5] Add exact-key, corrupt-value, unavailable-storage, quota exception, initialization-order, and refresh tests for approved infrastructure in `apps/commerce/lib/store/__tests__/commerce-054-browser-storage-adapters.test.ts` and `apps/core-platform/lib/store/__tests__/commerce-054-browser-storage-adapters.test.ts`
- [X] T115 [P] [US5] Add MediaSource conversion, cancel, byte/metadata, canvas failure, JPEG limits, create compensation, edit ordering, and localized result tests in `apps/commerce/features/products/__tests__/commerce-054-media-source-boundary.test.ts`
- [X] T116 [P] [US5] Extend explicit error, focus, and user-triggered retry tests to prove no mount/focus/reconnect/effect/timer retry in `apps/commerce/features/repository-expansion/__tests__/commerce-053-manual-retry.test.tsx`

### Implementation for User Story 5

- [X] T117 [P] [US5] Implement the inward helper that maps only typed `not_found` to `null` in `apps/commerce/features/repository-expansion/application/optionalCompatibilityRelation.ts`
- [X] T118 [P] [US5] Distinguish absent IDs from non-disclosing foreign-scope IDs in `packages/sdk/src/commerce/orders/MockOrdersRepository.ts` and `packages/sdk/src/commerce/invoices/MockInvoicesRepository.ts`
- [X] T119 [US5] Replace catch-all relationship suppression with typed optional classification in `apps/commerce/features/orders/application/LegacyOrderViewService.ts` and `apps/commerce/features/invoices/application/LegacyInvoiceViewService.ts`
- [X] T120 [P] [US5] Map browser `File` to `LegacyMediaSource` only in the Product UI adapter in `apps/commerce/features/products/adapters/browser-file-to-legacy-media-source.ts`
- [X] T121 [P] [US5] Move Blob/Image/URL/canvas thumbnail work into the outer browser adapter in `apps/commerce/lib/commerce/media/BrowserCanvasThumbnailAdapter.ts`
- [X] T122 [US5] Remove `File` and DOM values from Product application ports while preserving create/edit compensation ordering in `apps/commerce/features/products/application/LegacyProductEditorService.ts`
- [X] T123 [US5] Complete exact-scope, post-commit React Query mapping including Customer history-list refresh and uncached-key behavior in `apps/commerce/lib/commerce/cache/ReactQueryCommerceChangeAdapter.ts`
- [X] T124 [US5] Verify Product/Customer hooks and provider contracts expose no concrete SDK facade type in `apps/commerce/lib/commerce/CommerceApplicationServices.ts`, `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`, `apps/commerce/features/products/hooks/useLegacyProductMutations.ts`, and `apps/commerce/features/customers/hooks/useLegacyCustomerMutations.ts`
- [X] T125 [US5] Add relationship failure, manual retry, storage refresh, media, English/Arabic, RTL/LTR, keyboard, and accessibility regression cases in `tests/e2e/commerce-054-architecture-regression.spec.ts`
- [X] T126 [US5] Run the cache, relationship, storage, media, retry, Feature 052/053, localization, and accessibility suites and record exact-scope/error evidence in `specs/054-architecture-hardening/implementation-evidence.md`

**Checkpoint**: Application code contains no QueryClient, query-key, browser-storage, `File`, or
concrete facade dependency; cache and failure behavior remain truthful and manually recoverable.

---

## Phase 8: User Story 6 - Keep Infrastructure Replaceable Without Defining the Backend (Priority: P3)

**Goal**: Prove that infrastructure can be substituted only at composition while no backend,
transport, upload, pagination, idempotency, or authorization contract is introduced.

**Independent Test**: Inject contract-conforming memory substitutes through composition and run the
same hooks, services, provider consumers, and visible journey with no source changes; inspect the
SDK root and generated artifacts to confirm private infrastructure and deferred backend decisions
remain absent.

### Tests for User Story 6

- [X] T127 [P] [US6] Add a substitute-implementation contract test that runs hooks/services/providers unchanged through injected memory ports in `apps/commerce/features/repository-expansion/__tests__/commerce-054-substitute-runtime.test.tsx`
- [X] T128 [P] [US6] Add a composition-only implementation-selection and contract-typed return-surface test in `packages/sdk/src/commerce/products/__tests__/commerce-composition.test.ts`
- [X] T129 [P] [US6] Add runtime configuration tests proving mock selection is centralized and HTTP remains explicitly unavailable without requests in `packages/sdk/src/commerce/common/__tests__/commerce-runtime-configuration.test.ts`
- [X] T130 [P] [US6] Add package-surface tests proving production root privacy and controlled test-only infrastructure access in `tests/architecture/sdk-runtime-substitution.test.ts`

### Implementation for User Story 6

- [X] T131 [US6] Finalize the sole implementation-selection factory with contract-typed repositories, ports, projection/handoff, and unavailable HTTP mode in `packages/sdk/src/commerce/runtime/createCommerceServices.ts`
- [X] T132 [US6] Finalize app-level stable service assembly and contract-typed test injection without concrete overrides in `apps/commerce/lib/commerce/createCommerceApplicationServices.ts` and `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`
- [X] T133 [US6] Restrict Commerce environment reads to runtime configuration construction in `apps/commerce/lib/commerce/commerce-runtime-config.ts`
- [X] T134 [US6] Document the private testing surface, composition replacement seam, and explicitly deferred HTTP/API/DTO/error/pagination/idempotency/authorization/upload/offline decisions in `specs/054-architecture-hardening/contracts/application-runtime-boundaries.md`

**Checkpoint**: A substitute implementation changes composition only, while pages, hooks,
application services, providers, routes, and user behavior remain unchanged.

---

## Phase 9: Polish & Cross-Cutting Quality Gates

**Purpose**: Prove complete conformance, behavior compatibility, deterministic delivery, and
documentation synchronization across all stories.

- [X] T135 [P] Run `pnpm architecture:check`, `pnpm lint`, and `pnpm typecheck` and record zero-violation/zero-warning results in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T136 [P] Run `pnpm test:unit` and `pnpm exec vitest run tests/architecture/frontend-boundaries.test.ts` and record unit/contract/architecture results in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T137 [P] Run Commerce, Core, and root production builds from `specs/054-architecture-hardening/quickstart.md` and record results in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T138 Run all Commerce 044/052/053/054 Playwright suites listed in `specs/054-architecture-hardening/quickstart.md` and record route, persistence, retry, localization, RTL/LTR, and accessibility results in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T139 Run Core 050 and Core-to-Commerce handoff Playwright suites from `specs/054-architecture-hardening/quickstart.md` and record shell/performance/ownership results in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T140 Extend the deterministic validator to run relevant Feature 052/053/054 service and architecture suites twenty times in `scripts/validate-commerce-052-determinism.sh`
- [X] T141 Run the twenty-pass deterministic validator and record identical output, stable identities, no randomness, no duplicate writes, and no automatic retries in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T142 Verify zero direct browser-storage calls outside exact adapters and zero forbidden production imports using `scripts/check-frontend-architecture.mjs`, recording the scanned-file inventory in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T143 Verify zero Core Commerce writers, zero Commerce Core-identity writers, zero AppProvider business rules, zero shared Commerce policy, and zero private SDK root exports, recording symbol/key evidence in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T144 Review English/Arabic, RTL/LTR, keyboard, focus, screen-reader, loading, empty, pending, validation, error, success, and manual-retry evidence in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T145 Synchronize final compatibility boundaries, allowed paths, migration/zero-consumer evidence, and unchanged deferred decisions in `specs/054-architecture-hardening/data-model.md`, `specs/054-architecture-hardening/contracts/architecture-enforcement.md`, and `specs/054-architecture-hardening/contracts/legacy-operational-handoffs.md`
- [X] T146 Re-run the post-implementation Constitution Check and record controlling Freezes, ADRs, owner/scope preservation, security/privacy, compatibility, documentation, and all unresolved DD IDs in `specs/054-architecture-hardening/implementation-evidence.md`
- [X] T147 Run `git diff --check`, review that no frozen/historical architecture or backend source changed, and record final scope conformance in `specs/054-architecture-hardening/implementation-evidence.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup and blocks every user-story phase.
- **US1 (Phase 3, P1)**: Depends on Foundational; it is the immutable characterization baseline.
- **US3 (Phase 4, P1)**: Depends on US1 because Core/Commerce ownership movement requires the baseline.
- **US4 (Phase 5, P1)**: Depends on US1 and the Core ownership seams from US3; each operation is then migrated sequentially to avoid dual writes.
- **US2 (Phase 6, P1)**: Depends on US3 and US4 removing production violations; scanner fixtures can be prepared earlier, but the delivery-blocking real-source gate is enabled only on a clean tree.
- **US5 (Phase 7, P2)**: Depends on US4's adapters and US2's active enforcement; relationship, exact-cache, storage-failure, and media edge hardening remain independently testable.
- **US6 (Phase 8, P3)**: Depends on the final port surface, private SDK exports, and stable composition produced by US2/US4/US5.
- **Polish (Phase 9)**: Depends on all six user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US1
                         |
                         v
                        US3 -> US4 -> US2 -> US5 -> US6
                                                   |
                                                   v
                                             Final Quality Gate
```

The graph is intentionally dependency-ordered rather than numerically ordered: US2 remains P1 but
cannot truthfully pass the complete production scan until the P1 ownership/provider migrations
remove the violations it is designed to prohibit.

### Within Each Story

- Write and run the named tests before the corresponding production task.
- Preserve current bytes, IDs, time calls, ordering, partial failures, keys, and visible behavior.
- For every retained write: characterize → implement owner service → delegate once → prove one write
  → delete old body/export → run source scan.
- Do not start a later AppProvider operation until the prior operation has zero alternate writers.
- Enable no permanent architecture suppression or debt allowlist.

---

## Parallel Opportunities

### User Story 1

Run T017-T029 in parallel because they add isolated characterization files, then run T030 only
after every characterization suite passes.

### User Story 3

Run projection, handoff, ownership, consumer, and separate-origin tests T031-T036 in parallel.
Afterward, T037-T039 and T041-T043 can proceed in parallel; serialize T040 and T044-T047 where they
touch composition/provider consumers.

### User Story 4

Run service/store/equivalence tests T049-T059 in parallel. Implement owner-specific services
T060-T070 in parallel after their tests fail as expected. Serialize T071-T083 because composition
and each AppProvider callback share runtime/provider files and must never create dual writers.

### User Story 2

Run T091-T097 in parallel. Implement inventory T098 before resolution/rules T099-T101; then wire
the CLI/exports/quality workflow T102-T107 and finish with the repeated real-source gate T108.

### User Story 5

Run T109-T116 in parallel. T117-T118 can proceed in parallel, followed by T119; media tasks
T120-T122 can proceed alongside cache task T123 before integration evidence T125-T126.

### User Story 6

Run T127-T130 in parallel, then finalize composition/configuration T131-T133 and documentation
T134.

---

## Implementation Strategy

### MVP First: Safe Characterization Baseline

1. Complete Setup and Foundational phases.
2. Complete US1 characterization without moving production responsibility.
3. Stop and validate the baseline independently.
4. Use the passing baseline as the required rollback/comparison point for every later slice.

### Incremental Delivery

1. Restore Core/Commerce ownership through read-only projection and explicit handoff.
2. Extract setup/media and each retained operation one at a time, removing the old writer before
   starting the next operation.
3. Enable the comprehensive architecture gate after the production tree is clean.
4. Complete relationship/cache/storage/media truthfulness and manual-retry evidence.
5. Prove composition-only substitution and preserve every deferred backend decision.
6. Run the full deterministic, build, browser, accessibility, and Constitution gates.

### Stop Conditions

Stop the affected task and route it to Governance if implementation would move Workspace quota to
Commerce, let Core write a Commerce record, let Commerce create Core identity, define a canonical
scope/lifecycle/aggregate/transaction/API/DTO/error/pagination/idempotency/authorization/upload/
offline contract, change existing write ordering or partial failure, add a new persistent shape or
storage key, or require editing a frozen architecture source.

---

## Notes

- `[P]` tasks target independent files; tasks sharing AppProvider, composition, package barrels, or
  the architecture engine are intentionally serialized.
- Feature 054 adds no route, UI redesign, HTTP repository, Laravel work, database schema, network
  mutation, canonical Business mapping, or final lifecycle semantics.
- Existing storage keys and record shapes are preserved; no browser-data clearing or rewrite is
  permitted.
- Cache notifications are refresh intents, never Domain Events or Integration Events.
- Production authorization, append-only Audit, transport reliability, and backend observability
  remain mandatory future-backend concerns and are not simulated as completed here.
- Commit only when explicitly requested; task generation itself does not create a commit.
