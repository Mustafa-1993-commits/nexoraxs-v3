# NexoraXS — Agent Instructions (AGENTS.md)

> This file is the single source of truth for any AI agent (Claude Code, Codex, or other)
> working on the NexoraXS platform. Read this fully before writing any code.
>
> **Architecture status:** v5.2 Final Master Architecture — Architecture Freeze Ready.
> Do not reopen platform architecture unless an implementation blocker proves a real conflict.

---

## Project Documentation

| Document | Path | Purpose |
|----------|------|---------|
| Final Master Architecture | `docs/NexoraXS_Platform_Documentation_v5_2_Final_Master_Architecture_CLEAN.md` | Final platform architecture and MVP execution boundary |
| Master Plan | `docs/NexoraXS-Master-Plan.docx` | Legacy roadmap reference |
| UX Master Plan | `docs/NexoraXS-UX-Master-Plan.docx` | UX screens, flows, states |

---

## 1. Project Identity

| Field        | Value                                               |
|--------------|-----------------------------------------------------|
| Project      | NexoraXS — Business Operating Platform              |
| Version      | v3 repo / v5.2 architecture                         |
| Repo         | git@github.com:Mustafa-1993-commits/nexoraxs-v3.git |
| Domain       | https://www.nexoraxs.com                            |
| Architecture | Modular Monolith (NOT microservices)                |
| Strategy     | Spec-Driven Development via Specify CLI             |
| Current Build Scope | Core Platform + Commerce OS MVP               |

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
- `shops-app` is a temporary code/UI label — the domain is **Commerce**, not Shops.
- `restaurants-app` is a deprecated concept — restaurants are Commerce presets/modules, not a separate app.

---

## 3. Platform Architecture Vision

```txt
NexoraXS Business Operating Platform
│
├── Core Platform (app.nexoraxs.com)
│   ├── Auth & Sessions
│   ├── Workspaces
│   ├── Business Units (architecture-ready; hidden behind default BU in MVP)
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
├── Commerce OS (shops.nexoraxs.com → future: commerce.nexoraxs.com)
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
│   ├── shops-app/        → shops.nexoraxs.com (Commerce OS — current code label)
│   │                        ⚠ Domain = commerce. Rename deferred post UI-phase.
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
- Business Unit-ready architecture hidden behind one default Business Unit.
- One default branch unless a spec explicitly expands it.
- Mock/sessionStorage UI flows before backend persistence.

### Do not build now

- Real multi-OS backend integration.
- Full HR OS, CRM OS, Gym OS, Healthcare OS, or Maintenance OS.
- Marketplace/plugin sandbox.
- Event bus / queues unless backend spec explicitly requires them.
- Full Business Unit management UI.
- Full ecommerce, driver tracking, kitchen system, payroll, medical records, or CRM pipelines.

---

## 6. Workspace / Business Unit / Branch Model

| Level | Meaning | MVP Rule |
|-------|---------|----------|
| Workspace | Company / Group | Visible now |
| Business Unit | Activity / business line inside workspace | Architecture-ready; hidden behind default BU in MVP |
| Branch | Physical operating location | Main Branch visible; multi-branch later |

Example future structure:

```txt
Workspace: Mustafa Group
├── Business Unit: Mustafa Pharmacy → Commerce OS
│   ├── Branch: Smouha
│   └── Branch: Miami
├── Business Unit: Mustafa Gym → Gym OS
└── Business Unit: Mustafa Maintenance Center → Maintenance OS
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

Business Preset is a smart starter setup only. It seeds defaults and recommendations, not app boundaries.

| Preset | Notes |
|--------|-------|
| Retail Store | Generic retail setup |
| Restaurant / Cafe | POS now; kitchen/dine-in/delivery future modules |
| Pharmacy | Commerce preset; expiry/batch future; no patient records |
| Medical Supplies | Commerce preset; product sales and inventory |
| Supermarket | Barcode-first, units, inventory |
| Electronics / Mobile Store | Barcode/serial/IMEI/warranty future |
| Clothing / Fashion | Variants/size/color future |
| Cosmetics | Expiry/shade/category defaults |
| Other | Minimal generic preset |

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
| shops.nexoraxs.com | shops-app | Commerce OS current domain |
| commerce.nexoraxs.com | shops-app | Commerce OS future domain |
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
feat(shops-app): add commerce tax setup
fix(shops-app): correct sidebar module filtering
docs: align AGENTS.md with v5.2 architecture
```

### Rules

- Do not commit directly to `main`.
- Do not commit `.next/`.
- Do not commit `node_modules/`.
- Do not break Docker or existing local ports.

---

## 26. Recommended Next Specs

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

## 27. Final Instruction for Agents

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
Active plan: specs/039-landing-page-v5-2-positioning/plan.md
<!-- SPECKIT END -->
