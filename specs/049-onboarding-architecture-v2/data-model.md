# Data Model: Onboarding Architecture v2

## User

Represents the authenticated person creating or operating a Workspace.

**Key fields**
- `id`
- `name`
- `email`
- `languagePreference`

**Relationships**
- May own or belong to one or more Workspaces through Workspace membership.

## Workspace

Represents a company or group.

**Key fields**
- `id`
- `name`
- `country`
- `currency`
- `timezone`
- `language`

**Owns**
- Members
- Billing
- Storage
- BusinessUnits
- OSSubscriptions
- OSEnablements

**Validation rules**
- Workspace Name is required.
- Country is required.
- Currency and Timezone default from Country but remain editable.
- Workspace must not be typed by business activity or OS.

## BusinessUnit

Internal entity displayed to users as Business.

**Key fields**
- `id`
- `workspaceId`
- `name`
- `industryType` or Business Activity
- `status`

**Relationships**
- Belongs to one Workspace.
- Owns one or more Branches.
- Owns CommerceSetup when Commerce OS is enabled for the Business.
- May have one or more OSEnablements.

**Validation rules**
- Business Name is required.
- Business Activity is required for recommendations.
- Business Activity must not force or auto-enable an OS.
- UI must display Business, not BusinessUnit, Business Unit, BU, or Default Business Unit.
- A Business is not operationally active until it has one Main Branch.

## Branch

Represents an operational location under one Business.

**Key fields**
- `id`
- `workspaceId`
- `businessUnitId`
- `name`
- `city`
- `address`
- `isMain`

**Owns**
- Operational Address
- POS operational scope
- Inventory operational scope
- Orders operational scope
- Invoices operational scope
- Reports operational scope
- Transfers operational scope
- Returns operational scope

**Validation rules**
- Branch belongs to exactly one BusinessUnit.
- One Main Branch is required before the Business becomes operationally active.
- Same Branch name may exist under different Businesses.
- Branch Address is operational and distinct from Billing Address.

## OperatingSystem

Represents an independent software product.

**Known values**
- Commerce OS
- HR OS
- CRM OS
- Healthcare OS
- Gym OS
- Maintenance OS

**Relationships**
- Has independent plans.
- Has independent setup experience.
- Has independent dashboard and workflows.

## OSSubscription

Workspace-level license and billing record for an Operating System.

**Key fields**
- `id`
- `workspaceId`
- `osId`
- `planId`
- `status`
- `trial`
- `renewal`
- `billing`

**Relationships**
- Belongs to one Workspace.
- References one Operating System.
- May support multiple OSEnablements for different Businesses or scopes.

**Validation rules**
- Created when the user chooses a plan.
- Does not decide where the OS runs.
- Existing Workspace + OS subscription is reused for another Business unless the user explicitly changes plan.

## OSEnablement

Operational activation of an Operating System.

**Key fields**
- `id`
- `workspaceId`
- `osId`
- `osSubscriptionId`
- `scope`
- `businessUnitId`
- `branchIds`
- `status`

**Scopes**
- `workspace`
- `business`
- `branch`

**Relationships**
- Belongs to one Workspace.
- References one OSSubscription.
- May reference a BusinessUnit when scope is Business or Branch.
- May reference Branch IDs when scope is Branch or when a business-scoped OS needs branch availability.

**Validation rules**
- Created when OS setup or activation is launched.
- Commerce normally uses Business scope.
- HR may use Workspace scope.
- CRM may use Workspace or Business scope.
- Status must distinguish setup required, active, disabled, and locked or unavailable states as applicable.

## CommerceSetup

Business-owned Commerce OS configuration.

**Key fields**
- `id`
- `workspaceId`
- `businessUnitId`
- `osSubscriptionId`
- `displayName`
- `legalName`
- `logo`
- `phone`
- `email`
- `website`
- `billingAddress`
- `billingCity`
- `billingCountry`
- `commercialRegistration`
- `taxRegistration`
- `commercePreset`
- `sellingMode`
- `vatRegistered`
- `vatNumber`
- `vatRate`
- `pricesIncludeVat`
- `invoiceTemplate`
- `receiptTemplate`
- `invoiceNumbering`
- `barcodeRules`
- `categories`
- `units`

**Relationships**
- Belongs to one BusinessUnit.
- References the Workspace and OSSubscription.
- Applies across Branches within that Business unless future branch-level overrides are explicitly introduced.

**Validation rules**
- Must not belong to Branch.
- Billing Address is legal identity and remains distinct from Branch Address.
- Commerce Preset is suggested from Business Activity and may be overridden.
- Confirmed preset generates defaults for categories, units, templates, numbering, reports, and barcode rules.

## State Transitions

### Core onboarding

```text
Unauthenticated
-> Authenticated
-> Language selected
-> Workspace created
-> Business created
-> Product Hub ready
```

### Commerce launch

```text
OS available
-> Plan chosen
-> OSSubscription created or reused
-> OSEnablement created for Business
-> Commerce setup required
-> Commerce setup complete
-> Commerce dashboard active
```

### Business operational state

```text
Business created
-> Main Branch missing
-> Main Branch created or selected
-> Business operationally active
```
