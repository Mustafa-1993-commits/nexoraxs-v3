import type {
  LegacyCommerceBranchScope,
  LegacyCommerceOperationsStore,
  LegacySaleInventoryPersistencePort,
  LegacySaleProductSnapshotPort,
} from "@nexoraxs/contracts";
import type { BranchInventory, StockMovement } from "@nexoraxs/types";

function inScope(
  record: { readonly workspaceId: string; readonly businessUnitId: string; readonly branchId: string },
  scope: LegacyCommerceBranchScope,
): boolean {
  return record.workspaceId === scope.workspaceId
    && record.businessUnitId === scope.legacyBusinessUnitId
    && record.branchId === scope.branchId;
}

function assertScope(scope: LegacyCommerceBranchScope): void {
  if (!scope.workspaceId.trim() || !scope.legacyBusinessUnitId.trim() || !scope.branchId.trim()) {
    throw new Error("commerce.inventory.invalid_scope");
  }
}

function mergeScoped<T extends { readonly workspaceId: string; readonly businessUnitId: string; readonly branchId: string }>(
  current: readonly T[],
  scope: LegacyCommerceBranchScope,
  scopedRecords: readonly T[],
): T[] {
  if (scopedRecords.some((record) => !inScope(record, scope))) {
    throw new Error("commerce.inventory.scope_mismatch");
  }
  const replacements = structuredClone(scopedRecords) as T[];
  let replacementIndex = 0;
  const merged: T[] = [];
  for (const record of current) {
    if (!inScope(record, scope)) {
      merged.push(structuredClone(record));
      continue;
    }
    const replacement = replacements[replacementIndex++];
    if (replacement) merged.push(replacement);
  }
  merged.push(...replacements.slice(replacementIndex));
  return merged;
}

/** Private local Inventory gateway. Orders never receives or imports this implementation. */
export class LocalOrderInventoryGateway implements
  LegacySaleProductSnapshotPort,
  LegacySaleInventoryPersistencePort {
  constructor(private readonly store: LegacyCommerceOperationsStore) {}

  listProducts(scope: LegacyCommerceBranchScope) {
    assertScope(scope);
    return this.store.readProducts()
      .filter((record) => inScope(record, scope))
      .map((record) => structuredClone(record));
  }

  listPositions(scope: LegacyCommerceBranchScope): readonly BranchInventory[] {
    assertScope(scope);
    return this.store.readPositions()
      .filter((record) => inScope(record, scope))
      .map((record) => structuredClone(record));
  }

  replacePositions(
    scope: LegacyCommerceBranchScope,
    records: readonly BranchInventory[],
  ): readonly BranchInventory[] {
    assertScope(scope);
    const merged = mergeScoped(this.store.readPositions(), scope, records);
    this.store.replacePositions(merged);
    return structuredClone(records);
  }

  listMovements(scope: LegacyCommerceBranchScope): readonly StockMovement[] {
    assertScope(scope);
    return this.store.readMovements()
      .filter((record) => inScope(record, scope))
      .map((record) => structuredClone(record));
  }

  replaceMovements(
    scope: LegacyCommerceBranchScope,
    records: readonly StockMovement[],
  ): readonly StockMovement[] {
    assertScope(scope);
    const merged = mergeScoped(this.store.readMovements(), scope, records);
    this.store.replaceMovements(merged);
    return structuredClone(records);
  }
}
