---

description: "Task list for MVP End-to-End Flow Stabilization with Storage Quota"
---

# Tasks: MVP End-to-End Flow Stabilization with Storage Quota

**Input**: Design documents from `/specs/043-mvp-end-to-end-flow/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in the spec (no automated test runner is configured for these Next.js apps — see plan.md Technical Context). Validation is via `tsc --noEmit`/`lint`/`build` plus the manual quickstart.md walkthrough; no test tasks are generated.

**Organization**: Tasks are grouped by user story (from spec.md, in priority order P1 → P2 → P3) so each can be implemented and demoed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 — maps to the user stories in spec.md
- File paths are exact and relative to the repository root

## Path Conventions

This is the existing pnpm + Turborepo monorepo (no new projects created):
- `apps/core-platform/` — Core Platform (port 3001)
- `apps/commerce/` — Commerce OS (port 3002)
- `packages/types/`, `packages/shared/`, `packages/ui/` — shared internal packages

---

## Phase 1: Setup

**Purpose**: Establish a clean, verified starting point — no new project scaffolding is needed (existing monorepo).

- [X] T001 [P] Confirm the baseline compiles cleanly before changes: run `pnpm --filter core-platform exec tsc --noEmit`, `pnpm --filter commerce exec tsc --noEmit`, `pnpm --filter core-platform lint`, `pnpm --filter commerce lint`; record any pre-existing failures so they aren't mistaken for regressions later
- [X] T002 In a browser, run the existing demo "reset" (or clear `localStorage`/`sessionStorage` for both `localhost:3001` and `localhost:3002`) so the walkthrough in quickstart.md starts from a zero-usage, zero-data workspace

**Checkpoint**: Clean baseline confirmed; ready to add foundational infrastructure.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types, storage keys, i18n strings, plan-limit data, pure helpers, and seed/reset coverage that User Stories 1 and 2 both depend on (storage quota + media assets are exercised first by the Setup Wizard logo in US1, then by product images in US2).

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T003 [P] Add `WorkspaceStorageUsage`, `MediaAsset`, and `MediaOwnerType` interfaces to `packages/types/src/core.ts` and re-export them from `packages/types/src/index.ts`, exactly per the shapes in `specs/043-mvp-end-to-end-flow/data-model.md` and `contracts/shared-mock-db-contract.md` §A
- [X] T004 [P] In `packages/shared/src/mock-db/schema.ts`: add `STORAGE_KEYS.mediaAssets = "nexoraxs.db.mediaAssets"` and `STORAGE_KEYS.workspaceStorageUsage = "nexoraxs.db.workspaceStorageUsage"`, and add new `en`/`ar` dictionary entries for `storage_used`, `media_storage_used`, `image_too_large`, `storage_limit_reached`, and `cashier` to the `DICT` object (contracts §B)
- [X] T005 [P] In `packages/shared/src/mock-db/schema.ts`, add `storageLimitBytes` to each `PLAN_CATALOG` tier's `limits` object: `commerce_starter` → `500 * 1024 * 1024`, `commerce_pro` → `5 * 1024 * 1024 * 1024`, `commerce_business` → `50 * 1024 * 1024 * 1024` (data-model.md "Extended Catalog: PLAN_CATALOG")
- [X] T006 [P] Add pure selectors `storageUsagePercent(usage)`, `formatBytes(bytes, lang?)`, and `remainingBytes(usage)` to `packages/shared/src/mock-db/selectors.ts`, following the existing style of `money`/`taxBreak`/`nxOrderTotal` (contracts §B)
- [X] T007 [P] Add pure helpers `compressImageToThumbnail(file, opts?)` (Canvas-based, SSR-safe, returns `null` on failure/oversize), `canAttachMedia(usage, candidateBytes)`, `buildMediaAsset(input)`, and `applyUsageDelta(usage, deltaBytes)` to `packages/shared/src/mock-db/actions.ts`, matching the signatures in `contracts/shared-mock-db-contract.md` §B (no `localStorage` access inside these — pure calculation/factory functions only)
- [X] T008 In `packages/shared/src/mock-db/seed.ts`, seed one zeroed `WorkspaceStorageUsage` record per seeded workspace (`usedBytes: 0`, `limitBytes` sourced from the seeded subscription's plan via `PLAN_CATALOG`, `updatedAt: nowISO()`)
- [X] T009 Verify `clearAllStorage()` in `packages/shared/src/mock-db/storage.ts` clears the two new collections (it iterates `Object.values(STORAGE_KEYS)`, so adding the keys in T004 should be sufficient — confirm and adjust any bespoke reset/seed-reinitialization action if one exists outside `clearAllStorage`)

**Checkpoint**: Shared types, storage keys, i18n strings, plan limits, selectors, compression/quota helpers, seeding, and reset coverage are all in place — both apps can now build on a consistent storage-quota/media-asset foundation.

---

## Phase 3: User Story 1 - New business owner sets up their workspace and commerce business (Priority: P1) 🎯 MVP

**Goal**: A brand-new user can register, get welcomed, complete Core Onboarding, reach the Core Dashboard, discover and start Commerce OS from the Product Hub, and finish the 8-step Commerce Setup Wizard — landing on a Commerce Dashboard that correctly shows their business identity, logo, branch, and storage usage.

**Independent Test**: Register a brand-new account, complete onboarding and the setup wizard (including uploading a logo), and verify you land on a Commerce Dashboard showing the correct business name, logo, and branch, with a visible storage-usage figure that increased from the logo upload — without needing POS, products, or orders to exist.

### Implementation for User Story 1

- [ ] T010 [US1] Verify/adjust post-registration routing so a newly registered user lands on Welcome (not the Product Hub or Dashboard) while an existing user who logs in goes straight to the Core Dashboard, in `apps/core-platform/app/register/page.tsx` and `apps/core-platform/app/welcome/page.tsx` (FR-001/FR-002)
- [ ] T011 [P] [US1] Verify the Welcome screen's copy and CTA introduce NexoraXS, explain workspace setup, and route to Core Onboarding on continue, in `apps/core-platform/app/welcome/page.tsx` (FR-001)
- [ ] T012 [US1] Verify the Core Onboarding flow collects workspace/company name, country, currency, timezone, language, and main branch name/location; creates the Workspace, an internal default Business Unit, and the Main Branch silently; and never surfaces "Business Unit"/"Default Business Unit" in any user-facing copy (only "Workspace"/"Branch"), across `apps/core-platform/app/onboarding/page.tsx` and `apps/core-platform/components/onboarding/steps/StepWorkspace.tsx`, `StepBranch.tsx`, `StepBusinessUnit.tsx`, `StepLanguage.tsx` (FR-003/FR-004)
- [ ] T013 [P] [US1] Expose `workspaceStorageUsage`, `storageUsagePercent`, and `storageUsageLabel` (e.g., `"12 MB / 500 MB"`, derived via the new shared selectors from T006) on the `AppContextType` and provider value in `apps/core-platform/lib/store/AppProvider.tsx`
- [ ] T014 [US1] Add a storage-usage summary card (e.g., "Storage used: 12 MB / 500 MB") to the Core Dashboard, styled consistently with existing summary/overview cards, in `apps/core-platform/app/dashboard/page.tsx` (FR-005/FR-009)
- [ ] T015 [P] [US1] Add a plan-limits + storage-usage section (used / limit / percentage, from `useApp()`) to Core Billing, in `apps/core-platform/app/dashboard/billing/page.tsx` (FR-045)
- [ ] T016 [US1] Verify the Product Hub renders Commerce OS in its current state (available/start/continue/active) and the other five OS catalog entries (HR, CRM, Healthcare, Gym, Maintenance) as Coming Soon/locked, in `apps/core-platform/app/dashboard/apps/page.tsx` (FR-006)
- [ ] T017 [US1] Verify/adjust the "Start Commerce OS" action so it creates-or-reuses the workspace's `OSSubscription`, keeps the internal Business Unit and current Branch associated, and builds a complete handoff context (currentUserId, currentWorkspaceId, currentBusinessUnitId, currentBranchId, currentOSSubscriptionId, currentOSId="commerce", workspaceName, userName, userEmail, branchName, businessUnitName [internal only], plan/planId, businessPreset if known) before routing into the Commerce app, in `apps/core-platform/lib/store/AppProvider.tsx` (`selectOS`/handoff logic) and `apps/core-platform/app/dashboard/apps/page.tsx` (FR-007)
- [X] T018 [US1] Add `mediaAssets`, `workspaceStorageUsage`, `storageUsagePercent`, `storageUsageLabel`, and an `attachMedia(input)` action to the `AppContextType`/provider value in `apps/commerce/lib/store/AppProvider.tsx`; `attachMedia` must compress (via `compressImageToThumbnail`), check quota (via `canAttachMedia`), persist a `MediaAsset` (via `buildMediaAsset` + `writeCollection(STORAGE_KEYS.mediaAssets, …)`), apply the usage delta (via `applyUsageDelta` + `writeCollection(STORAGE_KEYS.workspaceStorageUsage, …)`), and show the `t("image_too_large")` / `t("storage_limit_reached")` toast and return `null` on failure — exactly per `contracts/shared-mock-db-contract.md` §C (FR-010–FR-014)
- [ ] T019 [US1] Verify the Commerce setup guard detects an incomplete `CommerceSetup` and routes the user into the 8-step Setup Wizard before allowing access to the Commerce Dashboard, in `apps/commerce/app/setup/page.tsx` and `apps/commerce/app/setup/layout.tsx` (FR-016)
- [ ] T020 [US1] Wire Setup Wizard Step 1 (Business Identity) logo upload to call `attachMedia({ ownerType: "business_logo", ... })`, render the live preview from the returned `thumbnailUrl`, and store only the lightweight reference on `CommerceSetup.logo` (never a raw file/blob), ensuring the display name is never concatenated with the branch name, in `apps/commerce/app/setup/page.tsx` (FR-017)
- [X] T021 [P] [US1] Verify Setup Wizard Steps 2–7 (Business Preset, Operational Mode, Tax Setup, Numbering, Templates with live preview, Categories & Units seeded from the preset) collect all fields listed in spec.md §4 and route any tax-affecting preview through the shared `computeDoc`/document helpers from `@nexoraxs/shared` rather than page-local calculations, in `apps/commerce/app/setup/page.tsx` (FR-018–FR-023)
- [X] T022 [US1] Verify/extend Setup Wizard Step 8 (Review) to summarize workspace, business name, branch, Commerce OS, preset, operational mode, VAT setup, numbering, templates, categories, enabled vs. recommended modules, and the storage plan with current usage (e.g., "Starter storage 500 MB · 12 MB used"), and that "Finish Setup" persists `CommerceSetup`, marks setup complete, and routes to the Commerce Dashboard, in `apps/commerce/app/setup/page.tsx` (FR-024)
- [X] T023 [US1] Verify the Commerce shell identity rendering: sidebar shows business display name + uploaded logo (object-fit: contain, ~34px, no crop/opacity/grayscale) as the main identity and branch name as a clearly separate subtitle element — never combined, never showing the internal Business Unit name or preset as the business name — in `apps/commerce/components/shell/CommerceShell.tsx` (and `Shell.tsx` if shared) (FR-025/FR-026)
- [X] T024 [P] [US1] Add a storage/media-usage summary line to the Commerce Dashboard's identity/quick-glance area, in `apps/commerce/app/(commerce)/dashboard/page.tsx` (FR-027)

**Checkpoint**: User Story 1 is fully functional and independently demoable — a brand-new account can be walked from registration to a correctly-identified, fully-configured Commerce Dashboard with visible storage usage.

---

## Phase 4: User Story 2 - Store operator adds products with images and tracks storage usage (Priority: P2)

**Goal**: A store operator can add a product with an image, see it (with thumbnail) consistently across Products, POS, and Inventory, and watch the workspace's storage-usage figure grow — with graceful, non-blocking handling when an image is too large or the quota would be exceeded.

**Independent Test**: From an already-configured workspace (US1 complete), add a product with a normal photo and confirm the thumbnail appears in Products/POS/Inventory and storage usage increases; then add a product with a deliberately oversized photo and confirm the product still saves (without the image) with a clear toast — independent of completing any sale.

### Implementation for User Story 2

- [X] T025 [US2] Narrow the image-stripping predicate in `apps/commerce/lib/store/AppProvider.tsx`: replace the current `isPersistableProductImage` (which strips every `data:`/`blob:` image) with logic that **keeps** small, already-quota-checked thumbnail references (the `image`/`mediaAssetId` produced by `attachMedia`) while still stripping raw files, blob objects, `imagePreview`, `businessLogo`, `logo`, and any oversized data URL — update `sanitizeProductForStorage`/`sanitizeProductPatch` accordingly (research.md §5, FR-048)
- [X] T026 [US2] Update `addProduct` in `apps/commerce/lib/store/AppProvider.tsx` to: when an image file is supplied, call `attachMedia({ ownerType: "product_image", ownerId: <new product id>, ... })`, attach the returned lightweight reference (or `null`) to the product's `image` field, and **always** persist the product record regardless of whether the image attach succeeded (FR-013/FR-030)
- [X] T027 [US2] Update the Add Product screen to pass the selected file through the provider's image flow, render the compressed-thumbnail preview on success, and surface (without blocking save) the "Image was too large for demo storage, product saved without image." / "Storage limit reached. Product saved without image." toasts already raised by `attachMedia`, in `apps/commerce/app/(commerce)/products/new/page.tsx` (FR-030)
- [X] T028 [P] [US2] Verify the Products list renders the saved thumbnail when present and a placeholder when absent, in `apps/commerce/app/(commerce)/products/page.tsx` (FR-029)
- [X] T029 [P] [US2] Verify the POS product grid renders the saved thumbnail when present and a placeholder when absent, in `apps/commerce/app/(commerce)/pos/page.tsx` (FR-029)
- [X] T030 [P] [US2] Verify Inventory shows stock quantity, low-stock detection/threshold, and product thumbnails consistently with Products/POS, in `apps/commerce/app/(commerce)/inventory/page.tsx` (FR-029/FR-031)
- [X] T031 [P] [US2] Add a "Media storage used by this business" summary (used/limit/percentage, from `useApp()`) to Commerce Settings, styled consistently with existing settings cards, in `apps/commerce/app/(commerce)/settings/page.tsx` (FR-015/FR-044)

**Checkpoint**: User Stories 1 AND 2 both work independently — products with images flow end-to-end and the storage-usage indicator visibly reflects every upload, all without requiring a POS sale.

---

## Phase 5: User Story 3 - Cashier completes a sale capturing customer and cashier identity (Priority: P3)

**Goal**: A cashier can run a full POS sale — search/cart/checkout, optional customer selection or creation without losing the cart, automatic cashier-identity capture, and a generated order/invoice/receipt — and see the result reflected across Orders, Invoices, Customers, Inventory, and Reports.

**Independent Test**: From a configured workspace with at least one product (US1 + US2 complete), run a complete POS sale with and without selecting a customer, and verify the resulting order, invoice, and receipt all show the correct cashier identity, totals, and business identity, and that Orders/Invoices/Customers/Inventory/Reports all update accordingly.

### Implementation for User Story 3

- [X] T032 [P] [US3] Add `cashierId: string` and `cashierName: string` fields to the `CommerceOrder` and `CommerceInvoice` interfaces in `packages/types/src/commerce.ts` (data-model.md "Extended Entity: CommerceOrder/CommerceInvoice")
- [X] T033 [US3] Inside `createOrder`, populate `cashierId`/`cashierName` from `state.currentUser.id` / `getUserDisplayName(state.currentUser)` (fallback literal `"Cashier"`); inside `createInvoice`, copy `order.cashierId`/`order.cashierName` onto the invoice — both in `apps/commerce/lib/store/AppProvider.tsx` (FR-033/FR-036, research.md §4)
- [X] T034 [US3] Add a "Cashier: {name}" row to the Checkout ("Complete Sale") modal, sourced directly from `useApp().currentUserDisplayName` with no manual entry field, in `apps/commerce/app/(commerce)/pos/page.tsx` (FR-033)
- [X] T035 [US3] Verify the customer-picker and add-customer overlays remain layered above the open Checkout modal (Checkout → picker → add-customer, never closing Checkout, never losing the cart, never navigating away from POS) and that saving/selecting a customer leaves Checkout open with that customer applied, in `apps/commerce/app/(commerce)/pos/page.tsx` (FR-034/FR-035)
- [X] T036 [US3] Verify the Complete Sale handler executes in order — validate non-empty cart → resolve customer or null → capture cashier identity → `createOrder` → deduct stock via `updateProduct` → `createInvoice` → store the last-order reference → navigate to the success route — and that no product image or business-logo payload is copied into order/invoice items, in `apps/commerce/app/(commerce)/pos/page.tsx` and `apps/commerce/lib/store/AppProvider.tsx` (FR-036/FR-037)
- [X] T037 [P] [US3] Verify the POS success screen and receipt preview display business name, logo (by reference), branch, cashier name, receipt/invoice number, date/time, items, quantities, prices, discount, VAT, total, payment method, and customer (if selected), with working Print / View Invoice / New Sale actions and preserved print CSS, in `apps/commerce/app/(commerce)/pos/success/page.tsx` (FR-038)
- [X] T038 [P] [US3] Add the cashier/salesperson name to the Orders list (where space allows) and order detail view, in `apps/commerce/app/(commerce)/orders/page.tsx` and `apps/commerce/app/(commerce)/orders/[id]/page.tsx` (FR-039)
- [X] T039 [P] [US3] Add cashier/salesperson display to the invoice document/list (deriving from the linked order when needed), computed via shared `computeDoc`/document helpers from `packages/shared/src/commerce/documents.ts` rather than page-local tax logic, in `apps/commerce/app/(commerce)/invoices/page.tsx` and `apps/commerce/app/(commerce)/invoices/[id]/page.tsx` (FR-040)
- [X] T040 [P] [US3] Verify Customers list/drawer/full-profile correctly reflect POS-created customers — KPI cards, search, table fields, drawer-on-row-click (not direct navigation), "View full profile" routing, and existing add/edit features preserved — in `apps/commerce/app/(commerce)/customers/page.tsx` and `apps/commerce/app/(commerce)/customers/[id]/page.tsx` (FR-041/FR-042)
- [X] T041 [P] [US3] Verify Reports derive sales totals, order counts, VAT collected, new customers, and best sellers from the updated order/invoice/customer/product data using shared selectors (no new calculation logic in the page), in `apps/commerce/app/(commerce)/reports/page.tsx` (FR-043)

**Checkpoint**: All three user stories are independently functional — the full MVP journey from registration through a completed, correctly-attributed sale works end-to-end.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final checks that span multiple stories — responsiveness, localization, reset coverage, full walkthrough validation, and documentation.

- [X] T042 [P] Verify the demo "reset" clears `mediaAssets` and `workspaceStorageUsage` (building on T009) and that a freshly reset workspace re-seeds with zeroed usage, across `apps/core-platform` and `apps/commerce`
- [X] T043 [P] Verify responsive behavior at tablet/mobile widths — fixed sidebar vs. hamburger/drawer in both shells, dashboard card stacking, Products/Inventory tables, POS product grid/cart/checkout/customer modals, customer drawer as full-screen sheet, and the Setup Wizard — with no horizontal overflow, per FR-047
- [X] T044 [P] Verify every new user-facing string introduced by this feature (storage-usage labels, image/quota toasts, cashier label) is sourced from `t()`/`DICT` with both `en` and `ar` entries (added in T004) and renders correctly in RTL, per Article XI
- [ ] T045 Run the full `specs/043-mvp-end-to-end-flow/quickstart.md` walkthrough end-to-end (steps 1–19) in the browser and confirm zero `QuotaExceededError` occurrences and that every acceptance scenario in spec.md §21 (items 1–26) passes
- [ ] T046 Run the validation command suite from plan.md/quickstart.md — `pnpm --filter core-platform exec tsc --noEmit`, `lint`, `build`; `pnpm --filter commerce exec tsc --noEmit`, `lint`, `build`; root `pnpm build` and `pnpm lint` — and resolve any failures
- [ ] T047 [P] Add a short documentation note (e.g., `specs/043-mvp-end-to-end-flow/decisions.md`) summarizing: the final MVP user flow, the hidden-Business-Unit decision, the cashier/salesperson-on-order decision, the `MediaAsset` model, the workspace storage-quota decision, and the local image-compression/storage policy — for future contributors and the deliverables list in spec.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS all user stories (US1 needs MediaAsset/usage/`attachMedia` for the Step 1 logo upload and dashboard displays; US2 needs the same infrastructure for product images; both need the new types/keys/i18n/plan limits)
- **User Story 1 (Phase 3)**: Depends on Foundational only — delivers the MVP demo path
- **User Story 2 (Phase 4)**: Depends on Foundational; in practice also depends on a configured workspace existing (i.e., US1's setup-wizard output), so it is sequenced after US1 even though its tasks touch different files
- **User Story 3 (Phase 5)**: Depends on Foundational; in practice also depends on at least one product existing (US2's output) to run a sale, so it is sequenced after US2
- **Polish (Phase 6)**: Depends on the user stories you choose to complete (T045/T046 require all three for the full walkthrough; T042–T044/T047 can start once their relevant story work lands)

> Note: Although US2 and US3 have soft *data* dependencies on the stories before them (you need a configured workspace to add a product, and a product to run a sale), their **code changes touch entirely different files** from US1/US2, so a second/third developer could implement them in parallel against a manually-seeded demo state and integrate once the prior story's UI is ready.

### Within Each User Story

- US1: handoff/context tasks (T012, T017) before the screens that depend on them (T014–T016, T018–T024); `attachMedia` (T018) before the Step 1 logo wiring that calls it (T020)
- US2: the sanitization fix (T025) and `addProduct` wiring (T026) before the Add Product screen update (T027); all "verify list renders thumbnail" tasks (T028–T030) can follow in parallel once T026 lands
- US3: type additions (T032) before the provider wiring that populates them (T033); provider wiring (T033) before the Checkout cashier row (T034) and the Complete Sale sequence verification (T036); T037–T041 (downstream display verifications) can run in parallel once T033/T036 land

### Parallel Opportunities

- All Setup tasks marked [P] (T001) can run alongside T002
- All Foundational tasks marked [P] (T003–T007) touch different files/sections and can run in parallel; T008/T009 follow once T003–T005 land
- Within US1: T011, T013, T015, T021, T024 are [P] against the rest of that phase
- Within US2: T028, T029, T030, T031 are [P] once T026 lands
- Within US3: T032 is [P] at the start; T037, T038, T039, T040, T041 are [P] once T033/T036 land
- Across stories: once Foundational is done, a second developer could start US3's type-only task (T032) and downstream-display verifications (T037–T041) against manually-seeded data while US1/US2 are still in progress — though sequential delivery (US1 → US2 → US3) is recommended for a solo implementer since each story's demo data feeds the next

---

## Parallel Example: Phase 2 (Foundational)

```bash
# These touch different files/sections of packages/types and packages/shared — run together:
Task: "Add WorkspaceStorageUsage, MediaAsset, MediaOwnerType to packages/types/src/core.ts"
Task: "Add STORAGE_KEYS + i18n dictionary entries to packages/shared/src/mock-db/schema.ts"
Task: "Add storageLimitBytes to PLAN_CATALOG tiers in packages/shared/src/mock-db/schema.ts"
Task: "Add storage-usage selectors to packages/shared/src/mock-db/selectors.ts"
Task: "Add compression/quota/factory helpers to packages/shared/src/mock-db/actions.ts"
```

## Parallel Example: User Story 1

```bash
# Independent display/context additions that don't block each other:
Task: "Verify Welcome screen copy/CTA in apps/core-platform/app/welcome/page.tsx"
Task: "Expose storage-usage fields on core-platform AppProvider in apps/core-platform/lib/store/AppProvider.tsx"
Task: "Add storage-usage card to Core Billing in apps/core-platform/app/dashboard/billing/page.tsx"
Task: "Verify Setup Wizard Steps 2-7 in apps/commerce/app/setup/page.tsx"
Task: "Add storage/media usage line to Commerce Dashboard in apps/commerce/app/(commerce)/dashboard/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational) — storage-quota/media-asset infrastructure ready
2. Complete Phase 3 (User Story 1) — registration through a fully-configured Commerce Dashboard with visible storage usage
3. **STOP and VALIDATE**: Walk through quickstart.md steps 1–7 independently; confirm SC-001/SC-006/SC-007 (partial)
4. This alone is demoable as "the onboarding + setup experience is complete and storage quota is visible"

### Incremental Delivery

1. Setup + Foundational → infrastructure ready
2. Add User Story 1 → validate independently → demoable (the onboarding/setup MVP)
3. Add User Story 2 → validate independently → demoable (products + storage growth)
4. Add User Story 3 → validate independently → demoable (the full revenue-loop MVP)
5. Phase 6 polish → final cross-cutting validation and documentation

### Solo-Implementer Strategy (Recommended Here)

Given the soft data dependencies between stories (US2 needs a configured workspace from US1; US3 needs a product from US2), implement and validate sequentially in priority order — US1 → US2 → US3 — using each story's own output as the seed data for the next, then finish with Phase 6.

---

## Notes

- [P] tasks touch different files (or clearly separable sections of the same shared file) and have no completed-task dependency between them
- [Story] labels (US1/US2/US3) trace every implementation task back to its spec.md user story and FR references
- Many tasks are phrased "Verify/adjust" because substantial parts of this flow already exist in the codebase (e.g., POS checkout/customer-modal stacking, onboarding steps, setup wizard) — the task is to confirm they meet the spec's acceptance criteria and close any gap found, not to rebuild from scratch
- Two concrete, already-identified gaps to close: (1) `isPersistableProductImage` in `apps/commerce/lib/store/AppProvider.tsx` currently strips *every* `data:`/`blob:` product image, which silently breaks "Add Product with image" (T025/T026); (2) `CommerceOrder`/`CommerceInvoice` have no `cashierId`/`cashierName` fields today (T032/T033)
- Commit after each task or logical group; stop at any checkpoint to validate a story independently before moving on
- Avoid: page-level storage access, duplicated tax/compression/quota logic, and any cross-app imports — all such logic belongs in `@nexoraxs/shared` per the constitution
