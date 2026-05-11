---
description: "Task list for NexoraXS Landing Website"
---

# Tasks: NexoraXS Landing Website

**Input**: Design documents from `specs/001-landing-website/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅
**Tests**: Not in scope — no test tasks generated.
**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Runs in parallel (different files, no blocking dependencies)
- **[Story]**: Maps to user story from spec.md (US1–US4)
- All tasks reference exact file paths inside `apps/landing/`

---

## Phase 1: Setup

**Purpose**: Confirm environment is ready before any file is touched.

- [ ] T001 Verify `pnpm install` completes without errors from monorepo root, then confirm `pnpm --filter landing dev` starts on port 3000 — read-only check, no files changed

**Checkpoint**: Dev server running at http://localhost:3000 — proceed to Foundation.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Establish the design baseline that every section depends on.

⚠️ **CRITICAL**: All section work depends on this phase completing first.

- [ ] T002 [P] Update `apps/landing/src/app/globals.css` — replace the entire file: set `html { scroll-behavior: smooth; }`, set body background to `#0a0a0f` (remove the `prefers-color-scheme` media query and CSS variable approach; hardcode the dark theme since the site is dark-only), keep the `@import "tailwindcss"` line and font variables
- [ ] T003 [P] Update `apps/landing/src/app/layout.tsx` — change `metadata.title` to `"NexoraXS — Business Operating System"` and `metadata.description` to `"Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps."`, add `className="scroll-smooth"` to the `<html>` element

**Checkpoint**: Foundation ready — section work can begin in parallel.

---

## Phase 3: User Story 1 — Visitor Understands the Product (Priority: P1) 🎯 MVP

**Goal**: Navbar and Hero deliver the above-the-fold experience.
**Independent Test**: Open http://localhost:3000 — without scrolling, a visitor sees the logo, 4 nav links, "Get Started" CTA, headline, subheadline, and Splash.png. Mobile menu opens and closes on tap.

- [ ] T004 [P] [US1] Rewrite `apps/landing/src/sections/navbar/navbar.tsx` — add `"use client"` at top; import `useState` and `Image` from `next/image`; add `const [menuOpen, setMenuOpen] = useState(false)`; render: sticky header with `position: sticky top-0 z-50 backdrop-blur bg-[#0a0a0f]/80 border-b border-white/10`; logo using `<Image src="/branding/logo-top.png" alt="NexoraXS" width={160} height={44} priority />`; desktop nav links (`hidden md:flex gap-8 text-sm text-white/70`) with `href="#features"`, `href="#apps"`, `href="#pricing"`, `href="#faq"` and labels Features, Apps, Pricing, FAQ; "Get Started" button (`bg-blue-600 hover:bg-blue-500 rounded-xl px-4 py-2 text-sm font-medium`); mobile hamburger button (`md:hidden`) toggling `menuOpen`; mobile slide-down menu (`md:hidden` block when `menuOpen` is true) showing the same 4 links stacked vertically plus "Get Started" button
- [ ] T005 [P] [US1] Update `apps/landing/src/sections/hero/hero.tsx` — add `id="hero"` to the `<section>`; keep existing 2-column grid layout and Splash.png; update primary CTA button label from "Start Free" to "Get Started"; keep secondary "Live Demo" button; wrap the headline text "Business Operating" + "System" in a gradient span: `className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"` on the word "System"; no other changes needed

**Checkpoint**: Navbar and hero independently testable — US1 complete.

---

## Phase 4: User Story 2 — Visitor Explores Features and Apps (Priority: P2)

**Goal**: Features and Apps sections prove platform value.
**Independent Test**: Scroll to features — 6 cards each with an icon, title, one-sentence description. Scroll to apps — 5 app cards with names and descriptions; 4 show a "Coming Soon" badge.

- [ ] T006 [P] [US2] Rebuild `apps/landing/src/sections/features/features.tsx` — define a local `FeatureCard` interface `{ icon: string; title: string; description: string }`; replace the string array with a typed `const features: FeatureCard[]` containing exactly these 6 entries (icon can be a simple SVG string or a Unicode symbol placed in a styled `<span>`):
  1. icon `⚡`, title `"Modular Architecture"`, description `"Launch and manage independent business apps under one unified platform."`
  2. icon `🔐`, title `"Shared Authentication"`, description `"One login, every app — your session works seamlessly across all NexoraXS tools."`
  3. icon `🏢`, title `"Workspace Management"`, description `"Organise teams, roles, and permissions in dedicated business workspaces."`
  4. icon `🛡️`, title `"Multi-Tenant Isolation"`, description `"Complete data separation per workspace — your business data is always private."`
  5. icon `☁️`, title `"Cloud-Native Infrastructure"`, description `"Built for scale from day one with Docker, PostgreSQL, and Redis."`
  6. icon `🤖`, title `"AI-Ready Platform"`, description `"Designed to integrate AI-powered workflows as your business grows."`
  
  Add `id="features"` to the `<section>`; render each card as `<div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/40 transition-colors">`; icon in a `<div className="text-3xl mb-4">`; title as `<h3 className="text-lg font-semibold mb-2">`; description as `<p className="text-sm text-white/60 leading-relaxed">`; grid: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`

- [ ] T007 [P] [US2] Create `apps/landing/src/sections/apps/apps.tsx` — define local `AppCard` interface `{ name: string; tagline: string; description: string; badge?: string }`; define `const apps: AppCard[]` with these 5 entries:
  1. `{ name: "Shops", tagline: "Commerce & POS", description: "Manage products, inventory, sales, and customers in one place.", badge: undefined }`
  2. `{ name: "Clinics", tagline: "Healthcare Management", description: "Appointments, patient records, and billing for modern clinics.", badge: "Coming Soon" }`
  3. `{ name: "Maintenance", tagline: "Field Service", description: "Schedule jobs, track assets, and manage technicians on the go.", badge: "Coming Soon" }`
  4. `{ name: "Restaurants", tagline: "Hospitality Operations", description: "Table management, orders, and kitchen flow for restaurants.", badge: "Coming Soon" }`
  5. `{ name: "CRM", tagline: "Customer Relations", description: "Track leads, deals, and customer communication all in one view.", badge: "Coming Soon" }`
  
  Add `id="apps"` to the `<section className="mx-auto max-w-7xl px-6 py-20 md:py-28">`; section heading `"Our Apps"` with a subheading; grid `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`; each card: `<div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-purple-500/40 transition-colors">`; badge (if present) as an absolute-positioned pill `<span className="absolute top-4 right-4 text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full px-2 py-0.5">`; `name` as `<h3 className="text-xl font-semibold">`; `tagline` as `<p className="text-sm text-purple-400 mt-1">`; `description` as `<p className="text-sm text-white/60 mt-3 leading-relaxed">`

**Checkpoint**: Features and apps independently testable — US2 complete.

---

## Phase 5: User Story 3 — Visitor Reviews Pricing and FAQ (Priority: P3)

**Goal**: Pricing placeholder and collapsible FAQ handle final objections.
**Independent Test**: Scroll to pricing — "Coming Soon" message visible. Scroll to FAQ — 6 questions shown; clicking each expands/collapses the answer natively.

- [ ] T008 [P] [US3] Create `apps/landing/src/sections/pricing/pricing.tsx` — section with `id="pricing"` and `className="mx-auto max-w-7xl px-6 py-20 md:py-28"`; centered heading `"Pricing"`; subheading `"Simple, transparent pricing — coming soon."`; a single card `<div className="mx-auto mt-12 max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 text-center">` containing a cyan-tinted clock or sparkle emoji `text-5xl mb-6`, a bold `"Coming Soon"` heading, and a paragraph `"We're finalising our pricing plans. Get started for free while we prepare."` followed by a "Get Started Free" button `<a href="#" className="mt-6 inline-block rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold transition-colors">`

- [ ] T009 [P] [US3] Create `apps/landing/src/sections/faq/faq.tsx` — define local `FAQItem` interface `{ question: string; answer: string }`; define `const faqs: FAQItem[]` with these 6 entries:
  1. Q: `"What is NexoraXS?"` A: `"NexoraXS is a modular Business Operating System — one platform where you can run multiple business apps (Shops, Clinics, Maintenance, and more) under a single login and workspace."`
  2. Q: `"Can I use multiple apps under one account?"` A: `"Yes. Once you create a workspace you can enable any available NexoraXS app for that workspace. All apps share the same authentication and billing."`
  3. Q: `"Is my business data kept separate from other users?"` A: `"Absolutely. NexoraXS uses strict workspace-level data isolation. Your data is never visible to other workspaces or businesses on the platform."`
  4. Q: `"What apps are available right now?"` A: `"The Shops app (commerce & POS) is available in the current release. Clinics, Maintenance, Restaurants, and CRM are coming soon."`
  5. Q: `"How does pricing work?"` A: `"We're finalising pricing plans. You can get started for free during our early access period with no credit card required."`
  6. Q: `"How do I get started?"` A: `"Click any 'Get Started' button on this page to create your free NexoraXS account and set up your first workspace in minutes."`
  
  Section with `id="faq"` and `className="mx-auto max-w-3xl px-6 py-20 md:py-28"`; centered heading `"Frequently Asked Questions"`; render each item as a native `<details className="border-b border-white/10 py-4 group">` with `<summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white/90 hover:text-white">` containing the question text and a chevron `<span className="ml-4 text-white/40 transition-transform group-open:rotate-180">▾</span>`; answer in `<p className="mt-3 text-sm text-white/60 leading-relaxed">` inside the `<details>` after the `<summary>`

**Checkpoint**: Pricing and FAQ independently testable — US3 complete.

---

## Phase 6: User Story 4 — Footer Navigation (Priority: P4)

**Goal**: Footer provides logo, grouped links, and copyright.
**Independent Test**: Scroll to page bottom — logo visible, three link groups readable, copyright line present. On mobile, groups stack vertically.

- [ ] T010 [US4] Rewrite `apps/landing/src/sections/footer/footer.tsx` — import `Image` from `next/image`; add `id="footer"`; structure: `<footer className="border-t border-white/10 bg-[#0a0a0f] py-12 md:py-16">`; inner div `max-w-7xl mx-auto px-6`; top row: logo on left using `<Image src="/branding/logo-bottom.png" alt="NexoraXS" width={140} height={38} />`, three link-group columns on right (`grid grid-cols-2 gap-8 sm:grid-cols-3`); group 1 heading `"Product"` links: Features, Apps, Pricing; group 2 heading `"Company"` links: About (`href="#"`), Contact (`href="#"`); group 3 heading `"Legal"` links: Privacy (`href="#"`), Terms (`href="#"`); bottom row (border-top `mt-10 pt-8 border-white/10`): copyright `"© 2026 NexoraXS. All rights reserved."` in `text-sm text-white/40`; all headings styled `text-xs font-semibold uppercase tracking-wider text-white/40 mb-3`; all links styled `text-sm text-white/60 hover:text-white transition-colors block mb-2`

**Checkpoint**: Footer independently testable — US4 complete.

---

## Phase 7: Page Assembly

**Purpose**: Wire all sections together in page.tsx.

⚠️ **Depends on**: All previous phases complete (T002–T010).

- [ ] T011 Update `apps/landing/src/app/page.tsx` — replace the entire file content; import all 7 section components in order (Navbar, Hero, Features, Apps, Pricing, FAQ, Footer) from their respective paths in `../sections/`; the `Home` component renders `<main className="min-h-screen bg-[#0a0a0f] text-white">` with all 7 sections composed inside in this order: `<Navbar />`, `<Hero />`, `<Features />`, `<Apps />`, `<Pricing />`, `<FAQ />`, `<Footer />`; no logic inside — composition only

**Checkpoint**: Full page renders with all 7 sections.

---

## Phase 8: Polish & Verification

**Purpose**: Confirm the complete page meets all success criteria.

- [ ] T012 Run `pnpm --filter landing dev` and open http://localhost:3000 — verify all 7 sections are visible on desktop (1440px); click each navbar link and confirm smooth scroll to the correct section; expand and collapse each FAQ item; resize to 375px and verify mobile menu works, all sections are readable without horizontal scroll
- [ ] T013 [P] Run `pnpm --filter landing build` from monorepo root — confirm build exits with code 0, zero TypeScript errors, zero ESLint errors; fix any issues found before marking complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — confirm environment first
- **Foundation (Phase 2)**: Depends on Setup — BLOCKS all section work
- **US1 (Phase 3)**: Depends on Foundation — Navbar + Hero
- **US2 (Phase 4)**: Depends on Foundation — Features + Apps (independent of US1)
- **US3 (Phase 5)**: Depends on Foundation — Pricing + FAQ (independent of US1, US2)
- **US4 (Phase 6)**: Depends on Foundation — Footer (independent of US1–US3)
- **Assembly (Phase 7)**: Depends on ALL section phases (T004–T010)
- **Polish (Phase 8)**: Depends on Assembly

### Within Each User Story Phase

- Tasks marked [P] within the same phase run in parallel (different files)
- Navbar (T004) and Hero (T005) have no dependency on each other → parallel
- Features (T006) and Apps (T007) have no dependency on each other → parallel
- Pricing (T008) and FAQ (T009) have no dependency on each other → parallel

### Parallel Opportunities Summary

```bash
# Phase 2 — run together:
Task T002: Update globals.css
Task T003: Update layout.tsx

# Phase 3 — run together:
Task T004: Rewrite navbar.tsx
Task T005: Update hero.tsx

# Phase 4 — run together:
Task T006: Rebuild features.tsx
Task T007: Create apps.tsx

# Phase 5 — run together:
Task T008: Create pricing.tsx
Task T009: Create faq.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001 — verify environment
2. T002 + T003 — foundation
3. T004 + T005 — navbar + hero
4. T011 (partial) — page.tsx with only Navbar + Hero
5. **STOP AND VALIDATE**: Does the above-the-fold experience look professional on desktop and mobile?

### Incremental Delivery

1. Foundation → US1 (navbar + hero) → validate → deploy/demo
2. Add US2 (features + apps) → validate → deploy/demo
3. Add US3 (pricing + FAQ) → validate → deploy/demo
4. Add US4 (footer) → assemble page → final build check

---

## Notes

- `[P]` = parallelizable (different file, no dependency on sibling task)
- `[USN]` = maps to User Story N in spec.md
- All file paths are relative to the monorepo root
- No new packages — everything uses existing Next.js + Tailwind setup
- `"use client"` appears only in `navbar.tsx`; all other sections are Server Components
- Branding images in `apps/landing/public/branding/` are read-only — do not modify
