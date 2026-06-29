# Data Model: Business-Level Commerce Setup, Address Separation, and Business Resources

## Workspace

**Purpose**: Company/group tenant and owner of global platform resources.

**Fields relevant to Spec 048**:
- `id`
- `name`
- `country`
- `currency`
- `timezone`
- `language`
- Optional future Workspace Address fields:
  - `workspaceAddressLine1`
  - `workspaceAddressLine2`
  - `workspaceCity`
  - `workspaceCountry`
  - `workspacePostalCode`

**Relationships**:
- Owns Users/Members
- Owns Businesses/BusinessUnits
- Owns OSSubscriptions
- Owns storage quota and storage usage

**Validation rules**:
- Workspace remains generic and must not become typed by industry or OS.
- Workspace address is not Business Billing Address and not Branch Address.

## Business / BusinessUnit

**Purpose**: Business line, brand, activity, or store under a Workspace. Current code may continue using `BusinessUnit` internally.

**Fields relevant to Spec 048**:
- `id`
- `workspaceId` / `workspace_id`
- `name`
- `industryType`
- `presetId` / `preset` only as legacy compatibility; not canonical Industry Type
- `osSubscriptionId` optional/legacy
- `createdAt`
- `updatedAt`

**Relationships**:
- Belongs to Workspace
- Owns Branches
- Owns Business Billing/Identity through CommerceSetup when Commerce OS is enabled
- Owns Business Resources through Business-scoped MediaAsset records
- May have OSEnablement records
- Future owner of Business Settings, Business Employees, and Business Warehouses

**Validation rules**:
- UI copy must say Business, Store, or Activity, not BusinessUnit/BU/Default Business Unit.
- `industryType` classifies the Business and must not be treated as Commerce Preset.

## Branch

**Purpose**: Physical operating location under a Business.

**Fields relevant to Spec 048**:
- `id`
- `workspaceId` / `workspace_id`
- `businessUnitId` / `business_unit_id`
- `name`
- `city` / future `branchCity`
- `address` / future `branchAddressLine1`
- `country` / future `branchCountry`
- `postalCode`
- `isMain`
- `createdAt`
- `updatedAt`

**Relationships**:
- Belongs to Workspace
- Belongs to Business/BusinessUnit
- Provides POS, sales/order, inventory, and branch operational context

**Validation rules**:
- Branch always belongs to Business/BusinessUnit.
- Branch Address is operational and must not be treated as the Business Billing Address.
- Branch name uniqueness is scoped to Business when multi-branch support applies.

## OSSubscription

**Purpose**: Workspace-owned purchased license and plan/billing status.

**Fields relevant to Spec 048**:
- `id`
- `workspaceId`
- `osId`
- `planId`
- `status`

**Relationships**:
- Belongs to Workspace
- Referenced by OSEnablement

**Validation rules**:
- OSSubscription does not imply every Business can use the OS.
- Plan and billing status remain Core Platform concerns.

## OSEnablement

**Purpose**: Bridge from a purchased OSSubscription to the actual usage target.

**Fields**:
- `id`
- `workspaceId`
- `osId`
- `osSubscriptionId`
- `scope`: `workspace` | `business` | `branch`
- `businessUnitId` optional/null
- `branchIds` optional
- `status`: `active` | `disabled` | `locked`
- `createdAt`
- `updatedAt`

**Relationships**:
- Belongs to Workspace
- References OSSubscription
- Targets Workspace, Business/BusinessUnit, or Branch scope

**Validation rules**:
- Commerce MVP uses business scope for the active Business where available.
- Workspace-wide OS products may use workspace scope.
- Branch scope may list branches but must still include workspace tenant isolation.

## CommerceSetup

**Purpose**: Business-level Commerce OS configuration.

**Fields relevant to Spec 048**:
- `id`
- `workspaceId`
- `businessUnitId`
- `osSubscriptionId`
- `displayName`
- `legalName`
- `phone`
- `email`
- Current compatibility billing fields:
  - `address`
  - `city`
  - `country`
- Optional explicit billing fields:
  - `billingAddressLine1`
  - `billingAddressLine2`
  - `billingCity`
  - `billingCountry`
  - `billingPostalCode`
- `logo` / future `logoMediaAssetId`
- `presetId`
- `businessType` / `preset` legacy compatibility fields
- `mode`
- `vatRegistered`
- `vatRate`
- `pricesIncludeTax`
- `taxLabel`
- `taxNumber`
- `invoicePrefix`
- `receiptPrefix`
- `invoiceStart`
- `receiptStart`
- `receiptSize`
- `receiptStyle`
- `invoiceTemplate`
- `categories`
- `units`
- `createdAt`
- `updatedAt`

**Relationships**:
- Belongs to Workspace
- Belongs to Business/BusinessUnit
- References OSSubscription where available
- May reference Business Resources via media asset IDs in future

**Validation rules**:
- CommerceSetup belongs to Business, not Branch.
- Generic `address`, `city`, `country` fields currently represent Business Billing Address fallback semantics.
- Commerce Preset controls Commerce defaults only after confirmation.
- Branch-specific overrides belong to future BranchCommerceSettings.

## Industry Type

**Purpose**: Business classification.

**Examples**:
- Pharmacy
- Fashion
- Restaurant
- Electronics
- Supermarket
- Services
- Manufacturing
- Custom

**Validation rules**:
- Stored on Business/BusinessUnit as `industryType`.
- Used to suggest Commerce Preset.
- Must not overwrite a manually confirmed Commerce Preset.

## Commerce Preset

**Purpose**: Commerce OS setup style that applies operational defaults.

**Examples**:
- Pharmacy
- Fashion Retail
- Restaurant POS
- Supermarket
- Electronics
- Generic Retail

**State flow**:
1. Suggested from Business `industryType`
2. User confirms or changes the suggestion
3. Confirmed preset applies categories, units, templates, numbering, and recommendations

**Validation rules**:
- Belongs to CommerceSetup, not Business.
- May differ from Industry Type.

## MediaAsset / Business Resources

**Purpose**: Current MVP resource record and future Business Resources mapping.

**Fields relevant to Spec 048**:
- `id`
- `workspaceId`
- `businessUnitId`
- `branchId`
- `ownerType`
- `ownerId`
- `url`
- `thumbnailUrl`
- `sizeBytes`
- `createdAt`

**Owner types to support or remain ready for**:
- `business_logo`
- `business_cover`
- `brand_image`
- `certificate`
- `product_image`
- `category_image`
- `store_banner`
- `document_asset`
- `other`

**Validation rules**:
- Business resources consume Workspace storage quota.
- Logo/image payloads are referenced, not copied into orders/invoices/documents.
- Product images remain product resources scoped to Business and optionally Branch.

## Future Business Settings

**Purpose**: Business-level non-Commerce settings.

**Potential fields**:
- `id`
- `workspaceId`
- `businessUnitId`
- `timezoneOverride`
- `currencyOverride`
- `locale`
- `fiscalYearStart`
- `workingDays`
- `createdAt`
- `updatedAt`

**Validation rules**:
- Separate from Workspace settings, CommerceSetup, and Branch settings.
- Documentation-first for Spec 048 unless low-risk type additions are selected during tasks.

## Future Business Employee

**Purpose**: Operational staff attached to a Business, separate from Workspace-level users/members.

**Examples**:
- Store Manager
- Cashier
- Pharmacist
- Salesperson
- Inventory Staff
- Branch Supervisor

**Validation rules**:
- Existing MVP team members remain Workspace-level.
- POS cashier continues deriving from current user until a future employee spec.

## Future Business Warehouse

**Purpose**: Business-level inventory location that can supply Branches.

**Validation rules**:
- Belongs to Business, not Workspace directly.
- Does not force warehouse management UI in Spec 048.
- Existing branch/product inventory remains working.

## Future BranchCommerceSettings

**Purpose**: Branch-level operational Commerce overrides.

**Potential fields**:
- `id`
- `workspaceId`
- `businessUnitId`
- `branchId`
- `receiptFooterOverride`
- `defaultWarehouseId`
- `defaultPrinterSize`
- `taxRegistrationOverride`
- `createdAt`
- `updatedAt`

**Validation rules**:
- Future override only.
- Does not move primary CommerceSetup under Branch.
