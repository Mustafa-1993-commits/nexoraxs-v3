# Implementation Plan: Landing Page Mobile Polish

**Branch**: `002-mobile-polish` | **Date**: 2026-05-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-mobile-polish/spec.md`

---

## Summary

Fix responsiveness issues across all 7 sections of the NexoraXS landing page.
All changes are Tailwind class adjustments only — no new packages, no design
changes, no colour changes. The fixes address: oversized elements on mobile,
touch targets below 44px, flat padding not scaling by breakpoint, and the
CoreIllustration overflowing on small screens.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16, React 19, TailwindCSS 4 — no changes
**Storage**: N/A
**Testing**: Not in scope
**Target Platform**: Web browser — 375px (mobile) through 1280px (desktop)
**Project Type**: CSS/layout polish — Tailwind class changes only
**Performance Goals**: No regression in build output
**Constraints**: No new packages; no desktop layout changes; no colour changes
**Scale/Scope**: 7 section files

---

## Constitution Check

| Principle | Check | Status |
|-----------|-------|--------|
| I. Modular Monolith | All changes inside `apps/landing` | ✅ PASS |
| II. Multi-Tenant Isolation | N/A — no database | ✅ PASS |
| III. App Boundary Enforcement | No cross-app imports | ✅ PASS |
| IV. Type Safety | No type changes — CSS only | ✅ PASS |
| V. SDK-First API Access | N/A — no API calls | ✅ PASS |
| VI. Spec-Driven Development | Spec written and validated | ✅ PASS |

---

## Project Structure

### Documentation

```text
specs/002-mobile-polish/
├── plan.md           # This file
├── research.md       # Audit findings per section
├── quickstart.md     # Mobile verification checklist
└── tasks.md          # /speckit.tasks output
```

### Source Files (all inside `apps/landing/src/sections/`)

```text
navbar/navbar.tsx     UPDATE — logo sizing, touch targets, full-width CTA
hero/hero.tsx         UPDATE — headline scale, CTA stacking, hide illustration
features/features.tsx UPDATE — heading scale, responsive padding
apps/apps.tsx         UPDATE — heading scale, responsive padding, badge gap
pricing/pricing.tsx   UPDATE — card padding, full-width CTA button
faq/faq.tsx           UPDATE — summary touch target, heading scale, padding
footer/footer.tsx     UPDATE — link touch targets, responsive padding
```

---

## Fix Specifications (exact class changes per file)

### Navbar

| Element | Current | Fixed |
|---------|---------|-------|
| Logo `<Image>` | no className | add `className="h-8 w-auto md:h-11"` |
| Hamburger `<button>` | no padding | add `p-2` |
| Mobile nav links `<a>` | no vertical padding | add `py-3` |
| Mobile CTA `<a>` | `mt-2 ... py-2` | `mt-2 block w-full ... py-3` |

### Hero

| Element | Current | Fixed |
|---------|---------|-------|
| `<section>` | `px-6 py-20 md:py-28` | `px-4 py-16 md:grid-cols-2 md:px-6 md:py-20 lg:py-28` |
| `<h1>` | `text-5xl ... md:text-6xl` | `text-4xl ... md:text-5xl lg:text-6xl` |
| CTA wrapper | `flex flex-wrap gap-4` | `flex flex-col gap-3 sm:flex-row sm:gap-4` |
| Illustration wrapper | `flex justify-center lg:justify-end` | `hidden md:flex md:justify-center lg:justify-end` |

### Features

| Element | Current | Fixed |
|---------|---------|-------|
| `<section>` | `px-6 py-20 md:py-28` | `px-4 py-16 md:px-6 md:py-20 lg:py-28` |
| `<h2>` | `text-4xl` | `text-3xl md:text-4xl` |

### Apps

| Element | Current | Fixed |
|---------|---------|-------|
| `<section>` | `px-6 py-20 md:py-28` | `px-4 py-16 md:px-6 md:py-20 lg:py-28` |
| `<h2>` | `text-4xl` | `text-3xl md:text-4xl` |
| Card `<h3>` | `text-xl font-semibold` | `pr-20 text-xl font-semibold` (prevents badge overlap) |

### Pricing

| Element | Current | Fixed |
|---------|---------|-------|
| `<section>` | `px-6 py-20 md:py-28` | `px-4 py-16 md:px-6 md:py-20 lg:py-28` |
| `<h2>` | `text-4xl` | `text-3xl md:text-4xl` |
| Card `<div>` | `p-10` | `p-6 md:p-10` |
| CTA `<a>` | `inline-block ... px-6 py-3` | `block w-full ... py-3` |

### FAQ

| Element | Current | Fixed |
|---------|---------|-------|
| `<section>` | `px-6 py-20 md:py-28` | `px-4 py-16 md:px-6 md:py-20 lg:py-28` |
| `<h2>` | `text-4xl` | `text-3xl md:text-4xl` |
| `<summary>` | no min-height | add `min-h-[44px]` |

### Footer

| Element | Current | Fixed |
|---------|---------|-------|
| Inner `<div>` | `px-6 py-12 md:py-16` | `px-4 py-10 md:px-6 md:py-16` |
| Each link `<a>` | `mb-2 block text-sm ...` | `block py-1.5 text-sm ...` |

---

## Implementation Order

All 7 files are fully independent. Suggested order for incremental manual
testing, but all can be implemented in parallel:

1. Navbar + Hero (P1 user stories — most visible)
2. Features + Apps (P2 — parallel)
3. Pricing + FAQ + Footer (P3 — parallel)

---

## Complexity Tracking

No constitution violations. No complexity justification required.
