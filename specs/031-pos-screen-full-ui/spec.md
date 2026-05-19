# Feature Specification: POS Screen — Full UI

**Feature Branch**: `031-pos-screen-full-ui`
**Created**: 2026-05-17
**Status**: Draft
**App**: `apps/shops-app`
**Route**: `/pos`
**Reference**: NexoraXS-UX-Master-Plan.docx Zone 7, S-29, S-30

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse Products & Add to Cart (Priority: P1)

A cashier opens the POS screen from the dashboard. They see all products in a grid. They filter by category or search by name, then tap a product card to add it to the cart on the right.

**Why this priority**: This is the core POS loop — no sale can happen without product selection. Everything else depends on this working.

**Independent Test**: Navigate to `/pos`, confirm product grid renders with mock data, click any product card, confirm it appears in the cart panel with quantity 1.

**Acceptance Scenarios**:

1. **Given** the POS screen is open, **When** the cashier views the screen, **Then** all products from mock data are displayed in a grid with name, price, and stock badge.
2. **Given** products are displayed, **When** the cashier types in the search bar, **Then** the grid filters in real-time without a submit action.
3. **Given** products are displayed, **When** the cashier selects a category tab, **Then** only products from that category are shown.
4. **Given** a product is displayed, **When** the cashier clicks it, **Then** it is added to the cart (or quantity incremented if already in cart).
5. **Given** a product has stock ≤ 5, **When** displayed in the grid, **Then** an orange "Low Stock" badge is shown.
6. **Given** a product has stock = 0, **When** displayed in the grid, **Then** the card is dimmed and labeled "Out of Stock", and clicking it does nothing.

---

### User Story 2 — Manage Cart & Apply Discount (Priority: P1)

A cashier reviews the cart, adjusts quantities, removes items, and applies a discount before completing the sale.

**Why this priority**: Cart management is inseparable from the checkout flow and directly affects the sale total.

**Independent Test**: Add two products, adjust one quantity, remove the other, apply a 10% discount — verify all totals update correctly.

**Acceptance Scenarios**:

1. **Given** items are in the cart, **When** the cashier presses "+" on a cart item, **Then** the quantity increments and the line total updates.
2. **Given** items are in the cart, **When** the cashier presses "−", **Then** the quantity decrements; at 1, pressing "−" removes the item.
3. **Given** items are in the cart, **When** the cashier clicks the remove button, **Then** the item is removed immediately.
4. **Given** items are in the cart, **When** the cashier enters a discount amount, **Then** the cart total reduces by that amount.
5. **Given** a "%" toggle is selected, **When** the cashier enters 10, **Then** the discount is 10% of the subtotal.
6. **Given** the cart is empty, **When** the POS screen is open, **Then** a message reads "Add products from the left to start".

---

### User Story 3 — Select Payment Method & Complete Sale (Priority: P1)

The cashier selects a payment method (Cash, Card, or Wallet), optionally enters the amount received for cash, and completes the sale.

**Why this priority**: Sale completion is the terminal goal of the entire POS workflow.

**Independent Test**: Add a product, select Cash, enter an amount ≥ total, click "Complete Sale" — verify success modal appears with receipt preview, change calculation is correct.

**Acceptance Scenarios**:

1. **Given** items are in cart, **When** the cashier clicks "Cash", **Then** an "Amount received" input appears and the change is calculated automatically.
2. **Given** the cashier enters an amount received, **When** the value is ≥ cart total, **Then** the change amount is shown.
3. **Given** "Card" or "Wallet" is selected, **When** the cashier views the panel, **Then** no amount-received input is shown.
4. **Given** the cart has items and a payment method is selected, **When** the cashier clicks "Complete Sale", **Then** a success modal appears with a receipt preview.
5. **Given** the success modal is open, **When** the cashier clicks "New Sale", **Then** the cart clears and the POS screen resets.
6. **Given** the success modal is open, **When** the cashier clicks "View Order", **Then** the link navigates to the order detail (visual-only for mock).
7. **Given** the cart is empty, **When** the cashier views the Complete Sale button, **Then** it is disabled.

---

### User Story 4 — Full-Screen Standalone Layout (Priority: P2)

The POS screen opens as a full-screen experience with no sidebar or topbar — only a thin header bar with the store logo, name, branch, and a close button returning to the dashboard.

**Why this priority**: The isolated layout is a UX requirement for focused cashier use, but the layout works independently of the cart/product logic.

**Independent Test**: Navigate to `/pos` and confirm no sidebar or topbar renders; confirm the header bar shows logo, store name, branch name, and a close button linking to `/dashboard`.

**Acceptance Scenarios**:

1. **Given** the user navigates to `/pos`, **When** the page loads, **Then** no sidebar and no topbar are rendered.
2. **Given** the POS header bar is visible, **When** the cashier clicks the close button, **Then** they are navigated to `/dashboard`.
3. **Given** the POS screen is open on a mobile device, **When** the screen is narrow, **Then** the layout stacks vertically with products on top and cart below.

---

### User Story 5 — Keyboard Shortcuts (Visual Labels) (Priority: P3)

Keyboard shortcut labels are displayed visually on the POS screen for discoverability. The "/" key focuses the search bar and "Escape" shows a confirm prompt before clearing the cart.

**Why this priority**: Keyboard shortcuts improve cashier efficiency but are purely progressive enhancement with no impact on core sale flow.

**Independent Test**: Press "/" and confirm focus moves to the search input; press "Escape" with items in cart and confirm a confirm prompt appears before clearing.

**Acceptance Scenarios**:

1. **Given** the POS screen is open, **When** the user presses "/", **Then** focus moves to the product search bar.
2. **Given** items are in the cart, **When** the user presses "Escape", **Then** a confirmation prompt appears asking if they want to clear the cart.
3. **Given** the confirmation is accepted, **When** the cart is cleared, **Then** the POS resets to the empty cart state.

---

### Edge Cases

- What happens when all products are out of stock? → Grid shows all cards dimmed with "Out of Stock" labels; empty-state message does not appear (products exist, just unavailable).
- What happens when a discount amount exceeds the cart total? → Discount is capped at the cart subtotal (total never goes below zero).
- What happens when the cashier searches and no products match? → "No products match your search" message shown in the grid area.
- What happens when the user navigates to `/pos` without completing onboarding? → Redirect to `/onboarding` (consistent with existing app behavior).
- What happens on mobile when the cart is long? → Cart panel scrolls independently; a sticky cart summary footer shows the total and Complete Sale button.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The POS screen MUST render at route `/pos` as a full-screen page with no sidebar and no topbar.
- **FR-002**: The POS header MUST display: app logo, store name, branch name, and a close button that navigates to `/dashboard`.
- **FR-003**: The left panel (60% width on desktop) MUST display a real-time search bar that filters the product grid without requiring a submit action.
- **FR-004**: The left panel MUST display horizontal category tabs (All + one tab per unique category in mock data).
- **FR-005**: The product grid MUST display each product as a card with: name, price, and stock badge.
- **FR-006**: Products with stock ≤ 5 MUST display an orange "Low Stock" badge.
- **FR-007**: Products with stock = 0 MUST appear dimmed with an "Out of Stock" label and MUST NOT be addable to the cart.
- **FR-008**: Clicking a product card MUST add it to the cart; clicking again MUST increment the quantity by 1.
- **FR-009**: The right panel (40% width on desktop) MUST display the current cart items list.
- **FR-010**: Each cart item MUST show: product name, quantity controls (− qty +), unit price, and line total.
- **FR-011**: A remove button MUST be available per cart item.
- **FR-012**: The cart total MUST update in real-time as items or quantities change.
- **FR-013**: A discount section MUST allow entry of a fixed amount or a percentage (toggled by a button).
- **FR-014**: A customer section MUST show "Walk-in" as the default; a search field (visual-only) MUST be present.
- **FR-015**: Three payment method buttons MUST be shown: Cash, Card, Wallet — exactly one selected at a time.
- **FR-016**: When Cash is selected, an "Amount received" input MUST appear and change MUST be calculated and displayed automatically.
- **FR-017**: The "Complete Sale" button MUST be disabled when the cart is empty.
- **FR-018**: Clicking "Complete Sale" with items in the cart MUST show a success modal with a receipt preview.
- **FR-019**: The success modal MUST include a "New Sale" button that clears the cart and resets the POS, and a "View Order" link.
- **FR-020**: On mobile, the layout MUST stack vertically with products on top and cart below; a sticky footer MUST show the cart total and Complete Sale button.
- **FR-021**: Pressing "/" MUST focus the product search bar.
- **FR-022**: Pressing "Escape" with items in the cart MUST show a confirmation prompt before clearing.
- **FR-023**: Mock product data MUST be extracted from `apps/shops-app/app/(app)/dashboard/page.tsx` and `apps/shops-app/app/(app)/products/page.tsx` into a shared file at `apps/shops-app/lib/mock-data/products.ts`.
- **FR-024**: When the product grid has no results (search or empty category), an appropriate empty-state message MUST be shown.
- **FR-025**: When the cart is empty, the message "Add products from the left to start" MUST be displayed in the cart panel.

### Key Entities

- **Product**: name, category, price (EGP), stock quantity, status (Active / Low Stock / Out of Stock)
- **CartItem**: product reference, quantity, unit price, line total (quantity × unit price)
- **Cart**: list of CartItems, subtotal, discount (amount or percentage), grand total, selected payment method
- **PaymentMethod**: Cash | Card | Wallet
- **SaleReceipt**: cart snapshot, payment method, amount received (cash only), change (cash only), timestamp

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A cashier can select a product, adjust its quantity, apply a discount, and complete a sale in under 60 seconds.
- **SC-002**: The product search filters results within 100ms of each keystroke (no perceptible lag on mock data set).
- **SC-003**: The cart total and change amount are always mathematically correct — zero calculation errors across all combinations of items, quantities, and discounts.
- **SC-004**: The POS screen renders correctly on viewports from 375px (mobile) to 1920px (desktop) with no layout overflow or clipped content.
- **SC-005**: 100% of TypeScript compilation passes with strict mode — zero `any` usages, zero type errors.
- **SC-006**: All primary user flows (add product, adjust qty, apply discount, complete sale, new sale) are reachable via keyboard alone on desktop.
- **SC-007**: The full-screen POS layout renders with zero elements from the standard sidebar/topbar layout.

---

## Assumptions

- This feature uses mock data only — no backend API calls, no persistence across page reloads.
- The mock products extracted from existing pages serve as the canonical product catalogue for the POS in this iteration.
- The POS route `/pos` lives inside `apps/shops-app` only; `core-platform` is not involved.
- "View Order" link in the success modal is a visual placeholder — no order detail page is required in this spec.
- Customer search in the cart panel is visual-only (no real search logic needed).
- The store name and branch displayed in the POS header are sourced from the existing mock account session (same as the rest of the app).
- Payment completion does not trigger any real transaction — the "Complete Sale" action is purely UI state.
- The POS requires the same onboarding completion check as other app pages.
- Keyboard shortcut labels are displayed visually near relevant controls (e.g., "[/] Search").
- Currency is EGP throughout; no multi-currency support in this spec.
