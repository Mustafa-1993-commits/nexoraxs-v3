# UI Contracts: POS Screen — Full UI

**Phase**: 1 | **Branch**: `031-pos-screen-full-ui` | **Date**: 2026-05-17

These contracts define the interface boundaries between POS components — what props each component accepts and what behavior it guarantees. Implementation must satisfy these contracts exactly.

---

## POSHeader

```typescript
interface POSHeaderProps {
  storeName: string;
  branchName: string;
  onClose: () => void;   // navigates to /dashboard
}
```

**Guarantees**:
- Renders logo, storeName, branchName, and a close button.
- Close button calls `onClose` when clicked (does not handle navigation directly).
- No sidebar or topbar elements appear within this component.

---

## CategoryTabs

```typescript
interface CategoryTabsProps {
  categories: string[];          // ["All", "Beverages", "Food", ...]
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
```

**Guarantees**:
- Renders one tab per entry in `categories`.
- Active tab is visually distinguished.
- Clicking a tab calls `onCategoryChange` with the tab's string value.
- Horizontal scroll on overflow (mobile).

---

## ProductCard

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}
```

**Guarantees**:
- Displays product name, formatted price (`EGP {price.toFixed(2)}`), and a stock badge.
- `status === "low_stock"` → renders orange "Low Stock" badge.
- `status === "out_of_stock"` → renders dimmed card with "Out of Stock" label; `onAddToCart` is NOT called on click.
- `status === "active"` → no stock badge; clicking calls `onAddToCart`.

---

## ProductsPanel

```typescript
interface ProductsPanelProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}
```

**Guarantees**:
- Owns search query state and active category state internally.
- Filters `products` by category and search term before rendering grid.
- Renders `ProductCard` for each filtered product.
- Renders `CategoryTabs` with derived categories from `products`.
- Empty grid (search no results): renders "No products match your search".
- Empty products array: renders "No products yet — Add your first product".
- Pressing "/" (when focus is outside inputs) focuses the search input.

---

## CartItemRow

```typescript
interface CartItemRowProps {
  item: CartItem;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}
```

**Guarantees**:
- Displays product name, quantity, unit price, and line total.
- "+" calls `onIncrement`.
- "−" calls `onDecrement` (caller decides whether to remove at qty=1).
- Remove button calls `onRemove`.
- All prices formatted as `EGP {value.toFixed(2)}`.

---

## PaymentSection

```typescript
interface PaymentSectionProps {
  selectedMethod: PaymentMethod;
  amountReceived: number;
  grandTotal: number;
  onMethodChange: (method: PaymentMethod) => void;
  onAmountReceivedChange: (amount: number) => void;
}
```

**Guarantees**:
- Renders Cash, Card, Wallet buttons; exactly one is highlighted as selected.
- When `selectedMethod === "cash"`: renders amount-received input and computed change display.
- Change = `amountReceived - grandTotal`; shown as `EGP {change.toFixed(2)}`.
- When `selectedMethod !== "cash"`: amount-received input is hidden.

---

## CartPanel

```typescript
interface CartPanelProps {
  items: CartItem[];
  discount: Discount;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onDiscountChange: (discount: Discount) => void;
  onMethodChange: (method: PaymentMethod) => void;
  onAmountReceivedChange: (amount: number) => void;
  onCompleteSale: () => void;
}
```

**Guarantees**:
- Empty cart: renders "Add products from the left to start" message; Complete Sale button is disabled.
- Non-empty cart: renders `CartItemRow` list, discount section, customer section, payment section, totals, and Complete Sale button.
- Complete Sale button is enabled only when `items.length > 0`.
- All totals (subtotal, discount, grand total) are computed from props — no local calculation divergence.
- Discount input accepts positive numbers only; percentage mode clamps to 0–100.

---

## SaleSuccessModal

```typescript
interface SaleSuccessModalProps {
  receipt: SaleReceipt;
  onNewSale: () => void;
  onViewOrder: () => void;
}
```

**Guarantees**:
- Renders as a full-screen overlay (z-index above all content).
- Displays receipt summary: item list, subtotal, discount, grand total, payment method.
- Cash-only: displays amount received and change.
- "New Sale" button calls `onNewSale` (parent clears cart and closes modal).
- "View Order" calls `onViewOrder` (stub — parent can no-op or navigate).
- Modal does NOT close on backdrop click (prevents accidental dismissal mid-transaction).

---

## POS Page — Top-Level State Contract

The POS page (`app/(pos)/pos/page.tsx`) owns all mutable state:

```typescript
// State owned by POS page
const [cartItems, setCartItems]               = useState<CartItem[]>([]);
const [discount, setDiscount]                 = useState<Discount>({ mode: "amount", value: 0 });
const [paymentMethod, setPaymentMethod]       = useState<PaymentMethod>("cash");
const [amountReceived, setAmountReceived]     = useState<number>(0);
const [receipt, setReceipt]                   = useState<SaleReceipt | null>(null);
```

`receipt !== null` → success modal is shown.
`receipt === null` → normal POS state.

Calling `onNewSale` sets `receipt` back to `null` and resets all cart state to initial values.
