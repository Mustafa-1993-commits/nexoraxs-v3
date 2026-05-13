# Feature Specification: Shops Onboarding Flow QA

**Feature Branch**: `016-onboarding-flow-qa`
**Created**: 2026-05-14
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Complete Forward Flow is Error-Free (Priority: P1) 🎯 MVP

A first-time user opens `/onboarding` with a clean session (no sessionStorage keys). They move through all three steps in order: selecting a mode on Step 1, selecting a branch and currency on Step 2, reviewing the summary on Step 3, and clicking "Finish setup". They arrive at `/dashboard` which correctly reflects their mode, branch, and currency. No visual glitches, no wrong headings, no broken layout at any step.

**Why this priority**: The forward path is the primary user journey. Any bug here means the feature does not work.

**Independent Test**: Clear sessionStorage. Open `/onboarding`. Move through all three steps to "Finish setup". Verify `/dashboard` shows correct branch (Topbar) and currency. Inspect browser DevTools → Session Storage — confirm all four keys are present: `shops_mode`, `shops_branch`, `shops_currency`, `shops_onboarding_done`.

**Acceptance Scenarios**:

1. **Given** a clean session, **When** `/onboarding` loads, **Then** Step 1 is shown with no mode pre-selected and "Next →" button disabled.
2. **Given** Step 1 is active, **When** the user selects a mode, **Then** that card shows a selected state and "Next →" becomes enabled.
3. **Given** a mode is selected and "Next →" is clicked, **When** Step 2 loads, **Then** the step indicator advances; the heading and content reflect Step 2 ("Choose defaults" or equivalent) — NOT "Choose your shop mode".
4. **Given** Step 2 is active, **When** the user selects a branch and currency, **Then** each selection shows a highlighted/active state.
5. **Given** Step 2 is active and "Next →" is clicked, **When** Step 3 loads, **Then** the step indicator advances; the review card shows the mode, branch, and currency selected in Steps 1 and 2.
6. **Given** Step 3 is active and "Finish setup" is clicked, **When** the navigation completes, **Then** the user lands on `/dashboard`; sessionStorage contains `shops_mode`, `shops_branch`, `shops_currency`, and `shops_onboarding_done = "true"`.

---

### User Story 2 — Back Navigation Works and Preserves State (Priority: P1)

A user navigating backward through the flow retains their previous selections at each step. Going Back from Step 2 returns to Step 1 with the previously chosen mode still highlighted. Going Back from Step 3 returns to Step 2 with the previously chosen branch and currency still highlighted. After going back, the user can advance again without losing any selection.

**Why this priority**: Broken Back navigation is a common regression that disrupts onboarding completion.

**Independent Test**: Select "Business Management" on Step 1, click "Next →". On Step 2, select "Nasr City" and "USD", click "Next →". On Step 3, click "Back". Verify Step 2 shows "Nasr City" and "USD" highlighted. Click "Back" again. Verify Step 1 shows "Business Management" highlighted. Click "Next →" again. Verify Step 2 still shows "Nasr City" and "USD" highlighted.

**Acceptance Scenarios**:

1. **Given** the user is on Step 2 with mode already selected, **When** they click "Back", **Then** Step 1 is shown with the previously selected mode card highlighted.
2. **Given** the user is on Step 3 with branch and currency already chosen, **When** they click "Back", **Then** Step 2 is shown with the previously chosen branch and currency highlighted.
3. **Given** the user went back to Step 1 and clicks "Next →" again without changing mode, **Then** Step 2 is shown with the same branch and currency they had chosen before.
4. **Given** the user went back to Step 2 and clicks "Next →" again without changing selections, **Then** Step 3 shows the same summary as before.

---

### User Story 3 — Returning User Sees Completion State (Priority: P2)

A user who has already completed onboarding (`shops_onboarding_done = "true"` in sessionStorage) and returns to `/onboarding` sees a completion card — "You're all set" with a "Continue to dashboard →" link — not the three-step flow. The step indicator is not visible on the completion screen.

**Why this priority**: Without this guard, users are unexpectedly presented with the full setup flow again on every visit, which erodes trust in the app state.

**Independent Test**: Complete the full onboarding flow through "Finish setup". Without clearing sessionStorage, navigate directly to `/onboarding`. Verify the completion card is shown ("You're all set"), the step indicator is absent, and "Continue to dashboard →" links to `/dashboard`.

**Acceptance Scenarios**:

1. **Given** `shops_onboarding_done = "true"` in sessionStorage, **When** `/onboarding` loads, **Then** the completion state ("You're all set") is shown instead of the step flow.
2. **Given** the completion state is shown, **Then** a "Continue to dashboard →" link is visible and points to `/dashboard` (not `href="#"`).
3. **Given** the completion state is shown, **Then** the step indicator (numbered pills) is NOT visible.
4. **Given** sessionStorage is cleared (no `shops_onboarding_done`), **When** `/onboarding` loads, **Then** the three-step flow is shown from Step 1.

---

### User Story 4 — Dashboard Reads All Session Values Correctly (Priority: P1)

After completing onboarding, the `/dashboard` correctly reflects the user's chosen mode, branch, and currency. The Topbar shows the selected branch (not always "Maadi Main" hardcoded). The NextSteps component shows mode-appropriate suggestions. The StoreProfile card shows the selected branch and currency. No amber "finish setup" banner is shown after successful completion.

**Why this priority**: The whole point of the onboarding data-collection steps is to seed the dashboard. If the dashboard doesn't read these values, the steps are meaningless.

**Independent Test**: Complete onboarding with: mode = "Storefront", branch = "Nasr City", currency = "USD". Arrive at `/dashboard`. Verify: StoreProfile card shows "Nasr City" and "USD"; NextSteps shows store-mode suggestions; the amber "Setup not complete" banner is absent.

**Acceptance Scenarios**:

1. **Given** onboarding completed with "Storefront" mode, **When** `/dashboard` loads, **Then** the NextSteps component shows store-mode suggestions (not business-mode suggestions).
2. **Given** onboarding completed with "Nasr City" as branch, **When** `/dashboard` loads, **Then** the StoreProfile card shows "Nasr City" (not hardcoded "Maadi Main").
3. **Given** onboarding completed with "USD" as currency, **When** `/dashboard` loads, **Then** the StoreProfile card shows "USD".
4. **Given** `shops_onboarding_done = "true"` in sessionStorage, **When** `/dashboard` loads, **Then** the amber "Setup not complete" banner is NOT shown.
5. **Given** sessionStorage is fully cleared, **When** `/dashboard` loads, **Then** the "Complete your setup" prompt card is shown — not the operations content.

---

### User Story 5 — No Hydration Mismatch or Layout Issues (Priority: P2)

The onboarding page shows no React hydration warnings in the browser console. The loading skeleton ("Loading setup...") visible on first render transitions cleanly to the correct step or completion state without a visual flash. At 375px viewport width, all three steps render without horizontal overflow, broken grids, or clipped text.

**Why this priority**: Hydration mismatches degrade perceived quality and can cause invisible data corruption. Mobile layout at 375px is a minimum viable viewport for the target market.

**Independent Test**: Open `/onboarding` in Chrome DevTools with the browser console open. Check for "Warning: Text content did not match" or equivalent React hydration warnings. Separately, resize the viewport to 375px and walk through all three steps — verify no horizontal scrollbar appears and all buttons are fully clickable.

**Acceptance Scenarios**:

1. **Given** `/onboarding` loads in a browser with the console open, **Then** zero React hydration mismatch warnings appear.
2. **Given** a 375px viewport, **When** Step 1 loads, **Then** all three ModeCards display stacked vertically without horizontal overflow.
3. **Given** a 375px viewport, **When** Step 2 loads, **Then** branch options and currency options each render as a single-column list (not a 3-column grid that clips content).
4. **Given** a 375px viewport, **When** Step 3 loads, **Then** the summary rows and checklist items display without truncation.
5. **Given** a 375px viewport, **When** any button (Next, Back, Finish setup) is shown, **Then** it is fully visible and tappable without horizontal scroll.

---

### Edge Cases

- What if the user clicks "Next →" on Step 2 without ever interacting with branch or currency? The defaults ("Maadi Main", "EGP") are pre-selected — the flow should still advance and persist those defaults.
- What if the user refreshes mid-flow (e.g., on Step 2 after Step 1 persisted mode)? The page restarts at Step 1, but the previously chosen mode should be visually restored (pre-selected) since it was already written to sessionStorage.
- What if the user presses the browser Back button from `/dashboard` after completing setup? `/onboarding` should show the completion state (not the flow), since `shops_onboarding_done` is still in sessionStorage.
- What if the review summary on Step 3 shows raw HTML entities (e.g., `&apos;` rendered as literal text rather than an apostrophe)? This is a confirmed rendering bug to look for during QA.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Step 1 heading and descriptive copy MUST be specific to Step 1 (mode selection). Step 2 and Step 3 MUST show their own distinct headings — not "Choose your shop mode".
- **FR-002**: The "Next →" button on Step 1 MUST be visually disabled (and non-functional) when no mode is selected.
- **FR-003**: All four sessionStorage keys — `shops_mode`, `shops_branch`, `shops_currency`, `shops_onboarding_done` — MUST be present in sessionStorage after "Finish setup" is clicked.
- **FR-004**: The step indicator MUST NOT be visible on the completion state ("You're all set") screen.
- **FR-005**: The "Continue to dashboard →" link on the completion state MUST use `href="/dashboard"` — not `href="#"`.
- **FR-006**: The StoreProfile card on `/dashboard` MUST read branch and currency from sessionStorage (via `getBranch()` / `getCurrency()`), not use hardcoded values — so if the user chose "Nasr City", the card shows "Nasr City".
- **FR-007**: The amber "Setup not complete" banner on `/dashboard` MUST NOT appear when `shops_onboarding_done = "true"` is in sessionStorage.
- **FR-008**: Zero React hydration mismatch warnings MUST appear in the browser console on any onboarding or dashboard page load.
- **FR-009**: At 375px viewport width, no step of `/onboarding` MUST produce a horizontal scrollbar or clip any interactive element.
- **FR-010**: No new packages may be introduced. All fixes must be within existing files in `apps/shops-app`.
- **FR-011**: No cross-app imports, no localhost URLs, no external links in any modified file.
- **FR-012**: All data displayed throughout the onboarding flow and dashboard MUST be clearly labelled as mock where applicable.

### Key Entities

- **shops_mode**: `"business" | "store" | "both"` — written to sessionStorage on Step 1 Next click; read by dashboard and its sub-components.
- **shops_branch**: `string` — written to sessionStorage on Step 2 Next click (and on Finish setup); read by `getBranch()` in StoreProfile and Topbar.
- **shops_currency**: `string` — written to sessionStorage on Step 2 Next click (and on Finish setup); read by `getCurrency()` in StoreProfile.
- **shops_onboarding_done**: `"true"` — written by `completeOnboarding()` on Finish setup; read by `isOnboardingComplete()` in onboarding page and dashboard.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can complete all three onboarding steps and arrive at `/dashboard` without any error, missing data, or page crash — verified end-to-end in a clean browser session.
- **SC-002**: After completing onboarding, all four sessionStorage keys are present with correct values — verified via browser DevTools.
- **SC-003**: The StoreProfile card on `/dashboard` reflects the branch and currency selected during onboarding, not hardcoded defaults — verified by choosing non-default values (e.g., "Nasr City", "USD") and checking the card.
- **SC-004**: Zero React hydration mismatch warnings appear in the browser console for any onboarding or dashboard page — verified with DevTools console open during fresh page load.
- **SC-005**: At 375px viewport, all three steps of `/onboarding` display without horizontal scroll — verified with Chrome DevTools device simulation.
- **SC-006**: `pnpm lint` in `apps/shops-app` exits with zero errors after all fixes are applied.
- **SC-007**: `pnpm build` for `shops-app` exits with zero errors after all fixes are applied.

---

## Assumptions

- The QA pass runs against the current implementation from branch `015-shops-onboarding-flow` (merged or cherry-picked to `016-onboarding-flow-qa`). No new features are added during QA — only confirmed bugs are fixed.
- "Inspect-first" approach: each issue area is read from source before any fix is written. A fix is only applied when the issue is confirmed by reading the code or observing the output.
- The `useSyncExternalStore` hydration pattern already in place in `onboarding/page.tsx` and `dashboard/page.tsx` is considered correct and will not be replaced unless a concrete hydration warning is confirmed.
- Step 2 "Next →" button does not require a disabled state because branch and currency always have defaults ("Maadi Main", "EGP") — the user is never in an undefined state on Step 2. This is a design decision, not a bug.
- The `shops_branch` and `shops_currency` sessionStorage keys were introduced in `015-shops-onboarding-flow` and their helpers (`getBranch`, `getCurrency`, `setBranch`, `setCurrency`) are already exported from `lib/mode.ts`.
- The Topbar component in the Shops App currently shows "Maadi Main" hardcoded. Whether to update it to read from sessionStorage is in-scope only if it causes a confirmed UX inconsistency — it is considered a stretch goal, not a blocking requirement.
