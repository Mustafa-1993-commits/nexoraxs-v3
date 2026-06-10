# Implementation Plan: Commerce Relationships, Multi-Branch Inventory, Transfers, and Returns MVP

**Branch**: `044-commerce-relationships-branches-transfers-returns` | **Date**: 2026-06-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/044-commerce-relationships-branches-transfers-returns/spec.md`

## Summary

The Workspace → Business → Branch hierarchy already exists in the data model and the active-context triple (`currentWorkspaceId`/`currentBusinessUnitId`/`currentBranchId`) is already maintained by `AppProvider`, but most Commerce screens (Dashboard, Orders, Invoices, Inventory, Reports, POS) currently scope only to the active Business, not the active Branch, and `CommerceProduct` still tracks a single legacy `stock`/`lowStockThreshold` pair instead of per-Branch quantities. This plan:

1. Adds branch-aware read scoping to Dashboard, Orders, Invoices, Inventory, Reports, and POS (US1/P1) by filtering the existing `orders`/`invoices` collections on `branchId === currentBranchId` for default views, while keeping direct-by-id access (with a Branch label) for cross-branch references.
2. Introduces a `BranchInventory` collection (one record per Product per Branch) plus an append-only `StockMovement` ledger in `packages/shared`'s mock-db, with a normalization path that derives a Branch's first-ever inventory record from `CommerceProduct.stock`/`lowStockThreshold` without mutating other Branches (US2/P2). `products` returned from `useApp()` continue to expose `stock`/`lowStockThreshold`, but those values are now branch-effective (merged from `BranchInventory`, falling back to the legacy product fields).
3. Adds an immediate `StockTransfer` action and a transfer-history view (US3/P3), built on top of the `BranchInventory`/`StockMovement` primitives from (2).
4. Adds a POS Returns/Refunds MVP (US4/P4): a new `computeReturnTotals(originalOrder, returnItems)` helper mirroring `computeDoc`'s rounding, a `CommerceReturn` record, restock-driven `StockMovement`/`BranchInventory` updates, extended `returnStatus`/`returnedTotal`/`returnIds` on `CommerceOrder` and `returnIds` on `CommerceInvoice`, a printable Return Receipt / Credit Note document, and Reports/Dashboard updates that show Gross Sales, Returns, and Net Sales per Branch.

All new types live in `packages/types`, all new pure helpers/selectors live in `packages/shared/src/mock-db` and `packages/shared/src/commerce/documents.ts`, all new persisted collections are added to `STORAGE_KEYS` (auto-covered by `clearAllStorage`), and `AppProvider` remains the sole place pages/components touch storage — consistent with the existing 043 patterns and Articles V/XVI. New user-facing strings are added to the `en`/`ar` `DICT` (Article XI), and "Business Unit"/"BU" never appears in UI copy (FR-003/SC-009).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), React 19, Next.js 16 (App Router)
**Primary Dependencies**: `@nexoraxs/shared` (mock-db schema/selectors/actions/storage/seed + `commerce/documents`), `@nexoraxs/types`, `@nexoraxs/ui`, lucide-react, Tailwind v4 (`commerce-theme.css`)
**Storage**: Browser `localStorage`/`sessionStorage` only, via the existing `readCollection`/`writeCollection`/`readSession`/`writeSession`/`clearAllStorage` mock-db abstraction — no backend (Article XV)
**Testing**: `tsc --noEmit`, `eslint`, and `next build` per app, plus root `pnpm build`/`pnpm lint` — no automated test runner in this MVP, same as 043
**Target Platform**: Web browsers; Commerce OS app (`apps/commerce`, port 3002) is the primary surface; new shared types/selectors are also available to `apps/core-platform` (port 3001) but no Core Platform screens change in this feature
**Project Type**: Web monorepo (pnpm workspaces + Turborepo) — `packages/types` and `packages/shared` gain new exports; `apps/commerce` consumes them
**Performance Goals**: Demo-grade; branch switches, transfers, and returns reflect instantly in the UI (no network round-trip, all in-memory + localStorage)
**Constraints**: All new persisted data goes through the shared mock-db layer (FR-025, Article XVI — no direct `localStorage`/`sessionStorage` access in pages or components); every new entity carries `workspaceId`/`businessUnitId`/`branchId` as applicable (Article V); no user-facing "Business Unit"/"BU"/"Default Business Unit" strings (FR-003, SC-009); all new labels available in `en` and `ar` with RTL/LTR readiness (FR-024, Article XI)
**Scale/Scope**: Demo-scale — one Workspace, 1+ Businesses, 2-5 Branches per Business, tens of Products/Orders/Returns/Transfers; no pagination or performance tuning required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| Article II — Core Platform Boundary | PASS | `BranchInventory`, `StockMovement`, `StockTransfer`, `CommerceReturn` are Commerce-domain types added to the shared `packages/types`/`packages/shared` packages (which are framework-agnostic, not "Core Platform" business logic) and consumed only by `apps/commerce`. No Core Platform app/screen changes. |
| Article IV — Workspace/Business Unit/Branch Model | PASS | The `BusinessUnit`/`Branch` data model and active-context triple already exist (Phase 2). This feature only changes which collections are filtered by `currentBranchId` and adds new Branch-scoped entities; it introduces no new typed-workspace concepts and keeps "Business Unit" internal-only per FR-003. |
| Article V — Multi-Tenant Data Isolation | PASS | Every new entity (`BranchInventory`, `StockMovement`, `StockTransfer`, `CommerceReturn`) carries `workspaceId`, `businessUnitId`, and `branchId`/`fromBranchId`+`toBranchId` as documented in `data-model.md`. All reads/writes go through `AppProvider`, scoped by the active context. |
| Article IX — Commerce OS Boundary | PASS | "Inventory and Branch Inventory", "Reports", "Branches", and "Document Templates" are explicitly listed as Commerce Core capabilities; this feature implements exactly those, plus Orders/Invoices extensions, with no parallel order/inventory/invoice systems. |
| Article XI — Localization First | PASS | All new labels (Branch Inventory, Stock Transfer, Return/Refund/Credit Note, report headers) are added to `DICT.en`/`DICT.ar` in `packages/shared/src/mock-db/schema.ts`; the Return Receipt reuses the existing `.nx-receipt`/`.nx-invoice`/`.nx-print-hide` print patterns, which are already RTL-ready. |
| Article XII — Document Templates as Platform Pattern | PASS | The Return Receipt / Credit Note is a new Commerce document type added alongside the existing POS receipt and tax invoice templates, following the same `computeDoc`-style calculation + printable-page pattern (`/invoices/[id]/document` → `/returns/[id]/document`). |
| Article XV — MVP Discipline | PASS | No backend/Laravel/Postgres work; all new data is local/mock via `packages/shared`. Stock Transfer has no approval workflow (FR-011) and Returns are recorded locally without a payment-gateway call, matching "Out of Scope". |
| Article XVI — Engineering Rules | PASS | New types in `packages/types` and new pure helpers/selectors in `packages/shared` contain no business logic beyond pure calculation (mirroring `computeDoc`, `nxRevenue`, etc.); `apps/commerce` does not import from `apps/core-platform`; TS strict mode is preserved; pages/components continue to access data only via `useApp()` (no new direct `localStorage` access). |

**Result**: All gates PASS. No entries required in Complexity Tracking.

**Post-Design Re-check** (after Phase 1: `data-model.md`, `contracts/shared-mock-db-contract.md`, `quickstart.md`): The finalized design introduces no Core Platform changes (Article II), adds no new typed-workspace concepts and keeps Business Unit internal-only (Article IV), gives every new entity `workspaceId`/`businessUnitId`/and `branchId` (or `fromBranchId`/`toBranchId`) per `data-model.md` (Article V), implements only Commerce-listed capabilities — Branch Inventory, Reports, Branches, Document Templates (Article IX), routes all new labels through `DICT.en`/`DICT.ar` (Article XI), adds the Return Receipt as a new document type alongside existing templates (Article XII), keeps Stock Transfer approval-free and avoids any backend work (Article XV), and confines all new logic to pure helpers/selectors in `packages/shared` plus orchestration in `AppProvider`, with pages consuming only `useApp()` (Article XVI). All gates remain PASS; no Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/044-commerce-relationships-branches-transfers-returns/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/
│   └── shared-mock-db-contract.md   # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/types/src/
└── commerce.ts                     # Add BranchInventory, StockMovement, StockTransfer, CommerceReturn,
                                     # CommerceReturnItem types; extend CommerceOrder (returnStatus,
                                     # returnedTotal, returnIds) and CommerceInvoice (returnIds)

packages/shared/src/
├── mock-db/
│   ├── schema.ts                   # Add STORAGE_KEYS: branchInventory, stockMovements, stockTransfers,
│   │                                # commerceReturns; add new en/ar DICT keys
│   ├── actions.ts                  # Add pure builders: buildStockMovement, buildStockTransfer,
│   │                                # buildCommerceReturn, effectiveStockFor (legacy-fallback merge)
│   ├── selectors.ts                # Add nxBranchInventoryMap, nxReturnsForPeriod, nxNetSales
│   │                                # (gross/returns/net per branch); extend SalesGroup-style helpers
│   ├── storage.ts                  # No structural change — new STORAGE_KEYS auto-covered by
│   │                                # Object.values(STORAGE_KEYS) in clearAllStorage
│   ├── seed.ts                     # No change to seeded entity counts; document normalization path
│   └── index.ts                    # Re-export new actions/selectors
└── commerce/
    └── documents.ts                # Add computeReturnTotals(originalOrder, returnItems) mirroring
                                     # computeDoc's tax/rounding rules

apps/commerce/lib/store/
├── AppProvider.tsx                 # Load/persist new STORAGE_KEYS; branch-scope products/orders/invoices
                                     # by currentBranchId for default views; add branchInventory state +
                                     # actions: transferStock, createReturn, adjustStock; merge
                                     # BranchInventory into `products[].stock`/`lowStockThreshold`
└── index.ts                        # Re-export new types/selectors/actions

apps/commerce/app/(commerce)/
├── dashboard/page.tsx              # Branch-scoped KPIs; show Gross/Returns/Net for the active Branch
├── orders/page.tsx                 # Branch-filtered list; Branch label column
├── orders/[id]/page.tsx            # Branch label for cross-branch orders; "Return" action; return-status badge
├── invoices/page.tsx               # Branch-filtered list
├── invoices/[id]/page.tsx          # Link to associated Return(s) when present
├── invoices/[id]/document/page.tsx # Unchanged totals; optional "Return issued" reference note
├── inventory/page.tsx              # Branch Inventory view/edit (replaces direct product.stock edit)
├── inventory/transfers/page.tsx    # NEW — Stock Transfer form + transfer history table
├── reports/page.tsx                # Branch-scoped; Gross Sales / Returns / Net Sales breakdown
├── pos/page.tsx                    # Branch-scoped product stock display/deduction via BranchInventory
└── returns/[id]/document/page.tsx  # NEW — printable Return Receipt / Credit Note
```

**Structure Decision**: Reuse the existing monorepo layout (Option: web monorepo, already in place). New domain concepts (`BranchInventory`, `StockMovement`, `StockTransfer`, `CommerceReturn`) are added to `packages/types` + `packages/shared/src/mock-db` and `packages/shared/src/commerce`, mirroring exactly how 043 added Branch/BusinessUnit/MediaAsset concepts. `apps/commerce` is the only app whose pages/routes change; two new routes are added (`inventory/transfers`, `returns/[id]/document`) following the existing route-per-document/route-per-workflow conventions (`invoices/[id]/document`, `pos/success`).

## Complexity Tracking

> Not applicable — Constitution Check has no violations.
