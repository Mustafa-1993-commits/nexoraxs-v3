# UI Component Contracts: Shops Onboarding Steps

**Feature**: 019-shops-onboarding-business-type-flow
**Date**: 2026-05-14

These contracts define the public prop interfaces for the 4 new step-panel components. The orchestrating `OnboardingPage` in `app/onboarding/page.tsx` owns all state and passes it down via these interfaces.

---

## Shared Types (from `lib/mode.ts`)

```typescript
export type BusinessType =
  | "mobile" | "accessories" | "clothing" | "supermarket"
  | "electronics" | "cosmetics" | "other";

export type ShopsMode = "physical" | "online" | "both";
```

---

## `StepBusinessType` Contract

**File**: `components/onboarding/StepBusinessType.tsx`

```typescript
interface StepBusinessTypeProps {
  selected: BusinessType | null;
  onSelect: (type: BusinessType) => void;
}
```

**Behaviour**:
- Renders 7 selectable business type cards in a responsive grid
- Calls `onSelect(type)` when a card is clicked
- Highlights the card whose `id === selected`
- Has no internal state — fully controlled

---

## `StepSalesModel` Contract

**File**: `components/onboarding/StepSalesModel.tsx`

```typescript
interface StepSalesModelProps {
  selected: ShopsMode | null;
  onSelect: (model: ShopsMode) => void;
}
```

**Behaviour**:
- Renders 3 selectable sales model cards in a stacked layout
- Calls `onSelect(model)` when a card is clicked
- Highlights the card whose `id === selected`
- Has no internal state — fully controlled

---

## `StepStoreSetup` Contract

**File**: `components/onboarding/StepStoreSetup.tsx`

```typescript
interface StoreSetupData {
  storeName: string;
  branch: string;
  currency: string;
  country: string;
}

interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  onGoToStep: (step: number) => void;
}
```

**Behaviour**:
- Renders workspace read-only row, context summary chips, form inputs, live preview card
- Calls `onChange({ ...data, [field]: value })` when any input changes
- Calls `onGoToStep(1)` when business type chip "edit" is tapped
- Calls `onGoToStep(2)` when sales model chip "edit" is tapped
- Has no internal state — fully controlled

---

## `StepReview` Contract

**File**: `components/onboarding/StepReview.tsx`

```typescript
interface StepReviewProps {
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  setup: StoreSetupData;
}
```

**Behaviour**:
- Renders summary cards, enabled modules grid, next actions panel
- All display-only — no callbacks, no interaction beyond `href="#"` action links
- Derives enabled modules from `salesModel`
- Has no internal state

---

## `OnboardingPage` State Contract

The orchestrating page owns:

```typescript
currentStep: 1 | 2 | 3 | 4
businessType: BusinessType | null
salesModel: ShopsMode | null
storeSetup: StoreSetupData
isComplete: boolean  // derived from isOnboardingComplete() on mount
```

**canProceed logic**:
| Step | Condition |
|------|-----------|
| 1 | `businessType !== null` |
| 2 | `salesModel !== null` |
| 3 | `storeSetup.storeName.trim() !== "" && storeSetup.branch.trim() !== ""` |
| 4 | `true` |

**Persistence on "Finish setup"** (step 4 Continue click):
1. `setBusinessType(businessType!)` → `shops_business_type`
2. `setMode(salesModel!)` → `shops_mode`
3. `setStoreName(storeSetup.storeName)` → `shops_store_name`
4. `setBranch(storeSetup.branch)` → `shops_branch`
5. `setCurrency(storeSetup.currency)` → `shops_currency`
6. `setCountry(storeSetup.country)` → `shops_country`
7. `completeOnboarding()` → `shops_onboarding_done`
8. `router.push("/dashboard")`
