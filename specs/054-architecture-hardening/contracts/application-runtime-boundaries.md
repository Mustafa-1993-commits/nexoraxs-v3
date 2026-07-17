# Application Runtime Boundaries

**Feature**: 054 Architecture Hardening  
**Status**: Frontend-internal compatibility contract  
**Audience**: Core/Commerce frontend implementers and architecture-test authors

## Contract Fence

This contract governs dependency direction in the current frontend implementation. It is not a
public platform API, backend service contract, Event schema, or final SDK guarantee. Every type is
temporary/legacy unless it is an already-governed repository contract from Features 052/053.

## 1. Required Dependency Direction

```text
UI / React adapter
  -> Feature hook
  -> Application port or focused service
  -> Repository / owner compatibility contract
  -> Private SDK implementation
  -> Storage port
  -> Browser or memory adapter
```

Outer layers may depend inward. No inward layer may import an outer framework or implementation.

### Layer obligations

| Layer | May know | Must not know |
|---|---|---|
| Page/component | Hooks, presentation values, localized messages | Repository/store/facade implementations, browser persistence |
| Feature hook | Application ports/services and repository contracts | Concrete facades/repos/stores/serializers, browser persistence |
| Application port/service | Contracts and other inward application ports | React, React Query, Next.js, browser globals, hooks, providers, query keys, concrete SDK |
| Contract | Domain/compatibility values, commands, queries, results, errors | Apps, SDK implementations, framework, environment, storage, transport |
| Repository/compatibility implementation | Its inward contract and narrow storage port | UI, hook, provider, another app's source |
| Browser/cache adapter | Inward port plus required outer framework/browser API | Business ownership or canonical writes beyond its port |

## 2. Product and Customer Compatibility Ports

Hooks/provider consumers use `LegacyProductsCompatibilityPort` and
`LegacyCustomersCompatibilityPort`. The concrete SDK facade class names do not appear in:

- hook imports or inferred public return types;
- `CommerceServices` or `CommerceApplicationServices`;
- provider props/context;
- application service constructors; or
- production test helpers outside the controlled testing entry.

Concrete facade classes may remain private in `packages/sdk` and are constructed only inside the
Commerce composition factory. They must preserve:

- Product unpaged-list publication;
- Product create/update/remove refresh publication;
- Product demo seed replacement;
- Customer list/create/update full-scope publication;
- listener unsubscribe behavior; and
- cloned scope/record snapshots.

## 3. Commerce Change Notification Port

Application code receives only:

```ts
interface CommerceChangeNotificationPort {
  productsChanged(input: LegacyProductChangedInput): Promise<void>;
  customersChanged(input: LegacyCustomersChangedInput): Promise<void>;
  inventoryChanged(input: LegacyInventoryChangedInput): Promise<void>;
  ordersChanged(input: LegacyOrderChangedInput): Promise<void>;
  invoicesChanged(input: LegacyInvoiceChangedInput): Promise<void>;
}
```

The port cannot import or expose `QueryClient`, React Query options/results, query-key tuples,
hooks, cache modules, React, or browser APIs.

### React Query adapter mapping

Only `ReactQueryCommerceChangeAdapter` imports the QueryClient and feature key factories.

| Port call | Exact affected keys |
|---|---|
| `productsChanged` | Matching Product scoped list(s) and supplied item; no other W/BU/Branch |
| `customersChanged` | Matching BU Customer list/item and matching Branch history/history-list where supplied |
| `inventoryChanged` | Matching W/BU/Branch Inventory list/projection only |
| `ordersChanged` | Matching Branch Order list, BU Order item, related Customer history and history-list |
| `invoicesChanged` | Matching Branch Invoice list, BU detail/document items, related BU Order item |

Rules:

1. Every key is produced by its existing feature key factory.
2. A BU-wide key contains explicit `null` for Branch when that is the existing shape.
3. Filter/pagination/view-kind segments remain normalized and complete.
4. No resource-prefix invalidation may include another Workspace, BU, or Branch.
5. Notification is requested only after the existing persistence commit point.
6. Cache failure never creates, retries, or rolls back an operational write.
7. This mechanism is named/documented as cache change notification, never as a Domain Event or
   Integration Event.

## 4. Stable Composition Contract

### Infrastructure-selection stage

`createCommerceServices(config)` is the only runtime module allowed to:

- interpret `dataSource`;
- construct browser/memory stores;
- construct mock repositories;
- construct concrete compatibility facades;
- connect repository implementations to storage ports; and
- expose only contract-typed runtime services.

HTTP mode remains request-free/unavailable. No HTTP repository is introduced by Feature 054.

Core's read-only Commerce projection adapter is selected once in
`apps/core-platform/lib/commerce/createCoreCommerceIntegration.ts`; Core providers consume the
contract-typed singleton and do not select SDK infrastructure during render.

### Application/React assembly stage

`createCommerceApplicationServices` may:

- call the SDK composition factory;
- create focused application services from returned contracts/ports;
- create the QueryClient;
- create the outer React Query change adapter; and
- return one stable provider value.

It may not deep-import or construct SDK concrete infrastructure. The QueryClient is passed only to
the outer adapter and QueryClientProvider, not into application services.

### Runtime identity

`CommerceServicesProvider` creates the root once per application runtime. One hundred rerenders must
preserve identity for:

- repositories;
- Product/Customer compatibility ports;
- focused application services;
- Core projection/handoff/Storage Coordination ports used by Commerce;
- React Query change adapter; and
- QueryClient.

Provider tests may inject a contract-typed services factory. They must not require production
provider code to import `CommerceServiceOverrides`, Memory stores, behavior simulators, or mocks.

## 5. Media and Storage Coordination Split

```text
Product UI File
  -> UI File-to-MediaSource adapter
  -> Product editor/application service
  -> browser-neutral thumbnail port
  -> browser canvas adapter
  -> Core Storage Coordination compatibility port (quota/usage)
  -> Product media association compatibility port
```

Ownership:

- Product Catalog: association of media reference to the Product compatibility record.
- Browser infrastructure: current File/Blob/Image/URL/canvas conversion.
- Core Storage Coordination: Workspace usage/quota assessment and usage update.
- AppProvider: no policy; only delegates and presents the current result.

Application ports/services must not name or accept `File`, `Blob`, `HTMLImageElement`, `Image`,
`document`, `URL`, canvas types, `localStorage`, or `sessionStorage`.

Behavior preserved:

- current JPEG result, maximum dimension, quality, maximum bytes, and `null` failure;
- current missing-usage allowance and quota-overflow result;
- media write before usage update;
- Product create compensation/removal and edit ordering; and
- existing localized toast/error behavior at the presentation boundary.

No upload/storage-provider/HTTP shape is created.

## 6. Relationship Failure Contract

Order/Invoice view services use a shared inward helper that implements exactly:

```text
typed LegacyCommerceRepositoryError + code not_found -> null
anything else                                         -> throw unchanged
```

Repositories distinguish:

- no record with the ID in any scope: `not_found`;
- same ID exists only outside requested scope: non-disclosing `scope_mismatch`.

The helper never catches an arbitrary error as optional absence. React Query keeps `retry: false`;
the user activates the existing localized retry control for propagated failures.

## 7. Runtime Service Surface

The production runtime surface contains contract/interface types and focused application-service
types only, such as:

```ts
interface CommerceApplicationServices {
  readonly productsRepository: LegacyProductsRepository;
  readonly productsCompatibility: LegacyProductsCompatibilityPort;
  readonly customersRepository: LegacyCustomersRepository;
  readonly customersCompatibility: LegacyCustomersCompatibilityPort;
  readonly inventoryRepository: LegacyInventoryRepository;
  readonly ordersRepository: LegacyOrdersRepository;
  readonly invoicesRepository: LegacyInvoicesRepository;

  readonly customerHistory: LegacyCustomerHistoryService;
  readonly inventoryProjection: LegacyInventoryProjectionService;
  readonly orderView: LegacyOrderViewService;
  readonly invoiceView: LegacyInvoiceViewService;

  readonly setupCommands: LegacyCommerceSetupService;
  readonly productMedia: LegacyProductMediaService;
  readonly stockAdjustments: LegacyStockAdjustmentService;
  readonly transfers: LegacyStockTransferService;
  readonly returns: LegacyReturnCreationService;
  readonly orderCommands: LegacyOrderCreationService;
  readonly invoiceCommands: LegacyInvoiceCreationService;
}
```

The names may be grouped during implementation, but no grouping may erase frozen owner boundaries
or expose a concrete SDK type.

The general `@nexoraxs/sdk` entry exposes only the runtime factories/types required by these exact
composition roots. Mock repositories, Browser/Memory stores, serializers, behavior simulators,
and concrete compatibility facades remain available only from `@nexoraxs/sdk/testing` for tests.

## 8. Environment and Retry Rules

- `NEXT_PUBLIC_*` variables are read only in
  `apps/commerce/lib/commerce/commerce-runtime-config.ts`.
- Contracts, hooks, pages, providers, repositories, and application services never read environment
  variables.
- All included queries/mutations retain `retry: false`.
- Remount, focus, reconnect, effects, and timers do not automatically repeat failed operations.
- Exact-scope invalidation after another successful write is a change notification, not retry.

## 9. Conformance Evidence

The boundary is conformant only when tests prove:

- zero application imports of React/React Query/Next/browser/query-key/concrete SDK modules;
- zero concrete facade types in runtime/provider/hook contracts;
- one stable runtime across 100 rerenders;
- exact-scope invalidation for all resource families and view kinds;
- only typed not-found becomes optional;
- Product media behavior remains byte/visible compatible; and
- a contract-conforming substitute implementation requires no page, hook, service, or provider
  consumer change.
