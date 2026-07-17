# Phase 0 Research: Architecture Hardening

**Feature**: 054 Architecture Hardening  
**Date**: 2026-07-17  
**Scope**: Frontend architecture and compatibility only; no backend or behavior change

## Research Method

Research combined:

- the Core Platform and Commerce OS v1.0 Freezes;
- Accepted ADR-004, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035, ADR-036,
  ADR-038, and ADR-040;
- the approved Core Platform architecture/technology baseline and Commerce OS Wave 1;
- Constitution v2.0.0;
- Feature 052 and 053 specifications, plans, contracts, tests, and implementations; and
- a source-wide inspection of active frontend production code under `apps/**` and `packages/**`.

No research decision below promotes a browser compatibility shape into a canonical model, public
API, future DTO, or backend authorization rule.

## Decision 1: Preserve frozen ownership while extracting legacy behavior

**Decision**: Extract provider-owned behavior into focused, frontend-internal application services
and owner-specific ports. Do not create one general Commerce operations service that becomes a
new canonical owner.

The compatibility boundaries follow the frozen logical owners:

| Existing behavior | Owning boundary preserved by the design |
|---|---|
| Commerce setup/default/preset behavior | Setup and Configuration |
| Product image association | Product Catalog orchestration |
| Stock adjustment and movement | Inventory |
| Transfer intent/record | Transfers; Inventory applies Stock effects |
| Return intent/record | Returns and Adjustments; affected owners apply their effects |
| Order creation and retained commercial snapshots | Orders |
| Stock deduction requested by Order | Inventory |
| Invoice creation/numbering snapshot | Invoices and Documents |
| Workspace storage usage/quota | Core Storage Coordination |

**Rationale**: The Commerce Freeze and Wave 1 prohibit parallel truth and require Transfers,
Returns, POS, Setup, and Orders to request effects from the applicable owner. Extracting code from a
React provider must not collapse those logical boundaries into a new mega-owner.

**Alternatives considered**:

- **One `LegacyCommerceOperationsService` owning every write** — rejected because it would hide
  distinct frozen owners and imply an aggregate/transaction decision still deferred by DD-01.
- **Leave rules in `AppProvider` and rename callbacks** — rejected because ownership and dependency
  direction would remain unenforceable.
- **Redesign the operations around final canonical aggregates** — rejected because lifecycle,
  aggregate, transaction, and backend contract decisions remain deferred.

## Decision 2: Narrow the media/quota ownership conflict

**Decision**: Treat the clarified requirement to extract Product media/quota behavior as an
extraction requirement, not an ownership transfer.

- Commerce Product-media orchestration owns association of the resulting media reference with the
  Product compatibility record.
- A browser media adapter performs the current canvas/JPEG transformation.
- A temporary Core Storage Coordination compatibility port owns the quota decision, usage update,
  and secure-reference compatibility result.
- `AppProvider` delegates and publishes the returned state; it owns neither media policy nor quota.

**Rationale**: Core Platform Architecture §2.4 assigns shared file/object policy, secure
references, quotas, and access coordination to Storage Coordination. The approved technology
baseline repeats that Storage Coordination governs references, metadata, quotas, and secure access.
Feature 052 also explicitly retained media/storage coordination outside Product Catalog. The
clarified Feature 054 goal can be met without changing visible behavior by delegating quota/usage to
that owner.

**Alternatives considered**:

- **Move quota and `WorkspaceStorageUsage` ownership into Commerce** — rejected as a frozen
  ownership violation requiring Governance action.
- **Keep quota checks inside Commerce `AppProvider`** — rejected because the provider would retain
  business policy and remain a second Core storage writer.
- **Define the final object-storage or upload contract now** — rejected because product, transport,
  encryption, versioning, quota lifecycle, residency, and recovery remain deferred.

## Decision 3: Replace cache-framework coupling with an application port

**Decision**: Replace `LegacyCommerceReadCoordinator` with an application-owned
`CommerceChangeNotificationPort`. Focused application services emit resource-specific,
fully-scoped compatibility notifications only after a successful browser commit. An outer React
Query adapter maps them to the exact current query-key factories and invalidations.

The port contains no `QueryClient`, React Query type, hook import, query-key implementation, React
type, or browser API. Notifications are cache-refresh intents, not Domain Events or Integration
Events.

**Rationale**: The current coordinator is located in an application directory but imports
`QueryClient` and four hook-owned key modules. Moving only that class would preserve the same reverse
dependency. Port-and-adapter inversion keeps application behavior framework-neutral while
preserving exact-scope cache isolation.

The adapter must retain the current key coverage and add the aggregate Customer-history-list key
used by Customer metrics when an Order changes; otherwise a same-tab POS sale may leave the current
Customer list projection stale.

**Alternatives considered**:

- **Inject `QueryClient` into every service** — rejected because it moves the violation.
- **Invalidate broad resource prefixes** — rejected because it risks cross-scope refetch/collision.
- **Publish canonical events** — rejected because Event naming, payloads, delivery, and replay are
  deferred and cache notification is not a business fact.

## Decision 4: Expose Product and Customer compatibility through ports

**Decision**: Add visibly legacy Product and Customer compatibility port interfaces. Hooks,
providers, and `CommerceServices` depend on those interfaces; the current concrete SDK facade
classes satisfy them structurally and remain private composition details.

The Product port preserves active unpaged-list publication, create/update/remove publication,
subscription, cloning, and demo seed behavior. The Customer port preserves list/create/update,
full scoped snapshot publication, and subscription behavior.

**Rationale**: The current service type publishes concrete SDK classes, so inward application code
knows implementation details. Narrow ports preserve exact behavior and allow composition to choose a
different implementation without changing hooks or providers.

**Alternatives considered**:

- **Keep concrete facade types because they are frontend-only** — rejected; frontend-only does not
  reverse dependency direction.
- **Remove compatibility publication immediately** — rejected because active provider consumers
  still require it.
- **Make `AppProvider` the port implementation** — rejected because the provider must not become
  the architecture center.

## Decision 5: Use a two-stage, single-locus composition design

**Decision**: Keep implementation selection inside the SDK Commerce composition factory, then
assemble application services and outer React/cache adapters once in the app-level Commerce runtime
root. `CommerceServicesProvider` owns the resulting stable object for the application lifetime.

The SDK factory returns only contract-typed repositories and application-facing ports. Concrete
stores, mock repositories, serializers, behavior simulators, and facades never appear in the
runtime service type. The app root adds owner-specific application services and the React Query
change adapter without importing concrete SDK classes.

Core consumes only a narrow read-only Commerce projection/handoff view created by the same
Commerce-owned composition module; Core does not select or construct a repository/store.

**Rationale**: Repository/store selection belongs at one inward-facing factory, while React Query
cannot be constructed in an application service. The two stages separate infrastructure selection
from outer framework adaptation without recreating services during render.

**Alternatives considered**:

- **Construct repositories in hooks/providers** — rejected because consumers would select
  implementations.
- **Move React Query into the SDK factory** — rejected because SDK/application runtime types would
  depend on the outer cache framework.
- **Create services with `useMemo` in each hook** — rejected because identity and subscriptions
  would be unstable.

## Decision 6: Remove Core write authority through projections and handoffs

**Decision**: Replace Core `AppProvider` Commerce arrays and write callbacks with:

1. a read-only, scoped `CommerceProjectionPort` exposing only the Product/Order/setup fields needed
   by current shell, Product Hub, and billing presentation; and
2. an explicit Commerce handoff/bootstrap port for the current demo/setup journey.

Core may initiate the handoff with actor, OS, Workspace, legacy Business Unit, Branch,
subscription, action, and resource context. Commerce validates/accepts it and owns any Commerce
compatibility effect. Core never writes Commerce keys or constructs Commerce records as fallback.

Because the Core and Commerce apps run on different browser origins, the handoff cannot assume
shared `localStorage`. Commerce may persist a read-only handoff/context projection behind its own
adapter to preserve refresh behavior, but must not synthesize or become a source of truth for Core
User/Workspace/Business Unit/Branch/Subscription identities.

**Rationale**: Current Core production consumers need only narrow projections, while its provider
contains unused Product/Customer CRUD and Order/Invoice/setup writers. Public projections and
handoffs preserve behavior without app-to-app imports or shared write authority.

**Alternatives considered**:

- **Let Core keep demo writes because data is local-only** — rejected; local deployment does not
  transfer ownership.
- **Import Commerce application modules into Core** — rejected by ADR-025 and the source-boundary
  requirements.
- **Introduce an HTTP API** — rejected as explicitly out of scope.

## Decision 7: Make AppProvider a publication/delegation facade

**Decision**: Extract behavior incrementally into focused services in this order: setup/media,
stock adjustment, transfer, Order, Invoice, Return. Each service receives the narrowest current
scope/context and owner ports, preserves existing validation and commit ordering, and returns the
committed compatibility snapshot needed for provider publication.

`AppProvider` may:

- gather current UI/session context;
- invoke a service;
- publish the already-decided result into compatibility React state;
- show the existing localized result/toast; and
- expose temporary callback signatures to legacy consumers.

It may not calculate, validate, number, construct, persist, or choose side effects.

**Rationale**: Returning committed snapshots removes business rules without making application
services depend on React. Incremental replacement prevents dual writes and supports characterization
after every responsibility move.

**Alternatives considered**:

- **Delete `AppProvider`** — rejected; active compatibility consumers remain.
- **Move all code unchanged into one helper called by the provider** — rejected because it would not
  establish owner ports or enforce dependency direction.
- **Make every operation atomic** — rejected because current sequential write/partial-failure
  behavior must first be characterized and transaction semantics remain deferred.

## Decision 8: Move policy out of `packages/shared` once, by owner

**Decision**: Relocate current policy without rewriting it:

| Current shared policy | Target owner-aligned compatibility module |
|---|---|
| Effective Stock fallback, Stock Movement construction | Commerce Inventory |
| Transfer construction/validation helpers | Commerce Transfers |
| Return construction and refund proration | Commerce Returns and Adjustments |
| Tax/discount/document calculations | Commerce Taxes/Pricing/Documents compatibility policy used by the current flow |
| Order/revenue/returns operational projections | Commerce Reporting/read-model modules |
| Commerce setup defaults, preset suggestion, billing mapping | Commerce Setup and Configuration |
| Canvas thumbnail transformation | Browser media infrastructure adapter |
| Quota/usage calculation | Core Storage Coordination compatibility service |

Generic IDs, clocks, date/byte/currency formatting, generic validation, browser storage primitives,
and language utilities may remain shared. Every moved function has one active production definition;
old exports are removed only after all consumers migrate.

**Rationale**: Shared packages must not become ownerless business-policy modules. Moving by owner
also prevents Core from deep-importing Commerce calculations.

**Alternatives considered**:

- **Copy functions into each consumer** — rejected because duplicate policy creates parallel truth.
- **Move policy into `packages/sdk`** — rejected because SDK is infrastructure/transport and must
  not own Commerce rules.
- **Generalize every policy into a shared utility** — rejected because renaming owner-specific
  behavior does not make it neutral.

## Decision 9: Route browser storage through an exact allowlist

**Decision**: Replace all direct `localStorage`/`sessionStorage` access in components, providers,
hooks, application services, contracts, and repositories with approved infrastructure helpers or
adapters. The final architecture gate uses an exact-file allowlist, not broad directories.

Expected approved categories are:

- the generic browser storage primitive in `packages/shared`;
- the private Commerce browser store/operational adapters;
- narrowly classified Core session/theme/locale infrastructure adapters; and
- any handoff/projection adapter explicitly documented by the internal contracts.

The direct Core/Commerce `AppProvider` calls and Core `ThemeToggle` call are violations. Existing
keys, storage selection, corrupt-read behavior, quota exceptions, initialization order, and refresh
outcomes must remain unchanged.

**Rationale**: A directory allowlist could hide future violations. Exact files make the exception
reviewable and enforceable.

**Alternatives considered**:

- **Allow browser globals in all `lib/**` files** — rejected as too broad.
- **Replace all storage with the Product repository store** — rejected because current generic
  helpers and SDK stores intentionally have different corruption/error behavior.
- **Change storage keys or clear legacy data** — rejected by compatibility requirements.

## Decision 10: Use a lightweight TypeScript-AST architecture gate

**Decision**: Add one repository-owned scanner using the TypeScript compiler API plus targeted
ESLint restrictions. No architecture-specific third-party dependency is needed; declare
TypeScript 5.9.3 at the workspace root so the scanner does not depend on an app-local install.

The scanner:

- scans `.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.jsx`, `.mjs`, and `.cjs` under `apps/**` and
  `packages/**`;
- applies the clarified exclusions for tests, fixtures, stories, generated files, dependencies,
  archives, and build output;
- parses static imports/exports, dynamic imports, `require`, and browser-global access;
- resolves relative paths, app aliases, package roots/subpaths, package exports, and re-export
  barrels;
- emits stable rule IDs, file, line, import, and reason in deterministic order; and
- exits nonzero for any production violation, with no permanent known-debt suppression list.

Invalid fixtures live outside production roots and prove every rule fails. Valid fixtures prove
the allowed inward direction. The real-source scan and fixture tests run in the standard zero-warning
lint/quality workflow.

**Rationale**: Existing Feature 052/053 tests are selected-directory regular-expression checks.
They miss aliases, barrels, packages, dynamic imports, line diagnostics, and many current sources.
A small AST scanner is more comprehensive than adding a heavy dependency graph tool.

**Alternatives considered**:

- **ESLint only** — rejected because package exports, cross-app resolution, barrels, and semantic
  storage/write checks need whole-repository context.
- **Dependency Cruiser/Madge/eslint-plugin-boundaries** — rejected as unnecessary new toolchain
  weight for the required rules.
- **Keep selected-directory source tests** — rejected because the clarified scan surface is all
  active frontend production code.

## Decision 11: Harden the SDK export map

**Decision**: Reduce the SDK package to:

- the general runtime entry point containing only the Commerce composition factory and stable
  contract-typed runtime/configuration interfaces; and
- an explicit `@nexoraxs/sdk/testing` entry point for memory stores, mock repositories, deterministic
  behavior controls, and test builders.

Remove general Product/Customer/Inventory/Order/Invoice implementation subpaths. Production source
is prohibited from importing the testing entry. Existing tests migrate to it. Test aliases must use
exact matches so the testing subpath is resolved correctly.

**Rationale**: Package exports are an architectural enforcement boundary, not documentation. The
current root and all five subpaths expose every concrete implementation.

**Alternatives considered**:

- **Retain deep subpaths but document them as private** — rejected because they remain importable.
- **Export an unrestricted `/internal` path** — rejected unless a concrete composition-only
  consumer proves it necessary.
- **Move test infrastructure to production app code** — rejected because it would widen coupling.

## Decision 12: Classify relationship failures by typed code

**Decision**: Order and Invoice relationship services convert only a typed
`LegacyCommerceRepositoryError` with `code === "not_found"` into `null`. Every other error is
re-thrown unchanged to React Query and the existing explicit manual-retry state.

Repositories must distinguish a genuinely absent ID from a same-ID record in another scope. The
latter produces a non-disclosing `scope_mismatch`, not `not_found`. No foreign record or identifier
is returned in the error.

**Rationale**: Current `catch { return null; }` masks scope, deterministic, storage, configuration,
and unknown failures. Without repository distinction, a foreign-scope ID is also indistinguishable
from ordinary absence.

**Alternatives considered**:

- **Convert all errors to missing** — rejected because retry and security failures disappear.
- **Expose the foreign record to classify it** — rejected because it leaks cross-scope data.
- **Create a future server error taxonomy** — rejected; these codes remain frontend-internal.

## Decision 13: Replace browser `File` with a media source value

**Decision**: Add an application-owned `LegacyMediaSource` containing only the current file name,
media type, size, and bytes. The UI adapter maps a selected browser `File` to this value. A browser
canvas adapter reconstructs the current blob/image/canvas flow and produces the same JPEG data URL,
dimensions, maximum size, and failure result.

The Product editor service preserves:

- no-image/cancel behavior;
- create Product → save media → update Product ordering;
- compensating Product removal on create-media/update failure, including swallowed removal failure;
- edit media-before-Product-update ordering; and
- current thumbnail reference and visible error behavior.

**Rationale**: `File` is a browser adapter type. Bytes plus metadata are sufficient for the current
local transformation and do not define an upload or object-storage contract.

**Alternatives considered**:

- **Keep `File` in the application port** — rejected because application code remains browser-bound.
- **Use a base64 string as an upload DTO** — rejected because it would look like a transport
  contract and increase conversion assumptions.
- **Implement multipart/object storage** — rejected as explicitly out of scope.

## Decision 14: Characterize before each bounded move

**Decision**: Add characterization tests before structural edits for cache invalidation, provider
publication, every retained write, setup/media/quota, Core projections/handoff, storage failure,
relationship error classification, SDK exports, and Product File conversion.

Especially preserve:

- fresh-storage Order and Invoice numbering;
- same-tick `createOrder` followed by `createInvoice`;
- ID/clock call sequence and serialized bytes;
- sequential write ordering and current partial-failure behavior;
- duplicate Transfer/Return item quirks;
- Product/Inventory scope matching quirks until the specific safety requirement changes them;
- exact error strings/toasts and fire-and-forget post-commit notification timing; and
- Core/Commerce separate-origin handoff and refresh behavior.

**Rationale**: Moving code without executable baselines would accidentally redesign behavior under
the label of architecture hardening.

**Alternatives considered**:

- **Refactor first and compare manually** — rejected because subtle ordering/serialization changes
  are not reliably visible.
- **Improve validation while extracting** — rejected as a new behavior change.
- **Make operations transactional** — rejected because current behavior and DD-01 must be
  preserved.

## Decision 15: Quality workflow and dependency choice

**Decision**: Add root `typescript@5.9.3` only; introduce no architecture-specific dependency.
Wire deterministic architecture validation, zero-warning ESLint, strict type checks for apps and
packages, Vitest, production builds, Commerce Playwright suites, Core Feature 050 Playwright suites,
accessibility/localization checks, and repeated deterministic suites into the validation sequence.

**Rationale**: TypeScript is already pinned in every app and is the parser needed by the scanner.
The remaining required tools already exist in the workspace.

**Alternatives considered**:

- **Rely on an app-local TypeScript installation** — rejected because root architecture tooling
  would have an implicit dependency.
- **Add multiple lint/graph plugins** — rejected because they do not materially improve this
  bounded design.

## Deferred Decisions Preserved

Feature 054 does not resolve Commerce DD-01, DD-02, DD-05, DD-06, DD-09, DD-14 through DD-25,
DD-27, DD-29, DD-30, DD-34, or DD-36 through DD-40. It also does not resolve Core decisions for:

- the canonical organization write protocol during OS setup;
- the successor to legacy `OSEnablement`;
- physical aggregate/transaction/schema/concurrency boundaries;
- object-storage product, transport, quota lifecycle, encryption, residency, or recovery;
- canonical URL/handoff format;
- Event delivery/naming;
- observability technology or SLOs; or
- API, DTO, pagination, idempotency, and backend authorization details.

All new shapes remain visibly legacy, frontend-internal compatibility seams.

## Phase 0 Result

All implementation unknowns needed for Phase 1 are resolved. The bounded media/quota ownership
conflict is narrowed by delegating Workspace storage policy to Core Storage Coordination. No
remaining research item requires an architectural exception or Governance action.
