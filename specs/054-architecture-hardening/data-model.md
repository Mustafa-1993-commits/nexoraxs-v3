# Phase 1 Data Model: Architecture Hardening

**Feature**: 054 Architecture Hardening  
**Status**: Frontend-internal compatibility design  
**Canonical data impact**: None

## Governance Fence

This document models temporary frontend values and ports needed to preserve current browser-demo
behavior. It does not define canonical aggregates, lifecycle states, public SDK/API contracts,
Laravel DTOs, server errors, pagination, idempotency, authorization, upload transport, object
storage, transactions, or offline synchronization.

Existing record IDs, stored fields, storage keys, timestamps, number formats, unknown JSON fields,
and cross-record references remain unchanged. The types below are additive seams around those
records.

Implementation status: the values below are enforced as frontend-internal ports. No new persistent
entity, key, canonical owner, lifecycle state, or transport shape was introduced; browser records
remain byte-compatible compatibility data behind exact storage adapters.

`legacyBusinessUnitId` always means the current stored `businessUnitId` compatibility identifier.
It is not a canonical Business, does not prove canonical Business Unit ancestry, and is never
renamed in existing browser records.

## 1. Existing Legacy Scope Values

### 1.1 Business-unit scope

```ts
interface LegacyCommerceBusinessUnitScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
}
```

Validation:

- both identifiers trim to non-empty values;
- a stored record must match both values before disclosure or mutation; and
- missing/ambiguous context fails closed.

### 1.2 Branch scope

```ts
interface LegacyCommerceBranchScope
  extends LegacyCommerceBusinessUnitScope {
  readonly branchId: string;
}
```

Validation:

- `branchId` trims to a non-empty value;
- every Branch-varying read/change/cache input includes it; and
- a Branch identifier is never accepted as proof of Workspace/Business Unit access.

### 1.3 Product scope

Feature 052's existing shape remains source-compatible:

```ts
interface LegacyProductScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string;
}
```

An absent Branch is normalized as explicit `null` in cache keys where the result is
business-unit-wide.

## 2. Product and Customer Compatibility Ports

These ports expose existing compatibility publication behavior without concrete SDK facade types.

### 2.1 Product compatibility port

```ts
type LegacyProductsCompatibilityListener = (
  scope: LegacyProductScope,
  products: readonly LegacyProductRecord[],
) => void;

interface LegacyProductsCompatibilityPort {
  list(
    scope: LegacyProductScope,
    query?: ListLegacyProductsQuery,
  ): Promise<LegacyProductListResult>;

  create(
    scope: LegacyProductScope,
    command: CreateLegacyProductCommand,
  ): Promise<LegacyProductRecord>;

  update(
    scope: LegacyProductScope,
    productId: string,
    command: UpdateLegacyProductCommand,
  ): Promise<LegacyProductRecord>;

  remove(
    scope: LegacyProductScope,
    productId: string,
  ): Promise<RemoveLegacyProductResult>;

  subscribe(listener: LegacyProductsCompatibilityListener): () => void;

  seedCompatibleProducts(
    products: readonly LegacyProductRecord[],
  ): Promise<void>;
}
```

Rules:

- publication occurs only after the same successful operations as Feature 052;
- an unpaged list publishes the complete scoped list; paginated lists do not replace provider
  compatibility state;
- listeners receive cloned scope/records; and
- seed behavior remains demo-only and is not a Product lifecycle operation.

### 2.2 Customer compatibility port

```ts
interface LegacyCustomersCompatibilitySnapshot {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customers: readonly LegacyCustomerCompatibilityRecord[];
}

type LegacyCustomersCompatibilityListener = (
  snapshot: LegacyCustomersCompatibilitySnapshot,
) => void;

interface LegacyCustomersCompatibilityPort {
  list(
    scope: LegacyCommerceBusinessUnitScope,
  ): Promise<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>>;

  create(
    scope: LegacyCommerceBusinessUnitScope,
    command: CreateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;

  update(
    scope: LegacyCommerceBusinessUnitScope,
    command: UpdateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;

  subscribe(listener: LegacyCustomersCompatibilityListener): () => void;
}
```

Rules:

- create/update publishes the final full scoped list once after commit;
- existing known-field mapping into provider state is preserved; and
- no delete/archive/CRM/identity lifecycle operation is added.

## 3. Commerce Change Notification Port

The application port uses resource-specific methods rather than exposing a cache client or Event
bus.

### 3.1 Change inputs

```ts
interface LegacyProductChangedInput {
  readonly scope: LegacyProductScope;
  readonly productId?: string;
}

interface LegacyCustomersChangedInput {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customerId?: string;
  readonly branchId?: string | null;
}

interface LegacyInventoryChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly productIds?: readonly string[];
}

interface LegacyOrderChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly orderId: string;
  readonly customerId?: string | null;
}

interface LegacyInvoiceChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly invoiceId: string;
  readonly orderId: string;
}
```

### 3.2 Port

```ts
interface CommerceChangeNotificationPort {
  productsChanged(input: LegacyProductChangedInput): Promise<void>;
  customersChanged(input: LegacyCustomersChangedInput): Promise<void>;
  inventoryChanged(input: LegacyInventoryChangedInput): Promise<void>;
  ordersChanged(input: LegacyOrderChangedInput): Promise<void>;
  invoicesChanged(input: LegacyInvoiceChangedInput): Promise<void>;
}
```

Rules:

- called only after the corresponding current persistence step succeeds;
- never owns, mutates, or reconstructs source records;
- never broadens or drops Workspace/Business Unit/Branch scope;
- maps to query keys only in the outer React Query adapter; and
- is documented as cache-refresh intent, never as a Domain/Integration Event.

## 4. Legacy Command Context

Focused services receive explicit current compatibility context:

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

Rules:

- values preserve current IDs and error behavior;
- the service validates every identifier currently validated by the provider;
- absent actor display name preserves the characterized fallback (`Unknown` or `Cashier` according
  to the existing operation); and
- the context is a frontend safeguard, not production authorization.

## 5. Owner-Specific Compatibility Commands and Results

The following are command inputs/results, not canonical aggregate definitions.

### 5.1 Stock adjustment

```ts
interface LegacyAdjustStockCommand {
  readonly productId: string;
  readonly branchId?: string;
  readonly qty: number;
  readonly lowStockThreshold?: number;
}

type LegacyAdjustStockResult =
  | {
      readonly ok: true;
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
    }
  | { readonly ok: false; readonly error: string };
```

The success result carries committed snapshots for React publication. It does not grant the
provider write authority.

### 5.2 Transfer

```ts
interface LegacyTransferStockCommand {
  readonly toBranchId: string;
  readonly items: readonly {
    readonly productId: string;
    readonly qty: number;
  }[];
  readonly note?: string;
}

type LegacyTransferStockResult =
  | {
      readonly ok: true;
      readonly transfer: StockTransfer;
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
      readonly stockTransfers: readonly StockTransfer[];
    }
  | { readonly ok: false; readonly error: string };
```

Transfer intent and record remain Transfer-owned. Source/destination Stock and Movement effects are
performed through Inventory-owned compatibility ports.

### 5.3 Return

```ts
interface LegacyCreateReturnCommand {
  readonly orderId: string;
  readonly items: readonly {
    readonly productId: string;
    readonly qty: number;
  }[];
  readonly reason: string;
  readonly refundMethod: RefundMethod;
  readonly restock: boolean;
}

type LegacyCreateReturnResult =
  | {
      readonly ok: true;
      readonly returnRecord: CommerceReturn;
      readonly orders: readonly CommerceOrder[];
      readonly invoices: readonly CommerceInvoice[];
      readonly returns: readonly CommerceReturn[];
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
    }
  | { readonly ok: false; readonly error: string };
```

The Return service coordinates existing owner ports; it does not claim ownership of Refund, Stock,
Order, Invoice, or tax semantics.

### 5.4 Order

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

interface LegacyCreateOrderResult {
  readonly order: CommerceOrder;
  readonly orders: readonly CommerceOrder[];
  readonly branchInventory: readonly BranchInventory[];
  readonly stockMovements: readonly StockMovement[];
}
```

Stored price/tax/discount values remain caller-provided compatibility snapshots. The command does
not establish canonical pricing/payment/tax policy.

### 5.5 Invoice

```ts
interface LegacyCreateInvoiceCommand {
  readonly orderId: string;
}

interface LegacyCreateInvoiceResult {
  readonly invoice: CommerceInvoice;
  readonly invoices: readonly CommerceInvoice[];
}
```

Invoice numbering retains the current setup prefix/start and active legacy Business Unit count.
It is not a final numbering-policy contract.

### 5.6 Commerce setup

```ts
interface LegacyCommerceSetupContext {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly osSubscriptionId: string;
  readonly industryOrPreset?: string | null;
}

interface LegacySaveCommerceSetupCommand {
  readonly context: LegacyCommerceSetupContext;
  readonly changes: Partial<CommerceSetup>;
}

interface LegacyCommerceSetupResult {
  readonly setup: CommerceSetup;
  readonly setups: readonly CommerceSetup[];
}
```

An absent setup read returns the exact current virtual/default value without persisting it. Save
preserves current identity/timestamp/default merge behavior.

## 6. Narrow Persistence Ports

Focused services depend on owner-specific ports, even when one private browser adapter implements
several ports:

```ts
interface LegacyInventoryWritePort {
  readPositions(): readonly BranchInventory[];
  replacePositions(records: readonly BranchInventory[]): void;
  readMovements(): readonly StockMovement[];
  replaceMovements(records: readonly StockMovement[]): void;
}

interface LegacyTransferWritePort {
  readTransfers(): readonly StockTransfer[];
  replaceTransfers(records: readonly StockTransfer[]): void;
}

interface LegacyReturnWritePort {
  readReturns(): readonly CommerceReturn[];
  replaceReturns(records: readonly CommerceReturn[]): void;
}

interface LegacyOrderWritePort {
  readOrders(): readonly CommerceOrder[];
  replaceOrders(records: readonly CommerceOrder[]): void;
}

interface LegacyInvoiceWritePort {
  readInvoices(): readonly CommerceInvoice[];
  replaceInvoices(records: readonly CommerceInvoice[]): void;
}

interface LegacyCommerceSetupWritePort {
  readSetups(): readonly CommerceSetup[];
  replaceSetups(records: readonly CommerceSetup[]): void;
}
```

Implementation rules:

- each service receives only the ports it needs;
- ports preserve current read-copy/corruption/write-error behavior;
- writes retain the characterized order and are not upgraded to a transaction;
- no service reaches `localStorage`, `sessionStorage`, React state, or cache clients; and
- memory implementations run the same focused service contracts.

## 7. Browser-Neutral Media Values

### 7.1 Media source

```ts
interface LegacyMediaSource {
  readonly fileName: string;
  readonly mediaType: string;
  readonly sizeBytes: number;
  readonly bytes: Uint8Array;
}
```

Validation:

- file name/media type/size preserve current selected-file metadata;
- `sizeBytes` equals the byte-array length passed inward;
- cancellation produces no source and no application call; and
- no path, browser object URL, upload URL, multipart field, or storage-provider identifier exists.

### 7.2 Thumbnail result

```ts
interface LegacyCompressedImage {
  readonly dataUrl: string;
  readonly mimeType: "image/jpeg";
  readonly sizeBytes: number;
  readonly width: number;
  readonly height: number;
}

interface LegacyThumbnailPort {
  compress(
    source: LegacyMediaSource,
    options?: {
      readonly maxDimension?: number;
      readonly quality?: number;
      readonly maxBytes?: number;
    },
  ): Promise<LegacyCompressedImage | null>;
}
```

Defaults remain 200 pixels, quality `0.7`, and 60 KiB. The browser adapter owns Blob/Image/URL/
canvas use.

## 8. Core Storage Coordination Compatibility Port

```ts
interface LegacyWorkspaceStorageUsageProjection {
  readonly workspaceId: string;
  readonly usedBytes: number;
  readonly limitBytes: number;
  readonly updatedAt: string;
}

interface LegacyStorageAllocationResult {
  readonly allowed: boolean;
  readonly usage: LegacyWorkspaceStorageUsageProjection | null;
}

interface CoreStorageCoordinationCompatibilityPort {
  assessAllocation(input: {
    readonly workspaceId: string;
    readonly candidateBytes: number;
  }): LegacyStorageAllocationResult;

  commitUsageDelta(input: {
    readonly workspaceId: string;
    readonly deltaBytes: number;
  }): LegacyWorkspaceStorageUsageProjection | null;
}
```

Rules:

- missing current usage preserves the characterized allow-without-usage-update behavior;
- the quota decision remains Core-owned;
- media persistence still occurs before usage persistence as currently characterized;
- failure/partial-write behavior is preserved rather than redesigned; and
- this is not a final Storage Coordination API or quota lifecycle contract.

## 9. Core-to-Commerce Projection and Handoff Values

### 9.1 Read-only Commerce projection for Core

```ts
interface LegacyCommerceProductSummary {
  readonly id: string;
  readonly name: string;
  readonly stock: number | null;
  readonly lowStockThreshold: number | null;
}

interface LegacyCommerceOrderSummary {
  readonly id: string;
  readonly orderNumber: string;
  readonly total: number;
  readonly createdAt: string;
}

interface LegacyCommerceSetupSummary {
  readonly billingAddressLine1?: string;
  readonly billingAddressLine2?: string;
  readonly billingCity?: string;
  readonly billingCountry?: string;
  readonly billingPostalCode?: string;
  readonly vatRegistered?: boolean;
  readonly vatNumber?: string;
}

interface LegacyCommerceProjection {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly branchId: string | null;
  readonly products: readonly LegacyCommerceProductSummary[];
  readonly orders: readonly LegacyCommerceOrderSummary[];
  readonly setup: LegacyCommerceSetupSummary | null;
}

interface CommerceProjectionPort {
  readProjection(input: {
    readonly scope: LegacyCommerceBusinessUnitScope;
    readonly branchId?: string | null;
  }): Promise<LegacyCommerceProjection>;
}
```

Only fields proven necessary by current Core shell, Product Hub, and billing consumers are exposed.
The projection is reconstructable/read-only and never accepts a write.

### 9.2 Handoff context

```ts
interface LegacyCommerceHandoffContext {
  readonly actorId: string;
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string | null;
  readonly osId: "commerce";
  readonly osSubscriptionId?: string | null;
  readonly action: string;
  readonly resourceId?: string | null;
  readonly displayContext?: Readonly<Record<string, string>>;
}

interface CommerceHandoffPort {
  accept(context: LegacyCommerceHandoffContext): Promise<void>;
}
```

Rules:

- Core creates no Commerce operational record;
- Commerce creates no Core User/Workspace/Business Unit/Branch/Subscription identity;
- the receiving adapter may persist a read-only context projection for refresh compatibility;
- missing/rejected integration never triggers a fallback write; and
- URL/serialization/authorization details remain temporary and noncanonical.

## 10. Relationship Failure Classification

Existing `LegacyCommerceRepositoryError` remains the frontend-internal error contract.

```ts
function optionalCompatibilityRelation<T>(
  read: () => Promise<T>,
): Promise<T | null>;
```

Classification:

| Failure | Relationship result |
|---|---|
| `LegacyCommerceRepositoryError` with `code: "not_found"` | `null` |
| Same ID exists only in a foreign scope | throw non-disclosing `scope_mismatch` |
| Invalid/missing scope | throw |
| Configured deterministic failure | throw |
| Browser storage unavailable/corrupt | throw |
| Configuration failure | throw |
| Authorization-like compatibility failure | throw |
| Future transport failure | throw |
| Unknown/non-typed error | throw unchanged |

The helper never automatically retries and never returns a foreign record or identifier.

## 11. Architecture Rule Model

### 11.1 Rule definition

```ts
interface FrontendArchitectureRule {
  readonly id: string;
  readonly description: string;
  readonly appliesTo: readonly string[];
  readonly forbiddenImports?: readonly string[];
  readonly forbiddenResolvedTargets?: readonly string[];
  readonly forbiddenGlobals?: readonly string[];
  readonly exactAllowlist?: readonly string[];
}
```

### 11.2 Violation

```ts
interface FrontendArchitectureViolation {
  readonly ruleId: string;
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly reason: string;
  readonly dependency?: string;
}
```

Rules:

- diagnostics sort by file, line, column, then rule ID;
- diagnostics contain no tenant record, payload, browser value, secret, or Customer data;
- unresolved internal-looking imports fail rather than disappear from the graph; and
- no permanent suppression list is permitted.

### 11.3 Production source inventory

Included roots: `apps/**`, `packages/**`.

Included extensions: `.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.jsx`, `.mjs`, `.cjs`.

Excluded categories:

- `__tests__`, `__fixtures__`, test fixture roots, `.test.`, `.spec.`, `.stories.`;
- `.next`, `.turbo`, `node_modules`, `dist`, `build`, `out`, `coverage`;
- `playwright-report`, `test-results`;
- generated declarations, `next-env.d.ts`, and `*.generated.*`; and
- backend, docs, specs, and archives because they are outside the clarified roots.

## 12. Compatibility State Transitions

### 12.1 Provider delegation

```text
Legacy consumer callback
  -> AppProvider gathers current context
  -> focused application service validates and persists through owner ports
  -> service returns existing result + committed snapshots
  -> AppProvider publishes snapshots into compatibility React state
  -> outer cache adapter receives post-commit change intent
```

Failure before a characterized commit returns/throws the same current error. Failure after an
earlier sequential commit retains the same current partial outcome; no new rollback is inferred.

### 12.2 Cache notification

```text
not started -> persistence in progress -> committed -> notification requested -> settled
                               \-> failed (no notification)
```

Notification failure does not reverse the committed source write and does not create a second
write. Existing UI/manual recovery behavior is retained.

### 12.3 Product media

```text
File selected in UI
  -> bytes/metadata MediaSource
  -> browser thumbnail adapter
  -> Core quota assessment
  -> media compatibility persistence
  -> Core usage delta
  -> Product association/update
```

The Product editor's existing create/remove compensation and edit ordering remain separate from
the media service's storage sequence.

### 12.4 Core handoff

```text
Core-owned identity/context
  -> explicit read-only handoff value
  -> Commerce ingress validation
  -> temporary context projection/session persistence
  -> Commerce route/journey
```

No transition constructs or mutates a Core canonical identity in Commerce.

## 13. No New Persistent Entity

Feature 054 adds no new browser key or canonical record. Architecture rules, ports, command values,
media sources, projections, and notifications are in-memory or documentation/code contracts around
the existing keys. Any implementation need for a new persisted shape is a plan deviation and must
stop for review.
