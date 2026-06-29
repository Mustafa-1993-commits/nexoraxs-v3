# Quickstart: Business-Level Commerce Setup Alignment

## Goal

Verify Spec 048 planning and later implementation without backend work, storage wipes, or architecture changes outside the current MVP boundary.

## Expected Manual Flow

1. Start from a normal Core Platform session.
2. Complete or inspect Core onboarding through Workspace creation and Product Hub.
3. Launch Commerce OS setup.
4. Confirm Business identity uses Business name and Industry Type as Business concepts.
5. Confirm Billing Address is labeled and treated separately from Branch Address.
6. Confirm Commerce Preset is suggested from Industry Type but can be changed by the user.
7. Complete Commerce setup and launch Commerce Dashboard.
8. Verify sidebar/POS/documents show Business identity and Branch context separately.
9. Verify invoices/receipts use Business Billing Address for legal/business address and Branch information only for operational context.
10. Verify no touched UI displays "Default Business Unit", "BusinessUnit", or "BU".

## Data Compatibility Checks

- Existing records with only `CommerceSetup.address`, `city`, and `country` still render as Billing Address fallbacks.
- Existing Branch records with `city` or address-like fields still represent operational Branch location.
- Existing BusinessUnit records remain valid and are described as Business in product language.
- Existing OSEnablement records from Spec 047 remain the subscription-to-usage bridge.
- Missing OSEnablement does not break currentBusinessUnitId compatibility for old mock data.

## Validation Commands

Run from repository root:

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

## Scope Guardrails

- Do not add backend APIs.
- Do not add microservices.
- Do not move Business or Branch creation back into Core if current active implementation/spec flow keeps them in Commerce setup.
- Do not make CommerceSetup branch-owned.
- Do not wipe localStorage/sessionStorage.
- Do not import from `docs/claude.aidesign` at runtime.
- Do not perform a global BusinessUnit rename.
- Do not build full HR employee, warehouse, Business Settings, or BranchCommerceSettings UI in this spec.

## Implementation Pass Status

- Validation commands passed for Core Platform and Commerce OS typecheck, lint, build, root build/lint, and `git diff --check`.
- The implementation pass did not run an interactive dev-server browser walkthrough. No browser-only blocker was found during static validation.
