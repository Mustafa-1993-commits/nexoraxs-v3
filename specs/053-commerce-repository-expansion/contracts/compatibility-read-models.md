# Compatibility Read Models, Hooks, and Runtime Contract

**Feature**: 053 Commerce Repository Pattern Expansion  
**Status**: Frontend-internal integration contract  
**Non-authority**: Reconstructable views and caches never own canonical facts or writes

## Runtime direction

```text
Migrated Page / Component
  -> Feature Query or Customer Mutation Hook
  -> Repository (simple operation)
     OR bounded read Application Service (multi-repository composition)
  -> Frontend-Internal Repository Contract(s)
  -> Mock Repository
  -> Narrow Mock Store Port
  -> Browser Compatibility Store

Repository-backed Customer result
  -> Customer Compatibility Facade
  -> Remaining Legacy Consumer

Retained Inventory / Order / Invoice write
  -> Existing single writer and browser commit
  -> Exact-scope read coordinator notification
  -> React Query invalidation/refetch
```

`AppProvider` remains for excluded state and writes but is neither the composition root nor an
upstream Customer writer after migration.

## Stable Commerce services runtime

The existing Feature 052 runtime is extended additively:

```ts
interface CommerceServices {
  // Existing Feature 052 fields remain source-compatible.
  readonly productsRepository: LegacyProductsRepository;
  readonly productsCompatibilityFacade: LegacyProductsCompatibilityFacade;

  // Feature 053 additions.
  readonly customersRepository: LegacyCustomersRepository;
  readonly inventoryRepository: LegacyInventoryRepository;
  readonly ordersRepository: LegacyOrdersRepository;
  readonly invoicesRepository: LegacyInvoicesRepository;
  readonly customersCompatibilityFacade: LegacyCustomersCompatibilityFacade;
  readonly customerHistoryService: LegacyCustomerHistoryService;
  readonly inventoryProjectionService: LegacyInventoryProjectionService;
  readonly orderViewService: LegacyOrderViewService;
  readonly invoiceViewService: LegacyInvoiceViewService;
  readonly readCoordinator: LegacyCommerceReadCoordinator;
}
```

The actual implementation may group fields by domain if that is additive for Product consumers.
All instances are created once by `createCommerceServices` and held by
`CommerceServicesProvider`; hooks read stable references. Pages never construct a repository.

`CommerceRuntimeConfig` remains the sole implementation selection input. Only
`apps/commerce/lib/commerce/commerce-runtime-config.ts` may read `NEXT_PUBLIC_*` variables. Mock
mode uses the browser compatibility store. HTTP mode is unavailable and fails with a safe
configuration error before any network call.

## Direct hook-to-repository operations

No application service is used for these simple operations:

| Hook responsibility | Contract call |
|---|---|
| Customer list/search | `customersRepository.list` |
| Customer item | `customersRepository.getById` |
| Customer create | `customersRepository.create` |
| Customer update | `customersRepository.update` |
| Raw Branch Inventory list | `inventoryRepository.list` |
| Raw Order list/item where no relation is needed | `ordersRepository.list/getById` |
| Raw Invoice list/item where no relation is needed | `invoicesRepository.list/getById` |

Pages consume hooks, not repository objects. A hook may select/present data but does not validate a
Customer command, calculate stock, recalculate commercial values, or persist a record.

## Bounded read application services

### Customer history

```ts
interface LegacyCustomerHistoryService {
  getCustomerHistory(input: {
    scope: LegacyCommerceBusinessUnitScope;
    branchId?: string;
    customerId: string;
  }): Promise<LegacyCustomerHistoryView>;
}
```

The service independently scopes the Customer and Orders and derives only the current displayed
history metrics from stored Order snapshots. It cannot write either source. `/customers` metrics
use the active Branch as currently characterized; Customer visibility remains business-unit-wide.

### Inventory projection

```ts
interface LegacyInventoryProjectionService {
  listInventory(input: {
    scope: LegacyCommerceBranchScope;
  }): Promise<readonly LegacyInventoryProjectionRow[]>;
}
```

The service composes Feature 052 Products with Branch Inventory records. Each relation is
scope-checked. It reproduces the current effective-quantity fallback, threshold, ordering, summary,
and status inputs; it defines no stock rule and has no write method.

### Order view

```ts
interface LegacyOrderViewService {
  listOrders(input: {
    scope: LegacyCommerceBranchScope;
  }): Promise<readonly LegacyOrderView[]>;

  getOrder(input: {
    scope: LegacyCommerceBusinessUnitScope;
    orderId: string;
  }): Promise<LegacyOrderView>;
}
```

The service may join scope-checked Customer and Invoice records required by current presentation.
Product item snapshots remain usable if a Product is missing; a foreign Product is not joined.
Returns remain a temporary excluded provider input where the route currently requires them.

### Invoice/document view

```ts
interface LegacyInvoiceViewService {
  listInvoices(input: {
    scope: LegacyCommerceBranchScope;
  }): Promise<readonly LegacyInvoiceView[]>;

  getInvoice(input: {
    scope: LegacyCommerceBusinessUnitScope;
    invoiceId: string;
    viewKind: "detail" | "document";
  }): Promise<LegacyInvoiceView>;
}
```

The service joins only a scope-checked Order and Customer. It preserves the characterized
detail-versus-document Customer lookup/fallback and stored monetary snapshots. It does not issue,
renumber, tax, pay, credit, or account for an Invoice.

## Relationship safety contract

Every application service follows this sequence:

```text
Validate requested legacy scope
  -> read source record in that scope
  -> read referenced record through its own scoped repository
  -> reject/non-disclose a mismatch
  -> use characterized safe fallback for absence
  -> return a disposable view
```

An ID equality check alone is never sufficient. No service fetches a global collection and joins it
before scope filtering. No missing relation is repaired or persisted.

## Query-key factories

Domain-owned key factories are the only supported way to build/invalidate keys. Each returns a
readonly tuple with normalized scope and shaping input:

```ts
const legacyCustomerKeys = {
  list: (scope, search) => [
    "commerce", "legacy-customers",
    scope.workspaceId, scope.legacyBusinessUnitId,
    "list", normalize(search),
  ] as const,
  item: (scope, id) => [
    "commerce", "legacy-customers",
    scope.workspaceId, scope.legacyBusinessUnitId,
    "item", id,
  ] as const,
};

const legacyInventoryKeys = {
  list: (scope, filters) => [
    "commerce", "legacy-inventory",
    scope.workspaceId, scope.legacyBusinessUnitId, scope.branchId,
    "list", normalize(filters),
  ] as const,
};

const legacyOrderKeys = {
  list: (scope, branchIdOrNull, filters) => [
    "commerce", "legacy-orders",
    scope.workspaceId, scope.legacyBusinessUnitId, branchIdOrNull,
    "list", normalize(filters),
  ] as const,
  item: (scope, id) => [
    "commerce", "legacy-orders",
    scope.workspaceId, scope.legacyBusinessUnitId, null,
    "item", id,
  ] as const,
};

const legacyInvoiceKeys = {
  list: (scope, branchIdOrNull, filters) => [
    "commerce", "legacy-invoices",
    scope.workspaceId, scope.legacyBusinessUnitId, branchIdOrNull,
    "list", normalize(filters),
  ] as const,
  item: (scope, id, viewKind) => [
    "commerce", "legacy-invoices",
    scope.workspaceId, scope.legacyBusinessUnitId, null,
    "item", id, viewKind,
  ] as const,
};
```

The concrete implementation also owns keys for Customer history, Inventory projections, and
composed views. Those keys include every contributing scope, ID, filter, and `viewKind`. A Branch
change cannot reuse a prior Branch result. Business-unit-wide reads encode an explicit `null`
Branch segment.

## Retry and request-state contract

The Commerce QueryClient and every included hook use:

```ts
queries: {
  retry: false,
  retryOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
}
mutations: {
  retry: false,
}
```

Rules:

1. A failed read stays failed until the user activates the localized retry control.
2. A failed Customer mutation retains safe form input and runs again only after explicit submit.
3. Pending Customer submission disables/rejects duplicate submit and exposes semantic busy state.
4. Switching scope starts a request for a different full key and never renders foreign cached data.
5. A successful retained-write notification may refetch the exact affected key; it is not a retry
   of a failed operation.
6. Tests prove focus, reconnect, remount, rerender, timers, and component lifecycle do not cause a
   second invocation after a configured failure.

## Customer compatibility facade

```ts
interface LegacyCustomersCompatibilitySnapshot {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customers: readonly LegacyCustomerCompatibilityRecord[];
  readonly version: number;
}

interface LegacyCustomersCompatibilityFacade {
  getSnapshot(
    scope: LegacyCommerceBusinessUnitScope,
  ): Promise<LegacyCustomersCompatibilitySnapshot>;

  subscribe(
    scope: LegacyCommerceBusinessUnitScope,
    listener: (snapshot: LegacyCustomersCompatibilitySnapshot) => void,
  ): () => void;
}
```

The repository is upstream. Successful repository persistence advances/publishes the compatible
snapshot once. A failed write publishes nothing. The facade has no callback that delegates an
included write to `AppProvider`. If a legacy consumer still needs a write, that consumer migrates
before its provider callback is removed.

No read-only Inventory/Order/Invoice facade is required merely to feed the provider's full mutable
arrays. Unmigrated legacy consumers may continue reading provider state while the included primary
routes use repositories. This avoids letting a partial scoped read overwrite data needed by a
retained writer.

## Retained-write read coordinator

```ts
interface LegacyCommerceReadCoordinator {
  inventoryCommitted(scopes: readonly LegacyCommerceBranchScope[]): Promise<void>;
  orderCommitted(scope: LegacyCommerceBranchScope, orderId: string): Promise<void>;
  invoiceCommitted(scope: LegacyCommerceBranchScope, invoiceId: string): Promise<void>;
  returnCommitted(input: {
    scope: LegacyCommerceBranchScope;
    orderId: string;
    invoiceId?: string;
    restocked: boolean;
  }): Promise<void>;
}
```

The existing writer invokes the corresponding method only after its current persistence operation
has succeeded. The coordinator uses domain key factories to invalidate/refetch matching lists,
items, and composed views. It never reads storage directly and never repeats a write.

| Notification | Minimum exact-scope invalidation |
|---|---|
| `inventoryCommitted` | Inventory raw/projection keys for each supplied Branch |
| `orderCommitted` | Branch Order list, BU Order item, Customer-history views, Branch Inventory projection |
| `invoiceCommitted` | Branch Invoice list, BU Invoice item/document, linked Order view |
| `returnCommitted` | Matching Order/Invoice views; Inventory only when `restocked` |

Invalidation does not use a global `commerce` prefix. Tests seed overlapping IDs across scopes and
assert that unrelated cache entries and invocation counters are unchanged.

## UI state and accessibility contract

Each migrated read supplies:

- localized loading content;
- localized empty content;
- localized safe not-found content for details;
- localized error content with a named keyboard-operable manual retry control;
- success content matching the characterized route.

Customer forms additionally supply:

- visible and semantic pending state (`disabled`/`aria-disabled` as appropriate and busy status);
- field-associated translated validation (`aria-describedby`/`aria-invalid` as appropriate);
- safe focus after validation or recoverable failure;
- duplicate-submit prevention; and
- unchanged user-entered mixed-direction text.

English uses LTR and Arabic uses RTL through the existing localization/direction mechanism. New
layout changes use logical properties. Status meaning is not conveyed by color alone. Only missing
states/accessibility affordances may change the visible UI.

## Legacy responsibility matrix

| Responsibility | Feature 053 source after migration | Temporary legacy state |
|---|---|---|
| Product reads/writes/removal facade | Feature 052 repository/hooks/facade | Unchanged |
| Customer list/get/create/update | Customer repository/hooks | Provider callback removed only at zero callers |
| POS Customer selection/create | Customer hooks/facade | Order/Invoice writers retained |
| Inventory reads/projection | Inventory repository + projection service | Stock writers/helper retained |
| Order list/detail reads | Order repository + view service | Create/return and unrelated legacy readers retained |
| Invoice list/detail/document reads | Invoice repository + view service | Creation/return and unrelated legacy readers retained |
| Returns, transfers, movements | Existing provider paths | Entirely outside new repositories |

## Source-boundary assertions

Automated source tests must prove:

- storage keys and browser globals occur only in compatibility store modules;
- `process.env`/`NEXT_PUBLIC_*` reads occur only in the runtime-config constructor;
- pages/components import hooks, not mock/browser/HTTP repository classes;
- hooks import contracts/services and do not call `fetch`, `localStorage`, or `sessionStorage`;
- Inventory/Order/Invoice repository exports contain no mutation method;
- Customer facade does not import or invoke `AppProvider` write callbacks;
- applications do not import another application's source; and
- Feature 052 Product contract exports and runtime identity tests remain unchanged.
