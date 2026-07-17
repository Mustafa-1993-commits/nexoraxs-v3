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

export interface MemoryLegacyCommerceOperationsSeed {
  readonly products?: readonly CommerceProduct[];
  readonly branches?: readonly Branch[];
  readonly setups?: readonly CommerceSetup[];
  readonly positions?: readonly BranchInventory[];
  readonly movements?: readonly StockMovement[];
  readonly transfers?: readonly StockTransfer[];
  readonly orders?: readonly CommerceOrder[];
  readonly invoices?: readonly CommerceInvoice[];
  readonly returns?: readonly CommerceReturn[];
  readonly mediaAssets?: readonly MediaAsset[];
  readonly storageUsage?: readonly WorkspaceStorageUsage[];
}

export class MemoryLegacyCommerceOperationsStore implements LegacyCommerceOperationsStore {
  private data: Required<MemoryLegacyCommerceOperationsSeed>;
  readonly writes: string[] = [];

  constructor(seed: MemoryLegacyCommerceOperationsSeed = {}) {
    this.data = structuredClone({
      products: seed.products ?? [], branches: seed.branches ?? [], setups: seed.setups ?? [],
      positions: seed.positions ?? [], movements: seed.movements ?? [], transfers: seed.transfers ?? [],
      orders: seed.orders ?? [], invoices: seed.invoices ?? [], returns: seed.returns ?? [],
      mediaAssets: seed.mediaAssets ?? [], storageUsage: seed.storageUsage ?? [],
    });
  }

  readProducts() { return structuredClone(this.data.products); }
  readBranches() { return structuredClone(this.data.branches); }
  readSetups() { return structuredClone(this.data.setups); }
  replaceSetups(v: readonly CommerceSetup[]) { this.set("setups", v); }
  readPositions() { return structuredClone(this.data.positions); }
  replacePositions(v: readonly BranchInventory[]) { this.set("positions", v); }
  readMovements() { return structuredClone(this.data.movements); }
  replaceMovements(v: readonly StockMovement[]) { this.set("movements", v); }
  readTransfers() { return structuredClone(this.data.transfers); }
  replaceTransfers(v: readonly StockTransfer[]) { this.set("transfers", v); }
  readOrders() { return structuredClone(this.data.orders); }
  replaceOrders(v: readonly CommerceOrder[]) { this.set("orders", v); }
  readInvoices() { return structuredClone(this.data.invoices); }
  replaceInvoices(v: readonly CommerceInvoice[]) { this.set("invoices", v); }
  readReturns() { return structuredClone(this.data.returns); }
  replaceReturns(v: readonly CommerceReturn[]) { this.set("returns", v); }
  readMediaAssets() { return structuredClone(this.data.mediaAssets); }
  replaceMediaAssets(v: readonly MediaAsset[]) { this.set("mediaAssets", v); }
  readStorageUsage() { return structuredClone(this.data.storageUsage); }
  replaceStorageUsage(v: readonly WorkspaceStorageUsage[]) { this.set("storageUsage", v); }

  private set<K extends keyof Required<MemoryLegacyCommerceOperationsSeed>>(
    key: K,
    records: Required<MemoryLegacyCommerceOperationsSeed>[K],
  ): void {
    this.data[key] = structuredClone(records);
    this.writes.push(key);
  }
}
