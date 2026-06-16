---

description: "Task list for Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP"
---

# Tasks: Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP

**Input**: Design documents from `/specs/044-commerce-relationships-branches-transfers-returns/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in the spec (no automated test runner is configured for these Next.js apps — see plan.md Technical Context). Validation is via `tsc --noEmit`/`lint`/`build` plus the manual quickstart.md walkthrough; no test tasks are generated.

**Organization**: Tasks are grouped by user story (from spec.md, in priority order P1 → P4) so each can be implemented and demoed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 / US4 — maps to the user stories in spec.md
- File paths are exact and relative to the repository root

## Path Conventions

This is the existing pnpm + Turborepo monorepo (no new projects created):
- `apps/commerce/` — Commerce OS (port 3002), the only app whose pages change in this feature
- `packages/types/`, `packages/shared/` — shared internal packages (`@nexoraxs/types`, `@nexoraxs/shared`)
- `apps/core-platform/` — Core Platform (port 3001), unaffected but must continue to build against the shared packages

---

## Phase 1: Setup

**Purpose**: Establish a clean, verified starting point — no new project scaffolding is needed (existing monorepo).

- [ ] T001 [P] Confirm the baseline compiles cleanly before changes: run `pnpm --filter commerce exec tsc --noEmit`, `pnpm --filter commerce lint`, `pnpm --filter core-platform exec tsc --noEmit`, `pnpm --filter core-platform lint`; record any pre-existing failures so they aren't mistaken for regressions later
- [ ] T002 In a browser, confirm the seeded demo workspace state ("Mustafa Pharmacy" Business, single "Smouha Branch", 2 Products with legacy `stock`/`lowStockThreshold`) — this is the precondition `quickstart.md` step 2 builds on (adding a second Branch via Settings → Branches → Add Branch)

**Checkpoint**: Clean baseline confirmed; ready to add foundational infrastructure.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: New shared types, storage keys, i18n strings, and pure helpers/selectors that User Stories 1-4 all depend on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T003 [P] In `packages/types/src/commerce.ts`, add `BranchInventory`, `StockMovementReason`, `StockMovement`, `StockTransfer`, `CommerceReturnItem`, `RefundMethod`, and `CommerceReturn` interfaces, and add optional `returnStatus?: "none" | "partial" | "returned"`, `returnedTotal?: number`, `returnIds?: string[]` to `CommerceOrder` and optional `returnIds?: string[]` to `CommerceInvoice`, exactly per `data-model.md` and `contracts/shared-mock-db-contract.md` §A; re-export the new types from `packages/types/src/index.ts`
- [ ] T004 [P] In `packages/shared/src/mock-db/schema.ts`: add `STORAGE_KEYS.branchInventory = "nexoraxs.db.branchInventory"`, `.stockMovements = "nexoraxs.db.stockMovements"`, `.stockTransfers = "nexoraxs.db.stockTransfers"`, `.commerceReturns = "nexoraxs.db.commerceReturns"`; add new `en`/`ar` `DICT` entries: `branch_inventory`, `stock_transfer`, `transfer_history`, `new_transfer`, `from_branch`, `to_branch`, `return`, `returns`, `process_return`, `restock`, `restocked`, `not_restocked`, `refund_method`, `return_receipt`, `credit_note`, `returns_refunds`, `return_status`, `partially_returned`, `returned`, `remaining_returnable`, `transfer_rejected`, `return_rejected`, `insufficient_stock`, `select_branch` (contracts §B; reuse the existing `gross_sales`/`net_sales` keys as-is)
- [ ] T005 [P] In `packages/shared/src/mock-db/actions.ts`, add the pure helper `effectiveStockFor(product, branchId, branchInventory)` returning `{ qty, lowStockThreshold, updatedAt, hasRecord }` — returns the matching `BranchInventory` record if one exists (`hasRecord: true`), else a virtual record derived from `product.stock`/`product.lowStockThreshold` (`hasRecord: false`) for display/read fallback only; this helper must not persist anything on read/access, per data-model.md "New Entity: BranchInventory" lifecycle and research.md §1
- [ ] T006 [P] In `packages/shared/src/mock-db/actions.ts`, add pure factories `buildStockMovement(input)` (`uid("sm")`/`nowISO()`), `buildStockTransfer(input)` (`uid("st")`/`nowISO()`), and `buildCommerceReturn(input)` (`uid("ret")`/`nowISO()`), matching the signatures in `contracts/shared-mock-db-contract.md` §B (no `localStorage` access — pure calculation/factory functions only)
- [ ] T007 [P] In `packages/shared/src/commerce/documents.ts`, add `computeReturnTotals(originalOrder, returnItems)` mirroring `computeDoc`'s rounding/tax-pro-ration logic but driven entirely by `originalOrder`'s stored `items`/`subtotal`/`vat`/`discount`/`total` (never current `CommerceSetup`), per research.md §2; re-export it from `packages/shared/src/mock-db/selectors.ts` alongside the existing `computeDoc`/`fmtDate` re-exports
- [ ] T008 [P] In `packages/shared/src/mock-db/selectors.ts`, add pure selectors `nxBranchInventoryMap(branchInventory, branchId)`, `nxReturnsForPeriod(returns, period, now?)` (mirrors `nxOrdersForPeriod`), and `nxNetSales(periodOrders, periodReturns)` returning `{ gross, returns, net, vat, vatRefunded, count }`, per research.md §7 and contracts §B
- [ ] T009 Update `packages/shared/src/mock-db/index.ts` to re-export all new types/factories/selectors from T003-T008, and update `apps/commerce/lib/store/index.ts` to re-export the same set for page consumption (contracts §A/§B; pages must continue to import only via `@/lib/store`, never `@nexoraxs/shared` directly)
- [ ] T010 In `apps/commerce/lib/store/AppProvider.tsx`, load and persist the four new collections (`branchInventory`, `stockMovements`, `stockTransfers`, `commerceReturns`) via `readCollection`/`writeCollection` using the `STORAGE_KEYS` from T004, and expose them (default `[]`) on `AppContextType`/the provider value — no story-specific behavior yet; `clearAllStorage()` already covers the new keys automatically (it iterates `Object.values(STORAGE_KEYS)`)

**Checkpoint**: Shared types, storage keys, i18n strings, and pure helpers/selectors are in place; `AppProvider` exposes the new (empty) collections — ready for story-specific logic.

---

## Phase 3: User Story 1 - Manager/operator views branch-scoped commerce data (Priority: P1) 🎯 MVP

**Goal**: The Dashboard, Orders, Invoices, and Reports default to the active Branch's data; an Order/Invoice from another Branch can still be opened directly with a clear Branch label, but never appears in the active Branch's default lists.

**Independent Test**: With a Business that has two Branches, complete a sale at each Branch, then switch the active Branch back and forth and confirm the Dashboard, Orders, Invoices, and Reports each show only the active Branch's sale.

### Implementation for User Story 1

- [ ] T011 [US1] In `apps/commerce/lib/store/AppProvider.tsx`, add a `branchId === state.currentBranchId` filter to the `orders` and `invoices` `useMemo` getters (currently `apps/commerce/lib/store/AppProvider.tsx:467-468`, filtered only by `businessUnitId`), in addition to the existing `businessUnitId` filter; keep `state.orders`/`state.invoices` (full, business-scoped, not branch-filtered) accessible for direct-by-id resolution by detail pages (research.md §3, FR-004/FR-009)
- [ ] T012 [P] [US1] `apps/commerce/app/(commerce)/dashboard/page.tsx` — confirm "sales today", recent orders/invoices, and low-stock figures now reflect only the active Branch via T011, and add a clear "Branch: {currentBranch.name}" indicator near the page heading/KPIs (FR-004, AC US1-1)
- [ ] T013 [P] [US1] `apps/commerce/app/(commerce)/orders/page.tsx` — confirm the list shows only the active Branch's orders via T011 (no other changes needed; remove any now-redundant manual branch filter if one exists) (FR-009, AC US1-1)
- [ ] T014 [US1] `apps/commerce/app/(commerce)/orders/[id]/page.tsx` — resolve the order from `state.orders` (full, business-scoped, not the branch-filtered `orders` getter) so an order from another Branch can still be opened directly; render a "Branch: {name}" label whenever `order.branchId !== state.currentBranchId` (FR-009, AC US1-3)
- [ ] T015 [P] [US1] `apps/commerce/app/(commerce)/invoices/page.tsx` — confirm the list shows only the active Branch's invoices via T011 (FR-009, AC US1-1)
- [ ] T016 [P] [US1] `apps/commerce/app/(commerce)/invoices/[id]/page.tsx` — resolve the invoice from `state.invoices` (full, business-scoped); render a "Branch: {name}" label whenever `invoice.branchId !== state.currentBranchId` (FR-009)
- [ ] T017 [US1] `apps/commerce/app/(commerce)/reports/page.tsx` — confirm sales totals, best sellers, and group-sales charts derive from the now branch-scoped `orders` via T011, and add a clear "Reports — {currentBranch.name}" heading/indicator (FR-004, AC US1-2)

**Checkpoint**: User Story 1 is fully functional and independently demoable — switching the active Branch shows correctly isolated Dashboard/Orders/Invoices/Reports, and cross-Branch direct links are clearly labeled.

---

## Phase 4: User Story 2 - Operator manages branch-specific stock for a shared product catalog (Priority: P2)

**Goal**: Each Product is shared once per Business but has its own stock quantity per Branch; legacy single-stock Products display through a virtual fallback on read and are normalized into a Branch-specific record only on first mutation without affecting other Branches; POS sales deduct only the active Branch's stock.

**Independent Test**: Create a Product under a Business, set its stock to 10 at one Branch and 3 at another, then switch the active Branch and verify POS and Inventory show 10/3 respectively, and that a sale at one Branch does not change the other Branch's number.

### Implementation for User Story 2

- [ ] T018 [US2] In `apps/commerce/lib/store/AppProvider.tsx`, add an `adjustStock(data: { productId, branchId?, qty, lowStockThreshold? })` action: resolve the current effective record via `effectiveStockFor(product, branchId ?? state.currentBranchId, state.branchInventory)`, write/create the corresponding `BranchInventory` row with the new `qty`/`lowStockThreshold` via `writeCollection(STORAGE_KEYS.branchInventory, ...)`, and append one `adjustment` `StockMovement` (via `buildStockMovement`, `qtyChange = newQty - previousQty`) to `STORAGE_KEYS.stockMovements` (data-model.md "BranchInventory"/"StockMovement", contracts §C)
- [ ] T019 [US2] In `apps/commerce/lib/store/AppProvider.tsx`, update the `products` `useMemo` getter (`apps/commerce/lib/store/AppProvider.tsx:466`) so each returned `CommerceProduct`'s `stock`/`lowStockThreshold` are overridden with the branch-effective values from `effectiveStockFor(product, state.currentBranchId, state.branchInventory)` — signature/shape unchanged, fully backward compatible, and no `BranchInventory` write occurs from this read path (research.md §1, AC US2-1/US2-3)
- [ ] T020 [US2] In `apps/commerce/lib/store/AppProvider.tsx`, update `createOrder` (`apps/commerce/lib/store/AppProvider.tsx:718-735`) so that for each sold `OrderItem`, it resolves/seeds a `BranchInventory` row for `(productId, order.branchId)` via `effectiveStockFor`, decrements its `qty` by the sold quantity, persists `STORAGE_KEYS.branchInventory`, and appends one `sale` `StockMovement` per item via `buildStockMovement` to `STORAGE_KEYS.stockMovements`; this is the only POS sale stock-deduction path and must happen exactly once inside `createOrder`/`AppProvider` (FR-007, AC US2-2/SC-003)
- [ ] T021 [P] [US2] `apps/commerce/app/(commerce)/inventory/page.tsx` — replace the direct `updateProduct(editing.id, { stock: +newStock })` call (`apps/commerce/app/(commerce)/inventory/page.tsx:25`) with `adjustStock({ productId: editing.id, qty: +newStock, lowStockThreshold: ... })`; confirm displayed stock/low-stock badges reflect the active Branch's effective stock from T019 (FR-006, AC US2-1)
- [ ] T022 [P] [US2] `apps/commerce/app/(commerce)/pos/page.tsx` — remove the direct `updateProduct(ci.id, { stock: Math.max(0, prod.stock - ci.qty) })` loop in `completeSale()` (`apps/commerce/app/(commerce)/pos/page.tsx:80`), since T020 now handles stock deduction exactly once inside `createOrder`; the POS page must not perform any post-`createOrder` stock mutation, and cart/grid stock badges should reflect the active Branch's effective stock from T019 (FR-007, AC US2-2)

**Checkpoint**: User Stories 1 AND 2 both work independently — per-Branch stock displays/edits correctly, sales deduct only the active Branch's stock, and legacy Products normalize into `BranchInventory` on first mutation.

---

## Phase 5: User Story 3 - Operator transfers stock between branches (Priority: P3)

**Goal**: An operator can move a specified quantity of a Product's stock from the active Branch to another Branch in the same Business in a single confirmation step, with validation against same-Branch, cross-Business, and insufficient-stock attempts, and a visible transfer history.

**Independent Test**: With one Branch holding 10 units and another holding 3 units of a Product, transfer 2 units between them, then confirm the source shows 8, the destination shows 5, and a transfer history entry records the move.

### Implementation for User Story 3

- [ ] T023 [US3] In `apps/commerce/lib/store/AppProvider.tsx`, add a `transferStock(data: { toBranchId, items, note? })` action implementing the validation order from `contracts/shared-mock-db-contract.md` §C: (1) reject if `toBranchId === state.currentBranchId` → `{ ok: false, error: "transfer_rejected" }`; (2) reject if `toBranchId`'s Branch does not have `businessUnitId === state.currentBusinessUnitId` → `{ ok: false, error: "transfer_rejected" }`; (3) for every item, reject if `qty` is not a positive integer or `effectiveStockFor(product, state.currentBranchId, state.branchInventory).qty < qty` → `{ ok: false, error: "insufficient_stock" }`; on success, update both Branches' `BranchInventory` rows, append one `transfer_out` + one `transfer_in` `StockMovement` per item via `buildStockMovement`, and persist a new `StockTransfer` via `buildStockTransfer` with a sequential `transferNumber` (e.g., `TRF-0001`) (FR-011-FR-015, data-model.md "StockTransfer")
- [ ] T024 [US3] Create `apps/commerce/app/(commerce)/inventory/transfers/page.tsx` — a "New Transfer" form (read-only source = `currentBranch.name`, destination Branch picker excluding `currentBranchId` from `BRANCHES`, product/quantity picker sourced from active-Branch `products`, optional note, single confirm button calling `transferStock`) and a transfer-history table reading `stockTransfers` (date, source/destination Branch names, items/quantities, performer, status), surfacing `t("transfer_rejected")`/`t("insufficient_stock")` toasts on failure; do not add this route to the top-level Commerce nav (FR-011/FR-012/FR-026, AC US3-1/US3-2/US3-3, SC-004/SC-005)
- [ ] T025 [P] [US3] `apps/commerce/app/(commerce)/inventory/page.tsx` — add a "Stock Transfer" link/button to `/inventory/transfers`; this Inventory link is the only MVP navigation entry point for transfers (research.md §5, FR-026)

**Checkpoint**: User Story 3 works independently — an operator can transfer stock between Branches in one step with full validation and a visible, traceable history.

---

## Phase 6: User Story 4 - Cashier processes a return for a completed sale (Priority: P4)

**Goal**: A cashier can record a full or partial Return against a completed Order, with refund totals computed from the original sale's prices/tax, optional restocking of the Order's Branch, an unchanged original Invoice with a linked Return reference, a printable Return Receipt/Credit Note, and Reports/Dashboard showing Gross Sales, Returns, and Net Sales.

**Independent Test**: Complete a sale of one Product, then return that item with restock enabled; verify the refund total matches the original sale's price/tax, the Branch's stock increases by the returned quantity, the Order shows a "returned" status, and a return receipt is available.

### Implementation for User Story 4

- [ ] T026 [US4] In `apps/commerce/lib/store/AppProvider.tsx`, add a `createReturn(data: { orderId, items, reason, refundMethod, restock })` action implementing `contracts/shared-mock-db-contract.md` §C: (1) resolve `orderId` from `state.orders`/`readCollection(STORAGE_KEYS.orders)` and reject with `{ ok: false, error: "return_rejected" }` unless `workspaceId === currentWorkspaceId && businessUnitId === currentBusinessUnitId`; (2) for every item, reject unless `qty <= (sold qty - already-returned qty)` for that `productId` on this order; (3) compute totals via `computeReturnTotals(order, items)` and build the record via `buildCommerceReturn` with `branchId = order.branchId` and a sequential `returnNumber` (e.g., `RET-0001`); (4) if `restock`, update the `BranchInventory` row for `(productId, order.branchId)` per item and append one `return` `StockMovement` per item; (5) update `order.returnStatus` (`"partial"` if any returnable qty remains else `"returned"`), `order.returnedTotal`, `order.returnIds`; (6) append the new return's id to the matching `CommerceInvoice.returnIds` without altering its items/totals/document amounts (FR-016-FR-021, data-model.md "CommerceReturn")
- [ ] T027 [US4] `apps/commerce/app/(commerce)/orders/[id]/page.tsx` — add a "Return" action opening a modal listing returnable items/quantities (sold minus already-returned, computed from `order.items` and `order.returnIds` → `commerceReturns`), a reason field, a refund-method select, and a restock toggle; do not add a Branch picker because MVP returns are scoped to the original Order Branch; on `createReturn` success navigate to `/returns/[id]/document`; render a return-status badge (`none`/`partial`/`returned`) and each item's remaining returnable quantity (FR-016/FR-017/FR-019, AC US4-1/US4-2/US4-4)
- [ ] T028 [US4] Create `apps/commerce/app/(commerce)/returns/[id]/document/page.tsx` — a printable Return Receipt/Credit Note mirroring `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx`'s layout and print classes (`.nx-invoice`/`.nx-print-hide`-equivalent), showing business identity, Branch, cashier, customer (if any), original Order/Invoice references, return number, date/time, returned items/quantities, refund method, tax refunded, total refunded, and the restock decision (FR-022, AC US4-3)
- [ ] T029 [P] [US4] `apps/commerce/app/(commerce)/invoices/[id]/page.tsx` and `apps/commerce/app/(commerce)/invoices/[id]/document/page.tsx` — when `invoice.returnIds` is non-empty, render a "Return issued" reference linking to `/returns/[id]/document`, while keeping the original invoice document immutable: never alter its items, totals, discounts, tax, or sale amounts (FR-021, AC US4-3)
- [ ] T030 [P] [US4] `apps/commerce/app/(commerce)/dashboard/page.tsx` and `apps/commerce/app/(commerce)/reports/page.tsx` — add "Gross Sales", "Returns/Refunds", and "Net Sales" figures using `nxRevenue`, `nxReturnsForPeriod`, and `nxNetSales` over the branch-scoped `orders`/`commerceReturns` from T011/T010 (FR-023, SC-008)

**Checkpoint**: All four user stories are independently functional — the full sell → transfer → return loop works end-to-end, scoped per Branch, with accurate refund math and reporting.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final checks that span multiple stories — localization, storage reset, full walkthrough validation.

- [ ] T031 [P] Verify every new string added in T004 renders correctly in both `en` and `ar` (RTL-ready) across `/inventory/transfers`, the Return modal, `/returns/[id]/document`, and the Dashboard/Reports Gross/Returns/Net figures (FR-024, Article XI)
- [ ] T032 [P] Confirm the demo "reset" / `clearAllStorage()` clears `branchInventory`, `stockMovements`, `stockTransfers`, and `commerceReturns` (automatic via `Object.values(STORAGE_KEYS)` once T004 lands) and that a freshly reset workspace re-seeds correctly with no per-Branch records
- [ ] T033 Run the full `specs/044-commerce-relationships-branches-transfers-returns/quickstart.md` walkthrough end-to-end (steps 1-22) and confirm every Acceptance Scenario (AC US1-1..3, US2-1..3, US3-1..3, US4-1..4) and every Edge Case in spec.md passes
- [ ] T034 Run the validation command suite from quickstart.md — `pnpm --filter commerce exec tsc --noEmit`/`lint`/`build`, `pnpm --filter core-platform exec tsc --noEmit`/`lint`/`build`, root `pnpm build`/`pnpm lint` — and resolve any failures

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS all user stories — every story reads/writes the new types, `STORAGE_KEYS`, `DICT` entries, and pure helpers/selectors added here
- **User Story 1 (Phase 3)**: Depends on Foundational only — delivers the branch-scoping MVP
- **User Story 2 (Phase 4)**: Depends on Foundational; in practice builds on US1's branch-context conventions, so sequenced after US1
- **User Story 3 (Phase 5)**: Depends on Foundational + US2 (`BranchInventory`/`effectiveStockFor`/`adjustStock` from T018-T020 are prerequisites for `transferStock`)
- **User Story 4 (Phase 6)**: Depends on Foundational + US1 (branch-scoped `orders`) + US2 (`BranchInventory` for restock)
- **Polish (Phase 7)**: Depends on the user stories you choose to complete (T033/T034 require all four for the full walkthrough; T031/T032 can start once their relevant story work lands)

### Within Each User Story

- US1: T011 (provider filter) before T012-T017 (pages that consume the now-filtered `orders`/`invoices`)
- US2: T018 (`adjustStock`) and T019 (`products` getter merge) before T021 (Inventory edit UI); T019 and T020 (`createOrder` stock deduction) before T022 (POS deduction removal)
- US3: T023 (`transferStock` action) before T024 (Transfer page that calls it); T025 is independent once T024 exists
- US4: T026 (`createReturn` action) before T027 (Return modal) and T028 (Return document); T029/T030 are independent once T026/T011 land

### Parallel Opportunities

- All Setup tasks marked [P] (T001) can run alongside T002
- All Foundational tasks marked [P] (T003-T008) touch different files/sections and can run in parallel; T009/T010 follow once T003-T008 land
- Within US1: T012, T013, T015, T016 are [P] once T011 lands; T014/T017 are sequential per-page updates
- Within US2: T021 and T022 are [P] once T018-T020 land
- Within US3: T025 is [P] once T024 exists
- Within US4: T029 and T030 are [P] once T026/T011 land

---

## Parallel Example: Phase 2 (Foundational)

```bash
# These touch different files/sections of packages/types and packages/shared — run together:
Task: "Add BranchInventory/StockMovement/StockTransfer/CommerceReturn types to packages/types/src/commerce.ts"
Task: "Add STORAGE_KEYS + i18n dictionary entries to packages/shared/src/mock-db/schema.ts"
Task: "Add effectiveStockFor to packages/shared/src/mock-db/actions.ts"
Task: "Add buildStockMovement/buildStockTransfer/buildCommerceReturn to packages/shared/src/mock-db/actions.ts"
Task: "Add computeReturnTotals to packages/shared/src/commerce/documents.ts"
Task: "Add nxBranchInventoryMap/nxReturnsForPeriod/nxNetSales to packages/shared/src/mock-db/selectors.ts"
```

## Parallel Example: User Story 1

```bash
# Independent page-level updates that don't block each other once T011 lands:
Task: "Add Branch indicator to apps/commerce/app/(commerce)/dashboard/page.tsx"
Task: "Verify Orders list scoping in apps/commerce/app/(commerce)/orders/page.tsx"
Task: "Verify Invoices list scoping in apps/commerce/app/(commerce)/invoices/page.tsx"
Task: "Add Branch label to apps/commerce/app/(commerce)/invoices/[id]/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational) — shared types/helpers/selectors ready
2. Complete Phase 3 (User Story 1) — branch-scoped Dashboard/Orders/Invoices/Reports
3. **STOP and VALIDATE**: Walk through quickstart.md steps 1-6 independently; confirm SC-001/SC-002
4. This alone is demoable as "each Branch sees only its own activity"

### Incremental Delivery

1. Setup + Foundational → infrastructure ready
2. Add User Story 1 → validate independently → demoable (branch-scoped views)
3. Add User Story 2 → validate independently → demoable (per-Branch inventory)
4. Add User Story 3 → validate independently → demoable (stock transfers)
5. Add User Story 4 → validate independently → demoable (returns + Net Sales)
6. Phase 7 polish → final cross-cutting validation

### Solo-Implementer Strategy (Recommended Here)

Given the data dependencies between stories (US3 needs `BranchInventory` from US2; US4 needs branch-scoped Orders from US1 and `BranchInventory` from US2), implement and validate sequentially in priority order — US1 → US2 → US3 → US4 — using each story's own output (a second Branch, per-Branch stock, a transfer) as setup for the next, then finish with Phase 7.

---

## Notes

- [P] tasks touch different files (or clearly separable sections of the same shared file) and have no completed-task dependency between them
- [Story] labels (US1/US2/US3/US4) trace every implementation task back to its spec.md user story and FR references
- T011, T019, T020 are the three "core" `AppProvider.tsx` changes that the rest of the feature builds on — get these reviewed/working first within their respective stories
- Two concrete, already-identified gaps to close: (1) `apps/commerce/app/(commerce)/pos/page.tsx:80` calls `updateProduct(ci.id, { stock: ... })` directly; remove it so POS stock deduction happens exactly once inside `createOrder`/`AppProvider` through `BranchInventory` (T020/T022); (2) `apps/commerce/app/(commerce)/inventory/page.tsx:25` calls `updateProduct(editing.id, { stock: +newStock })` directly instead of `adjustStock` (T021)
- Commit after each task or logical group; stop at any checkpoint to validate a story independently before moving on
- Avoid: page-level storage access, duplicated tax/rounding logic outside `computeDoc`/`computeReturnTotals`, and any cross-app imports — all such logic belongs in `@nexoraxs/shared` per the constitution
