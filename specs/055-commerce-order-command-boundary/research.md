# Phase 0 Research: Commerce Order Command Boundary

**Feature**: 055 Commerce Order Command Boundary  
**Date**: 2026-07-17  
**Status**: Complete — no unresolved planning clarification

## Research Method

Research combined:

- the Commerce OS v1.0 Freeze, Readiness Validation, and Wave 1 ownership baseline;
- Accepted ADR-004, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035, ADR-036, ADR-038,
  and ADR-040;
- Feature 052-054 specifications, plans, contracts, tests, and implementation evidence;
- every active production Order writer, POS consumer, Return handoff, persistence adapter,
  composition root, cache adapter, and architecture rule; and
- root/Commerce manifests, quality commands, deterministic scripts, and Playwright suites.

The research distinguishes three categories throughout:

1. behavior that exists and must migrate;
2. unsafe cross-scope behavior explicitly narrowed by the clarified specification; and
3. listed operations that do not exist and must remain absent.

## Decision 1: Freeze the actual command inventory before structural work

**Decision**: Treat the following as the complete Feature 055 inventory unless characterization
finds another active production writer:

| Category | Current supported behavior |
|---|---|
| POS transient draft | add/coalesce Product, increment/decrement quantity, minimum quantity 1, remove/clear line, select/remove Customer, select payment label, normalize/apply/remove discount, recalculate commercial snapshot |
| Persisted Order | create one Order from caller-supplied snapshots |
| Order-triggered Inventory | pre-write sufficiency validation and post-Order stock deduction plus one Movement per tracked line |
| Indirect persisted Order | Return updates `returnStatus`, increments `returnedTotal`, appends `returnIds` |
| Bootstrap | demo initialization replaces the compatible Order collection, currently with an empty seed |
| Explicitly absent | general update, remove/delete, cancel, general status transition, persisted discount/item/quantity/price mutation, persisted recalculate, reservation, release, Order-owned restoration, optimistic locking |

**Rationale**: Production search shows one normal writer in
`apps/commerce/features/orders/application/LegacyOrderCreationService.ts`, one indirect writer in
`apps/commerce/features/returns/application/LegacyReturnCreationService.ts`, and one demo writer in
`apps/commerce/features/setup/application/LegacyCommerceDemoBootstrapService.ts`. The only active
sale consumer is `apps/commerce/app/(commerce)/pos/page.tsx`. The Order type has no general status
field. Creating interfaces for absent operations would introduce lifecycle or amendment semantics
governed by DD-17, DD-19, and DD-20.

**Alternatives considered**:

- **Generate all requested command service names as placeholders** — rejected because unused
  contracts would imply unsupported behavior and encourage implementation of deferred semantics.
- **Migrate only final Order creation** — rejected because POS draft rules, Return's Order write,
  bootstrap, and Inventory effects would remain uncharacterized or bypass the owner boundary.

## Decision 2: Keep POS draft and persisted Order ownership separate

**Decision**: Move transient cart and sale-draft behavior into a POS-owned application service and
hook. The Orders-owned boundary begins only when POS requests creation or another proven persisted
Order change.

**Rationale**: The frozen baseline distinguishes POS interaction state and POS Transaction from the
Commerce Order. `apps/commerce/app/(commerce)/pos/page.tsx` currently owns the transient state; that
logic must leave presentation without being transferred to Orders.

**Alternatives considered**:

- **Treat the active cart as an Order draft owned by Orders** — rejected because it collapses the
  frozen POS/Order distinction.
- **Leave draft rules in the page** — rejected because presentation would retain quantity,
  discount, stock-warning, and calculation policy.

## Decision 3: Preserve a synchronous local command version

**Decision**: The Feature 055 Order command repository and application ports are synchronous for
the current local compatibility version. POS hooks use ordinary React adapter state and synchronous
application calls; they do not require React Query mutations. No parallel asynchronous command API
is introduced.

**Rationale**: Current POS immediately consumes the returned Order to create the Invoice, and the
clarification requires active callback timing to remain synchronous. The current command path has
no artificial latency or automatic retry. React Query remains appropriate for cache/query
orchestration, not transient draft truth or local synchronous business commands.

**Alternatives considered**:

- **Convert the whole command stack to promises** — rejected because it changes active callback
  timing and failure sequencing.
- **Maintain sync and async command APIs** — rejected because it creates parallel contracts and
  ambiguous write paths.
- **Reuse the asynchronous read repository** — rejected because `LegacyOrdersRepository` is a
  Feature 053 read-only contract with deterministic latency semantics and must stay compatible.

Future HTTP timing and versioning remain DD-29 and DD-39 concerns; synchronous replaceability in
this feature means local/browser and memory implementations only.

## Decision 4: Add a separate scoped Order command repository

**Decision**: Keep the Feature 053 `LegacyOrdersRepository` read-only. Add a synchronous,
frontend-internal `LegacyOrderCommandRepository` for only the proven persistence capabilities:

- scoped records/count needed for compatibility numbering;
- create/append a scoped Order;
- scoped lookup needed by the Return handoff and same-tick local consumers;
- apply the explicit Return compatibility patch; and
- an explicitly named bootstrap seam if the characterized empty-seed write must remain.

The repository accepts Workspace plus legacy Business Unit and applicable Branch, returns only
scoped records, preserves foreign rows in storage, and contains no pricing, Inventory, cache, UI,
numbering, or lifecycle rules.

**Rationale**: The current service depends on the broad `LegacyCommerceOperationsStore`, exposing
Product, Inventory, Orders, Invoices, Returns, setup, media, and Core storage data to Orders. A
narrow repository makes persistence replaceable and prevents cross-owner access.

**Alternatives considered**:

- **Add create/update to the read repository** — rejected because it breaks Feature 053's read
  contract and would imply unsupported generic update semantics.
- **Retain `LegacyOrderWritePort.readOrders/replaceOrders`** — rejected because full collection
  replacement exposes foreign scopes and permits arbitrary lifecycle mutation.
- **Let the application service call the storage adapter** — rejected because it reverses the
  required dependency direction.

## Decision 5: Use `BrowserStorageCommerceStore` as the single Order command storage adapter

**Decision**: Extend the private SDK `BrowserStorageCommerceStore` and `MemoryCommerceStore` with
distinctly named synchronous command-storage methods. A private local Order command repository
depends on that storage port. The existing async Order read methods continue unchanged over the
same `nexoraxs.db.commerceOrders` key.

All active Order creates, Return patches, and required bootstrap writes migrate to that repository.
No active production Order writer remains on `LegacyCommerceOperationsStore`.

**Rationale**: The user explicitly requires `BrowserStorageCommerceStore` to remain the adapter.
Using it for both async reads and separately named sync command operations keeps one physical key
and one active write boundary without forcing the read contract to become synchronous.

**Alternatives considered**:

- **Build commands on `BrowserLegacyCommerceOperationsStore`** — rejected because it would retain
  the broad multi-owner port and conflict with the named storage-adapter requirement.
- **Create a second Order browser store** — rejected because two adapters with independent write
  APIs increase parallel-writer and serialization drift risk.
- **Change existing async read methods to sync** — rejected because it would break Features 052-054.

The adapter preserves exact key, JSON array shape, cloning, missing-key empty behavior, corruption
error, unknown fields, array ordering, and browser failure propagation.

## Decision 6: Split Inventory effects into prepare and commit owner operations

**Decision**: Introduce an Inventory-owned `LegacyOrderInventoryEffectPort` with two stages:

1. `prepareSaleDeduction` reads only scoped Product/Inventory snapshots, accumulates duplicate
   quantities, applies the current tracked/untracked rules, and fails before an Order write on
   `insufficient_stock`;
2. `commitSaleDeduction` receives the prepared Inventory-owned value plus the committed Order
   reference, then writes Branch Inventory followed by Stock Movements.

Orders passes the prepared value but does not inspect or construct Inventory state. Focused local
Product snapshot and Inventory persistence adapters sit behind the Inventory service.

**Rationale**: The current sequence validates before Order creation but writes Inventory after the
Order. Two stages preserve `Orders -> positions -> movements` while ensuring Inventory alone owns
effective-stock fallback, position construction, and Movement construction.

**Alternatives considered**:

- **Let Orders calculate next positions and ask Inventory only to save them** — rejected because
  Orders would still own Stock rules.
- **Deduct Inventory before Order creation** — rejected because it reverses characterized commit
  order.
- **Make Order and Inventory atomic** — rejected because transaction, rollback, compensation, and
  locking semantics are deferred and current partial failures must remain.

The service preserves these observed quirks:

- an item without `productId`, a missing Product, or a null-stock Product without a Branch position
  remains in the Order but is skipped by Inventory;
- duplicate Product lines accumulate for validation and deduct sequentially;
- each tracked line creates one Movement;
- existing positions update in place; absent positions receive `bi` identifiers and fallback
  threshold; and
- Inventory notification still occurs after a successful Order path even when no Stock row changed.

## Decision 7: Apply tenant safety to Product, position, and numbering lookups

**Decision**: Command-side Product and Inventory lookup must include Workspace, legacy Business
Unit, and applicable Branch. Compatibility Order numbering counts only Orders in the same Workspace
and legacy Business Unit. Current source proves Branch is not part of the numbering rule, so Branch
does not participate in Feature 055 numbering.

The number remains `ORD-${String(count + 1).padStart(4, "0")}` and remains count-based rather than
max-number-based.

**Rationale**: Current code filters numbering only by `businessUnitId` and resolves Product/position
by IDs and Branch without complete tenant scope. The clarified specification and ADR-034 prohibit a
foreign Workspace from influencing or being exposed by a command. This is an intentional safety
correction for collision fixtures, not a claim of byte-identical unsafe behavior.

**Alternatives considered**:

- **Preserve Business-Unit-only lookups** — rejected because overlapping legacy identifiers could
  cause cross-Workspace influence or mutation.
- **Make numbering Branch-scoped** — rejected because characterization proves the current rule is
  Business-Unit-wide and DD-14 remains unresolved.
- **Use maximum parsed number or collision repair** — rejected because that redesigns numbering.

## Decision 8: Preserve commercial calculations behind a compatibility composite port

**Decision**: Add a `LegacyPosCommercialSnapshotPort` used by the POS draft service. Its outer
adapter delegates to the existing `computeDoc` compatibility calculation without changing
floating-point behavior. Do not name it a canonical Pricing or Tax policy.

The snapshot preserves:

- Product name/price/SKU/taxability copied when added;
- repeated Product coalescing;
- quantity minimum 1 with no current maximum;
- discount normalization `Math.max(0, +value || 0)` with no gross cap;
- inclusive/exclusive VAT and proportional taxable discount behavior;
- current non-clamped net/total behavior; and
- the legacy POS payload quirk that supplies `subtotal: doc.net` and `net: doc.net`.

**Rationale**: Pricing owns Price/Discount definitions, Taxes owns tax results, POS owns interaction,
and Orders retains the applied snapshot. A visibly compatibility-only composite port avoids
promoting the current combined calculator into canonical policy.

**Alternatives considered**:

- **Move `computeDoc` into Orders** — rejected because it transfers Pricing/Tax/POS responsibility.
- **Redesign calculation or rounding** — rejected because DD-15, DD-16, and DD-23 remain open.
- **Keep calculation in the page** — rejected because presentation would retain business logic.

## Decision 9: Coordinate checkout in POS and preserve partial publication

**Decision**: `LegacyPosCheckoutService` synchronously coordinates:

```text
Order command
  -> publish committed Order/Inventory/Movement compatibility snapshots
  -> existing Invoice command
  -> publish committed Invoice compatibility snapshot
  -> last-Order session port
  -> return success to the outer hook/page
  -> outer page clears draft and navigates
```

The service depends on owner-facing ports and a framework-neutral compatibility-publication port.
An outer publication hub is assembled once at composition; `AppProvider` subscribes and merges
scoped snapshots into legacy React state. This publication port is distinct from cache change
notifications.

**Rationale**: Current POS performs real multi-owner orchestration in the page. Publishing after
each owner commit preserves current partial visibility: an Invoice failure leaves the already
committed/published Order and stock; a last-Order failure leaves Order and Invoice published. The UI
still maps errors and performs navigation exactly as today.

**Alternatives considered**:

- **Keep the sequence in the page** — rejected because UI would continue orchestration.
- **Make Orders create the Invoice and session reference** — rejected because it transfers Invoice
  and POS ownership.
- **Publish only after complete success** — rejected because it changes current partial-failure
  state.
- **Use cache invalidation as provider publication** — rejected because provider state and cache
  have distinct consumers and neither becomes source of truth.

## Decision 10: Put the last-Order key behind a POS application port

**Decision**: Add `LegacyPosLastOrderPort` with synchronous `read`, `write`, and `clear`. A private
outer adapter wraps the approved browser-storage helpers and the unchanged `nx_last_order_id`
session key. Checkout uses `write`; the success page uses a hook over `read/clear`.

**Rationale**: The POS page and success page currently import storage helpers directly. UI and
application services must be browser-storage agnostic, while the key and raw string behavior must
remain compatible.

**Alternatives considered**:

- **Leave helpers in the pages because they are shared** — rejected because a shared helper does
  not make direct storage use an application boundary.
- **Store the last Order in React Query** — rejected because session refresh behavior is required
  and cache is not source of truth.
- **Add a new key/value shape** — rejected because refresh compatibility would break.

## Decision 11: Route only the Return-owned Order field patch through Orders

**Decision**: Add an Orders-owned handoff with scoped lookup and one explicit compatibility patch:

- Order ID;
- Return ID;
- returned-total delta; and
- `fullyReturned` input from the characterized Return calculation.

Orders applies the current `partial`/`returned` field value, returned-total increment, and Return ID
append. Return keeps validation, refund calculation, Return construction/numbering, Invoice patch,
restock, and notifications. The Order patch remains the first write in the current Return sequence;
Return emits the Order notification only after its full existing sequence.

**Rationale**: This removes direct non-owner Order persistence without migrating the Return
workflow or changing its partial-write behavior.

**Alternatives considered**:

- **Leave `replaceOrders` in Returns** — rejected because Orders would not be the sole write owner.
- **Move Return calculations into Orders** — rejected because Returns and Adjustments owns them.
- **Have the Order patch emit cache notification immediately** — rejected because current Return
  notification occurs after the complete Return sequence.

## Decision 12: Keep implementation selection in the existing two-stage composition root

**Decision**: Extend the established composition boundary:

1. SDK `createCommerceServices` selects `BrowserStorageCommerceStore`, private local command
   repositories/adapters, or supplied memory test substitutes;
2. Commerce `createCommerceApplicationServices` assembles POS, Order, Inventory, Return-handoff,
   numbering, publication, commercial-snapshot, last-Order, notification, clock, and identifier
   services once;
3. `CommerceServicesProvider` owns the stable runtime for the application lifetime.

The general SDK root exposes only composition factories and contract-typed runtime surfaces. New
concrete repositories, stores, and simulators remain private or on the explicit testing path.

**Rationale**: Feature 054 already approved and enforces this two-stage single-locus design. Adding
another provider-local composition root would recreate services during rendering and leak concrete
types.

**Alternatives considered**:

- **Construct services in POS hooks** — rejected because instances would be selected by UI and may
  be recreated.
- **Expose local repositories from the SDK root** — rejected because implementation would leak to
  consumers.
- **Make AppProvider the new composition root** — rejected because it remains a compatibility
  publication/delegation adapter.

## Decision 13: Keep cache change intent separate and exact-scoped

**Decision**: Reuse `CommerceChangeNotificationPort` and the existing React Query adapter. Order
creation requests Orders and Inventory refresh after the characterized final successful write.
Return retains its existing post-sequence Order/Invoice/Inventory notifications. Repositories emit
no cache intent, and failures do not automatically retry or resubmit a command.

**Rationale**: Cache orchestration is an outer concern. Exact Workspace, legacy Business Unit,
Branch, resource family, Order ID, and Customer relationship inputs already prevent cross-scope
cache collision.

**Alternatives considered**:

- **Invalidate in repositories** — rejected because persistence would depend on cache framework
  behavior.
- **Create new Order query keys in the application service** — rejected because application code
  would depend outward on hook implementation.
- **Retry after notification failure** — rejected because it could duplicate a committed sale.

## Decision 14: Extend architecture enforcement for write authority

**Decision**: Extend the existing TypeScript-AST/source policy and fixtures to reject:

- direct Order or Order-triggered Inventory persistence from pages, components, hooks, providers,
  Core, Return, setup, or application modules outside approved owner ports;
- POS page ownership of `computeDoc`, Order/Invoice orchestration, and last-Order storage helpers;
- Order application dependency on `LegacyCommerceOperationsStore`, Inventory policy
  implementations, browser APIs, React, React Query, providers, or concrete SDK classes;
- Return `replaceOrders` access;
- concrete command repository/store exports from the standard SDK root; and
- production construction of command implementations outside the approved composition files.

Use representative invalid and valid fixtures plus full production inventory scanning.

**Rationale**: Feature 054 enforcement catches many layer violations but does not comprehensively
reject arbitrary Commerce UI/provider Order writes. A source-string regression alone is not an
enforceable boundary.

**Alternatives considered**:

- **Rely on review and naming** — rejected because the requirement is enforceable architecture.
- **Add a heavyweight dependency graph tool** — rejected because the current AST engine and ESLint
  workflow can cover the new rules.

## Decision 15: Preserve sequential failures and exact visible mapping

**Decision**: Characterize and retain:

- `insufficient_stock` before any Order write;
- Order write before position and Movement writes;
- no rollback if an Inventory step fails after Order persistence;
- no provider publication when the Order service throws before returning;
- Order publication before Invoice creation;
- no compensation if Invoice or last-Order persistence fails;
- `insufficient_stock` mapped to its localized message and all other sale failures mapped to the
  current localized generic rejection; and
- no automatic retry, deduplication, or double-submit prevention added by this feature.

**Rationale**: These are current observable compatibility behaviors. Improving them would decide
transaction, idempotency, recovery, or workflow policy outside Feature 055.

**Alternatives considered**:

- **Make checkout atomic** — rejected because no backend transaction or compensation design is
  authorized.
- **Add a pending guard or idempotency token** — rejected because it changes UI behavior and
  resolves deferred repeat-submission policy.
- **Normalize errors into a new taxonomy** — rejected because server errors remain deferred.

## Decision 16: Use the existing quality toolchain and repeat deterministic suites twenty times

**Decision**: Add owner-focused characterization, application-service, contract, storage, scope,
publication, hook, architecture, and E2E tests to the current Vitest/Playwright suites. Extend the
existing deterministic validation script additively and execute the Feature 055 focused suite
twenty consecutive times with injected IDs, clock, and configured failure stages.

Required gates remain:

- `pnpm architecture:check`;
- `pnpm lint` with zero warnings;
- `pnpm typecheck`;
- `pnpm test:unit` plus focused deterministic repetition;
- `pnpm --filter commerce build`;
- affected Core build/tests when shared runtime contracts change;
- `pnpm build`;
- Commerce 044 and Features 052-054 Playwright regressions;
- Feature 055 English/LTR and Arabic/RTL keyboard/semantic/critical-axe evidence; and
- `git diff --check`.

**Rationale**: The repository already has these tools, full-source architecture enforcement, exact
key browser fixtures, deterministic injected dependencies, and established regression suites. No
new dependency is necessary.

**Alternatives considered**:

- **Introduce a new architecture framework or mock server** — rejected as unnecessary and outside
  scope.
- **Rely only on E2E** — rejected because partial-failure ordering, ownership, scope, and port
  contracts need deterministic lower-level evidence.

## Deferred Decisions Preserved

This design explicitly does not resolve:

- DD-01 aggregate subdivision or transaction consistency;
- DD-14 final Commerce fact/command scoping;
- DD-15/16 Pricing and Discount semantics;
- DD-17 Inventory reservation, commitment, deduction, release, negative Stock, or reconciliation;
- DD-19 Order state, cancellation, fulfillment, completion, amendment, or removal;
- DD-20 POS session/cart/offline/suspend/recovery semantics;
- DD-21 through DD-25 Payment, Refund, Tax, Document, and Return semantics;
- DD-29 logical public contract fields, errors, compatibility, or idempotency;
- DD-30 canonical Events;
- DD-34/35 backend authorization, permission, privacy, retention, or compliance details;
- DD-36/37 production SLOs, observability, recovery, and incident policy; or
- DD-38 through DD-40 persistence, transport, runtime, framework, and infrastructure choices.

All new shapes are visibly frontend-internal compatibility seams.

## Phase 0 Result

**PASS** — Every planning uncertainty has a bounded decision supported by the current code,
clarified specification, frozen authority, and existing toolchain. No `NEEDS CLARIFICATION` marker
remains. Phase 1 design may proceed.
