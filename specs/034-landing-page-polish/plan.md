# Implementation Plan: Landing Page Full Polish — Animated Premium SaaS

**Branch**: `034-landing-page-polish` | **Date**: 2026-05-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/034-landing-page-polish/spec.md`

---

## Summary

Polish every section of `apps/landing` to premium quality: animated gradient hero background, Framer Motion scroll animations, glassmorphism navbar with scroll detection, animated mobile menu, FAQ with proper height animation, and premium hover effects throughout. The page structure already exists — this is a full animation and visual quality pass on all 9 sections (Navbar, Hero, Features, Platform, Apps, Pricing, FAQ, CTA, Footer).

---

## Technical Context

**Language/Version**: TypeScript 5.x, strict mode
**Framework**: Next.js 16.x App Router
**Styling**: TailwindCSS 4.x + inline CSS (for keyframe animations)
**Animation**: Framer Motion 12.x (`^12.38.0`, already installed)
**Shared UI**: `@nexoraxs/ui` (available via `workspace:*`)
**Shared Presets**: `apps/landing/src/lib/animations.ts` (fadeInUp, fadeIn, staggerContainer, slideInLeft, slideInRight)
**Assets**: `public/branding/logo-top.png`, `public/branding/Splash.png` (existing)
**Storage**: N/A — static page
**Testing**: TypeScript compilation + `pnpm --filter landing build`
**Target**: Web — desktop + mobile responsive
**Performance Goals**: Hero visible in <3s; no CLS; animations at 60fps
**Constraints**: No new packages; framer-motion only; TypeScript strict; no `any`
**Scale/Scope**: 9 section files modified; 1 CSS file updated; ~800–1200 lines total

---

## Current State Analysis (Critical for Scoping)

| Section | Current State | Changes Needed |
|---------|--------------|----------------|
| `navbar.tsx` | Always-glassmorphism (no scroll detection), CSS mobile toggle | Scroll-aware transparency, AnimatePresence mobile menu, hover underline, CTA glow |
| `hero.tsx` | Static glow-blobs, Framer Motion tied to splash state, no word animation | Animated CSS keyframe orbs, word-by-word headline, stagger CTA/badges |
| `features.tsx` | Static cards, `glass-card-hover` CSS | Add `"use client"`, `useInView`, stagger animation, gradient border on hover |
| `platform.tsx` | Static | Add `"use client"`, `useInView`, fade-in animations |
| `apps.tsx` | Static cards with glow backgrounds, CSS badge | Add `"use client"`, `useInView`, scale-stagger, enhanced coming-soon overlay |
| `pricing.tsx` | Static, `ring-purple-500/30` on featured, "Beta Early-Bird" label | Add `"use client"`, `useInView`, "Early Access — Free" badge, enhanced glow |
| `faq.tsx` | CSS max-height accordion, no scroll animation | Replace with Framer Motion height animation, add `useInView` stagger |
| `cta.tsx` | Static | Add `"use client"`, `useInView` |
| `footer.tsx` | `border-t border-white/10`, `logo-bottom.png` | Gradient divider, logo-top.png, link hover transitions |
| CSS (globals.css) | Has `.glow-blob` + `.gradient-text` | Add CSS keyframes: floating-orb, float-y |

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ PASS | Changes confined to `apps/landing`. No new packages or services. |
| II — Multi-Tenant Isolation | ✅ N/A | Landing page has no database logic. |
| III — App Boundary Enforcement | ✅ PASS | Uses only `@nexoraxs/ui` from packages (approved). No cross-app imports. |
| IV — Type Safety | ✅ PASS | TypeScript strict throughout. All Framer Motion types (Variants, MotionProps) used correctly. |
| V — SDK-First API Access | ✅ N/A | No API calls. |
| VI — Spec-Driven Development | ✅ PASS | Spec + plan before implementation. |
| Animation Approval | ✅ PASS | framer-motion approved for `apps/landing` per Constitution v1.1.0. |

**Gate result**: PASS — no violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/034-landing-page-polish/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Files Changed

```text
apps/landing/src/
├── app/
│   └── globals.css                      ← ADD: CSS keyframes (floating-orb, float-y, reduced-motion)
│
├── sections/
│   ├── navbar/navbar.tsx                ← REWRITE: scroll detection, AnimatePresence mobile menu
│   ├── hero/hero.tsx                    ← ENHANCE: animated orbs, word-by-word headline, stagger
│   ├── features/features.tsx            ← ENHANCE: "use client", useInView, gradient hover border
│   ├── platform/platform.tsx            ← ENHANCE: "use client", useInView, fade-in
│   ├── apps/apps.tsx                    ← ENHANCE: "use client", useInView, enhanced overlay
│   ├── pricing/pricing.tsx              ← ENHANCE: "use client", useInView, badge text
│   ├── faq/faq.tsx                      ← REWRITE: Framer Motion accordion + useInView stagger
│   ├── cta/cta.tsx                      ← ENHANCE: "use client", useInView
│   └── footer/footer.tsx                ← ENHANCE: gradient divider, logo-top.png
```

**Structure Decision**: Modify files in-place. No new files needed except CSS keyframe additions to globals.css. Sections that need `useInView` or `AnimatePresence` gain `"use client"` directive.

---

## Complexity Tracking

No constitution violations — section not applicable.
