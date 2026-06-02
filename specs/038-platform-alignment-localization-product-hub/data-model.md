# Data Model: Platform Alignment — Localization Foundation & Product Hub

**Date**: 2026-06-02

---

## Core Platform — `OSItem`

Replaces the existing `App` interface in `apps/core-platform/lib/mock-data/apps.ts`.

```ts
// apps/core-platform/lib/types.ts

export type OSState = "active" | "coming-soon" | "trial" | "locked";

// Backward compatibility alias — do not use in new code
export type AppStatus = OSState;

export type { IconName } from "@nexoraxs/ui";
```

```ts
// apps/core-platform/lib/mock-data/apps.ts

import type { OSState } from "@/lib/types";

export interface OSItem {
  id: string;          // stable internal id: "commerce", "healthcare", "hr", "crm", "gym", "maintenance"
  name: string;        // user-facing display name
  description: string; // short user-facing description
  state: OSState;
  href?: string;       // only defined when state === "active"
}

const SHOPS_URL = process.env.NEXT_PUBLIC_SHOPS_APP_URL ?? "http://localhost:3002";

export const mockOS: OSItem[] = [
  {
    id: "commerce",
    name: "Commerce OS",
    description: "Retail, POS, inventory, and customer commerce operations.",
    state: "active",
    href: SHOPS_URL,
  },
  {
    id: "healthcare",
    name: "Healthcare OS",
    description: "Clinic, appointment, and patient management — coming soon.",
    state: "coming-soon",
  },
  {
    id: "hr",
    name: "HR OS",
    description: "Employee, payroll, attendance, and leave management — coming soon.",
    state: "coming-soon",
  },
  {
    id: "crm",
    name: "CRM OS",
    description: "Leads, pipelines, campaigns, and follow-ups — coming soon.",
    state: "coming-soon",
  },
  {
    id: "gym",
    name: "Gym OS",
    description: "Memberships, trainers, classes, and renewals — coming soon.",
    state: "coming-soon",
  },
  {
    id: "maintenance",
    name: "Maintenance OS",
    description: "Field service, repair tickets, and asset management — coming soon.",
    state: "coming-soon",
  },
];
```

**State transitions**:
```text
coming-soon → button disabled, card dimmed
active      → "Open →" button → navigate to href
trial       → (future; not rendered in this spec)
locked      → (future; not rendered in this spec)
```

---

## Core Platform — `Locale`

```ts
// apps/core-platform/lib/locale.ts

export type Locale = "en" | "ar";

const LOCALE_KEY = "nexoraxs_locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = sessionStorage.getItem(LOCALE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new Event("nexoraxs:locale-change"));
}

export function subscribeToLocale(cb: () => void): () => void {
  window.addEventListener("nexoraxs:locale-change", cb);
  return () => window.removeEventListener("nexoraxs:locale-change", cb);
}
```

Session storage key: `"nexoraxs_locale"` (distinct from all `shops_*` keys — no naming collision).

**Default**: `"en"` when key is absent or contains an unexpected value.

---

## Commerce OS — `BusinessType` extension

```ts
// apps/shops-app/lib/mode.ts (updated union)

export type BusinessType =
  | "mobile"
  | "electronics"
  | "clothing"
  | "food-beverage"   // retained for backward compat
  | "books-media"
  | "home-furniture"
  | "cosmetics"
  | "supermarket"
  | "pharmacy"        // NEW — Pharmacy Commerce preset
  | "restaurant"      // NEW — Restaurant / Cafe Commerce preset
  | "other"
  | "accessories";    // legacy — kept for backward compat, not shown in UI grid
```

**Label additions** for `BUSINESS_TYPE_LABEL` in `StepReview.tsx`:
```ts
pharmacy:   "Pharmacy",
restaurant: "Restaurant / Cafe",
```

**Option additions** for `BUSINESS_TYPES` array in `StepBusinessAndSales.tsx`:
```ts
{ id: "pharmacy",   emoji: "💊", label: "Pharmacy"          },
{ id: "restaurant", emoji: "🍽️", label: "Restaurant / Cafe" },
```

**No Gym, no Healthcare, no Clinic** entries in this array.

---

## Commerce OS — Locale utility (mirror)

```ts
// apps/shops-app/lib/locale.ts
// Same shape as apps/core-platform/lib/locale.ts
// Reuses the same "nexoraxs_locale" key so the preference set in
// Core Platform is read by Commerce OS in the same session.

export type Locale = "en" | "ar";
const LOCALE_KEY = "nexoraxs_locale";
export function getLocale(): Locale { ... }
export function setLocale(locale: Locale): void { ... }
export function subscribeToLocale(cb: () => void): () => void { ... }
```

Both apps share the same session storage key so that switching language in Core Platform persists when the user opens Commerce OS in the same browser session.
