# Tasks: Onboarding Country & Currency From Workspace

**Input**: Design documents from `/specs/022-onboarding-country-currency-from-workspace/`
**Branch**: `023-onboarding-country-currency-from-workspace`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete task dependencies)
- **[Story]**: Which user story this task belongs to (US1–US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: The `StoreSetupData` interface simplification is the blocking prerequisite — removing `currency` and `country` fields causes TypeScript errors in every Shops file that touches this type. Do this first to surface all affected callsites.

- [X] T001 Simplify `StoreSetupData` interface in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`: remove `currency: string` and `country: string` fields, leaving only `{ storeName: string; branch: string }`

**Checkpoint**: TypeScript now errors on `storeSetup.currency` and `storeSetup.country` in the shops orchestrator page and `StepReview` — those errors guide all downstream Shops tasks.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The Core Platform type rename (`WorkspaceSetup.currency → country`) blocks US1 tasks and enables the standalone session key addition.

- [X] T002 [P] Update `WorkspaceSetup` interface in `apps/core-platform/lib/session.ts`: replace `currency: string` with `country: string`; add `saveWorkspaceCountry(country: string): void` helper that writes `sessionStorage.setItem("core_workspace_country", country)`

**Checkpoint**: TypeScript errors in `apps/core-platform/app/onboarding/page.tsx` now surface all `currency` references to fix.

---

## Phase 3: User Story 1 — Core Platform: Country Instead of Currency (Priority: P1) 🎯 MVP

**Goal**: Replace Currency with Country in Core Platform onboarding — remove Currency select, add Country select (Egypt / Saudi Arabia / United Arab Emirates / Kuwait / Qatar), update Step 3 review card, write `core_workspace_country` standalone session key on completion.

**Independent Test**: Open `http://localhost:3001/onboarding` in a fresh session. Step 1 shows workspace name, slug, Country select (Egypt/SA/UAE/Kuwait/Qatar), and Region select — no Currency field. Step 3 review shows "Country" card with the chosen value. After clicking "Continue to dashboard", DevTools → Session Storage shows both `core_workspace_setup` (JSON with `country`) and `core_workspace_country` (plain string). No `currency` key exists.

- [X] T003 [US1] In `apps/core-platform/app/onboarding/page.tsx`: remove `currencyOptions` constant and `CurrencyValue` type alias; add `countryOptions` (Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar) and `CountryValue` type alias; add import of `saveWorkspaceCountry` from `@/lib/session`
- [X] T004 [US1] In `apps/core-platform/app/onboarding/page.tsx`: replace `const [currency, setCurrency] = useState<CurrencyValue>("EGP")` with `const [country, setCountry] = useState<CountryValue>("Egypt")`
- [X] T005 [US1] In `apps/core-platform/app/onboarding/page.tsx` Step 1 JSX: replace the Currency `<label>`+`<select>` block with a Country `<label>`+`<select>` using `countryOptions`, icon `globe`, `value={country}`, `onChange={setCountry}`; update the info note to replace "Currency is the workspace billing default" with "Country sets your workspace's primary operating region"
- [X] T006 [US1] In `apps/core-platform/app/onboarding/page.tsx` Step 3 JSX: replace `<SummaryCard icon="trending-up" label="Currency" value={currency} />` with `<SummaryCard icon="globe" label="Country" value={country} />`
- [X] T007 [US1] In `apps/core-platform/app/onboarding/page.tsx` `handleContinue` step 3 branch: replace `currency` with `country` in `saveWorkspaceSetup({ ..., currency, ... })` call; add `saveWorkspaceCountry(country)` call after `saveWorkspaceSetup`

**Checkpoint**: US1 done when Step 1 has no Currency, Step 3 shows Country, and both session keys are written. TypeScript passes with zero errors.

---

## Phase 4: User Story 2 — Shops Step 3: Inherited Country and Currency (Priority: P1)

**Goal**: Remove editable Country and Currency selects from Shops Step 3. Add workspace context display (name, country, derived currency — all read-only). Add `workspaceCountry`/`workspaceCurrency` props to `StepStoreSetup`. Wire derived values in the orchestrator page. Write derived values to session on Continue.

**Independent Test**: Navigate to Shops onboarding Step 3. The workspace context row shows "Mustafa's Co.", the workspace country (from session or "Egypt" default), and the derived currency ("EGP" for Egypt). No Country dropdown, no Currency dropdown. Filling store name and branch and clicking "Continue" writes `shops_country` and `shops_currency` to session with the derived values.

- [X] T008 [US2] In `apps/shops-app/app/onboarding/page.tsx`: add `COUNTRY_CURRENCY_MAP` constant, `DEFAULT_WORKSPACE_COUNTRY = "Egypt"`, `DEFAULT_WORKSPACE_CURRENCY = "EGP"`, and `getCurrencyForCountry(country: string): string` function at module level
- [X] T009 [US2] In `apps/shops-app/app/onboarding/page.tsx`: add `workspaceCountry` and `workspaceCurrency` derived state using the existing `useSessionValue` hook pattern — `workspaceCountry` reads `sessionStorage.getItem("core_workspace_country")` with `DEFAULT_WORKSPACE_COUNTRY` fallback; `workspaceCurrency = getCurrencyForCountry(workspaceCountry)`
- [X] T010 [US2] In `apps/shops-app/app/onboarding/page.tsx`: update `storeSetup` initial `useState` to remove `currency` and `country` fields (leaving only `storeName` and `branch`); remove unused `persistedCurrency` and `persistedCountry` session reads and their getter imports (`getCurrency`, `getCountry`) if they are not referenced elsewhere
- [X] T011 [US2] In `apps/shops-app/app/onboarding/page.tsx`: update `handleContinue` step 3 block — replace `setCurrency(storeSetup.currency)` with `setCurrency(workspaceCurrency)` and `setCountry(storeSetup.country)` with `setCountry(workspaceCountry)`; update `handleFinish` block with the same replacement pair
- [X] T012 [US2] In `apps/shops-app/components/onboarding/StepStoreSetup.tsx`: add `workspaceCountry: string` and `workspaceCurrency: string` to `StepStoreSetupProps` interface; remove `currencyOptions` and `countryOptions` constants; update workspace context row to show `{workspaceCountry} · {workspaceCurrency}` below the workspace name; remove the two-column grid block containing Currency and Country selects; update live preview card to show `workspaceCurrency` (Badge) and `workspaceCountry` text as display-only rows
- [X] T013 [US2] In `apps/shops-app/app/onboarding/page.tsx`: pass `workspaceCountry={workspaceCountry}` and `workspaceCurrency={workspaceCurrency}` to the `<StepStoreSetup>` render call

**Checkpoint**: US2 done when Step 3 shows no editable Country/Currency inputs, shows inherited values in the workspace context row, and Continue writes derived session values.

---

## Phase 5: User Story 3 — Shops Review: Inherited Labels (Priority: P1)

**Goal**: Update Shops Step 4 Review to display inherited workspace country and derived currency using the new props. Remove references to `setup.country` and `setup.currency` (which no longer exist on `StoreSetupData`).

**Independent Test**: Complete all 4 Shops onboarding steps. Review step shows: Workspace ("Mustafa's Co."), Workspace country (session country or "Egypt"), Business Type, Sales Model, Store Name, Main Branch, Currency (derived). No unqualified "Country" label, no editable fields.

- [X] T014 [US3] In `apps/shops-app/components/onboarding/StepReview.tsx`: add `workspaceCountry: string` and `workspaceCurrency: string` to `StepReviewProps` interface; update `buildSummary` function signature to accept these two new params; replace `{ label: "Country", value: setup.country }` with `{ label: "Workspace country", value: workspaceCountry }`; replace `{ label: "Currency", value: setup.currency }` with `{ label: "Currency", value: workspaceCurrency }`; update the `buildSummary` call site inside `StepReview` to pass the new params
- [X] T015 [US3] In `apps/shops-app/app/onboarding/page.tsx`: pass `workspaceCountry={workspaceCountry}` and `workspaceCurrency={workspaceCurrency}` to the `<StepReview>` render call

**Checkpoint**: US3 done when Review shows "Workspace country" and "Currency" (derived) with no unqualified "Country" label and no editable inputs.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint, typecheck, and build verification for both apps.

- [X] T016 [P] Run `pnpm --filter core-platform lint` and fix any errors in modified files
- [X] T017 [P] Run `pnpm --filter shops-app lint` and fix any errors in modified files
- [X] T018 Run `pnpm --filter core-platform tsc --noEmit` (or equivalent typecheck) and confirm zero TypeScript errors — all `currency` references in core-platform onboarding should be gone
- [X] T019 Run `pnpm --filter shops-app tsc --noEmit` (or equivalent typecheck) and confirm zero TypeScript errors — `StoreSetupData.currency` and `StoreSetupData.country` references should be gone
- [X] T020 Run `pnpm --filter core-platform build` and confirm `/onboarding` and `/dashboard/apps` appear in compiled routes with zero errors
- [X] T021 Run `pnpm --filter shops-app build` and confirm `/onboarding` appears in compiled routes with zero errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (T001)**: No dependencies — start here; removes fields from `StoreSetupData`, compiler errors guide Shops tasks
- **Foundational (T002)**: No dependency on T001 — parallel with T001 (different apps); renames `WorkspaceSetup`, compiler errors guide Core Platform tasks
- **US1 (T003–T007)**: Depends on T002; T003–T006 are each independent of each other (same file, no ordering required); T007 depends on T003 (import must exist before use)
- **US2 (T008–T013)**: Depends on T001; T008–T009 are independent; T010 depends on T009 (state depends on derived values); T011 depends on T010; T012 and T013 can run in parallel (different files)
- **US3 (T014–T015)**: Depends on T001 (StoreSetupData simplified); T014 and T015 can run in parallel (different files) once T001 is done
- **Polish (T016–T021)**: Depends on all story phases complete

### User Story Dependencies

- **US1**: After T002 (foundational type rename)
- **US2**: After T001 (StoreSetupData simplified); independent of US1 (different app)
- **US3**: After T001 (StoreSetupData simplified); independent of US1; T015 depends on T009 (workspaceCountry derived state must exist in page)

### Parallel Opportunities

- T001 and T002 can run in parallel (different apps)
- T003, T004, T005, T006 can run in parallel within US1 (all edit the same file but do not depend on each other — take care with concurrent editing)
- T012 and T013 can run in parallel (different files: StepStoreSetup.tsx vs page.tsx)
- T014 and T015 can run in parallel (different files: StepReview.tsx vs page.tsx) once T001 is done
- T016 and T017 can run in parallel (different apps)

---

## Parallel Example: Phase 1 + 2 Setup

```
Parallel batch:
  T001 — apps/shops-app/components/onboarding/StepStoreSetup.tsx (remove currency/country from interface)
  T002 — apps/core-platform/lib/session.ts (rename currency→country, add saveWorkspaceCountry)
```

## Parallel Example: US2 Shops Step 3 Completion

```
After T001 + T008–T011 complete:
Parallel batch:
  T012 — apps/shops-app/components/onboarding/StepStoreSetup.tsx (props + UI)
  T013 — apps/shops-app/app/onboarding/page.tsx (pass new props to StepStoreSetup)
```

---

## Implementation Strategy

### MVP First (US1 alone)

1. T002 → type foundation
2. T003–T007 → Core Platform currency→country complete
3. **STOP and VALIDATE**: Core Platform onboarding shows Country, writes `core_workspace_country`

### Full QA Pass (all 3 stories)

1. T001 + T002 in parallel → type foundations
2. T003–T007 → US1 Core Platform (5 tasks, mostly parallel)
3. T008–T013 → US2 Shops Step 3 (6 tasks)
4. T014–T015 → US3 Shops Review (2 tasks)
5. T016–T021 → lint + typecheck + build both apps

---

## Notes

- T001 is the most important setup task — it causes TypeScript to fail on `storeSetup.currency` and `storeSetup.country`, acting as a built-in checklist for all Shops changes
- T002 is the most important foundational task — it causes TypeScript to fail on `currency` in core-platform onboarding page, acting as a built-in checklist for US1
- `core_workspace_country` is written as both part of the JSON blob (`core_workspace_setup`) and as a standalone string key — Shops reads the standalone key for simplicity
- The `useSessionValue` hook in `apps/shops-app/app/onboarding/page.tsx` already exists — reuse it for `workspaceCountry` with an inline getter `() => sessionStorage.getItem("core_workspace_country")`
- `shops_country` and `shops_currency` session keys are preserved (written from derived values in handleContinue/handleFinish) — backward compatible with any existing readers
- No new files created; no new routes added
