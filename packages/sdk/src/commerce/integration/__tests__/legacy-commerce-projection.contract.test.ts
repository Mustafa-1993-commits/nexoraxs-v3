import { describe, expect, it } from "vitest";
import { BrowserLegacyCommerceIntegrationStore } from "../BrowserLegacyCommerceIntegrationStore";
import { LegacyCommerceProjectionAdapter } from "../LegacyCommerceProjectionAdapter";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

describe("Feature 054 Commerce projection contract", () => {
  it("returns cloned Product, Order, and setup summaries for only the requested scope", async () => {
    const local = new MemoryStorage();
    local.setItem("nexoraxs.db.commerceProducts", JSON.stringify([
      { id: "p-own", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", name: "Own", stock: 2, lowStockThreshold: 4 },
      { id: "p-other", workspaceId: "ws-b", businessUnitId: "bu-b", branchId: "br-b", name: "Other", stock: 9, lowStockThreshold: 1 },
    ]));
    local.setItem("nexoraxs.db.commerceOrders", JSON.stringify([
      { id: "ord-own", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", orderNumber: "ORD-0001", total: 25, createdAt: "2026-07-17T00:00:00.000Z" },
      { id: "ord-other", workspaceId: "ws-b", businessUnitId: "bu-b", branchId: "br-b", orderNumber: "ORD-9999", total: 99, createdAt: "2026-07-17T00:00:00.000Z" },
    ]));
    local.setItem("nexoraxs.db.commerceSetups", JSON.stringify([
      { id: "setup-own", workspaceId: "ws-a", businessUnitId: "bu-a", billingCity: "Cairo", vatRegistered: true },
      { id: "setup-other", workspaceId: "ws-b", businessUnitId: "bu-b", billingCity: "Hidden" },
    ]));

    const adapter = new LegacyCommerceProjectionAdapter(
      new BrowserLegacyCommerceIntegrationStore({ localStorage: local, sessionStorage: new MemoryStorage() }),
    );
    const projection = await adapter.readProjection({
      scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
      branchId: "br-a",
    });

    expect(projection.products).toEqual([{ id: "p-own", name: "Own", stock: 2, lowStockThreshold: 4 }]);
    expect(projection.orders).toEqual([{ id: "ord-own", orderNumber: "ORD-0001", total: 25, createdAt: "2026-07-17T00:00:00.000Z" }]);
    expect(projection.setup).toMatchObject({ billingCity: "Cairo", vatRegistered: true });

    const second = await adapter.readProjection({
      scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
      branchId: "br-a",
    });
    expect(second).toEqual(projection);
    expect(second).not.toBe(projection);
    expect(second.products).not.toBe(projection.products);
  });

  it("treats a Branch filter as an additional read boundary", async () => {
    const local = new MemoryStorage();
    local.setItem("nexoraxs.db.commerceProducts", JSON.stringify([
      { id: "p-a", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", name: "A", stock: 1 },
      { id: "p-b", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-b", name: "B", stock: 1 },
    ]));
    const adapter = new LegacyCommerceProjectionAdapter(
      new BrowserLegacyCommerceIntegrationStore({ localStorage: local, sessionStorage: new MemoryStorage() }),
    );

    const projection = await adapter.readProjection({
      scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" },
      branchId: "br-a",
    });
    expect(projection.products.map((item) => item.id)).toEqual(["p-a"]);
  });
});
