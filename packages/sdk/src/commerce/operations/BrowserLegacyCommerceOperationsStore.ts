import type { LegacyCommerceOperationsStore } from "@nexoraxs/contracts";
import type {
  Branch,
  BranchInventory,
  CommerceInvoice,
  CommerceOrder,
  CommerceProduct,
  CommerceReturn,
  CommerceSetup,
  MediaAsset,
  StockMovement,
  StockTransfer,
  WorkspaceStorageUsage,
} from "@nexoraxs/types";

export const LEGACY_COMMERCE_OPERATION_KEYS = Object.freeze({
  products: "nexoraxs.db.commerceProducts",
  branches: "nexoraxs.db.branches",
  setups: "nexoraxs.db.commerceSetups",
  positions: "nexoraxs.db.branchInventory",
  movements: "nexoraxs.db.stockMovements",
  transfers: "nexoraxs.db.stockTransfers",
  orders: "nexoraxs.db.commerceOrders",
  invoices: "nexoraxs.db.commerceInvoices",
  returns: "nexoraxs.db.commerceReturns",
  mediaAssets: "nexoraxs.db.mediaAssets",
  storageUsage: "nexoraxs.db.workspaceStorageUsage",
});

export interface LegacyCommerceOperationStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export class BrowserLegacyCommerceOperationsStore implements LegacyCommerceOperationsStore {
  private readonly storage: LegacyCommerceOperationStorageLike | null;

  constructor(storage?: LegacyCommerceOperationStorageLike) {
    this.storage = storage ?? (typeof window === "undefined" ? null : window.localStorage);
  }

  readProducts() { return this.read<CommerceProduct>(LEGACY_COMMERCE_OPERATION_KEYS.products); }
  readBranches() { return this.read<Branch>(LEGACY_COMMERCE_OPERATION_KEYS.branches); }
  readSetups() { return this.read<CommerceSetup>(LEGACY_COMMERCE_OPERATION_KEYS.setups); }
  replaceSetups(records: readonly CommerceSetup[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.setups, records); }
  readPositions() { return this.read<BranchInventory>(LEGACY_COMMERCE_OPERATION_KEYS.positions); }
  replacePositions(records: readonly BranchInventory[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.positions, records); }
  readMovements() { return this.read<StockMovement>(LEGACY_COMMERCE_OPERATION_KEYS.movements); }
  replaceMovements(records: readonly StockMovement[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.movements, records); }
  readTransfers() { return this.read<StockTransfer>(LEGACY_COMMERCE_OPERATION_KEYS.transfers); }
  replaceTransfers(records: readonly StockTransfer[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.transfers, records); }
  readOrders() { return this.read<CommerceOrder>(LEGACY_COMMERCE_OPERATION_KEYS.orders); }
  readInvoices() { return this.read<CommerceInvoice>(LEGACY_COMMERCE_OPERATION_KEYS.invoices); }
  replaceInvoices(records: readonly CommerceInvoice[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.invoices, records); }
  readReturns() { return this.read<CommerceReturn>(LEGACY_COMMERCE_OPERATION_KEYS.returns); }
  replaceReturns(records: readonly CommerceReturn[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.returns, records); }
  readMediaAssets() { return this.read<MediaAsset>(LEGACY_COMMERCE_OPERATION_KEYS.mediaAssets); }
  replaceMediaAssets(records: readonly MediaAsset[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.mediaAssets, records); }
  readStorageUsage() { return this.read<WorkspaceStorageUsage>(LEGACY_COMMERCE_OPERATION_KEYS.storageUsage); }
  replaceStorageUsage(records: readonly WorkspaceStorageUsage[]) { this.replace(LEGACY_COMMERCE_OPERATION_KEYS.storageUsage, records); }

  private read<T>(key: string): readonly T[] {
    if (!this.storage) throw new Error("commerce.operations.storage_unavailable");
    const raw = this.storage.getItem(key);
    if (raw === null) return [];
    try {
      const value: unknown = JSON.parse(raw);
      if (!Array.isArray(value)) throw new Error("expected_array");
      return structuredClone(value) as T[];
    } catch (cause) {
      throw new Error("commerce.operations.storage_corrupt", { cause });
    }
  }

  private replace<T>(key: string, records: readonly T[]): void {
    if (!this.storage) throw new Error("commerce.operations.storage_unavailable");
    this.storage.setItem(key, JSON.stringify(records));
  }
}
