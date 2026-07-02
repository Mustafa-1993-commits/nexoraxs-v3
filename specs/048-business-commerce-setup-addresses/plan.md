# Plan: 048 Business Commerce Setup Addresses

## Objective
Safely align the current MVP with Target Architecture v2.0 decisions around Business-level Commerce setup, address separation, Business Resources, OSEnablement ownership, and future-ready business concepts.

This plan must keep the current Core Platform + Commerce MVP working.

## Scope
- Clarify `BusinessUnit` as the current internal representation of Business.
- Ensure CommerceSetup is treated as Business-level configuration.
- Separate Workspace Address, Business Billing Address, and Branch Address in types/docs and labels where safe.
- Preserve backward compatibility with existing `address/city/country` fields.
- Separate Business `industryType` from Commerce `preset/presetId`.
- Document and prepare preset suggestion flow.
- Map Business Resources to current MediaAsset model.
- Clarify OSEnablement as the OSSubscription usage bridge.
- Document Business Settings, Business Employees, and Business Warehouses as future-ready concepts.

## Non-goals
- No Laravel/backend work.
- No database migrations.
- No major UI redesign.
- No risky global rename from BusinessUnit to Business.
- No full HR employee management.
- No full warehouse management.
- No full Business Resources module.
- No cross-OS coupling.

## Implementation Phases

### Phase 1 — Type and schema audit
- Review `packages/types/src/core.ts` and `packages/types/src/commerce.ts`.
- Confirm existing BusinessUnit, Branch, CommerceSetup, MediaAsset, WorkspaceStorageUsage, and OSEnablement if present.
- Identify safe additive fields only.

### Phase 2 — Low-risk model alignment
- Add `industryType` to BusinessUnit if missing.
- Add optional address fields to Workspace, Branch, and CommerceSetup only if safe.
- Keep legacy fields working:
  - CommerceSetup `address/city/country` = billing address compatibility fields.
  - Branch `city/country` = branch location compatibility fields.
- Extend MediaAsset owner types only if safe.

### Phase 3 — Mock DB and seed alignment
- Update seed/demo data to distinguish:
  - Workspace: Mustafa Group
  - Business: Mustafa Fashion / Mustafa Pharmacy
  - Industry Type: Fashion / Pharmacy
  - Branch: Nasr City Branch / Smouha Branch
  - Commerce Preset: Fashion Retail / Pharmacy / Generic Retail
  - Billing Address vs Branch Address
- Preserve current reset/hydration/localStorage behavior.

### Phase 4 — Commerce setup behavior
- Treat CommerceSetup as Business-level configuration.
- Do not nest CommerceSetup under Branch.
- Use Business industryType only to suggest a Commerce Preset.
- Allow user to confirm or change the Commerce Preset.
- Apply preset defaults only after confirmation.

### Phase 5 — Documents and identity
- Receipt/invoice rendering should prefer Business billing address for legal/business address.
- POS/branch context should use Branch name/address where needed.
- Business identity must remain separate from branch name.
- Do not duplicate logo/image payloads into orders/invoices.

### Phase 6 — Documentation
- Add `docs/implementation/business-commerce-setup-addresses.md`.
- Explain dependency on Spec 047.
- Explain current code mapping: BusinessUnit in code = Business in product language.
- Document Business Resources, Business Settings, Business Employees, Business Warehouses, and BranchCommerceSettings future override concept.

### Phase 7 — Validation
Run:

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

## Risk controls
- Add fields optionally rather than renaming required fields.
- Keep all existing storage keys and record shapes compatible.
- Do not break existing setup/product/POS/order/invoice flows.
- Do not introduce a second source of truth conflicting with Spec 047.
