import { describe, expect, it, vi } from "vitest";
import type { LegacySaleInventoryPersistencePort } from "@nexoraxs/contracts";
import { LegacyOrderInventoryEffectService } from "@/features/inventory/application/LegacyOrderInventoryEffectService";
import {
  commerce055Order,
  commerce055Product,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("Feature 055 sale Inventory characterization", () => {
  it("accumulates duplicate demand and writes positions before Movements", () => {
    const writes: string[] = [];
    const persistence: LegacySaleInventoryPersistencePort = {
      listPositions: () => [],
      replacePositions: (_scope, records) => { writes.push("positions"); return structuredClone(records); },
      listMovements: () => [],
      replaceMovements: (_scope, records) => { writes.push("movements"); return structuredClone(records); },
    };
    const createId = vi.fn()
      .mockReturnValueOnce("bi-characterized")
      .mockReturnValueOnce("sm-characterized-1")
      .mockReturnValueOnce("sm-characterized-2");
    const now = vi.fn()
      .mockReturnValueOnce("2026-07-17T01:00:01.000Z")
      .mockReturnValueOnce("2026-07-17T01:00:02.000Z")
      .mockReturnValueOnce("2026-07-17T01:00:03.000Z")
      .mockReturnValueOnce("2026-07-17T01:00:04.000Z");
    const service = new LegacyOrderInventoryEffectService(
      { listProducts: () => [commerce055Product] },
      persistence,
      { createId, now },
    );
    const items = [
      { ...commerce055Order.items[0], qty: 2 },
      { ...commerce055Order.items[0], qty: 3 },
    ];
    const prepared = service.prepareSaleDeduction({ scope: commerce055Scope, items });
    expect(writes).toEqual([]);
    const result = service.commitSaleDeduction({
      scope: commerce055Scope, prepared, order: { ...commerce055Order, items },
      actorId: commerce055Order.cashierId, actorDisplayName: commerce055Order.cashierName,
    });

    expect(writes).toEqual(["positions", "movements"]);
    expect(result.branchInventory).toMatchObject([{ id: "bi-characterized", qty: 5, lowStockThreshold: 2 }]);
    expect(result.stockMovements.map((movement) => movement.qtyChange)).toEqual([-2, -3]);
    expect(result.stockMovements.map((movement) => movement.id)).toEqual(["sm-characterized-1", "sm-characterized-2"]);
  });

  it("rejects accumulated demand before writes and skips untracked missing/null-stock lines", () => {
    const writes: string[] = [];
    const persistence: LegacySaleInventoryPersistencePort = {
      listPositions: () => [], replacePositions: () => { writes.push("positions"); return []; },
      listMovements: () => [], replaceMovements: () => { writes.push("movements"); return []; },
    };
    const service = new LegacyOrderInventoryEffectService(
      { listProducts: () => [{ ...commerce055Product, stock: 4 }, { ...commerce055Product, id: "untracked", stock: null }] },
      persistence,
      { createId: () => "unused", now: () => "2026-07-17T00:00:00.000Z" },
    );
    expect(() => service.prepareSaleDeduction({
      scope: commerce055Scope,
      items: [
        { ...commerce055Order.items[0], qty: 3 },
        { ...commerce055Order.items[0], qty: 2 },
        { ...commerce055Order.items[0], productId: "missing", qty: 99 },
        { ...commerce055Order.items[0], productId: "untracked", qty: 99 },
      ],
    })).toThrow("insufficient_stock");
    expect(writes).toEqual([]);
  });
});
