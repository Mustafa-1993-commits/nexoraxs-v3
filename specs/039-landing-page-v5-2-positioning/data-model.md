# Data Model: Landing Page v5.2 Positioning

**Feature**: 039-landing-page-v5-2-positioning
**Date**: 2026-06-02

---

## Overview

No persisted data. All data models below are static content arrays defined in landing page source files. They represent the shape of the content, not database schemas.

---

## OS Product Card

Used in `apps/apps.tsx` — the products / Product Hub section.

```ts
interface OSProductCard {
  name: string;       // "Commerce OS", "Healthcare OS", etc.
  tagline: string;    // Short sub-label below the name
  description: string; // 1–2 sentence body
  badge?: string;     // "Coming Soon" if future product; absent for active
  icon: LucideIcon;   // Lucide icon component reference
  accent: string;     // Tailwind text-* color class for icon + tagline
  iconBg: string;     // Tailwind bg-*/15 class for icon container
  glow: string;       // rgba string for hover box-shadow glow
}
```

### Full OS Card Data

| # | name | tagline | badge | icon | accent |
|---|------|---------|-------|------|--------|
| 1 | Commerce OS | Commerce & Business Presets | — (active) | ShoppingBag | text-blue-300 |
| 2 | Healthcare OS | Healthcare Management | Coming Soon | Stethoscope | text-emerald-300 |
| 3 | HR OS | People & Workforce | Coming Soon | BriefcaseBusiness | text-violet-300 |
| 4 | CRM OS | Customer Relations | Coming Soon | UsersRound | text-cyan-300 |
| 5 | Gym OS | Fitness & Memberships | Coming Soon | Dumbbell | text-orange-300 |
| 6 | Maintenance OS | Field Service | Coming Soon | Wrench | text-pink-300 |

### Card Descriptions

**Commerce OS**
> "Sell, manage inventory, run POS, and serve customers — with presets for retail, restaurants, pharmacy, and more."

**Healthcare OS**
> "A planned Operating System for appointments, patient records, clinical workflows, and healthcare teams."

**HR OS**
> "A planned Operating System for employees, attendance, payroll, leaves, and HR workflows."

**CRM OS**
> "A planned Operating System for leads, deals, campaigns, and customer relationship workflows."

**Gym OS**
> "A planned Operating System for gym members, memberships, trainers, classes, and renewals."

**Maintenance OS**
> "A planned Operating System for repair centers, tickets, technicians, warranties, and service operations."

---

## Nav Link

Used in `navbar/navbar.tsx` and `footer/footer.tsx`.

```ts
interface NavLink {
  label: string; // Display text in navigation
  href: string;  // Anchor or URL
}
```

### Updated Nav Links (navbar)

| label | href |
|-------|------|
| Features | #features |
| **Products** | **#products** |
| Pricing | #pricing |
| FAQ | #faq |

### Updated Footer Product Links

| label | href |
|-------|------|
| Features | #features |
| **Products** | **#products** |
| Pricing | #pricing |

---

## Feature Pill (Hero)

Used in `hero/hero.tsx`.

```ts
type FeaturePill = string;
```

### Updated Pills

```ts
const featurePills = [
  "Business Operating Platform",
  "6 Operating Systems planned",
  "Commerce OS — available now",
];
```

---

## Platform Tile

Used in `platform/platform.tsx` — the right-panel tile list.

```ts
type PlatformTile = string; // OS name for display tile
```

### Updated Tile List

```ts
const appTiles = [
  "Commerce OS",
  "Healthcare OS",
  "HR OS",
  "CRM OS",
  "Gym OS",
  "Maintenance OS",
];
```

---

## State Transitions

Not applicable — all content is static. No user-driven state changes are introduced. Existing animated states (splashDone, isInView, menuOpen, hover) remain unchanged.
