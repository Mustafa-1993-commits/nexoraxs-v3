# Quickstart: Landing Page Full Polish

**Branch**: `034-landing-page-polish` | **Date**: 2026-05-17

---

## Development Setup

```bash
# Start landing dev server
pnpm --filter landing dev
# Opens at http://localhost:3000
```

## Build Verification

```bash
pnpm --filter landing exec tsc --noEmit  # Zero errors expected
pnpm --filter landing build              # Exit code 0 expected
```

## File Reference

| File | What Changes |
|------|-------------|
| `src/app/globals.css` | Add CSS keyframes + utility classes |
| `src/sections/navbar/navbar.tsx` | Scroll detection, AnimatePresence mobile menu |
| `src/sections/hero/hero.tsx` | CSS orb animations, word-by-word headline |
| `src/sections/features/features.tsx` | `useInView` stagger, hover lift |
| `src/sections/platform/platform.tsx` | `useInView` slide-in animations |
| `src/sections/apps/apps.tsx` | `useInView` scale-stagger, enhanced overlay |
| `src/sections/pricing/pricing.tsx` | `useInView` stagger, badge text, enhanced glow |
| `src/sections/faq/faq.tsx` | Framer Motion accordion + `useInView` stagger |
| `src/sections/cta/cta.tsx` | `useInView` animations |
| `src/sections/footer/footer.tsx` | Gradient divider, logo-top.png |

## Shared Animation Imports

```tsx
// Always import from local lib (not inline)
import { fadeInUp, fadeIn, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

// Import Framer Motion hooks
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
```

## Standard Scroll Animation Pattern

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function MySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 variants={fadeInUp}>Title</motion.h2>
      <motion.div variants={fadeInUp}>Content</motion.div>
    </motion.section>
  );
}
```

## Manual Verification Checklist

After implementation, verify each item in the browser:

**Navbar**
- [ ] At page top: navbar is transparent (no background blur)
- [ ] After scrolling 50px: navbar has glassmorphism (blur + border)
- [ ] On hover over nav link: underline animation appears
- [ ] On hover over CTA button: gradient glow appears
- [ ] On mobile: hamburger menu opens with slide-down animation
- [ ] On mobile: menu closes with slide-up animation (removed from DOM)

**Hero**
- [ ] Three colored orbs visible and moving (purple, blue, cyan)
- [ ] After splash: headline animates word-by-word
- [ ] Subheadline fades in after headline
- [ ] CTA buttons slide up with stagger
- [ ] Feature badges stagger in
- [ ] CoreIllustration has subtle floating animation

**Features**
- [ ] Section title fades in on scroll (not before)
- [ ] Cards stagger in on scroll
- [ ] Hover: card lifts slightly with glow
- [ ] Animations do NOT replay on scroll-back

**Platform**
- [ ] Left and right panels slide in from respective sides on scroll

**Apps**
- [ ] Cards scale in with stagger on scroll
- [ ] Available card hover: scale 1.03 + glow
- [ ] Coming-soon cards: blur overlay visible
- [ ] Coming-soon hover: scales slightly but stays subdued

**Pricing**
- [ ] Cards stagger fade in on scroll
- [ ] Featured card: "Early Access — Free" badge visible
- [ ] Featured card: enhanced purple glow effect

**FAQ**
- [ ] Items stagger in on scroll
- [ ] Click to open: smooth height animation (~300ms)
- [ ] Click to close: smooth collapse
- [ ] Only one open at a time
- [ ] Chevron rotates 180° when open

**CTA**
- [ ] Content fades and slides in on scroll

**Footer**
- [ ] Gradient divider line at top (purple→blue→cyan)
- [ ] Logo uses logo-top.png at 160px width
- [ ] Links have smooth color transition on hover

**Global**
- [ ] Enable "prefers-reduced-motion" in OS → all CSS animations stop, Framer Motion animations are instant
- [ ] No horizontal scroll at 375px viewport
- [ ] No layout breaks at 768px, 1280px, 1920px
- [ ] `pnpm --filter landing build` → exit code 0
