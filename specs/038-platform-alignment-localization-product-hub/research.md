# Research: Platform Alignment — Localization Foundation & Product Hub

**Date**: 2026-06-02
**Branch**: `038-platform-alignment-localization-product-hub`

---

## R-01: Localization utility pattern

**Decision**: Thin `lib/locale.ts` utility — not a full i18n framework.

**Rationale**: No i18n framework exists anywhere in the monorepo (confirmed by searching for `i18n`, `locale`, `messages`, `translations` files — zero results). The spec explicitly states "Do not build a full i18n system unless required by the current project structure." A thin wrapper provides the translation hook without runtime/build overhead.

**Pattern**:
```ts
export type Locale = "en" | "ar";
const LOCALE_KEY = "nexoraxs_locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return (sessionStorage.getItem(LOCALE_KEY) as Locale) ?? "en";
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

New UI strings use: `t("product_hub.title")` where `t` returns the English string from a flat map. When Arabic translations are added, only the map values change — call sites are already wired.

**Alternatives considered**:
- `next-intl` — rejected: requires `[locale]` route segment restructuring; too invasive for a UI/mock spec
- `react-i18next` — rejected: same reasons plus SSR hydration complexity
- Raw hardcoded strings — rejected: violates Article XI of the NexoraXS Constitution

---

## R-02: RTL/LTR with Tailwind v4

**Decision**: Client `LocaleProvider` sets `document.documentElement.dir` at hydration. New layout code uses Tailwind v4 logical utilities.

**Tailwind v4 RTL support confirmed**:
- Logical utilities ship built-in: `ms-`, `me-`, `ps-`, `pe-`, `rounded-s-`, `rounded-e-`, `text-start`, `text-end`, `border-s`, `border-e`
- `[dir="rtl"]:` variant available for one-off overrides
- No plugin or config required — Tailwind v4 uses cascade layers and CSS variables; logical properties work by reading the inherited `direction` CSS property

**LocaleProvider pattern** (Next.js App Router compatible):
```tsx
"use client";
import { useEffect, useSyncExternalStore } from "react";
import { getLocale, subscribeToLocale } from "@/lib/locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocale, () => "en");

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
```

Root `layout.tsx` stays a Server Component — only wraps children in `<LocaleProvider>`.

**LanguageSwitcher placement**: Topbar right-side (between search bar and notification bell). Renders as two pills: `EN | AR`. On mobile, may collapse to a globe icon + current locale abbreviation.

**Alternatives considered**:
- Full `[locale]` segment routing — rejected: restructures all routes, premature for mock phase
- CSS `html.rtl` class toggle — rejected: Tailwind logical utilities respond to the `dir` HTML attribute directly; no class needed

---

## R-03: OS catalogue data shape

**Decision**: Replace `App` with `OSItem`; replace `mockApps` export with `mockOS`; update `AppStatus` to `OSState`.

**Current state** (confirmed by reading source):
```ts
// lib/types.ts
export type AppStatus = "active" | "enable" | "upgrade" | "coming-soon";

// lib/mock-data/apps.ts — current 5 entries
// Shops (active), Clinics (coming-soon), Maintenance (coming-soon),
// Restaurants (coming-soon), CRM (upgrade)
```

**New OSState values needed for this spec**: `"active"`, `"coming-soon"`. `"trial"` and `"locked"` are defined for future use.

**Backward compatibility**: `AppStatus` is kept as a deprecated alias → `type AppStatus = OSState` in `types.ts` to avoid breaking any code that still imports it. The `"enable"` and `"upgrade"` values are removed from the type since no OS card in the new catalogue uses them. If something breaks, it will be caught at TypeScript compile time — fixable in the same PR.

**New catalogue** (6 entries in fixed order):
| id | name | state | href |
|---|---|---|---|
| `commerce` | Commerce OS | `active` | `SHOPS_URL` |
| `healthcare` | Healthcare OS | `coming-soon` | — |
| `hr` | HR OS | `coming-soon` | — |
| `crm` | CRM OS | `coming-soon` | — |
| `gym` | Gym OS | `coming-soon` | — |
| `maintenance` | Maintenance OS | `coming-soon` | — |

"Restaurants" is removed. Not an OS per v5.2 architecture.

---

## R-04: Logo component update

**Decision**: Keep `LogoApp = "core" | "shops"` internal prop. Update rendered text `"Shops"` → `"Commerce OS"` inside `ShopsLogo`.

**Confirmed current state** (reading `packages/ui/src/components/Logo.tsx`):
- `ShopsLogo` renders: `<span>Shops</span>` — this is the user-visible string that must change
- `LogoApp = "core" | "shops"` — internal prop, used by `apps/shops-app` as `<Logo app="shops" />`

Renaming the prop value to `"commerce"` would require updating every `<Logo app="shops" />` call site in `apps/shops-app`. That is a rename refactor outside this spec's scope. The rendered text is what the user sees; the prop value is internal infrastructure.

---

## R-05: Commerce OS preset additions

**Decision**: Add `"pharmacy"` and `"restaurant"` to `BusinessType` in `lib/mode.ts`; add options to `StepBusinessAndSales.tsx`; add labels to `StepReview.tsx`.

**Confirmed current preset list** (reading `StepBusinessAndSales.tsx`):
```
mobile, electronics, clothing, food-beverage, books-media,
home-furniture, cosmetics, supermarket, other
```

**Missing per v5.2** (AGENTS.md Section 12 Commerce Presets):
- Pharmacy ← add as `"pharmacy"` with emoji 💊
- Restaurant / Cafe ← add as `"restaurant"` with emoji 🍽️ (distinct from existing `"food-beverage"`)

**Not in Commerce OS** — confirmed absent and must stay absent:
- Gym ← Gym OS (future standalone OS)
- Healthcare / Clinic ← Healthcare OS (future standalone OS)

**`food-beverage` retention**: kept unchanged. Sessions with `shops_business_type=food-beverage` in session storage must still work. The new `"restaurant"` type is a more specific option for restaurant/cafe businesses.

**Confirmed `BUSINESS_TYPE_LABEL` in StepReview.tsx** has no entries for `"pharmacy"` or `"restaurant"` — must add both.

---

## R-06: Topbar and terminology cleanup

**Confirmed affected strings** (from source reads):

| File | Current string | Replacement |
|---|---|---|
| `Topbar.tsx` titles map | `"App Launcher"` | `"Product Hub"` |
| `dashboard/page.tsx` | `"NexoraXS Shops"` (p tag) | `"Commerce OS"` |
| `dashboard/page.tsx` | `"// enabled apps"` comment chip | `"// active os"` or `"// operating systems"` |
| `activity.ts` | `"enabled the CRM app"` | `"activated CRM OS"` |
| `activity.ts` | `"invited 3 team members to Shops"` | `"invited 3 team members to Commerce OS"` |
| `onboarding/page.tsx` | `"Choose your apps"` (Step 2 heading) | `"Choose your operating systems"` |
| `onboarding/page.tsx` | `appCards` with "NexoraXS Shops", "NexoraXS Clinics", etc. | New OS card list |
| `onboarding/page.tsx` | `"Enabled apps"` (Step 3 summary label) | `"Active OS"` |
| `onboarding/page.tsx` | `shopsEnabled ? "Shops" : "None selected"` (summary value) | `"Commerce OS"` |
| `EnableModal.tsx` | `"This app will be activated for your workspace"` | `"This operating system will be activated for your workspace"` |
| `shops-app/app/layout.tsx` | `title: "NexoraXS Shops"` | `title: "Commerce OS"` |
| `shops-app/app/layout.tsx` | `description: "NexoraXS Business Operating System — Shops"` | `description: "NexoraXS — Commerce OS"` |
