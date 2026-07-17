import type { CommerceCustomer, CommerceInvoice, CommerceOrder, CommerceProduct, CommerceSetup, MediaAsset } from "@nexoraxs/types";
import { LEGACY_COMMERCE_SETUP_DEFAULTS } from "../application/legacy-commerce-setup-policy";

/** Existing fixed demo bytes, owned by Commerce and isolated from shared utilities. */
export function legacyCommerceDemoSeed() {
  const created = "2025-08-12T09:00:00.000Z";
  return {
    commerceSetups: [{
      id: "cs_001", workspaceId: "ws_001", businessUnitId: "bu_001", osSubscriptionId: "sub_001",
      ...LEGACY_COMMERCE_SETUP_DEFAULTS,
      presetId: "pharmacy", businessType: "pharmacy", preset: "pharmacy",
      displayName: "Mustafa Pharmacy", legalName: "Mustafa Pharmacy LLC",
      phone: "01001619008", email: "store@mustafagroup.co", city: "Alexandria", country: "Egypt",
      vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT", taxNumber: "123456789",
      categories: ["Medicine", "Supplements", "Baby Care", "Personal Care"], createdAt: created, updatedAt: created,
    }] as CommerceSetup[],
    commerceProducts: [
      { id: "p1", workspaceId: "ws_001", businessUnitId: "bu_001", branchId: "br_001", osSubscriptionId: "sub_001", name: "Panadol Extra 24 tabs", category: "Medicine", sku: "MED-0001", barcode: "6221234500017", price: 50, cost: 32, taxable: true, stock: 100, unit: "Box", low: 20, lowStockThreshold: 20, notes: "", createdAt: created, updatedAt: created },
      { id: "p2", workspaceId: "ws_001", businessUnitId: "bu_001", branchId: "br_001", osSubscriptionId: "sub_001", name: "Centrum Multivitamin 30", category: "Supplements", sku: "SUP-0011", barcode: "6221234500031", price: 320, cost: 240, taxable: true, stock: 42, unit: "Bottle", low: 10, lowStockThreshold: 10, notes: "", createdAt: created, updatedAt: created },
    ] as CommerceProduct[],
    commerceOrders: [] as CommerceOrder[],
    commerceCustomers: [] as CommerceCustomer[],
    commerceInvoices: [] as CommerceInvoice[],
    mediaAssets: [] as MediaAsset[],
  };
}
