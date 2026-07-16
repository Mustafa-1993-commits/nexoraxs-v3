import { afterEach, describe, expect, it, vi } from "vitest";
import type { CreateLegacyProductCommand } from "@nexoraxs/contracts";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";

const scope = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "branch-a" };
const command = (sku: string): CreateLegacyProductCommand => ({
  name: `Product ${sku}`,
  category: "General",
  sku,
  barcode: "",
  price: 10,
  cost: 2,
  taxable: true,
  stock: 1,
  lowStockThreshold: 0,
  notes: "",
});

afterEach(() => {
  vi.useRealTimers();
});

describe("deterministic mock Product behavior", () => {
  it("applies configured asynchronous latency without randomness", async () => {
    vi.useFakeTimers();
    const repository = new MockProductsRepository(new MemoryCommerceStore(), { latencyMs: 25 });
    let settled = false;
    const pending = repository.list(scope).then(() => { settled = true; });

    await vi.advanceTimersByTimeAsync(24);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await pending;
    expect(settled).toBe(true);
  });

  it("uses injected clock and IDs in stable stored order", async () => {
    let id = 0;
    const repository = new MockProductsRepository(new MemoryCommerceStore(), {
      now: () => new Date("2026-03-04T05:06:07.000Z"),
      createId: () => `p_fixed_${++id}`,
    });

    await repository.create(scope, command("FIXED-1"));
    await repository.create(scope, command("FIXED-2"));

    await expect(repository.list(scope)).resolves.toMatchObject({
      items: [
        expect.objectContaining({ id: "p_fixed_1", createdAt: "2026-03-04T05:06:07.000Z" }),
        expect.objectContaining({ id: "p_fixed_2", createdAt: "2026-03-04T05:06:07.000Z" }),
      ],
    });
  });

  it("matches operation/invocation rules before commit and does not consume an ID", async () => {
    let id = 0;
    const store = new MemoryCommerceStore();
    const repository = new MockProductsRepository(store, {
      createId: () => `p_fixed_${++id}`,
      failureRules: [{ operation: "create", invocation: 2, errorCode: "configured_failure" }],
    });

    await repository.create(scope, command("ONE"));
    await expect(repository.create(scope, command("TWO"))).rejects.toMatchObject({ code: "configured_failure" });
    await repository.create(scope, command("THREE"));

    await expect(repository.list(scope)).resolves.toMatchObject({
      items: [
        expect.objectContaining({ id: "p_fixed_1", sku: "ONE" }),
        expect.objectContaining({ id: "p_fixed_2", sku: "THREE" }),
      ],
      total: 2,
    });
  });

  it("uses the first matching ordered rule and supports deterministic SKU matching", async () => {
    const repository = new MockProductsRepository(new MemoryCommerceStore(), {
      failureRules: [
        { operation: "create", normalizedSku: "fail-me", errorCode: "scope_mismatch" },
        { operation: "create", normalizedSku: "fail-me", errorCode: "storage" },
      ],
    });

    await expect(repository.create(scope, command(" FAIL-ME "))).rejects.toMatchObject({ code: "scope_mismatch" });
    await expect(repository.list(scope)).resolves.toMatchObject({ total: 0 });
  });

  it("leaves the prior record unchanged when a configured update fails", async () => {
    const repository = new MockProductsRepository(new MemoryCommerceStore(), {
      createId: () => "p1",
      failureRules: [{ operation: "update", productId: "p1", errorCode: "configured_failure" }],
    });
    await repository.create(scope, command("SAFE"));

    await expect(repository.update(scope, "p1", { name: "Must not commit" }))
      .rejects.toMatchObject({ code: "configured_failure" });
    await expect(repository.getById(scope, "p1")).resolves.toMatchObject({ name: "Product SAFE" });
  });
});
