# Tasks: Shops Onboarding Flow QA

**Input**: Design documents from `specs/016-onboarding-flow-qa/`
**Branch**: `016-onboarding-flow-qa`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

**Scope**: `apps/shops-app` only. QA/polish only. Fix only confirmed issues. No new packages. No cross-app imports.

**Audit findings** (from research.md):
- ✅ **FIX**: Step heading is static — `StepFlow` always shows "Choose your shop mode" (FR-001)
- ✅ **FIX**: Topbar branch is hardcoded — `Topbar.tsx` does not read `getBranch()` (confirmed UX inconsistency)
- 7 other areas PASS — no action needed

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US5)

---

## Phase 1: Setup

- [X] T001 Update `AGENTS.md` SPECKIT block — set current feature to `016-onboarding-flow-qa`; update plan and spec paths accordingly

**Checkpoint**: AGENTS.md reflects the active feature.

---

## Phase 2: User Story 1 — Forward Flow Fix (Priority: P1) 🎯 MVP

**Goal**: The main page heading in `/onboarding` reflects the current step — not always "Choose your shop mode".

**Independent Test**: Open `/onboarding`, Step 1 shows heading "Choose your shop mode". Click Next →, Step 2 shows heading "Set up your store". Click Next →, Step 3 shows heading "Review your setup". All three headings are visually distinct from each other.

- [X] T002 [US1] Fix per-step heading in `apps/shops-app/app/onboarding/page.tsx` — add a `stepContent` constant of type `Record<OnboardingStep, { heading: string; subtitle: string }>` with values: `1: { heading: "Choose your shop mode", subtitle: "Select how you want to use NexoraXS Shops. You can change this later in Settings." }`, `2: { heading: "Set up your store", subtitle: "Choose a branch and default currency. You can update these later in Settings." }`, `3: { heading: "Review your setup", subtitle: "Confirm the details below before entering your dashboard." }`; in the `StepFlow` component's top header section (the `<div className="mb-10 text-center">` block), replace the hardcoded `<h1>` text and `<p>` text with `{stepContent[currentStep].heading}` and `{stepContent[currentStep].subtitle}`; `stepContent` must be passed as a prop to `StepFlow` or defined inside it — prefer defining it inside `StepFlow` since `currentStep` is already a prop; no other changes to this file

**Checkpoint**: US1 fix applied — each step shows its own heading; TypeScript compiles cleanly (`pnpm tsc --noEmit` in `apps/shops-app`).

---

## Phase 3: User Story 4 — Dashboard Session Reads (Priority: P1)

**Goal**: The Topbar branch selector reads the user's chosen branch from sessionStorage instead of always showing "Maadi Main".

**Independent Test**: Complete onboarding with branch = "Nasr City". Arrive at `/dashboard`. The Topbar branch selector shows "Nasr City", not "Maadi Main". The StoreProfile card also shows "Nasr City" (already correct — no change needed there).

- [X] T003 [P] [US4] Fix hardcoded branch in `apps/shops-app/components/dashboard/Topbar.tsx` — add `useSyncExternalStore` to the `react` import; add `getBranch` to the import from `@/lib/mode`; inside the `Topbar` function, add: `const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)` and `const branch = mounted ? (getBranch() ?? "Maadi Main") : "Maadi Main"`; replace the hardcoded `"Maadi Main"` string in the branch selector JSX (the `<div className="text-xs font-medium text-white">Maadi Main</div>`) with `{branch}`; no other changes to this file

**Checkpoint**: US4 fix applied — Topbar branch is dynamic; TypeScript compiles cleanly.

---

## Phase 4: User Story 2 — Back Navigation Verification (Priority: P1)

**Goal**: Confirm by code inspection that Back navigation preserves all selections. No code change expected.

**Independent Test**: Read `handleBack`, `resolvedSelected`, `resolvedBranch`, `resolvedCurrency` in `app/onboarding/page.tsx`. If state is preserved across step changes, mark PASS.

- [X] T004 [P] [US2] Inspect `apps/shops-app/app/onboarding/page.tsx` — read `handleBack` handler (it should only decrement `currentStep`, not reset any selection state), `resolvedSelected = selected ?? persistedSelected` (fallback to sessionStorage ensures prior mode stays visible on return to Step 1), `resolvedBranch = branch ?? persistedBranch ?? "Maadi Main"` (branch local state persists across step changes), `resolvedCurrency = currency ?? persistedCurrency ?? "EGP"` (same for currency); if all three patterns confirm state preservation, mark **PASS — no change needed**; if any pattern resets state unexpectedly, fix it and describe the fix in a comment here

**Checkpoint**: US2 verified — Back navigation is stateful; mark PASS or document fix.

---

## Phase 5: User Story 3 — Returning User Completion State Verification (Priority: P2)

**Goal**: Confirm by code inspection that the completion state renders correctly and hides the step indicator. No code change expected.

**Independent Test**: Read the render tree in `OnboardingPage` — confirm `isComplete` gates the entire flow and that `CompletionState` contains no `StepIndicator`. Confirm "Continue to dashboard →" uses `href="/dashboard"`.

- [X] T005 [P] [US3] Inspect `apps/shops-app/app/onboarding/page.tsx` — read the `OnboardingPage` render: the `isComplete ? <CompletionState /> : <StepFlow .../>` branch; confirm `<StepIndicator>` appears only inside `<StepFlow>` and is absent from `<CompletionState>`; confirm `CompletionState` renders `<a href="/dashboard">Continue to dashboard →</a>` (not `href="#"`); confirm `isComplete` is derived from `mounted ? isOnboardingComplete() : false` (correct SSR guard); if all pass, mark **PASS — no change needed**; if any issue is found, fix it

**Checkpoint**: US3 verified — completion state is correct; mark PASS or document fix.

---

## Phase 6: User Story 5 — Hydration and Mobile Layout Verification (Priority: P2)

**Goal**: Confirm hydration pattern is correct across all modified files and mobile grid collapses properly at 375px.

**Independent Test**: Read `useSyncExternalStore` usage in `onboarding/page.tsx` and `dashboard/page.tsx`. Check `sm:grid-cols-3` grid classes in Step 2 branch/currency selectors.

- [X] T006 [P] [US5] Inspect `apps/shops-app/app/onboarding/page.tsx` and `apps/shops-app/app/(app)/dashboard/page.tsx` — confirm each uses `useSyncExternalStore(() => () => {}, () => true, () => false)` for mount detection with the server snapshot returning `false`; confirm Step 2 branch/currency grids use `grid gap-3 sm:grid-cols-3` (which collapses to single column at 375px where `sm` = 640px breakpoint); if all patterns are correct, mark **PASS — no change needed**; if hydration pattern is incorrect, apply the fix following the same approach as `NextSteps.tsx` and `StoreProfile.tsx`

**Checkpoint**: US5 verified — hydration pattern is correct, mobile grid collapses; mark PASS or document fix.

---

## Phase 7: Build Gate

**Purpose**: Confirm zero errors after both fixes.

- [X] T007 Run `pnpm lint` in `apps/shops-app` — fix all errors
- [X] T008 Run `pnpm --filter shops-app build` — must exit 0; confirm all pages compile

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (AGENTS.md)          → no deps
T002 (heading fix)        → no deps on other tasks (different file from T003)
T003 (Topbar fix)         → [P] with T002 (different file)
T004 (back nav verify)    → [P] with T002, T003 (inspection only)
T005 (completion verify)  → [P] with T002, T003 (inspection only)
T006 (hydration verify)   → [P] with T002, T003 (inspection only)
T007 (lint)               → depends on T002 + T003 complete
T008 (build)              → depends on T007
```

### Parallel Opportunities

```
T001 (setup)

T002 ─┐
T003 ─┤  (different files — fully parallel)
T004 ─┤  (inspection — no file writes)
T005 ─┤  (inspection — no file writes)
T006 ─┘  (inspection — no file writes)

→ T007 → T008
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008
```

---

## Implementation Strategy

### MVP First (US1 + US4 — the two confirmed fixes)

1. T001 (AGENTS.md)
2. T002 (per-step heading fix — US1) + T003 (Topbar branch fix — US4) in parallel
3. **STOP and VALIDATE**: Run `pnpm tsc --noEmit` — zero errors
4. T004 + T005 + T006 (verification passes — mark PASS or apply minimal fix)
5. T007 (lint) → T008 (build)

### Verification-First Approach

For T004, T005, T006 — always read the code first, compare against the expected behavior in the spec, and only write a fix if an issue is found. If the code matches the expected behavior, mark the task as PASS with no change.

---

## Notes

- T002: The `stepContent` map should be defined inside `StepFlow` (not at module scope) since `currentStep` is a prop — but it can also be defined outside and indexed by `currentStep`. Either is fine; prefer whichever avoids prop drilling.
- T002: Do NOT change the chip label `{"// onboarding"}` — it remains on all steps.
- T003: The Topbar already imports from `react` (`useState` is not imported but the import is `"use client"` only). Check the current imports before adding — avoid duplicates.
- T003: Only the branch label text changes — the store selector, currency, search input, POS button, bell, and avatar are all unchanged.
- T004–T006: These are inspection tasks. If the code matches the spec exactly, mark the task as `[x]` PASS immediately without writing any code.
- T007/T008: Both must exit 0. If lint fails due to an unused import from a prior task, fix it before marking T007 done.
