# Feature Specification: Frontend Repository Foundation

**Feature Branch**: `052-frontend-repository-foundation`  
**Feature ID**: `052-frontend-repository-foundation`  
**Created**: 2026-07-16  
**Last Narrowed**: 2026-07-17  
**Status**: Ready for planning — DD-02, DD-14, and DD-29 boundaries expressly narrowed  
**Input**: Introduce a safe frontend repository foundation without rewriting the current frontend,
using Commerce Products as the first incremental vertical slice.

> **Numbering note**: Feature 051 already exists as
> `051-implementation-documentation-reconciliation`. The mandatory Spec Kit branch hook assigned
> the next safe sequential number, 052, without overwriting the existing feature or dirty worktree.

## Goal and Delivery Boundary

Introduce a replaceable frontend data boundary for the existing Commerce Products mock journey
while preserving its routes, visible UI, identifiers, browser storage key, serialized records, and
refresh behavior. Commerce Products is the only operational slice migrated. Characterization comes
first; the new repository becomes the Product data seam; legacy consumers temporarily use a
compatibility facade; and old Product behavior is deleted only after regression and usage evidence.

Simple operations follow:

```text
Page / Component
  -> Feature Hook
  -> Frontend-Internal Compatibility Repository
  -> Mock Repository
  -> Mock Storage Adapter
```

Only a use case that genuinely coordinates Product data with existing Pricing, Tax, Inventory,
media, or another compatibility owner uses orchestration:

```text
Page / Component
  -> Feature Hook
  -> Application Service
  -> Multiple Repository Contracts or Compatibility Ports
```

An application service is not required for ordinary Product CRUD. The incremental compatibility
direction is:

```text
New Repository and Hooks
  -> Compatibility Facade
  -> Legacy Consumer
```

`AppProvider` remains for excluded domains and existing application state; it is not the new
architectural center.

### Approved Deferred-Decision Narrowing

The following treatment was approved for Feature 052 on 2026-07-17:

- **DD-02 — PASS, narrowed**: this feature defines no canonical Product lifecycle, archive,
  deletion, deactivation, retention, or historic-reference semantics. It preserves the existing
  frontend mock removal behavior through an internal operation named `remove`. Canonical lifecycle
  remains deferred.
- **DD-14 — PASS, narrowed**: this feature defines no canonical Product ownership scope and does
  not invent a canonical Business identity. Runtime compatibility uses `LegacyProductScope`,
  containing only the available Workspace identifier, legacy `BusinessUnit` identifier, and
  optional Branch identifier. It is temporary, internal, and must never be promoted as a canonical
  cross-domain contract. Canonical fact-by-fact scope remains deferred.
- **DD-29 — PASS, narrowed**: repository, result, error, and pagination shapes are frontend-internal
  compatibility contracts only. They are not platform contracts or future HTTP API contracts.
  Network idempotency is out of scope because the feature introduces no network mutation.

The canonical hierarchy remains `Workspace -> Business -> Business Unit -> Department / Branch`.
The legacy identifier must be named `legacyBusinessUnitId` at the new boundary and must not be
aliased to, duplicated as, or inferred to be a canonical `businessId`.

### Combined-Form Compatibility Boundary

The current form combines Product Catalog fields with Price, Tax, Stock, media, Branch, and OS
subscription compatibility data. Feature 052 preserves that record and visible view without
declaring those fields Product-owned. Opaque legacy fields round-trip unchanged. A create or edit
operation that must coordinate multiple compatibility owners uses a bounded application service or
explicit port. Pricing, Taxes, Inventory, media, and their lifecycles are not migrated.

## Clarifications

### Session 2026-07-16

- Q: What source supplies the missing canonical `businessId`? -> A: Do not fabricate it; a
  canonical runtime cutover would require a separate Core Organization Registry contract.

### Session 2026-07-17

- Q: Can Feature 052 proceed without resolving DD-02, DD-14, and DD-29? -> A: Yes, only by using
  the approved temporary frontend-internal compatibility boundaries described above. The earlier
  canonical-scope cutover gate is replaced by `LegacyProductScope`; no canonical claim is made.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Characterize and Preserve the Products Journey (Priority: P1)

An authorized mock Commerce operator can list, create, and edit Products through the same routes,
controls, visible outcomes, identifiers, and browser-refresh behavior before and after migration.

**Why this priority**: The foundation succeeds only if the current journey survives the seam change.

**Independent Test**: Record the current `/products`, `/products/new`, and
`/products/new?edit=<id>` behavior before structural changes, then replay it after cutover and
compare routes, form steps, visible content, IDs, storage records, refresh behavior, English/LTR,
Arabic/RTL, keyboard behavior, and accessible names.

**Acceptance Scenarios**:

1. **Given** seeded Products, **When** `/products` opens, **Then** the same rows, search/filter
   results, totals, stock projections, links, and empty states remain visible.
2. **Given** `/products/new`, **When** a valid Product is saved, **Then** its compatible ID and
   combined record appear on `/products` and remain after browser refresh.
3. **Given** `/products/new?edit=<existing-id>`, **When** valid changes are saved, **Then** that ID,
   route, unrelated legacy fields, and visible completion behavior are preserved.
4. **Given** Arabic or English, **When** the journey is completed by keyboard, **Then** translated
   presentation, RTL/LTR direction, logical layout, focus safety, and user-entered text are correct.

---

### User Story 2 - Isolate Legacy Product Data by Available Scope (Priority: P1)

An operator sees and changes mock Products only within the active Workspace and legacy
`BusinessUnit`, with optional Branch context included wherever it shapes the compatibility view.

**Why this priority**: A new repository and cache must not worsen tenant isolation while canonical
Product scoping remains deferred.

**Independent Test**: Seed two Workspaces and two legacy `BusinessUnit` records with overlapping
IDs/SKUs, exercise every repository and cache operation, and verify no cross-scope disclosure or
mutation. Verify that no canonical Business is fabricated.

**Acceptance Scenarios**:

1. **Given** two legacy scopes, **When** Products are listed, **Then** only records matching the
   requested Workspace and legacy `BusinessUnit` are returned.
2. **Given** a Product ID outside the requested legacy scope, **When** get, update, or remove runs,
   **Then** it fails closed, leaks no foreign Product attributes, and mutates nothing.
3. **Given** cached lists for different Workspace, legacy `BusinessUnit`, or applicable Branch
   context, **When** one changes, **Then** the other cache entry is unchanged.
4. **Given** client-supplied legacy IDs, **When** a mock operation runs, **Then** checks are described
   as compatibility safeguards, never production authorization or canonical ownership proof.

---

### User Story 3 - Exercise the Internal Product Repository (Priority: P1)

A frontend feature can list, retrieve, create, update, and remove legacy Product records through
one predictable, explicitly internal repository boundary.

**Why this priority**: This is the smallest replaceable boundary that preserves the current mock.

**Independent Test**: Run one repository contract suite against isolated memory and browser-storage
adapters using identical fixtures, operations, internal pagination inputs, and expected failures.

**Acceptance Scenarios**:

1. **Given** more records than one requested page, **When** list runs, **Then** internal pagination
   is deterministic and stably ordered without claiming a future API shape.
2. **Given** valid create/update input, **When** it succeeds, **Then** the final compatible record is
   returned with the legacy combined fields preserved.
3. **Given** `remove` for an in-scope Product, **When** it succeeds, **Then** the browser record is
   removed exactly as current mock behavior; no archive or canonical lifecycle claim is made.
4. **Given** duplicate normalized SKU, invalid data, missing ID, scope mismatch, storage failure, or
   configured failure, **When** an operation runs, **Then** a deterministic internal error is
   produced and state is unchanged.

---

### User Story 4 - Compose Stable Runtime Services Once (Priority: P2)

A developer selects Commerce mock or future HTTP mode once at startup without changing pages,
components, hooks, or contracts, and ordinary renders reuse the same service instances.

**Why this priority**: Central composition keeps infrastructure selection out of feature code.

**Independent Test**: Construct isolated service roots from runtime configurations and verify
stable identities, early configuration errors, and zero environment reads outside the designated
configuration module.

**Acceptance Scenarios**:

1. **Given** mock mode, **When** services are constructed, **Then** one configured mock repository
   and storage adapter are supplied to Product consumers.
2. **Given** HTTP mode without a base URL, **When** startup configuration is validated, **Then** it
   fails early; no HTTP repository or endpoint contract is implemented by this feature.
3. **Given** repeated component renders, **When** services are consumed, **Then** repository,
   facade, application-service, and query-client identities remain stable.
4. **Given** `NEXT_PUBLIC` values, **When** the app starts, **Then** only the runtime-configuration
   module reads them.

---

### User Story 5 - Cut Over Legacy Consumers Incrementally (Priority: P2)

Existing Product consumers continue through a compatibility facade while Product pages adopt new
hooks, without deleting `AppProvider` or migrating excluded domains.

**Why this priority**: The existing mock has Product dependencies in other journeys that cannot be
broken by a destructive replacement.

**Independent Test**: Compare new hooks and the legacy facade over the same repository, prove
equivalent visible and persisted results, then use source/usage evidence before deleting any old
Product path.

**Acceptance Scenarios**:

1. **Given** a legacy Product consumer, **When** it lists, creates, edits, or removes through the
   facade, **Then** the new repository is the source and its legacy shape remains compatible.
2. **Given** a Product page, **When** it performs simple operations, **Then** its hook calls the
   repository and never storage, fetch, environment variables, or an unnecessary application service.
3. **Given** a combined-field operation, **When** it coordinates multiple compatibility owners,
   **Then** an application service or explicit ports own the orchestration outside the component
   and repository.
4. **Given** passing regression evidence and zero remaining consumers, **When** old Product behavior
   is deleted, **Then** excluded `AppProvider` behavior remains unchanged.

---

### User Story 6 - Reproduce Mock Failures Deterministically (Priority: P2)

A developer can reproduce latency, validation, missing data, duplicate SKU, scope mismatch,
pagination, storage failure, and selected operation failures without uncontrolled randomness.

**Why this priority**: Failure and recovery tests must be repeatable.

**Independent Test**: Repeat each configured scenario against fresh memory stores and prove the
same call sequence produces the same IDs, ordering, failures, diagnostics, and final state.

**Acceptance Scenarios**:

1. **Given** configured latency, **When** an operation runs, **Then** it resolves asynchronously no
   earlier than the configured delay within controlled tolerance.
2. **Given** a deterministic failure rule, **When** its exact match runs, **Then** it fails without
   mutation; unmatched operations never fail randomly.
3. **Given** a fixed clock and ID source, **When** the suite repeats, **Then** outputs are reproducible.

### Edge Cases

- Product storage is empty, unavailable, quota-exhausted, corrupt, or an older compatible shape.
- A legacy Product contains extra Price, Tax, Stock, media, Branch, subscription, or unknown fields.
- A list page is beyond the end or uses invalid page input.
- SKU is empty, differs only by whitespace/case, or exists in another legacy scope.
- Product ID exists only outside the requested scope.
- An async component unmounts or scope changes before an operation finishes.
- Arabic and Latin text are mixed in user-entered values.
- HTTP mode is selected even though no HTTP implementation exists.
- `remove` is requested twice; the second request returns the internal not-found outcome and does
  not invent archive/idempotency semantics.

## Requirements *(mandatory)*

### Functional Requirements

#### Temporary Scope Boundary

- **FR-001**: Define `LegacyProductScope` with non-empty `workspaceId`, non-empty
  `legacyBusinessUnitId`, and optional non-empty `branchId`.
- **FR-002**: The type and documentation MUST state that `legacyBusinessUnitId` refers to the
  current legacy `BusinessUnit` storage model and is not a canonical Business or canonical
  Business Unit contract.
- **FR-003**: Feature 052 MUST NOT define or fabricate `businessId`, infer ancestry, introduce a
  canonical organization identity, or publish `LegacyProductScope` as a cross-domain contract.
- **FR-004**: Repository operations MUST require `LegacyProductScope`; ID-only lookup or mutation
  is forbidden.
- **FR-005**: Compatibility matching MUST include Workspace and legacy `BusinessUnit`. Optional
  Branch context MUST be included in cache identity whenever it shapes combined stock presentation,
  but MUST NOT be described as canonical Product ownership scope.
- **FR-006**: Scope mismatch and missing context MUST fail closed without foreign-record disclosure.

#### Package and Ownership Boundaries

- **FR-007**: `packages/contracts` MUST contain only frontend-internal entities/compatibility
  records, repository interfaces, commands, queries, results, and error contracts; it MUST contain
  no storage, transport, environment, React, or runtime implementation.
- **FR-008**: All Feature 052 exports from `packages/contracts` MUST be visibly documented as
  frontend-internal compatibility contracts, not platform or HTTP API contracts.
- **FR-009**: `packages/sdk` MUST contain mock repositories, mock storage implementations, mapping,
  serialization, diagnostics, composition, and future transport seams; no HTTP implementation is
  required.
- **FR-010**: New Product persistence or Product behavior MUST NOT be added to `packages/shared`.
  Product-specific persistence used by the migrated Commerce path MUST move behind the SDK store.
- **FR-011**: `packages/shared` remains a target for pure utilities, formatting, ID/date helpers,
  and validation primitives. Existing excluded-domain storage debt MUST be quarantined and not expanded.
- **FR-012**: Shared packages MUST NOT own Order creation, Workspace creation, authentication state,
  or Core/Commerce business logic.
- **FR-013**: Applications MUST NOT import another application's source.

#### Frontend-Internal Product Compatibility Contract

- **FR-014**: The repository entity is a legacy compatibility record, not a canonical Commerce
  Product aggregate and not a future transport DTO.
- **FR-015**: The record MUST preserve existing IDs, Workspace/legacy `BusinessUnit`/Branch fields,
  Product descriptors, Price/Tax/Stock/media/subscription compatibility fields, timestamps, and
  unknown serializable fields without transferring canonical ownership.
- **FR-016**: The internal repository MUST support `list`, `getById`, `create`, `update`, and `remove`.
- **FR-017**: Feature 052 MUST NOT introduce `archive`, Product status values, status mapping,
  retention rules, historic-reference rules, or canonical removal semantics.
- **FR-018**: `getById`, `create`, and `update` MUST return the final compatible record. `remove`
  preserves the current mock hard-removal effect and MUST NOT be presented as an API contract.
- **FR-019**: Internal list inputs MAY support deterministic pagination and stable ordering solely
  for mock/test orchestration; exact fields and semantics are not public or future API commitments.
- **FR-020**: Non-empty SKU uniqueness MUST be checked case-insensitively after trimming within one
  Workspace/legacy-`BusinessUnit` scope; the same SKU MAY exist in another legacy scope.
- **FR-021**: Internal errors MUST cover validation, not found, duplicate SKU, scope mismatch,
  configured failure, configuration, and storage failure without becoming platform taxonomy.
- **FR-022**: Exact HTTP endpoints, payloads, backend schemas, production error mapping,
  compatibility periods, and network idempotency remain undefined.

#### Mock Storage and Repository Behavior

- **FR-023**: `MockProductsRepository` MUST depend on `MockCommerceStore` and MUST NOT access
  `localStorage` directly.
- **FR-024**: `BrowserStorageCommerceStore` MUST preserve the key
  `nexoraxs.db.commerceProducts`, existing IDs, compatible serialization, opaque fields, and
  browser-refresh behavior.
- **FR-025**: `MemoryCommerceStore` MUST be browser-independent and isolated per test.
- **FR-026**: The same repository contract suite MUST run against memory and browser storage where
  browser capabilities apply.
- **FR-027**: Writes MUST preserve unrelated and unknown fields; failed writes MUST not partially
  mutate state.
- **FR-028**: Latency MUST be asynchronous, configurable, non-negative, and deterministic.
- **FR-029**: Failure simulation MUST be explicitly configured by operation, fixture, invocation,
  or equivalent deterministic rule. Uncontrolled randomness is forbidden.
- **FR-030**: Invalid pagination and corrupt/unavailable storage MUST produce defined recoverable
  internal outcomes without clearing valid data silently.
- **FR-031**: IDs, timestamps, and ordering MUST be injectable or otherwise controlled in tests.

#### Composition Root and Stable Services

- **FR-032**: Create one Commerce composition root that accepts `CommerceRuntimeConfig` with
  `dataSource: "mock" | "http"`, optional `apiBaseUrl`, and optional `mockLatencyMs`.
- **FR-033**: `NEXT_PUBLIC` environment variables MAY be read only in the designated runtime
  configuration module used at startup.
- **FR-034**: Contracts, repositories, hooks, pages, components, services, and facades MUST NOT read
  environment variables.
- **FR-035**: Pages/components MUST NOT select implementations or construct repositories.
- **FR-036**: An app-level `CommerceServicesProvider` MUST construct and expose stable repository,
  facade, application-service, and query-client instances once per provider runtime.
- **FR-037**: HTTP selection MUST validate configuration and report the implementation as
  unavailable without issuing network requests or defining an API.
- **FR-038**: Tests MAY create isolated composition roots with injected memory stores, clocks, IDs,
  and failure rules.

#### Hooks, Cache, and Orchestration

- **FR-039**: Product hooks MUST call the repository or a bounded application service and MUST NOT
  access storage, `fetch`, or environment variables directly.
- **FR-040**: React Query MAY be used only for server-state/cache orchestration, request status,
  deduplication, invalidation, retry, and pagination; it MUST NOT own Product truth or business rules.
- **FR-041**: Every Product query key MUST contain the entire `LegacyProductScope` and all
  result-shaping internal query inputs.
- **FR-042**: Mutations MUST update or invalidate only cache entries matching the affected legacy
  scope.
- **FR-043**: Simple list/get/create/update/remove flows MUST NOT require an application service.
- **FR-044**: Multi-owner combined-form behavior MUST use an application service or explicit
  compatibility ports rather than component/repository orchestration.
- **FR-045**: Hooks MUST expose loading, empty, validation, not-found, scope-safe, unavailable,
  success, and recovery states suitable for the preserved UI.

#### Compatibility Facade and Incremental Cutover

- **FR-046**: New repositories/hooks MUST be the source used by the Product compatibility facade;
  the facade MUST NOT delegate Product writes back to legacy `AppProvider` behavior.
- **FR-047**: Legacy consumers MAY temporarily consume the facade with their current shape.
- **FR-048**: The facade MUST preserve Product IDs, routes, browser key, serialized records,
  refresh behavior, and established visible outcomes.
- **FR-049**: `AppProvider` MUST remain for excluded domains and existing application state.
- **FR-050**: Characterization tests MUST pass before structural Product changes.
- **FR-051**: Cutover MUST use bounded, reversible checkpoints and MUST NOT clear or rewrite user
  browser data to recover.
- **FR-052**: Legacy Product behavior MAY be deleted only after regression tests pass and usage
  evidence shows no remaining consumer.
- **FR-053**: The only migrated operational slice is Commerce Products; Orders, Inventory,
  Customers, Invoices, organization management, Team, Subscriptions, and OS lifecycle are excluded.

#### Required Evidence and Product Quality

- **FR-054**: Regression tests MUST cover listing, create, edit, remove compatibility behavior,
  refresh persistence, Workspace/legacy-`BusinessUnit` isolation, duplicate SKU, not found, facade
  behavior, and unchanged routes/UI.
- **FR-055**: Tests MUST cover internal pagination, deterministic latency/failures, storage errors,
  complete legacy-scope cache keys, and cross-scope invalidation isolation.
- **FR-056**: Tests MUST be isolated and deterministic, with no random failure, uncontrolled clock,
  test-order dependency, or shared browser data.
- **FR-057**: English/LTR and Arabic/RTL tests MUST cover translation paths, logical direction,
  mixed-direction user data, keyboard operation, accessible names, focus safety, readable states,
  and non-color-only meaning.
- **FR-058**: Mock create/update/remove MUST be labeled demo behavior, not production authorization,
  persistence, or Audit.
- **FR-059**: Mock diagnostics MUST capture operation, controlled duration, outcome category, and a
  non-sensitive legacy-scope correlation; no secret, full payload, or foreign record may be logged.
- **FR-060**: Production HTTP cutover remains blocked until owner authorization, canonical scope,
  lifecycle, validation, API, Audit, and observability contracts are separately approved.
- **FR-061**: Strict type checks, lint, unit/contract/integration/E2E tests, accessibility checks,
  and the Commerce build MUST pass before merge.
- **FR-062**: Specification, plan, tasks, compatibility notes, package-boundary documentation, and
  regression evidence MUST remain synchronized.

#### Non-Goals and Prohibited Changes

- **FR-063**: Do not implement Laravel, an HTTP API server, or backend persistence.
- **FR-064**: Do not introduce MSW without a separately justified specification update.
- **FR-065**: Do not redesign the Products UI, change its routes, or rename legacy IDs/storage keys.
- **FR-066**: Do not define canonical Product lifecycle/scope/API semantics or resolve DD-02,
  DD-14, or DD-29.
- **FR-067**: Do not rebuild Core entities, create `OSEnablement`, delete `AppProvider`, or migrate
  another Commerce/Core domain.
- **FR-068**: Do not treat storage, cache, DTOs, hooks, services, facades, or repositories as a
  transfer of canonical ownership.
- **FR-069**: Do not change a Freeze, Accepted ADR, canonical owner, lifecycle owner, or Deferred Decision.

### Key Entities

- **LegacyProductScope**: Temporary frontend-only Workspace, legacy `BusinessUnit`, and optional
  Branch context. It is neither the canonical organization hierarchy nor a public contract.
- **Legacy Product Compatibility Record**: Existing serialized combined record preserved by the
  frontend seam; not a canonical Product aggregate or future DTO.
- **Internal Product Command/Query/Result/Error**: Mock/frontend orchestration shapes whose exact
  fields remain local to Feature 052.
- **MockCommerceStore**: Storage port used by the mock repository.
- **BrowserStorageCommerceStore**: Browser adapter preserving the legacy storage contract.
- **MemoryCommerceStore**: Deterministic test adapter.
- **CommerceRuntimeConfig**: Startup-only implementation selection.
- **Commerce Services**: Stable app-level repository/facade/service/query-client instances.
- **Product Compatibility Facade**: Temporary adapter from the new source to legacy consumers.

## Constitution Requirements *(mandatory)*

### Authority and Ownership

- **Controlling authority**: `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`, Commerce OS
  Wave 1, Accepted ADR-004, ADR-034, ADR-035, ADR-036, ADR-038, ADR-040, and Constitution v2.0.0.
- **Owner preserved**: Product Catalog owns canonical Product facts. Core Organization Registry
  owns organization identity; Pricing, Taxes, Inventory, media/storage coordination, and Core Audit
  retain their facts. Feature 052 supplies no production write authority.
- **Deferred decisions**: DD-02, DD-14, and DD-29 remain unresolved and are not narrowed beyond the
  temporary frontend-internal compatibility allowance stated in this specification. DD-15, DD-17,
  and DD-23 remain relevant to displayed legacy Price, Stock, and Tax fields.

### Scope and Boundaries

- Workspace remains the tenant boundary. `LegacyProductScope` is a fail-closed mock compatibility
  input, not canonical authorization or organization ancestry.
- Commerce remains independently usable. No app imports another app and no owner writes another
  owner's canonical state.
- Product commercial access, setup, activation, readiness, and OS lifecycle concepts are unchanged.
- Product removal preserves only existing mock behavior; it defines no canonical lifecycle.

### Intelligence and Product Quality

- The feature implements no Capability, Knowledge, Rule, Recommendation, Business Brain, AI, or
  automatic consequential action behavior.
- English/Arabic, LTR/RTL, logical layout, user-entered text preservation, keyboard operation,
  semantic naming, visible focus, and non-color-only meaning are acceptance requirements.

### Security, Operations, and Compatibility

- Frontend scope checks are defense-in-depth demo safeguards, never production authorization.
- Diagnostics are deterministic, minimized, and non-sensitive. They are not canonical Audit records.
- Existing IDs, routes, storage keys/records, and consumers remain additive-compatible until
  evidence-backed deletion.
- Required evidence includes characterization, repository contract, adapter integration,
  cache/scope, facade, E2E, Arabic/English, RTL/LTR, accessibility, lint/type/build, and source-usage checks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of characterized Product routes, English-visible outcomes, form steps, seeded
  IDs, and storage keys remain unchanged.
- **SC-002**: List/create/edit results persist across refresh in 100% of acceptance runs.
- **SC-003**: The two-Workspace/two-legacy-`BusinessUnit` matrix has zero foreign disclosures or
  mutations for every repository and cache operation.
- **SC-004**: 100% of repository contract scenarios pass against memory and browser stores with
  equivalent observable behavior.
- **SC-005**: Twenty repeated deterministic-suite runs produce zero random, timing, order, or
  shared-state failures.
- **SC-006**: Changing data-source configuration requires changes at one startup boundary and zero
  Product page/hook/contract changes.
- **SC-007**: Service identities remain stable across 100 consumer re-renders.
- **SC-008**: Duplicate SKU, not-found, scope mismatch, validation, storage, configuration, and
  configured failures produce their expected safe state in every acceptance run.
- **SC-009**: English/LTR and Arabic/RTL journeys pass keyboard, naming, focus, mixed-direction-data,
  readable-state, and non-color-only checks.
- **SC-010**: Source analysis finds zero direct Product storage/fetch/environment access in Product
  pages/hooks, and zero old Product behavior consumer before deletion.
- **SC-011**: Without configured delay, at least 95% of local mock Product outcomes are visible
  within one second.
- **SC-012**: All required type, lint, unit, contract, integration, E2E, accessibility, localization,
  source-boundary, and Commerce build checks pass without waived tenant or compatibility failures.

## Implementation Validation (2026-07-17)

Feature 052 was implemented within the narrowed frontend-only boundary. Final evidence records 58
passing Vitest tests, clean Commerce lint/type/build gates, 6 passing Feature 052 browser tests
across characterization/regression/compatibility/English-Arabic accessibility, 20 clean
deterministic runs, and the passing existing Commerce branch-inventory/transfers/returns regression.

The repository is the Product persistence source; hooks use it directly except for bounded media
orchestration; the compatibility facade publishes repository lists to retained legacy readers;
and AppProvider contains no Product collection read/write or old Product write callback. No
canonical Product lifecycle/status/archive, canonical Business identity/Product scope, public/API
contract, backend, HTTP request, production authorization, or Audit model was introduced. DD-02,
DD-14, and DD-29 therefore remain deferred.

## Assumptions

- Existing authentication/session state supplies mock actor and legacy context inputs only.
- Existing routes are `/products`, `/products/new`, and `/products/new?edit=<id>`.
- Existing Product persistence key is `nexoraxs.db.commerceProducts`.
- The current mock removes matching Product records rather than archiving them; Feature 052 names
  the compatibility operation `remove` and makes no claim about production semantics.
- Internal pagination/errors exist only to test and operate the mock seam.
- The future HTTP repository remains an unimplemented extension point.
- Combined Product records and uploaded-image references round-trip unchanged; Product image/media
  processing may remain behind an explicit compatibility port.
- Existing excluded-domain debt in `packages/shared` and `AppProvider` is quarantined; only the
  Product-specific Commerce path moves in this slice.
