# Research: Shops Onboarding Flow QA

**Feature**: 016-onboarding-flow-qa
**Date**: 2026-05-14

This document records all issues found during a static code audit of the 015 implementation, and the decisions made about each.

---

## Audit Results

### Issue 1 (CONFIRMED BUG — FR-001): Static heading across all three steps

**File**: `apps/shops-app/app/onboarding/page.tsx`, lines 175–182

**Observed**: The `StepFlow` component renders a hardcoded `<h1>Choose your shop mode</h1>` and subtitle `"Select how you want to use NexoraXS Shops. You can change this later in Settings."` unconditionally — it shows on Steps 1, 2, and 3 regardless of `currentStep`.

Each step does have its own `<h2>` inside its card section ("Choose defaults" on Step 2, "Review setup" on Step 3), but the main `<h1>` at the top of the page doesn't change. This means a user on Step 2 sees "Choose your shop mode" as the primary heading, even though they're choosing branch and currency.

**Decision**: Fix by making the `<h1>` and subtitle text step-dependent. Define a map of `{ heading, subtitle }` keyed by step number and render the active entry.

**Per-step content**:
- Step 1: heading `"Choose your shop mode"`, subtitle `"Select how you want to use NexoraXS Shops. You can change this later in Settings."`
- Step 2: heading `"Set up your store"`, subtitle `"Choose a branch and default currency. You can update these later in Settings."`
- Step 3: heading `"Review your setup"`, subtitle `"Confirm the details below before entering your dashboard."`

---

### Issue 2 (CONFIRMED INCONSISTENCY — stretch goal): Topbar branch is hardcoded

**File**: `apps/shops-app/components/dashboard/Topbar.tsx`, line 33

**Observed**: The Topbar branch selector shows `"Maadi Main"` as a hardcoded string. `StoreProfile.tsx` already reads from `getBranch()` correctly, so if the user selected "Nasr City" during onboarding, the StoreProfile shows "Nasr City" but the Topbar still says "Maadi Main".

**Decision**: Update Topbar to read `getBranch()` via the same `useSyncExternalStore` pattern used in `NextSteps.tsx` and `StoreProfile.tsx`. The fallback stays `"Maadi Main"`. This is the "stretch goal" noted in the spec — it is now confirmed as a UX inconsistency and therefore in-scope.

---

### Issue 3 (PASS — no action): Hydration

**Files**: `app/onboarding/page.tsx`, `app/(app)/dashboard/page.tsx`, `components/dashboard/NextSteps.tsx`, `components/dashboard/StoreProfile.tsx`

**Observed**: All four files use `useSyncExternalStore(() => () => {}, () => true, () => false)` to detect "mounted" state. The server snapshot returns `false`, so server and hydration phases agree (both render the loading/prompt state). After hydration, React re-renders with `true` and shows the correct content. This is the documented React 18 pattern for client-only state — no hydration mismatch warning is produced.

**Decision**: No action required. Pattern is correct.

---

### Issue 4 (PASS — no action): All four sessionStorage keys written

**File**: `apps/shops-app/app/onboarding/page.tsx`, `handleFinish` function (lines 408–416)

**Observed**: `handleFinish` calls `setMode(resolvedSelected)` (guarded by `if resolvedSelected`), `setBranch(resolvedBranch)`, `setCurrency(resolvedCurrency)`, and `completeOnboarding()`. All four sessionStorage keys are written before `router.push("/dashboard")`.

`resolvedSelected = selected ?? persistedSelected`. Since mode was written to sessionStorage in `handleNext` (Step 1), `persistedSelected` is non-null by the time `handleFinish` is called. `resolvedBranch` and `resolvedCurrency` default to `"Maadi Main"` and `"EGP"` if not overridden — guaranteed non-null.

**Decision**: No action required.

---

### Issue 5 (PASS — no action): Back navigation preserves selections

**File**: `apps/shops-app/app/onboarding/page.tsx`

**Observed**: The component tracks `selected` (mode), `branch`, and `currency` as separate `useState` values. Going Back decrements `currentStep` only — all state variables persist across step changes within the session. `resolvedSelected = selected ?? persistedSelected` further ensures the mode is visually pre-selected on return to Step 1 even if `selected` (local) is null but `getMode()` (session) is non-null.

**Decision**: No action required.

---

### Issue 6 (PASS — no action): Completion state hides step indicator

**File**: `apps/shops-app/app/onboarding/page.tsx`, lines 437–458

**Observed**: The render tree branches on `isComplete`:
```
{!mounted → skeleton}
{isComplete → <CompletionState />}
{else → <StepFlow ... />}
```
`<CompletionState>` is a standalone component that does not include `<StepIndicator>`. The step indicator is inside `<StepFlow>` only. So it is correctly absent from the completion screen.

**Decision**: No action required.

---

### Issue 7 (PASS — no action): StoreProfile reads dynamic branch and currency

**File**: `apps/shops-app/components/dashboard/StoreProfile.tsx`, lines 20–21

**Observed**:
```typescript
const branch = mounted ? getBranch() ?? "Maadi Main" : null;
const currency = mounted ? getCurrency() ?? "EGP" : null;
```
Both values are read from sessionStorage with correct fallbacks. If the user chose "Nasr City" during onboarding, the card shows "Nasr City" after `/dashboard` loads.

**Decision**: No action required.

---

### Issue 8 (PASS — no action): No localhost URLs, no external links

**Observed**: Grep on all modified files in 015 returns zero `localhost` or `http://` matches. All within-app links use `/dashboard` or `/onboarding` paths (not `href="#"`), which is correct for real navigation.

**Decision**: No action required.

---

### Issue 9 (PASS — no action): Mobile layout at 375px

**Observed**: Branch and currency options use `grid gap-3 sm:grid-cols-3`. At 375px, `sm` (640px) is not active, so the grid is single-column. ModeCards are full-width. All buttons use `w-full` or `flex-1`. No horizontal overflow expected.

**Decision**: No action required. Verify in browser as a build-time check.

---

## Fix Summary

| # | Issue | Status | File | Fix |
|---|-------|--------|------|-----|
| 1 | Static heading across all steps | **FIX** | `app/onboarding/page.tsx` | Per-step heading map |
| 2 | Topbar branch hardcoded | **FIX** | `components/dashboard/Topbar.tsx` | Read `getBranch()` via `useSyncExternalStore` |
| 3–9 | All other areas | **PASS** | — | No action |

Total: **2 files to modify**, **0 new files**.
