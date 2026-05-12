---
description: "Task list for Landing Page Mobile Polish"
---

# Tasks: Landing Page Mobile Polish

**Input**: Design documents from `specs/002-mobile-polish/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ quickstart.md ✅
**Tests**: Not in scope — visual verification via DevTools at 375px.
**Organization**: Tasks grouped by user story. All 7 section files are
independent — tasks within the same phase run in parallel.

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Runs in parallel (different files, no blocking dependencies)
- **[Story]**: Maps to user story from spec.md (US1–US4)
- All changes are Tailwind class adjustments only

---

## Phase 1: Setup

**Purpose**: Confirm environment and baseline before any edits.

- [x] T001 Verify `pnpm --filter landing dev` starts without errors and page loads at http://localhost:3000; open DevTools at 375px width and confirm current state (note any visible overflow as baseline)

**Checkpoint**: Dev server running, baseline captured — proceed.

---

## Phase 2: User Story 1 — Navbar and Hero (Priority: P1) 🎯 MVP

**Goal**: Navigation works correctly on mobile; hero is single-column with readable headline.
**Independent Test**: At 375px — hamburger opens/closes menu, all links have 44px tap targets, "Get Started" is full-width, hero is single-column with `text-4xl` headline, CoreIllustration is hidden, no horizontal overflow.

- [x] T002 [P] [US1] Update `apps/landing/src/sections/navbar/navbar.tsx`:
  1. Add `className="h-8 w-auto md:h-11"` to the `<Image>` component to constrain logo height responsively
  2. Add `p-2` to the hamburger `<button>` className (enlarges touch target to ~40px)
  3. Add `py-3` to each mobile nav link `<a>` className inside the mobile menu (ensures 44px touch target)
  4. Change the mobile "Get Started" `<a>`: replace `py-2` with `py-3` and add `block w-full` to make it full-width

- [x] T003 [P] [US1] Update `apps/landing/src/sections/hero/hero.tsx`:
  1. Change `<section>` className: replace `px-6 py-20 md:grid-cols-2 md:py-28` with `px-4 py-16 md:grid-cols-2 md:px-6 md:py-20 lg:py-28`
  2. Change `<h1>` className: replace `text-5xl font-bold leading-tight md:text-6xl` with `text-4xl font-bold leading-tight md:text-5xl lg:text-6xl`
  3. Change CTA wrapper `<div>` className: replace `mt-8 flex flex-wrap gap-4` with `mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4`
  4. Change the CoreIllustration `<motion.div>` wrapper className: replace `flex justify-center lg:justify-end` with `hidden md:flex md:justify-center lg:justify-end`

**Checkpoint**: Navbar and hero independently pass mobile verification — US1 complete.

---

## Phase 3: User Story 2 — Features and Apps Cards (Priority: P2)

**Goal**: Feature and app cards stack to single column on mobile with readable headings and no overflow.
**Independent Test**: At 375px — Features shows 1 card per row with `text-3xl` section heading; Apps shows 1 card per row with badge not overlapping card heading; no horizontal overflow in either section.

- [x] T004 [P] [US2] Update `apps/landing/src/sections/features/features.tsx`:
  1. Change `<section>` className: replace `px-6 py-20 md:py-28` with `px-4 py-16 md:px-6 md:py-20 lg:py-28`
  2. Change `<h2>` className: replace `text-4xl font-bold` with `text-3xl font-bold md:text-4xl`

- [x] T005 [P] [US2] Update `apps/landing/src/sections/apps/apps.tsx`:
  1. Change `<section>` className: replace `px-6 py-20 md:py-28` with `px-4 py-16 md:px-6 md:py-20 lg:py-28`
  2. Change `<h2>` className: replace `text-4xl font-bold` with `text-3xl font-bold md:text-4xl`
  3. Add `pr-20` to the card `<h3>` className (`pr-20 text-xl font-semibold`) to prevent the absolute-positioned "Coming Soon" badge from overlapping the heading text on narrow screens

**Checkpoint**: Feature and app cards independently pass mobile verification — US2 complete.

---

## Phase 4: User Story 3 — Pricing, FAQ, and Footer (Priority: P3)

**Goal**: Pricing card fits mobile, FAQ items are fully tappable, footer links stack and are readable.
**Independent Test**: At 375px — Pricing card has comfortable padding and full-width CTA; FAQ each question is min 44px tall and expands correctly; Footer links are tappable; no section has horizontal overflow.

- [x] T006 [P] [US3] Update `apps/landing/src/sections/pricing/pricing.tsx`:
  1. Change `<section>` className: replace `px-6 py-20 md:py-28` with `px-4 py-16 md:px-6 md:py-20 lg:py-28`
  2. Change `<h2>` className: replace `text-4xl font-bold` with `text-3xl font-bold md:text-4xl`
  3. Change card `<div>` className: replace `p-10` with `p-6 md:p-10`
  4. Change CTA `<a>` className: replace `inline-block` with `block w-full` (keep all other classes as-is)

- [x] T007 [P] [US3] Update `apps/landing/src/sections/faq/faq.tsx`:
  1. Change `<section>` className: replace `px-6 py-20 md:py-28` with `px-4 py-16 md:px-6 md:py-20 lg:py-28`
  2. Change `<h2>` className: replace `text-4xl font-bold` with `text-3xl font-bold md:text-4xl`
  3. Add `min-h-[44px]` to the `<summary>` className to ensure the touch target meets the 44px minimum

- [x] T008 [P] [US4] Update `apps/landing/src/sections/footer/footer.tsx`:
  1. Change inner `<div>` className: replace `px-6 py-12 md:py-16` with `px-4 py-10 md:px-6 md:py-16`
  2. Change each link `<a>` className: replace `mb-2 block text-sm` with `block py-1.5 text-sm` (removes margin-based spacing in favour of padding, improves touch targets)

**Checkpoint**: Pricing, FAQ, and footer independently pass mobile verification — US3 & US4 complete.

---

## Phase 5: Polish & Verification

**Purpose**: Confirm the full page passes all success criteria at multiple viewports.

- [x] T009 Open DevTools at **375px** and scroll through every section — verify: no horizontal scrollbar, navbar menu opens/closes, hero is single-column, cards stack, Pricing CTA is full-width, FAQ items expand, footer links readable
- [x] T010 Resize to **320px** — verify all content remains readable with no horizontal overflow
- [x] T011 Resize to **768px** (tablet) — verify hero shows 2-column layout, cards go to 2 columns, desktop nav is visible
- [x] T012 Resize to **1280px** (desktop) — verify no regression in desktop layout (CoreIllustration visible, 3-column cards, full nav)
- [x] T013 [P] Run `pnpm --filter landing build` — confirm zero TypeScript errors and zero ESLint errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — confirm environment first
- **US1 (Phase 2)**: Depends on Setup — Navbar + Hero (P1)
- **US2 (Phase 3)**: Depends on Setup — Features + Apps (independent of US1)
- **US3/US4 (Phase 4)**: Depends on Setup — Pricing + FAQ + Footer (independent of US1, US2)
- **Polish (Phase 5)**: Depends on ALL phases completing

### Parallel Opportunities

```bash
# Phase 2 — run together:
T002: Update navbar.tsx
T003: Update hero.tsx

# Phase 3 — run together:
T004: Update features.tsx
T005: Update apps.tsx

# Phase 4 — run together:
T006: Update pricing.tsx
T007: Update faq.tsx
T008: Update footer.tsx
```

---

## Notes

- All changes are Tailwind className string edits only — no logic changes
- Desktop layout (≥ 1024px) MUST NOT change — verify with T012
- No new packages introduced
- `[P]` tasks in the same phase affect different files and have no dependencies on each other
