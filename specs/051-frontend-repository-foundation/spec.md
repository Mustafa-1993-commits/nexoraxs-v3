# Feature Specification: Frontend Repository Foundation

**Feature Branch**: `feat/051-frontend-data-boundary`  
**Feature ID**: `051-frontend-repository-foundation`  
**Created**: 2026-07-16  
**Status**: Draft  
**Input**: User description: "Complete the frontend with mock data while introducing a backend-ready data boundary. Begin with Commerce Products, preserve current behavior, and avoid a repository-wide rewrite."

## Feature Intent and Guardrails

The current NexoraXS frontend uses a monolithic application provider and browser storage as both the UI state mechanism and the application data layer. This feature introduces the first backend-ready frontend data boundary without starting Laravel, adding network APIs, or changing the user-visible Commerce Products journey.

The feature establishes a repeatable pattern:

`Page / Component -> Feature Hook -> Application Service when materially required -> Repository Contract -> Mock Repository -> Mock Storage Adapter`

A future HTTP repository may implement the same contract and communicate with Laravel without requiring product pages to select or understand the active data source.

This is an incremental compatibility feature. It MUST NOT perform a repository-wide provider rewrite, canonical organization migration, authentication replacement, subscription lifecycle redesign, backend implementation, or unrelated screen redesign.

## Clarifications

### Session 2026-07-16

- Q: Who selects whether mock or HTTP implementations are active? -> A: One application-level Composition Root selects implementations. Pages, components, and feature hooks MUST NOT read environment variables or select data sources.
- Q: Are `NEXT_PUBLIC_*` variables a runtime deployment switch? -> A: No. They are build-time public configuration. Feature 051 may use build configuration at the Composition Root, but contracts and consumers remain independent of that mechanism.
- Q: Must every repository call pass one generic optional scope object? -> A: No. Scope contracts are hierarchical and operations accept the narrowest valid scope: Workspace, Business, Business Unit, or Branch.
- Q: Does this feature create the missing canonical Business model? -> A: No. Feature 050 documented the canonical-versus-legacy conflict. Feature 051 defines minimum scope-shaped contracts required for the Products seam but MUST NOT invent, migrate, duplicate, or persist a new canonical Business record.
- Q: Is an Application Service mandatory for every CRUD action? -> A: No. Hooks may call one repository directly for simple operations. Application Services are used only when a use case coordinates multiple repositories, policies, or domain operations.
- Q: Is React Query the data source? -> A: No. Query tooling may orchestrate async state and caching above repository contracts. It MUST NOT contain direct browser-storage access or become the canonical owner of product data.
- Q: Is deleting a product physical deletion? -> A: No. The migrated flow uses archive semantics and preserves linked historical compatibility.

## Existing Implementation Classification Register

| Affected area | Classification | Required treatment |
|---|---|---|
| Current Commerce Products screens and visible CRUD behavior | Keep | Preserve routes, fields, validation outcomes, localization, and visible behavior unless a defect is explicitly characterized and approved. |
| Products accessed through the monolithic `AppProvider` | Reconcile | Introduce a compatibility seam and migrate one complete Products flow to repository-backed access. |
| Browser storage persistence | Legacy-compatible | Preserve existing keys and readable seeded data behind a storage adapter; no page or feature hook may access storage directly. |
| Product data ownership in Commerce OS | Keep | Commerce remains the product owner. Core gains no product write capability. |
| `packages/shared` product persistence/business behavior | Remove later | Stop adding new product ownership there; remove only after consumers are migrated and regression evidence exists. |
| Canonical Workspace -> Business -> Business Unit -> Branch hierarchy | Deferred boundary | Define minimum non-persistent scope contracts only. Do not perform canonical entity migration in this feature. |
| Composition Root | Missing | Add one Commerce application composition boundary that creates stable service/repository instances. |
| Repository contracts | Missing | Add product query and mutation contracts independent of storage and HTTP implementation details. |
| Mock storage adapter | Missing | Add browser-backed and in-memory-capable storage seams suitable for UI and tests. |
| Mock Products repository | Missing | Implement async, scoped product access using the storage adapter. |
| HTTP Products repository | Not in scope | Define no production HTTP behavior beyond contract compatibility notes or a non-wired placeholder if required for compile-time structure. |
| Loading, empty, error, and mutation states | Improve | Make states explicit and accessible in the migrated Products flow. |
| Product characterization and regression coverage | Missing | Add tests before or alongside migration to prove behavior and storage compatibility. |

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Products Through a Backend-Ready Boundary (Priority: P1)

A Commerce user opens the existing Products experience and sees the same products for the active compatible operating scope, while the screen obtains data asynchronously through a feature hook and repository contract instead of the monolithic provider product collection.

**Why this priority**: Read behavior is the safest first proof that the new boundary can preserve scope, seeded data, UI behavior, and future backend replaceability.

**Independent Test**: Seed the current compatible browser data, open the Products route, and confirm the same records, ordering, labels, scope, empty state, and refresh persistence are presented without direct page/component storage access.

**Acceptance Scenarios**:

1. **Given** compatible seeded product records for the active legacy operating context, **When** the user opens the Products screen, **Then** the screen retrieves them through the Products repository and shows the same user-visible records.
2. **Given** no products exist in the active scope, **When** repository loading completes, **Then** an accessible empty state is shown and no products from another scope appear.
3. **Given** the repository is still resolving, **When** the screen renders, **Then** a named, theme-readable loading state is shown without presenting stale data as current.
4. **Given** repository retrieval fails, **When** the screen receives the failure, **Then** an accessible error state and safe retry path are shown without clearing compatible stored records.
5. **Given** products exist under another Workspace, legacy Business-labelled context, Business Unit, or Branch scope, **When** the active scope is queried, **Then** foreign records are not projected into the result.

---

### User Story 2 - Create and Update a Product Without UI/Data-Source Coupling (Priority: P1)

A Commerce user creates or edits a product through the existing UI. The feature hook invokes the repository contract using explicit scope and validated input, then updates the screen from the repository result.

**Why this priority**: Mutations prove that the boundary supports future API-shaped workflows rather than only wrapping local reads.

**Independent Test**: Create and edit a product from the existing screen, refresh the application, and confirm the persisted result remains compatible while UI code contains no direct storage write.

**Acceptance Scenarios**:

1. **Given** a valid active scope and valid product input, **When** the user creates a product, **Then** the repository returns the created scoped product and the UI reflects the result without directly generating persistence records.
2. **Given** a product belongs to the active scope, **When** the user updates allowed fields, **Then** the repository returns the updated product and its update timestamp is refreshed.
3. **Given** a duplicate or invalid identifier such as SKU violates the characterized product rules, **When** creation or update is attempted, **Then** a stable domain error is returned and localized validation feedback is shown.
4. **Given** a product ID belongs to a foreign scope, **When** update is attempted from the active scope, **Then** the operation fails without exposing or modifying the foreign product.
5. **Given** a mutation is in progress, **When** the user attempts repeated submission, **Then** accidental duplicate mutations are prevented and the current operation state is understandable.

---

### User Story 3 - Archive a Product Safely (Priority: P2)

A Commerce user archives an eligible product through the current Products workflow without physically deleting historical data or bypassing scope validation.

**Why this priority**: Archive semantics prepare the frontend contract for audit-friendly backend behavior while preserving current prototype compatibility.

**Independent Test**: Archive a product, refresh, and verify it no longer appears in the default active list, remains representable as archived in storage/repository data, and cannot be changed from a foreign scope.

**Acceptance Scenarios**:

1. **Given** an active product in the current scope, **When** the user confirms archive, **Then** the repository returns the product with archived status and the default active list is refreshed.
2. **Given** an archived product, **When** the default product list is requested, **Then** it is excluded unless the query explicitly includes archived records.
3. **Given** a product belongs to another scope, **When** archive is attempted, **Then** a not-found-or-forbidden-compatible domain outcome is returned without revealing foreign record details.

---

### User Story 4 - Preserve Legacy Consumers During Incremental Migration (Priority: P2)

Existing consumers not migrated in this feature continue to work while a compatibility facade exposes the repository-backed Products behavior in the legacy shape where required.

**Why this priority**: Incremental migration is only viable if Feature 051 does not force all Core and Commerce providers to change simultaneously.

**Independent Test**: Run existing Core and Commerce regression journeys after the Products migration and confirm unaffected screens, seeded IDs, browser-storage keys, locale, theme, auth mock behavior, and shell navigation remain compatible.

**Acceptance Scenarios**:

1. **Given** a legacy Products consumer remains temporarily present, **When** it reads through the compatibility facade, **Then** it receives repository-backed values in the characterized legacy shape.
2. **Given** unrelated AppProvider responsibilities remain, **When** Feature 051 is deployed, **Then** auth mock state, workspace state, onboarding, theme, locale, orders, customers, invoices, and unrelated flows remain behaviorally compatible.
3. **Given** the Products repository is created at application startup, **When** React components rerender, **Then** stable service instances are reused rather than recreated per render.

### Edge Cases

- Existing product records may lack a future canonical `businessId`; the adapter MUST preserve and interpret current records without fabricating persisted canonical Business identity.
- Current context identifiers may be missing, stale, malformed, or cross-scope; repository operations MUST return a stable context error rather than silently select another scope.
- Browser storage may contain malformed JSON or incompatible records; the adapter MUST fail safely and preserve recoverability without crashing the application shell.
- Two tabs may hold stale browser data; Feature 051 documents the prototype limitation and MUST NOT claim transaction or concurrency guarantees.
- Query pagination beyond the available result set returns an empty page with correct totals rather than foreign or duplicated records.
- Archived records linked to existing mock orders or invoices remain intact and readable by existing compatible flows.
- React Query or equivalent caches MUST include all material scope identifiers and query filters in cache keys.
- Development mock latency or forced failures used in tests MUST be deterministic when configured.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST define Commerce Products repository contracts independent of React, browser storage, HTTP libraries, and Laravel implementation details.
- **FR-002**: Repository operations MUST be asynchronous and shaped so a future network implementation can replace the mock implementation without changing Products pages.
- **FR-003**: The system MUST define hierarchical scope contracts for Workspace, Business, Business Unit, and Branch, and each Products operation MUST accept the narrowest scope materially required by the characterized product ownership model.
- **FR-004**: Feature 051 MUST NOT persist, migrate, infer, or fabricate a new canonical Business entity or identifier where the current legacy implementation does not provide one.
- **FR-005**: The system MUST provide a Mock Products repository implementing list, get, create, update, and archive behavior.
- **FR-006**: The Mock Products repository MUST depend on an abstract mock storage adapter rather than directly accessing `localStorage` or `sessionStorage`.
- **FR-007**: The storage boundary MUST support a browser-backed implementation for the running prototype and an in-memory implementation or equivalent deterministic isolation for tests.
- **FR-008**: Existing compatible product records and storage keys MUST remain readable after migration.
- **FR-009**: Pages, presentation components, feature hooks, and application services introduced or migrated by this feature MUST NOT directly read or write browser storage.
- **FR-010**: One Commerce Composition Root MUST select and construct repository implementations and expose stable instances to React consumers.
- **FR-011**: Pages and feature hooks MUST NOT read `NEXT_PUBLIC_DATA_SOURCE`, API URLs, or other implementation-selection configuration.
- **FR-012**: If React Query or equivalent tooling is introduced, it MUST invoke repository contracts and include all material scope and query values in query/mutation cache behavior.
- **FR-013**: Simple single-repository CRUD use cases MAY call repositories from feature hooks; Application Services MUST be introduced only where orchestration or domain coordination materially requires them.
- **FR-014**: Product list behavior MUST support query input including pagination and archived-record inclusion at minimum, while preserving currently visible default behavior.
- **FR-015**: Repository results MUST use explicit result types for paginated lists and stable domain error categories for invalid input, unavailable context, not found, scope mismatch, duplicate identifiers, persistence failure, and unknown failure.
- **FR-016**: Product creation and update MUST derive scope-owned identifiers from the trusted active mock context passed to the repository, not from editable form input.
- **FR-017**: Archive operations MUST use logical archive status and MUST NOT physically delete product records in this feature.
- **FR-018**: The migrated Products flow MUST expose accessible loading, empty, error, retry, mutation-pending, success, and validation states in Arabic and English and in RTL/LTR layouts.
- **FR-019**: A compatibility facade MUST be provided only where necessary to preserve unmigrated legacy consumer behavior; new consumers MUST use the new feature boundary.
- **FR-020**: Feature 051 MUST preserve all unrelated current routes, mock authentication, onboarding, theme, locale, seeded identifiers, shell behavior, and unaffected Commerce data behavior.
- **FR-021**: Characterization tests MUST be created before or alongside behavioral migration and MUST prove current visible Products behavior and compatible storage outcomes.
- **FR-022**: Contract tests MUST run the same required repository behavior against the Mock Products repository and be reusable for a future HTTP repository where applicable.
- **FR-023**: No Laravel backend, database, HTTP network request, production authentication, payment integration, production audit store, Marketplace runtime, Business Brain runtime, or AI runtime may be implemented by this feature.
- **FR-024**: Feature documentation MUST identify remaining AppProvider product responsibilities and provide an explicit removal/migration follow-up boundary.

### Key Entities and Contracts

- **WorkspaceScope**: Identifies the active tenant boundary using the existing compatible Workspace identifier.
- **BusinessScope**: Extends WorkspaceScope with a Business-shaped identifier contract where available; in Feature 051 it is non-persistent and MUST NOT resolve the canonical hierarchy conflict.
- **BusinessUnitScope**: Extends BusinessScope and identifies the operational unit required by Commerce Products behavior.
- **BranchScope**: Extends BusinessUnitScope for operations that are branch-specific; Products MUST use it only where current ownership genuinely requires Branch.
- **Product**: Commerce-owned product representation including identity, compatible scope fields, business fields already characterized by the existing UI, status, and timestamps.
- **ProductsQuery**: Product list filters including page, page size, status/archive inclusion, search, and existing characterized filters where applicable.
- **PaginatedResult<T>**: Explicit list result containing data, page, per-page count, and total.
- **ProductsRepository**: Async contract for scoped product list, retrieval, creation, update, and archive.
- **MockCommerceStore**: Storage abstraction used by mock repositories to read and persist compatible Commerce records.
- **CommerceServices**: Stable application-level dependency object containing the active Products repository and future Commerce dependencies.
- **ProductRepositoryError**: Stable categorized error that does not expose foreign-scope data or storage implementation details.

## Constitution Requirements *(mandatory)*

### Authority and Ownership

- **Controlling authority**: `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`; `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`; ADR-003 Workspace/Customer/Multi-Business Boundary; ADR-004 Genesis Organization Hierarchy; ADR-021 Mandatory Workspace Entitlement; ADR-024 Independent Operating System Domain Ownership; ADR-033 Enforced Modular Monolith; ADR-034 Explicit Tenant and Resource Scope; ADR-035 Technology-Independent Compatible Contracts; ADR-036 Contract-First API Architecture; ADR-040 Core Organization Identity and OS Operational Data; Feature 050 approved compatibility boundary.
- **Owning domain**: Commerce OS owns Products and product mutations. Core Platform owns canonical organization identity and authorization context; Feature 051 does not change either ownership.
- **Canonical writes affected**: No production canonical writes. Compatible mock Product writes are routed through the Commerce repository seam.
- **Projection/read-model impact**: Products lists and UI states remain reconstructable mock projections.
- **Deferred Decisions touched**: Canonical Business/Business Unit migration and final successor terminology for legacy OSEnablement remain unresolved and are not selected here.

### Scope and Boundaries

- **Tenant context**: Explicit Workspace and applicable legacy-compatible Business/Business Unit/Branch identifiers are passed to repository operations. Client context remains a mock input and is not described as production authorization.
- **Authorization context**: Feature 051 enforces mock scope validation and foreign-record suppression only. Production actor/resource/action authorization remains a Laravel backend responsibility.
- **Cross-domain interaction**: Products remain Commerce-owned. Core organization context is consumed through a replaceable contract and does not grant Commerce ownership of Core records.
- **OS independence**: Commerce Products behavior remains usable without Marketplace, Business Brain, AI Expert Network, or another OS runtime.
- **Lifecycle impact**: None. Subscription, installation, setup, configuration, activation, ready, and operational access lifecycle redesign is outside scope.

### Intelligence and Product Quality

- **Capability/Knowledge/Rules/AI order**: N/A; no intelligence runtime is introduced.
- **Explainability and human approval**: N/A; no recommendation, AI, or consequential automation is introduced.
- **Arabic/English and direction**: All changed Products states and errors require Arabic and English coverage and correct RTL/LTR behavior.
- **Accessibility**: Loading and mutation states are named; errors are associated with controls; keyboard use, visible focus, semantic dialogs/forms, confirmation behavior, and readable light/dark states are required.

### Security, Operations, and Compatibility

- **Security and privacy**: Foreign-scope records MUST not be returned or revealed through error details. No secrets or production credentials may be placed in public configuration. Browser storage remains explicitly mock-only.
- **Audit and observability**: Mock repositories SHOULD expose deterministic diagnostic hooks suitable for tests, but no production audit system is claimed. Failures MUST be categorized without logging sensitive form values.
- **Contract compatibility**: Existing storage keys and compatible records remain readable. Repository contracts are versionable and implementation-independent. Breaking contract changes require a later specification and migration evidence.
- **Required test evidence**: Characterization tests, repository contract tests, storage adapter tests, scope-isolation tests, Products E2E tests, accessibility checks, Arabic/English checks, and existing Feature 050/Core plus Commerce regression evidence.
- **Documentation synchronization**: Spec, plan, data model, contracts, quickstart, task list, migration notes, and implementation audit references must be updated with the final implementation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of migrated Commerce Products page/component code performs product reads and writes without direct `localStorage`, `sessionStorage`, or monolithic AppProvider product collection access.
- **SC-002**: Existing compatible seeded Products journeys produce equivalent visible records and persistence outcomes before and after migration for all characterized acceptance fixtures.
- **SC-003**: Contract tests pass for list, get, create, update, archive, pagination, duplicate validation, context failure, and scope isolation against the Mock Products repository.
- **SC-004**: No tested operation returns a product belonging to a foreign Workspace or incompatible operating scope.
- **SC-005**: The migrated Products flow demonstrates loading, empty, error/retry, create, update, archive, and mutation-pending states in both Arabic and English with no critical accessibility violations in the affected flow.
- **SC-006**: Existing Feature 050 Core shell tests and affected Commerce regression tests pass without route, theme, locale, auth mock, onboarding, or storage-key regressions.
- **SC-007**: The Commerce Composition Root creates one stable Products repository instance per application runtime and no migrated page selects an implementation directly.
- **SC-008**: A future repository implementation can satisfy the Products contract without importing React or changing Products page public behavior, as demonstrated by compile-time contract conformance and reusable contract tests.

## Assumptions

- The existing frontend remains a mock prototype during Feature 051; browser storage is retained only behind adapters.
- Current Products UI and seeded behavior are the compatibility baseline unless characterization evidence identifies a defect and the defect is separately approved for correction.
- The active legacy-compatible organization context is sufficient to exercise the Products slice without resolving the canonical Business entity migration.
- A query/caching library may be added if compatible with the monorepo, but its selection belongs in the implementation plan rather than this technology-agnostic specification.
- HTTP repository implementation, Laravel endpoint shapes, authentication tokens, and production authorization are future vertical-slice work.
- AppProvider remains for unrelated responsibilities and will be reduced incrementally through later feature specifications.

## Explicitly Out of Scope

- Creating or migrating canonical Business records.
- Renaming all current `BusinessUnit` types or storage keys.
- Rebuilding Workspace, Branch, Team, Billing, Product Hub, Orders, Customers, Invoices, or Inventory flows.
- Replacing mock authentication or adding backend sessions.
- Implementing Laravel, PostgreSQL, Redis, queues, object storage, billing, or production audit.
- Implementing Marketplace, Business Brain, Recommendation Engine, AI Expert Network, or Global Platform runtime.
- Repository-wide cleanup or deletion of AppProvider.
- Material visual redesign of Products or other Commerce screens.
