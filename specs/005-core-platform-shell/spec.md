# Feature Specification: Core Platform UI Shell

**Feature Branch**: `005-core-platform-shell`
**Created**: 2026-05-12
**Status**: Draft
**Scope**: `apps/core-platform` only — frontend UI shell with mock data; no backend, no API calls, no authentication logic, no form submissions

---

## User Scenarios & Testing

### User Story 1 — User Sees the Login and Register Pages (Priority: P1)

A user arrives at the core platform and sees a clean, professional login
page. They can navigate to the register page and back. The forms are visible
and well-structured but do not submit to any backend.

**Why this priority**: Login and Register are the entry points of the
platform. Without these pages, the shell is incomplete and nothing else can
be demonstrated.

**Independent Test**: Navigate to `/login` — a login form is visible with
email and password fields and a "Sign In" button. Navigate to `/register` —
a register form is visible with name, email, and password fields and a
"Create Account" button. Both pages are standalone (no sidebar or dashboard
layout). Neither form submits data anywhere.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/login`, **When** the page loads,
   **Then** they see a centred login form with email field, password field,
   a "Sign In" button, and a link to `/register`.

2. **Given** a visitor navigates to `/register`, **When** the page loads,
   **Then** they see a register form with name, email, password fields, a
   "Create Account" button, and a link back to `/login`.

3. **Given** a user fills in and submits either form, **When** the button is
   clicked, **Then** nothing is submitted — the forms are UI-only shells.

4. **Given** a user is on mobile, **When** they view either page, **Then**
   the form is centred, readable, and not overflowing the viewport.

---

### User Story 2 — User Sees the Workspace Selector (Priority: P1)

After the login page, a user lands on a workspace selection screen where
they can see a list of mock workspaces and choose one to enter the dashboard.
This page is standalone — it does not use the dashboard layout.

**Why this priority**: The workspace selector is the bridge between auth and
the dashboard. It must exist as a distinct step in the user flow.

**Independent Test**: Navigate to `/workspaces` — a list of 2–3 mock
workspaces is shown (name, type). Clicking any workspace navigates to
`/dashboard`. The page has no sidebar.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/workspaces`, **When** the page loads,
   **Then** they see 2–3 mock workspace cards, each showing a workspace name
   and type (e.g. "Retail", "Healthcare").

2. **Given** a user clicks a workspace card, **When** the click registers,
   **Then** they are navigated to `/dashboard`.

3. **Given** a user is on mobile, **When** they view the workspace page,
   **Then** workspace cards stack in a single column with no overflow.

---

### User Story 3 — User Navigates the Dashboard Shell (Priority: P1)

Once inside the dashboard, the user sees a persistent sidebar with navigation
links and a main content area. The sidebar is visible on desktop and
collapsible on mobile. The dashboard overview (`/dashboard`) shows summary
cards with mock metrics.

**Why this priority**: The dashboard shell is the core of the platform UI.
All platform pages live inside it.

**Independent Test**: Navigate to `/dashboard` — a sidebar is visible on the
left with navigation links (Dashboard, Apps, Settings, etc.). The main area
shows overview metric cards with mock numbers. On mobile, the sidebar is
hidden by default and toggled via a hamburger button.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/dashboard`, **When** the page loads,
   **Then** a sidebar is visible with the NexoraXS brand, navigation links,
   and a main area showing overview cards (e.g. Total Sales, Active Users,
   Workspaces, Apps Enabled).

2. **Given** a user clicks a sidebar navigation link, **When** the click
   registers, **Then** the route changes to the correct page and the active
   link is visually highlighted.

3. **Given** a user is on mobile, **When** they load a dashboard page,
   **Then** the sidebar is collapsed and a hamburger button allows them to
   open and close it.

4. **Given** the sidebar is open on mobile, **When** a user taps a nav link,
   **Then** the sidebar closes automatically.

---

### User Story 4 — User Views the App Launcher (Priority: P2)

Inside the dashboard, the user navigates to the App Launcher page
(`/dashboard/apps`) where they can see all available NexoraXS apps displayed
as cards. This is the only place app launcher UI appears.

**Why this priority**: The App Launcher is a core feature differentiator —
it shows the modular nature of the platform. It is lower priority than the
shell itself.

**Independent Test**: Navigate to `/dashboard/apps` — a grid of app cards is
shown (Shops, Clinics, Maintenance, Restaurants, CRM). Each card shows the
app name, a short description, and an "Open" or "Coming Soon" badge.
The sidebar is present and the Apps nav link is active.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/dashboard/apps`, **When** the page loads,
   **Then** they see a grid of app cards: Shops (available), Clinics,
   Maintenance, Restaurants, and CRM (all "Coming Soon").

2. **Given** a user is on mobile, **When** they view the apps page, **Then**
   app cards stack to 1–2 columns with no overflow.

---

### Edge Cases

- What if a user navigates directly to `/dashboard` without going through
  `/workspaces`? The page renders without error — there is no auth guard in
  this shell.
- What if the logo file is missing from `public/`? The app name "NexoraXS"
  is rendered as text fallback with no broken image.
- What if the viewport is very narrow (320px)? All pages must remain readable
  with no horizontal overflow.

---

## Requirements

### Functional Requirements

- **FR-001**: A `/login` page MUST exist as a standalone page (no dashboard
  layout) with email, password fields and a "Sign In" button.

- **FR-002**: A `/register` page MUST exist as a standalone page with name,
  email, password fields and a "Create Account" button.

- **FR-003**: Both `/login` and `/register` MUST include navigation links to
  each other. Neither form MUST submit data anywhere.

- **FR-004**: A `/workspaces` page MUST exist as a standalone page showing
  2–3 mock workspace cards. Clicking a card MUST navigate to `/dashboard`.

- **FR-005**: A `/dashboard` route MUST use a shared dashboard layout
  (`app/dashboard/layout.tsx`) with a persistent sidebar and main content
  area. The layout MUST wrap all `/dashboard/**` routes.

- **FR-006**: The dashboard sidebar MUST be data-driven (rendered from an
  array of nav items), visible on desktop, and collapsible on mobile via a
  hamburger toggle.

- **FR-007**: The `/dashboard` index page MUST show at least 4 overview
  metric cards with mock data (e.g. Total Revenue, Active Users, Workspaces,
  Apps Enabled).

- **FR-008**: A `/dashboard/apps` page MUST show a grid of 5 app cards
  (Shops, Clinics, Maintenance, Restaurants, CRM). The Shops card MUST be
  marked available; the rest MUST be marked "Coming Soon".

- **FR-009**: All pages MUST be fully responsive across mobile (≥ 375px) and
  desktop (≥ 1280px) with no horizontal overflow.

- **FR-010**: Reusable UI components MUST live in `components/ui/`. Dashboard-
  specific components MUST live in `components/dashboard/`. Mock data MUST
  live in `lib/mock-data/`.

- **FR-011**: The active sidebar nav item MUST be visually distinguished from
  inactive items.

- **FR-012**: No new npm packages MAY be installed. No API calls MAY be made.
  No other apps MAY be modified.

### Key Entities

- **Page**: One of the 5 routes (`/login`, `/register`, `/workspaces`,
  `/dashboard`, `/dashboard/apps`). Each renders as a distinct Next.js App
  Router route.
- **Dashboard Layout**: The shared wrapper for all `/dashboard/**` routes,
  containing the sidebar and main content slot.
- **Sidebar**: The persistent left-side navigation component, data-driven
  from a nav items array.
- **NavItem**: `{ label: string; href: string; icon: string }` — one entry
  in the sidebar navigation array.
- **MetricCard**: A summary card on the dashboard overview showing a label,
  value, and optional trend. Powered by mock data.
- **AppCard**: A card on the app launcher showing an app name, description,
  and availability status. Powered by mock data.
- **WorkspaceCard**: A card on the workspace selector showing workspace name
  and type. Clicking navigates to `/dashboard`.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 5 routes (`/login`, `/register`, `/workspaces`,
  `/dashboard`, `/dashboard/apps`) render without errors.

- **SC-002**: `/login` and `/register` are standalone pages — no sidebar
  or dashboard layout is present.

- **SC-003**: `/workspaces` is a standalone page — no sidebar present.

- **SC-004**: `/dashboard` and `/dashboard/apps` share the dashboard layout
  with a visible sidebar.

- **SC-005**: The dashboard sidebar collapses and expands on mobile.

- **SC-006**: The active sidebar nav item is visually highlighted on each
  dashboard page.

- **SC-007**: All pages are readable on a 375px screen with no horizontal
  overflow.

- **SC-008**: `pnpm --filter core-platform build` passes with zero
  TypeScript errors and zero ESLint errors.

---

## Assumptions

- The `apps/core-platform` app is already bootstrapped with Next.js 16,
  React 19, TypeScript 5, and TailwindCSS 4. No additional setup is needed.
- The app router directory is `app/` (not `src/app/`) based on the existing
  project structure.
- No logo file exists in `public/` — the text "NexoraXS" is used as the
  brand name in the sidebar and on auth pages.
- All data (workspaces, metric cards, app cards, nav items) is hardcoded
  mock data — no fetching, no state management library required.
- The sidebar active state is derived from the current URL pathname using
  `usePathname()` from Next.js — this requires the sidebar to be a Client
  Component.
- Form fields are uncontrolled or lightly controlled with local state — no
  form library is needed.
- The dashboard overview page is distinct from the app launcher — the
  overview shows metric cards only, and the app launcher is exclusively at
  `/dashboard/apps`.
