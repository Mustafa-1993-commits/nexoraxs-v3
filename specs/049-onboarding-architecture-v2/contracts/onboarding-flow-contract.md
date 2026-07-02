# Contract: Onboarding Architecture v2 Flow

This contract defines the expected user-visible flow and state handoffs for Spec 049. It is intentionally UI/data-contract oriented and does not require backend API work.

## 1. Core Onboarding Contract

### Entry

User has registered or logged in.

### Steps

```text
Welcome + Language
-> Create Workspace
-> Create Business
-> Product Hub
```

### Welcome + Language output

- `language`
- `direction`
- `dateFormat`
- `numberFormat`

### Create Workspace output

- `workspaceId`
- `workspaceName`
- `country`
- `currency`
- `timezone`

### Create Business output

- `businessUnitId`
- `businessName`
- `businessActivity`
- `workspaceId`

### Rules

- Core onboarding must not ask for Commerce Preset, tax configuration, templates, products, inventory, POS, orders, invoices, or reports.
- Business Activity is recommendation input only.
- UI labels must use Business.

## 2. Product Hub Contract

### Required context

- Active `workspaceId`
- Active `businessUnitId` for OS launch

### Displays

- Workspace summary
- Businesses
- Operating Systems
- OS subscription status
- OS enablement/setup status
- Quick actions:
  - Add Business
  - Add Branch
  - Enable OS
  - Invite Members
  - Launch Operating System

### Product Hub status meanings

- `available`: OS can be selected but no subscription exists.
- `subscribed`: Workspace has an OSSubscription.
- `setup_required`: Business has or needs OSEnablement and OS setup is incomplete.
- `active`: OS is enabled and setup is complete for the active scope.
- `coming_soon`: OS is known but not launchable in the current MVP.
- `locked`: OS is unavailable due to plan or permission limits.

### Rules

- Product Hub may display recommendations and statuses.
- Product Hub must not contain Commerce setup steps or Commerce business logic.
- Launching an OS transfers context to that OS setup experience.

## 3. OS Subscription Contract

### Created when

User chooses a plan for an Operating System.

### Required fields

- `workspaceId`
- `osId`
- `planId`
- `status`
- `trial`
- `renewal`
- `billing`

### Rules

- OSSubscription is Workspace-level.
- OSSubscription does not determine Business or Branch activation.
- For the same Workspace and OS, launching another Business reuses the existing subscription unless the user explicitly changes plan.

## 4. OS Enablement Contract

### Created when

User launches setup or activation for an OS in a selected scope.

### Required fields

- `workspaceId`
- `osId`
- `osSubscriptionId`
- `scope`
- `businessUnitId`
- `branchIds`
- `status`

### Scope rules

- Commerce OS normally uses Business scope.
- HR OS may use Workspace scope.
- CRM OS may use Workspace or Business scope.
- Future Operating Systems may define their own allowed scopes while preserving this relationship.

### Relationship

```text
Workspace
-> Business
-> OSSubscription
-> OSEnablement
-> Status
```

## 5. Commerce OS Setup Contract

### Entry context

- `workspaceId`
- `businessUnitId`
- `osSubscriptionId`
- `osEnablementId`
- `branchId` when available

### Steps

```text
Choose Plan
-> Business Identity
-> Commerce Preset
-> Branch + Tax
-> Review & Launch
-> Auto Configuration
-> Commerce Dashboard
```

### Business Identity input

Inherited:
- Business Name
- Business Activity

Editable:
- Display Name
- Legal Name
- Logo
- Phone
- Email
- Website
- Billing Address
- Billing City
- Billing Country
- Commercial Registration
- Tax Registration

### Commerce Preset input

- Suggested preset from Business Activity
- User-confirmed preset, either suggested or overridden

### Branch + Tax input

- Main Branch create/select
- Branch Name
- Branch City
- Branch Address
- VAT Registered
- VAT Number
- VAT Rate
- Prices Include VAT

### Review & Launch output

Review must show:
- Workspace
- Business
- Branch
- Plan
- Preset
- Selling Mode
- Tax
- Templates
- Numbering

### Auto Configuration output

Creates or confirms:
- Categories
- Units
- Invoice Template
- Receipt Template
- Invoice Numbering
- Barcode Rules
- Optional Sample Products

## 6. Address Ownership Contract

### Workspace

Owns:
- Country
- Currency
- Timezone

### Business / CommerceSetup

Owns:
- Billing Address
- Billing City
- Billing Country
- Legal identity fields

### Branch

Owns:
- Operational Address
- City

### Rules

- Billing Address and Branch Address are distinct values.
- Defaults may be copied from Workspace or Branch, but user edits must be preserved.

## 7. Migration Contract

### Preserve

- Existing Users
- Existing Workspaces
- Existing BusinessUnits
- Existing Branches
- Existing CommerceSetups
- Existing OSSubscriptions
- Existing OSEnablements
- Existing Branch operational data

### Reinterpret

- BusinessUnit is displayed as Business.
- CommerceSetup is explicitly Business-owned.
- Product Hub status combines OSSubscription, OSEnablement, and setup completion.

### Validate

- Record counts remain stable unless new records are intentionally created.
- Every Branch belongs to one BusinessUnit.
- Every CommerceSetup belongs to one BusinessUnit.
- Every OSEnablement references a Workspace, OS, subscription, scope, and status.
