# Implementation Plan: Shops App UI Polish

**Branch**: `011-shops-app-ui-polish` | **Date**: 2026-05-13 | **Spec**: [spec.md](./spec.md)

## Summary

Polish the `apps/shops-app` UI shell using `docs/NexoraXS Shops.html` as the visual
reference. Deliverables: upgraded globals.css, `Logo` and `Icon` primitive components
(inline SVG, no CDN), fully redesigned `Sidebar` and `Topbar` (matching the reference
with Operations/Configure sections + POS card), new shared `StatCard` and `Badge`
components, a rich dashboard page with all reference widgets (stat cards, quick actions,
recent orders table, low stock panel, top products, sales-by-hour chart), and updated
placeholder pages. All data is mock and clearly labelled. Build must pass.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, TailwindCSS 4.x
**Storage**: N/A — all data is inline mock constants
**Testing**: `pnpm --filter shops-app build` (zero errors gate) + visual QA in browser
**Target Platform**: Web (desktop + mobile, 375 px and above)
**Project Type**: Web application — Next.js App Router, `apps/shops-app` only
**Performance Goals**: Standard page-load; no chart library; SVG sparklines are hand-coded
**Constraints**: No new packages; no imports from `apps/core-platform`; no CDN scripts;
  no external icon library; all icons are inline SVG paths
**Scale/Scope**: 10 components + 1 CSS file + 7 pages (1 dashboard + 5 placeholders + onboarding)

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ Pass | Only `apps/shops-app` touched; no cross-app imports |
| II — Multi-Tenant Isolation | ✅ N/A | No database tables or queries; pure UI |
| III — App Boundary Enforcement | ✅ Pass | No imports from `apps/core-platform`; all primitives self-contained |
| IV — Type Safety | ✅ Pass | All new files `.tsx`/`.ts` under strict mode; no `any` |
| V — SDK-First API Access | ✅ N/A | No API calls; all data is inline mock |
| VI — Spec-Driven Development | ✅ Pass | Spec written and validated before this plan |

No violations. Complexity Tracking omitted.

---

## Project Structure

### Documentation (this feature)

```text
specs/011-shops-app-ui-polish/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── contracts/
│   └── components.md    ← Phase 1 output (component prop contracts)
├── checklists/
│   └── requirements.md
└── tasks.md             ← /speckit.tasks output
```

### Source Code (files to create / modify)

```text
apps/shops-app/
├── app/
│   ├── globals.css                    ← UPDATE: add .btn-pos, refine tokens
│   └── (app)/
│       ├── layout.tsx                 ← UPDATE: swap to new Sidebar/Topbar
│       ├── dashboard/
│       │   └── page.tsx               ← REWRITE: all reference widgets
│       ├── products/page.tsx          ← UPDATE: new design system
│       ├── orders/page.tsx            ← UPDATE: new design system
│       ├── customers/page.tsx         ← UPDATE: new design system
│       ├── reports/page.tsx           ← UPDATE: new design system
│       └── settings/page.tsx          ← UPDATE: new design system
├── components/
│   ├── ui/
│   │   ├── Icon.tsx                   ← CREATE: inline SVG icon component
│   │   └── Logo.tsx                   ← CREATE: NexoraXS Shops wordmark
│   └── dashboard/
│       ├── Sidebar.tsx                ← CREATE: replaces components/layout/Sidebar.tsx
│       ├── Topbar.tsx                 ← CREATE: replaces components/layout/Topbar.tsx
│       ├── StatCard.tsx               ← CREATE: stat card with sparkline
│       └── Badge.tsx                  ← CREATE: status badge (emerald/rose/amber/etc.)
└── (components/layout/ — existing files become unused; deleted or left in place)
```

**Existing files becoming superseded**:
- `components/layout/Sidebar.tsx` → superseded by `components/dashboard/Sidebar.tsx`
- `components/layout/Topbar.tsx` → superseded by `components/dashboard/Topbar.tsx`
- Both old files will be deleted to keep the tree clean.

---

## Phase 0: Research

**Output file**: `specs/011-shops-app-ui-polish/research.md`

### R-001 — Icon Strategy (No Lucide CDN)

**Decision**: Implement a typed `Icon` component that renders inline SVG paths from a
local map. The reference uses Lucide icons via CDN UMD — the implementation recreates
the subset of icons actually needed as hand-coded SVG path strings.

**Required icon names** (derived from reference): `dashboard`, `package`, `users`,
`chart-bar`, `settings`, `shopping-bag`, `scan-line`, `bell`, `search`, `chevron-down`,
`chevrons-up-down`, `map-pin`, `arrow-up-right`, `credit-card`, `banknote`, `plus`,
`download`, `package-plus`, `receipt`, `user-plus`, `package-search`, `file-text`,
`alert-triangle`, `trending-up`, `chevron-left`, `chevron-right`, `menu`, `x`.

**Rationale**: CDN scripts are forbidden by the spec. The icon set is small and stable
for this feature. Inline SVG gives full control over `strokeWidth` and `className`.

### R-002 — Sparkline Implementation

**Decision**: Inline `<svg viewBox="0 0 100 30">` with a hand-coded `<path d="..."`
and a gradient `<defs>` block. Each sparkline path is a static mock string matching the
reference data shape.

**Rationale**: No chart library; TailwindCSS has no sparkline utility. Hand-coded SVG
paths are the smallest zero-dependency solution. Each StatCard receives its sparkline
path as a prop.

### R-003 — Sales-by-Hour Chart

**Decision**: 24 `<div>` columns rendered by mapping over a mock data array, each
containing two flex children (today bar + last-week bar) with heights set via inline
`style={{ height: '${v}%' }}`. Pure CSS/Tailwind, no SVG, no chart library.

**Rationale**: Matches the reference implementation exactly (which also used CSS bars),
requires no additional packages, and is trivially responsive.

### R-004 — Component Directory Convention

**Decision**: New shared UI primitives go in `components/ui/` (Logo, Icon). Dashboard-
specific components go in `components/dashboard/` (Sidebar, Topbar, StatCard, Badge).

**Rationale**: Mirrors the `apps/core-platform` convention established in earlier
features, keeping the monorepo consistent without cross-app imports.

### R-005 — Old Layout Components

**Decision**: Delete `components/layout/Sidebar.tsx` and `components/layout/Topbar.tsx`
after the new `components/dashboard/` equivalents are created and wired up.

**Rationale**: Dead code in the same app is a maintenance hazard. The route group layout
(`app/(app)/layout.tsx`) will be updated to import from the new paths.

---

## Phase 1: Design

No data model — all data is inline mock constants in the page files.

### Component Prop Contracts

Documented in `specs/011-shops-app-ui-polish/contracts/components.md`.

### Agent Context Update

Update `AGENTS.md` between `<!-- SPECKIT START -->` and `<!-- SPECKIT END -->`:

```markdown
<!-- SPECKIT START -->
**Current feature**: `011-shops-app-ui-polish`
**Plan**: [specs/011-shops-app-ui-polish/plan.md](specs/011-shops-app-ui-polish/plan.md)
**Spec**: [specs/011-shops-app-ui-polish/spec.md](specs/011-shops-app-ui-polish/spec.md)
**Branch**: `011-shops-app-ui-polish`
<!-- SPECKIT END -->
```

### Quickstart

```bash
cd apps/shops-app && pnpm dev
# http://localhost:3001 (or next available port)
```

Verification path:
1. `/` → `/onboarding` → select mode → `/dashboard`
2. Dashboard: stat cards visible, all widget sections present
3. Sidebar: Operations / Configure sections, POS card at bottom
4. Click all 5 sidebar section links — placeholders load correctly
5. Resize to 375 px — hamburger visible, sidebar drawer works
6. `pnpm --filter shops-app build` → exit 0
