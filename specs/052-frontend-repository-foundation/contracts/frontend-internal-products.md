# Frontend-Internal Products Compatibility Contract

> **Not a platform/API contract.** This document specifies only the Feature 052 frontend mock seam.
> It does not settle DD-02, DD-14, or DD-29 and must not be used as an HTTP DTO or canonical
> organization/Product model.

## Package Direction

```text
apps/commerce pages
  -> apps/commerce Product hooks/application service
  -> @nexoraxs/contracts internal repository port
  -> @nexoraxs/sdk mock implementation
  -> @nexoraxs/sdk mock storage port/adapter
```

No contract module imports React, browser globals, environment configuration, storage, transport,
or an application source directory.

## Scope

```ts
interface LegacyProductScope {
  workspaceId: string;
  legacyBusinessUnitId: string;
  branchId?: string;
}
```

`legacyBusinessUnitId` maps to the existing record's `businessUnitId`. It must never be renamed to
or reused as canonical `businessId`. Branch is compatibility view/cache context, not a declaration
of canonical Product ownership.

## Repository

```ts
interface LegacyProductsRepository {
  list(
    scope: LegacyProductScope,
    query?: ListLegacyProductsQuery,
  ): Promise<LegacyProductListResult>;

  getById(
    scope: LegacyProductScope,
    productId: string,
  ): Promise<LegacyProductRecord>;

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
  ): Promise<{ removedId: string }>;
}
```

Every method validates scope before record access. An ID by itself is insufficient. There is no
`archive`, `status`, public pagination, transport error, or network idempotency contract.

## Storage Port

The storage port is mock infrastructure and therefore belongs to `packages/sdk`, not
`packages/contracts`:

```ts
interface MockCommerceStore {
  readProducts(): Promise<readonly unknown[]>;
  replaceProducts(records: readonly unknown[]): Promise<void>;
}
```

The repository validates/maps `unknown`, serializes mutations per instance, and commits one full
array. `BrowserStorageCommerceStore` alone accesses localStorage. `MemoryCommerceStore` clones its
input/output so test callers cannot mutate store state by reference.

## Query-Key Contract

The key factory is application infrastructure and includes all scope/result variables:

```text
["commerce", "legacy-products", workspaceId, legacyBusinessUnitId,
 branchId-or-null, operation, operation-input]
```

Examples:

```text
list: ["commerce", "legacy-products", "ws1", "bu1", "br1", "list", {page: 1, pageSize: 20}]
item: ["commerce", "legacy-products", "ws1", "bu1", null, "item", "p1"]
```

Mutation invalidation uses the exact prefix through `branchId-or-null`; it must not invalidate a
different Workspace, legacy `BusinessUnit`, or Branch-shaped projection.

## Compatibility Facade

The facade:

- delegates all Product reads/writes to `LegacyProductsRepository`;
- exposes compatible list/create/update/remove shapes for temporary compatibility callers;
- publishes a refreshed list only after a successful repository mutation;
- never asks `AppProvider` to persist Product data; and
- is deleted only after all legacy Product consumers migrate.

Product hooks call the repository or bounded editor service. After a successful hook mutation they
request an unpaged facade list; that publication updates legacy `AppProvider.products` readers
without dual-writing Product storage. AppProvider itself uses facade list/subscription only. The
demo-only seed method writes characterized compatible records through the injected store so `p1`,
`p2`, and the existing browser shape are not regenerated.

## Application Service Boundary

`LegacyProductEditorService` is used only for create/edit operations that coordinate repository
data with the existing media compatibility port. List/get/remove hooks call the repository directly.
This service does not become a canonical Commerce domain service.

For image create, Product persistence supplies the compatible ID needed by the media port. A media
failure triggers best-effort Product rollback and is covered by tests. Edit uploads before Product
update, so a failed media result leaves Product state unchanged.

## Failure and Observability Contract

- All failures are deterministic under injected clock/ID/rules.
- Foreign records never appear in errors.
- Failed validation, duplicate SKU, scope mismatch, configured failure, and storage failure commit
  no Product change.
- Diagnostics record operation, controlled duration, outcome, and non-sensitive scope correlation.
- Diagnostics are test evidence, not Core Audit records.

## Future HTTP Boundary

`dataSource: "http"` is accepted only so startup can fail clearly when the implementation is
unavailable or configuration is incomplete. This feature defines no endpoint, payload, auth
scheme, retry policy, error mapping, API version, or transport implementation.
