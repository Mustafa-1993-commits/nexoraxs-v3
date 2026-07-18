# Contract: Orders Command Boundary

**Classification**: Frontend-internal compatibility contract  
**Owner**: Commerce Orders for Order records and applied snapshots  
**Canonical API status**: Not a public or backend contract

## Purpose

Provide one owner-aligned path for every currently proven persisted Order change while preserving
the Feature 053 read repository and all current records, numbering, failure points, Inventory
effects, cache refresh, provider publication, and Return behavior.

## Supported Surface

The boundary supports only:

- create a compatible Order from caller-supplied applied snapshots;
- scope-safe lookup needed by current synchronous compatibility flows;
- apply the exact Return compatibility-field patch requested by Returns; and
- preserve the current empty demo seed through a narrow bootstrap seam if characterization proves
  it remains active.

It does not expose general update, delete/remove, cancel, status transition, discount, item,
quantity, price, recalculate, reserve, release, restore, or lifecycle commands.

## Create Service Contract

```ts
interface LegacyOrderCreationPort {
  create(
    context: LegacyCommerceCommandContext,
    command: LegacyCreateOrderCommand,
  ): LegacyCreateOrderResult;
}
```

The application service may orchestrate only:

1. validate explicit compatibility context and current create input;
2. ask Inventory to prepare the current sale deduction without writing;
3. request the next scoped compatibility number;
4. construct the current compatible Order with injected clock/identifier dependencies;
5. ask the Order command repository to create it;
6. ask Inventory to commit the prepared effect;
7. request exact-scope Order and Inventory change notifications at the current point; and
8. return the same synchronous snapshots.

The service does not read Products, Branch Inventory, Stock Movements, storage, React state, query
keys, or concrete SDK implementations.

## Repository Contract

`LegacyOrderCommandRepository` persists Order records only. It is separate from and additive to the
Feature 053 asynchronous `LegacyOrdersRepository`, whose query behavior remains unchanged.

Repository operations always accept the narrowest applicable scope:

- numbering list/count: Workspace + legacy Business Unit;
- create: Workspace + legacy Business Unit + Branch;
- get/Return patch: Workspace + legacy Business Unit + Branch; and
- demo seed: Workspace + legacy Business Unit, with foreign records preserved.

The repository must:

- return clones or immutable values rather than exposing its stored array;
- preserve unknown fields and all rows outside the exact requested scope;
- fail closed for missing/invalid scope;
- never reveal whether a same-ID foreign-scope record exists;
- reject duplicate create IDs according to its typed compatibility failure contract;
- preserve synchronous local timing; and
- contain no pricing, Inventory, number, UI, cache, browser, or lifecycle logic.

The local implementation depends on a command storage port. No page, hook, provider, application
service, or Core module can import or select it.

## Number Contract

`LegacyOrderNumberPort.next(scope)` counts only Orders in the same Workspace and legacy Business
Unit. Branch is deliberately excluded because characterization shows a Business-Unit-wide sequence.
The exact output remains `ORD-${String(count + 1).padStart(4, "0")}`.

This compatibility algorithm does not reserve numbers, parse maximum values, close gaps, prevent
concurrent duplicates, or define a future Invoice/Order numbering policy.

## Return Handoff Contract

Returns requests `LegacyOrderReturnHandoffPort.getOrder` and `applyPatch`. The patch may only:

- set the already supported `returnStatus` to the caller-computed `partial` or `returned` value;
- increment `returnedTotal` by the caller-computed amount; and
- append the new Return ID.

Returns retains all Return validation, calculations, restock, Invoice patch, Return persistence,
and notification ordering. The Order handoff emits no independent cache notification so the Return
workflow can preserve its current post-commit notification point.

An unavailable or foreign-scope Order is represented through the existing indistinguishable
compatibility failure/absence behavior required by the Return characterization. No foreign record
or scope is disclosed.

## Change Notification Contract

The create service uses the existing framework-neutral `CommerceChangeNotificationPort` only after
the current persistence point. Inputs include exact Workspace, legacy Business Unit, Branch, Order
ID, and applicable Customer ID. Inventory notification includes the same complete Branch scope.

The outer React Query adapter alone maps these calls to exact query keys. Notification failure is
swallowed only at the same current fire-and-forget boundary and never repeats or reverses a write.

## Failure Contract

The current compatibility failures remain distinguishable:

- invalid/missing scope or scope mismatch;
- current Order validation failure;
- `insufficient_stock` from Inventory prepare;
- not found for the Return handoff without foreign disclosure;
- duplicate ID/SKU-style deterministic test conditions where configured;
- browser storage unavailable/corrupt/write failure;
- deterministic injected failure at an explicit operation/stage; and
- unknown failure.

No automatic retry, optimistic mutation, transaction, rollback, compensation, reconciliation, or
idempotency behavior is introduced. The create commit order remains Order → Branch Inventory →
Stock Movements.

## Replaceability and Composition

The SDK Commerce factory selects a browser-backed or memory-backed private command repository. The
Commerce application composition root injects that repository and all external ports into one
stable service graph. Replacing the local repository implementation requires no page, hook,
application-service, provider-contract, or Core change.

This replaceability does not imply an approved HTTP repository or final async contract. Future
transport timing/versioning requires the deferred contract decisions.

## Contract Tests

The reusable repository/service suite covers:

- create, scoped numbering, lookup, Return patch, and required bootstrap behavior;
- exact record shapes, ordering, identifier/time order, and unknown-field preservation;
- Workspace/legacy-Business-Unit/Branch isolation with overlapping IDs/numbers;
- duplicate Product lines and tracked/untracked/missing Product behavior through the Inventory port;
- every sequential failure point and existing partial effects;
- exact-scope notifications and provider compatibility publication;
- browser and memory implementations with identical deterministic fixtures; and
- the explicit absence of generic update/delete/cancel/status/item/price/reservation operations.

## Implementation Conformance

The local and memory runtimes implement the same scoped command contract and are selected only by
composition. Creation, Return patching, and demo seeding are the only active durable Order writer
paths. Numbering remains Workspace-plus-legacy-Business-Unit count based, while creation and Return
patching require the complete Branch scope. For legacy Return compatibility, the provider resolves
the requested Order inside the active Workspace and legacy Business Unit and passes the Order's
own Branch to the handoff; this preserves the established flow when the shell currently displays a
different Branch without weakening repository scope checks.

All general update, deletion, cancellation, status, item, price, persisted discount,
reservation/release, and restoration operations remain absent. These compatibility contracts do
not establish final lifecycle, transport, pagination, error-taxonomy, authorization, or
idempotency semantics.
