# Implementation Plan: Landing Page v5.2 Positioning

**Branch**: `040-landing-v5-2-positioning` | **Date**: 2026-06-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/039-landing-page-v5-2-positioning/spec.md`

## Summary

Align the NexoraXS landing page (`apps/landing`) with the v5.2 Business Operating Platform architecture. All changes are UI/content-only: updating hero copy and feature pills, renaming nav/footer links from "Apps" to "Products", updating all `#apps` anchor references to `#products`, replacing old product card names (Shops, Clinics, Restaurants) with correct OS product names (Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS), removing the Restaurants card, and updating the platform model section copy. No backend, no Core Platform, and no Commerce OS app code is touched.

---

## Technical Context

**Language/Version**: TypeScript (Next.js 16.2.6, App Router)
**Primary Dependencies**: Next.js, React, TailwindCSS, Framer Motion 12.38.0, Lucide React 1.14.0
**Storage**: N/A — content-only changes; no data persistence
**Testing**: Manual visual verification; no new automated tests required
**Target Platform**: Web browser — marketing site at nexoraxs.com (`apps/landing`)
**Project Type**: Marketing web application
**Performance Goals**: No regression — existing animation, layout, and responsive behaviour preserved
**Constraints**: UI/content changes only; no backend; no core-platform or shops-app changes; glass-card design and Framer Motion animations untouched
**Scale/Scope**: 7 section/component files within `apps/landing/src/`

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Belongs to correct app/OS boundary | ✅ Pass | Changes are inside `apps/landing` (marketing site), not Core Platform or any OS |
| No Core Platform business logic added | ✅ Pass | No auth, billing, or workspace logic touched |
| No Commerce OS boundary violation | ✅ Pass | Commerce OS code (`apps/shops-app`) is not modified |
| No cross-OS dependency created | ✅ Pass | Landing page is a standalone marketing app |
| Localization compliance | ✅ Pass | English copy only; i18n wiring is in spec 038; this spec does not add hardcoded new strings beyond updated marketing copy |
| MVP scope | ✅ Pass | Landing page positioning is explicitly in scope per v5.2 architecture alignment |
| No premature backend work | ✅ Pass | No backend changes |
| Multi-tenant isolation | ✅ N/A | Marketing site has no tenant data |

**Post-design re-check**: See Phase 1 section below — all gates remain passing.

---

## Project Structure

### Documentation (this feature)

```text
specs/039-landing-page-v5-2-positioning/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── os-item.md       ← Phase 1 output
└── tasks.md             ← Phase 2 output (created by /speckit.tasks)
```

### Source Code (files modified by this feature)

```text
apps/landing/src/
├── sections/
│   ├── hero/
│   │   └── hero.tsx              # headline, description, feature pills
│   ├── navbar/
│   │   └── navbar.tsx            # navLinks: "Apps"→"Products", href "#apps"→"#products"
│   ├── apps/
│   │   └── apps.tsx              # section id, chip, heading, product cards array
│   ├── platform/
│   │   └── platform.tsx          # heading, description, labels, appTiles list
│   ├── features/
│   │   └── features.tsx          # description copy: "business apps" → "Operating Systems"
│   ├── cta/
│   │   └── cta.tsx               # href "#apps"→"#products", label, description
│   └── footer/
│       └── footer.tsx            # link label "Apps"→"Products", href→"#products"
```

**Structure Decision**: Single-app content update. All 7 files are within `apps/landing/src/sections/`. No new files, no new components, no new packages.

---

## Complexity Tracking

> No constitution violations — this section is N/A.
