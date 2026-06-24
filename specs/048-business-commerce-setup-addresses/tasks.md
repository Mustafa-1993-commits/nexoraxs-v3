# Tasks: 048 Business Commerce Setup Addresses

## A. Architecture guardrails
- [ ] Confirm Spec 047 remains the source of truth for Target Architecture v2.0.
- [ ] Confirm Spec 048 does not redefine or contradict Spec 047.
- [ ] Keep this spec focused on architecture/data-flow alignment, not UI redesign.
- [ ] Keep current Core Platform + Commerce MVP working.

## B. Current model review
- [ ] Review current BusinessUnit type and document it as Business in product language.
- [ ] Review Branch type and confirm every Branch belongs to workspaceId + businessUnitId.
- [ ] Review CommerceSetup and confirm it is scoped by workspaceId + businessUnitId.
- [ ] Review MediaAsset and WorkspaceStorageUsage.
- [ ] Review OSEnablement from Spec 047 if present.

## C. Safe type alignment
- [ ] Add or confirm `industryType` on BusinessUnit / Business.
- [ ] Do not use `preset` or `presetId` as Business industry.
- [ ] Add optional Workspace address fields only if safe.
- [ ] Add optional Branch address fields only if safe.
- [ ] Add optional CommerceSetup billing address fields only if safe.
- [ ] Preserve legacy CommerceSetup `address/city/country` compatibility.
- [ ] Preserve legacy Branch `city/country` compatibility.
- [ ] Extend MediaAsset ownerType for business resources only if safe.

## D. OSEnablement compatibility
- [ ] Reuse OSEnablement if already added by Spec 047.
- [ ] Do not duplicate the model.
- [ ] Document OSSubscription → OSEnablement → Business/Workspace/Branch.
- [ ] Ensure currentBusinessUnitId flow remains safe for Commerce MVP.
- [ ] Ensure Commerce can remain future-compatible with OSEnablement.

## E. Address separation
- [ ] Document Workspace Address vs Business Billing Address vs Branch Address.
- [ ] Ensure CommerceSetup address fields are treated as billing address compatibility fields.
- [ ] Ensure Branch address is treated as operational location.
- [ ] Update labels where safe: Billing Address, Billing City, Branch Address, Branch City.
- [ ] Ensure receipt/invoice prefer Business Billing Address.
- [ ] Ensure POS/branch context uses Branch name/address where needed.

## F. Industry Type vs Commerce Preset
- [ ] Ensure Business industryType is separate from Commerce preset.
- [ ] Add helper or mapping for Industry Type → suggested Commerce Preset if safe.
- [ ] Ensure user can confirm or change Commerce Preset.
- [ ] Ensure preset defaults apply only after confirmation.
- [ ] Ensure manual preset selection is not overwritten by industry changes.

## G. Business Resources
- [ ] Document Business Resources as broader than Business Assets.
- [ ] Map current Business Resources to MediaAsset scoped by businessUnitId.
- [ ] Treat business logo as Business Resource.
- [ ] Treat store banner/document branding/certificates as future Business Resources.
- [ ] Ensure Business Resources consume Workspace storage quota.
- [ ] Prevent duplicate logo/image payloads in orders/invoices.

## H. Business Settings, Employees, Warehouses
- [ ] Document Business Settings separately from CommerceSetup and Branch settings.
- [ ] Document Workspace Employees vs Business Employees.
- [ ] Preserve POS cashier from currentUser for MVP.
- [ ] Document Business Warehouses as future-ready.
- [ ] Do not implement full HR/warehouse UI in this spec.

## I. Seed and mock-db alignment
- [ ] Update seed/demo labels to clearly distinguish Workspace, Business, Branch, Industry Type, Commerce Preset, Billing Address, Branch Address.
- [ ] Preserve mock-db/localStorage behavior.
- [ ] Preserve hydration safety.
- [ ] Preserve reset behavior.
- [ ] No direct localStorage/sessionStorage in pages/components.

## J. Documentation
- [ ] Create `docs/implementation/business-commerce-setup-addresses.md`.
- [ ] Explain Spec 048 dependency on Spec 047.
- [ ] Explain Workspace vs Business vs Branch.
- [ ] Explain CommerceSetup belongs to Business.
- [ ] Explain OSEnablement ownership relationship.
- [ ] Explain address separation.
- [ ] Explain Industry Type vs Commerce Preset.
- [ ] Explain Preset Suggestion → Confirm → Apply.
- [ ] Explain Business Resources.
- [ ] Explain Business Settings.
- [ ] Explain Business Employees vs Workspace Employees.
- [ ] Explain Business Warehouses.
- [ ] Explain current code mapping: BusinessUnit = Business in product language.

## K. Validation
- [ ] `pnpm --filter core-platform exec tsc --noEmit`
- [ ] `pnpm --filter core-platform lint`
- [ ] `pnpm --filter core-platform build`
- [ ] `pnpm --filter commerce exec tsc --noEmit`
- [ ] `pnpm --filter commerce lint`
- [ ] `pnpm --filter commerce build`
- [ ] `pnpm build`
- [ ] `pnpm lint`
