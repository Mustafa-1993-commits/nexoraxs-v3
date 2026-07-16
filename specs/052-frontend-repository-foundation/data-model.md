# Phase 1 Data Model: Frontend Repository Foundation

## Boundary Warning

Every model in this document is a temporary frontend mock/compatibility model. None is a canonical
Commerce aggregate, Core organization identity, public platform contract, or future HTTP DTO.
DD-02, DD-14, and DD-29 remain deferred.

## LegacyProductScope

| Field | Type | Required | Validation | Meaning |
|---|---|---:|---|---|
| `workspaceId` | string | yes | trimmed, non-empty | Current mock tenant input |
| `legacyBusinessUnitId` | string | yes | trimmed, non-empty | Current stored `BusinessUnit.id`; not canonical Business ancestry |
| `branchId` | string | no | trimmed, non-empty when present | Compatibility view context, especially Branch stock/cache identity |

Rules:

- Never add or derive `businessId`.
- Stored Product access matches `record.workspaceId === scope.workspaceId` and
  `record.businessUnitId === scope.legacyBusinessUnitId`.
- Branch is not used to decide Product ownership or catalog visibility; it remains in cache identity
  when Branch-shaped projections are displayed.
- Missing/invalid scope fails before reading or mutating records.

## LegacyProductRecord

The typed compatibility record preserves the current serialized shape and unknown JSON-safe keys.

| Field | Type | Mutability | Notes |
|---|---|---|---|
| `id` | string | immutable | Preserve seeded and generated IDs |
| `workspaceId` | string | immutable | Stored legacy scope field |
| `businessUnitId` | string | immutable | Maps from `legacyBusinessUnitId`; not a canonical scope contract |
| `branchId` | string | compatibility-preserved | Legacy creation/view context |
| `osSubscriptionId` | string | compatibility-preserved | Not Product-owned |
| `name` | string | editable | Trimmed; minimum 3 characters for current form behavior |
| `category` | string | editable | Empty maps to current `General` fallback at the presentation boundary |
| `sku` | string | editable | Empty allowed; non-empty normalized uniqueness within legacy scope |
| `barcode` | string | editable | Preserved as entered after trim |
| `brand` | string, optional | editable | Compatibility descriptor |
| `unit` | string, optional | editable | Preserved current Product Catalog-related field |
| `notes` | string | editable | Preserved as entered |
| `price` | number | compatibility-editable | Pricing-owned fact preserved by combined form |
| `cost` | number | compatibility-editable | Pricing/cost compatibility fact |
| `taxable` | boolean | compatibility-editable | Tax compatibility fact |
| `stock` | number or null | compatibility-editable | Inventory compatibility projection |
| `low` | number, optional | compatibility-preserved | Legacy stock threshold alias |
| `lowStockThreshold` | number | compatibility-editable | Inventory compatibility field |
| `expiry` | string, optional | compatibility-editable | Existing preset field; no lifecycle semantics added |
| `image` | string or null, optional | compatibility-editable | Media reference/data preserved through explicit port |
| `createdAt` | ISO-like string | immutable | Controlled clock for new test records |
| `updatedAt` | ISO-like string | repository-managed | Updated after successful create/edit only |
| unknown keys | JSON-safe values | preserved | Never dropped by mapping or unrelated update |

There is deliberately no `status`, `archivedAt`, `deletedAt`, lifecycle transition, or retention
field.

## Commands and Queries

### ListLegacyProductsQuery

- Optional internal `page` and `pageSize` must appear together.
- `page >= 1`; `pageSize >= 1` and is bounded by an internal safety maximum.
- Without pagination fields, list returns all in-scope records in stored order to preserve the UI.
- Pagination is an internal mock facility, not future API design.

### CreateLegacyProductCommand

- Contains editable/compatibility fields only.
- Does not accept `id`, scope fields, `createdAt`, or `updatedAt`.
- Repository supplies scope, ID, and controlled timestamps.
- Non-empty SKU is normalized with `trim().toLocaleLowerCase("en-US")` for comparison only; the
  stored/display value preserves trimmed casing.

### UpdateLegacyProductCommand

- Partial editable/compatibility fields.
- Cannot replace ID, Workspace, legacy `BusinessUnit`, creation time, or unknown unrelated fields.
- Empty patches are rejected as internal validation errors.

### RemoveLegacyProductCommand

- Contains an explicit Product ID plus `LegacyProductScope` at method boundary.
- Successful result is `{ removedId }`.
- Missing or foreign-scope target produces a non-leaking internal not-found/scope-safe outcome.

## Internal Results

### LegacyProductListResult

- `items`: compatible records for the scope.
- `total`: total in-scope records before optional pagination.
- `page`: current page or `null` when unpaginated.
- `pageSize`: page size or `null` when unpaginated.
- `hasNextPage`: internal continuation hint.

These fields can change with a later frontend migration and are not a public compatibility promise.

## Internal Errors

`LegacyProductRepositoryError` is a discriminated internal error with:

- `code`: `validation | not_found | duplicate_sku | scope_mismatch | configured_failure |
  configuration | storage`;
- `messageKey`: localization-safe presentation key, not raw foreign data;
- optional field issue map for the current form;
- optional non-sensitive operation/correlation metadata.

Rules:

- No error contains a foreign Product record or secret.
- Duplicate SKU and validation fail before commit.
- Storage/configured failures leave the last committed array unchanged.
- Error categories do not become platform/API taxonomy.

## Mock Failure Rule

| Field | Type | Required | Notes |
|---|---|---:|---|
| `operation` | list/get/create/update/remove | yes | Exact operation match |
| `invocation` | positive integer | no | Fail only the matching call number |
| `productId` | string | no | Optional exact target |
| `normalizedSku` | string | no | Optional create/update match |
| `errorCode` | configured failure/storage | yes | Deterministic internal outcome |

Rules are evaluated in declared order. No random fallback exists.

## Mock Diagnostic Event

- `operation`
- controlled `durationMs`
- outcome category only
- hashed/redacted or otherwise non-sensitive legacy-scope correlation
- optional Product ID only in isolated test sinks, never a full payload

Diagnostics are not Audit records and are not persisted with Product data.

## Service Relationships

```text
CommerceRuntimeConfig
  -> createCommerceServices
      -> MockCommerceStore
          -> BrowserStorageCommerceStore | MemoryCommerceStore
      -> MockProductsRepository
      -> LegacyProductsCompatibilityFacade
      -> QueryClient (provider-owned)

Product list/get/remove hook -> LegacyProductsRepository
Product create/edit hook -> LegacyProductEditorService
LegacyProductEditorService -> LegacyProductsRepository + LegacyMediaCompatibilityPort
AppProvider legacy products projection -> LegacyProductsCompatibilityFacade
```

## Compatibility State Changes

This is not a canonical lifecycle. It documents only array effects:

```text
absent --create--> present --update--> present --remove--> absent
```

- Create appends one in-scope record.
- Update replaces one in-scope record while preserving immutable/unknown fields.
- Remove filters one in-scope record from the stored array.
- Failed operations leave the stored array unchanged.
