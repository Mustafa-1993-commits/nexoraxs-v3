# Spec 048: Business-Level Commerce Setup + Address Separation + Business Resources

## Feature
Business-Level Commerce Setup + Address Separation + Business Resources

## Spec ID
`048-business-commerce-setup-addresses`

## Goal
Implement and document the business-level Commerce setup model for NexoraXS, based on the Target Architecture v2.0 decisions from Spec 047.

This spec applies selected architecture decisions into the MVP implementation without creating a second architecture source of truth.

## Main focus areas
1. Commerce Setup belongs to Business, not Branch.
2. Workspace Address, Business Billing Address, and Branch Address are separate concepts.
3. Business Industry Type is separate from Commerce Preset.
4. Commerce Preset follows Suggestion → User Confirmation → Apply.
5. Business Resources becomes the expandable business-level resource concept.
6. Business Settings are separate from Commerce Setup and Branch settings.
7. OSEnablement ownership is clarified as the bridge between OSSubscription and Business/Workspace/Branch usage.
8. Workspace Employees and Business Employees are not the same concept.
9. Business Warehouses are documented as future-ready.
10. Existing Core Platform + Commerce MVP must continue working.

## Important constraints
- This is architecture/data-flow alignment, not a UI redesign.
- Do not start Laravel/backend work.
- Do not break current Core Platform + Commerce MVP.
- Do not remove current mock-db/localStorage behavior.
- Do not import from `docs/claude.aidesign` at runtime.
- Do not rename all `BusinessUnit` symbols globally unless safe.
- Current `BusinessUnit` in code may continue to represent Business internally.
- User-facing copy should say Business, Store, Activity, Branch, or Location.
- Never show “Default Business Unit” in the UI.

---

## 0. Dependency on Spec 047
Spec 047 is the source of truth for Target Architecture v2.0.

Spec 048 must not redefine or contradict Spec 047. It only applies and clarifies selected decisions from Spec 047:
- Business-level Commerce Setup
- Address separation
- Industry Type vs Commerce Preset
- Preset suggestion and confirmation flow
- Business Resources
- Business Settings
- OSEnablement ownership clarification
- Business Employees vs Workspace Employees
- Business Warehouses
- Branch operational ownership

If a conflict exists:
- Spec 047 wins for core architecture.
- Spec 048 must be updated to align with Spec 047.

---

## 1. Golden Rules
1. Workspace owns global resources.
2. Business owns business configuration and identity.
3. Branch owns operational execution.
4. Commerce Setup configures the Business for Commerce OS.
5. OSEnablement connects purchased software to the Business, Workspace, or Branch where it is used.

### Ownership model

Workspace owns:
- Users / Members
- Workspace-level roles
- Workspace-level employees such as CEO, Finance, Legal, HR
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
- Business Warehouses

Branch owns:
- Physical location
- Operational address
- POS activity
- Sales/orders
- Inventory/stock
- Cashiers assigned to branch later
- Branch-specific operational overrides later

OSSubscription owns:
- Purchased license
- Plan
- Billing status
- Trial/renewal dates

OSEnablement owns:
- Where an OS is actually used
- Scope: workspace, business, or branch
- Enabled/disabled/locked status
- Link between a purchased OSSubscription and its actual usage target

Commerce OS owns:
- Commerce Preset
- Tax configuration
- Selling mode
- Categories
- Units
- Templates
- Numbering
- Commerce-specific configuration

### Critical rule
CommerceSetup belongs to Business, not Branch.

Correct:

```text
Workspace
→ Business
   ├── Business Identity
   ├── Business Billing
   ├── Business Settings
   ├── Business Resources
   ├── CommerceSetup
   ├── Branches
   ├── Business Employees
   └── Business Warehouses
```

Wrong:

```text
Workspace
→ Business
   → Branch
      → CommerceSetup
```

Reason: a business can have multiple branches sharing the same main Commerce configuration: identity, VAT/tax settings, categories, units, templates, numbering defaults, preset, and brand resources. Branches may later override small operational settings, but the main CommerceSetup remains business-level.

---

## 2. OSEnablement Ownership Clarification
OSEnablement bridges a purchased OSSubscription and the place where the OS is actually used.

```text
OSSubscription
→ OSEnablement
→ Business / Workspace / Branch depending scope
```

For Commerce MVP:
- OSSubscription: Commerce OS Pro purchased by Workspace.
- OSEnablement: Commerce OS enabled for selected Business.

Rules:
- OSEnablement must include `workspaceId` for tenant isolation.
- OSEnablement must reference `osSubscriptionId`.
- OSEnablement must include `osId`.
- OSEnablement must reference `businessUnitId` when `scope = "business"`.
- OSEnablement may reference `branchIds` when `scope = "branch"`.
- Workspace-wide OS products like HR or CRM may use `scope = "workspace"`.
- OSSubscription does not imply every Business can use the OS.
- OSEnablement decides where the OS is active.

Suggested shape if not already implemented by Spec 047:

```ts
interface OSEnablement {
  id: string;
  workspaceId: string;
  osId: string;
  osSubscriptionId: string;
  scope: "workspace" | "business" | "branch";
  businessUnitId: string | null;
  branchIds: string[];
  status: "active" | "disabled" | "locked";
  createdAt: string;
  updatedAt: string;
}
```

MVP:
- Reuse OSEnablement from Spec 047 if it exists.
- Do not duplicate the model.
- If missing, this spec may add only low-risk compatibility helpers or documentation.
- Existing MVP must continue using `currentBusinessUnitId` safely.
- Commerce should remain compatible with future OSEnablement.

---

## 3. Workspace Employees vs Business Employees
Workspace-level employees belong to the group/company level: CEO, Finance, Legal, HR, Group Admin, Workspace Owner.

Business-level employees belong to a specific Business: Store Manager, Cashier, Pharmacist, Salesperson, Inventory Staff, Branch Supervisor.

Rules:
- Do not model all employees as belonging to Business only.
- HR OS may later manage employees at workspace, business, or branch scope.
- Commerce MVP only needs currentUser/cashier identity for POS.
- Do not implement full HR employee management in this spec.

MVP:
- Existing users/team members remain workspace-level.
- POS cashier still derives from currentUser.
- Future Business Employees concept is documented, not fully implemented unless already safe.

---

## 4. Business Warehouses
Business Warehouses are future business-level inventory locations.

Example:

```text
Business: Mustafa Fashion
- Warehouse: Main Warehouse
- Branch: Nasr City
- Branch: New Cairo
```

Rules:
- Warehouses belong to Business, not Workspace directly.
- Branches own operational selling location.
- Warehouses may later supply multiple branches under the same Business.
- Do not implement full warehouse management in this spec unless already safe.
- Keep inventory MVP working as-is.

MVP:
- Current inventory remains branch/product-based.
- Do not force warehouse UI.
- Do not break POS stock deduction.

---

## 5. Business Resources
Business Resources is the expandable business-level resource ownership concept. It is broader than Business Assets.

Business Resources may include:
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

Relationship:

```text
Workspace
→ Business
→ Business Resources
```

MVP implementation:
- Do not create a complex BusinessResources module.
- Reuse existing `MediaAsset` for current MVP resource needs.
- MediaAsset records scoped with `businessUnitId` represent current Business Resources.
- Business logo is a Business Resource.
- Store banners, brand images, certificates, and document assets should be modeled as Business Resources.
- Business Resources consume Workspace storage quota.
- Do not duplicate logo/image payloads into products/orders/invoices.

MediaAsset ownerType should support or be ready for:
- `business_logo`
- `business_cover`
- `brand_image`
- `certificate`
- `product_image`
- `category_image`
- `store_banner`
- `document_asset`
- `other`

Rules:
- Business logo is a Business Resource.
- Product image is a Product Resource scoped to Business and optionally Branch.
- Store banner is a Business/Commerce online store resource.
- Invoice/receipt branding should reference Business Resources, not copy image payloads.
- Certificates and tax documents should be modeled as Business Resources later.

---

## 6. Business Settings
Business Settings are business-level settings that are not Commerce-specific and not Branch-specific.

Examples:
- Business timezone override
- Business currency override
- Business locale
- Fiscal year
- Working days
- Default language
- Business-level preferences

Rules:
- Business Settings belong to Business.
- Business Settings are separate from CommerceSetup.
- CommerceSetup configures Commerce OS only.
- Branch settings configure operational branch behavior only.
- Workspace settings remain global defaults.

MVP:
- Do not build full Business Settings UI unless already safe.
- Document the concept.
- Prepare types only if low-risk.
- Do not confuse Business Settings with Commerce Settings.

---

## 7. Address Separation
The platform must clearly separate three address concepts.

### Workspace Address
Purpose:
- Company/group-level address.
- Used for platform account, billing owner profile, and future legal workspace metadata.

Fields:
- `workspaceAddressLine1?`
- `workspaceAddressLine2?`
- `workspaceCity?`
- `workspaceCountry`
- `workspacePostalCode?`

MVP:
- Existing Workspace country/currency/timezone remain.
- Add address fields only if safe and needed.
- Do not force UI redesign.

### Business Billing Address
Purpose:
- Legal/billing/invoice address for this Business.
- Used on invoices, receipts, tax documents, legal documents.

Fields:
- `billingAddressLine1`
- `billingAddressLine2?`
- `billingCity`
- `billingCountry`
- `billingPostalCode?`

Belongs to Business-level CommerceSetup / Business identity.

Important: Billing Address is NOT Branch Address.

### Branch Address
Purpose:
- Physical operating location of a branch.
- Used for POS location, inventory location, receipts if branch-specific address is shown, delivery/pickup later.

Fields:
- `branchName`
- `branchCity`
- `branchAddressLine1?`
- `branchAddressLine2?`
- `branchCountry?`
- `branchPostalCode?`

Belongs to Branch.

Rules:
- Do not reuse generic city/country fields ambiguously where meaning matters.
- In labels, say Billing City/Country/Address or Branch City/Address.
- Receipt/invoice documents should use Business Billing Address by default.
- POS branch context should use Branch name/address where needed.
- If billing address is missing, fallback gracefully to existing `address/city/country` fields.

---

## 8. Business Industry Type vs Commerce Preset
Industry Type belongs to Business and answers: What is your business?

Examples:
- Fashion
- Pharmacy
- Restaurant
- Electronics
- Supermarket
- Services
- Manufacturing
- Custom

Commerce Preset belongs only to Commerce OS configuration and answers: How should Commerce OS work?

Examples:
- Fashion Retail
- Pharmacy
- Restaurant POS
- Supermarket
- Electronics
- Generic Retail

Important:
- Industry Type is not Commerce Preset.
- Business `Mustafa Pharmacy` can have Industry Type `Pharmacy` and Commerce Preset `Generic Retail`.
- User must be allowed to override the suggested preset.

---

## 9. Preset Suggestion Flow
Correct flow:

```text
Business Industry Type
→ Suggest Commerce Preset
→ User confirms or changes
→ Apply selected Commerce Preset
```

Rules:
- Do not directly apply Commerce Preset just because the user selected Industry Type.
- Industry Type should not overwrite Commerce Preset after user manually changes preset.
- Preset suggestions are helpful, not mandatory.
- Preset application is explicit or clearly triggered by confirmation.
- Preset belongs to CommerceSetup, not Core Business.
- Business industry belongs to Business.

---

## 10. Data Model Updates
Current code may use `BusinessUnit`. Treat it as Business internally for now.

BusinessUnit / Business should support:
- `id`
- `workspaceId`
- `name`
- `industryType`
- `osSubscriptionId?` optional/legacy
- `createdAt`
- `updatedAt?`

Do not rely on `preset/presetId` as Industry Type.

Optional future BusinessSettings:
- `id`
- `workspaceId`
- `businessUnitId`
- `timezoneOverride?`
- `currencyOverride?`
- `locale?`
- `fiscalYearStart?`
- `workingDays?`
- `createdAt`
- `updatedAt`

Branch should support:
- `id`
- `workspaceId`
- `businessUnitId`
- `name`
- `city / branchCity`
- `address / branchAddressLine1`
- `country / branchCountry`
- `postalCode?`
- `isMain`
- `createdAt`
- `updatedAt?`

CommerceSetup should support business-level identity:
- `id`
- `workspaceId`
- `businessUnitId`
- `osSubscriptionId`
- `displayName`
- `legalName`
- `phone`
- `email`
- `billingAddressLine1`
- `billingAddressLine2?`
- `billingCity`
- `billingCountry`
- `billingPostalCode?`
- `logo / logoMediaAssetId if available`
- `presetId`
- `commercePreset`
- `mode`
- tax fields
- numbering fields
- template fields
- `categories`
- `units`
- timestamps

Backward compatibility:
- If current CommerceSetup fields are `address/city/country`, map them to billing address meaning.
- Do not break existing forms.
- Add comments/docs explaining `CommerceSetup.address/city/country` currently represent Billing Address until renamed safely.
- If current product image field is `image`, keep compatible while preparing `mediaAssetId/imageThumbUrl` when safe.
- Do not perform risky global rename from BusinessUnit to Business in this spec.

---

## 11. Core Onboarding Flow Alignment
Conceptual flow:

```text
Welcome
→ Create Workspace
→ Create First Business
→ Create Main Branch
→ Choose Operating System
→ Choose Plan
→ Product Hub
```

Step 1 — Create Workspace:
- Workspace Name
- Country
- Currency
- Timezone
- Language

Step 2 — Create First Business:
- Business Name
- Industry Type

Industry Type options:
- Fashion
- Restaurant
- Pharmacy
- Electronics
- Supermarket
- Services
- Manufacturing
- Custom

Step 3 — Create Main Branch:
- Branch Name
- Branch City
- Branch Address optional

Step 4 — Choose Operating System:
- Commerce OS
- HR OS if already shown
- Future: CRM, Healthcare, Gym, Maintenance

Step 5 — Choose Plan:
- Creates OSSubscription

System action:
- Create OSEnablement if available: Commerce OS → selected Business, scope business.

MVP:
- If OSEnablement is not implemented yet, keep current subscription/currentBusinessUnit flow working.
- Do not introduce logic that blocks future OSEnablement.

---

## 12. Commerce Setup Flow Alignment
Conceptual flow:

```text
Business Identity
→ Commerce Preset Suggestion / Confirmation
→ Tax & Selling Mode
→ Templates / Numbering / Categories
→ Review & Launch
→ Commerce Dashboard
```

Commerce Step 1 — Business Identity:
Inherited:
- Business Name
- Industry Type

Editable:
- Display Name
- Legal Name
- Phone
- Email
- Billing Address
- Billing City
- Billing Country
- Billing Postal Code
- Logo / Business Resource

Important:
- Billing Address is legal/invoice address.
- Branch Address remains operational location.
- Business Name should not include Branch.
- Branch should not be concatenated into Business display name.
- Logo should be treated as a Business Resource where safe.

Commerce Step 2 — Commerce Preset:
- Suggest preset based on Business industryType.
- User can confirm or choose another preset.
- Applies categories, units, templates, prefixes, and defaults only after confirmation.

Commerce Step 3 — Tax & Selling Mode:
- VAT Registered
- VAT Number
- VAT Rate
- Selling Mode: Physical Store, Online Store, Both

Commerce Step 4 — Templates / Defaults:
- Categories
- Units
- Document templates
- Receipt prefix
- Invoice prefix
- Numbering defaults

Commerce Step 5 — Review & Launch:
Show:
- Workspace
- Business
- Industry
- Commerce Preset
- Branch
- Plan
- VAT
- Selling Mode
- Billing Address
- Branch Address

Launch:
- Save CommerceSetup at Business level.
- Route to Commerce Dashboard.

---

## 13. Branch-Level Operational Settings
Do not move CommerceSetup under Branch.

Future optional entity:

```ts
interface BranchCommerceSettings {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  receiptFooterOverride?: string;
  defaultWarehouseId?: string;
  defaultPrinterSize?: string;
  taxRegistrationOverride?: string;
  createdAt: string;
  updatedAt: string;
}
```

MVP:
- Do not implement full BranchCommerceSettings unless easy and safe.
- Document the future concept only.
- Branch continues owning operational location and inventory/sales context.

---

## 14. Documents and Receipts
Receipt/invoice rendering should use:

Business-level data:
- Display Name
- Legal Name
- Logo / Business Resource
- Tax number
- Billing Address
- Billing City
- Billing Country

Branch-level data:
- Branch Name
- Branch Address if needed
- Branch City

Order-level data:
- Cashier Name
- Customer
- Items
- Payment
- Totals
- VAT

Rules:
- Invoice should show Billing Address as legal document address.
- Receipt may show Branch name and possibly branch address.
- Do not mix branch address as billing address unless no billing address exists.
- If billing address is missing, fallback gracefully to existing address field.
- Do not duplicate logo payload into each invoice/order.
- Documents should reference Business identity/resources at render time.

---

## 15. UI Copy Rules
Replace ambiguous labels where safe.

Instead of generic:
- City
- Country
- Address

Use where relevant:
- Billing City
- Billing Country
- Billing Address
- Branch City
- Branch Address

Instead of:
- Business Unit
- Default Business Unit
- BU

Use:
- Business
- Store
- Activity
- Branch

Commerce Setup labels:
- Business Identity
- Billing Address
- Commerce Preset
- Selling Mode
- Tax Settings
- Business Resources where relevant

Core Onboarding labels:
- Workspace
- Business
- Industry Type
- Main Branch

---

## 16. Mock DB / Storage Rules
- Continue using shared mock-db/local/session storage.
- No direct localStorage/sessionStorage in pages/components.
- Use shared storage helpers.
- Preserve hydration safety.
- Preserve existing reset behavior.

Seed/demo data should clearly distinguish:
- Workspace: Mustafa Group
- Business: Mustafa Fashion or Mustafa Pharmacy
- Industry Type: Fashion or Pharmacy
- Branch: Nasr City Branch / Smouha Branch
- Commerce Preset: Fashion Retail / Pharmacy / Generic Retail
- Billing Address: Legal/invoice address
- Branch Address: Physical operating address
- Business Resources: Logo / brand resources scoped to businessUnitId through MediaAsset where safe

Storage:
- Business Resources consume Workspace storage quota.
- Product images consume Workspace storage quota.
- Do not store original full-size base64 images in large collections.
- Do not duplicate images into orders/invoices.

---

## 17. Documentation
Create or update:

`docs/implementation/business-commerce-setup-addresses.md`

Document:
- Spec 048 depends on Spec 047.
- Spec 047 is Source of Truth.
- Workspace vs Business vs Branch.
- Workspace owns global resources.
- Business owns business configuration and identity.
- Branch owns operational execution.
- CommerceSetup belongs to Business.
- CommerceSetup configures the Business for Commerce OS.
- OSEnablement connects purchased software to Business/Workspace/Branch.
- OSEnablement logical relationship: OSSubscription → OSEnablement → Business/Workspace/Branch.
- Billing Address vs Branch Address.
- Workspace Address vs Business Billing Address vs Branch Address.
- Industry Type vs Commerce Preset.
- Preset Suggestion → Confirm → Apply.
- Business Resources.
- Business Settings.
- Business Employees vs Workspace Employees.
- Business Warehouses.
- Current code mapping: BusinessUnit in code = Business in product language.
- Future BranchCommerceSettings, HR scopes, warehouses, and expanded Business Resources.

---

## 18. Acceptance Criteria
### Functional acceptance
- Existing MVP flow still works.
- Commerce Setup remains accessible and saves correctly.
- Business identity still appears in sidebar/POS/receipt/invoice.
- Branch still appears separately from business name.
- Commerce setup is treated/documented as Business-level, not Branch-level.
- Branch address and billing address are not treated as the same concept.
- Workspace address, billing address, and branch address are clearly separated in architecture/docs.
- Industry Type and Commerce Preset are separate concepts.
- Preset is suggested from Industry Type but user can change it.
- Receipt/invoice use billing address for legal/business address.
- POS/branch context uses branch name/address.
- Business Resources concept is documented and mapped to MediaAsset where safe.
- Business Settings concept is documented separately from Commerce Setup.
- OSEnablement ownership/relationship is documented clearly.
- Business Employees and Workspace Employees are not treated as the same concept.
- Business Warehouses concept is documented as future-ready without breaking MVP.

### Technical acceptance
- No backend work.
- No UI redesign beyond necessary label/field alignment.
- No runtime imports from `docs/claude.aidesign`.
- No direct localStorage/sessionStorage in pages/components.
- BusinessUnit remains working as current internal Business model.
- Branch always belongs to BusinessUnit.
- CommerceSetup remains scoped by workspaceId + businessUnitId.
- No new cross-OS dependency.
- MediaAsset remains the base for current business resources if already present.
- No duplicate image/logo payloads copied into products/orders/invoices.
- Spec 048 does not contradict Spec 047.
- core-platform tsc/lint/build pass.
- commerce tsc/lint/build pass.

## Validation commands
```bash
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter core-platform lint
pnpm --filter core-platform build

pnpm --filter commerce exec tsc --noEmit
pnpm --filter commerce lint
pnpm --filter commerce build

pnpm build
pnpm lint
```

## Suggested commit
```bash
feat(platform): align business commerce setup resources and addresses
```
