# Research: Shops App UI Polish

**Feature**: `011-shops-app-ui-polish`
**Date**: 2026-05-13

---

## R-001 — Icon Strategy (Inline SVG, No CDN)

**Decision**: A typed `Icon` component renders from a local `Record<string, string>`
of SVG path `d` attributes. Props: `name: IconName`, `className?: string`,
`strokeWidth?: number`.

**Icon set needed** (from reference analysis):

| Logical name | Used in |
|---|---|
| `dashboard` | Sidebar nav |
| `package` | Sidebar / StatCard / low-stock panel |
| `users` | Sidebar / StatCard |
| `chart-bar` | Sidebar / Reports |
| `settings` | Sidebar |
| `shopping-bag` | Sidebar Shops logo |
| `scan-line` | POS card / Topbar button |
| `bell` | Topbar |
| `search` | Topbar |
| `chevron-down` | Topbar user dropdown |
| `chevrons-up-down` | Topbar store/branch selectors |
| `map-pin` | Topbar branch selector |
| `arrow-up-right` | Table "View all" links |
| `credit-card` | Orders table Method column |
| `banknote` | Orders table Method column |
| `plus` | Dashboard header button |
| `download` | Dashboard export button |
| `package-plus` | Quick action |
| `receipt` | Quick action |
| `user-plus` | Quick action |
| `package-search` | Quick action |
| `file-text` | Quick action (Z-report) |
| `alert-triangle` | Low stock StatCard |
| `trending-up` | Sales StatCard |
| `chevron-left` | Sidebar back link |
| `chevron-right` | Breadcrumb separators |
| `menu` | Mobile hamburger |
| `x` | Mobile sidebar close |

**Rationale**: 28 icons covers the full reference. All are standard Lucide shapes;
the SVG path strings are sourced from the Lucide open-source icon set (MIT licence).
No runtime dependency on Lucide — paths are baked in.

**Alternatives considered**:
- `@heroicons/react`: Additional package — forbidden by scope.
- SVG sprite: Overkill for 28 icons in a single-app context.

---

## R-002 — Sparkline Implementation

**Decision**: Each `StatCard` accepts a `spark?: string` prop containing a pre-computed
SVG path `d` string (e.g. `"M0,20 L10,18 L20,15 ..."`). The card renders:

```tsx
<svg viewBox="0 0 100 30" className="w-full h-8" preserveAspectRatio="none">
  <defs>
    <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity="0.5" />
      <stop offset="100%" stopColor={color} stopOpacity="0" />
    </linearGradient>
  </defs>
  <path d={spark} fill="none" stroke={color} strokeWidth="1.5" />
  <path d={`${spark} L100,30 L0,30 Z`} fill={`url(#sg-${label})`} />
</svg>
```

**Rationale**: Zero dependencies. Gradient fill recreates the reference visual exactly.

---

## R-003 — Sales-by-Hour Bar Chart

**Decision**: Map over a 24-element mock array. Each element produces two `<div>`
siblings (today bar, last-week bar) within a `flex items-end` column:

```tsx
<div style={{ height: `${v}%`, background: 'linear-gradient(180deg,#60a5fa,#3b82f6)' }} />
<div style={{ height: `${Math.max(5, v - 12)}%` }} className="bg-white/10" />
```

Container is `flex items-end gap-2 h-44`. Time axis (00, 06, 12, 18, 24) rendered as
`flex justify-between` below. Summary stats in a 3-column grid below that.

**Rationale**: Exact match to reference. No SVG, no chart library, no extra deps.

---

## R-004 — Component Directory

**Decision**:
- `components/ui/Icon.tsx` — shared primitive
- `components/ui/Logo.tsx` — shared primitive
- `components/dashboard/Sidebar.tsx` — layout
- `components/dashboard/Topbar.tsx` — layout
- `components/dashboard/StatCard.tsx` — dashboard widget
- `components/dashboard/Badge.tsx` — inline status chip

**Rationale**: Mirrors `apps/core-platform` conventions; separates generic UI from
dashboard-specific components without cross-app imports.

---

## R-005 — Old Layout Components

**Decision**: Delete `components/layout/Sidebar.tsx` and `components/layout/Topbar.tsx`
after wiring new components into `app/(app)/layout.tsx`.

**Rationale**: No other files import from `components/layout/`; dead code adds confusion.

---

## Summary Table

| ID | Decision | Files |
|---|---|---|
| R-001 | Inline SVG icon map, 28 icons | `components/ui/Icon.tsx` |
| R-002 | Hand-coded SVG sparklines via `spark` prop | `components/dashboard/StatCard.tsx` |
| R-003 | CSS flex bars, 24 columns | `app/(app)/dashboard/page.tsx` |
| R-004 | `components/ui/` + `components/dashboard/` directories | all new components |
| R-005 | Delete old `components/layout/` files | `components/layout/Sidebar.tsx`, `components/layout/Topbar.tsx` |
