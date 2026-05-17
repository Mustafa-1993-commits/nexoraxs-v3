# Data Model: POS Screen — Full UI

**Phase**: 1 | **Branch**: `031-pos-screen-full-ui` | **Date**: 2026-05-17

All types live in `apps/shops-app/lib/pos-types.ts` and `apps/shops-app/lib/mock-data/products.ts`.
No backend storage — all data is ephemeral (React state) or static (mock arrays).

---

## Core Types

### Product

```typescript
// apps/shops-app/lib/pos-types.ts

export type ProductStatus = "active" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;        // EGP, stored as number (e.g. 38.50)
  stock: number;        // current stock quantity
  status: ProductStatus;
}
```

**Status derivation** (computed at source — not stored separately):
- `stock === 0` → `"out_of_stock"`
- `stock > 0 && stock <= 5` → `"low_stock"`
- `stock > 5` → `"active"`

---

### CartItem

```typescript
export interface CartItem {
  product: Product;
  quantity: number;     // always ≥ 1
  lineTotal: number;    // computed: quantity × product.price
}
```

**Invariant**: `lineTotal` is always recomputed from `quantity × product.price`; never stored independently.

---

### PaymentMethod

```typescript
export type PaymentMethod = "cash" | "card" | "wallet";
```

---

### DiscountMode

```typescript
export type DiscountMode = "amount" | "percentage";

export interface Discount {
  mode: DiscountMode;
  value: number;        // EGP amount or % rate (0–100)
}
```

---

### Cart (POS State Shape)

```typescript
export interface CartState {
  items: CartItem[];
  discount: Discount;
  paymentMethod: PaymentMethod;
  amountReceived: number;   // Cash only — what the customer hands over
}
```

**Derived values** (computed in render, not stored):

```typescript
subtotal    = items.reduce((sum, item) => sum + item.lineTotal, 0)
discountAmt = discount.mode === "percentage"
              ? (subtotal * discount.value) / 100
              : discount.value
discountAmt = Math.min(discountAmt, subtotal)   // cap — never negative total
grandTotal  = subtotal - discountAmt
change      = amountReceived - grandTotal        // shown only for cash; may be negative (not enough tendered)
```

---

### SaleReceipt

```typescript
export interface SaleReceipt {
  items: CartItem[];
  subtotal: number;
  discountAmt: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  amountReceived: number | null;   // null for card/wallet
  change: number | null;           // null for card/wallet
  completedAt: string;             // ISO timestamp (Date.toISOString())
}
```

The receipt is a snapshot created at the moment "Complete Sale" is clicked. It is held in component state to power the success modal, then discarded when "New Sale" is clicked.

---

## Mock Data Shape

```typescript
// apps/shops-app/lib/mock-data/products.ts

import type { Product } from "@/lib/pos-types";

export const MOCK_PRODUCTS: Product[] = [
  { id: "p-001", name: "Iced Latte",         category: "Beverages", price: 38.50,  stock: 482 },
  { id: "p-002", name: "Chicken Sandwich",   category: "Food",      price: 48.00,  stock: 311 },
  { id: "p-003", name: "Croissant",          category: "Bakery",    price: 24.00,  stock: 268 },
  { id: "p-004", name: "Cold Brew",          category: "Beverages", price: 44.00,  stock: 224 },
  { id: "p-005", name: "Avocado Toast",      category: "Food",      price: 60.00,  stock: 180 },
  { id: "p-006", name: "Espresso Beans 1kg", category: "Supplies",  price: 210.00, stock: 3   },
  { id: "p-007", name: "Oat Milk Carton",    category: "Supplies",  price: 42.00,  stock: 5   },
  { id: "p-008", name: "Paper Cups 12oz",    category: "Supplies",  price: 8.00,   stock: 12  },
  { id: "p-009", name: "Caramel Syrup",      category: "Supplies",  price: 35.00,  stock: 2   },
];

// Derive status — colocate with data so consumers don't recompute
export function getProductStatus(stock: number): Product["status"] {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "low_stock";
  return "active";
}

// Derived: unique category list in order of first appearance
export const MOCK_CATEGORIES: string[] = [
  "All",
  ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category))),
];
```

---

## State Transitions

### Cart Item Quantity

```
[not in cart] --click product card--> [qty: 1]
[qty: 1]      --press "−"--> [removed from cart]
[qty: N]      --press "−"--> [qty: N-1]
[qty: N]      --press "+"--> [qty: N+1]
[any]         --click remove--> [removed from cart]
```

### POS Screen States

```
[empty cart]
  → user clicks product card
[cart has items]
  → user clicks "Complete Sale"
[success modal open]
  → user clicks "New Sale"   → [empty cart]  (modal closes, cart resets)
  → user clicks "View Order" → (visual placeholder, no navigation)
```

### Escape Key Guard

```
[escape pressed] + [cart is empty]    → no-op
[escape pressed] + [cart has items]   → [confirm dialog shown]
  → user confirms   → [empty cart]
  → user cancels    → [no change]
```
