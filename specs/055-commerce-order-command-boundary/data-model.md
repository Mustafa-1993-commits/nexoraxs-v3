# Phase 1 Data Model: Commerce Order Command Boundary

**Feature**: 055 Commerce Order Command Boundary  
**Status**: Frontend-internal compatibility design  
**Canonical data impact**: None

## Governance Fence

This document models temporary frontend values and ports needed to move the existing Commerce
Order write path behind owner-aligned boundaries. It does not define a canonical Order aggregate,
Order lifecycle, public SDK/API contract, Laravel DTO, server error taxonomy, pagination,
idempotency, authorization, transaction, Inventory reservation model, upload transport, or offline
behavior.

Existing records remain the persisted compatibility records from `@nexoraxs/types`. No new stored
entity, field, key, migration, index, or relationship is introduced. Existing unknown JSON fields,
array ordering, omitted fields, identifiers, timestamps, and references are preserved.

`legacyBusinessUnitId` means only the identifier currently serialized as `businessUnitId`. It is
not a canonical Business identifier and does not prove the frozen Business → Business Unit
ancestry. Canonical Business ownership remains deferred.

## 1. Existing Persistent Compatibility Records

Feature 055 does not replace or normalize these records:

| Record | Logical owner | Feature 055 use |
|---|---|---|
| `CommerceOrder` | Orders | Create one compatible record; find/patch Return compatibility fields; empty demo bootstrap |
| `OrderItem` | Orders as applied commercial snapshot | Copy the current POS submission values without repricing |
| `BranchInventory` | Inventory | Read during prepare; update/create during sale deduction |
| `StockMovement` | Inventory | Append one `sale` Movement for each tracked submitted line |
| `CommerceInvoice` | Invoice/Documents | Existing Invoice port invoked by POS checkout; not migrated or redesigned |
| `CommerceReturn` | Returns | Remains outside Feature 055; its service requests an Order-owned field patch |

### Existing browser keys

| Purpose | Exact key | Access after Feature 055 |
|---|---|---|
| Orders | `nexoraxs.db.commerceOrders` | `BrowserStorageCommerceStore` through the private local Order command repository |
| Branch Inventory | `nexoraxs.db.branchInventory` | Inventory-owned storage adapter through the Inventory effect port |
| Stock Movements | `nexoraxs.db.stockMovements` | Inventory-owned storage adapter through the Inventory effect port |
| Invoices | `nexoraxs.db.commerceInvoices` | Existing Invoice-owned compatibility path |
| Last successful Order | `nx_last_order_id` | Browser session adapter behind the POS last-Order port |

The keys, JSON array shapes, raw last-Order string shape, missing-key behavior, refresh behavior,
and current storage-error propagation remain unchanged.

## 2. Legacy Command Scope and Context

### 2.1 Business-unit scope

```ts
interface LegacyCommerceBusinessUnitScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
}
```

Used for Order numbering because characterization proves the compatibility sequence is shared by
Branches inside one Workspace and legacy Business Unit.

### 2.2 Branch scope

```ts
interface LegacyCommerceBranchScope
  extends LegacyCommerceBusinessUnitScope {
  readonly branchId: string;
}
```

Used for Order creation, Order lookup/patch when the stored Order is Branch-scoped, Inventory
effects, publication, and cache refresh.

### 2.3 Command context

The existing `LegacyCommerceCommandContext` remains the frontend command context:

```ts
interface LegacyCommerceCommandContext {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string | null;
  readonly actorId: string;
  readonly actorDisplayName: string;
  readonly osId: "commerce";
  readonly action: string;
  readonly resourceId?: string | null;
}
```

Validation rules:

- Workspace, legacy Business Unit, actor, OS, and action must be explicit and non-empty;
- a completed sale requires a non-empty Branch;
- Product, Order, and Inventory records must match the complete applicable legacy scope before use;
- overlapping identifiers in another scope are never disclosed, counted, or mutated; and
- these client values remain compatibility authorization inputs, not proof of backend authority.

Canonical Business and Department are unavailable in the current browser data and are not
invented. Production authorization, Audit, and observability remain backend-readiness gates.

## 3. POS-Owned Transient Draft

The POS draft is application memory, not a persisted Order or canonical POS Transaction.

```ts
interface LegacyPosDraftLine {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly sku?: string;
  readonly price: number;
  readonly qty: number;
  readonly taxable: boolean;
}

interface LegacyPosDraft {
  readonly items: readonly LegacyPosDraftLine[];
  readonly customerId: string | null;
  readonly payment: "cash" | "card" | "wallet";
  readonly discount: number;
}
```

Supported draft commands are exactly:

```ts
type LegacyPosDraftCommand =
  | { readonly type: "add-product"; readonly product: LegacyPosProductSnapshot }
  | { readonly type: "change-quantity"; readonly productId: string; readonly delta: number }
  | { readonly type: "remove-item"; readonly productId: string }
  | { readonly type: "clear" }
  | { readonly type: "select-customer"; readonly customerId: string | null }
  | { readonly type: "select-payment"; readonly payment: "cash" | "card" | "wallet" }
  | { readonly type: "set-discount-input"; readonly value: string | number }
  | { readonly type: "remove-discount" };
```

Rules preserved from the current page:

- adding a zero-stock Product is rejected with the existing localized feedback;
- repeated Product IDs coalesce into the existing line and increment quantity;
- quantity changes never reduce a line below `1` and have no newly introduced maximum;
- Product name, SKU, price, and taxability are copied when the line is added;
- removing and re-adding uses current Product data and preserves current ordering;
- discount normalization remains `Math.max(0, +value || 0)` with no new gross cap; and
- clearing the draft does not create, update, or remove a persisted Order.

There is no current persisted or draft price-edit command. Feature 055 adds no such command or UI.

## 4. Applied Commercial Snapshot

```ts
interface LegacyPosCommercialSnapshot {
  readonly subtotal: number;
  readonly discount: number;
  readonly vat: number;
  readonly net: number;
  readonly total: number;
}

interface LegacyPosCommercialSnapshotPort {
  calculate(input: {
    readonly items: readonly LegacyPosDraftLine[];
    readonly discount: number;
    readonly taxMode: "inclusive" | "exclusive";
    readonly taxRate: number;
  }): LegacyPosCommercialSnapshot;
}
```

The adapter delegates to the existing `computeDoc` compatibility calculation. It preserves native
JavaScript floating-point behavior, taxable/non-taxable proportional allocation, current
inclusive/exclusive VAT behavior, current non-clamped net/total behavior, and every current
rounding/coercion quirk. It is not promoted as canonical Pricing or Tax policy.

When POS builds `LegacyCreateOrderCommand`, it intentionally preserves the current payload quirk:
both `subtotal` and `net` receive the calculated `net` value. The Order service stores the supplied
snapshot and does not reprice it.

## 5. Order Create Command and Result

The existing `LegacyCreateOrderCommand` field shape remains source-compatible:

```ts
interface LegacyCreateOrderCommand {
  readonly items: readonly OrderItem[];
  readonly customerId: string | null;
  readonly payment: "cash" | "card" | "wallet";
  readonly discount: number;
  readonly vat: number;
  readonly subtotal: number;
  readonly total: number;
  readonly net: number;
}
```

The create service returns the same immediate compatibility result needed by the current provider
and Invoice handoff:

```ts
interface LegacyCreateOrderResult {
  readonly order: CommerceOrder;
  readonly orders: readonly CommerceOrder[];
  readonly branchInventory: readonly BranchInventory[];
  readonly stockMovements: readonly StockMovement[];
}
```

The result is synchronous. It is not a transport response and does not define future HTTP timing,
serialization, or error contracts.

## 6. Orders-Owned Persistence Contracts

### 6.1 Command repository

```ts
interface LegacyOrderCommandRepository {
  listForNumbering(
    scope: LegacyCommerceBusinessUnitScope,
  ): readonly CommerceOrder[];

  getById(
    scope: LegacyCommerceBranchScope,
    orderId: string,
  ): CommerceOrder | null;

  create(
    scope: LegacyCommerceBranchScope,
    order: CommerceOrder,
  ): readonly CommerceOrder[];

  applyReturnCompatibilityPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ): readonly CommerceOrder[];

  replaceDemoSeed(
    scope: LegacyCommerceBusinessUnitScope,
    orders: readonly CommerceOrder[],
  ): readonly CommerceOrder[];
}
```

These operation names are frontend-internal and compatibility-specific. The repository:

- persists Order records only;
- cannot calculate prices, validate Inventory, create Movements, publish React state, or access
  browser APIs;
- preserves records outside the requested scope during create, patch, and seed operations;
- rejects a same-ID foreign-scope record without disclosing it; and
- exposes no generic update, delete, cancel, status, item, discount, or lifecycle operation.

`replaceDemoSeed` is allowed only if characterization confirms the empty demo initialization still
needs an Order write. It is not a production Order lifecycle operation.

### 6.2 Compatibility number port

```ts
interface LegacyOrderNumberPort {
  next(scope: LegacyCommerceBusinessUnitScope): string;
}
```

The local implementation counts only matching Workspace + legacy Business Unit records and returns
`ORD-${String(count + 1).padStart(4, "0")}`. It remains count-based. It does not repair gaps,
parse maxima, detect duplicates, add Branch scope, reserve a number, or provide concurrency safety.

### 6.3 Deterministic dependencies

Existing clock and identifier dependencies remain injectable. The create sequence preserves the
current `ord` identifier prefix and exact call ordering relative to `bi` and `sm` identifiers and
timestamps. No random fallback is permitted.

## 7. Inventory-Owned Sale Effect

Orders may request an Inventory effect but cannot read or write Inventory records directly.

```ts
interface LegacyPreparedSaleInventoryEffect {
  readonly compatibilityToken: unknown;
}

interface LegacyOrderInventoryEffectPort {
  prepareSaleDeduction(input: {
    readonly scope: LegacyCommerceBranchScope;
    readonly items: readonly OrderItem[];
  }): LegacyPreparedSaleInventoryEffect;

  commitSaleDeduction(input: {
    readonly scope: LegacyCommerceBranchScope;
    readonly prepared: LegacyPreparedSaleInventoryEffect;
    readonly order: CommerceOrder;
    readonly actorId: string;
    readonly actorDisplayName: string;
  }): LegacySaleInventoryEffectResult;
}

interface LegacySaleInventoryEffectResult {
  readonly branchInventory: readonly BranchInventory[];
  readonly stockMovements: readonly StockMovement[];
}
```

`LegacyPreparedSaleInventoryEffect` is opaque to Orders. Inventory owns its concrete content.

Preserved rules:

- prepare accumulates duplicate Product quantities and throws `insufficient_stock` before the
  Order write;
- a line without `productId`, a missing scoped Product, or a null-stock Product with no scoped
  Branch position remains in the Order but is skipped by Inventory;
- complete Workspace + legacy Business Unit + Branch scope is used for Product and position
  lookup;
- commit updates an existing position or creates one using the current `bi` prefix and fallback
  threshold;
- duplicate lines deduct sequentially and create one `sale` Movement per tracked line;
- positions persist before Movements; and
- no reservation, release, restoration, rollback, compensation, or lock is introduced.

## 8. Return-to-Order Handoff

Returns retains Return validation, totals, numbering, Return/Invoice/Inventory writes, and its
existing notification timing. Only the Order-owned compatibility change crosses an Order port.

```ts
interface LegacyOrderReturnCompatibilityPatch {
  readonly returnStatus: "partial" | "returned";
  readonly returnedTotalIncrement: number;
  readonly returnId: string;
}

interface LegacyOrderReturnHandoffPort {
  getOrder(
    scope: LegacyCommerceBranchScope,
    orderId: string,
  ): CommerceOrder | null;

  applyPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ): readonly CommerceOrder[];
}
```

The patch preserves `(returnedTotal || 0) + increment` and appends to existing `returnIds`. It does
not define Return lifecycle semantics. The handoff itself does not emit an Order change
notification; the Return coordinator retains the current notification point after its complete
sequential workflow.

## 9. POS Checkout Coordination

```ts
interface LegacyPosCheckoutInput {
  readonly context: LegacyCommerceCommandContext;
  readonly draft: LegacyPosDraft;
  readonly commercialSnapshot: LegacyPosCommercialSnapshot;
  readonly tenderedAmount: number;
}

interface LegacyPosCheckoutResult {
  readonly order: CommerceOrder;
  readonly invoice: CommerceInvoice;
  readonly successRoute: "/pos/success";
}
```

`LegacyPosCheckoutService` depends on application-facing Order creation, existing Invoice creation,
provider-publication, and last-Order ports. It performs this exact synchronous sequence:

```text
create Order and Inventory effects
  -> publish Order/Inventory/Movement compatibility snapshots
  -> create Invoice
  -> publish Invoice compatibility snapshot
  -> persist last successful Order ID
  -> return success result
  -> UI clears transient presentation state and navigates
```

No automatic retry, double-submit prevention, optimistic mutation, rollback, or compensation is
added. If a later step fails, earlier committed and published effects remain exactly as currently
characterized.

### Publication port

```ts
interface LegacyCommerceCommandPublicationPort {
  publishOrderResult(result: LegacyCreateOrderResult): void;
  publishInvoiceResult(result: LegacyCreateInvoiceResult): void;
}
```

This is a React-neutral outer port. `AppProvider` may implement or subscribe to it and publish the
returned snapshots, but it contains no validation, numbering, pricing, Inventory, Order, or Invoice
rule and performs no persistence.

### Last-Order port

```ts
interface LegacyPosLastOrderPort {
  read(): string | null;
  write(orderId: string): void;
  clear(): void;
}
```

The browser implementation wraps the existing `nx_last_order_id` session helper. The success page
uses an application-facing hook/port and never reads `sessionStorage` directly.

## 10. Change Notification and Cache Refresh

After the same committed point as today, the Orders application service calls the existing
framework-neutral `CommerceChangeNotificationPort` with complete Workspace, legacy Business Unit,
Branch, Order ID, and Customer ID. Inventory receives its exact scoped notification after the
successful Order path, including the current no-changed-position case.

Only the outer React Query adapter maps that intent to Order/Inventory query keys. The application
service and repository do not import React Query or query-key modules. Notification failures remain
fire-and-forget and do not repeat or roll back persistence.

## 11. State and Commit Transitions

### 11.1 POS draft

```text
empty/draft
  -> draft command
  -> recalculated draft
  -> submit requested
  -> checkout success | checkout error
```

The current UI owns rendering, modal state, focus, toast, and navigation. The POS hook exposes the
same command outcome/pending/error presentation without making the draft durable.

### 11.2 Successful create

```text
validate context and input
  -> prepare Inventory effect (read/validate only)
  -> read scoped number sequence
  -> construct compatible Order
  -> persist Orders
  -> commit Branch Inventory
  -> commit Stock Movements
  -> notify Order change
  -> notify Inventory change
  -> return synchronous snapshots
```

### 11.3 Characterized partial failures

- prepare/validation failure: no Order or Inventory write;
- Order storage failure: no subsequent Inventory write;
- Branch Inventory failure after Order success: Order remains persisted;
- Movement failure after Order and position success: both earlier writes remain;
- notification failure: persistence/result remain successful and no source write repeats;
- Invoice failure after Order publication: Order and stock remain committed and published;
- last-Order failure after Invoice publication: earlier Order, Inventory, Invoice, and publication
  effects remain.

These are compatibility observations, not desired transaction semantics.

## 12. Supported and Absent Command Matrix

| Requested operation | Feature 055 classification | Boundary |
|---|---|---|
| Create Order | Supported | Orders create service/repository |
| Update Order | Absent except the Return compatibility patch | No general command |
| Delete/remove Order | Absent in active source | No command |
| Cancel Order | Absent | No command |
| Change persisted status | Absent | No command |
| Apply/remove discount | Supported only on transient POS draft | POS draft service |
| Add/remove item | Supported only on transient POS draft | POS draft service |
| Update item quantity | Supported only on transient POS draft | POS draft service |
| Update item price | Absent | No command |
| Recalculate totals | Supported only as transient compatibility calculation | POS commercial snapshot port |
| Reserve/release Inventory | Absent | No command |
| Stock deduction | Supported | Inventory-owned effect port requested by Orders |
| Restore stock | Absent as an Order command; Return restock remains Returns/Inventory behavior | No Order command |
| Order validation | Supported only as characterized create checks | Orders/POS/Inventory owner boundaries |
| Number generation | Supported | Orders-owned compatibility number port |
| Compatibility callbacks | Supported while consumed | Stable application-facing services; provider delegates |
| Return field update | Indirect supported behavior | Return-to-Order handoff |
| Demo empty seed | Indirect compatibility behavior | Narrow Order bootstrap seam if still required |

This matrix is a migration inventory, not a declaration of final lifecycle or backend capability.

## 13. Implementation Conformance

The completed frontend slice implements only the supported and indirect rows above. Persisted
Order creation, Return compatibility patching, and empty demo seeding use the scoped Order command
repository; transient POS commands remain non-durable; and all absent operations remain absent.
Committed snapshots retain complete Workspace, legacy Business Unit, and applicable Branch scope.
The legacy Return callback resolves the target Order within the current Workspace and legacy
Business Unit and uses that Order's Branch for the owner handoff, preserving the existing
cross-Branch shell-selection journey without exposing a foreign-scope record.

The observed commit order remains Inventory prepare, Order write, Inventory positions,
Movements, scoped notifications/publication, Invoice, last-Order session value, and UI navigation.
No rollback, retry, reservation, locking, lifecycle, HTTP, DTO, pagination, authorization,
idempotency, or canonical Business decision was added.
