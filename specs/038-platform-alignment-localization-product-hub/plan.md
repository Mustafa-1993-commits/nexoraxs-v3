# Implementation Plan: Platform Alignment — Localization Foundation & Product Hub

**Branch**: `038-platform-alignment-localization-product-hub` | **Date**: 2026-06-02 | **Spec**: [spec.md](./spec.md)

---

## Summary

Align the Core Platform and Commerce OS UIs with the NexoraXS v5.2 architecture in three coordinated areas:

1. **Product Hub** — rename the "App Launcher" page and sidebar nav item, rebuild the OS catalogue with the correct six OS entries, correct the dashboard and onboarding surfaces.
2. **Terminology** — purge "NexoraXS Shops" from all user-facing Core Platform strings; update Commerce OS browser metadata.
3. **Localization foundation** — add a language switcher (EN/AR), client-side RTL/LTR direction management, and a thin locale utility that makes every new string translation-ready.

All work is UI/mock only. No backend, no database, no billing.

---

## Technical Context

| Field | Value |
|---|---|
| Language/Version | TypeScript 5 (strict mode), React 19.2.4 |
| Framework | Next.js 16.2.6 (App Router) |
| Styling | TailwindCSS v4, logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`) |
| Component library | ShadCN UI via `packages/ui` |
| Storage | Browser `sessionStorage` only — no backend |
| Testing | No automated tests in scope (UI/mock phase) |
| Target platform | Web (modern browsers), desktop-first |
| Performance goal | Language direction switch visible within one render cycle (< 300 ms) |
| Constraints | No full i18n framework, no backend, no renamed session storage keys, no renamed internal code labels |
| Scope | ~16 files across `apps/core-platform`, `apps/shops-app`, `packages/ui` |
| Monorepo toolchain | pnpm + Turborepo |

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Gate question | Result | Notes |
|---|---|---|
| Does this belong to Core Platform or a specific OS? | ✅ PASS | Product Hub, language switcher, terminology → Core Platform. Preset alignment, metadata → Commerce OS. Clean split. |
| If Commerce, is it Core, Preset, or Module? | ✅ PASS | Pharmacy + Restaurant/Cafe are Preset alignment only. No new module or OS created. |
| Does it require Arabic/English and RTL/LTR support? | ✅ PASS | Yes — this spec *adds* the foundation. New strings are localizable by design. |
| What is Workspace / Business Unit / Branch scope? | ✅ PASS | Language preference is workspace-session level (session storage). No multi-tenancy concern. |
| Does it affect billing, plan limits, or access permissions? | ✅ PASS | No. Product Hub shows mock OS states only. No billing logic touched. |
| Does it create a cross-OS dependency? | ✅ PASS | No. Core Platform renders OS cards from internal mock data; no data exchange with Commerce OS. |
| Can it be implemented UI/mock first before backend? | ✅ PASS | Entire scope is UI/mock first. Session storage for locale. |

**No gate violations. Plan approved to proceed.**

---

## Project Structure

### Documentation (this feature)

```text
specs/038-platform-alignment-localization-product-hub/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── contracts/
│   └── os-item.md       ← Phase 1 output — internal OS data contract
├── quickstart.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks command)
```

### Source Code (affected paths)

```text
apps/core-platform/
├── lib/
│   ├── mock-data/
│   │   ├── apps.ts           → REPLACE data to OSItem[]; rename export to mockOS
│   │   ├── nav-items.ts      → UPDATE label "Apps" → "Product Hub"
│   │   └── activity.ts       → UPDATE mock strings removing "Shops", "CRM app"
│   ├── types.ts              → UPDATE AppStatus type; ADD OSState type
│   └── locale.ts             → NEW: Locale type, getLocale, setLocale, subscribe
├── app/
│   ├── layout.tsx            → ADD LocaleProvider wrapper around children
│   ├── onboarding/page.tsx   → UPDATE Step 2 heading, appCards, Step 3 summary label
│   └── dashboard/
│       ├── apps/page.tsx     → UPDATE heading/subtitle to "Product Hub"
│       └── page.tsx          → UPDATE "enabled apps" section, "NexoraXS Shops" entry
└── components/
    ├── LocaleProvider.tsx    → NEW: client component, sets dir/lang on documentElement
    └── dashboard/
        ├── AppCard.tsx       → UPDATE to support OSItem; rename prop type reference
        ├── Sidebar.tsx       → UPDATE nav label, ADD LanguageSwitcher in footer area
        ├── Topbar.tsx        → UPDATE titles map "App Launcher" → "Product Hub"
        └── EnableModal.tsx   → UPDATE copy ("app" → "operating system" where appropriate)

apps/shops-app/
├── app/layout.tsx            → UPDATE metadata title to "Commerce OS"
├── lib/mode.ts               → ADD "pharmacy", "restaurant" to BusinessType union + VALID array
└── components/onboarding/
    ├── StepBusinessAndSales.tsx → ADD pharmacy + restaurant/cafe presets; verify no gym/healthcare
    └── StepReview.tsx           → ADD entries to BUSINESS_TYPE_LABEL for new preset values

packages/ui/
└── src/components/
    └── Logo.tsx              → UPDATE ShopsLogo text "Shops" → "Commerce OS"
                                 (internal LogoApp="shops" prop kept for backward compat)
```

---

## Complexity Tracking

No constitution violations. No complexity justification needed.

---

## Phase 0: Research

*See [research.md](./research.md) for full findings. Summary below.*

### Decision 1 — Localization utility pattern

**Decision**: Thin `lib/locale.ts` utility (not a full i18n framework).

**Rationale**: No i18n framework exists in the project. Tailwind v4 + Next.js App Router support RTL natively via `dir` attribute. Adding `next-intl` or `react-intl` now would introduce build complexity, configuration overhead, and a route-segment requirement (`[locale]/` prefix) that touches every page. The spec explicitly says "Do not build a full i18n system unless required". A thin utility that returns the English string now but wraps every new string in a `t()` call provides the translation hook without the overhead. When a full framework is adopted in a future spec, the call sites already use `t("key")` and only the implementation changes.

**Shape**:
```ts
// apps/core-platform/lib/locale.ts
export type Locale = "en" | "ar";
const LOCALE_KEY = "nexoraxs_locale";
export function getLocale(): Locale { ... }
export function setLocale(l: Locale): void { ... }
export function subscribeToLocale(cb: () => void): () => void { ... }
```

A matching utility is added to `apps/shops-app/lib/locale.ts` using the same shape so Commerce OS can participate in locale switching when the language switcher is wired up.

**Alternatives considered**:
- `next-intl` — rejected: requires `[locale]` route segment restructuring across all pages; too invasive for a UI/mock spec.
- `react-i18next` — rejected: same reasons plus SSR hydration complexity.
- Inline hardcoded strings — rejected: violates Article XI of the constitution.

---

### Decision 2 — RTL/LTR approach with Tailwind v4

**Decision**: `LocaleProvider` client component sets `document.documentElement.dir` at hydration and on locale change. New layout code uses Tailwind v4 logical utilities (`ms-`, `me-`, `ps-`, `pe-`).

**Rationale**: Tailwind v4 ships logical property utilities built-in (no plugin needed). Setting `dir="rtl"` on `<html>` is the correct CSS cascade anchor — all logical utilities and the browser's native bidirectional text handling respond to it automatically. Because the Next.js App Router root layout is a Server Component, `lang` and `dir` must be set server-side for SSR or patched client-side. For an MVP mock-only spec with session storage persistence, the client-side patch (`useEffect → document.documentElement.dir = ...`) is the right tradeoff. SSR-correct `lang` can be added when a backend session exists.

**Shape**:
```tsx
// apps/core-platform/components/LocaleProvider.tsx
"use client";
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // reads session storage, sets document.documentElement.dir and .lang
  // subscribes to locale changes
}
```

**The `LanguageSwitcher` component**:
- Placed in the Topbar (header right-side, next to notification bell)
- Renders as two pills: `EN | AR`
- Calls `setLocale()` on click → LocaleProvider reacts via subscription

**Alternatives considered**:
- Full `[locale]` route segment with server-side `dir` — rejected: requires restructuring all routes, premature for mock phase.
- CSS `html[dir="rtl"]` via manual class toggle — rejected: Tailwind logical utilities respond to the HTML attribute directly; no extra class needed.

---

### Decision 3 — OS catalogue data shape

**Decision**: Replace the `App` interface and `mockApps` array with `OSItem` interface and `mockOS` array in `lib/mock-data/apps.ts`. The `AppStatus` type in `lib/types.ts` is updated to use `OSState` values.

**Rationale**: The current `AppStatus = "active" | "enable" | "upgrade" | "coming-soon"` conflates subscription state with UI state. The v5.2 architecture defines `Product Hub states: available | active | trial | locked | coming_soon | not_started`. For this spec, only three states are needed: `active` (Commerce OS), `coming-soon` (all future OS), and the existing `enable` / `upgrade` paths can be deprecated. The `OSItem` interface decouples the stable `id` (e.g., `"commerce"`) from the display `name` (e.g., `"Commerce OS"`), which is the right pattern.

**New OS catalogue** (six items, fixed order):
1. Commerce OS — `state: "active"`, `href: SHOPS_URL`
2. Healthcare OS — `state: "coming-soon"`
3. HR OS — `state: "coming-soon"`
4. CRM OS — `state: "coming-soon"`
5. Gym OS — `state: "coming-soon"`
6. Maintenance OS — `state: "coming-soon"`

The `"Restaurants"` entry is removed. It is not an OS.

---

### Decision 4 — Logo component update

**Decision**: Keep `LogoApp = "core" | "shops"` as the internal prop type (no renaming). Update the displayed text inside `ShopsLogo` from `"Shops"` to `"Commerce OS"`.

**Rationale**: The `app="shops"` prop is an internal code label. Renaming it to `app="commerce"` is a refactor that touches every call site and is outside this spec's scope. Only the user-visible rendered text changes.

---

### Decision 5 — Commerce OS preset additions

**Decision**: Add `"pharmacy"` and `"restaurant"` to the `BusinessType` union and `VALID_BUSINESS_TYPES` array in `apps/shops-app/lib/mode.ts`. Add corresponding entries to the `BUSINESS_TYPES` options array in `StepBusinessAndSales.tsx` and `BUSINESS_TYPE_LABEL` map in `StepReview.tsx`. The existing `"food-beverage"` type is retained unchanged.

**Rationale**: `"pharmacy"` maps to Pharmacy Commerce preset (stock, barcode, POS — not clinical). `"restaurant"` maps to Restaurant / Cafe Commerce preset (POS, food-service commerce). Neither creates an OS boundary. `"food-beverage"` is kept for sessions that already have it stored. No Gym or Healthcare preset is added to Commerce OS.

---

## Phase 1: Design & Contracts

### Data Model — [data-model.md](./data-model.md)

#### `OSItem` (Core Platform — Product Hub)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable internal identifier: `"commerce"`, `"healthcare"`, `"hr"`, `"crm"`, `"gym"`, `"maintenance"` |
| `name` | `string` | User-facing display name: `"Commerce OS"`, `"Healthcare OS"`, etc. |
| `description` | `string` | Short user-facing description |
| `state` | `OSState` | `"active" \| "coming-soon" \| "trial" \| "locked"` |
| `href` | `string \| undefined` | Launch URL, present only when `state === "active"` |

Replaces the existing `App` interface in `lib/mock-data/apps.ts`.

#### `OSState` (Core Platform — types)

```ts
type OSState = "active" | "coming-soon" | "trial" | "locked";
```

Replaces `AppStatus` in `lib/types.ts`. `AppStatus` is kept as a deprecated alias pointing to `OSState` for any existing code that references it, removed in a future cleanup spec.

#### `Locale` (Core Platform + Commerce OS — locale utility)

```ts
type Locale = "en" | "ar";
```

Stored in session storage under key `"nexoraxs_locale"`. Defaults to `"en"` if absent.

#### `BusinessType` extension (Commerce OS — `lib/mode.ts`)

Current values: `"mobile" | "electronics" | "clothing" | "food-beverage" | "books-media" | "home-furniture" | "cosmetics" | "supermarket" | "other" | "accessories"`

New values added: `"pharmacy" | "restaurant"`

No existing values removed.

#### State transitions (Product Hub OS card)

```text
coming-soon → [no action; button disabled]
active      → href click → navigate to OS URL
trial       → [future; not in this spec]
locked      → [future; not in this spec]
```

---

### Contracts — [contracts/os-item.md](./contracts/os-item.md)

The Product Hub page is the internal consumer of the OS catalogue. The contract between the data source and the UI component:

```ts
// apps/core-platform/lib/mock-data/apps.ts
export interface OSItem {
  id: string;
  name: string;
  description: string;
  state: OSState;
  href?: string;
}

export const mockOS: OSItem[] = [ ... ];
```

```tsx
// apps/core-platform/components/dashboard/AppCard.tsx (or OSCard.tsx)
// Consumer interface — the card renders from an OSItem prop
interface OSCardProps extends OSItem {}
```

This contract means: any developer adding a new OS entry needs only to add one `OSItem` object to `mockOS`. The card component and page layout require no changes (SC-007).

---

### Quickstart — [quickstart.md](./quickstart.md)

```bash
# From repo root
pnpm dev
# Core Platform → http://localhost:3001 (or :3000)
# Commerce OS   → http://localhost:3002

# To test Product Hub:
# Navigate to http://localhost:3001/onboarding → complete → /dashboard/apps

# To test language switcher:
# Click EN/AR toggle in the topbar header
# Inspect <html dir="..."> in DevTools

# To test Commerce OS preset:
# Navigate to http://localhost:3002/onboarding
# Step 1 → Business Type → verify Pharmacy and Restaurant/Cafe are present
```

No new environment variables required. Existing `NEXT_PUBLIC_SHOPS_APP_URL` is used for the Commerce OS launch URL on the Product Hub card.

---

## Agent Context Update

<!-- SPECKIT START -->
Active plan: specs/038-platform-alignment-localization-product-hub/plan.md
<!-- SPECKIT END -->
