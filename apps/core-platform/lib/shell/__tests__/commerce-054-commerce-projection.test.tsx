import { describe, expect, it } from "vitest";
import type { CommerceProjectionPort } from "../../commerce/CommerceProjectionPort";
import { readCoreCommerceProjection } from "../../commerce/CommerceProjectionPort";

describe("Feature 054 Core Commerce projection consumer", () => {
  it("uses a read-only projection for shell, Product Hub, and billing inputs", async () => {
    const port: CommerceProjectionPort = {
      async readProjection(input) {
        return {
          scope: input.scope,
          branchId: input.branchId ?? null,
          products: [{ id: "p-1", name: "Coffee", stock: 0, lowStockThreshold: 2 }],
          orders: [{ id: "o-1", orderNumber: "ORD-0001", total: 30, createdAt: "2026-07-17T00:00:00.000Z" }],
          setup: { billingCity: "Cairo", vatRegistered: true },
        };
      },
    };

    const projection = await readCoreCommerceProjection(port, {
      workspaceId: "ws-1",
      legacyBusinessUnitId: "bu-1",
      branchId: "br-1",
    });
    expect(projection.isSetupComplete).toBe(true);
    expect(projection.products[0]?.id).toBe("p-1");
    expect(projection.orders[0]?.orderNumber).toBe("ORD-0001");
    expect(projection.setup?.billingCity).toBe("Cairo");
  });
});
