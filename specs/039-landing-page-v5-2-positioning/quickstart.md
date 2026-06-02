# Quickstart: Landing Page v5.2 Positioning

**Feature**: 039-landing-page-v5-2-positioning
**Date**: 2026-06-02

---

## What This Changes

7 files in `apps/landing/src/sections/`. All changes are copy/content — no new components, no new dependencies, no configuration changes.

---

## File-by-File Change Guide

### 1. `hero/hero.tsx`

**Headline** — Update the `headline` constant and adjust the gradient start index:
```
// Old
"Business operations, connected by one modular core"
// gradient starts at word index of "modular"

// New
"The Business Operating Platform for every business domain"
// gradient starts at word index of "Business" in "Business Operating Platform"
// (words 1-3: "Business", "Operating", "Platform" — index 1, 2, 3)
```

**Description paragraph** — Replace:
```
// Old
NexoraXS is an MVP-stage modular SaaS platform for workspaces,
shared authentication, app launching, and future business apps
built around a single platform shell.

// New
NexoraXS is a Business Operating Platform — a shared foundation
powering independent Operating Systems for Commerce, Healthcare,
HR, CRM, Gym, and Maintenance.
```

**Feature pills** — Replace the `featurePills` array:
```ts
// Old
["Modular SaaS architecture", "Workspace-based platform", "Built for future apps"]

// New
["Business Operating Platform", "6 Operating Systems planned", "Commerce OS — available now"]
```

---

### 2. `navbar/navbar.tsx`

**Nav link** — Update the `navLinks` array entry:
```ts
// Old
{ label: "Apps", href: "#apps" }

// New
{ label: "Products", href: "#products" }
```

---

### 3. `apps/apps.tsx`

**Section element** — Update the section `id`:
```tsx
// Old
<motion.section id="apps" ...>

// New
<motion.section id="products" ...>
```

**Section chip**:
```tsx
// Old
{"// app launcher"}

// New
{"// product hub"}
```

**Section heading**:
```tsx
// Old
<h2>Our Apps</h2>

// New
<h2>Product Hub</h2>
```

**Section subheading**:
```tsx
// Old
One platform. Multiple business tools. All under one login.

// New
One platform. Multiple Operating Systems. All under one login.
```

**Add icons** — Import `BriefcaseBusiness` and `Dumbbell` from lucide-react (keep existing imports, add new ones):
```ts
import { ShoppingBag, Stethoscope, UsersRound, Wrench, BriefcaseBusiness, Dumbbell } from "lucide-react";
```
> Note: If `BriefcaseBusiness` is not available in the installed version, use `Briefcase` as a fallback.

**Remove `Utensils` import** — Restaurants card is removed; `Utensils` is no longer needed.

**Replace the `apps` array** — Full replacement per data-model.md:
```ts
const apps: AppCard[] = [
  {
    name: "Commerce OS",
    tagline: "Commerce & Business Presets",
    description: "Sell, manage inventory, run POS, and serve customers — with presets for retail, restaurants, pharmacy, and more.",
    icon: ShoppingBag,
    accent: "text-blue-300",
    iconBg: "bg-blue-500/15",
    glow: "rgba(59, 130, 246, 0.22)",
  },
  {
    name: "Healthcare OS",
    tagline: "Healthcare Management",
    description: "A planned Operating System for appointments, patient records, clinical workflows, and healthcare teams.",
    badge: "Coming Soon",
    icon: Stethoscope,
    accent: "text-emerald-300",
    iconBg: "bg-emerald-500/15",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    name: "HR OS",
    tagline: "People & Workforce",
    description: "A planned Operating System for employees, attendance, payroll, leaves, and HR workflows.",
    badge: "Coming Soon",
    icon: BriefcaseBusiness,
    accent: "text-violet-300",
    iconBg: "bg-violet-500/15",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    name: "CRM OS",
    tagline: "Customer Relations",
    description: "A planned Operating System for leads, deals, campaigns, and customer relationship workflows.",
    badge: "Coming Soon",
    icon: UsersRound,
    accent: "text-cyan-300",
    iconBg: "bg-cyan-500/15",
    glow: "rgba(6, 182, 212, 0.2)",
  },
  {
    name: "Gym OS",
    tagline: "Fitness & Memberships",
    description: "A planned Operating System for gym members, memberships, trainers, classes, and renewals.",
    badge: "Coming Soon",
    icon: Dumbbell,
    accent: "text-orange-300",
    iconBg: "bg-orange-500/15",
    glow: "rgba(249, 115, 22, 0.2)",
  },
  {
    name: "Maintenance OS",
    tagline: "Field Service",
    description: "A planned Operating System for repair centers, tickets, technicians, warranties, and service operations.",
    badge: "Coming Soon",
    icon: Wrench,
    accent: "text-pink-300",
    iconBg: "bg-pink-500/15",
    glow: "rgba(236, 72, 153, 0.2)",
  },
];
```

---

### 4. `platform/platform.tsx`

**Section heading**:
```tsx
// Old
One Core. Many Apps.

// New
One Core. Six Operating Systems.
```

**Section description**:
```tsx
// Old
NexoraXS separates the shared platform shell from focused business
apps, so workspaces, authentication, billing, and app access stay
in one core while each app can serve its own domain.

// New
NexoraXS separates the shared Core Platform from independent Operating
Systems — so workspaces, authentication, billing, and OS access stay
in one core while each Operating System owns its domain.
```

**"App Satellites" label**:
```tsx
// Old
<p className="mono-chip text-cyan-200">App Satellites</p>

// New
<p className="mono-chip text-cyan-200">Operating Systems</p>
```

**Tile list**:
```ts
// Old
const appTiles = ["Shops", "Clinics", "Maintenance", "Restaurants", "CRM"];

// New
const appTiles = ["Commerce OS", "Healthcare OS", "HR OS", "CRM OS", "Gym OS", "Maintenance OS"];
```

---

### 5. `features/features.tsx`

Two description-only changes:

**"Modular Architecture" card**:
```ts
// Old
description: "Start with the platform core, then add focused business apps as the product expands."

// New
description: "Start with the Core Platform, then activate independent Operating Systems as your business grows."
```

**"Workspace Management" card**:
```ts
// Old
description: "Keep teams, billing, and enabled apps organized around workspace boundaries."

// New
description: "Keep teams, billing, and enabled Operating Systems organized around workspace boundaries."
```

---

### 6. `cta/cta.tsx`

**Description**:
```tsx
// Old
Explore the MVP path for a workspace-based platform with modular apps.

// New
Explore Commerce OS — the first Operating System available on the platform.
```

**Secondary button**:
```tsx
// Old
href="#apps"
label: "Explore Apps"

// New
href="#products"
label: "Explore Products"
```

---

### 7. `footer/footer.tsx`

**Footer link in "Product" group**:
```ts
// Old
{ label: "Apps", href: "#apps" }

// New
{ label: "Products", href: "#products" }
```

---

## Verification Checklist

After implementation, verify:

- [ ] `grep -r '"Shops"' apps/landing/src` → 0 results
- [ ] `grep -r '"Clinics"' apps/landing/src` → 0 results
- [ ] `grep -r '"Restaurants"' apps/landing/src` → 0 results
- [ ] `grep -r '#apps' apps/landing/src` → 0 results
- [ ] `grep -r '"Apps"' apps/landing/src` → 0 results (except aria-label if any)
- [ ] Landing page loads without TypeScript errors (`pnpm --filter landing build`)
- [ ] Navbar "Products" link scrolls to the product section
- [ ] Footer "Products" link scrolls to the product section
- [ ] CTA "Explore Products" button scrolls to the product section
- [ ] 6 product cards are visible in the products section
- [ ] Commerce OS card has no "Coming Soon" badge
- [ ] 5 future OS cards each have a "Coming Soon" badge
- [ ] Hero headline contains "Business Operating Platform"
- [ ] No layout/animation regressions on desktop and mobile viewports
