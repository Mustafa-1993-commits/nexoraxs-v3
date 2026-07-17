# Phase 1 Data Model: Commerce Repository Pattern Expansion

**Feature**: 053 Commerce Repository Pattern Expansion  
**Date**: 2026-07-17  
**Contract status**: Frontend-internal legacy compatibility only

## Boundary Warning

The types in this document describe existing browser records and reconstructable UI reads. They
are not canonical Commerce aggregates, public SDK types, Laravel DTOs, API schemas, or production
authorization scopes. They do not answer DD-01, DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19,
DD-21, DD-23, DD-24, DD-25, or DD-29.

Canonical ownership remains:

| Fact | Frozen owner | Feature 053 behavior |
|---|---|---|
| Organization identities | Core Organization Registry | Uses supplied legacy IDs; creates none |
| Transactional Customer | Commerce Transactional Customers | Relocates current browser-demo create/update only |
| Product | Commerce Product Catalog | Feature 052 behavior is consumed unchanged |
| Stock and Inventory Movement | Commerce Inventory | Read projection only; existing writer retained |
| Order | Commerce Orders | Read projection only; existing writer retained |
| Invoice and Commerce Document | Commerce Invoices and Documents | Read projection only; existing writer retained |

## Compatibility Serialization Primitive

Unknown legacy fields must survive Customer updates and must never be removed by a read. Values
that pass through the compatibility mapper are limited to serializable JSON values:

```ts
type LegacyJsonValue =
  | null
  | boolean
  | number
  | string
  | LegacyJsonValue[]
  | { [key: string]: LegacyJsonValue };
```

Known fields below are validated for repository behavior. Compatible unknown fields are opaque and
preserved; they are not exposed as new business concepts.

## Temporary Scope Inputs

```ts
interface LegacyCommerceBusinessUnitScope {
  workspaceId: string;
  legacyBusinessUnitId: string;
}

interface LegacyCommerceBranchScope extends LegacyCommerceBusinessUnitScope {
  branchId: string;
}
```

### Scope rules

1. Every identifier is trimmed and must be non-empty.
2. `legacyBusinessUnitId` maps only to the current stored `businessUnitId` field. It is not a
   canonical Business and is not renamed in storage.
3. No operation accepts or fabricates `businessId`.
4. Business-unit-scoped lookup compares `workspaceId` and stored `businessUnitId`.
5. Branch-scoped lookup additionally compares `branchId`.
6. A scope mismatch is externally indistinguishable from absence when revealing existence would
   leak a foreign record.
7. Client-side checks are mock defense in depth, never proof of production authorization.

### Narrowest applicable scope

| Operation/view | Required scope | Reason |
|---|---|---|
| Customer list/get/update | Business Unit | Existing Customer visibility is cross-Branch within the legacy Business Unit |
| Customer create | Business Unit scope plus command `branchId` | Stored record captures the active Branch |
| Inventory list/projection | Branch | Quantities and thresholds vary by Branch |
| Order route list | Branch-filtered list | Existing list is active-Branch-specific |
| Order detail/history composition | Business Unit | Existing linked/detail behavior may cross Branches |
| Invoice route list | Branch-filtered list | Existing list is active-Branch-specific |
| Invoice detail/document composition | Business Unit | Existing linked/detail behavior may cross Branches |

## Legacy Customer Compatibility Record

Storage key: `nexoraxs.db.commerceCustomers`

| Field | Type | Compatibility rule |
|---|---|---|
| `id` | string | Immutable; generated with the characterized legacy convention |
| `workspaceId` | string | Immutable scope field |
| `businessUnitId` | string | Immutable stored legacy field; never renamed |
| `branchId` | string | Set from create command; immutable on update |
| `name` | string | Editable; trimmed non-blank value required |
| `phone` | string | Editable; current normalization behavior only |
| `email` | string | Editable; current normalization behavior only |
| `notes` | string | Editable and preserved as entered subject to characterized trimming |
| `createdAt` | ISO-compatible string | Set on create; immutable on update |
| `updatedAt` | ISO-compatible string | Set on create and refreshed on successful update |
| compatible unknown fields | JSON values | Preserved byte-compatible where regressions require; never assigned new semantics |

### Customer commands

```ts
interface CreateLegacyCustomerCommand {
  branchId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface UpdateLegacyCustomerCommand {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
}
```

Create accepts only current editable input and the current Branch. Update rejects empty patches and
scope/immutable-field changes. The repository returns the final stored record.

### Customer state transitions

```text
Absent --create(valid, in-scope)--> Present
Absent --create(invalid/failure)--> Absent
Present --update(valid, in-scope)--> Present with same id/createdAt/scope/unknown fields
Present --update(invalid/not-found/failure)--> Original Present record
```

Delete, archive, merge, deduplication, consent, retention, erasure, CRM status, and lifecycle
transitions do not exist in this contract.

## Legacy Branch Inventory Compatibility Record

Storage key: `nexoraxs.db.branchInventory`

| Field | Type | Read rule |
|---|---|---|
| `id` | string | Preserved opaque record ID |
| `workspaceId` | string | Must match scope |
| `businessUnitId` | string | Must match legacy Business Unit |
| `branchId` | string | Must match Branch |
| `productId` | string | Scoped Product reference |
| `qty` | number | Stored compatibility value; repository does not change it |
| `lowStockThreshold` | number | Stored compatibility value |
| `updatedAt` | string | Preserved timestamp |
| compatible unknown fields | JSON values | Preserved and not rewritten on read |

The repository owns no mutation or lifecycle. The Inventory presentation service combines these
records with Feature 052 Products and reproduces the characterized fallback for a Product without a
Branch Inventory record. It does not define stock policy.

## Legacy Order Compatibility Record

Storage key: `nexoraxs.db.commerceOrders`

### Order item

| Field | Type | Rule |
|---|---|---|
| `productId` | string, optional | Scope-safe Product reference when present |
| `id` | string, optional | Preserved legacy item ID |
| `name` | string | Stored snapshot |
| `qty` | number | Stored snapshot |
| `price` | number | Stored snapshot |
| `taxable` | boolean | Stored snapshot |
| `sku` | string, optional | Stored snapshot |

### Order fields

| Field group | Fields | Read rule |
|---|---|---|
| Identity | `id`, `orderNumber` | Preserved exactly |
| Scope | `workspaceId`, `businessUnitId`, `branchId` | Validated before return |
| References | `customerId`, `items[].productId` | Resolved only through same-scope reads |
| Commercial snapshots | `payment`, `discount`, `vat`, `subtotal`, `total`, `net` | Displayed as stored; never recalculated by repository/service |
| Operator snapshots | `cashierId`, `cashierName` | Preserved as stored |
| Time | `createdAt` | Preserved as stored |
| Existing return presentation | `returnStatus`, `returnedTotal`, `returnIds` | Compatibility data only; no return semantics or writes |
| Compatible unknown fields | JSON values | Preserved and not rewritten on read |

Order creation, editing, pricing, tax, payment, cancellation, fulfillment, return, and Inventory
effects are absent from the repository.

## Legacy Invoice Compatibility Record

Storage key: `nexoraxs.db.commerceInvoices`

| Field group | Fields | Read rule |
|---|---|---|
| Identity | `id`, `invoiceNumber` | Preserved exactly |
| Scope | `workspaceId`, `businessUnitId`, `branchId` | Validated before return |
| References | `orderId`, `customerId`, `items[].productId` | Resolved only through same-scope reads |
| Line snapshots | `items` | Same stored Order-item compatibility shape |
| Commercial snapshots | `subtotal`, `discount`, `vat`, `total`, `net` | Displayed using characterized presentation; never rewritten |
| Operator snapshots | `cashierId`, `cashierName` | Preserved as stored |
| Time | `createdAt` | Preserved as stored |
| Existing return links | `returnIds` | Compatibility data only |
| Compatible unknown fields | JSON values | Preserved and not rewritten on read |

Issuance, numbering, tax authority behavior, payment transitions, credit notes, and accounting
semantics are absent from the repository.

## Repository Queries and Results

```ts
interface LegacyListQuery {
  search?: string;
}

interface LegacyBranchFilteredListQuery extends LegacyListQuery {
  branchId?: string;
}

interface LegacyListResult<T> {
  items: readonly T[];
}
```

No cursor, page number, total count, or public ordering taxonomy is introduced. Repositories return
the characterized order after scope filtering. UI-only filters may remain above the repository when
they do not change the storage read.

## Internal Error and Failure Model

Each domain uses a visibly internal error contract with the minimum local categories:

| Category | Meaning | Mutation effect |
|---|---|---|
| `invalid_scope` | Missing/malformed scope input | No read disclosure; no write |
| `validation` | Invalid Customer command or local query | No write |
| `not_found` | Missing or non-disclosable out-of-scope ID | No write |
| `scope_mismatch` | Internal contract test/diagnostic category; UI receives safe absence | No write |
| `configured_failure` | Deterministic test/local-development failure | No write |
| `storage_unavailable` | Storage unavailable, corrupt, or quota failure | No partial write |
| `configuration` | Unsupported runtime mode, including HTTP | No request and no write |

Errors contain safe operation and field issue metadata only. They exclude Customer contact values,
full records, secrets, and foreign identifiers. These categories are not an API taxonomy.

Deterministic failures are keyed by domain, operation, optional fixture/invocation, and stable
configuration. Latency is a non-negative configured duration. Clock and ID generation are injected
in tests; uncontrolled randomness is forbidden.

## Reconstructable Application Read Models

### Customer history view

```text
Business-unit-scoped Customer
  + independently scoped Orders (Branch-filtered when the current route is Branch-specific)
  -> existing count, spend, latest-order, and navigation presentation
```

The service sums/displays stored Order snapshots only. It gains no Order write authority.

### Inventory presentation view

```text
Branch-scoped Feature 052 Products
  + Branch-scoped Inventory records
  -> characterized effective quantity, threshold, low/out/in-stock presentation
```

A cross-scope Product or Inventory row is excluded. A missing row uses only the characterized
fallback; a storage failure produces a recoverable error rather than a fabricated quantity.

### Order view

```text
Scoped Order
  + scope-checked Customer
  + scope-checked Product item references
  + scope-checked Invoice links
  -> list/detail compatibility presentation
```

Returns remain an excluded provider-owned compatibility input where the current UI needs them.

### Invoice/document view

```text
Scoped Invoice
  + scope-checked Order
  + scope-checked Customer
  + scope-checked Product item references
  -> list/detail/document compatibility presentation
```

The existing detail/document Customer-source fallback is characterized and preserved rather than
silently unified.

## Query-Key Model

All keys include the complete normalized scope and result-shaping input. The exact exported key
factory names are implementation details; the tuple shapes are contract evidence.

| Result | Key tuple shape |
|---|---|
| Customer list | `["commerce", "legacy-customers", workspaceId, legacyBusinessUnitId, "list", normalizedSearch]` |
| Customer item | `["commerce", "legacy-customers", workspaceId, legacyBusinessUnitId, "item", customerId]` |
| Customer history | `["commerce", "legacy-customer-history", workspaceId, legacyBusinessUnitId, branchIdOrNull, customerId]` |
| Inventory list/projection | `["commerce", "legacy-inventory", workspaceId, legacyBusinessUnitId, branchId, "list", normalizedFilters]` |
| Order list | `["commerce", "legacy-orders", workspaceId, legacyBusinessUnitId, branchIdOrNull, "list", normalizedFilters]` |
| Order item | `["commerce", "legacy-orders", workspaceId, legacyBusinessUnitId, null, "item", orderId]` |
| Invoice list | `["commerce", "legacy-invoices", workspaceId, legacyBusinessUnitId, branchIdOrNull, "list", normalizedFilters]` |
| Invoice item/document | `["commerce", "legacy-invoices", workspaceId, legacyBusinessUnitId, null, "item", invoiceId, viewKind]` |

`null` is an explicit normalized value meaning the result is business-unit-wide; it is never an
omitted accidental scope segment. A Customer or retained-write invalidation uses these same exact
factories rather than string prefixes assembled by consumers.

## Consistency and Atomicity Rules

1. Reads copy/deserialize without rewriting source storage.
2. Customer create/update validates the complete command and scope before replacing the collection.
3. A per-store mutation queue prevents overlapping Customer writes from losing an update.
4. Failed serialization or browser persistence leaves the previously committed collection intact
   where the browser adapter can guarantee it; no success is published before commit.
5. The memory and browser-compatible implementations run the same repository contract suite.
6. Same-tab retained writes notify exact-scope queries only after their existing commit succeeds.
7. Query caches contain reconstructable server-state views and are never persistence sources.
8. No automatic retry, focus retry, reconnect retry, or retry-on-mount invokes a second repository
   operation after a failure.

## Relationship Compatibility Matrix

| Source | Reference | Required validation | Missing/mismatched behavior |
|---|---|---|---|
| Inventory | Product | Same Workspace + legacy Business Unit; current Branch projection | Characterized Product/stock fallback or recoverable error |
| Order | Customer | Same Workspace + legacy Business Unit | Safe unnamed/absent fallback |
| Order item | Product | Same Workspace + legacy Business Unit; Branch only where current projection requires | Stored item snapshot remains; foreign Product is not joined |
| Invoice | Order | Same Workspace + legacy Business Unit | Safe missing-order fallback |
| Invoice | Customer | Same Workspace + legacy Business Unit | Characterized detail/document fallback |
| Invoice item | Product | Same Workspace + legacy Business Unit | Stored item snapshot remains; foreign Product is not joined |

No relationship resolver rewrites the source record or confirms the existence of a record in
another scope.
