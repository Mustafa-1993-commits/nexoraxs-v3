# Tasks: Onboarding Architecture v2

**Input**: Design documents from `/specs/049-onboarding-architecture-v2/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/onboarding-flow-contract.md, quickstart.md

**Tests**: Dedicated TDD tests were not requested. Validation tasks are included in the final phase and must be run before implementation is considered complete.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase because it touches different files or is documentation/validation-only.
- **[Story]**: User story label, used only in user-story phases.
- Every task includes an exact file path.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish feature scope, inspect current implementation, and protect existing user work.

- [ ] T001 Review Spec 049 scope, no-backend constraints, and architecture gates in specs/049-onboarding-architecture-v2/spec.md
- [ ] T002 Review current implementation plan and contracts in specs/049-onboarding-architecture-v2/plan.md and specs/049-onboarding-architecture-v2/contracts/onboarding-flow-contract.md
- [ ] T003 Inspect current Core onboarding flow in apps/core-platform/app/onboarding/page.tsx
- [ ] T004 Inspect current Product Hub and Core shell navigation in apps/core-platform/app/dashboard/apps/page.tsx and apps/core-platform/components/shell/CoreShell.tsx
- [ ] T005 Inspect current Core and Commerce store providers in apps/core-platform/lib/store/AppProvider.tsx and apps/commerce/lib/store/AppProvider.tsx
- [ ] T006 Inspect shared mock-data types, catalog, selectors, and seed data in packages/types/src/core.ts, packages/types/src/commerce.ts, packages/shared/src/mock-db/schema.ts, packages/shared/src/mock-db/selectors.ts, and packages/shared/src/mock-db/seed.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared data and helper support needed by all user stories before UI changes begin.

**CRITICAL**: No user story work should begin until these shared model, selector, and language foundations are complete.

- [ ] T007 Add or verify OSSubscription, OSEnablement, BusinessUnit, Branch, and CommerceSetup fields needed by Spec 049 in packages/types/src/core.ts and packages/types/src/commerce.ts
- [ ] T008 Add Enterprise Commerce plan metadata and Product Hub status labels in packages/shared/src/mock-db/schema.ts
- [ ] T009 Add Arabic/English UI labels for Business, Businesses, Branch, Products, Operating Systems, Enabled Products, Resources, setup required, and active Business context in packages/shared/src/mock-db/schema.ts
- [ ] T010 Add selectors for Workspace-level OS subscription lookup, Business main-branch lookup, Business operational activation, and Business-scoped OS enablement in packages/shared/src/mock-db/selectors.ts
- [ ] T011 Export new selector and catalog helpers from packages/shared/src/mock-db/index.ts and apps/core-platform/lib/store/index.ts
- [ ] T012 Align seed/mock defaults for Workspace, BusinessUnit, Branch, OSSubscription, OSEnablement, and CommerceSetup compatibility in packages/shared/src/mock-db/seed.ts
- [ ] T013 Add migration-safe comments or helper behavior for preserving existing records and relationship counts in packages/shared/src/mock-db/selectors.ts

**Checkpoint**: Shared model and mock-store foundation supports Workspace -> Business -> OSSubscription -> OSEnablement -> Status without UI changes.

---

## Phase 3: User Story 1 - Complete Core Onboarding Without Commerce Coupling (Priority: P1)

**Goal**: A new owner completes Welcome + Language, Workspace creation, Business creation, and lands in Product Hub without Commerce-specific setup.

**Independent Test**: Complete Register/Login -> Welcome + Language -> Create Workspace -> Create Business -> Product Hub; verify exactly one Workspace and one Business exist and no Commerce setup fields were required.

### Implementation for User Story 1

- [ ] T014 [US1] Replace OS-first onboarding steps with Welcome + Language, Create Workspace, and Create Business flow in apps/core-platform/app/onboarding/page.tsx
- [ ] T015 [US1] Implement country-driven Currency and Timezone defaults with user override in apps/core-platform/app/onboarding/page.tsx
- [ ] T016 [US1] Implement Business Name and Business Activity collection without selecting or forcing an Operating System in apps/core-platform/app/onboarding/page.tsx
- [ ] T017 [US1] Update Core createWorkspace, createBusinessUnit, and completeOnboarding behavior for OS-neutral onboarding in apps/core-platform/lib/store/AppProvider.tsx
- [ ] T018 [US1] Ensure Core onboarding routes to Product Hub after Business creation in apps/core-platform/app/onboarding/page.tsx
- [ ] T019 [US1] Remove or bypass Commerce plan and OS selection requirements from Core onboarding state checks in apps/core-platform/lib/store/AppProvider.tsx
- [ ] T020 [P] [US1] Remove user-facing BusinessUnit, BU, and Default Business Unit copy from onboarding components in apps/core-platform/components/onboarding/
- [ ] T021 [US1] Verify onboarding resume behavior for missing Workspace or Business state in apps/core-platform/app/onboarding/page.tsx

**Checkpoint**: User Story 1 is functional and testable independently through Product Hub entry.

---

## Phase 4: User Story 2 - Launch Commerce From Product Hub With Independent Subscription and Enablement (Priority: P1)

**Goal**: Product Hub is the single Core OS entry point and launches Commerce using active Business context, Workspace-level subscription, and Business-scoped enablement.

**Independent Test**: From Product Hub, select an active Business, choose/confirm Commerce plan, launch Commerce, and verify Workspace-level OSSubscription plus Business-scoped OSEnablement are created or reused correctly.

### Implementation for User Story 2

- [ ] T022 [US2] Redesign Product Hub around Workspace, active Business context, Operating Systems, statuses, and quick actions in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T023 [US2] Add Product Hub active Business selection and required-state messaging before OS launch in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T024 [US2] Add Add Business and Add Branch quick action behavior within current mock architecture in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T025 [US2] Implement OS card status mapping for available, subscribed, setup required, active, coming soon, and locked states in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T026 [US2] Add Core store action to prepare OS launch by creating or reusing OSSubscription and creating Business-scoped OSEnablement in apps/core-platform/lib/store/AppProvider.tsx
- [ ] T027 [US2] Ensure launching the same OS for another Business reuses the Workspace OSSubscription unless plan change is explicit in apps/core-platform/lib/store/AppProvider.tsx
- [ ] T028 [US2] Update Core-to-Commerce setup and dashboard URL handoff to include workspaceId, osSubscriptionId, businessUnitId, currentBranchId, and osEnablementId in apps/core-platform/lib/commerce-url.ts
- [ ] T029 [US2] Update Core sidebar navigation to separate Dashboard, Businesses, Products, Billing, Team, and Settings in apps/core-platform/components/shell/CoreShell.tsx
- [ ] T030 [P] [US2] Add Businesses list route with Business cards, branch counts, enabled OS status, and actions in apps/core-platform/app/dashboard/businesses/page.tsx
- [ ] T031 [P] [US2] Add Business detail route with Overview, Branches, Products, Resources, and Settings sections in apps/core-platform/app/dashboard/businesses/[businessUnitId]/page.tsx

**Checkpoint**: User Story 2 is functional and Product Hub can launch Commerce for a selected Business without owning Commerce setup.

---

## Phase 5: User Story 3 - Configure Commerce With Business-Owned Setup and Branch Operational Scope (Priority: P1)

**Goal**: Commerce setup owns Commerce-specific configuration at Business level while Branch remains operational scope and Commerce Dashboard shows the selected context.

**Independent Test**: Complete Commerce setup for one Business, verify Business identity inheritance, preset suggestion/override, main branch and tax capture, generated defaults, distinct Billing/Branch addresses, and dashboard context.

### Implementation for User Story 3

- [ ] T032 [US3] Ensure Commerce handoff hydration accepts workspaceId, osSubscriptionId, businessUnitId, currentBranchId, and osEnablementId in apps/commerce/lib/store/AppProvider.tsx
- [ ] T033 [US3] Ensure Commerce plan selection reuses existing Workspace Commerce OSSubscription unless user explicitly changes plan in apps/commerce/lib/store/AppProvider.tsx
- [ ] T034 [US3] Align Commerce setup steps to Choose Plan, Business Identity, Commerce Preset, Branch + Tax, and Review & Launch in apps/commerce/app/setup/page.tsx
- [ ] T035 [US3] Ensure Business Identity inherits Business Name and Business Activity while allowing editable legal, contact, logo, billing, commercial registration, and tax registration fields in apps/commerce/app/setup/page.tsx
- [ ] T036 [US3] Ensure Commerce Preset is suggested from Business Activity and user override is preserved in apps/commerce/app/setup/page.tsx
- [ ] T037 [US3] Ensure Commerce setup creates or selects one Main Branch before operational activation in apps/commerce/app/setup/page.tsx
- [ ] T038 [US3] Ensure Branch + Tax captures Branch Name, City, Operational Address, VAT Registered, VAT Number, VAT Rate, and Prices Include VAT in apps/commerce/app/setup/page.tsx
- [ ] T039 [US3] Ensure CommerceSetup is saved by workspaceId + businessUnitId and not as Branch-owned data in apps/commerce/lib/store/AppProvider.tsx
- [ ] T040 [US3] Ensure Auto Configuration creates categories, units, invoice template, receipt template, invoice numbering, barcode rules, and optional sample products in apps/commerce/lib/store/AppProvider.tsx
- [ ] T041 [US3] Show current Business and current Branch context clearly in Commerce shell or dashboard in apps/commerce/components/shell/ContextSwitcher.tsx and apps/commerce/app/dashboard/page.tsx
- [ ] T042 [US3] Verify Billing Address and Branch Address are displayed and preserved as distinct concepts in apps/commerce/app/setup/page.tsx

**Checkpoint**: User Story 3 is functional and Commerce setup can launch dashboard with Business-owned setup and Branch operational context.

---

## Phase 6: User Story 4 - Support Future Multi-Business and Multi-OS Growth (Priority: P2)

**Goal**: The architecture supports adding additional Businesses and future Operating Systems independently without re-entering Workspace data or creating cross-OS dependency.

**Independent Test**: Add a second Business, launch the same Commerce subscription for it, and verify separate OSEnablement, CommerceSetup, and Branches while preserving the same Workspace and subscription.

### Implementation for User Story 4

- [ ] T043 [US4] Ensure Product Hub can add and switch between multiple Businesses in the same Workspace in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T044 [US4] Ensure same Branch name can exist under different Businesses while duplicate names remain blocked within one Business in packages/shared/src/mock-db/selectors.ts and apps/core-platform/lib/store/AppProvider.tsx
- [ ] T045 [US4] Ensure Product Hub displays future OS products as independent available/coming-soon/locked cards without implementing HR, CRM, Healthcare, Gym, or Maintenance workflows in apps/core-platform/app/dashboard/apps/page.tsx
- [ ] T046 [US4] Ensure OS enablement helper supports workspace, business, and branch scopes for future OS use in packages/shared/src/mock-db/selectors.ts
- [ ] T047 [US4] Ensure Commerce setup for a second Business creates a separate CommerceSetup while reusing the existing Workspace OSSubscription in apps/commerce/lib/store/AppProvider.tsx
- [ ] T048 [US4] Ensure branch switching keeps POS, inventory, orders, invoices, reports, transfers, and returns scoped to the selected Branch in apps/commerce/lib/store/AppProvider.tsx
- [ ] T049 [US4] Ensure Product Hub and Businesses pages link operational management back to Businesses and OS launch, not Commerce branch management inside Product Hub, in apps/core-platform/app/dashboard/apps/page.tsx and apps/core-platform/app/dashboard/businesses/page.tsx

**Checkpoint**: User Story 4 validates multi-Business and future multi-OS readiness without building future OS products.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final copy, safety checks, validation, and documentation alignment across all stories.

- [ ] T050 [P] Audit Core and Commerce UI copy for forbidden BusinessUnit, Business Unit, BU, and Default Business Unit wording in apps/core-platform/ and apps/commerce/
- [ ] T051 [P] Audit pages/components for direct localStorage or sessionStorage access and move any violations behind providers/shared helpers in apps/core-platform/ and apps/commerce/
- [ ] T052 [P] Audit runtime imports from docs/claude.aidesign and remove any violations in apps/ and packages/
- [ ] T053 Update quickstart results or implementation notes for Spec 049 in specs/049-onboarding-architecture-v2/quickstart.md
- [ ] T054 Run pnpm --filter core-platform exec tsc --noEmit
- [ ] T055 Run pnpm --filter commerce exec tsc --noEmit
- [ ] T056 Run pnpm --filter core-platform lint
- [ ] T057 Run pnpm --filter commerce lint
- [ ] T058 Run pnpm --filter core-platform build
- [ ] T059 Run pnpm --filter commerce build
- [ ] T060 Run pnpm build
- [ ] T061 Run pnpm lint
- [ ] T062 Run git diff --check
- [ ] T063 Perform manual walkthroughs from specs/049-onboarding-architecture-v2/quickstart.md and document any skipped browser walkthrough in the final implementation summary

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational.
- **User Story 2 (Phase 4)**: Depends on Foundational and can run after US1 shell decisions, but Product Hub can be validated independently with an existing Workspace and Business.
- **User Story 3 (Phase 5)**: Depends on Foundational and the Commerce launch contract from US2.
- **User Story 4 (Phase 6)**: Depends on the shared foundations and benefits from US2/US3 being complete.
- **Polish (Phase 7)**: Depends on all selected story phases being complete.

### User Story Dependencies

- **US1 (P1)**: Independent after foundational work; MVP scope.
- **US2 (P1)**: Requires shared subscription/enablement helpers; integrates with US1-created Business context.
- **US3 (P1)**: Requires US2 handoff contract to open Commerce setup with full context.
- **US4 (P2)**: Extends US2 and US3 to additional Businesses and future OS states.

### Parallel Opportunities

- T003, T004, T005, and T006 can be inspected in parallel.
- T008, T009, T010, and T012 can be implemented in parallel if file conflicts are coordinated.
- T020 can run while T014-T019 are implemented because it audits separate onboarding component files.
- T030 and T031 can run in parallel after Product Hub store APIs are defined.
- T050, T051, and T052 can run in parallel during final polish.

---

## Parallel Example: User Story 2

```text
Task: T022 [US2] Product Hub redesign in apps/core-platform/app/dashboard/apps/page.tsx
Task: T026 [US2] Core launch action in apps/core-platform/lib/store/AppProvider.tsx
Task: T028 [US2] Commerce URL handoff in apps/core-platform/lib/commerce-url.ts
Task: T030 [P] [US2] Businesses list route in apps/core-platform/app/dashboard/businesses/page.tsx
Task: T031 [P] [US2] Business detail route in apps/core-platform/app/dashboard/businesses/[businessUnitId]/page.tsx
```

## Parallel Example: User Story 3

```text
Task: T032 [US3] Commerce handoff hydration in apps/commerce/lib/store/AppProvider.tsx
Task: T034 [US3] Commerce setup steps in apps/commerce/app/setup/page.tsx
Task: T041 [US3] Commerce context display in apps/commerce/components/shell/ContextSwitcher.tsx and apps/commerce/app/dashboard/page.tsx
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) to make Core onboarding OS-neutral and Product Hub-ready.
3. Validate Register/Login -> Welcome + Language -> Workspace -> Business -> Product Hub.

### Complete Critical P1 Flow

1. Complete Phase 4 (US2) to launch Commerce from Product Hub with subscription/enablement separation.
2. Complete Phase 5 (US3) to finish Commerce setup with Business-owned setup and Branch operational context.
3. Validate first-Commerce launch end to end.

### Incremental Expansion

1. Complete Phase 6 (US4) for multi-Business and future multi-OS readiness.
2. Complete Phase 7 validation and copy/storage/import audits.
3. Stop before backend work, billing provider changes, future OS implementations, or deep Commerce dashboard redesign.

## Notes

- Do not globally rename `BusinessUnit`.
- Do not introduce a new duplicate Business entity.
- Do not add backend APIs or database migrations.
- Do not add direct localStorage/sessionStorage access in pages/components.
- Do not import runtime code from docs/claude.aidesign.
- Keep Core Platform generic and Commerce setup inside Commerce OS.
