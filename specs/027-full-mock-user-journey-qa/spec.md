# Feature Specification: Full Mock User Journey QA

**Feature Branch**: `028-mock-journey-qa`
**Created**: 2026-05-15
**Status**: Draft
**Design Reference**: `apps/landing`, `apps/core-platform`, `apps/shops-app`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Landing to Register/Login Entry (Priority: P1) 🎯 MVP

A visitor on the landing page sees "Get Started" call-to-action buttons. Clicking any of them takes the visitor to the Core Platform login or register page — no broken links, no dead-end pages. The landing page does not perform authentication itself; it is purely a marketing gateway into the Core Platform auth flow.

**Why this priority**: The journey cannot begin if the entry point is broken. Every other story depends on the user successfully reaching Register or Login.

**Independent Test**: Open the landing page. Click the primary "Get Started" button in the hero section. Verify the browser navigates to the Core Platform login or register page. Click the header "Get Started" button. Verify the same destination. Verify no 404 or broken route appears.

**Acceptance Scenarios**:

1. **Given** the user is on the landing page hero section, **When** they click "Get Started", **Then** they are taken to the Core Platform login or register page.
2. **Given** the user is on the landing page header, **When** they click "Get Started", **Then** they are taken to the Core Platform login or register page.
3. **Given** any CTA link on the landing page, **Then** it resolves to a valid route — no 404 or blank page.

---

### User Story 2 — Register Saves Mock Identity (Priority: P1) 🎯 MVP

A new user fills in their full name, email address, and a password on the Register page. When they click "Create Account", the platform saves their name and email locally and navigates them to the Login page. The password is never saved anywhere. The saved name and email will follow them through the rest of the platform.

**Why this priority**: Without identity capture at registration, no subsequent page can display the user's name or email. This is the foundation of the connected experience.

**Independent Test**: Navigate to `/register`. Enter "Mustafa Mohamed" as full name and "mustafa@example.com" as email. Click "Create Account". Verify navigation to `/login`. Open browser DevTools → Application → Session Storage. Confirm `core_mock_user_name = "Mustafa Mohamed"` and `core_mock_user_email = "mustafa@example.com"` are present. Confirm no key storing a password value exists.

**Acceptance Scenarios**:

1. **Given** the user fills in full name and email and clicks "Create Account", **Then** the name is saved locally and the user is navigated to `/login`.
2. **Given** the user completes registration, **Then** no password value is stored locally under any key.
3. **Given** a name and email have been saved at registration, **Then** those exact values are retrievable by any subsequent page in the same session.

---

### User Story 3 — Login Routes Correctly and Ensures Identity Exists (Priority: P1) 🎯 MVP

A user on the Login page clicks "Sign In". The platform checks whether workspace onboarding has been completed. If not, the user is taken to workspace onboarding. If it has been completed, the user is taken to the workspace selector. Additionally, if no mock identity exists (e.g., the user arrived at Login directly without registering), safe fallback values are written so downstream pages are never empty.

**Why this priority**: Login is the gate to the authenticated experience. Correct routing and guaranteed identity data are both required for every downstream story.

**Independent Test**: (A) Clear all session storage. Navigate to `/login`. Click "Sign In". Verify routing to `/onboarding`. Open DevTools and confirm fallback name and email are written. (B) Register first, then login — verify existing name/email are preserved (not overwritten by fallback). (C) Complete workspace onboarding, then login again — verify routing to `/workspaces`.

**Acceptance Scenarios**:

1. **Given** workspace onboarding is not complete, **When** the user clicks "Sign In", **Then** they are taken to `/onboarding`.
2. **Given** workspace onboarding is complete, **When** the user clicks "Sign In", **Then** they are taken to `/workspaces`.
3. **Given** no mock user name or email exists when "Sign In" is clicked, **Then** fallback values ("Workspace owner", "owner@nexoraxs.local") are written and preserved for downstream pages.
4. **Given** a mock user exists from prior registration, **When** "Sign In" is clicked, **Then** the existing name and email are not overwritten.

---

### User Story 4 — Core Workspace Onboarding Completes Cleanly (Priority: P1)

A user completes the three-step workspace onboarding flow: naming their workspace and selecting region/country (Step 1), choosing their apps (Step 2), reviewing their setup (Step 3). The region select controls which country options appear — changing region resets the country to a valid option for that region. The Review step shows the mock user's name as the Team owner, not a hardcoded name. Completing the flow saves the workspace setup locally and routes to the App Launcher dashboard.

**Why this priority**: Workspace onboarding is the required path from login to the product. If it is broken or shows incorrect data, the user cannot reach the App Launcher.

**Independent Test**: Register as "Mustafa Mohamed". Login. Complete onboarding: name workspace "Test Co", select region "Middle East (Central)" → confirm Egypt/Saudi Arabia/UAE/Kuwait/Qatar appear in country list. Change region to "EU (Central)" → confirm country list resets to EU countries. Reach Review step → confirm Team owner shows "Mustafa Mohamed". Click "Continue to dashboard" → confirm routing to `/dashboard/apps`.

**Acceptance Scenarios**:

1. **Given** the user selects a region in Step 1, **Then** the country dropdown shows only countries relevant to that region.
2. **Given** the user changes region after already selecting a country, **Then** the country resets to the first available country for the new region.
3. **Given** the user reaches Step 3 Review and has registered as "Mustafa Mohamed", **Then** the Team owner card shows "Mustafa Mohamed" — not a hardcoded name.
4. **Given** the user clicks "Continue to dashboard" on Step 3, **Then** they are routed to `/dashboard/apps` (the App Launcher).
5. **Given** the user completes onboarding, **Then** workspace setup data is saved locally and `core_workspace_onboarding_done` is marked complete.

---

### User Story 5 — App Launcher Opens Shops (Priority: P1)

A user on the Core Platform App Launcher (`/dashboard/apps`) sees the available apps. Clicking "Open Shops" navigates them to the Shops application. The navigation happens in the same browser tab. The App Launcher page does not 404.

**Why this priority**: The App Launcher is the bridge between Core Platform and Shops. If this navigation is broken, the Shops journey cannot begin.

**Independent Test**: Complete workspace onboarding. Arrive at `/dashboard/apps`. Verify the page loads without a 404. Find the Shops app card. Click "Open Shops". Verify the browser navigates to the Shops app (same tab) — either to Shops onboarding (if not previously completed) or Shops dashboard (if already completed).

**Acceptance Scenarios**:

1. **Given** the user is on `/dashboard/apps`, **Then** the page loads and displays available apps — no 404.
2. **Given** the user clicks "Open Shops", **Then** they are navigated to the Shops app entry point in the same browser tab.
3. **Given** Shops onboarding has not been completed, **When** the user clicks "Open Shops", **Then** they land on Shops onboarding.
4. **Given** Shops onboarding has already been completed, **When** the user clicks "Open Shops", **Then** they land on the Shops dashboard.

---

### User Story 6 — Shops Onboarding Collects Branch Setup (Priority: P2)

A user completing Shops onboarding moves through four steps: selecting business type (Step 1), selecting sales model (Step 2), entering store and branch details including branch country and currency (Step 3), and reviewing the full setup (Step 4). Branch currency defaults from the selected branch country but can be changed manually. The Review step displays all collected data with qualified labels ("Branch country", "Branch currency" — not generic "Country" or "Currency"). Finishing saves the setup locally and routes to the Shops dashboard.

**Why this priority**: This is the Shops equivalent of workspace onboarding. Without it, no one can reach the Shops dashboard for the first time.

**Independent Test**: Open Shops from the App Launcher. On Step 3, select "Saudi Arabia" as branch country — verify currency auto-updates to "SAR". Manually change currency to "USD" — verify it stays "USD" without resetting. Reach Review (Step 4) — verify "Branch country" shows "Saudi Arabia" and "Branch currency" shows "USD". Click "Finish setup" — verify routing to Shops `/dashboard`. Open DevTools and confirm `shops_store_name`, `shops_branch`, `shops_country`, `shops_currency`, and `shops_onboarding_done` are all set.

**Acceptance Scenarios**:

1. **Given** the user selects a branch country on Step 3, **Then** the branch currency automatically updates to the default for that country (Egypt→EGP, Saudi Arabia→SAR, UAE→AED, Kuwait→KWD, Qatar→QAR).
2. **Given** the currency has auto-updated, **When** the user manually changes the currency, **Then** the manual selection is preserved.
3. **Given** the user reaches Step 4 Review, **Then** summary cards show: Workspace, Business Type, Sales Model, Store Name, Main Branch, Branch country, Branch currency — all with correct values.
4. **Given** the user clicks "Finish setup", **Then** all five session keys are written and the user is routed to `/dashboard`.
5. **Given** the user has not completed all required fields (store name and branch), **Then** the "Continue" button on Step 3 remains disabled.

---

### User Story 7 — Shops Dashboard Reflects Session Data (Priority: P2)

After completing Shops onboarding, the user sees the Shops dashboard. The store name shown in the topbar or store selector comes from `shops_store_name`, not a hardcoded value or workspace name. The branch name comes from `shops_branch`. The currency indicator uses `shops_currency`. "Back to Platform" navigates the user back to the Core Platform at a stable, working route.

**Why this priority**: The dashboard is the end-state of the journey. If it displays incorrect or hardcoded data, the end-to-end flow feels broken even if all preceding steps worked.

**Independent Test**: Complete Shops onboarding with store name "Cairo Electronics" and branch "Maadi Main". Open the Shops dashboard. Verify the store selector/topbar shows "Cairo Electronics" (not a hardcoded name). Verify the branch shows "Maadi Main". Click "Back to Platform" — verify navigation to a working Core Platform page (e.g., `/dashboard` or `/dashboard/apps`).

**Acceptance Scenarios**:

1. **Given** the user has completed Shops onboarding with store name "Cairo Electronics", **Then** the Shops dashboard topbar/store selector displays "Cairo Electronics".
2. **Given** the user has set branch "Maadi Main" in Shops onboarding, **Then** the Shops dashboard branch selector displays "Maadi Main".
3. **Given** the user clicks "Back to Platform" in the Shops dashboard, **Then** they are taken to a working Core Platform page — no 404.
4. **Given** `shops_currency` is "EGP", **Then** any currency display on the Shops dashboard reflects "EGP".

---

### User Story 8 — Returning User Skips Onboarding (Priority: P2)

A user who has already completed workspace onboarding and/or Shops onboarding is not forced through those flows again. Logging in after workspace onboarding routes directly to `/workspaces`. Opening Shops after Shops onboarding routes directly to the Shops dashboard, not the Shops onboarding flow.

**Why this priority**: Without correct completion-state detection, returning users are stuck in onboarding loops, making the platform feel broken.

**Independent Test**: Complete the full journey (Register → Login → Workspace Onboarding → App Launcher → Shops Onboarding → Shops Dashboard). Navigate to `/login` again. Click "Sign In". Verify routing to `/workspaces` (not `/onboarding`). Click "Open Shops" from the App Launcher again. Verify routing to Shops `/dashboard` (not Shops `/onboarding`).

**Acceptance Scenarios**:

1. **Given** `core_workspace_onboarding_done` is set, **When** the user signs in, **Then** they are routed to `/workspaces`, not `/onboarding`.
2. **Given** `shops_onboarding_done` is set, **When** the user opens Shops from the App Launcher, **Then** they land on the Shops dashboard, not Shops onboarding.
3. **Given** `shops_onboarding_done` is set and the user navigates directly to Shops `/onboarding`, **Then** they are shown a "setup complete" state or redirected to the Shops dashboard — they are not re-shown the onboarding steps.

---

### Edge Cases

- What if the user opens Shops before completing workspace onboarding? The journey is designed sequentially — Core workspace onboarding must come first. This edge case is out of scope; the App Launcher is only reachable after workspace onboarding.
- What if the user clears session storage mid-journey and navigates to a dashboard page? Session data will be missing — components must show fallback values rather than errors or empty strings.
- What if the user completes workspace onboarding, opens Shops, and then clears session storage? On next login, they will go through workspace onboarding again (since `core_workspace_onboarding_done` was cleared). This is expected and documented.
- What if the user types a store name with special characters (e.g., apostrophes)? Values are stored and displayed as plain strings — no sanitisation is required for this mock flow.
- What if the user clicks "Back" in the browser during Shops onboarding? The step state should return to the previous step — each "Back" button in the stepper handles this within the component.
- What if the landing page's Get Started links point to Core Platform but Core Platform is not running locally? The user will see a browser error — this is a dev environment constraint, not a product bug.

---

## Requirements *(mandatory)*

### Functional Requirements

**Landing:**

- **FR-001**: The hero "Get Started" button MUST route to the Core Platform login or register page.
- **FR-002**: The header "Get Started" button MUST route to the Core Platform login or register page.
- **FR-003**: No CTA link on the landing page MAY produce a 404 or navigate to a non-existent route.

**Register:**

- **FR-004**: Clicking "Create Account" MUST save the entered full name to `core_mock_user_name` in session storage.
- **FR-005**: Clicking "Create Account" MUST save the entered email to `core_mock_user_email` in session storage.
- **FR-006**: No password value MUST be saved to session storage under any key.
- **FR-007**: After saving, the user MUST be navigated to `/login`.

**Login:**

- **FR-008**: Clicking "Sign In" MUST route to `/onboarding` when `core_workspace_onboarding_done` is absent.
- **FR-009**: Clicking "Sign In" MUST route to `/workspaces` when `core_workspace_onboarding_done` is present.
- **FR-010**: When no mock user name/email exists, clicking "Sign In" MUST write fallback values ("Workspace owner", "owner@nexoraxs.local") before routing.
- **FR-011**: When mock user name/email already exist, "Sign In" MUST NOT overwrite them.

**Core Workspace Onboarding:**

- **FR-012**: Changing the Region select MUST update the Country select to show only countries relevant to the new region.
- **FR-013**: Changing the Region select MUST reset the Country selection to the first country of the new region.
- **FR-014**: The Step 3 Review "Team owner" card MUST display `core_mock_user_name` from session storage.
- **FR-015**: If `core_mock_user_name` is absent, "Team owner" MUST display "Workspace owner".
- **FR-016**: No hardcoded personal name (e.g., "Mustafa Ahmed") MAY appear in the Review step.
- **FR-017**: Completing onboarding MUST save workspace setup locally and set `core_workspace_onboarding_done`.
- **FR-018**: Completing onboarding MUST route to `/dashboard/apps`.

**Core App Launcher:**

- **FR-019**: `/dashboard/apps` MUST load without a 404.
- **FR-020**: The "Open Shops" button MUST navigate to the Shops app in the same browser tab.
- **FR-021**: If Shops onboarding is complete, "Open Shops" MUST route to the Shops dashboard.
- **FR-022**: If Shops onboarding is not complete, "Open Shops" MUST route to Shops onboarding.

**Shops Onboarding:**

- **FR-023**: Step 3 MUST include a "Branch country" select with at least Egypt, Saudi Arabia, UAE, Kuwait, Qatar.
- **FR-024**: Step 3 MUST include a "Branch currency" select with at least EGP, SAR, AED, KWD, QAR.
- **FR-025**: Selecting a branch country MUST auto-update branch currency to the country default.
- **FR-026**: The user MUST be able to manually override branch currency after auto-update.
- **FR-027**: The Step 4 Review MUST show all seven summary items: Workspace, Business Type, Sales Model, Store Name, Main Branch, Branch country, Branch currency.
- **FR-028**: No summary item MAY use an unqualified "Country" or "Currency" label — all labels MUST include their scope ("Branch country", "Branch currency").
- **FR-029**: Clicking "Finish setup" MUST write: `shops_store_name`, `shops_branch`, `shops_country`, `shops_currency`, `shops_onboarding_done`.
- **FR-030**: Clicking "Finish setup" MUST route to Shops `/dashboard`.
- **FR-031**: "Continue" on Step 3 MUST remain disabled until store display name and main branch are non-empty.

**Shops Dashboard:**

- **FR-032**: The store name display MUST show `shops_store_name` from session storage — not a hardcoded value.
- **FR-033**: The branch name display MUST show `shops_branch` from session storage.
- **FR-034**: Currency display MUST reflect `shops_currency`.
- **FR-035**: "Back to Platform" MUST navigate to a working Core Platform route (e.g., `/dashboard` or `/dashboard/apps`) — no 404.

**Returning User:**

- **FR-036**: If `core_workspace_onboarding_done` is set, Login MUST route to `/workspaces` (not `/onboarding`).
- **FR-037**: If `shops_onboarding_done` is set, "Open Shops" from the App Launcher MUST route to Shops `/dashboard` (not Shops `/onboarding`).
- **FR-038**: If `shops_onboarding_done` is set and the user navigates directly to Shops `/onboarding`, they MUST see a completion state or be redirected — not re-shown the onboarding steps.

**General:**

- **FR-039**: No backend or API calls MAY be introduced.
- **FR-040**: No new packages MAY be introduced.
- **FR-041**: No real authentication logic MAY be introduced.
- **FR-042**: All data persistence MUST use session storage only.
- **FR-043**: No password MUST be stored under any key.

### Key Entities

- **MockUser**: `core_mock_user_name` (string), `core_mock_user_email` (string) — written at Register; fallback written at Login.
- **WorkspaceSetup**: `core_workspace_onboarding_done` (flag), plus workspace name/slug/region/country stored as JSON — written at end of workspace onboarding.
- **ShopsSetup**: `shops_store_name`, `shops_branch`, `shops_country`, `shops_currency`, `shops_onboarding_done` — written at end of Shops onboarding.
- **Fallback identity**: name = "Workspace owner", email = "owner@nexoraxs.local" — written at Login when no MockUser exists.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can complete the entire journey — landing → register → login → workspace onboarding → app launcher → Shops onboarding → Shops dashboard — without typing any URLs directly. Every navigation happens through clickable UI elements.
- **SC-002**: No 404 page appears at any intended step of the journey — verified by visiting each route in sequence.
- **SC-003**: After registering as "Mustafa Mohamed" with email "mustafa@example.com", those exact values appear in session storage and are displayed in: Workspace Onboarding Review (Team owner), Workspaces page user pill, Core Dashboard Topbar, and Core Settings Profile.
- **SC-004**: No hardcoded string "Mustafa Ahmed" appears in any source file across landing, core-platform, or shops-app — verified by text search.
- **SC-005**: After completing Shops onboarding with store name "Cairo Electronics", the Shops dashboard displays "Cairo Electronics" — not a hardcoded name.
- **SC-006**: `pnpm --filter landing lint` passes with zero errors.
- **SC-007**: `pnpm --filter core-platform lint` passes with zero errors.
- **SC-008**: `pnpm --filter shops-app lint` passes with zero errors.
- **SC-009**: `pnpm --filter landing build`, `pnpm --filter core-platform build`, and `pnpm --filter shops-app build` all exit with zero errors.
- **SC-010**: Selecting "Saudi Arabia" on Shops Step 3 automatically updates Branch currency to "SAR" — verified by interaction.
- **SC-011**: After completing the full journey, signing in again routes to `/workspaces` (not `/onboarding`) — verified by interaction.
- **SC-012**: After completing Shops onboarding, opening Shops from the App Launcher routes to the Shops dashboard (not Shops onboarding) — verified by interaction.

---

## Assumptions

- All three apps (landing, core-platform, shops-app) run locally and are accessible via their respective localhost ports during development.
- "Get Started" links on the landing page use environment variables or a configured URL constant to point to the Core Platform — not hardcoded localhost strings in component code.
- The Core Platform "Open Shops" button in the App Launcher uses an environment variable or URL constant for the Shops app URL — not a hardcoded localhost string.
- Session storage is the correct persistence mechanism for all mock data. Browser tab close clears the session — this is expected and documented.
- The `shops_onboarding_done` key is already read by the Shops onboarding page to detect a returning user and show a completion state or redirect.
- "Back to Platform" in the Shops Sidebar already points to the Core Platform dashboard — this spec verifies it works, not that it needs to be added from scratch.
- The "Workspace" shown in the Shops Step 4 Review is a hardcoded placeholder ("Mustafa's Co.") — it does not need to read from `core_workspace_setup` because workspace-to-Shops data sharing is intentionally minimal in this mock flow.
- Currency display on the Shops dashboard reads `shops_currency`, not `core_workspace_country`. These are independent as specified in feature 024.
- No landing page redesign is required — only routing fixes if CTAs are broken.
- No Shops dashboard redesign is required — only data-source fixes if values are hardcoded or missing.
- This is a QA and connection feature, not a redesign. Changes must be surgical and minimal.
