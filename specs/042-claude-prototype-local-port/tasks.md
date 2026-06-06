# Tasks: Claude Prototype Local Port

**Input**: Design documents from `specs/042-claude-prototype-local-port/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: No automated test tasks generated — not requested in spec. Manual QA checkpoints included at each phase boundary.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks in same phase)
- **[Story]**: User story this task belongs to (US1–US5)
- **No story label**: Setup or Foundational tasks

---

## Boundary Correction: Core Platform vs Commerce App

**Purpose**: Correct the accidental Commerce implementation under Core Platform before continuing any new UI work.

- [X] T000A Rename `apps/shops-app` to `apps/commerce` after confirming `pnpm-workspace.yaml` uses `apps/*` and `turbo.json` has no explicit app-name references
- [X] T000B Update `apps/commerce/package.json` package name and keep Commerce dev server on port `3002`
- [X] T000C Move Commerce routes out of `apps/core-platform/app/commerce` and into `apps/commerce/app`
- [X] T000D Remove deprecated `apps/core-platform/app/commerce` route tree after successful migration
- [X] T000E Duplicate required `lib/store`, shell, UI, and topbar support code into `apps/commerce` temporarily; do not import from Core Platform internals
- [X] T000F Update Core Platform Product Hub and onboarding/login redirects to open Commerce at `http://localhost:3002`
- [X] T000G Preserve all `nexoraxs.*` localStorage/sessionStorage keys for shared mock session/data across apps
- [ ] T000H Manual browser QA for cross-app Core → Commerce navigation. Do not mark done until user tests.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new directory structure required by plan.md. No implementation code — just scaffolding.

- [X] T001 Create `apps/core-platform/app/commerce/` route tree: `setup/`, `dashboard/`, `pos/success/`, `products/new/`, `inventory/`, `orders/[id]/`, `invoices/[id]/document/`, `customers/[id]/`, `reports/`, `settings/`
- [X] T002 [P] Create `apps/core-platform/lib/store/` directory
- [X] T003 [P] Create `apps/core-platform/components/shell/` directory
- [X] T004 [P] Create `apps/core-platform/components/auth/` directory
- [X] T005 [P] Create `apps/core-platform/components/ui/` directory

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data adapter, design tokens, shell, and AppProvider. ALL user stories depend on this phase being complete.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### Design System

- [X] T006 Extract design tokens from `docs/claude.aidesign/app/app.css`, `shell.css`, `styles.css`, `auth.css` — add CSS variables to `apps/core-platform/app/globals.css` under `:root` and `[data-theme="dark"]`: `--bg-app`, `--bg-canvas`, `--topbar-bg`, `--topbar-border`, `--sidebar-bg`, `--sidebar-border`, `--accent`, `--accent-light`, `--text-1`, `--text-2`, `--text-3`, `--card-bg`, `--card-border`, `--card-shadow`, `--danger`, `--warn`, `--success`, `--input-bg`, `--input-border`. Do not remove existing landing CSS variables.

### Data Adapter

- [X] T007 [P] Create `apps/core-platform/lib/store/storage-keys.ts` — export `STORAGE_KEYS` object with all `nexoraxs.*` key strings (currentUserId, users, workspaces, branches, osSubscriptions, businessUnits, commerceSetups, products, orders, customers, invoices, all session keys, locale, theme, demo)
- [X] T008 [P] Create `apps/core-platform/lib/store/catalogs.ts` — export `OS_CATALOG` (6 OS entries with availability), `PLAN_CATALOG` (starter/pro/business per OS), `OPERATING_SYSTEMS` (metadata with icons, taglines, accent colors), `OS_BU_PRESETS` (commerce presets: retail/pharmacy/supermarket/restaurant_cafe/electronics_mobile/clothing_fashion/cosmetics/medical_supplies/other), `ONB_PLANS` (plan cards with feature lists), `DEFAULT_SETUP` (default CommerceSetup values), `COUNTRIES`, `CURRENCIES`, `TIMEZONES` arrays
- [X] T009 Create `apps/core-platform/lib/store/db.ts` — implement `uid(prefix)`, `nowISO()`, `normalizeEmail()`, `getUserDisplayName()`, `emptyDB(locale, theme)` (returns blank collections), `seedDB(locale, theme)` (Mustafa Group workspace + Mustafa Pharmacy BU + sample products/orders/invoices), `planIdFor(osId, key)`, localStorage CRUD helpers (`readCollection`, `writeCollection`, `readSession`, `writeSession`) with DB version migration
- [X] T010 Create `apps/core-platform/lib/store/i18n.ts` — port `DICT` with full `en` and `ar` translation keys from `docs/claude.aidesign/app/store.jsx`; export `t(key: string, lang: "en" | "ar"): string` function
- [X] T011 Create `apps/core-platform/lib/store/commerce-helpers.ts` — port from `docs/claude.aidesign/app/dashboard-helpers.jsx`: `nxOrdersForPeriod(orders, period)`, `nxRevenue(orders)`, `nxBestSellers(orders, products, n)`, `nxGroupSales(orders, period)`, `nxOrderDate(order)`, `computeDoc(items, setup, discount)`, `money(n, lang)`, `taxBreak(gross, rate, taxable)`
- [X] T012 Create `apps/core-platform/lib/store/AppProvider.tsx` — implement full React context matching the `useApp()` contract in `specs/042-claude-prototype-local-port/contracts/store-api.md`: session state, UI state (lang/theme), computed values (isAuthenticated, isOnboardingComplete, isCommerceOSActive, isCommerceSetupComplete, BUSINESS_UNITS, BRANCHES, COMMERCE_PLAN, money, t), auth actions (createUser, loginUser, logoutUser), workspace actions, onboarding actions, Commerce setup actions, Commerce CRUD actions (addProduct, updateProduct, deleteProduct, createOrder, createInvoice, createCustomer, updateCustomer), setCurrent. Ensure `setLang('ar')` sets `document.documentElement.dir = 'rtl'` imperatively.
- [X] T013 Create `apps/core-platform/lib/store/index.ts` — re-export `AppProvider`, `useApp` and all catalog constants from `lib/store/`
- [X] T014 Update `apps/core-platform/app/layout.tsx` — wrap children with `<AppProvider>` and `<ToastHost />`; add `suppressHydrationWarning` to `<html>` element (needed for dir/lang attribute changes)

### Shared UI Components

- [X] T015 [P] Create `apps/core-platform/components/ui/Avatar.tsx` — initials-based circle avatar; props: `name: string`, `size?: number`; derive initials from first letter of each word in name; background color derived from name hash
- [X] T016 [P] Create `apps/core-platform/components/ui/Badge.tsx` — inline badge pill; props: `tone: "accent" | "warn" | "danger" | "neutral" | "success"`, `icon?: string`, `children: ReactNode`; maps tone to CSS variable colors
- [X] T017 [P] Create `apps/core-platform/components/ui/BrandMark.tsx` — business unit logo mark; props: `name: string`, `logo?: string | null`, `size?: number`, `radius?: number`; shows logo image if provided, else initials fallback with color derived from name
- [X] T018 [P] Create `apps/core-platform/components/ui/Toast.tsx` and `apps/core-platform/components/ui/ToastHost.tsx` — toast notification system; `Toast` renders a single toast (message, type, dismiss button); `ToastHost` renders active toasts stack; wired to AppProvider `showToast` action

### Shell Components

- [X] T019 Create `apps/core-platform/components/shell/Shell.tsx` — generic shell; props: `mode: "core" | "commerce"`, `navItems: NavGroup[]`, `crumb?: ReactNode`, `children: ReactNode`; structure: dark `nx-app-root` outer → dark `nx-topbar` (logo+product name left, search center, BranchPill if commerce, ThemeToggle, LocaleToggle, NotificationsDropdown, separator, UserMenuDropdown right) → light `nx-page-canvas` (sidebar left + main content right); sidebar: logo top, ContextSwitcher, nav links, UserMenu compact bottom; mobile: burger → sidebar overlay with scrim
- [X] T020 Create `apps/core-platform/components/shell/ContextSwitcher.tsx` — workspace/BU switcher dropdown; mode "core" shows workspace name; mode "commerce" shows current BU name + branch; dropdown lists workspace, BU list, branch list; wired to AppProvider (BUSINESS_UNITS, BRANCHES, setCurrent)
- [X] T021 [P] Create `apps/core-platform/components/shell/CoreShell.tsx` — wraps Shell with mode="core" and pre-configured nav: Product Hub (`/dashboard/apps`, layout-grid icon), Billing (`/dashboard/billing`, credit-card), Team (`/dashboard/team`, users), Integrations (`/dashboard/integrations`, plug), Settings (`/dashboard/settings`, settings)
- [X] T022 [P] Create `apps/core-platform/components/shell/CommerceShell.tsx` — wraps Shell with mode="commerce" and Commerce OS nav: Dashboard (`/commerce/dashboard`, layout-dashboard), POS (`/commerce/pos`, scan-barcode), Products (`/commerce/products`, package), Inventory (`/commerce/inventory`, boxes), Orders (`/commerce/orders`, shopping-bag), Invoices (`/commerce/invoices`, receipt), Customers (`/commerce/customers`, user-round), Reports (`/commerce/reports`, bar-chart-3), Settings (`/commerce/settings`, settings)

### Topbar Controls

- [X] T023 [P] Update `apps/core-platform/components/dashboard/ThemeToggle.tsx` — use `useApp()` for `theme` and `toggleTheme`; sun/moon icon toggle
- [X] T024 [P] Update `apps/core-platform/components/dashboard/LocaleToggle.tsx` — use `useApp()` for `lang` and `setLang`; EN/ع button pair; `setLang` triggers `document.documentElement.dir` update
- [X] T025 [P] Update `apps/core-platform/components/dashboard/NotificationsDropdown.tsx` — use `useApp()` for `products`, `orders`, `COMMERCE_PLAN`, `money`; show low stock, out-of-stock, latest order, subscription status notifications
- [X] T026 [P] Update `apps/core-platform/components/dashboard/UserMenuDropdown.tsx` — use `useApp()` for `currentUser`, `currentUserDisplayName`, `logoutUser`; menu items: Account → `/dashboard/settings`, Billing → `/dashboard/billing`, Team → `/dashboard/team`, Sign out → `logoutUser()` then `/login`
- [X] T027 [P] Create `apps/core-platform/components/dashboard/BranchPill.tsx` — branch selector pill for Commerce topbar; use `useApp()` for `BRANCHES`, `currentBranch`, `setCurrent`; dropdown on click

### Dashboard Layout Update

- [X] T028 Update `apps/core-platform/app/dashboard/layout.tsx` — replace direct `<Sidebar>` + `<Topbar>` imports with `<CoreShell>`; keep `<DashboardOnboardingGuard>` or replace its guard logic with AppProvider's `isOnboardingComplete`

**Checkpoint**: Foundation complete. Verify shell renders at `/dashboard`, theme toggle works, lang toggle switches to AR and flips layout direction, AppProvider reads/writes localStorage correctly.

---

## Phase 3: User Story 1 — New User Registration and Onboarding (Priority: P1) 🎯 MVP

**Goal**: A new user can register, see the welcome gateway, complete onboarding (Language → Workspace → Branch → OS → Plan → BU), complete Commerce Setup (8 steps), and land on the Commerce OS Dashboard.

**Independent Test**: Start at `/register` → create account → complete all onboarding steps → verify `/commerce/dashboard` loads with empty-state Commerce OS data and setup reflected in the Dashboard header.

### Auth Components

- [X] T029 Create `apps/core-platform/components/auth/AuthShell.tsx` — dark stage layout for all auth screens; props: `title: string`, `subtitle?: string`, `footer?: ReactNode`, `narrow?: boolean`, `children: ReactNode`; structure: `nx-auth` (dark bg + glow) → `nx-auth-stage` → wordmark button (links to `/`, does NOT redirect landing) → `nx-auth-card` (white card with head + children) → legal footer ("By continuing…"); apply auth.css-equivalent styles via Tailwind + CSS variables from T006
- [X] T030 [P] Create `apps/core-platform/components/auth/PasswordInput.tsx` — password input with show/hide eye toggle; props: `value`, `onChange`, `placeholder?`, `error?`, `autoComplete?`; wraps `Input` from `@nexoraxs/ui`
- [X] T031 [P] Create `apps/core-platform/components/auth/PasswordStrength.tsx` — 4-bar strength indicator; props: `password: string`; compute strength (0–4): 1pt ≥8 chars, 1pt upper+lower, 1pt digit, 1pt special; show label: Too weak / Weak / Fair / Good / Strong
- [X] T032 [P] Create `apps/core-platform/components/auth/SocialAuth.tsx` — Google + Facebook placeholder buttons; clicking either calls `showToast("{Provider} sign-in is coming soon", "info")`; includes "or" divider above the button row

### Auth Screens — US1

- [X] T033 [US1] Rewrite `apps/core-platform/app/register/page.tsx` — fields: Full name, Email, Password (with PasswordStrength), Confirm password; validation: name required, valid email regex, strength ≥ 2, passwords match; on submit: `createUser()` → if "email_taken" show inline error, else redirect to `/welcome`; include `<SocialAuth />` and link to `/login`; wrap in `<AuthShell title="Create your account">`
- [X] T034 [US1] Rewrite `apps/core-platform/app/verify-email/page.tsx` — placeholder confirmation screen; show "Check your inbox" message with email address displayed; "Resend email" button shows toast; "Continue" link to `/onboarding`; wrap in `<AuthShell title="Verify your email" narrow>`

### Welcome Gateway — US1

- [X] T035 [US1] Create `apps/core-platform/app/welcome/page.tsx` — post-registration welcome screen; show NexoraXS logo, "Welcome to NexoraXS, {currentUserDisplayName}" heading, platform tagline, "Get started" CTA button → `/onboarding`; guard: if `isOnboardingComplete` redirect to `/commerce/dashboard`; use `useApp()` for `currentUserDisplayName`; minimal full-screen layout (no shell)

### Onboarding Wizard — US1

- [X] T036 [US1] Create `apps/core-platform/components/onboarding/PhaseStepper.tsx` — two-phase progress stepper; props: `currentStep: number`, `totalSteps: number`, `coreCount: number`; renders Phase 1 "Core Setup" (steps 0..coreCount-1) and Phase 2 "Activation" (steps coreCount..totalSteps-1) as groups; active phase highlighted, done phase marked complete; step dots within each phase group
- [X] T037 [US1] Rewrite `apps/core-platform/app/onboarding/page.tsx` — 6-step wizard using `<PhaseStepper coreCount={3}>`:
  - Step 1 Language: EN/AR card selector; calls `setLocale()`
  - Step 2 Workspace: name, country, currency, timezone inputs; calls `createWorkspace()`
  - Step 3 Main Branch: branch name input, inherits country+currency from workspace; calls `createBranch({ isMain: true })`
  - Step 4 OS Launcher: OS cards grid; Commerce available (click to select), others "Coming Soon"; calls `selectOS("commerce")`
  - Step 5 Plan: Starter/Pro/Business cards with feature lists from `ONB_PLANS`; calls `selectPlan()`
  - Step 6 Business Unit: name input + preset grid from `OS_BU_PRESETS.commerce`; calls `createBusinessUnit()`; on finish calls `completeOnboarding()` → redirect to `/commerce/setup`
  - Guard: if `isOnboardingComplete` redirect to `/commerce/dashboard`
  - Minimal layout (no shell): sticky top bar with logo + LocaleToggle + ThemeToggle

### Commerce Setup Wizard — US1

- [X] T038 [US1] Create `apps/core-platform/app/commerce/setup/layout.tsx` — minimal layout: sticky topbar (logo left, step counter right, ThemeToggle/LocaleToggle), full-width content below; no sidebar; uses `<AppProvider>` already from root layout
- [X] T039 [US1] Create `apps/core-platform/app/commerce/setup/page.tsx` — 8-step wizard with progress bar:
  - Step 1 Identity: displayName (required), legalName, phone, email, address, city, country, CRN, TRN, logo upload placeholder
  - Step 2 Preset: show preset from onboarding BU; allow change via `OS_BU_PRESETS.commerce` grid
  - Step 3 Mode: physical / online / both — 3 option cards
  - Step 4 Tax: VAT registered toggle, VAT rate input (default 14), prices-include-tax toggle, tax label, tax number
  - Step 5 Numbering: invoice prefix (default "INV"), invoice start (default 1001), receipt prefix (default "RCPT"), receipt start (default 1001), footer text, return policy text
  - Step 6 Templates: receipt size (58mm/80mm/A4 cards), receipt style (classic/modern), invoice template (a4-simple/a4-branded)
  - Step 7 Categories: add/remove text tags list; pre-suggested categories from preset
  - Step 8 Review: summary card showing all choices; "Finish Setup" CTA calls `saveCommerceSetup(data)` → redirect to `/commerce/dashboard`
  - Guard: if `isCommerceSetupComplete` redirect to `/commerce/dashboard`
  - Each step validates required fields before enabling "Next"

### Commerce Layout + Minimal Dashboard — US1

- [X] T040 [US1] Create `apps/core-platform/app/commerce/layout.tsx` — wraps all `/commerce/*` routes (except setup) with `<CommerceShell>`; client-side guards via `useEffect`: if `!isAuthenticated` → `/login`; if `!isOnboardingComplete` → `/onboarding`; if `!isCommerceOSActive` → `/dashboard/apps`; if `!isCommerceSetupComplete` → `/commerce/setup`; show loading spinner while session resolves
- [X] T041 [US1] Create `apps/core-platform/app/commerce/dashboard/page.tsx` — Commerce Dashboard with empty-state support; metrics row: Today's Sales, Orders Today, Gross Sales, VAT Collected, Net Sales with period selector (Today/Week/Month); setup checklist card (identity, tax, template, first product, first sale) shown when not all done — dismissable; low stock alerts section (empty state when no products); best sellers table (empty state); recent orders list (empty state); quick actions bar: Add Product, New Sale, Add Customer, Stock Adjustment, Z-Report; all metrics from `useApp()` via `commerce-helpers.ts`; use `<CommerceShell>`

**Checkpoint — US1**: Start at `/register`, create account, complete all 6 onboarding steps, complete all 8 Commerce Setup steps, confirm Commerce Dashboard loads at `/commerce/dashboard` with empty-state data and setup details reflected in BU name and period selector.

---

## Phase 4: User Story 2 — Returning User Login and Commerce Operations (Priority: P1)

**Goal**: An existing user logs in, navigates to Commerce OS Dashboard, opens POS, completes a walk-in sale and a customer-linked sale, and sees new records in Orders and Invoices.

**Independent Test**: Login with seeded account (or account created in US1) → open POS → add 2 products → complete walk-in sale → confirm order in Orders list, invoice in Invoices list, Dashboard Today metrics updated, stock decremented in Inventory.

### Login Screen — US2

- [X] T042 [US2] Rewrite `apps/core-platform/app/login/page.tsx` — fields: email, password (with `PasswordInput` show/hide); on submit: `loginUser()` → if "invalid_credentials" show inline error; on success: if `isOnboardingComplete` and `isCommerceSetupComplete` → `/commerce/dashboard`; else if `isOnboardingComplete` → `/commerce/setup`; else → `/onboarding`; include `<SocialAuth />`, "Forgot password" link to `/forgot-password`, link to `/register`; preserve `?reset=success` banner; wrap in `<AuthShell title="Sign in to NexoraXS">`

### Commerce Dashboard (Full Metrics) — US2

- [X] T043 [US2] Update `apps/core-platform/app/commerce/dashboard/page.tsx` — wire period selector to `nxOrdersForPeriod(orders, period)`; compute all metrics with `nxRevenue`, `nxBestSellers`, `nxGroupSales` from `commerce-helpers.ts`; render best sellers table (product name, sold qty, revenue); render recent orders list (order num, date, customer or "Walk-in", total); wire quick actions to navigate to correct routes

### Products — US2

- [X] T044 [P] [US2] Create `apps/core-platform/app/commerce/products/page.tsx` — products table: name, SKU, category, price, stock (with color coding: red=0, amber=low, green=ok), taxable badge, edit/delete actions; search input filters by name/SKU/barcode; category filter dropdown from `getCommerceSetup().categories`; "Add Product" button → `/commerce/products/new`; empty state with CTA; data from `useApp().products`
- [X] T045 [P] [US2] Create `apps/core-platform/app/commerce/products/new/page.tsx` — add product form: name (required), SKU, barcode, category select (from setup categories), price (required, number), cost, stock (number, default 0), low stock threshold (default 5), taxable toggle, notes textarea; "Save" calls `addProduct()` → redirect to `/commerce/products`; "Cancel" → back; validation: name and price required; wrap in minimal layout with back button

### POS — US2

- [X] T046 [US2] Create `apps/core-platform/app/commerce/pos/page.tsx` — split layout: product panel left (search input + product grid; click product adds to cart; search by name/SKU/barcode); cart panel right:
  - Line items: product name, qty +/- controls, remove button, line total
  - Customer selector: "Walk-in" default + "Add/select customer" option using `useApp().customers`
  - Discount input (EGP amount)
  - Totals section: subtotal, discount, VAT (computed from `taxBreak()`), total
  - Payment method: Cash/Card/Wallet selector
  - "Complete Sale" button (disabled if cart empty)
  - On Complete Sale: validate cart non-empty; call `createOrder({items, customerId, payment, discount, vat, total, net})`; call `createInvoice(order.id)`; call `updateProduct` for each item to decrement stock; if customerId non-null, no extra action needed (order links to customer); redirect to `/commerce/pos/success` passing orderId via sessionStorage
  - Walk-in = `customerId: null` — must NOT create customer entity
  - Empty cart state with scan/search illustration

- [X] T047 [US2] Create `apps/core-platform/app/commerce/pos/success/page.tsx` — sale success screen; read orderId from sessionStorage; load order and invoice from `useApp()`; show order number, total, payment method, items list; "New Sale" button clears and redirects to `/commerce/pos`; "View Invoice" → `/commerce/invoices/[id]`; "Print Receipt" shows toast "Printing coming soon"

### Orders — US2

- [X] T048 [P] [US2] Create `apps/core-platform/app/commerce/orders/page.tsx` — orders table: order num, date (formatted), customer name or "Walk-in", item count, total (formatted with `money()`), payment method badge; search by order num or customer name; date range filter; "No orders yet" empty state; click row → `/commerce/orders/[id]`; data from `useApp().orders` sorted newest first
- [X] T049 [P] [US2] Create `apps/core-platform/app/commerce/orders/[id]/page.tsx` — order detail page; show header (order num, date, status badge); customer info section (name, phone, or "Walk-in"); line items table (product name, qty, unit price, line total); totals section (subtotal, discount, VAT, total); payment method; "View Invoice" link; back to orders breadcrumb

### Invoices — US2

- [X] T050 [P] [US2] Create `apps/core-platform/app/commerce/invoices/page.tsx` — invoices table: invoice num, order num, date, customer or "Walk-in", total, VAT; search and date filter; empty state; click row → `/commerce/invoices/[id]`; data from `useApp().invoices` sorted newest first
- [X] T051 [P] [US2] Create `apps/core-platform/app/commerce/invoices/[id]/page.tsx` — invoice detail: header (invoice num, date), business identity block (from `getCommerceSetup()`), customer info, line items with tax breakdown per line, totals (subtotal, discount, VAT, total, net), invoice footer text; "View Document" button → `/commerce/invoices/[id]/document`; "Print" shows toast
- [X] T052 [P] [US2] Create `apps/core-platform/app/commerce/invoices/[id]/document/page.tsx` — printable document view; port from `docs/claude.aidesign/app/documents.jsx`; renders full A4-style or thermal receipt depending on `getCommerceSetup().invoiceTemplate`; includes business logo/name, invoice num, date, line items, tax breakdown, totals, footer text, return policy; print button uses `window.print()`; minimal layout (topbar only)

**Checkpoint — US2**: Login with existing account → open POS → add 2 products to cart → complete walk-in sale → verify: new order in `/commerce/orders`, new invoice in `/commerce/invoices`, Dashboard Today Sales updated, Inventory stock decremented. Then complete customer sale → verify customer record in Customers list.

---

## Phase 5: User Story 3 — Commerce OS Data Consistency (Priority: P2)

**Goal**: All Commerce OS screens read from the same shared data contract. No screen shows static fake data. Session persists on browser refresh. Clearing storage resets to unauthenticated state.

**Independent Test**: Add a product → make a POS sale → open Dashboard, Orders, Invoices, Reports simultaneously → confirm all screens show the same sale data. Refresh browser → confirm same authenticated state. Clear localStorage → confirm return to `/login`.

### Inventory — US3

- [X] T053 [US3] Create `apps/core-platform/app/commerce/inventory/page.tsx` — inventory table: product name, category, stock level, low threshold, status badge (Out/Low/OK with colors); filter tabs: All / Low Stock / Out of Stock; inline stock adjustment: input field per row → "Update" calls `updateProduct(id, { stock: newValue })`; data from `useApp().products`; zero-stock products still shown with out-of-stock badge

### Reports — US3

- [X] T054 [US3] Create `apps/core-platform/app/commerce/reports/page.tsx` — period selector (Today/Week/Month); summary cards: Gross Sales, Net Sales, VAT Collected, Order Count — all from `nxRevenue` + `nxOrdersForPeriod`; sales by category breakdown (aggregate order items by product category); best sellers table (top 10 by quantity and by revenue, two separate tables); sales rhythm section (grouped by hour for Today, by day for Week/Month using `nxGroupSales`); all data from `useApp()` orders+invoices+products; empty state when no data

### Commerce Settings — US3

- [X] T055 [US3] Create `apps/core-platform/app/commerce/settings/page.tsx` — tabbed or section layout:
  - Identity section: displayName, legalName, phone, email, address, city, country, CRN, TRN, logo; "Save" calls `saveCommerceSetup({ ...identityFields })`
  - Tax section: vatRegistered toggle, vatRate, pricesIncludeTax toggle, taxLabel, taxNumber; "Save" calls `saveCommerceSetup({ ...taxFields })`
  - Numbering section: invoicePrefix, invoiceStart, receiptPrefix, receiptStart, footer, returnPolicy; "Save"
  - Templates section: receiptSize cards, receiptStyle cards, invoiceTemplate cards; "Save"
  - Categories section: tag list with add/remove; "Save"
  - Wired to `useApp().getCommerceSetup()` for initial values and `saveCommerceSetup()` for saves

### Core Platform Screens — US3

- [X] T056 [P] [US3] Rewrite `apps/core-platform/app/dashboard/apps/page.tsx` — OS Launcher / Product Hub; 6 OS cards from `OPERATING_SYSTEMS`; Commerce OS: if subscription active/trial → "Open Commerce OS" CTA → `/commerce/dashboard`; if no subscription → "Set up" CTA → `/commerce/setup`; other 5 OS: "Coming Soon" badge, locked/dim styling; use `CoreShell`; wired to `useApp().subscriptions`
- [X] T057 [P] [US3] Rewrite `apps/core-platform/app/dashboard/billing/page.tsx` — show current OS subscription card: OS name, plan name, status badge (Trial/Active), trial-end or renewal date, plan price; "Upgrade" button → `showToast("Upgrade coming soon")`; plan features list from `PLAN_CATALOG`; use `CoreShell`; wired to `useApp().COMMERCE_PLAN`
- [X] T058 [P] [US3] Rewrite `apps/core-platform/app/dashboard/team/page.tsx` — team members table: avatar, name, email, role badge; "Invite" button opens inline invite form (email + role select) or wires to existing `InviteUserModal.tsx` if compatible; use `CoreShell`; wired to `useApp().currentWorkspace` for member data (stub with current user in Phase 1)
- [X] T059 [P] [US3] Rewrite `apps/core-platform/app/dashboard/integrations/page.tsx` — integrations list with available/coming-soon status badges; show 4–6 integration cards (e.g., Accounting, WhatsApp, Delivery, E-Commerce — all "Coming Soon" in Phase 1); use `CoreShell`
- [X] T060 [P] [US3] Rewrite `apps/core-platform/app/dashboard/settings/page.tsx` — Platform Settings: workspace name, country, currency, timezone; editable form → save via `useApp().createWorkspace()` update path or direct `saveSession`; account section: current user name, email (display only); use `CoreShell`

### Persistence QA — US3

- [ ] T061 [US3] Verify session persistence: navigate through `/commerce/dashboard` → `/commerce/pos` → `/commerce/orders`; refresh browser at each step; confirm AppProvider re-hydrates from localStorage correctly with no ghost state or blank screens
- [ ] T062 [US3] Verify storage reset: clear all `nexoraxs.*` keys from localStorage via browser devtools; reload; confirm app returns to `/login`; confirm no stale data appears in any screen after re-registration

**Checkpoint — US3**: All Commerce OS screens show data from the same AppProvider. Refresh keeps session. Storage clear resets app. Products/Dashboard/Inventory/Reports all reflect the same POS sales. Landing page (`/`) is confirmed unchanged.

---

## Phase 6: User Story 4 — Forgot Password and Reset Flow (Priority: P2)

**Goal**: A user who has forgotten their password can complete the full mock forgot/reset flow and be returned to login with a success banner.

**Independent Test**: From `/login`, click "Forgot password" → submit email → see confirmation → navigate to `/reset-password` → submit new password → redirected to `/login?reset=success` → confirm success banner shown.

- [X] T063 [US4] Rewrite `apps/core-platform/app/forgot-password/page.tsx` — single email input; "Send reset link" button; on submit: mock success — replace form with confirmation message "Check your email — we sent a reset link to {email}"; "Back to login" link; wrap in `<AuthShell title="Reset your password">`
- [X] T064 [US4] Rewrite `apps/core-platform/app/reset-password/page.tsx` — fields: new password (with `PasswordInput` + `PasswordStrength`), confirm password; validation: strength ≥ 2, passwords match; on submit: mock success → redirect to `/login?reset=success`; "Back to login" link; wrap in `<AuthShell title="Set new password">`
- [ ] T065 [US4] Verify login screen `?reset=success` banner: navigate to `/login?reset=success`; confirm green success banner "Password reset successfully — you can now sign in." is visible and auto-dismisses after 4 seconds (already present in T042 but verify it reads the `useSearchParams` correctly and triggers the timer)

**Checkpoint — US4**: Complete forgot → reset → login flow without backend. All screens polished and branded.

---

## Phase 7: User Story 5 — Customer Profile Management (Priority: P3)

**Goal**: Users can view the full customer profile with purchase history, lifetime value, and contact details.

**Independent Test**: Complete a POS sale with a customer selected → open `/commerce/customers` → click the customer → confirm profile shows contact info, total spend, order count, and the recent order from the sale.

- [X] T066 [US5] Create `apps/core-platform/app/commerce/customers/page.tsx` — customers table: avatar/initials, name, phone, email, total orders (count of orders where customerId matches), total spend (sum of order totals); search by name/phone/email; "Add Customer" button opens inline form or modal: name (required), phone, email, notes → calls `createCustomer()`; click row → `/commerce/customers/[id]`; empty state with note that customers are created via POS or manually; data from `useApp().customers` with computed totals from `useApp().orders`
- [X] T067 [US5] Create `apps/core-platform/app/commerce/customers/[id]/page.tsx` — customer profile page: avatar (large), name, phone, email, notes; stats row: lifetime spend (sum of linked orders), total orders, first order date, last order date; recent orders section: table of orders where `customerId === customer.id` showing order num, date, items count, total; inline edit for contact fields (name, phone, email, notes) → "Save" calls `updateCustomer(id, data)`; back breadcrumb to `/commerce/customers`; all data from `useApp()` (customers + orders filtered by customerId)

**Checkpoint — US5**: Create customer via POS → open customer profile → confirm order appears in history → edit contact info → confirm save persists on refresh.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: TypeScript clean, lint clean, landing page verification, archive superseded files, update AGENTS.md.

- [X] T068 [P] Run `tsc --noEmit` from `apps/core-platform/` — fix all TypeScript errors; enforce no `any` types; add explicit return types to all exported functions
- [X] T069 [P] Run `pnpm lint` from `apps/core-platform/` — fix all ESLint errors and warnings
- [X] T070 [P] Verify landing page unchanged: run `git diff apps/core-platform/app/page.tsx` — must show no changes; visually open `/` in browser and confirm landing page looks and behaves exactly as before the port
- [X] T071 Archive superseded files to `apps/core-platform/_archive/` after verifying replacements working: `components/onboarding/OnboardingStepper.tsx`, `components/onboarding/steps/`, `lib/mock-data/apps.ts`, `lib/mock-data/nav-items.ts`; mark `lib/core-session.ts`, `lib/core-theme.ts`, `lib/locale.ts` with `// @deprecated - use lib/store/ instead` comment
- [X] T072 Mark old `components/dashboard/Sidebar.tsx` and `components/dashboard/Topbar.tsx` as `// @deprecated - use components/shell/Shell.tsx` if they are no longer directly imported; archive if safe
- [X] T073 Update `AGENTS.md` — document new route tree under `app/commerce/`, new data adapter at `lib/store/`, new shell components at `components/shell/`, archived old files; confirm active plan reference points to `specs/042-claude-prototype-local-port/plan.md`
- [ ] T074 Final visual QA — open `docs/claude.aidesign/NexoraXS Commerce OS Full MVP Journey.html` side-by-side with local app at `http://localhost:3000`; walk through all screens: Auth → Welcome → Onboarding → Commerce Setup → Dashboard → POS → Products → Inventory → Orders → Invoices → Customers → Reports → Settings; document and fix any critical visual discrepancies (layout, color, spacing)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — **BLOCKS all user stories**
- **US1 (Phase 3)**: Depends on Phase 2 — can start after Foundational checkpoint
- **US2 (Phase 4)**: Depends on Phase 2 + US1 (needs AppProvider, Shell, auth flow, Commerce layout to exist)
- **US3 (Phase 5)**: Depends on Phase 2 + US1 + US2 (needs Commerce screens and POS data to test consistency)
- **US4 (Phase 6)**: Depends on Phase 2 + auth components from US1 (T029–T032) — mostly independent
- **US5 (Phase 7)**: Depends on Phase 2 + US2 (POS must exist to create customer-linked orders)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

```
Phase 1 (Setup)
  └─> Phase 2 (Foundational)
        ├─> Phase 3 US1 (Registration + Onboarding) ← MVP entry point
        │     └─> Phase 4 US2 (Login + Commerce Operations)
        │           └─> Phase 5 US3 (Data Consistency)
        │                 └─> Phase 7 US5 (Customer Profile)
        └─> Phase 6 US4 (Forgot/Reset Password) ← can run in parallel with US1
```

### Within Each Phase

- Tasks marked `[P]` within the same phase can run in parallel (no shared file dependencies)
- Tasks without `[P]` must run sequentially or after their within-phase prerequisites
- Phase 2 (T007–T028): T007–T008 parallel first → T009–T011 parallel → T012 → T013 → T014 → T015–T018 parallel → T019 → T020 → T021–T027 parallel → T028

### Parallel Opportunities

```bash
# Phase 2 — data layer (all parallel):
T007  # storage-keys.ts
T008  # catalogs.ts

# Phase 2 — then helpers (all parallel):
T009  # db.ts
T010  # i18n.ts
T011  # commerce-helpers.ts

# Phase 2 — UI primitives (all parallel after T006):
T015  # Avatar.tsx
T016  # Badge.tsx
T017  # BrandMark.tsx
T018  # Toast + ToastHost

# Phase 2 — shell (parallel after T019 base shell):
T021  # CoreShell.tsx
T022  # CommerceShell.tsx

# Phase 3 — auth components (all parallel after T006, T029):
T030  # PasswordInput.tsx
T031  # PasswordStrength.tsx
T032  # SocialAuth.tsx

# Phase 4 — Commerce OS screens (parallel after T040 layout):
T044  # Products list
T045  # Add Product
T048  # Orders list
T049  # Order detail
T050  # Invoices list
T051  # Invoice detail
T052  # Invoice document

# Phase 5 — Core Platform screens (all parallel after Phase 2):
T056  # OS Launcher
T057  # Billing
T058  # Team
T059  # Integrations
T060  # Platform Settings

# Phase 8 — Polish (all parallel):
T068  # TypeScript check
T069  # Lint check
T070  # Landing page verify
```

---

## Parallel Example: Phase 2 Data Adapter

```bash
# Step 1 — run together:
T007: Create lib/store/storage-keys.ts
T008: Create lib/store/catalogs.ts

# Step 2 — run together (after T007+T008):
T009: Create lib/store/db.ts
T010: Create lib/store/i18n.ts
T011: Create lib/store/commerce-helpers.ts

# Step 3 — sequential (needs all above):
T012: Create lib/store/AppProvider.tsx
T013: Create lib/store/index.ts
T014: Update app/layout.tsx with AppProvider

# Step 4 — run together:
T015: Avatar.tsx     T016: Badge.tsx     T017: BrandMark.tsx     T018: Toast.tsx
T021: CoreShell.tsx  T022: CommerceShell.tsx  T023–T027: topbar controls
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks everything)
3. Complete Phase 3: US1 (register → onboarding → commerce setup → dashboard empty state)
4. **STOP and VALIDATE**: Full US1 flow works end-to-end
5. Demo to stakeholders if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready (shell + data adapter)
2. Phase 3 US1 → Register + Onboard + Setup → MVP ✅
3. Phase 4 US2 → Login + POS + Sales + Orders/Invoices → Daily operations ✅
4. Phase 5 US3 → Data consistency + Core Platform screens → Full product ✅
5. Phase 6 US4 → Forgot/Reset password → Complete auth ✅
6. Phase 7 US5 → Customer profiles → Enhanced CRM ✅
7. Phase 8 → Polish + cleanup → Ship ✅

### Single Developer Strategy

Work sequentially: Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8.

Within each phase, batch the `[P]` tasks in a single agent/session call since they touch different files.

---

## Task Count Summary

| Phase | Tasks | Parallel | Description |
|-------|-------|----------|-------------|
| Phase 1: Setup | T001–T005 | 4 of 5 | Directory scaffolding |
| Phase 2: Foundational | T006–T028 | 16 of 23 | Design tokens + data adapter + shell |
| Phase 3: US1 | T029–T041 | 4 of 13 | Auth + Welcome + Onboarding + Commerce Setup + Dashboard |
| Phase 4: US2 | T042–T052 | 8 of 11 | Login + POS + Orders + Invoices |
| Phase 5: US3 | T053–T062 | 6 of 10 | Inventory + Reports + Settings + Core Platform + Persistence |
| Phase 6: US4 | T063–T065 | 0 of 3 | Forgot + Reset password |
| Phase 7: US5 | T066–T067 | 0 of 2 | Customers + Customer profile |
| Phase 8: Polish | T068–T074 | 3 of 7 | TS clean + lint + landing verify + archive |
| **Total** | **74 tasks** | **41 parallelizable** | |

---

## Notes

- `[P]` tasks touch different files — safe to dispatch in parallel
- `[US#]` label maps each task to its user story for full traceability
- Landing page (`app/page.tsx`) must show zero diff at every phase checkpoint
- Each phase boundary is a natural demo/validation point
- Commit after each completed phase, not after every individual task
- The prototype at `docs/claude.aidesign/` is read-only reference — never modify prototype files
