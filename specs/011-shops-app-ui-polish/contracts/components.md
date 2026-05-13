# Component Prop Contracts: Shops App UI Polish

**Feature**: `011-shops-app-ui-polish`
**Date**: 2026-05-13

---

## `Icon` — `components/ui/Icon.tsx`

```ts
type IconName =
  | "dashboard" | "package" | "users" | "chart-bar" | "settings"
  | "shopping-bag" | "scan-line" | "bell" | "search"
  | "chevron-down" | "chevron-left" | "chevron-right" | "chevrons-up-down"
  | "map-pin" | "arrow-up-right" | "credit-card" | "banknote"
  | "plus" | "download" | "package-plus" | "receipt"
  | "user-plus" | "package-search" | "file-text"
  | "alert-triangle" | "trending-up" | "menu" | "x";

interface IconProps {
  name: IconName;
  className?: string;   // default: "w-4 h-4"
  strokeWidth?: number; // default: 2
}
```

Renders a `<svg>` with `stroke="currentColor"` and `fill="none"`. No other elements.

---

## `Logo` — `components/ui/Logo.tsx`

```ts
interface LogoProps {
  size?: "sm" | "md";   // default: "md"
}
```

Renders the Shops icon (blue gradient square with shopping-bag icon) + "NexoraXS Shops"
wordmark. "NexoraXS" in white, "Shops" in muted white/50. No props required.

---

## `Badge` — `components/dashboard/Badge.tsx`

```ts
type BadgeColor = "blue" | "emerald" | "amber" | "rose" | "purple" | "cyan" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;  // default: "gray"
}
```

Renders a `<span>` with `.chip` class + colour-specific Tailwind classes:

| Color | Classes |
|-------|---------|
| emerald | `bg-emerald-500/15 text-emerald-300 border-emerald-500/20` |
| rose | `bg-rose-500/15 text-rose-300 border-rose-500/20` |
| amber | `bg-amber-500/15 text-amber-300 border-amber-500/20` |
| blue | `bg-blue-500/15 text-blue-300 border-blue-500/20` |
| purple | `bg-purple-500/15 text-purple-300 border-purple-500/20` |
| cyan | `bg-cyan-500/15 text-cyan-300 border-cyan-500/20` |
| gray | `bg-white/5 text-gray-400 border-white/10` |

---

## `StatCard` — `components/dashboard/StatCard.tsx`

```ts
interface StatCardProps {
  label: string;        // chip label (e.g. "Sales today")
  value: string;        // large bold value (e.g. "EGP 24,180")
  sub?: string;         // sub-label (e.g. "32 orders · Maadi branch")
  icon: IconName;       // icon in coloured badge
  color: string;        // hex accent (e.g. "#3b82f6")
  trend?: string;       // e.g. "+12%" — green if starts with "+", red if "-"
  spark?: string;       // SVG path d= string for sparkline
}
```

Layout: `card p-5 relative overflow-hidden`. Glow blob top-right. Icon badge top-right
of header row. Sparkline at bottom (rendered only when `spark` prop present).

---

## `Sidebar` — `components/dashboard/Sidebar.tsx`

```ts
// No external props — all nav items and sections are self-contained.
// Reads usePathname() to derive active state.
// Mobile state managed internally via useState.
```

Nav sections:
- `Operations`: Dashboard, Products, Orders, Customers, Reports
- `Configure`: Settings
- Bottom: POS card (visual only, `href="#"`)
- Header: Logo + back-to-platform link (`href="#"`)

---

## `Topbar` — `components/dashboard/Topbar.tsx`

```ts
// No external props — all content is mock data rendered inline.
// Current page title derived from usePathname() via a titles map.
```

Left: store selector pill (mock "Mustafa's Co.") + branch pill (mock "Maadi · Main").
Center: search input (hidden < 768 px).
Right: "Open POS" btn-pos button + bell + user avatar.
All interactive elements are visual-only — no dropdowns open.
