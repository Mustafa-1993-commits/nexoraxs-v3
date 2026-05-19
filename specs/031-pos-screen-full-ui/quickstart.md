# Quickstart: POS Screen — Full UI

**Branch**: `031-pos-screen-full-ui` | **Date**: 2026-05-17

---

## Prerequisites

- Node.js 20+, pnpm 9.x installed
- WSL2 environment (per project setup)
- Onboarding completed in shops-app (sessionStorage: `shops_onboarding_done = "true"`)

---

## Run the Dev Server

```bash
# From repo root
pnpm --filter shops-app dev
```

App runs at `http://localhost:3001` (or whichever port is assigned to shops-app).

---

## Access the POS Screen

1. Complete onboarding at `http://localhost:3001/onboarding` (if not done)
2. Navigate to `http://localhost:3001/pos`

The POS screen opens full-screen with no sidebar or topbar.

---

## Key Files Created by This Feature

| File | Purpose |
|------|---------|
| `apps/shops-app/app/(pos)/layout.tsx` | POS route group layout — no sidebar/topbar |
| `apps/shops-app/app/(pos)/pos/page.tsx` | Main POS page — owns all state |
| `apps/shops-app/components/pos/POSHeader.tsx` | Header bar with logo, store, branch, close |
| `apps/shops-app/components/pos/ProductsPanel.tsx` | Left panel — search, tabs, product grid |
| `apps/shops-app/components/pos/ProductCard.tsx` | Individual product card with stock badge |
| `apps/shops-app/components/pos/CategoryTabs.tsx` | Horizontal category filter tabs |
| `apps/shops-app/components/pos/CartPanel.tsx` | Right panel — cart, discount, payment |
| `apps/shops-app/components/pos/CartItemRow.tsx` | Single cart item with qty controls |
| `apps/shops-app/components/pos/PaymentSection.tsx` | Cash/Card/Wallet selector + change calc |
| `apps/shops-app/components/pos/SaleSuccessModal.tsx` | Post-sale receipt modal |
| `apps/shops-app/lib/pos-types.ts` | Shared TypeScript types for POS |
| `apps/shops-app/lib/mock-data/products.ts` | Extracted mock product data |

---

## Manual Verification Checklist

After implementation, verify these manually in the browser:

- [ ] `/pos` renders without sidebar or topbar
- [ ] POS header shows logo, store name, branch name, and close button
- [ ] Close button navigates to `/dashboard`
- [ ] All 9 mock products appear in the grid
- [ ] Products with stock ≤ 5 show orange "Low Stock" badge
- [ ] Products with stock = 0 appear dimmed and labeled "Out of Stock"
- [ ] Clicking a product adds it to the cart (or increments qty)
- [ ] Clicking an out-of-stock product does nothing
- [ ] Search bar filters the grid in real-time
- [ ] Category tabs filter the grid correctly
- [ ] "All" tab shows all products
- [ ] "+" and "−" in cart change quantity; "−" at qty=1 removes the item
- [ ] Remove button removes the item immediately
- [ ] Cart total updates in real-time
- [ ] Discount amount (EGP) reduces the grand total correctly
- [ ] Discount percentage (%) reduces the grand total correctly
- [ ] Discount cannot make the total go below 0
- [ ] Cash payment shows "Amount received" input and change
- [ ] Card/Wallet payment hides the amount received input
- [ ] "Complete Sale" is disabled when cart is empty
- [ ] "Complete Sale" opens success modal with receipt summary
- [ ] "New Sale" clears cart and closes modal
- [ ] On mobile (375px): products stack above cart
- [ ] On mobile: sticky footer shows total and Complete Sale button
- [ ] Pressing "/" focuses the search input
- [ ] Pressing "Escape" with items in cart shows confirm dialog
- [ ] TypeScript: `pnpm --filter shops-app tsc --noEmit` passes with zero errors

---

## TypeScript Check

```bash
pnpm --filter shops-app tsc --noEmit
```

Expected: zero errors, zero `any` usages.

---

## Lint Check

```bash
pnpm --filter shops-app lint
```

Expected: zero errors.
