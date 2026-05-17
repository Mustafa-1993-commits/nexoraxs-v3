# Research: Shops Onboarding 4-Step Redesign

**Feature**: 035-shops-onboarding-redesign  
**Date**: 2026-05-17

---

## Decision 1: Merged Step 1 Architecture

**Decision**: Combine StepBusinessType + StepSalesModel into a single `StepBusinessAndSales` component, rendered as a single scrollable page divided into three sections: "What do you sell?", "How do you sell?", and a live dynamic module preview.

**Rationale**: The spec explicitly merges these into Step 1. The two questions are conceptually linked — knowing what and how the merchant sells together determines the module set. Separating them forces two page transitions for information that naturally flows together.

**Alternatives considered**:
- Keep as separate components but show both on one step (chosen approach — same effect via composition inside a single step component).
- Full rewrite of both into one flat component (rejected — harder to maintain; keeping sub-sections as named sections inside the component is cleaner).

---

## Decision 2: BusinessType Union Extension

**Decision**: Extend the `BusinessType` union in `lib/mode.ts` to add new category IDs (`"food-beverage"`, `"books-media"`, `"home-furniture"`) while keeping existing ones (`"mobile"`, `"electronics"`, `"clothing"`, `"cosmetics"`, `"supermarket"`, `"other"`). Retire `"accessories"` from the UI grid but keep it valid in the type so existing session data doesn't break.

**Rationale**: The new 3×3 grid maps to 8 predefined types + "Other". The old `"accessories"` is removed from the UI but must stay in the union for backward compatibility (FR-026). The function `getBusinessType()` in `mode.ts` must accept the enlarged set.

**Alternatives considered**:
- Delete `"accessories"` from the union entirely (rejected — breaks backward compatibility if any stored session has that value).
- Use a plain `string` type (rejected — Principle IV forbids `any`/loose types; the union gives exhaustiveness checking).

---

## Decision 3: Custom "Other" Business Type Storage

**Decision**: When the merchant selects "Other" and enters custom text, store the custom string in a separate session key `shops_business_type_custom` (string). The `shops_business_type` key remains `"other"` (the enum value). The custom label is read back for display purposes in step 4 and dashboard.

**Rationale**: The `BusinessType` union cannot hold arbitrary strings — it's a typed union. Keeping the enum key stable and adding a separate custom-label key maintains type safety while still preserving the merchant's intent.

**Alternatives considered**:
- Store the raw custom string as the business type value directly (rejected — breaks `getBusinessType()` validation and type narrowing).
- Use a discriminated union with a `custom` variant carrying a `label` string (considered but over-engineered for a simple label; custom-text is display-only).

---

## Decision 4: Country → Currency + Timezone Static Lookup

**Decision**: Implement a `COUNTRY_DEFAULTS` lookup table in `lib/mode.ts` (or a new `lib/country-data.ts`) mapping country names to `{ currency, timezone }`. Cover the 5 existing countries plus extend to ~15 common markets. Defaults: `{ currency: "USD", timezone: "UTC" }` for unknown.

**Rationale**: The spec requires no external API (assumption: static table). The existing code already maps country → currency via `BRANCH_COUNTRY_CURRENCY_MAP`. We extend this to also return timezone.

**Existing countries already in code**:
| Country | Currency | Timezone |
|---------|----------|----------|
| Egypt | EGP | Africa/Cairo |
| Saudi Arabia | SAR | Asia/Riyadh |
| UAE | AED | Asia/Dubai |
| Kuwait | KWD | Asia/Kuwait |
| Qatar | QAR | Asia/Qatar |

**New entries to add** (common markets):
| Country | Currency | Timezone |
|---------|----------|----------|
| Jordan | JOD | Asia/Amman |
| Bahrain | BHD | Asia/Bahrain |
| Oman | OMR | Asia/Muscat |
| Morocco | MAD | Africa/Casablanca |
| United States | USD | America/New_York |
| United Kingdom | GBP | Europe/London |

**Alternatives considered**:
- Use a third-party timezone library (rejected — no new packages per spec constraint).
- Use browser's `Intl.DateTimeFormat().resolvedOptions().timeZone` to detect current timezone (rejected — this detects the user's browser timezone, not the country's timezone).

---

## Decision 5: OnboardingProducts Session Storage

**Decision**: Serialize the products array as a JSON string under `shops_onboarding_products`. Each product entry: `{ name: string; price: number; stock: number }`. On step 4 launch, products are read back and the key is written; no backend call is made in MVP.

**Rationale**: Session storage only supports strings. JSON stringify/parse is the standard pattern already used in the codebase. The key must not clash with any existing key (confirmed: no existing `shops_onboarding_products` key in `mode.ts`).

**Type defined in** `lib/mode.ts`:
```
interface OnboardingProduct {
  name: string;
  price: number;
  stock: number;
}
```

**Alternatives considered**:
- Comma-separated string (rejected — price and name can contain commas; JSON is safer and already parsed elsewhere).
- IndexedDB (rejected — massively over-engineered for 3 temp products; no new APIs needed).

---

## Decision 6: StoreSetupData Interface Extension

**Decision**: Extend the existing `StoreSetupData` interface (currently in `StepStoreSetup.tsx`) to include:
- `branchAddress: string` (optional, can be empty)
- `branchTimezone: string` (required, auto-set from country)

Move the type to a shared location (`lib/onboarding-types.ts`) since it's now referenced by the onboarding page, `StepStoreSetup`, `StepReview`, and potentially `StepProducts`.

**Rationale**: With multiple components now needing the type, co-locating it in the step component creates a dependency chain. A dedicated types file in `lib/` follows the established pattern (`lib/pos-types.ts` from feature 031).

**Alternatives considered**:
- Keep the type in `StepStoreSetup.tsx` and import from there (rejected — imports from UI component files for types are fragile; a types-only file is cleaner).
- Define in `lib/mode.ts` (considered — would work, but `mode.ts` is already big; a dedicated types file is cleaner).

---

## Decision 7: Mode-Aware Dashboard Pattern

**Decision**: The dashboard reads `shops_mode` via `useSyncExternalStore` (existing pattern) and uses a switch/conditional block to render three different content layouts. Stats arrays, quick actions, and banner are defined per-mode and selected at render time. The sidebar reads mode independently via the same utility.

**Rationale**: The current dashboard already uses `useSyncExternalStore` + `getMode()`. Extending this pattern to conditional rendering is the zero-friction path. No new state management needed.

**Sidebar mode-awareness**: Sidebar needs `getMode()` read similarly. The POS item is hidden (not rendered) for `online` mode; a new Storefront item is hidden for `physical` mode. "Both" renders both.

**Alternatives considered**:
- Separate dashboard page per mode via routing (rejected — too much duplication; conditional rendering is fine at this scale).
- Context API for mode (rejected — no new state management libraries; existing `useSyncExternalStore` pattern is sufficient).

---

## Decision 8: Reuse Existing Step Components vs Full Rewrite

**Decision**: The step components are substantially rewritten:
- `StepBusinessType.tsx` → completely replaced by the new merged `StepBusinessAndSales.tsx`
- `StepSalesModel.tsx` → merged into `StepBusinessAndSales.tsx` (file deleted)
- `StepStoreSetup.tsx` → modified in place (add timezone, branch address, update types)
- `StepReview.tsx` → rewritten with 2-column layout and full modules grid

**Rationale**: The spec significantly changes the layout and content of steps 1 and 4. Incremental modification would leave vestigial code. Clean rewrites produce more maintainable components.

**Alternatives considered**:
- Modify `StepBusinessType` to include sales model (rejected — the component signature and layout are too different; a new file is cleaner than a heavily modified one).
- Keep `StepSalesModel.tsx` and import from it in the merged step (rejected — the merged layout renders them in a unified scroll, not as separate sub-components; inlining is cleaner).

---

## Decision 9: Stepper Labels Update

**Decision**: Update stepper step labels from `["Business", "Sales", "Setup", "Review"]` to `["Business & Sales", "Store Setup", "Products", "Review & Launch"]`. The stepper `currentStep` remains `1|2|3|4`.

**Rationale**: Step labels must reflect the new step contents. The step type union and step numbering stay identical — only the display strings change.

---

## Decision 10: ModeCard.tsx Disposition

**Decision**: `components/onboarding/ModeCard.tsx` (existing file — a visual-only mode card component) is deleted since its functionality is absorbed into `StepBusinessAndSales.tsx` with the new visual card design.

**Rationale**: The new sales model cards are full-width with a different visual treatment (prominent "RECOMMENDED" card, specific color tags). Reusing the old component would require so many prop changes it effectively becomes a new component.

**Alternatives considered**:
- Extend ModeCard props (rejected — the new card layout is significantly different; a fresh implementation inside the step component keeps it self-contained).
