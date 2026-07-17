import type {
  LegacyCommerceSetupWritePort,
  LegacyInvoiceWritePort,
  LegacyInventoryWritePort,
  LegacyOrderWritePort,
  LegacyReturnWritePort,
  LegacyTransferWritePort,
} from "@nexoraxs/contracts";
import type {
  BranchInventory,
  CommerceInvoice,
  CommerceOrder,
  CommerceReturn,
  CommerceSetup,
  StockMovement,
  StockTransfer,
} from "@nexoraxs/types";

export interface LegacyWriteObservation {
  readonly collection: string;
  readonly records: readonly unknown[];
}

export function createSequenceFactory(values: readonly string[]): () => string {
  let index = 0;
  return () => values[index++] ?? `generated-${index}`;
}

export class MemoryLegacyCommerceWritePorts implements
  LegacyInventoryWritePort,
  LegacyTransferWritePort,
  LegacyReturnWritePort,
  LegacyOrderWritePort,
  LegacyInvoiceWritePort,
  LegacyCommerceSetupWritePort {
  private positions: BranchInventory[] = [];
  private movements: StockMovement[] = [];
  private transfers: StockTransfer[] = [];
  private returns: CommerceReturn[] = [];
  private orders: CommerceOrder[] = [];
  private invoices: CommerceInvoice[] = [];
  private setups: CommerceSetup[] = [];
  readonly writes: LegacyWriteObservation[] = [];

  constructor(seed: {
    readonly positions?: readonly BranchInventory[];
    readonly movements?: readonly StockMovement[];
    readonly transfers?: readonly StockTransfer[];
    readonly returns?: readonly CommerceReturn[];
    readonly orders?: readonly CommerceOrder[];
    readonly invoices?: readonly CommerceInvoice[];
    readonly setups?: readonly CommerceSetup[];
  } = {}) {
    this.positions = structuredClone([...(seed.positions ?? [])]);
    this.movements = structuredClone([...(seed.movements ?? [])]);
    this.transfers = structuredClone([...(seed.transfers ?? [])]);
    this.returns = structuredClone([...(seed.returns ?? [])]);
    this.orders = structuredClone([...(seed.orders ?? [])]);
    this.invoices = structuredClone([...(seed.invoices ?? [])]);
    this.setups = structuredClone([...(seed.setups ?? [])]);
  }

  readPositions() { return structuredClone(this.positions); }
  replacePositions(records: readonly BranchInventory[]) { this.positions = this.capture("inventory", records); }
  readMovements() { return structuredClone(this.movements); }
  replaceMovements(records: readonly StockMovement[]) { this.movements = this.capture("movements", records); }
  readTransfers() { return structuredClone(this.transfers); }
  replaceTransfers(records: readonly StockTransfer[]) { this.transfers = this.capture("transfers", records); }
  readReturns() { return structuredClone(this.returns); }
  replaceReturns(records: readonly CommerceReturn[]) { this.returns = this.capture("returns", records); }
  readOrders() { return structuredClone(this.orders); }
  replaceOrders(records: readonly CommerceOrder[]) { this.orders = this.capture("orders", records); }
  readInvoices() { return structuredClone(this.invoices); }
  replaceInvoices(records: readonly CommerceInvoice[]) { this.invoices = this.capture("invoices", records); }
  readSetups() { return structuredClone(this.setups); }
  replaceSetups(records: readonly CommerceSetup[]) { this.setups = this.capture("setups", records); }

  private capture<T>(collection: string, records: readonly T[]): T[] {
    const copy = structuredClone([...records]);
    this.writes.push({ collection, records: copy });
    return copy;
  }
}

export class FailingLegacyCommerceWritePorts extends MemoryLegacyCommerceWritePorts {
  constructor(
    private readonly failCollection: string,
    seed: ConstructorParameters<typeof MemoryLegacyCommerceWritePorts>[0] = {},
  ) {
    super(seed);
  }

  override replacePositions(records: readonly BranchInventory[]) {
    if (this.failCollection === "inventory") throw new Error("commerce.test.storage.inventory");
    super.replacePositions(records);
  }

  override replaceMovements(records: readonly StockMovement[]) {
    if (this.failCollection === "movements") throw new Error("commerce.test.storage.movements");
    super.replaceMovements(records);
  }

  override replaceOrders(records: readonly CommerceOrder[]) {
    if (this.failCollection === "orders") throw new Error("commerce.test.storage.orders");
    super.replaceOrders(records);
  }

  override replaceInvoices(records: readonly CommerceInvoice[]) {
    if (this.failCollection === "invoices") throw new Error("commerce.test.storage.invoices");
    super.replaceInvoices(records);
  }
}
