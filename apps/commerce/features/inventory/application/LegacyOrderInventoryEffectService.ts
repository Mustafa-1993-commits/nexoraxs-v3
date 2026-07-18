import type {
  LegacyCommerceBranchScope,
  LegacyCommerceDeterministicDependencies,
  LegacyOrderInventoryEffectPort,
  LegacyPreparedSaleInventoryEffect,
  LegacySaleInventoryPersistencePort,
  LegacySaleProductSnapshotPort,
} from "@nexoraxs/contracts";
import type {
  BranchInventory,
  CommerceProduct,
  OrderItem,
} from "@nexoraxs/types";
import {
  createLegacyStockMovement,
  legacyEffectiveStock,
} from "./legacy-inventory-policy";

const preparedMarker = Symbol("LegacyPreparedSaleInventoryEffect");

interface PreparedInventoryToken {
  readonly marker: typeof preparedMarker;
  readonly scope: LegacyCommerceBranchScope;
  readonly positions: readonly BranchInventory[];
  readonly movements: ReturnType<LegacySaleInventoryPersistencePort["listMovements"]>;
  readonly tracked: readonly { readonly item: OrderItem; readonly product: CommerceProduct }[];
}

function sameScope(left: LegacyCommerceBranchScope, right: LegacyCommerceBranchScope): boolean {
  return left.workspaceId === right.workspaceId
    && left.legacyBusinessUnitId === right.legacyBusinessUnitId
    && left.branchId === right.branchId;
}

function readPrepared(prepared: LegacyPreparedSaleInventoryEffect): PreparedInventoryToken {
  const token = prepared.compatibilityToken as Partial<PreparedInventoryToken> | null;
  if (!token || token.marker !== preparedMarker || !token.scope || !token.positions || !token.movements || !token.tracked) {
    throw new Error("commerce.inventory.invalid_prepared_effect");
  }
  return token as PreparedInventoryToken;
}

/** Inventory-owned compatibility effect. Prepare is read-only; commit preserves sequential writes. */
export class LegacyOrderInventoryEffectService implements LegacyOrderInventoryEffectPort {
  constructor(
    private readonly products: LegacySaleProductSnapshotPort,
    private readonly persistence: LegacySaleInventoryPersistencePort,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
  ) {}

  prepareSaleDeduction(input: {
    readonly scope: LegacyCommerceBranchScope;
    readonly items: readonly OrderItem[];
  }): LegacyPreparedSaleInventoryEffect {
    const products = this.products.listProducts(input.scope);
    const positions = this.persistence.listPositions(input.scope);
    const movements = this.persistence.listMovements(input.scope);
    const tracked: { item: OrderItem; product: CommerceProduct }[] = [];
    const requested: Record<string, number> = {};

    for (const item of input.items) {
      if (!item.productId) continue;
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) continue;
      const existing = positions.find((candidate) => candidate.productId === product.id);
      if (product.stock === null && !existing) continue;
      const requestedQty = (requested[product.id] ?? 0) + item.qty;
      requested[product.id] = requestedQty;
      if (requestedQty > legacyEffectiveStock(product, input.scope.branchId, positions).qty) {
        throw new Error("insufficient_stock");
      }
      tracked.push({ item: structuredClone(item), product: structuredClone(product) });
    }

    const token: PreparedInventoryToken = {
      marker: preparedMarker,
      scope: { ...input.scope },
      positions: structuredClone(positions),
      movements: structuredClone(movements),
      tracked,
    };
    return { compatibilityToken: token };
  }

  commitSaleDeduction(input: Parameters<LegacyOrderInventoryEffectPort["commitSaleDeduction"]>[0]) {
    const prepared = readPrepared(input.prepared);
    if (!sameScope(prepared.scope, input.scope)
      || input.order.workspaceId !== input.scope.workspaceId
      || input.order.businessUnitId !== input.scope.legacyBusinessUnitId
      || input.order.branchId !== input.scope.branchId) {
      throw new Error("commerce.inventory.scope_mismatch");
    }

    let nextPositions = structuredClone(prepared.positions);
    const createdMovements = [];
    for (const { item, product } of prepared.tracked) {
      const effective = legacyEffectiveStock(product, input.scope.branchId, nextPositions);
      const existing = nextPositions.find((candidate) => candidate.productId === product.id);
      const qty = effective.qty - item.qty;
      nextPositions = existing
        ? nextPositions.map((candidate) => candidate.id === existing.id
          ? { ...candidate, qty, updatedAt: this.deterministic.now() }
          : candidate)
        : [...nextPositions, {
            id: this.deterministic.createId("bi"),
            workspaceId: input.scope.workspaceId,
            businessUnitId: input.scope.legacyBusinessUnitId,
            branchId: input.scope.branchId,
            productId: product.id,
            qty,
            lowStockThreshold: effective.lowStockThreshold,
            updatedAt: this.deterministic.now(),
          }];
      createdMovements.push(createLegacyStockMovement({
        workspaceId: input.scope.workspaceId,
        businessUnitId: input.scope.legacyBusinessUnitId,
        branchId: input.scope.branchId,
        productId: product.id,
        qtyChange: -item.qty,
        reason: "sale",
        reference: { type: "order", id: input.order.id },
        performedBy: input.actorId,
        performedByName: input.actorDisplayName,
      }, this.deterministic));
    }

    if (createdMovements.length === 0) {
      return {
        branchInventory: nextPositions,
        stockMovements: structuredClone(prepared.movements),
      };
    }
    const branchInventory = this.persistence.replacePositions(input.scope, nextPositions);
    const stockMovements = this.persistence.replaceMovements(
      input.scope,
      [...prepared.movements, ...createdMovements],
    );
    return { branchInventory, stockMovements };
  }
}
