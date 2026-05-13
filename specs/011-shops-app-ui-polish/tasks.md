# Tasks: Shops App UI Polish

**Input**: Design documents from `specs/011-shops-app-ui-polish/`
**Branch**: `011-shops-app-ui-polish`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md) | **Contracts**: [contracts/components.md](./contracts/components.md)
**Visual reference**: `docs/NexoraXS Shops.html`

**Scope**: `apps/shops-app` only. No new packages. No backend. No CDN. All icons inline SVG.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US5)

---

## Phase 1: Setup

**Purpose**: Foundation changes that all components depend on.

- [x] T001 Update `apps/shops-app/app/globals.css` — add `.btn-pos { background: linear-gradient(135deg,#06b6d4,#3b82f6); box-shadow: 0 6px 24px -8px rgba(6,182,212,0.6), inset 0 1px 0 rgba(255,255,255,0.15); }` after the existing `.btn-primary` block; verify all existing tokens (`.card`, `.chip`, `.nav-item`, `.nav-item-active`, `.gradient-text`) are present

**Checkpoint**: `globals.css` compiles cleanly; `.btn-pos` class is available.

---

## Phase 2: Foundational UI Primitives

**Purpose**: `Icon` and `Logo` must exist before any component that uses them can be built. `Badge` is used by the dashboard table and can be built in parallel.

- [x] T002 Create `apps/shops-app/components/ui/Icon.tsx` — typed `IconProps { name: IconName; className?: string; strokeWidth?: number }` with a `Record<IconName, string>` of SVG path `d` strings for all 28 icons listed in research.md R-001; renders `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth ?? 2} className={className ?? "w-4 h-4"}>` with `<path strokeLinecap="round" strokeLinejoin="round" d={paths[name]} />`
- [x] T003 [P] Create `apps/shops-app/components/ui/Logo.tsx` — renders the Shops icon (7×7 rounded square with blue gradient background + shopping-bag SVG path) and "NexoraXS" in white + "Shops" in `text-white/50`; accepts optional `size?: "sm" | "md"` prop
- [x] T004 [P] Create `apps/shops-app/components/dashboard/Badge.tsx` — `BadgeProps { children: React.ReactNode; color?: BadgeColor }` with colour map for emerald/rose/amber/blue/purple/cyan/gray; renders `<span className={\`chip inline-flex items-center px-2 py-0.5 rounded-full border \${map[color]}\`}>`

**Checkpoint**: `Icon`, `Logo`, `Badge` compile without errors. Import each in a scratch test if needed.

---

## Phase 3: User Story 1 — Polished Sidebar (Priority: P1)

**Goal**: Replace the existing `components/layout/Sidebar.tsx` with a full-featured sidebar matching the reference: logo + back link, Operations section, Configure section, POS card.

**Independent Test**: Open `/dashboard` at 1280 px — sidebar shows NexoraXS Shops wordmark, "Operations" label above Dashboard/Products/Orders/Customers/Reports, "Configure" label above Settings, cyan POS card at bottom. At 375 px — sidebar hidden, hamburger visible; tap to open; tap backdrop to close.

- [x] T005 [US1] Create `apps/shops-app/components/dashboard/Sidebar.tsx` — client component; imports `Icon` from `@/components/ui/Icon` and `Logo` from `@/components/ui/Logo`; sidebar header: Logo + back-to-platform button (`href="#"`, uses `chevron-left` icon); Operations nav: Dashboard (`/dashboard`), Products (`/products`), Orders (`/orders`), Customers (`/customers`), Reports (`/reports`); Configure nav: Settings (`/settings`); POS card bottom: cyan `bg-cyan-500/15 border-cyan-500/20` card with `scan-line` icon, "Open POS" label, "F8 · visual only" subtext; active state via `usePathname() === href` → `nav-item-active`; mobile drawer with hamburger (`menu` icon) + backdrop + close (`x` icon) via `useState`
- [x] T006 [US1] Update `apps/shops-app/app/(app)/layout.tsx` — replace import of `@/components/layout/Sidebar` with `@/components/dashboard/Sidebar`; replace import of `@/components/layout/Topbar` with `@/components/dashboard/Topbar` (Topbar built in US2 phase; can stub import until T008 is done)
- [x] T007 [US1] Delete `apps/shops-app/components/layout/Sidebar.tsx` and `apps/shops-app/components/layout/Topbar.tsx` — these are superseded by the new dashboard components (delete only after T005 and T008 are complete and layout.tsx is updated)

**Checkpoint**: US1 complete — sidebar renders correctly at all breakpoints; no import errors.

---

## Phase 4: User Story 2 — Polished Topbar (Priority: P1)

**Goal**: Replace the existing `Topbar` with the reference design: store pill, branch pill, search (desktop), POS button, bell with dot, user avatar.

**Independent Test**: Open `/dashboard`. Topbar shows: store pill "Mustafa's Co.", branch pill "Maadi · Main", search box (desktop), cyan "Open POS" button, bell with amber dot, "MA" user avatar. At 375 px — branch pill hidden, search hidden, no overflow.

- [x] T008 [US2] Create `apps/shops-app/components/dashboard/Topbar.tsx` — client component; imports `Icon` from `@/components/ui/Icon`; left: mobile hamburger padding (`pl-16 md:pl-0`), store pill (gradient "M" avatar + "Mustafa's Co." / "Store" labels + `chevrons-up-down` icon), branch pill (`map-pin` icon + "Maadi · Main" / "Branch" labels + `chevrons-up-down` icon, hidden on mobile); center: flex-1 spacer; right: search input (`hidden md:flex`, `search` icon, "Search products, orders…" placeholder, ⌘K chip), "Open POS" `btn-pos` button (`scan-line` icon), bell button with amber dot, user avatar pill ("MA" gradient button + `chevron-down` icon); all buttons are visual-only (`type="button"`, no onClick handlers)

**Checkpoint**: US2 complete — topbar matches reference at desktop and mobile; no overflow.

---

## Phase 5: User Story 3 — Dashboard Stat Cards (Priority: P1)

**Goal**: Build the `StatCard` component and render four mock stat cards on the dashboard.

**Independent Test**: Open `/dashboard`. Four stat cards in 4-column grid (desktop): "Sales today" (blue, EGP 24,180, +12%), "Products" (purple, 412, +4), "Low stock" (orange, 7, -2), "Customers" (cyan, 1,284, +7%). Each has a sparkline SVG. Grid collapses to 2→1 column on narrower viewports.

- [x] T009 [US3] Create `apps/shops-app/components/dashboard/StatCard.tsx` — `StatCardProps { label: string; value: string; sub?: string; icon: IconName; color: string; trend?: string; spark?: string }`; layout: `card p-5 relative overflow-hidden`; glow blob: `absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-25`; trend badge: green text if starts with "+", red if starts with "-"; sparkline SVG with gradient fill (rendered only when `spark` prop present); imports `Icon` from `@/components/ui/Icon`
- [x] T010 [US3] Rewrite `apps/shops-app/app/(app)/dashboard/page.tsx` — Phase 1: add dashboard header section (breadcrumb `href="#"` links, "Shops Dashboard" h1, "mock data" sub-label replacing "live data", period selector buttons Today/Week/Month, Export button, "New product" btn-primary button); add 4 `<StatCard>` instances with the mock data from the reference (Sales today/Products/Low stock/Customers with their sparkline path strings); import `StatCard` from `@/components/dashboard/StatCard`; import `Icon` from `@/components/ui/Icon`

**Checkpoint**: US3 complete — four stat cards with sparklines render on `/dashboard`.

---

## Phase 6: User Story 4 — Dashboard Widgets (Priority: P1)

**Goal**: Add all remaining dashboard sections: quick actions bar, recent orders table + low stock panel, top products card, sales-by-hour chart.

**Independent Test**: Open `/dashboard` and scroll. All four widget sections visible. Mock data rows display correctly. CSS bar chart renders 24 columns. No horizontal overflow on mobile.

- [x] T011 [US4] Add quick actions bar to `apps/shops-app/app/(app)/dashboard/page.tsx` — a `.card p-4` below the stat grid containing a `// quick actions` chip and 5 action buttons: "Add product" (blue `package-plus`), "New sale" (cyan `receipt`), "Add customer" (purple `user-plus`), "Stock adjustment" (orange `package-search`), "Daily Z-report" (green `file-text`); each button has a coloured icon square and label; `type="button"` with no real handler
- [x] T012 [US4] Add recent orders table + low stock panel to `apps/shops-app/app/(app)/dashboard/page.tsx` — 2-column grid (`lg:grid-cols-3`); left panel (`lg:col-span-2`): `.card` with `// recent sales` chip header, "Today's transactions" title, "View all" link (`href="#"`), scrollable `<table>` with 6 mock rows (Order ID, Customer avatar+name, Items, Total, Method with `credit-card`/`banknote` icon, Status `<Badge>`, Time); right panel: `.card` with `// low stock alert` amber chip header, 4 mock items each with coloured icon, name, SKU, mini progress bar, count; "Create reorder draft" button at bottom
- [x] T013 [US4] Add top products card + sales-by-hour chart to `apps/shops-app/app/(app)/dashboard/page.tsx` — 2-column grid (`lg:grid-cols-2`); left: `.card p-5` with `// top products` chip, "Best sellers this week" title, 5 mock products each with rank, name, category, units, revenue, coloured progress bar; right: `.card p-5 relative overflow-hidden` with glow blob, `// sales by hour` chip, "Today's rhythm" title, 24-column CSS bar chart using mock data array mapping to flex columns (today bar blue gradient + last-week bar white/10), time axis labels (00/06/12/18/24), 3 summary stats (Peak hour 10:00, Avg ticket EGP 755, vs last week +12.4%)

**Checkpoint**: US4 complete — all dashboard widgets render correctly. Full page scrolls without overflow.

---

## Phase 7: User Story 5 — Updated Placeholder Pages (Priority: P2)

**Goal**: Update the five existing placeholder pages to use the new `Badge` and `Icon` components if appropriate, and ensure they visually match the new design system (chip pattern, card style, section heading).

**Independent Test**: Navigate to `/products`, `/orders`, `/customers`, `/reports`, `/settings`. Each renders with the new Sidebar and Topbar, correct `// section` chip, `h1` heading, and a placeholder card. Active sidebar link matches.

- [x] T014 [P] [US5] Update `apps/shops-app/app/(app)/products/page.tsx` — replace emoji icon with `<Icon name="package" />` in the placeholder card; ensure heading uses `chip` + `h1` pattern matching the dashboard style
- [x] T015 [P] [US5] Update `apps/shops-app/app/(app)/orders/page.tsx` — replace emoji icon with `<Icon name="receipt" />`; same heading pattern
- [x] T016 [P] [US5] Update `apps/shops-app/app/(app)/customers/page.tsx` — replace emoji icon with `<Icon name="users" />`; same heading pattern
- [x] T017 [P] [US5] Update `apps/shops-app/app/(app)/reports/page.tsx` — replace emoji icon with `<Icon name="chart-bar" />`; same heading pattern
- [x] T018 [P] [US5] Update `apps/shops-app/app/(app)/settings/page.tsx` — replace emoji icon with `<Icon name="settings" />`; same heading pattern

**Checkpoint**: US5 complete — all 5 placeholder pages render with new icon components and consistent heading style.

---

## Phase 8: Polish & Build Gate

**Purpose**: Final visual pass, lint, TypeScript check, and production build.

- [x] T019 Run `pnpm lint` in `apps/shops-app` — fix all errors before proceeding
- [x] T020 [P] Run `pnpm tsc --noEmit` in `apps/shops-app` — fix all TypeScript errors
- [x] T021 Run `pnpm --filter shops-app build` — must exit 0; this is the hard success criterion (SC-003); fix any remaining errors
- [x] T022 Responsive visual pass — open `/dashboard` at 375 px, 768 px, 1280 px; confirm no horizontal overflow, sidebar drawer works on mobile, stat card grid collapses correctly, dashboard table scrolls horizontally on mobile (overflow-x-auto on table wrapper)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (T001) → no deps, start immediately

Phase 2 (T002, T003, T004) → depend on Phase 1
  T002 (Icon) ─ must complete before T003, T004, T005, T008, T009, T014-T018
  T003 (Logo) ─ parallel with T004; depends on T002 for icon inside logo
  T004 (Badge) ─ parallel with T003; no Icon dependency

Phase 3 (T005-T007) → depend on T002 (Icon), T003 (Logo)
  T005 ─→ T006 ─→ T007 (sequential; T007 deletes old files after new ones wired up)

Phase 4 (T008) → depends on T002 (Icon); can run in parallel with T005

Phase 5 (T009-T010) → depend on T002, T005 (for layout), T008 (for layout)
  T009 ─→ T010

Phase 6 (T011-T013) → depend on T010 (must add to same page.tsx sequentially)
  T011 ─→ T012 ─→ T013

Phase 7 (T014-T018) → depend on T002 (Icon); all parallel; depend on T006 for layout

Phase 8 (T019-T022) → depend on all prior phases
  T019, T020 parallel ─→ T021 ─→ T022
```

### Critical Path

```
T001 → T002 → T003 → T005 → T006 → T007
                   → T008
              → T009 → T010 → T011 → T012 → T013
              → T004
              → T014 … T018
→ T019 → T020 → T021 → T022
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 →
T008 → T009 → T010 → T011 → T012 → T013 →
T014 → T015 → T016 → T017 → T018 →
T019 → T020 → T021 → T022
```

---

## Implementation Strategy

### MVP First

1. T001 (globals) + T002 (Icon) + T003 (Logo) + T004 (Badge) — primitives ready
2. T005 (Sidebar) + T006 (layout wired) — sidebar visible on all pages
3. T008 (Topbar) — topbar visible on all pages
4. **STOP and VALIDATE**: full shell renders on desktop + mobile
5. Continue with dashboard widgets (T009–T013)
6. T014–T018 placeholder updates
7. T019–T022 build gate

### Key Risk

T007 (delete old layout files) must only happen after T006 confirms the new imports
work. Run `pnpm tsc --noEmit` before deleting to catch import errors early.

---

## Notes

- T002 is the most labour-intensive task — 28 SVG path strings. Use well-known Lucide
  path data (MIT licence). All 28 icons must be present; the TypeScript union type
  acts as the compile-time completeness check.
- T010–T013 all modify the same `dashboard/page.tsx` — implement sequentially.
- T019 (lint) will likely surface `{"// ..."}` JSX string issues as seen in feature 010 — apply the same fix pattern immediately.
- Do not install new packages at any point.
