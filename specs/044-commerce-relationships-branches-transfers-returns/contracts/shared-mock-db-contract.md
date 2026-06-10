# Contract: Shared Mock-DB Surface (`@nexoraxs/shared`, `@nexoraxs/types`)

This feature has no external/network API. Its "interfaces" are the **internal package contracts** that `apps/commerce` consumes from `@nexoraxs/shared` and `@nexoraxs/types`, and the **`AppProvider` context contract** that `apps/commerce`'s pages/components consume (per the constitutional rule that pages must never touch storage directly). This document is the source of truth `apps/commerce/lib/store/AppProvider.tsx` must implement against, and what `/speckit.tasks` should generate granular tasks from.

---

## A. New/changed exports from `@nexoraxs/types`

```ts
// commerce.ts — new entities

export interface BranchInventory {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qty: number;
  lowStockThreshold: number;
  updatedAt: string;
}

export type StockMovementReason = "sale" | "return" | "transfer_out" | "transfer_in" | "adjustment";

export interface StockMovement {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qtyChange: number;
  reason: StockMovementReason;
  reference: { type: "order" | "return" | "transfer" | "adjustment"; id: string };
  performedBy: string;
  performedByName: string;
  createdAt: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  workspaceId: string;
  businessUnitId: string;
  fromBranchId: string;
  toBranchId: string;
  items: { productId: string; name: string; qty: number }[];
  performedBy: string;
  performedByName: string;
  note?: string;
  status: "completed";
  createdAt: string;
}

export interface CommerceReturnItem {
  productId: string;
  name: string;
  sku?: string;
  qty: number;
  price: number;
  taxable: boolean;
}

export type RefundMethod = "cash" | "card" | "wallet" | "original";

export interface CommerceReturn {
  id: string;
  returnNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  orderId: string;
  invoiceId: string | null;
  items: CommerceReturnItem[];
  reason: string;
  refundMethod: RefundMethod;
  restock: boolean;
  subtotal: number;
  vat: number;
  total: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
}

// commerce.ts — additive fields only (existing fields unchanged)
export interface CommerceOrder {
  // ...existing fields
  returnStatus?: "none" | "partial" | "returned";
  returnedTotal?: number;
  returnIds?: string[];
}

export interface CommerceInvoice {
  // ...existing fields
  returnIds?: string[];
}
```

`index.ts` re-exports `BranchInventory`, `StockMovement`, `StockMovementReason`, `StockTransfer`, `CommerceReturn`, `CommerceReturnItem`, `RefundMethod`.

**Backward compatibility**: `returnStatus`/`returnedTotal`/`returnIds` are optional fields — existing `CommerceOrder`/`CommerceInvoice` records created before this feature (and the seeded demo orders) remain valid without migration; `AppProvider` treats a missing `returnStatus` as `"none"` and a missing `returnIds`/`returnedTotal` as `[]`/`0`. No existing field is renamed, removed, or retyped.

---

## B. New/changed exports from `@nexoraxs/shared`

### `mock-db/schema.ts`
- `STORAGE_KEYS.branchInventory: "nexoraxs.db.branchInventory"`
- `STORAGE_KEYS.stockMovements: "nexoraxs.db.stockMovements"`
- `STORAGE_KEYS.stockTransfers: "nexoraxs.db.stockTransfers"`
- `STORAGE_KEYS.commerceReturns: "nexoraxs.db.commerceReturns"`
- New `t()` dictionary keys (both `en`/`ar`): `branch_inventory`, `stock_transfer`, `transfer_history`, `new_transfer`, `from_branch`, `to_branch`, `return`, `returns`, `process_return`, `restock`, `restocked`, `not_restocked`, `refund_method`, `return_receipt`, `credit_note`, `returns_refunds`, `return_status`, `partially_returned`, `returned`, `remaining_returnable`, `transfer_rejected`, `return_rejected`, `insufficient_stock`, `select_branch`. (`gross_sales`/`net_sales` already exist in `DICT` — reused as-is.)

### `mock-db/selectors.ts`
```ts
export function nxBranchInventoryMap(
  branchInventory: BranchInventory[],
  branchId: string,
): Record<string /* productId */, BranchInventory>;

export function nxReturnsForPeriod(
  returns: CommerceReturn[],
  period: string,
  now?: Date,
): CommerceReturn[]; // mirrors nxOrdersForPeriod, filtered on `createdAt`

export function nxNetSales(
  periodOrders: CommerceOrder[],
  periodReturns: CommerceReturn[],
): { gross: number; returns: number; net: number; vat: number; vatRefunded: number; count: number };
// gross/vat/count = nxRevenue(periodOrders); returns/vatRefunded = sum of total/vat over periodReturns;
// net = gross - returns. nxRevenue itself is unchanged.
```
Pure, side-effect-free — same shape as existing `nxRevenue`, `nxOrdersForPeriod`, `nxBestSellers`.

### `mock-db/actions.ts`
```ts
// Effective per-branch stock — pure read-side merge, no storage I/O
export function effectiveStockFor(
  product: CommerceProduct,
  branchId: string,
  branchInventory: BranchInventory[],
): { qty: number; lowStockThreshold: number; updatedAt: string; hasRecord: boolean };
// If a BranchInventory record exists for (product.id, branchId), returns it (hasRecord: true).
// Otherwise returns a virtual record derived from product.stock/lowStockThreshold (hasRecord: false).

// Append-only ledger entry construction — pure factory, no storage I/O
export function buildStockMovement(input: {
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qtyChange: number;
  reason: StockMovementReason;
  reference: { type: "order" | "return" | "transfer" | "adjustment"; id: string };
  performedBy: string;
  performedByName: string;
}): StockMovement;

// StockTransfer record construction — pure factory, no storage I/O
export function buildStockTransfer(input: {
  transferNumber: string;
  workspaceId: string;
  businessUnitId: string;
  fromBranchId: string;
  toBranchId: string;
  items: { productId: string; name: string; qty: number }[];
  performedBy: string;
  performedByName: string;
  note?: string;
}): StockTransfer;

// CommerceReturn record construction — pure factory, no storage I/O
export function buildCommerceReturn(input: {
  returnNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  orderId: string;
  invoiceId: string | null;
  items: CommerceReturnItem[];
  reason: string;
  refundMethod: RefundMethod;
  restock: boolean;
  totals: { subtotal: number; vat: number; total: number }; // from computeReturnTotals
  cashierId: string;
  cashierName: string;
}): CommerceReturn;
```

These are **pure helpers** (no `localStorage` access) — consistent with `taxBreak`/`computeDoc`/`uid`/`nowISO`. The read-check-write-and-`StockMovement`-append orchestration stays inside `AppProvider`, exactly like `createOrder`/`createInvoice` do today — shared packages provide the building blocks; the app owns the side effects (Article XVI: "Shared packages must not contain business logic").

### `mock-db/storage.ts`
- No signature changes. `clearAllStorage()` automatically covers the four new `STORAGE_KEYS` entries (it iterates `Object.values(STORAGE_KEYS)`).

### `mock-db/seed.ts`
- No change. `seedDB(...)` continues to seed zero `BranchInventory`/`StockMovement`/`StockTransfer`/`CommerceReturn` records; the single seeded Branch's stock continues to come from `CommerceProduct.stock`/`lowStockThreshold` via `effectiveStockFor`'s virtual-record fallback (research.md #1, #9).

### `commerce/documents.ts`
```ts
export function computeReturnTotals(
  originalOrder: CommerceOrder,
  returnItems: { productId: string; qty: number }[],
): {
  lines: { productId: string; name: string; qty: number; price: number; vat: number; total: number }[];
  subtotal: number;
  vat: number;
  total: number;
  rate: number;
};
```
Pro-rates each returned line's price/tax treatment from the matching `OrderItem` in `originalOrder.items` and the order's own `subtotal`/`vat`/`discount`/`total` ratios — never from the current `CommerceSetup` (FR-018). Mirrors `computeDoc`'s rounding rules. Re-exported from `mock-db/selectors.ts` alongside `computeDoc`/`fmtDate` for symmetry with existing imports.

---

## C. `AppProvider` contract additions (`apps/commerce/lib/store/AppProvider.tsx`)

```ts
interface AppContextType {
  // ...existing members unchanged

  // new persisted collections (workspace+business scoped; branchInventory/stockMovements
  // additionally scoped to currentBranchId for default reads)
  branchInventory: BranchInventory[];
  stockMovements: StockMovement[];
  stockTransfers: StockTransfer[];
  commerceReturns: CommerceReturn[];

  // products: existing getter, UNCHANGED SIGNATURE — `stock`/`lowStockThreshold` on each
  // returned CommerceProduct are now the *branch-effective* values for currentBranchId,
  // computed via effectiveStockFor(product, currentBranchId, state.branchInventory)

  // orders / invoices: existing getters, UNCHANGED SIGNATURE — additionally filtered by
  // `branchId === currentBranchId` for default list/dashboard/report views (FR-004/FR-009).
  // `/orders/[id]` and `/invoices/[id]` resolve cross-branch records via state.orders /
  // state.invoices directly (business-scoped only) and render a Branch label.

  // Stock Transfer (US3/P3)
  transferStock: (data: {
    toBranchId: string;
    items: { productId: string; qty: number }[];
    note?: string;
  }) => { ok: true; transfer: StockTransfer } | { ok: false; error: string };

  // Returns/Refunds (US4/P4)
  createReturn: (data: {
    orderId: string;
    items: { productId: string; qty: number }[];
    reason: string;
    refundMethod: RefundMethod;
    restock: boolean;
  }) => { ok: true; return: CommerceReturn } | { ok: false; error: string };

  // Manual stock adjustment (used by Branch Inventory edit screen, US2/P2)
  adjustStock: (data: {
    productId: string;
    branchId?: string; // defaults to currentBranchId
    qty: number; // new absolute quantity
    lowStockThreshold?: number;
  }) => { ok: true } | { ok: false; error: string };
}
```

### `transferStock` validation order (FR-013/FR-014/FR-015)
1. `toBranchId !== currentBranchId` → else `{ ok: false, error: "transfer_rejected" }` (same-branch).
2. `toBranchId` belongs to `currentBusinessUnitId` → else `{ ok: false, error: "transfer_rejected" }` (cross-business).
3. For every item: `qty` is a positive integer and `effectiveStockFor(product, currentBranchId, branchInventory).qty >= qty` → else `{ ok: false, error: "insufficient_stock" }`.
On success: writes/updates two `BranchInventory` rows (decrement source, increment-or-create destination), appends one `transfer_out` + one `transfer_in` `StockMovement` per item, appends a `StockTransfer` record, all persisted via `writeCollection`.

### `createReturn` validation order (FR-016/FR-017, Edge Cases)
1. `orderId` resolves to a `CommerceOrder` with `workspaceId === currentWorkspaceId && businessUnitId === currentBusinessUnitId` → else `{ ok: false, error: "return_rejected" }`.
2. For every item: `qty <= (sold qty - already-returned qty)` for that `productId` on this order → else `{ ok: false, error: "return_rejected" }`.
On success: `computeReturnTotals(order, items)` → `buildCommerceReturn(...)`; if `restock`, increments `BranchInventory.qty` at `order.branchId` per item and appends a `return` `StockMovement` per item; updates `order.returnStatus`/`returnedTotal`/`returnIds`; appends the new return's id to the matching `CommerceInvoice.returnIds` (items/totals untouched, FR-021).

### `adjustStock`
Writes/creates a `BranchInventory` row for `(productId, branchId ?? currentBranchId)` with the given `qty`/`lowStockThreshold`, and appends one `adjustment` `StockMovement` with `qtyChange = newQty - previousEffectiveQty`. Used by the Inventory page's existing edit-stock flow (replacing direct `updateProduct(id, { stock })` calls).

---

## D. Consumer obligations (pages/components)

- Pages MUST continue to access all of the above only through `useApp()` — never importing `@nexoraxs/shared` mock-db primitives directly (existing rule, Article XVI).
- `inventory/page.tsx` MUST call `adjustStock` instead of `updateProduct(id, { stock, lowStockThreshold })` for stock edits; `pos/page.tsx`'s `completeSale()` MUST rely on `createOrder`'s internal `BranchInventory`/`StockMovement` updates instead of its own `updateProduct(ci.id, { stock: ... })` loop.
- Any screen that lists `orders`/`invoices`/`products` (Dashboard, Orders, Invoices, Inventory, Reports, POS) gets branch-scoping for free from `useApp()` and MUST NOT re-implement a `branchId` filter locally; `/orders/[id]` and `/invoices/[id]` MUST render a Branch label whenever the resolved record's `branchId !== currentBranchId`.
- `/orders/[id]` MUST surface a "Return" action that opens the return modal and, on `createReturn` success, navigates to `/returns/[id]/document`; `/invoices/[id]` MUST link to any `CommerceReturn`s in `returnIds`.
- `/inventory/transfers` is the only screen that calls `transferStock`; it MUST present source (`currentBranchId`, read-only) and destination Branch, item/qty picker, and a single confirm action, then render `stockTransfers` as history (FR-011/SC-004).
- `/returns/[id]/document` MUST follow the same printable-page conventions as `/invoices/[id]/document` (`.nx-invoice`/`.nx-print-hide`-equivalent classes, business identity header, Branch, cashier, original Order/Invoice references) and include all fields listed in FR-022.
- Dashboard and Reports MUST render Gross Sales, Returns/Refunds, and Net Sales as three distinct figures using `nxRevenue`/`nxReturnsForPeriod`/`nxNetSales` over the branch-scoped `orders`/`commerceReturns` — no new ad-hoc totals math in the component tree (FR-023).
- All new labels MUST go through `t()`/`DICT` (`en`/`ar`) — no hardcoded English strings (FR-024, Article XI).
