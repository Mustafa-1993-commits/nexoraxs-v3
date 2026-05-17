export type ProductStatus = "active" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export type PaymentMethod = "cash" | "card" | "wallet";
export type DiscountMode = "amount" | "percentage";

export interface Discount {
  mode: DiscountMode;
  value: number;
}

export interface SaleReceipt {
  items: CartItem[];
  subtotal: number;
  discountAmt: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  amountReceived: number | null;
  change: number | null;
  completedAt: string;
}
