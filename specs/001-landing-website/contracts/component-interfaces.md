# Component Interfaces: NexoraXS Landing Website

**Branch**: `001-landing-website` | **Date**: 2026-05-12
**Purpose**: Define the public interface (props) of every section component.
All sections are default exports. All types are inlined — no shared type file
needed for a single-page app of this size.

---

## Navbar

```tsx
// apps/landing/src/sections/navbar/navbar.tsx
// "use client" — mobile menu requires useState

// No props — all content is static and self-contained
export default function Navbar(): JSX.Element
```

**Internal state**:
```ts
const [menuOpen, setMenuOpen] = useState(false);
```

**Renders**:
- Logo (`/branding/logo-top.png`) via `next/image`
- Desktop nav links: Features, Apps, Pricing, FAQ (each `href="#<id>"`)
- "Get Started" CTA button (`href` → core-platform URL or `#`)
- Mobile hamburger button (visible on `< md`)
- Mobile slide-down menu (visible when `menuOpen === true`)

---

## Hero

```tsx
// apps/landing/src/sections/hero/hero.tsx
// Server Component (no interactivity needed)

// No props — static content
export default function Hero(): JSX.Element
```

**Renders**:
- `<section id="hero">` with 2-column grid (text + image)
- Headline + subheadline + 2 CTA buttons
- `Splash.png` via `next/image` with blue glow shadow

---

## Features

```tsx
// apps/landing/src/sections/features/features.tsx
// Server Component

// No props — content defined in local const
export default function Features(): JSX.Element
```

**Internal data**: Array of `FeatureCard` (6 items, see data-model.md)
**Renders**: Section with `id="features"`, heading, 3-column card grid on md+

---

## Apps

```tsx
// apps/landing/src/sections/apps/apps.tsx
// Server Component

// No props — content defined in local const
export default function Apps(): JSX.Element
```

**Internal data**: Array of `AppCard` (5 items, see data-model.md)
**Renders**: Section with `id="apps"`, heading, responsive card grid; optional
badge pill ("Coming Soon") on unavailable apps

---

## Pricing

```tsx
// apps/landing/src/sections/pricing/pricing.tsx
// Server Component

// No props
export default function Pricing(): JSX.Element
```

**Renders**: Section with `id="pricing"`, heading, "Coming Soon" placeholder
centred in the section. Full plan cards are deferred (see data-model.md for
the `PricingPlan` type when ready).

---

## FAQ

```tsx
// apps/landing/src/sections/faq/faq.tsx
// Server Component — uses native <details>/<summary> (no JS needed)

// No props — content defined in local const
export default function FAQ(): JSX.Element
```

**Internal data**: Array of `FAQItem` (6 items, see data-model.md)
**Renders**: Section with `id="faq"`, heading, list of `<details>` elements.
Each `<details>` contains a styled `<summary>` (question) and a paragraph
(answer). CSS transition via Tailwind on open state.

---

## Footer

```tsx
// apps/landing/src/sections/footer/footer.tsx
// Server Component

// No props
export default function Footer(): JSX.Element
```

**Renders**:
- Logo (`/branding/logo-bottom.png`) via `next/image`
- Grouped nav links: Product (Features, Apps, Pricing), Company (About, Contact), Legal (Privacy, Terms)
- Copyright line: `© 2026 NexoraXS. All rights reserved.`

---

## Page Composition

```tsx
// apps/landing/src/app/page.tsx
// Server Component — composes sections only, no logic

import Navbar from "../sections/navbar/navbar";
import Hero from "../sections/hero/hero";
import Features from "../sections/features/features";
import Apps from "../sections/apps/apps";
import Pricing from "../sections/pricing/pricing";
import FAQ from "../sections/faq/faq";
import Footer from "../sections/footer/footer";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Apps />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
```
