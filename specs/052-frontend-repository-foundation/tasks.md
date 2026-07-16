# Tasks: Frontend Repository Foundation

**Input**: Design documents from `/specs/052-frontend-repository-foundation/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/frontend-internal-products.md`, `quickstart.md`

**Tests**: Tests are mandatory for this feature. Write the listed failing tests before their
corresponding implementation tasks and preserve the pre-change characterization evidence.

**Organization**: Tasks are grouped by user story. US3 -> US2 -> US1 is the dependency order among
the three equally prioritized P1 stories: repository behavior must exist before isolation can be
proved, and both must exist before the UI seam can be cut over safely.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with adjacent tasks because it edits different files and has no
  dependency on unfinished work.
- **[Story]**: Maps directly to the numbered user story in `spec.md`.
- Every task names its exact target file or evidence path.

## Phase 1: Setup and Pre-Change Characterization

**Purpose**: Freeze the current Products behavior before any structural Product change, then add
the package/test scaffolding needed by all stories.

- [X] T001 Create the failing-first pre-change Products route/list/create/edit/refresh/storage characterization suite in `tests/e2e/commerce-052-products-characterization.spec.ts`
- [X] T002 Run T001 against the untouched Products implementation and record routes, seeded IDs, visible English labels, form steps, storage key/shape, unknown-field round trips, and refresh results in `specs/052-frontend-repository-foundation/evidence/characterization.md`
- [X] T003 Add `@tanstack/react-query` to `apps/commerce/package.json` and add Vitest, jsdom, and React test utilities plus `test:unit` scripts to `package.json` and `pnpm-lock.yaml`
- [X] T004 [P] Configure Node-default tests with jsdom opt-in and workspace aliases in `vitest.config.ts`
- [X] T005 [P] Create the private `@nexoraxs/contracts` workspace package skeleton in `packages/contracts/package.json`, `packages/contracts/tsconfig.json`, and `packages/contracts/src/index.ts`
- [X] T006 [P] Create the private `@nexoraxs/sdk` workspace package skeleton in `packages/sdk/package.json`, `packages/sdk/tsconfig.json`, and `packages/sdk/src/index.ts`
- [X] T007 Register `@nexoraxs/contracts` and `@nexoraxs/sdk` for Commerce transpilation and type resolution in `apps/commerce/next.config.ts` and `apps/commerce/package.json`

**Checkpoint**: The untouched journey is characterized and the new packages compile without being
wired into runtime Product behavior.

---

## Phase 2: Foundational Contracts and Test Fixtures

**Purpose**: Establish the explicitly internal, lifecycle-neutral, scope-safe boundary shared by
every story. No runtime Product cutover occurs in this phase.

**⚠️ CRITICAL**: All story phases depend on this foundation.

- [X] T008 Define and document validated `LegacyProductScope` without `businessId` or canonical ancestry in `packages/contracts/src/commerce/products/legacy-product-scope.ts`
- [X] T009 [P] Define the combined, unknown-field-preserving `LegacyProductRecord` and create/update/list/remove internal shapes without status/archive fields in `packages/contracts/src/commerce/products/legacy-product-record.ts`
- [X] T010 [P] Define the non-leaking frontend-internal repository error codes and field issues in `packages/contracts/src/commerce/products/legacy-product-errors.ts`
- [X] T011 Assemble the scoped `LegacyProductsRepository` list/get/create/update/remove interface in `packages/contracts/src/commerce/products/legacy-products-repository.ts`
- [X] T012 Export the internal Product compatibility surface with DD-02/DD-14/DD-29 warnings in `packages/contracts/src/commerce/products/index.ts` and `packages/contracts/src/index.ts`
- [X] T013 [P] Define `MockCommerceStore`, deterministic clock/ID/failure-rule inputs, and diagnostic sink types in `packages/sdk/src/commerce/products/MockCommerceStore.ts` and `packages/sdk/src/commerce/products/mock-product-behavior.ts`
- [X] T014 [P] Define the legacy media compatibility port used only by combined create/edit orchestration in `apps/commerce/features/products/application/LegacyMediaCompatibilityPort.ts`
- [X] T015 [P] Create deterministic two-Workspace/two-legacy-BusinessUnit/optional-Branch Product fixtures with overlapping IDs/SKUs and opaque fields in `packages/sdk/src/commerce/products/__tests__/legacy-product-fixtures.ts`
- [X] T016 Define `CommerceRuntimeConfig`, service container types, and injectable test overrides without reading environment variables in `packages/sdk/src/commerce/products/createCommerceServices.ts`
- [X] T017 Create the Product feature export boundary without storage, fetch, or environment access in `apps/commerce/features/products/index.ts`
- [X] T018 Export SDK Product mock seams without exposing browser globals through contracts in `packages/sdk/src/commerce/products/index.ts` and `packages/sdk/src/index.ts`
- [X] T019 Run strict package type checks and record the passing foundational checkpoint in `specs/052-frontend-repository-foundation/evidence/foundation-typecheck.md`

**Checkpoint**: Contracts identify the seam as temporary/internal, contain no canonical Business or
Product lifecycle decision, and compile independently of React/browser implementations.

---

## Phase 3: User Story 3 - Exercise the Internal Product Repository (Priority: P1)

**Goal**: Provide deterministic list/get/create/update/remove behavior over memory and browser
stores while preserving existing records and making no public API/lifecycle claim.

**Independent Test**: Run the same repository contract suite against both stores and verify list,
get, create, update, remove, pagination, errors, atomic failure, and unknown-field preservation.

### Tests for User Story 3

- [X] T020 [P] [US3] Write the failing shared list/get/create/update/remove/pagination/duplicate/not-found contract suite in `packages/sdk/src/commerce/products/__tests__/legacy-products-repository.contract.ts`
- [X] T021 [P] [US3] Instantiate the failing shared suite over an isolated memory store in `packages/sdk/src/commerce/products/__tests__/memory-products-repository.test.ts`
- [X] T022 [P] [US3] Instantiate the failing shared suite over jsdom localStorage and the legacy key in `packages/sdk/src/commerce/products/__tests__/browser-products-repository.test.ts`
- [X] T023 [P] [US3] Add failing corrupt JSON, unavailable storage, quota failure, clone isolation, and atomic-write cases in `packages/sdk/src/commerce/products/__tests__/product-storage-errors.test.ts`

### Implementation for User Story 3

- [X] T024 [P] [US3] Implement clone-isolated deterministic storage for tests in `packages/sdk/src/commerce/products/MemoryCommerceStore.ts`
- [X] T025 [P] [US3] Implement the only localStorage-aware adapter using `nexoraxs.db.commerceProducts` in `packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts`
- [X] T026 [US3] Implement validation, opaque-field serialization, immutable-field protection, and compatible image sanitization in `packages/sdk/src/commerce/products/legacy-product-serialization.ts`
- [X] T027 [US3] Implement serialized list/get/create/update/remove mutations, stored-order pagination, normalized SKU checks, and final internal results in `packages/sdk/src/commerce/products/MockProductsRepository.ts`
- [X] T028 [US3] Run both adapter contract suites and record their equivalent observable results in `specs/052-frontend-repository-foundation/evidence/us3-repository-contract.md`

**Checkpoint**: US3 is independently complete; neither repository nor contract imports localStorage,
React, fetch, environment values, or canonical lifecycle terminology.

---

## Phase 4: User Story 2 - Isolate Legacy Product Data by Available Scope (Priority: P1)

**Goal**: Fail closed across Workspace and legacy `BusinessUnit`, include optional Branch in cache
identity where it shapes the view, and never fabricate canonical Business ancestry.

**Independent Test**: Exercise every repository operation and cache mutation across the complete
fixture matrix and observe zero foreign disclosure, mutation, or cache collision.

### Tests for User Story 2

- [X] T029 [P] [US2] Write failing cross-Workspace, cross-legacy-BusinessUnit, foreign-ID, duplicate-SKU, and optional-Branch repository isolation tests in `packages/sdk/src/commerce/products/__tests__/legacy-product-scope-isolation.test.ts`
- [X] T030 [P] [US2] Write failing complete-scope query-key and mutation-invalidation isolation tests in `apps/commerce/features/products/__tests__/legacy-product-query-keys.test.ts`
- [X] T031 [P] [US2] Write a failing React Query cache test proving one scoped mutation cannot overwrite another scope in `apps/commerce/features/products/__tests__/legacy-product-cache-isolation.test.tsx`

### Implementation for User Story 2

- [X] T032 [US2] Harden validation and record matching to require Workspace plus legacy `BusinessUnit` and return non-leaking foreign-scope outcomes in `packages/sdk/src/commerce/products/MockProductsRepository.ts`
- [X] T033 [US2] Implement serializable list/item/exact-scope key factories including normalized Branch and list inputs in `apps/commerce/features/products/hooks/legacy-product-query-keys.ts`
- [X] T034 [US2] Implement exact-scope cache update/invalidation helpers without Product business rules in `apps/commerce/features/products/hooks/legacy-product-cache.ts`
- [X] T035 [US2] Run the two-Workspace/two-legacy-BusinessUnit/Branch matrix and record zero disclosure/mutation/collision plus the no-`businessId` source check in `specs/052-frontend-repository-foundation/evidence/us2-scope-isolation.md`

**Checkpoint**: US2 is independently testable and treats legacy IDs only as mock safeguards, never
as canonical authorization or organization proof.

---

## Phase 5: User Story 1 - Characterize and Preserve the Products Journey (Priority: P1)

**Goal**: Cut the existing list/create/edit routes over to hooks and the bounded editor service
without changing visible behavior, IDs, combined records, navigation steps, or refresh persistence.

**Independent Test**: Replay the characterization in English/LTR and Arabic/RTL, compare routes and
visible English behavior, and prove create/edit/refresh plus keyboard/focus/accessibility behavior.

### Tests for User Story 1

- [X] T036 [P] [US1] Write the failing post-cutover list/create/edit/refresh/unknown-field/route regression suite in `tests/e2e/commerce-052-products.spec.ts`
- [X] T037 [P] [US1] Add failing English/LTR and Arabic/RTL translation, mixed-direction data, keyboard, focus, semantic-name, and axe scenarios in `tests/e2e/commerce-052-products-accessibility.spec.ts`
- [X] T038 [P] [US1] Write failing editor-service tests proving media coordination is outside the repository and failed coordination does not commit Product state in `apps/commerce/features/products/__tests__/legacy-product-editor-service.test.ts`

### Implementation for User Story 1

- [X] T039 [P] [US1] Add English/Arabic Product presentation messages while preserving current English copy in `apps/commerce/features/products/i18n/product-messages.ts`
- [X] T040 [US1] Implement the bounded create/edit `LegacyProductEditorService` over repository and media ports in `apps/commerce/features/products/application/LegacyProductEditorService.ts`
- [X] T041 [US1] Implement list/item and create/update/remove hooks using repositories/services plus React Query only for request/cache state in `apps/commerce/features/products/hooks/useLegacyProducts.ts` and `apps/commerce/features/products/hooks/useLegacyProductMutations.ts`
- [X] T042 [US1] Add the client provider stack that supplies the mock repository, query client, editor service, and existing `AppProvider` without per-render recreation in `apps/commerce/lib/commerce/CommerceProviders.tsx`
- [X] T043 [US1] Wire the provider stack at app startup without changing route structure in `apps/commerce/app/layout.tsx`
- [X] T044 [US1] Migrate the unchanged Products list/search/filter/table/empty states to the scoped list hook and localized presentation in `apps/commerce/app/(commerce)/products/page.tsx`
- [X] T045 [US1] Migrate the unchanged add/edit form, validation recovery, media coordination, IDs, toasts, and navigation to Product hooks in `apps/commerce/app/(commerce)/products/new/page.tsx`
- [X] T046 [US1] Replay characterization and bilingual/accessibility suites and record route/UI/storage equivalence in `specs/052-frontend-repository-foundation/evidence/us1-products-journey.md`

**Checkpoint**: The full P1 vertical slice (US3 + US2 + US1) is usable with the original routes and
browser data and has no canonical DD-02/DD-14/DD-29 claim.

---

## Phase 6: User Story 4 - Compose Stable Runtime Services Once (Priority: P2)

**Goal**: Select mock/future HTTP mode in one startup boundary, validate unsupported configuration
early, and preserve service identity through ordinary renders.

**Independent Test**: Construct isolated roots for every config case and re-render the provider 100
times while checking stable repository/facade/service/query-client references and zero network calls.

### Tests for User Story 4

- [X] T047 [P] [US4] Write failing mock/http/unknown-source/base-URL/latency/no-network composition tests in `packages/sdk/src/commerce/products/__tests__/commerce-composition.test.ts`
- [X] T048 [P] [US4] Write the failing 100-render service/query-client/editor identity test in `apps/commerce/features/products/__tests__/commerce-services-provider.test.tsx`
- [X] T049 [P] [US4] Add a failing source-boundary assertion that environment reads occur only in the config module in `apps/commerce/features/products/__tests__/commerce-runtime-boundaries.test.ts`

### Implementation for User Story 4

- [X] T050 [US4] Implement mock construction, injected test overrides, strict latency/source validation, and HTTP-unavailable/no-request behavior in `packages/sdk/src/commerce/products/createCommerceServices.ts`
- [X] T051 [US4] Implement the sole `NEXT_PUBLIC_COMMERCE_DATA_SOURCE`, `NEXT_PUBLIC_COMMERCE_API_BASE_URL`, and `NEXT_PUBLIC_COMMERCE_MOCK_LATENCY_MS` reader in `apps/commerce/lib/commerce/commerce-runtime-config.ts`
- [X] T052 [US4] Implement stable lazy service and QueryClient construction plus clear startup recovery state in `apps/commerce/lib/commerce/CommerceServicesProvider.tsx` and `apps/commerce/lib/commerce/CommerceProviders.tsx`
- [X] T053 [US4] Run configuration/identity/source-boundary tests and record the one-boundary implementation-swap evidence in `specs/052-frontend-repository-foundation/evidence/us4-composition-root.md`

**Checkpoint**: US4 independently proves that pages/hooks know no implementation or environment
details and that HTTP mode remains an unimplemented, request-free extension point.

---

## Phase 7: User Story 5 - Cut Over Legacy Consumers Incrementally (Priority: P2)

**Goal**: Feed temporary legacy Product readers from the new repository through one facade, then
remove only proven-unused old Product write behavior while retaining `AppProvider` for all exclusions.

**Independent Test**: Compare hook and facade results over one store, create/edit through the new
path, observe legacy readers update, refresh, and prove zero old write consumers before deletion.

### Tests for User Story 5

- [X] T054 [P] [US5] Write failing facade list/create/update/remove/subscription/failed-mutation compatibility tests in `packages/sdk/src/commerce/products/__tests__/compatibility-facade.test.ts`
- [X] T055 [P] [US5] Add failing integration coverage for facade-fed `AppProvider.products` updates without dual writes in `apps/commerce/features/products/__tests__/app-provider-product-facade.test.tsx`
- [X] T056 [P] [US5] Add failing Product-create-to-legacy-POS/Inventory-reader compatibility coverage in `tests/e2e/commerce-052-product-compatibility.spec.ts`

### Implementation for User Story 5

- [X] T057 [US5] Implement repository-delegating facade operations and success-only compatible-list publication in `packages/sdk/src/commerce/products/LegacyProductsCompatibilityFacade.ts`
- [X] T058 [US5] Replace Commerce `AppProvider` Product hydration/projection updates with facade reads/subscriptions while leaving excluded domain state/actions unchanged in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T059 [US5] Route demo Product seeding through the facade/store while preserving `p1`, `p2`, the legacy key, and all other seed behavior in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T060 [US5] Confirm zero `addProduct`/`updateProduct`/`deleteProduct` consumers, then remove only those legacy callbacks/types and preserve `AppProvider` itself in `apps/commerce/lib/store/AppProvider.tsx` and `apps/commerce/lib/store/index.ts`
- [X] T061 [US5] Run facade/provider/legacy-reader regression and record the source-usage proof plus reversible cutover checkpoints in `specs/052-frontend-repository-foundation/evidence/us5-compatibility-facade.md`

**Checkpoint**: US5 is complete; new repository -> facade -> legacy consumer is the only Product
compatibility direction and no excluded AppProvider domain has moved.

---

## Phase 8: User Story 6 - Reproduce Mock Failures Deterministically (Priority: P2)

**Goal**: Make latency, controlled failures, IDs, clocks, diagnostics, and recovery exactly
repeatable with no uncontrolled randomness or secret/foreign payload logging.

**Independent Test**: Run fixed fixtures and commands 20 times and compare IDs, order, failure
invocations, diagnostics, committed arrays, and timing bounds.

### Tests for User Story 6

- [X] T062 [P] [US6] Write failing latency/fixed-clock/fixed-ID/ordered-failure-rule/no-mutation tests in `packages/sdk/src/commerce/products/__tests__/mock-products-failures.test.ts`
- [X] T063 [P] [US6] Write failing diagnostics minimization/correlation/no-full-payload/no-foreign-data tests in `packages/sdk/src/commerce/products/__tests__/mock-products-diagnostics.test.ts`

### Implementation for User Story 6

- [X] T064 [US6] Implement deterministic delay, clock, ID, invocation counters, and ordered failure matching in `packages/sdk/src/commerce/products/mock-product-behavior.ts`
- [X] T065 [US6] Integrate pre-commit failure handling and minimized outcome diagnostics across every operation in `packages/sdk/src/commerce/products/MockProductsRepository.ts`
- [X] T066 [US6] Expose isolated deterministic overrides only through test composition in `packages/sdk/src/commerce/products/createCommerceServices.ts`
- [X] T067 [US6] Run the deterministic suite 20 times and record identical results and zero flakes in `specs/052-frontend-repository-foundation/evidence/us6-determinism.md`

**Checkpoint**: US6 independently reproduces every configured mock outcome and no diagnostic is
represented as canonical Audit evidence.

---

## Phase 9: Polish and Cross-Cutting Delivery Gates

**Purpose**: Verify package boundaries, bilingual/accessibility quality, compatibility, excluded
domains, documentation synchronization, and the final Constitution Check.

- [X] T068 [P] Document internal-only contract/package ownership and future HTTP/canonical cutover gates in `packages/contracts/README.md` and `packages/sdk/README.md`
- [X] T069 [P] Document quarantined shared/AppProvider debt and the no-other-domain migration boundary in `packages/shared/README.md` and `apps/commerce/README.md`
- [X] T070 [P] Add requirement-to-test evidence mapping for FR-001 through FR-069 and SC-001 through SC-012 in `specs/052-frontend-repository-foundation/evidence/traceability.md`
- [X] T071 Run `rg` boundary checks for storage/fetch/environment/app imports/businessId/status/archive/old callbacks and record results in `specs/052-frontend-repository-foundation/evidence/source-boundaries.md`
- [X] T072 Run strict package/App type checks, Commerce lint, all Vitest suites, and the Commerce production build and record commands/results in `specs/052-frontend-repository-foundation/evidence/quality-gates.md`
- [X] T073 Run Products characterization/regression/compatibility/accessibility suites in English/LTR and Arabic/RTL and record Playwright/axe evidence in `specs/052-frontend-repository-foundation/evidence/e2e-accessibility-localization.md`
- [X] T074 Run the existing affected Commerce regression suite to prove Orders/Inventory/Returns and other excluded consumers remain intact and record results in `specs/052-frontend-repository-foundation/evidence/excluded-domain-regression.md`
- [X] T075 [P] Reconcile implementation behavior and all evidence back into `specs/052-frontend-repository-foundation/spec.md`, `specs/052-frontend-repository-foundation/plan.md`, `specs/052-frontend-repository-foundation/contracts/frontend-internal-products.md`, and `specs/052-frontend-repository-foundation/quickstart.md`
- [X] T076 Re-run the post-implementation Constitution Check, explicitly verify DD-02/DD-14/DD-29 remain deferred and production authorization/Audit are N/A-gated, and publish `docs/12-release/FEATURE-052-VALIDATION-REPORT.md`

---

## Dependencies and Execution Order

### Phase Dependencies

- **Phase 1 — Setup/characterization**: starts immediately; T001-T002 must finish before any
  Product structure/runtime task.
- **Phase 2 — Foundation**: depends on Phase 1 and blocks all stories.
- **Phase 3 — US3 (P1 repository)**: depends on Phase 2.
- **Phase 4 — US2 (P1 isolation)**: depends on US3 because it hardens/tests repository matching;
  cache-key work can start after Phase 2 in parallel with the US3 implementation.
- **Phase 5 — US1 (P1 journey)**: depends on US3 and US2 for a safe Product data seam.
- **Phase 6 — US4 (P2 composition)**: depends on Phase 2; its tests/hardening can run in parallel
  with P1 work after the base provider seam exists.
- **Phase 7 — US5 (P2 facade)**: depends on US1 and US4 so old callbacks have migrated consumers
  and stable services.
- **Phase 8 — US6 (P2 deterministic failures)**: depends on US3 and US4; can run in parallel with US5.
- **Phase 9 — Polish**: depends on all selected stories; T076 is the final merge gate.

### User Story Dependencies

```text
Foundation
  -> US3 Internal Repository
       -> US2 Scope/Cache Isolation
            -> US1 Preserved Products Journey
                 -> US5 Compatibility Facade Cleanup

Foundation -> US4 Stable Composition -> US5
US3 + US4 -> US6 Deterministic Failures
US1 + US2 + US3 + US4 + US5 + US6 -> Final Gates
```

### Requirements Coverage

| Requirement area | Primary tasks |
|---|---|
| FR-001–FR-006 temporary scope | T008, T015, T029–T035 |
| FR-007–FR-013 package/ownership | T005–T007, T009–T019, T068–T071 |
| FR-014–FR-022 internal repository | T009–T012, T020–T028 |
| FR-023–FR-031 stores/determinism | T013, T020–T028, T062–T067 |
| FR-032–FR-038 composition | T016, T042–T043, T047–T053 |
| FR-039–FR-045 hooks/cache/orchestration | T030–T034, T038–T045 |
| FR-046–FR-053 compatibility/cutover | T054–T061 |
| FR-054–FR-062 evidence/quality | T001–T002, T028, T035–T038, T046, T053, T061, T067, T070–T076 |
| FR-063–FR-069 prohibited changes | T049, T053, T060, T069, T071, T074–T076 |

### Within Each User Story

- Write the story tests first and confirm they fail for the intended missing behavior.
- Implement contracts/models before adapters/services, then integrate hooks/providers/pages.
- Run the independent story checkpoint before proceeding to a dependent story.
- Never make a failing checkpoint pass by clearing browser data, adding randomness/retries, or
  weakening tenant/compatibility assertions.

## Parallel Opportunities

- T004-T006 can run in parallel after dependency installation.
- T009-T010, T013-T015, and T016-T017 edit independent foundational files.
- T020-T023 can be authored in parallel before US3 implementation.
- T024 and T025 implement independent store adapters in parallel.
- T029-T031 isolate repository, key, and React Query cache tests in parallel.
- T036-T038 cover separate E2E/accessibility/service surfaces in parallel.
- T047-T049 cover independent composition/provider/source-boundary surfaces in parallel.
- T054-T056 cover package, provider, and browser compatibility in parallel.
- T062-T063 cover deterministic behavior and diagnostic minimization in parallel.
- T068-T070 document separate package/traceability surfaces in parallel.

## Parallel Example: P1 Vertical Slice

```text
After Phase 2:
  A. Author T020-T023 repository/adapter tests.
  B. Author T030-T031 query-key/cache isolation tests.

After US3 passes:
  A. Implement and validate T032 repository isolation.
  B. Implement and validate T033-T034 cache isolation.

After US2 passes:
  A. Author T036 Products journey regression.
  B. Author T037 bilingual/accessibility regression.
  C. Author T038 editor-service orchestration tests.
```

## Implementation Strategy

### MVP: Complete P1 Vertical Slice

US1 alone cannot be safely delivered without its P1 repository and tenant-isolation prerequisites.
The minimum deployable/demoable slice is therefore:

1. Phase 1 characterization and setup.
2. Phase 2 boundary foundation.
3. US3 internal repository and adapter contract.
4. US2 Workspace/legacy-`BusinessUnit`/cache isolation.
5. US1 preserved list/create/edit/refresh journey.
6. Stop and validate all P1 checkpoints before any P2 cleanup/hardening.

### Incremental Delivery

1. Freeze behavior before structural edits.
2. Deliver memory/browser repository parity without runtime cutover.
3. Prove scope/cache isolation.
4. Cut over only the Product routes.
5. Harden implementation selection and provider identity.
6. Feed legacy readers and remove only zero-consumer Product callbacks.
7. Add deterministic failure/diagnostic evidence.
8. Run final documentation and Constitution gates.

## Notes

- Every Feature 052 contract is frontend-internal and temporary.
- `LegacyProductScope` must never grow a fabricated `businessId`.
- `remove` preserves current mock behavior and must never be renamed or implemented as archive in
  this feature.
- Browser storage key, existing IDs, unknown fields, routes, and visible English behavior remain
  compatible throughout.
- `AppProvider` remains for excluded domains; only old zero-consumer Product callbacks may be removed.
- A failed Constitution or regression checkpoint stops the affected tasks and is not waivable.
