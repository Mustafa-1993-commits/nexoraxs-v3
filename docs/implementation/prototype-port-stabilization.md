# Prototype Port Stabilization

Branch: `041-core-platform-ux-alignment`
Date: 2026-06-06

---

## What Was Stabilized

The Claude AI design prototype (located in `docs/claude.aidesign/` — reference only, never imported at runtime) was ported into the two live Next.js apps with clean architecture boundaries, SSR-safe state management, and visual parity to the prototype screens. This pass covered:

- Core Platform onboarding flow
- Core Platform Product Hub / main dashboard
- Commerce OS dashboard
- Commerce products overview
- Commerce inventory overview

The following were **explicitly excluded** from this pass and remain pending: POS, orders, invoices, reports, and document/tax deep QA.

---

## Packages Added / Updated

### `packages/shared`

| File | Change |
|------|--------|
| `src/commerce/documents.ts` | **Created** — houses `computeDoc` (line-item document builder with VAT) and `fmtDate` (ISO date formatter). Separated from analytics selectors to keep concerns isolated. |
| `src/mock-db/selectors.ts` | **Modified** — removed inline `computeDoc`/`fmtDate` implementations; added `export { computeDoc, fmtDate } from "../commerce/documents"` to preserve the existing re-export chain without duplication. |
| `src/index.ts` | Unchanged — `export * from "./mock-db/index"` flows through to `selectors.ts` and onward to `commerce/documents.ts`. No duplicate exports. |

Re-export chain:
```
packages/shared/src/index.ts
  → mock-db/index.ts
  → mock-db/selectors.ts
  → commerce/documents.ts
```

### `packages/ui`

| File | Change |
|------|--------|
| `src/styles/core-theme.css` | **Added** utility class groups: `nx-form-grid`, `nx-seg`, `nx-page-head`/`nx-page-title`/`nx-page-sub`/`nx-section-title`, `nx-table-wrap`/`nx-table` |
| `src/styles/commerce-theme.css` | **Added** utility class groups: same base set as above, plus `nx-kpi-grid`/`nx-kpi`/`nx-kpi-*`, `nx-channel-row`/`nx-channel`/`nx-channel-*`, `nx-shortcut-row`/`nx-shortcut`/`nx-shortcut-ic`, `nx-dash-2col`, `nx-filterbar`/`nx-chip-filter`, `nx-dot` |

---

## CSS / Theme Architecture

Both apps import their respective theme CSS from `@nexoraxs/ui`:

- `core-platform`: imports `nexoraxs-theme.css` + `core-theme.css`
- `commerce`: imports `nexoraxs-theme.css` + `commerce-theme.css`

All utility classes use the `nx-*` prefix. CSS custom properties (`--surface`, `--text`, `--accent`, `--border`, `--r`, `--sh-sm`, etc.) are defined in `nexoraxs-theme.css` and resolve per the active color scheme. Commerce-specific layout classes (`nx-kpi-grid`, `nx-dash-2col`, etc.) live only in `commerce-theme.css` and are not visible to Core Platform.

Pages and components apply classes by name only — no inline theme values except for dynamic tint colors derived from data (e.g., KPI icon backgrounds computed at render time from a CSS color string plus an opacity suffix like `"#f59e0b" + "1a"`).

---

## Shared Mock-DB and Shared Types Architecture

### `@nexoraxs/types`

Pure TypeScript interface definitions. No runtime code. Canonical names:

| Canonical | Deprecated alias |
|-----------|-----------------|
| `WorkspaceMember` | `TeamMember` |
| `CommerceSetup` | `CommerceProfile` |

Key interfaces used across both apps: `User`, `Workspace`, `WorkspaceMember`, `BusinessUnit`, `Branch`, `OSSubscription`, `CommerceSetup`, `CommerceProduct`, `CommerceOrder`, `OrderItem`, `CommerceCustomer`.

### `@nexoraxs/shared`

Mock database layer — all runtime state logic lives here. Structured as:

```
packages/shared/src/
  index.ts                    ← public entry point
  mock-db/
    schema.ts                 ← storage key constants, Lang type, emptyRuntimeState()
    storage.ts                ← loadState() / saveState() with SSR guard
    actions.ts                ← state mutation functions (addProduct, updateOrder, etc.)
    seed.ts                   ← deterministic seed data generators
    selectors.ts              ← read-only derived data (nxRevenue, nxBestSellers, taxBreak, etc.)
    index.ts                  ← re-exports all of the above
  commerce/
    documents.ts              ← computeDoc(), fmtDate()
```

Both apps consume `@nexoraxs/shared` only through their local `AppProvider` (which wraps `useApp()`) and through named imports from `@/lib/store`. No page or component imports directly from `@nexoraxs/shared` — the local barrel provides a stable internal API.

**Dependency direction**: `documents.ts` uses `taxBreak` from `selectors.ts`. `selectors.ts` re-exports from `documents.ts`. This is a one-way dependency, not a cycle.

---

## Storage Isolation Rules

| Rule | Detail |
|------|--------|
| Single storage entry point | All `localStorage`/`sessionStorage` reads and writes go through `loadState()` / `saveState()` in `packages/shared/src/mock-db/storage.ts` |
| No direct storage in pages or components | Pages and components must never call `localStorage.*` or `sessionStorage.*` directly |
| SSR guard in storage helpers | `loadState()` returns `emptyRuntimeState()` when `typeof window === "undefined"` |
| App boundary isolation | Core Platform state and Commerce state are stored under separate keys and managed by separate `AppProvider` instances — neither app reads the other's storage keys |
| No cross-app imports | `apps/core-platform` does not import from `apps/commerce` and vice versa |

Deleted orphaned local store files (zero consumers confirmed before deletion):

```
apps/core-platform/lib/store/db.ts
apps/core-platform/lib/store/catalogs.ts
apps/core-platform/lib/store/i18n.ts
apps/core-platform/lib/store/commerce-helpers.ts
apps/core-platform/lib/store/storage-keys.ts
apps/commerce/lib/store/db.ts
apps/commerce/lib/store/catalogs.ts
apps/commerce/lib/store/i18n.ts
apps/commerce/lib/store/commerce-helpers.ts
apps/commerce/lib/store/storage-keys.ts
```

Still active local helpers (have real consumers, kept):

```
apps/core-platform/lib/core-session.ts   ← CoreProvider, onboarding steps, InviteUserModal, DashboardOnboardingGuard
apps/core-platform/lib/core-theme.ts     ← CoreProvider
apps/core-platform/lib/locale.ts         ← CoreProvider, LanguageSwitcher, StepLanguage
```

---

## Hydration Safety Rules

`AppProvider` in both apps follows this pattern:

1. `useState(emptyRuntimeState())` — server render starts with empty, deterministic state (no storage access)
2. `useEffect(() => { setState(loadState()); setIsHydrated(true); }, [])` — client-only hydration after mount
3. `isHydrated` flag gates any UI that depends on persisted state

This eliminates React hydration mismatches because the server-rendered HTML always matches the initial client render. Storage is only read after the component mounts.

The `docs/claude.aidesign/` prototype files are **never imported at runtime** — they are visual reference only. No app file has an import path pointing into `docs/`.

---

## Apps Validated

| App | Port | Routes compiled |
|-----|------|----------------|
| Core Platform | 3001 | 16 static routes |
| Commerce OS | 3002 | 19 routes (static + dynamic) |

Both apps passed all three checks: TypeScript compilation (`tsc --noEmit`), ESLint (zero errors, zero warnings), and Next.js production build.

---

## Commands That Pass

```bash
# From repo root
pnpm --filter core-platform tsc --noEmit     # ✓ 0 errors
pnpm --filter core-platform lint             # ✓ 0 problems
pnpm --filter core-platform build            # ✓ 16 static routes

pnpm --filter commerce tsc --noEmit          # ✓ 0 errors
pnpm --filter commerce lint                  # ✓ 0 problems
pnpm --filter commerce build                 # ✓ 19 routes (static + dynamic)
```

---

## Documents + Tax QA Pass (2026-06-06)

Completed as a follow-up QA pass against `docs/claude.aidesign/app/documents.jsx` and `documents.css`.

### `computeDoc` — Logic Fixed

The original implementation had three bugs vs. the prototype algorithm:

| Bug | Original | Fixed |
|-----|----------|-------|
| Rate when not VAT-registered | Defaulted to 14% | `rate = vatRegistered ? vatRate : 0` |
| Exclusive VAT | Never computed (always inclusive) | Handles both `pricesIncludeTax` branches |
| Total + net after discount | `total = subtotal - discount` (wrong for exclusive) | `total = incl ? afterDiscount : afterDiscount + vat` |

Also added `gross` and `rate` to the return type to match the prototype. `subtotal` kept as alias for `gross` for backward compat with stored invoices.

### CSS Added

`nx-receipt-*` and `nx-invoice-*` classes from `documents.css` added to `packages/ui/src/styles/commerce-theme.css`. Receipt uses fixed dark-on-white palette (correct for print). A4 invoice uses CSS vars where theme-adaptive, fixed for printed borders. `@media print` rule hides the topbar and removes shadows.

### Invoice Document Page (`/invoices/[id]/document`)

Rewritten to use the prototype `InvoiceDoc` layout:
- `nx-invoice` / `nx-invoice-top` / `nx-invoice-brand` / `nx-invoice-titleblock`
- `nx-invoice-parties` (Billed to + Payment)
- `nx-invoice-table` with Description, Qty, Unit, Amount columns
- `nx-invoice-summary` with notes panel + future fields + totals
- Totals recomputed from `invoice.items` via `computeDoc` (not raw stored values)
- Business info from `getCommerceSetup()`
- Customer looked up from `customers[]`; falls back to "Walk-in customer"
- Payment method from linked order; falls back to "Cash"

### Document Templates Preview (`/settings/documents`)

New page showing live receipt and A4 invoice previews using:
- Current `getCommerceSetup()` data (prefix, VAT, footer, return policy)
- 3 sample line items (2 taxable, 1 exempt) to demonstrate partial-exemption VAT math
- Receipt rendered at native width (58mm=230px, 80mm=300px) using `nx-receipt-*` classes
- Invoice rendered compact using `nx-invoice.compact` class
- Config summary strip showing VAT status, invoice prefix, receipt prefix
- Link to "Edit in Setup" for settings changes

Settings page (`/settings`) updated: added "Document Templates" entry linking to `/settings/documents`.

### Invoices List Modal

Updated to use `nx-modal-scrim` / `nx-modal` / `nx-modal-head` / `nx-modal-body` / `nx-modal-foot` classes. Added "View Full Invoice" link to `/invoices/[id]/document`.

---

## POS Stabilization Pass (2026-06-07)

Completed as a follow-up QA pass against `docs/claude.aidesign/app/pos.jsx`.

### Gaps Fixed

| Gap | Fix |
|-----|-----|
| `completeSale` never called `createInvoice` | Added `createInvoice(order.id)` immediately after `createOrder` |
| `completeSale` never wrote to session storage | Added `writePosLastOrderId(order.id)` before navigating |
| Sale success was local inline state (`lastSale`) | Replaced with `router.push("/pos/success")` via `useRouter` |
| Success page "Print Receipt" was a toast stub | Replaced with `window.print()` and actual `nx-receipt-*` DOM |
| Success page `View Invoice` linked to list page | Fixed to link to `/invoices/${invoice.id}/document` |
| Cart "Subtotal" showed `doc.subtotal` (gross) | Changed to `doc.net` with label "Net" (inclusive) or "Subtotal" (exclusive) |
| Customer picker and payment modals used raw inline styles | Applied `nx-modal-scrim` / `nx-modal` / `nx-modal-head` / `nx-modal-body` classes |
| Success page imported storage helpers directly from `@nexoraxs/shared` | Added `writePosLastOrderId`, `readPosLastOrderId`, `clearPosLastOrderId` to `@/lib/store` barrel; updated imports |

### Shared Storage Exports Added

`apps/commerce/lib/store/index.ts` now re-exports `writePosLastOrderId`, `readPosLastOrderId`, `clearPosLastOrderId` from `@nexoraxs/shared`, so no page or component needs to import directly from `@nexoraxs/shared`.

### Files Changed

- `apps/commerce/app/(commerce)/pos/page.tsx` — sale flow fixed; modals use `nx-modal-*`; totals label corrected
- `apps/commerce/app/(commerce)/pos/success/page.tsx` — receipt rendered with `nx-receipt-*` CSS; print button calls `window.print()`; imports through `@/lib/store`
- `apps/commerce/lib/store/index.ts` — POS session storage helpers added to barrel

---

## Remaining Scope Not Yet Started

| Area | Notes |
|------|-------|
| **Orders** | Orders list and order detail screens exist but were not part of this visual parity pass. |
| **Reports** | Analytics and reporting screens are not yet ported. |
| **Spec 042 manual QA tasks** | T061 (session persistence across routes), T062 (storage reset on localStorage clear), T065 (login `?reset=success` banner), T074 (final visual QA against prototype) are pending manual verification. |
