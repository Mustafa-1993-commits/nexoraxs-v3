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
  returnStatus?: "none" | "partial" | "returned";
  returnedTotal?: number;
  returnIds?: string[];
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
  returnIds?: string[];
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

export interface BranchInventory {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qty: number;
  lowStockThreshold: number;
  updatedAt: string;
}

export type StockMovementReason = "sale" | "return" | "transfer_out" | "transfer_in" | "adjustment";

export interface StockMovement {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qtyChange: number;
  reason: StockMovementReason;
  reference: { type: "order" | "return" | "transfer" | "adjustment"; id: string };
  performedBy: string;
  performedByName: string;
  createdAt: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  workspaceId: string;
  businessUnitId: string;
  fromBranchId: string;
  toBranchId: string;
  items: { productId: string; name: string; qty: number }[];
  performedBy: string;
  performedByName: string;
  note?: string;
  status: "completed";
  createdAt: string;
}

export interface CommerceReturnItem {
  productId: string;
  name: string;
  sku?: string;
  qty: number;
  price: number;
  taxable: boolean;
}

export type RefundMethod = "cash" | "card" | "wallet" | "original";

export interface CommerceReturn {
  id: string;
  returnNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  orderId: string;
  invoiceId: string | null;
  items: CommerceReturnItem[];
  reason: string;
  refundMethod: RefundMethod;
  restock: boolean;
  subtotal: number;
  vat: number;
  total: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
}
