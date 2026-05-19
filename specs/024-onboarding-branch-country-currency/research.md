# Research: Onboarding Branch Country & Currency

**Feature**: 024-onboarding-branch-country-currency
**Date**: 2026-05-14

No external research needed. All decisions derived from auditing the current branch state.

---

## Decision 1: Current State on This Branch

**Finding**: This branch carries the state from feature 022 (`onboarding-country-currency-from-workspace`). The current code has:

- `StoreSetupData = { storeName: string; branch: string }` — no country or currency fields
- `StepStoreSetup` props include `workspaceCountry: string; workspaceCurrency: string` (display-only, inherited from workspace session)
- `StepReview` takes `workspaceCountry`/`workspaceCurrency` as props; `buildSummary` shows "Workspace country" and "Currency" from workspace derivation
- Orchestrator (`app/onboarding/page.tsx`) reads `core_workspace_country` session key, derives currency via `COUNTRY_CURRENCY_MAP`, passes both as props to steps
- `handleContinue` (step 3) and `handleFinish` write `workspaceCurrency`/`workspaceCountry` to session — not branch-specific

**All of this must be replaced** with explicit user-selected branch country/currency.

---

## Decision 2: `StoreSetupData` Extension

**Decision**: Add `branchCountry: string; branchCurrency: string` to the existing `StoreSetupData` interface.

```typescript
export interface StoreSetupData {
  storeName: string;
  branch: string;
  branchCountry: string;
  branchCurrency: string;
}
```

**Default initial values**: `branchCountry: "Egypt"`, `branchCurrency: "EGP"` — always a valid state on first render, no null guards needed.

**Rationale**: The fields are explicitly editable by the user. They are not derived from workspace session. They are written to `shops_country` and `shops_currency` on completion.

---

## Decision 3: Country-to-Currency Auto-Suggest Strategy

**Decision**: The auto-suggest is implemented in `StepStoreSetup`'s `handleCountryChange` handler — when country changes, both `branchCountry` and `branchCurrency` are updated together via the `onChange` callback.

```typescript
const handleCountryChange = (newCountry: string) => {
  onChange({
    ...data,
    branchCountry: newCountry,
    branchCurrency: BRANCH_COUNTRY_CURRENCY_MAP[newCountry] ?? "EGP",
  });
};

const handleCurrencyChange = (newCurrency: string) => {
  onChange({ ...data, branchCurrency: newCurrency });
};
```

**Why this approach**: No separate "manual override" flag needed. Country change always suggests a currency; direct currency change updates only currency. The sequence "change country → auto-suggest → manually change currency" works naturally — the manual change is preserved until the country changes again. This satisfies FR-003 and FR-004 with zero extra state.

**BRANCH_COUNTRY_CURRENCY_MAP** (local constant in StepStoreSetup.tsx):
```typescript
const BRANCH_COUNTRY_CURRENCY_MAP: Record<string, string> = {
  "Egypt":                "EGP",
  "Saudi Arabia":         "SAR",
  "United Arab Emirates": "AED",
  "Kuwait":               "KWD",
  "Qatar":                "QAR",
};
```

---

## Decision 4: `StepStoreSetup` — Remove Workspace Props, Add Branch Selects

**What gets removed**:
- `workspaceCountry: string` prop
- `workspaceCurrency: string` prop
- Workspace context row's country/currency display (`{workspaceCountry} · {workspaceCurrency}`)
- Live preview "Workspace country" and "Currency" rows bound to workspace values

**What the workspace row becomes**:
```tsx
<div>
  <div className="text-sm font-medium text-white">Workspace: Mustafa's Co.</div>
  <div className="text-xs text-white/40">(Read-only)</div>
</div>
```

**What gets added**:
- Two-column grid: `<select>` for Branch country + `<select>` for Branch currency
- `countryOptions` and `currencyOptions` constants
- Contextual note: "Branch country and currency apply to your first branch. You can add more branches from Shops Settings → Branches."
- Live preview updated: shows `data.branchCurrency` (Badge) and `data.branchCountry` (text)

---

## Decision 5: `StepReview` — Updated Props and Summary

**Props changes**:
- Remove: `workspaceCountry: string; workspaceCurrency: string`
- `setup` now has `branchCountry` and `branchCurrency` directly

**`buildSummary` changes**:
- Remove: `{ label: "Workspace country", value: workspaceCountry }` and `{ label: "Currency", value: workspaceCurrency }`
- Add: `{ label: "Branch country", value: setup.branchCountry }` and `{ label: "Branch currency", value: setup.branchCurrency }`
- The function signature no longer takes `workspaceCountry`/`workspaceCurrency` params

**Updated summary items**:
```
Workspace, Business Type, Sales Model, Store Name, Main Branch, Branch country, Branch currency
```

---

## Decision 6: Orchestrator Page — Remove Workspace Derivation

**What gets removed** from `app/onboarding/page.tsx`:
- `COUNTRY_CURRENCY_MAP` constant
- `DEFAULT_WORKSPACE_COUNTRY`, `DEFAULT_WORKSPACE_CURRENCY` constants
- `getCurrencyForCountry()` function
- `workspaceCountry` / `workspaceCurrency` derived state (the `useSessionValue` reading `core_workspace_country`)
- `workspaceCountry={workspaceCountry}` and `workspaceCurrency={workspaceCurrency}` props on `<StepStoreSetup>` and `<StepReview>`

**What changes in storeSetup initial state**:
```typescript
// Before:
const [storeSetup, setStoreSetup] = useState<StoreSetupData>({
  storeName: persistedStoreName ?? "",
  branch: persistedBranch ?? "",
});

// After:
const [storeSetup, setStoreSetup] = useState<StoreSetupData>({
  storeName: persistedStoreName ?? "",
  branch: persistedBranch ?? "",
  branchCountry: "Egypt",
  branchCurrency: "EGP",
});
```

**What changes in handleContinue (step 3) and handleFinish**:
```typescript
// Before:
setCurrency(workspaceCurrency);
setCountry(workspaceCountry);

// After:
setCurrency(storeSetup.branchCurrency);
setCountry(storeSetup.branchCountry);
```

**Import cleanup**: Remove `getCountry`, `getCurrency` imports from `@/lib/mode` if they are no longer used after these changes. They remain in `lib/mode.ts` itself (exported for other consumers like dashboard).

---

## Decision 7: `StepStoreSetup` Props Interface Cleanup

**Updated interface**:
```typescript
interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  onGoToStep: (step: 1 | 2 | 3 | 4) => void;
  // workspaceCountry and workspaceCurrency removed
}
```

---

## Files Summary

### Modified:

- `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — extend `StoreSetupData`; remove workspace props; add branch country/currency selects with auto-suggest; update live preview; add note
- `apps/shops-app/components/onboarding/StepReview.tsx` — remove workspace props; update `buildSummary` to use `setup.branchCountry`/`setup.branchCurrency`; rename labels
- `apps/shops-app/app/onboarding/page.tsx` — remove workspace derivation code; update initial storeSetup state; update handleContinue/handleFinish; remove workspace props from step renders

**`AGENTS.md`** — update SPECKIT block to 024

### Not modified:

- `apps/shops-app/lib/mode.ts` — `shops_country`, `shops_currency`, `setCountry`, `setCurrency` remain; no changes needed
- `apps/shops-app/components/dashboard/Topbar.tsx` — reads `getStoreName()`, `getBranch()` — unchanged
- `apps/shops-app/components/dashboard/StoreProfile.tsx` — reads session via helpers — unchanged
- `apps/core-platform/*` — no changes; workspace onboarding untouched
