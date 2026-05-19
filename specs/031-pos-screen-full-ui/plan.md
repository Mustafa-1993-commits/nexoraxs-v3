# Implementation Plan: POS Screen — Full UI

**Branch**: `031-pos-screen-full-ui` | **Date**: 2026-05-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/031-pos-screen-full-ui/spec.md`

---

## Summary

Build a full-screen, standalone POS (Point of Sale) screen at route `/pos` inside `apps/shops-app`. The screen is split 60/40 into a products panel (search, category tabs, product grid) and a cart panel (items, discounts, payment methods, sale completion). All data is mock-only — no backend calls. A dedicated `(pos)` route group provides the layout isolation (no sidebar, no topbar). Mock product data is extracted into a shared `lib/mock-data/products.ts` file.

---

## Technical Context

**Language/Version**: TypeScript 5.x, strict mode (`"strict": true` — confirmed in `apps/shops-app/tsconfig.json`)
**Framework**: Next.js App Router (Next.js 16.x, React 19.x)
**UI Library**: TailwindCSS 4.x — no external component library beyond what already exists in the project
**State**: React `useState` (all POS state is ephemeral, local to the page)
**Storage**: None — mock-only, no persistence
**Testing**: TypeScript compilation + visual verification (no test framework in shops-app currently)
**Target Platform**: Web (desktop primary, mobile responsive)
**Project Type**: Web application — Next.js App Router page inside `apps/shops-app`
**Performance Goals**: Search filter response < 100ms (local array filter on ~20 mock products — trivially fast)
**Constraints**: No backend calls, no cross-app imports, TypeScript strict, no `any`
**Scale/Scope**: Single screen, ~8 components, 1 shared mock-data file, 1 new route group

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ PASS | All changes confined to `apps/shops-app`. No new packages or apps introduced. |
| II — Multi-Tenant Isolation | ✅ N/A | Mock-only feature; no database tables introduced. |
| III — App Boundary Enforcement | ✅ PASS | All imports stay within `apps/shops-app`. Mock data extracted to `apps/shops-app/lib/mock-data/products.ts` — no cross-app sharing. |
| IV — Type Safety & Component Discipline | ✅ PASS | TypeScript strict already enabled. `"use client"` required for POS page (interactive state). All types will be explicitly defined — zero `any`. |
| V — SDK-First API Access | ✅ N/A | No API calls in this feature — mock-only. |
| VI — Spec-Driven Development | ✅ PASS | Spec written before implementation. |

**Gate result**: PASS — no violations. Proceed to Phase 0.

---

## Project Structure

### Documentation (this feature)

```text
specs/031-pos-screen-full-ui/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
│   └── ui-contracts.md
└── tasks.md             ← Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
apps/shops-app/
├── app/
│   ├── (app)/                         ← existing — Sidebar + Topbar layout
│   │   ├── dashboard/
│   │   ├── products/
│   │   └── layout.tsx
│   ├── (pos)/                         ← NEW route group — standalone POS layout
│   │   ├── layout.tsx                 ← NEW — POS header bar, no sidebar/topbar
│   │   └── pos/
│   │       └── page.tsx               ← NEW — /pos route, full POS screen
│   └── layout.tsx                     ← existing root layout (untouched)
│
├── components/
│   ├── dashboard/                     ← existing
│   ├── pos/                           ← NEW — all POS-specific components
│   │   ├── POSHeader.tsx
│   │   ├── ProductsPanel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── CartPanel.tsx
│   │   ├── CartItem.tsx
│   │   ├── PaymentSection.tsx
│   │   └── SaleSuccessModal.tsx
│   └── ui/                            ← existing
│
└── lib/
    ├── mode.ts                        ← existing (unchanged)
    └── mock-data/
        └── products.ts                ← NEW — extracted from dashboard/page.tsx + products/page.tsx
```

**Structure Decision**: Single-app, Next.js route group `(pos)` isolates the POS layout from the `(app)` layout that has sidebar/topbar. All POS components live in `components/pos/`. Shared mock data lives in `lib/mock-data/products.ts`.

---

## Complexity Tracking

No constitution violations — section not applicable.
