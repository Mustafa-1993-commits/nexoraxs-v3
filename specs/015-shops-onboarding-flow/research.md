# Research: Shops Onboarding Flow

**Feature**: 015-shops-onboarding-flow
**Date**: 2026-05-13

No external research agents needed — all decisions are resolved from existing codebase knowledge and established patterns. This document records the technical choices made during planning.

---

## Decision 1: Multi-Step State Management

**Decision**: Manage `currentStep` (values `1 | 2 | 3`) as React `useState` inside `OnboardingPage`. Not persisted to sessionStorage.

**Rationale**: Step position is transient UI state — not meaningful across refreshes. Only the *outcomes* of the flow (mode selection, onboarding completion) need persistence. A refresh during Step 2 or Step 3 restarts from Step 1, which is correct UX: mode has already been stored by Step 1's "Next" click, so Step 1 will re-show the previously selected mode via lazy useState.

**Alternatives considered**:
- URL params (`?step=2`): Creates back-button ambiguity and exposes internal state in the URL. Rejected — spec says no new routes.
- sessionStorage step tracking: Adds unnecessary persistence for transient UI state. Rejected.

---

## Decision 2: Onboarding Completion Detection (SSR Safety)

**Decision**: Use lazy `useState` to read `isOnboardingComplete()` in components that need it:
```
useState<boolean>(() => typeof window === "undefined" ? false : isOnboardingComplete())
```

**Rationale**: Mirrors the existing `getMode()` lazy useState pattern established across all shops-app client components. Avoids `react-hooks/set-state-in-effect` lint errors that occur with `useEffect` reads. Guards against SSR crashes when `window` is unavailable.

**Alternatives considered**:
- `useEffect(() => { setDone(isOnboardingComplete()); }, [])`: Works but triggers a lint violation and causes a flash-of-wrong-content on hydration. Rejected.

---

## Decision 3: lib/mode.ts Extension

**Decision**: Add three new exports to `lib/mode.ts` using key `"shops_onboarding_done"`:

```
ONBOARDING_KEY = "shops_onboarding_done"
completeOnboarding() → sessionStorage.setItem(ONBOARDING_KEY, "true")
isOnboardingComplete() → sessionStorage.getItem(ONBOARDING_KEY) === "true"
resetOnboarding() → sessionStorage.removeItem(ONBOARDING_KEY)
```

**Rationale**: Follows identical structure to existing `shops_mode` helpers. Keeps all session state in one file. `resetOnboarding()` is included for developer/testing utility even if not surfaced in UI.

**Alternatives considered**:
- Separate `onboarding.ts` file: Unnecessary file split for three small functions. Rejected.
- localStorage: Spec requires sessionStorage only. Rejected.

---

## Decision 4: Step 2 and Step 3 — Inline vs. Component Import

**Decision**: Step 2 (store profile) and Step 3 (checklist) render their content **inline within `OnboardingPage`** — they do NOT import `StoreProfile.tsx` or `SetupChecklist.tsx` from `components/dashboard/`.

**Rationale**: Those components were designed for the dashboard context and have dashboard-specific styling (`.card` wrapper, chip labels matching dashboard conventions). Importing them into the onboarding page would create a dependency from an onboarding page on dashboard components, making both harder to change independently. The content (profile fields, checklist items) is duplicated as constants — acceptable at this scale.

**Alternatives considered**:
- Shared `components/onboarding/StepProfile.tsx` and `components/onboarding/StepChecklist.tsx`: Correct architecture if these steps grew complex. Acceptable for this feature but adds two files with minimal logic. Deferred — inline is simpler.
- Import from `components/dashboard/`: Creates wrong directional dependency. Rejected.

---

## Decision 5: Dashboard Missing-Mode Guard

**Decision**: The dashboard renders two lazy useState values: `mode` (from `getMode()`) and `onboardingDone` (from `isOnboardingComplete()`). Guard logic:
- `mode === null` → show setup prompt card with link to `/onboarding` (hard block)
- `mode !== null && !onboardingDone` → show full operations content + a subtle "finish setup" banner (soft nudge, low priority)
- `mode !== null && onboardingDone` → show full operations content; no banner

**Rationale**: Spec US3 Scenario 4 specifies the soft nudge as a "soft warning, not a blocker" and notes it is low priority. The hard block (missing mode) is the critical safety net.

**Alternatives considered**:
- Redirect to `/onboarding` from dashboard middleware: Requires server-side session reading which is unavailable (sessionStorage is client-only). Rejected.
- Show all content regardless: The spec explicitly requires the missing-mode guard. Rejected.

---

## Decision 6: Onboarding Page Structure — Single useState for Step + Completion

**Decision**: `OnboardingPage` has two primary state values:
1. `isComplete: boolean` — lazy init from `isOnboardingComplete()`, determines whether to show completion state or multi-step flow
2. `currentStep: 1 | 2 | 3` — step within the flow (only relevant when `!isComplete`)
3. `selected: ShopsMode | null` — mode selected in Step 1 (lazy init from `getMode()` so a refresh on Step 2+ shows the previously selected mode)

**Rationale**: Clean separation — completion state gates the entire flow; step tracks position within it; selected persists the mode choice across steps.

---

## Decision 7: Files Modified vs. Created

**Modified** (3 files):
- `apps/shops-app/lib/mode.ts` — add 3 exports
- `apps/shops-app/app/onboarding/page.tsx` — full rewrite to multi-step flow
- `apps/shops-app/app/(app)/dashboard/page.tsx` — add missing-mode guard + optional soft banner

**Not modified** (components remain unchanged):
- `components/onboarding/ModeCard.tsx` — used as-is in Step 1 (props unchanged)
- `components/dashboard/SetupChecklist.tsx` — NOT imported by onboarding
- `components/dashboard/StoreProfile.tsx` — NOT imported by onboarding
- `components/dashboard/NextSteps.tsx` — dashboard only, unchanged

**No new component files** — all new UI is inline within the updated pages.
