# Feature Specification: Core Platform Auth — Missing Screens

**Feature Branch**: `037-auth-missing-screens`
**Created**: 2026-05-20
**Status**: Draft
**App**: `apps/core-platform`

---

## Overview

Three auth screens defined in the UX Master Plan (S-03, S-05, S-06) are missing
from the current implementation. The register flow ends abruptly with no email
verification feedback. The login page has a "Forgot password?" link that goes
nowhere. This feature builds all three missing screens as UI-only mocks —
consistent with the dark theme, matching the existing login/register visual style,
and correctly wired into the mock auth flow.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Email Verification Screen after Register (Priority: P1) 🎯 MVP

After a user clicks "Create Account" on `/register`, they are navigated to a
`/verify-email` screen instead of directly to `/login`. The screen displays a
large envelope icon, the heading "Check your inbox", and a subtext showing the
mock email address the link was sent to. A "Resend email" button is available
with a 60-second cooldown — after clicking it, the button is disabled and shows
a countdown (`Resend in 58s`, `Resend in 57s`...) until it re-enables. A
secondary "Back to login" link is also present. The screen is informational only —
no real email is sent.

**Why this priority**: The register → verify email → onboarding flow is the
primary new-user journey. Without a verify screen, the register button currently
jumps the user directly to login, breaking the intended UX narrative.

**Independent Test**: Navigate to `/register`. Fill in name, email, password,
confirm password. Click "Create Account". Confirm navigation to `/verify-email`.
Verify the mock email address is shown. Click "Resend email" → button disables
and shows countdown. After 60s (or on page refresh) button re-enables.
"Back to login" navigates to `/login`.

**Acceptance Scenarios**:

1. **Given** the user clicks "Create Account" on `/register`, **When** navigation
   occurs, **Then** they land on `/verify-email` (not `/login`).
2. **Given** the user is on `/verify-email`, **When** the page loads, **Then** the
   email address they entered at registration is displayed in the subtext.
3. **Given** the user is on `/verify-email`, **When** they click "Resend email",
   **Then** the button disables immediately and displays a countdown from 60.
4. **Given** the countdown is running, **When** it reaches 0, **Then** the button
   re-enables with the label "Resend email".
5. **Given** the user is on `/verify-email`, **When** they click "Back to login",
   **Then** they navigate to `/login`.
6. **Given** the user is on mobile (375px), **When** they view `/verify-email`,
   **Then** the layout is centred, readable, and no content overflows.

---

### User Story 2 — Forgot Password Flow (Priority: P1)

A user on `/login` clicks the "Forgot password?" link. They land on
`/forgot-password` — a minimal screen with a single email input and a
"Send reset link" button. After clicking the button (with any email value or
empty — no validation enforced in mock), the screen transitions to a
confirmation state showing "Check your inbox" with a subtext, without navigating
to a new page (in-place state change). A "Back to login" link is present on both
the form state and the confirmation state.

**Why this priority**: The "Forgot password?" link on `/login` currently leads
nowhere. It is visible to every user and must resolve to a valid screen.

**Independent Test**: Navigate to `/login`. Click "Forgot password?". Confirm
landing on `/forgot-password` with an email input and "Send reset link" button.
Click "Send reset link". Confirm the form is replaced by a confirmation message.
Click "Back to login" → navigates to `/login`.

**Acceptance Scenarios**:

1. **Given** the user clicks "Forgot password?" on `/login`, **When** navigation
   occurs, **Then** they land on `/forgot-password`.
2. **Given** the user is on `/forgot-password` (default state), **When** the page
   loads, **Then** an email input and "Send reset link" button are visible.
3. **Given** the user clicks "Send reset link", **When** the click fires, **Then**
   the form is replaced in-place by a confirmation message (no page navigation).
4. **Given** the confirmation is shown, **When** the user reads the subtext,
   **Then** it mentions that if the email is registered, a reset link was sent.
5. **Given** either state (form or confirmation), **When** the user clicks
   "Back to login", **Then** they navigate to `/login`.
6. **Given** the user is on mobile (375px), **When** they view `/forgot-password`,
   **Then** the layout is centred and readable with no horizontal overflow.

---

### User Story 3 — Reset Password Screen (Priority: P2)

A user arrives at `/reset-password` (simulating clicking a link from their
email). They see a form with two fields: "New password" and "Confirm password",
both with show/hide toggles. A "Reset password" button is present. Clicking the
button (mock — no validation) navigates the user to `/login` with a success
banner: "Password reset — you can now sign in with your new password." The banner
auto-dismisses after 4 seconds.

**Why this priority**: Completes the full forgot-password loop. Without a reset
screen, the flow has no resolution.

**Independent Test**: Navigate to `/reset-password`. Verify two password fields
with show/hide toggles. Click "Reset password". Verify navigation to `/login`
with a success banner visible. Verify the banner disappears after ~4 seconds.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/reset-password`, **When** the page loads,
   **Then** two password fields (New password, Confirm password) are visible.
2. **Given** each password field, **When** the user clicks the show/hide toggle,
   **Then** the input toggles between `type="password"` and `type="text"`.
3. **Given** the user clicks "Reset password", **When** the action fires,
   **Then** they are navigated to `/login`.
4. **Given** the user lands on `/login` after a reset, **When** the page loads,
   **Then** a green success banner is visible: "Password reset successfully — you
   can now sign in."
5. **Given** the success banner is visible, **When** 4 seconds elapse, **Then**
   the banner fades out automatically.

---

## Edge Cases

- **Direct navigation to `/verify-email` without registering first**: If no
  mock email is in sessionStorage, display a generic placeholder email
  `owner@nexoraxs.local` in the subtext — never show an empty email.
- **Resend cooldown on page refresh**: Cooldown resets on refresh (useState only —
  no persistence). This is acceptable for the mock phase.
- **Direct navigation to `/reset-password`**: Always renders the form — no token
  validation in the mock phase.
- **Success banner on `/login` via direct URL**: If the user navigates directly
  to `/login` without coming from `/reset-password`, no banner is shown.
  The banner is only shown when a `?reset=success` query param is present.
- **Mobile keyboard on password fields**: Show/hide toggle must remain tappable
  when the virtual keyboard is open — position it inside the input, not outside.

---

## Requirements *(mandatory)*

### Functional Requirements

**Email Verification (S-03):**
- **FR-001**: `/register` "Create Account" button MUST navigate to `/verify-email` (not `/login`).
- **FR-002**: `/verify-email` MUST display the mock email from `core_mock_user_email` in sessionStorage, falling back to `owner@nexoraxs.local`.
- **FR-003**: "Resend email" button MUST disable on click and show a 60-second countdown.
- **FR-004**: After 60 seconds, the button MUST re-enable with label "Resend email".
- **FR-005**: "Back to login" link MUST navigate to `/login`.

**Forgot Password (S-05):**
- **FR-006**: "Forgot password?" link on `/login` MUST navigate to `/forgot-password`.
- **FR-007**: `/forgot-password` MUST show an email input and "Send reset link" button by default.
- **FR-008**: Clicking "Send reset link" MUST transition to a confirmation state in-place (no page navigation).
- **FR-009**: "Back to login" on both states MUST navigate to `/login`.

**Reset Password (S-06):**
- **FR-010**: `/reset-password` MUST show two password fields with show/hide toggles.
- **FR-011**: Clicking "Reset password" MUST navigate to `/login?reset=success`.
- **FR-012**: `/login` MUST show a dismissible green banner when `?reset=success` is present.
- **FR-013**: The success banner MUST auto-dismiss after 4 seconds.

**Cross-cutting:**
- **FR-014**: All three new screens MUST NOT use the dashboard layout — they use the same standalone centered layout as `/login` and `/register`.
- **FR-015**: All screens MUST be responsive at 375px with no horizontal overflow.
- **FR-016**: No new npm packages may be introduced.
- **FR-017**: All changes scoped to `apps/core-platform`.

---

## Success Criteria *(mandatory)*

- **SC-001**: Clicking "Create Account" on `/register` navigates to `/verify-email` (not `/login`).
- **SC-002**: `/verify-email` displays a mock email address (not empty).
- **SC-003**: "Resend email" countdown runs for 60 seconds and re-enables the button.
- **SC-004**: `/forgot-password` shows confirmation state after "Send reset link" click.
- **SC-005**: `/reset-password` → clicking "Reset password" → lands on `/login` with success banner.
- **SC-006**: Success banner on `/login` auto-dismisses after 4 seconds.
- **SC-007**: `pnpm --filter core-platform lint` exits with zero errors.
- **SC-008**: `pnpm --filter core-platform build` exits with zero errors.
- **SC-009**: All three new routes render at 375px with no horizontal scroll.

---

## Assumptions

- The existing `/login` page file is at `apps/core-platform/app/login/page.tsx`
  and the "Forgot password?" link currently renders as plain text or a disabled
  `<a>` — this feature wires it to `/forgot-password`.
- The existing `/register` "Create Account" button currently navigates to
  `/login` — this feature updates the redirect target to `/verify-email`.
- `core_mock_user_email` is already written to sessionStorage by the register
  flow (spec 026/027). This feature reads it on `/verify-email`.
- The auth pages share a common centered layout — no sidebar, no topbar. The
  new screens replicate this layout directly (inline, not via a shared layout
  component unless one already exists).
- `/verify-email`, `/forgot-password`, and `/reset-password` live directly
  under `app/` (not inside `app/(dashboard)/` or any route group).
- The visual style (dark background `#0a0a0f`, glass cards, blue CTA buttons,
  white typography) is already established in `/login` and `/register` —
  new screens copy this pattern exactly.
- Framer Motion is available (added in spec 033) — subtle fade-in on page
  mount is acceptable but not required.
