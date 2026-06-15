# Implementation Plan: MVP End-to-End Flow Stabilization with Storage Quota

**Branch**: `043-mvp-end-to-end-flow` | **Date**: 2026-06-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/043-mvp-end-to-end-flow/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Stabilize the complete mock-data MVP journey — Register → Welcome → Core Onboarding → Core Dashboard → Product Hub → Commerce handoff → Setup Wizard → Commerce Dashboard → Add Product (with image) → POS Sale (customer + cashier identity) → Order/Invoice/Receipt → Customers/Inventory/Reports — across `apps/core-platform` and `apps/commerce`, while introducing a workspace-level storage-quota and `MediaAsset` model into the shared mock-db layer. The approach is additive and corrective: extend `packages/types` and `packages/shared/src/mock-db` with `MediaAsset`/`WorkspaceStorageUsage` types, selectors, and actions (including image compression + quota-checked save helpers and `cashierId`/`cashierName` capture on orders); wire those into existing `AppProvider`s in both apps; and close the remaining gaps in existing screens (Welcome routing, cashier display in Checkout/receipt/invoice, storage-usage cards in Billing/Settings). No backend, payment, object-storage, or new-OS work is introduced — everything stays inside the existing local/demo persistence layer and prototype-aligned UI.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), React 19, Next.js 16 (App Router)
**Primary Dependencies**: `@nexoraxs/shared` (mock-db, selectors, actions, i18n, document calc), `@nexoraxs/types`, `@nexoraxs/ui` (shared styles only), `lucide-react`, Tailwind CSS v4
**Storage**: Browser `localStorage`/`sessionStorage` only, accessed exclusively through `packages/shared/src/mock-db` (`storage.ts`, `actions.ts`, `selectors.ts`) — no real database or object storage in MVP
**Testing**: No automated test runner configured for these apps; validation is `tsc --noEmit`, `eslint` (`lint`), and `next build` per app (plus root `pnpm build`/`pnpm lint`), supplemented by manual walkthroughs of the acceptance scenarios in spec.md
**Target Platform**: Web browsers (desktop, tablet, mobile) — Core Platform on port 3001, Commerce on port 3002
**Project Type**: Web monorepo (pnpm workspaces + Turborepo) — multiple Next.js apps sharing internal packages
**Performance Goals**: Local/demo-grade — interactions remain instant (no network latency); image compression must complete client-side without perceptibly blocking the UI (target: under ~1s for typical photos)
**Constraints**: No Laravel/backend integration, no real payment gateway, no real object storage (S3/R2), no online-store frontend, no new OS beyond visible Coming Soon/Locked states; must not introduce `QuotaExceededError`; must preserve existing prototype-aligned visuals; `packages/ui` stays UI-only; no app-to-app imports; no direct `localStorage`/`sessionStorage` access from pages/components
**Scale/Scope**: Single demo workspace per browser session, on the order of tens of products/orders/customers — sized for local demo and sales walkthroughs, not production load

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| Article II — Core/Commerce boundary respected | PASS | Core Platform gets only OS-subscription/handoff/storage-quota *display*; all commerce domain logic (products, POS, orders, invoices, customers, tax, media usage) stays in `apps/commerce`. `MediaAsset`/`WorkspaceStorageUsage` live in shared mock-db (platform infrastructure pattern, like audit logs/notifications), not inside either app's domain code. |
| Article III — OS independence | PASS | No cross-OS dependency introduced; Commerce continues to function without any other OS. |
| Article IV — Workspace/BU/Branch model & hidden BU | PASS | Spec explicitly keeps "Default Business Unit" hidden from UI copy (FR-004, FR-025) while preserving the internal `Workspace → BusinessUnit → Branch` structure already in `packages/types`/mock-db. No new typed-workspace concepts introduced. |
| Article V — Tenant data isolation | PASS | All new/extended records (`MediaAsset`, `WorkspaceStorageUsage`, `CommerceOrder.cashierId/cashierName`) carry `workspaceId` (+ `businessUnitId`/`branchId` where applicable), consistent with existing `CommerceProduct`/`CommerceOrder` shapes. |
| Article VI — OS subscription/access model | PASS | No change to subscription state machine; handoff context (FR-007) reuses existing `OSSubscription`/session-context patterns already in `STORAGE_KEYS`. |
| Article VII — Plans & limits | PASS | Storage limits are added as an attribute of the existing `PLAN_CATALOG` tiers (Starter/Pro/Business), not a new pricing model. |
| Article IX — Commerce OS boundary | PASS | Products, POS, inventory, orders, customers, invoices, tax, reports, document templates, and "commerce media usage" remain entirely inside Commerce OS per Article IX's explicit list; Commerce still creates orders/inventory/invoices only through its existing Core actions (`createOrder`, `createInvoice`, `addProduct`, etc.) — no parallel systems. |
| Article XI — Localization first | PASS | All new user-facing strings (storage usage labels, image-too-large/quota toasts, cashier labels) are added through the existing `t()`/`DICT` i18n mechanism in `packages/shared/src/mock-db/schema.ts` for both `en` and `ar`; no hardcoded new strings. |
| Article XII — Document templates | PASS | Receipt/invoice changes (cashier name, logo-by-reference) extend the existing Commerce document-template pattern (`packages/shared/src/commerce/documents.ts` + setup-driven templates) rather than creating a new document system. |
| Article XV — MVP discipline | PASS | Scope matches the listed MVP focus areas (Business Identity, Products/Inventory, POS+receipt/invoice, Orders/Invoices/Reports, Billing/OS subscription). No "do not build now" items (full other-OS builds, real backend, real cross-OS bus) are touched. |
| Article XVI — Engineering rules | PASS | TypeScript strict, no new `any`; loading/empty/error states preserved/extended; storage access stays isolated in shared mock-db helpers (`writeCollection` already catches `QuotaExceededError` — extended with pre-flight quota checks rather than bypassed); apps continue to import only from `@nexoraxs/*` packages, never from each other or from `docs/claude.aidesign`. |

**Result**: No violations requiring justification. Complexity Tracking section is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/043-mvp-end-to-end-flow/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command) — AppProvider action/selector contracts
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/types/src/
├── core.ts              # add WorkspaceStorageUsage, MediaAsset, plan-limit shape additions
├── commerce.ts          # extend CommerceOrder/CommerceInvoice with cashierId/cashierName; OrderItem stays image-free
└── index.ts             # re-export new types

packages/shared/src/
├── mock-db/
│   ├── schema.ts        # STORAGE_KEYS additions (mediaAssets, workspaceStorageUsage), PLAN_CATALOG storage limits, new i18n keys (en/ar)
│   ├── selectors.ts     # storage-usage selectors (used/limit/percentage), media-asset selectors
│   ├── actions.ts       # image compression + size-estimation helpers, quota-check helper, media-asset creation helper
│   ├── storage.ts       # no structural change; reset helper extended to clear new keys
│   └── seed.ts          # seed default WorkspaceStorageUsage per seeded workspace
└── commerce/
    └── documents.ts     # no calculation changes; confirm cashier passthrough for invoice rendering helpers if needed

apps/core-platform/
├── lib/store/AppProvider.tsx   # expose storage-usage selectors/state to Core screens; ensure handoff context includes required identifiers
├── app/welcome/page.tsx        # confirm/adjust routing guard so registration lands here (not Product Hub)
├── app/onboarding/...          # confirm BU stays hidden in copy; branch creation flow unchanged
├── app/dashboard/page.tsx      # add storage-usage summary card
├── app/dashboard/apps/...      # Product Hub — confirm OS catalog + handoff context build
└── app/dashboard/billing/...   # add plan limits + storage usage display

apps/commerce/
├── lib/store/AppProvider.tsx   # add MediaAsset/WorkspaceStorageUsage state + actions, image compression on addProduct/setup logo, cashier capture on createOrder, sanitizeProductForStorage updated to keep small thumbnails
├── app/setup/...               # Step 1 logo upload → MediaAsset + quota check; Step 8 review storage line
├── app/(commerce)/dashboard/...# storage/media usage summary card, identity/branch display per FR-025..027
├── app/(commerce)/products/new/... # image compression + quota-aware save + toasts (FR-030)
├── app/(commerce)/pos/page.tsx     # cashier display in Checkout, complete-sale sequence ordering (FR-036), success-screen receipt fields
├── app/(commerce)/orders/...   # cashier column/field in list + detail
├── app/(commerce)/invoices/... # cashier/salesperson on invoice document
├── app/(commerce)/customers/...# unchanged structurally; verify drawer + scoping
├── app/(commerce)/reports/...  # confirm derived-selector reuse; no new calculation logic in pages
└── app/(commerce)/settings/... # storage/media usage card, identity/logo/numbering/template edit surfaces
```

**Structure Decision**: Existing pnpm-workspace monorepo layout is reused as-is (Option: Web application, multi-app variant — `apps/core-platform` + `apps/commerce` + shared `packages/*`). No new apps or packages are created. All new shared concepts (`MediaAsset`, `WorkspaceStorageUsage`, compression/quota helpers, cashier capture) are added to `packages/types` and `packages/shared/src/mock-db`, consumed by both apps' existing `AppProvider` contexts — matching the platform-infrastructure placement the constitution prescribes for cross-cutting concerns like audit logs/notifications/storage quota.

## Complexity Tracking

> Not applicable — Constitution Check reported no violations.
