# NexoraXS Commerce OS frontend

`apps/commerce` is the independent Commerce Operating System frontend. It owns Commerce UI and
operational workflows while consuming shared Core identifiers through governed compatibility
boundaries. Apps must not import another app's source.

## Feature 052 repository foundation

Commerce Products is the first incremental repository-backed slice:

```text
Product page
  -> scoped Product hook
  -> frontend-internal repository contract
  -> mock repository
  -> mock storage adapter
```

The combined Product/image form alone uses `LegacyProductEditorService` because it coordinates a
Product repository and the existing media compatibility port. Simple CRUD does not require an
application service. React Query owns request/cache orchestration only, with full temporary legacy
scope in every key.

`CommerceProviders` is the app-level startup stack. Environment values are read only by
`lib/commerce/commerce-runtime-config.ts`, services are constructed once, and routes/components do
not select mock or future HTTP implementations.

`AppProvider` remains for authentication/session, organization compatibility, Orders, Inventory,
Customers, Invoices, settings, media, subscriptions, and OS lifecycle debt. Its Product list is
temporarily facade-fed for legacy POS/Inventory readers; it is not the new Product persistence
center. Feature 052 does not migrate or redefine those excluded domains.

The temporary scope and `remove` behavior do not settle DD-02, DD-14, or DD-29. Mock operations are
not production authorization, persistence, or Audit.

## Validation

From the repository root:

```bash
pnpm test:unit
pnpm --filter commerce lint
pnpm --filter commerce build
pnpm exec playwright test tests/e2e/commerce-052-products-characterization.spec.ts
pnpm exec playwright test tests/e2e/commerce-052-products.spec.ts
scripts/validate-commerce-052-determinism.sh
```
