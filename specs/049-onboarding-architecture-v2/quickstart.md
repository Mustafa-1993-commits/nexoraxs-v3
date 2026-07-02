# Quickstart: Onboarding Architecture v2

## Purpose

Use this walkthrough to validate Spec 049 after implementation. It focuses on architecture behavior and user-visible UX, not backend persistence.

## Preconditions

- User can register or log in.
- Core Platform and Commerce OS apps can run locally.
- Existing mock or persisted records are preserved unless the tester intentionally resets them.

## Walkthrough A: First Workspace, First Business, First Commerce Launch

1. Register or log in.
2. Land on Welcome + Language.
3. Select English and confirm LTR/date/number formatting.
4. Switch to Arabic and confirm RTL/date/number formatting.
5. Continue to Create Workspace.
6. Enter Workspace Name, Country, Currency, and Timezone.
7. Change Country and verify Currency/Timezone defaults update.
8. Override Currency or Timezone and verify override is preserved.
9. Continue to Create Business.
10. Enter Business Name.
11. Choose Business Activity, such as Pharmacy or Fashion.
12. Finish Core onboarding.
13. Verify Product Hub opens.
14. Verify Product Hub shows Workspace, Businesses, Operating Systems, statuses, and quick actions.
15. Verify no Commerce-specific setup fields appeared in Core onboarding.
16. Select the active Business in Product Hub.
17. Launch Commerce OS.
18. Choose Commerce plan: Starter, Pro, Business, or Enterprise.
19. Verify a Workspace-level Commerce OS Subscription exists or is reused.
20. Verify Commerce setup starts with the selected Workspace and Business context.
21. In Business Identity, verify Business Name and Business Activity are inherited.
22. Enter or edit Display Name, Legal Name, contact, legal registration, and Billing Address fields.
23. In Commerce Preset, verify the preset is suggested from Business Activity.
24. Override the preset and verify the override is preserved.
25. Create or select Main Branch.
26. Enter Branch City and Branch Address.
27. Enter tax fields.
28. Review Workspace, Business, Branch, Plan, Preset, Selling Mode, Tax, Templates, and Numbering.
29. Launch Commerce.
30. Verify generated defaults exist for categories, units, templates, numbering, barcode rules, and optional sample products.
31. Verify Commerce Dashboard opens with current Workspace, Business, and Branch context visible.

## Walkthrough B: Address Separation

1. In Commerce setup, enter a Billing Address that differs from the Branch Address.
2. Complete setup and open dashboard/settings/documents where address context is visible.
3. Verify Billing Address remains legal/invoice identity.
4. Verify Branch Address remains operational location.
5. Edit one address and verify the other does not change unexpectedly.

## Walkthrough C: Multi-Business Subscription Reuse

1. In the same Workspace, add a second Business from Product Hub.
2. Use a different Business Activity for the second Business.
3. Launch Commerce OS for the second Business.
4. Verify the existing Workspace-level Commerce OS Subscription is reused unless the tester explicitly changes plan.
5. Verify a separate OSEnablement is created for the second Business.
6. Verify a separate CommerceSetup is created for the second Business.
7. Verify Branches remain separate per Business.

## Walkthrough D: Branch Operational Scope

1. For a Business with Commerce setup complete, add a second Branch.
2. Switch active Branch inside Commerce.
3. Verify POS, inventory, orders, invoices, reports, transfers, and returns use the selected Branch context.
4. Verify CommerceSetup values such as preset, tax, templates, categories, units, and numbering remain Business-owned and shared unless a future explicit override exists.

## Expected Validation Commands

```bash
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter commerce exec tsc --noEmit
pnpm --filter core-platform lint
pnpm --filter commerce lint
pnpm --filter core-platform build
pnpm --filter commerce build
pnpm build
pnpm lint
git diff --check
```

## Pass Criteria

- Core onboarding is OS-neutral.
- Product Hub is the only Core OS entry point.
- Business Activity is collected once.
- OSSubscription and OSEnablement are visible as separate concepts through status behavior.
- CommerceSetup belongs to Business.
- Branch owns operational scope only.
- Billing Address and Branch Address remain distinct.
- No user-facing BusinessUnit, BU, or Default Business Unit wording appears.
