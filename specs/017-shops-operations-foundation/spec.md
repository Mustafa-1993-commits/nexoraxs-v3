# Feature Specification: Shops Operations Foundation

**Feature Branch**: `017-shops-operations-foundation`
**Created**: 2026-05-14
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Products Page Foundation (Priority: P1) 🎯 MVP

A user navigates to `/products` and sees a realistic product list screen. The screen shows a table or card grid of mock products with names, categories, status badges (Active / Draft / Low Stock), stock counts, and prices. A search bar and filter controls are visible but non-functional. An "Add product" call-to-action button is visible but non-functional. The page clearly labels all data as mock.

**Why this priority**: Products is the most central entity in any commerce operation. It anchors the mental model for the entire app. A credible products screen makes the whole suite feel real.

**Independent Test**: Navigate to `/products`. A list of at least 5 mock products is visible. Each product shows a name, category badge, status badge, stock quantity, and price. A search input and "Add product" button are visible. No navigation errors occur. The screen works at 375px viewport width.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/products`, **When** the page loads, **Then** at least 5 mock product rows or cards are visible, each showing name, category, status badge, stock count, and price.
2. **Given** the products list is visible, **Then** a search/filter bar is present — visually complete but non-interactive (or `disabled`).
3. **Given** the products list is visible, **Then** an "Add product" button is visible — clicking it produces no navigation error (can be `disabled` or `href="#"`).
4. **Given** the products list is visible, **Then** at least two different status badges are shown (e.g., "Active", "Draft", "Low Stock").
5. **Given** a 375px viewport, **When** the page loads, **Then** the layout does not produce horizontal overflow and all content is legible.

---

### User Story 2 — Orders Page Foundation (Priority: P1)

A user navigates to `/orders` and sees a mock orders table. Each row shows an order ID, customer name, item count, total amount, payment method, status badge (Paid / Pending / Refund), and timestamp. An order summary or preview panel is visible alongside or below the table showing details of a selected or highlighted order. All data is mock and clearly labelled.

**Why this priority**: Orders is the second most critical page — it is what an operator checks dozens of times per day. A credible orders screen immediately demonstrates the app's purpose.

**Independent Test**: Navigate to `/orders`. An orders table with at least 5 mock rows is visible. Each row shows order ID, customer, items count, total, payment method, status badge, and time. A summary card or panel is visible. No navigation errors. Works at 375px.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/orders`, **When** the page loads, **Then** at least 5 mock order rows are visible in a table or list format.
2. **Given** the orders table is visible, **Then** each row shows: order ID, customer name, item count, total amount, payment method indicator, status badge, and timestamp.
3. **Given** the orders table is visible, **Then** status badges use distinct visual states for "Paid", "Pending", and "Refund".
4. **Given** the orders table is visible, **Then** an order summary or preview card is visible showing the details of one highlighted order (mock static).
5. **Given** a 375px viewport, **Then** the table or list is scrollable horizontally or stacks gracefully — no content is clipped.

---

### User Story 3 — Customers Page Foundation (Priority: P2)

A user navigates to `/customers` and sees a mock customer list. Each customer entry shows a name, email or phone placeholder, last-order date, total spend, and one or more segment/tag badges (e.g., "VIP", "Regular", "New"). The page has a summary area at the top showing aggregate stats (total customers, active this month, new this week — all mock numbers). All data is clearly mock.

**Why this priority**: Customer data gives context to orders and products but is not checked as frequently. It is important for the full picture of the operations suite but not the first thing an operator opens.

**Independent Test**: Navigate to `/customers`. An aggregate summary row or card group is visible at the top showing 2–3 mock metrics. A list of at least 5 mock customers is shown. Each customer shows name, contact placeholder, last-order info, spend, and at least one segment badge. Works at 375px.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/customers`, **When** the page loads, **Then** 2–3 aggregate metric chips or cards are visible (e.g., total customers, new this week).
2. **Given** the customer list is visible, **Then** at least 5 mock customer entries are shown, each with name, contact placeholder, last order date, and total spend.
3. **Given** the customer list is visible, **Then** each customer has at least one segment/tag badge (e.g., "VIP", "Regular", "New").
4. **Given** a 375px viewport, **Then** customer cards or rows stack vertically and all content is readable.

---

### User Story 4 — Reports Page Foundation (Priority: P2)

A user navigates to `/reports` and sees a mock reports overview screen. The top section shows metric summary cards (revenue, orders, new customers, avg. ticket — all mock numbers with trend indicators). Below, one or more CSS-only bar or line chart visuals show mock data patterns. All data is clearly labelled as mock/foundation. No real analytics are claimed.

**Why this priority**: Reports is important for the full suite but operators typically check it less frequently than products and orders. The visual chart presence makes the app look more complete.

**Independent Test**: Navigate to `/reports`. At least 4 metric summary cards are visible at the top. At least one CSS-only chart visual (bar or line pattern) is visible below the cards. All metric labels include a mock indicator. Works at 375px.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/reports`, **When** the page loads, **Then** at least 4 metric summary cards are visible — each showing a label, mock number, and a trend or change indicator.
2. **Given** the reports page is visible, **Then** at least one CSS chart visual is shown using only CSS/HTML — no external charting library, no canvas.
3. **Given** the reports page is visible, **Then** all data is clearly labelled as mock/foundation (e.g., a chip, a footnote, or a "mock data" annotation).
4. **Given** a 375px viewport, **Then** metric cards stack to a 2-column or single-column grid; chart is visible and not clipped.

---

### User Story 5 — Settings Page Foundation (Priority: P3)

A user navigates to `/settings` and sees a mock settings screen structured into sections: Store Profile (store name, branch, currency — read from sessionStorage or showing mock defaults), Shop Mode (selected mode label), Team (placeholder team members list), and Advanced (placeholder toggles). No section is editable — all inputs are visual-only (`disabled`). No form submits. A "Save changes" button is visible but visually disabled or non-functional.

**Why this priority**: Settings is the least urgently checked page in daily operations. Operators set it up once and rarely return. It rounds out the suite but is not a daily-use screen.

**Independent Test**: Navigate to `/settings`. At least 4 distinct settings sections are visible (Store Profile, Shop Mode, Team, and one more). All inputs or selectors are visually present but non-interactive. A "Save changes" button is visible but disabled or non-functional. Values for branch and currency match the sessionStorage values from onboarding (or show mock defaults). Works at 375px.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/settings`, **When** the page loads, **Then** at least 4 settings sections are visible with distinct headings.
2. **Given** the Store Profile section is visible, **Then** store name "Mustafa's Co.", branch (from sessionStorage or "Maadi Main"), and currency (from sessionStorage or "EGP") are displayed — all read-only.
3. **Given** the Shop Mode section is visible, **Then** the mode label (from sessionStorage or "Both") is displayed — read-only.
4. **Given** the Team section is visible, **Then** at least 2 placeholder team member entries are shown — no edit interaction.
5. **Given** any input or selector in any section, **When** the user attempts to interact, **Then** either nothing happens (disabled) or no data is persisted.
6. **Given** a 375px viewport, **Then** all sections stack vertically and all content is readable.

---

### Edge Cases

- What if the user navigates directly to any operations page without completing onboarding (no `shops_mode` in sessionStorage)? Each page should render correctly with mock defaults — these pages do not guard on sessionStorage state (only the dashboard applies that guard). They should not crash.
- What if mock data arrays are empty? Each page must always have at least 5 hardcoded mock entries — no empty states are required for this foundation version.
- What if the device is narrower than 375px? The layout is optimised for 375px as the minimum supported width — narrower viewports are out of scope.
- What if an icon name used in a new page is not in the existing `Icon.tsx` set? Only icons already in the `IconName` union may be used. If a needed icon is absent, an existing icon with similar semantic meaning is substituted.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `/products` MUST display at least 5 mock product entries, each with name, category badge, status badge, stock quantity, and price.
- **FR-002**: `/products` MUST include a visible search/filter bar (disabled or non-interactive) and an "Add product" CTA (disabled or `href="#"`).
- **FR-003**: `/orders` MUST display at least 5 mock order rows, each with order ID, customer name, item count, total, payment method, status badge (Paid/Pending/Refund), and timestamp.
- **FR-004**: `/orders` MUST include a visible order summary or preview card showing static mock details for one highlighted order.
- **FR-005**: `/customers` MUST display at least 5 mock customer entries, each with name, contact placeholder, last-order info, spend amount, and at least one segment badge.
- **FR-006**: `/customers` MUST include a top aggregate stats area with at least 2 mock metric values (total customers, new this week, etc.).
- **FR-007**: `/reports` MUST display at least 4 metric summary cards at the top (revenue, orders, customers, avg. ticket — all mock, with trend indicators).
- **FR-008**: `/reports` MUST include at least one CSS-only chart visual. No external charting libraries. No canvas elements.
- **FR-009**: `/settings` MUST include at least 4 settings sections. The Store Profile section MUST read branch and currency from sessionStorage (via `getBranch()` / `getCurrency()`) with mock fallbacks; all other sections use static mock data.
- **FR-010**: All inputs and interactive elements across all five pages MUST be non-functional — `disabled`, `href="#"`, or rendered as static text. No form submission, no real CRUD.
- **FR-011**: Every page MUST display a clear mock/foundation indicator (chip label, badge, or footnote) so users understand the data is not live.
- **FR-012**: All five pages MUST be responsive at 375px viewport width — no horizontal overflow, no clipped interactive elements.
- **FR-013**: No new packages may be introduced. All icons use the existing `IconName` union in `components/ui/Icon.tsx`.
- **FR-014**: No cross-app imports. All changes are scoped to `apps/shops-app`.
- **FR-015**: No localhost URLs, no external links in any new or modified JSX.

### Key Entities

- **MockProduct**: display record — name, category, status (`"Active" | "Draft" | "Low Stock"`), stock count, price string. Defined as an inline constant array.
- **MockOrder**: display record — id, customer name, item count, total string, payment method, status (`"Paid" | "Pending" | "Refund"`), timestamp. Defined as inline constant array.
- **MockCustomer**: display record — name, contact placeholder, last order date, spend string, segment tags. Defined as inline constant array.
- **MockReportMetric**: display record — label, value string, trend string, trend direction. Defined as inline constant array.
- **MockSettingsSection**: structural grouping — heading, list of read-only fields. No persistent state.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five pages (`/products`, `/orders`, `/customers`, `/reports`, `/settings`) load without error and display meaningful content — verified by navigating to each URL.
- **SC-002**: Each page shows at least 5 mock data entries (or 4 metric cards for `/reports`) — verified by visual inspection of the rendered page.
- **SC-003**: Each page is readable at 375px viewport with no horizontal scrollbar — verified via browser viewport resize or DevTools device simulation.
- **SC-004**: `/settings` correctly reflects the branch and currency chosen during onboarding (when sessionStorage is populated) — verified by completing onboarding with non-default values, then checking the Settings page.
- **SC-005**: `pnpm lint` in `apps/shops-app` exits with zero errors after all five pages are implemented.
- **SC-006**: `pnpm tsc --noEmit` in `apps/shops-app` exits with zero errors.
- **SC-007**: `pnpm --filter shops-app build` exits with zero errors and all pages compile successfully.

---

## Assumptions

- The existing `PlaceholderPage` component (built in feature 011) will be replaced or substantially overridden for each of the five pages — the current placeholder stubs are starting points, not the target.
- All five pages already have route files (created in 010/011); only the page content is updated — no new route files or layout changes are needed.
- The existing `Badge`, `Icon`, `StatCard`, and `.card` CSS utility are available and should be reused wherever appropriate. No new shared components are created.
- Mock data for all five pages is defined as inline TypeScript constants within each page file — no separate mock data files are introduced.
- The `/settings` page reads sessionStorage values (branch, currency, mode) via the existing `getBranch()`, `getCurrency()`, `getMode()` helpers from `lib/mode.ts`. It uses the same `useSyncExternalStore` hydration pattern already established in `Topbar.tsx`, `StoreProfile.tsx`, and `NextSteps.tsx`.
- The `/reports` CSS chart reuses the same pattern as the "Sales by hour" bar chart already implemented on the dashboard page — inline `div` elements with percentage heights, no canvas, no external library.
- The five pages are independent of each other and can be implemented in any order or in parallel.
- "Clearly labelled as mock" means at minimum a `{"// mock data"}` chip label or `font-mono text-[11px] text-amber-400/80` annotation — consistent with the labelling pattern used on the dashboard.
- The sidebar navigation links for all five pages are already wired and working (from feature 010). No sidebar changes are required.
