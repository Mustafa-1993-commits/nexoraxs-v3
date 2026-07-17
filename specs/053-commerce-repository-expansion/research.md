# Phase 0 Research: Commerce Repository Pattern Expansion

**Feature**: 053 Commerce Repository Pattern Expansion  
**Date**: 2026-07-17  
**Status**: Complete — no unresolved planning clarification

## Authority and Research Boundary

This research is controlled by the Commerce OS v1.0 Freeze, Commerce OS Wave 1, Accepted
ADR-004, ADR-034, ADR-035, ADR-036, ADR-038, ADR-040, and Constitution v2.0.0. Proposed ADR-041 is
not Accepted authority. Feature 053 extends Feature 052's frontend-internal compatibility seam; it
does not create canonical organization, domain, SDK, HTTP, or lifecycle contracts.

The following Deferred Decisions remain unresolved and constrain every decision below: DD-01,
DD-02, DD-05, DD-06, DD-14, DD-17, DD-18, DD-19, DD-21, DD-23, DD-24, DD-25, and DD-29.

## Decision 1: Keep every new contract visibly legacy and frontend-internal

**Decision**: Name the shared scope inputs `LegacyCommerceBusinessUnitScope` and
`LegacyCommerceBranchScope`, and name domain records and errors as legacy compatibility shapes.
Keep these contracts under the existing frontend-internal Commerce area in `packages/contracts`.

**Rationale**: Feature 053 has Workspace, legacy `BusinessUnit`, and Branch identifiers but no
canonical Business. Explicit legacy naming prevents temporary browser behavior from appearing to
answer DD-14 or DD-29.

**Alternatives considered**:

- Canonical `BusinessScope` or `businessId`: rejected because the current runtime cannot supply a
  canonical Business and ADR-004 forbids treating Business and Business Unit as synonyms.
- Public SDK/API contracts: rejected because no backend or HTTP adapter is in scope.

## Decision 2: Use different scopes for list and detail behavior where compatibility requires it

**Decision**:

- Customer list, get, and update use `LegacyCommerceBusinessUnitScope`.
- Customer create uses that scope and carries the active `branchId` in its command because the
  stored record currently records a Branch.
- Inventory list uses `LegacyCommerceBranchScope`.
- Order and Invoice list operations accept a legacy business-unit scope with an optional
  Branch filter. Route lists always supply the Branch; bounded relationship services may omit it
  only when the characterized view is business-unit-wide.
- Order and Invoice `getById` use `LegacyCommerceBusinessUnitScope` so existing cross-Branch detail
  links continue to work without exposing another Workspace or legacy Business Unit.

**Rationale**: These are the narrowest available scopes that reproduce current behavior. A single
Branch-only contract would break business-unit-wide Customer and detail behavior; a
business-unit-only Inventory query would expose the wrong Branch.

**Alternatives considered**:

- Make every domain Branch-scoped: rejected because it changes current Customer visibility and
  cross-Branch detail navigation.
- Make every domain business-unit-scoped: rejected because it permits Inventory, Order-list, and
  Invoice-list cache collisions across Branches.

## Decision 3: Preserve storage and record relationships without canonicalizing them

**Decision**: Continue using the established keys:

- `nexoraxs.db.commerceCustomers`
- `nexoraxs.db.branchInventory`
- `nexoraxs.db.commerceOrders`
- `nexoraxs.db.commerceInvoices`

Read adapters do not rewrite storage. Customer writes preserve unknown serializable fields,
immutable IDs, creation timestamps, scope fields, insertion order, and current ID/timestamp
generation conventions. Orders and Invoices retain Customer/Product/Order references byte-for-byte.

**Rationale**: Browser refresh, seeded fixture, and linked-view regressions depend on the existing
serialized shapes. Read-time normalization or relationship repair would be a data migration and
could invent domain semantics.

**Alternatives considered**:

- Normalize records on read: rejected because it mutates compatibility data without consent.
- Repair dangling references: rejected because it would write across owner boundaries and conceal
  existing fallback behavior.

## Decision 4: Extend storage additively through narrow domain ports

**Decision**: Add narrow `MockCustomersStore`, `MockInventoryStore`, `MockOrdersStore`, and
`MockInvoicesStore` ports. Extend the existing browser and memory Commerce stores additively so
each repository receives only the port it needs. Preserve the existing Product store contract and
the current `MemoryCommerceStore` Product construction behavior.

**Rationale**: Repositories remain browser-independent, tests remain isolated, and a single browser
adapter owns key access without forcing a generic database abstraction or breaking Feature 052.

**Alternatives considered**:

- Direct `localStorage` inside repositories: rejected because it couples contracts to the browser
  and violates the Feature 052 boundary.
- One untyped generic key-value store exposed to all repositories: rejected because it weakens
  ownership and makes cross-domain access easy.
- Separate browser-store instances per render: rejected because service identity and coordination
  must remain stable.

## Decision 5: Keep repositories explicit and omit new pagination

**Decision**: Define explicit repository interfaces:

- Customers: `list`, `getById`, `create`, `update`
- Inventory: `list`
- Orders: `list`, `getById`
- Invoices: `list`, `getById`

No generic CRUD base and no new pagination contract are introduced. Existing Product pagination is
unchanged.

**Rationale**: The current included views do not paginate. Explicit read/write surfaces make the
Customer-only write boundary reviewable and avoid answering DD-29.

**Alternatives considered**:

- Generic CRUD repository: rejected because it implies unsupported delete/write operations.
- Speculative API pagination: rejected because it is not needed by current UI and could be
  mistaken for a future transport contract.

## Decision 6: Deterministic mock behavior has no automatic retry

**Decision**: Reuse the Feature 052 pattern for configured non-negative latency, deterministic
per-operation failure rules, injected clock/ID sources, and sanitized diagnostics. Disable React
Query automatic retry, retry-on-mount, reconnect refetch, and focus refetch for included queries;
mutations also use `retry: false`. A failed read retries only through its visible retry control. A
failed Customer mutation repeats only after an explicit user submission.

**Rationale**: This implements the clarified requirement and makes failure tests reproducible.
Retained-write cache invalidation after a successful storage commit is a refresh notification, not
a retry.

**Alternatives considered**:

- Random failures: rejected because test behavior would be flaky.
- Default React Query retry/refetch behavior: rejected because it can issue an unrequested second
  operation.

## Decision 7: Customers migrate through one repository-backed facade

**Decision**: Customer pages and POS use repository-backed hooks. A Customer compatibility facade
publishes repository results to any remaining legacy consumers. `AppProvider` Customer write
callbacks are removed only after a source scan and regression tests prove zero active callers.
Customer mutation publication happens only after the atomic store write succeeds.

**Rationale**: Customers are the sole complete read/write slice. The facade preserves compatibility
without delegating writes back to `AppProvider` or producing two persistence effects.

**Alternatives considered**:

- Dual-write repository and provider: rejected because consistency and exactly-once behavior
  cannot be guaranteed.
- Delete all Customer provider state first: rejected because it would break unmigrated consumers.

## Decision 8: Read-only domains observe retained writes through exact-scope cache coordination

**Decision**: Inventory, Order, and Invoice writes remain in their existing provider paths. After a
successful storage commit, those paths notify an app-level read coordinator that invalidates only
the exact affected Workspace/legacy-Business-Unit/Branch query keys. The coordinator is created
once with the Commerce runtime and performs no persistence.

The mapping is:

| Retained write | Read boundary refreshed after success |
|---|---|
| Stock adjustment or transfer | Inventory for affected Branches |
| Order creation | Orders for the Branch; Inventory for the affected Branch |
| Invoice creation | Invoices for the Branch |
| Return processing | Orders and Invoices; Inventory only when the retained write restocks |

**Rationale**: Browser `storage` events do not notify the same tab. Exact-scope invalidation makes
the new reads observe the existing writer without copying operational logic into a repository.

**Alternatives considered**:

- Move writes into the read repositories: rejected as outside scope and an ownership violation.
- Invalidate every Commerce query: rejected because it risks cross-scope cache activity and masks
  incomplete keys.

## Decision 9: Application services are reserved for cross-repository read composition

**Decision**: Simple hooks call one repository. Add bounded, read-only services only for current
compositions:

- Customer history: Customers plus Orders
- Inventory presentation: Products plus Branch Inventory
- Order view: Orders plus Invoices and Customers
- Invoice/document view: Invoices plus Orders and Customers

Returns and other excluded data may remain temporary provider inputs to an existing component;
they do not enter the new repository contracts. Services preserve stored commercial snapshots and
existing UI fallbacks rather than recalculate canonical facts.

**Rationale**: This follows the Feature 052 rule that application services are for real
orchestration, not routine CRUD.

**Alternatives considered**:

- Service for every repository call: rejected as unnecessary indirection.
- Put joins in pages: rejected because scope checks would be duplicated and easier to bypass.

## Decision 10: Preserve the characterized Inventory projection as a reconstructable read model

**Decision**: The Inventory read service combines Branch-scoped inventory with the existing
Product records and reproduces the current effective-stock fallback, ordering, threshold, and
low/out/in-stock projections. The retained stock-write helper remains in place until its own
governed migration.

**Rationale**: Moving only the read composition is safe. Refactoring stock mutation rules at the
same time would broaden the feature and risk changing operational facts.

**Alternatives considered**:

- Promote fallback stock to a canonical Inventory rule: rejected because DD-17/DD-18 remain open.
- Migrate stock writes with the projection: rejected by the feature boundary.

## Decision 11: Re-check scope at every relationship edge

**Decision**: A composed view may join a related record only after independently validating its
Workspace and legacy Business Unit, and Branch where the related result is Branch-specific. A
missing or mismatched reference uses the characterized non-disclosing fallback. Route-specific
Customer lookup differences in existing Invoice detail and document presentation are preserved
until a later governed cleanup.

**Rationale**: Matching an ID is not proof of authorization or scope. Overlapping IDs are required
test fixtures, not exceptional cases.

**Alternatives considered**:

- Join by ID alone: rejected because it can disclose another tenant's record.
- Unify every Invoice Customer fallback now: rejected because it may change visible compatibility
  behavior and obscure regression evidence.

## Decision 12: Extend the single composition root; HTTP remains unavailable

**Decision**: Extend `createCommerceServices` and `CommerceServicesProvider` additively. Construct
the browser store, repositories, facades, services, diagnostics, and cache coordinator once per
provider runtime. Only `commerce-runtime-config.ts` reads `NEXT_PUBLIC_*` variables. Selecting
`dataSource: "http"` fails safely before any request because Feature 053 adds no HTTP adapter.

**Rationale**: A stable composition root keeps implementation selection out of pages and prevents
repository recreation during render.

**Alternatives considered**:

- Domain-specific providers that select their own repositories: rejected because it creates
  parallel composition centers.
- Placeholder HTTP calls: rejected because backend integration and transport DTOs are prohibited.

## Decision 13: Add async states without redesigning the Commerce UI

**Decision**: Reuse current layouts and controls. Add only the smallest localized loading, empty,
error/manual-retry, not-found, pending, validation, and accessible announcement elements missing
from the current routes. Forms retain input after failure, prevent duplicate submission while
pending, associate errors with fields, and remain keyboard/focus safe in English/LTR and
Arabic/RTL.

**Rationale**: Repository reads make asynchronous state explicit, but the feature requires visible
compatibility rather than a redesign.

**Alternatives considered**:

- Global visual refresh: rejected as outside scope.
- Silent loading/error states: rejected because recovery and accessibility are requirements.

## Decision 14: Characterize first and migrate in reversible checkpoints

**Decision**: Capture deterministic browser fixtures and route behavior before structural changes,
then deliver contracts/stores, Customers, Inventory reads, Order reads, and Invoice reads as
separate verified checkpoints. Preserve Feature 052, Commerce 044, and applicable Core 050 gates.
Document package-boundary exceptions and the temporary compatibility mapping with the code.

**Rationale**: This minimizes the blast radius and provides evidence before deleting any legacy
callback or reader.

**Alternatives considered**:

- One repository-wide cutover: rejected because rollback and behavioral attribution would be
  difficult.
- Unit tests only: rejected because routes, browser persistence, language, accessibility, and
  relationship behavior require integration and browser evidence.

## Resolved Unknowns

All technical-context unknowns are resolved for planning:

- Existing TypeScript/React/Next.js/TanStack Query/Vitest/Playwright tooling is sufficient; no new
  dependency is required.
- Browser storage remains the temporary persistence implementation behind adapters.
- No new pagination is required.
- No automatic retry is permitted.
- Production authorization, append-only Audit, HTTP transport, API idempotency, and backend
  observability are explicitly out of scope and remain cutover prerequisites, not local mock
  substitutes.
