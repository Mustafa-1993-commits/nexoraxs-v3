# Data Model: Core Platform UX Alignment

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03

---

## Session Storage Contract (12 Exact Keys)

All values are strings (sessionStorage stores strings only). No alternative keys permitted.

```ts
// Theme
"core_theme"              → "light" | "dark"          // default: "dark"

// Locale
"core_locale"             → "en" | "ar"               // default: "en"

// Workspace (Step 2)
"core_workspace_name"     → string                    // e.g. "Mustafa Group"
"core_workspace_country"  → string                    // e.g. "Egypt"
"core_workspace_currency" → string                    // e.g. "EGP"
"core_workspace_timezone" → string                    // e.g. "Africa/Cairo"

// Business Unit (Step 3)
"core_bu_name"            → string                    // e.g. "Mustafa Pharmacy"
"core_bu_industry"        → string                    // e.g. "Retail / Pharmacy"

// Main Branch (Step 4)
"core_branch_name"        → string                    // e.g. "Smouha Branch"
"core_branch_city"        → string                    // e.g. "Alexandria"
"core_branch_country"     → string                    // e.g. "Egypt"

// Completion Flag (written last, after Step 4)
"core_onboarding_done"    → "true"
```

---

## core-session.ts API

```ts
// Theme
getTheme(): "light" | "dark"
setTheme(v: "light" | "dark"): void
subscribeToTheme(cb: () => void): () => void

// Locale (sourced from lib/locale.ts which now uses core_locale key)
// Not duplicated here — locale.ts owns getLocale/setLocale/subscribeToLocale

// Workspace
getWorkspaceName(): string | null
setWorkspaceName(v: string): void
getWorkspaceCountry(): string | null
setWorkspaceCountry(v: string): void
getWorkspaceCurrency(): string | null
setWorkspaceCurrency(v: string): void
getWorkspaceTimezone(): string | null
setWorkspaceTimezone(v: string): void

// Business Unit
getBUName(): string | null
setBUName(v: string): void
getBUIndustry(): string | null
setBUIndustry(v: string): void

// Branch
getBranchName(): string | null
setBranchName(v: string): void
getBranchCity(): string | null
setBranchCity(v: string): void
getBranchCountry(): string | null
setBranchCountry(v: string): void

// Completion
isOnboardingDone(): boolean
completeOnboarding(): void          // writes core_onboarding_done = "true"
```

All functions guard against `typeof window === "undefined"` (SSR safety).

---

## OnboardingStep type

```ts
type OnboardingStep = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<OnboardingStep, string> = {
  1: "Language",
  2: "Workspace",
  3: "Business Unit",
  4: "Main Branch",
};
```

---

## CountryDefault (static lookup)

```ts
interface CountryDefault {
  currency: string;
  timezone: string;
}

const COUNTRY_DEFAULTS: Record<string, CountryDefault> = {
  "Egypt":                  { currency: "EGP", timezone: "Africa/Cairo"        },
  "Saudi Arabia":           { currency: "SAR", timezone: "Asia/Riyadh"         },
  "United Arab Emirates":   { currency: "AED", timezone: "Asia/Dubai"          },
  "Kuwait":                 { currency: "KWD", timezone: "Asia/Kuwait"         },
  "Qatar":                  { currency: "QAR", timezone: "Asia/Qatar"          },
  "Jordan":                 { currency: "JOD", timezone: "Asia/Amman"          },
  "Bahrain":                { currency: "BHD", timezone: "Asia/Bahrain"        },
  "Morocco":                { currency: "MAD", timezone: "Africa/Casablanca"   },
  "United Kingdom":         { currency: "GBP", timezone: "Europe/London"       },
  "United States":          { currency: "USD", timezone: "America/New_York"    },
  "Germany":                { currency: "EUR", timezone: "Europe/Berlin"       },
  "Other":                  { currency: "",    timezone: ""                    },
};
```

---

## BusinessUnitIndustry options

```ts
const BU_INDUSTRIES = [
  "Retail / General",
  "Retail / Pharmacy",
  "Restaurant / Cafe",
  "Supermarket",
  "Electronics / Mobile",
  "Cosmetics",
  "Medical Supplies",
  "Other",
] as const;
```

---

## MockNotification

```ts
interface MockNotification {
  id: string;
  iconName: IconName;        // from @nexoraxs/ui IconName type
  color: "amber" | "emerald" | "blue";
  title: string;
  body: string;
  timeAgo: string;
}

const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: "low-stock",
    iconName: "alert-triangle",
    color: "amber",
    title: "Low stock alert",
    body: "Product A is running low — 3 units remaining.",
    timeAgo: "2 min ago",
  },
  {
    id: "order-complete",
    iconName: "check-circle",
    color: "emerald",
    title: "Order completed",
    body: "Order #INV-0042 has been marked as completed.",
    timeAgo: "15 min ago",
  },
  {
    id: "plan-renewal",
    iconName: "credit-card",
    color: "blue",
    title: "Commerce OS renewal",
    body: "Your Commerce OS plan renews in 7 days.",
    timeAgo: "1 hour ago",
  },
];
```

---

## MockTeamMember (in-memory only, not persisted)

```ts
interface MockTeamMember {
  id: string;
  email: string;
  name?: string;
  workspaceRole: "Owner" | "Admin" | "Member";
  osAccess: string;           // "Commerce OS" or other
  businessUnitAccess: string; // BU name or "All"
  branchAccess: string;       // branch name or "All"
  osRole: string;             // one of Commerce OS role options
  status: "active" | "pending";
}
```

Initial mock member = workspace owner (read from `getMockUserName()` + `getMockUserEmail()`).

Commerce OS roles (used in invite modal):
```ts
const COMMERCE_OS_ROLES = [
  "Commerce Admin",
  "Branch Manager",
  "Cashier",
  "Inventory Manager",
  "Accountant",
  "Viewer",
] as const;
```

---

## IntegrationCard

```ts
interface IntegrationCard {
  id: string;
  osA: string;    // "Commerce OS"
  osB: string;    // "Healthcare OS"
  title: string;
  description: string;
  status: "coming-soon";
}

const INTEGRATION_CARDS: IntegrationCard[] = [
  { id: "commerce-healthcare", osA: "Commerce OS", osB: "Healthcare OS", title: "Prescription Fulfillment", description: "Healthcare creates prescriptions; Commerce Pharmacy dispenses and invoices.", status: "coming-soon" },
  { id: "commerce-hr",         osA: "Commerce OS", osB: "HR OS",         title: "Employee & Cashier Sync", description: "HR manages employee profiles; Commerce grants cashier and branch access.", status: "coming-soon" },
  { id: "commerce-crm",        osA: "Commerce OS", osB: "CRM OS",        title: "Customer & Campaign Sync", description: "Commerce tracks purchase history; CRM owns campaigns and follow-ups.", status: "coming-soon" },
  { id: "gym-hr",              osA: "Gym OS",      osB: "HR OS",         title: "Trainer & Attendance",    description: "Gym manages trainers and schedules; HR syncs attendance and payroll.", status: "coming-soon" },
  { id: "maintenance-commerce",osA: "Maintenance OS", osB: "Commerce OS", title: "Spare Parts Inventory",  description: "Maintenance uses spare parts; Commerce manages stock and invoices.", status: "coming-soon" },
];
```

---

## OSItem (updated)

```ts
export interface OSItem {
  id: string;
  name: string;
  description: string;
  state: OSState;
  href?: string;
  businessUnit?: string;     // NEW — BU pill displayed on Commerce OS card
}
```

---

## State Transitions

### OnboardingStep progression

```
1 (Language) → 2 (Workspace) → 3 (Business Unit) → 4 (Main Branch) → Dashboard
     ↑ Back (disabled)  ↑ Back          ↑ Back               ↑ Back
```

### Theme state machine

```
"dark" ←→ "light"   (toggle, immediate, persisted to core_theme)
```

### Locale state machine

```
"en" (dir=ltr, lang=en) ←→ "ar" (dir=rtl, lang=ar)   (toggle, immediate, persisted to core_locale)
```

### Onboarding completion guard

```
core_onboarding_done absent → show onboarding
core_onboarding_done = "true" → redirect to /dashboard
```

### Dashboard entry guard

```
core_onboarding_done = "true" → show dashboard
core_onboarding_done absent → redirect to /onboarding
```
