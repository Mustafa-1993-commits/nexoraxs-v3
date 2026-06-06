# Feature Specification: Claude Prototype Local Port

**Feature Branch**: `041-core-platform-ux-alignment`
**Spec Directory**: `specs/042-claude-prototype-local-port/`
**Created**: 2026-06-06
**Status**: Draft

---

## Problem Statement

The NexoraXS Claude prototype (`docs/claude.aidesign/`) contains a complete, polished authenticated product experience — auth screens, welcome gateway, onboarding wizard, OS activation, Commerce setup, and all Commerce OS screens (POS, Products, Inventory, Orders, Invoices, Customers, Reports, Settings). This prototype represents the intended design direction for the real local application.

The current local application (`apps/core-platform/`) has partial implementations of these screens, but they do not visually match the prototype, are missing large sections of the product experience (Commerce OS screens, Commerce setup wizard, Welcome gateway, OS launcher), and use disconnected mock data that does not follow the relational data contract established in the prototype.

The gap between the prototype and the local app creates confusion about what is actually built, makes it difficult to continue development consistently, and risks the polished UX being lost as implementation proceeds.

**The existing public landing page must remain exactly as it is. Landing is fully out of scope.**

---

## Goal

Port the authenticated product experience from the Claude prototype into the real local NexoraXS application — visually 1:1 as much as practical — while preserving the local app's architecture, routing conventions, and NexoraXS branding. The result is a complete, runnable, visually polished local app that starts from Login/Register and covers every authenticated product screen through Commerce OS operations.

---

## Scope

The scope of this feature starts from the first unauthenticated entry point visible to a prospective user: **Login / Create Account**.

### Application Boundary Correction

Commerce screens belong to the Commerce app, not the Core Platform app.

- `apps/core-platform` owns auth, welcome, onboarding, Core dashboard, Product Hub, billing, team, integrations, and platform settings.
- `apps/commerce` owns Commerce setup, Commerce shell, Commerce dashboard, POS, products, inventory, orders, invoices, customers, reports, and Commerce settings.
- The previous `apps/core-platform/app/commerce` route tree is deprecated and must be removed after migration.
- In local development, Core Platform runs on its existing configured port (`3001`) and Commerce runs on `3002`.
- Core Platform Product Hub links to the Commerce app at `http://localhost:3002` in local development.
- Commerce must not import from `apps/core-platform` internals. Shared reusable code should move to a shared package later, or be duplicated temporarily inside Commerce during this boundary fix.
- The relational mock data contract remains shared through the same `nexoraxs.*` localStorage/sessionStorage keys across apps.

### In Scope

| Area | Entry Point | Coverage |
|------|-------------|----------|
| Auth | `/login` | Login, Register, Forgot Password, Reset Password, (Email Verify placeholder) |
| Social Login | `/login`, `/register` | Google and Facebook buttons as UI placeholders only — no real auth |
| Post-auth Welcome | `/welcome` or redirect | Welcome gateway screen after first registration |
| Core Onboarding | `/onboarding` | Language → Workspace → Main Branch (3 steps) |
| OS Activation | `/onboarding` (Phase 2) | Choose OS → Choose Plan → Business Unit setup |
| Commerce Setup Wizard | `/commerce/setup` | Identity → Preset confirmation → Mode → Tax → Numbering → Templates → Categories → Review |
| Commerce App Shell | Layout wrapping all Commerce screens | Dark topbar, mounted light canvas, sidebar, main content area |
| Dashboard | `/commerce/dashboard` | Metrics (today/week/month), quick actions, low stock alerts, recent orders, best sellers |
| POS | `/commerce/pos` | Product search/scan, cart, walk-in sale, customer-linked sale, payment, receipt |
| Products | `/commerce/products` | Product list, add product, edit product |
| Inventory | `/commerce/inventory` | Stock levels, low stock view, stock adjustment |
| Orders | `/commerce/orders` | Order list, order detail drawer/page |
| Invoices | `/commerce/invoices` | Invoice list, invoice detail, document view |
| Customers | `/commerce/customers` | Customer list, customer drawer, full profile page |
| Reports | `/commerce/reports` | Sales summary, revenue, VAT, best sellers, by category |
| Commerce Settings | `/commerce/settings` | Business identity, tax, numbering, templates, categories |
| Core Platform Shell | Layout wrapping core screens | Product Hub, Billing, Team, Integrations, Platform Settings |
| OS Launcher / Product Hub | `/dashboard/apps` or `/os-launcher` | Choose OS cards, available vs coming soon |
| Billing | `/dashboard/billing` | Subscription info, plan details |
| Team | `/dashboard/team` | Team members list, invite |
| Integrations | `/dashboard/integrations` | Integrations list |
| Platform Settings | `/dashboard/settings` | Account / workspace settings |
| Mock Data Adapter | `lib/store/` or equivalent | Frontend data contract matching prototype DB schema — backend-ready |

### Explicitly Out of Scope

- **Landing page** — The existing public landing page (`app/page.tsx` and all landing routes, components, CSS, marketing sections) must not be inspected for porting, modified, replaced, or redirected. It remains exactly as it is.
- **Public marketing pages** — Public pricing, public homepage navigation, public website CSS.
- **Backend APIs** — No new server-side API routes, database migrations, or backend auth changes.
- **Real social login** — Google and Facebook auth remain UI-only placeholders.
- **Real payment integration** — No Stripe, Paymob, or production payment processing.
- **Other OS screens** — Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS screens (only Commerce OS is available).

---

## Non-Goals

- Redesigning the landing page or public marketing experience.
- Building a backend API layer in this phase.
- Production-readiness for payment or auth (this remains a mock-data frontend phase).
- Changing the root public homepage route or any public navigation.
- Iframing the Claude HTML as a static public page.
- Migrating unrelated architecture that is not part of the authenticated product experience.

---

## User Journeys

### User Story 1 — New User Registration and Onboarding (Priority: P1)

A new user visits the app, creates an account, and completes the full onboarding journey to reach the Commerce OS dashboard for the first time.

**Why this priority**: This is the critical acquisition funnel. Without this working end-to-end, no other screen can be tested in a real user context.

**Independent Test**: Can be tested by starting at `/register`, creating an account, completing all onboarding steps, and verifying the Commerce OS dashboard loads with empty data.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated, **When** they open `/register`, **Then** they see the polished NexoraXS auth screen with name/email/password fields, password strength indicator, and Google/Facebook placeholder buttons.
2. **Given** the user submits a valid registration form, **When** the account is created, **Then** they are directed to the Welcome Gateway screen.
3. **Given** the user is on the Welcome Gateway, **When** they proceed, **Then** they enter Core Onboarding: Language → Workspace → Main Branch with a phase/step progress indicator.
4. **Given** core onboarding is complete, **When** the user reaches OS Activation, **Then** they see the OS Launcher with Commerce OS available and other OS options marked "Coming Soon".
5. **Given** the user selects Commerce OS and a plan, **When** they confirm, **Then** they enter the Commerce Setup wizard (Identity → Preset → Mode → Tax → Numbering → Templates → Categories → Review).
6. **Given** Commerce Setup is complete, **When** the user finishes, **Then** they land on the Commerce OS Dashboard with their setup data reflected.

---

### User Story 2 — Returning User Login and Commerce Operations (Priority: P1)

An existing user logs in and performs a complete POS sale, creating an order and invoice.

**Why this priority**: This is the core daily-use workflow. It validates the data contract, session persistence, and Commerce OS operations.

**Independent Test**: Can be tested by logging in with an existing seeded account and completing a sale flow through POS.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated, **When** they open `/login`, **Then** they see the polished auth card with email/password, "Forgot password" link, and social login placeholders.
2. **Given** valid credentials are entered, **When** the user signs in, **Then** they are routed to the Commerce OS Dashboard (onboarding already complete).
3. **Given** the user opens POS, **When** they search/scan a product and add it to cart, **Then** the cart updates with correct line totals, VAT calculation, and discount support.
4. **Given** the cart has items and payment is selected, **When** the user completes a walk-in sale, **Then** an Order and Invoice are created in the data store, and a receipt/success screen is shown. No customer record is created for a walk-in sale.
5. **Given** the user attaches a customer to the sale, **When** the sale is completed, **Then** the customer record is updated with the new order.
6. **Given** the sale is complete, **When** the user opens Orders or Invoices, **Then** the new records appear in the lists.

---

### User Story 3 — Commerce OS Data Consistency Across All Screens (Priority: P2)

All Commerce OS screens read and write from the same shared data contract — no screen shows static fake data unless explicitly seeded.

**Why this priority**: Data consistency is the foundation of trust in the product. Broken data flows would undermine demo and testing value.

**Independent Test**: Can be tested by adding a product, making a sale, and verifying the product appears in Products, Inventory, the Dashboard metrics, Orders, Invoices, and Reports.

**Acceptance Scenarios**:

1. **Given** a product is added, **When** the user visits Products, Inventory, and Dashboard, **Then** the product appears in all three views consistently.
2. **Given** a POS sale is completed, **When** the user visits Dashboard (Today), Orders, Invoices, and Reports, **Then** all screens reflect the new sale data — no screen shows a stale or different value.
3. **Given** the user refreshes the browser, **When** the app reloads, **Then** all session data persists and the user returns to the same authenticated state.
4. **Given** the user clears storage, **When** the app reloads, **Then** the app returns to the unauthenticated state (no ghost data).

---

### User Story 4 — Forgot Password and Reset Flow (Priority: P2)

A user who has forgotten their password can request a reset and set a new password.

**Why this priority**: Required for a complete auth experience. Blocks returning users who lose access.

**Independent Test**: Can be tested by navigating to `/forgot-password`, entering an email, and completing the reset flow.

**Acceptance Scenarios**:

1. **Given** the user is on `/login`, **When** they click "Forgot password", **Then** they are taken to the forgot password screen with an email input.
2. **Given** a valid email is submitted, **When** the request is processed, **Then** a confirmation message is shown (mock: link displayed or toast).
3. **Given** the reset link/token is used, **When** the user submits a new valid password, **Then** they are redirected to `/login` with a success confirmation.

---

### User Story 5 — Customer Profile Management (Priority: P3)

A user can view a customer's full profile including purchase history, lifetime value, and contact details.

**Why this priority**: Enhances the Commerce experience but is not required for core operations.

**Independent Test**: Can be tested by creating a customer via POS or the Customers screen, then opening their profile page.

**Acceptance Scenarios**:

1. **Given** the user is on the Customers list, **When** they click a customer row, **Then** a drawer or profile page opens with contact info, total spend, order count, and recent orders.
2. **Given** a new sale is made with a customer attached, **When** the user opens that customer's profile, **Then** the new order appears in their history.

---

### Edge Cases

- Walk-in POS sale must not create a customer record — no fake "Walk-in Customer" entity should appear in the Customers list.
- A product with zero stock must still appear in the Inventory view with a clear out-of-stock indicator.
- A user who has not completed onboarding must be redirected to onboarding — they must not be able to access Commerce OS screens directly.
- Commerce Setup must not be re-triggered if already complete for the current Business Unit.
- Switching Business Unit must update all Commerce OS screens to reflect the newly active unit's data.
- The local landing page route must not change behavior regardless of authentication state.

---

## Screen Inventory

### Excluded from Port
- `landing.jsx` → **EXCLUDED. Not ported. Not modified.**
- `landing.css` → **EXCLUDED. Not ported. Not modified.**

### Auth Screens
| Claude File | Claude Component | Local Route |
|-------------|-----------------|-------------|
| `auth.jsx` | `Register` | `/register` |
| `auth.jsx` | `Verify` | `/verify-email` |
| `auth.jsx` | `Login` | `/login` |
| `auth.jsx` | `Forgot` | `/forgot-password` |
| `auth.jsx` | `Reset` | `/reset-password` |
| `auth.jsx` | `AuthShell` | Shared auth layout component |

### Welcome + Onboarding Screens
| Claude File | Claude Component | Local Route |
|-------------|-----------------|-------------|
| `onboarding.jsx` | `Welcome` | `/welcome` (new) |
| `onboarding.jsx` | `CoreOnboarding` | `/onboarding` |
| `onboarding.jsx` | `OsLauncher` | `/dashboard/apps` or `/os-launcher` |
| `onboarding.jsx` | `CommerceSetup` | `/commerce/setup` (new) |

### Core Platform Screens
| Claude File | Claude Component | Local Route |
|-------------|-----------------|-------------|
| `core.jsx` | `Billing` | `/dashboard/billing` |
| `core.jsx` | `Team` | `/dashboard/team` |
| `core.jsx` | `Integrations` | `/dashboard/integrations` |
| `core.jsx` | `PlatformSettings` | `/dashboard/settings` |

### Commerce OS Screens
| Claude File | Claude Component | Local Route |
|-------------|-----------------|-------------|
| `commerce.jsx` | `Dashboard` | `/commerce/dashboard` |
| `commerce.jsx` | `Products` | `/commerce/products` |
| `commerce.jsx` | `ProductNew` | `/commerce/products/new` |
| `commerce.jsx` | `Inventory` | `/commerce/inventory` |
| `pos.jsx` | `POS` | `/commerce/pos` |
| `pos.jsx` | `SaleSuccess` | `/commerce/pos/success` |
| `records.jsx` | `Orders` | `/commerce/orders` |
| `records.jsx` | `OrderDetails` | `/commerce/orders/[id]` |
| `records.jsx` | `Invoices` | `/commerce/invoices` |
| `records.jsx` | `InvoiceDetails` | `/commerce/invoices/[id]` |
| `records.jsx` | `Customers` | `/commerce/customers` |
| `records.jsx` | `CustomerProfilePage` | `/commerce/customers/[id]` |
| `records.jsx` | `Reports` | `/commerce/reports` |
| `documents.jsx` | Document viewer | `/commerce/invoices/[id]/document` |
| `commerce.jsx` | `CommerceSettings` | `/commerce/settings` |

### Shell Components
| Claude File | Claude Component | Local Component |
|-------------|-----------------|-----------------|
| `shells.jsx` | `Shell` (generic) | `components/shell/Shell.tsx` |
| `shells.jsx` | `CoreShell` | `components/shell/CoreShell.tsx` |
| `shells.jsx` | `CommerceShell` | `components/shell/CommerceShell.tsx` |
| `shells.jsx` | `ContextSwitcher` | `components/shell/ContextSwitcher.tsx` |
| `shells.jsx` | `NotifBell` | `components/dashboard/NotificationsDropdown.tsx` |
| `shells.jsx` | `UserMenu` | `components/dashboard/UserMenuDropdown.tsx` |
| `shells.jsx` | `ThemeToggle` | `components/dashboard/ThemeToggle.tsx` |
| `shells.jsx` | `LangSwitch` | `components/dashboard/LocaleToggle.tsx` |
| `shells.jsx` | `BranchPill` | `components/dashboard/BranchPill.tsx` |

---

## Visual System Requirements

The following visual characteristics must be preserved from the prototype:

1. **Auth screens**: Dark background stage with centered white card, NexoraXS wordmark above the card, subtle glow effect, legal footer.
2. **Topbar (shell)**: Shopify-inspired dark bar (`#0a0a0f` or similar), NexoraXS logo + product name left, search center, branch pill (Commerce), theme toggle, language switch, notifications bell, user avatar right.
3. **Mounted canvas**: A light-background panel (`nx-page-canvas`) that sits under the topbar and contains the sidebar + main content. This creates the "app inside a chrome" feel.
4. **Sidebar**: Light background sidebar within the canvas. Context switcher at the top (workspace or business unit/branch). Grouped navigation links. User menu at the bottom.
5. **Cards**: White cards with subtle border and shadow on the light canvas background.
6. **Branding**: NexoraXS wordmark/lockup. "Commerce OS" product labeling in topbar when in Commerce context.
7. **Typography and spacing**: Preserve the prototype's spacing rhythm, font weights, and visual hierarchy.
8. **Dark mode**: Theme toggle must switch the entire app between light and dark modes.
9. **RTL / Arabic**: Language toggle must switch the entire app between English (LTR) and Arabic (RTL) layouts.
10. **Color accents**: Indigo accent for Commerce OS (`#4f46e5` range). Status badges for trial/active/coming-soon states.

---

## Data Model Requirements

The frontend data contract must match the prototype's relational mock DB structure:

### Entities

- **User**: id, fullName, email, passwordHash, role, createdAt
- **Workspace**: id, name, country, currency, timezone, language, ownerUserId, createdAt
- **Branch**: id, workspaceId, name, country, currency, isMain, createdAt
- **OSSubscription**: id, workspaceId, os, osId, plan, planId, status (active/trialing), startedAt, trialEndsAt, renewsAt
- **BusinessUnit**: id, workspaceId, osSubscriptionId, os, preset, presetId, name, branchIds, createdAt
- **CommerceSetup**: id, businessUnitId, displayName, legalName, phone, email, address, city, country, crn, trn, logo, preset, mode, vatRegistered, vatRate, pricesIncludeTax, taxLabel, taxNumber, invoicePrefix, receiptPrefix, invoiceStart, receiptStart, footer, returnPolicy, receiptSize, receiptStyle, invoiceTemplate
- **CommerceProduct**: id, businessUnitId, workspaceId, name, sku, barcode, category, price, cost, stock, low (low stock threshold), taxable, notes, createdAt
- **CommerceOrder**: id, businessUnitId, workspaceId, branchId, num, items (array), customerId, payment, discount, vat, total, net, createdAt
- **CommerceInvoice**: id, orderId, businessUnitId, num, items, customerId, vat, tax, total, net, discount, createdAt
- **CommerceCustomer**: id, businessUnitId, workspaceId, name, phone, email, notes, createdAt

### Relationship Rules

- User owns or joins Workspace.
- Workspace has one or more Branches.
- Workspace activates OS Subscriptions.
- BusinessUnit belongs to Workspace and one OSSubscription.
- BusinessUnit can be linked to one or more Branches.
- CommerceSetup belongs to one BusinessUnit.
- CommerceProducts, CommerceOrders, CommerceCustomers, and CommerceInvoices belong to the current Workspace + BusinessUnit (and Branch where relevant).
- A POS sale creates a CommerceOrder. It creates a CommerceInvoice/receipt when applicable.
- A POS walk-in sale must NOT create a CommerceCustomer record.
- Dashboard and Reports metrics calculate from real CommerceOrder and CommerceInvoice records only — no disconnected static lists.

### Session State

- currentUserId
- currentWorkspaceId
- currentOSSubscriptionId
- currentBusinessUnitId
- currentBranchId
- currentOSId
- onboardingState (phase, step, completedOS)
- entryContext (source, selectedOS, selectedPlan)
- locale
- theme

---

## Route Requirements

Core Platform routes live under `apps/core-platform`. Commerce routes live under `apps/commerce`; the route paths below are shown as user-facing paths. In local dev, Commerce paths are served from `http://localhost:3002`.

| Route | Auth Required | Notes |
|-------|--------------|-------|
| `/` | No | Existing landing page — DO NOT MODIFY |
| `/login` | No | Auth screen |
| `/register` | No | Auth screen |
| `/verify-email` | No | Placeholder confirmation |
| `/forgot-password` | No | Auth screen |
| `/reset-password` | No | Auth screen |
| `/welcome` | Yes (first login) | Post-registration welcome gateway |
| `/onboarding` | Yes | Core + OS activation wizard |
| `/workspaces` | Yes | Workspace selector (existing) |
| `/dashboard` | Yes | Core Platform home / redirect |
| `/dashboard/apps` | Yes | OS Launcher / Product Hub |
| `/dashboard/billing` | Yes | Subscription and billing |
| `/dashboard/team` | Yes | Team members |
| `/dashboard/integrations` | Yes | Integrations |
| `/dashboard/settings` | Yes | Platform settings |
| `/commerce/setup` | Yes | Commerce OS setup wizard |
| `/commerce/dashboard` | Yes | Commerce dashboard |
| `/commerce/pos` | Yes | POS screen |
| `/commerce/pos/success` | Yes | Sale success / receipt |
| `/commerce/products` | Yes | Product list |
| `/commerce/products/new` | Yes | Add product |
| `/commerce/inventory` | Yes | Inventory view |
| `/commerce/orders` | Yes | Orders list |
| `/commerce/orders/[id]` | Yes | Order detail |
| `/commerce/invoices` | Yes | Invoices list |
| `/commerce/invoices/[id]` | Yes | Invoice detail |
| `/commerce/customers` | Yes | Customers list |
| `/commerce/customers/[id]` | Yes | Customer profile |
| `/commerce/reports` | Yes | Reports and analytics |
| `/commerce/settings` | Yes | Commerce settings |

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: A new user can complete the full journey from registration through Commerce OS dashboard in under 5 minutes without confusion or broken flows.
- **SC-002**: All Commerce OS screens visually match the Claude prototype 1:1 to within reasonable implementation tolerances — a side-by-side comparison shows the same layout, color system, and component hierarchy.
- **SC-003**: The existing public landing page and all public routes remain visually and functionally unchanged after the port is complete.
- **SC-004**: A POS walk-in sale is reflected immediately in Dashboard (Today), Orders, Invoices, and Reports — zero data divergence between screens.
- **SC-005**: Session state persists across browser refresh — returning to the app does not lose the current user, workspace, or Commerce context.
- **SC-006**: Clearing browser storage returns the app to the unauthenticated state with no ghost data or broken state.
- **SC-007**: Zero console errors during normal navigation across all authenticated screens.
- **SC-008**: The theme toggle and language toggle work across all authenticated screens simultaneously.
- **SC-009**: No static fake data appears in any Commerce OS screen unless explicitly seeded in the mock adapter's demo mode.
- **SC-010**: All routes are functional — no 404s, no blank screens, no unhandled exceptions for any route listed in the Route Requirements.

---

## Assumptions

- The local project uses Next.js App Router conventions. New Commerce OS routes will follow the same `app/` directory structure.
- The mock data adapter will use `localStorage`/`sessionStorage` as the storage backend, matching the prototype's approach, making it backend-ready by design.
- Phase 1 of this port does not require a working backend. All data persistence is frontend-only via the mock adapter.
- The `@nexoraxs/ui` shared component library will be used for primitive components (Button, Input, etc.). New shell and Commerce components will be built locally in `apps/core-platform/`.
- Existing routing to `/workspaces` is preserved and may be updated to fit the new flow (workspace selection after login for returning users).
- The `entryContext` mechanism (general auth entry vs OS-specific entry) from the prototype will be preserved to support future direct OS marketing page flows.
- Google and Facebook social login buttons are UI-only — clicking them shows a "coming soon" toast. No OAuth integration is in scope.
- The prototype's Arabic/RTL support will be ported as-is, using the existing locale system.
- The `docs/claude.aidesign/` directory is read-only source material. No files in that directory will be modified.
