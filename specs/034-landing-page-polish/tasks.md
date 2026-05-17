# Tasks: Landing Page Full Polish — Animated Premium SaaS

**Branch**: `034-landing-page-polish`
**Input**: Design documents from `specs/034-landing-page-polish/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅

**Tests**: Not requested — manual browser verification per quickstart.md.

**Organization**: Tasks follow section-by-section order. Most section tasks are independent (different files) and can run in parallel after Phase 1 (CSS setup). The sections that add `useInView` all need "use client" — this is included in each section's task.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Different file, no dependency on another in-progress task
- **[Story]**: Maps to user stories US1–US9 from spec.md

---

## Phase 1: Setup (CSS Keyframes — Blocks All Sections)

**Purpose**: Add the CSS animation utility classes that the hero orbs and floating elements depend on. Must be done before hero or any section using CSS animations.

- [x] T001 Add CSS keyframe animations to `apps/landing/src/app/globals.css` — add at the end of file: `@keyframes floating-orb` (translate + scale loop, 3 position waypoints), `@keyframes float-y` (translateY 0px→-10px→0px loop); add utility classes `.animate-orb-slow` (12s), `.animate-orb-medium` (15s, 3s delay), `.animate-orb-fast` (18s, 6s delay), `.animate-float` (4s float-y); add `@media (prefers-reduced-motion: reduce)` block disabling all four classes. Full keyframe code in `data-model.md` CSS Token Additions section.

**Checkpoint**: `animate-float` and `animate-orb-slow/medium/fast` classes exist in globals.css — hero orbs and floating elements can now be assigned these classes.

---

## Phase 2: User Story 3 — Navbar (Priority: P1)

**Goal**: Transparent navbar at page top, glassmorphism on scroll; desktop link hover underline; CTA button gradient glow; mobile menu slides in/out with AnimatePresence.

**Independent Test**: Load page → navbar is transparent. Scroll 60px → navbar shows blur + border. Mobile at 375px → tap hamburger → menu slides down; tap close → menu slides up and disappears.

- [x] T002 [US3] Rewrite `apps/landing/src/sections/navbar/navbar.tsx` — add `"use client"` directive; add `useEffect` + `useState(scrolled)` to detect `window.scrollY > 50` and apply scroll state; change `<header>` className to be conditional: transparent at top (`bg-transparent border-transparent`), glassmorphism when scrolled (`bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10`); both transitions use `transition-all duration-300`; add `import { motion, AnimatePresence } from "framer-motion"`; replace the conditional `{menuOpen && <div>}` mobile menu with `<AnimatePresence>` wrapping a `motion.div` with `initial={{ height: 0, opacity: 0 }}`, `animate={{ height: "auto", opacity: 1 }}`, `exit={{ height: 0, opacity: 0 }}`, `transition={{ duration: 0.25, ease: "easeInOut" }}` and `className="overflow-hidden"`; add hover underline to desktop nav links using `hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full`; add hover glow to CTA button: append `hover:shadow-[0_0_24px_rgba(99,102,241,0.6)] transition-shadow duration-300` to the CTA `<a>` element

**Checkpoint**: US3 complete — transparent navbar scrolls to glassmorphism, mobile menu animates with AnimatePresence.

---

## Phase 3: User Story 1 — Hero (Priority: P1)

**Goal**: Animated CSS keyframe orbs in background; headline animates word-by-word after splash; subheadline, CTA buttons, badges stagger in; CoreIllustration has floating animation.

**Independent Test**: After splash screen exits — three orbs are visibly moving in the background. Headline "Business operations, connected by one modular core" reveals word-by-word. Subheadline fades in. CTA buttons slide up with stagger. Feature badges stagger in. Illustration side floats gently. Reloading the page — animations play once only (after splash).

- [x] T003 [US1] Enhance `apps/landing/src/sections/hero/hero.tsx` — add `import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations"`; replace the two static `glow-blob` divs with three animated orbs using the new CSS keyframe classes: purple orb (`animate-orb-slow`) positioned `absolute -left-40 -top-20 h-[400px] w-[400px] rounded-full bg-purple-600/30 blur-[120px]`; blue orb (`animate-orb-medium`) positioned `absolute -bottom-32 -right-20 h-[320px] w-[320px] rounded-full bg-blue-500/25 blur-[120px]`; cyan orb (`animate-orb-fast`) positioned `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-cyan-500/20 blur-[120px]`; replace the single `motion.div` containing the `<h1>` with a `motion.div` using `variants={staggerContainer}` for the entire left column; animate the headline word-by-word: split `"Business operations, connected by one modular core"` into words, wrap each in `motion.span` with `variants={fadeInUp}` and `className="inline-block mr-[0.25em]"`, wrap the `<h1>` in `motion.div variants={staggerContainer}`; add `fadeIn` variant to the `<p>` subheadline; wrap CTA buttons group in `motion.div variants={staggerContainer}` with each button wrapped in `motion.div variants={fadeInUp}`; wrap badges group in `motion.div variants={staggerContainer}` with each badge wrapped in `motion.span variants={fadeInUp}`; add `animate-float` CSS class to the `CoreIllustration` wrapper `motion.div` (on the right column); all animations still gated on `splashDone` state (keep existing logic)

**Checkpoint**: US1 complete — premium hero with animated orbs, word-by-word headline, staggered content, floating illustration.

---

## Phase 4: User Story 6 — FAQ Accordion (Priority: P2)

**Goal**: Replace CSS max-height accordion with Framer Motion height animation; FAQ items stagger in on scroll.

**Independent Test**: Scroll to FAQ → items stagger in. Click first question → answer expands with smooth 300ms height animation. Click again → collapses smoothly. Click different item → first closes, second opens. Chevron rotates 180° when open.

*Building FAQ early (before simpler sections) because it requires the most structural change: replacing the CSS animation pattern with Framer Motion AnimatePresence.*

- [x] T004 [US6] Rewrite `apps/landing/src/sections/faq/faq.tsx` — keep `"use client"` and `useState`; add `import { motion, AnimatePresence, useInView } from "framer-motion"`; add `import { fadeInUp, staggerContainer } from "@/lib/animations"`; add `useRef` + `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })`; wrap the outer `<section>` in `motion.section` with `ref={ref}` and `variants={staggerContainer}` and `initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap section title + subtitle in `motion.div variants={fadeInUp}`; wrap each FAQ item `div` in `motion.div variants={fadeInUp}` for stagger; replace the CSS max-height accordion (`className={overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? max-h-96 : max-h-0}}`) with `AnimatePresence initial={false}` wrapping `{isOpen && (<motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">...</motion.div>)}`; keep the existing `ChevronDown` rotation CSS (`rotate-180` when open) — it already works

**Checkpoint**: US6 complete — FAQ staggered scroll entrance, smooth Framer Motion height accordion, one-open-at-a-time behavior preserved.

---

## Phase 5: User Stories 2 + 4 — Features Section (Priority: P1 + P2)

**Goal**: Feature cards stagger in on scroll; hover lift + shadow glow; colored icon backgrounds already exist.

**Independent Test**: Scroll to Features → section title fades in, cards stagger in (one by one). Hover any card → it lifts ~4px with a subtle purple glow shadow. Scroll back up then down → cards do NOT re-animate.

- [x] T005 [P] [US2] [US4] Enhance `apps/landing/src/sections/features/features.tsx` — add `"use client"` directive; add `import { motion, useInView } from "framer-motion"`, `import { useRef } from "react"`, `import { fadeInUp, staggerContainer } from "@/lib/animations"`; add `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })` at the top of the component; wrap the outer `<section>` in `motion.section` with `ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the title `<div>` (containing the chip, h2, p) in `motion.div variants={fadeInUp}`; wrap the grid `<div>` in `motion.div variants={staggerContainer}`; wrap each feature card `<div>` in `motion.div variants={fadeInUp}`; on each feature card div, add hover lift: append to className `transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]`

**Checkpoint**: US2+US4 complete for Features — stagger scroll entrance, hover lift glow.

---

## Phase 6: User Story 2 — Platform Section (Priority: P1)

**Goal**: Platform section slides in from sides on scroll.

**Independent Test**: Scroll to Platform → left panel slides in from left, right panel slides in from right, center arrow fades in. Does not replay on scroll-back.

- [x] T006 [P] [US2] Enhance `apps/landing/src/sections/platform/platform.tsx` — add `"use client"` directive; add `import { motion, useInView } from "framer-motion"`, `import { useRef } from "react"`, `import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations"`; add `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })`; wrap the outer `<section>` in `motion.section ref={ref}`; wrap the header text block in `motion.div variants={fadeInUp} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the 3-column grid in `motion.div`; wrap the left "Core Platform" card in `motion.div variants={slideInLeft} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the right "App Satellites" card in `motion.div variants={slideInRight} initial="hidden" animate={isInView ? "visible" : "hidden"}`; center arrow div stays as-is (it's static)

**Checkpoint**: US2 complete for Platform — left/right slide-in on scroll.

---

## Phase 7: User Stories 2 + 5 — Apps Section (Priority: P1 + P2)

**Goal**: App cards scale in with stagger on scroll; enhanced coming-soon overlay; available cards scale 1.03 + glow on hover.

**Independent Test**: Scroll to Apps → title fades in, cards scale in with stagger. Hover on Shops card → scales to 1.03 with blue glow. Hover on Clinics (coming-soon) → card scales slightly, blur overlay stays visible. Coming-soon overlay is clearly visible without hovering.

- [x] T007 [P] [US2] [US5] Enhance `apps/landing/src/sections/apps/apps.tsx` — add `"use client"` directive; add `import { motion, useInView } from "framer-motion"`, `import { useRef } from "react"`, `import { fadeInUp, staggerContainer } from "@/lib/animations"`; add `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })`; define `scaleIn` variant inline: `const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }` (import `Variants` from framer-motion); wrap `<section>` in `motion.section ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the header `<div>` in `motion.div variants={fadeInUp}`; wrap each app card in `motion.div variants={scaleIn}`; for **available** app cards (no `app.badge`): add `className` hover effects `hover:scale-[1.03] transition-transform duration-300` and inline `style={{ "--hover-glow": app.glow }}` with `hover:shadow-[0_8px_40px_var(--hover-glow)]` — or use inline style approach: add `onMouseEnter/onMouseLeave` state or use CSS group variant; **simpler approach**: add `hover:scale-[1.03] transition-all duration-300` to the card div className for all cards, and for available cards add a conditional shadow with `!app.badge && "hover:shadow-[0_8px_40px_{app.glow}]"` — use template string or separate className; for **coming-soon** cards (`app.badge`): add a `div className="absolute inset-0 rounded-[inherit] z-10 bg-[#0a0a0f]/40 backdrop-blur-[2px]"` inside the card (after the existing glow blob div) so the overlay covers the content; also add `opacity-75` to the coming-soon card wrapper

**Checkpoint**: US2+US5 complete — app cards scale-stagger on scroll, coming-soon overlay visually distinct, available cards glow on hover.

---

## Phase 8: User Stories 2 + 7 — Pricing Section (Priority: P1 + P2)

**Goal**: Pricing cards stagger-fade in on scroll; featured card enhanced glow; badge text updated to "Early Access — Free".

**Independent Test**: Scroll to Pricing → cards stagger in. Featured card shows "Early Access — Free" badge chip. Featured card has visible purple glow behind it. Non-featured card is clearly secondary.

- [x] T008 [P] [US2] [US7] Enhance `apps/landing/src/sections/pricing/pricing.tsx` — add `"use client"` directive; add `import { motion, useInView } from "framer-motion"`, `import { useRef } from "react"`, `import { fadeInUp, staggerContainer } from "@/lib/animations"`; add `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })`; wrap `<section>` in `motion.section ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the title `<div>` in `motion.div variants={fadeInUp}`; wrap each pricing card in `motion.div variants={fadeInUp}`; change the badge text inside the featured card from `"Beta Early-Bird"` to `"Early Access — Free"`; update the `<h3>` inside the featured card from `"Free during beta"` to `"Free"`; enhance the featured card's glow: change the existing `absolute -right-16 -top-16 h-44 w-44 bg-purple-500/25` glow div to `h-56 w-56 bg-purple-500/40` and add a second glow element `absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl`; add `shadow-[0_0_40px_rgba(124,58,237,0.12)]` to the featured card's className

**Checkpoint**: US2+US7 complete — pricing stagger entrance, featured card is visually dominant with enhanced glow and updated badge.

---

## Phase 9: User Story 2 — CTA Section (Priority: P1)

**Goal**: CTA content fades and slides in on scroll.

**Independent Test**: Scroll to CTA → badge chip fades in, headline slides up, subtitle fades, buttons stagger in. Does not replay.

- [x] T009 [P] [US2] Enhance `apps/landing/src/sections/cta/cta.tsx` — add `"use client"` directive; add `import { motion, useInView } from "framer-motion"`, `import { useRef } from "react"`, `import { fadeInUp, staggerContainer } from "@/lib/animations"`; add `const ref = useRef(null)` + `const isInView = useInView(ref, { once: true, amount: 0.1 })`; wrap `<section>` in `motion.section ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}`; wrap the inner centered `<div>` children: badge chip `<span>` in `motion.span variants={fadeInUp}`, `<h2>` in `motion.h2 variants={fadeInUp}`, `<p>` in `motion.p variants={fadeInUp}`, button group in `motion.div variants={staggerContainer}` with each `<a>` in `motion.a variants={fadeInUp}`

**Checkpoint**: US2 complete for CTA — scroll-triggered entrance animation.

---

## Phase 10: User Story 8 — Footer (Priority: P3)

**Goal**: Gradient divider replaces solid border; logo-top.png replaces logo-bottom.png at larger size; link hover transitions already exist.

**Independent Test**: Scroll to footer → a gradient line (purple→blue→cyan) appears at the top. Logo is the `logo-top.png` version at 160px. Footer links change color on hover (already works — verify unchanged).

- [x] T010 [P] [US8] Enhance `apps/landing/src/sections/footer/footer.tsx` — change `<footer>` className from `border-t border-white/10 bg-[#0a0a0f]` to `bg-[#0a0a0f]` (remove the border-t); add a gradient divider `<div>` as the first child of `<footer>`: `<div className="h-px w-full bg-gradient-to-r from-purple-500/50 via-blue-500/40 to-cyan-500/50" aria-hidden="true" />`; change the `<Image>` from `src="/branding/logo-bottom.png"` to `src="/branding/logo-top.png"`, `width={160}`, `height={44}`, add `className="h-10 w-auto"`

**Checkpoint**: US8 complete — gradient divider visible at footer top, logo-top.png displayed at correct size.

---

## Phase 11: Polish & Build Verification (US9 + Cross-cutting)

**Purpose**: TypeScript strict check, build verification, and reduced-motion confirmation.

- [x] T011 [P] Run `pnpm --filter landing exec tsc --noEmit` from repo root and fix any TypeScript errors — common issues: missing `Variants` import from framer-motion, missing `"use client"` on sections using hooks, `useRef` not imported
- [x] T012 [P] Run `pnpm --filter landing lint` from repo root and fix any ESLint errors
- [x] T013 Run `pnpm --filter landing build` from repo root — confirm exit code 0 and all routes (/ and /_not-found) build successfully
- [x] T014 Manual browser check per `quickstart.md` verification checklist — confirm all 32 items pass at 375px and 1280px viewports

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (T001)**: No dependencies — start immediately
- **Phase 2 (T002)**: Depends on Phase 1 (navbar uses no CSS keyframes but may need globals loaded)
- **Phases 3–10 (T003–T010)**: All depend on T001 (CSS keyframes); each section is independent of other sections
- **Phase 11 (T011–T014)**: Depends on ALL section tasks (T002–T010) being complete

### Parallel Opportunities

After T001 completes, all section tasks can run in parallel:
- T002, T003, T004, T005, T006, T007, T008, T009, T010 — all touch different files

### Within Each Section

Each section task is a single file → no intra-section parallelism needed.

---

## Parallel Example: All Sections (After T001)

```bash
# Run all of these simultaneously after T001 completes:
Task T002: "Rewrite navbar.tsx (scroll detection + AnimatePresence)"
Task T003: "Enhance hero.tsx (orbs + word animation)"
Task T004: "Rewrite faq.tsx (Framer Motion accordion)"
Task T005: "Enhance features.tsx (useInView + hover)"
Task T006: "Enhance platform.tsx (useInView slide-in)"
Task T007: "Enhance apps.tsx (useInView + overlay)"
Task T008: "Enhance pricing.tsx (useInView + badge)"
Task T009: "Enhance cta.tsx (useInView)"
Task T010: "Enhance footer.tsx (gradient divider + logo)"

# Then verify:
Task T011: "tsc --noEmit"
Task T012: "lint"
Task T013: "build"
Task T014: "manual browser verification"
```

---

## Implementation Strategy

### MVP First (P1 Stories: US1, US2, US3, US9)

The minimum viable polish includes the hero, navbar, and scroll animations:

1. T001 (CSS keyframes)
2. T002 (navbar) + T003 (hero) in parallel
3. T005 + T006 + T007 + T008 + T009 (scroll animations for all sections)
4. T011 + T013 (verify)
5. **MVP demo**: Premium navbar, animated hero, scroll animations across all sections

### Full Polish (Add P2: US4, US5, US6, US7)

1. MVP + T004 (FAQ accordion) + T010 (footer)
2. Hover effects are included within T005/T007 tasks
3. Full visual polish complete

---

## Notes

- T001 MUST complete before any section that uses `.animate-orb-*` or `.animate-float` classes (hero primarily)
- T002 (navbar) requires `"use client"` — currently the file already has `"use client"` at the top
- T003 (hero) — the `staggerContainer` from `lib/animations.ts` uses `staggerChildren: 0.1`; if words stagger too fast or slow, adjust via inline `transition` override
- T004 (FAQ) — `AnimatePresence initial={false}` prevents the first item from animating on mount
- T007 (apps) — for the hover shadow matching each app's glow color, use inline style `style={{ boxShadow: isHovered ? `0 8px 40px ${app.glow}` : 'none' }}` with local `useState` per card, OR use Tailwind `hover:shadow-lg` + a fixed color. The simpler approach is Tailwind with `transition-all` since exact color matching requires JS state.
- T011 — if TypeScript errors occur, the most common causes are: missing type imports (`Variants`, `RefObject`), `useRef` typed as `HTMLElement` vs the motion element type
- All sections with `useInView` must have `"use client"` — if Next.js build fails with a server component error, add the directive
