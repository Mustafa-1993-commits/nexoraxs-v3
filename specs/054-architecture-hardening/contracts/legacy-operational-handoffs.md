# Legacy Operational Services, Projections, and Handoffs

**Feature**: 054 Architecture Hardening  
**Status**: Frontend-internal compatibility contract  
**Non-authority**: Preserves current browser behavior; defines no final aggregate or API

## 1. Ownership Contract

Feature 054 relocates implementation responsibility without changing frozen ownership:

| Concern | Owner retained |
|---|---|
| User, Workspace, Business, Business Unit, Department, Branch, Subscription, platform context | Core Platform |
| Workspace file/object references, storage usage, quota, access coordination | Core Storage Coordination |
| Commerce setup/readiness contribution | Commerce Setup and Configuration |
| Product and Product media association | Commerce Product Catalog |
| Stock and Inventory Movement | Commerce Inventory |
| Transfer intent/record | Commerce Transfers |
| Return intent/record | Commerce Returns and Adjustments |
| Order | Commerce Orders |
| Invoice/document/numbering compatibility behavior | Commerce Invoices and Documents |
| Tax/discount/refund calculations observed by the current flow | Their applicable Commerce owner; no new semantics |

Application coordination does not transfer fact ownership. Owner-specific ports remain distinct
even when one browser adapter implements multiple persistence interfaces.

## 2. Core Projection Contract

Core production code may consume only `CommerceProjectionPort`. The projection contains the narrow
Product/Order/setup fields needed by the current Core shell, Product Hub, and billing presentation.

Core must not:

- load full Commerce Product, Customer, Inventory, Transfer, Return, Order, or Invoice collections
  into mutable provider ownership;
- construct or seed Commerce records;
- expose Product/Customer/Order/Invoice/setup write callbacks;
- write any Commerce operational storage key;
- calculate or repair a missing Commerce operational record; or
- create fallback Commerce state when the projection is absent/rejected.

Projection rules:

1. The adapter scopes by Workspace + legacy Business Unit + applicable Branch before returning any
   row.
2. The projection is read-only, cloned, disposable, and reconstructable.
3. Current presentation ordering quirks are preserved: shell and Product Hub receive the same
   ordering they currently interpret.
4. A projection failure remains an explicit absent/error state according to the characterized Core
   route; it never grants write authority.
5. Projection types remain frontend-internal and do not define a future integration API.

## 3. Core-to-Commerce Handoff Contract

Core may initiate the current setup/launch journey through `CommerceHandoffPort` with:

- actor ID;
- Workspace ID;
- legacy Business Unit ID;
- applicable Branch ID;
- Commerce OS identifier;
- current subscription reference when available;
- action/resource context; and
- minimal display context required by the current route.

The receiving Commerce ingress validates presence/shape and may persist a read-only handoff context
projection behind an approved session adapter so refresh/navigation remains compatible.

Commerce must not use the handoff to:

- create a User, Workspace, Business Unit, Branch, Subscription, or `OSEnablement` source record;
- infer canonical Business or Department;
- treat IDs as authorization proof;
- apply Core lifecycle policy; or
- invent defaults that become Core identity truth.

Core and Commerce currently run on separate browser origins. The contract therefore does not assume
shared `localStorage`; URL/session serialization remains an implementation compatibility detail and
not a canonical handoff format.

If the handoff is absent, invalid, stale, or rejected, Commerce exposes the existing safe failure/
recovery behavior and no domain writes occur.

## 4. Focused Commerce Service Contracts

### Setup and Configuration

`LegacyCommerceSetupService` owns current compatibility orchestration for:

- reading the W/BU setup;
- producing the exact non-persisted default view when absent;
- preserving setup IDs, W/BU/subscription IDs, `createdAt`, default merge, categories, and preset
  selection behavior; and
- persisting the existing setup collection once.

It depends on setup ports and supplied Core context only. It does not create/modify organization
identity, subscription, enablement, Product, Stock, Tax, or document records.

### Product media

`LegacyProductMediaService` coordinates:

- browser-neutral thumbnail processing;
- Core Storage Coordination quota assessment/update;
- media compatibility record construction/persistence; and
- Product media-reference result.

Workspace usage/quota decisions remain Core-owned. Product association remains Product-owned.
AppProvider supplies presentation callbacks for existing toasts but no policy callback.

### Inventory adjustment

`LegacyStockAdjustmentService` preserves current:

- active-Branch/context checks;
- Product presence check;
- effective Stock fallback;
- Inventory upsert and threshold behavior;
- zero-delta Movement suppression;
- Movement actor/reference fields;
- result/error strings; and
- exact Branch cache notification after commit.

### Transfer

`LegacyStockTransferService` owns Transfer validation/intent/record and requests Stock/Movement
effects through Inventory ports. It preserves destination validation, item quirks, BU-only number,
completed status, two movements per item, sequential writes, and both-Branch notification.

### Order

`LegacyOrderCreationService` owns the current Order compatibility record and requests Inventory
effects through Inventory ports. It preserves untracked Product behavior, accumulated duplicate
cart validation, `insufficient_stock`, fresh-storage BU numbering, caller-supplied commercial
snapshots, Order-before-Inventory commit order, and exact notifications.

### Invoice

`LegacyInvoiceCreationService` owns the current Invoice compatibility record. It preserves
same-tick Order→Invoice lookup, fresh-storage BU numbering, setup prefix/start, copied Order
snapshots, one Invoice write, and linked view notifications.

### Return

`LegacyReturnCreationService` owns Return intent/record and coordinates Order, Invoice, Inventory,
and Movement effects through their ports. It preserves current Order/Invoice lookup behavior,
snapshot-based refund values, duplicate/item quirks, missing-Product restock skip, return status,
numbering, sequential writes, and notifications.

None of these services define final lifecycle transitions, canonical authorization, transaction
scope, compensation, or backend command contracts.

## 5. Existing Commit Ordering Contract

Characterization must freeze the following ordering before movement:

| Operation | Existing successful write order |
|---|---|
| Media | media assets → Workspace usage |
| Setup | Commerce setups |
| Stock adjustment | Branch Inventory → optional Stock Movements |
| Transfer | Branch Inventory → Stock Movements → Stock Transfers |
| Order | Orders → optional Branch Inventory → optional Stock Movements |
| Invoice | Invoices |
| Return | Orders → optional Invoices → Returns → optional Branch Inventory → optional Stock Movements |

Rules:

- Post-commit cache notification follows the current last successful persistence point.
- Provider React state publication follows the committed result.
- No implementation may reverse ordering, group writes into a new transaction, add rollback, or
  suppress an existing partial failure without a separate behavior decision.
- Fresh-storage reads used for numbering and same-tick Order→Invoice must remain fresh rather than
  being replaced by a potentially stale React closure.

## 6. AppProvider Compatibility Contract

After migration, Commerce `AppProvider` may contain:

- hydration/publication of compatibility state;
- subscriptions to Product/Customer compatibility ports;
- current Core identity/context projection consumption;
- localization/theme/toast presentation coordination;
- context gathering for a command;
- one delegation call per legacy callback; and
- assignment of committed service snapshots to React state.

It must not contain:

- setup defaults/preset decisions;
- media compression, asset construction, quota, or usage calculations;
- Stock fallback, adjustment, Movement, Transfer, Return, Order, Invoice, number, tax, discount,
  refund, restock, or document business rules;
- direct browser storage access;
- QueryClient/query-key/cache logic; or
- a second persistence/fallback path.

Legacy callback names/signatures may remain temporarily when active consumers require them. Their
body must be a thin delegate/publish adapter.

## 7. No-Parallel-Write Migration Rule

For each operation:

```text
characterize old path
  -> add service/port tests
  -> make provider callback delegate to new service
  -> prove one persistence effect through callback
  -> remove old provider rule/write body
  -> source-scan zero alternate writers
  -> proceed to next operation
```

At no checkpoint may the provider and service both persist the same effect. A facade publication,
React state update, or cache invalidation is not a persistence write and must occur only after the
single owner path succeeds.

## 8. Scope and Relationship Rules

- Every operational command receives Workspace and legacy Business Unit.
- Branch is required for Branch Stock effects and carried from the source record for cross-Branch
  detail/Return cases where current behavior requires it.
- Stored references are independently resolved through the applicable scoped port.
- A same-ID foreign-scope record produces non-disclosing `scope_mismatch`.
- Only genuine typed `not_found` may become optional relationship absence.
- IDs and client context are never proof of authorization.

## 9. Failure and Recovery Contract

- Preserve existing return unions, thrown messages, localized toasts, and visible route states.
- Do not add automatic retry, retry-on-mount, focus retry, reconnect retry, or timer retry.
- Storage corruption/unavailability retains the current helper/adapter-specific behavior; do not
  substitute a different adapter merely for uniformity.
- Cache notification failure does not repeat the source command.
- Core projection/handoff failure does not create fallback Commerce records.
- No failure exposes a foreign record, Customer contact data, payload, secret, or browser value.

## 10. Shared Policy Exit Criteria

A shared policy symbol can be removed only when:

1. an equivalence test captures current output, rounding, IDs/timestamps, ordering, and mutation;
2. exactly one owner-aligned production definition exists;
3. every Commerce consumer imports the owner module or receives an approved projection;
4. Core does not deep-import a Commerce implementation;
5. the old shared export has zero production consumers; and
6. the architecture gate rejects its reintroduction.

Generic storage/ID/date/formatting/language capabilities may remain only when they contain no owner
decision.

## 11. Required Evidence

- One contract suite per focused service using memory ports.
- Browser characterization for unchanged keys and refresh behavior.
- One-write/provider-delegation tests per operation.
- ID/time/write-order/partial-failure equivalence tests.
- Core source tests proving zero Commerce key writers and zero operational callbacks.
- Commerce source tests proving zero Core identity constructors/fallback writers.
- Separate-origin handoff and refresh regression tests.
- Product media/quota/compensation tests.
- Exact-scope notification tests.
- Shared policy zero-consumer/no-duplicate checks.
- Feature 052/053, Commerce 044, and Core 050 browser regressions.

## 12. Final Compatibility Locations

- Retained Commerce write rules live only in the focused Setup, Media, Inventory, Transfer, Order,
  Invoice, Return, Documents, and Reporting owner modules under `apps/commerce/features/**`.
- AppProvider retains callback names only as delegate/publish compatibility shims.
- Exact-key operational persistence is implemented by
  `BrowserLegacyCommerceOperationsStore`; deterministic tests use its Memory counterpart.
- Core's AppProvider consumes the read-only projection from its exact composition root and has no
  Commerce collection writer or record constructor.
- Commerce initiates temporary Core identity compatibility operations only through the public
  Core-owned compatibility port selected at composition; it contains no direct Core identity
  persistence path.
- Removed shared Commerce policy and general SDK concrete exports have zero production consumers.

These locations are compatibility seams. They do not define canonical lifecycle, Business mapping,
HTTP/DTO/error/pagination/idempotency/authorization, upload transport, or offline behavior.
