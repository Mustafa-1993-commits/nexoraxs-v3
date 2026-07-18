import { describe, expect, it } from "vitest";
import type {
  LegacySaleInventoryPersistencePort,
  LegacySaleProductSnapshotPort,
} from "@nexoraxs/contracts";
import { LegacyOrderInventoryEffectService } from "../application/LegacyOrderInventoryEffectService";
import {
  commerce055Order,
  commerce055Product,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

function gateways() {
  const writes: string[] = [];
  const products: LegacySaleProductSnapshotPort = { listProducts: () => [commerce055Product] };
  const persistence: LegacySaleInventoryPersistencePort = {
    listPositions: () => [],
    replacePositions: (_scope, records) => { writes.push("positions"); return structuredClone(records); },
    listMovements: () => [],
    replaceMovements: (_scope, records) => { writes.push("movements"); return structuredClone(records); },
  };
  return { products, persistence, writes };
}

describe("LegacyOrderInventoryEffectService", () => {
  it("prepares without writes and commits the exact position and Movement snapshots", () => {
    const gateway = gateways();
    const ids = ["bi-055", "sm-055"];
    const times = ["2026-07-17T00:00:02.000Z", "2026-07-17T00:00:03.000Z"];
    const service = new LegacyOrderInventoryEffectService(
      gateway.products,
      gateway.persistence,
      { createId: () => ids.shift() ?? "unexpected", now: () => times.shift() ?? "unexpected" },
    );

    const prepared = service.prepareSaleDeduction({ scope: commerce055Scope, items: commerce055Order.items });
    expect(gateway.writes).toEqual([]);
    const result = service.commitSaleDeduction({
      scope: commerce055Scope,
      prepared,
      order: commerce055Order,
      actorId: commerce055Order.cashierId,
      actorDisplayName: commerce055Order.cashierName,
    });

    expect(gateway.writes).toEqual(["positions", "movements"]);
    expect(result.branchInventory).toMatchObject([{ id: "bi-055", productId: commerce055Product.id, qty: 8 }]);
    expect(result.stockMovements).toMatchObject([{ id: "sm-055", qtyChange: -2, reference: { type: "order", id: commerce055Order.id } }]);
  });
});
