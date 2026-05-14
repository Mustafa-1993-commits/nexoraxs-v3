# Research: Shops Onboarding Business Type Flow

**Feature**: 019-shops-onboarding-business-type-flow
**Date**: 2026-05-14

No external research needed. All decisions are derived from auditing the existing codebase and the Magic Patterns design reference.

---

## Decision 1: `ShopsMode` Type Migration

**Decision**: Update `ShopsMode` in `lib/mode.ts` from `"business" | "store" | "both"` to `"physical" | "online" | "both"`. The `getMode()` validation check updates accordingly.

**Rationale**: The new onboarding uses "Physical store / Online store / Both" as the sales model framing. Keeping the old values (`"business"`, `"store"`) would require a translation layer everywhere and create misleading naming (a "business" mode card that really means "physical store"). Updating the type at the source eliminates that confusion.

**Breaking change scope**: 4 files read `ShopsMode` values by string:
- `components/dashboard/NextSteps.tsx` — maps `"business"` / `"store"` → update to `"physical"` / `"online"`
- `components/dashboard/StoreProfile.tsx` — `modeLabel` record keys → update
- `app/(app)/settings/page.tsx` — `modeLabel` record keys → update
- `app/onboarding/page.tsx` — full rewrite (not an update)

**Alternatives considered**:
- Add a translation helper `oldToNew(mode)`: unnecessary complexity; prefer clean migration.
- Keep old values and add parallel `shops_sales_model` key: doubles the sessionStorage state for no benefit; rejected.

---

## Decision 2: New SessionStorage Keys

**Decision**: Add 3 new keys to `lib/mode.ts` with corresponding getters/setters:

| Key | Type | Helper functions |
|-----|------|-----------------|
| `shops_business_type` | `BusinessType` string | `setBusinessType`, `getBusinessType` |
| `shops_store_name` | `string` | `setStoreName`, `getStoreName` |
| `shops_country` | `string` | `setCountry`, `getCountry` |

All follow the existing window-guard pattern.

**Existing keys retained unchanged**: `shops_mode` (repurposed values), `shops_branch`, `shops_currency`, `shops_onboarding_done`.

**Key not needed**: No `shops_sales_model` key — `shops_mode` stores the sales model value directly (now `"physical" | "online" | "both"`).

---

## Decision 3: New Component Structure

**Decision**: Extract the 4 step panels into separate files under `components/onboarding/`:

```
components/onboarding/
├── ModeCard.tsx              (existing — kept but unused after this feature)
├── StepBusinessType.tsx      NEW
├── StepSalesModel.tsx        NEW
├── StepStoreSetup.tsx        NEW
└── StepReview.tsx            NEW
```

`app/onboarding/page.tsx` is a full rewrite that orchestrates the 4 steps, manages shared state, and handles navigation.

**Rationale**: The onboarding page would be ~600+ lines if all step panels were inline. Extracting to components keeps each file focused and testable in isolation. The Magic Patterns reference uses the same split.

**Why NOT inline**: Step 3 alone has a two-column layout with a form and a live preview card; Step 4 has three grid sections. Inlining all four would make the page file unmaintainable.

---

## Decision 4: Icon Strategy — Extending `Icon.tsx`

**Decision**: Add 7 new `IconName` values to `components/ui/Icon.tsx` for the business type cards. These use the same inline SVG path approach — no new packages.

**New icons and their SVG paths**:

| IconName | Business Type | SVG path |
|----------|---------------|----------|
| `"smartphone"` | Mobile Store | `"M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"` |
| `"watch"` | Accessories Store | `"M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 8v-3l2 1M9 2h6M9 22h6M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"` |
| `"shirt"` | Clothing Store | `"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"` |
| `"shopping-cart"` | Supermarket | `"M6 2H3l.45 2.89M7 13h12l4-8H5.12M7 13l-1.55-7.89M7 13l-1 5h13M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"` |
| `"cpu"` | Electronics Store | `"M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M10 10h4v4h-4z"` |
| `"sparkles"` | Cosmetics Store | `"M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5.5 14.5l.75 2.25 2.25.75-2.25.75-.75 2.25-.75-2.25-2.25-.75 2.25-.75zM18.5 14.5l.75 2.25 2.25.75-2.25.75-.75 2.25-.75-2.25-2.25-.75 2.25-.75z"` |
| `"store-front"` | Other Retail | `"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10M2 9h20"` |

**Rationale**: Each business category needs a semantically distinct icon — using the same icon in different colours is insufficient for accessibility (users with colour vision deficiencies). Extending the existing SVG system is the cleanest approach within the "no new packages" constraint.

**Alternatives considered**:
- Map to existing 28 icons with color tints only: Fails accessibility and visual distinction requirements.
- Inline SVG per card without using `Icon.tsx`: Duplicates SVG markup; rejected.

---

## Decision 5: Business Type Card Color Tints

Each business type card has a unique accent color. These use Tailwind colour classes and inline style for the icon container background — no new CSS utilities needed.

| Business Type | Accent | Icon BG tint | Border tint | Text colour |
|---------------|--------|-------------|-------------|-------------|
| Mobile Store | cyan | `bg-cyan-500/10` | `border-cyan-500/20` | `text-cyan-400` |
| Accessories Store | violet | `bg-violet-500/10` | `border-violet-500/20` | `text-violet-400` |
| Clothing Store | pink | `bg-pink-500/10` | `border-pink-500/20` | `text-pink-400` |
| Supermarket | emerald | `bg-emerald-500/10` | `border-emerald-500/20` | `text-emerald-400` |
| Electronics Store | blue | `bg-blue-500/10` | `border-blue-500/20` | `text-blue-400` |
| Cosmetics Store | fuchsia | `bg-fuchsia-500/10` | `border-fuchsia-500/20` | `text-fuchsia-400` |
| Other Retail | gray | `bg-white/5` | `border-white/10` | `text-gray-400` |

These are standard Tailwind arbitrary-value-free classes — all available in TailwindCSS 4.x with standard configuration.

---

## Decision 6: Step 3 Form Strategy

**Decision**: Step 3 uses real controlled `<input>` and `<select>` elements with React state. Values are pre-populated from sessionStorage on mount (if prior values exist). "Continue" is disabled when either `storeName` or `branch` is empty. On "Continue" click, all values are written to sessionStorage.

**Rationale**: The spec explicitly requires Store Display Name and Main Branch to be actual inputs (not disabled). This is different from all prior onboarding UIs (which were all read-only). The data written here populates the Review step and eventually the dashboard.

**Input maxLength**: Store name and branch capped at 60 chars to prevent overflow in Review cards.

**Currency select options**: EGP, USD, SAR, AED, EUR (matching Magic Patterns reference).

**Country select options**: Egypt, Saudi Arabia, UAE, USA (matching Magic Patterns reference).

**Pre-population logic** (for returning to Step 3 after going back):
- `storeName` pre-filled from `getStoreName() ?? ""` on first render
- `branch` pre-filled from `getBranch() ?? ""` on first render
- `currency` pre-filled from `getCurrency() ?? "EGP"` on first render
- `country` pre-filled from `getCountry() ?? "Egypt"` on first render

---

## Decision 7: Step 3 Context Summary Chips

Step 3 shows the selected business type and sales model as small read-only chips above the form. Each chip has an "edit" link that calls `onGoToStep(1)` or `onGoToStep(2)` to navigate back. These are `<button type="button" onClick>` elements — no links, no `href`.

**Business type label map** (for Step 3 chip display):
```
mobile → "Mobile Store"
accessories → "Accessories Store"
clothing → "Clothing Store"
supermarket → "Supermarket"
electronics → "Electronics Store"
cosmetics → "Cosmetics Store"
other → "Other Retail"
```

**Sales model label map** (for Step 3 chip display):
```
physical → "Physical only"
online → "Online only"
both → "Physical + Online"
```

---

## Decision 8: Step 4 Enabled Modules

Base modules (always shown): Dashboard, Products, Inventory, Customers, Sales, Reports

Sales model additions:
- `"physical"` or `"both"` → add **POS** (inserted after Sales, before Reports)
- `"online"` or `"both"` → add **Storefront** (appended after Reports)

Icons for module grid (using existing `IconName` union):
- Dashboard → `"dashboard"`
- Products → `"package"`
- Inventory → `"package-search"`
- Customers → `"users"`
- Sales → `"receipt"`
- POS → `"scan-line"`
- Reports → `"chart-bar"`
- Storefront → `"shopping-bag"`

All 8 module icons are in the existing 28-icon set. No new icons needed for the module grid.

---

## Decision 9: `StepReview` Next Actions — Static Links with `href="#"`

All 4 next action items in Step 4 use `href="#"` — per spec constraint (no external links, no real navigation from onboarding). In a real implementation these would link to `/products`, `/settings`, etc. but for this foundation they are visual.

---

## Decision 10: Animation Strategy

**Decision**: No Framer Motion. CSS `transition-all duration-200` on card hover/selected states. No entry animations. Step transitions are instant (no slide/fade).

**Rationale**: No new packages allowed. The current onboarding page uses no animations. Adding CSS transitions for selected state is sufficient for visual feedback.

---

## Decision 11: Stepper Design for 4 Steps

**Decision**: The 4-step stepper shows 4 numbered pills (1, 2, 3, 4) with connecting lines. Active step: solid blue fill (`bg-blue-600 text-white`). Completed steps (index < currentStep): green check fill or muted fill. Upcoming: hollow ring. Step labels are shown below each pill.

Step labels:
1. "Business"
2. "Sales"
3. "Setup"
4. "Review"

(Short labels to fit at 375px viewport.)

---

## Files Summary

### Modified:
- `apps/shops-app/lib/mode.ts` — update `ShopsMode`, add 3 new type + 6 new helpers
- `apps/shops-app/app/onboarding/page.tsx` — full rewrite, 4-step orchestrator
- `apps/shops-app/components/ui/Icon.tsx` — add 7 new icon names + paths
- `apps/shops-app/components/dashboard/NextSteps.tsx` — update mode key strings
- `apps/shops-app/components/dashboard/StoreProfile.tsx` — update mode label map
- `apps/shops-app/app/(app)/settings/page.tsx` — update mode label map
- `AGENTS.md` — update SPECKIT block to 019

### Created:
- `apps/shops-app/components/onboarding/StepBusinessType.tsx`
- `apps/shops-app/components/onboarding/StepSalesModel.tsx`
- `apps/shops-app/components/onboarding/StepStoreSetup.tsx`
- `apps/shops-app/components/onboarding/StepReview.tsx`

### Unchanged (but verified compatible):
- `apps/shops-app/app/(app)/dashboard/page.tsx` — reads `getMode()` → still valid; guard logic unchanged
- `apps/shops-app/components/dashboard/SetupChecklist.tsx` — no mode dependency
- All 5 operations pages — no mode dependency

### Not deleted:
- `apps/shops-app/components/onboarding/ModeCard.tsx` — kept (orphaned but harmless)
