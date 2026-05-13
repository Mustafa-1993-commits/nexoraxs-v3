# Research: Shops Operations Foundation

**Feature**: 017-shops-operations-foundation
**Date**: 2026-05-14

No external research needed — all decisions derive from codebase audit and established patterns.

---

## Decision 1: Page Architecture — Server vs. Client Components

**Decision**:
- `/products`, `/orders`, `/customers`, `/reports` → Server Components (no `"use client"`)
- `/settings` → `"use client"` (reads sessionStorage via `useSyncExternalStore`)

**Rationale**: Mock data is static and inline — no browser APIs needed for 4 of the 5 pages. `"use client"` adds hydration cost without benefit. Settings reads `getBranch()`, `getCurrency()`, `getMode()` which require `window` — same `useSyncExternalStore` pattern used in `Topbar.tsx`, `StoreProfile.tsx`, `NextSteps.tsx`.

**Alternatives considered**:
- All pages as `"use client"`: Unnecessary hydration overhead, rejected.
- A single shared layout client wrapper: Adds complexity for no gain, rejected.

---

## Decision 2: Mock Data Theme and Consistency

**Decision**: All mock data uses the café/coffee-shop theme established on the dashboard (Espresso Beans, Iced Latte, Croissant, etc.) and the same customer names (Aya Hassan, Omar Khaled, Layla N., etc.).

**Rationale**: The dashboard already rendered this data — using the same theme avoids jarring inconsistency when switching between pages. A user who sees "Aya Hassan" in the dashboard's orders table should see the same name on the Orders page.

**Customer mock data** (5 entries):

| Name | Segment | Spend | Last Order |
|------|---------|-------|------------|
| Aya Hassan | VIP | EGP 18,420 | 3 Jan 2026 |
| Omar Khaled | Regular | EGP 7,610 | 2 Jan 2026 |
| Layla Nasser | New | EGP 540 | 2 Jan 2026 |
| Ahmed Samy | Regular | EGP 4,320 | 1 Jan 2026 |
| Mariam Hassan | VIP | EGP 22,100 | 30 Dec 2025 |

**Product mock data** (6 entries):

| Name | Category | Status | Stock | Price |
|------|----------|--------|-------|-------|
| Iced Latte | Beverages | Active | 482 units | EGP 38.50 |
| Chicken Sandwich | Food | Active | 311 units | EGP 48.00 |
| Croissant | Bakery | Active | 268 units | EGP 24.00 |
| Cold Brew | Beverages | Active | 224 units | EGP 44.00 |
| Espresso Beans 1kg | Supplies | Low Stock | 3 units | EGP 210.00 |
| Oat Milk Carton | Supplies | Low Stock | 5 units | EGP 42.00 |

---

## Decision 3: Products Page Layout

**Decision**: Full-width table (same pattern as dashboard orders table). Columns: Product name + category badge, Status badge, Stock, Price, Actions column (disabled). Search bar above the table (disabled, `aria-label="Mock search"`). Filter row with category chips. "Add product" button top-right (disabled).

**Rationale**: Table format scales to many products; matches dashboard orders table; reuses established pattern. Card grid was considered but would hide stock/price data at narrow widths.

**Icon choices**: `package` (product rows), `package-plus` (Add product), `search` (search bar), `alert-triangle` (Low Stock badge color cue)

---

## Decision 4: Orders Page Layout

**Decision**: Two-column desktop layout — orders table (2/3 width) + order detail panel (1/3 width). On mobile, table full-width + detail panel below. The detail panel shows one statically highlighted order with itemized mock line items.

**Rationale**: The dashboard already has the orders table. The Orders page adds the detail panel as the new content. Two-column matches standard ERP/POS patterns. Using `lg:grid-cols-3` with `lg:col-span-2` for table and `lg:col-span-1` for panel.

**Reuse**: Order data and `Badge` component from dashboard. Same `statusColor` map (Paid→emerald, Refund→rose, Pending→amber).

---

## Decision 5: Customers Page Layout

**Decision**: Top summary stats row (3 chips: Total Customers 1,284 · Active This Month 847 · New This Week 23). Below: customer table or card list. Using a card-per-customer layout (not a dense table) for visual warmth and legibility at mobile widths. Each card: avatar initials, name, contact placeholder, last order date, spend, segment badge(s).

**Rationale**: Customer data is richer per-row than orders (more contextual fields) — cards scale better. Table approach would require horizontal scroll on mobile.

**Avatar pattern**: Coloured initial circles (same as dashboard breadcrumb avatars) — no image uploads needed.

---

## Decision 6: Reports Page Layout

**Decision**:
- Row 1: 4 StatCard components (Revenue, Orders, New Customers, Avg. Ticket) — reuse `StatCard` from `components/dashboard/StatCard.tsx`
- Row 2: 7-day CSS bar chart (Mon–Sun) + a "Top categories" mini-table side by side on desktop
- Clear "mock data" annotation throughout

**Rationale**: Reusing `StatCard` is the fastest correct path — it already handles sparklines, icons, trends, and glow. The 7-day bar chart is simpler than the 24-hour chart from the dashboard (fewer bars, easier to read). No new chart library.

**Chart data**: 7 bars with percentage heights (Mon: 45%, Tue: 62%, Wed: 78%, Thu: 55%, Fri: 92%, Sat: 88%, Sun: 40%).

**Icons for StatCards**: `trending-up` (revenue), `receipt` (orders), `users` (customers), `banknote` (avg ticket)

---

## Decision 7: Settings Page Layout

**Decision**: 4 vertical sections, each as a `.card` with a section heading, using `"use client"` + `useSyncExternalStore` for mount detection:

1. **Store Profile** — store name (static "Mustafa's Co."), branch (`getBranch() ?? "Maadi Main"`), currency (`getCurrency() ?? "EGP"`). All displayed as read-only rows (no `<input>` elements — just styled `<div>`s with a `Edit` chip that is disabled).

2. **Shop Mode** — displays `getMode()` with label mapping. Read-only chip.

3. **Team** — 2 placeholder team member rows (Name, Role, Status badge). No edit.

4. **Advanced** — 2 placeholder toggle rows (Auto-close orders: Off, Email receipts: On) using visual-only toggle spans. No `onChange` handlers.

5. **Save changes** button — fully disabled (no onClick).

**Rationale**: Reading from sessionStorage requires `useSyncExternalStore`. All other inputs are intentionally read-only to enforce the no-CRUD constraint. Using styled `<div>` rows instead of `<input disabled>` avoids disabled-input styling inconsistencies across browsers.

---

## Decision 8: Icon Substitutions

Icons needed that are NOT in the 28-icon set:

| Needed | Substitute | Reason |
|--------|-----------|--------|
| `store` / `shop` | `dashboard` | Closest "overview" semantic |
| `filter` / `funnel` | `search` | Filter controls use search icon |
| `tag` / `label` | `file-text` | Category label semantic |
| `calendar` | `file-text` | Date display fallback |
| `toggle` | N/A | SVG toggle rendered inline (not using Icon component) |

---

## Decision 9: Files Changed

5 page files are replaced (full rewrites). No new component files, no new packages.

| File | Change |
|------|--------|
| `apps/shops-app/app/(app)/products/page.tsx` | Full rewrite — Server Component |
| `apps/shops-app/app/(app)/orders/page.tsx` | Full rewrite — Server Component |
| `apps/shops-app/app/(app)/customers/page.tsx` | Full rewrite — Server Component |
| `apps/shops-app/app/(app)/reports/page.tsx` | Full rewrite — Server Component |
| `apps/shops-app/app/(app)/settings/page.tsx` | Full rewrite — `"use client"` |
| `AGENTS.md` | Update SPECKIT block to 017 |
