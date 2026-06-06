# Store / AppProvider API Contract

**Feature**: `042-claude-prototype-local-port`
**Date**: 2026-06-06

---

## Overview

All components access application state exclusively through the `useApp()` hook exported from `lib/store/`. No component may read from or write to localStorage/sessionStorage directly.

This contract defines the shape of the `useApp()` return value — i.e., everything components can read and call.

---

## useApp() Return Type

```ts
interface AppContext {
  // ── Session ──────────────────────────────────────────────────────────────
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  currentBranch: Branch | null;
  currentBU: BusinessUnit | null;                // current Business Unit
  currentOSSubscription: OSSubscription | null;
  onboardingState: OnboardingState;
  entryContext: EntryContext;

  // ── UI ────────────────────────────────────────────────────────────────────
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  showToast: (message: string, type?: "info" | "success" | "error" | "warn") => void;

  // ── Computed ─────────────────────────────────────────────────────────────
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isCommerceOSActive: boolean;                   // has active/trial subscription for commerce
  isCommerceSetupComplete: boolean;
  currentUserDisplayName: string;
  BUSINESS_UNITS: BusinessUnit[];                // all BUs for currentWorkspace
  BRANCHES: Branch[];                            // all branches for currentWorkspace
  COMMERCE_PLAN: CommercePlanInfo | null;        // joined subscription + plan catalog
  money: (n: number) => string;                  // bound to current lang
  t: (key: string) => string;                    // translation function bound to current lang

  // ── Auth Actions ──────────────────────────────────────────────────────────
  createUser: (data: { fullName: string; email: string; password: string }) => "success" | "email_taken";
  loginUser: (email: string, password: string) => "success" | "invalid_credentials";
  logoutUser: () => void;

  // ── Workspace Actions ─────────────────────────────────────────────────────
  createWorkspace: (data: { name: string; country: string; currency: string; timezone: string }) => Workspace;
  setCurrentWorkspace: (workspaceId: string) => void;

  // ── Onboarding Actions ────────────────────────────────────────────────────
  setLocale: (locale: "en" | "ar") => void;
  advanceOnboardingStep: () => void;
  completeCore: () => void;                      // marks Phase 1 (core) complete
  createBranch: (data: { name: string; country: string; currency: string; isMain: boolean }) => Branch;
  selectOS: (osId: string) => void;
  selectPlan: (planKey: "starter" | "pro" | "business") => void;
  createBusinessUnit: (data: { name: string; preset: string; osId: string }) => BusinessUnit;
  completeOnboarding: () => void;                // marks full onboarding complete

  // ── Commerce Setup Actions ────────────────────────────────────────────────
  saveCommerceSetup: (data: Partial<CommerceSetup>) => void;
  getCommerceSetup: () => CommerceSetup;

  // ── Commerce Data (scoped to currentBU + currentWorkspace) ────────────────
  products: CommerceProduct[];
  orders: CommerceOrder[];
  invoices: CommerceInvoice[];
  customers: CommerceCustomer[];
  subscriptions: OSSubscription[];

  // ── Commerce Data Actions ─────────────────────────────────────────────────
  addProduct: (data: Omit<CommerceProduct, "id" | "businessUnitId" | "workspaceId" | "createdAt">) => CommerceProduct;
  updateProduct: (id: string, data: Partial<CommerceProduct>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (data: {
    items: OrderItem[];
    customerId: string | null;
    payment: "cash" | "card" | "wallet";
    discount: number;
    vat: number;
    total: number;
    net: number;
  }) => CommerceOrder;
  createInvoice: (orderId: string) => CommerceInvoice;
  createCustomer: (data: { name: string; phone: string; email: string; notes: string }) => CommerceCustomer;
  updateCustomer: (id: string, data: Partial<CommerceCustomer>) => void;

  // ── Platform Actions ──────────────────────────────────────────────────────
  setCurrent: (data: Partial<{
    currentWorkspaceId: string;
    currentBusinessUnitId: string;
    currentBranchId: string;
  }>) => void;
}
```

---

## CommercePlanInfo (computed join)

```ts
interface CommercePlanInfo {
  subscription: OSSubscription;
  name: string;                                  // e.g. "Pro"
  status: string;                                // e.g. "trialing"
  total: number;                                 // plan price
  renew: string;                                 // formatted renewal/trial-end date
  limits: { businessUnits: number; branches: number; users: number };
}
```

---

## Key Invariants

1. **Walk-in sale rule**: `createOrder({ customerId: null })` — caller must pass `null`, never a "Walk-in" string or auto-created entity.

2. **Order + Invoice atomic**: `createOrder()` does NOT automatically create an invoice. Caller must call `createInvoice(orderId)` immediately after. Both operations complete synchronously.

3. **Stock decrement**: `createOrder()` does NOT decrement stock. Caller (POS screen) must call `updateProduct(id, { stock: product.stock - orderedQty })` for each item after order creation.

4. **Locale + RTL**: `setLang('ar')` must imperatively set `document.documentElement.dir = 'rtl'` and `document.documentElement.lang = 'ar'`. `setLang('en')` must set `dir = 'ltr'`.

5. **Session persistence**: All session keys are written to localStorage on every state change via `useEffect`.

6. **Scoping**: `products`, `orders`, `invoices`, `customers` are always pre-filtered to `currentBusinessUnitId`. Components never filter by BU themselves.

7. **Translation function**: `t(key)` falls back to the key string if the translation is missing — never throws.

---

## Error Handling in Actions

| Action | Error Return | Component Responsibility |
|--------|-------------|--------------------------|
| `createUser()` | `"email_taken"` string | Show inline error: "An account with this email already exists" |
| `loginUser()` | `"invalid_credentials"` string | Show inline error: "Invalid email or password" |
| `createOrder()` | Never throws | POS validates cart is non-empty before calling |
| `addProduct()` | Never throws | Form validates required fields before calling |
| `createCustomer()` | Never throws | Form validates name is non-empty before calling |

---

## Initialization Flow

```
AppProvider mounts
  → Read nexoraxs.db.* from localStorage (all entity collections)
  → Read nexoraxs.session.* from localStorage
  → Read nexoraxs.ui.theme from localStorage
  → Set initial state
  → Set document.documentElement.dir based on locale
  → Render children (app is now ready)
```

On every state change that should persist:
```
  → Write changed collections/session keys back to localStorage
```
