# Phase 0 Research: Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP

## 1. Branch Inventory normalization & legacy `CommerceProduct.stock` fallback

**Decision**: Add a new `branchInventory: BranchInventoryRecord[]` collection (`STORAGE_KEYS.branchInventory`), one record per `(productId, branchId)`. Add a pure helper `effectiveStockFor(product, branchId, branchInventory)` in `packages/shared/src/mock-db/actions.ts` that returns `{ qty, lowStockThreshold, updatedAt, hasRecord }`: if a `BranchInventory` record exists for `(product.id, branchId)`, return it; otherwise return a *virtual* record derived from `product.stock`/`product.lowStockThreshold` (the legacy fields), with `hasRecord: false`. `AppProvider`'s `products` getter merges this effective stock back into each `CommerceProduct`'s `stock`/`lowStockThreshold` fields for the active Branch, so existing pages (Inventory, POS, Dashboard) that already read `p.stock`/`p.lowStockThreshold` keep working unchanged. A real `BranchInventory` record is only **persisted** the first time a stock-affecting action occurs for that `(productId, branchId)` pair (sale, return, transfer, or manual adjustment) — at that point the action writes a `BranchInventory` row seeded from the legacy/virtual value plus the delta, and appends a `StockMovement`. Read-only views never trigger a write.

**Rationale**: This satisfies AC US2-3 ("a Branch-specific stock record is created from the legacy value for that Branch... the first time it is accessed") while avoiding side-effects (writes) during render, which would violate React rules and risk write storms when multiple components read `products` in the same pass. Persisting on first *mutation* rather than first *read* is a strict reading of "accessed" that is safe and is indistinguishable to the user (the displayed value is identical either way, since the virtual fallback equals the legacy value before any mutation). Keeping `CommerceProduct.stock`/`lowStockThreshold` as the legacy/seed fields (rather than removing them) avoids a breaking change to `packages/types` consumers and to `seed.ts`.

**Alternatives considered**:
- *Eagerly materialize all `BranchInventory` rows for every (product, branch) pair on first load*: rejected — would require a migration step on every app load, complicates `loadState()`, and produces many rows for branches that never touch a given product.
- *Write a `BranchInventory` row inside a `useEffect` the first time a product/branch combination is read*: rejected — adds render-cycle complexity and risk of redundant writes/loops for marginal benefit over write-on-mutation.
- *Drop `CommerceProduct.stock`/`lowStockThreshold` entirely and require `BranchInventory` everywhere*: rejected — breaking change to `packages/types`/`seed.ts` beyond MVP scope, and FR-025/Article XVI favor additive, non-breaking shared-package changes.

## 2. `computeReturnTotals(originalOrder, returnItems)` design

**Decision**: Add `computeReturnTotals(originalOrder: CommerceOrder, returnItems: { productId: string; qty: number }[])` to `packages/shared/src/commerce/documents.ts`, alongside `computeDoc`. For each returned line, find the matching `OrderItem` in `originalOrder.items` (by `productId`/`id`), and pro-rate that item's *original* `price`, `taxable` flag, and per-line discount share by `returnQty / originalQty`. Reuse the same VAT-registered / prices-include-tax / discount-distribution branching logic already in `computeDoc`, applied to the original order's `vat`/`subtotal`/`discount`/`total` ratios rather than current `CommerceSetup`. Return shape mirrors `computeDoc`'s: `{ lines, subtotal, vat, total, rate }`, where `lines` carries `{ productId, name, qty, price, vat, total }` per returned item.

**Rationale**: FR-018 requires refund totals to use "the original Order's per-item prices and tax treatment at the time of sale — not current catalog prices or current tax settings", pro-rated correctly for partial returns, with rounding consistent with sales documents (Assumptions). Because `CommerceOrder` already stores `subtotal`, `vat`, `discount`, `total`, and the per-item `price`/`taxable`/`qty`, all the inputs needed for pro-ration are available on the order itself — no need to re-read `CommerceSetup` or re-run `computeDoc` against current settings.

**Alternatives considered**:
- *Re-run `computeDoc` against the current `CommerceSetup` for the returned items*: rejected — directly violates FR-018 ("not current catalog prices or current tax settings"); a later VAT-rate or price change would silently change refund amounts.
- *Store a full point-in-time snapshot of `computeDoc`'s line-level breakdown on every `CommerceOrder`*: rejected as unnecessary for MVP — `CommerceOrder.items[].price`/`taxable` plus the order-level `vat`/`subtotal`/`total` are sufficient to reconstruct per-line tax pro-ration deterministically.

## 3. Branch-scoping strategy for Dashboard/Orders/Invoices/Inventory/Reports/POS

**Decision**: In `AppProvider`, the `orders`/`invoices` getters (currently filtered only by `businessUnitId === currentBusinessUnitId`) add a second filter `branchId === currentBranchId` for the values exposed as `orders`/`invoices` (used by default list/dashboard/report views). The full, business-scoped-but-not-branch-filtered collections remain available internally (and via a new `findOrderById`/`findInvoiceById`-style accessor, or simply by reading `state.orders`/`state.invoices` directly inside `[id]` pages) so that `/orders/[id]` and `/invoices/[id]` can resolve an order/invoice from another Branch and render it with an explicit Branch label, per FR-009/Edge Cases. `customers` remains scoped only to `businessUnitId` (unchanged) — the spec's branch-scoping list (FR-004/FR-009) is Dashboard, Orders, Invoices, Inventory, Reports, POS, and does not include Customers, which can reasonably be shared across a Business's Branches.

**Rationale**: This is the smallest change that satisfies SC-002 ("every branch-aware screen... shows only that Branch's data, with zero records from other Branches appearing in default list views") while preserving AC US1-3 (an Order from another Branch can still be opened directly and is clearly labeled). Keeping the filter inside `AppProvider`'s memoized getters means every page that already calls `useApp().orders`/`.invoices` is automatically branch-scoped with no per-page changes beyond adding a Branch column/label where useful.

**Alternatives considered**:
- *Filter in each page component instead of `AppProvider`*: rejected — duplicates the `branchId === currentBranchId` check across 6+ pages and risks a page being missed (violates SC-002's "zero records" guarantee).
- *Branch-scope `customers` too*: rejected — not required by FR-004/FR-009, and would force re-creating a customer per Branch for what is conceptually one Business-wide customer base; out of scope for this MVP.

## 4. Stock Movement ledger schema & reason taxonomy

**Decision**: Add `StockMovement { id, workspaceId, businessUnitId, branchId, productId, qtyChange, reason, reference: { type: "order" | "return" | "transfer" | "adjustment"; id: string }, performedBy, performedByName, createdAt }` and `STORAGE_KEYS.stockMovements`. `reason` is one of `"sale" | "return" | "transfer_out" | "transfer_in" | "adjustment"`. A pure builder `buildStockMovement(...)` in `actions.ts` constructs a record (using `uid("sm")`/`nowISO()`); `AppProvider` appends to `stockMovements` (read-only, append-only — no update/delete actions are exposed) whenever `createOrder`, `createReturn`, `transferStock`, or `adjustStock` change a `BranchInventory.qty`.

**Rationale**: FR-010 requires an append-only ledger entry "for every stock-affecting event (sale, return, transfer out, transfer in, manual adjustment)... including the Branch, Product, quantity change, reason/reference, and who performed it". A single flat collection with a `reason` enum and a polymorphic `reference` (pointing back to the Order/Return/Transfer/adjustment that caused it) is the simplest structure that supports both the transfer-history view (FR-012) and any future "stock history" UI, and matches the existing flat-collection + `STORAGE_KEYS` pattern used by `orders`/`invoices`/`products`.

**Alternatives considered**:
- *Separate ledger tables per reason (sales ledger, transfer ledger, etc.)*: rejected — unnecessary duplication; a single table with `reason`/`reference` is sufficient and keeps `clearAllStorage`/seed logic uniform.
- *Compute "transfer history" purely from `StockTransfer` records without a `StockMovement` ledger*: rejected — FR-010 explicitly requires the ledger independent of `StockTransfer`, and the ledger is also needed for sale/return/adjustment events that have no `StockTransfer` record.

## 5. Stock Transfer action, validation, and UX placement

**Decision**: Add `StockTransfer { id, transferNumber, workspaceId, businessUnitId, fromBranchId, toBranchId, items: { productId, name, qty }[], performedBy, performedByName, status: "completed", note?, createdAt }` and `STORAGE_KEYS.stockTransfers`. Add `transferStock(data: { toBranchId: string; items: { productId: string; qty: number }[]; note?: string }): { ok: true; transfer: StockTransfer } | { ok: false; error: string }` to `AppProvider`, operating from `currentBranchId` as the source. Validation order: (a) `toBranchId !== currentBranchId` (FR-014), (b) `toBranchId` belongs to the same `businessUnitId` (FR-015), (c) for every item, `qty` is a positive integer and `effectiveStockFor(product, currentBranchId).qty >= qty` (FR-013, Edge Case "zero, negative, or non-numeric quantity"). On success, atomically: decrement source `BranchInventory.qty`, increment/create destination `BranchInventory.qty`, append one `transfer_out` and one `transfer_in` `StockMovement`, and append the `StockTransfer` record. UI: a new `apps/commerce/app/(commerce)/inventory/transfers/page.tsx` route, linked from the Inventory page, containing a "New Transfer" form (destination Branch + product/qty picker, single confirm button) and a transfer-history table reading `stockTransfers`.

**Rationale**: FR-011 through FR-015 and AC US3-1..3 specify exactly this validation order and "single confirmation step" (SC-004/SC-005). Placing the feature under `/inventory/transfers` keeps it discoverable from the screen operators already use to manage stock, without adding a new top-level nav item, consistent with MVP-discipline (Article XV) of not over-expanding navigation.

**Alternatives considered**:
- *New top-level "Transfers" nav item*: rejected for MVP — Inventory is the natural home and the spec does not require new top-level navigation; can be promoted later if usage warrants.
- *Allow multi-step/approval transfers*: explicitly out of scope (FR-011, "Out of Scope").

## 6. Return/Refund action, restock behavior, and document route

**Decision**: Add `CommerceReturn { id, returnNumber, workspaceId, businessUnitId, branchId, orderId, invoiceId, items: { productId, name, qty, price, taxable }[], reason, refundMethod: "cash" | "card" | "wallet" | "original", restock: boolean, subtotal, vat, total, cashierId, cashierName, createdAt }` and `STORAGE_KEYS.commerceReturns`. Add `createReturn(data: { orderId: string; items: { productId: string; qty: number }[]; reason: string; refundMethod: CommerceReturn["refundMethod"]; restock: boolean }): { ok: true; return: CommerceReturn } | { ok: false; error: string }`. Validation: order exists and belongs to the active Workspace+Business (Edge Case — cross-business returns rejected); for each item, `qty <= (originally sold qty - already returned qty)` (FR-017). On success: compute totals via `computeReturnTotals` (Research #2); if `restock`, increment `BranchInventory.qty` for `order.branchId` and append a `return` `StockMovement` per item; always update the `CommerceOrder.returnStatus` (`"partial"` if any returnable qty remains, else `"returned"`), `returnedTotal`, and `returnIds`, and append the new return's id to the matching `CommerceInvoice.returnIds` — without modifying the invoice's existing items/totals (FR-021). UI: the return is initiated from `/orders/[id]` (a "Return" action opens a modal listing returnable items/qtys, reason, refund method, and a restock toggle); on success the user is routed to a new `apps/commerce/app/(commerce)/returns/[id]/document/page.tsx`, a printable Return Receipt / Credit Note following the same layout conventions as `/invoices/[id]/document` (business identity, Branch, cashier, original Order/Invoice references, returned items, refund method, tax refunded, total refunded, restock decision, reason/note — FR-022).

**Rationale**: This directly implements FR-016 through FR-022 and AC US4-1..4. Initiating from the Order detail page (rather than a separate "Returns" search/list page) matches the Independent Test framing ("Complete a sale... then return that item") and avoids adding a new top-level list page beyond what FR-022 strictly requires (a viewable/printable return document, reachable via a link from the Invoice per AC US4-3).

**Alternatives considered**:
- *Allow restocking to a Branch other than the Order's Branch*: the spec allows this only "if the return flow explicitly supports choosing one" (FR-019); MVP keeps restock targeted at `order.branchId` only, since no acceptance scenario requires cross-branch restock and adding a Branch picker would expand scope without a tested requirement.
- *Modify the original Invoice's totals/items to reflect the return*: explicitly forbidden by FR-021.
- *Add a dedicated `/returns` list/search page*: deferred — not required by any FR/AC; the return document is reachable from the Order/Invoice it originated from, which is sufficient for MVP.

## 7. Reports/Dashboard: Gross Sales, Returns, and Net Sales per Branch

**Decision**: Add `nxReturnsForPeriod(returns: CommerceReturn[], period)` (mirrors `nxOrdersForPeriod`) and `nxNetSales(periodOrders, periodReturns)` to `packages/shared/src/mock-db/selectors.ts`, returning `{ gross, returns, net, vat, vatRefunded, count }` where `gross`/`vat`/`count` come from `nxRevenue(periodOrders)` (unchanged), `returns`/`vatRefunded` are summed `total`/`vat` from `periodReturns`, and `net = gross - returns`. Both Dashboard and Reports call these with the already-branch-scoped `orders` and a new branch-scoped `commerceReturns` from `AppProvider`, and render "Gross Sales", "Returns/Refunds", and "Net Sales" as separate figures (FR-023).

**Rationale**: FR-023 explicitly allows either "Net Sales (gross sales minus completed returns) alongside Gross Sales and Returns/Refunds, or... clearly separating gross sales from returns" — showing all three reuses the existing `nxRevenue`/`nxOrdersForPeriod` machinery with one small additive selector pair, satisfying SC-008 (a fully-refunded sale returns Net Sales to its pre-sale value while Gross/Returns remain visible).

**Alternatives considered**:
- *Mutate `nxRevenue` to subtract returns internally*: rejected — `nxRevenue` is used elsewhere (e.g., Dashboard "Sales today" KPI) where Gross is still meaningful on its own; an additive selector avoids changing `nxRevenue`'s existing contract/return shape.

## 8. Localization additions (en/ar)

**Decision**: Add new keys to `DICT.en`/`DICT.ar` in `packages/shared/src/mock-db/schema.ts` for: `branch_inventory`, `stock_transfer`, `transfer_history`, `new_transfer`, `from_branch`, `to_branch`, `return`, `returns`, `process_return`, `restock`, `restocked`, `not_restocked`, `refund_method`, `return_receipt`, `credit_note`, `gross_sales`, `net_sales` (already present per memory — verify and reuse), `returns_refunds`, `return_status`, `partially_returned`, `returned`, `remaining_returnable`, `transfer_rejected`, `return_rejected`, plus any short validation-message keys needed by the new actions. All new pages/components call `t(key)` via the existing `useApp().t` for these labels.

**Rationale**: FR-024/Article XI require every new user-facing string to be available in `en`/`ar` via the existing `t()`/`DICT` mechanism; centralizing additions in `schema.ts` keeps the single source of truth consistent with how `branch`/`business_unit`/`cashier` etc. were added in Phase 2.

**Alternatives considered**:
- *Inline English strings with a follow-up localization pass*: rejected — Article XI forbids hardcoding new user-facing strings without a translation path, and Phase 2 already established the pattern of adding both languages in the same change.

## 9. Demo/seed data for multi-branch testing

**Decision**: Do not change `seedDB()`'s entity counts or shapes. The existing single-Branch seed (`Smouha Branch`, 2 products with legacy `stock`) continues to work unchanged (Research #1's fallback ensures `BranchInventory` is derived correctly for it). Multi-Branch testing (transfers, branch-isolated reports, returns across Branches) relies on the **already-shipped** `addBranch` action (Phase 2, `apps/commerce/app/(commerce)/settings/page.tsx`) for an operator to create a second Branch (e.g., "Nasr City") under the existing Business, after which the normalization in Research #1 creates that Branch's first `BranchInventory` records on first stock-affecting action.

**Rationale**: Avoids scope creep into `seed.ts`/demo-data design, keeps the existing single-Branch demo flow (Phase 2/043) unchanged, and exercises the real "add a second Branch then operate multi-branch" path a real user would take — which is also exactly `quickstart.md`'s walkthrough precondition.

**Alternatives considered**:
- *Seed a second Branch with split stock by default*: rejected — would change the out-of-the-box single-Branch experience validated in 043/Phase 2 and isn't necessary since `addBranch` already exists.

---

**Output**: All Technical Context items resolved; no remaining unknowns. Proceeding to Phase 1.
