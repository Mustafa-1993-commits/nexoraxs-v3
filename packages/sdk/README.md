# `@nexoraxs/sdk`

This package owns frontend implementation concerns behind governed contracts: mock repositories,
mock storage adapters, API DTO mapping/serialization when approved, transport seams, composition,
and implementation diagnostics. It must not redefine canonical ownership or turn a mock contract
into a platform API.

## Feature 052 Products implementation

The current implementation provides:

- `MockProductsRepository` over `MockCommerceStore`;
- browser and memory adapters, with browser access isolated to
  `BrowserStorageCommerceStore` and key `nexoraxs.db.commerceProducts`;
- validation and unknown-field-preserving compatible serialization;
- deterministic latency, clocks, IDs, failure rules, and minimized diagnostics;
- one `createCommerceServices` composition root; and
- a temporary repository-fed compatibility facade for legacy in-app readers.

`dataSource: "http"` is deliberately unavailable and request-free. HTTP implementation remains
blocked until canonical Product scope/lifecycle, owner authorization, validation, API versioning,
error mapping, Audit, observability, and network idempotency are separately approved. No endpoint
or DTO should be inferred from the mock record.

Mock operations are local/demo behavior. Scope checks are defense in depth, not production
authorization, and diagnostic events are not canonical Audit evidence.

## Feature 053 Commerce implementations

The same composition root now constructs scoped Customer, Inventory, Order, and Invoice mock
repositories over additive browser/memory store ports. Customer mutations publish committed scoped
snapshots through `LegacyCustomersCompatibilityFacade`. Inventory, Order, and Invoice exports are
read-only; their existing operational writes stay in the Commerce application and notify exact
React Query keys after the retained browser commit.

All four legacy keys remain isolated in `BrowserStorageCommerceStore`. Repositories and hooks do not
read browser globals, environment variables, or transport directly. Latency, clocks, IDs, and
failure invocations are deterministic. HTTP selection remains deliberately unavailable and makes no
request. These implementations do not establish future Laravel mappings, API pagination/errors,
network idempotency, canonical lifecycles, or production Audit/authorization.
