# Contract: OS Product Card — Landing Page

**Feature**: 039-landing-page-v5-2-positioning
**Date**: 2026-06-02
**Consumer**: `apps/landing/src/sections/apps/apps.tsx`

---

## Purpose

Defines the required shape and constraints for an OS product card displayed in the landing page Product Hub section. This contract governs how Operating Systems are represented in public marketing copy.

---

## Contract: `OSProductCard`

```ts
interface OSProductCard {
  name: string;        // Required. Full OS display name. MUST use "OS" suffix, e.g. "Commerce OS"
  tagline: string;     // Required. 2–4 word sub-label. Describes the domain at a glance.
  description: string; // Required. 1–2 sentences. Tone: plain English, non-technical.
  badge?: string;      // Optional. "Coming Soon" for future products. Absent for active products.
  icon: LucideIcon;    // Required. Lucide icon appropriate to domain.
  accent: string;      // Required. Tailwind text-*-300 color class. Must be unique per card.
  iconBg: string;      // Required. Tailwind bg-*-500/15 class. Must match accent hue.
  glow: string;        // Required. rgba(...) hover glow. Must match accent hue.
}
```

---

## Naming Rules

| Rule | Example |
|------|---------|
| Name MUST end in "OS" | "Commerce OS" ✅ — "Shops" ❌ — "CRM" ❌ |
| Name MUST NOT use legacy code labels | "Clinics" ❌ — "Shops" ❌ — "Restaurants" ❌ |
| Badge MUST be exactly "Coming Soon" or absent | "Soon" ❌ — "Planned" ❌ |
| Only one card may have no badge (the active product) | Commerce OS = active; all others = Coming Soon |

---

## Active Product Card Rules

- Exactly one card has no `badge` field — this is the active/available product.
- The active card is shown at position 1 (first card) in the array.
- Active cards have hover interactions (scale, box-shadow glow).
- Coming Soon cards are rendered at reduced opacity with a blur overlay; no hover scale.

---

## Description Tone Guidelines

| Tone | Example |
|------|---------|
| ✅ Plain, action-first | "Sell, manage inventory, run POS…" |
| ✅ Planned prefix for future products | "A planned Operating System for…" |
| ❌ Technical jargon | "RESTful API-driven inventory sync…" |
| ❌ Developer language | "Module with hooks for…" |

---

## Color Uniqueness Constraint

Each card must use a distinct Tailwind color family. No two active cards may share the same accent color family.

| OS | Accent family |
|----|---------------|
| Commerce OS | blue |
| Healthcare OS | emerald |
| HR OS | violet |
| CRM OS | cyan |
| Gym OS | orange |
| Maintenance OS | pink |

---

## Adding Future OS Products

When a new OS is added to the platform roadmap and needs a card:
1. Pick an unused Tailwind color family for accent/glow.
2. Set `badge: "Coming Soon"`.
3. Name must end in "OS".
4. Add at the end of the array; Commerce OS always stays at position 1.
