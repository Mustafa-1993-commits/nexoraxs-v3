# Quickstart: Framer Motion Animation Utilities

**Branch**: `033-framer-motion-animation` | **Date**: 2026-05-17

---

## Verify Installation

```bash
# framer-motion should already be in apps/landing/package.json
cat apps/landing/package.json | grep framer-motion
# Expected: "framer-motion": "^12.38.0"
```

## Use an Animation Preset

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function MySection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={fadeInUp}>Title</motion.h2>
      <motion.p variants={fadeInUp}>Description text here.</motion.p>
    </motion.section>
  );
}
```

## Available Presets

| Export | Effect | Best for |
|--------|--------|----------|
| `fadeInUp` | Fade + slide up 20px | Section headings, cards |
| `fadeIn` | Fade only | Subtle reveals |
| `staggerContainer` | Staggers children 0.1s | Wrapping lists, grids |
| `slideInLeft` | Fade + slide from left 40px | Left-aligned panels |
| `slideInRight` | Fade + slide from right 40px | Right-aligned panels |

## Build Verification

```bash
pnpm --filter landing build
# Expected: exit code 0, all routes built successfully

pnpm --filter landing exec tsc --noEmit
# Expected: zero errors
```

## Manual Checklist

- [ ] Constitution v1.1.0 — Framer Motion row present in Approved Stack table
- [ ] Sync Impact Report comment present at top of constitution.md
- [ ] `apps/landing/src/lib/animations.ts` exists with 5 named exports
- [ ] All 5 exports are typed as `Variants` (no `any`)
- [ ] `AGENTS.md` documents Framer Motion as landing-approved
- [ ] `pnpm --filter landing build` → exit 0
