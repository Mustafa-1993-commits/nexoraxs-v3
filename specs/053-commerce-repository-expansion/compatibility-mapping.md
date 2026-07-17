# Feature 053 Compatibility Mapping

## Storage and Scope Baseline

| Domain | Existing key | Current visible scope | Feature 053 boundary |
|---|---|---|---|
| Products | `nexoraxs.db.commerceProducts` | Legacy Business Unit with active-Branch stock overlay | Feature 052 unchanged |
| Customers | `nexoraxs.db.commerceCustomers` | Workspace + legacy Business Unit; create records active Branch | Complete list/get/create/update migration |
| Inventory | `nexoraxs.db.branchInventory` | Active Branch | Read-only list/projection |
| Orders | `nexoraxs.db.commerceOrders` | Active Branch list; legacy-BU detail | Read-only list/get/view |
| Invoices | `nexoraxs.db.commerceInvoices` | Active Branch list; legacy-BU detail/document | Read-only list/get/view |

All stored `businessUnitId` fields remain byte-compatible. Runtime contracts use the explicitly
temporary name `legacyBusinessUnitId`; no `businessId` is created or serialized.

## Active Consumers Before Migration

| Consumer | Current reads | Current writes | Feature 053 outcome |
|---|---|---|---|
| `/customers` | `customers`, active-Branch `orders` | `createCustomer` | Customer hooks + Customer history service |
| `/customers/<id>` | `customers`, active-Branch `orders` | `updateCustomer` | Customer item/update hooks + history service |
| `/pos` | `products`, `customers` | `createCustomer`, `createOrder`, `createInvoice` | Customer hook only; Order/Invoice writes retained |
| `/inventory` | Product stock overlay | `adjustStock` | Inventory read hook; adjustment retained |
| `/inventory/transfers` | Products and Branch data | `transferStock` | Remains legacy/excluded |
| `/orders` | active-Branch Orders/Invoices | none | Order view hook |
| `/orders/<id>` | legacy-BU Orders/Invoices, Customers, Returns | `createReturn` | Order view hook; Return write/provider input retained |
| `/invoices` | active-Branch Invoices/Orders | none | Invoice view hook |
| `/invoices/<id>` | legacy-BU Invoices/Orders, Customers, Returns | none | Invoice detail hook; Return input retained |
| Invoice document | legacy-BU Invoice/Order, Customer, Returns | none | Invoice document hook; setup/Return input retained |
| Dashboard/reports/notifications/return document | mixed legacy reads | excluded writes where applicable | Remain on `AppProvider` |

## Existing Writer Ownership

| Callback | Collections changed | Feature 053 rule |
|---|---|---|
| `createCustomer` | Customers | Replace with Customer repository after all callers migrate |
| `updateCustomer` | Customers | Replace with Customer repository after all callers migrate |
| `adjustStock` | Inventory + movements | Retain; notify Inventory reads after commit |
| `transferStock` | Inventory + movements + transfers | Retain; notify affected Branch reads after commit |
| `createOrder` | Orders + Inventory + movements | Retain; notify Orders and Inventory after commit |
| `createInvoice` | Invoices | Retain; notify Invoices and linked Order views after commit |
| `createReturn` | Returns + Orders + Invoices + optional Inventory/movements | Retain; notify exact related reads after commit |

## Characterized Presentation Baseline

- Customer list is legacy-Business-Unit-wide; metrics use active-Branch Orders.
- Customer list uses insertion order reversed for display and searches name/phone/email.
- Customer detail is safe not-found and shows active-Branch Order history.
- Inventory uses the current Product/Branch Inventory effective-stock fallback.
- Order and Invoice lists are active-Branch-specific.
- Order and Invoice details can resolve records across Branches in the same legacy Business Unit.
- Stored Order and Invoice commercial fields remain snapshots; repositories do not recalculate them.
- Invoice list retains its current `computeDoc` presentation outside repository logic.
- Invoice detail Customer presentation resolves from the linked Order where currently used.
- Invoice document Customer presentation retains its current Invoice reference/fallback.

## Required Compatibility Direction

```text
New Repository and Hooks
  -> Customer Compatibility Facade
  -> Remaining Legacy Consumer
```

Read-only Inventory/Order/Invoice route consumers migrate directly to hooks. Unmigrated legacy
consumers may keep provider state; partial scoped reads must never replace the provider's full
mutable collections.

## Zero-Consumer Evidence

PASS. `rg -n 'createCustomer|updateCustomer' apps/commerce --glob '!**/__tests__/**'` returns no
active source match. Customer writes occur only through the scoped repository/facade. The provider
subscribes to committed facade snapshots for unmigrated read consumers and retains no Customer
write callback.

## Final Responsibility Direction

| Surface | Final read source | Final write source |
|---|---|---|
| Customer list/detail/POS | Customer hooks and history service | Customer repository via facade |
| Inventory route | Branch projection hook | Retained provider adjustment/transfer/sale/return paths |
| Order list/detail | Order view hooks | Retained POS and Return paths |
| Invoice list/detail/document | Invoice view hooks | Retained issuance and Return paths |
| Unmigrated dashboard/report readers | Provider compatibility state | Existing excluded writers |

Repository commits flow upstream to the Customer facade and then to provider readers. Retained
operational commits flow once to browser storage and then notify exact-scope read keys; no shared
operational write is duplicated.

## Characterization Gate

PASS before structural changes. Focused Vitest characterization passed 11 assertions across four
files. Three Playwright journeys passed for Customers/POS, linked Inventory/Order/Invoice routes,
and direction/accessibility; the expanded Inventory retained-write/filter route also passed after
the baseline was frozen. The migration must preserve these observations while adding the required
loading, empty, error/retry, pending, and validation states that the legacy screens do not fully
expose.
