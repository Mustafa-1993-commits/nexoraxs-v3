# Frontend-Internal Commerce Repository Contracts

**Feature**: 053 Commerce Repository Pattern Expansion  
**Audience**: Commerce frontend implementers and contract-test authors  
**Stability**: Temporary legacy compatibility seam; not a public SDK or transport contract

## Governance Fence

These TypeScript-like signatures define only the minimum browser-mock behavior needed by Feature
053. They do not define canonical Product, Customer, Inventory, Order, or Invoice ownership,
lifecycle, pagination, errors, idempotency, or future HTTP DTOs. `businessId` is intentionally
absent. DD-01, DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19, DD-21, DD-23, DD-24, DD-25, and
DD-29 remain unresolved.

Feature 052 Product exports and behavior are preserved unchanged. Implementations may share
private mechanics, but may not change the existing Product public surface to fit these additions.

## Common legacy scope

```ts
export interface LegacyCommerceBusinessUnitScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
}

export interface LegacyCommerceBranchScope
  extends LegacyCommerceBusinessUnitScope {
  readonly branchId: string;
}
```

Every repository validates non-empty normalized values. Stored `businessUnitId` matches
`legacyBusinessUnitId`; the stored field is not renamed. A mismatch fails closed.

## Common frontend-internal support types

```ts
export type LegacyCommerceOperation =
  | "customers.list"
  | "customers.getById"
  | "customers.create"
  | "customers.update"
  | "inventory.list"
  | "orders.list"
  | "orders.getById"
  | "invoices.list"
  | "invoices.getById";

export type LegacyCommerceErrorCode =
  | "invalid_scope"
  | "validation"
  | "not_found"
  | "scope_mismatch"
  | "configured_failure"
  | "storage_unavailable"
  | "configuration";

export interface LegacyCommerceFieldIssue {
  readonly field: string;
  readonly code: string;
}

export interface LegacyCommerceRepositoryErrorContract {
  readonly name: "LegacyCommerceRepositoryError";
  readonly code: LegacyCommerceErrorCode;
  readonly operation: LegacyCommerceOperation;
  readonly fieldIssues?: readonly LegacyCommerceFieldIssue[];
  readonly retryable: boolean;
}

export interface LegacyCommerceListResult<T> {
  readonly items: readonly T[];
}

export interface LegacyCommerceListQuery {
  readonly search?: string;
}

export interface LegacyCommerceBranchFilteredListQuery
  extends LegacyCommerceListQuery {
  /** Required by route lists; omitted only for characterized BU-wide composition. */
  readonly branchId?: string;
}
```

The implementation may expose domain-specific subclasses/unions for narrowing. UI-facing messages
are localized outside these contracts. Error objects never contain a full record, Customer contact
data, a secret, or a foreign record identifier.

## Customer repository

The known record fields mirror the existing `CommerceCustomer` storage shape. Compatible unknown
JSON fields are retained internally by serialization and Customer update mapping.

```ts
export interface LegacyCustomerCompatibilityRecord {
  readonly id: string;
  readonly workspaceId: string;
  readonly businessUnitId: string;
  readonly branchId: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly notes: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateLegacyCustomerCommand {
  readonly branchId: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly notes: string;
}

export interface UpdateLegacyCustomerCommand {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly notes?: string;
}

export interface LegacyCustomersRepository {
  list(
    scope: LegacyCommerceBusinessUnitScope,
    query?: LegacyCommerceListQuery,
  ): Promise<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>>;

  getById(
    scope: LegacyCommerceBusinessUnitScope,
    customerId: string,
  ): Promise<LegacyCustomerCompatibilityRecord>;

  create(
    scope: LegacyCommerceBusinessUnitScope,
    command: CreateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;

  update(
    scope: LegacyCommerceBusinessUnitScope,
    command: UpdateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;
}
```

Customer create/update is atomic and returns the committed record. The contract has no delete,
archive, merge, consent, retention, identity-match, or CRM operation.

## Inventory repository

```ts
export interface LegacyBranchInventoryCompatibilityRecord {
  readonly id: string;
  readonly workspaceId: string;
  readonly businessUnitId: string;
  readonly branchId: string;
  readonly productId: string;
  readonly qty: number;
  readonly lowStockThreshold: number;
  readonly updatedAt: string;
}

export interface LegacyInventoryRepository {
  list(
    scope: LegacyCommerceBranchScope,
    query?: LegacyCommerceListQuery,
  ): Promise<LegacyCommerceListResult<LegacyBranchInventoryCompatibilityRecord>>;
}
```

There is deliberately no Inventory mutation. Adjustment, movement, transfer, sale deduction,
return restock, reservation, and lifecycle behavior remain in their retained paths.

## Order repository

```ts
export interface LegacyOrderItemCompatibilityRecord {
  readonly productId?: string;
  readonly id?: string;
  readonly name: string;
  readonly qty: number;
  readonly price: number;
  readonly taxable: boolean;
  readonly sku?: string;
}

export interface LegacyOrderCompatibilityRecord {
  readonly id: string;
  readonly orderNumber: string;
  readonly workspaceId: string;
  readonly businessUnitId: string;
  readonly branchId: string;
  readonly customerId: string | null;
  readonly items: readonly LegacyOrderItemCompatibilityRecord[];
  readonly payment: "cash" | "card" | "wallet";
  readonly discount: number;
  readonly vat: number;
  readonly subtotal: number;
  readonly total: number;
  readonly net: number;
  readonly cashierId: string;
  readonly cashierName: string;
  readonly createdAt: string;
  readonly returnStatus?: "none" | "partial" | "returned";
  readonly returnedTotal?: number;
  readonly returnIds?: readonly string[];
}

export interface LegacyOrdersRepository {
  list(
    scope: LegacyCommerceBusinessUnitScope,
    query?: LegacyCommerceBranchFilteredListQuery,
  ): Promise<LegacyCommerceListResult<LegacyOrderCompatibilityRecord>>;

  getById(
    scope: LegacyCommerceBusinessUnitScope,
    orderId: string,
  ): Promise<LegacyOrderCompatibilityRecord>;
}
```

Route lists pass `branchId`; Customer history and explicitly characterized business-unit-wide
compositions may omit it. No method creates, changes, prices, taxes, pays, cancels, fulfills,
returns, or deducts stock for an Order.

## Invoice repository

```ts
export interface LegacyInvoiceCompatibilityRecord {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly orderId: string;
  readonly workspaceId: string;
  readonly businessUnitId: string;
  readonly branchId: string;
  readonly customerId: string | null;
  readonly items: readonly LegacyOrderItemCompatibilityRecord[];
  readonly subtotal: number;
  readonly discount: number;
  readonly vat: number;
  readonly total: number;
  readonly net: number;
  readonly cashierId: string;
  readonly cashierName: string;
  readonly createdAt: string;
  readonly returnIds?: readonly string[];
}

export interface LegacyInvoicesRepository {
  list(
    scope: LegacyCommerceBusinessUnitScope,
    query?: LegacyCommerceBranchFilteredListQuery,
  ): Promise<LegacyCommerceListResult<LegacyInvoiceCompatibilityRecord>>;

  getById(
    scope: LegacyCommerceBusinessUnitScope,
    invoiceId: string,
  ): Promise<LegacyInvoiceCompatibilityRecord>;
}
```

Route lists pass `branchId`; linked detail/document compositions may use the current
business-unit-wide view. No method issues, renumbers, taxes, pays, credits, or posts an Invoice.

## Narrow mock-store ports

Repositories depend on these ports, never on `window`, `localStorage`, or a storage key.

```ts
export interface MockCustomersStore {
  readCustomers(): Promise<readonly unknown[]>;
  replaceCustomers(records: readonly unknown[]): Promise<void>;
}

export interface MockInventoryStore {
  readInventory(): Promise<readonly unknown[]>;
}

export interface MockOrdersStore {
  readOrders(): Promise<readonly unknown[]>;
}

export interface MockInvoicesStore {
  readInvoices(): Promise<readonly unknown[]>;
}

export interface MockCommerceDataStore
  extends MockCustomersStore,
    MockInventoryStore,
    MockOrdersStore,
    MockInvoicesStore {}
```

The existing Feature 052 `MockCommerceStore` remains source-compatible. The browser implementation
may implement both the existing Product port and `MockCommerceDataStore`; repositories receive the
narrow interface. The memory implementation supports isolated fixtures without a browser and
retains its existing Product constructor behavior.

## Deterministic repository behavior

```ts
export interface LegacyCommerceFailureRule {
  readonly operation: LegacyCommerceOperation;
  readonly invocation?: number;
  readonly fixtureId?: string;
  readonly code?: "configured_failure" | "storage_unavailable";
}

export interface LegacyCommerceMockOptions {
  readonly latencyMs?: number;
  readonly failureRules?: readonly LegacyCommerceFailureRule[];
  readonly now?: () => Date;
  readonly createId?: (kind: "customer") => string;
  readonly onDiagnostic?: (event: LegacyCommerceDiagnosticEvent) => void;
}

export interface LegacyCommerceDiagnosticEvent {
  readonly operation: LegacyCommerceOperation;
  readonly durationMs: number;
  readonly outcome:
    | "success"
    | "validation"
    | "not_found"
    | "scope_mismatch"
    | "configured_failure"
    | "storage_unavailable";
  readonly correlationId?: string;
  readonly scopeFingerprint?: string;
}
```

`latencyMs` must be non-negative. Failure evaluation is stable by rule and invocation; there is no
random branch. Diagnostics use non-reversible/minimized scope fingerprints and contain no payload.
They are local test/development diagnostics, not append-only Audit evidence.

## Store conformance requirements

Browser and memory implementations must satisfy the same observable cases:

1. Empty, missing, compatible, corrupt, and unavailable collections.
2. Preserved ordering and unknown compatible Customer fields.
3. Scope-isolated reads with overlapping IDs.
4. Atomic Customer create/update and unchanged data on every failure.
5. Stable deterministic latency/failure invocation counts.
6. No storage rewrite on read.
7. No Product regression from additive store changes.

Only the browser compatibility adapter imports or names the four storage keys. Repositories,
hooks, services, facades, pages, and components do not.
