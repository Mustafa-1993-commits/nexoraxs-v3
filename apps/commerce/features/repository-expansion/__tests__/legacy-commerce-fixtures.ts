import type {
  BranchInventory,
  CommerceCustomer,
  CommerceInvoice,
  CommerceOrder,
  CommerceProduct,
} from "@nexoraxs/types";

export const FIXED_NOW = "2026-07-17T10:00:00.000Z";

interface FixtureScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId: string;
}

export const LEGACY_SCOPE_A = {
  workspaceId: "ws-053-a",
  legacyBusinessUnitId: "bu-053-a",
  branchId: "br-053-a",
} as const;

export const LEGACY_SCOPE_A_SECOND_BRANCH = {
  workspaceId: "ws-053-a",
  legacyBusinessUnitId: "bu-053-a",
  branchId: "br-053-a2",
} as const;

export const LEGACY_SCOPE_B = {
  workspaceId: "ws-053-b",
  legacyBusinessUnitId: "bu-053-b",
  branchId: "br-053-b",
} as const;

function customer(scope: FixtureScope, name: string): CommerceCustomer {
  return {
    id: "shared-customer-id",
    workspaceId: scope.workspaceId,
    businessUnitId: scope.legacyBusinessUnitId,
    branchId: scope.branchId,
    name,
    phone: "+201000000053",
    email: "fixture@example.test",
    notes: "Feature 053 fixture",
    createdAt: FIXED_NOW,
    updatedAt: FIXED_NOW,
  };
}

function product(scope: FixtureScope, name: string): CommerceProduct {
  return {
    id: "shared-product-id",
    workspaceId: scope.workspaceId,
    businessUnitId: scope.legacyBusinessUnitId,
    branchId: scope.branchId,
    osSubscriptionId: "sub-commerce-053",
    name,
    category: "General",
    sku: "SKU-053",
    barcode: "053",
    price: 25,
    cost: 10,
    taxable: true,
    stock: 8,
    unit: "Piece",
    lowStockThreshold: 2,
    notes: "",
    createdAt: FIXED_NOW,
    updatedAt: FIXED_NOW,
  };
}

function order(scope: FixtureScope, customerId: string): CommerceOrder {
  return {
    id: "shared-order-id",
    orderNumber: `ORD-${scope.workspaceId}`,
    workspaceId: scope.workspaceId,
    businessUnitId: scope.legacyBusinessUnitId,
    branchId: scope.branchId,
    customerId,
    items: [{ productId: "shared-product-id", name: "Stored Product", qty: 1, price: 25, taxable: true, sku: "SKU-053" }],
    payment: "cash",
    discount: 0,
    vat: 0,
    subtotal: 25,
    total: 25,
    net: 25,
    cashierId: "user-053",
    cashierName: "Fixture Cashier",
    createdAt: FIXED_NOW,
  };
}

function invoice(scope: FixtureScope, customerId: string): CommerceInvoice {
  return {
    id: "shared-invoice-id",
    invoiceNumber: `INV-${scope.workspaceId}`,
    orderId: "shared-order-id",
    workspaceId: scope.workspaceId,
    businessUnitId: scope.legacyBusinessUnitId,
    branchId: scope.branchId,
    customerId,
    items: [{ productId: "shared-product-id", name: "Stored Product", qty: 1, price: 25, taxable: true, sku: "SKU-053" }],
    subtotal: 25,
    discount: 0,
    vat: 0,
    total: 25,
    net: 25,
    cashierId: "user-053",
    cashierName: "Fixture Cashier",
    createdAt: FIXED_NOW,
  };
}

function inventory(scope: FixtureScope, qty: number): BranchInventory {
  return {
    id: "shared-inventory-id",
    workspaceId: scope.workspaceId,
    businessUnitId: scope.legacyBusinessUnitId,
    branchId: scope.branchId,
    productId: "shared-product-id",
    qty,
    lowStockThreshold: 2,
    updatedAt: FIXED_NOW,
  };
}

export function createLegacyCommerceFixtures() {
  const customerA = customer(LEGACY_SCOPE_A, "Workspace A Customer");
  const customerB = customer(LEGACY_SCOPE_B, "Workspace B Customer");
  return {
    now: () => new Date(FIXED_NOW),
    createCustomerId: () => "cust-053-fixed",
    customers: [customerA, customerB],
    products: [product(LEGACY_SCOPE_A, "Workspace A Product"), product(LEGACY_SCOPE_B, "Workspace B Product")],
    inventory: [inventory(LEGACY_SCOPE_A, 3), inventory(LEGACY_SCOPE_B, 9)],
    orders: [order(LEGACY_SCOPE_A, customerA.id), order(LEGACY_SCOPE_B, customerB.id)],
    invoices: [invoice(LEGACY_SCOPE_A, customerA.id), invoice(LEGACY_SCOPE_B, customerB.id)],
  };
}
