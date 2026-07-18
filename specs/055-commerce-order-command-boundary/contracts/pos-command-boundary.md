# Contract: POS Draft and Checkout Boundary

**Classification**: Frontend-internal compatibility contract  
**Owner**: Commerce POS for transient interaction and checkout orchestration  
**Canonical API status**: Not a public or backend contract

## Purpose

Move existing sale-draft behavior and checkout sequencing out of the POS page without treating the
draft as a persisted Order. The contract preserves current controls, timing, calculations,
feedback, Invoice handoff, last-Order reference, and success navigation.

## Dependency Direction

```text
POS page/component
  -> POS command hook
  -> POS draft service / POS checkout service
  -> application-facing commercial, Order, Invoice, publication, and last-Order ports
  <- outer React/provider/browser adapters supplied at composition
```

The page and hook do not import repositories, SDK concrete classes, storage adapters, React Query
keys, browser storage, or environment variables. The application services import no React,
React Query, browser, provider, or SDK implementation module.

## Draft Service Contract

The draft service accepts an immutable current draft and one supported command and returns the next
draft plus the recalculated commercial snapshot.

```ts
interface LegacyPosDraftService {
  execute(input: {
    readonly draft: LegacyPosDraft;
    readonly command: LegacyPosDraftCommand;
    readonly taxMode: "inclusive" | "exclusive";
    readonly taxRate: number;
  }): LegacyPosDraftResult;
}

interface LegacyPosDraftResult {
  readonly draft: LegacyPosDraft;
  readonly commercialSnapshot: LegacyPosCommercialSnapshot;
}
```

The service preserves current Product coalescing, line ordering, minimum quantity, Product
snapshotting, customer/payment selection, discount coercion, removal, clear behavior, and
zero-stock rejection. It delegates commercial calculation through
`LegacyPosCommercialSnapshotPort` and does not persist an Order.

The outer hook maps application failures to the same existing localized feedback. It may expose
pending/error state for React, but the underlying active local service call remains synchronous and
is not automatically retried.

## Checkout Service Contract

```ts
interface LegacyPosCheckoutPort {
  checkout(input: LegacyPosCheckoutInput): LegacyPosCheckoutResult;
}
```

Preconditions are the current characterized preconditions only. No new tender, payment,
authorization, idempotency, empty-cart, discount, or concurrency rule is added.

The service coordinates exactly:

1. build the existing `LegacyCreateOrderCommand`, including `subtotal = calculated net`;
2. synchronously request the Orders-owned create port;
3. publish the returned Order, Inventory, and Movement snapshots through the React-neutral
   publication port;
4. synchronously request the existing Invoice-owned creation port using the returned Order;
5. publish the returned Invoice snapshot;
6. write the returned Order ID through `LegacyPosLastOrderPort`; and
7. return the success route and records to the UI.

The UI alone clears view/transient state and navigates to `/pos/success` from a successful result.
The checkout service never calls a Next.js router.

## Failure and Ordering Contract

- An Order failure prevents Invoice creation, last-Order write, and success navigation.
- If Order succeeds and Invoice fails, the Order/Inventory writes and provider publication remain.
- If the last-Order write fails, the earlier Order, Inventory, Invoice, and publication effects
  remain.
- The service does not retry, compensate, roll back, submit in parallel, or suppress the current
  error.
- One invocation reaches the Order create port at most once and the Invoice create port at most
  once.
- Current sync timing is preserved so Invoice creation can consume the new Order in the same call.

## Last-Order Adapter Contract

`LegacyPosLastOrderPort` provides synchronous `read`, `write`, and `clear`. Its browser adapter is
the sole Feature 055 owner of direct access to the existing session helper/key. The success page
uses a POS hook and remains browser-storage agnostic.

## Publication Contract

`LegacyCommerceCommandPublicationPort` publishes already committed snapshots only. It performs no
persistence, calculation, validation, or cache invalidation. `AppProvider` may remain the React
compatibility projection behind this port, but it must not reconstruct or mutate an Order.

## UI Compatibility Contract

The implementation preserves:

- every current route and control;
- English and Arabic translations, LTR/RTL direction, logical layout, and current text;
- current keyboard operation, accessible names, focus movement, disabled behavior, and dialogs;
- current pending/error/success/toast behavior; and
- the absence of price-edit, cancel, remove persisted Order, or lifecycle controls.

## Contract Tests

Contract evidence covers:

- every supported draft command and the absent-command matrix;
- repeated Products, quantity lower boundary, zero-stock rejection, empty draft, customer/payment,
  taxable/non-taxable lines, discount normalization, and exact commercial values;
- successful checkout call/result/publication order;
- failure injected at every sequential stage with no uncontrolled randomness;
- exactly-once port calls and no hidden retry;
- last-Order refresh/success-page compatibility; and
- existing localized, RTL/LTR, keyboard, screen-reader, and navigation behavior.

## Implementation Conformance

The POS page now delegates every supported draft transition to the draft hook and invokes one
checkout hook for the durable sale. The checkout service preserves the characterized synchronous
Order → publication → Invoice → publication → last-Order sequence, and the UI alone performs the
successful transient reset and `/pos/success` navigation. Browser session access is isolated in
the composed last-Order adapter. No React Query, browser API, repository implementation, retry, or
new persisted command is present in the POS application services or hooks.
