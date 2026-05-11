# Research: NexoraXS Landing Website

**Branch**: `001-landing-website` | **Date**: 2026-05-12
**Phase**: 0 — Unknowns resolved before design begins

---

## Stack Audit

**Decision**: Retain the existing stack exactly as-is — no new dependencies.
**Rationale**: User constraint; stack already covers all needs. Next.js 16 + React 19 + TypeScript 5 + Tailwind 4 is sufficient for a static marketing page.
**Alternatives considered**: Adding Framer Motion for animations (rejected — new package), Headless UI for accordion (rejected — new package).

---

## FAQ Accordion — Interaction Without a Package

**Decision**: Implement accordion with React `useState` inside a `"use client"` component.
**Rationale**: Tailwind 4 provides no built-in disclosure pattern. `useState` is the minimal built-in solution that keeps the rule of zero new packages.
**Pattern**:
```tsx
"use client";
import { useState } from "react";

// Track open index; clicking the same index again collapses it
const [openIndex, setOpenIndex] = useState<number | null>(null);
const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
```
**Alternatives considered**: `<details>`/`<summary>` HTML elements (simpler, no JS needed, chosen as the fallback for JS-disabled browsers per spec edge case). We will use `<details>`/`<summary>` with a Tailwind override for consistent styling — this requires zero JS and degrades gracefully.

**Final decision**: Use native `<details>`/`<summary>` elements styled with Tailwind. No `useState` needed. Collapses gracefully without JS.

---

## Smooth Scroll — No JS Required

**Decision**: Use CSS `scroll-behavior: smooth` on the `<html>` element via Tailwind's `scroll-smooth` class.
**Rationale**: Modern browsers support it natively. Applied once in `globals.css` or on the `<html>` tag in `layout.tsx`. Nav anchor links (`href="#features"`) work automatically.
**Alternatives considered**: `window.scrollTo({ behavior: 'smooth' })` in JS (unnecessary complexity).

---

## Accent Colours — Tailwind 4 Approach

**Decision**: Use Tailwind utility classes `blue-500/600`, `purple-500/600`, `cyan-400/500` directly. Define the dark background `#0a0a0f` as a fixed class in `globals.css` for the body.
**Rationale**: Tailwind 4 ships these colours. No custom config needed.

---

## Mobile Navbar — No JS Required

**Decision**: Use a pure CSS checkbox-toggle hamburger pattern or, given simplicity, hide nav links on mobile with `hidden md:flex` and show a minimal hamburger icon that reveals links via a CSS-only `:peer-checked` pattern.

**Revised decision**: For readability and beginner-friendliness (spec requirement), use a `"use client"` component with `useState` for the mobile menu toggle. This is the least surprising pattern for a Next.js project.
**Rationale**: Pure CSS hamburger menus are unintuitive to read and maintain. A simple boolean state is more beginner-friendly.

---

## Section ID Strategy

Each section gets a stable `id` attribute matching its nav link hash:

| Section  | id         | Nav href     |
|----------|-----------|--------------|
| Features | `features` | `#features`  |
| Apps     | `apps`     | `#apps`      |
| Pricing  | `pricing`  | `#pricing`   |
| FAQ      | `faq`      | `#faq`       |

---

## Existing Code Assessment

| File | Status | Action |
|------|--------|--------|
| `navbar.tsx` | Partial | Add Apps + FAQ links; add anchor hrefs; add mobile menu |
| `hero.tsx` | Good | Minor polish — update button labels to match spec |
| `features.tsx` | Partial | Add icons (SVG inline or Unicode emoji placeholder); real descriptions |
| `footer.tsx` | Minimal | Add logo image; add grouped nav links |
| `apps.tsx` | Missing | Create new |
| `pricing.tsx` | Missing | Create new |
| `faq.tsx` | Missing | Create new |
| `globals.css` | Needs update | Add dark background + scroll-smooth |
| `layout.tsx` | Needs update | Update metadata title/description |
| `page.tsx` | Needs update | Import and compose new sections |
