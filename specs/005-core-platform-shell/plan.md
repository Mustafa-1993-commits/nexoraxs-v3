# Implementation Plan: Core Platform UI Shell

**Branch**: `005-core-platform-shell` | **Date**: 2026-05-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/005-core-platform-shell/spec.md`

---

## Summary

Build the NexoraXS core platform frontend shell inside `apps/core-platform`.
5 pages across 3 route groups: standalone auth pages (`/login`, `/register`),
a standalone workspace selector (`/workspaces`), and a shared-layout dashboard
(`/dashboard`, `/dashboard/apps`). All data is hardcoded mock data. No packages
installed. 20 files total: 3 updated, 17 created.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.2.6, React 19, TailwindCSS 4 — no changes
**Storage**: N/A — mock data only
**Testing**: Not in scope
**Target Platform**: Web browser — desktop (≥ 768px) + mobile (≥ 375px)
**Project Type**: Frontend UI shell — App Router pages + components
**Performance Goals**: Build passes with zero errors
**Constraints**: No new packages; `app/` router (not `src/app/`); all in `apps/core-platform`
**Scale/Scope**: 5 routes, 7 components, 4 mock data files

---

## Constitution Check

| Principle | Check | Status |
|-----------|-------|--------|
| I. Modular Monolith | All work in `apps/core-platform`; no cross-app imports | ✅ PASS |
| II. Multi-Tenant Isolation | No DB — mock data only; workspace_id concept present in mock Workspace entity | ✅ PASS |
| III. App Boundary Enforcement | No imports from other apps; shared packages not needed for UI shell | ✅ PASS |
| IV. Type Safety | TypeScript strict, all props typed, no `any`, interfaces for all mock data | ✅ PASS |
| V. SDK-First API Access | N/A — no API calls | ✅ PASS |
| VI. Spec-Driven Development | Spec written, checklist passed | ✅ PASS |

---

## Project Structure

### Documentation

```text
specs/005-core-platform-shell/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/component-interfaces.md
└── tasks.md
```

### Source Code

```text
apps/core-platform/
├── app/
│   ├── globals.css              UPDATE — dark-only, #0a0a0f
│   ├── layout.tsx               UPDATE — metadata title
│   ├── page.tsx                 REPLACE — redirect("/login")
│   ├── login/page.tsx           CREATE
│   ├── register/page.tsx        CREATE
│   ├── workspaces/page.tsx      CREATE
│   └── dashboard/
│       ├── layout.tsx           CREATE — shared layout + Sidebar
│       ├── page.tsx             CREATE — metric cards overview
│       └── apps/page.tsx        CREATE — app launcher
├── components/
│   ├── ui/
│   │   ├── Button.tsx           CREATE
│   │   ├── Input.tsx            CREATE
│   │   └── Icon.tsx             CREATE
│   └── dashboard/
│       ├── Sidebar.tsx          CREATE — "use client"
│       ├── MetricCard.tsx       CREATE
│       ├── AppCard.tsx          CREATE
│       └── WorkspaceCard.tsx    CREATE — "use client"
└── lib/
    └── mock-data/
        ├── nav-items.ts         CREATE
        ├── workspaces.ts        CREATE
        ├── metrics.ts           CREATE
        └── apps.ts              CREATE
```

**Structure Decision**: The `app/` directory uses Next.js App Router. The
dashboard subtree (`app/dashboard/`) shares `layout.tsx`. Standalone pages
(`/login`, `/register`, `/workspaces`) sit at the `app/` root without a
shared layout — they inherit only `app/layout.tsx` (root).

---

## Implementation Order

### Phase A — Foundation (blocks everything)

1. `app/globals.css` — dark-only background, remove media query
2. `app/layout.tsx` — update metadata title
3. `app/page.tsx` — redirect to `/login`

### Phase B — Mock Data + UI Primitives (parallel, block nothing else)

All 7 files are independent:

4. `lib/mock-data/nav-items.ts`
5. `lib/mock-data/workspaces.ts`
6. `lib/mock-data/metrics.ts`
7. `lib/mock-data/apps.ts`
8. `components/ui/Button.tsx`
9. `components/ui/Input.tsx`
10. `components/ui/Icon.tsx`

### Phase C — Dashboard Components (depend on Phase B)

11. `components/dashboard/Sidebar.tsx` — depends on `nav-items.ts` + `Icon.tsx`
12. `components/dashboard/MetricCard.tsx` — no dependencies
13. `components/dashboard/AppCard.tsx` — no dependencies
14. `components/dashboard/WorkspaceCard.tsx` — depends on `workspaces.ts`

### Phase D — Dashboard Layout + Pages (depend on Phase C)

15. `app/dashboard/layout.tsx` — depends on `Sidebar.tsx`
16. `app/dashboard/page.tsx` — depends on `MetricCard.tsx` + `metrics.ts`
17. `app/dashboard/apps/page.tsx` — depends on `AppCard.tsx` + `apps.ts`

### Phase E — Standalone Pages (depend on Phase B)

18. `app/login/page.tsx` — depends on `Button.tsx` + `Input.tsx`
19. `app/register/page.tsx` — depends on `Button.tsx` + `Input.tsx`
20. `app/workspaces/page.tsx` — depends on `WorkspaceCard.tsx`

---

## Design Reference

### Auth Page Layout
```
Full-screen dark bg (#0a0a0f)
Centred card: max-w-md, bg-white/5, border-white/10, rounded-2xl, p-8
Brand heading: "NexoraXS" text-2xl font-bold + subtitle text-white/60
Form fields: Input components stacked with gap-4
Button: full-width primary (Get Started / Sign In)
Footer link: text-white/50 + anchor text-blue-400
```

### Dashboard Layout
```
Full-height flex row
Sidebar: w-64, fixed left, bg-[#0d0d14], border-r border-white/10
  → Mobile: fixed overlay, z-50, opened by hamburger
Main: flex-1, ml-64 on desktop, overflow-y-auto, p-6 md:p-8
  → Mobile: ml-0 (sidebar overlays)
```

### Metric Card
```
bg-white/5, border border-white/10, rounded-2xl, p-6
Accent dot or label in accent color
Large value: text-3xl font-bold text-white
Trend: text-sm text-white/50
```

### App Card
```
bg-white/5, border border-white/10, rounded-2xl, p-6
App name: text-lg font-semibold
Description: text-sm text-white/60
Available: "Open" button (blue-600)
Unavailable: "Coming Soon" badge (white/20, text-white/40), disabled button
```

### Workspace Card
```
bg-white/5 hover:bg-white/8, border border-white/10, rounded-2xl, p-5
Initials avatar: 48×48, bg-blue-600/20, text-blue-400, rounded-xl
Name: text-base font-semibold
Type: text-sm text-white/50
Chevron: right-aligned, text-white/30
Cursor: pointer, full card is clickable
```

---

## Complexity Tracking

No constitution violations. No complexity justification required.
