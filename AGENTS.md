# NexoraXS — Agent Instructions (AGENTS.md)

> This file is the single source of truth for any AI agent (Claude Code, Codex, or other)
> working on the NexoraXS platform. Read this fully before writing any code.
>
> **Architecture status:** v5.3 Final Master Architecture — Architecture Freeze Ready.
> Do not reopen platform architecture unless an implementation blocker proves a real conflict.

---

## Project Documentation

| Document | Path | Purpose |
|----------|------|---------|
| Final Master Architecture | `docs/NexoraXS_Platform_Documentation_v5_3_Final_Master_Architecture.md` | Final platform architecture and MVP execution boundary |
| Master Plan | `docs/NexoraXS-Master-Plan.docx` | Legacy roadmap reference |
| UX Master Plan | `docs/NexoraXS-UX-Master-Plan.docx` | UX screens, flows, states |

---

## 1. Project Identity

| Field        | Value                                               |
|--------------|-----------------------------------------------------|
| Project      | NexoraXS — Business Operating Platform              |
| Version      | v3 repo / v5.3 architecture                         |
| Repo         | git@github.com:Mustafa-1993-commits/nexoraxs-v3.git |
| Domain       | https://www.nexoraxs.com                            |
| Architecture | Modular Monolith (NOT microservices)                |
| Strategy     | Spec-Driven Development via Specify CLI             |
| Current Build Scope | Core Platform + Commerce OS MVP               |

---

## 1A. Spec 049 — Onboarding Architecture v2 Lock

`049-onboarding-architecture-v2` is the final onboarding architecture alignment spec before future OS expansion.

Scope is limited to Core Platform onboarding, Product Hub, OS subscription/enablement state, and Commerce OS setup entry. It must not modify Commerce operational modules such as POS, Products, Inventory, Orders, Customers, Reports, Returns, Transfers, or related business workflows except for navigation/context wiring required by onboarding.

After Spec 049 is implemented, the onboarding architecture is considered frozen. Later specs should be feature specs, not redesigns of the core onboarding flow.

---

## 2. What NexoraXS Is (and Is NOT)

### ✅ IS:

- A **Business Operating Platform** composed of independent Operating Systems per business domain.
- **Core Platform** = shared SaaS infrastructure.
- **Commerce OS** = first product and current MVP focus.
- **Healthcare OS** = future separate product for clinics, hospitals, patients, appointments, medical records.
- **HR OS** = future separate product for employees, attendance, payroll, leaves, contracts.
- **CRM OS** = future separate product for leads, pipelines, campaigns, follow-ups.
- **Gym OS** = future separate product for members, memberships, trainers, classes.
- **Maintenance OS** = future separate product for repair centers, tickets, technicians, warranties.
- Multi-tenant platform using `workspace_id` isolation.
- Arabic + English platform from day one, with RTL/LTR-ready UI.

### ❌ IS NOT:

- A giant ERP monolith.
- A microservices architecture.
- A Kubernetes cluster.
- A single-app product.
- A POS-only product.
- A shop-only product.
- A healthcare app inside Commerce.
- An HR system inside Commerce.
- A CRM inside Commerce.
- `apps/commerce` is the current Commerce OS frontend app. `shops-app` is a legacy/deprecated temporary code label and must not be reintroduced.
- `restaurants-app` is a deprecated concept — restaurants are Commerce presets/modules, not a separate app.

---

## 3. Platform Architecture Vision

```txt
NexoraXS Business Operating Platform
│
├── Core Platform (app.nexoraxs.com)
│   ├── Auth & Sessions
│   ├── Workspaces
│   ├── Businesses (UI label; BusinessUnit internally)
│   ├── Branches
│   ├── Product Hub / OS Launcher
│   ├── Billing & OS Subscriptions
│   ├── Team & Access
│   ├── Permissions Core
│   ├── Notifications
│   ├── Audit Logs
│   ├── Localization (Arabic + English, RTL/LTR)
│   └── Integrations Hub (future)
│
├── Commerce OS (commerce.nexoraxs.com)
│   ├── Commerce Core
│   ├── Business Presets: Retail, Restaurant/Cafe, Pharmacy, Supermarket, Electronics, Fashion, Cosmetics, Medical Supplies
│   ├── POS Module
│   ├── Online Store Module (future)
│   ├── Delivery Module (future)
│   ├── Kitchen Module (future)
│   ├── Commerce Repairs Module (simple repair intake; future)
│   └── Add-on Ready Architecture (future marketplace, not now)
│
├── Healthcare OS — FUTURE
├── HR OS — FUTURE
├── CRM OS — FUTURE
├── Gym OS — FUTURE
└── Maintenance OS — FUTURE
```

### Golden Rule

Each OS works standalone. Each OS has its own subscription, navigation, workflows, permissions, and domain model. Integrations enhance workflows, but they never unlock basic functionality.

---

## 4. Monorepo Structure

```txt
nexoraxs-v3/
├── apps/
│   ├── landing/          → nexoraxs.com (Marketing site)
│   ├── core-platform/    → app.nexoraxs.com (Auth, Workspace, Billing, Product Hub)
│   ├── commerce/         → commerce.nexoraxs.com (Commerce OS frontend app)
│   │                        Legacy: shops-app was the previous temporary code label; do not reintroduce it.
│   ├── clinics-app/      → legacy placeholder; future product should be Healthcare OS, not Clinics-only
│   └── restaurants-app/  → deprecated concept — absorbed into Commerce OS presets/modules
│
├── packages/
│   ├── ui/               → Shared component library only
│   ├── sdk/              → API clients, fetch helpers only
│   ├── auth/             → Shared auth helpers only
│   ├── types/            → Shared TypeScript types only
│   └── shared/           → Shared utilities/constants only
│
├── backend/              → Laravel API (api.nexoraxs.com)
├── infra/                → Docker, Nginx configs
├── docs/                 → Documentation
└── .specify/             → Specify CLI workflow
```

---

## 5. MVP Execution Boundary

The full platform vision is defined now, but the build scope is intentionally narrow.

### Build now

- Core Platform foundation.
- Product Hub / OS Launcher alignment.
- Arabic + English localization foundation.
- Commerce OS MVP.
- Business visible from onboarding, stored internally as BusinessUnit.
- Multi-Branch target architecture with exactly one Main Branch per operational Business.
- Mock/sessionStorage UI flows before backend persistence.

### Do not build now

- Real multi-OS backend integration.
- Full HR OS, CRM OS, Gym OS, Healthcare OS, or Maintenance OS.
- Marketplace/plugin sandbox.
- Event bus / queues unless backend spec explicitly requires them.
- Full Business Unit management UI.
- Full ecommerce, driver tracking, kitchen system, payroll, medical records, or CRM pipelines.

---



## 5A. MVP Onboarding Journey — Current Product Decision

The current onboarding direction is business-first, not OS-first.

### Final flow

```txt
Sign Up / Login
→ Welcome + Language
→ Create Workspace
→ Create Business (UI label; includes `businessActivity`)
→ Product Hub
→ Launch Commerce OS
→ Choose Commerce Plan
→ Commerce Setup
→ Auto Configuration
→ Commerce Dashboard
```

### Local development routing

```txt
localhost:3001 → Core Platform / Product Hub
localhost:3002 → Commerce OS Setup + Commerce Dashboard
```

### Production routing

```txt
app.nexoraxs.com        → Core Platform / Product Hub
commerce.nexoraxs.com   → Commerce OS Setup + Commerce Dashboard
api.nexoraxs.com        → Backend API
```

### Business naming rule

Use **Business** in the UI.

Use **BusinessUnit** in architecture, types, data contracts, storage, and backend.

```txt
UI label:      Business
Data entity:   BusinessUnit
```

Do not create a separate duplicated `Business` model.

### Recommendation rule

`businessActivity` recommends OS products, presets, and sample defaults. It does not force them.

```txt
businessActivity
→ Recommendation Engine
→ Suggested OS products
→ User chooses OS products
```

Future OS products may appear as Coming Soon, optional, or locked, but the MVP must keep Commerce OS as the primary actionable product.

### OS Subscription and OS Enablement

OSSubscription and OSEnablement are separate first-class architecture concepts.

```txt
OSSubscription = workspace-level license and billing record
OSEnablement   = operational activation of an OS for a workspace, business, or branch scope
```

Rules:

- Buying an OS plan creates an `OSSubscription`.
- Launching/setup for a business creates an `OSEnablement`.
- Product Hub must display subscription state and setup/enablement state separately.
- Product Hub must distinguish availability state (`available`, `coming soon`, `locked`), subscription state (`not subscribed`, `subscribed`, `trial`, `active`, `past due`, `cancelled`), and enablement state (`not enabled`, `setup required`, `active`, `disabled`).
- OSEnablement references:
  - `workspaceId`
  - `osId`
  - `osSubscriptionId`
  - `scope: workspace | business | branch`
  - `businessUnitId` optional depending on scope
  - `branchIds` optional depending on scope
  - `status: setup_required | active | disabled`
  - `setupVersion`
  - `setupCompletedAt`
  - `setupCompletedBy`

```ts
interface OSEnablement {
  workspaceId: string;
  osId: string;
  osSubscriptionId: string;
  scope: "workspace" | "business" | "branch";
  businessUnitId?: string;
  branchIds?: string[];
  status: "setup_required" | "active" | "disabled";
  setupVersion?: string;
  setupCompletedAt?: string;
  setupCompletedBy?: string;
}
```

### Product Hub ownership

Product Hub is part of Core Platform.

Product Hub may:

- display recommended OS products;
- show subscription states;
- show setup/enablement states;
- route to OS setup;
- launch OS dashboards.

Product Hub must not implement OS domain setup or business logic.

### OS-specific Setup Experience

Each OS owns its setup experience.

```txt
Core Platform
→ Product Hub
→ selected OS app
→ OS-specific Setup Experience
→ OS Dashboard
```

For Commerce OS MVP, the setup should be concise:

```txt
Commerce Setup Experience
→ Choose Plan
→ Business Identity
→ Commerce Preset
→ Main Branch + Tax
→ Review & Launch
→ Auto Configuration
```

Commerce preset defaults may automatically seed:

- categories;
- units;
- suggested modules;
- document templates;
- invoice / receipt numbering;
- optional sample products.

Advanced or future behavior must remain locked, coming soon, recommended, or plan-gated until implemented.

### CommerceSetup ownership

CommerceSetup belongs to `BusinessUnit`. It must not be modeled as a child of Branch.

Branch is an operational scope for POS, inventory, orders, invoices, reports, transfers, and returns.

CommerceSetup owns:

- commerce preset;
- billing/legal identity;
- tax configuration;
- numbering;
- templates;
- categories;
- units;
- selling mode.

### Address ownership

- Workspace country, currency, and timezone are workspace defaults.
- Branch address/city is the operational location.
- Commerce billing address/city/country is for invoices and legal documents.
- Billing address may default from branch/workspace, but user edits must be preserved.

### Preset ownership

`businessActivity` may suggest a preset, but every OS owns its own preset.

Correct:

```txt
businessActivity: Pharmacy
Selected OS: Commerce OS
Loaded Preset: Commerce Pharmacy Preset
```

Wrong:

```txt
businessActivity directly owns Commerce modules or hardcoded workflows.
```

## 6. Workspace / Business / Branch Model

| Level | Meaning | MVP Rule |
|-------|---------|----------|
| Workspace | Company / Group | Visible now |
| Business | Brand / activity / business line inside Workspace | Visible from onboarding; stored internally as BusinessUnit |
| Branch | Physical operating location under one Business | Multi-Branch target architecture; exactly one Main Branch required for active operation |

Example future structure:

```txt
Workspace: Mustafa Group
├── Business: Mustafa Pharmacy (BusinessUnit internally) → Commerce OS
│   ├── Branch: Smouha
│   └── Branch: Miami
├── Business: Mustafa Gym (BusinessUnit internally) → Gym OS
└── Business: Mustafa Maintenance Center (BusinessUnit internally) → Maintenance OS
```

### Business UI and internal model

Spec 049 makes Business visible from onboarding while keeping `BusinessUnit` as the internal model name.

Rules:

- UI must say Business, Businesses, Store, and Branch where user-facing.
- UI must not show BusinessUnit, Business Unit, BU, or Default Business Unit wording.
- Do not globally rename `BusinessUnit` in code unless a future Architecture RFC approves it.
- Every Branch belongs to exactly one BusinessUnit.
- Every operational Business must have exactly one Main Branch.
- Zero Main Branches is invalid for active operation.
- More than one Main Branch under the same Business is invalid.

```txt
Workspace: Mustafa Group
  → Business: Mustafa Pharmacy (BusinessUnit internally)
    → Branch: Main Branch
    → Branch: Smouha
```

This prevents the platform from building directly on Workspace and avoids a major refactor when multi-business and multi-branch operations expand.

### Business and Branch visibility

Business management is visible from onboarding. Branches are visible as operational locations under a Business. Multi-Branch is part of the target architecture, and implementation specs may choose how much branch management is exposed at each MVP stage.

Visible concepts:

```txt
Visible:
- Workspace
- Business / Businesses
- Main Branch / Branches

Internal only:
- BusinessUnit model name
```

### Required data model rule

Every Branch must belong to a `businessUnitId`.

```ts
interface Workspace {
  id: string;
  name: string;
}

interface BusinessUnit {
  id: string;
  workspace_id: string;
  name: string;
  businessActivity: string;
  status: "active" | "archived";
}

interface Branch {
  id: string;
  workspace_id: string;
  business_unit_id: string;
  name: string;
  code: string;
  is_main: boolean;
}
```

### Critical rule

Never create typed workspaces.

```ts
// ✅ Correct
interface Workspace {
  id: string;
  name: string;
}

interface BusinessUnit {
  id: string;
  workspace_id: string;
  name: string;
  operating_systems_enabled: string[];
}

// ❌ Wrong
interface RestaurantWorkspace {}
interface PharmacyWorkspace {}
interface ShopWorkspace {}
interface GymWorkspace {}
```

---

## 7. Operating System Subscription & Access Model

### Subscription scope

- OS subscriptions are **workspace-level**.
- A subscribed OS can be enabled for one or more Business Units.
- Plan limits control how many Business Units, branches, users, and features are allowed.

Example:

```txt
Workspace: Mustafa Group
Subscription: Commerce OS Pro
Allowed: up to 3 Commerce Business Units, 5 branches, 10 users
```

### OS Subscription States

```ts
type OSSubscriptionState =
  | "not_subscribed"
  | "trial"
  | "active"
  | "past_due"
  | "cancelled"
  | "locked";
```

### Product Hub UI states

- `available`
- `active`
- `trial`
- `locked`
- `coming_soon`
- `not_started`

In UI, future products may show “Coming Soon”, but architecture still treats them as known future OS products.

---

## 8. Pricing Strategy & Plan Limits

Core Platform is usually included with any OS subscription and is not sold alone in the MVP.

Each OS has independent plans:

```txt
Commerce OS: Starter / Pro / Business
HR OS: Starter / Pro / Business
Gym OS: Starter / Pro / Business
CRM OS: Starter / Pro / Business
Maintenance OS: Starter / Pro / Business
Healthcare OS: Starter / Pro / Business
```

Pricing may depend on:

- Users
- Branches
- Business Units
- Employees
- Orders / sales volume
- Gym members
- Maintenance tickets
- Enabled modules
- Advanced features
- Integrations

### Commerce Plan Limits — draft, not final pricing

| Plan | Example limits |
|------|----------------|
| Starter | 1 Business Unit, 1 Branch, 3 Users, POS, Products, Inventory, Basic invoices |
| Pro | Up to 3 Branches, 10 Users, Advanced reports, Multi-branch inventory, Online/Delivery future |
| Business | Custom branches/users, Advanced permissions, API/integrations future, advanced modules |

Numbers are placeholders and may change, but the **Plan Limits pattern is mandatory**.

---

## 9. Team, Users, Employees, and Access

### Core concepts

- **Core User** = login identity.
- **Workspace Member** = user invited into a workspace.
- **OS Access** = which operating systems the member can use.
- **Business Unit Access** = which business units the member can access.
- **Branch Access** = which branches the member can access.
- **OS Role** = operational role inside a specific OS.
- **HR Employee Profile** = HR OS domain entity, not required for other OS products to work.

### User Invitation Flow

```txt
Owner
→ Core Platform / Team & Access
→ Invite User
→ Assign Workspace Role
→ Select OS Access
→ Select Business Unit Access
→ Select Branch Access
→ Assign OS Role
→ Send Invitation
```

### HR independence rule

Every OS must support lightweight operational staff roles without requiring HR OS.

Examples:

- Commerce can add a cashier without HR OS.
- Gym can add a trainer without HR OS.
- Maintenance can add a technician without HR OS.

When HR OS is enabled, HR may become the master employee profile system.

---

## 10. Permission Scope Matrix

| Permission | Scope |
|------------|-------|
| `core.billing.manage` | Workspace |
| `core.team.manage` | Workspace |
| `commerce.pos.use` | Branch |
| `commerce.products.manage` | Business Unit or Branch |
| `commerce.reports.view` | Branch or Business Unit |
| `commerce.settings.manage` | Business Unit |
| `hr.payroll.manage` | Workspace or Business Unit |
| `gym.members.checkin` | Branch |
| `crm.leads.manage` | Business Unit or Branch |
| `maintenance.tickets.manage` | Branch |

Permission format:

```txt
{os}.{resource}.{action}
```

Examples:

```txt
commerce.pos.use
commerce.invoices.view
commerce.tax.manage
hr.payroll.manage
gym.members.checkin
crm.leads.manage
maintenance.tickets.close
```

---

## 11. Commerce OS — Domain Model

### Commerce Core — immutable layer

Commerce Core is always present for every Commerce workspace. Modules extend it; they never replace it.

| Core Entity | Responsibility |
|-------------|----------------|
| Business Identity | Business name, logo, legal data, tax identity |
| Products & Categories | Catalog management, pricing, variants, SKU/barcode |
| Inventory | Stock, branch inventory, adjustments, low-stock alerts |
| Orders | Order lifecycle across POS, online, delivery |
| Customers | Transactional customer profiles and purchase history |
| Payments | Payment methods, payment records, refunds |
| Taxes | VAT/tax settings, inclusive/exclusive pricing, tax reports |
| Invoices | Receipt/tax invoice/refund document records |
| Document Templates | Receipt, tax invoice, refund receipt, delivery note templates |
| Reports | Sales, tax, inventory, product performance |
| Branches | Physical operating locations |
| Operational Staff | Commerce roles such as cashier/manager/inventory manager |

### Rules

- POS creates Orders through Commerce Core.
- Delivery extends Orders; it does not replace Orders.
- Kitchen extends Orders; it does not create a parallel order system.
- Pharmacy is a Commerce preset/module, not Healthcare OS.
- Restaurant/Cafe is a Commerce preset/module, not a separate app.
- No module creates parallel orders, inventory, customers, payments, invoices, or tax records.

---

## 12. Commerce Presets and Modules

### Business Presets

The user-facing phrase “Business Type” is a simplified UX label. Architecturally, it must be treated as a **Business Preset** and stored as `businessPreset`.

The UI may ask:

```txt
What type of business are you running?
```

But internally this means:

```txt
businessPreset
```

Business Preset is a smart starter setup only. It seeds defaults and recommendations, not app boundaries.

A Commerce Preset may define or suggest:

- Default categories
- Default units
- Suggested modules
- Suggested document templates
- Suggested POS behavior
- Suggested reports
- Suggested product fields
- Optional sample products

A preset must not create a separate OS, must not own modules, and must not hardcode workflows.

#### Preset vs Module rule

```txt
Preset recommends modules.
Preset does not own modules.
Preset does not hardcode workflows.
Users may enable or disable allowed modules based on plan and configuration.
```

Examples:

- Mobile Store may use barcode scanning.
- Restaurant may use online orders.
- Pharmacy may use delivery.
- Fashion may use POS only.

| Preset | Enabled now | Recommended / locked later |
|--------|-------------|-----------------------------|
| Retail Store | POS, Products, Inventory, Invoices, Taxes | Online catalog, loyalty, advanced reports |
| Restaurant / Cafe | POS, Orders, Invoices, Taxes | Dine-in, Delivery, Kitchen, Tables, Service charge |
| Pharmacy | POS, Products, Inventory, Invoices, Taxes | Barcode, Expiry tracking, Batch tracking, Supplier purchases, Healthcare prescription integration |
| Medical Supplies | POS, Products, Inventory, Invoices, Taxes | Batch/expiry, supplier purchases, Healthcare integration where applicable |
| Supermarket | POS, Products, Inventory, Invoices, Taxes | Barcode-first POS, expiry, kg/gram/liter/pack units, fast checkout |
| Electronics / Mobile Store | POS, Inventory, Invoices, Taxes | Barcode, Serial/IMEI, Warranty, Maintenance OS integration |
| Clothing / Fashion | POS, Inventory, Invoices | Variants, Size, Color, Exchange policy template |
| Cosmetics | POS, Products, Inventory, Invoices, Taxes | Expiry, shade/category defaults, batch tracking |
| Other | Minimal generic setup | User-selected modules |

#### Commerce Presets in MVP

MVP onboarding should show these presets:

- Retail
- Pharmacy
- Restaurant / Cafe
- Supermarket
- Electronics / Mobile Store
- Fashion
- Cosmetics
- Other

In the MVP, a preset only changes:

- Default categories
- Default units
- Suggested modules UI
- Optional sample products
- Document template recommendation

Complex behaviors such as batch tracking, expiry tracking, kitchen workflows, IMEI tracking, supplier purchases, or Healthcare prescription integration must appear only as recommended, locked, or plan-gated capabilities until implemented.

#### Suggested Modules Step

After selecting a preset, onboarding should show a “Recommended setup” step.

Example for Pharmacy:

```txt
Recommended setup for Pharmacy

Enabled now:
✓ POS
✓ Products
✓ Inventory
✓ Invoices
✓ Taxes

Recommended later:
○ Expiry Tracking
○ Batch Tracking
○ Supplier Purchases
○ Healthcare Prescription Integration
```

If the selected plan does not allow a module, the UI should show:

```txt
Locked by plan
```

Modules remain independently enabled, disabled, locked, or plan-gated based on workspace subscription and user configuration.

### Commerce Modules

```ts
type ModuleState =
  | "enabled"
  | "disabled"
  | "trial"
  | "locked"
  | "deprecated";

interface CommerceModule {
  id: string;
  name: string;
  state: ModuleState;
  plan_required: "starter" | "pro" | "business";
  nav?: NavItem;
}
```

Core modules/features now:

- POS
- Products
- Inventory
- Orders
- Customers
- Invoices
- Taxes
- Reports
- Settings

Future modules:

- Online Store
- Delivery
- Kitchen
- Loyalty
- Advanced Repairs
- Supplier Purchases
- Advanced Pharmacy

### Maintenance OS vs Commerce Repairs

Simple repair intake attached to a commerce sale may exist as a Commerce module.
Full repair-center operations belong to Maintenance OS.

---

## 13. Module-Driven Navigation

Navigation must be generated from module/config state, not hardcoded by business preset.

```ts
interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  permission?: string;
  badge?: string;
}

// ✅ Correct
const navItems = enabledModules
  .filter(m => m.state === "enabled" || m.state === "trial")
  .filter(m => m.nav !== undefined)
  .map(m => m.nav as NavItem);

// ❌ Wrong
if (businessPreset === "restaurant") showKitchenLink();
if (businessPreset === "electronics") showRepairsLink();
```

---

## 14. Product Boundaries

### Commerce vs CRM

- Commerce owns transactional customers and purchase history.
- CRM owns leads, deals, campaigns, follow-ups, and relationship workflows.

### Commerce vs Healthcare

- Commerce Pharmacy owns stock, sale, invoice, and tax records.
- Healthcare owns patients, appointments, prescriptions, medical records, and clinical workflows.

### Commerce vs HR

- Commerce owns cashier/manager operational roles.
- HR owns employee profile, attendance, payroll, leaves, contracts when HR OS is enabled.

### Healthcare vs Pharmacy integration future

```txt
Healthcare creates prescription
→ Commerce Pharmacy receives linked pharmacy order
→ Pharmacy sells/dispenses items
→ Commerce deducts stock and creates invoice
→ Healthcare receives fulfilment status
```

---

## 15. Integration Data Ownership

| Integration | Master source | Consumer / extension |
|-------------|---------------|----------------------|
| HR ↔ Commerce | HR owns employee profile | Commerce owns operational role / cashier access |
| Commerce ↔ CRM | Commerce owns purchase history | CRM owns campaigns, follow-ups, pipeline |
| Healthcare ↔ Commerce Pharmacy | Healthcare owns prescription | Commerce owns stock, sale, invoice, payment |
| Gym ↔ CRM | Gym owns membership | CRM owns lead/campaign workflow |
| Maintenance ↔ Commerce | Maintenance owns repair ticket | Commerce may own linked parts inventory/invoice if integrated |

### No Cross-OS Hard Dependency Rule

No OS may require another OS to complete its core workflow.

- Commerce can sell without HR.
- Gym can manage members without CRM.
- Healthcare can create prescriptions without Commerce.
- Maintenance can manage tickets without Commerce.
- CRM can create contacts/leads without Commerce.

---

## 16. Document Templates as a Platform Pattern

Document templates exist per OS when needed.

| OS | Example documents |
|----|-------------------|
| Commerce | POS receipt, tax invoice, refund receipt, delivery note, packing slip |
| HR | contract, payslip, leave approval, employee letter |
| Gym | membership contract, renewal receipt, waiver |
| Maintenance | repair job card, warranty certificate, handover receipt |
| Healthcare | prescription, medical report, visit summary |

Commerce MVP must include Business Identity, Tax Settings, Invoice Numbering, and basic receipt/invoice templates before backend sale persistence.

---

## 17. Audit Logs

Audit logs are a platform-level pattern. Every OS must be audit-log-ready for critical actions.

Examples:

- user invited
- permission changed
- subscription changed
- product price changed
- invoice cancelled
- refund created
- payroll approved
- prescription fulfilled
- repair ticket closed

MVP may show mock activity logs; backend audit persistence comes later.

---

## 18. Notifications Model

Notifications are platform-level infrastructure with OS-specific producers.

### Core Notifications

- subscription expiring
- payment failed
- user invited
- integration failed

### Commerce Notifications

- low stock
- sale completed
- refund created
- tax report ready

### HR Notifications

- leave request
- payroll ready
- attendance issue

### Gym Notifications

- membership expiring
- class reminder

### Maintenance Notifications

- ticket status changed
- warranty expiring

---

## 19. Localization Rules

NexoraXS must support Arabic and English from day one.

### Required

- All user-facing UI must be i18n-ready.
- Arabic requires RTL layout.
- English requires LTR layout.
- Presets, module labels, system statuses, invoice labels, tax labels, and document labels must support bilingual display names.
- User-entered business data is stored as entered and is not auto-translated.

### Forbidden

- Do not hardcode new user-facing strings without a path to translation.
- Do not use left/right-only layout assumptions when logical RTL/LTR classes can be used.
- Do not build invoice/receipt templates that only work in English.

---

## 20. POS Architecture Rules

POS is a Transaction Engine, not just a screen.

### UI requirements now

- keyboard-first
- barcode-ready
- fast checkout
- optimistic cart updates
- tax breakdown visible
- discount before tax
- receipt/invoice preview
- bilingual-ready labels

### Backend requirements later

- POS session tied to `workspace_id + business_unit_id + branch_id + employee_id`
- order creation through Commerce Core
- payment recorded through Commerce Core
- inventory adjusted through Commerce Core
- invoice/receipt generated from Document Templates
- offline-tolerant queue later, not MVP unless explicitly specified

---

## 21. Technology Stack

### Frontend

| Technology   | Usage |
|--------------|-------|
| Next.js      | All frontend apps |
| React        | UI framework |
| TypeScript   | All frontend code, strict mode |
| TailwindCSS  | Styling system |
| ShadCN UI    | Component library in packages/ui |
| pnpm         | Package manager |
| Turborepo    | Monorepo build system |

### Backend

| Technology | Usage |
|------------|-------|
| Laravel | Main API |
| Laravel Sanctum | Session-based auth across subdomains |
| PostgreSQL | Primary database |
| Redis | Cache, queues, sessions |

---

## 22. Domain Map

| Domain | App | Purpose |
|--------|-----|---------|
| nexoraxs.com | landing | Marketing, pricing, docs |
| app.nexoraxs.com | core-platform | Auth, workspace, billing, Product Hub |
| api.nexoraxs.com | backend | Laravel REST API |
| commerce.nexoraxs.com | commerce | Commerce OS frontend app |
| shops.nexoraxs.com | legacy/deprecated | Old Commerce OS preview domain; do not use for new code |
| admin.nexoraxs.com | admin panel | Internal ops future |
| healthcare.nexoraxs.com | healthcare-app | Future Healthcare OS |
| hr.nexoraxs.com | hr-app | Future HR OS |
| crm.nexoraxs.com | crm-app | Future CRM OS |
| gym.nexoraxs.com | gym-app | Future Gym OS |
| maintenance.nexoraxs.com | maintenance-app | Future Maintenance OS |

---

## 23. Architecture Rules — Never Violate

### Core Platform allowed

- Auth & sessions
- Workspace creation and management
- Business Unit shell/future management
- Product Hub / OS subscription states
- Billing & subscriptions
- Team and access
- Permissions core
- Notifications
- Audit logs
- Localization
- Integration Hub shell/future

### Core Platform forbidden

- Products, inventory, orders
- POS sales
- Commerce tax/invoice logic
- Healthcare clinical logic
- HR payroll/attendance logic
- CRM pipeline logic
- Gym membership workflow
- Maintenance ticket workflow

### Commerce OS boundary

- All commerce logic lives here.
- Pharmacy belongs here.
- Restaurant/Cafe belongs here as preset/module.
- Basic operational staff roles belong here.
- Do not put healthcare, HR, CRM, Gym, or Maintenance domain workflows here.

### Shared packages

- `packages/ui` → UI components only; no business logic.
- `packages/sdk` → API clients and fetch helpers only.
- `packages/types` → TypeScript interfaces/types only.
- `packages/auth` → Auth helpers only.
- Apps import from packages, never from another app directly.

### Multi-tenancy

Every business table must include `workspace_id`. Business Unit and Branch scoped data must also include the correct IDs when implemented.

---

## 24. Coding Standards

### TypeScript

- Strict mode enabled in all apps.
- No `any` types.
- Use interfaces/types from `packages/types` where shared.
- Always type function parameters and returns.

### React / Next.js

- Use App Router.
- Server Components by default.
- Use `"use client"` only when needed.
- Keep components small and focused.

### API calls

- Use `packages/sdk`.
- Never call `api.nexoraxs.com` directly from components.
- All API errors need loading/error/empty states.

---

## 25. Git Workflow

### Branch strategy

```txt
main         → production-ready code only
develop      → integration branch
feature/*    → new features
hotfix/*     → urgent fixes
docs/*       → documentation-only alignment
```

### Commit messages

```txt
feat(core-platform): add product hub shell
feat(commerce): add commerce tax setup
fix(commerce): correct sidebar module filtering
docs: align AGENTS.md with v5.3 architecture
```

### Rules

- Do not commit directly to `main`.
- Do not commit `.next/`.
- Do not commit `node_modules/`.
- Do not break Docker or existing local ports.

---

## 26. Current Implementation State (spec 042)

The Claude AI Design prototype (`docs/claude.aidesign/`) has been ported into the live Next.js apps with shared packages.

Current app ownership:
- `apps/core-platform/` → Core Platform: auth, workspace, onboarding, Product Hub, billing, team, integrations, platform settings.
- `apps/commerce/` → Commerce OS: commerce dashboard, setup, products, inventory, POS, orders, invoices, customers, reports, commerce settings.
- `apps/shops-app/` → legacy/deprecated previous temporary code label. Do not recreate or import from it.

All runtime data/types should come from shared packages, not from `docs/claude.aidesign/`.

### Shared data/types packages

| Package / File | Purpose |
|------|---------|
| `packages/types/` | Canonical shared TypeScript domain types only |
| `packages/shared/src/mock-db/` | Mock local/session storage data layer, actions, selectors, seed data |
| `packages/shared/src/commerce/documents.ts` | Commerce document/tax calculations such as `computeDoc` |
| `packages/ui/src/styles/` | Shared scoped theme CSS: NexoraXS base, Core theme, Commerce theme |
| `apps/*/lib/store/AppProvider.tsx` | App-specific React provider importing from `@nexoraxs/shared` and `@nexoraxs/types` |
| `apps/*/lib/store/index.ts` | App store barrel export |

Rules:
- Pages/components must not read `localStorage` or `sessionStorage` directly.
- Providers must initialize from an SSR-safe empty state and hydrate storage in `useEffect`.
- `docs/claude.aidesign/` is reference only and must never be imported at runtime.

### Shell components — `components/shell/`

| Component | Purpose |
|-----------|---------|
| `Shell.tsx` | Generic shell (topbar + sidebar + content area) |
| `ContextSwitcher.tsx` | Workspace/BU/Branch switcher dropdown |
| `CoreShell.tsx` | Shell pre-configured for Core Platform nav |
| `CommerceShell.tsx` | Shell pre-configured for Commerce OS nav |

> Old `components/dashboard/Sidebar.tsx` and `components/dashboard/Topbar.tsx` are marked `@deprecated`.

### Auth components — `components/auth/`

`AuthShell.tsx`, `PasswordInput.tsx`, `PasswordStrength.tsx`, `SocialAuth.tsx`

### Route tree — `app/`

```txt
app/
├── (landing preserved) page.tsx         ← DO NOT TOUCH
├── login/page.tsx
├── register/page.tsx
├── verify-email/page.tsx
├── forgot-password/page.tsx
├── reset-password/page.tsx
├── welcome/page.tsx
├── onboarding/page.tsx                  ← 6-step wizard
├── dashboard/
│   ├── layout.tsx                       ← CoreShell guard
│   ├── page.tsx                         ← Core Platform home
│   ├── apps/page.tsx                    ← Product Hub / OS Launcher
│   ├── billing/page.tsx
│   ├── team/page.tsx
│   ├── integrations/page.tsx
│   └── settings/page.tsx
apps/commerce/

    ├── layout.tsx                       ← CommerceShell + 3-level guard
    ├── setup/
    │   ├── layout.tsx                   ← minimal layout, no shell
    │   └── page.tsx                     ← 8-step Commerce Setup wizard
    ├── dashboard/page.tsx
    ├── pos/page.tsx
    ├── products/page.tsx
    ├── inventory/page.tsx
    ├── orders/page.tsx
    ├── invoices/page.tsx
    ├── customers/
    │   ├── page.tsx
    │   └── [id]/page.tsx
    ├── reports/page.tsx
    └── settings/page.tsx
```

### TypeScript — 0 errors. ESLint — 0 errors, 0 warnings.

---

## 27. Recommended Next Specs

Start from architecture alignment, not backend.

```txt
Spec 038 — Platform Alignment + Localization + Product Hub
Spec 039 — Commerce Identity, Tax & Document Templates
Spec 040 — Commerce Products + Inventory Polish
Spec 041 — POS MVP with Tax, Invoice and Receipt
Spec 042 — Orders, Invoices and Reports
Spec 043 — Module-driven Commerce Navigation
Spec 044 — Core Billing + OS Subscription States
Spec 045 — Team & Access MVP
```

Backend starts only after UI flows and contracts are stable.

---

## 28. Final Instruction for Agents

Before writing code, answer these questions:

1. Does this belong to Core Platform or a specific OS?
2. If it belongs to Commerce, is it Core, Preset, or Module?
3. Does it require Arabic/English and RTL/LTR support?
4. What is the Workspace / Business Unit / Branch scope?
5. Does it affect billing, plan limits, or access permissions?
6. Does it create a cross-OS dependency? If yes, stop.
7. Can this be implemented as UI/mock first before backend?

If unsure, do not expand the architecture. Create a small spec and keep the MVP boundary narrow.

---

<!-- SPECKIT START -->
Active plan: specs/049-onboarding-architecture-v2/plan.md
<!-- SPECKIT END -->


## Multi-Branch Architecture Goal (Spec 049 Addition)

Architecture Goals

- Multi-Business
- Multi-Branch
- Multi-Operating System
- Product Hub as Operating System entry point
- OSSubscription and OSEnablement separation

Rules

- Business (BusinessUnit internally) owns one or more Branches.
- UI uses Business; internal model remains BusinessUnit.
- BusinessUnit, BU, and Default Business Unit must not appear in user-facing UI.
- Branch represents the operational scope only.
- Business is visible from onboarding.
- The platform architecture must support multiple Branches per Business from day one.
- Every operational Business must have exactly one Main Branch.
- OSEnablement may target workspace, business, or branch scope depending on the Operating System.
- Spec 049 freezes onboarding architecture after approval.

### Spec 049 Additional Acceptance Criteria

- Multi-Business architecture-ready.
- Multi-Branch architecture-ready.
- Branches belong to Business (BusinessUnit internally).
- OSEnablement supports workspace, business, and branch scopes.
- Future specs must extend Spec 049 concepts unless an Architecture RFC is approved.
