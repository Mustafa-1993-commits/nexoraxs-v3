# Implementation Plan: NexoraXS Landing Website

**Branch**: `001-landing-website` | **Date**: 2026-05-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-landing-website/spec.md`

---

## Summary

Build a complete, professional dark-theme SaaS landing page for NexoraXS
inside `apps/landing`. The page composes seven sections (Navbar, Hero,
Features, Apps, Pricing, FAQ, Footer). Four sections exist and need updating;
three are new. No new packages are installed — the full implementation uses
Next.js 16, React 19, TypeScript 5, and TailwindCSS 4 already in the project.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, TailwindCSS 4 — no additions
**Storage**: N/A — static content only
**Testing**: Not in scope for this feature
**Target Platform**: Web browser — desktop (1280px+), tablet (768px+), mobile (375px+)
**Project Type**: Marketing website (single-page, multi-section)
**Performance Goals**: Page loads within 3 seconds; build completes with zero errors
**Constraints**: No new npm packages; work confined to `apps/landing`; TypeScript strict
**Scale/Scope**: 1 page, 7 sections, ~500 lines of TSX total

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Modular Monolith | All work in `apps/landing`; no cross-app dependencies introduced | ✅ PASS |
| II. Multi-Tenant Isolation | No database or business data — N/A | ✅ PASS |
| III. App Boundary Enforcement | No imports from other apps; shared packages not used (not needed) | ✅ PASS |
| IV. Type Safety | TypeScript strict mode maintained; all components typed; no `any` | ✅ PASS |
| V. SDK-First API Access | No API calls — static content only | ✅ PASS |
| VI. Spec-Driven Development | Spec written and validated before this plan | ✅ PASS |

**All gates pass. No violations to justify.**

---

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-website/
├── plan.md                          # This file
├── research.md                      # Phase 0: stack decisions
├── data-model.md                    # Phase 1: content types
├── quickstart.md                    # Phase 1: dev verification steps
├── contracts/
│   └── component-interfaces.md     # Phase 1: component prop contracts
└── tasks.md                         # Phase 2: /speckit.tasks output
```

### Source Code

```text
apps/landing/
├── src/
│   ├── app/
│   │   ├── globals.css              UPDATE — dark bg + scroll-smooth
│   │   ├── layout.tsx               UPDATE — metadata title/description
│   │   └── page.tsx                 UPDATE — compose all 7 sections
│   └── sections/
│       ├── navbar/
│       │   └── navbar.tsx           UPDATE — mobile menu + anchor links
│       ├── hero/
│       │   └── hero.tsx             UPDATE — polish + correct CTA label
│       ├── features/
│       │   └── features.tsx         REBUILD — icons + real descriptions
│       ├── apps/                    NEW
│       │   └── apps.tsx
│       ├── pricing/                 NEW
│       │   └── pricing.tsx
│       ├── faq/                     NEW
│       │   └── faq.tsx
│       └── footer/
│           └── footer.tsx           UPDATE — logo + grouped links
└── public/branding/                 READ-ONLY — existing assets
    ├── logo-top.png
    ├── logo-bottom.png
    └── Splash.png
```

**Structure Decision**: Single Next.js app with a flat `sections/` directory.
Each section is a standalone `.tsx` file; `page.tsx` imports and composes them
in order. The `"use client"` directive appears only in `navbar.tsx` (mobile
menu) and nowhere else — all other sections are Server Components.

---

## Implementation Order

### Phase A — Foundation (blocks all sections)

Update `globals.css` and `layout.tsx` first so the design baseline (dark
background, scroll behaviour, metadata) is in place before any section is
built. Update `page.tsx` last, once all section files exist.

### Phase B — Update Existing Sections

Each existing section is independently updatable once Phase A is done:

1. **Navbar** — add `"use client"`, mobile menu state, anchor hrefs for all
   4 nav links, keep existing logo and CTA button
2. **Hero** — update CTA button label from "Start Free" to "Get Started";
   add `id="hero"`; minor spacing polish
3. **Features** — replace string array with typed `FeatureCard[]` array
   including icon SVG paths and real one-sentence descriptions; add `id`
4. **Footer** — add `logo-bottom.png` image; expand links into 3 grouped
   columns; update copyright year to 2026; add `id`

### Phase C — New Sections

Each new section is independent:

1. **Apps** — `AppCard[]` array with 5 apps; responsive grid; "Coming Soon"
   badge pill on 4 of 5 cards; accent gradient border on each card
2. **Pricing** — "Coming Soon" centred placeholder with a glowing border card;
   placeholder text explaining pricing is being finalised
3. **FAQ** — native `<details>`/`<summary>` elements; 6 Q&A items; custom
   Tailwind styling for open/closed indicator (rotate chevron via CSS)

### Phase D — Page Assembly

Update `page.tsx` to import and compose all 7 sections in order.

---

## Design System Reference

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | `page.tsx` `<main>` + `globals.css` body |
| Blue accent | `blue-500` / `blue-600` | CTAs, headings highlight, cards |
| Purple accent | `purple-500` / `purple-600` | App cards, gradient text |
| Cyan accent | `cyan-400` / `cyan-500` | Feature icons, badges |
| Surface | `white/5` | Card backgrounds |
| Border | `white/10` | Card and section borders |
| Body text | `white/70` | Subheadings and paragraphs |
| Muted text | `white/50` | Footer links, captions |

**Gradient text pattern** (headlines):
```tsx
<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
  NexoraXS
</span>
```

**Card pattern**:
```tsx
<div className="rounded-2xl border border-white/10 bg-white/5 p-6 ...">
```

**Section wrapper pattern**:
```tsx
<section id="<id>" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
```

---

## Complexity Tracking

No constitution violations. No complexity justification required.
