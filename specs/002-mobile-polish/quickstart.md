# Quickstart: Landing Page Mobile Polish

**Branch**: `002-mobile-polish` | **Date**: 2026-05-12

## Run Dev Server

```bash
pnpm --filter landing dev
# → http://localhost:3000
```

## Mobile Verification Checklist

Open DevTools → Toggle device toolbar → set width to **375px**.

### Navbar
- [ ] Logo is smaller on mobile (not taking up half the screen)
- [ ] Hamburger icon is visible and tappable (min 44px tap area)
- [ ] Tapping hamburger opens the mobile menu
- [ ] Each nav link has comfortable vertical padding (min 44px)
- [ ] "Get Started" button is full-width in the mobile menu
- [ ] Tapping a nav link closes the menu and scrolls to section
- [ ] No horizontal scrollbar in the navbar

### Hero
- [ ] Headline is `text-4xl` (not larger) on mobile
- [ ] Single-column layout — no two-column grid at 375px
- [ ] CoreIllustration is hidden on mobile (text-only hero)
- [ ] CTA buttons stack vertically
- [ ] No horizontal overflow

### Features
- [ ] Cards are 1 per row at 375px
- [ ] Heading is readable (`text-3xl`)
- [ ] No horizontal overflow

### Apps
- [ ] Cards are 1 per row at 375px
- [ ] "Coming Soon" badge visible and not overlapping text
- [ ] No horizontal overflow

### Pricing
- [ ] Card fits within 375px viewport comfortably
- [ ] Card padding not cramped (`p-6` on mobile)
- [ ] "Get Started Free" button is full-width
- [ ] No horizontal overflow

### FAQ
- [ ] Each question is fully tappable (min 44px height)
- [ ] Questions expand and collapse correctly
- [ ] Answers wrap within viewport
- [ ] No horizontal overflow

### Footer
- [ ] Logo visible
- [ ] Link groups stack in 2-column grid
- [ ] Links are tappable
- [ ] Copyright readable
- [ ] No horizontal overflow

## Build Verification

```bash
pnpm --filter landing build
# Expect: zero TypeScript errors, zero ESLint errors
```

## Also Test At

- **320px** — smallest common mobile width
- **768px** — tablet breakpoint (md)
- **1280px** — desktop (verify nothing broke)
