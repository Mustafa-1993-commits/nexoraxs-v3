export interface OrderItem {
  productId?: string;
  id?: string;
  name: string;
  qty: number;
  price: number;
  taxable: boolean;
  sku?: string;
}

export interface CommerceSetup {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  osSubscriptionId: string;
  displayName: string;
  legalName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  crn: string;
  trn: string;
  logo: string | null;
  presetId: string;
  businessType: string;
  preset: string;
  mode: "physical" | "online" | "both";
  vatRegistered: boolean;
  vatRate: number;
  pricesIncludeTax: boolean;
  taxLabel: string;
  taxNumber: string;
  invoicePrefix: string;
  receiptPrefix: string;
  invoiceStart: number;
  receiptStart: number;
  footer: string;
  returnPolicy: string;
  receiptSize: "58mm" | "80mm" | "A4";
  receiptStyle: "classic" | "modern" | "minimal" | "detailed";
  invoiceTemplate: "a4-simple" | "a4-branded";
  categories: string[];
  units?: string[];
  createdAt: string;
  updatedAt: string;
}

/** @deprecated use CommerceSetup */
export type CommerceProfile = CommerceSetup;

export interface CommerceProduct {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  osSubscriptionId: string;
  name: string;
  category: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  taxable: boolean;
  stock: number | null;
  unit?: string;
  low?: number;
  lowStockThreshold: number;
  brand?: string;
  expiry?: string;
  image?: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommerceOrder {
  id: string;
  orderNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  customerId: string | null;
  items: OrderItem[];
  payment: "cash" | "card" | "wallet";
  discount: number;
  vat: number;
  subtotal: number;
  total: number;
  net: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
}

export interface CommerceInvoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  customerId: string | null;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  net: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
}

export interface CommerceCustomer {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
