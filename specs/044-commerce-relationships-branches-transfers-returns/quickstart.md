# Quickstart: Validate Branch-Scoping, Branch Inventory, Transfers, and Returns

This walkthrough exercises spec.md's User Stories 1-4 against the local/demo mock-db. No backend, payment gateway, or real storage is involved — everything runs against `localStorage`/`sessionStorage` through `@nexoraxs/shared`.

## Prerequisites

```bash
pnpm install
pnpm --filter commerce dev   # http://localhost:3002
```

Start from the existing seeded demo workspace ("Mustafa Pharmacy", one Business, one Branch — "Smouha Branch" — with 2 seeded Products carrying legacy `stock` values). No seed changes are required.

## Walkthrough

1. Sign in and confirm the active Branch shown (BranchPill / Settings) is **Smouha Branch** — FR-001/FR-002.
2. Go to **Settings → Branches → Add Branch** and create a second Branch (e.g., "Nasr City") under the same Business — sets up the multi-branch precondition for the rest of this walkthrough; confirms a Branch can only be created under the active Business (FR-001).
3. Confirm the Branch selector now lists only **Smouha Branch** and **Nasr City**, and that no label, selector, or message anywhere says "Business Unit", "BU", or "Default Business Unit" — FR-003/SC-009.

### US1 — Branch-scoped read views (P1)

4. With **Smouha Branch** active, complete a POS sale of one seeded Product → confirm it appears in Smouha's Dashboard "sales today", Orders list, Invoices list, and Reports — AC US1-1.
5. Switch the active Branch to **Nasr City** → confirm Dashboard, Orders, Invoices, and Reports show zero records for this sale, and that Reports clearly indicates "Nasr City" as the active Branch — AC US1-1/US1-2/SC-002.
6. While Nasr City is active, open the Smouha order directly by its id/link → confirm it renders with a "Smouha Branch" label, but does **not** appear in Nasr City's Orders list — AC US1-3/FR-009.

### US2 — Per-branch inventory (P2)

7. While **Smouha Branch** is active, open Inventory → confirm a seeded Product's stock equals its original legacy `stock` value — this is a virtual legacy fallback for display only, and must not persist a `BranchInventory` record on read/access — AC US2-3/FR-006.
8. Switch to **Nasr City** → open Inventory → confirm the same Product initially shows the same legacy-derived stock, then edit it to a different value (e.g., 3) via the Branch Inventory edit control — AC US2-1/FR-006.
9. Switch back to **Smouha Branch** → confirm its stock for that Product is unchanged by step 8's edit — AC US2-1/SC-003.
10. Complete a POS sale of 1 unit of that Product at Smouha → confirm Smouha's stock decreases by 1, while Nasr City's stock (from step 8) is unaffected — AC US2-2/SC-003.

### US3 — Stock transfer (P3)

11. From Smouha (active), open **Inventory → Stock Transfer** (`/inventory/transfers`) and confirm it is linked from Inventory only, with no new top-level Commerce nav item; attempt a transfer to Smouha itself → confirm it is rejected with a clear message and nothing changes — AC US3-3/FR-026/FR-014/SC-005.
12. Attempt a transfer to Nasr City with a quantity greater than Smouha's available stock → confirm rejection with a clear message and no changes — AC US3-3/FR-013/SC-005.
13. Transfer a valid quantity (e.g., 2 units) from Smouha to Nasr City in a single confirmation → confirm Smouha's stock decreases by 2 and Nasr City's stock increases by 2 — AC US3-1/FR-012/SC-004.
14. On the same page, confirm the transfer appears in transfer history with date, source/destination Branch, items/quantities, performer, and status "completed" — AC US3-2/FR-012.

### US4 — Returns/refunds (P4)

15. While Smouha is active, complete a fresh POS sale of 2 units of a Product, noting the resulting Order/Invoice.
16. Open that Order and use **Return** to return 1 of the 2 units, with restock enabled, a refund method, and a reason → confirm there is no Branch picker, the refund subtotal/tax for that line equal exactly half of the original line's subtotal/tax, the Order's status becomes "partially returned", its remaining returnable quantity is 1, and Smouha's stock (the original Order Branch) increases by 1 while Nasr City is unaffected — AC US4-1/US4-2/FR-018/FR-019/SC-006/SC-007.
17. Confirm completing the return lands on a printable Return Receipt / Credit Note showing the business identity, Branch, cashier, original Order/Invoice references, returned items, refund method, tax refunded, total refunded, and the restock decision — AC US4-3/FR-022.
18. Open the original Invoice → confirm its original document is immutable: items, totals, discounts, tax, and sale amounts are unchanged, and it only shows a reference/link to the Return — AC US4-3/FR-021.
19. Return the remaining 1 unit, this time with restock **disabled** → confirm the Order's status becomes "returned", its remaining returnable quantity is 0, and Smouha's stock does **not** change for this second return — AC US4-1 (restock-disabled case)/FR-020.
20. Attempt another return against the same Order (now fully returned) → confirm it is rejected or capped with a clear message and no over-return is recorded — AC US4-4/FR-017.

### Reports — Gross / Returns / Net (US1 + US4)

21. Open Reports for Smouha → confirm **Gross Sales**, **Returns/Refunds**, and **Net Sales** are shown as three separate figures, and that for the fully-returned sale from steps 15-19, Net Sales has returned to its pre-sale value while Gross Sales and Returns remain visible — FR-023/SC-008.
22. Switch to Nasr City → confirm its Reports figures are unaffected by Smouha's return — AC US1-2/SC-002.

## Technical validation

Run from repo root after implementation:

```bash
pnpm --filter commerce exec tsc --noEmit
pnpm --filter commerce lint
pnpm --filter commerce build

pnpm --filter core-platform exec tsc --noEmit
pnpm --filter core-platform lint
pnpm --filter core-platform build

pnpm build
pnpm lint
```

All commands must pass cleanly. `core-platform` is included because `@nexoraxs/types`/`@nexoraxs/shared` are shared dependencies — its build must continue to succeed even though no Core Platform screens change in this feature.

## Success signal

The walkthrough above (steps 1-22) corresponds to the Acceptance Scenarios for User Stories 1-4 in spec.md (AC US1-1..3, US2-1..3, US3-1..3, US4-1..4) and to Edge Cases covering same-Branch transfer, insufficient-stock transfer, cross-Business rejection, restock-disabled returns, over-return capping, and cross-Branch order/invoice viewing. Completing it without dead ends, incorrect cross-Branch leakage, or stock/return arithmetic errors satisfies SC-001 through SC-009.
