# Feature Specification: Workspace Selector Polish

**Feature Branch**: `007-workspace-selector-polish`
**Created**: 2026-05-12
**Status**: Draft
**Scope**: `apps/core-platform/app/workspaces/page.tsx` only — plus enriching `lib/mock-data/workspaces.ts`. No backend, no API, no new packages, no CDN, no external scripts.

---

## User Scenarios & Testing

### User Story 1 — User Selects a Workspace and Continues (Priority: P1)

A user who has just signed in lands on the workspace selector. They see a polished
full-screen page with background effects, a top brand bar with their user info, a
centered heading, and a list of their workspaces as selectable cards. They click a
card to select it and press "Continue" to enter the dashboard.

**Why this priority**: This is the entire purpose of the page. Without selection
and navigation, the page is non-functional.

**Independent Test**: Open `/workspaces`. Three workspace cards are visible. Clicking
a card visually highlights it (border/background change). The "Continue" button is
enabled when a card is selected and navigates to `/dashboard` when clicked.

**Acceptance Scenarios**:

1. **Given** a user opens `/workspaces`, **When** the page loads, **Then** they
   see a full-screen dark page with the NexoraXS logo in the top-left and their
   user info ("Mustafa A. / mustafa@nexoraxs.com") in the top-right.

2. **Given** a user views the workspace list, **When** they click a workspace card,
   **Then** that card gains a highlighted border and background (selected state)
   and the "Continue" button becomes active.

3. **Given** a user has selected a workspace, **When** they click "Continue",
   **Then** they are navigated to `/dashboard`.

4. **Given** no workspace is selected, **When** a user views the Continue button,
   **Then** it appears visually inactive or greyed out.

---

### User Story 2 — User Sees Rich Workspace Card Details (Priority: P1)

Each workspace card displays the workspace name, a coloured initials avatar, a plan
badge, and meta information (members count, apps count, region) so the user can
identify the right workspace at a glance.

**Why this priority**: With multiple workspaces, the user needs enough information
to choose correctly. Plain name-only cards are insufficient.

**Independent Test**: Each workspace card shows: coloured initials avatar, workspace
name, a badge label (e.g. "Beta"), members count, apps count, region, and a right-
pointing arrow. The avatar colour differs per workspace.

**Acceptance Scenarios**:

1. **Given** a user views the workspace list, **When** they look at a card,
   **Then** they see: coloured gradient initials avatar, workspace name, a badge,
   member count, app count, region label, and a chevron arrow.

2. **Given** three workspace cards are shown, **When** the user looks at avatars,
   **Then** each avatar has a distinct gradient colour (blue, purple, cyan).

---

### User Story 3 — User Can Create a New Workspace or Get Support (Priority: P2)

Below the workspace list, a "New workspace" button is visible (no action). A support
footer provides links to Documentation and Support. A copyright footer anchors the
bottom of the page.

**Why this priority**: These are secondary affordances. The primary flow (select +
continue) is P1. These complete the page without blocking the core flow.

**Independent Test**: Below the Continue button, a "+ New workspace" button is visible
(type="button", no action). At the bottom of the page, "Documentation" and "Support"
links and a copyright line are visible.

**Acceptance Scenarios**:

1. **Given** a user views the page, **When** they look below the Continue button,
   **Then** they see a "+ New workspace" button that does nothing when clicked.

2. **Given** a user scrolls to the bottom, **When** they view the footer,
   **Then** they see "Documentation" and "Support" links and a copyright line.

---

### Edge Cases

- What if no workspace is selected and the user tries to continue? The Continue
  button is visually inactive; clicking it does nothing.
- What if there is only one workspace? It is displayed as a single card and may
  be auto-focused, but selection is still required before Continue.
- What if the viewport is 375px wide? All cards stack vertically, the top bar
  remains readable, no horizontal overflow.

---

## Requirements

### Functional Requirements

- **FR-001**: The page MUST display a full-screen dark background (`#0a0a0f`) with
  a subtle CSS grid pattern overlay and coloured glow blobs (blue, purple, cyan).

- **FR-002**: A top brand bar MUST be displayed across the full width containing:
  the NexoraXS Logo component on the left, and a user info pill ("MA" avatar +
  "Mustafa A." + email) and a "Sign out" link to `/login` on the right.

- **FR-003**: A centred heading section MUST display "Select a workspace" as the
  title and a descriptive subtitle below it.

- **FR-004**: Each workspace card MUST display:
  - A coloured gradient initials avatar
  - Workspace name in bold
  - A plan badge (e.g. "Beta")
  - Member count, app count, region as meta labels
  - A right-pointing chevron arrow

- **FR-005**: Clicking a workspace card MUST update the selected workspace in local
  state. The selected card MUST render with a visible blue border and subtle
  blue-tinted background to distinguish it from unselected cards.

- **FR-006**: A "Continue" button MUST be present below the card list. When a
  workspace is selected, clicking it MUST navigate to `/dashboard`. When no
  workspace is selected, clicking it MUST do nothing.

- **FR-007**: A "+ New workspace" button MUST be present below the Continue button
  as a `type="button"` with no navigation or action.

- **FR-008**: A support footer with "Documentation" and "Support" placeholder links
  and a copyright line MUST appear at the bottom of the page.

- **FR-009**: The page MUST be fully responsive at 375px with no horizontal overflow.

- **FR-010**: No new npm packages MAY be installed. The `Logo`, `Icon`, and design
  utility classes from `globals.css` (`.card`, `.chip`, `.btn-primary`,
  `.gradient-text`) MUST be reused where applicable.

- **FR-011**: The workspace mock data MUST be enriched with `color`, `members`,
  `apps`, and `region` fields.

### Key Entities

- **Workspace** (enriched): `{ id, name, type, initials, color, members, apps, region }`
- **Selected state**: `string | null` — the `id` of the currently selected workspace

---

## Success Criteria

- **SC-001**: All three workspace cards render with coloured avatars, badges, and
  meta info on desktop and mobile.
- **SC-002**: Clicking a card updates the selected state with a visible visual change.
- **SC-003**: "Continue" navigates to `/dashboard` only when a workspace is selected.
- **SC-004**: Page has no horizontal overflow at 375px.
- **SC-005**: `pnpm --filter core-platform build` passes with zero errors.

---

## Assumptions

- The page is a standalone Client Component (`"use client"`) to support local
  selection state and `useRouter()` for navigation.
- The `Logo` component from `components/ui/Logo.tsx` and the `Icon` component
  from `components/ui/Icon.tsx` are already available and will be reused.
- The CSS utility classes (`.card`, `.chip`, `.btn-primary`, `.gradient-text`,
  `.nav-item`) from `globals.css` are already defined and available.
- The grid background pattern is implemented with a CSS `background-image` using
  linear gradients — no new package required.
- The sign-out link navigates to `/login` with no actual session logic.
- The `chevron-right` icon name already exists in the `Icon` component.
