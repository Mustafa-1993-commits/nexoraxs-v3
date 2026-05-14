# Research: Onboarding Country & Currency From Workspace

**Feature**: 022-onboarding-country-currency-from-workspace
**Date**: 2026-05-14

No external research needed. All decisions derived from auditing the existing codebase.

---

## Decision 1: Core Platform — Currency → Country Replacement

**Current state** (`apps/core-platform/app/onboarding/page.tsx`):
- `const currencyOptions = [...]` (EGP, USD, SAR, AED, EUR)
- `type CurrencyValue = (typeof currencyOptions)[number]["value"]`
- `const [currency, setCurrency] = useState<CurrencyValue>("EGP")`
- Step 1 JSX: `<label>Currency</label> <select value={currency} onChange={setCurrency}>`
- Step 3 JSX: `<SummaryCard label="Currency" value={currency} />`
- `handleContinue` (step 3): `saveWorkspaceSetup({ ..., currency, ... })`

**Changes needed**:
1. Replace `currencyOptions` with `countryOptions` (Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar)
2. Replace `CurrencyValue` type alias with `CountryValue`
3. Replace `currency` state with `country` (default: "Egypt")
4. Update `canProceed` for Step 1: replace `&& slug.trim() !== ""` check — currency wasn't in canProceed, but country should be (it always has a value from the select, so effectively always truthy — still correct to include)
5. Replace Step 1 Currency `<select>` with Country `<select>`
6. Update info note: remove "Currency is the workspace billing default" 
7. Replace Step 3 `<SummaryCard label="Currency" value={currency} />` with `<SummaryCard label="Country" icon="globe" value={country} />`
8. Update `handleContinue` step 3: replace `currency` with `country` in `saveWorkspaceSetup` call

**In `apps/core-platform/lib/session.ts`**:
- Replace `currency: string` with `country: string` in `WorkspaceSetup` interface

**New session key** (`core_workspace_country`):
- Written separately as `sessionStorage.setItem("core_workspace_country", country)` in addition to the JSON blob
- This allows Shops to read it with a simple `sessionStorage.getItem("core_workspace_country")` without parsing the full workspace setup

---

## Decision 2: Shops — StoreSetupData Interface Simplification

**Current interface**:
```typescript
export interface StoreSetupData {
  storeName: string;
  branch: string;
  currency: string;   // ← editable select
  country: string;    // ← editable select
}
```

**Updated interface**:
```typescript
export interface StoreSetupData {
  storeName: string;
  branch: string;
}
```

`currency` and `country` are removed because they are no longer collected from the user in Step 3. They are derived from workspace context and passed separately.

**Ripple effects**:
- `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — remove `currency` and `country` from form; add workspace context display
- `apps/shops-app/components/onboarding/StepReview.tsx` — `setup.currency` and `setup.country` no longer exist; pass derived values separately
- `apps/shops-app/app/onboarding/page.tsx` — update initial `storeSetup` state; update `handleContinue` and `handleFinish` to derive country/currency from workspace session

---

## Decision 3: Shops — Where to Derive Country and Currency

**Decision**: The orchestrator page (`app/onboarding/page.tsx`) reads `core_workspace_country` from session storage once on mount (using the existing `useSessionValue` pattern with `useSyncExternalStore`). It derives currency using the local mapping. These are passed as props to `StepStoreSetup` and `StepReview`.

**Why orchestrator, not child components**: The derived values are needed by both Step 3 and Step 4. Centralising the read in the parent avoids duplicate session reads and keeps child components purely presentational.

**Props additions**:
```typescript
// StepStoreSetup new props (display only):
workspaceCountry: string;
workspaceCurrency: string;

// StepReview new props (display only):
workspaceCountry: string;
workspaceCurrency: string;
```

**Note**: `StepStoreSetup` props interface changes from:
```typescript
interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  onGoToStep: (step: 1 | 2 | 3 | 4) => void;
}
```
To:
```typescript
interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  onGoToStep: (step: 1 | 2 | 3 | 4) => void;
  workspaceCountry: string;   // NEW
  workspaceCurrency: string;  // NEW
}
```

`StepReview` props interface changes from:
```typescript
export interface StepReviewProps {
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  setup: StoreSetupData;
}
```
To:
```typescript
export interface StepReviewProps {
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  setup: StoreSetupData;
  workspaceCountry: string;   // NEW
  workspaceCurrency: string;  // NEW
}
```

---

## Decision 4: Country-to-Currency Mapping

**Decision**: Local constant in the Shops onboarding page (or in `StepStoreSetup.tsx` — either works). Since it's needed for derivation in the orchestrator, putting it in the page is cleaner.

```typescript
const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  "Egypt":                 "EGP",
  "Saudi Arabia":          "SAR",
  "United Arab Emirates":  "AED",
  "Kuwait":                "KWD",
  "Qatar":                 "QAR",
};

const DEFAULT_COUNTRY = "Egypt";
const DEFAULT_CURRENCY = "EGP";

function getCurrencyForCountry(country: string): string {
  return COUNTRY_CURRENCY_MAP[country] ?? DEFAULT_CURRENCY;
}
```

The workspace country is read from session; the currency is derived. Neither is editable in Shops onboarding.

---

## Decision 5: Shops App/onboarding/page.tsx — State and Save Changes

**State changes**:
```typescript
// Remove from storeSetup initial state:
currency: persistedCurrency ?? "EGP",
country: persistedCountry ?? "Egypt",

// Add new derived state (read from session):
const workspaceCountry = useSessionValue(
  () => sessionStorage.getItem("core_workspace_country"),
  () => DEFAULT_COUNTRY
) ?? DEFAULT_COUNTRY;
const workspaceCurrency = getCurrencyForCountry(workspaceCountry);
```

**Note**: `useSessionValue` is the existing custom hook in `app/onboarding/page.tsx` that wraps `useSyncExternalStore`. The session getter is `() => sessionStorage.getItem("core_workspace_country")` — a plain inline function, no import from core-platform.

**handleContinue changes** (step 3):
```typescript
// Before:
setStoreName(storeSetup.storeName.trim());
setBranch(storeSetup.branch.trim());
setCurrency(storeSetup.currency);
setCountry(storeSetup.country);

// After:
setStoreName(storeSetup.storeName.trim());
setBranch(storeSetup.branch.trim());
setCurrency(workspaceCurrency);
setCountry(workspaceCountry);
```

**handleFinish changes** (step 4):
```typescript
// Before:
setCurrency(storeSetup.currency);
setCountry(storeSetup.country);

// After:
setCurrency(workspaceCurrency);
setCountry(workspaceCountry);
```

The unused imports (`persistedCurrency`, `persistedCountry`, their getters) can be removed if not used elsewhere.

---

## Decision 6: StepStoreSetup — Live Preview Card

**Current preview card** shows: Currency (badge), Country (text), Workspace (text).

**Updated preview card**: Keep workspace name. Replace editable Currency/Country with the derived read-only values:
- "Shop currency" row: `workspaceCurrency` (passed as prop)
- "Workspace country" row: `workspaceCountry` (passed as prop)

The "// live preview" section is updated to show these as simple display values, no inputs.

---

## Decision 7: StepReview — Summary Updates

**`buildSummary` changes**:
- Add `workspaceCountry` and `workspaceCurrency` as parameters (replacing `setup.country` and `setup.currency`)
- Rename `{ label: "Country", value: setup.country }` → `{ label: "Workspace country", value: workspaceCountry }`
- Rename `{ label: "Currency", value: setup.currency }` → `{ label: "Currency", value: workspaceCurrency }`
- Remove any reference to `setup.currency` and `setup.country` (they no longer exist on `StoreSetupData`)

The right-side secondary summary card (currently shows Business Type, Sales Model, Store, Branch) does not need changes.

---

## Files Summary

### Modified:

**`apps/core-platform`**:
- `lib/session.ts` — replace `currency: string` with `country: string` in `WorkspaceSetup`; add standalone `core_workspace_country` write
- `app/onboarding/page.tsx` — currency→country constants/state/select/save; add `core_workspace_country` standalone write

**`apps/shops-app`**:
- `components/onboarding/StepStoreSetup.tsx` — simplify `StoreSetupData` (remove `currency`, `country`); add `workspaceCountry`/`workspaceCurrency` props; replace editable selects with read-only workspace context; update live preview
- `components/onboarding/StepReview.tsx` — add `workspaceCountry`/`workspaceCurrency` props; update `buildSummary` function signature and items
- `app/onboarding/page.tsx` — add `COUNTRY_CURRENCY_MAP`/`getCurrencyForCountry`; add `workspaceCountry`/`workspaceCurrency` derived state; remove `currency`/`country` from `storeSetup`; update `handleContinue` and `handleFinish`; pass new props to `StepStoreSetup` and `StepReview`

**`AGENTS.md`** — update SPECKIT block to 022

### Not modified:
- `apps/shops-app/lib/mode.ts` — `shops_country` and `shops_currency` keys stay; `getCountry`/`getCurrency` helpers stay (still used in `completeOnboarding` chain)
- `apps/core-platform/app/dashboard/apps/page.tsx` — no change
- All Shops dashboard/operations pages — no dependency on `StoreSetupData`
