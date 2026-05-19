# Data Model: Landing Page Full Polish

**Phase**: 1 | **Branch**: `034-landing-page-polish` | **Date**: 2026-05-17

No new data entities — this is a pure UI/animation feature. The existing data structures in each section remain unchanged. This file documents the animation state contracts and CSS token additions.

---

## Animation State Contracts

### Navbar Scroll State

```typescript
// In navbar.tsx
const [scrolled, setScrolled] = useState(false);
// scrolled = true when window.scrollY > 50
// scrolled = false when window.scrollY <= 50
```

### Navbar Mobile Menu State

```typescript
// In navbar.tsx (existing, unchanged)
const [menuOpen, setMenuOpen] = useState(false);
// menuOpen = true: AnimatePresence renders the menu (slides in)
// menuOpen = false: AnimatePresence removes the menu (slides out, then unmounts)
```

### FAQ Open State

```typescript
// In faq.tsx (existing, unchanged type)
const [openIndex, setOpenIndex] = useState<number | null>(0);
// openIndex = null: all items closed
// openIndex = N: item at index N is open (others are closed)
// Transition: Framer Motion height 0 → auto / auto → 0
```

---

## CSS Token Additions (globals.css)

```css
/* New keyframe animations */
@keyframes floating-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.08); }
  66%       { transform: translate(-15px, 15px) scale(0.95); }
}

@keyframes float-y {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

/* Animation utility classes */
.animate-orb-slow   { animation: floating-orb 12s ease-in-out infinite; }
.animate-orb-medium { animation: floating-orb 15s ease-in-out infinite 3s; }
.animate-orb-fast   { animation: floating-orb 18s ease-in-out infinite 6s; }
.animate-float      { animation: float-y 4s ease-in-out infinite; }

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .animate-orb-slow,
  .animate-orb-medium,
  .animate-orb-fast,
  .animate-float { animation: none; }
}
```

---

## Section-by-Section Animation Spec

### Navbar
- **Scroll threshold**: 50px
- **Transition**: `transition-all duration-300` on the header element
- **Mobile menu**: `height: 0 → auto`, `opacity: 0 → 1`, duration: 0.25s
- **Nav link hover**: underline slide-in via CSS `after:` pseudo-element or Tailwind `hover:underline` + `underline-offset`
- **CTA hover**: `hover:shadow-[0_0_24px_rgba(99,102,241,0.6)] transition-shadow duration-300`

### Hero
- **Orbs**: 3 CSS-animated blobs (purple 400×400px, blue 320×320px, cyan 280×280px), `blur-[120px]`, positioned with `absolute`
- **Headline**: `staggerContainer` parent, each word is `motion.span inline-block`, `fadeInUp` variant, triggered after `splashDone`
- **Subheadline**: `fadeIn` variant with delay `0.3s` after headline
- **CTA group**: `staggerContainer` with `fadeInUp` per button, starts after subheadline
- **Badges**: `staggerContainer` with `fadeInUp` per badge
- **Illustration side**: wrap `CoreIllustration` in `motion.div` with `animate-float` CSS class for subtle floating

### Features
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Title + subtitle**: `fadeInUp` when in view
- **Grid**: `staggerContainer` with `fadeInUp` per card, `staggerChildren: 0.08`
- **Card hover**: `hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] transition-all duration-300`

### Platform
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Left block**: `slideInLeft` variant
- **Right block**: `slideInRight` variant
- **Arrow**: `fadeIn` variant with delay

### Apps
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Cards**: `staggerContainer` with `scaleIn` variant (see below)
- **scaleIn**: `hidden: { opacity: 0, scale: 0.9 }`, `visible: { opacity: 1, scale: 1 }`
- **Available card hover**: `hover:scale-[1.03] hover:shadow-[0_8px_40px_{app.glow}]`
- **Coming-soon overlay**: `absolute inset-0 bg-[#0a0a0f]/40 backdrop-blur-[2px] rounded-[inherit] z-10`

### Pricing
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Cards**: `staggerContainer` + `fadeInUp`
- **Featured badge text change**: "Beta Early-Bird" → "Early Access — Free"
- **Featured card**: existing `ring-purple-500/30` enhanced with additional `shadow-[0_0_40px_rgba(124,58,237,0.15)]`

### FAQ
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Items**: `staggerContainer` + `fadeInUp` per item
- **Accordion content**: `AnimatePresence` + `motion.div` with `height: 0 → auto`
- **Chevron**: existing CSS `rotate-180` (keep as-is — already works)
- **Transition**: `duration: 0.3, ease: "easeInOut"`

### CTA
- **Section**: `useInView({ once: true, amount: 0.1 })`
- **Title**: `fadeInUp`
- **Subtitle**: `fadeInUp` with small delay
- **Button group**: `staggerContainer` + `fadeInUp`

### Footer
- **Replace**: `border-t border-white/10` → gradient `div` `h-px bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-cyan-500/40`
- **Logo**: `logo-bottom.png` → `logo-top.png`, `width={160}`
- **Links**: already have `transition-colors hover:text-white` (keep)

---

## New Variant: scaleIn (for Apps section)

```typescript
// To add inline in apps.tsx (not in shared animations.ts — too specific)
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```
