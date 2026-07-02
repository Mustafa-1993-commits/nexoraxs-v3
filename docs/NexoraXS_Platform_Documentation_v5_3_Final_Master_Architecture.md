# NexoraXS Platform Documentation

**Version:** 5.3.2 Final Master Architecture — Onboarding Alignment  
**Prepared For:** NexoraXS Business Operating Platform  
**Official Domain:** https://www.nexoraxs.com  
**Status:** Final Master Architecture — Architecture Freeze Ready + v5.3.2 Onboarding Alignment

---

## 1. Platform Overview

NexoraXS is a multi-product SaaS **Business Operating Platform**.

It is not a single POS system, not a single commerce app, and not a giant ERP monolith.

NexoraXS is designed as:

```text
Core Platform
+
Independent Operating Systems
+
Shared SaaS Infrastructure
+
Optional Integrations
+
Shared Design System
```

The platform allows businesses to subscribe to independent operating systems such as:

- Commerce OS
- HR OS
- Gym OS
- Maintenance OS
- CRM OS
- Healthcare OS

Each Operating System works standalone, has its own subscription, navigation, workflows, permissions, and domain logic.

The Core Platform connects them through shared authentication, workspace management, billing, users, permissions, branches, localization, notifications, and integrations.

### MVP Execution Boundary

The full platform vision is defined from day one, but the MVP must not attempt to build every Operating System at once.

The current MVP scope is:

```text
Core Platform foundation
+
Commerce OS MVP
+
Arabic/English localization foundation
+
Business Unit-ready architecture hidden behind a default Business Unit
+
Future OS products shown as Coming Soon only
```

Future Operating Systems such as HR OS, Gym OS, Maintenance OS, CRM OS, and Healthcare OS must remain architectural placeholders until Commerce OS reaches a usable MVP.

---

## 2. Core Philosophy

### NexoraXS is NOT

- A giant ERP monolith
- A POS-only product
- A commerce-only product
- A set of random dashboards
- A system where all business logic lives in one app
- A system where one OS depends on another to function

### NexoraXS IS

- A Business Operating Platform
- A multi-product SaaS ecosystem
- A modular platform with independent OS products
- A workspace-based, branch-aware, subscription-driven platform
- Arabic/English and RTL/LTR-ready from day one
- Integration-ready between products without tightly coupling domains

### Golden Rule

```text
Each OS works standalone.
Each OS has its own subscription.
Integrations are optional.
Core Platform connects everything.
```

---

## 3. Final Platform Architecture

```text
NexoraXS
│
├── Core Platform
│   ├── Authentication
│   ├── Workspace / Company Management
│   ├── Business Units (architecture-ready; hidden in MVP)
│   ├── Branches
│   ├── Product Hub / OS Launcher
│   ├── Billing & Subscriptions
│   ├── Platform Invoices
│   ├── Users & Team Access
│   ├── Shared Permission Foundation
│   ├── Notifications
│   ├── Audit Logs
│   ├── Integrations Hub
│   ├── Localization: Arabic / English
│   └── Shared SaaS Infrastructure
│
├── Commerce OS
│   ├── Commerce Core
│   │   ├── Products
│   │   ├── Categories & Units
│   │   ├── Inventory
│   │   ├── POS
│   │   ├── Orders
│   │   ├── Customers
│   │   ├── Payments
│   │   ├── Taxes
│   │   ├── Invoices
│   │   ├── Document Templates
│   │   ├── Business Identity
│   │   ├── Branch Sales
│   │   └── Reports
│   ├── Business Presets
│   │   ├── Retail
│   │   ├── Pharmacy
│   │   ├── Restaurant / Cafe
│   │   ├── Supermarket
│   │   ├── Electronics / Mobile Store
│   │   ├── Clothing / Fashion
│   │   ├── Cosmetics
│   │   └── Medical Supplies
│   └── Future Commerce Modules
│       ├── Delivery
│       ├── Online Store
│       ├── Kitchen
│       ├── Commerce Repairs
│       ├── Loyalty
│       └── Supplier Purchases
│
├── HR OS
│   ├── Employees
│   ├── Departments
│   ├── Job Titles
│   ├── Attendance
│   ├── Shifts
│   ├── Leaves
│   ├── Payroll
│   ├── Contracts
│   ├── Employee Documents
│   └── Reports
│
├── Gym OS
│   ├── Members
│   ├── Membership Plans
│   ├── Subscriptions
│   ├── Trainers
│   ├── Classes
│   ├── Check-ins
│   ├── Renewals
│   └── Reports
│
├── Maintenance OS
│   ├── Repair Tickets
│   ├── Device Intake
│   ├── Customers
│   ├── Technicians
│   ├── Diagnosis
│   ├── Spare Parts
│   ├── Warranty
│   ├── Job Cards
│   └── Reports
│
├── CRM OS
│   ├── Leads
│   ├── Contacts
│   ├── Companies
│   ├── Deals
│   ├── Pipelines
│   ├── Campaigns
│   ├── Follow-ups
│   └── Customer Timeline
│
├── Healthcare OS
│   ├── Clinics
│   ├── Hospitals
│   ├── Doctors
│   ├── Patients
│   ├── Appointments
│   ├── Medical Records
│   ├── Prescriptions
│   ├── Insurance
│   └── Reports
│
├── Shared Packages
│   ├── UI System
│   ├── Types
│   ├── Auth
│   ├── Permissions
│   ├── Billing
│   ├── Workspace
│   ├── Branches
│   ├── Documents
│   ├── i18n
│   └── Integrations
│
└── Backend API
```

---

## 4. Operating System Independence

Each Operating System is an independent product.

A customer may subscribe to:

- Commerce OS only
- HR OS only
- Gym OS only
- Maintenance OS only
- CRM OS only
- Healthcare OS only
- Any combination of multiple OS products

Commerce OS must not be required for HR OS.

HR OS must not be required for Commerce OS.

Gym OS must not be required for CRM OS.

Integrations increase value, but must never be mandatory for basic OS operation.

---

## 5. Product Domains

### 5.1 Commerce OS

Commerce OS owns all workflows related to:

- Selling
- Products
- Inventory
- POS
- Orders
- Customers
- Payments
- Taxes
- Invoices
- Document templates
- Operational commerce reports

#### Commerce Core

Commerce Core is the immutable foundation shared by all commerce presets and modules.

Commerce Core includes:

- Products
- Categories
- Units
- Inventory
- POS
- Orders
- Customers
- Payments
- Taxes
- Invoices
- Document templates
- Business identity
- Branch sales
- Operational commerce reports

No Commerce module may create a separate order system, invoice system, inventory system, payment system, or tax system. Modules extend Commerce Core; they do not replace it.

#### Commerce Business Presets

Commerce OS supports business presets such as:

- Retail Store
- Pharmacy
- Supermarket
- Restaurant / Cafe
- Electronics / Mobile Store
- Clothing / Fashion
- Cosmetics
- Medical Supplies
- Other

In the UI, this may be presented as:

```text
What type of business are you running?
```

Architecturally, this value must be treated as:

```text
businessPreset
```

The user-facing phrase “Business Type” is only a simplified UX label. The architectural concept is **Business Preset**.

A Commerce Preset provides smart starting configuration only. It may define or suggest:

- Default categories
- Default units
- Suggested modules
- Suggested document templates
- Suggested POS behavior
- Suggested reports
- Suggested product fields
- Optional sample products

A preset must not create a separate OS, must not own modules, and must not hardcode workflows.

### Preset vs Module Rule

```text
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

### Commerce Preset Examples

#### Pharmacy Preset

Enabled now:

- Products
- Inventory
- POS
- Invoices
- Taxes

Recommended later:

- Barcode
- Expiry tracking
- Batch tracking
- Supplier purchases
- Prescription integration with Healthcare OS

#### Restaurant / Cafe Preset

Enabled now:

- POS
- Orders
- Invoices
- Taxes

Recommended later:

- Dine-in
- Delivery
- Kitchen
- Tables
- Service charge

#### Mobile Store / Electronics Preset

Enabled now:

- POS
- Inventory
- Invoices
- Taxes

Recommended later:

- Barcode
- Serial / IMEI
- Warranty
- Repairs integration / Maintenance OS integration

#### Supermarket Preset

Enabled now:

- POS
- Inventory
- Invoices
- Taxes

Recommended later:

- Barcode-first POS
- Expiry tracking
- Units: kg, gram, liter, pack
- Fast checkout

#### Fashion Preset

Enabled now:

- POS
- Inventory
- Invoices

Recommended later:

- Variants
- Size
- Color
- Exchange policy template

### Commerce Presets in MVP

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

### Suggested Modules Step

After selecting a preset, the onboarding should show a “Recommended setup” step.

Example for Pharmacy:

```text
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

```text
Locked by plan
```

Modules remain independently enabled, disabled, locked, or plan-gated based on workspace subscription and user configuration.

#### Important Rule

```text
Pharmacy belongs to Commerce OS, not Healthcare OS.
```

A pharmacy is a commerce business because it manages products, inventory, POS, invoices, tax, customers, and payments.

Healthcare OS may integrate with Commerce Pharmacy through prescriptions, but Healthcare OS does not own pharmacy stock, pharmacy POS, or pharmacy invoices.

#### Commerce Future Modules

Future Commerce modules may include:

- Delivery
- Online Store
- Kitchen
- Commerce Repairs
- Loyalty
- Supplier purchases
- Advanced pharmacy inventory

These modules must remain extensions of Commerce Core.

---

### 5.2 HR OS

HR OS owns workflows related to:

- Employees
- Attendance
- Shifts
- Leaves
- Payroll
- Contracts
- Departments
- Job titles
- Employee documents
- HR reports

HR OS is a standalone product and can be sold without Commerce OS.

If installed, HR OS may become the master employee system for other OS products.

---

### 5.3 Gym OS

Gym OS owns workflows related to:

- Gym members
- Membership plans
- Subscriptions
- Trainers
- Classes
- Check-ins
- Renewals
- Branch access
- Gym reports

---

### 5.4 Maintenance OS

Maintenance OS owns workflows related to:

- Repair tickets
- Device intake
- Customers
- Technicians
- Diagnosis
- Spare parts
- Warranty
- Job cards
- Repair invoices
- Maintenance reports

#### Maintenance OS vs Commerce Repairs

Simple repair intake attached to a commerce sale may exist as a Commerce module.

Example:

```text
Mobile store sells accessories and occasionally records a repair request
→ Commerce Repairs module is acceptable
```

Full repair center operations belong to Maintenance OS.

Example:

```text
Repair center with technicians, ticket workflow, warranty, diagnosis, job cards, and repair lifecycle
→ Maintenance OS
```

---

### 5.5 CRM OS

CRM OS owns workflows related to:

- Leads
- Contacts
- Companies
- Deals
- Pipelines
- Campaigns
- Follow-ups
- Customer timeline
- Sales activity

#### CRM OS vs Commerce Customers

Commerce OS owns transactional customers connected to orders, invoices, payments, and POS sales.

CRM OS owns leads, deals, pipelines, campaigns, follow-ups, relationship workflows, and customer lifecycle management.

Commerce Customers must not become a full CRM. CRM OS must not duplicate Commerce order and invoice logic.

---

### 5.6 Healthcare OS

Healthcare OS owns workflows related to:

- Clinics
- Hospitals
- Doctors
- Patients
- Appointments
- Medical records
- Prescriptions
- Insurance
- Medical services
- Rooms
- Healthcare reports

Healthcare OS does not own pharmacy commerce operations.

---

## 6. Organization Model

NexoraXS uses the following hierarchy:

```text
Account
→ Workspace / Company
→ Business Units
→ Branches
→ OS Subscriptions
→ OS Workflows
```

---

## 7. Workspace

A Workspace represents the main company or group.

Example:

```text
Workspace: Mustafa Group
```

A Workspace owns:

- Billing
- Users
- Permissions
- Language settings
- Subscriptions
- Business units
- Branches
- Integrations
- Notifications
- Audit logs

### Forbidden Workspace Modeling

Do not create:

```text
PharmacyWorkspace
GymWorkspace
RestaurantWorkspace
ClinicWorkspace
BranchWorkspace
```

Correct model:

```text
Workspace
+ Business Units
+ Branches
+ OS Subscriptions
```

---

## 8. Business Units

A Business Unit represents an operational business inside the Workspace.

Example:

```text
Workspace: Mustafa Group

Business Units:
- Mustafa Pharmacy
- Mustafa Gym
- Mustafa Maintenance Center
- Mustafa Clinic
```

Each Business Unit may use one or more Operating Systems.

Examples:

```text
Mustafa Pharmacy → Commerce OS
Mustafa Gym → Gym OS
Mustafa Maintenance Center → Maintenance OS
Mustafa Clinic → Healthcare OS
```

The architecture must be Business Unit-ready from day one.

However, the MVP may auto-create one default Business Unit per Workspace and hide Business Unit management from the UI until multi-business operations are needed.

MVP default:

```text
Workspace
→ Default Business Unit
→ Main Branch
→ Commerce OS
```

### Business Unit MVP Decision

Business Units are part of the core data model from day one, but they are hidden in the MVP user interface behind a system-created Default Business Unit.

Every Workspace must create at least one Default Business Unit, and every Branch must belong to a Business Unit, even when the user does not see or manage Business Units directly.

MVP behavior:

```text
Workspace: Mustafa Group
  → Business Unit: Default Business Unit
    → Branch: Main Branch
```

This prevents the platform from building directly on the Workspace and avoids a major refactor when multi-business operations are introduced.

### Business Unit UI Visibility Triggers

Business Unit management becomes visible in the UI when one or more of the following triggers exist:

1. **Multiple business lines inside the same Workspace**

   Example:

   ```text
   Workspace: Mustafa Group
   - Pharmacy
   - Gym
   - Maintenance Center
   ```

2. **The Workspace subscribes to multiple Operating Systems**

   Example:

   ```text
   Commerce OS + Gym OS
   → Business Unit: Mustafa Pharmacy → Commerce OS
   → Business Unit: Mustafa Gym → Gym OS
   ```

3. **The same OS is used for multiple distinct activities**

   Example:

   ```text
   Commerce OS
   - Pharmacy
   - Supermarket
   - Restaurant
   ```

   Each activity may have its own preset, branches, reports, inventory behavior, tax settings, and document settings.

4. **The active plan allows more than one Business Unit**

   Example:

   ```text
   Starter: 1 Business Unit
   Pro: 3 Business Units
   Business: Unlimited / Custom
   ```

   When the plan supports multiple Business Units, the UI may reveal “Manage Business Units”.

### MVP Visibility Rule

Branches are visible from day one. Business Units are revealed progressively only when operational complexity requires them.

MVP visible concepts:

```text
Visible:
- Workspace
- Main Branch / Branches

Hidden:
- Default Business Unit
```

### Required Data Model Rule

Even when Business Units are hidden in the MVP UI, every Branch must belong to a `businessUnitId`.

```ts
type Workspace = {
  id: string
  name: string
}

type BusinessUnit = {
  id: string
  workspaceId: string
  name: string
  type?: string
  status: "active" | "archived"
}

type Branch = {
  id: string
  workspaceId: string
  businessUnitId: string
  name: string
  code: string
  isMain: boolean
}
```

---

## 9. Branches

A Branch represents a physical operating location.

Example:

```text
Business Unit: Mustafa Pharmacy
Branches:
- Smouha Branch
- Miami Branch
- Sporting Branch
```

Branches are first-class operational entities.

Even if a business has one branch, the system must create a default:

```text
Main Branch
```

### Branch Rule

Branches must not be modeled as Workspaces.

Correct:

```text
Workspace: Mustafa Group
Business Unit: Mustafa Pharmacy
Branch: Smouha
```

Wrong:

```text
Workspace: Smouha Pharmacy Branch
```

---

## 10. Branch-Aware Requirements

Every operational OS must be branch-aware where applicable.

### Commerce OS

- Inventory per branch
- POS per branch
- Orders per branch
- Invoices per branch
- Reports per branch
- Users per branch
- Stock transfers between branches

### HR OS

- Employees per branch
- Attendance per branch
- Shifts per branch
- Payroll groups by branch
- Branch permissions

### Gym OS

- Members per branch
- Membership access by branch
- Trainers per branch
- Classes per branch
- Check-ins per branch

### Maintenance OS

- Repair tickets per branch
- Technicians per branch
- Devices per branch
- Spare parts per branch

### CRM OS

- Leads by branch
- Campaigns by branch
- Sales team by branch

### Healthcare OS

- Clinics by branch
- Doctors by branch
- Appointments by branch
- Medical departments by branch

---



## 11AA. Spec 049 — Onboarding Architecture v2

`049-onboarding-architecture-v2` locks the final onboarding direction. It is limited to onboarding architecture, Product Hub, OS subscription/enablement state, and Commerce setup entry. It must not change Commerce operational modules such as POS, Products, Inventory, Orders, Customers, Reports, Returns, or Transfers except where navigation/context wiring is required.

After Spec 049 is implemented, onboarding architecture is frozen. Later specs should be feature specs, not redesigns of the core onboarding journey.

## 11A. MVP Business Onboarding Journey

The MVP onboarding flow is a UX/product-flow alignment built on top of the existing Workspace / Business Unit / Branch architecture. It does not change the core architecture.

### Final MVP onboarding flow

```text
Sign Up / Login
→ Welcome + Language
→ Create Workspace
→ Create Business (UI label; includes Business Activity)
→ Product Hub / OS Launcher
→ Launch Commerce OS
→ Choose Commerce Plan
→ Commerce Setup
→ Auto Configuration
→ Commerce Dashboard
```

### Local development routing

```text
Core Platform / Product Hub     → localhost:3001
Commerce OS Setup + Dashboard   → localhost:3002
```

Production domains remain mapped by application domain:

```text
app.nexoraxs.com        → Core Platform / Product Hub
commerce.nexoraxs.com   → Commerce OS Setup + Dashboard
api.nexoraxs.com        → Backend API
```

### Business vs Business Unit terminology

For UX simplicity, the user-facing MVP may use the word **Business**.

Architecturally and in the data model, this remains **Business Unit**.

```text
User sees:      Business
System stores:  BusinessUnit
```

The platform must not introduce a second entity that duplicates Business Unit. `Business` is a UX label only.

### Address ownership rule

Address-like fields have distinct ownership and must not be treated as duplicates.

- Workspace country, currency, and timezone are workspace defaults.
- Branch address/city is the operational location.
- Commerce billing address/city/country is for invoices and legal documents.
- Billing address may default from branch/workspace, but user edits must be preserved.

### Business Activity recommendation rule

Business Activity is used to recommend suitable Operating Systems. It must never force Operating System subscriptions.

```text
Business Activity
→ Recommendation Engine
→ Suggested OS cards
→ User chooses which OS to activate
```

Examples:

```text
Pharmacy
→ Commerce OS recommended
→ HR OS optional
→ Healthcare OS optional / future
→ Maintenance OS optional / future

Gym
→ Gym OS recommended / future
→ CRM OS optional / future
→ HR OS optional / future

Fashion
→ Commerce OS recommended
→ CRM OS optional / future
→ HR OS optional / future
```

Future OS products may be shown as Coming Soon, locked, or optional, but must not distract from the Commerce OS MVP.

### Product Hub ownership

Product Hub belongs to Core Platform. It is responsible for:

- showing OS subscription states;
- showing OS setup/enablement states;
- showing recommended, active, trial, locked, and coming-soon OS products;
- launching the selected OS app;
- routing users to the correct OS-specific setup if that OS has not been configured.

Product Hub must not contain OS business logic. OS business logic remains inside the owning OS.

### OS Subscription vs OS Enablement

OSSubscription and OSEnablement are separate first-class architecture concepts.

```text
OSSubscription = workspace-level license and billing record
OSEnablement   = operational activation of an OS for a workspace, business, or branch scope
```

Rules:

- Buying an OS plan creates an `OSSubscription`.
- Launching/setup for a business creates an `OSEnablement`.
- Product Hub must display subscription state and setup/enablement state separately.
- OSEnablement references:
  - `workspaceId`
  - `osId`
  - `osSubscriptionId`
  - `scope: workspace | business | branch`
  - `businessUnitId` optional depending on scope
  - `branchIds` optional depending on scope
  - `status: setup_required | active | disabled`

Example Product Hub interpretation:

```text
Commerce OS
Subscription: active
Enablement: setup_required for Mustafa Pharmacy
Action: Complete Setup
```

### OS-specific Setup Experience

Every Operating System owns its own setup experience.

```text
Core Platform
→ Product Hub
→ Launch selected OS
→ OS-specific Setup Experience
→ OS Dashboard
```

Core Platform may collect generic workspace/business/branch context, but setup steps that belong to an OS must run inside that OS.

Examples:

```text
Commerce OS Setup
→ Business Identity
→ Selling Mode
→ Tax Settings
→ Preset Defaults
→ Review & Launch

HR OS Setup future
→ Company Structure
→ Departments
→ Attendance Rules
→ Leave Policies
→ Review & Launch

Gym OS Setup future
→ Membership Defaults
→ Working Hours
→ Trainers / Classes Defaults
→ Review & Launch
```

### Preset ownership rule

Business Activity may suggest a default preset, but every OS owns and applies its own preset.

```text
Business Activity: Pharmacy
→ Commerce OS loads Commerce Pharmacy Preset
→ HR OS may later load HR Retail Pharmacy Preset
→ Healthcare OS may later load Healthcare Pharmacy Integration Preset
```

A Business Activity must not own modules, hardcode workflows, or create application boundaries.

### Commerce MVP setup simplification

Commerce OS MVP setup should be concise. The preferred MVP flow is:

```text
Commerce Setup Experience
→ Choose Commerce Plan
→ Business Identity
→ Commerce Preset
→ Main Branch + Tax
→ Review & Launch
→ Auto Configuration
```

### CommerceSetup ownership

CommerceSetup belongs to BusinessUnit. It must not be modeled as a child of Branch.

Branch is the operational scope for POS, inventory, orders, invoices, reports, transfers, and returns.

CommerceSetup owns:

- commerce preset;
- billing/legal identity;
- tax configuration;
- numbering;
- templates;
- categories;
- units;
- selling mode.

The following may be seeded automatically from the Commerce preset and moved to Settings for later editing:

- categories;
- units;
- document templates;
- invoice / receipt numbering;
- suggested modules;
- optional sample products.

Advanced preset-driven capabilities such as expiry tracking, batch tracking, kitchen workflows, IMEI tracking, supplier purchases, and healthcare prescription integration remain recommended, locked, coming soon, or plan-gated until implemented.

## 11. Product Hub / OS Launcher

After login and workspace setup, users access the Product Hub.

The Product Hub displays OS products.

### MVP Product Hub Display Rule

In the MVP, Commerce OS should be the primary card. Future OS products should be visually secondary under a Coming Soon section, not equal-weight products that distract from the current MVP.

### Full Product Hub Vision

The Product Hub may eventually display:

```text
Commerce OS
POS · Inventory · Invoices · Taxes · Pharmacy · Restaurants
Status: Subscribe / Trial / Active / Locked

HR OS
Employees · Attendance · Payroll · Leaves
Status: Subscribe / Trial / Active / Locked

Gym OS
Members · Memberships · Trainers · Classes
Status: Subscribe / Trial / Active / Locked

Maintenance OS
Tickets · Technicians · Devices · Warranty
Status: Subscribe / Trial / Active / Locked

CRM OS
Leads · Deals · Campaigns · Follow-ups
Status: Subscribe / Trial / Active / Locked

Healthcare OS
Clinics · Hospitals · Patients · Appointments
Status: Subscribe / Trial / Active / Locked
```

Pharmacy must not appear as a separate OS.

Pharmacy appears inside Commerce OS.

---

## 12. User & Access Model

Users are managed centrally from:

```text
Core Platform → Team & Access
```

The Owner can define:

1. Workspace role
2. OS access
3. Business Unit access
4. Branch access
5. Role inside each OS

### Workspace Roles

- Owner
- Admin
- Member
- Viewer

### Example

```text
User: Ahmed

Workspace Role:
Member

OS Access:
Commerce OS only

Business Unit:
Mustafa Pharmacy

Branch:
Smouha

Commerce Role:
Cashier

Permissions:
- commerce.pos.use
- commerce.orders.create
- commerce.receipts.print

No access:
- HR OS
- Gym OS
- Billing
- Settings
- Other branches
```

---

## 13. User vs Employee

A User is a person with login access.

An Employee is an HR profile.

A person may be:

```text
Core User
+ HR Employee
+ Commerce Cashier
+ Gym Trainer
```

Every OS must support lightweight operational staff roles without requiring HR OS.

If HR OS is installed, HR may become the master employee profile system.

If HR OS is not installed, each OS can still manage simple staff and roles independently.

---

## 14. Billing & Subscriptions

Each OS has its own subscription.

Examples:

```text
Commerce OS — Starter / Pro / Business
HR OS — Starter / Pro / Business
Gym OS — Starter / Pro / Business
Maintenance OS — Starter / Pro / Business
CRM OS — Starter / Pro / Business
Healthcare OS — Starter / Pro / Enterprise
```

Core Platform must support multiple active OS subscriptions inside one Workspace.

### OS Subscription States

Each OS subscription may be in one of these states:

```text
not_subscribed
trial
active
past_due
cancelled
locked
```

These states are important for the Product Hub, billing screens, access control, and upgrade flows.

Example:

```text
Workspace: Mustafa Group

Subscriptions:
- Commerce OS / Pro / Active
- HR OS / Starter / Active
- Gym OS / Trial / Active
- CRM OS / Not subscribed
```

---

## 15. Billing Types

### 15.1 Platform Billing Invoices

These are invoices from NexoraXS to the Workspace.

Example:

```text
NexoraXS → Mustafa Group
Commerce OS Pro Subscription
VAT
Discount
Total
```

They are managed by Core Platform.

### 15.2 Operational Invoices

These are invoices from the business to its own customers.

Example:

```text
Mustafa Pharmacy → Customer
POS Sale Invoice
VAT
Receipt
```

They are managed inside the relevant OS, such as Commerce OS.

---

## 16. Commerce OS Full Journey

```text
Subscribe to Commerce OS
→ Select Business Unit
→ Create / Select Branch
→ Choose Business Preset
→ Choose Operational Modes
→ Setup Business Identity
→ Upload Logo
→ Setup Tax
→ Setup Invoice Numbering
→ Choose Document Templates
→ Setup Categories and Units
→ Add Products
→ Add Branch Inventory
→ Open POS
→ Select Branch
→ Sell Product
→ Apply Discount
→ Calculate Tax
→ Take Payment
→ Generate Receipt / Invoice
→ Deduct Branch Inventory
→ View Order
→ View Reports by Branch
```

### Commerce Tax Setup

- VAT registered?
- Tax number
- Default tax rate
- Prices include tax or exclude tax
- Tax invoice enabled?

### Commerce Document Setup

- Business logo
- Business name
- Legal name
- Address
- Phone
- Tax number
- Invoice prefix
- Receipt prefix
- Starting invoice number
- Receipt 58mm
- Receipt 80mm
- A4 tax invoice
- Refund receipt
- Online invoice
- Template styles: Minimal, Classic, Detailed
- Live preview

---

## 17. HR OS Full Journey

```text
Subscribe to HR OS
→ Select Workspace
→ Setup Company Structure
→ Setup Branches / Departments
→ Add Employees
→ Assign Employees to Branches
→ Define Job Titles
→ Setup Attendance Rules
→ Setup Shifts
→ Setup Leave Policies
→ Setup Payroll
→ Run Monthly Payroll
→ Generate HR Reports
→ Optional: Link Employees to other OS roles
```

HR OS must work standalone without Commerce OS.

---

## 18. Gym OS Full Journey

```text
Subscribe to Gym OS
→ Select Business Unit
→ Create / Select Branch
→ Setup Membership Plans
→ Add Trainers
→ Add Members
→ Sell Membership
→ Member Check-in
→ Attend Class
→ Renewal Reminder
→ Reports by Branch
→ Optional: Link Trainers from HR
→ Optional: Send Leads to CRM
```

---

## 19. Maintenance OS Full Journey

```text
Subscribe to Maintenance OS
→ Select Business Unit
→ Create / Select Branch
→ Setup Service Types
→ Add Technicians
→ Receive Device
→ Create Repair Ticket
→ Diagnose Issue
→ Assign Technician
→ Add Spare Parts
→ Update Status
→ Complete Repair
→ Generate Invoice
→ Warranty Record
→ Reports by Branch
```

---

## 20. CRM OS Full Journey

```text
Subscribe to CRM OS
→ Setup Pipelines
→ Add Leads
→ Assign Salesperson
→ Follow-up
→ Convert Lead to Customer
→ Create Deal
→ Run Campaign
→ Sync Customer with Commerce/Gym if connected
→ Reports
```

---

## 21. Healthcare OS Full Journey

```text
Subscribe to Healthcare OS
→ Setup Clinic / Hospital
→ Setup Branches
→ Add Doctors
→ Add Services
→ Add Patients
→ Book Appointment
→ Doctor Visit
→ Medical Record
→ Prescription
→ Billing
→ Optional: Send Prescription to Commerce Pharmacy
→ Reports
```

---

## 22. Integrations Hub

Integrations happen through:

```text
Core Platform → Integrations Hub
```

OS products must not directly own each other’s business logic.

### Commerce ↔ HR

```text
HR creates employee
→ Commerce links employee as cashier
→ Commerce sends sales performance
→ HR manages attendance/payroll
```

### Healthcare ↔ Commerce Pharmacy

```text
Doctor creates prescription
→ Prescription sent to Commerce Pharmacy
→ Pharmacy dispenses medicine
→ Commerce deducts stock
→ Commerce generates invoice
→ Healthcare marks prescription fulfilled
```

### Commerce ↔ CRM

```text
Commerce customer syncs to CRM contact
→ CRM can run campaigns and follow-ups
→ Commerce can show customer purchase history
```

### Gym ↔ CRM

```text
CRM lead converts to Gym member
→ Gym membership status syncs back to CRM
```

### Maintenance ↔ Commerce

```text
Repair ticket uses spare part
→ Commerce inventory deducts spare part
→ Invoice generated
```

### Gym ↔ HR

```text
Trainer is created in HR
→ Gym assigns trainer to classes
```

---

## 23. Localization

NexoraXS must support:

```text
Arabic + English
RTL + LTR
```

from day one.

Requirements:

- Arabic / English language switcher
- RTL for Arabic
- LTR for English
- All UI text must be translatable
- OS names must have Arabic and English labels
- Business presets must have Arabic and English labels
- Invoices and document templates must support Arabic and English
- POS must support RTL and LTR
- Tables must work in RTL and LTR
- Navigation must work in RTL and LTR
- Forms must work in RTL and LTR

No English-only UI assumptions are allowed.

---

## 24. Domain Rules

### Rule 1

Each OS is standalone and can be subscribed to independently.

### Rule 2

Core Platform is the shared control center, not an operational business app.

### Rule 3

Workspace represents the company or group.

### Rule 4

Business Unit represents an operational business inside the Workspace.

### Rule 5

Branch represents a physical operating location.

### Rule 6

Every operational record should be branch-aware when applicable.

### Rule 7

HR OS is standalone and may become the master employee system when integrated.

### Rule 8

Pharmacy belongs to Commerce OS, not Healthcare OS.

### Rule 9

Healthcare OS is for clinics, hospitals, patients, doctors, appointments, and medical records.

### Rule 10

Arabic/English and RTL/LTR support are required from day one.

### Rule 11

Commerce OS owns transactional customers. CRM OS owns leads, deals, campaigns, and relationship workflows.

### Rule 12

Simple repair intake may exist in Commerce. Full repair-center operations belong to Maintenance OS.

### Rule 13

Business Units must be architecture-ready from day one but may be hidden in the MVP behind a default Business Unit.

### Rule 14

Domain events are an architecture direction, not an MVP implementation requirement.

---

## 25. Recommended Monorepo Structure

```text
nexoraxs/
│
├── apps/
│   ├── web/
│   ├── core-platform/
│   ├── commerce-os/
│   ├── hr-os/
│   ├── gym-os/
│   ├── maintenance-os/
│   ├── crm-os/
│   └── healthcare-os/
│
├── backend/
│
├── packages/
│   ├── ui/
│   ├── config/
│   ├── types/
│   ├── i18n/
│   ├── auth/
│   ├── permissions/
│   ├── billing/
│   ├── workspace/
│   ├── branches/
│   ├── integrations/
│   └── documents/
│
├── docs/
│   ├── architecture/
│   ├── journeys/
│   ├── specs/
│   ├── decisions/
│   └── design-system/
│
├── infra/
└── docker-compose.local.yml
```

---

## 26. Technology Stack Direction

### Frontend

- Next.js
- React
- TailwindCSS
- Shared UI package
- i18n-ready from day one
- RTL/LTR-aware layouts

### Backend

- Laravel API
- Modular monolith architecture
- PostgreSQL
- Redis
- Laravel Sanctum
- Shared authentication across subdomains

### Infrastructure

- Docker
- PostgreSQL
- Redis
- Nginx / Traefik
- Cloudflare

---

## 27. Shared Authentication Across Subdomains

Applications may use independent subdomains.

Examples:

```text
app.nexoraxs.com
commerce.nexoraxs.com
hr.nexoraxs.com
gym.nexoraxs.com
maintenance.nexoraxs.com
crm.nexoraxs.com
healthcare.nexoraxs.com
admin.nexoraxs.com
```

Required session configuration:

```env
SESSION_DOMAIN=.nexoraxs.com
```

Sanctum stateful domains should include all active application subdomains.

---

## 28. Event Architecture Direction

Domain events are an architecture direction, not an MVP implementation requirement.

The MVP may use synchronous flows and audit-log-ready actions before introducing queues, event buses, background workers, or automation systems.

Future domain events may include:

- WorkspaceCreated
- BusinessUnitCreated
- BranchCreated
- OSSubscribed
- SubscriptionActivated
- UserInvited
- RoleAssigned
- IntegrationEnabled
- SaleCreated
- InvoiceGenerated
- InventoryAdjusted
- EmployeeCreated
- PrescriptionCreated
- RepairTicketCreated

Used for:

- Notifications
- Analytics
- Audit logs
- AI workflows
- Automation systems
- Integrations

---

## 29. UI/UX Direction

Design goals:

- Premium SaaS UI
- Modern and operational
- Minimal clutter
- Enterprise-ready
- Responsive
- Accessible
- Arabic/English-ready
- RTL/LTR-ready
- Shared design language across OS products
- Product-first architecture
- Not generic admin UI
- Not cluttered ERP UI

Inspired by:

- Stripe
- Linear
- Vercel
- Shopify Admin
- Square POS
- Deel
- Rippling

---

## 30. Execution Roadmap

The full architecture is defined from day one.

Execution order controls delivery.

### Phase 1 — Core Platform Foundation

#### MVP Visible

- Auth
- Arabic/English language foundation
- Workspace
- Default Business Unit created automatically
- Main Branch
- Product Hub with Commerce OS as primary product
- Future OS products shown as Coming Soon
- Core billing skeleton
- Users & permissions foundation

#### Architecture-Ready / Hidden

- Business Unit management UI
- Multi-Business Unit switching
- Full multi-OS subscription management
- Integrations Hub
- Advanced permissions

### Phase 2 — Commerce OS Foundation

#### MVP Visible

- Commerce subscription / trial state
- Commerce onboarding
- Business presets including Pharmacy
- Branch-aware setup with Main Branch
- Business identity
- Logo
- Tax settings
- Invoice numbering
- Document templates
- Products
- Categories
- Units
- Inventory

#### Architecture-Ready / Hidden

- Multi-branch transfers
- Advanced pharmacy inventory
- Supplier purchases
- Online Store module
- Delivery module
- Kitchen module
- Commerce Repairs module

### Phase 3 — Commerce POS + Invoices

- POS
- Cart
- Discounts
- Tax calculation
- Payment
- Receipt
- Invoice
- Branch inventory deduction
- Orders
- Reports

### Phase 4 — Core Billing + Multi-OS Subscriptions

- OS plan management
- Platform invoices
- VAT on NexoraXS invoices
- Discounts/coupons
- Multiple OS subscriptions per workspace

### Phase 5 — HR OS

- Employees
- Departments
- Branch assignment
- Attendance
- Leaves
- Payroll
- HR integrations foundation

### Phase 6 — Integrations Hub

- Commerce ↔ HR
- Commerce ↔ CRM
- Gym ↔ HR
- Healthcare ↔ Commerce Pharmacy
- Maintenance ↔ Commerce

### Phase 7 — Additional OS Products

- Gym OS
- CRM OS
- Maintenance OS
- Healthcare OS

Implementation order may change based on business demand, but the architecture rules must not change without a documented decision.

---

## 31. Current Development Constraints

### Do not:

- Break Docker setup
- Break auth/session flow
- Move business logic into Core Platform
- Treat branches as workspaces
- Treat Pharmacy as Healthcare OS
- Make HR dependent on Commerce
- Hardcode English-only UI
- Start microservices too early
- Over-engineer infrastructure before product validation
- Duplicate business logic across OS products
- Build integrations as direct domain coupling
- Build all future OS products during the Commerce MVP
- Expose complex Business Unit management before the MVP needs it
- Build event buses, queues, or automation before core flows are validated

---

## 32. Final Architecture Direction

NexoraXS should remain a modular monolith during early growth.

Recommended architecture:

```text
Core Platform
+
Independent OS Products
+
Shared Backend Infrastructure
+
Shared Packages
+
Optional Integrations
```

Not recommended early:

- Microservices
- Kubernetes
- Complex distributed systems
- ERP-style monolith
- Tight coupling between OS products

---


---

## 33. MVP Execution Boundary Summary

The platform vision is broad, but the immediate execution must remain narrow.

### Current MVP Scope

```text
Core Platform foundation
+
Commerce OS MVP
+
Arabic/English localization foundation
+
Business Identity / Tax / Documents
+
Products / Inventory
+
POS / Orders / Invoices / Reports
```

### Current MVP Exclusions

The following must remain Coming Soon or architecture-ready only:

- HR OS implementation
- Gym OS implementation
- CRM OS implementation
- Maintenance OS implementation
- Healthcare OS implementation
- Integrations Hub implementation
- Marketplace / plugin system
- Automation engine
- Event bus / queue-based workflows
- Advanced Business Unit management UI

### Recommended Immediate Specs

```text
Spec 038 — Platform Alignment & Localization
Spec 039 — Commerce Identity, Tax & Documents
Spec 040 — Products & Inventory Polish
Spec 041 — POS MVP
Spec 042 — Orders, Invoices & Reports
Spec 043 — Core Billing & OS Subscription States
Spec 044 — Frontend QA Before Backend
```

---

## 34. Version 5.1 Change Log

This revision adds:

- MVP Execution Boundary
- Business Unit-ready but hidden MVP rule
- Commerce Core / Presets / Future Modules separation
- Maintenance OS vs Commerce Repairs rule
- CRM OS vs Commerce Customers rule
- HR OS independence and master employee rule
- OS subscription states
- Localization data rule
- Event architecture marked as future direction, not MVP requirement
- Product Hub MVP display rule
- Updated execution roadmap with MVP Visible vs Architecture-Ready / Hidden sections

## 35. Conclusion

NexoraXS is a scalable multi-product SaaS Business Operating Platform.

It is built around:

- Core Platform
- Independent Operating Systems
- Workspace / Business Unit / Branch hierarchy
- Independent OS subscriptions
- Centralized users and permissions
- Branch-aware operational workflows
- Arabic/English localization
- Optional integrations
- Shared SaaS infrastructure

The platform is designed to support commerce, HR, gyms, maintenance centers, CRM, and healthcare while keeping each domain clean, independent, and scalable.

---

# v5.2 Final Architecture Addendum

## 1. Operating System Subscription & Access Model

Each NexoraXS Operating System is an independent product that can be subscribed to and used standalone.

Core Platform provides shared account, workspace, billing, localization, permissions foundation, notifications, audit logs, and integrations.

Operating Systems must not depend on each other to function. Integrations enhance workflows, but they must not unlock the basic functionality of another OS.

### Subscription Scope

OS subscriptions are owned at the Workspace level.

Example:

```text
Workspace: Mustafa Group
Subscriptions:
- Commerce OS / Pro / Active
- HR OS / Starter / Active
- Gym OS / Trial / Active
```

A subscribed OS can then be enabled for one or more Business Units and their Branches.

Example:

```text
Workspace: Mustafa Group
Commerce OS Subscription: Pro

Business Units using Commerce OS:
- Mustafa Pharmacy
- Mustafa Retail Store
```

Plan limits determine how many Business Units, Branches, Users, Employees, Orders, Members, or Records are allowed per OS.

### Access Scope

Users are invited at Workspace level, then granted scoped access:

```text
Workspace Role
+ OS Access
+ Business Unit Access
+ Branch Access
+ OS Role
```

Example:

```text
User: Ahmed
Workspace Role: Member
OS Access: Commerce OS
Business Unit: Mustafa Pharmacy
Branch: Smouha
Commerce Role: Cashier
```

---

## 2. Pricing Strategy

Core Platform is the shared foundation and is generally included with any active OS subscription.

Each OS has its own pricing plans.

### Commerce OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

### HR OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

### Gym OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

### Maintenance OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

### CRM OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

### Healthcare OS Plans

- Starter
- Pro
- Business
- Enterprise / Custom

Pricing may depend on:

- Number of Business Units
- Number of Branches
- Number of users
- Number of employees
- Number of members
- Number of orders / tickets / appointments
- Enabled modules
- Advanced permissions
- Storage
- API access
- Integrations
- Automation
- Support level

Bundles may be introduced later, such as:

```text
Commerce + HR
Gym + HR
Commerce + CRM
Full Business Suite
```

Bundles must be pricing packages only. They must not create hard dependencies between Operating Systems.

---

## 3. Plan Limits

Plan limits are part of the billing and authorization model. They must be enforced by Core Billing and respected by each OS.

### Example Commerce OS Limits

```text
Starter:
- 1 Business Unit
- 1 Branch
- 3 users
- POS
- Products
- Inventory
- Basic invoices
- Basic reports

Pro:
- Up to 3 Business Units
- Up to 3 Branches
- 10 users
- Multi-branch inventory
- Advanced reports
- Document templates

Business:
- Higher or custom limits
- Advanced permissions
- API access
- Integrations
- Automation-ready workflows
```

### Example HR OS Limits

```text
Starter:
- 1 Business Unit
- 1 Branch
- Up to 20 employees
- Employee profiles
- Basic attendance

Pro:
- Multi-branch
- Up to 100 employees
- Leave policies
- Shifts
- Reports

Business:
- Payroll
- Advanced approvals
- Integrations with other OS products
- Custom permissions
```

### Example Gym OS Limits

```text
Starter:
- 1 Branch
- Basic memberships
- Basic check-in

Pro:
- Multi-branch memberships
- Trainers
- Classes
- Renewals

Business:
- Advanced packages
- CRM integration
- HR integration
- Branch performance reports
```

The exact commercial numbers can change later, but the architecture must always support plan-based limits per OS.

---

## 4. User Invitation Flow

All users are invited from Core Platform.

```text
Owner
→ Core Platform
→ Team & Access
→ Invite User
→ Enter email
→ Select Workspace Role
→ Select OS Access
→ Select Business Unit Access
→ Select Branch Access
→ Select OS Role
→ Send Invitation
```

### User States

- Invited
- Pending verification
- Active
- Suspended
- Removed

### User vs Employee

A User is a person who can log in to NexoraXS.

An Employee is an HR OS employee profile.

A person may be:

```text
Core User only
HR Employee only
Core User + HR Employee
Core User + Commerce Cashier
Core User + Gym Trainer
Core User + HR Employee + Commerce Cashier + Gym Trainer
```

If HR OS is not subscribed, each OS may manage lightweight operational staff.

If HR OS is subscribed, HR OS may become the master employee system and other OS products may link operational roles to HR employee profiles.

---

## 5. Permission Scope Matrix

Permissions must be namespaced and scoped.

### Permission Scopes

```text
Workspace-level
OS-level
Business Unit-level
Branch-level
Record-level where required
```

### Examples

```text
core.billing.manage            → Workspace-level
core.team.manage               → Workspace-level
core.integrations.manage       → Workspace-level

commerce.pos.use               → Branch-level
commerce.products.manage       → Business Unit-level or Branch-level
commerce.inventory.adjust      → Branch-level
commerce.reports.view          → Branch-level, Business Unit-level, or Workspace-level
commerce.tax.manage            → Business Unit-level
commerce.templates.manage      → Business Unit-level

hr.employees.manage            → Business Unit-level or Workspace-level
hr.attendance.manage           → Branch-level
hr.payroll.manage              → Workspace-level or Business Unit-level

crm.leads.manage               → Business Unit-level or Branch-level
gym.members.checkin            → Branch-level
maintenance.tickets.manage     → Branch-level
healthcare.patients.view       → Branch-level or facility-level
```

A user must never gain access to a branch, OS, or Business Unit only because they exist in the Workspace.

Explicit scoped access is required unless the user is Owner.

---

## 6. Integration Data Ownership

Integrations must define data ownership before implementation.

### HR OS ↔ Commerce OS

```text
HR OS owns: employee profile, salary, attendance, leaves, payroll.
Commerce OS owns: cashier role, POS permissions, sales activity.
```

### HR OS ↔ Gym OS

```text
HR OS owns: employee profile, contracts, payroll.
Gym OS owns: trainer schedule, classes, member sessions.
```

### Commerce OS ↔ CRM OS

```text
Commerce OS owns: orders, invoices, purchase history.
CRM OS owns: leads, deals, campaigns, follow-ups, customer relationship timeline.
```

### Gym OS ↔ CRM OS

```text
Gym OS owns: members, memberships, check-ins.
CRM OS owns: leads, campaigns, follow-up pipelines.
```

### Healthcare OS ↔ Commerce OS / Pharmacy

```text
Healthcare OS owns: patient, doctor, appointment, medical record, prescription.
Commerce OS owns: pharmacy products, inventory, sale, payment, invoice, tax.
```

### Maintenance OS ↔ Commerce OS

```text
Maintenance OS owns: repair ticket, technician workflow, device intake, warranty workflow.
Commerce OS owns: spare parts inventory, product stock, commercial invoice if used.
```

No integration may duplicate another OS domain ownership.

---

## 7. No Cross-OS Hard Dependency Rule

No OS may require another OS to complete its core workflow.

Examples:

- Commerce OS can create a cashier without HR OS.
- Gym OS can create a trainer without HR OS.
- Maintenance OS can create a technician without HR OS.
- CRM OS can create a contact without Commerce OS.
- Healthcare OS can create a prescription without Commerce OS.
- Commerce Pharmacy can sell medicine without Healthcare OS.

Integrations must enhance workflows, not become mandatory dependencies.

---

## 8. Document Templates as a Platform Pattern

Document templates are not limited to Commerce OS.

Each OS may define its own document templates when operationally required.

### Commerce OS Documents

- POS Receipt
- Tax Invoice
- Simplified Tax Invoice
- Refund Receipt
- Credit Note
- Delivery Note
- Packing Slip
- Quotation

### HR OS Documents

- Employment Contract
- Payslip
- Leave Approval
- Warning Letter
- Employee Letter
- Attendance Report

### Gym OS Documents

- Membership Contract
- Renewal Receipt
- Waiver
- Class Attendance Sheet

### Maintenance OS Documents

- Repair Job Card
- Device Intake Receipt
- Warranty Certificate
- Handover Receipt
- Repair Invoice

### Healthcare OS Documents

- Prescription
- Medical Report
- Visit Summary
- Appointment Receipt
- Insurance Claim Document

Document rendering must support Arabic and English, RTL and LTR, business identity, logo, branch details, numbering, and template-specific fields.

---

## 9. Audit Logs

Audit logs are required platform-wide.

Core Platform must record critical actions across the Workspace and OS products.

### Core Audit Events

- User invited
- User removed
- Role changed
- Branch access changed
- OS subscription activated
- OS subscription cancelled
- Billing details changed
- Integration enabled
- Integration disabled

### Commerce Audit Events

- Product created
- Product price changed
- Inventory adjusted
- Sale completed
- Invoice cancelled
- Refund created
- Tax setting changed
- Document template changed

### HR Audit Events

- Employee created
- Salary changed
- Attendance edited
- Leave approved
- Payroll approved

### Gym Audit Events

- Member created
- Membership renewed
- Check-in recorded
- Trainer assigned

### Maintenance Audit Events

- Ticket created
- Ticket assigned
- Status changed
- Warranty issued

### Healthcare Audit Events

- Patient record accessed
- Appointment changed
- Prescription created
- Medical note updated

Audit logs must be Workspace-aware, OS-aware, user-aware, and timestamped.

---

## 10. Notifications Model

Notifications are a Core Platform pattern used by all OS products.

### Core Notifications

- Invitation received
- Subscription expiring
- Payment failed
- Invoice issued
- Integration failed
- Permission changed

### Commerce Notifications

- Low stock
- Out of stock
- Sale completed
- Refund created
- Tax report ready
- Branch transfer completed

### HR Notifications

- Leave request submitted
- Leave approved / rejected
- Payroll ready
- Attendance issue
- Contract expiring

### Gym Notifications

- Membership expiring
- Class reminder
- Trainer schedule changed
- Failed renewal payment

### Maintenance Notifications

- Ticket assigned
- Ticket status changed
- Repair completed
- Warranty expiring

### CRM Notifications

- Lead assigned
- Follow-up due
- Deal moved stage
- Campaign completed

### Healthcare Notifications

- Appointment reminder
- Prescription issued
- Lab result ready
- Insurance approval update

Notifications must support Arabic and English.

---

## 11. Product Vision Status vs Execution Status

All OS products exist in the product vision, but their execution status may differ.

### Product Vision Status

Defines whether an OS belongs to the NexoraXS long-term platform vision.

### Execution Status

Defines whether it is currently available to users.

Allowed execution statuses:

```text
available
in_development
planned
locked
not_started
```

UI labels may display “Coming Soon”, “Subscribe”, “Start Trial”, “Active”, or “Locked”, but architecture should use explicit execution statuses.

---

## 12. Final Guardrails

- Core Platform owns accounts, workspaces, billing, language, shared permissions foundation, notifications, audit logs, and integrations.
- Each OS owns its own domain workflows and data.
- Each OS must be independently subscribable and independently usable.
- Business Units represent business activities inside a Workspace.
- Branches represent operating locations and must be first-class entities.
- Every operational transaction must be branch-aware when applicable.
- Pharmacy belongs to Commerce OS, not Healthcare OS.
- Healthcare OS is for clinics, hospitals, patients, appointments, and medical records.
- HR OS is standalone and may become the master employee system only when subscribed and integrated.
- Arabic and English support must be planned from day one across UI, documents, invoices, reports, and notifications.
- Integrations must be optional and must preserve domain ownership.
- No OS may duplicate another OS core domain.


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
