# Feature Specification: Shops App UI Polish

**Feature Branch**: `011-shops-app-ui-polish`
**Created**: 2026-05-13
**Status**: Draft
**Scope**: `apps/shops-app` only — visual polish and component build using `docs/NexoraXS Shops.html` as reference. No backend, no API, no auth, no real commerce logic, no new packages. Core-platform and landing are out of scope.

**Visual Reference**: `docs/NexoraXS Shops.html` — used for colors, layout, component patterns, and spacing only. All data in the implementation is mock/placeholder and clearly labelled as such.

---

## User Scenarios & Testing

### User Story 1 — User Sees a Polished Shops Sidebar (Priority: P1)

A user opening any Shops page sees a 260 px sidebar that clearly identifies the app
as "NexoraXS Shops", groups navigation into two labelled sections ("Operations" and
"Configure"), and shows a POS shortcut card at the bottom. On desktop the sidebar is
pinned. On mobile it is accessible via a hamburger toggle.

**Why this priority**: The sidebar is the first visual element the user registers on
every page. It establishes app identity and sets the quality bar for the rest of the
experience.

**Independent Test**: Open `/dashboard` at 1280 px — sidebar is visible, pinned, shows
the Shops icon/wordmark, Operations nav items (Dashboard, Products, Orders, Customers,
Reports), Configure nav items (Settings), and a POS card at the bottom. Open at 375 px
— sidebar is hidden, hamburger visible. Tap hamburger — sidebar slides in. Tap a nav
link — sidebar closes.

**Acceptance Scenarios**:

1. **Given** a user views any Shops page at desktop width, **When** they look at the
   sidebar, **Then** they see the NexoraXS Shops logo/wordmark, an "Operations" section
   heading above the main nav, and a "Configure" section heading above Settings.

2. **Given** a user looks at the sidebar Operations section, **When** they scan the
   links, **Then** they see exactly: Dashboard, Products, Orders, Customers, Reports —
   in that order.

3. **Given** a user looks at the sidebar Configure section, **When** they scan,
   **Then** they see: Settings.

4. **Given** a user views the sidebar bottom area, **When** they look at the POS card,
   **Then** they see a cyan-accent card labelled "Open POS" with a keyboard shortcut
   chip (F8). The card is visual only — clicking it does not navigate or trigger any
   POS logic.

5. **Given** a user is on mobile, **When** they tap the hamburger, **Then** the sidebar
   slides in with a backdrop, and tapping any nav link or the backdrop closes it.

6. **Given** a user is on `/dashboard`, **When** they view the sidebar, **Then** the
   "Dashboard" link is highlighted as active. On `/products`, "Products" is active, etc.

---

### User Story 2 — User Sees a Shops Topbar with Store Context (Priority: P1)

A user on any Shops page sees a sticky topbar that shows a store selector, a branch
selector, a search input (desktop only), an "Open POS" button, a notification bell,
and a user avatar button. All interactions are visual — no dropdowns open, no data
loads.

**Why this priority**: The topbar provides persistent orientation. "Which store, which
branch, which user" must be visible at all times.

**Independent Test**: Open `/dashboard`. Topbar is sticky — scroll down and it stays
at the top. Topbar shows: store pill ("Mustafa's Co."), branch pill ("Maadi · Main"),
search box (desktop only), "Open POS" cyan button, bell icon with amber dot, user
avatar "MA" button. All are visual mock — no dropdowns open on click.

**Acceptance Scenarios**:

1. **Given** a user views the topbar, **When** they look at the left side, **Then** a
   store pill and a branch pill are visible, each showing a label and a subtitle.

2. **Given** a user views the topbar search area (desktop only), **When** they read it,
   **Then** the search box is visible with "Search products, orders…" placeholder and
   a ⌘K chip. It is hidden on viewports narrower than 768 px.

3. **Given** a user views the topbar right side, **When** they scan, **Then** they see
   an "Open POS" cyan button, a bell icon with an amber notification dot, and a user
   avatar pill showing "MA".

4. **Given** a user is on mobile, **When** they view the topbar, **Then** the store
   pill is visible on the left, the "Open POS" button and avatar are on the right. No
   horizontal overflow occurs.

---

### User Story 3 — User Sees the Dashboard Stat Cards with Sparklines (Priority: P1)

A user on `/dashboard` sees four mock stat cards in a responsive grid. Each card shows
a label, a value, a sub-label, a colour-coded icon, a trend badge, and an SVG sparkline.
The cards display mock data clearly labelled as such.

**Why this priority**: Stat cards are the first data-density element on the dashboard
and the primary visual reference deliverable for this feature.

**Independent Test**: Open `/dashboard`. Four cards visible in a 4-column grid on
desktop (2-column on tablet, 1-column on mobile). Cards are: "Sales today" (blue),
"Products" (purple), "Low stock" (orange), "Customers" (cyan). Each has a value, a
trend badge (e.g. "+12%"), and a sparkline SVG in the card's colour.

**Acceptance Scenarios**:

1. **Given** a user views `/dashboard`, **When** the stat cards render, **Then** four
   cards display in a 4-column grid on wide viewports.

2. **Given** a user looks at any stat card, **When** they inspect it, **Then** they see
   a chip label, a large bold value, a trend badge (green for positive, red for
   negative), a sub-label, a coloured icon with matching soft-glow background, and an
   SVG sparkline using the card's accent colour.

3. **Given** a user views the page on a 375 px viewport, **When** the grid renders,
   **Then** cards stack to 1 column with no horizontal overflow.

---

### User Story 4 — User Sees the Dashboard Widgets (Priority: P1)

A user on `/dashboard` sees four additional content sections below the stat cards:
a quick actions bar, a recent orders mock table alongside a low stock panel, a top
products list, and a sales-by-hour CSS bar chart. All data is mock, clearly labelled
with `// chip` prefix markers.

**Why this priority**: These widgets make up the bulk of the reference design and are
the primary deliverable of this polish feature.

**Independent Test**: Open `/dashboard` and scroll down. Sections visible (in order):
(1) quick actions bar with 5 action buttons; (2) a 2/3 + 1/3 grid with a "today's
transactions" table (6 mock rows) and a "low stock alert" panel (4 items); (3) a
"top products" card (5 items with progress bars) side by side with a "sales by hour"
bar chart (24 columns, CSS-only).

**Acceptance Scenarios**:

1. **Given** a user views the quick actions bar, **When** they read it, **Then** five
   action buttons are visible: "Add product", "New sale", "Add customer",
   "Stock adjustment", "Daily Z-report". Each has a coloured icon. Clicking any button
   has no real effect.

2. **Given** a user views the recent orders table, **When** they read the rows, **Then**
   6 mock rows are visible with columns: Order ID (e.g. #ORD-10428), Customer, Items,
   Total, Method, Status (badge), Time. The table header reads "// recent sales" chip.

3. **Given** a user views the low stock panel, **When** they read it, **Then** 4 items
   appear with a product name, SKU, a mini progress bar showing stock vs threshold, and
   a count. The panel header shows a "// low stock alert" chip in amber.

4. **Given** a user views the top products card, **When** they read it, **Then** 5
   mock products are listed with rank, name, category, units sold, revenue, and a
   progress bar in the product's accent colour.

5. **Given** a user views the sales-by-hour chart, **When** they observe it, **Then**
   24 grouped bar columns render using CSS only (no chart library). Three summary
   metrics appear below: "Peak hour", "Avg ticket", "vs last week".

6. **Given** a user views `/dashboard` on mobile, **When** they scroll, **Then** the
   2/3 + 1/3 and 1/2 + 1/2 grids collapse to single column without horizontal overflow.

---

### User Story 5 — All Section Pages Are Visually Consistent Placeholders (Priority: P2)

A user navigating to `/products`, `/orders`, `/customers`, `/reports`, or `/settings`
sees a page that uses the same design system (dark background, `.card`, `.chip`,
typography) and is clearly labelled as a placeholder. No broken layouts, no 404s.

**Why this priority**: The placeholder pages must match the new design system applied
in this feature — the pre-existing stubs from feature 010 may not match the updated
globals and component structure.

**Independent Test**: Navigate to each of the five section pages. Each renders with
the shared Sidebar + Topbar layout, a section heading matching the `.chip` + `h1`
pattern from the dashboard, and a card containing a placeholder message. The active
sidebar link matches the current route.

**Acceptance Scenarios**:

1. **Given** a user navigates to any of the five section pages, **When** the page
   renders, **Then** the Sidebar and Topbar from the new design are visible.

2. **Given** a user views a section page, **When** they look at the heading area,
   **Then** a `// section-name` chip appears above an `h1` with the section title.

3. **Given** a user views a section page, **When** they look at the main content,
   **Then** a card with a centred placeholder message and a "Foundation release" badge
   is displayed — no data tables, no real forms.

4. **Given** a user checks the sidebar on any section page, **When** they look at the
   nav, **Then** the active link correctly highlights the current section.

---

### Edge Cases

- What happens when the user clicks the "Open POS" button in the topbar or sidebar card
  — it is visual only, no navigation or modal. Confirmed: no POS logic in scope.
- What happens when a user directly navigates to a section page URL — the Sidebar +
  Topbar layout must render without errors even without prior navigation.
- What happens if a user resizes from mobile to desktop mid-session — sidebar switches
  from drawer to pinned without page reload.
- What does the "Back to platform" link in the reference sidebar do — in the
  implementation it MUST use `href="#"` (no live link to core-platform).
- What does "Maadi branch · live data" in the reference header do — the implementation
  MUST replace "live data" with "mock data" and the breadcrumb links MUST use `href="#"`.

---

## Requirements

### Functional Requirements

- **FR-001**: The Shops sidebar MUST display the "NexoraXS Shops" wordmark with a blue
  gradient Shops icon. A "Back to platform" link MUST be present but MUST use `href="#"`.

- **FR-002**: The sidebar MUST show an "Operations" section label above: Dashboard,
  Products, Orders, Customers, Reports — in that exact order.

- **FR-003**: The sidebar MUST show a "Configure" section label above: Settings.

- **FR-004**: The sidebar MUST show a POS card at the bottom with cyan accent, an "Open
  POS" label, and an "F8" keyboard shortcut chip. The card MUST NOT trigger any
  navigation or POS logic when clicked.

- **FR-005**: The sidebar active state MUST highlight exactly one link matching the
  current route at all times.

- **FR-006**: The topbar MUST include: a store selector pill (mock "Mustafa's Co."), a
  branch selector pill (mock "Maadi · Main"), a search input (desktop only), an "Open
  POS" cyan button (visual only), a bell icon with an amber notification dot, and a
  user avatar "MA" button.

- **FR-007**: The topbar "Open POS" button MUST be visual only — no navigation, no
  modal, no POS logic.

- **FR-008**: The dashboard MUST display 4 stat cards with mock values. Each card MUST
  include: a monospace chip label, a bold value, a trend badge, a sub-label, a coloured
  icon, and an SVG sparkline in the card's accent colour.

- **FR-009**: The dashboard MUST include a quick actions bar with 5 visible action
  buttons. Each button MUST display a coloured icon and a label. Clicking any button
  MUST have no real effect.

- **FR-010**: The dashboard MUST include a "recent sales" mock table with at least 6
  rows. Column headers: Order, Customer, Items, Total, Method, Status, Time. Status
  cells MUST use the Badge component (emerald/rose/amber). All data is mock.

- **FR-011**: The dashboard MUST include a "low stock alert" panel with at least 4 mock
  items. Each item MUST show: name, SKU, mini progress bar (stock vs threshold), count.

- **FR-012**: The dashboard MUST include a "top products" card with 5 mock items, each
  showing rank, name, category, units sold, revenue, and a coloured progress bar.

- **FR-013**: The dashboard MUST include a "sales by hour" CSS-only bar chart with 24
  bar groups and 3 summary metrics below. No chart library may be used.

- **FR-014**: All breadcrumb and "View all" links in the dashboard MUST use `href="#"`.
  All text claiming "live data" MUST be replaced with "mock data".

- **FR-015**: The `Icon` component MUST be implemented using inline SVG paths — no
  Lucide CDN, no UMD script, no external icon library.

- **FR-016**: The `Logo` component MUST be a self-contained SVG or styled `<span>` —
  no image file required.

- **FR-017**: Each of the five section pages MUST render with the shared Sidebar +
  Topbar layout, a section heading, and a placeholder card body.

- **FR-018**: The `globals.css` MUST include: the NexoraXS dark tokens from feature
  010, plus `.btn-pos` (cyan gradient button style) to match the reference.

- **FR-019**: The implementation MUST pass `pnpm --filter shops-app build` with zero
  errors.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: A reviewer opening `/dashboard` can identify all four stat cards with
  their labels, values, trend badges, and sparklines within 10 seconds.

- **SC-002**: All 7 routes (`/`, `/onboarding`, `/dashboard`, `/products`, `/orders`,
  `/customers`, `/reports`, `/settings`) render without console errors at 375 px,
  768 px, and 1280 px.

- **SC-003**: `pnpm --filter shops-app build` exits with code 0 — zero TypeScript
  errors, zero lint errors.

- **SC-004**: The sidebar active state correctly highlights the current page on 100% of
  navigations, including browser back/forward.

- **SC-005**: A reviewer comparing the rendered `/dashboard` against the reference HTML
  finds all major sections present: stat cards, quick actions, recent orders table,
  low stock panel, top products, sales-by-hour chart.

- **SC-006**: The mobile sidebar opens and closes in a single tap, with no layout
  overflow or animation glitch at 375 px.

---

## Assumptions

- Feature 010's route structure (`app/(app)/` route group) is retained. The paths
  listed in the build spec (`app/dashboard/layout.tsx`) refer to the route group layout
  and pages — the final URL paths remain `/dashboard`, `/products`, etc.
- All icons are implemented as inline SVG — a small set of commonly used paths
  (dashboard, package, users, chart, settings, bell, search, menu, etc.) suffices.
- Mock data in the dashboard uses Egyptian Pound (EGP) currency and Arabic-style names
  as shown in the reference — this is decorative mock data only.
- The "Open POS" button and POS card are purely visual — they do not open any modal,
  overlay, or page in this feature.
- The "Back to platform" link in the sidebar header uses `href="#"` — no navigation
  to core-platform is implemented.
- The breadcrumb "Platform / Shops / Dashboard" in the dashboard header uses `href="#"`
  for all links.
- All "live data" or "real-time" text in the reference is replaced with "mock data" in
  the implementation.
- The `Badge` component supports at minimum: emerald, rose, amber, blue, purple, gray.
- No new npm packages may be installed. All UI primitives are hand-coded.
- The sidebar Configure section includes only Settings (Discounts and Taxes from the
  reference are deferred — they have no corresponding routes in this foundation phase).
