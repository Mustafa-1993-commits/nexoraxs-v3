# Feature Specification: Core Platform UX Alignment

**Feature Branch**: `041-core-platform-ux-alignment`
**Created**: 2026-06-03
**Status**: Draft
**Architecture**: v5.3 Final Master Architecture

---

## Overview

Produce the best-possible Core Platform MVP experience by merging three design directions into one coherent product:

1. **Reference direction A (Claude Design)**: modern horizontal stepper, centered setup cards, polished Product Hub, Team & Access modal, notifications dropdown, user menu, Integrations Hub.
2. **Reference direction B (Magic Patterns)**: clear setup flow logic — Language → Workspace → Business Unit → Main Branch.
3. **Current NexoraXS project**: preserve the premium dark visual identity, existing auth routes, Product Hub foundation, and existing component patterns.

**Login is out of scope and must remain unchanged.**

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Owner completes the new 4-step Core Platform onboarding (Priority: P1)

A new user who has just registered arrives at the Core Platform onboarding. They are guided through four steps in sequence: choose interface language, create the workspace, create the first Business Unit, and create the Main Branch. At the end, the platform marks onboarding complete and takes the user to the dashboard. A polished horizontal stepper shows progress throughout.

**Why this priority**: The current 3-step flow (Workspace → Apps → Review) does not establish Business Unit or Branch context — both of which are required for the Product Hub, Team & Access, and POS flows to work correctly. The new flow is the architectural foundation for the entire MVP.

**Independent Test**: Open Core Platform as a new user (no session data). The onboarding screen appears with a 4-step horizontal stepper. Complete all four steps. The dashboard loads and the correct session keys are written. The stepper correctly shows completed steps.

**Acceptance Scenarios**:

1. **Given** a user opens Core Platform with no onboarding data, **When** the onboarding screen loads, **Then** a horizontal stepper shows 4 labeled steps: Language, Workspace, Business Unit, Main Branch — Step 1 is active, Steps 2–4 are upcoming.
2. **Given** the user is on Step 1 (Language), **When** they select English or Arabic, **Then** the interface language and direction update immediately (EN=LTR, AR=RTL) and `core_locale` is written.
3. **Given** the user is on Step 2 (Workspace), **When** they fill workspace name, select country and currency, and click Continue, **Then** `core_workspace_name`, `core_workspace_country`, `core_workspace_currency`, `core_workspace_timezone` are written.
4. **Given** the user is on Step 3 (Business Unit), **When** they fill BU name and select industry, and click Continue, **Then** `core_bu_name` and `core_bu_industry` are written.
5. **Given** the user is on Step 4 (Main Branch), **When** they fill branch name, city, and country, and click Finish, **Then** `core_branch_name`, `core_branch_city`, `core_branch_country`, and `core_onboarding_done = "true"` are written and the user is redirected to the dashboard.
6. **Given** the user is on any step after Step 1, **When** they click Back, **Then** they return to the previous step with their previous entries still filled.
7. **Given** the user has completed onboarding and refreshes, **When** the page loads, **Then** they are redirected to the dashboard, not the onboarding screen.

---

### User Story 2 — Owner controls theme and locale from onboarding and dashboard (Priority: P1)

The interface offers a theme toggle (Light/Dark) and a locale toggle (EN/AR) in both the onboarding topbar and the platform shell topbar. Switching theme immediately applies the chosen visual style. Switching locale immediately updates the document language, text direction, and all visible labels. Controls are visually consistent between onboarding and the shell.

**Why this priority**: The user description requires theme/locale to be available starting from onboarding, not buried in settings. This also ensures RTL-safe layout from the first interaction.

**Independent Test**: From the onboarding screen, click the locale toggle to switch to Arabic. The layout flips to RTL, labels change to Arabic. Click the theme toggle to switch to Light. The background becomes white/slate. Navigate to the dashboard — both toggles are still visible and the active state matches what was selected during onboarding.

**Acceptance Scenarios**:

1. **Given** the onboarding topbar is visible, **When** the user clicks the locale toggle, **Then** the interface switches between EN (LTR) and AR (RTL) and `core_locale` is updated.
2. **Given** the onboarding topbar is visible, **When** the user clicks the theme toggle, **Then** the interface switches between dark and light and `core_theme` is updated.
3. **Given** the platform shell is visible, **When** the user uses either toggle, **Then** the change takes effect immediately across the current page.
4. **Given** `core_locale = "ar"`, **When** any page loads, **Then** `document.lang = "ar"` and `document.dir = "rtl"`.
5. **Given** `core_locale = "en"`, **When** any page loads, **Then** `document.lang = "en"` and `document.dir = "ltr"`.
6. **Given** the user has set dark mode during onboarding, **When** they reach the dashboard, **Then** dark mode is still active.

---

### User Story 3 — Owner navigates the improved platform shell (Priority: P1)

The platform shell sidebar has been cleaned up to show only the primary MVP navigation links: Dashboard, Product Hub, Billing, Team & Access, Integrations, Settings. The Documentation, Changelog, Support items are removed. The bottom Beta access card is removed. The topbar shows a breadcrumb, locale toggle, theme toggle, notifications button, and user menu — all functional or clearly disabled with Coming Soon state.

**Why this priority**: Navigation dead ends and non-functional sidebar items degrade trust. Cleaning the shell makes the MVP feel finished rather than in-progress.

**Independent Test**: Open the dashboard. The sidebar shows exactly the 6 primary links. Clicking Notifications opens a dropdown with at least one mock notification. Clicking the user avatar opens a user menu dropdown with Account, Billing, Team, and Sign out items. No dead buttons exist.

**Acceptance Scenarios**:

1. **Given** the dashboard sidebar is visible, **When** the user scans the nav, **Then** they see Dashboard, Product Hub, Billing, Team & Access, Integrations, Settings — no Documentation, Changelog, or Support links.
2. **Given** the user clicks the Notifications bell, **When** the dropdown opens, **Then** it shows at least 3 mock notifications (Low stock alert, Order completed, Commerce OS plan renewal).
3. **Given** the user clicks the user avatar/initials, **When** the dropdown opens, **Then** it shows Account, Billing, Team, Sign out — each either navigating to an existing route or disabled with Coming Soon.
4. **Given** the user is on any dashboard page, **When** they view the topbar, **Then** it shows a breadcrumb matching the current page, plus locale toggle, theme toggle, notifications, and user menu.
5. **Given** a sidebar link has no implemented route, **When** the user sees it, **Then** it is disabled or shows a Coming Soon badge — no dead active links.

---

### User Story 4 — Owner sees Business Unit context in the Product Hub (Priority: P2)

The Product Hub shows Commerce OS as the active Operating System, with a pill displaying the Business Unit name (e.g. "Mustafa Pharmacy") to make clear which business entity is using it. Other OS products are clearly shown as Coming Soon. The section uses "Product Hub" and "Operating Systems" terminology — no "Apps" language.

**Why this priority**: The Business Unit context established during onboarding must be surfaced in the Product Hub so owners understand the relationship between their workspace, business unit, and OS subscriptions.

**Independent Test**: Complete onboarding with BU name "Mustafa Pharmacy". Open Product Hub. The Commerce OS card shows a pill with "Mustafa Pharmacy". No "Apps" text appears anywhere on the page.

**Acceptance Scenarios**:

1. **Given** onboarding is complete with a Business Unit name, **When** the owner views Product Hub, **Then** the Commerce OS card shows a pill with the Business Unit name.
2. **Given** the user views Product Hub, **When** they scan the page, **Then** no instance of the word "Apps" appears as a section label or card label — only "Product Hub", "Operating Systems", or OS names.
3. **Given** the user views Product Hub, **When** they see the non-Commerce OS cards, **Then** each shows a Coming Soon badge and any action button is disabled or not shown.
4. **Given** the Commerce OS card is visible, **When** the user clicks the primary action, **Then** it navigates to the Commerce OS URL or is disabled if the route is not available.

---

### User Story 5 — Owner manages team access with a polished Invite User modal (Priority: P2)

The Team & Access page shows the current workspace team and an Invite User button. Clicking it opens a modal with fields for email, name (optional), workspace role, assigned Operating System, Business Unit access, branch access, and OS role. Submitting the form writes mock data to the session and adds the user to the team list. No real email is sent and no backend is called.

**Why this priority**: Team management is required for the MVP to be demoable to multi-user business scenarios, and the modal design is explicitly required by the reference screens.

**Independent Test**: Navigate to Team & Access. Click Invite User. The modal opens. Fill in email, select Commerce OS, select the main Business Unit, and click Send Invite. The modal closes and the team list shows the new mock member. Refreshing clears the mock data (session only).

**Acceptance Scenarios**:

1. **Given** the owner navigates to Team & Access, **When** the page loads, **Then** at least one mock team member is shown (the workspace owner).
2. **Given** the owner clicks Invite User, **When** the modal opens, **Then** it shows: email (required), name (optional), workspace role selector, OS selector, Business Unit selector, branch selector, OS role selector.
3. **Given** the modal is open with OS set to Commerce OS, **When** the OS role selector is visible, **Then** available roles are: Commerce Admin, Branch Manager, Cashier, Inventory Manager, Accountant, Viewer.
4. **Given** the owner fills required fields and clicks Send Invite, **When** the form submits, **Then** the modal closes, no real email is sent, and the team list shows the invited mock member.
5. **Given** the owner tries to submit with an empty email, **When** they click Send Invite, **Then** an inline validation error appears and the form does not close.

---

### User Story 6 — Owner views the Integrations Hub (Priority: P3)

An Integrations page in the Core Platform shows five integration cards describing the relationships between Operating Systems. All cards show Coming Soon or Notify Me state — no real integrations are active. The page communicates the cross-OS integration roadmap to the owner.

**Why this priority**: The Integrations Hub is a roadmap signal that shows the platform vision. It prevents users from looking for integrations elsewhere and sets expectations.

**Independent Test**: Navigate to Integrations from the sidebar. The page loads and shows 5 integration cards. Each card has a title, description, and a Coming Soon badge or Notify Me button. No card triggers any real action.

**Acceptance Scenarios**:

1. **Given** the owner clicks Integrations in the sidebar, **When** the page loads, **Then** 5 integration cards are visible.
2. **Given** a card is visible, **When** the owner reads it, **Then** it clearly identifies the two OS products involved and the integration direction.
3. **Given** the owner clicks any action on a card, **When** the action fires, **Then** it is either disabled or shows a Coming Soon indicator — no real action occurs.

---

### User Story 7 — Owner views a cleaned-up Settings page (Priority: P3)

The Settings page shows MVP-relevant sections: Workspace, Language & Region, Appearance, Team & Access, Billing. Dangerous or premature sections (API Keys, advanced security toggles, Delete workspace) are hidden or clearly marked Coming Soon. The page does not duplicate controls already in the topbar but links to them.

**Why this priority**: Surfacing non-functional settings degrades confidence in the product. A minimal, intentional settings page matches the MVP scope.

**Acceptance Scenarios**:

1. **Given** the owner opens Settings, **When** they scan the page, **Then** they see Workspace, Language & Region, Appearance, Team & Access, and Billing sections.
2. **Given** advanced sections like API Keys or Delete Workspace are visible, **When** the owner sees them, **Then** they are clearly marked Coming Soon or disabled — not interactable.

---

### Edge Cases

- What if the user navigates directly to `/dashboard` before completing onboarding? The app MUST redirect them to the onboarding screen.
- What if `core_locale` is not set? Default to "en" with LTR layout.
- What if `core_theme` is not set? Default to dark mode (preserve current dark identity).
- What if the user clicks Back on Step 1 of onboarding? The Back button is hidden or disabled on Step 1.
- What if the team invite modal is closed without submitting? No data is persisted and the team list is unchanged.
- What if a notification dropdown item is clicked? Items are read-only or do nothing — no navigation to unimplemented routes.
- What if the user menu "Sign out" is clicked? It clears the mock session and redirects to the login page.
- What if a sidebar link routes to a page that doesn't exist? The link must be disabled or show Coming Soon — no 404.

---

## Requirements *(mandatory)*

### Functional Requirements

**Onboarding (Steps 1–4)**

- **FR-001**: The onboarding screen MUST replace the current 3-step flow with a 4-step flow: Language (Step 1), Workspace (Step 2), Business Unit (Step 3), Main Branch (Step 4).
- **FR-002**: The onboarding screen MUST display a horizontal stepper at the top with numbered circular indicators, connecting lines between steps, and step labels.
- **FR-003**: The stepper MUST visually distinguish active, completed, and upcoming states: completed steps show a check icon, active steps are highlighted, upcoming steps are dimmed.
- **FR-004**: Step 1 (Language) MUST present English and Arabic as selectable cards. Selecting a language MUST immediately apply the corresponding locale and direction, and write `core_locale`.
- **FR-005**: Step 2 (Workspace) MUST include: Workspace Name (required), Country (required), Currency (required, auto-suggested from country), Timezone (required, auto-suggested from country).
- **FR-006**: Step 3 (Business Unit) MUST include: Business Unit Name (required), Industry (required, selectable list including Retail/Pharmacy, Restaurant/Cafe, Supermarket, Electronics, Cosmetics, Other).
- **FR-007**: Step 4 (Main Branch) MUST include: Branch Name (required), City (required), Country (required, pre-filled from Workspace country).
- **FR-008**: Each step MUST validate required fields before allowing Continue. Inline field-level errors MUST appear when Continue is clicked with empty required fields.
- **FR-009**: The Back button MUST be hidden or disabled on Step 1 and visible on Steps 2–4.
- **FR-010**: Completing Step 4 MUST write all session keys defined in the Session Storage Contract and set `core_onboarding_done = "true"`.
- **FR-011**: If `core_onboarding_done = "true"` exists in session, any visit to the onboarding route MUST redirect to the dashboard.
- **FR-012**: The onboarding topbar MUST include a locale toggle and a theme toggle. Login page MUST NOT be modified.

**Theme and Locale System**

- **FR-013**: The `core_theme` session key MUST control the visual theme. Valid values: "light" | "dark". Default: "dark".
- **FR-014**: The `core_locale` session key MUST control the interface language. Valid values: "en" | "ar". Default: "en".
- **FR-015**: When `core_locale = "ar"`, the HTML document MUST have `lang="ar"` and `dir="rtl"`. When "en", `lang="en"` and `dir="ltr"`.
- **FR-016**: Theme and locale changes MUST take effect immediately without a page reload.
- **FR-017**: The Core Platform locale system MUST use `core_locale` as the session key, not any legacy key.
- **FR-018**: The platform shell topbar MUST include locale toggle, theme toggle, notifications button, and user menu.
- **FR-019**: Theme and locale toggle controls MUST be visually identical between the onboarding topbar and the platform shell topbar.

**Platform Shell — Sidebar**

- **FR-020**: The sidebar MUST show exactly these primary links: Dashboard, Product Hub, Billing, Team & Access, Integrations, Settings.
- **FR-021**: Documentation, Changelog, and Support links MUST be removed from the sidebar.
- **FR-022**: The bottom Beta access card MUST be removed from the sidebar.
- **FR-023**: Links to pages that do not yet exist MUST be disabled or show a Coming Soon badge — not navigable to a 404.

**Platform Shell — Topbar**

- **FR-024**: The topbar MUST show the current page title as a breadcrumb or heading.
- **FR-025**: The Notifications button MUST open a dropdown showing at least 3 mock notifications: Low stock alert, Order completed, Commerce OS plan renewal.
- **FR-026**: The user menu MUST open a dropdown with: Account, Billing, Team, Sign out. Items without an implemented route MUST be disabled or marked Coming Soon.
- **FR-027**: Sign out MUST clear the mock session and navigate to the login page.

**Product Hub**

- **FR-028**: The Product Hub MUST NOT use the word "Apps" anywhere as a heading, label, or section title.
- **FR-029**: The Commerce OS card MUST display the Business Unit name (from `core_bu_name`) as a pill or badge.
- **FR-030**: Commerce OS MUST be the only non-Coming-Soon card. All other OS cards MUST show a Coming Soon badge.
- **FR-031**: The Commerce OS primary action button MUST either navigate to the Commerce OS URL or be disabled with a clear label — not a dead active button.

**Team & Access**

- **FR-032**: A `/dashboard/team` page MUST exist with a team member list and an Invite User button.
- **FR-033**: The Invite User modal MUST include: email (required), name (optional), workspace role selector, OS selector, Business Unit selector, Branch selector, OS role selector.
- **FR-034**: When Commerce OS is selected in the modal, the OS role selector MUST offer: Commerce Admin, Branch Manager, Cashier, Inventory Manager, Accountant, Viewer.
- **FR-035**: Submitting a valid invite MUST close the modal and add a mock member to the team list. No real email is sent.
- **FR-036**: Submitting with an empty required email field MUST show an inline validation error and NOT close the modal.

**Integrations Hub**

- **FR-037**: A `/dashboard/integrations` page MUST exist with 5 read-only integration cards.
- **FR-038**: Required integration cards: Commerce ↔ Healthcare (prescription to pharmacy), Commerce ↔ HR (employees and cashier roles), Commerce ↔ CRM (customers and campaigns), Gym ↔ HR (trainers and attendance), Maintenance ↔ Commerce (spare parts inventory sync).
- **FR-039**: Every card action button MUST be disabled or show Coming Soon — no real integration behavior.

**Settings**

- **FR-040**: The Settings page MUST surface MVP sections: Workspace, Language & Region, Appearance, Team & Access, Billing.
- **FR-041**: API Keys, advanced security toggles, and Delete Workspace MUST be hidden or clearly marked Coming Soon.

**Button behavior rule**

- **FR-042**: Every visible and enabled button in the Core Platform shell and onboarding MUST satisfy one of: (a) works as expected, (b) navigates to an existing route, or (c) is disabled or marked Coming Soon. No dead active buttons are permitted.

### Key Entities

- **OnboardingSession**: `core_locale`, `core_theme`, `core_workspace_name`, `core_workspace_country`, `core_workspace_currency`, `core_workspace_timezone`, `core_bu_name`, `core_bu_industry`, `core_branch_name`, `core_branch_city`, `core_branch_country`, `core_onboarding_done`.
- **MockTeamMember**: email, name, workspace role, OS access, Business Unit access, branch access, OS role.
- **MockNotification**: type, title, description, timestamp.
- **IntegrationCard**: OS A, OS B, integration direction, title, description, status (coming-soon).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can complete the full 4-step onboarding in under 4 minutes.
- **SC-002**: All 12 required session keys are written with correct values when onboarding completes.
- **SC-003**: Switching locale from EN to AR visibly changes text direction within 1 second — no page reload required.
- **SC-004**: Switching theme visibly changes the visual style within 1 second — no page reload required.
- **SC-005**: Zero dead (active but non-functional) buttons exist on any Core Platform page.
- **SC-006**: The sidebar shows exactly 6 primary navigation links — no more, no fewer.
- **SC-007**: The Product Hub contains zero occurrences of "Apps" as a product or section label.
- **SC-008**: The Commerce OS card in Product Hub displays the Business Unit name from the session.
- **SC-009**: The Invite User modal opens, validates required fields, and adds a mock member to the list without backend calls.
- **SC-010**: The Integrations page displays 5 cards, each showing OS relationship context and a Coming Soon state.
- **SC-011**: `pnpm --filter core-platform build` passes with zero TypeScript errors.

---

## Assumptions

- Login, register, forgot-password, and reset-password pages are out of scope and must remain unchanged.
- The dark theme default (`core_theme = "dark"`) preserves the existing NexoraXS premium dark identity; no redesign of the dark palette is needed.
- Light theme uses a clean white/light-slate SaaS palette (white background, slate/gray text, blue accents).
- The existing `lib/locale.ts` in core-platform MUST be updated to use `core_locale` as its session key instead of `nexoraxs_locale`, since `core_locale` is the authoritative key per the session storage contract.
- Country-to-currency-to-timezone mapping uses a static lookup table; no external API is needed.
- All icons use lucide-react only, not emoji or custom SVGs.
- The horizontal stepper uses the Icon component (check, arrowRight, etc.) consistent with existing usage.
- Mock team members and mock notifications are defined as static data; no persistence beyond current session.
- Commerce OS URL when launching remains the existing shops.nexoraxs.com URL environment variable.
- The Business Unit industry list is static: Retail / General, Retail / Pharmacy, Restaurant / Cafe, Supermarket, Electronics / Mobile, Cosmetics, Medical Supplies, Other.
- The existing `apps/core-platform/app/dashboard/apps/page.tsx` route remains at `/dashboard/apps` but is aliased as "Product Hub" in nav labels and page headings.
- New routes added: `/dashboard/team` (Team & Access), `/dashboard/integrations` (Integrations Hub).
- RTL support uses CSS logical properties and `dir` attribute, not separate stylesheets.
- Session data written during onboarding supersedes any legacy keys (`core_workspace_onboarding_done`, `core_workspace_setup`). Legacy keys may still exist in session but are not relied upon by the new flow.
- No external UI libraries are introduced; existing TailwindCSS + existing @nexoraxs/ui component patterns are used.
