# Tasks: Shops Onboarding Flow

**Input**: Design documents from `specs/015-shops-onboarding-flow/`
**Branch**: `015-shops-onboarding-flow`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

**Scope**: `apps/shops-app` only. UI-only. No new packages. No cross-app imports. All links within-app only.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US3)

---

## Phase 1: Setup

**Purpose**: AGENTS.md update — no code dependencies, run first.

- [x] T001 Update `AGENTS.md` SPECKIT block — set current feature to `015-shops-onboarding-flow`; update plan and spec paths accordingly

**Checkpoint**: AGENTS.md reflects the active feature.

---

## Phase 2: Foundational — sessionStorage Helpers (Prerequisite for All Stories)

**Purpose**: Extend `lib/mode.ts` with the three onboarding-state helpers. All three user stories depend on at least one of these exports. Must complete before any onboarding or dashboard changes.

- [x] T002 Update `apps/shops-app/lib/mode.ts` — add a new private constant `ONBOARDING_KEY = "shops_onboarding_done"` below the existing `KEY` constant; add three new exported functions following the identical window-guard pattern as `setMode`/`getMode`/`clearMode`: `completeOnboarding(): void` (calls `sessionStorage.setItem(ONBOARDING_KEY, "true")`), `isOnboardingComplete(): boolean` (returns `sessionStorage.getItem(ONBOARDING_KEY) === "true"`), `resetOnboarding(): void` (calls `sessionStorage.removeItem(ONBOARDING_KEY)`); all three MUST guard against SSR with `if (typeof window !== "undefined")` or equivalent; keep all existing exports unchanged

**Checkpoint**: Run `pnpm tsc --noEmit` in `apps/shops-app` — zero errors. All three new functions are exported and type-correct.

---

## Phase 3: User Story 1 — Multi-Step Onboarding Flow (Priority: P1) 🎯 MVP

**Goal**: `/onboarding` becomes a three-step flow (mode → profile → checklist) instead of navigating directly to `/dashboard` after mode selection.

**Independent Test**: Open `/onboarding`. A step indicator shows current step. Selecting a mode on Step 1 and clicking "Next" shows Step 2 (store profile). Clicking "Next" on Step 2 shows Step 3 (checklist). Clicking "Finish setup" navigates to `/dashboard`. Clicking "Back" on Step 2 returns to Step 1 with prior mode still highlighted. "Next" on Step 1 is disabled when no mode is selected.

- [x] T003 [US1] Initialize state shape and step indicator in `apps/shops-app/app/onboarding/page.tsx` — add three `useState` declarations at the top of `OnboardingPage` using lazy initializers: `const [isComplete, setIsComplete] = useState<boolean>(() => typeof window === "undefined" ? false : isOnboardingComplete())`, `const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)`, `const [selected, setSelected] = useState<ShopsMode | null>(() => typeof window === "undefined" ? null : getMode())`; add imports for `isOnboardingComplete`, `completeOnboarding` from `@/lib/mode`; add a step indicator JSX block above the step panels: three numbered pills (div containing `span "1"`, `span "2"`, `span "3"`) connected by `<div className="flex-1 h-px bg-white/10" />` spacers, where the pill for `currentStep` uses `bg-blue-600 text-white` and other pills use `border border-white/20 text-white/40 bg-transparent`; wrap the entire step content in `{isComplete ? <CompletionState /> : <StepFlow />}` — leave `<CompletionState>` and `<StepFlow>` as `null` placeholders for subsequent tasks

- [x] T004 [US1] Implement Step 1 panel in `apps/shops-app/app/onboarding/page.tsx` — replace the `null` StepFlow placeholder with a `{currentStep === 1 && ( … )}` block rendering the existing `ModeCard` list (same modes array from current implementation, reusing `ModeCard` from `@/components/onboarding/ModeCard`); add a `handleNext` function: when `currentStep === 1`, call `setMode(selected!)` then `setCurrentStep(2)`; when `currentStep === 2`, call `setCurrentStep(3)`; render a "Next →" button at the bottom of Step 1 with `disabled={!selected}` applying `cursor-not-allowed opacity-40` when disabled and `btn-primary` when enabled; add handlers for the button

- [x] T005 [US1] Implement Step 2 panel in `apps/shops-app/app/onboarding/page.tsx` — add a `{currentStep === 2 && ( … )}` block; define a `modeLabel` map inline: `{ business: "Business Management", store: "Storefront", both: "Both" }`; render an inline store profile card (`.card p-6`) showing: chip label `{"// store profile"}`, heading "Mustafa's Co.", and four detail rows each with an `Icon` + label: (`map-pin` → "Maadi Main"), (`banknote` → "EGP"), (`dashboard` → `modeLabel[selected ?? "both"]`), and a `chip border border-blue-500/20 bg-blue-500/10 text-blue-300` badge "Foundation setup"; render Back and "Next →" buttons below the card — Back calls `setCurrentStep(1)`, Next calls `handleNext()`

- [x] T006 [US1] Implement Step 3 panel in `apps/shops-app/app/onboarding/page.tsx` — add a `{currentStep === 3 && ( … )}` block; define a `checklistItems` constant array of 5 strings: `["Choose shop mode", "Add business profile", "Add first product", "Invite team member", "Review settings"]`; render an inline checklist card (`.card p-6`) with chip label `{"// setup checklist"}`, heading "Get started", progress line `"0 of 5 complete"` in `font-mono text-xs text-gray-500`, and a `<ul>` of items each showing a `<span className="h-4 w-4 rounded-full border-2 border-white/20 flex-shrink-0" />` + step text in `text-sm text-white/70`; render Back and "Finish setup" buttons — Back calls `setCurrentStep(2)`, "Finish setup" calls `handleFinish`; add `handleFinish`: calls `completeOnboarding()` then `router.push("/dashboard")`

**Checkpoint**: US1 complete — `/onboarding` shows 3-step flow; "Finish setup" navigates to `/dashboard`; no direct jump after mode selection.

---

## Phase 4: User Story 2 — Returning User Completion State (Priority: P2)

**Goal**: Users who have already finished onboarding see a "You're all set" card when they revisit `/onboarding`, not the three-step flow again.

**Independent Test**: Complete onboarding through "Finish setup". Then navigate directly to `/onboarding`. The step flow is not shown. A "You're all set" heading is visible with a "Continue to dashboard" link (`href="/dashboard"`). No step indicator visible.

- [x] T007 [US2] Implement completion state branch in `apps/shops-app/app/onboarding/page.tsx` — replace the `null` CompletionState placeholder (from T003) with a JSX block that renders when `isComplete === true`: centered layout inside `<main className="mx-auto max-w-md px-4 pb-16 pt-14 text-center">`; chip label `{"// onboarding complete"}`; an `h1` "You&apos;re all set"; a paragraph "Your shop is configured and ready to use."; an `<a href="/dashboard" className="btn-primary inline-block mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white">Continue to dashboard →</a>`; the step indicator block from T003 must NOT render when `isComplete === true` — wrap the indicator in `{!isComplete && ( … )}`

**Checkpoint**: US2 complete — revisiting `/onboarding` after completing setup shows completion state; the step flow and step indicator are hidden.

---

## Phase 5: User Story 3 — Dashboard Safe State for Missing Mode (Priority: P1)

**Goal**: `/dashboard` renders a setup prompt card (not operations content) when `shops_mode` is absent from sessionStorage. Shows a soft banner when mode exists but `shops_onboarding_done` is absent.

**Independent Test**: Open a fresh session tab; navigate directly to `/dashboard`. Only a "Complete your setup" prompt card is visible — no stat cards, no orders table, no quick actions. The prompt card has a "Start setup →" link pointing to `/onboarding`. Separately, in a session where mode is set but onboarding is not complete, a soft amber banner appears above the dashboard content.

- [x] T008 [P] [US3] Update `apps/shops-app/app/(app)/dashboard/page.tsx` — add imports: `getMode`, `isOnboardingComplete`, `type ShopsMode` from `@/lib/mode`; add two lazy useState values at the top of `DashboardPage` (after the existing `period` state): `const [mode] = useState<ShopsMode | null>(() => typeof window === "undefined" ? null : getMode())` and `const [onboardingDone] = useState<boolean>(() => typeof window === "undefined" ? false : isOnboardingComplete())`; add the missing-mode guard: immediately after the `useState` declarations and before the return statement, add nothing — instead, in the `return` block, wrap all existing JSX in `{mode !== null ? ( … all existing content … ) : ( <SetupPromptCard /> )}`; the `SetupPromptCard` is inline JSX: a `<div className="flex min-h-[60vh] items-center justify-center">` containing a `.card max-w-md p-8 text-center` with chip `{"// getting started"}`, `h2` "Complete your setup to get started", `p` "Select your shop mode and finish the setup flow to unlock your dashboard.", and `<a href="/onboarding" className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white">Start setup →</a>`; additionally, when `mode !== null && !onboardingDone`, render a slim banner above the main header div: `<div className="mb-4 rounded-xl border border-amber-500/15 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-400/80">Setup not complete · <a href="/onboarding" className="underline hover:text-amber-300">Finish setup</a></div>`

**Checkpoint**: US3 complete — fresh-session `/dashboard` shows prompt card only; mode-set-but-incomplete session shows banner; fully onboarded session shows no banner.

---

## Phase 6: Polish & Build Gate

**Purpose**: Lint and build to confirm zero errors across all user stories.

- [x] T009 Run `pnpm lint` in `apps/shops-app` — fix all errors
- [x] T010 Run `pnpm --filter shops-app build` — must exit 0

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (AGENTS.md)         → no deps
T002 (lib/mode.ts)       → no deps; blocks T003–T008 (all need new exports)

T003 (state + indicator) → depends on T002
T004 (Step 1 panel)      → depends on T003 (same file, sequential)
T005 (Step 2 panel)      → depends on T004 (same file, sequential)
T006 (Step 3 + Finish)   → depends on T005 (same file, sequential)
T007 (completion state)  → depends on T003 (needs isComplete branch structure)

T008 (dashboard guard)   → depends on T002; [P] with T003–T007 (different file)

T009 (lint)              → depends on T006 + T007 + T008 all complete
T010 (build)             → depends on T009
```

### Parallel Opportunities

```
T001 ─┐
T002 ─┘  (can run in parallel — different files)

After T002:
  T003 → T004 → T005 → T006   (onboarding page — sequential, same file)
                └─→ T007       (completion state — follows T003 branch setup)
  T008                         ([P] with all of the above — different file)

After T006 + T007 + T008 → T009 → T010
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010
```

---

## Implementation Strategy

### MVP First (US1 + US3 — flow works end-to-end, dashboard is safe)

1. T001 (AGENTS.md)
2. T002 (lib/mode.ts helpers)
3. T003 (state shape + step indicator structure)
4. T004 (Step 1 — mode selection)
5. T005 (Step 2 — store profile)
6. T006 (Step 3 — checklist + Finish)
7. **STOP and VALIDATE**: `/onboarding` 3-step flow is end-to-end functional
8. T008 (dashboard guard)
9. **STOP and VALIDATE**: Direct `/dashboard` navigation is safe
10. T007 (completion state for returning user)
11. T009 + T010 (lint + build)

### Incremental Delivery

1. T001 + T002 → Session helpers ready
2. + T003 + T004 → Step 1 functional (mode selection persists)
3. + T005 → Step 2 functional (profile review)
4. + T006 → Step 3 functional (Finish setup works end-to-end) — US1 complete
5. + T007 → Returning user handled — US2 complete
6. + T008 → Dashboard is safe — US3 complete
7. T009 + T010 → Feature ships

---

## Notes

- T002: Run `pnpm tsc --noEmit` in `apps/shops-app` immediately after to confirm the three new exports compile cleanly before touching any page files
- T003: The lazy `useState` for `isComplete` must use `() => typeof window === "undefined" ? false : isOnboardingComplete()` — not `useEffect` — to match the established pattern and avoid lint violations
- T003: The lazy `useState` for `selected` uses `getMode()` so that if a user refreshes on Step 2 or 3 (after mode was stored in Step 1), returning to Step 1 shows their previously selected card highlighted
- T004: `handleNext` must call `setMode(selected!)` before advancing step — only on Step 1; Steps 2→3 just advance the counter
- T006: `handleFinish` calls `completeOnboarding()` (not `setMode`) — mode was already persisted in `handleNext` at Step 1
- T007: The step indicator (`{!isComplete && ( … )}`) wrapping must be applied in T007 because T003 renders the indicator unconditionally; T007 is the task that adds the `isComplete` guard around it
- T008: The setup prompt card uses `href="/onboarding"` (not `href="#"`) — this is a real within-app link per spec FR-009
- T008: The soft banner also uses `href="/onboarding"` (not `href="#"`)
- T009/T010: Both lint and build must exit 0 before marking the feature complete
