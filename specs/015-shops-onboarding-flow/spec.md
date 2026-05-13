# Feature Specification: Shops Onboarding Flow

**Feature Branch**: `015-shops-onboarding-flow`
**Created**: 2026-05-13
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Multi-Step Onboarding Flow (Priority: P1) 🎯 MVP

A first-time user arrives at `/onboarding`. Instead of selecting a mode and immediately landing on the operations dashboard, the user moves through three sequential steps within the same page: choosing a shop mode, reviewing a mock store profile summary, and seeing their setup checklist. At the end, they click "Finish setup" to reach `/dashboard`.

**Why this priority**: The current behaviour — selecting a mode and being immediately dropped into a full operations dashboard — is disorienting for a first-time user. The multi-step flow is the entire point of this feature. Everything else depends on this structure existing.

**Independent Test**: Open `/onboarding`. A step indicator shows "Step 1 of 3". Selecting a mode and clicking "Next" advances to Step 2 (store profile summary). Clicking "Next" on Step 2 advances to Step 3 (setup checklist). Clicking "Finish setup" on Step 3 navigates to `/dashboard` and does not return to the onboarding page on refresh (because `shops_onboarding_done` is set in sessionStorage).

**Acceptance Scenarios**:

1. **Given** the user opens `/onboarding`, **When** the page loads, **Then** Step 1 is displayed with a visible step indicator showing "Step 1 of 3" (or equivalent progress).
2. **Given** the user is on Step 1 and no mode is selected, **When** they attempt to advance, **Then** the "Next" button is disabled — no navigation occurs.
3. **Given** the user selects a mode on Step 1 and clicks "Next", **When** the transition occurs, **Then** Step 2 is shown; the step indicator updates; the selected mode is persisted in sessionStorage (`shops_mode`).
4. **Given** the user is on Step 2, **When** they click "Back", **Then** Step 1 is shown again; their previously selected mode remains highlighted.
5. **Given** the user is on Step 2 and clicks "Next", **When** the transition occurs, **Then** Step 3 is shown with the setup checklist.
6. **Given** the user is on Step 3 and clicks "Finish setup", **When** navigation occurs, **Then** `shops_onboarding_done` is written to sessionStorage, and the user is routed to `/dashboard`.

---

### User Story 2 — Returning User / Already-Completed Onboarding (Priority: P2)

If a user has already completed onboarding (`shops_onboarding_done` exists in sessionStorage) and navigates to `/onboarding`, they see a lightweight "You're all set" state — not the full three-step flow — with a clear link to continue to the dashboard. This prevents them from accidentally re-completing onboarding.

**Why this priority**: A session-persisted "done" flag has no value unless the UI acts on it. Without this story, every browser refresh re-presents the onboarding flow to already-setup users.

**Independent Test**: Complete the onboarding flow through Step 3 ("Finish setup"). Then navigate directly to `/onboarding`. The three-step flow is NOT shown. Instead, a "You're already set up" message is displayed with a "Continue to dashboard" link (using `href="/dashboard"` — no external URL, no `href="#"`).

**Acceptance Scenarios**:

1. **Given** `shops_onboarding_done` exists in sessionStorage, **When** the user navigates to `/onboarding`, **Then** the multi-step flow is NOT rendered; a completion state is shown instead.
2. **Given** the completion state is shown, **Then** a visible "Continue to dashboard" link is present and leads to `/dashboard`.
3. **Given** `shops_onboarding_done` does NOT exist in sessionStorage (fresh session or reset), **When** the user navigates to `/onboarding`, **Then** the full multi-step flow is shown from Step 1.

---

### User Story 3 — Dashboard Safe State for Missing Mode (Priority: P1)

If a user reaches `/dashboard` without having completed onboarding (no `shops_mode` in sessionStorage — e.g., direct URL navigation), the dashboard does not crash and does not show the full operations view. Instead, it shows a gentle prompt card asking the user to complete onboarding, with a link to `/onboarding`.

**Why this priority**: Tied P1 with US1 because the dashboard crash/empty state is a quality gate. Without this safeguard, any direct URL navigation to `/dashboard` before onboarding produces a broken experience.

**Independent Test**: Open a new browser tab and navigate directly to `/dashboard` (bypassing `/onboarding`). The stat cards, orders table, and operations content are NOT shown. Instead, a single card is displayed with a message like "Complete your setup to get started" and a link to `/onboarding`. No JS errors occur.

**Acceptance Scenarios**:

1. **Given** `shops_mode` is NOT in sessionStorage, **When** the user loads `/dashboard`, **Then** the operations content (stat cards, orders, quick actions) is NOT rendered; a setup prompt card is shown.
2. **Given** the setup prompt card is shown, **Then** it contains a link to `/onboarding` (not `href="#"`).
3. **Given** `shops_mode` IS in sessionStorage (regardless of `shops_onboarding_done`), **When** the user loads `/dashboard`, **Then** the full operations content is rendered as before.
4. **Given** `shops_mode` exists but `shops_onboarding_done` does NOT, **When** the user loads `/dashboard`, **Then** the operations content is shown but a subtle banner or note indicates setup is not yet finished — this is a soft warning, not a blocker.

---

### Edge Cases

- What if the user clears sessionStorage mid-flow? Refreshing `/onboarding` during Step 2 or 3 (after mode was stored) should restart from Step 1 — mode selection is the first persisted action.
- What if sessionStorage is unavailable (SSR / server render)? Mode and onboarding state reads must guard against `typeof window === "undefined"` to avoid server-side crashes.
- What if the user resizes from mobile to desktop mid-flow? The layout must be responsive at all three steps using existing Tailwind breakpoints.
- What if the user presses the browser "Back" button from `/dashboard` after finishing setup? They should see the completion state (US2), not be re-prompted through the full flow.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `/onboarding` page MUST display a three-step flow within a single page — no new routes, no `/setup` page.
- **FR-002**: A step indicator MUST be visible at all times during the three-step flow, clearly showing current step and total step count (e.g., dots, numbered pills, or "Step N of 3" text).
- **FR-003**: Step 1 MUST render the existing mode selection UI (Business Management, Storefront, Both). The "Next" button MUST be disabled until a mode is selected.
- **FR-004**: Step 2 MUST display a read-only store profile summary showing: store name ("Mustafa's Co."), branch ("Maadi Main"), currency ("EGP"), and the mode selected in Step 1 — all static mock values. No editable fields, no form submission.
- **FR-005**: Step 3 MUST display the setup checklist with exactly 5 items (Choose shop mode, Add business profile, Add first product, Invite team member, Review settings) in a static, unchecked state. No items may be interactive. A "Finish setup" button MUST be present.
- **FR-006**: Clicking "Finish setup" MUST call `completeOnboarding()` (which writes `shops_onboarding_done` to sessionStorage) and navigate to `/dashboard`.
- **FR-007**: The `/onboarding` page MUST detect `shops_onboarding_done` in sessionStorage on load and render a completion state (instead of the multi-step flow) when the flag is present.
- **FR-008**: The `/dashboard` page MUST detect the absence of `shops_mode` in sessionStorage and render a setup prompt card (instead of operations content) when the mode is missing.
- **FR-009**: The setup prompt card on `/dashboard` MUST include a link to `/onboarding` (not `href="#"`).
- **FR-010**: `apps/shops-app/lib/mode.ts` MUST export `completeOnboarding()`, `isOnboardingComplete()`, and `resetOnboarding()` — all using sessionStorage with key `shops_onboarding_done`.
- **FR-011**: All sessionStorage reads MUST guard against SSR with `typeof window === "undefined"` checks.
- **FR-012**: No new packages may be introduced. All icons use the existing inline SVG system in `components/ui/Icon.tsx`.
- **FR-013**: No cross-app imports. All changes are scoped to `apps/shops-app`.
- **FR-014**: No localhost URLs, no external links, no hardcoded domain URLs in any JSX or logic.

### Key Entities

- **ShopsMode**: `"business" | "store" | "both"` — already exists in `lib/mode.ts`; no change to the type.
- **OnboardingStep**: `1 | 2 | 3` — UI-only state; not persisted; drives which step panel is rendered.
- **shops_mode**: sessionStorage key storing the selected mode (already exists).
- **shops_onboarding_done**: New sessionStorage key (string `"true"` or boolean-string); written by `completeOnboarding()`, read by `isOnboardingComplete()`, cleared by `resetOnboarding()`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `/onboarding` no longer routes directly to `/dashboard` after mode selection — users must complete all three steps before reaching the dashboard. Verified by clicking "Next" after Step 1 and confirming Step 2 is shown (not `/dashboard`).
- **SC-002**: A user can navigate all three steps forward (Next → Next → Finish setup) and backward (Back → Back) without any visual errors or layout breaks.
- **SC-003**: After clicking "Finish setup", `shops_onboarding_done` is present in sessionStorage. Verified via browser DevTools.
- **SC-004**: A user who navigates directly to `/dashboard` without sessionStorage state sees the setup prompt card — not a blank screen, not a crash, not the full operations view.
- **SC-005**: `pnpm lint` in `apps/shops-app` exits with zero errors after implementation.
- **SC-006**: `pnpm build` for `shops-app` exits with zero errors after implementation; all pages compile successfully.
- **SC-007**: Zero `localhost` strings and zero external URLs appear in any new or modified file.

---

## Assumptions

- The existing `ModeCard` component (updated in 014) handles mode selection rendering; it will be reused in Step 1 without further changes to its interface.
- The existing `lib/mode.ts` helpers (`setMode`, `getMode`, `clearMode`) are already established patterns; the three new functions (`completeOnboarding`, `isOnboardingComplete`, `resetOnboarding`) follow the same sessionStorage-only, window-guard pattern.
- The step state (`currentStep: 1 | 2 | 3`) is managed in React component state and is NOT persisted to sessionStorage — a page refresh always restarts from Step 1 (or the completion state if `shops_onboarding_done` is set).
- "Finish setup" button text is used verbatim; no localisation is required.
- The setup checklist shown in Step 3 is the same 5-item list defined in `SetupChecklist.tsx` (built in 014); the two should be consistent but Step 3 renders them inline in the onboarding page, not by importing the dashboard component (no cross-context reuse that would create coupling).
- The soft warning on the dashboard when mode exists but onboarding is not complete (FR-009, US3 Scenario 4) is a low-priority embellishment — the hard requirement is only the missing-mode guard (SC-004).
- The `/onboarding` page remains a standalone page (not wrapped in the `(app)` route group layout), so it does not show the Sidebar or Topbar.
- Mobile layout uses the existing Tailwind responsive breakpoints; no new breakpoints are introduced.
- The "Recommended" badge on the "Both" mode card (added in 014) remains — the ModeCard component is used as-is in Step 1.
