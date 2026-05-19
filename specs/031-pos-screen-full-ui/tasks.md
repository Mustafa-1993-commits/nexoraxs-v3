# Tasks: POS Screen — Full UI

**Branch**: `031-pos-screen-full-ui`
**Input**: Design documents from `specs/031-pos-screen-full-ui/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ui-contracts.md ✅

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Exact file paths are included in every task description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure, shared types, and mock data — everything needed before any component is written.

- [x] T001 Create component and lib directories: `apps/shops-app/components/pos/`, `apps/shops-app/lib/mock-data/`, `apps/shops-app/app/(pos)/pos/`
- [x] T002 [P] Create `apps/shops-app/lib/pos-types.ts` — define `Product`, `ProductStatus`, `CartItem`, `Discount`, `DiscountMode`, `PaymentMethod`, `CartState`, `SaleReceipt` types per data-model.md
- [x] T003 [P] Create `apps/shops-app/lib/mock-data/products.ts` — define `MOCK_PRODUCTS` array (9 products) and `MOCK_CATEGORIES` constant, export `getProductStatus()` helper per data-model.md

**Checkpoint**: Types and mock data are available — all downstream tasks can now import from these files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: POS route group, layout, header, and page scaffold — must exist before any user story panel can render.

⚠️ **CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Create `apps/shops-app/app/(pos)/layout.tsx` — route group layout that renders only the POS header and `{children}` with no Sidebar and no Topbar; use `"use client"` only if the header needs client state (source store/branch from `lib/mode.ts`)
- [x] T005 [P] Create `apps/shops-app/components/pos/POSHeader.tsx` — render logo, storeName prop, branchName prop, and close button (`href="/dashboard"`); satisfy the `POSHeaderProps` contract from `contracts/ui-contracts.md`
- [x] T006 Create `apps/shops-app/app/(pos)/pos/page.tsx` — page scaffold: declare all `useState` (cartItems, discount, paymentMethod, amountReceived, receipt), compute derived values (subtotal, discountAmt, grandTotal, change), add onboarding guard (redirect to `/onboarding` if not complete), render the full-screen `flex` container with a 60/40 split placeholder for `<ProductsPanel>` and `<CartPanel>`

**Checkpoint**: Navigating to `/pos` renders a full-screen page with POS header and no sidebar/topbar — the split layout is visible even with empty panels.

---

## Phase 3: User Story 1 — Browse Products & Add to Cart (Priority: P1) 🎯 MVP

**Goal**: Cashier can see all products, filter by category and search, and tap a card to add it to the cart.

**Independent Test**: Navigate to `/pos`, confirm product grid shows all 9 mock products. Click "Cold Brew" twice — cart shows Cold Brew × 2. Search "latte" — grid shows only Iced Latte. Click "Supplies" tab — grid shows only Supplies products. Click an out-of-stock card — cart is unchanged.

- [x] T007 [P] [US1] Create `apps/shops-app/components/pos/CategoryTabs.tsx` — render horizontal scrollable tab bar for `categories` prop, highlight `activeCategory`, call `onCategoryChange` on click; satisfy `CategoryTabsProps` contract
- [x] T008 [P] [US1] Create `apps/shops-app/components/pos/ProductCard.tsx` — render product name, formatted price (`EGP {price.toFixed(2)}`), orange "Low Stock" badge if `status === "low_stock"`, dimmed card with "Out of Stock" label if `status === "out_of_stock"`, call `onAddToCart` on click (no-op for out-of-stock); satisfy `ProductCardProps` contract
- [x] T009 [US1] Create `apps/shops-app/components/pos/ProductsPanel.tsx` — own `searchQuery` and `activeCategory` state, filter `products` prop by category then search term, derive categories from products, render `CategoryTabs` + search input + `ProductCard` grid, show empty states per spec FR-024; satisfy `ProductsPanelProps` contract (depends on T007, T008)
- [x] T010 [US1] Wire `ProductsPanel` into POS page `apps/shops-app/app/(pos)/pos/page.tsx` — pass `MOCK_PRODUCTS` (with status derived via `getProductStatus`) and the `addToCart` handler that increments quantity if product already in cart or appends new `CartItem` (depends on T009)

**Checkpoint**: US1 fully functional — product grid, search, category tabs, and add-to-cart all work. Cart state increments on the page (even if CartPanel is not yet rendered).

---

## Phase 4: User Story 2 — Manage Cart & Apply Discount (Priority: P1)

**Goal**: Cashier can view cart items, adjust quantities, remove items, and apply a fixed or percentage discount — with real-time total updates.

**Independent Test**: Add Iced Latte × 2 and Croissant × 1 (subtotal EGP 101.00). Press "−" on Latte until qty = 1 (subtotal EGP 62.50). Remove Croissant (subtotal EGP 38.50). Enter discount 10% → grand total EGP 34.65. Toggle to amount and enter 5 → grand total EGP 33.50. Empty cart shows "Add products from the left to start".

- [x] T011 [US2] Create `apps/shops-app/components/pos/CartItemRow.tsx` — render product name, quantity controls (`−` / qty / `+`), unit price, line total (`EGP {lineTotal.toFixed(2)}`), and remove button; call `onIncrement`, `onDecrement`, `onRemove` per `CartItemRowProps` contract
- [x] T012 [US2] Create `apps/shops-app/components/pos/CartPanel.tsx` — render `CartItemRow` list, subtotal, discount input with amount/% toggle, customer section (Walk-in default + visual search), and totals row; show "Add products from the left to start" when items are empty; render Complete Sale button (disabled when empty); satisfy `CartPanelProps` contract (depends on T011)
- [x] T013 [US2] Wire `CartPanel` into POS page `apps/shops-app/app/(pos)/pos/page.tsx` — pass all cart state, computed totals, and handlers (`onIncrement`, `onDecrement`, `onRemove`, `onDiscountChange`); implement each handler so cart state updates correctly; clamp discount so grand total never goes below 0 (depends on T012)

**Checkpoint**: US2 fully functional — cart renders, all qty controls work, discount applies correctly, totals update in real-time.

---

## Phase 5: User Story 3 — Select Payment Method & Complete Sale (Priority: P1)

**Goal**: Cashier selects Cash/Card/Wallet, sees change calculation for cash, and completes the sale — triggering the success modal with receipt and New Sale reset.

**Independent Test**: Add Cold Brew (EGP 44). Select Cash, enter 50 → change shows EGP 6.00. Click "Complete Sale" → success modal appears with receipt showing Cold Brew × 1, EGP 44.00 total, EGP 6.00 change. Click "New Sale" → cart is empty, modal is gone.

- [x] T014 [P] [US3] Create `apps/shops-app/components/pos/PaymentSection.tsx` — render Cash / Card / Wallet buttons (one active at a time), show amount-received input and change display only when `selectedMethod === "cash"`, format change as `EGP {change.toFixed(2)}`; satisfy `PaymentSectionProps` contract
- [x] T015 [P] [US3] Create `apps/shops-app/components/pos/SaleSuccessModal.tsx` — full-screen overlay (`fixed inset-0 z-50 bg-black/60`), render receipt summary (items list, subtotal, discount, grand total, payment method, amount received + change for cash only, timestamp), "New Sale" button calls `onNewSale`, "View Order" link calls `onViewOrder`; satisfy `SaleSuccessModalProps` contract; modal does NOT close on backdrop click
- [x] T016 [US3] Integrate `PaymentSection` into `apps/shops-app/components/pos/CartPanel.tsx` — add `selectedMethod`, `amountReceived`, `grandTotal`, `onMethodChange`, `onAmountReceivedChange` props; render `PaymentSection` above Complete Sale button (depends on T014)
- [x] T017 [US3] Wire Complete Sale and `SaleSuccessModal` into POS page `apps/shops-app/app/(pos)/pos/page.tsx` — implement `completeSale` handler that snapshots current cart into a `SaleReceipt` and sets `receipt` state; render `<SaleSuccessModal>` when `receipt !== null`; implement `onNewSale` that resets all cart state to initial values and sets `receipt` to `null` (depends on T015)

**Checkpoint**: US3 fully functional — payment selection, cash change calculation, Complete Sale → success modal → New Sale reset all work end-to-end.

---

## Phase 6: User Story 4 — Full-Screen Standalone Layout (Priority: P2)

**Goal**: POS renders full-screen on desktop (60/40 split, no sidebar/topbar) and stacks vertically on mobile with a sticky cart footer.

**Independent Test**: At 1280px: confirm no sidebar/topbar, split is 60/40. At 375px: confirm products stack above cart, a sticky footer shows grand total and Complete Sale button.

- [x] T018 [US4] Apply responsive split layout in `apps/shops-app/app/(pos)/pos/page.tsx` — use `flex flex-col md:flex-row` for the split container; set `md:w-[60%]` on ProductsPanel wrapper and `md:w-[40%]` on CartPanel wrapper; ensure both panels scroll independently (`overflow-y-auto`) on desktop with `h-screen`
- [x] T019 [US4] Add sticky mobile cart footer in `apps/shops-app/components/pos/CartPanel.tsx` — render a `fixed bottom-0 left-0 right-0 md:hidden` footer bar showing grand total and Complete Sale button; hide the inline Complete Sale button on mobile (show only in footer) to avoid duplication

**Checkpoint**: US4 fully functional — layout is correct on both desktop and mobile viewports.

---

## Phase 7: User Story 5 — Keyboard Shortcuts (Priority: P3)

**Goal**: "/" focuses the product search bar; "Escape" prompts confirmation before clearing the cart. Visual shortcut labels are shown near relevant controls.

**Independent Test**: Press "/" → search input receives focus. With items in cart, press "Escape" → confirmation appears. Confirm → cart clears. Press "Escape" with empty cart → no prompt.

- [x] T020 [US5] Add keyboard event listener in `apps/shops-app/app/(pos)/pos/page.tsx` — `useEffect` registers `keydown` listener: "/" focuses the search input ref (pass `searchInputRef` down to ProductsPanel via prop); "Escape" calls `window.confirm("Clear cart?")` when `cartItems.length > 0`, then resets cart on confirmation; listener must guard "/" so it does not fire when focus is already inside an `<input>` or `<textarea>`
- [x] T021 [US5] Add keyboard shortcut visual labels in `apps/shops-app/components/pos/ProductsPanel.tsx` — render a `<kbd>` badge displaying `/` next to the search input label; add a `<kbd>` badge displaying `Esc` near the clear/reset action in the POS header or CartPanel

**Checkpoint**: US5 fully functional — both keyboard shortcuts work and their labels are visible.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Type safety, lint, and final manual verification.

- [x] T022 [P] Run `pnpm --filter shops-app tsc --noEmit` from repo root and resolve all TypeScript errors — zero `any` usages, all component props typed per `contracts/ui-contracts.md`
- [x] T023 [P] Run `pnpm --filter shops-app lint` from repo root and resolve all ESLint errors
- [ ] T024 Manual browser verification: walk through all 30 items in `specs/031-pos-screen-full-ui/quickstart.md` manual checklist and confirm each passes
- [ ] T025 (Optional) Update `apps/shops-app/app/(app)/dashboard/page.tsx` and `apps/shops-app/app/(app)/products/page.tsx` to import shared product data from `@/lib/mock-data/products.ts` instead of inline definitions — eliminates duplication

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T002 and T003 can start in parallel immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2; T007 and T008 can run in parallel; T009 depends on T007+T008; T010 depends on T009
- **US2 (Phase 4)**: Depends on Phase 2; T011 → T012 → T013 in sequence
- **US3 (Phase 5)**: Depends on Phase 2; T014 and T015 can run in parallel; T016 depends on T014; T017 depends on T015
- **US4 (Phase 6)**: Depends on Phase 2; T018 and T019 are independent of each other
- **US5 (Phase 7)**: Depends on Phase 3 (needs search input ref); T020 and T021 can run in parallel
- **Polish (Phase 8)**: Depends on all user stories complete; T022 and T023 can run in parallel

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on other stories
- **US2 (P1)**: Can start after Phase 2 — no dependency on US1 (cart panel is independent of products panel)
- **US3 (P1)**: Depends on US2 (integrates into CartPanel)
- **US4 (P2)**: Can start after Phase 2 — independent of US1-US3
- **US5 (P3)**: Depends on US1 (needs the search input ref from ProductsPanel)

### Parallel Opportunities

- T002, T003 — parallel (different files, Phase 1)
- T005 — parallel with T004 (different files, Phase 2)
- T007, T008 — parallel (different files, Phase 3)
- T014, T015 — parallel (different files, Phase 5)
- T018, T019 — parallel (different files, Phase 6)
- T020, T021 — parallel (different files, Phase 7)
- T022, T023 — parallel (different commands, Phase 8)

---

## Parallel Example: Phase 1 Setup

```bash
# Run these two in parallel — different files, no shared dependencies:
Task T002: "Create apps/shops-app/lib/pos-types.ts"
Task T003: "Create apps/shops-app/lib/mock-data/products.ts"
```

## Parallel Example: Phase 3 (US1)

```bash
# Run these two in parallel — different files:
Task T007: "Create CategoryTabs.tsx"
Task T008: "Create ProductCard.tsx"

# Then T009 (ProductsPanel) depends on both completing
# Then T010 (wire into page) depends on T009
```

## Parallel Example: Phase 5 (US3)

```bash
# Run these two in parallel — different files:
Task T014: "Create PaymentSection.tsx"
Task T015: "Create SaleSuccessModal.tsx"

# Then T016 and T017 can proceed
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3 = Full Sale Loop)

Since all three P1 stories together define the minimum viable POS transaction, the recommended MVP is all of Phase 1–5:

1. Complete Phase 1: Setup (types + mock data)
2. Complete Phase 2: Foundational (layout + page scaffold)
3. Complete Phase 3: US1 — products browsing + add to cart
4. Complete Phase 4: US2 — cart management + discount
5. Complete Phase 5: US3 — payment + sale completion
6. **STOP and VALIDATE**: End-to-end sale flow works — add product → adjust qty → discount → complete → new sale
7. Demo the full POS loop before adding US4/US5

### Incremental Delivery

1. Phase 1+2 → layout and scaffold visible at `/pos`
2. + Phase 3 (US1) → product grid and add-to-cart working
3. + Phase 4 (US2) → cart management and discounts working
4. + Phase 5 (US3) → full sale completion loop working ← **MVP Demo Point**
5. + Phase 6 (US4) → mobile responsive and polished full-screen layout
6. + Phase 7 (US5) → keyboard shortcuts added
7. Phase 8 → type check, lint, manual verification

---

## Notes

- [P] tasks = touch different files, no blocking dependency on each other
- [Story] label maps each task to its user story for traceability
- All 9 mock products from `products.ts` must have correct stock to trigger Low Stock (≤5) and Out of Stock (=0) states
- The `(pos)` route group name has parentheses — ensure the directory is created as `app/(pos)/` not `app/pos/`
- `"use client"` is required on `app/(pos)/pos/page.tsx` (all cart state is interactive)
- `"use client"` is required on any component using `useState` or event handlers
- Constitution compliance: zero cross-app imports; all files within `apps/shops-app/`
