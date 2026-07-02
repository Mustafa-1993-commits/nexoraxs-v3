# NexoraXS Constitution

**Version:** 1.3.2  
**Last Amended:** 2026-07-01  
**Architecture Alignment:** NexoraXS v5.3 Final Master Architecture — Architecture Freeze Ready  
**Status:** Active governance document

---

## Purpose

This constitution defines the non-negotiable engineering, product, and architecture rules for NexoraXS.

It exists to protect the platform from:

- architecture drift
- random feature expansion
- cross-domain coupling
- overengineering
- AI-agent inconsistency
- premature backend implementation
- unclear ownership between Core Platform and domain Operating Systems

This document supersedes informal guidance. `AGENTS.md`, specs, implementation plans, and agent skills MUST reflect this constitution and the v5.3 Final Master Architecture.

---

## Article I — Business Operating Platform

NexoraXS is a **Business Operating Platform**, not a single app, POS tool, shop system, or ERP clone.

The platform consists of:

- **Core Platform** — shared SaaS foundation
- **Commerce OS** — first product and current MVP focus
- **Healthcare OS** — future independent OS
- **HR OS** — future independent OS
- **CRM OS** — future independent OS
- **Gym OS** — future independent OS
- **Maintenance OS** — future independent OS

Each Operating System owns its domain workflows, navigation, permissions, data model, and subscription logic.

### Current repository naming rule

- `shops-app` is the current code label for **Commerce OS**.
- The product/domain name is **Commerce OS**, not Shops.
- `clinics-app` is a legacy placeholder; the future product is **Healthcare OS**, not Clinics-only.
- `restaurants-app` is deprecated and MUST NOT be revived as a separate app.
- Restaurant/Cafe is a Commerce business preset/module.

---

## Article II — Core Platform Boundary

Core Platform owns shared platform infrastructure only.

### Core Platform MAY own

- Authentication and sessions
- Workspaces
- Business Unit shell/future management
- Branch shell/future management
- Product Hub / OS Launcher
- Billing and OS subscriptions
- Team and access management
- Permission core
- Localization infrastructure
- Notifications infrastructure
- Audit log infrastructure
- Integration Hub shell/future
- Platform settings

### Core Platform MUST NOT own

- Commerce products, inventory, orders, POS, sales, tax invoices, or payments
- Healthcare patients, appointments, prescriptions, medical records, or clinical workflows
- HR attendance, payroll, leaves, contracts, or employee lifecycle workflows
- CRM leads, deals, campaigns, pipelines, or follow-up workflows
- Gym memberships, trainers, classes, renewals, or check-ins
- Maintenance repair tickets, technicians, warranties, or job cards

Business logic belongs inside its owning OS.

---

## Article III — Independent Operating Systems

Each OS must work independently.

No OS may require another OS to complete its core workflow.

### Required rule

Integrations may enhance workflows, but they MUST NOT unlock basic functionality.

Examples:

- Commerce can sell without HR OS.
- Gym can manage members without CRM OS.
- Healthcare can create prescriptions without Commerce OS.
- Maintenance can manage repair tickets without Commerce OS.
- CRM can manage leads without Commerce OS.
- Commerce can add cashiers without HR OS.

Cross-OS integration must be optional, explicit, and ownership-aware.

---

## Article IV — Workspace / Business Unit / Branch Model

NexoraXS uses this hierarchy:

| Level | Meaning | MVP Rule |
|---|---|---|
| Workspace | Company / group | Visible now |
| Business Unit | Business line/activity inside workspace | Architecture-ready; hidden behind a default BU in MVP |
| Branch | Physical operating location | Main Branch visible; multi-branch later |

### Rules

- Never create typed workspaces such as `RestaurantWorkspace`, `PharmacyWorkspace`, `ShopWorkspace`, or `GymWorkspace`.
- A workspace is generic.
- A Business Unit represents an activity/business line.
- A Branch represents an operating location.
- In MVP, create/use one default Business Unit silently unless a spec explicitly exposes Business Unit UI.

### Business Unit MVP decision

Business Units are part of the core data model from day one, but they are hidden in the MVP user interface behind a system-created Default Business Unit.

Every Workspace MUST create at least one Default Business Unit, and every Branch MUST belong to a Business Unit, even when the user does not see or manage Business Units directly.

MVP internal structure:

```txt
Workspace
→ Default Business Unit
→ Main Branch
```

Business Unit management becomes visible in the UI only when at least one of these triggers exists:

1. The workspace has multiple business lines.
2. The workspace subscribes to multiple Operating Systems.
3. The same OS is used for multiple distinct activities.
4. The active plan allows more than one Business Unit.

Branches are visible from day one. Business Units are revealed progressively only when operational complexity requires them.

---

## Article V — Multi-Tenant Data Isolation

Every business data record MUST be tenant-scoped.

### Required identifiers

- `workspace_id` is mandatory for all tenant-owned business data.
- `business_unit_id` is required when data belongs to a specific Business Unit.
- `branch_id` is required when data belongs to a specific branch/location.

### Forbidden

- Cross-workspace queries without explicit system/admin authorization.
- Business records without tenant scope.
- Inferring tenant access only from frontend state.

Backend implementation MUST always enforce tenant isolation server-side.

---

## Article VI — OS Subscription and Access Model

OS subscriptions are workspace-level.

A workspace may subscribe to one or more OS products. A subscribed OS may then be enabled for one or more Business Units and Branches according to plan limits.

### OS subscription states

- `not_subscribed`
- `trial`
- `active`
- `past_due`
- `cancelled`
- `locked`

### Product Hub states

- `available`
- `active`
- `trial`
- `locked`
- `coming_soon`
- `not_started`

### Required access scopes

- Workspace access
- OS access
- Business Unit access
- Branch access
- OS-specific role

A user invited to a workspace does not automatically gain access to every OS, Business Unit, or Branch.

---



## Article VIB — OS Subscription and OS Enablement

OSSubscription and OSEnablement are first-class architecture concepts and must not be collapsed into a single state.

Definitions:

```txt
OSSubscription = workspace-level license and billing record.
OSEnablement   = operational activation of an OS for a workspace, business, or branch scope.
```

Rules:

- Buying an OS plan creates an OSSubscription.
- Launching/setup for a business creates an OSEnablement.
- OSEnablement references:
  - `workspaceId`
  - `osId`
  - `osSubscriptionId`
  - `scope: workspace | business | branch`
  - `businessUnitId` optional depending on scope
  - `branchIds` optional depending on scope
  - `status: setup_required | active | disabled`
- Product Hub must display subscription state and setup/enablement state separately.

OSSubscription answers: “Has this workspace licensed this OS?”

OSEnablement answers: “Where is this OS operationally active, and is setup complete?”

## Article VIA — Business Onboarding and OS Recommendation

The MVP onboarding flow must be business-first, not OS-first.

Required onboarding direction:

```txt
Sign Up / Login
→ Welcome + Language
→ Create Workspace
→ Create Business (UI label; includes Business Activity)
→ Product Hub
→ Launch Commerce OS
→ Choose Commerce Plan
→ Commerce Setup
→ Auto Configuration
→ Commerce Dashboard
```

### Business terminology rule

The UI may use the label **Business** for simplicity.

The data model and architecture must continue to use **Business Unit**.

```txt
User-facing label: Business
Architectural entity: Business Unit
```

No separate `Business` entity may be introduced if it duplicates Business Unit.

### Business Activity rule

Business Activity is a recommendation input only.

It may recommend suitable Operating Systems and presets, but it must never force an OS subscription or create a hard dependency between OS products.

```txt
Business Activity
→ Recommendation Engine
→ Suggested OS products
→ User chooses OS products
```

### Product Hub rule

Product Hub belongs to Core Platform.

Product Hub may show recommended, active, trial, locked, and coming-soon OS products. It must display subscription state separately from setup/enablement state, but it must not contain OS business logic.

### OS-specific Setup rule

Each Operating System owns its own setup experience, preset application, setup steps, and domain defaults.

Core Platform may collect shared context such as Workspace, Business Unit, Branch, and OS subscription state, but it must not implement Commerce, HR, Gym, CRM, Maintenance, or Healthcare setup logic.

### Preset ownership rule

Business Activity may suggest a default preset, but presets are owned and applied by the selected OS.

Examples:

```txt
Pharmacy + Commerce OS → Commerce Pharmacy Preset
Gym + Gym OS → Gym Default Preset
Clinic + Healthcare OS → Healthcare Clinic Preset
```

Presets must not own modules, must not hardcode workflows, and must not create separate applications.

## Article VII — Pricing and Plan Limits

Each OS has independent plans and limits.

Typical plan tiers:

- Starter
- Pro
- Business

Plan limits may control:

- users
- branches
- Business Units
- employees
- orders/sales volume
- members
- repair tickets
- enabled modules
- integrations
- advanced permissions

Core Platform is included with OS subscriptions in MVP and is not treated as a standalone sellable product unless a future commercial strategy explicitly changes this.

---

## Article VIII — Team, Users, Employees, and Permissions

A login user is not always an employee record.

### Concepts

- **Core User**: login identity
- **Workspace Member**: user inside a workspace
- **OS Access**: which OS products the member can use
- **Business Unit Access**: which Business Units the member can access
- **Branch Access**: which branches the member can access
- **OS Role**: operational role inside an OS
- **HR Employee Profile**: HR OS domain record, not required for every login user

### Permission format

```txt
{os}.{resource}.{action}
```

Examples:

```txt
core.billing.manage
commerce.pos.use
commerce.invoices.view
commerce.tax.manage
hr.payroll.manage
gym.members.checkin
crm.leads.manage
maintenance.tickets.close
```

Permissions MUST be scoped to Workspace, OS, Business Unit, or Branch as appropriate.

---

## Article IX — Commerce OS Boundary

Commerce OS owns commerce workflows.

### Commerce Core includes

- Business Identity
- Products and Categories
- Inventory and Branch Inventory
- Orders
- Customers
- Payments
- Taxes
- Invoices
- Document Templates
- Reports
- Branches
- Operational Staff roles

### Commerce rules

- POS creates orders through Commerce Core.
- POS records payments through Commerce Core.
- POS adjusts inventory through Commerce Core.
- Invoices and receipts are generated through Commerce document templates.
- No Commerce module may create parallel orders, inventory, customer, payment, invoice, or tax systems.

### Commerce presets

Restaurant/Cafe, Pharmacy, Supermarket, Electronics/Mobile Store, Fashion, Cosmetics, Medical Supplies, and Retail are Commerce presets, not separate apps.

The user-facing phrase “Business Type” is a simplified UX label. Architecturally, it MUST be treated as a **Business Preset** and stored as `businessPreset`.

A Commerce Preset provides smart starting configuration only. It may define or suggest:

- default categories
- default units
- suggested modules
- suggested document templates
- suggested POS behavior
- suggested reports
- suggested fields
- optional sample products

Presets MUST NOT create separate applications, MUST NOT own modules, and MUST NOT hardcode workflows. They only provide smart defaults and recommendations.

Required rule:

```txt
Preset recommends modules.
Preset does not own modules.
Preset does not hardcode workflows.
Users may enable or disable allowed modules based on plan and configuration.
```

In MVP, preset output is limited to defaults and recommendations. Complex behaviors such as batch tracking, expiry tracking, kitchen workflows, IMEI tracking, supplier purchases, or Healthcare prescription integration MUST appear only as recommended, locked, or plan-gated capabilities until implemented.

Pharmacy belongs to Commerce OS because it is operationally product, inventory, barcode, sales, invoices, tax, batch/expiry future.

Healthcare owns clinical workflows, not pharmacy retail sales.

---

## Article IXA — CommerceSetup and Address Ownership

CommerceSetup belongs to BusinessUnit. It must not be modeled as a child of Branch.

Branch is operational scope for POS, inventory, orders, invoices, reports, transfers, and returns.

CommerceSetup owns:

- commerce preset
- billing/legal identity
- tax configuration
- numbering
- templates
- categories
- units
- selling mode

Address ownership rules:

- Workspace country/currency/timezone are workspace defaults.
- Branch address/city is operational location.
- Commerce billing address/city/country is for invoices/legal documents.
- Billing address may default from branch/workspace, but user edits must be preserved.

## Article X — Cross-OS Data Ownership

Cross-OS integration must follow clear ownership rules.

| Integration | Master source | Consumer / extension |
|---|---|---|
| HR ↔ Commerce | HR owns employee profile | Commerce owns cashier/operational role |
| Commerce ↔ CRM | Commerce owns purchase history | CRM owns leads, campaigns, follow-ups |
| Healthcare ↔ Commerce Pharmacy | Healthcare owns prescription | Commerce owns stock, sale, invoice, payment |
| Gym ↔ CRM | Gym owns membership | CRM owns lead/campaign workflow |
| Maintenance ↔ Commerce | Maintenance owns repair ticket | Commerce may own linked parts inventory/invoice |

No integration may blur domain ownership or introduce hidden hard dependencies.

---

## Article XI — Localization First

NexoraXS must support Arabic and English from day one.

### Required

- User-facing UI must be i18n-ready.
- Arabic must support RTL.
- English must support LTR.
- System labels, module labels, preset labels, invoice labels, tax labels, statuses, and document labels must be localizable.
- User-entered business data is stored as entered and is not auto-translated.

### Forbidden

- Hardcoding new user-facing strings without a translation path.
- UI layouts that only work LTR.
- Receipt/invoice templates that only support English.

---

## Article XII — Document Templates as Platform Pattern

Document templates are an OS-owned platform pattern.

Examples:

| OS | Documents |
|---|---|
| Commerce | POS receipt, tax invoice, refund receipt, delivery note, packing slip |
| HR | contract, payslip, leave approval, employee letter |
| Gym | membership contract, renewal receipt, waiver |
| Maintenance | repair job card, warranty certificate, handover receipt |
| Healthcare | prescription, medical report, visit summary |

Commerce MVP must define Business Identity, Tax Settings, Invoice Numbering, and basic receipt/invoice templates before backend sale persistence.

---

## Article XIII — Audit Logs and Notifications

Audit logs and notifications are platform patterns.

### Audit logs

Critical actions must be audit-log-ready, including:

- user invited
- permission changed
- subscription changed
- product price changed
- invoice cancelled
- refund created
- payroll approved
- prescription fulfilled
- repair ticket closed

### Notifications

Notifications are platform infrastructure with OS-specific producers.

Examples:

- Core: subscription expiring, payment failed, user invited
- Commerce: low stock, sale completed, refund created, tax report ready
- HR: leave request, payroll ready, attendance issue
- Gym: membership expiring, class reminder
- Maintenance: ticket status changed, warranty expiring

MVP may use mock notifications/activity. Backend persistence comes through explicit specs.

---

## Article XIV — Spec-Driven Development

NexoraXS uses spec-driven development.

No meaningful feature should be implemented without a spec or clearly stated implementation task.

Each spec must answer:

1. Which app/OS owns this?
2. Is this Core Platform, Commerce Core, Commerce Preset, or Commerce Module?
3. What is the Workspace / Business Unit / Branch scope?
4. Does it affect OS subscription, plan limits, or permissions?
5. Does it require Arabic/English and RTL/LTR support?
6. Does it require document templates, audit logs, or notifications?
7. Can it be implemented UI/mock first before backend?

Backend work must not start before UI flows and data contracts are stable unless explicitly approved.

---

## Article XV — MVP Discipline

The current build focus is:

1. Core Platform alignment
2. Product Hub
3. Localization foundation
4. Commerce OS MVP
5. Business Identity
6. Tax Settings
7. Document Templates
8. Products and Inventory
9. POS with receipt/invoice preview
10. Orders, Invoices, Reports
11. Billing and OS subscription states
12. Team and Access

### Do not build now

- Full HR OS
- Full CRM OS
- Full Gym OS
- Full Healthcare OS
- Full Maintenance OS
- Marketplace/plugin sandbox
- Real cross-OS integration bus
- Complex event-driven architecture
- Full Business Unit management UI
- Backend persistence before UI/contracts are ready

---

## Article XVI — Engineering Rules

### Architecture

- Modular Monolith, not microservices.
- No Kubernetes requirement.
- No overengineering for MVP.
- Shared packages must not contain business logic.
- Apps must not import directly from other apps.

### Frontend

- TypeScript strict mode.
- No `any` unless explicitly justified.
- Loading, empty, and error states are required for data-driven UI.
- New UI must consider Arabic/English and RTL/LTR.

### Backend

- Laravel API when backend begins.
- PostgreSQL primary database.
- Redis for cache/queues/sessions when needed.
- Server-side tenant enforcement is mandatory.

---

## Article XVII — Governance

This constitution is the highest governance document for the NexoraXS repository.

`AGENTS.md`, skills, specs, and implementation plans must reflect this constitution.

If `AGENTS.md` conflicts with this constitution, the constitution wins and `AGENTS.md` must be corrected.

If this constitution conflicts with the v5.3 Final Master Architecture, pause and amend the constitution explicitly.

### Amendment levels

- **PATCH**: wording fixes, clarifications, typo fixes
- **MINOR**: new principle, new OS boundary, new platform rule
- **MAJOR**: change to platform identity, tenancy model, OS model, or commercial architecture

---

## Final Directive for Agents

Before proposing or writing code, every agent must verify:

- Does this belong to Core Platform or an OS?
- If Commerce, is it Core, Preset, or Module?
- Is this within MVP scope?
- Does it create cross-OS dependency?
- Does it respect workspace/business-unit/branch scope?
- Does it respect Arabic/English and RTL/LTR?
- Does it need permissions, plan limits, audit logs, notifications, or document templates?
- Can it be UI/mock first?

When in doubt, keep the scope smaller and create a spec.


## Multi-Branch Architecture Goal (Spec 049 Addition)

Architecture Goals

- Multi-Business
- Multi-Branch
- Multi-Operating System

Rules

- Business (BusinessUnit internally) owns one or more Branches.
- Branch represents the operational scope only.
- The platform architecture must support multiple Branches per Business from day one, even if the MVP initially exposes only a Main Branch.
- OSEnablement may target workspace, business, or branch scope depending on the Operating System.

### Spec 049 Additional Acceptance Criteria

- Multi-Business architecture-ready.
- Multi-Branch architecture-ready.
- Branches belong to Business (BusinessUnit internally).
- OSEnablement supports workspace, business, and branch scopes.
