# Research: Core Platform UI Polish

**Branch**: `006-core-platform-polish` | **Date**: 2026-05-12
**Phase**: 0 — Design extraction from reference + code audit

---

## Design Token Extraction (from `docs/NexoraXS Platform.html`)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Body, sidebar, pages |
| Sidebar bg | `#0a0a0f/95` | Sidebar panel (with backdrop) |
| Card surface | `rgba(255,255,255,0.03)` | `.card` bg |
| Card border | `rgba(255,255,255,0.08)` | `.card` border |
| Blue | `#3b82f6` | Primary accent |
| Indigo | `#6366f1` | Primary gradient end |
| Purple | `#8b5cf6` | Secondary accent |
| Cyan | `#06b6d4` | Tertiary accent |

### CSS Utility Classes (extracted verbatim from reference)

```css
.gradient-text {
  background: linear-gradient(120deg, #3b82f6, #8b5cf6 50%, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card {
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 20px;
}

.card-hover {
  transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
}
.card-hover:hover {
  border-color: rgba(255,255,255,0.16);
  background-color: rgba(255,255,255,0.05);
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  box-shadow: 0 6px 24px -10px rgba(59,130,246,0.7),
              inset 0 1px 0 rgba(255,255,255,0.15);
  transition: transform .15s ease, box-shadow .15s ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px -10px rgba(59,130,246,0.9);
}

.chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-item {
  transition: background-color .15s ease, color .15s ease;
}
.nav-item-active {
  background: linear-gradient(90deg, rgba(59,130,246,0.15), rgba(139,92,246,0.08));
  color: white;
  position: relative;
}
.nav-item-active::before {
  content: '';
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}
```

---

## Decision: IconName Type Location

**Problem**: `MetricCard` needs `icon: IconName`. `metrics.ts` would need to import
`IconName` from `nav-items.ts`, creating a coupling between two mock-data files.

**Decision**: Move `IconName` to `lib/types.ts`. Both `nav-items.ts` and `Icon.tsx`
import from `lib/types.ts`. `metrics.ts` can also import from there.

**New type union** (adds 5 new icon names to the existing 7):
```typescript
export type IconName =
  | "dashboard" | "apps" | "settings" | "users"
  | "menu" | "x" | "chevron-right"
  | "credit-card" | "search" | "bell" | "chevron-down" | "trending-up";
```

---

## Decision: New SVG Paths Needed

| Name | SVG path |
|------|----------|
| `credit-card` | `M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z` |
| `search` | `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z` |
| `bell` | `M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z` |
| `chevron-down` | `M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z` |
| `trending-up` | `M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z` |

---

## Decision: Topbar Title Strategy

**Decision**: `Topbar` is a `"use client"` component using `usePathname()` to
derive the page title from a static route→title map. This avoids passing a
`title` prop through the layout to every page.

```typescript
const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/apps": "App Launcher",
  "/dashboard/billing": "Plan & billing",
  "/dashboard/settings": "Settings",
};
```

---

## Decision: Dashboard Layout Restructure

**Current**: `Sidebar` | `<main>` (with `pt-20` mobile top padding)

**New**: Sidebar | `div.flex-1.flex-col` → `Topbar` (sticky) + `<main>` (scrollable)

```tsx
<div className="flex min-h-screen bg-[#0a0a0f]">
  <Sidebar />
  <div className="flex flex-1 flex-col md:ml-64">
    <Topbar />
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      {children}
    </main>
  </div>
</div>
```

Mobile: no `ml-64` offset; Topbar is full-width above main content; sidebar overlays.
The `pt-20` hack (to clear mobile hamburger) is removed — Topbar provides the header.

---

## Decision: Metric Interface Extension

Add `icon: IconName` and `color: string` (hex) to the `Metric` interface.

Updated mock metrics:
```typescript
{ label: "Apps enabled",   value: "2",     trend: "+1",             accent: "text-blue-400",   icon: "apps",        color: "#3b82f6" },
{ label: "Team members",   value: "14",    trend: "+3 this month",  accent: "text-purple-400", icon: "users",       color: "#8b5cf6" },
{ label: "Workspaces",     value: "3",     trend: "2 active",       accent: "text-cyan-400",   icon: "dashboard",   color: "#06b6d4" },
{ label: "Current plan",   value: "Beta",  trend: "Renews 2027",    accent: "text-pink-400",   icon: "trending-up", color: "#ec4899" },
```

---

## Decision: Resources Section — No New Icons

The Sidebar "Resources" section (Documentation, Changelog, Support) renders as
plain text links with no icons. This avoids adding 3 more SVG paths (BookOpen,
Sparkles, LifeBuoy) to `Icon.tsx`. Beginner-friendly; visually acceptable.

---

## Complete File Change List

```
lib/types.ts                                CREATE — shared IconName type
lib/mock-data/nav-items.ts                  UPDATE — import IconName from types; add billing item
lib/mock-data/metrics.ts                    UPDATE — add icon + color fields
lib/mock-data/activity.ts                   CREATE — mock activity events
components/ui/Icon.tsx                      UPDATE — import IconName from types; add 5 new paths
components/ui/Logo.tsx                      CREATE — gradient brand mark
components/ui/Button.tsx                    UPDATE — primary variant uses btn-primary CSS class
components/dashboard/Sidebar.tsx            UPDATE — Logo, sections, Beta card, nav-item-active
components/dashboard/Topbar.tsx             CREATE — "use client", usePathname title
components/dashboard/MetricCard.tsx         UPDATE — glow blob, icon square, trend badge
app/globals.css                             UPDATE — add design utility classes
app/dashboard/layout.tsx                    UPDATE — add Topbar, restructure flex layout
app/dashboard/page.tsx                      UPDATE — improved header, richer activity feed
app/dashboard/billing/page.tsx              CREATE
app/dashboard/settings/page.tsx             CREATE — "use client" for tab state
```

Total: 3 created + 12 updated = **15 files**.
