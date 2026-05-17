# Research: Framer Motion — Add to Approved Stack

**Phase**: 0 | **Branch**: `033-framer-motion-animation` | **Date**: 2026-05-17

---

## Framer Motion Already in Use

**Decision**: No new installation needed. framer-motion is already declared at `^12.38.0` in `apps/landing/package.json` and actively imported in:
- `apps/landing/src/sections/hero/hero.tsx` — uses `motion.div` for hero animations
- `apps/landing/src/sections/hero/SplashScreen.tsx` — uses `motion` for splash screen transitions

**Rationale**: The spec assumption was that it might need installation; the current state is that it's already installed. The remaining work is governance (constitution) and utility creation.

**Alternatives considered**: None — framer-motion is already committed in the package.json; the question is not whether to install it but how to formalize its use.

---

## Framer Motion Variants API — Typed Animation Presets

**Decision**: Use Framer Motion's `Variants` type from the `"framer-motion"` package to type all animation preset objects.

**Rationale**: `Variants` is the canonical type for objects passed to `motion` component `variants` prop. Using it ensures TypeScript strict compliance without any `as` assertions. Example:

```typescript
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
```

**Alternatives considered**:
- Inline types (typing each variant manually) — more verbose, less semantic.
- No types (`as const` only) — fails strict TypeScript since the variant values aren't assignable to `MotionProps["variants"]` without explicit typing.

---

## Animation Preset Definitions

**Decision**: 5 presets in `apps/landing/src/lib/animations.ts`:

| Preset | hidden state | visible state | Use case |
|--------|-------------|---------------|----------|
| `fadeInUp` | `opacity: 0, y: 20` | `opacity: 1, y: 0` | Primary hero text, section headings |
| `fadeIn` | `opacity: 0` | `opacity: 1` | Subtle element reveals |
| `staggerContainer` | `{}` | `{} + staggerChildren: 0.1` | Parent wrapper for staggered children |
| `slideInLeft` | `opacity: 0, x: -40` | `opacity: 1, x: 0` | Left-aligned content panels |
| `slideInRight` | `opacity: 0, x: 40` | `opacity: 1, x: 0` | Right-aligned content panels |

**Default transition**: `duration: 0.5, ease: "easeOut"` for all positional/opacity presets. `staggerContainer` uses `staggerChildren: 0.1` on the `visible.transition`.

**Rationale**: These cover the 4 most common landing-page animation patterns (fade-up, fade-only, stagger, slide-from-side). Matching the 0.5s / easeOut defaults to what's already used in `hero.tsx` ensures visual consistency.

---

## Constitution Amendment Format

**Decision**: Add a Sync Impact Report comment at the top of the Constitution file (before the `# NexoraXS Constitution` heading) documenting:
- Version change: 1.0.0 → 1.1.0
- Modified sections: Technology & Infrastructure Standards → Approved Stack table
- Added row: Animation / Framer Motion / latest / Landing + future apps
- Template compatibility: plan-template.md, spec-template.md, tasks-template.md all compatible (no structural changes)

**Rationale**: Per Constitution §Amendment Procedure, the Sync Impact Report documents all downstream effects. Since this is a pure addition (no principle change), template compatibility is maintained.

---

## AGENTS.md Update

**Decision**: Add Framer Motion to the approved packages section under `packages/ui` rules, documenting: approved for `apps/landing` only; other apps require a separate constitution amendment.

**Rationale**: Agents working on core-platform or shops-app must know framer-motion is not approved for their context.

---

## Constitution Re-check (post-design)

All Phase 1 decisions maintain compliance:
- Principle III: `animations.ts` is local to `apps/landing` — no cross-app sharing.
- Principle IV: All presets typed with `Variants` — zero `any`.

**Gate result**: PASS
