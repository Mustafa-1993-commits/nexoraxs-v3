# Contract: Business-Level Commerce Setup Alignment

This contract describes the expected behavior between shared mock-db helpers, Core Platform handoff, Commerce setup, document rendering, and implementation documentation for Spec 048. It is not a backend API contract.

## Scope Contract

- Core Platform owns Workspace, OSSubscription, Product Hub state, billing/team/access shell, and launch handoff context.
- Commerce OS owns CommerceSetup, Commerce Preset confirmation, tax, selling mode, categories, templates, numbering, and document setup.
- Shared packages own canonical types and pure mock-store helpers.
- `BusinessUnit` may remain the internal entity name, but touched UI must use Business/Store/Activity/Branch language.

## CommerceSetup Ownership Contract

Given a Workspace and Business/BusinessUnit:

- CommerceSetup must be resolved by `workspaceId + businessUnitId`.
- CommerceSetup must not be resolved only by `branchId`.
- Current branch can influence operational context but cannot own the main Commerce setup.
- If multiple Branches exist under a Business, they share the same Business-level CommerceSetup unless a future BranchCommerceSettings override exists.

## Address Contract

Business Billing Address:

- Current fallback fields: `CommerceSetup.address`, `CommerceSetup.city`, `CommerceSetup.country`.
- Optional explicit fields may be introduced as `billingAddressLine1`, `billingAddressLine2`, `billingCity`, `billingCountry`, `billingPostalCode`.
- Receipts, invoices, tax invoices, reports, and customer documents use Business Billing Address for legal/business address.

Branch Address:

- Current fallback fields: `Branch.address`, `Branch.city`, `Branch.country` where present.
- UI labels must say Branch Address or Branch City where meaning matters.
- POS and branch context use Branch name/address separately from Business Billing Address.

Workspace Address:

- Workspace country/currency/timezone remain current MVP defaults.
- Optional workspace address fields are account/global metadata and must not be treated as Business Billing Address or Branch Address.

## Industry Type and Preset Contract

- Business `industryType` is canonical activity classification.
- CommerceSetup `presetId` / `preset` / `businessType` are Commerce-specific configuration values.
- Industry Type suggests a Commerce Preset.
- A user-confirmed Commerce Preset applies Commerce defaults.
- A manually confirmed preset must not be overwritten by later Industry Type changes unless the user explicitly confirms a new preset.

Recommended suggestion behavior:

```text
pharmacy          -> pharmacy
fashion/clothing  -> clothing_fashion
retail            -> retail_store
supermarket       -> supermarket
restaurant        -> restaurant_cafe
electronics       -> electronics_mobile
cosmetics         -> cosmetics
medical_supplies  -> medical_supplies
other             -> retail_store
```

## OSEnablement Contract

- OSSubscription is the purchased Workspace license.
- OSEnablement identifies where the OS is actually used.
- Commerce MVP should prefer a business-scoped active OSEnablement where present.
- Existing currentBusinessUnitId compatibility remains valid when old data has no OSEnablement.
- OSSubscription must not be treated as permission for every Business to use Commerce OS.

## Business Resources Contract

- Business Resources are represented by Business-scoped MediaAsset records in the MVP where safe.
- Business logo, business cover, brand image, certificate, store banner, and document asset are Business Resources.
- Product images remain product resources scoped to Business and optionally Branch.
- Resource payloads are referenced by ID/URL/thumbnail and must not be copied into orders, invoices, or document records.
- Resource sizes consume Workspace storage quota.

## Documentation Contract

`docs/implementation/business-commerce-setup-addresses.md` must document:

- Spec 048 dependency on Spec 047.
- Workspace vs Business vs Branch ownership.
- CommerceSetup belongs to Business.
- Workspace Address vs Business Billing Address vs Branch Address.
- Industry Type vs Commerce Preset.
- Preset Suggestion -> Confirm -> Apply.
- Business Resources and current MediaAsset mapping.
- Business Settings as separate from Workspace settings, CommerceSetup, and Branch settings.
- OSEnablement relationship: OSSubscription -> OSEnablement -> Workspace/Business/Branch.
- Workspace Employees vs Business Employees.
- Business Warehouses.
- Future BranchCommerceSettings.
- Current mapping: BusinessUnit in code = Business in product language.

## Validation Contract

Implementation completion must run or document blockers for:

```bash
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter core-platform lint
pnpm --filter core-platform build
pnpm --filter commerce exec tsc --noEmit
pnpm --filter commerce lint
pnpm --filter commerce build
pnpm build
pnpm lint
git diff --check
```
