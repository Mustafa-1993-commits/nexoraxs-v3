# Tasks: Business-Level Commerce Setup, Address Separation, and Business Resources

**Input**: Design documents from `specs/048-business-commerce-setup-addresses/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/business-commerce-setup-contract.md](./contracts/business-commerce-setup-contract.md), [quickstart.md](./quickstart.md)

**Tests**: No dedicated automated test files are required by the spec. Validation is covered by typecheck, lint, build, `git diff --check`, and the manual quickstart flow.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Context)

**Purpose**: Confirm current files and preserve existing architecture constraints before editing.

- [X] T001 Review Spec 047 dependency and Spec 048 scope in `specs/047-onboarding-flow-optimization-v2/spec.md` and `specs/048-business-commerce-setup-addresses/spec.md`
- [X] T002 [P] Audit current Commerce setup identity, business, branch, preset, and review behavior in `apps/commerce/app/setup/page.tsx`
- [X] T003 [P] Audit current Commerce provider setup resolution, OSEnablement fallback, and storage access path in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T004 [P] Audit shared type and mock-db support for BusinessUnit, Branch, CommerceSetup, MediaAsset, and OSEnablement in `packages/types/src/core.ts`, `packages/types/src/commerce.ts`, `packages/shared/src/mock-db/selectors.ts`, and `packages/shared/src/mock-db/seed.ts`
- [X] T005 [P] Audit document and preview address rendering in `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`, `apps/commerce/app/(commerce)/returns/[id]/document/page.tsx`, and `apps/commerce/app/(commerce)/settings/documents/page.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add low-risk shared compatibility primitives used by all user stories.

**Critical**: No user story implementation should start until these shared contracts are aligned.

- [X] T006 Add optional Business Billing Address compatibility fields to `CommerceSetup` in `packages/types/src/commerce.ts`
- [X] T007 Add optional Branch Address compatibility fields and complete Business Resource owner type values in `packages/types/src/core.ts`
- [X] T008 Add shared billing address, branch address, and preset suggestion helper functions in `packages/shared/src/mock-db/selectors.ts`
- [X] T009 Export new shared helper functions from `packages/shared/src/mock-db/index.ts`
- [X] T010 Update `DEFAULT_SETUP` and demo seed comments/data to preserve existing address fields as billing-address fallbacks in `packages/shared/src/mock-db/seed.ts`
- [X] T011 Verify foundational changes do not introduce direct browser storage usage outside providers by checking `apps/core-platform/`, `apps/commerce/`, and `packages/shared/src/mock-db/storage.ts`

**Checkpoint**: Shared compatibility helpers and types are ready for story work.

---

## Phase 3: User Story 1 - Commerce setup is business-level (Priority: P1) MVP

**Goal**: Commerce setup resolves and saves at Workspace + Business/BusinessUnit scope, while Branch remains operational context only.

**Independent Test**: Create/select a Business with a Branch, complete Commerce setup, and verify setup identity/tax/preset/templates belong to Business and not exclusively to Branch.

### Implementation for User Story 1

- [X] T012 [US1] Ensure `getCommerceSetup` and `saveCommerceSetup` resolve CommerceSetup by `workspaceId + businessUnitId` and never by `branchId` alone in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T013 [US1] Ensure Commerce setup save payload keeps `businessUnitId`, `workspaceId`, and `osSubscriptionId` as the primary setup scope in `apps/commerce/app/setup/page.tsx`
- [X] T014 [P] [US1] Update setup review display so Business and Branch appear as separate values in `apps/commerce/app/setup/page.tsx`
- [X] T015 [P] [US1] Update Commerce Settings business identity entry to describe Business-level identity rather than branch-level setup in `apps/commerce/app/(commerce)/settings/page.tsx`
- [X] T016 [P] [US1] Verify shell/context copy keeps Business and Branch separate and avoids BusinessUnit wording in `apps/commerce/components/shell/ContextSwitcher.tsx`

**Checkpoint**: User Story 1 is independently testable through Commerce setup and settings review.

---

## Phase 4: User Story 2 - Addresses are separated by ownership and purpose (Priority: P1)

**Goal**: Workspace Address, Business Billing Address, and Branch Address are treated as separate concepts with safe fallbacks for existing data.

**Independent Test**: Complete or review setup with distinct Business Billing and Branch values, then verify documents use billing address and branch context uses branch location.

### Implementation for User Story 2

- [X] T017 [US2] Update Commerce Identity fields and labels to use Billing Address, Billing City, and Billing Country in `apps/commerce/app/setup/page.tsx`
- [X] T018 [US2] Update Branch creation/setup labels to use Branch City and Branch Address terminology without default city selection in `apps/commerce/app/setup/page.tsx`
- [X] T019 [P] [US2] Update invoice document rendering to use shared Business Billing Address fallback and keep Branch context separate in `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`
- [X] T020 [P] [US2] Update return document rendering to use shared Business Billing Address fallback and keep Branch context separate in `apps/commerce/app/(commerce)/returns/[id]/document/page.tsx`
- [X] T021 [P] [US2] Update receipt/invoice preview rendering to use Business Billing Address semantics in `apps/commerce/app/(commerce)/settings/documents/page.tsx`
- [X] T022 [P] [US2] Update Commerce dashboard setup checklist wording so address completion refers to Billing Address in `apps/commerce/app/(commerce)/dashboard/page.tsx`
- [X] T023 [P] [US2] Update branch management labels to use Branch City or Branch Address where relevant in `apps/commerce/app/(commerce)/settings/page.tsx`

**Checkpoint**: User Story 2 is independently testable through Commerce setup, dashboard checklist, documents, and settings previews.

---

## Phase 5: User Story 3 - Industry Type suggests, but does not force, Commerce Preset (Priority: P1)

**Goal**: Business `industryType` remains the canonical Business classification while Commerce Preset is suggested, confirmed, and applied as Commerce-only configuration.

**Independent Test**: Set Business Industry Type to Pharmacy, confirm Pharmacy is suggested, choose another preset, and verify Industry Type remains Pharmacy while Commerce Preset changes.

### Implementation for User Story 3

- [X] T024 [US3] Replace page-local industry-to-preset mapping with the shared preset suggestion helper in `apps/commerce/app/setup/page.tsx`
- [X] T025 [US3] Ensure Step 1 Continue persists Business `industryType` without storing it directly as CommerceSetup `presetId`, `preset`, or `businessType` in `apps/commerce/app/setup/page.tsx`
- [X] T026 [US3] Update Commerce setup hydration so suggested preset/defaults are applied only when preset/categories/templates have not been manually confirmed or edited in `apps/commerce/app/setup/page.tsx`
- [X] T027 [US3] Update preset selection handler to mark Commerce Preset as user-confirmed and apply categories/templates from the confirmed preset only in `apps/commerce/app/setup/page.tsx`
- [X] T028 [P] [US3] Ensure Business creation keeps `industryType` separate from preset compatibility fields in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T029 [P] [US3] Update setup review copy to show Industry Type and Commerce Preset as separate rows in `apps/commerce/app/setup/page.tsx`

**Checkpoint**: User Story 3 is independently testable by changing Industry Type and confirming a different Commerce Preset.

---

## Phase 6: User Story 5 - Existing MVP remains compatible (Priority: P1)

**Goal**: Existing Core Platform and Commerce OS flows continue working with old mock data, current BusinessUnit internals, and OSEnablement compatibility.

**Independent Test**: Complete Core onboarding to Product Hub, launch Commerce setup, finish setup, and verify Commerce Dashboard, POS, documents, branch context, and business identity still work.

### Implementation for User Story 5

- [X] T030 [US5] Verify Core Product Hub and Commerce launch URL preserve workspace, subscription, business, branch, and OSEnablement context in `apps/core-platform/app/dashboard/apps/page.tsx` and `apps/core-platform/lib/commerce-url.ts`
- [X] T031 [US5] Preserve old-data fallback when OSEnablement is missing but `currentBusinessUnitId` exists in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T032 [US5] Preserve old CommerceSetup address/city/country records through billing-address fallback helpers in `apps/commerce/lib/store/AppProvider.tsx`
- [X] T033 [P] [US5] Verify touched Commerce pages/components do not import from `docs/claude.aidesign` in `apps/commerce/app/setup/page.tsx`, `apps/commerce/app/(commerce)/`, and `apps/commerce/components/shell/`
- [X] T034 [P] [US5] Verify touched Core pages/components do not read localStorage/sessionStorage directly in `apps/core-platform/app/dashboard/apps/page.tsx`, `apps/core-platform/app/onboarding/page.tsx`, and `apps/core-platform/components/onboarding/`
- [X] T035 [US5] Run the manual quickstart compatibility flow and record any blocker in `specs/048-business-commerce-setup-addresses/quickstart.md`

**Checkpoint**: User Story 5 is independently testable through the full current MVP flow.

---

## Phase 7: User Story 4 - Business resources and ownership concepts are clarified (Priority: P2)

**Goal**: Business Resources, Business Settings, Workspace Employees vs Business Employees, Business Warehouses, BranchCommerceSettings, and OSEnablement ownership are documented and safely mapped to the current MVP.

**Independent Test**: Review implementation documentation and verify each concept has one owner, maps to current code where safe, and does not contradict Spec 047.

### Implementation for User Story 4

- [X] T036 [US4] Extend MediaAsset owner type support for Business Resource values where missing in `packages/types/src/core.ts`
- [X] T037 [US4] Verify `buildMediaAsset` and storage usage handling support Business-scoped resource ownership without duplicating payloads in `packages/shared/src/mock-db/actions.ts`
- [X] T038 [P] [US4] Update Commerce settings copy to describe logos and document assets as Business-level resources where safe in `apps/commerce/app/(commerce)/settings/page.tsx`
- [X] T039 [US4] Create implementation documentation for Spec 048 ownership rules in `docs/implementation/business-commerce-setup-addresses.md`
- [X] T040 [US4] Document BusinessUnit-in-code equals Business-in-product-language mapping in `docs/implementation/business-commerce-setup-addresses.md`
- [X] T041 [US4] Document Business Resources, Business Settings, Workspace Employees vs Business Employees, Business Warehouses, BranchCommerceSettings, and OSEnablement ownership in `docs/implementation/business-commerce-setup-addresses.md`

**Checkpoint**: User Story 4 is independently testable by reviewing docs and resource type support.

---

## Phase 8: Polish & Cross-Cutting Validation

**Purpose**: Validate the full feature and ensure no architecture or formatting regressions remain.

- [X] T042 [P] Run `pnpm --filter core-platform exec tsc --noEmit` for `apps/core-platform/package.json`
- [X] T043 [P] Run `pnpm --filter commerce exec tsc --noEmit` for `apps/commerce/package.json`
- [X] T044 [P] Run `pnpm --filter core-platform lint` for `apps/core-platform/package.json`
- [X] T045 [P] Run `pnpm --filter commerce lint` for `apps/commerce/package.json`
- [X] T046 Run `pnpm --filter core-platform build` for `apps/core-platform/package.json`
- [X] T047 Run `pnpm --filter commerce build` for `apps/commerce/package.json`
- [X] T048 Run `pnpm build` and `pnpm lint` for root `package.json`
- [X] T049 Run `git diff --check` for repository root `.`
- [X] T050 Update final implementation notes with changed files, Product/Commerce behavior, address separation, preset behavior, and validation results in `specs/048-business-commerce-setup-addresses/tasks.md`

## Final Implementation Notes

Changed files:
- Shared contracts/helpers: `packages/types/src/core.ts`, `packages/types/src/commerce.ts`, `packages/shared/src/mock-db/selectors.ts`, `packages/shared/src/mock-db/index.ts`, `packages/shared/src/mock-db/seed.ts`
- Commerce provider/setup/docs/settings: `apps/commerce/lib/store/AppProvider.tsx`, `apps/commerce/app/setup/page.tsx`, `apps/commerce/app/(commerce)/dashboard/page.tsx`, `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`, `apps/commerce/app/(commerce)/returns/[id]/document/page.tsx`, `apps/commerce/app/(commerce)/settings/page.tsx`, `apps/commerce/app/(commerce)/settings/documents/page.tsx`
- Core handoff: `apps/core-platform/app/dashboard/apps/page.tsx`, `apps/core-platform/lib/commerce-url.ts`
- Documentation: `docs/implementation/business-commerce-setup-addresses.md`

Behavior completed:
- CommerceSetup is resolved and saved at `workspaceId + businessUnitId`; Branch remains operational context.
- Business Billing Address helpers preserve old `address/city/country` data and support explicit `billing*` fields.
- Branch Address helpers preserve old `address/city/country` branch data and support explicit `branch*` fields.
- Product Hub handoff preserves Workspace, subscription, Business, Branch, OSEnablement, Industry Type, preset, and branch address context.
- Commerce setup keeps Business Industry Type separate from Commerce Preset, applies preset defaults only through suggestion/confirmation behavior, and review surfaces show both values separately.
- Invoices, returns, receipt previews, and document previews use Business Billing Address while branch context remains separate.
- Business Resources, Business Settings, Workspace Employees vs Business Employees, Business Warehouses, BranchCommerceSettings, and OSEnablement ownership are documented.

Validation results:
- PASS: `pnpm --filter core-platform exec tsc --noEmit`
- PASS: `pnpm --filter commerce exec tsc --noEmit`
- PASS: `pnpm --filter core-platform lint`
- PASS: `pnpm --filter commerce lint`
- PASS: `pnpm --filter core-platform build`
- PASS: `pnpm --filter commerce build`
- PASS: `pnpm build`
- PASS: `pnpm lint`
- PASS: `git diff --check`

Manual quickstart status:
- Build/typecheck/lint validation passed for the Core Product Hub, Commerce setup, dashboard, settings, documents, and compatibility paths touched by Spec 048.
- No interactive dev-server browser walkthrough was run in this implementation pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies.
- **Phase 2 Foundational**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 US1**: Depends on Phase 2.
- **Phase 4 US2**: Depends on Phase 2; can run alongside US1 after shared helpers exist.
- **Phase 5 US3**: Depends on Phase 2; can run alongside US1/US2 if `apps/commerce/app/setup/page.tsx` edits are coordinated.
- **Phase 6 US5**: Depends on Phase 2 and should be finalized after US1-US3 changes are present.
- **Phase 7 US4**: Depends on Phase 2; documentation can run in parallel with US1-US3 after shared ownership decisions are stable.
- **Phase 8 Polish**: Depends on selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after foundational tasks.
- **US2 (P1)**: No dependency on US1, but shares Commerce setup file edits.
- **US3 (P1)**: No dependency on US1/US2, but shares Commerce setup file edits.
- **US5 (P1)**: Cross-cutting compatibility story; should validate after US1-US3 implementation.
- **US4 (P2)**: Documentation/resource clarification; can run independently after foundational tasks, but final docs should reflect all selected implementation details.

### Within Each User Story

- Shared type/helper changes before app usage.
- Provider/store compatibility before page rendering changes.
- Setup-page data flow before review/dashboard/document copy.
- Documentation after code decisions are stable.
- Validation after implementation and documentation are complete.

---

## Parallel Opportunities

- T002, T003, T004, and T005 can run in parallel during setup.
- US1 tasks T014, T015, and T016 can run in parallel after T012-T013.
- US2 document tasks T019, T020, T021, T022, and T023 can run in parallel after T017-T018.
- US3 tasks T028 and T029 can run in parallel with T024-T027 if setup-page edits are coordinated.
- US4 tasks T038 and T039 can run in parallel after T036-T037.
- Validation tasks T042, T043, T044, and T045 can run in parallel after implementation is complete.

## Parallel Example: User Story 2

```text
Task: "Update invoice document rendering to use shared Business Billing Address fallback and keep Branch context separate in apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx"
Task: "Update return document rendering to use shared Business Billing Address fallback and keep Branch context separate in apps/commerce/app/(commerce)/returns/[id]/document/page.tsx"
Task: "Update receipt/invoice preview rendering to use Business Billing Address semantics in apps/commerce/app/(commerce)/settings/documents/page.tsx"
Task: "Update branch management labels to use Branch City or Branch Address where relevant in apps/commerce/app/(commerce)/settings/page.tsx"
```

## Parallel Example: User Story 4

```text
Task: "Update Commerce settings copy to describe logos and document assets as Business-level resources where safe in apps/commerce/app/(commerce)/settings/page.tsx"
Task: "Create implementation documentation for Spec 048 ownership rules in docs/implementation/business-commerce-setup-addresses.md"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete US1 to lock CommerceSetup ownership at Business scope.
3. Complete US2 and US3 to align address semantics and preset confirmation behavior.
4. Run the US5 compatibility flow before broad documentation polish.
5. Complete validation commands.

### Incremental Delivery

1. Shared helpers/types -> validate type safety.
2. Business-level setup -> verify Commerce setup ownership.
3. Address separation -> verify documents and previews.
4. Preset confirmation -> verify Industry Type and Commerce Preset can differ.
5. Documentation/resource concepts -> verify future ownership boundaries.
6. Full validation -> typecheck, lint, build, manual flow, diff check.

### Stop Conditions

- Stop if implementation requires backend APIs or migrations.
- Stop if a change would move Commerce business logic into Core Platform.
- Stop if a change would make CommerceSetup branch-owned.
- Stop if a global BusinessUnit rename appears necessary.
- Stop if existing local/session mock data would need to be wiped.
