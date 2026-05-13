# Tasks: Shops Operations Foundation

**Input**: Design documents from `specs/017-shops-operations-foundation/`
**Branch**: `017-shops-operations-foundation`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

**Scope**: `apps/shops-app` only. 5 page file rewrites. No new components. No new packages. No cross-app imports. All data inline mock.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US5)

---

## Phase 1: Setup

- [X] T001 Update `AGENTS.md` SPECKIT block — set current feature to `017-shops-operations-foundation`; update plan and spec paths accordingly

**Checkpoint**: AGENTS.md reflects the active feature.

---

## Phase 2: No Foundational phase

All five user stories touch independent files with no shared blocking dependency. Proceed directly to user story phases.

---

## Phase 3: User Story 1 — Products Page (Priority: P1) 🎯 MVP

**Goal**: Replace the PlaceholderPage stub with a credible mock product list showing 6 products with status/category badges, a disabled search bar, and a disabled "Add product" CTA.

**Independent Test**: Navigate to `/products`. A table with 6 mock product rows is visible. Each row shows product name, category badge (gray), status badge (emerald for Active, amber for Low Stock), stock count, and price. A disabled search input and "Add product" button are visible. No horizontal overflow at 375px.

- [X] T002 [P] [US1] Rewrite `apps/shops-app/app/(app)/products/page.tsx` — remove `PlaceholderPage` import; define inline type `type ProductStatus = "Active" | "Low Stock" | "Draft"` and a `products` array of 6 entries (Iced Latte/Beverages/Active/482/EGP 38.50, Chicken Sandwich/Food/Active/311/EGP 48.00, Croissant/Bakery/Active/268/EGP 24.00, Cold Brew/Beverages/Active/224/EGP 44.00, Espresso Beans 1kg/Supplies/Low Stock/3/EGP 210.00, Oat Milk Carton/Supplies/Low Stock/5/EGP 42.00); define `statusColor: Record<ProductStatus, "emerald" | "amber" | "gray">` (Active→emerald, Low Stock→amber, Draft→gray); import `Badge` from `@/components/dashboard/Badge` and `Icon` from `@/components/ui/Icon`; render: header section (chip `{"// products"}`, `h1` "Products", subtitle "Manage your product catalogue and inventory."); action bar below header: `flex flex-wrap items-center justify-between gap-3 mb-5`  containing a disabled search input (`<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><Icon name="search" className="h-4 w-4 text-gray-500" /><input disabled className="bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-600" placeholder="Search products…" aria-label="Mock search — not functional" /></div>`) and a disabled "Add product" button (`<button type="button" disabled className="inline-flex items-center gap-2 rounded-lg bg-blue-600/50 cursor-not-allowed px-3.5 py-2 text-xs font-semibold text-white/60"><Icon name="package-plus" className="h-4 w-4" />Add product</button>`); products table: `.card overflow-hidden` wrapper, `<table className="w-full text-sm">`, `<thead>` with columns (Product, Category, Status, Stock, Price) in `font-mono text-[10px] uppercase tracking-wider text-gray-500 border-b border-white/5`, `<tbody className="divide-y divide-white/5">` mapping over products; each `<tr>`: product name in `text-sm font-medium text-white`, `<Badge color="gray">{category}</Badge>`, `<Badge color={statusColor[status]}>{status}</Badge>`, stock in `font-mono text-xs text-gray-400`, price in `text-sm text-white`; footer: `<p className="mt-4 font-mono text-[11px] text-amber-400/80 text-center">mock data · foundation</p>`

**Checkpoint**: US1 complete — `/products` shows 6 product rows with badges; no PlaceholderPage.

---

## Phase 4: User Story 2 — Orders Page (Priority: P1)

**Goal**: Replace the PlaceholderPage stub with an orders table + static order detail panel in a two-column desktop layout.

**Independent Test**: Navigate to `/orders`. An orders table with 6 mock rows is visible. A detail panel card is visible to the right (desktop) or below (mobile) showing the details of order #ORD-10428. Status badges use emerald (Paid), rose (Refund), amber (Pending). Works at 375px.

- [X] T003 [P] [US2] Rewrite `apps/shops-app/app/(app)/orders/page.tsx` — remove `PlaceholderPage` import; import `Badge` from `@/components/dashboard/Badge` and `Icon` from `@/components/ui/Icon`; define `type OrderStatus = "Paid" | "Refund" | "Pending"` and `orders` array of 6 entries identical to dashboard mock data (ORD-10428 Aya Hassan 4 EGP 1,240 Visa 12:42 Paid, ORD-10427 Walk-in 1 EGP 95 Cash 12:38 Paid, ORD-10426 Omar Khaled 7 EGP 3,610 Visa 12:21 Refund, ORD-10425 Layla N. 2 EGP 540 Mada 12:11 Paid, ORD-10424 Walk-in 3 EGP 870 Cash 11:58 Paid, ORD-10423 Hany M. 5 EGP 2,150 Visa 11:42 Pending); define `statusColor: Record<OrderStatus, "emerald" | "rose" | "amber">` (Paid→emerald, Refund→rose, Pending→amber); render: header (chip `{"// orders"}`, `h1` "Orders", subtitle + `<span className="font-mono text-[11px] text-amber-400/80">mock data</span>`); then `<div className="mt-5 grid gap-5 lg:grid-cols-3">`: orders table `<div className="card overflow-hidden lg:col-span-2">` with same column structure as dashboard orders table (Order, Customer, Items, Total, Method, Status, Time); highlight row for ORD-10428 with `bg-blue-500/5`; order detail panel `<div className="card p-5 lg:col-span-1">`: chip `{"// order detail"}`, heading "#ORD-10428", customer "Aya Hassan", 4 line items (Iced Latte ×2 / EGP 77.00, Chicken Sandwich ×2 / EGP 96.00) as a `divide-y divide-white/5` list, total row `EGP 1,240` in `font-semibold text-white`, payment row (Visa `credit-card` icon), status `<Badge color="emerald">Paid</Badge>`, time "12:42"; note `font-mono text-[10px] text-gray-500 mt-4` "mock order · foundation"

**Checkpoint**: US2 complete — `/orders` shows table + detail panel; highlighted row visible.

---

## Phase 5: User Story 3 — Customers Page (Priority: P2)

**Goal**: Replace the PlaceholderPage stub with aggregate stats row and a 5-customer card list with segment badges.

**Independent Test**: Navigate to `/customers`. A stats row shows 3 mock metrics at the top. 5 customer cards are visible below. Each card shows initials avatar, name, contact placeholder, last order date, spend, and at least one segment badge. VIP→purple, Regular→blue, New→emerald. Works at 375px.

- [X] T004 [P] [US3] Rewrite `apps/shops-app/app/(app)/customers/page.tsx` — remove `PlaceholderPage` import; import `Badge` from `@/components/dashboard/Badge` and `Icon` from `@/components/ui/Icon`; define `type CustomerSegment = "VIP" | "Regular" | "New"` and `type SegmentColor = "purple" | "blue" | "emerald"` with `segmentColor: Record<CustomerSegment, SegmentColor>` (VIP→purple, Regular→blue, New→emerald); define `customers` array of 5 entries (Aya Hassan/aya@example.com/3 Jan 2026/EGP 18,420/["VIP"], Omar Khaled/omar@example.com/2 Jan 2026/EGP 7,610/["Regular"], Layla Nasser/layla@example.com/2 Jan 2026/EGP 540/["New"], Ahmed Samy/ahmed@example.com/1 Jan 2026/EGP 4,320/["Regular"], Mariam Hassan/mariam@example.com/30 Dec 2025/EGP 22,100/["VIP"]); render: header (chip `{"// customers"}`, `h1` "Customers", subtitle + mock indicator); stats row `<div className="mb-6 flex flex-wrap gap-3">` with 3 chips each as `<div className="card px-4 py-3 text-center">`: "1,284 · Total customers", "847 · Active this month", "23 · New this week" (label in `font-mono text-[10px] text-gray-500`, number in `text-lg font-bold text-white`); customer list `<div className="space-y-3">` — each customer as `<div className="card flex items-center gap-4 p-4">`: avatar circle `<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/60 to-blue-500/60 text-xs font-semibold text-white">{initials}</div>` (initials = first two chars of name); `<div className="min-w-0 flex-1">` with name `text-sm font-semibold text-white`, contact `text-xs text-gray-500`, last order `text-xs text-gray-400`; spend `text-sm font-semibold text-white flex-shrink-0`; segments map as `<Badge color={segmentColor[seg]}>{seg}</Badge>`

**Checkpoint**: US3 complete — `/customers` shows 3 stat chips + 5 customer cards with badges.

---

## Phase 6: User Story 4 — Reports Page (Priority: P2)

**Goal**: Replace the PlaceholderPage stub with 4 StatCards, a 7-day CSS bar chart, and a top-categories mini-table.

**Independent Test**: Navigate to `/reports`. 4 metric cards visible at top with trend indicators. A 7-bar chart with day labels (Mon–Sun) is visible below. A top-categories table is visible beside the chart on desktop. All labelled mock. Works at 375px.

- [X] T005 [P] [US4] Rewrite `apps/shops-app/app/(app)/reports/page.tsx` — remove `PlaceholderPage` import; import `StatCard` from `@/components/dashboard/StatCard`; define `stats` array of 4 objects matching `StatCard` props: `{ label: "Revenue this week", value: "EGP 168,420", trend: "+12%", icon: "trending-up", color: "#3b82f6", sub: "vs last week", spark: "M0,22 L14,18 L28,15 L42,16 L56,12 L70,14 L84,9 L100,4" }`, `{ label: "Orders this week", value: "1,284", trend: "+8%", icon: "receipt", color: "#8b5cf6", sub: "all branches", spark: "M0,20 L14,19 L28,17 L42,18 L56,14 L70,15 L84,11 L100,8" }`, `{ label: "New customers", value: "86", trend: "+23%", icon: "users", color: "#06b6d4", sub: "this week", spark: "M0,22 L14,20 L28,18 L42,19 L56,15 L70,16 L84,12 L100,9" }`, `{ label: "Avg. ticket", value: "EGP 755", trend: "+4%", icon: "banknote", color: "#10b981", sub: "per order", spark: "M0,20 L14,19 L28,18 L42,17 L56,16 L70,15 L84,14 L100,13" }`; render: header (chip `{"// reports"}`, `h1` "Reports", subtitle + `<span className="font-mono text-[11px] text-amber-400/80">mock data</span>`); 4-column stat cards `<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(s => <StatCard key={s.label} {...s} />)}</div>`; below: `<div className="mt-5 grid gap-5 lg:grid-cols-2">` containing: 7-day bar chart `<div className="card p-5">` with chip `{"// sales by day"}`, heading "This week's rhythm", bar chart `<div className="flex h-44 items-end gap-2 mt-4">` — define `const weekData = [{ day: "Mon", pct: 45 }, { day: "Tue", pct: 62 }, { day: "Wed", pct: 78 }, { day: "Thu", pct: 55 }, { day: "Fri", pct: 92 }, { day: "Sat", pct: 88 }, { day: "Sun", pct: 40 }]` — each bar: `<div key={d.day} className="flex flex-1 flex-col items-center gap-1.5"><div className="w-full rounded-t" style={{ height: \`${d.pct}%\`, background: "linear-gradient(180deg,#60a5fa,#3b82f6)" }} /><span className="font-mono text-[10px] text-gray-600">{d.day}</span></div>`; and top categories `<div className="card p-5">` with chip `{"// top categories"}`, heading "By revenue", and a `divide-y divide-white/5` table of 3 rows (Beverages/EGP 82,100/706 orders, Food/EGP 54,920/311 orders, Bakery/EGP 18,400/268 orders) each as `flex items-center justify-between py-3`

**Checkpoint**: US4 complete — `/reports` shows 4 StatCards, 7-day bar chart, and categories table.

---

## Phase 7: User Story 5 — Settings Page (Priority: P3)

**Goal**: Replace the PlaceholderPage stub with a 4-section settings screen that reads branch/currency/mode from sessionStorage (with fallbacks). All inputs non-functional.

**Independent Test**: Navigate to `/settings`. 4 card sections are visible: Store Profile (shows "Mustafa's Co.", branch, currency — all read-only), Shop Mode (shows mode label), Team (2 placeholder members), Advanced (2 read-only toggles). A disabled "Save changes" button is visible. Branch and currency values match what was set during onboarding (or show fallbacks). Works at 375px.

- [X] T006 [P] [US5] Rewrite `apps/shops-app/app/(app)/settings/page.tsx` — add `"use client"` directive; import `useSyncExternalStore` from `react`; import `getBranch`, `getCurrency`, `getMode`, `type ShopsMode` from `@/lib/mode`; import `Icon` from `@/components/ui/Icon`; define `modeLabel: Record<ShopsMode, string>` (business→"Business Management", store→"Storefront", both→"Both"); inside `SettingsPage`: add `const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)` and derive `const branch = mounted ? (getBranch() ?? "Maadi Main") : "Maadi Main"`, `const currency = mounted ? (getCurrency() ?? "EGP") : "EGP"`, `const mode = mounted ? (getMode() ?? "both") : "both"`; render: header (chip `{"// settings"}`, `h1` "Settings", subtitle); then 4 `.card p-6 space-y-4 mt-6` sections:
  1. Store Profile — heading "Store Profile" with `chip mb-1 text-gray-500` label `{"// store profile"}`; 3 read-only rows each `flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5`: (`dashboard` icon, "Store: Mustafa's Co."), (`map-pin` icon, `\`Branch: ${branch}\``), (`banknote` icon, `\`Currency: ${currency}\``); disabled "Edit" chip `<span className="chip text-gray-600 cursor-not-allowed">Edit</span>`
  2. Shop Mode — heading + chip; read-only row (`dashboard` icon, `\`Mode: ${modeLabel[mode as ShopsMode]}\``); note "Selected during onboarding · change in onboarding flow" in `text-xs text-gray-600`
  3. Team — heading + chip `{"// team"}`; 2 static member rows (Mustafa Mohamed / Owner / `<Badge color="emerald">Active</Badge>`, Placeholder Staff / Cashier / `<Badge color="gray">Active</Badge>`); disabled "Invite member" button `<button type="button" disabled className="mt-2 text-xs text-gray-600 cursor-not-allowed">+ Invite member</button>`
  4. Advanced — heading + chip `{"// advanced"}`; 2 read-only toggle rows: ("Auto-close orders", OFF toggle span `<span className="inline-block h-5 w-9 rounded-full bg-white/10" />`), ("Email receipts", ON toggle span `<span className="inline-block h-5 w-9 rounded-full bg-blue-600/60" />`); each row `flex items-center justify-between py-2 text-sm text-white/70`
  - Below sections: `<button type="button" disabled className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/30 cursor-not-allowed">Save changes</button>`

**Checkpoint**: US5 complete — `/settings` shows 4 sections; branch and currency read from sessionStorage.

---

## Phase 8: Build Gate

**Purpose**: Lint and build to confirm all five pages compile cleanly.

- [X] T007 Run `pnpm lint` in `apps/shops-app` — fix all errors
- [X] T008 Run `pnpm tsc --noEmit` in `apps/shops-app` — must exit 0
- [X] T009 Run `pnpm --filter shops-app build` — must exit 0; confirm all pages in build output

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (AGENTS.md)   → no deps
T002 (Products)    → [P] — independent of all other page tasks
T003 (Orders)      → [P] — independent of all other page tasks
T004 (Customers)   → [P] — independent of all other page tasks
T005 (Reports)     → [P] — independent of all other page tasks
T006 (Settings)    → [P] — independent of all other page tasks
T007 (lint)        → depends on T002–T006 all complete
T008 (tsc)         → [P] with T007 — can run alongside lint
T009 (build)       → depends on T007 + T008 both passing
```

### Parallel Opportunities

```
T001

T002 ─┐
T003 ─┤
T004 ─┤  (all 5 page rewrites fully parallel — different files)
T005 ─┤
T006 ─┘

→ T007 + T008 (parallel) → T009
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009
```

---

## Implementation Strategy

### MVP First (US1 + US2 — the two P1 pages)

1. T001 (AGENTS.md)
2. T002 (Products) + T003 (Orders) — can run in parallel
3. **STOP and VALIDATE**: Navigate to `/products` and `/orders` — mock data visible, badges correct
4. T004 (Customers) + T005 (Reports) — parallel
5. T006 (Settings)
6. T007 + T008 (parallel) → T009

### Incremental Delivery

1. T001 + T002 → Products page ships
2. + T003 → Orders page ships
3. + T004 → Customers page ships
4. + T005 → Reports page ships
5. + T006 → Settings page ships; all 5 pages operational
6. T007 + T008 + T009 → Feature ships

---

## Notes

- T002 (Products): The table should use `overflow-x-auto` on mobile to prevent layout breaks — add it on the table wrapper div, not the `.card` itself.
- T003 (Orders): The highlighted row for #ORD-10428 uses `bg-blue-500/5` background — this is subtle and correct.
- T004 (Customers): Customer initials = first letter of first name + first letter of last name, uppercased. "Layla Nasser" → "LN", "Ahmed Samy" → "AS".
- T005 (Reports): `StatCard` expects `spark` as an SVG path string. The paths provided in the plan are pre-computed — use them verbatim.
- T006 (Settings): The `mode` value from `getMode()` may be `null` after mount if sessionStorage is empty — use `?? "both"` fallback then cast to `ShopsMode`. Alternatively: `const rawMode = mounted ? getMode() : null` and render `modeLabel[rawMode ?? "both"]`.
- T007/T008: Run both in parallel — lint checks style, tsc checks types. Both must pass before T009.
- T009: The build output should list `/products`, `/orders`, `/customers`, `/reports`, `/settings` as compiled routes.
