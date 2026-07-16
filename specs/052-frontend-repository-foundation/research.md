# Phase 0 Research: Frontend Repository Foundation

## Decision 1: Treat every new Product shape as frontend-internal compatibility

**Decision**: Name the scope `LegacyProductScope`, the record `LegacyProductRecord`, and the
repository `LegacyProductsRepository`. Each contract module carries an internal/temporary warning.
The implementation makes no claim about canonical Product lifecycle, scope, API, or authorization.

**Rationale**: The approved 2026-07-17 narrowing permits the frontend migration while preserving
DD-02, DD-14, and DD-29. The Commerce Freeze keeps exact lifecycle, fact-by-fact scope, and exact
logical contract semantics deferred.

**Alternatives considered**:

- Canonical `WorkspaceScope -> BusinessScope -> BusinessUnitScope`: rejected because the legacy
  runtime has no canonical Business identity and must not fabricate one.
- A canonical `ProductRepository` with `archive`: rejected because it would decide DD-02 and DD-29.
- Reusing `CommerceProduct` without a compatibility name: rejected because it obscures the
  temporary combined-field boundary.

**Authority**: `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md` sections 7-12 and 18,
`docs/04-commerce-os/06-COMMERCE-OS-WAVE-1.md` DD-02/DD-14/DD-29, ADR-004, ADR-035, ADR-040.

## Decision 2: Preserve current hard removal through `remove`

**Decision**: The internal repository supports `list`, `getById`, `create`, `update`, and `remove`.
`remove` physically removes the matching legacy browser record, returns only the removed ID, and
returns internal not-found on a repeated call. No status or archive field is added.

**Rationale**: This exactly preserves the current mock `deleteProduct` effect without presenting it
as canonical deletion, archive, retention, idempotency, or historic-reference policy.

**Alternatives considered**:

- `archive` with `draft | active | archived`: rejected by DD-02 narrowing.
- Soft-delete metadata: rejected because it changes serialized behavior and decides retention.
- `void` result: rejected for the internal seam because a removed ID makes deterministic cache
  updates testable without implying a canonical entity transition.

## Decision 3: Match the available legacy scope without inventing ancestry

**Decision**: `LegacyProductScope` contains `workspaceId`, `legacyBusinessUnitId`, and optional
`branchId`. Record access matches both stored `workspaceId` and stored `businessUnitId` against the
first two fields. Branch is carried in cache/view context because the existing page overlays Branch
stock, but it does not become canonical Product ownership scope.

**Rationale**: Current code filters Products by legacy `businessUnitId` and overlays selected Branch
inventory. Adding Workspace matching improves the mock isolation seam while preserving visible
cross-Branch catalog behavior. Naming prevents the legacy ID from masquerading as Business.

**Alternatives considered**:

- Match only `businessUnitId`: rejected because identical legacy IDs can collide across Workspaces.
- Filter Product identity by Branch: rejected because current catalog rows remain visible when the
  Branch changes; only stock projection changes.
- Add `businessId`: rejected because no governed source provides it.

## Decision 4: Keep the stored combined record opaque and round-trip safe

**Decision**: `LegacyProductRecord` types the established fields and permits additional JSON-safe
fields. Mapping validates required identity/scope fields but preserves unknown keys. Update merges
only the supplied patch over the stored record and protects ID/scope/creation fields.

**Rationale**: Price, Tax, Stock, media, Branch, subscription, and unknown fields already coexist in
the browser record. Preserving them avoids data loss while the compatibility facade clearly denies
canonical ownership transfer.

**Alternatives considered**:

- Rewrite storage into a Product-only record: rejected because it breaks browser compatibility and
  would migrate other owners.
- Split legacy storage into several keys: rejected as a data migration outside Feature 052.
- Treat the browser schema as a public DTO: rejected by DD-29 narrowing.

## Decision 5: Isolate storage with a mock-specific SDK port

**Decision**: Put `MockCommerceStore`, `BrowserStorageCommerceStore`, and `MemoryCommerceStore` in
`packages/sdk`. The repository only calls the store port. The browser adapter alone knows
`nexoraxs.db.commerceProducts`; the memory adapter has no browser globals. Mutations are serialized
per repository instance and commit one complete record array.

**Rationale**: This prevents repository/localStorage coupling, supports the same contract suite in
memory and browser-like environments, and preserves the existing storage key and refresh behavior.

**Alternatives considered**:

- Continue using `readCollection`/`writeCollection` in `AppProvider`: rejected because it keeps the
  legacy provider as Product persistence owner.
- Direct localStorage in hooks: rejected by the requested architecture.
- MSW: rejected because there is no network boundary.

## Decision 6: Use deterministic dependency injection for mock behavior

**Decision**: Repository construction accepts non-negative latency, a clock, ID factory, ordered
failure rules, and diagnostics sink. Failure rules match operation plus optional invocation/ID/SKU.
No production path calls `Math.random` for failure behavior. Stable list order follows stored array
order; create appends; optional pagination slices that order.

**Rationale**: The current record order is part of visible compatibility. Injected time/ID/failure
sources make 20-run repetition meaningful and prevent flaky tests.

**Alternatives considered**:

- Random failures: rejected as unreproducible.
- Real-time-only assertions: rejected because clock drift makes errors flaky.
- Alphabetic resorting: rejected because it changes current row order.

## Decision 7: Compose services once in a client provider

**Decision**: `readCommerceRuntimeConfig()` is the only environment-reading module. A single
`createCommerceServices(config, testOverrides?)` composition root constructs the store, repository,
facade, and deterministic diagnostics. `CommerceServicesProvider` lazily creates these plus one
`QueryClient` and retains their identity for the provider lifetime.

**Rationale**: Next.js public environment variables are inlined for browser code, so constraining
reads to one module makes configuration reviewable. Provider-owned lazy construction avoids
repository recreation during renders. Official Next.js guidance confirms `NEXT_PUBLIC_` values are
exposed/inlined at build time: https://nextjs.org/docs/pages/guides/environment-variables

**Alternatives considered**:

- Environment reads inside the repository: rejected because infrastructure becomes implicit.
- Page-level factories: rejected because instances/cache identities would churn.
- A module-global browser singleton: rejected because isolated tests and provider lifetimes need
  explicit ownership.

## Decision 8: Use TanStack Query only for cache and request orchestration

**Decision**: Add `@tanstack/react-query` to `apps/commerce`. Query-key factories include
`workspaceId`, `legacyBusinessUnitId`, normalized optional `branchId`, operation, ID, and any list
inputs. Mutations invalidate only the exact legacy-scope prefix. Domain validation remains in the
repository/application service.

**Rationale**: TanStack Query requires variables used by a query function to appear in its
serializable query key, which directly supports scope isolation:
https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

**Alternatives considered**:

- React Query as Product source of truth: rejected; browser store/repository remains the source.
- Unscoped keys such as `["products"]`: rejected because they collide across tenant contexts.
- Custom global cache: rejected because the requested server-state tool already supplies tested
  invalidation and request-state behavior.

## Decision 9: Put genuine combined-field orchestration in one application service

**Decision**: Simple list/get/remove hooks call the repository directly. The current create/edit
form uses `LegacyProductEditorService` because it may coordinate image/media compatibility with
the Product record. The service receives explicit repository and media compatibility ports; it is
constructed once inside the app provider stack.

**Rationale**: This preserves the requested simple CRUD path while keeping real multi-owner work
out of components and repositories.

**Alternatives considered**:

- An application service for every operation: rejected as unnecessary ceremony.
- Image upload inside the Product repository: rejected because media is not Product persistence.
- Image orchestration in the page: rejected because it couples UI to multiple owner seams.

## Decision 10: Use the facade as an observable legacy projection

**Decision**: `LegacyProductsCompatibilityFacade` wraps the repository and publishes updated
compatible records to subscribers after successful mutations. `AppProvider` consumes this facade
for its temporary `products` projection; new Product hooks use the repository/service. Old Product
write callbacks are removed only after source analysis and regression tests prove zero consumers.

**Rationale**: Legacy POS, Inventory, dashboard, and other excluded consumers still read
`AppProvider.products`. A facade-fed projection preserves them without delegating new writes back
to the provider.

**Alternatives considered**:

- Rewrite every Product consumer: rejected by the first-slice/no-regression boundary.
- Keep dual Product writes: rejected because it creates two sources and race conditions.
- Remove `AppProvider`: rejected explicitly.

## Decision 11: Add Vitest for deterministic unit/contract/integration tests

**Decision**: Add root `vitest.config.ts`, Vitest, jsdom, and React testing utilities. Node is the
default for repository/memory tests; only browser adapter/provider tests opt into jsdom. Existing
Playwright plus `@axe-core/playwright` covers characterization, refresh, UI, bilingual direction,
keyboard, focus, routes, and visible regression.

**Rationale**: Official Vitest guidance uses Node by default and supports per-file jsdom for browser
APIs; current project configuration uses `projects` rather than the superseded workspace option:
https://vitest.dev/config/environment and https://vitest.dev/guide/migration

**Alternatives considered**:

- Playwright-only repository tests: rejected because deterministic contract/failure loops need fast
  isolated execution.
- jsdom for every test: rejected because it hides accidental browser dependencies in memory/core logic.
- Jest: rejected because no Jest setup exists and Vitest fits ESM/TypeScript workspace packages.

## Decision 12: Migrate through evidence-backed checkpoints

**Decision**: Order work as characterization -> packages/test harness -> contracts -> stores and
repository -> composition/query keys -> facade/provider projection -> Product pages -> remove old
Product callbacks -> full regression/documentation. Each checkpoint retains the original storage
key and data and is independently revertible in code.

**Rationale**: The user requires incremental migration and deletion only after coverage. This order
keeps a working browser record throughout and avoids a one-step provider rewrite.

**Alternatives considered**:

- Rewrite pages and provider together: rejected because failures cannot be localized or safely
  rolled back.
- Change storage schema first: rejected because it adds migration risk without user value.

## Resolved Unknowns

All Phase 0 unknowns are resolved. No `NEEDS CLARIFICATION` remains. HTTP endpoints, production
authorization, canonical Product lifecycle/scope, Audit payload, and network idempotency are
intentionally out of scope rather than unresolved implementation choices.
