# Research: POS Screen — Full UI

**Phase**: 0 | **Branch**: `031-pos-screen-full-ui` | **Date**: 2026-05-17

---

## Layout Isolation — Route Group Pattern

**Decision**: Use a Next.js route group `(pos)` alongside the existing `(app)` group.

**Rationale**: Next.js App Router route groups (`(name)/`) create layout boundaries without affecting the URL. Creating `app/(pos)/layout.tsx` gives the `/pos` route its own layout (POS header bar only) while `app/(app)/layout.tsx` continues to wrap all other routes with Sidebar + Topbar. This is the canonical App Router pattern for mixed layouts.

**Alternatives considered**:
- Override layout inside `(app)/pos/` — Not possible; child routes inherit parent layouts, and there is no opt-out mechanism in App Router for parent layout wrapping.
- Single layout with conditional rendering — Would couple POS state into the shared layout file; fragile and violates SRP.
- Separate Next.js app — Violates Principle I (modular monolith) and massively overcomplicates a single screen.

---

## State Management — Local useState

**Decision**: All POS state lives in `useState` hooks in the POS page component. No external store (Zustand, Redux, Context) is needed.

**Rationale**: The POS screen is self-contained — cart state does not need to be shared with any other page or component outside the POS route. `useState` is the simplest correct solution; introducing a store would be premature abstraction for a single-page feature with mock data.

**Alternatives considered**:
- React Context — Would allow drilling-free access but adds boilerplate with no real benefit when the entire tree is a single page.
- Zustand — Appropriate for cross-route state sharing; overkill here.
- URL state (searchParams) — Inappropriate for ephemeral transaction data.

---

## Mock Data Extraction

**Decision**: Create `apps/shops-app/lib/mock-data/products.ts` with a typed `MOCK_PRODUCTS` array and a `MOCK_CATEGORIES` derived constant.

**Rationale**: Both `dashboard/page.tsx` and `products/page.tsx` define overlapping product data inline. Extracting to a shared file within the same app eliminates duplication, enables the POS to import from one source of truth, and stays within Principle III (no cross-app imports — this file is local to `apps/shops-app`).

**Source data** (merged from both pages, with full product data):

```typescript
// Products from products/page.tsx (has stock + price):
// Iced Latte        — Beverages, stock: 482, price: 38.50
// Chicken Sandwich  — Food,      stock: 311, price: 48.00
// Croissant         — Bakery,    stock: 268, price: 24.00
// Cold Brew         — Beverages, stock: 224, price: 44.00
// Avocado Toast     — Food,      stock: 180, price: 60.00 (from topProducts)
// Espresso Beans    — Supplies,  stock: 3,   price: 210.00 (low stock)
// Oat Milk Carton   — Supplies,  stock: 5,   price: 42.00  (low stock)

// Additional from lowStock in dashboard/page.tsx:
// Paper Cups 12oz   — Supplies,  stock: 12,  price: (add representative price)
// Caramel Syrup     — Supplies,  stock: 2,   price: (add representative price)
```

**Alternatives considered**:
- Keep data inline per page — Duplicated, inconsistent, harder to maintain.
- Move to `packages/shared` — Violates Principle III intent (business data belongs in the owning app, not a shared package).

---

## Discount Calculation Logic

**Decision**: Apply discount after subtotal calculation; cap discount at subtotal (total never negative). Support two modes via a toggle: fixed amount (EGP) and percentage (%).

**Rationale**: The spec is explicit about both modes. Capping prevents negative totals, which would be a UX and logical error. Calculation order: `subtotal → discount → grand total`.

```
subtotal    = Σ (qty × unit_price) for all cart items
discountAmt = mode === "%" ? (subtotal × rate / 100) : fixedAmount
discountAmt = Math.min(discountAmt, subtotal)  ← cap
grandTotal  = subtotal - discountAmt
change      = amountReceived - grandTotal       ← Cash only, shown when ≥ 0
```

---

## Keyboard Shortcut Implementation

**Decision**: Use `useEffect` with `window.addEventListener('keydown', handler)` inside the POS page. Shortcut labels displayed as small visual badges near the relevant controls.

**Rationale**: No shortcut library is needed for two shortcuts. Raw event listener is the simplest approach. Labels are rendered as `<kbd>` elements or small badge-like spans for discoverability.

**Guard conditions**:
- `/` shortcut fires only when focus is NOT already inside an `<input>` or `<textarea>` (to avoid hijacking typing in other inputs).
- `Escape` shortcut shows a confirm prompt only when cart has ≥ 1 item.

---

## Mobile Layout

**Decision**: CSS flex direction toggle at `md:` breakpoint. Below `md`: vertical stack (products on top, full-width; cart below, full-width). Above `md`: 60/40 horizontal split. Sticky footer on mobile shows grand total + Complete Sale button (positioned with `fixed bottom-0` or `sticky bottom-0`).

**Rationale**: Tailwind's responsive utilities make this a pure CSS concern — no JS breakpoint detection needed. The sticky footer pattern ensures the CTA is always visible without scrolling on small screens.

---

## Empty States

**Decision**: Three distinct empty states, rendered conditionally within their respective containers:

1. **Cart empty** — shown in cart panel: "Add products from the left to start"
2. **Search no results** — shown in product grid: "No products match your search"
3. **No products at all** — shown if mock array is empty: "No products yet — Add your first product"

**Rationale**: Spec defines all three explicitly. States 2 and 3 differ in trigger condition and copy, so they must be separate checks.

---

## Out-of-Stock Interaction Guard

**Decision**: Out-of-stock product cards render with `opacity-50 cursor-not-allowed` CSS and an `onClick` handler that is a no-op (or the handler is omitted entirely via conditional binding).

**Rationale**: Dimming + no-op is visually clear and accessible. Removing the handler entirely is the cleanest approach — no click event registered, no `pointer-events: none` hack needed; Tailwind's `cursor-not-allowed` on a div still allows the browser to show the correct cursor.

---

## Success Modal

**Decision**: A simple centered modal overlay with `fixed inset-0 bg-black/60 z-50`. Content includes: sale receipt summary (items, subtotal, discount, total, payment method), "New Sale" button (clears cart state, closes modal), and "View Order" link (href="#" visual placeholder).

**Rationale**: No modal library needed — one-off implementation. The receipt preview is a simplified version of the cart summary (not a full formatted receipt). "View Order" is a stub link as per spec assumptions.

---

## Constitution Re-check (post-design)

All Phase 1 design decisions maintain compliance:
- Principle III: `lib/mock-data/products.ts` lives inside `apps/shops-app` — no cross-app import.
- Principle IV: All new types are explicitly defined in `data-model.md` — zero `any`.
- Principle I: One route group added to one app — no new apps or packages.

**Gate result**: PASS
