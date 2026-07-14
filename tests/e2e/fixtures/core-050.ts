import type { Page } from "@playwright/test";
import { seedDB, STORAGE_KEYS } from "../../../packages/shared/src";
import type {
  Branch,
  BusinessUnit,
  CommerceOrder,
  CommerceProduct,
  Workspace,
} from "../../../packages/types/src";

export type CoreFixtureName =
  | "valid"
  | "missing"
  | "malformed"
  | "stale"
  | "missing-context-complete"
  | "malformed-complete"
  | "stale-business-unit"
  | "stale-branch"
  | "branch-mismatch"
  | "unavailable-context"
  | "cross-scope"
  | "onboarding-incomplete"
  | "empty"
  | "populated";

export type CoreFixtureOptions = {
  locale?: "en" | "ar";
  theme?: "light" | "dark";
  workspaceName?: string;
  businessUnitName?: string;
  branchName?: string;
};

type StoragePayload = {
  local: Record<string, string>;
  session: Record<string, string>;
};

export type BrowserStorageSnapshot = StoragePayload;

export const CORE_050_SEED_IDS = Object.freeze({
  userId: "user_001",
  workspaceId: "ws_001",
  subscriptionId: "sub_001",
  businessUnitId: "bu_001",
  branchId: "br_001",
  osEnablementId: "ose_001",
  teamMemberId: "tm_001",
  commerceSetupId: "cs_001",
  productIds: ["p1", "p2"] as const,
  osId: "commerce",
});

export const CORE_050_STORAGE_KEYS = Object.freeze(
  Object.values(STORAGE_KEYS).slice().sort(),
);

const DB_EMPTY_ARRAY_KEYS = [
  STORAGE_KEYS.branchInventory,
  STORAGE_KEYS.stockMovements,
  STORAGE_KEYS.stockTransfers,
  STORAGE_KEYS.commerceReturns,
  STORAGE_KEYS.mediaAssets,
] as const;

function json(value: unknown): string {
  return JSON.stringify(value);
}

function assertSeedContract(data: ReturnType<typeof seedDB>): void {
  const errors = [
    data.currentUserId === CORE_050_SEED_IDS.userId || "current user ID drifted",
    data.currentWorkspaceId === CORE_050_SEED_IDS.workspaceId || "current Workspace ID drifted",
    data.currentOSSubscriptionId === CORE_050_SEED_IDS.subscriptionId || "subscription ID drifted",
    data.currentBusinessUnitId === CORE_050_SEED_IDS.businessUnitId || "BusinessUnit ID drifted",
    data.currentBranchId === CORE_050_SEED_IDS.branchId || "Branch ID drifted",
    data.currentOSId === CORE_050_SEED_IDS.osId || "OS ID drifted",
    data.osEnablements.some((item) => item.id === CORE_050_SEED_IDS.osEnablementId) || "OSEnablement ID drifted",
    data.teamMembers.some((item) => item.id === CORE_050_SEED_IDS.teamMemberId) || "team member ID drifted",
    data.commerceSetups.some((item) => item.id === CORE_050_SEED_IDS.commerceSetupId) || "Commerce setup ID drifted",
    CORE_050_SEED_IDS.productIds.every((id) => data.commerceProducts.some((item) => item.id === id))
      || "product IDs drifted",
  ].filter((result): result is string => typeof result === "string");

  if (errors.length > 0) {
    throw new Error(`Feature 050 fixture refused incompatible seed data: ${errors.join(", ")}`);
  }
}

function encodeSeed(data: ReturnType<typeof seedDB>): StoragePayload {
  const local: Record<string, string> = {
    [STORAGE_KEYS.users]: json(data.users),
    [STORAGE_KEYS.workspaces]: json(data.workspaces),
    [STORAGE_KEYS.branches]: json(data.branches),
    [STORAGE_KEYS.osSubscriptions]: json(data.subscriptions),
    [STORAGE_KEYS.osEnablements]: json(data.osEnablements),
    [STORAGE_KEYS.businessUnits]: json(data.businessUnits),
    [STORAGE_KEYS.commerceSetups]: json(data.commerceSetups),
    [STORAGE_KEYS.teamMembers]: json(data.teamMembers),
    [STORAGE_KEYS.products]: json(data.commerceProducts),
    [STORAGE_KEYS.orders]: json(data.commerceOrders),
    [STORAGE_KEYS.customers]: json(data.commerceCustomers),
    [STORAGE_KEYS.invoices]: json(data.commerceInvoices),
    [STORAGE_KEYS.workspaceStorageUsage]: json(data.workspaceStorageUsage),
    [STORAGE_KEYS.theme]: data.theme,
  };

  for (const key of DB_EMPTY_ARRAY_KEYS) local[key] = json([]);

  const session: Record<string, string> = {
    [STORAGE_KEYS.currentUserId]: json(data.currentUserId),
    [STORAGE_KEYS.currentWorkspaceId]: json(data.currentWorkspaceId),
    [STORAGE_KEYS.currentOSId]: json(data.currentOSId),
    [STORAGE_KEYS.currentOSSubscriptionId]: json(data.currentOSSubscriptionId),
    [STORAGE_KEYS.currentBusinessUnitId]: json(data.currentBusinessUnitId),
    [STORAGE_KEYS.currentBranchId]: json(data.currentBranchId),
    [STORAGE_KEYS.onboardingState]: json(data.onboardingState),
    [STORAGE_KEYS.entryContext]: json(data.entryContext),
    [STORAGE_KEYS.locale]: json(data.locale),
  };

  return { local, session };
}

function addPopulatedNotificationData(data: ReturnType<typeof seedDB>): void {
  const createdAt = "2026-07-14T10:00:00.000Z";
  const products: CommerceProduct[] = [
    {
      ...data.commerceProducts[0],
      id: "fixture_product_out",
      name: "Fixture Out Product",
      sku: "FIX-OUT",
      barcode: "0500000000001",
      stock: 0,
      lowStockThreshold: 5,
      createdAt,
      updatedAt: createdAt,
    },
    {
      ...data.commerceProducts[1],
      id: "fixture_product_low",
      name: "Fixture Low Product",
      sku: "FIX-LOW",
      barcode: "0500000000002",
      stock: 2,
      lowStockThreshold: 5,
      createdAt,
      updatedAt: createdAt,
    },
  ];
  const order: CommerceOrder = {
    id: "fixture_order_001",
    orderNumber: "ORD-FIXTURE-001",
    workspaceId: CORE_050_SEED_IDS.workspaceId,
    businessUnitId: CORE_050_SEED_IDS.businessUnitId,
    branchId: CORE_050_SEED_IDS.branchId,
    customerId: null,
    items: [{ name: "Fixture Low Product", qty: 1, price: 25, taxable: true }],
    payment: "cash",
    discount: 0,
    vat: 3.5,
    subtotal: 25,
    total: 28.5,
    net: 25,
    cashierId: CORE_050_SEED_IDS.userId,
    cashierName: "Mustafa Hassan",
    createdAt,
  };

  data.commerceProducts.push(...products);
  data.commerceOrders.push(order);
}

function addCrossScopeData(data: ReturnType<typeof seedDB>): void {
  const createdAt = "2026-07-14T11:00:00.000Z";
  const workspace: Workspace = {
    id: "fixture_ws_foreign",
    name: "Foreign Workspace",
    country: "Egypt",
    currency: "EGP",
    timezone: "Africa/Cairo",
    language: "en",
    ownerUserId: "fixture_user_foreign",
    createdAt,
  };
  const businessUnit: BusinessUnit = {
    id: "fixture_bu_foreign",
    workspaceId: workspace.id,
    osSubscriptionId: "fixture_sub_foreign",
    os: "commerce",
    osId: "commerce",
    selectedOS: "commerce",
    branchIds: ["fixture_br_foreign"],
    branchId: "fixture_br_foreign",
    name: "Foreign Business",
    industryType: "retail",
    preset: "retail",
    presetId: "retail",
    createdAt,
  };
  const branch: Branch = {
    id: "fixture_br_foreign",
    workspaceId: workspace.id,
    businessUnitId: businessUnit.id,
    name: "Foreign Branch",
    city: "Cairo",
    country: "Egypt",
    isMain: true,
    createdAt,
  };

  data.workspaces.push(workspace);
  data.businessUnits.push(businessUnit);
  data.branches.push(branch);
  data.currentBusinessUnitId = businessUnit.id;
  data.currentBranchId = branch.id;
}

export function buildCoreStorage(
  name: CoreFixtureName,
  options: CoreFixtureOptions = {},
): StoragePayload {
  if (name === "missing") return { local: {}, session: {} };

  const data = structuredClone(seedDB(options.locale ?? "en", options.theme ?? "light"));
  assertSeedContract(data);
  if (options.workspaceName) data.workspaces[0].name = options.workspaceName;
  if (options.businessUnitName) data.businessUnits[0].name = options.businessUnitName;
  if (options.branchName) data.branches[0].name = options.branchName;

  if (name === "onboarding-incomplete") {
    data.onboardingState = { phase: "workspace", step: 0, completedOS: [] };
  } else if (name === "empty") {
    data.subscriptions = [];
    data.osEnablements = [];
    data.commerceProducts = [];
    data.commerceOrders = [];
    data.commerceCustomers = [];
    data.commerceInvoices = [];
    data.currentOSSubscriptionId = "";
  } else if (name === "populated") {
    addPopulatedNotificationData(data);
  } else if (name === "cross-scope") {
    addCrossScopeData(data);
  } else if (name === "stale") {
    data.currentWorkspaceId = "fixture_ws_stale";
  } else if (name === "missing-context-complete" || name === "malformed-complete") {
    data.currentWorkspaceId = "";
  } else if (name === "stale-business-unit") {
    data.currentBusinessUnitId = "fixture_bu_stale";
  } else if (name === "stale-branch") {
    data.currentBranchId = "fixture_br_stale";
  } else if (name === "branch-mismatch") {
    data.branches.push({
      ...data.branches[0],
      id: "fixture_br_mismatch",
      businessUnitId: "fixture_bu_other",
      name: "Mismatched Branch",
    });
    data.currentBranchId = "fixture_br_mismatch";
  } else if (name === "unavailable-context") {
    data.currentBusinessUnitId = "";
  }

  const payload = encodeSeed(data);
  if (name === "malformed") {
    payload.session[STORAGE_KEYS.currentWorkspaceId] = "{malformed";
    payload.session[STORAGE_KEYS.onboardingState] = "{malformed";
    payload.local[STORAGE_KEYS.workspaces] = "[malformed";
  } else if (name === "malformed-complete") {
    payload.session[STORAGE_KEYS.currentWorkspaceId] = "{malformed";
  }
  return payload;
}

export async function installCoreFixture(
  page: Page,
  name: CoreFixtureName,
  options: CoreFixtureOptions = {},
): Promise<StoragePayload> {
  const payload = buildCoreStorage(name, options);
  await page.addInitScript(({ storage, expectedOrigin }) => {
    if (window.location.origin !== expectedOrigin) return;
    localStorage.clear();
    sessionStorage.clear();
    for (const [key, value] of Object.entries(storage.local)) localStorage.setItem(key, value);
    for (const [key, value] of Object.entries(storage.session)) sessionStorage.setItem(key, value);
  }, { storage: payload, expectedOrigin: "http://127.0.0.1:3001" });
  return payload;
}

export async function snapshotCoreStorage(page: Page): Promise<BrowserStorageSnapshot> {
  return page.evaluate((keys) => {
    const local: Record<string, string> = {};
    const session: Record<string, string> = {};
    for (const key of keys) {
      const localValue = localStorage.getItem(key);
      const sessionValue = sessionStorage.getItem(key);
      if (localValue !== null) local[key] = localValue;
      if (sessionValue !== null) session[key] = sessionValue;
    }
    return { local, session };
  }, CORE_050_STORAGE_KEYS);
}

export function fixtureContractSnapshot(name: CoreFixtureName): {
  name: CoreFixtureName;
  storageKeys: readonly string[];
  seedIds: typeof CORE_050_SEED_IDS;
} {
  return {
    name,
    storageKeys: CORE_050_STORAGE_KEYS,
    seedIds: CORE_050_SEED_IDS,
  };
}
