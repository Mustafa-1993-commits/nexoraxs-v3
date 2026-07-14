# Core Shell Frontend Presentation Contracts

**Status**: Planning contract; implementation requires approved `spec.md`
**Owner**: Core Platform application shell
**Versioning**: App-local additive contract for feature 050; not a public API

These contracts define the smallest frontend seams needed to stabilize the existing shell. They
do not define a Laravel endpoint, SDK interface, persistence schema, canonical organization model,
or repository abstraction.

## Contract 1 — `ShellPresentationPort`

Illustrative TypeScript shape:

```ts
type ShellPresentationPort = Readonly<{
  actor: Readonly<{
    id: string | null;
    displayName: string;
    email: string | null;
  }>;
  context: ShellContextView;
  preferences: ShellPreferenceView;
  notifications: NotificationProjection;
  navigation: readonly ShellNavigationItem[];
  search: Readonly<{
    entries: readonly CoreSearchEntry[];
    query: (value: string) => readonly CoreSearchResult[];
  }>;
  actions: Readonly<{
    setLocale: (locale: "en" | "ar") => void;
    toggleTheme: () => void;
    logout: () => void;
    retryContext: () => void;
  }>;
}>;
```

Rules:

- The initial adapter is backed by the current `useApp` facade.
- Existing `useApp` fields and behavior remain available and unchanged to page consumers.
- `retryContext` re-evaluates presentation only; it does not clear, normalize, or replace IDs.
- No action writes Commerce facts, canonical Notification state, organization state, or lifecycle
  state.
- A future client can replace source reads behind this port only after its own governed feature;
  this contract does not approve that client.

## Contract 2 — Context evaluation

```ts
function evaluateShellContext(snapshot: ShellContextSnapshot): ShellContextView;
```

Preconditions:

- Values are read through the existing app facade/storage adapter.
- Stored IDs are untrusted context inputs.

Postconditions:

- The global display level is always Workspace.
- A resolved BusinessUnit must match the resolved Workspace.
- A resolved Branch must match both Workspace and BusinessUnit.
- Missing, stale, and cross-scope combinations return explicit non-ready status.
- No fallback entity is inferred or selected.
- Error/recovery copy does not disclose another tenant's names or records.

Compatibility:

- Preserve `nexoraxs.session.currentWorkspaceId`.
- Preserve `nexoraxs.session.currentBusinessUnitId`.
- Preserve `nexoraxs.session.currentBranchId`.
- Preserve current `setCurrent` behavior for existing page consumers; the shell evaluator is
  read-only and must not call it implicitly.

## Contract 3 — Notification projection

```ts
function projectShellNotifications(input: Readonly<{
  products: readonly CommerceProduct[];
  orders: readonly CommerceOrder[];
  plan: CommercePlanInfo | null;
  money: (amount: number) => string;
  locale: "en" | "ar";
}>): NotificationProjection;
```

Initial parity requirements:

1. Plan presentation remains first when present.
2. Out-of-stock items retain current source ordering.
3. Low-stock items retain current source ordering and threshold semantics.
4. The latest-order presentation remains after the stock section.
5. Empty presentation remains available.
6. The indicator preserves the characterized current behavior before any separately approved
   semantic correction.

Prohibitions:

- No mark-read/write/delete operations.
- No Product, Inventory, Stock Movement, Order, payment, invoice, return, or plan mutation.
- No claim that a presentation `id` is a canonical Core Notification ID.
- No import from `apps/commerce`.

## Contract 4 — Core-only search

```ts
function searchCoreDestinations(
  entries: readonly CoreSearchEntry[],
  query: string,
  locale: "en" | "ar",
): readonly CoreSearchResult[];
```

Allowed sources:

- Existing Core navigation destinations
- Existing settings destinations
- Existing installed-application presentation destinations
- Static documentation links already owned and exposed by the current runtime

Current documentation-source state: empty/unavailable; no runtime documentation link exists and
none may be invented by feature 050.

Disallowed sources:

- Workspace/Business/BusinessUnit/Branch records
- Products, inventory, stock, orders, customers, invoices, payments, returns, or other Commerce
  facts
- Other OS facts or cross-OS/global search
- Marketplace content
- AI output
- Commands or quick actions
- New backend/API/SDK calls

Interaction:

- Input exposes an accessible name and combobox relationship when results are displayed.
- Arrow keys move active result, Enter follows the existing destination, and Escape closes results
  and restores focus to the input.
- Empty query and no-match states are deterministic and localized.
- Query is ephemeral and is not written to compatibility storage.

## Contract 5 — Drawer and popup focus behavior

Applies to the mobile drawer, context switcher, search results, notifications, and profile menu.

Opening:

- Trigger exposes accessible name, expanded state, and controlled surface ID.
- Keyboard opening moves focus to the first meaningful target when the pattern requires it.
- Mobile drawer prevents focus from reaching obscured page content.

Closing:

- Explicit close, Escape, outside/scrim interaction, route selection, history navigation, and
  breakpoint change close the applicable surface deterministically.
- Only the topmost transient surface closes on Escape.
- Focus returns to the opener unless navigation moves focus into the new page.
- Closing always releases focus containment and any background inert state.

Navigation:

- The current destination uses `aria-current="page"`.
- One labelled primary navigation region and one primary `main` landmark are present.
- A skip link reaches the primary `main` content.

## Contract 6 — Shell state and announcements

- Loading uses a named status and `aria-busy`/status semantics without depending on animation.
- Empty, error, unauthorized, unavailable, and recovery are distinguishable by text and semantics,
  not color alone.
- Live announcements are non-duplicative; persistent content is preferred over transient toast for
  recoverable shell state.
- Retry repeats a read/context evaluation only.
- Reduced motion removes or shortens non-essential drawer/popup/spinner transitions while retaining
  immediate visible state change.

## Contract 7 — Compatibility invariants

Implementation and tests must prove zero change to:

- Six dashboard route URLs and existing sidebar destinations/order
- Authentication/onboarding redirect destinations
- All active and deprecated browser storage keys
- Seeded IDs and mock record shapes
- Locale values `en`/`ar` and theme values `light`/`dark`
- Page-facing `useApp` behavior
- Legacy Business-labelled `BusinessUnit` IDs/types/storage
- Existing Core-to-Commerce URLs and handoff behavior
- Current application import boundaries

Any failed invariant blocks the affected implementation phase and triggers rollback; it cannot be
waived as cleanup.
