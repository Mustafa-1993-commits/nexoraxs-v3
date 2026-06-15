# Quickstart: Validate the MVP End-to-End Flow with Storage Quota

This walkthrough exercises the full journey from spec.md's acceptance criteria using the local/demo mock-db. No backend, payment gateway, or real storage is involved — everything runs against `localStorage`/`sessionStorage` through `@nexoraxs/shared`.

## Prerequisites

```bash
pnpm install
pnpm --filter core-platform dev   # http://localhost:3001
pnpm --filter commerce dev        # http://localhost:3002
```

Use a fresh browser profile or the existing demo "Reset" action so the workspace starts with zero usage and zero data.

## Walkthrough

1. **Register** a new account on Core Platform → confirm you land on **Welcome** (not the Product Hub) — FR-001.
2. Continue through **Core Onboarding** (workspace name, country, currency, timezone, branch) → confirm the wizard never mentions "Business Unit"/"Default Business Unit" — FR-003/FR-004.
3. Land on **Core Dashboard** → confirm the storage-usage card shows something like "Storage used: 0 MB / 500 MB" — FR-005/FR-009.
4. Open **Product Hub** → confirm Commerce OS shows as available/start and the other five OSes show "Coming Soon"/locked — FR-006.
5. **Start Commerce OS** → confirm you're handed off into the Commerce app and the **Setup Wizard** launches automatically — FR-007/FR-016.
6. Complete all 8 wizard steps:
   - Step 1: upload a normal-sized logo image → confirm it appears in the live preview and (after finishing) in the sidebar/POS, and that the storage-usage figure increases by a small amount — FR-017, FR-026.
   - Steps 2–7: choose a preset, operational mode (Physical Store), tax setup, numbering, templates, categories/units.
   - Step 8: confirm the review shows business name, branch, OS, preset, mode, tax, numbering, templates, categories, and the storage plan/usage line — FR-024.
7. Land on **Commerce Dashboard** → confirm business name + logo + branch render correctly (not combined, not showing internal grouping names) — FR-025/FR-027.
8. Go to **Add Product**, fill required fields, and attach a normal product photo → confirm:
   - the product saves with a visible thumbnail,
   - it appears with that thumbnail in **Products**, **POS** grid, and **Inventory** — FR-028/FR-029,
   - the storage-usage figure (visible in Commerce Settings and/or Core Billing) increases again — FR-009/FR-015.
9. Repeat step 8 with a deliberately oversized image → confirm the product still saves (without the image) and a friendly toast explains why — FR-013/FR-030.
10. Open **POS**, search/filter, add items to the cart, and open **Checkout ("Complete Sale")** → confirm:
    - the cashier row shows your own display name automatically (no manual entry) — FR-033,
    - opening the customer picker, then "Add new customer", keeps Checkout open underneath and the cart intact, and selecting/saving a customer leaves you back in Checkout with that customer applied — FR-034/FR-035.
11. Click **Complete Sale** → confirm: cart validated, customer resolved, cashier captured, order created, stock deducted, invoice generated, and you land on the **success** screen — FR-036.
12. On the success screen, confirm the **receipt** shows business name, logo, branch, cashier name, receipt/invoice number, items, VAT, total, payment method, and customer (if selected); confirm **Print** and **View Invoice** work — FR-038.
13. Open **Orders** and **Invoices** → confirm the new order/invoice appear with correct cashier, totals, and a working order↔invoice link — FR-039/FR-040.
14. Open **Customers** → confirm the customer added from POS appears with updated order count/spend, and that clicking the row opens the side drawer (not direct navigation) — FR-041/FR-042.
15. Open **Inventory** → confirm the sold product's stock decreased and low-stock flags behave correctly — FR-031.
16. Open **Reports** → confirm sales totals, order count, VAT collected, and best sellers reflect the new sale — FR-043.
17. Open **Commerce Settings** and **Core Billing/Settings** → confirm both show a storage-usage summary consistent with what you observed growing in steps 6–9 — FR-015/FR-044/FR-045.
18. Resize the browser to tablet/mobile widths at each major screen (shell, setup wizard, POS cart/checkout, customer drawer) → confirm no horizontal overflow and all controls remain usable — FR-047.
19. Run the **demo reset** → confirm storage usage returns to zero and media-asset records are cleared along with the rest of the demo data — FR-049.

## Technical validation

Run from repo root after implementation:

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

All commands must pass cleanly, and the browser console must show no `QuotaExceededError` at any point in the walkthrough above (SC-005).

## Success signal

The walkthrough above (steps 1–19) corresponds 1:1 to acceptance scenarios #1–26 in spec.md §21. Completing it without dead ends, lost modal state, incorrect identity, or storage errors satisfies SC-001 through SC-008.
