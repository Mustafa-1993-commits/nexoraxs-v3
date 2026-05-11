# Quickstart: NexoraXS Landing Website

**Branch**: `001-landing-website` | **Date**: 2026-05-12

## Prerequisites

- Node.js 20+
- pnpm 9.15.9+
- Repo cloned, on branch `001-landing-website`

## Run Dev Server

```bash
# From monorepo root
pnpm install
pnpm --filter landing dev
# → http://localhost:3000
```

## Verify All Sections Load

Open http://localhost:3000 and scroll through:

- [ ] Navbar with logo and 4 nav links visible
- [ ] Hero with headline, subheadline, Splash.png, and CTA buttons
- [ ] Features section with 6 cards (icon + title + description)
- [ ] Apps section with 5 app cards
- [ ] Pricing section with "Coming Soon" message
- [ ] FAQ section with 6 expandable questions
- [ ] Footer with logo, grouped links, and copyright

## Verify Smooth Scroll

Click each navbar link (Features, Apps, Pricing, FAQ) — page should scroll
smoothly to the correct section.

## Verify Mobile Layout

Open DevTools → responsive mode → 375px width:
- [ ] Navbar collapses to hamburger menu
- [ ] Hamburger opens/closes mobile menu
- [ ] Hero stacks text above image
- [ ] Feature cards stack to single column
- [ ] App cards stack to single column or 2 columns
- [ ] FAQ items are tappable and expand/collapse
- [ ] Footer stacks links vertically

## Run Build

```bash
# From monorepo root
pnpm --filter landing build
# Expect: zero TypeScript errors, zero ESLint errors, build succeeds
```

## File Locations

| Section   | File path |
|-----------|-----------|
| Page      | `apps/landing/src/app/page.tsx` |
| Layout    | `apps/landing/src/app/layout.tsx` |
| CSS       | `apps/landing/src/app/globals.css` |
| Navbar    | `apps/landing/src/sections/navbar/navbar.tsx` |
| Hero      | `apps/landing/src/sections/hero/hero.tsx` |
| Features  | `apps/landing/src/sections/features/features.tsx` |
| Apps      | `apps/landing/src/sections/apps/apps.tsx` |
| Pricing   | `apps/landing/src/sections/pricing/pricing.tsx` |
| FAQ       | `apps/landing/src/sections/faq/faq.tsx` |
| Footer    | `apps/landing/src/sections/footer/footer.tsx` |
| Branding  | `apps/landing/public/branding/` |
