# Phase 1 Data Model: Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP

All new types are added to `packages/types/src/commerce.ts`. All new collections are added to `STORAGE_KEYS` in `packages/shared/src/mock-db/schema.ts` and persisted/read via `readCollection`/`writeCollection` exactly like `products`/`orders`/`invoices` today.

## New Entity: BranchInventory

The per-Branch stock record for a Product. One record per `(productId, branchId)` pair.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | `uid("bi")` |
| `workspaceId` | `string` | Tenant scope (Article V) |
| `businessUnitId` | `string` | Matches the Product's Business |
| `branchId` | `string` | The Branch this record applies to |
| `productId` | `string` | References `CommerceProduct.id` |
| `qty` | `number` | Quantity on hand at this Branch |
| `lowStockThreshold` | `number` | Per-Branch low-stock alert level |
| `updatedAt` | `string` (ISO) | Last time `qty`/`lowStockThreshold` changed |

**Validation / invariants**
- At most one `BranchInventory` record per `(productId, branchId)`.
- `qty >= 0` always (a `transferStock`/`createOrder` that would make `qty < 0` is rejected before any write — FR-013).
- `branchId` must reference a Branch whose `businessUnitId` matches the Product's `businessUnitId`.

**Lifecycle**: No record exists for a `(productId, branchId)` pair until the first stock-affecting action (sale, return, transfer, or manual adjustment) touches that pair. Until then, `effectiveStockFor(product, branchId, branchInventory)` (in `packages/shared/src/mock-db/actions.ts`) returns a virtual record derived from `CommerceProduct.stock`/`lowStockThreshold` (research.md #1) for display only. First read/access MUST NOT persist a `BranchInventory` record. The first mutation persists a real record seeded from that virtual value plus the delta; from then on, the real record is the source of truth for that `(productId, branchId)` pair, and `CommerceProduct.stock`/`lowStockThreshold` become inert legacy fields for that pair (other Branches without a record continue to fall back to the legacy values).

---

## New Entity: StockMovement

An append-only ledger entry for a single stock-affecting event.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | `uid("sm")` |
| `workspaceId` | `string` | Tenant scope |
| `businessUnitId` | `string` | |
| `branchId` | `string` | The Branch whose `BranchInventory.qty` changed |
| `productId` | `string` | |
| `qtyChange` | `number` | Signed delta (e.g. `-1` for a sale, `+2` for a transfer-in) |
| `reason` | `"sale" \| "return" \| "transfer_out" \| "transfer_in" \| "adjustment"` | |
| `reference` | `{ type: "order" \| "return" \| "transfer" \| "adjustment"; id: string }` | Points back to the causing record |
| `performedBy` | `string` | `User.id` |
| `performedByName` | `string` | Display name at time of action |
| `createdAt` | `string` (ISO) | |

**Validation / invariants**
- Append-only: no update or delete action is exposed for this collection in this MVP (FR-010).
- Every `BranchInventory.qty` change MUST be accompanied by exactly one (sale/return/adjustment) or two (transfer: one `transfer_out` + one `transfer_in`) `StockMovement` entries written atomically with that change.

**Lifecycle**: Created by `createOrder` (one `"sale"` entry per line item, `qtyChange < 0`), `createReturn` when `restock: true` (one `"return"` entry per returned line, `qtyChange > 0`), `transferStock` (one `"transfer_out"` at the source Branch and one `"transfer_in"` at the destination Branch), and `adjustStock` (one `"adjustment"` entry, `qtyChange` = new qty − old qty). Never edited or removed afterwards.

---

## New Entity: StockTransfer

A record of an immediate stock move between two Branches of the same Business.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | `uid("st")` |
| `transferNumber` | `string` | e.g. `TRF-0001`, sequential per Business |
| `workspaceId` | `string` | |
| `businessUnitId` | `string` | Both Branches must belong to this Business (FR-015) |
| `fromBranchId` | `string` | Source Branch |
| `toBranchId` | `string` | Destination Branch — must differ from `fromBranchId` (FR-014) |
| `items` | `{ productId: string; name: string; qty: number }[]` | Quantities transferred, `qty > 0` |
| `performedBy` | `string` | `User.id` |
| `performedByName` | `string` | |
| `note` | `string?` | Optional free-text |
| `status` | `"completed"` | Always `"completed"` in MVP — no approval workflow (FR-011) |
| `createdAt` | `string` (ISO) | |

**Validation / invariants**
- `fromBranchId !== toBranchId` (FR-014); both Branches' `businessUnitId === businessUnitId` (FR-015).
- For every item, `qty` is a positive integer and `effectiveStockFor(product, fromBranchId).qty >= qty` at the time of transfer (FR-013, zero/negative/non-numeric quantities rejected per Edge Cases).
- A rejected transfer produces **no** `StockTransfer`, `StockMovement`, or `BranchInventory` change (SC-005).

**Lifecycle**: Created atomically by `transferStock`, together with two `StockMovement` entries per item and the corresponding `BranchInventory.qty` updates at both Branches. Immutable afterwards; displayed in the transfer-history table (`/inventory/transfers`). In MVP, `/inventory/transfers` is reachable from the Inventory screen only and does not add a new top-level Commerce navigation item.

---

## New Entity: CommerceReturn

A full or partial return against a previously completed `CommerceOrder`.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | `uid("ret")` |
| `returnNumber` | `string` | e.g. `RET-0001`, sequential per Business |
| `workspaceId` | `string` | |
| `businessUnitId` | `string` | Must match `order.businessUnitId` (cross-Business returns rejected — Edge Cases) |
| `branchId` | `string` | Copied from `order.branchId` |
| `orderId` | `string` | References the original `CommerceOrder.id` |
| `invoiceId` | `string?` | References the original `CommerceInvoice.id`, if one exists |
| `items` | `CommerceReturnItem[]` | See below |
| `reason` | `string` | Free-text reason/note (FR-016) |
| `refundMethod` | `"cash" \| "card" \| "wallet" \| "original"` | How the refund was given |
| `restock` | `boolean` | Whether returned items were added back to inventory (FR-019/FR-020) |
| `subtotal` | `number` | From `computeReturnTotals` |
| `vat` | `number` | From `computeReturnTotals` |
| `total` | `number` | From `computeReturnTotals` |
| `cashierId` | `string` | `User.id` of the operator processing the return |
| `cashierName` | `string` | |
| `createdAt` | `string` (ISO) | |

`CommerceReturnItem`: `{ productId: string; name: string; sku?: string; qty: number; price: number; taxable: boolean }` — `qty`/`price`/`taxable` are the **returned** quantity and the **original sale's** unit price/tax flag for that line (FR-018).

**Validation / invariants**
- For each `items[i]`, `qty <= (originalOrder.items[j].qty - sum of qty already returned for that product across prior CommerceReturns on this order)` (FR-017) — over-returns are rejected or capped per FR-017/AC US4-4.
- `subtotal`/`vat`/`total` are computed via `computeReturnTotals(originalOrder, items)` — never via current `CommerceSetup`/catalog prices (FR-018).
- Creating a `CommerceReturn` never mutates `CommerceInvoice.items`/`subtotal`/`vat`/`total`/`net` (FR-021).
- `branchId` is copied from `originalOrder.branchId`. MVP returns are branch-scoped to the original Order Branch and expose no Branch picker; restock, when enabled, writes only to that original Branch's `BranchInventory`.

**Lifecycle**: Created by `createReturn`. If `restock: true`, paired `StockMovement`(`reason: "return"`)/`BranchInventory.qty` updates are written atomically at `branchId`, which is always the original Order Branch in MVP. Always updates the parent `CommerceOrder.returnStatus`/`returnedTotal`/`returnIds` and appends to `CommerceInvoice.returnIds` (if an invoice exists). Immutable afterwards; rendered as a printable Return Receipt / Credit Note at `/returns/[id]/document`.

---

## Extended Entity: CommerceOrder

| Field | Type | Notes |
|---|---|---|
| `returnStatus` | `"none" \| "partial" \| "returned"` *(new, optional, default `"none"`)* | Derived/maintained by `createReturn`; `"partial"` when some but not all returnable quantity has been returned, `"returned"` when none remains |
| `returnedTotal` | `number` *(new, optional, default `0`)* | Sum of `total` across all `CommerceReturn`s for this order |
| `returnIds` | `string[]` *(new, optional, default `[]`)* | IDs of `CommerceReturn` records against this order |

All existing fields (`items`, `payment`, `discount`, `vat`, `subtotal`, `total`, `net`, `branchId`, etc.) are unchanged and remain the source of truth for `computeReturnTotals`.

**Validation / invariants**
- `returnedTotal <= order.total`.
- `returnStatus` is `"none"` (or absent, for orders created before this feature) when `returnIds` is empty/absent.

---

## Extended Entity: CommerceInvoice

| Field | Type | Notes |
|---|---|---|
| `returnIds` | `string[]` *(new, optional, default `[]`)* | IDs of `CommerceReturn` records linked to this invoice's order; the invoice's own `items`/`subtotal`/`vat`/`total`/`net` are immutable and never modified (FR-021) |

The original invoice document may render Return links/references when `returnIds` exists, but its original sale line items, totals, discounts, tax, and amounts remain unchanged forever.

---

## Extended Entity: CommerceProduct (no new fields — role change only)

`stock: number | null` and `lowStockThreshold?: number` remain in the type unchanged, but their role becomes **legacy/seed values**: they are the source for the virtual `BranchInventory` fallback (research.md #1) for any `(productId, branchId)` pair that has no real `BranchInventory` record yet. `branchId: string` (singular) on `CommerceProduct` continues to mean "the Branch this Product was originally created/seeded under" and is not used for stock lookups once `BranchInventory` exists — Products are shared catalog entries across a Business's Branches per FR-005.

---

## New Storage Keys

| Key | Constant | Collection type |
|---|---|---|
| `branchInventory` | `STORAGE_KEYS.branchInventory` | `BranchInventory[]` |
| `stockMovements` | `STORAGE_KEYS.stockMovements` | `StockMovement[]` |
| `stockTransfers` | `STORAGE_KEYS.stockTransfers` | `StockTransfer[]` |
| `commerceReturns` | `STORAGE_KEYS.commerceReturns` | `CommerceReturn[]` |

All four are added to the `db` section of `STORAGE_KEYS` (alongside `products`/`orders`/`invoices`), so `clearAllStorage()` (which iterates `Object.values(STORAGE_KEYS)`) clears them automatically with no further changes to `storage.ts`.

## Relationships Summary

```text
Workspace
  └── BusinessUnit ("Business")
        ├── Branch ("Misr")
        │     ├── BranchInventory (productId, qty, lowStockThreshold)
        │     ├── CommerceOrder (branchId) ──┐
        │     │                               ├── CommerceReturn (orderId, invoiceId, branchId)
        │     ├── CommerceInvoice (branchId) ─┘        │
        │     └── StockMovement (branchId, productId, reason, reference) ◄── sale/return/adjustment
        └── Branch ("Nasir")
              ├── BranchInventory (productId, qty, lowStockThreshold)
              └── StockMovement (branchId, productId, reason, reference)

CommerceProduct (businessUnitId)         StockTransfer (fromBranchId → toBranchId)
  ├── shared across all Branches            ├── items: [{ productId, qty }]
  └── stock/lowStockThreshold = legacy       └── produces 2x StockMovement
      fallback for BranchInventory               (transfer_out @ from, transfer_in @ to)
```
