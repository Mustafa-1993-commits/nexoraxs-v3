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
