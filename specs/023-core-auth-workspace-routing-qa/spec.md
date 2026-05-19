# Feature Specification: Core Auth & Workspace Routing QA

**Feature Branch**: `024-core-auth-workspace-routing-qa`
**Created**: 2026-05-14
**Status**: Draft
**Design Reference**: existing Core Platform routes in `apps/core-platform`

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Register: "Create Account" Routes to Login (Priority: P1) 🎯 MVP

A new user arrives at the `/register` page, fills in their name, email, and password, and clicks "Create Account". They are taken to the `/login` page. No real account is created — the flow is visual/mock only. The button press is the only action needed to navigate.

**Why this priority**: The "Create Account" button currently does nothing — it is a dead interaction. A user who tries to register is stuck on the register page with no way to proceed into the product. This is a blocking gap in the core navigation flow even in mock form.

**Independent Test**: Open `/register`. Click "Create Account". Confirm navigation lands on `/login`. No error page, no blank page.

**Acceptance Scenarios**:

1. **Given** the user is on `/register`, **When** they click "Create Account", **Then** they are taken to `/login`.
2. **Given** the user is on `/register`, **Then** the "Sign in" text link still works (it already goes to `/login`).
3. **Given** no credentials are required for mock auth, **Then** clicking "Create Account" navigates regardless of whether the form fields are filled in.

---

### User Story 2 — Login: Route Based on Onboarding State (Priority: P1)

A user arrives at `/login`, enters their email and password (mock — not validated), and clicks "Sign In". The app checks whether workspace onboarding has been completed previously. If no onboarding record is found, the user is taken to `/onboarding` to set up their workspace. If onboarding was already completed, the user is taken to `/workspaces` to select an existing workspace.

**Why this priority**: The "Sign In" button currently does nothing — it is a dead interaction. Without conditional routing on login, first-time users cannot reach onboarding and returning users cannot reach the workspace selector. This breaks the entire post-registration flow.

**Independent Test (first-time user)**: Open `/login` in a fresh browser session (no prior session data). Click "Sign In". Confirm navigation lands on `/onboarding`.

**Independent Test (returning user)**: Complete the full workspace onboarding flow (so that the completion flag is present in session). Then navigate to `/login` and click "Sign In". Confirm navigation lands on `/workspaces`.

**Acceptance Scenarios**:

1. **Given** no workspace onboarding record exists in the session, **When** the user clicks "Sign In" on `/login`, **Then** they are taken to `/onboarding`.
2. **Given** a workspace onboarding record exists in the session, **When** the user clicks "Sign In" on `/login`, **Then** they are taken to `/workspaces`.
3. **Given** the routing check is done at click time, **Then** the login page itself loads without reading session storage on page mount (no flash of wrong route on initial render).
4. **Given** no credentials are validated in mock mode, **Then** clicking "Sign In" navigates based solely on the onboarding session flag — the email/password fields are not checked.

---

### User Story 3 — Onboarding Finish Routes to App Launcher (Priority: P1)

A user completes all three steps of the Core Platform workspace onboarding and clicks "Continue to dashboard". They arrive at `/dashboard/apps` — the App Launcher — which shows all five app cards. The Shops card is enabled. No 404 or blank page occurs.

**Why this priority**: This route is already the destination of the onboarding CTA. Verifying it works end-to-end confirms the onboarding completion writes the session flag, the routing executes, and the landing page renders correctly.

**Independent Test**: Complete the full workspace onboarding (Steps 1–3). Click "Continue to dashboard". Confirm `/dashboard/apps` renders with the App Launcher heading and five app cards (Shops enabled, four Coming Soon). Confirm in DevTools → Session Storage that `core_workspace_onboarding_done` is set.

**Acceptance Scenarios**:

1. **Given** the user completes Step 3 of workspace onboarding and clicks "Continue to dashboard", **Then** they arrive at `/dashboard/apps` without a 404 or error.
2. **Given** the user is on `/dashboard/apps`, **Then** the page shows the App Launcher with five app cards.
3. **Given** the Shops card is visible, **Then** it shows an enabled "Open Shops" action distinct from the Coming Soon cards.
4. **Given** the onboarding finish action runs, **Then** the session record `core_workspace_onboarding_done` is present — verified via browser DevTools.
5. **Given** the user navigates back to `/login` after completing onboarding (without clearing session), **Then** clicking "Sign In" routes to `/workspaces` (not back to `/onboarding`).

---

### Edge Cases

- What if the user clears their browser session after completing onboarding and visits `/login`? The onboarding flag is gone, so "Sign In" routes back to `/onboarding`. This is correct — a clean session is treated as a first-time user.
- What if the user navigates directly to `/onboarding` after onboarding is complete? The existing returning-user guard already shows a "Workspace already set up" card rather than the step form — this behaviour is unchanged by this feature.
- What if the user navigates directly to `/dashboard/apps` without completing onboarding? The page renders (no guard required for this QA scope) — this is consistent with the mock auth model where no real access control exists.
- What if the "Create Account" or "Sign In" button is clicked multiple times rapidly? Navigation is idempotent — clicking repeatedly while a navigation is in progress has no side effect.
- What if the `/workspaces` route does not exist? It already exists in the codebase — this is a pre-existing route with a workspace selector UI.

---

## Requirements *(mandatory)*

### Functional Requirements

**Register page (`/register`):**

- **FR-001**: The "Create Account" button on `/register` MUST navigate to `/login` when clicked.
- **FR-002**: The navigation MUST occur without any form validation — no field values are checked in mock mode.
- **FR-003**: The existing "Sign in" text link to `/login` MUST remain unchanged.

**Login page (`/login`):**

- **FR-004**: The "Sign In" button on `/login` MUST read the workspace onboarding session flag at the moment of click.
- **FR-005**: If the workspace onboarding session flag is absent, clicking "Sign In" MUST navigate to `/onboarding`.
- **FR-006**: If the workspace onboarding session flag is present, clicking "Sign In" MUST navigate to `/workspaces`.
- **FR-007**: The routing decision MUST be made at click time — the login page MUST NOT read session storage on mount or perform a redirect on initial page load.
- **FR-008**: No credentials are validated — the email and password fields are present for visual completeness only.

**App Launcher (`/dashboard/apps`):**

- **FR-009**: The `/dashboard/apps` route MUST render without a 404 or runtime error when reached via the onboarding CTA.
- **FR-010**: The page MUST display five app cards: Shops (enabled), Clinics, Maintenance, Restaurants, CRM (all Coming Soon) — no changes to the existing AppCard content are required.

**General:**

- **FR-011**: No real authentication, no backend calls, no API requests, no credential validation.
- **FR-012**: No new packages.
- **FR-013**: All changes are scoped to `apps/core-platform` only — no shops-app, no landing changes.
- **FR-014**: The workspace onboarding session flag read on login is the key `core_workspace_onboarding_done` — the same key written by the onboarding completion flow.

### Key Entities

- **OnboardingFlag**: `core_workspace_onboarding_done` — string value `"true"` in session storage when workspace onboarding has been completed. Written by the onboarding flow; read by the login routing decision.
- **MockAuthFlow**: Visual-only flow through `/register` → `/login` → (`/onboarding` or `/workspaces`). No server state, no tokens, no real credential handling.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Clicking "Create Account" on `/register` navigates to `/login` — verified by clicking the button in a browser.
- **SC-002**: Clicking "Sign In" on `/login` in a fresh session (no prior onboarding) navigates to `/onboarding` — verified by browser test with cleared session storage.
- **SC-003**: Clicking "Sign In" on `/login` after completing workspace onboarding navigates to `/workspaces` — verified by completing the onboarding flow then returning to `/login`.
- **SC-004**: Completing workspace onboarding and clicking "Continue to dashboard" renders `/dashboard/apps` without a 404 — verified in browser.
- **SC-005**: After completing onboarding, the session key `core_workspace_onboarding_done` is present in DevTools → Application → Session Storage.
- **SC-006**: `pnpm lint` passes with zero errors for `apps/core-platform`.
- **SC-007**: TypeScript check passes with zero errors for `apps/core-platform`.
- **SC-008**: `pnpm --filter core-platform build` exits with zero errors and `/register`, `/login`, `/dashboard/apps` all appear as compiled routes.

---

## Assumptions

- Both `/register` and `/login` are currently static Server Components with no click handlers — the buttons render but do nothing. This feature adds `onClick` navigation handlers, which requires converting both pages to Client Components (`"use client"`).
- The workspace onboarding session key is `core_workspace_onboarding_done`. This is the same key already written by the existing onboarding page completion flow — no new session keys are introduced.
- The login page reads the session flag at click time (inside the button's `onClick` handler), not on page mount. This avoids hydration issues and prevents an SSR-triggered redirect on page load.
- The `/workspaces` route already exists with a workspace selector UI. Its internal navigation (what happens after selecting a workspace) is out of scope for this feature — only the routing TO `/workspaces` is addressed here.
- The `/dashboard/apps` route already exists and builds correctly. This feature verifies that the end-to-end flow reaches it without a 404, but does not modify the App Launcher page content.
- No real authentication is implemented. The form fields on `/register` and `/login` are kept as visual elements — their values are ignored for routing decisions.
- No changes are made to the Core Platform Sidebar, Topbar, onboarding page, workspaces page, or any other existing routes. Only `/register/page.tsx` and `/login/page.tsx` receive changes.
