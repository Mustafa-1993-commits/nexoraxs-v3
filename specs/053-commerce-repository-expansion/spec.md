# Feature Specification: Commerce Repository Pattern Expansion

**Feature Branch**: `053-commerce-repository-pattern-expansion`  
**Feature ID**: `053-commerce-repository-expansion`  
**Created**: 2026-07-17  
**Status**: Implemented — validation complete  
**Input**: Expand the proven Feature 052 frontend-internal repository pattern to Customers and to
Inventory, Orders, and Invoices read models without backend integration, application rewrite, or
visible regression.

## Goal and Delivery Boundary

Expand Feature 052's replaceable frontend data boundary in small, reversible slices. The complete
current Customers journey moves behind the new boundary, including list, detail, create, update,
POS selection, and existing Order/Invoice references. Inventory, Orders, and Invoices receive
read-only repository boundaries for their current list, detail, filtering, and projection needs.

The feature preserves the current Commerce routes, UI, identifiers, seeded relationships, browser
storage, refresh behavior, English/Arabic presentation, and dependent journeys. It does not begin
backend integration and does not turn temporary browser records into canonical domain contracts.

The established direction remains:

```text
Page or Component
  -> Feature Query or Mutation Hook
  -> Application Service only when cross-repository orchestration is required
  -> Frontend-Internal Repository Contract
  -> Mock Repository
  -> Mock Store
  -> Existing Browser-Storage Compatibility Adapter
```

Simple list, get, create, or update behavior calls one repository without an application service.
Customer history, Inventory presentation, and other views that combine multiple owners may use a
bounded application service, but that service may compose only the included reads and Customer
compatibility writes. It must not absorb excluded operational writes or business lifecycles.

The migration boundary is:

- **Included**: complete current Customer reads and writes; current Inventory list/projection reads;
  current Order list/detail reads; current Invoice list/detail/document reads; required
  compatibility publication to active legacy consumers.
- **Retained temporarily**: `AppProvider`, excluded-domain state, Order/Invoice/Inventory write
  paths, and compatibility facades needed by consumers not yet migrated.
- **Excluded**: backend or HTTP work; stock changes; Order or Invoice creation; payment, pricing,
  tax, return, transfer, fulfillment, cancellation, numbering, accounting, and lifecycle rules;
  every other Commerce or Core domain.

### Inherited Compatibility and Deferred-Decision Safety

Feature 053 inherits Feature 052's approved temporary frontend boundary. It does not reopen or
promote that boundary:

- The only available organization inputs remain `workspaceId`, the explicitly legacy
  `legacyBusinessUnitId`, and optional `branchId`. No canonical Business or `businessId` may be
  created, inferred, aliased, or serialized.
- Repository entities, commands, queries, results, errors, ordering, and any pagination are
  frontend-internal compatibility shapes. They are not platform, public SDK, HTTP API, or future
  Laravel contracts.
- Existing Product contracts, storage, hooks, facade behavior, and regression evidence from
  Feature 052 remain compatible. Product lifecycle and archive/removal semantics remain deferred.
- Customer create/update preserves current mock behavior only. It does not decide matching,
  anonymous identity, merge, erasure, retention, deletion, status, consent, or CRM semantics.
- Inventory, Order, and Invoice repositories are read-only in this feature. Existing mutations
  remain on exactly one legacy path and must not be copied into repositories, hooks, facades, or
  caches.
- Existing status, deletion, cancellation, fulfillment, stock, numbering, tax, payment, return,
  and document behavior remains observable compatibility data, never a new canonical lifecycle.
- Deterministic mock failure and latency controls exist for local development and testing only.
  They create neither production reliability policy nor public error taxonomy.

The following Commerce Deferred Decisions remain unresolved: DD-01, DD-02, DD-05, DD-06, DD-14,
DD-17, DD-18, DD-19, DD-21, DD-23, DD-24, DD-25, and DD-29. Feature 053 preserves them by limiting
all new shapes and behavior to the frontend mock compatibility seam.

## Clarifications

### Session 2026-07-17

- Q: When a repository operation fails, which retry policy should Feature 053 guarantee? → A: No
  automatic retries; users explicitly retry failed reads and Customer mutations.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Characterize Every Affected Journey Before Migration (Priority: P1)

An authorized mock Commerce operator experiences the same Customers, Inventory, Orders, Invoices,
POS, Product-reference, refresh, and navigation behavior before and after the repository expansion.

**Why this priority**: A safe expansion requires executable evidence of current behavior before
any source-of-data or state boundary changes.

**Independent Test**: Capture the affected routes, seeded records, storage records, filters,
relationships, empty/not-found behavior, mutations, refresh behavior, language/direction, and
accessible interaction before structural changes. Replay the same scenarios after each cutover and
compare the observable results.

**Acceptance Scenarios**:

1. **Given** the current demo seed, **When** all affected list/detail/document and POS routes are
   recorded, **Then** route paths, visible fields, filters, links, IDs, storage keys, and record
   relationships form the pre-migration baseline.
2. **Given** a Customer is created and edited through each active entry point, **When** the browser
   refreshes, **Then** the characterized ID, values, selection behavior, and references remain.
3. **Given** existing Order, Invoice, Inventory, return, and Product relationships, **When** their
   current views open, **Then** the pre-migration presentation and fallback behavior are recorded
   without changing any record.
4. **Given** the English/LTR and Arabic/RTL experiences, **When** the critical journeys are operated
   with keyboard and assistive-technology checks, **Then** current behavior and any already-missing
   required state are explicitly documented before migration.

---

### User Story 2 - Complete the Current Customers Journey Through One Boundary (Priority: P1)

An operator can list, search, inspect, create, select, and edit Customers through the same routes
and controls, with the same Customer IDs and browser persistence used by POS, Orders, and Invoices.

**Why this priority**: Customers are the only complete read/write vertical slice in this feature
and must become a single-source migration rather than a duplicated write path.

**Independent Test**: Use `/customers`, `/customers/<id>`, and POS Customer creation/selection to
list, create, retrieve, and update a Customer. Verify pending and validation states, refresh
persistence, related Order history, Invoice/Order references, and removal of obsolete provider
write callbacks only after every active writer uses the new boundary.

**Acceptance Scenarios**:

1. **Given** scoped Customers, **When** `/customers` opens or search is applied, **Then** the same
   Customers, metrics, ordering, filters, drawer behavior, and empty results appear.
2. **Given** valid Customer data, **When** creation starts from `/customers` or POS, **Then** one
   mutation becomes visibly pending, one compatible Customer is created, the established ID and
   stored shape are preserved, and repeated submission cannot create a second record while pending.
3. **Given** missing or invalid required input, **When** create or update is submitted, **Then**
   translated, associated validation feedback is shown and no record is changed.
4. **Given** an existing Customer, **When** `/customers/<id>` loads and valid contact fields are
   edited, **Then** the same ID, creation data, scope, Order history, and unrelated compatible
   fields remain unchanged while the visible update persists across refresh.
5. **Given** a Customer referenced by existing Orders and Invoices, **When** that Customer is read or
   edited, **Then** all references continue to resolve to the same record without rewriting source
   Orders or Invoices.
6. **Given** all active Customer consumers have migrated or use the repository-backed facade,
   **When** obsolete Customer write callbacks are removed from `AppProvider`, **Then** Customer
   creation and update still have exactly one persistence effect.

---

### User Story 3 - Prevent Cross-Scope Records and Cache Collisions (Priority: P1)

An operator sees only records belonging to the requested available legacy Commerce scope, even
when another Workspace, legacy `BusinessUnit`, or Branch uses overlapping record identifiers.

**Why this priority**: Expanding repositories and caches must improve fail-closed mock isolation
without claiming that client-provided legacy scope is production authorization.

**Independent Test**: Seed at least two Workspaces, two legacy `BusinessUnit` values, and two
Branches with overlapping Customer, Product, Inventory, Order, and Invoice IDs. Exercise list,
detail, Customer mutations, relationship composition, cache invalidation, and scope changes.

**Acceptance Scenarios**:

1. **Given** overlapping IDs in different Workspaces or legacy `BusinessUnit` scopes, **When** any
   included repository operation runs, **Then** only a matching in-scope record is returned or
   changed.
2. **Given** Branch-specific Inventory, Order, or Invoice data, **When** the active Branch changes,
   **Then** the view and cache resolve only the newly requested Branch without exposing the prior
   Branch's data.
3. **Given** a Customer list that is currently legacy-`BusinessUnit`-wide, **When** it is queried
   from different Branches of that same legacy `BusinessUnit`, **Then** current cross-Branch
   visibility is preserved while Workspace and legacy-`BusinessUnit` isolation remains enforced.
4. **Given** an in-scope record referencing an out-of-scope related ID, **When** a composed view is
   built, **Then** the foreign record is not joined or disclosed and the characterized safe fallback
   is used.
5. **Given** a Customer mutation in one scope, **When** related caches update, **Then** no cache for
   another Workspace, legacy `BusinessUnit`, or applicable Branch changes.
6. **Given** the frontend scope checks pass, **When** behavior is documented, **Then** it is still
   labeled a mock compatibility safeguard rather than proof of authorization or canonical scope.

---

### User Story 4 - Read Current Inventory Projections Without Migrating Stock Writes (Priority: P2)

An operator views the same Branch-filtered Inventory rows, Product references, stock quantities,
thresholds, and low/out-of-stock projections through a read-only boundary.

**Why this priority**: Inventory is a high-risk shared fact; separating reads is useful only if
stock-changing behavior remains with its current single owner path.

**Independent Test**: Load `/inventory` with seeded Products and Branch Inventory, switch Branches,
exercise search/status filters, perform an existing excluded stock mutation, and verify the read
view observes the result once without issuing or duplicating that mutation.

**Acceptance Scenarios**:

1. **Given** Products with and without Branch-specific Inventory records, **When** `/inventory`
   opens, **Then** the same effective stock, threshold, Product reference, ordering, and fallback
   values are shown.
2. **Given** low-stock, out-of-stock, and in-stock records, **When** filters or summary counts are
   used, **Then** the same rows and projections are produced without defining new stock semantics.
3. **Given** two Branches with different quantities for one Product, **When** the Branch changes,
   **Then** only that Branch's characterized projection appears.
4. **Given** an existing stock adjustment, sale deduction, transfer, return, or other excluded
   mutation succeeds through the retained path, **When** Inventory reads refresh, **Then** the new
   stored value appears exactly once and the read repository performs no write.
5. **Given** Inventory loading or deterministic failure, **When** the view cannot resolve, **Then**
   the operator sees a readable error with retry and no cached foreign or fabricated quantity.

---

### User Story 5 - Read Current Order Lists and Details Without Moving Order Logic (Priority: P2)

An operator views the same Order list and detail records, filters, identifiers, Customer/Product
references, and navigation through a read-only boundary.

**Why this priority**: Order reads can be isolated from the provider while creation and complex
commercial behavior remain safely untouched.

**Independent Test**: Open `/orders` and `/orders/<id>` with seeded and newly created legacy Orders,
exercise existing filters and linked references, refresh, and verify that the existing POS/order
write path remains the only writer.

**Acceptance Scenarios**:

1. **Given** scoped Orders, **When** `/orders` opens and existing filters are applied, **Then** the
   same IDs, order numbers, rows, totals, statuses, dates, Customer references, and routes appear.
2. **Given** an in-scope Order ID, **When** `/orders/<id>` opens, **Then** the same line items,
   Product references, Customer reference, commercial snapshots, linked outcomes, and presentation
   are displayed as compatibility data.
3. **Given** a missing or out-of-scope Order ID, **When** detail is requested, **Then** the same safe
   not-found/recovery experience appears without leaking a foreign Order.
4. **Given** POS or another retained path creates an Order, **When** list/detail reads refresh,
   **Then** that exact stored Order appears once without repository-side creation, recalculation,
   stock deduction, payment, tax, Invoice, or return effects.

---

### User Story 6 - Read Current Invoice Lists, Details, and Documents Without Moving Issuance (Priority: P2)

An operator views the same Invoice list, detail, and document presentation with unchanged Invoice,
Order, and Customer references through a read-only boundary.

**Why this priority**: Invoice reads can move safely while numbering, issuance, taxation, payment,
and accounting semantics remain deferred and owner-controlled.

**Independent Test**: Open `/invoices`, `/invoices/<id>`, and the existing document route for seeded
and newly created legacy Invoices, verify referenced Order/Customer data and refresh persistence,
and prove the retained Invoice creation path is the only writer.

**Acceptance Scenarios**:

1. **Given** scoped Invoices, **When** `/invoices` opens, **Then** the same identifiers, numbers,
   rows, totals, dates, statuses, references, filters, and routes appear.
2. **Given** an in-scope Invoice, **When** detail or document presentation opens, **Then** the same
   stored fields and authorized Order/Customer references are rendered without changing them.
3. **Given** a missing, dangling, or out-of-scope Invoice/Order/Customer reference, **When** a view
   resolves it, **Then** the characterized safe fallback appears and no foreign record is exposed.
4. **Given** the retained path creates an Invoice, **When** list/detail/document reads refresh,
   **Then** the exact stored Invoice appears once without repository-side issuance, renumbering,
   tax calculation, payment transition, credit note, or accounting behavior.

---

### User Story 7 - Reuse One Stable Commerce Runtime and Compatibility Direction (Priority: P2)

A developer expands the existing Commerce service composition once while pages, components, and
legacy consumers remain unaware of mock-versus-future data-source selection.

**Why this priority**: One stable composition root prevents the incremental migration from
creating parallel architectural centers or recreating repositories during rendering.

**Independent Test**: Construct isolated Commerce runtimes, render consumers repeatedly, switch
legacy scopes, trigger included operations and retained writes, and inspect source boundaries and
consumer usage before deleting any provider callback.

**Acceptance Scenarios**:

1. **Given** the existing Feature 052 runtime, **When** new domain services are composed, **Then**
   Product service identities and behavior remain compatible and all new service identities stay
   stable across repeated renders.
2. **Given** mock configuration with deterministic latency/failure rules, **When** an included
   operation runs, **Then** it follows the configured reproducible outcome without uncontrolled
   randomness or partial state.
3. **Given** pages, components, and hooks, **When** source boundaries are checked, **Then** they do
   not select implementations, read environment configuration, access browser storage directly,
   or issue transport requests.
4. **Given** a simple single-repository operation, **When** it executes, **Then** no application
   service is required; a multi-repository read uses a bounded service without gaining write
   authority over its sources.
5. **Given** a legacy consumer that is not yet migrated, **When** it receives data, **Then** the
   repository-backed compatibility facade is upstream and `AppProvider` does not become the new
   repository center.

---

### User Story 8 - Recover Accessibly in English and Arabic (Priority: P2)

An operator can understand and recover from loading, empty, failed, not-found, validation, and
Customer mutation-pending states in English/LTR and Arabic/RTL without a visual redesign.

**Why this priority**: Moving asynchronous reads into hooks must not create inaccessible blank
screens, duplicate submissions, or untranslated recovery paths.

**Independent Test**: Force every required state on each migrated surface, operate all Customer
forms and retry controls by keyboard, inspect announcements and focus, and repeat in English/LTR
and Arabic/RTL with mixed-direction user-entered data.

**Acceptance Scenarios**:

1. **Given** an included read is pending, empty, or failed, **When** its route opens, **Then** a
   localized, direction-correct, readable state appears and failures provide a keyboard-operable
   retry action.
2. **Given** Customer creation/update is pending, **When** the operator interacts with the form,
   **Then** pending status is conveyed semantically and duplicate submission is prevented without
   relying on color alone.
3. **Given** Customer validation fails, **When** feedback appears, **Then** it is translated,
   programmatically associated with the relevant control, announced where applicable, and focus
   remains safe.
4. **Given** Arabic and Latin text in customer names, notes, product names, or identifiers, **When**
   it is stored and displayed, **Then** user-entered content remains unchanged and surrounding
   layout follows the active direction.

### Edge Cases

- A legacy collection is empty, missing, corrupt, unavailable, quota-exhausted, or contains an
  older compatible record shape.
- A record contains unknown serializable fields or field ordering required by an existing
  regression.
- Customer input is blank after trimming, contains mixed-direction text, or is submitted twice
  while the first operation is pending.
- A Customer is created in one Branch but remains visible in the currently characterized
  legacy-`BusinessUnit`-wide Customer list.
- A requested ID exists only in another Workspace, legacy `BusinessUnit`, or Branch.
- Customer, Product, Order, or Invoice IDs overlap across scopes.
- An Order references a missing Customer or Product; an Invoice references a missing Order or
  Customer; a relation exists only outside the requested scope.
- A Product lacks a Branch Inventory record and current fallback stock must be preserved.
- The active scope changes, a component unmounts, or a retry begins while a delayed operation is
  in flight.
- A retained Order, Invoice, or Inventory mutation completes while a read result is cached.
- The same deterministic failure rule is configured for multiple operations or invocations.
- HTTP mode is selected although Feature 053 provides no HTTP implementation.
- A legacy consumer remains when removal of an `AppProvider` Customer callback is considered.

## Requirements *(mandatory)*

### Functional Requirements

#### Incremental Migration Boundary

- **FR-001**: Feature 053 MUST extend the Feature 052 Commerce repository foundation without
  breaking or replacing its Product contracts, service composition, hooks, compatibility facade,
  persistence, or tests.
- **FR-002**: Structural work MUST begin only after executable characterization covers every
  affected Customer, Inventory, Order, Invoice, POS, relationship, route, refresh, language, and
  accessibility behavior.
- **FR-003**: The only complete read/write migration in this feature MUST be Customers with
  frontend-internal `list`, `getById`, `create`, and `update` behavior.
- **FR-004**: Inventory, Orders, and Invoices MUST receive read-only frontend-internal repositories
  and query hooks sufficient for the current included views.
- **FR-005**: `AppProvider` MUST remain for responsibilities outside the migrated boundaries and
  MUST NOT become the new repository or service composition root.
- **FR-006**: Every migrated responsibility MUST have one active persistence source. No Customer,
  Inventory, Order, or Invoice write may be performed by both a repository and `AppProvider`.
- **FR-007**: Migration checkpoints MUST be bounded and reversible without clearing or rewriting
  valid browser data as a recovery mechanism.
- **FR-008**: Pages and components MUST preserve existing routes, visible behavior, IDs, seeded
  data, relationships, and storage compatibility unless characterization identifies an already
  missing loading/error/accessibility state required by this specification.

#### Temporary Legacy Scope and Tenant Safety

- **FR-009**: Every new repository operation MUST accept the narrowest available temporary legacy
  scope needed by its current behavior, using Feature 052's field meanings: non-empty
  `workspaceId`, non-empty `legacyBusinessUnitId`, and optional non-empty `branchId`.
- **FR-010**: The legacy scope MUST be documented as frontend-internal and temporary; it MUST NOT
  be presented as canonical organization ancestry, production authorization, or a cross-domain
  platform contract.
- **FR-011**: Feature 053 MUST NOT introduce, infer, alias, persist, or require a canonical
  `businessId` or a canonical Business record.
- **FR-012**: Customer list/get behavior MUST preserve the current legacy-`BusinessUnit`-wide view;
  the creation command MUST carry the current Branch identifier used by the stored record without
  redefining Customer ownership scope.
- **FR-013**: Branch context MUST constrain current Branch-specific Inventory, Order, and Invoice
  queries and MUST be included wherever it changes results.
- **FR-014**: All scoped list, detail, create, update, relationship, and cache operations MUST
  validate Workspace and legacy `BusinessUnit`, plus Branch where applicable, before returning or
  changing data.
- **FR-015**: Missing or mismatched scope MUST fail closed without returning foreign record fields,
  confirming a foreign record's existence, or mutating any collection.
- **FR-016**: Every query key MUST contain the full normalized legacy scope applicable to the
  result plus every result-shaping filter or identifier.
- **FR-017**: Cache updates, invalidations, retries, and publications MUST affect only entries
  matching the complete applicable legacy scope.
- **FR-018**: Cross-repository composition MUST re-check scope for each referenced Customer,
  Product, Inventory, Order, or Invoice record and MUST NOT join an out-of-scope relation.

#### Customer Compatibility Contract and Journey

- **FR-019**: The Customer repository entity MUST be explicitly labeled a legacy frontend
  compatibility record, not a canonical Transactional Customer aggregate, CRM identity, or future
  transport DTO.
- **FR-020**: Customer storage MUST retain the key `nexoraxs.db.commerceCustomers`, existing field
  names and types, IDs, seeded records, timestamps, scope identifiers, ordering, and unknown
  serializable fields required by current regressions.
- **FR-021**: `list` MUST preserve current legacy-`BusinessUnit` Customer visibility, search inputs,
  ordering, empty behavior, and records used to calculate current Customer metrics.
- **FR-022**: `getById` MUST require legacy scope, return only an in-scope Customer, and produce a
  safe internal not-found outcome for a missing or out-of-scope ID.
- **FR-023**: `create` MUST accept only the currently editable Customer input, require the
  characterized mandatory name validation, generate the established compatible ID/timestamps,
  preserve current scope fields, and return the final stored Customer.
- **FR-024**: `update` MUST accept only the currently editable Customer fields, preserve ID,
  creation time, scope, unknown fields, and unrelated values, update the established timestamp,
  and return the final stored Customer.
- **FR-025**: Customer create/update MUST be atomic. Validation, scope, storage, or configured
  failure MUST leave the prior collection unchanged.
- **FR-026**: Customer create/update MUST expose pending, validation, success, safe not-found,
  storage-failure, configured-failure, and retry/recovery outcomes suitable for the preserved UI.
- **FR-027**: The Customer contract MUST NOT add delete, archive, merge, deduplication, anonymous
  identity, retention, erasure, consent, status, or CRM workflow behavior.
- **FR-028**: POS Customer creation and selection MUST use the new Customer boundary or its
  repository-backed compatibility facade while Order and Invoice creation remain on retained paths.
- **FR-029**: Customer list/detail views MUST preserve current Order-history metrics and related
  navigation by composing read-only Order data without moving Order writes or recalculating source
  commercial facts.
- **FR-030**: Existing Orders and Invoices MUST retain their Customer IDs byte-for-byte; Customer
  creation or update MUST NOT rewrite those source records.
- **FR-031**: Obsolete Customer write callbacks MAY be deleted from `AppProvider` only after source
  and regression evidence proves every active caller uses the repository-backed path.

#### Inventory Read Model

- **FR-032**: The Inventory repository MUST be frontend-internal and read-only for Feature 053.
- **FR-033**: Inventory browser compatibility MUST preserve the key
  `nexoraxs.db.branchInventory`, existing record IDs, scope fields, Product IDs, quantities,
  thresholds, timestamps, ordering, and characterized serialized shape.
- **FR-034**: Inventory queries MUST preserve the current Branch-filtered effective-stock behavior,
  including the characterized fallback when no Branch Inventory record exists.
- **FR-035**: Inventory read composition MUST preserve Product references, visible stock values,
  low-stock thresholds, summary counts, filters, and low/out-of-stock projections without
  asserting new Inventory rules.
- **FR-036**: Inventory read operations MUST NOT adjust stock, record movements, perform sale
  deductions, restock returns, execute transfers, reserve stock, or define Inventory lifecycle.
- **FR-037**: Existing Inventory mutations MUST remain on one retained path and successful changes
  MUST become observable to repository-backed reads without a second write.
- **FR-038**: A missing, out-of-scope, or failed Product/Inventory reference MUST produce the
  characterized safe fallback or recoverable error and MUST NOT fabricate a quantity.

#### Order Read Model

- **FR-039**: The Order repository MUST be frontend-internal and read-only for Feature 053, with
  current list and scope-safe `getById` behavior.
- **FR-040**: Order browser compatibility MUST preserve the key `nexoraxs.db.commerceOrders`,
  existing IDs and order numbers, seeded records, serialized fields, ordering, and Customer/Product
  references required by current regressions.
- **FR-041**: Order list queries MUST preserve current Branch and legacy-`BusinessUnit` views,
  filters, ordering, totals, statuses, dates, and navigation.
- **FR-042**: Order detail queries MUST preserve line items, recorded commercial values, Customer
  and Product references, linked outcomes, routes, and current presentation without redefining
  their ownership.
- **FR-043**: Missing or out-of-scope Order detail MUST return a safe internal not-found outcome
  with no foreign record disclosure.
- **FR-044**: Order repositories, hooks, services, and facades MUST NOT create or amend Orders,
  calculate or change pricing/discount/tax/payment values, cancel, fulfill, return, or perform
  Inventory side effects.
- **FR-045**: Orders created by retained POS/legacy paths MUST become visible to repository-backed
  reads and related Customer/Invoice views without duplicate persistence or field rewriting.

#### Invoice Read Model

- **FR-046**: The Invoice repository MUST be frontend-internal and read-only for Feature 053, with
  current list and scope-safe `getById` behavior.
- **FR-047**: Invoice browser compatibility MUST preserve the key `nexoraxs.db.commerceInvoices`,
  existing IDs and invoice numbers, seeded records, serialized fields, ordering, Order IDs, and
  Customer IDs required by current regressions.
- **FR-048**: Invoice list/detail/document queries MUST preserve current Branch and
  legacy-`BusinessUnit` views, filters, routes, totals, dates, statuses, source references, and
  presentation.
- **FR-049**: Missing, dangling, or out-of-scope Invoice, Order, or Customer references MUST use the
  characterized safe fallback and MUST NOT disclose foreign data.
- **FR-050**: Invoice repositories, hooks, services, and facades MUST NOT issue Invoices, define or
  change numbering, recalculate taxes, transition payments/status, create credit notes, or define
  document/accounting semantics.
- **FR-051**: Invoices created by retained legacy paths MUST become visible to repository-backed
  reads and related Customer/Order views without duplicate persistence or field rewriting.

#### Contracts, Mock Stores, and Deterministic Behavior

- **FR-052**: Additions to `packages/contracts` MUST be limited to visibly frontend-internal domain
  compatibility records, repository interfaces, commands, queries, results, and error shapes; they
  MUST contain no storage, transport, environment, rendering, or runtime implementation.
- **FR-053**: Additions to `packages/sdk` MAY contain mock repositories, store implementations,
  compatibility mapping, serialization, diagnostics, and composition. Mock Customer, Inventory,
  Order, and Invoice repositories MUST depend on mock store contracts and MUST NOT access browser
  storage directly.
- **FR-054**: Browser-storage adapters MUST be the only new boundary that accesses the affected
  storage keys and MUST preserve refresh compatibility without rewriting data on read.
- **FR-055**: Memory store implementations MUST be browser-independent, isolated per test, and
  behaviorally compatible with the relevant browser adapters.
- **FR-056**: Repository contract suites MUST exercise list/detail for every included domain and
  create/update for Customers against both memory and browser-compatible stores where applicable.
- **FR-057**: Mock repositories MUST support configurable non-negative asynchronous latency and
  explicit deterministic failure rules by operation, fixture, invocation, or equivalent stable
  input.
- **FR-058**: Uncontrolled randomness, shared mutable test fixtures, test-order dependence, and
  uncontrolled clocks/ID sources are forbidden.
- **FR-059**: Internal errors MUST distinguish the local states required for validation, not found,
  scope mismatch, configured failure, unavailable/corrupt storage, and invalid local query input
  without becoming a platform or future API taxonomy.
- **FR-060**: Failed Customer writes MUST not partially persist; failed reads MUST not clear valid
  storage, replace scoped caches with foreign data, or synthesize records.
- **FR-061**: Internal pagination or ordering controls MAY exist only when required by current UI or
  deterministic tests and MUST NOT define future API pagination semantics.
- **FR-062**: `packages/shared` MUST NOT gain Customer persistence, Inventory rules, Order creation,
  Invoice creation, authentication state, or other Core/Commerce business behavior.
- **FR-063**: Applications MUST NOT import another application's source, and shared packages MUST
  retain the ownership boundaries established by Feature 052 and repository governance.

#### Composition, Hooks, Cache, and Compatibility Facades

- **FR-064**: Feature 053 MUST reuse and extend the single Commerce composition root and existing
  app-level Commerce services provider rather than create a second domain composition center.
- **FR-065**: Runtime configuration MUST continue to be constructed in one startup module from the
  established Commerce runtime configuration fields; no new environment read is permitted in
  contracts, repositories, hooks, services, facades, pages, or components.
- **FR-066**: No HTTP adapter, HTTP endpoint, transport request, Laravel DTO, or network behavior may
  be implemented. Selecting unavailable HTTP mode MUST fail safely without issuing a request.
- **FR-067**: Repository, store, facade, bounded application-service, and cache-client instances
  MUST be created once per Commerce provider runtime and MUST not be recreated during component
  renders.
- **FR-068**: Pages and components MUST consume feature hooks and MUST NOT choose mock/HTTP
  implementations or directly access `localStorage`, `sessionStorage`, environment variables, or
  transport calls.
- **FR-069**: Hooks MUST call one repository directly for simple operations and MAY call an
  application service only for genuine cross-repository read composition or existing bounded
  orchestration.
- **FR-070**: The existing React Query layer MAY manage loading, user-triggered retry,
  deduplication, invalidation, and request state but MUST disable automatic retries for included
  reads and Customer mutations, remain above repositories, and MUST NOT become the source of truth
  or own validation/business rules.
- **FR-071**: Customer mutations MUST update or invalidate only the full applicable legacy scope
  and MUST publish compatible results only after successful persistence.
- **FR-072**: Successful retained Order, Invoice, and Inventory writes MUST notify or invalidate
  the corresponding read boundary without duplicating the write or moving excluded logic.
- **FR-073**: New repositories MUST be upstream of compatibility facades. A facade MUST NOT delegate
  an included Customer write back to the obsolete `AppProvider` callback.
- **FR-074**: Legacy consumers MAY temporarily consume repository-backed facade projections with
  their established shape; deletion requires zero-consumer evidence and passing regressions.

#### Product Quality, Evidence, and Documentation

- **FR-075**: Every migrated read MUST expose localized loading, empty, error-with-retry,
  not-found, success, and safe recovery states; Customer mutations MUST additionally expose pending
  and validation states.
- **FR-076**: English/LTR and Arabic/RTL MUST cover all new messages, logical layout, preserved
  user-entered text, mixed-direction values, readable status, and non-color-only meaning.
- **FR-077**: All critical migrated journeys MUST be keyboard-operable with semantic names,
  associated labels/errors, visible focus, safe focus movement, and applicable screen-reader
  announcements.
- **FR-078**: No visual redesign is permitted except the smallest change needed to expose an
  already-missing required loading, empty, error/retry, pending, validation, or accessibility state.
- **FR-079**: Mock diagnostics MUST record only operation, controlled duration, outcome category,
  and non-sensitive correlation/scope fingerprints; they MUST exclude secrets, full payloads,
  personal contact values, foreign records, and production Audit claims.
- **FR-080**: Characterization and regression coverage MUST include Customer list/create/edit/POS
  selection, Inventory projections, Order list/detail, Invoice list/detail/document, refresh
  persistence, and unchanged routes/UI.
- **FR-081**: Contract and integration coverage MUST include every included repository, scope
  isolation, deterministic latency/failures, storage recovery, cache isolation, facade behavior,
  and exactly-once compatibility publication after successful writes.
- **FR-082**: Relationship coverage MUST verify compatible Product, Customer, Inventory, Order, and
  Invoice IDs within scope and safe behavior for missing or cross-scope references.
- **FR-083**: Feature 052 Product tests, Commerce Feature 044 regressions, and Core Feature 050 tests
  affected by shared-package or state changes MUST remain passing.
- **FR-084**: Strict TypeScript, ESLint with zero warnings, production builds, Vitest, and Playwright
  gates for affected projects MUST pass before merge.
- **FR-085**: Specification, plan, tasks, frontend-internal contract notes, compatibility mapping,
  package-boundary documentation, and test evidence MUST remain synchronized.

#### Non-Goals and Prohibited Changes

- **FR-086**: Do not implement Laravel, an HTTP API, HTTP repositories, authentication, a database,
  queues, billing, production Audit, Business Brain, Marketplace, AI, or MSW.
- **FR-087**: Do not migrate Customer deletion/lifecycle, Inventory writes/lifecycle, Order writes
  or commercial workflows, Invoice issuance/lifecycle, or any other Commerce domain.
- **FR-088**: Do not rename legacy IDs, storage keys, routes, seeded references, `businessUnitId`
  fields in stored records, or existing user-visible terminology as part of this migration.
- **FR-089**: Do not introduce a canonical Business, canonical Customer/Inventory/Order/Invoice
  scope, future DTO, public SDK contract, API pagination, API error taxonomy, or network
  idempotency policy.
- **FR-090**: Do not define deletion, archive, deactivation, status, retention, cancellation,
  fulfillment, stock, numbering, tax, payment, return, credit-note, or accounting semantics beyond
  preserving already-characterized mock presentation.
- **FR-091**: Do not remove `AppProvider`, rebuild Core entities, implement OS lifecycle, create an
  `OSEnablement` model, migrate Workspace/Business/Branch/Team/Subscription management, or change
  frozen architecture.
- **FR-092**: Do not treat repositories, stores, caches, facades, application services, projections,
  browser records, or diagnostics as a transfer of canonical ownership or production authority.

### Key Entities

- **Legacy Commerce Scope Input**: Temporary frontend-only Workspace, legacy `BusinessUnit`, and
  optional Branch identifiers following Feature 052's field meanings. It is a compatibility and
  cache-isolation input, not canonical organization scope or authorization.
- **Legacy Customer Compatibility Record**: The existing stored Customer shape and opaque fields
  used by current Customer, POS, Order, and Invoice journeys. It is not a canonical Transactional
  Customer or CRM identity.
- **Inventory Compatibility Read Model**: A reconstructable Branch-aware view of existing Product
  references, effective quantities, thresholds, and current stock projections. It owns no Stock or
  Inventory Movement fact.
- **Order Compatibility Read Model**: A scoped view of existing stored Orders, line references,
  recorded values, and linked outcomes. It owns no Order lifecycle or write.
- **Invoice Compatibility Read Model**: A scoped view of existing stored Invoices and their
  Order/Customer references for list, detail, and document presentation. It owns no issuance,
  numbering, payment, tax, or accounting rule.
- **Compatibility Reference**: An existing identifier from one included record to a Product,
  Customer, Order, Inventory record, or Invoice. Resolution must be scope-safe and must not transfer
  ownership between domains.
- **Frontend-Internal Query, Command, Result, and Error**: Local mock orchestration shapes whose
  fields and semantics remain private to the frontend compatibility seam.
- **Mock Commerce Store Port**: Storage abstraction used by mock repositories instead of direct
  browser access.
- **Browser Compatibility Store**: Adapter that preserves established storage keys, serialized
  records, seeded relations, and refresh behavior.
- **Memory Commerce Store**: Deterministic isolated test implementation of the applicable store
  contract.
- **Commerce Services Runtime**: The single stable composition of Product and expanded domain
  repositories, facades, bounded services, and cache orchestration.
- **Compatibility Facade**: Temporary adapter that publishes repository-backed data to legacy
  consumers without making the legacy provider the new architecture center.

## Constitution Requirements *(mandatory)*

### Authority and Ownership

- **Controlling authority**: `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`, Commerce OS
  Wave 1, Accepted ADR-004, ADR-034, ADR-035, ADR-036, ADR-038, ADR-040, and Constitution v2.0.0.
  Proposed ADR-041 is not treated as accepted authority.
- **Owning domains**: Transactional Customers retains canonical Customer facts; Inventory retains
  Stock and Inventory Movement; Orders retains canonical Order; Invoices and Documents retains
  Invoice and Commerce Document facts; Product Catalog retains Product facts. Core Organization
  Registry retains organization identity.
- **Canonical writes affected**: None. Feature 053 relocates existing frontend demo Customer
  create/update behavior only and grants no production write authority. All included Inventory,
  Order, and Invoice boundaries are read-only.
- **Projection/read-model impact**: Reconstructable Customer history, Inventory availability,
  Order, and Invoice/document views only. A projection never becomes a source owner.
- **Deferred Decisions touched**: DD-01, DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19, DD-21,
  DD-23, DD-24, DD-25, and DD-29 remain unresolved. No Feature 053 contract or test expectation may
  be promoted as their answer.

### Scope and Boundaries

- **Tenant context**: Workspace is the tenant boundary. Temporary legacy scope always includes
  Workspace and legacy `BusinessUnit`, plus Branch where current Inventory, Order, Invoice, or
  Customer creation behavior requires it. Canonical Business remains absent and is never
  fabricated.
- **Authorization context**: The current actor, Commerce OS, action, resource ID, and available
  legacy scope are inputs to mock safeguards. Final server-side authorization is not implemented;
  any future production write remains blocked on owner validation and canonical scope decisions.
- **Cross-domain interaction**: Only scoped frontend compatibility references and reconstructable
  reads cross the included Commerce owner boundaries. No direct canonical write, cross-app import,
  backend contract, or optional OS dependency is introduced.
- **OS independence**: Commerce remains independently usable and no Customer, Inventory, Order, or
  Invoice core read depends on CRM or another Operating System.
- **Lifecycle impact**: Workspace Entitlement, OS Subscription, installation, setup, configuration,
  activation, readiness, access, pause, archive, and removal remain unchanged. Customer, Product,
  Inventory, Order, and Invoice lifecycles remain deferred beyond existing mock compatibility.

### Intelligence and Product Quality

- **Capability/Knowledge/Rules/AI order**: No Capability, Knowledge, Rule, Recommendation,
  Business Brain, Marketplace, or AI behavior is introduced; frozen ordering and owner boundaries
  remain unchanged.
- **Explainability and human approval**: No automated recommendation or consequential AI action is
  added. Existing human-initiated mock Customer changes remain explicit.
- **Arabic/English and direction**: All required async, empty, error, retry, pending, validation,
  and recovery messages have English and Arabic paths; surrounding layout follows LTR/RTL while
  user-entered data remains as entered.
- **Accessibility**: Critical routes and Customer mutations are keyboard-operable, semantically
  named and labeled, focus-safe, screen-reader understandable, readable, and do not convey required
  meaning through color alone.

### Security, Operations, and Compatibility

- **Security and privacy**: All repository reads/writes fail closed by available legacy scope,
  cross-scope relationships are not joined, Customer contact data is minimized in diagnostics, and
  no secret or full payload is logged. Frontend checks are defense-in-depth demo safeguards only.
- **Audit and observability**: Deterministic local diagnostics cover operation, controlled latency,
  outcome, and non-sensitive correlation. They are not production Audit evidence. Production
  logging, metrics, traces, authorization evidence, and append-only Audit remain prerequisites for
  a separately governed backend cutover.
- **Contract compatibility**: Feature 052 Products and all affected legacy IDs, storage keys,
  record shapes, seeded references, routes, and active consumers remain additive-compatible.
  Deletion follows characterization, migration, zero-consumer proof, and passing regression gates.
- **Required test evidence**: Characterization; repository/store contract; scope/cache isolation;
  deterministic failure; persistence/refresh; Customer mutation; relationship compatibility;
  facade/composition; English/Arabic and RTL/LTR; keyboard/screen-reader/accessibility; Feature 052,
  Commerce 044, applicable Core 050; strict type, zero-warning lint, unit/integration/E2E, and
  production build evidence.
- **Documentation synchronization**: The specification, plan, tasks, internal contract notes,
  compatibility mappings, package boundary documentation, and final evidence must describe the
  same temporary boundary and unchanged Deferred Decisions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of characterized Customer, Inventory, Order, Invoice, document, POS, and linked
  Product route paths and visible outcomes remain unchanged except for explicitly required missing
  loading/error/accessibility states.
- **SC-002**: Customer list, get, create, and update scenarios succeed in 100% of acceptance runs
  through both active Customer entry points, with no duplicate record from repeated submission
  while pending.
- **SC-003**: Created and edited Customers, retained-path Orders/Invoices, and Inventory values
  remain visible after a full browser refresh in 100% of persistence scenarios.
- **SC-004**: All characterized storage keys, existing IDs, seeded record relationships, and
  required serialized fields have zero unintended changes across the migration.
- **SC-005**: The multi-Workspace, multi-legacy-`BusinessUnit`, multi-Branch overlap matrix produces
  zero foreign disclosures, joins, cache collisions, or mutations across every included operation.
- **SC-006**: 100% of repository contract scenarios produce equivalent observable outcomes with
  isolated memory and browser-compatible storage.
- **SC-007**: Twenty consecutive deterministic failure/latency suite runs produce identical
  outcomes with zero random, timing-order, clock, ID, or shared-state flakes.
- **SC-008**: Every successful retained Inventory, Order, or Invoice write becomes visible in its
  migrated read view exactly once, with zero duplicate operational write effects.
- **SC-009**: Source/usage evidence finds zero active caller of an obsolete Customer write callback
  before that callback is deleted and exactly one Customer persistence path afterward.
- **SC-010**: Runtime data-source selection remains confined to one startup boundary, service
  identities remain stable across 100 consumer re-renders, and no user-facing module chooses an
  implementation.
- **SC-011**: All required loading, empty, error/manual-retry, not-found, Customer pending, and
  validation states are understandable and recoverable in both English/LTR and Arabic/RTL
  acceptance runs, with zero automatic retry attempts.
- **SC-012**: All critical migrated journeys pass keyboard, semantic-name, label/error association,
  focus, screen-reader, mixed-direction-data, and non-color-only checks with zero critical
  accessibility violations.
- **SC-013**: Feature 052 Product, Commerce 044, and every applicable Core 050 regression completes
  with zero failures attributable to Feature 053.
- **SC-014**: All required type, zero-warning lint, repository/contract/integration/browser,
  localization/accessibility, and production-build gates pass without waiver of tenant isolation
  or compatibility failures.

## Assumptions

- Existing authentication/session behavior supplies the current actor and temporary legacy scope
  inputs only; it is not changed or treated as production authorization by this feature.
- Existing affected routes are `/customers`, `/customers/<id>`, `/inventory`, `/orders`,
  `/orders/<id>`, `/invoices`, `/invoices/<id>`, the current Invoice document route, and `/pos`.
- Existing browser keys are `nexoraxs.db.commerceCustomers`, `nexoraxs.db.branchInventory`,
  `nexoraxs.db.commerceOrders`, and `nexoraxs.db.commerceInvoices`; the Feature 052 Product key and
  behavior remain unchanged.
- Current Customer listing is legacy-`BusinessUnit`-wide while Customer creation records the active
  Branch. Feature 053 preserves that behavior without deciding canonical Customer scope.
- Current Customer validation requires a non-blank name; additional matching, uniqueness, consent,
  deletion, and retention policy are outside this feature.
- Existing Order, Invoice, and Inventory mutations remain in `AppProvider` or their current retained
  compatibility path. The new read seams observe successful changes but never repeat them.
- Current seeded records, their insertion order, generated ID conventions, and cross-record IDs are
  the compatibility baseline captured by characterization, even when a default demo collection is
  empty.
- Missing relationships use the currently characterized fallback unless tenant safety requires a
  less revealing outcome.
- The existing Commerce runtime configuration and unavailable future-HTTP mode are reused. No
  network request or future transport contract is required.
- Existing unrelated legacy storage/state debt is quarantined. Only the responsibilities expressly
  listed in this specification move in Feature 053.
