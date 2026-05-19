# Feature Specification: Core Mock Account Session

**Feature Branch**: `027-mock-account-session`
**Created**: 2026-05-15
**Status**: Draft
**Design Reference**: `apps/core-platform` — register, login, onboarding, workspaces, dashboard

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Mock Account Creation via Register (Priority: P1) 🎯 MVP

A user visits the Register page and fills in their full name, email, and a password. When they click "Create Account", the platform captures their name and email, stores them locally for use across the platform, and navigates them to the Login page. The password is never stored. On subsequent pages, the user sees their entered name and email reflected in the interface, making the experience feel connected and personal.

**Why this priority**: This is the entry point of the flow. Without capturing name and email here, no other surface can display accurate user identity. It unblocks all other stories.

**Independent Test**: Navigate to `/register`. Enter full name "Mustafa Mohamed" and email "mustafa@example.com". Click "Create Account". Verify the user is navigated to `/login`. Verify the entered name and email are retrievable from local storage (via DevTools) under the correct keys. Verify no password key exists.

**Acceptance Scenarios**:

1. **Given** the user is on the Register page, **When** they enter a full name and email and click "Create Account", **Then** the name and email are saved locally and the user is routed to `/login`.
2. **Given** the user clicks "Create Account", **Then** no password value is saved to local storage under any key.
3. **Given** the user has entered no name but a valid email, **When** they click "Create Account", **Then** the name falls back to a safe default and only the email is saved accurately. *(out of scope — assume basic form completion is required by existing UI)*
4. **Given** a name and email are saved, **Then** those exact values (not transformed) are retrievable by other pages in the same session.

---

### User Story 2 — Login Maintains Routing and Initialises Fallback (Priority: P1)

A user lands on the Login page. If they registered first, their name and email are already in the session. If they arrive at Login directly (e.g., deep link), no account data exists. In both cases, clicking "Sign In" routes them correctly: to `/onboarding` if workspace setup is not complete, or to `/workspaces` if it is. When no mock user exists at login time, safe fallback values ("Workspace owner" and "owner@nexoraxs.local") are written so downstream pages always have something to display.

**Why this priority**: Login is the gate to the rest of the platform. Routing correctness must be preserved, and the fallback initialisation ensures no downstream page ever shows empty or broken identity data.

**Independent Test**: (A) Clear session storage. Open `/login` directly. Click "Sign In". Verify routing is correct based on onboarding state. Open DevTools and confirm fallback name "Workspace owner" and email "owner@nexoraxs.local" are now present. (B) Complete Register first, then Sign In. Verify the previously saved name and email are still present (not overwritten by fallback).

**Acceptance Scenarios**:

1. **Given** workspace onboarding is not complete, **When** the user clicks "Sign In", **Then** they are routed to `/onboarding`.
2. **Given** workspace onboarding is complete, **When** the user clicks "Sign In", **Then** they are routed to `/workspaces`.
3. **Given** no mock user name/email exists in session when "Sign In" is clicked, **Then** fallback values are written: name "Workspace owner", email "owner@nexoraxs.local".
4. **Given** a mock user already exists in session (from Register), **When** "Sign In" is clicked, **Then** the existing name and email are preserved — the fallback is NOT written.

---

### User Story 3 — Identity Displayed Across Core Platform (Priority: P2)

After registering or logging in, the user sees their name and email consistently across the core platform: in the Workspaces page header/profile area, in the Workspace Onboarding Step 3 Review "Team owner" card, and in the Dashboard shell's user display areas. No surface shows a hardcoded name. If identity data is missing, safe fallback values are used.

**Why this priority**: This is the payoff of storing the mock account. The experience feels connected only when displayed identity matches what the user entered. Hardcoded names ("Mustafa Ahmed") break trust.

**Independent Test**: Register as "Mustafa Mohamed" with "mustafa@example.com". Complete workspace onboarding. On the Workspaces page, verify the name "Mustafa Mohamed" and the email appear in the user profile/header area. Navigate to `/onboarding` (after clearing `core_workspace_onboarding_done`). Reach Step 3 Review. Verify the Team owner card shows "Mustafa Mohamed". Navigate to `/dashboard`. Verify the displayed user name matches.

**Acceptance Scenarios**:

1. **Given** mock user name is "Mustafa Mohamed", **When** the Workspaces page is displayed, **Then** the user name area shows "Mustafa Mohamed".
2. **Given** mock user email is "mustafa@example.com", **When** the Workspaces page is displayed, **Then** the email area shows "mustafa@example.com".
3. **Given** no mock user exists, **When** the Workspaces page is displayed, **Then** the name shows "Workspace owner" and the email shows "owner@nexoraxs.local".
4. **Given** mock user name is "Mustafa Mohamed", **When** the Workspace Onboarding Step 3 Review is displayed, **Then** the Team owner card shows "Mustafa Mohamed" — not "Workspace owner" or any hardcoded name.
5. **Given** no mock user exists, **When** the Workspace Onboarding Step 3 Review is displayed, **Then** the Team owner card shows "Workspace owner".
6. **Given** mock user name exists, **When** the Dashboard shell is displayed, **Then** any user name display area shows the mock user name.
7. **Given** no mock user name exists, **When** the Dashboard shell is displayed, **Then** the fallback "Workspace owner" is shown.

---

### Edge Cases

- What if the user navigates directly to `/workspaces` or `/dashboard` without registering or logging in? The session will have no mock user — fallback values are used throughout.
- What if the user registers, closes the browser tab, and returns? Session storage is cleared by the browser — fallback values take effect on next login.
- What if the Register form is submitted with an empty name field? The spec assumes the existing Register UI prevents submission without a name. If name is empty at save time, fall back to "Workspace owner" for the name key.
- What if the user completes onboarding, then navigates back to `/register` and re-registers with a different name? The new name overwrites the previous values — this is expected behavior for a mock session.
- What if `core_mock_user_name` contains special characters (e.g., apostrophes, hyphens)? Values are stored and displayed as plain strings — no sanitization needed for this mock flow.

---

## Requirements *(mandatory)*

### Functional Requirements

**Register page:**

- **FR-001**: When "Create Account" is clicked, the platform MUST save the entered full name to session storage under the key `core_mock_user_name`.
- **FR-002**: When "Create Account" is clicked, the platform MUST save the entered email to session storage under the key `core_mock_user_email`.
- **FR-003**: The platform MUST NOT save any password value to session storage under any key.
- **FR-004**: After saving, the user MUST be routed to `/login`.
- **FR-005**: If the name field is empty at save time, `core_mock_user_name` MUST be set to "Workspace owner" as a safe fallback.

**Login page:**

- **FR-006**: Clicking "Sign In" MUST preserve existing routing logic: route to `/onboarding` if `core_workspace_onboarding_done` is absent, or to `/workspaces` if present.
- **FR-007**: If `core_mock_user_name` is absent or empty at login time, the platform MUST write "Workspace owner" to `core_mock_user_name`.
- **FR-008**: If `core_mock_user_email` is absent or empty at login time, the platform MUST write "owner@nexoraxs.local" to `core_mock_user_email`.
- **FR-009**: If `core_mock_user_name` and `core_mock_user_email` are already present, the platform MUST NOT overwrite them — existing values are preserved.

**Workspace Onboarding — Step 3 Review:**

- **FR-010**: The "Team owner" summary card MUST display the value of `core_mock_user_name` from session storage.
- **FR-011**: If `core_mock_user_name` is absent, the "Team owner" card MUST display "Workspace owner".
- **FR-012**: The "Team owner" card MUST NOT display any hardcoded personal name.

**Workspaces page:**

- **FR-013**: The user profile/header display area MUST show `core_mock_user_name` from session storage.
- **FR-014**: The user profile/header display area MUST show `core_mock_user_email` from session storage.
- **FR-015**: If either value is absent, the corresponding fallback MUST be used: name → "Workspace owner", email → "owner@nexoraxs.local".

**Dashboard shell:**

- **FR-016**: Any component in the Dashboard shell that displays a user name MUST read from `core_mock_user_name` (with "Workspace owner" as fallback).
- **FR-017**: Changes to the Dashboard shell MUST be minimal — only update components that already display a user name or email.

**General:**

- **FR-018**: No password MUST be stored anywhere.
- **FR-019**: No new packages MAY be introduced.
- **FR-020**: All changes MUST be isolated to `apps/core-platform`.
- **FR-021**: Auth behavior remains visual/mock only — no real authentication logic is introduced.

### Key Entities

- **MockUser**: The locally-stored identity record for the current session. Fields: `name: string` (stored as `core_mock_user_name`), `email: string` (stored as `core_mock_user_email`). No password field.
- **Fallback identity**: The safe default values used when no mock user has been created: name = "Workspace owner", email = "owner@nexoraxs.local".
- **Session storage keys**: `core_mock_user_name`, `core_mock_user_email` — written by Register (primary) or Login (fallback initialisation only).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Registering with name "Mustafa Mohamed" and an email results in those exact values being retrievable from session storage immediately after clicking "Create Account" — verified via DevTools.
- **SC-002**: After registering, clicking "Sign In" on the Login page routes to `/onboarding` or `/workspaces` correctly based on onboarding state — same routing as before this feature.
- **SC-003**: Logging in without prior registration results in fallback name "Workspace owner" and email "owner@nexoraxs.local" being written to session storage — verified via DevTools.
- **SC-004**: The Workspaces page displays "Mustafa Mohamed" and the registered email in the user profile area after a Register → Login flow.
- **SC-005**: The Workspace Onboarding Step 3 Review "Team owner" card displays "Mustafa Mohamed" after registering with that name.
- **SC-006**: No surface in `apps/core-platform` displays the hardcoded string "Mustafa Ahmed" — verified by text search.
- **SC-007**: `pnpm --filter core-platform lint` passes with zero errors.
- **SC-008**: `pnpm --filter core-platform build` exits with zero errors.

---

## Assumptions

- The Register page already has full name, email, and password fields — this feature adds save logic to the existing "Create Account" action, not new form fields.
- The Login page already implements `isWorkspaceOnboardingComplete()` routing — this feature adds fallback initialisation around the existing routing call, not a new routing system.
- The Workspaces page already has a user profile or header area — this feature updates it to read from session rather than showing hardcoded or empty values.
- The Dashboard shell already has at least one user name display location — changes will be surgical and minimal, touching only existing display components.
- Session storage is the correct persistence layer — consistent with how all other mock/onboarding data is stored in this project.
- "Workspace owner" is the canonical fallback name. "owner@nexoraxs.local" is the canonical fallback email. These are non-realistic values chosen to be clearly identifiable as placeholders.
- The mock user session is intentionally ephemeral — browser close clears it. This is acceptable for a mock/visual flow.
- No input validation (email format, name length) is added by this feature — the existing form handles whatever it handles today.
- `core_workspace_onboarding_done` is already the session key that controls onboarding routing — this feature does not change that key or its logic.
