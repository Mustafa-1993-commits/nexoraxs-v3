# Data Model: Claude Prototype Local Port

**Phase**: 1 — Design
**Date**: 2026-06-06
**Feature**: `042-claude-prototype-local-port`

---

## Overview

The Phase 1 data model is implemented as a frontend mock adapter using localStorage. All entities follow the relational structure from the Claude prototype (`db.jsx`). Every entity is keyed under `nexoraxs.*` storage keys. The adapter is designed so every read/write function can be replaced by an API call without changing component code.

---

## Session State

Stored in both localStorage and sessionStorage. Session values are the "current context" — they drive what data is scoped to the active user's view.

```ts
interface SessionState {
  currentUserId: string | null;
  currentWorkspaceId: string | null;
  currentOSSubscriptionId: string | null;
  currentBusinessUnitId: string | null;
  currentBranchId: string | null;
  currentOSId: string | null;                    // e.g. "commerce"
  onboardingState: OnboardingState;
  entryContext: EntryContext;
  locale: "en" | "ar";
  theme: "light" | "dark";
}

interface OnboardingState {
  phase: "core" | "os" | null;
  step: number;
  completedOS: string[];                         // ["commerce"]
}

interface EntryContext {
  source: "general_landing" | "os_landing";
  selectedOS: string | null;
  selectedPlan: string | null;
}
```

---

## Entities

### User

```ts
interface User {
  id: string;                                    // uid("user")
  fullName: string;
  email: string;                                 // normalized to lowercase
  passwordHash: string;                          // mock: stored plaintext in Phase 1
  role: "owner" | "admin" | "member";
  createdAt: string;                             // ISO 8601
}
```

**Validation rules**:
- `email` must match `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`
- `fullName` must be non-empty
- Password strength ≥ 2 bars (8+ chars with number or mixed case)
- Passwords must match on registration

**Storage key**: `nexoraxs.db.users`

---

### Workspace

```ts
interface Workspace {
  id: string;                                    // uid("ws")
  name: string;
  country: string;                               // e.g. "Egypt"
  currency: string;                              // e.g. "EGP"
  timezone: string;                              // e.g. "Africa/Cairo (GMT+2)"
  language: "en" | "ar";
  ownerUserId: string;
  createdAt: string;
}
```

**Validation rules**:
- `name` must be non-empty
- `country` selected from COUNTRIES catalog
- `currency` selected from CURRENCIES catalog
- One workspace created per registration (Phase 1)

**Storage key**: `nexoraxs.db.workspaces`
**Session key**: `nexoraxs.session.currentWorkspaceId`

---

### Branch

```ts
interface Branch {
  id: string;                                    // uid("br")
  workspaceId: string;
  name: string;
  country: string;
  currency: string;
  isMain: boolean;
  createdAt: string;
}
```

**Validation rules**:
- `name` must be non-empty
- Every workspace must have at least one branch (Main Branch)
- `country` and `currency` default from workspace

**Storage key**: `nexoraxs.db.branches`
**Session key**: `nexoraxs.session.currentBranchId`

---

### OSSubscription

```ts
interface OSSubscription {
  id: string;                                    // uid("sub")
  workspaceId: string;
  os: string;                                    // e.g. "commerce"
  osId: string;                                  // matches OS_CATALOG id
  plan: "starter" | "pro" | "business";
  planId: string;                                // e.g. "commerce_starter"
  status: "trial" | "active" | "past_due" | "cancelled" | "locked";
  startedAt: string;
  trialEndsAt: string | null;
  renewsAt: string | null;
}
```

**State transitions**:
- `trial` → `active` (payment confirmed)
- `trial` → `cancelled` (trial ended without payment)
- `active` → `past_due` (payment failed)
- `past_due` → `active` (payment recovered)
- `past_due` → `locked` (grace period expired)

**Storage key**: `nexoraxs.db.osSubscriptions`
**Session key**: `nexoraxs.session.currentOSSubscriptionId`

---

### BusinessUnit

```ts
interface BusinessUnit {
  id: string;                                    // uid("bu")
  workspaceId: string;
  osSubscriptionId: string;
  os: string;                                    // e.g. "commerce"
  osId: string;
  preset: string;                                // e.g. "pharmacy"
  presetId: string;                              // same as preset in Phase 1
  name: string;                                  // e.g. "Mustafa Pharmacy"
  branchIds: string[];
  createdAt: string;
}
```

**Validation rules**:
- `name` must be non-empty
- `preset` must match a key in `OS_BU_PRESETS[osId]`
- Must be linked to at least one branch

**Storage key**: `nexoraxs.db.businessUnits`
**Session key**: `nexoraxs.session.currentBusinessUnitId`

---

### CommerceSetup

```ts
interface CommerceSetup {
  id: string;                                    // uid("setup")
  businessUnitId: string;
  // Identity
  displayName: string;
  legalName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  crn: string;                                   // Commercial Registration Number
  trn: string;                                   // Tax Registration Number
  logo: string | null;                           // base64 or URL (mock: null)
  // Preset / Mode
  presetId: string;
  businessType: string;                          // alias for presetId display
  preset: string;
  mode: "physical" | "online" | "both";
  // Tax
  vatRegistered: boolean;
  vatRate: number;                               // e.g. 14
  pricesIncludeTax: boolean;
  taxLabel: string;                              // e.g. "VAT"
  taxNumber: string;
  // Numbering
  invoicePrefix: string;                         // e.g. "INV"
  receiptPrefix: string;                         // e.g. "RCPT"
  invoiceStart: number;                          // e.g. 1001
  receiptStart: number;
  footer: string;
  returnPolicy: string;
  // Templates
  receiptSize: "58mm" | "80mm" | "A4";
  receiptStyle: "classic" | "modern";
  invoiceTemplate: "a4-simple" | "a4-branded";
  // Categories (custom list for this BU)
  categories: string[];
}
```

**Derived computed fields** (not stored, calculated at read time):
- `isComplete`: `!!(displayName && address && taxNumber && invoiceTemplate)`

**Storage key**: `nexoraxs.db.commerceSetups`

---

### CommerceProduct

```ts
interface CommerceProduct {
  id: string;                                    // uid("prod")
  businessUnitId: string;
  workspaceId: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  price: number;                                 // selling price (tax-inclusive if pricesIncludeTax)
  cost: number;
  stock: number;
  low: number;                                   // low stock threshold
  taxable: boolean;
  notes: string;
  createdAt: string;
}
```

**Validation rules**:
- `name` required
- `price` required and > 0
- `stock` defaults to 0 if not provided
- `low` defaults to 5 if not provided

**Storage key**: `nexoraxs.db.commerceProducts`

---

### CommerceOrder

```ts
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  taxable: boolean;
  lineTotal: number;
}

interface CommerceOrder {
  id: string;                                    // uid("ord")
  businessUnitId: string;
  workspaceId: string;
  branchId: string;
  num: string;                                   // e.g. "ORD-1001"
  items: OrderItem[];
  customerId: string | null;                     // null = walk-in
  payment: "cash" | "card" | "wallet";
  discount: number;
  vat: number;
  total: number;
  net: number;
  createdAt: string;
}
```

**Key rules**:
- `customerId: null` for walk-in sales — no customer entity created
- `num` generated as `"ORD-" + autoincrement`
- `stock` of each ordered product is decremented on order creation
- Order creation always triggers invoice creation

**Storage key**: `nexoraxs.db.commerceOrders`

---

### CommerceInvoice

```ts
interface CommerceInvoice {
  id: string;                                    // uid("inv")
  orderId: string;
  businessUnitId: string;
  workspaceId: string;
  branchId: string;
  num: string;                                   // e.g. "INV-1001" (from setup prefix + start)
  items: OrderItem[];
  customerId: string | null;
  vat: number;
  tax: number;                                   // alias for vat (for computeDoc compatibility)
  total: number;
  net: number;
  discount: number;
  createdAt: string;
}
```

**Key rules**:
- Created at the same time as the order
- `num` uses `CommerceSetup.invoicePrefix + CommerceSetup.invoiceStart` then auto-increments
- `customerId: null` mirrors the order's customer

**Storage key**: `nexoraxs.db.commerceInvoices`

---

### CommerceCustomer

```ts
interface CommerceCustomer {
  id: string;                                    // uid("cust")
  businessUnitId: string;
  workspaceId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
}
```

**Validation rules**:
- `name` required
- Never created implicitly by a walk-in POS sale

**Storage key**: `nexoraxs.db.commerceCustomers`

---

## Catalog Data (Static — not stored per workspace)

### OS_CATALOG

```ts
const OS_CATALOG = [
  { id: "commerce",     name: "Commerce OS",     availability: "available"  },
  { id: "healthcare",   name: "Healthcare OS",    availability: "coming_soon"},
  { id: "hr",           name: "HR OS",            availability: "coming_soon"},
  { id: "crm",          name: "CRM OS",           availability: "coming_soon"},
  { id: "gym",          name: "Gym OS",           availability: "coming_soon"},
  { id: "maintenance",  name: "Maintenance OS",   availability: "coming_soon"},
];
```

### PLAN_CATALOG

```ts
const PLAN_CATALOG = [
  { id: "commerce_starter",  osId: "commerce", tier: "Starter",  price: 0,    currency: "EGP", limits: { businessUnits: 1, branches: 1, users: 3  } },
  { id: "commerce_pro",      osId: "commerce", tier: "Pro",      price: 1400, currency: "EGP", limits: { businessUnits: 3, branches: 5, users: 10 } },
  { id: "commerce_business", osId: "commerce", tier: "Business", price: null, currency: "EGP", limits: { businessUnits: 99, branches: 99, users: 99 } },
];
```

### OS_BU_PRESETS (commerce)

```ts
const OS_BU_PRESETS = {
  commerce: [
    { id: "retail",              name: "Retail Store",         ic: "shopping-bag" },
    { id: "pharmacy",            name: "Pharmacy",             ic: "pill"         },
    { id: "supermarket",         name: "Supermarket",          ic: "shopping-cart"},
    { id: "restaurant_cafe",     name: "Restaurant / Cafe",    ic: "utensils"     },
    { id: "electronics_mobile",  name: "Electronics / Mobile", ic: "smartphone"   },
    { id: "clothing_fashion",    name: "Clothing / Fashion",   ic: "shirt"        },
    { id: "cosmetics",           name: "Cosmetics",            ic: "sparkles"     },
    { id: "medical_supplies",    name: "Medical Supplies",     ic: "cross"        },
    { id: "other",               name: "Other",                ic: "shapes"       },
  ],
  // healthcare, hr, maintenance, gym, crm presets also defined (coming soon)
};
```

---

## Computed / Derived Values

These are calculated from stored data at read time — never stored.

| Computed Value | Source | Formula |
|---------------|--------|---------|
| `isAuthenticated` | session | `currentUserId !== null` |
| `isOnboardingComplete` | session | `onboardingState.completedOS.length > 0` |
| `isCommerceSetupComplete` | CommerceSetup | `setup.displayName !== "" && setup.taxNumber !== ""` |
| `currentUserDisplayName` | User | `fullName || email.split('@')[0]` |
| `COMMERCE_PLAN` | OSSubscription + PLAN_CATALOG | Join subscription with plan catalog |
| `BUSINESS_UNITS` | businessUnits | Filter by `currentWorkspaceId` |
| `BRANCHES` | branches | Filter by `currentWorkspaceId` |
| `taxBreak(gross, rate, taxable)` | CommerceSetup | `net = gross / (1 + rate/100)`, `vat = gross - net` |
| `money(n, lang)` | lang | `n.toLocaleString("en-EG")` + currency symbol |

---

## Storage Layout Summary

```
localStorage keys:
  nexoraxs.db.users
  nexoraxs.db.workspaces
  nexoraxs.db.branches
  nexoraxs.db.osSubscriptions
  nexoraxs.db.businessUnits
  nexoraxs.db.commerceSetups
  nexoraxs.db.commerceProducts
  nexoraxs.db.commerceOrders
  nexoraxs.db.commerceCustomers
  nexoraxs.db.commerceInvoices

  nexoraxs.session.currentUserId
  nexoraxs.session.currentWorkspaceId
  nexoraxs.session.currentOSSubscriptionId
  nexoraxs.session.currentBusinessUnitId
  nexoraxs.session.currentBranchId
  nexoraxs.session.currentOSId
  nexoraxs.session.onboardingState
  nexoraxs.session.entryContext
  nexoraxs.session.locale
  nexoraxs.session.demo

  nexoraxs.ui.theme
```

---

## Relationship Diagram

```
User (1) ──owns──> Workspace (1..n)
Workspace (1) ──has──> Branch (1..n)
Workspace (1) ──activates──> OSSubscription (0..n)
OSSubscription (1) ──enables──> BusinessUnit (1..n)
BusinessUnit (1) ──linked to──> Branch (1..n)  [via branchIds]
BusinessUnit (1) ──has──> CommerceSetup (1)
CommerceSetup (1) ──defines categories for──> CommerceProduct (0..n)
BusinessUnit (1) ──owns──> CommerceProduct (0..n)
BusinessUnit (1) ──owns──> CommerceOrder (0..n)
BusinessUnit (1) ──owns──> CommerceInvoice (0..n)
BusinessUnit (1) ──owns──> CommerceCustomer (0..n)
CommerceOrder (1) ──generates──> CommerceInvoice (1)
CommerceOrder (n) ──may link to──> CommerceCustomer (0..1)
```
