# Research: Core Platform UI Shell

**Branch**: `005-core-platform-shell` | **Date**: 2026-05-12
**Phase**: 0 — Boilerplate audit + architectural decisions

---

## Boilerplate Audit

| File | Current State | Action |
|------|--------------|--------|
| `app/globals.css` | Light/dark media query, white background | Replace — dark-only, `#0a0a0f` body |
| `app/layout.tsx` | Placeholder metadata, white bg | Update — title + dark body class |
| `app/page.tsx` | Default Next.js welcome page | Replace — server redirect to `/login` |

No existing `components/`, `lib/`, or custom routes. All new.

---

## Decision: Root Page

**Decision**: `app/page.tsx` uses `redirect("/login")` from `next/navigation`.
**Rationale**: Server-side redirect; no JS bundle cost; keeps `/` from rendering stale content.

---

## Decision: Sidebar Architecture

**Decision**: `Sidebar.tsx` is a single self-contained `"use client"` component that:
- Holds `isOpen` state for the mobile drawer
- Uses `usePathname()` to highlight the active nav item
- Renders both the hamburger button (mobile) and the sidebar panel
- Closes itself when a nav link is clicked on mobile

**Rationale**: Self-contained pattern requires no shared state, no context, and no
separate `MobileHeader` component — beginner-friendly and avoids prop drilling.

**Dashboard layout** (`app/dashboard/layout.tsx`) is a Server Component that renders:
```tsx
<div className="flex min-h-screen bg-[#0a0a0f]">
  <Sidebar />
  <main className="flex-1 overflow-y-auto">{children}</main>
</div>
```

---

## Decision: Icons Without a Package

**Decision**: Create a minimal `components/ui/Icon.tsx` component that renders a
small set of inline SVG paths selected by name. Covers: dashboard, apps, settings,
users, chevron, menu (hamburger), x (close).

**Rationale**: Lucide-react is not installed in `core-platform` and the spec forbids
new packages. Inline SVGs via a lookup object require zero dependencies and are
fully type-safe with a union type for icon names.

```typescript
type IconName = "dashboard" | "apps" | "settings" | "users" | "menu" | "x" | "chevron-right";
```

---

## Decision: Form State

**Decision**: Login and Register use simple uncontrolled `<form>` elements with no
`onSubmit` handler. Buttons are `type="button"` to prevent accidental submission.

**Rationale**: The spec explicitly states forms are UI-only. No controlled state,
no form library, no validation — minimum viable shell.

---

## Decision: Component Structure

```
components/
├── ui/
│   ├── Button.tsx       — variant prop: "primary" | "secondary" | "ghost"
│   ├── Input.tsx        — label + input wrapper
│   └── Icon.tsx         — inline SVG icon lookup
└── dashboard/
    ├── Sidebar.tsx      — "use client", self-contained mobile + desktop
    ├── MetricCard.tsx   — label + value + optional trend string
    ├── AppCard.tsx      — name + description + available flag
    └── WorkspaceCard.tsx — name + type + onClick
```

---

## Decision: Mock Data Location

All mock data in `lib/mock-data/`:

| File | Exports | Used by |
|------|---------|---------|
| `nav-items.ts` | `navItems: NavItem[]` | `Sidebar.tsx` |
| `workspaces.ts` | `mockWorkspaces: Workspace[]` | `/workspaces` page |
| `metrics.ts` | `mockMetrics: Metric[]` | `/dashboard` page |
| `apps.ts` | `mockApps: App[]` | `/dashboard/apps` page |

---

## Design Token Reference

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Body, sidebar, pages |
| Surface | `white/5` | Cards, inputs |
| Surface hover | `white/8` | Card hover |
| Border | `white/10` | All borders |
| Blue accent | `blue-500` / `blue-600` | Primary buttons, active nav |
| Purple accent | `purple-500` | Badges, highlights |
| Cyan accent | `cyan-500` | Metric card accents |
| Body text | `white/90` | Primary text |
| Muted text | `white/50` | Labels, captions |
| Sidebar width | `w-64` (256px) | Desktop sidebar |

---

## Complete File Tree

```
apps/core-platform/
├── app/
│   ├── globals.css              UPDATE
│   ├── layout.tsx               UPDATE
│   ├── page.tsx                 REPLACE → redirect("/login")
│   ├── login/
│   │   └── page.tsx             CREATE
│   ├── register/
│   │   └── page.tsx             CREATE
│   ├── workspaces/
│   │   └── page.tsx             CREATE
│   └── dashboard/
│       ├── layout.tsx           CREATE — shared layout
│       ├── page.tsx             CREATE — overview
│       └── apps/
│           └── page.tsx         CREATE — app launcher
├── components/
│   ├── ui/
│   │   ├── Button.tsx           CREATE
│   │   ├── Input.tsx            CREATE
│   │   └── Icon.tsx             CREATE
│   └── dashboard/
│       ├── Sidebar.tsx          CREATE
│       ├── MetricCard.tsx       CREATE
│       ├── AppCard.tsx          CREATE
│       └── WorkspaceCard.tsx    CREATE
└── lib/
    └── mock-data/
        ├── nav-items.ts         CREATE
        ├── workspaces.ts        CREATE
        ├── metrics.ts           CREATE
        └── apps.ts              CREATE
```

Total: 3 updated + 17 created = **20 files**.
