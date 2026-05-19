# Tasks: Onboarding Branch Country & Currency

**Input**: `specs/024-onboarding-branch-country-currency/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅
**Tests**: Not requested — no test tasks generated.
**Scope**: Surgical edits to 3 files in `apps/shops-app`. No new packages, no API, no new routes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Read Current State)

**Purpose**: Read all 3 target files before editing to confirm current structure matches research.md findings.

- [X] T001 Read `apps/shops-app/components/onboarding/StepStoreSetup.tsx` and confirm current `StoreSetupData` interface and props
- [X] T002 [P] Read `apps/shops-app/components/onboarding/StepReview.tsx` and confirm current `buildSummary` signature and workspace props
- [X] T003 [P] Read `apps/shops-app/app/onboarding/page.tsx` and confirm `COUNTRY_CURRENCY_MAP`, `workspaceCountry`/`workspaceCurrency` derived state, and `storeSetup` initial shape

---

## Phase 2: Foundational (Blocking Prerequisite)

**Purpose**: Extend `StoreSetupData` with `branchCountry` and `branchCurrency`. This type change cascades to all 3 files — TypeScript strict mode will surface every callsite that needs updating.

**⚠️ CRITICAL**: All user story tasks depend on this change being in place first.

- [X] T004 Extend `StoreSetupData` interface in `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — add `branchCountry: string` and `branchCurrency: string` fields

**Checkpoint**: After T004, TypeScript will report errors at every callsite that constructs or uses `StoreSetupData`. These errors are expected and each is resolved by the tasks below.

---

## Phase 3: User Story 1 — Step 3: Collect Branch Country and Currency (Priority: P1) 🎯 MVP

**Goal**: Step 3 of Shops onboarding shows "Branch country" and "Branch currency" selects. Selecting a country auto-suggests its currency. The user can override currency manually. A contextual note explains the branch scope. Live preview reflects branch values.

**Independent Test**: Navigate to Shops onboarding Step 3. Verify: "Branch country" select is visible with Egypt, Saudi Arabia, UAE, Kuwait, Qatar. Selecting "Egypt" auto-sets currency to "EGP". Selecting "United Arab Emirates" auto-sets to "AED". Manually changing currency after auto-suggest preserves the override. The contextual note is visible. Workspace row shows name only (no country/currency display).

### Implementation for User Story 1

- [X] T005 [US1] Remove `workspaceCountry` and `workspaceCurrency` from `StepStoreSetupProps` interface in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`
- [X] T006 [US1] Add `BRANCH_COUNTRY_CURRENCY_MAP`, `countryOptions`, and `currencyOptions` constants in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`
- [X] T007 [US1] Add `handleCountryChange` handler inside the component function in `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — updates both `branchCountry` and `branchCurrency` via `onChange`
- [X] T008 [US1] Replace workspace context row's country/currency display with name-only row (`Workspace: Mustafa's Co.` + `(Read-only)`) in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`
- [X] T009 [US1] Add Branch country `<select>` (bound to `data.branchCountry`, using `handleCountryChange`) in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`
- [X] T010 [US1] Add Branch currency `<select>` (bound to `data.branchCurrency`, using inline `onChange`) in `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — place both selects in a `grid gap-5 sm:grid-cols-2` row below Store Display Name and Main Branch
- [X] T011 [US1] Add contextual note paragraph below the selects in `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — explaining branch scope and Settings → Branches
- [X] T012 [US1] Update live preview card in `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — replace workspace country/currency rows with `data.branchCurrency` (Badge) and `data.branchCountry` (text), update row labels to "Branch currency" and "Branch country"

**Checkpoint**: Step 3 fully functional. Country→currency auto-suggest works. Manual currency override preserved. Note visible. Live preview updated.

---

## Phase 4: User Story 2 — Step 4 Review: Show Branch Country and Currency (Priority: P1)

**Goal**: Review step shows "Branch country" and "Branch currency" summary cards with values from Step 3. No unqualified "Country" or "Currency" labels appear.

**Independent Test**: Complete Steps 1–3 selecting "Kuwait" for branch country (currency auto-sets to "KWD"). On Step 4 Review, verify "Branch country" card shows "Kuwait" and "Branch currency" card shows "KWD". Verify no unqualified country/currency label exists in the summary.

### Implementation for User Story 2

- [X] T013 [US2] Remove `workspaceCountry` and `workspaceCurrency` from `StepReviewProps` interface in `apps/shops-app/components/onboarding/StepReview.tsx`
- [X] T014 [US2] Update `buildSummary` function signature in `apps/shops-app/components/onboarding/StepReview.tsx` — remove `workspaceCountry`/`workspaceCurrency` params; replace "Workspace country"/"Currency" items with `{ label: "Branch country", value: setup.branchCountry, icon: "map-pin" }` and `{ label: "Branch currency", value: setup.branchCurrency, icon: "banknote" }`
- [X] T015 [US2] Update `buildSummary` call site in `apps/shops-app/components/onboarding/StepReview.tsx` — remove workspace args, call as `buildSummary(businessType, salesModel, setup)`
- [X] T016 [US2] Update `StepReview` function destructuring in `apps/shops-app/components/onboarding/StepReview.tsx` — remove `workspaceCountry`/`workspaceCurrency` from props destructure

**Checkpoint**: Review step shows branch-scoped labels. No workspace-derived country/currency visible.

---

## Phase 5: User Story 3 — Orchestrator: Remove Workspace Derivation (Priority: P2)

**Goal**: `app/onboarding/page.tsx` no longer reads `core_workspace_country` from session or derives currency. It initializes `storeSetup` with `branchCountry: "Egypt"` and `branchCurrency: "EGP"`. `handleContinue` (step 3) and `handleFinish` write branch values to session. Workspace props removed from step renders.

**Independent Test**: Complete workspace onboarding with country "Egypt", then run Shops onboarding. Shops Step 3 shows the default "Egypt" / "EGP" but these come from local default — not from workspace session. Changing workspace country in a different session has no effect on Shops Step 3 values.

### Implementation for User Story 3

- [X] T017 [US3] Remove module-level constants `COUNTRY_CURRENCY_MAP`, `DEFAULT_WORKSPACE_COUNTRY`, `DEFAULT_WORKSPACE_CURRENCY`, and `getCurrencyForCountry` function from `apps/shops-app/app/onboarding/page.tsx`
- [X] T018 [US3] Remove `workspaceCountry` and `workspaceCurrency` derived state (the `useSessionValue` reading `core_workspace_country` and the `getCurrencyForCountry` call) from `apps/shops-app/app/onboarding/page.tsx`
- [X] T019 [US3] Update `storeSetup` initial state in `apps/shops-app/app/onboarding/page.tsx` — add `branchCountry: "Egypt"` and `branchCurrency: "EGP"` to the `useState<StoreSetupData>` initializer
- [X] T020 [US3] Update `handleContinue` (step 3 branch) in `apps/shops-app/app/onboarding/page.tsx` — replace `setCurrency(workspaceCurrency)` with `setCurrency(storeSetup.branchCurrency)` and `setCountry(workspaceCountry)` with `setCountry(storeSetup.branchCountry)`
- [X] T021 [US3] Update `handleFinish` in `apps/shops-app/app/onboarding/page.tsx` — same replacement: use `storeSetup.branchCurrency` and `storeSetup.branchCountry` wherever `workspaceCurrency`/`workspaceCountry` were used
- [X] T022 [US3] Remove `workspaceCountry={workspaceCountry}` and `workspaceCurrency={workspaceCurrency}` props from the `<StepStoreSetup>` render call in `apps/shops-app/app/onboarding/page.tsx`
- [X] T023 [US3] Remove `workspaceCountry={workspaceCountry}` and `workspaceCurrency={workspaceCurrency}` props from the `<StepReview>` render call in `apps/shops-app/app/onboarding/page.tsx`
- [X] T024 [US3] Remove unused imports (`getCountry`, `getCurrency` from `@/lib/mode`) from `apps/shops-app/app/onboarding/page.tsx` if no longer referenced after T017–T023

**Checkpoint**: Orchestrator compiles. No `core_workspace_country` read. Session writes use branch values. TypeScript strict mode reports zero errors across all 3 files.

---

## Phase 6: Polish & Validation

**Purpose**: Verify the implementation is complete, lint-clean, and type-safe.

- [X] T025 [P] Run `pnpm --filter shops-app lint` and fix any errors in the 3 modified files
- [X] T026 [P] Run `pnpm --filter shops-app build` — confirm zero TypeScript errors and zero build errors
- [ ] T027 Manually verify end-to-end in browser: complete all 4 Shops onboarding steps, check DevTools → Application → Session Storage for `shops_country` and `shops_currency` containing branch-level values

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — read files in parallel
- **Phase 2 (Foundational)**: Depends on Phase 1 reads — `StoreSetupData` extension BLOCKS all user story tasks
- **Phase 3 (US1)**: Depends on Phase 2 — all tasks sequential within file
- **Phase 4 (US2)**: Depends on Phase 2 — can run in parallel with Phase 3 (different file)
- **Phase 5 (US3)**: Depends on Phase 2 — can run after Phase 3 and Phase 4 are complete (orchestrator references both components)
- **Phase 6 (Polish)**: Depends on all prior phases

### User Story Dependencies

- **US1 (Phase 3)** and **US2 (Phase 4)**: Both depend only on the foundational type extension — can run in parallel since they touch different files
- **US3 (Phase 5)**: Must follow US1 and US2 — the orchestrator passes props to both step components; updating it last ensures components are ready

### Within Each Phase

- Tasks within Phase 3 are sequential (same file: StepStoreSetup.tsx)
- Tasks within Phase 4 are sequential (same file: StepReview.tsx)
- Tasks within Phase 5 are sequential (same file: page.tsx)
- Phase 6 T025 and T026 can run in parallel (lint and build are independent)

---

## Parallel Opportunities

```
Phase 1:
  T001 (StepStoreSetup.tsx read)
  T002 (StepReview.tsx read)       ← parallel with T001
  T003 (page.tsx read)             ← parallel with T001, T002

Phase 2:
  T004 (extend StoreSetupData)     ← unblocks all story phases

After Phase 2:
  Phase 3 (US1 — StepStoreSetup)  ← can run in parallel with Phase 4
  Phase 4 (US2 — StepReview)      ← can run in parallel with Phase 3
  Phase 5 (US3 — page.tsx)        ← after Phase 3 + Phase 4 complete

Phase 6:
  T025 (lint)                      ← parallel with T026
  T026 (build)                     ← parallel with T025
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 (read current state)
2. Complete Phase 2 (extend `StoreSetupData` — unblocks everything)
3. Complete Phase 3 (US1 — branch selects in Step 3)
4. Complete Phase 4 (US2 — branch labels in Step 4 Review)
5. Complete Phase 5 (US3 — orchestrator cleanup)
6. Complete Phase 6 (lint + build + browser verify)

All 3 user stories are required for this feature — US1 and US2 are P1, US3 is P2 (boundary enforcement). The feature is not shippable without US3 because the orchestrator still reads `core_workspace_country` if US3 is skipped.

---

## Notes

- No new packages — use native `<select>` elements with existing Tailwind classes
- No backend or API — all logic is client-side state in sessionStorage
- TypeScript strict mode enforces completeness: after T004, every affected callsite will fail type-check until resolved by subsequent tasks
- `getCountry`, `getCurrency` helpers in `apps/shops-app/lib/mode.ts` are NOT removed — they remain exported for dashboard components (`Topbar.tsx`, `StoreProfile.tsx`)
- Only the imports of these helpers in `page.tsx` are removed (if no longer needed there after T017–T021)
