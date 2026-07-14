# Business-Level Commerce Setup + Address Separation + Business Resources

Related spec: `specs/048-business-commerce-setup-addresses`

## Dependency on Spec 047
Spec 047 is the source of truth for Target Architecture v2.0.

Spec 048 does not redefine the core architecture. It applies selected Spec 047 decisions into the current MVP safely.

## Core model

```text
Workspace
→ Business
→ Branch
→ OSSubscription
→ OSEnablement
→ OS-specific setup
```

Current code may still use `BusinessUnit`. Product language should treat it as Business.

```text
BusinessUnit in code = Business in product language
```

User-facing UI should avoid:
- Business Unit
- Default Business Unit
- BU

Use:
- Business
- Store
- Activity
- Branch
- Location

## Ownership model

Workspace owns:
- Users / Members
- Workspace-level roles
- Businesses
- OS Subscriptions
- Billing
- Storage quota
- Global settings
- Workspace-level resources

Business owns:
- Business Identity
- Business Billing
- Business Settings
- Business Resources
- Industry Type
- Commerce Setup if Commerce OS is enabled
- Branches
- Business Employees
- Business Warehouses future

Branch owns:
- Physical location
- Operational address
- POS activity
- Sales/orders
- Inventory/stock
- Branch operational overrides future

OSSubscription owns:
- Purchased license
- Plan
- Billing/trial/renewal status

OSEnablement owns:
- Where an OS is actually used
- Scope: workspace, business, or branch
- Enabled/disabled/locked status
- Link between purchased subscription and actual usage target

## OSEnablement
OSEnablement is the bridge between a purchased OSSubscription and the place where the OS is actually used.

```text
OSSubscription
→ OSEnablement
→ Business / Workspace / Branch
```

Examples:

```text
Workspace: Mustafa Group
OSSubscription: Commerce OS Pro
OSEnablement: Commerce OS enabled for Mustafa Fashion, scope business
```

```text
Workspace: Mustafa Group
OSSubscription: HR OS Starter
OSEnablement: HR enabled at workspace scope
```

Rules:
- OSSubscription does not imply every Business can use the OS.
- OSEnablement decides where the OS is active.
- Commerce MVP uses current business context, but should remain compatible with OSEnablement.

## CommerceSetup belongs to Business
CommerceSetup configures a Business for Commerce OS.

Correct:

```text
Workspace
→ Business
   ├── CommerceSetup
   └── Branches
```

Wrong:

```text
Workspace
→ Business
   → Branch
      → CommerceSetup
```

Reason: a Business can have multiple branches that share the same main Commerce configuration, such as identity, tax, templates, numbering defaults, categories, units, Commerce Preset, and brand resources.

Branches may later have small operational overrides, but the main CommerceSetup remains business-level.

## Address separation
There are three separate address concepts.

### Workspace Address
Company/group-level address for the platform account, future workspace legal metadata, and billing owner profile.

### Business Billing Address
Legal/billing/invoice address for a specific Business. This is used on invoices, receipts, tax documents, and legal documents.

Business Billing Address belongs to Business-level identity / CommerceSetup.

### Branch Address
Physical operational address of a branch. This is used for POS location, inventory location, pickup/delivery, and branch context.

Branch Address belongs to Branch.

## Billing Address vs Branch Address
Billing Address is not Branch Address.

Example:

```text
Workspace: Mustafa Group
Business: Mustafa Fashion
Business Billing Address: Nasr City, Cairo, Egypt
Branch: Nasr City Branch
Branch Address: Makram Ebeid Street, Nasr City, Cairo
```

Receipt/invoice documents should prefer Business Billing Address for legal address.

POS and branch context should use Branch name/address where relevant.

If billing address is missing, the MVP may gracefully fallback to legacy CommerceSetup `address/city/country` fields.

## Industry Type vs Commerce Preset
Industry Type belongs to Business.

It answers:

```text
What is your business?
```

Examples:
- Fashion
- Pharmacy
- Restaurant
- Electronics
- Supermarket
- Services
- Manufacturing
- Custom

Commerce Preset belongs only to Commerce OS configuration.

It answers:

```text
How should Commerce OS work?
```

Examples:
- Fashion Retail
- Pharmacy
- Restaurant POS
- Supermarket
- Electronics
- Generic Retail

Important: Industry Type is not Commerce Preset.

A Business can be Pharmacy industry but use Generic Retail as Commerce Preset if the user chooses that.

## Preset suggestion flow
Correct flow:

```text
Business Industry Type
→ Suggest Commerce Preset
→ User confirms or changes
→ Apply selected Commerce Preset
```

Rules:
- Do not directly apply Commerce Preset just because the user selected Industry Type.
- Do not overwrite manual Commerce Preset selection after the user changes it.
- Preset suggestions are helpful, not mandatory.
- Preset defaults apply only after confirmation.

## Business Resources
Business Resources is the expandable business-level resource concept.

It may include:
- Media Assets
- Documents
- Templates
- Certificates
- Brand Assets
- Brand Fonts future
- Brand Colors future
- Email/SMS/WhatsApp Templates future
- Online Store banners future
- Document branding assets future

MVP mapping:

```text
Business Resources = MediaAsset records scoped by businessUnitId
```

Business Resources consume Workspace storage quota.

Business logo is a Business Resource.
Product images are Product Resources scoped to Business and optionally Branch.
Invoice/receipt branding should reference Business Resources, not copy image payloads.

## Business Settings
Business Settings are business-level settings that are not Commerce-specific and not Branch-specific.

Examples:
- Business timezone override
- Business currency override
- Business locale
- Fiscal year
- Working days
- Default language

Business Settings are separate from:
- Workspace Settings
- Commerce Setup
- Branch Settings

## Workspace Employees vs Business Employees
Workspace-level employees belong to the group/company level.

Examples:
- CEO
- Finance
- Legal
- HR
- Group Admin
- Workspace Owner

Business-level employees belong to a specific Business.

Examples:
- Store Manager
- Cashier
- Pharmacist
- Salesperson
- Inventory Staff
- Branch Supervisor

Commerce MVP only needs currentUser/cashier identity for POS. Full employee management belongs to future HR scope.

## Business Warehouses
Business Warehouses are future business-level inventory locations.

Example:

```text
Business: Mustafa Fashion
- Warehouse: Main Warehouse
- Branch: Nasr City
- Branch: New Cairo
```

Warehouses belong to Business, not Workspace directly. They may later supply multiple branches under the same Business.

MVP inventory can remain branch/product-based.

## Future BranchCommerceSettings
BranchCommerceSettings may later provide branch-level operational overrides.

Examples:
- receipt footer override
- default warehouse
- default printer size
- tax registration override

This is future-ready only. The MVP must not move CommerceSetup under Branch.

## MVP safety rules
- Keep current Core Platform + Commerce MVP working.
- Keep mock-db/local/session storage behavior.
- No runtime imports from `docs/claude.aidesign`.
- No direct localStorage/sessionStorage in pages/components.
- No risky global rename from BusinessUnit to Business.
- No backend work.
- No UI redesign beyond safe labels/field alignment.
