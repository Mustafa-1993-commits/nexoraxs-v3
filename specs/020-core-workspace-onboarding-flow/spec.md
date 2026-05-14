# Feature Specification: Core Workspace Onboarding Flow

**Feature Branch**: `020-core-workspace-onboarding-flow`
**Created**: 2026-05-14
**Status**: Draft
**Design Reference**: `docs/magicpatterns/` (visual inspiration only — no package dependencies)

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Step 1: Create Workspace (Priority: P1) 🎯 MVP

A first-time user arrives at the Core Platform `/onboarding` page. They see a clear prompt to set up their company's workspace — the central account that all apps will live under. They fill in a workspace name (e.g., "Mustafa's Co."), see a slug auto-generated from the name (e.g., "mustafas-co"), pick a region from a dropdown, and choose a default currency. A short informational note explains what these fields mean. Clicking "Continue" advances to Step 2.

**Why this priority**: Workspace creation is the foundation. Without the workspace identity established, Steps 2 and 3 have nothing to display. It anchors the user's mental model — workspace = company account, not shop.

**Independent Test**: Open `/onboarding` in a clean session. Step 1 is shown with a step indicator ("Step 1 of 3"). A workspace name input is present. Typing "Mustafa's Co." auto-generates the slug "mustafas-co" in the slug preview field. Region and currency selects have valid options. "Continue" is disabled when workspace name is empty. Filling the name enables "Continue".

**Acceptance Scenarios**:

1. **Given** the user opens `/onboarding`, **When** the page loads, **Then** Step 1 is shown with a step indicator displaying "Step 1 of 3" (or equivalent).
2. **Given** the workspace name field is empty, **Then** "Continue" is disabled.
3. **Given** the user types "Mustafa's Co." in the workspace name field, **Then** the slug preview auto-populates with a slug derived from the name (e.g., "mustafas-co") without the user needing to type it.
4. **Given** the user manually edits the slug, **Then** the auto-slug generation stops for that session — the slug is no longer overwritten when the workspace name changes.
5. **Given** the workspace name is non-empty, **Then** "Continue" is enabled and clicking it advances to Step 2.
6. **Given** a region dropdown is visible, **Then** it offers at least 2 options (e.g., "EU Central", "Middle East", "US East").
7. **Given** a currency dropdown is visible, **Then** it offers at least 5 options (EGP, USD, SAR, AED, EUR).

---

### User Story 2 — Step 2: Choose Apps (Priority: P1)

The user sees a list of available apps to enable for their workspace. NexoraXS Shops is selectable and shown as available. All other apps (Clinics, Maintenance, Restaurants, CRM) are shown but marked "Coming Soon" and cannot be selected. At least one app must be selected to proceed. Shops is pre-selected by default. The user can toggle Shops on/off. "Continue" is disabled if no app is selected.

**Why this priority**: App selection happens at the workspace level — this is where Core Platform decides which apps are enabled for the workspace. This separation is critical: the decision to enable Shops happens here, not inside Shops itself.

**Independent Test**: After completing Step 1, Step 2 is shown. Five app cards are visible. "NexoraXS Shops" shows an "Enabled" or "Selected" badge and is pre-selected. The other four cards are greyed out and show "Coming Soon". Deselecting Shops disables "Continue". Re-selecting Shops re-enables "Continue".

**Acceptance Scenarios**:

1. **Given** the user is on Step 2, **Then** five app cards are visible: NexoraXS Shops, Clinics, Maintenance, Restaurants, CRM.
2. **Given** NexoraXS Shops card is visible, **Then** it is selectable and pre-selected by default on first visit to this step.
3. **Given** the other four app cards (Clinics, Maintenance, Restaurants, CRM) are visible, **Then** each shows a "Coming Soon" badge and cannot be toggled.
4. **Given** Shops is selected, **Then** "Continue" is enabled.
5. **Given** the user deselects Shops (the only available app), **Then** "Continue" becomes disabled.
6. **Given** the user clicks "Back", **Then** Step 1 is shown with the workspace name, slug, region, and currency still populated.

---

### User Story 3 — Step 3: Review Workspace (Priority: P1)

The user sees a summary of their workspace setup: name, slug (displayed as `nexoraxs.com/[slug]`), region, currency, team owner ("Mustafa Ahmed" — static mock), and enabled apps. A "ready to launch" confirmation card or banner is shown. The primary action "Continue to dashboard" navigates to `/dashboard/apps`. A secondary stepper label indicates this is the final step.

**Why this priority**: The review step is the payoff — it makes the user feel their workspace is real and complete before they enter the product. Without it, onboarding ends abruptly.

**Independent Test**: After completing Step 2, Step 3 is shown. All workspace details are visible in summary cards. The enabled apps list shows "NexoraXS Shops". A "Continue to dashboard" button is present and clicking it navigates to `/dashboard/apps`. No form fields are visible — Step 3 is display-only.

**Acceptance Scenarios**:

1. **Given** the user is on Step 3, **Then** a heading or sub-heading reading "Your workspace is ready" (or similar) is visible.
2. **Given** the workspace summary is shown, **Then** it displays: workspace name, slug with the `nexoraxs.com/` prefix, region, currency, and team owner ("Mustafa Ahmed" — static mock).
3. **Given** the apps summary is shown, **Then** it displays the list of enabled apps (at minimum "NexoraXS Shops").
4. **Given** the primary CTA is visible, **Then** clicking "Continue to dashboard" navigates to `/dashboard/apps`.
5. **Given** Step 3 is shown, **Then** no editable input fields are present — the step is entirely read-only.
6. **Given** the user clicks "Back", **Then** Step 2 is shown with the same app selection state.

---

### User Story 4 — Returning User Behaviour (Priority: P2)

If a user has already completed workspace onboarding (indicated by a session flag), navigating to `/onboarding` should either redirect to `/dashboard/apps` or show a completion card with a "Go to dashboard" link — not force the user through the setup flow again.

**Why this priority**: Without this guard, every navigation to `/onboarding` restarts the flow, which is disorienting for users who have already set up their workspace.

**Independent Test**: Complete the full 3-step flow and click "Continue to dashboard". Then navigate back to `/onboarding` without clearing session. A completion card ("Workspace already set up") or redirect to `/dashboard/apps` occurs — the 3-step flow is not shown again.

**Acceptance Scenarios**:

1. **Given** the workspace onboarding was previously completed, **When** the user navigates to `/onboarding`, **Then** the three-step flow is NOT shown; either a redirect or a "workspace ready" card appears.
2. **Given** the completion state is shown, **Then** a "Go to dashboard" link pointing to `/dashboard/apps` is visible.
3. **Given** session is cleared (fresh start), **When** the user navigates to `/onboarding`, **Then** Step 1 of the 3-step flow is shown.

---

### Edge Cases

- What if the workspace name is cleared after the slug was auto-generated? The slug should remain (it was generated and is now treated as user-confirmed) — the "Continue" button becomes disabled since the name is now empty.
- What if the user manually sets the slug to an empty string? The slug field should show a validation hint or prevent advance — workspace name and slug are both required.
- What if sessionStorage is unavailable (SSR)? All session reads must guard against `typeof window === "undefined"` to prevent server-side rendering crashes.
- What if the user uses browser Back after clicking "Continue to dashboard"? They should see the completion state (not the step form), since the completion flag is in session.
- What happens if Shops is the only available app and the user deselects it? "Continue" is disabled; a helper note should indicate at least one app must be selected.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A new route `/onboarding` MUST be added to `apps/core-platform`. This route MUST NOT use the existing dashboard layout (Sidebar + Topbar) — it is a standalone full-screen flow with its own minimal header.
- **FR-002**: The `/onboarding` page MUST implement a 3-step flow: (1) Create Workspace, (2) Choose Apps, (3) Review. All within a single page URL — no new sub-routes.
- **FR-003**: A visible step indicator MUST be shown throughout all three steps, showing current position (e.g., "Step 2 of 3" or numbered pills with labels).
- **FR-004**: Step 1 MUST include inputs for: workspace name (text, required), slug (text, auto-generated from name, editable), region (select), and default currency (select).
- **FR-005**: The slug MUST auto-populate from the workspace name (lowercased, spaces replaced with hyphens, non-alphanumeric characters removed). Once the user manually edits the slug, auto-population MUST stop.
- **FR-006**: "Continue" on Step 1 MUST be disabled when the workspace name is empty or the slug is empty.
- **FR-007**: Step 2 MUST show 5 app cards: NexoraXS Shops (selectable, pre-selected by default), and Clinics, Maintenance, Restaurants, CRM (non-selectable, "Coming Soon").
- **FR-008**: "Continue" on Step 2 MUST be disabled when no app is selected.
- **FR-009**: Step 3 MUST display a read-only summary: workspace name, slug (with `nexoraxs.com/` prefix), region, currency, team owner (static: "Mustafa Ahmed"), and enabled apps list.
- **FR-010**: The primary action on Step 3 MUST be "Continue to dashboard" which navigates to `/dashboard/apps`.
- **FR-011**: When workspace onboarding is marked complete in session, navigating to `/onboarding` MUST NOT show the step form — instead show a completion state or redirect.
- **FR-012**: A "Back" button MUST be present from Steps 2 and 3, navigating back to the prior step without losing entered data.
- **FR-013**: No new packages may be introduced. All icons use the existing `IconName` type from `apps/core-platform/lib/types.ts` (with additions as needed for new icon shapes).
- **FR-014**: No cross-app imports. All changes are scoped to `apps/core-platform`.
- **FR-015**: No form submission to any backend. All data is held in React state and written to sessionStorage for the duration of the session.
- **FR-016**: No localhost URLs, no external links in the onboarding flow. "Continue to dashboard" links to `/dashboard/apps` (a real within-app path).
- **FR-017**: The onboarding UI MUST match the existing Core Platform dark premium aesthetic (`bg-[#0a0a0f]` or equivalent, white text, card-based layout, consistent with `/dashboard` style).
- **FR-018**: The flow MUST be responsive — all three steps MUST be usable at 375px viewport width without horizontal overflow.

### Key Entities

- **WorkspaceSetup**: `{ workspaceName: string; slug: string; region: string; currency: string }` — React state, persisted to sessionStorage on completion.
- **EnabledApps**: `{ shops: boolean }` — only `shops` is currently toggleable; all other app flags default to `false` and are non-interactive.
- **WorkspaceOnboardingDone**: boolean flag in sessionStorage (`core_workspace_onboarding_done`) — written on "Continue to dashboard" click.
- **OnboardingStep**: `1 | 2 | 3` — React state only, not persisted.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can complete the full 3-step workspace onboarding and arrive at `/dashboard/apps` in a fresh session — verified end-to-end with browser DevTools open showing zero errors.
- **SC-002**: After clicking "Continue to dashboard", the sessionStorage flag `core_workspace_onboarding_done` is present — verified via DevTools → Application → Session Storage.
- **SC-003**: The slug auto-generates from the workspace name for the first typed character — verified by typing "Test" in the name field and confirming the slug shows "test".
- **SC-004**: Deselecting Shops disables "Continue" on Step 2 — verified by clicking the Shops card twice and confirming the button enters a disabled state.
- **SC-005**: Returning to `/onboarding` after completion does not show the 3-step form — verified by completing the flow, navigating to `/dashboard/apps`, then navigating back to `/onboarding`.
- **SC-006**: `pnpm lint` in `apps/core-platform` exits with zero errors.
- **SC-007**: `pnpm tsc --noEmit` in `apps/core-platform` exits with zero errors.
- **SC-008**: `pnpm --filter core-platform build` exits with zero errors and `/onboarding` appears as a compiled route.

---

## Assumptions

- The new `/onboarding` route in `apps/core-platform` does NOT use the existing dashboard layout (`app/dashboard/layout.tsx`) — it is added as a standalone route directly under `app/onboarding/page.tsx` with its own minimal header matching the Core Platform brand bar style.
- The Core Platform `Icon.tsx` component uses the `IconName` type from `lib/types.ts`. New icons required for the onboarding flow will be added to this type and the paths map as needed — no new packages.
- Workspace data (name, slug, region, currency) and app selections are stored in React state and written to sessionStorage only when "Continue to dashboard" is clicked (not persisted at each step). This is a simplification of the production flow — in production these would be API calls.
- The team owner displayed in the review step is a static mock value ("Mustafa Ahmed") — no user profile API or auth state is required.
- The slug auto-generation uses a simple client-side transform: lowercase, replace spaces with hyphens, strip non-alphanumeric characters (except hyphens). This runs entirely in the browser with no validation against existing slugs.
- App selection state (`shops: boolean`) is initialised to `true` (Shops pre-selected) on Step 2 load, and is held in React state only — it is included in the sessionStorage write on completion.
- The `core_workspace_onboarding_done` key is specific to core-platform and separate from the shops-app key `shops_onboarding_done`. These are two distinct onboarding flows in two separate apps.
- The existing `/dashboard/apps` route serves as the primary destination after workspace onboarding completes — no new routes are created for this.
- No changes are made to the existing core-platform `/login`, `/register`, or `/dashboard` routes.
