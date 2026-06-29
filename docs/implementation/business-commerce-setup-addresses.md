# Business-Level Commerce Setup, Addresses, and Business Resources

Spec 048 applies selected Target Architecture v2.0 decisions from Spec 047 to the current Core Platform + Commerce MVP. Spec 047 remains the architecture source of truth; this document explains the current MVP mapping and safe implementation boundaries.

## Ownership Model

Workspace owns global platform resources:

- Users and workspace members
- Workspace-level roles
- Workspace-level employees such as owner, CEO, finance, legal, HR, and group admin
- Businesses
- OS subscriptions
- Billing
- Storage quota
- Global defaults such as country, currency, timezone, and language

Business owns business-level configuration:

- Business identity
- Business billing profile
- Business billing address
- Business settings
- Business resources
- Industry type
- Commerce setup when Commerce OS is enabled
- Branches
- Future business employees
- Future business warehouses

Branch owns operational execution:

- Physical operating location
- Branch address
- POS activity
- Sales and orders context
- Inventory and stock context
- Future branch-specific operational overrides

## Current Code Mapping

`BusinessUnit` in code is the current internal model for Business in product language.

This is intentional for Spec 048. A global rename from `BusinessUnit` to `Business` would touch too much surface area and is not required for this alignment. User-facing copy should say Business, Store, Activity, Branch, or Location.

## Commerce Setup Belongs To Business

CommerceSetup is scoped by:

```text
workspaceId + businessUnitId
```

It is not owned by Branch.

CommerceSetup configures the Business for Commerce OS:

- Display name
- Legal business name
- Phone and email
- Billing address
- Logo / business resource reference
- Commerce preset
- Selling mode
- Tax configuration
- Invoice and receipt numbering
- Document templates
- Categories and units

Branches may later have `BranchCommerceSettings` for operational overrides, but the primary CommerceSetup remains Business-level.

## Address Separation

The MVP separates three address concepts.

### Workspace Address

Workspace Address is company/group account metadata. The current MVP stores workspace country, currency, timezone, and language. Future workspace address fields can be added without treating Workspace Address as Business Billing Address.

### Business Billing Address

Business Billing Address is the legal/business address for Commerce documents:

- Receipts
- Invoices
- Tax invoices
- Reports
- Customer documents

Current compatibility fields:

```text
CommerceSetup.address
CommerceSetup.city
CommerceSetup.country
```

These fields are retained for old mock data and currently mean Billing Address. Optional explicit fields are supported for future-safe usage:

```text
billingAddressLine1
billingAddressLine2
billingCity
billingCountry
billingPostalCode
```

### Branch Address

Branch Address is the operational physical location:

- POS location
- Inventory location
- Pickup/delivery context later
- Branch-specific receipt context when needed

Branch Address is not Business Billing Address.

## Industry Type Vs Commerce Preset

Industry Type belongs to Business. It answers:

```text
What is this business?
```

Commerce Preset belongs to CommerceSetup. It answers:

```text
How should Commerce OS be configured?
```

The MVP keeps these values separate. Industry Type suggests a Commerce Preset, but the user can confirm or change the preset before it is applied.

Suggested mapping:

```text
pharmacy -> pharmacy
fashion / clothing -> clothing_fashion
retail -> retail_store
supermarket -> supermarket
restaurant -> restaurant_cafe
electronics -> electronics_mobile
cosmetics -> cosmetics
medical_supplies -> medical_supplies
other -> retail_store
```

Preset flow:

```text
Business Industry Type
-> Suggest Commerce Preset
-> User confirms or changes
-> Apply selected Commerce Preset defaults
```

Preset defaults may update Commerce categories, units, templates, numbering, and recommendations. They must not overwrite user-confirmed values without a new confirmation.

## OSEnablement

OSSubscription is the purchased Workspace license.

OSEnablement is the bridge that decides where the purchased OS is used:

```text
OSSubscription -> OSEnablement -> Workspace / Business / Branch
```

Commerce MVP prefers business-scoped enablement:

```text
Workspace: Mustafa Group
OSSubscription: Commerce OS Pro
Business: Mustafa Pharmacy
OSEnablement: Commerce enabled for Mustafa Pharmacy
```

Old mock data can still work through `currentBusinessUnitId` when an enablement record is missing. That is a compatibility fallback, not the target ownership model.

## Business Resources

Business Resources is the expandable Business-owned resource concept. It is broader than Business Assets.

Examples:

- Business logo
- Business cover
- Brand image
- Certificates
- Store banners
- Document assets
- Future brand fonts
- Future brand colors
- Future email, SMS, and WhatsApp templates

MVP mapping:

```text
Business Resources = MediaAsset records scoped to workspaceId + businessUnitId
```

Media resources consume Workspace storage quota. Logo and image payloads should be referenced by media asset ID, URL, or thumbnail URL and must not be duplicated into products, orders, invoices, or document records.

Product images remain product resources scoped to Business and optionally Branch.

## Business Settings

Business Settings are separate from Workspace settings, CommerceSetup, and Branch settings.

Future Business Settings may include:

- Business timezone override
- Business currency override
- Locale
- Fiscal year
- Working days
- Default language

Spec 048 documents the concept but does not require a full Business Settings UI.

## Employees

Workspace Employees and Business Employees are not the same concept.

Workspace-level employees are group/company-level roles:

- Owner
- CEO
- Finance
- Legal
- HR
- Group admin

Business-level employees are operational staff:

- Store manager
- Cashier
- Pharmacist
- Salesperson
- Inventory staff
- Branch supervisor

The current MVP keeps users/team members at Workspace level. Commerce POS cashier identity continues to derive from the current user. Full employee management belongs to a future HR/business employee spec.

## Business Warehouses

Business Warehouses are future Business-level inventory locations.

Example:

```text
Business: Mustafa Fashion
Warehouse: Main Warehouse
Branches: Nasr City, New Cairo
```

Warehouses belong to Business, not directly to Workspace. A warehouse may later supply multiple Branches under the same Business. Spec 048 does not introduce warehouse UI or change current branch/product inventory behavior.

## Future BranchCommerceSettings

Future branch-level operational overrides may live in `BranchCommerceSettings`, for example:

- Receipt footer override
- Default warehouse
- Default printer size
- Branch-specific tax registration override

This future entity does not move the primary CommerceSetup under Branch.

## MVP Guardrails

- No backend APIs.
- No Laravel work.
- No microservices.
- No storage wipe.
- No runtime imports from `docs/claude.aidesign`.
- No global `BusinessUnit` rename.
- No full HR employee, warehouse, Business Settings, or BranchCommerceSettings UI in this spec.
