# Feature Specification: Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP

**Feature Branch**: `044-commerce-relationships-branches-transfers-returns`
**Created**: 2026-06-10
**Status**: Draft
**Input**: User description: "Stabilize the Commerce OS Workspace → Business → Branch relationship model and make multi-branch operation meaningful: branch-aware read scoping for the dashboard, orders, invoices, inventory, reports, and POS; a product catalog separated from per-branch inventory with a stock-movement ledger; immediate stock transfers between branches of the same business; and a POS returns/refunds MVP where refund totals are computed from the original order, restocking updates branch inventory, a printable return receipt/credit note is produced, and reports show gross sales, returns, and net sales per branch."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manager/operator views branch-scoped commerce data (Priority: P1)

As a manager or operator working at a specific Branch, I want the Dashboard, Orders, Invoices, Inventory, Reports, and Point of Sale to default to my active Branch's data, so that activity at one Branch is never mixed with, or hidden by, activity at another Branch.

**Why this priority**: This is the foundation for meaningful multi-branch operation. Every other capability in this feature (branch inventory, transfers, returns, branch reporting) depends on screens correctly distinguishing one Branch's data from another's. Even delivered on its own, correct branch scoping immediately gives each Branch an accurate view of its own operations.

**Independent Test**: With a Workspace that has two Branches (e.g., Misr and Nasir) under the same Business, complete a sale at each Branch, then switch the active Branch back and forth and confirm the Dashboard, Orders, Invoices, and Reports each show only the active Branch's sale.

**Acceptance Scenarios**:

1. **Given** a Business with two Branches, Misr and Nasir, **When** a sale is completed while Misr is the active Branch, **Then** that sale appears in Misr's Dashboard "sales today", Orders list, Invoices list, and Reports, but does not appear in any of Nasir's equivalents.
2. **Given** the active Branch is switched from Misr to Nasir, **When** the user opens Reports, **Then** the page clearly indicates which Branch's data is being shown and the totals reflect only Nasir's activity.
3. **Given** an Order belongs to Misr while Nasir is the active Branch, **When** the user opens that Order directly (e.g., via a link or search), **Then** the Order is shown along with a label identifying it as a Misr Order, but it does not appear in Nasir's Orders list.

---

### User Story 2 - Operator manages branch-specific stock for a shared product catalog (Priority: P2)

As a store operator, I want each Product to exist once for my Business but have its own stock quantity at each Branch, so that Misr and Nasir can sell the same Product with different quantities on hand.

**Why this priority**: Builds directly on branch-scoped viewing (P1) and is a prerequisite for Stock Transfers (P3) and Return restocking (P4), since both operate on per-Branch stock quantities rather than a single shared number.

**Independent Test**: Create a Product under a Business, set its stock to 10 at Misr and 3 at Nasir, then switch the active Branch and verify POS and Inventory show 10 at Misr and 3 at Nasir, and that a sale at one Branch does not change the other Branch's number.

**Acceptance Scenarios**:

1. **Given** a Product exists under a Business with no prior per-Branch stock, **When** stock is set to 10 at Misr and 3 at Nasir, **Then** POS and Inventory show 10 while Misr is active and 3 while Nasir is active.
2. **Given** the Product has 10 units at Misr and 3 units at Nasir, **When** a sale of 1 unit completes at Misr, **Then** Misr's stock becomes 9 and Nasir's stock remains 3.
3. **Given** an existing demo Product that only has a single legacy stock number and no per-Branch records yet, **When** a user first views that Product's stock at the active Branch, **Then** the UI displays a virtual Branch-specific fallback derived from the legacy value without persisting a `BranchInventory` record; **When** the first stock mutation occurs for that Product/Branch (sale, return, transfer, or manual adjustment), **Then** a real Branch-specific stock record is persisted from the fallback value plus the mutation, the legacy value is preserved, and other Branches are unaffected.

---

### User Story 3 - Operator transfers stock between branches (Priority: P3)

As a store operator, I want to move stock for a Product from one Branch to another Branch in the same Business, so that I can rebalance inventory without losing track of where stock came from or went.

**Why this priority**: Depends on per-Branch inventory existing (P2). It is a self-contained capability that adds clear operational value — rebalancing stock between locations — without requiring Returns (P4) to be implemented first.

**Independent Test**: With Misr holding 10 units and Nasir holding 3 units of a Product, transfer 2 units from Misr to Nasir, then switch Branches and confirm Misr shows 8, Nasir shows 5, and a transfer history entry records the move.

**Acceptance Scenarios**:

1. **Given** Misr has 10 units and Nasir has 3 units of a Product in the same Business, **When** the operator transfers 2 units from Misr to Nasir, **Then** Misr's stock becomes 8, Nasir's stock becomes 5, and both changes are recorded as stock movements.
2. **Given** a completed transfer from Misr to Nasir, **When** the operator views transfer history, **Then** the transfer is listed with its date, source and destination Branch, items and quantities, who performed it, and its status.
3. **Given** an operator attempts to transfer stock to the same Branch, to a Branch with insufficient stock, or to a Branch belonging to a different Business, **When** they confirm the transfer, **Then** the transfer is rejected with a clear explanation and no stock or records change.

---

### User Story 4 - Cashier processes a return for a completed sale (Priority: P4)

As a cashier, I want to process a full or partial return against a completed Order, choose whether to restock the returned items, and record how the refund was given, so that customer returns, stock levels, and reports stay accurate.

**Why this priority**: This is the most complex addition and depends on branch-scoped Orders (P1) and per-Branch inventory (P2) for restocking. It completes the multi-branch operations loop (sell → transfer → return).

**Independent Test**: Complete a sale of one Product at Misr, then return that item with restock enabled; verify the refund total matches the original sale's price/tax, Misr's stock increases by the returned quantity, Nasir's stock is unaffected, the Order shows a "returned" status, and a return receipt is available.

**Acceptance Scenarios**:

1. **Given** a completed Order with one unit of a Product sold at the price/tax in effect at the time, **When** the cashier returns that unit with restock enabled, **Then** the refund total equals the original sale's price and tax for that unit regardless of any later price or tax changes, Misr's stock increases by 1, and the Order's status becomes "returned".
2. **Given** a completed Order with two units of a Product, **When** the cashier returns only one unit, **Then** the refund total and tax for that line are exactly half of its original totals, the Order's status becomes "partially returned", and the remaining returnable quantity for that item is 1.
3. **Given** a return has been completed, **When** a user views the original Invoice, **Then** its original items and totals are unchanged but it shows a reference to the return; **When** they view the return, **Then** a printable return receipt/credit note is available showing the Branch, cashier, original Order/Invoice references, returned items, refund method, tax refunded, total refunded, and restock decision.
4. **Given** a cashier attempts to return more of an item than remains returnable (quantity sold minus quantity already returned), **When** they confirm, **Then** the return is limited to the remaining returnable quantity, or rejected, with a clear message, and no over-return is recorded.

---

### Edge Cases

- What happens when a Workspace contains only one Business? The Business selector may be visually simplified, but the Branch selector still only shows that Business's Branches and all branch-scoping rules still apply.
- What happens when the active Business is switched and the previously active Branch does not belong to the new Business? The active Branch automatically falls back to the new Business's main (or first available) Branch.
- How does the system handle a Product that has never had a Branch-specific stock record for the active Branch? Read views display stock through a virtual legacy fallback derived from `CommerceProduct.stock`/`lowStockThreshold` without writing storage. A real `BranchInventory` record is persisted only on the first stock mutation for that Product/Branch: sale, return, transfer, or manual adjustment.
- What happens when a return is processed with restock disabled? The return is recorded, but no Branch's stock changes.
- What happens when a return is attempted against an Order from a different Workspace or Business than the one currently active? The return is not allowed; only Orders from the same Workspace/Business can be returned.
- What happens when a return is attempted from a different active Branch than the Order's Branch? In MVP, Returns are branch-scoped to the original Order Branch. The return flow does not show a Branch picker; if restock is enabled, stock is added back only to the original Order's Branch.
- How are reports affected when a sale is fully returned within the same reporting period? Net sales for that Branch return to the pre-sale value, while Gross Sales and Returns remain visible and accounted for separately.
- What happens when an Order or Invoice belonging to another Branch is opened directly (e.g., by id)? It can be viewed and is clearly labeled with its own Branch, but never appears in the active Branch's default lists.
- What happens when a Stock Transfer is attempted with zero, negative, or non-numeric quantity? The transfer is rejected with a clear message and no records change.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST maintain a Workspace → Business → Branch hierarchy in which every Branch belongs to exactly one Business and every Business belongs to exactly one Workspace; a Branch MUST NOT exist outside of a Business.
- **FR-002**: The active Branch MUST always belong to the active Business; switching the active Business MUST automatically reset the active Branch to that Business's main (or first available) Branch whenever the previously active Branch does not belong to the newly active Business.
- **FR-003**: The Branch selector MUST list only Branches belonging to the active Business, and no user-facing label, selector, or message MUST display the term "Business Unit", "BU", or "Default Business Unit" — user-facing terminology MUST be "Business", "Store", "Branch", or "Location" as appropriate.
- **FR-004**: The Commerce Dashboard, Orders, Invoices, Inventory, Reports, and Point of Sale MUST default to data scoped to the active Workspace, active Business, and active Branch.
- **FR-005**: Each Product MUST belong to a Business and be shared as a single catalog entry across that Business's Branches, while stock quantities MUST be tracked separately per Branch.
- **FR-006**: The system MUST maintain a per-Branch stock record for each Product, tracking quantity on hand, a low-stock threshold, and when it was last updated. For legacy Products with no `BranchInventory` record, read views MUST display stock through a virtual fallback derived from the legacy Product stock fields; they MUST NOT persist `BranchInventory` on first read/access. A real `BranchInventory` record MUST be persisted only on first stock mutation: sale, return, transfer, or manual adjustment.
- **FR-007**: Point of Sale MUST display and deduct stock for the active Branch only; completing a sale MUST NOT change stock levels recorded for any other Branch. Stock deduction for POS sales MUST happen exactly once inside `createOrder`/`AppProvider`; the POS page MUST NOT directly deduct stock after calling `createOrder`.
- **FR-008**: Orders and Invoices MUST record which Branch they belong to and MUST display that Branch's name wherever the order or invoice is shown.
- **FR-009**: The Dashboard, Orders list, Invoices list, Inventory, Point of Sale, and Reports MUST NOT include data belonging to a Branch other than the active Branch by default; an Order or Invoice from another Branch may be opened directly by reference but MUST be clearly labeled with its own Branch.
- **FR-010**: The system MUST record a stock-movement entry for every stock-affecting event (sale, return, transfer out, transfer in, manual adjustment), including the Branch, Product, quantity change, reason/reference, and who performed it; these entries MUST be append-only with no edits or deletions in this MVP.
- **FR-011**: The system MUST allow an operator to immediately move a specified quantity of a Product's stock from one Branch to another Branch within the same Business ("Stock Transfer"), with no approval workflow.
- **FR-012**: A completed Stock Transfer MUST produce a stock-movement entry at the source Branch (decrease) and a corresponding stock-movement entry at the destination Branch (increase), and MUST be visible in a transfer history showing date, source and destination Branch, items and quantities, who performed it, and status.
- **FR-026**: In MVP, the `/inventory/transfers` route MUST be linked from the Inventory screen only; Stock Transfers MUST NOT add a new top-level Commerce navigation item.
- **FR-013**: A Stock Transfer MUST be rejected, with a clear explanation, if the source Branch does not have sufficient available stock for the requested quantity.
- **FR-014**: A Stock Transfer MUST be rejected, with a clear explanation, if the source and destination Branch are the same.
- **FR-015**: A Stock Transfer MUST be rejected, with a clear explanation, if the source and destination Branches do not belong to the same Business.
- **FR-016**: The system MUST allow a cashier/operator to create a full or partial Return against a previously completed Order belonging to the same Workspace and Business, recording which items and quantities are being returned, the reason, the refund method, and whether the returned items should be added back to stock ("restock").
- **FR-017**: A Return MUST NOT allow returning more of any item than the quantity originally sold minus any quantity already returned for that Order.
- **FR-018**: A Return's refund totals (subtotal, tax, and total) MUST be calculated using the original Order's per-item prices and tax treatment at the time of sale — not current catalog prices or current tax settings — and MUST be pro-rated correctly for partial-quantity returns.
- **FR-019**: When a Return is recorded with restock enabled, the returned quantity MUST be added back to the Branch inventory of the original Order's Branch, and a "return" stock-movement entry MUST be created. MVP Returns MUST NOT include a Branch picker or allow restocking to a different Branch.
- **FR-020**: When a Return is recorded with restock disabled, no Branch inventory quantities MUST change, but the Return MUST still be recorded.
- **FR-021**: The original Invoice document for a returned Order MUST remain immutable — its line items, totals, tax, discounts, and sale amounts MUST continue to reflect the original sale and MUST never be changed by a Return. It MAY show links/references to Return records, but any return information MUST be presented as separate linked records rather than a modification of the original Invoice.
- **FR-022**: Completing a Return MUST produce a printable Return Receipt / Credit Note showing the business identity and branch, cashier, customer (if any), references to the original order/invoice, the return number, date/time, returned items and quantities, refund method, tax refunded, total refunded, whether items were restocked, and the reason/note.
- **FR-023**: Reports and the Dashboard MUST present figures that account for completed Returns — either by showing Net Sales (gross sales minus completed returns) alongside Gross Sales and Returns/Refunds, or by clearly separating gross sales from returns — scoped to the active Branch by default.
- **FR-024**: All new user-facing text introduced by this feature MUST be available in both English and Arabic using the existing localization approach, and MUST preserve right-to-left/left-to-right layout readiness.
- **FR-025**: All new data introduced by this feature (Branch Inventory, Stock Movements, Stock Transfers, Returns) MUST be persisted and read through the existing shared data-access layer, consistent with how Orders, Invoices, and Products are currently stored — no new direct browser-storage access may be added within page or component code.

### Key Entities

- **Business**: User-facing name for a Workspace's commerce-enabled business grouping (internally a "Business Unit"). A Workspace can contain multiple Businesses; each Business can contain multiple Branches.
- **Branch**: A physical location belonging to exactly one Business. The active Branch always belongs to the active Business.
- **Commerce Product**: A catalog item belonging to a Business — identity, category, pricing, tax, and image — shared across that Business's Branches. No longer the sole source of truth for stock once Branch Inventory exists.
- **Branch Inventory**: The stock record for a Product at a specific Branch — quantity on hand, low-stock threshold, and last-updated time. One record per Product per Branch.
- **Stock Movement**: An append-only ledger entry recording a single stock-affecting event (sale, return, transfer out/in, manual adjustment) for a Product at a Branch, including the quantity change and a reference to what caused it.
- **Stock Transfer**: A record of moving one or more Products' stock from one Branch to another Branch within the same Business, including items/quantities, who performed it, when, and status.
- **Commerce Return**: A record of a full or partial return against a completed Order — returned items/quantities, reason, refund method, restock decision, and computed refund totals (subtotal, tax, total).
- **Commerce Order (extended)**: Existing sale record, extended to track its overall return status (none / partially returned / returned), the total amount returned, and links to any associated Returns.
- **Commerce Invoice (extended)**: Existing sale document, extended with optional links/references to associated Returns without altering its original totals.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Switching between Businesses and Branches never results in an active Branch that doesn't belong to the active Business — 100% of switches produce a valid Business/Branch combination.
- **SC-002**: After switching the active Branch, every branch-aware screen (Dashboard, Orders, Invoices, Inventory, Reports, POS) shows only that Branch's data, with zero records from other Branches appearing in default list views.
- **SC-003**: A sale completed at one Branch changes that Branch's stock count for the sold Product and has zero effect on any other Branch's stock count for the same Product.
- **SC-004**: An operator can transfer stock from one Branch to another in a single confirmation step, after which both Branches show updated stock and a transfer history entry that fully traces the move (date, branches, items, performer, status).
- **SC-005**: Invalid transfer attempts (same Branch, insufficient stock, or across different Businesses) are rejected before any stock or record changes occur, each with an understandable reason shown to the user.
- **SC-006**: A cashier can process a full or partial return against any completed sale, with the refund amount automatically matching what was originally charged for the returned items, independent of any later price or tax-rate changes.
- **SC-007**: After a return is completed, the related Order shows an updated return status, the affected Branch's stock reflects the chosen restock option (with no other Branch's stock changing), and a printable return document is immediately available.
- **SC-008**: For any Branch, a fully refunded sale results in that Branch's net sales figure returning to its pre-sale value, while Gross Sales and Returns remain visible and accounted for separately.
- **SC-009**: No screen, label, or message visible to end users contains the term "Business Unit", "BU", or "Default Business Unit".

## Out of Scope

- Backend/server persistence (e.g., Laravel) — this MVP continues to use the existing local/demo data layer.
- Real file/object storage for media.
- Supplier purchasing, purchase orders, or any procurement workflow.
- An approval workflow for stock transfers — transfers complete immediately.
- Multi-warehouse bin/location systems within a single Branch.
- Serial number / IMEI tracking.
- Batch / expiry date tracking.
- A full accounting ledger or financial close process.
- A customer-facing online returns portal.
- Live payment-gateway refund execution — refunds are recorded locally, not processed through a payment provider.
- Any new user-role/permission enforcement beyond the current access model.

## Assumptions

- The active Workspace/Business/Branch context and the underlying Business → Branch relationship established in prior MVP work is the foundation this feature builds on.
- "Business Unit" continues to exist only as an internal/data-model concept; all user-facing copy uses Business, Store, Branch, or Location.
- The existing local/mock data layer (no backend) continues to be the system of record for this MVP.
- Existing demo Products that predate per-Branch inventory will display through a virtual legacy stock fallback on first read/access. They are normalized into real Branch Inventory records only on first stock mutation (sale, return, transfer, or manual adjustment), without losing their existing stock values.
- Tax/rounding behavior for return totals follows the same conventions already used for sales documents.
- Existing English/Arabic localization and RTL/LTR support patterns are extended to cover all new labels introduced by this feature.
