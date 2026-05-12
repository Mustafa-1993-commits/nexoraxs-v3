# Research: Landing Page Mobile Polish

**Branch**: `002-mobile-polish` | **Date**: 2026-05-12
**Phase**: 0 — Code audit, no unknowns to resolve

---

## Code Audit: Section-by-Section Findings

### Navbar (`src/sections/navbar/navbar.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Logo width fixed at 160px | `width={160}` — 43% of a 375px viewport | Add `className="h-8 w-auto md:h-11"` to constrain responsively |
| Mobile menu link touch targets | `text-sm` with no vertical padding → ~20px tall | Add `py-3` to each mobile nav link |
| "Get Started" button not full-width | `inline-block` via `<a>` | Add `block w-full text-center` |
| Hamburger button tiny touch target | 24×24px visible area, no padding | Add `p-2` to the `<button>` |

### Hero (`src/sections/hero/hero.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Headline too large on mobile | `text-5xl` (48px) — spec requires `text-4xl` | Change to `text-4xl md:text-5xl lg:text-6xl` |
| CTA buttons may not stack | `flex flex-wrap gap-4` — may sit side by side at 375px | Change to `flex flex-col gap-3 sm:flex-row sm:gap-4` |
| CoreIllustration renders full-size on mobile | `aspect-square` with `max-w-lg` at full column width → ~375px tall on mobile | Hide on mobile: add `hidden md:flex` to its wrapper |
| Flat padding | `px-6 py-20` everywhere | `px-4 md:px-6 py-16 md:py-20 lg:py-28` |

### Features (`src/sections/features/features.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Heading too large on mobile | `text-4xl` | Change to `text-3xl md:text-4xl` |
| Flat horizontal padding | `px-6` | `px-4 md:px-6` |
| Flat vertical padding | `py-20 md:py-28` | `py-16 md:py-20 lg:py-28` |

### Apps (`src/sections/apps/apps.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Heading too large on mobile | `text-4xl` | Change to `text-3xl md:text-4xl` |
| Badge may overlap heading on narrow screens | `absolute right-4 top-4`, heading has no right padding | Add `pr-24` to `<h3>` (only when badge exists) or use `pr-20` always |
| Flat horizontal padding | `px-6` | `px-4 md:px-6` |
| Flat vertical padding | `py-20 md:py-28` | `py-16 md:py-20 lg:py-28` |

### Pricing (`src/sections/pricing/pricing.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Card padding too dense on mobile | `p-10` (40px) on a narrow card | Change to `p-6 md:p-10` |
| CTA button not full-width | `inline-block px-6` | Change to `block w-full` |
| Heading too large on mobile | `text-4xl` | Change to `text-3xl md:text-4xl` |
| Flat horizontal padding | `px-6` | `px-4 md:px-6` |

### FAQ (`src/sections/faq/faq.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Summary touch target below 44px | `py-4` on `<details>` but the summary itself has no explicit min-height | Add `min-h-[44px]` and `py-3` to the `<summary>` |
| Heading too large on mobile | `text-4xl` | Change to `text-3xl md:text-4xl` |
| Flat horizontal padding | `px-6` | `px-4 md:px-6` |

### Footer (`src/sections/footer/footer.tsx`)

| Issue | Current | Fix |
|-------|---------|-----|
| Link touch targets below 44px | `mb-2 block text-sm` — ~24px tall | Add `py-1.5` to each link for ~36px (acceptable with 8px surrounding space) |
| Flat horizontal padding | `px-6` | `px-4 md:px-6` |

---

## Breakpoint Strategy

| Breakpoint | Tailwind prefix | Width | Notes |
|------------|----------------|-------|-------|
| Mobile | (none) | < 640px | Base styles — single column, px-4, text-3xl headings |
| Tablet | `sm:` | 640px+ | Cards go 2-column |
| Tablet+ | `md:` | 768px+ | Hero 2-column, nav visible, px-6 |
| Desktop | `lg:` | 1024px+ | 3-column cards, larger headings/padding |

---

## No NEEDS CLARIFICATION Items

All decisions are straightforward Tailwind class adjustments. No design
decisions required beyond what the spec states.

---

## Overflow Root Causes

The primary source of horizontal overflow risk is any element with a fixed
pixel width wider than the viewport. Identified risks:

1. `Next/Image` with `width={160}` — rendered at exactly 160px regardless
   of viewport. Fix: CSS height constraint with `w-auto`.
2. `CoreIllustration` with `aspect-square w-full max-w-lg` — at full column
   width on mobile, this creates a 375px-tall illustration below the text.
   Fix: hide on mobile (`hidden md:flex`).
3. No other fixed-width elements found that would exceed 375px.
