# Data Model: Shops Onboarding 4-Step Redesign

**Feature**: 035-shops-onboarding-redesign  
**Date**: 2026-05-17  
**Storage**: sessionStorage only (no database tables; MVP is frontend-only)

---

## Entities

### BusinessType (extended union)

```
type BusinessType =
  | "mobile"          // Mobile Store
  | "electronics"     // Electronics
  | "clothing"        // Clothing & Fashion
  | "food-beverage"   // Food & Beverage (NEW)
  | "books-media"     // Books & Media (NEW)
  | "home-furniture"  // Home & Furniture (NEW)
  | "cosmetics"       // Cosmetics & Beauty
  | "supermarket"     // Supermarket
  | "other"           // Other (requires custom text)
  | "accessories";    // Legacy — kept for backward compat, not shown in UI grid
```

Session keys:
- `shops_business_type` — one of the BusinessType values above
- `shops_business_type_custom` — string (only written when type = "other", holds the user's free-text label)

---

### ShopsMode (unchanged)

```
type ShopsMode = "physical" | "online" | "both";
```

Session key: `shops_mode`

---

### OnboardingStore

Captured in Step 2. All fields written to session storage on Next from Step 2.

| Field | Session Key | Type | Required |
|-------|-------------|------|----------|
| Store display name | `shops_store_name` | string | Yes |
| Main branch name | `shops_branch` | string | Yes |
| Branch address | `shops_branch_address` | string | No (empty string if skipped) |
| Country | `shops_country` | string | Yes |
| Currency | `shops_currency` | string | Yes (auto from country) |
| Timezone | `shops_timezone` | string | Yes (auto from country) |

Backward-compatible keys (no renames): `shops_store_name`, `shops_branch`, `shops_country`, `shops_currency`.
New keys: `shops_branch_address`, `shops_timezone`.

---

### OnboardingProduct

Up to 3 products captured in Step 3. Stored as a JSON array under a single session key.

```
interface OnboardingProduct {
  name: string;    // required, non-empty
  price: number;   // required, >= 0
  stock: number;   // required, >= 0, integer
}
```

Session key: `shops_onboarding_products`  
Value format: `JSON.stringify(OnboardingProduct[])`  
Written on "Next" from Step 3 (or skipped — writes empty array `[]`).

Validation rules:
- `name`: trimmed length > 0
- `price`: must be a number >= 0
- `stock`: must be a non-negative integer

---

### Module (display entity, no session key)

Derived from `ShopsMode` at render time. Not persisted — computed on demand.

```
interface ModuleDefinition {
  id: string;
  label: string;
  icon: IconName;
  enabledFor: readonly ShopsMode[];  // which modes enable this module
  disabledReason: string;            // shown in step 4 modules grid when disabled
}
```

Module definitions:

| Module | Label | Enabled for | Disabled reason |
|--------|-------|-------------|-----------------|
| pos | POS | physical, both | Not available for online-only stores |
| inventory | Inventory | physical, both | Not available for online-only stores |
| branches | Branches | physical, both | Not available for online-only stores |
| storefront | Storefront | online, both | Not available for in-store-only stores |
| orders | Online Orders | online, both | Not available for in-store-only stores |
| checkout | Checkout | online, both | Not available for in-store-only stores |
| reports | Reports | physical, online, both | Always enabled |

---

### CountryDefaults (static lookup, not a session entity)

Used in Step 2 to auto-populate currency and timezone when country changes.

```
interface CountryDefault {
  currency: string;
  timezone: string;
}

const COUNTRY_DEFAULTS: Record<string, CountryDefault>
```

Supported entries:

| Country | Currency | Timezone |
|---------|----------|----------|
| Egypt | EGP | Africa/Cairo |
| Saudi Arabia | SAR | Asia/Riyadh |
| United Arab Emirates | AED | Asia/Dubai |
| Kuwait | KWD | Asia/Kuwait |
| Qatar | QAR | Asia/Qatar |
| Jordan | JOD | Asia/Amman |
| Bahrain | BHD | Asia/Bahrain |
| Oman | OMR | Asia/Muscat |
| Morocco | MAD | Africa/Casablanca |
| United States | USD | America/New_York |
| United Kingdom | GBP | Europe/London |

Default fallback (unknown country): `{ currency: "USD", timezone: "UTC" }`

---

### StoreSetupFormData (component interface)

Represents the local form state in Step 2, mirroring the session keys above.

```
interface StoreSetupFormData {
  storeName: string;
  branch: string;
  branchAddress: string;
  branchCountry: string;
  branchCurrency: string;
  branchTimezone: string;
}
```

Note: `StoreSetupData` (the existing export) becomes this extended interface. The old `branchCountry` / `branchCurrency` fields keep their names for backward compat; `branchAddress` and `branchTimezone` are added.

---

## Session Storage Key Registry

Complete list of all keys read or written by this feature:

| Key | Type | Written in | Read in |
|-----|------|-----------|---------|
| `shops_business_type` | string (BusinessType) | Step 1 Next | Step 4 review, Dashboard |
| `shops_business_type_custom` | string | Step 1 Next (only if "other") | Step 4 review |
| `shops_mode` | "physical"\|"online"\|"both" | Step 1 Next | Step 4, Dashboard, Sidebar |
| `shops_store_name` | string | Step 2 Next | Step 4, Topbar, POS header |
| `shops_branch` | string | Step 2 Next | Step 4, Topbar, POS header |
| `shops_branch_address` | string | Step 2 Next | Step 4 |
| `shops_country` | string | Step 2 Next | Step 4 |
| `shops_currency` | string | Step 2 Next | Step 3 (currency display), Step 4 |
| `shops_timezone` | string | Step 2 Next | Step 4 |
| `shops_onboarding_products` | JSON string | Step 3 Next/Skip | Step 4 (product count) |
| `shops_onboarding_done` | "true" | Step 4 Launch | Root page guard, Dashboard |

---

## State Transitions

### Onboarding flow state machine

```
[Not started]
    │ navigate to /onboarding
    ▼
[Step 1: Business & Sales]
    │ both businessType + salesModel selected → Next
    ▼
[Step 2: Store Setup]
    │ storeName + country filled → Next
    ▼
[Step 3: Products]
    │ any state → Next (or Skip)
    ▼
[Step 4: Review & Launch]
    │ Launch Store → clicked
    ▼
[shops_onboarding_done = "true"] → redirect /dashboard
```

### Back navigation (no data loss)

- Step 4 → Back → Step 3: products state preserved in component state
- Step 3 → Back → Step 2: setup form state preserved
- Step 2 → Back → Step 1: businessType + salesModel preserved
- Step 1 → Back: no-op (Back button hidden on step 1)

### Dashboard mode-aware rendering

```
shops_mode = "physical" → PhysicalDashboard layout
shops_mode = "online"   → OnlineDashboard layout
shops_mode = "both"     → UnifiedDashboard layout (current default)
shops_mode = null       → redirect to /onboarding prompt
```
