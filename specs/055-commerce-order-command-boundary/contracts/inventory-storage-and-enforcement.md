# Contract: Inventory Effects, Storage, Composition, and Enforcement

**Classification**: Frontend-internal compatibility contract  
**Owners**: Commerce Inventory for Stock effects; SDK infrastructure for local persistence;
Commerce runtime for composition  
**Canonical API status**: Not a public or backend contract

## Inventory Effect Port

Orders depends on `LegacyOrderInventoryEffectPort`, never on Product/Inventory repositories or
records directly. The port is implemented by an Inventory-owned application service.

### Prepare stage

`prepareSaleDeduction`:

- receives complete Workspace + legacy Business Unit + Branch scope and submitted Order items;
- reads only scope-safe Product snapshots and Branch Inventory through Inventory-facing ports;
- accumulates duplicate Product quantities for sufficiency checks;
- preserves the current tracked/untracked/missing/null-stock behavior;
- throws the same `insufficient_stock` error before any Order write; and
- returns an opaque prepared value that Orders can pass back but cannot inspect or construct.

Prepare performs no persistence, notification, or provider publication.

### Commit stage

`commitSaleDeduction`:

- receives the prepared value, committed Order identity, exact scope, and actor snapshot;
- preserves sequential line deductions and one Movement per tracked line;
- updates existing positions or constructs current compatible positions through Inventory policy;
- writes the complete positions collection before the complete movements collection;
- returns current full compatibility snapshots for provider publication; and
- introduces no reservation, release, restoration, locking, transaction, rollback, or retry.

Inventory owns effective-stock fallback, low-stock threshold fallback, position construction,
Movement construction, and persistence. Orders neither calculates nor saves those records.

## Storage Port and Adapters

### Order command storage

The private local Order repository depends on a synchronous SDK-internal storage port with
distinct command methods over the existing Order collection. Conceptually:

```ts
interface LocalOrderCommandStore {
  readOrderCommandRecords(): readonly unknown[];
  replaceOrderCommandRecords(records: readonly unknown[]): void;
}
```

The naming must remain distinct from Feature 053's asynchronous read-store methods so existing read
contracts do not change timing. The repository performs scope filtering and compatible mapping;
the store performs serialization and browser interaction only.

`BrowserStorageCommerceStore` implements the browser version over
`nexoraxs.db.commerceOrders`. `MemoryCommerceStore` implements the deterministic test version.
There is no second Order browser store and no active Order write through the broad
`LegacyCommerceOperationsStore` after migration.

### Inventory storage

Inventory uses its owner-approved local store/adapter over the unchanged Branch Inventory and Stock
Movement keys. Orders never imports that store. If Feature 054's broad compatibility operations
store remains for other retained domains, its Order write methods are removed or made unreachable
after every active Order writer migrates.

### Browser session storage

The last-Order browser adapter wraps the existing shared session helper/key. POS pages, hooks,
services, and success components contain no direct `localStorage` or `sessionStorage` access.

### Storage behavior

Browser adapters preserve:

- exact keys and JSON/raw-string shapes;
- array order, omitted fields, unknown fields, and clone behavior;
- empty result for missing collection key;
- current error for corrupt/non-array collection data;
- current browser-unavailable/quota/write failure; and
- refresh persistence with no data migration.

## Composition Contract

Implementation selection remains two-stage and single-locus:

```text
packages/sdk createCommerceServices(runtimeConfig)
  -> selects browser/local or memory/test repositories and stores

apps/commerce createCommerceApplicationServices(sdkServices, outerAdapters)
  -> assembles POS, Order, Inventory, Invoice, publication, notification, and last-Order services

CommerceServicesProvider
  -> creates and retains one stable runtime for the application lifetime
```

Pages, components, hooks, providers, and application services never branch on `mock`, `local`,
`memory`, or future `http`. Environment variables are read only by the existing runtime-config
constructor. No HTTP option is implemented by Feature 055.

The standard SDK root exports only stable runtime factories/types. Concrete Order repositories,
stores, serializers, simulators, and compatibility facades remain private or on the controlled
testing entry point required by contract tests.

## Enforced Dependency Rules

The existing architecture scanner and ESLint rules are extended so active frontend production
source fails validation when:

- an Order/POS application module imports React, React Query, Next.js navigation, a hook, page,
  component, provider, query-key module, browser API, environment reader, SDK concrete class, or
  infrastructure module;
- a page, component, hook, provider, or Core module directly imports an Order repository,
  repository implementation, Order store, serializer, behavior simulator, or private SDK path;
- an Order repository imports UI, hooks, providers, cache, another app, or owner application logic;
- Orders reads/writes Product, Inventory, Movement, Invoice, or Return storage directly;
- Returns writes an Order collection except through the public Order handoff;
- Core constructs, seeds, or persists an Order record;
- direct `localStorage`/`sessionStorage` occurs outside approved infrastructure paths;
- any application/provider path retains `readOrders`/`replaceOrders` collection authority after
  migration; or
- the SDK root exports private command infrastructure.

Tests scan all active `apps/**` and `packages/**` production TypeScript/JavaScript source using the
existing deterministic source inventory. Each rule has at least one valid and invalid fixture, and
diagnostics identify rule ID and file without printing tenant data or raw browser values.

## Deterministic Failure Contract

Memory repositories and focused test adapters accept explicit failure rules keyed by operation and
stage. A rule triggers only at its configured stage and consumes or repeats according to its
declared deterministic mode. No test uses `Math.random`, clock time, race timing, or uncontrolled
latency.

Required stages include prepare read/validation, Order read/create, position write, Movement write,
Order notification, Inventory notification, provider publication, Invoice creation/publication,
and last-Order write.

## Verification Contract

Completion requires evidence that:

- local and memory Order repositories pass one reusable contract suite;
- complete scope prevents reads, counts, writes, cache invalidation, and provider publication from
  crossing Workspace/legacy-Business-Unit/Branch boundaries;
- Order, Inventory, Movement, Invoice, and last-Order commit order and partial failures match
  characterization;
- Feature 053 Order query contracts remain unchanged;
- every active Order write source passes through the new owner boundary exactly once;
- architecture fixtures reject all listed invalid dependencies;
- deterministic suites repeat twenty times with identical results; and
- strict TypeScript, zero-warning ESLint, architecture checks, Commerce/root builds, Vitest, and
  applicable Playwright regression/accessibility suites pass.

## Implementation Conformance

Inventory prepare is read-only and returns an opaque value; commit owns compatible position and
Movement construction and retains positions-before-Movements persistence. The Order repository
uses only the synchronous command storage port over the unchanged Order key, and last-Order access
uses only the approved browser session adapter. Complete scope, foreign-row preservation,
deterministic failure stages, composition-only implementation selection, SDK export privacy, and
the production source rules are covered by executable contract and architecture tests.

This implementation adds no HTTP adapter, API/DTO shape, server authorization, transaction,
locking, pagination, idempotency, offline synchronization, or data migration.
