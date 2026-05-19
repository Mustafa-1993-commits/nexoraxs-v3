# Implementation Plan: Framer Motion — Add to Approved Stack

**Branch**: `033-framer-motion-animation` | **Date**: 2026-05-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/033-framer-motion-animation/spec.md`

---

## Summary

Formally approve Framer Motion in the NexoraXS Constitution (version bump 1.0.0 → 1.1.0, new table row), then create a shared animation utility file at `apps/landing/src/lib/animations.ts` with 5 typed presets. Framer Motion is already installed (`^12.38.0`) and used in two landing files — this makes the usage official and consistent.

---

## Technical Context

**Language/Version**: TypeScript 5.x, strict mode
**Framework**: Next.js 16.x App Router (landing app only)
**Library**: Framer Motion 12.x (already installed at `^12.38.0`)
**Storage**: N/A
**Testing**: `pnpm --filter landing build` + TypeScript compilation
**Target Platform**: Web — `apps/landing` only (primary); other apps by future amendment
**Performance Goals**: N/A — animation utilities are static typed objects, zero runtime overhead beyond framer-motion itself
**Constraints**: TypeScript strict; no `any`; framer-motion not yet approved for core-platform or shops-app
**Scale/Scope**: 1 file created, 1 file amended (constitution), 1 file amended (AGENTS.md), 1 package.json verified

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ PASS | Changes confined to `apps/landing` and governance files. No new app or package. |
| II — Multi-Tenant Isolation | ✅ N/A | Animation utilities have no database or data logic. |
| III — App Boundary Enforcement | ✅ PASS | `animations.ts` lives inside `apps/landing/src/lib/` — not in a shared package. Deliberate: animation presets are landing-specific for now. |
| IV — Type Safety | ✅ PASS | All animation variant objects will be typed using Framer Motion's `Variants` type. Zero `any`. |
| V — SDK-First API Access | ✅ N/A | No API calls. |
| VI — Spec-Driven Development | ✅ PASS | Spec and plan written before implementation. |

**Amendment justification**: This is a MINOR amendment (1.0.0 → 1.1.0): a new technology row is added to the Approved Stack table; no existing principles are removed or redefined. Per Constitution §Amendment Procedure, this requires a PR with a Sync Impact Report.

**Gate result**: PASS — no violations. Framer Motion was already in use without approval; this plan retroactively formalizes it.

---

## Project Structure

### Documentation (this feature)

```text
specs/033-framer-motion-animation/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Files Changed

```text
.specify/memory/constitution.md          ← AMEND: add Framer Motion row, bump to 1.1.0, add Sync Impact Report comment
AGENTS.md                                ← AMEND: add Framer Motion to approved packages section
apps/landing/src/lib/animations.ts       ← NEW: typed animation variant presets
apps/landing/package.json                ← VERIFY: framer-motion already declared (^12.38.0)
```

**No new packages installed** — framer-motion is already in `apps/landing/package.json`.

---

## Complexity Tracking

No constitution violations — section not applicable.
