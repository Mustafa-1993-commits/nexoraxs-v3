import { describe, expect, it, vi } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import type { LegacyOrderCommandRepository } from "@nexoraxs/contracts";
import { LegacyCommerceDemoBootstrapService } from "../application/LegacyCommerceDemoBootstrapService";
import { commerce055Order, commerce055Scope } from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("demo bootstrap Order seam", () => {
  it("routes the scoped empty seed through Orders while retaining other setup writes", () => {
    const store = new MemoryLegacyCommerceOperationsStore();
    const repository: LegacyOrderCommandRepository = {
      listForNumbering: vi.fn(), getById: vi.fn(), create: vi.fn(), applyReturnCompatibilityPatch: vi.fn(),
      replaceDemoSeed: vi.fn(() => []),
    };
    new LegacyCommerceDemoBootstrapService(store, repository).bootstrap({
      orderScope: commerce055Scope,
      setups: [], orders: [], invoices: [], mediaAssets: [],
    });
    expect(repository.replaceDemoSeed).toHaveBeenCalledWith(commerce055Scope, []);
    expect(store.writes).toEqual(["setups", "invoices", "mediaAssets"]);
  });

  it("does not permit a foreign scoped seed through the owner boundary", () => {
    const repository: LegacyOrderCommandRepository = {
      listForNumbering: vi.fn(), getById: vi.fn(), create: vi.fn(), applyReturnCompatibilityPatch: vi.fn(),
      replaceDemoSeed: vi.fn(() => { throw new Error("scope_mismatch"); }),
    };
    const service = new LegacyCommerceDemoBootstrapService(new MemoryLegacyCommerceOperationsStore(), repository);
    expect(() => service.bootstrap({ orderScope: commerce055Scope, setups: [], orders: [{ ...commerce055Order, workspaceId: "foreign" }], invoices: [], mediaAssets: [] }))
      .toThrow("scope_mismatch");
  });
});
