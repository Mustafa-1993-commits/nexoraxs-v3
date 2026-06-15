import type {
  User, Workspace, BusinessUnit, Branch, OSSubscription, WorkspaceMember,
  MediaAsset, WorkspaceStorageUsage,
} from "@nexoraxs/types";
import type {
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceCustomer, CommerceInvoice,
} from "@nexoraxs/types";
import { OS_CATALOG, PLAN_CATALOG } from "./schema";

export const DEFAULT_SETUP = {
  displayName: "", legalName: "", phone: "", email: "", address: "", city: "", country: "Egypt",
  crn: "", trn: "", logo: null as string | null,
  presetId: "retail", businessType: "retail", preset: "retail", mode: "physical" as const,
  vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT", taxNumber: "",
  invoicePrefix: "INV", receiptPrefix: "RCPT", invoiceStart: 1001, receiptStart: 1001,
  footer: "Thank you for shopping with us", returnPolicy: "Returns accepted within 14 days with receipt.",
  receiptSize: "80mm" as const, receiptStyle: "classic" as const, invoiceTemplate: "a4-simple" as const,
  categories: [] as string[],
};

export function emptyDB(locale = "en", theme = "light") {
  return {
    version: 2,
    demo: false,
    locale,
    theme,
    entryContext: { source: "general_landing", selectedOS: null as string | null, selectedPlan: null as string | null },
    currentUserId: null as string | null,
    currentWorkspaceId: null as string | null,
    currentOSId: null as string | null,
    currentOSSubscriptionId: null as string | null,
    currentBusinessUnitId: null as string | null,
    currentBranchId: null as string | null,
    operatingSystems: OS_CATALOG,
    plans: PLAN_CATALOG,
    workspaces: [] as Workspace[],
    subscriptions: [] as OSSubscription[],
    businessUnits: [] as BusinessUnit[],
    branches: [] as Branch[],
    users: [] as User[],
    teamMembers: [] as WorkspaceMember[],
    commerceSetups: [] as CommerceSetup[],
    commerceProducts: [] as CommerceProduct[],
    commerceOrders: [] as CommerceOrder[],
    commerceCustomers: [] as CommerceCustomer[],
    commerceInvoices: [] as CommerceInvoice[],
    mediaAssets: [] as MediaAsset[],
    workspaceStorageUsage: [] as WorkspaceStorageUsage[],
    onboardingState: { phase: null as string | null, step: 0, completedOS: [] as string[] },
  };
}

export function seedDB(locale = "en", theme = "light") {
  const userId = "user_001";
  const wsId = "ws_001";
  const subId = "sub_001";
  const buId = "bu_001";
  const branchId = "br_001";
  const created = "2025-08-12T09:00:00.000Z";

  return {
    version: 2,
    demo: true,
    locale,
    theme,
    entryContext: { source: "general_landing", selectedOS: null as string | null, selectedPlan: null as string | null },
    currentUserId: userId,
    currentWorkspaceId: wsId,
    currentOSId: "commerce",
    currentOSSubscriptionId: subId,
    currentBusinessUnitId: buId,
    currentBranchId: branchId,
    operatingSystems: OS_CATALOG,
    plans: PLAN_CATALOG,
    workspaces: [{
      id: wsId, name: "Mustafa Group", country: "Egypt", currency: "EGP",
      timezone: "Africa/Cairo", language: locale, ownerUserId: userId, createdAt: created,
    }] as Workspace[],
    subscriptions: [{
      id: subId, workspaceId: wsId, os: "commerce", osId: "commerce",
      plan: "starter", planId: "commerce_starter",
      status: "trialing" as const, startedAt: created, trialEndsAt: "2026-06-18", renewsAt: "2026-06-18",
    }] as OSSubscription[],
    businessUnits: [{
      id: buId, workspaceId: wsId, osSubscriptionId: subId, os: "commerce", osId: "commerce",
      selectedOS: "commerce", branchIds: [branchId], branchId, name: "Mustafa Pharmacy",
      preset: "pharmacy", presetId: "pharmacy", createdAt: created,
    }] as BusinessUnit[],
    branches: [{
      id: branchId, workspaceId: wsId, businessUnitId: buId, name: "Smouha Branch",
      city: "Alexandria", country: "Egypt", isMain: true, createdAt: created,
    }] as Branch[],
    users: [{
      id: userId, fullName: "Mustafa Hassan", name: "Mustafa Hassan",
      email: "mustafa@mustafagroup.co", passwordHash: "demo-password",
      role: "owner", createdAt: created, updatedAt: created,
    }] as User[],
    teamMembers: [{
      id: "tm_001", workspaceId: wsId, userId, workspaceRole: "Owner", osId: null,
      osRole: "Owner", businessUnitId: null, branchId: null, status: "active", lastActive: "Active now",
    }] as WorkspaceMember[],
    commerceSetups: [{
      id: "cs_001", workspaceId: wsId, businessUnitId: buId, osSubscriptionId: subId,
      ...DEFAULT_SETUP,
      presetId: "pharmacy", businessType: "pharmacy", preset: "pharmacy",
      displayName: "Mustafa Pharmacy", legalName: "Mustafa Pharmacy LLC",
      phone: "01001619008", email: "store@mustafagroup.co",
      city: "Alexandria", country: "Egypt",
      vatRegistered: true, vatRate: 14, pricesIncludeTax: true,
      taxLabel: "VAT", taxNumber: "123456789",
      categories: ["Medicine", "Supplements", "Baby Care", "Personal Care"],
      createdAt: created, updatedAt: created,
    }] as CommerceSetup[],
    commerceProducts: [
      {
        id: "p1", workspaceId: wsId, businessUnitId: buId, branchId, osSubscriptionId: subId,
        name: "Panadol Extra 24 tabs", category: "Medicine", sku: "MED-0001", barcode: "6221234500017",
        price: 50, cost: 32, taxable: true, stock: 100, unit: "Box", low: 20, lowStockThreshold: 20,
        notes: "", createdAt: created, updatedAt: created,
      },
      {
        id: "p2", workspaceId: wsId, businessUnitId: buId, branchId, osSubscriptionId: subId,
        name: "Centrum Multivitamin 30", category: "Supplements", sku: "SUP-0011", barcode: "6221234500031",
        price: 320, cost: 240, taxable: true, stock: 42, unit: "Bottle", low: 10, lowStockThreshold: 10,
        notes: "", createdAt: created, updatedAt: created,
      },
    ] as CommerceProduct[],
    commerceOrders: [] as CommerceOrder[],
    commerceCustomers: [] as CommerceCustomer[],
    commerceInvoices: [] as CommerceInvoice[],
    mediaAssets: [] as MediaAsset[],
    workspaceStorageUsage: [{
      workspaceId: wsId,
      usedBytes: 0,
      limitBytes: PLAN_CATALOG.find((p) => p.id === "commerce_starter")?.limits.storageLimitBytes ?? 500 * 1024 * 1024,
      updatedAt: created,
    }] as WorkspaceStorageUsage[],
    onboardingState: { phase: null as string | null, step: 0, completedOS: ["commerce"] },
  };
}
