import type { Product, ProductStatus } from "@/lib/pos-types";

export function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "low_stock";
  return "active";
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "p-001", name: "Iced Latte",         category: "Beverages", price: 38.50,  stock: 482, status: getProductStatus(482) },
  { id: "p-002", name: "Chicken Sandwich",   category: "Food",      price: 48.00,  stock: 311, status: getProductStatus(311) },
  { id: "p-003", name: "Croissant",          category: "Bakery",    price: 24.00,  stock: 268, status: getProductStatus(268) },
  { id: "p-004", name: "Cold Brew",          category: "Beverages", price: 44.00,  stock: 224, status: getProductStatus(224) },
  { id: "p-005", name: "Avocado Toast",      category: "Food",      price: 60.00,  stock: 180, status: getProductStatus(180) },
  { id: "p-006", name: "Espresso Beans 1kg", category: "Supplies",  price: 210.00, stock: 3,   status: getProductStatus(3)   },
  { id: "p-007", name: "Oat Milk Carton",    category: "Supplies",  price: 42.00,  stock: 5,   status: getProductStatus(5)   },
  { id: "p-008", name: "Paper Cups 12oz",    category: "Supplies",  price: 8.00,   stock: 12,  status: getProductStatus(12)  },
  { id: "p-009", name: "Caramel Syrup",      category: "Supplies",  price: 35.00,  stock: 2,   status: getProductStatus(2)   },
];

export const MOCK_CATEGORIES: string[] = [
  "All",
  ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category))),
];
