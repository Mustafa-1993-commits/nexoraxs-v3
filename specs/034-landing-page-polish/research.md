# Research: Landing Page Full Polish — Animated Premium SaaS

**Phase**: 0 | **Branch**: `034-landing-page-polish` | **Date**: 2026-05-17

---

## Navbar: Scroll-Aware Glassmorphism

**Decision**: Use `useEffect` + `useState(scrolled)` with `window.addEventListener("scroll", handler)` in navbar. At `window.scrollY > 50`: apply `bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10`. At top: `bg-transparent border-transparent`.

**Rationale**: The navbar currently always applies the glassmorphism style. The spec requires it to be transparent at the top. A scroll listener is the standard pattern for this — lightweight, no library needed.

**Current code to replace**:
```tsx
// BEFORE: always glassmorphism
className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md"

// AFTER: dynamic based on scrolled state
className={`sticky top-0 z-50 transition-all duration-300 ${
  scrolled
    ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md"
    : "border-transparent bg-transparent"
}`}
```

---

## Navbar: Mobile Menu with AnimatePresence

**Decision**: Replace the conditional `{menuOpen && <div>...</div>}` with `AnimatePresence` + `motion.div`:
```tsx
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden border-t border-white/10 bg-[#0a0a0f] md:hidden"
    >
      {/* nav content */}
    </motion.div>
  )}
</AnimatePresence>
```

**Rationale**: The current `{menuOpen && <div>}` pattern shows/hides instantly. AnimatePresence allows the component to animate out before being removed from the DOM, satisfying FR-006.

---

## Navbar: CTA Button Gradient + Glow

**Decision**: Replace `btn-primary` class (which uses the global gradient) with an inline or extended style that adds a glow shadow on hover. Use Tailwind's `hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]` or a similar glow utility.

**Note**: `btn-primary` already has a gradient. The addition is the glow shadow on hover. Can be done with `hover:shadow-[0_0_24px_rgba(99,102,241,0.6)] transition-shadow`.

---

## Hero: Animated Gradient Background Orbs

**Decision**: Three animated orbs using CSS keyframe animations added to `globals.css`:

```css
@keyframes floating-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  33% { transform: translate(30px, -20px) scale(1.1); opacity: 0.7; }
  66% { transform: translate(-15px, 15px) scale(0.95); opacity: 0.4; }
}

.orb-purple  { animation: floating-orb 12s ease-in-out infinite; }
.orb-blue    { animation: floating-orb 15s ease-in-out infinite 3s; }
.orb-cyan    { animation: floating-orb 18s ease-in-out infinite 6s; }
```

Three `div` elements positioned: purple top-left, blue bottom-right, cyan center — each with `filter: blur(120px)` (matching existing `.glow-blob` pattern) but larger and with animation.

**Rationale**: The existing `.glow-blob` elements are static. Adding CSS keyframe animations makes them move in a looping pattern without any JavaScript overhead. This is more performant than Framer Motion for continuous looping animations.

---

## Hero: Word-by-Word Headline Animation

**Decision**: Split the headline into words and animate each with a stagger. Use Framer Motion:

```tsx
const headline = "Business operations, connected by one modular core";
const words = headline.split(" ");

// In JSX:
<motion.h1 variants={staggerContainer} initial="hidden" animate={splashDone ? "visible" : "hidden"}>
  {words.map((word, i) => (
    <motion.span key={i} variants={fadeInUp} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  ))}
</motion.h1>
```

**Rationale**: Word-level animation is more performant than character-level and creates the "typewriter reveal" premium feel. Using inline-block on each word preserves natural line breaking. The existing `splashDone` gate is preserved — animations wait until the splash screen exits.

---

## Scroll Animations: useInView Pattern

**Decision**: All scroll-triggered sections use this pattern:

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.1 });

<motion.section
  ref={ref}
  variants={staggerContainer}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  <motion.h2 variants={fadeInUp}>...</motion.h2>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>...</motion.div>
  ))}
</motion.section>
```

**Key settings**: `once: true` (animate once), `amount: 0.1` (trigger at 10% visible).

**Rationale**: `useInView` from framer-motion handles the IntersectionObserver setup. The `once: true` flag satisfies FR-033 (animate only once). The `amount: 0.1` threshold satisfies FR-033 requirement.

**Sections that need this**: Features, Platform, Apps, Pricing, FAQ, CTA. The section titles and items all animate via `staggerContainer` + `fadeInUp` variants.

---

## FAQ: Framer Motion Height Animation

**Decision**: Replace the CSS `max-h-0/max-h-96 overflow-hidden transition-all` pattern with Framer Motion's `animate={{ height: "auto" }}` which handles height-to-auto transitions natively:

```tsx
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">
        {item.answer}
      </p>
    </motion.div>
  )}
</AnimatePresence>
```

**Rationale**: The current CSS max-height approach uses `max-h-96` which is a fixed cap, not true height-to-auto. Framer Motion natively handles `height: "auto"` by measuring the element, giving a true smooth expansion regardless of content length.

---

## Features: Gradient Border on Hover

**Decision**: Use CSS custom properties and a wrapper `div` technique for gradient borders, or a simpler `box-shadow` glow approach:

```tsx
// Option 1: gradient via background-clip (CSS):
// Complex to implement cleanly with Tailwind

// Option 2: Simpler — add colored glow shadow on hover
className={`glass-card group relative overflow-hidden p-6 transition-all duration-300
  hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:-translate-y-1`}
```

**Decision**: Use `hover:shadow` + `hover:-translate-y-1` for the lift effect, and a gradient overlay `div` that appears on hover for the border effect. This is the most practical approach without adding complexity.

---

## Apps: Coming-Soon Enhanced Overlay

**Decision**: Coming-soon cards get a semi-transparent overlay `div` with `backdrop-blur-sm`:

```tsx
{app.badge && (
  <div className="absolute inset-0 rounded-[inherit] bg-[#0a0a0f]/30 backdrop-blur-[2px] z-10" />
)}
```

Plus the existing badge repositioned. The card's `opacity` is removed (currently `opacity-85` on pricing cards only) — instead the overlay handles the dimming.

---

## Footer: Gradient Divider

**Decision**: Replace `border-t border-white/10` with a gradient border:

```tsx
// Remove border-t class, add a div before content:
<div className="h-px w-full bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 mb-0" />
```

**Logo**: Change from `logo-bottom.png` to `logo-top.png` (which is the cleaner top-bar version). Width increased from 140px to 160px.

---

## Reduced Motion: prefers-reduced-motion

**Decision**: Use Framer Motion's `useReducedMotion()` hook at the component level. When `reducedMotion` is true, pass `transition={{ duration: 0 }}` to override all animations.

```tsx
import { useReducedMotion } from "framer-motion";

const reducedMotion = useReducedMotion();
const transition = reducedMotion ? { duration: 0 } : undefined;

<motion.div variants={fadeInUp} transition={transition}>
```

Also add `@media (prefers-reduced-motion: reduce)` to the CSS keyframe animations:
```css
@media (prefers-reduced-motion: reduce) {
  .orb-purple, .orb-blue, .orb-cyan, .float-y { animation: none; }
}
```

---

## globals.css: CSS Keyframes to Add

```css
/* Animated gradient orbs */
@keyframes floating-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.08); }
  66%       { transform: translate(-15px, 15px) scale(0.95); }
}

/* Floating element (splash, app icons) */
@keyframes float-y {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

/* CSS classes */
.animate-orb-slow   { animation: floating-orb 12s ease-in-out infinite; }
.animate-orb-medium { animation: floating-orb 15s ease-in-out infinite 3s; }
.animate-orb-fast   { animation: floating-orb 18s ease-in-out infinite 6s; }
.animate-float      { animation: float-y 4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-orb-slow,
  .animate-orb-medium,
  .animate-orb-fast,
  .animate-float { animation: none; }
}
```

---

## Constitution Re-check (post-design)

All design decisions maintain compliance:
- Principle III: Only `@nexoraxs/ui` and local `lib/animations.ts` imports — no cross-app.
- Principle IV: All Framer Motion types used correctly (`Variants` from framer-motion). No `any`.
- framer-motion approved per Constitution v1.1.0.

**Gate result**: PASS
