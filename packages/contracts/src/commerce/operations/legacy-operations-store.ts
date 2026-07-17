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

/** Frontend compatibility persistence port; it is not a backend transaction contract. */
export interface LegacyCommerceOperationsStore {
  readProducts(): readonly CommerceProduct[];
  readBranches(): readonly Branch[];
  readSetups(): readonly CommerceSetup[];
  replaceSetups(records: readonly CommerceSetup[]): void;
  readPositions(): readonly BranchInventory[];
  replacePositions(records: readonly BranchInventory[]): void;
  readMovements(): readonly StockMovement[];
  replaceMovements(records: readonly StockMovement[]): void;
  readTransfers(): readonly StockTransfer[];
  replaceTransfers(records: readonly StockTransfer[]): void;
  readOrders(): readonly CommerceOrder[];
  replaceOrders(records: readonly CommerceOrder[]): void;
  readInvoices(): readonly CommerceInvoice[];
  replaceInvoices(records: readonly CommerceInvoice[]): void;
  readReturns(): readonly CommerceReturn[];
  replaceReturns(records: readonly CommerceReturn[]): void;
  readMediaAssets(): readonly MediaAsset[];
  replaceMediaAssets(records: readonly MediaAsset[]): void;
  readStorageUsage(): readonly WorkspaceStorageUsage[];
  replaceStorageUsage(records: readonly WorkspaceStorageUsage[]): void;
}

export interface LegacyCommerceDeterministicDependencies {
  readonly createId: (prefix: string) => string;
  readonly now: () => string;
}
