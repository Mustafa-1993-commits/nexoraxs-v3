import { describe, expect, it } from "vitest";
import type { LegacySaleInventoryPersistencePort } from "@nexoraxs/contracts";
import { LegacyOrderInventoryEffectService } from "../application/LegacyOrderInventoryEffectService";
import {
  commerce055Order,
  commerce055Product,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

const deterministic = { createId: (prefix: string) => `${prefix}-failure`, now: () => "2026-07-17T00:00:00.000Z" };

describe("LegacyOrderInventoryEffectService failures", () => {
  it("propagates prepare reads and validates before writes", () => {
    const unavailable = new LegacyOrderInventoryEffectService(
      { listProducts: () => { throw new Error("prepare_read_failed"); } },
      { listPositions: () => [], replacePositions: () => [], listMovements: () => [], replaceMovements: () => [] },
      deterministic,
    );
    expect(() => unavailable.prepareSaleDeduction({ scope: commerce055Scope, items: commerce055Order.items })).toThrow("prepare_read_failed");

    const insufficient = new LegacyOrderInventoryEffectService(
      { listProducts: () => [{ ...commerce055Product, stock: 1 }] },
      { listPositions: () => [], replacePositions: () => [], listMovements: () => [], replaceMovements: () => [] },
      deterministic,
    );
    expect(() => insufficient.prepareSaleDeduction({ scope: commerce055Scope, items: commerce055Order.items })).toThrow("insufficient_stock");
  });

  it("preserves the position write when the later Movement write fails", () => {
    const writes: string[] = [];
    const persistence: LegacySaleInventoryPersistencePort = {
      listPositions: () => [],
      replacePositions: (_scope, records) => { writes.push("positions"); return [...records]; },
      listMovements: () => [],
      replaceMovements: () => { writes.push("movements"); throw new Error("movement_write_failed"); },
    };
    const service = new LegacyOrderInventoryEffectService(
      { listProducts: () => [commerce055Product] }, persistence, deterministic,
    );
    const prepared = service.prepareSaleDeduction({ scope: commerce055Scope, items: commerce055Order.items });
    expect(() => service.commitSaleDeduction({
      scope: commerce055Scope, prepared, order: commerce055Order,
      actorId: commerce055Order.cashierId, actorDisplayName: commerce055Order.cashierName,
    })).toThrow("movement_write_failed");
    expect(writes).toEqual(["positions", "movements"]);
  });
});
