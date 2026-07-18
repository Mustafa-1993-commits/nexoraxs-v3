import { describe, expect, it, vi } from "vitest";
import type { LegacyOrderCommandRepository } from "@nexoraxs/contracts";
import { LegacyOrderNumberService } from "../application/LegacyOrderNumberService";
import {
  commerce055ForeignScope,
  commerce055Order,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

function repository(orders: readonly typeof commerce055Order[]): LegacyOrderCommandRepository {
  return {
    listForNumbering: vi.fn((scope) => orders.filter((order) => order.workspaceId === scope.workspaceId && order.businessUnitId === scope.legacyBusinessUnitId)),
    getById: vi.fn(), create: vi.fn(), applyReturnCompatibilityPatch: vi.fn(), replaceDemoSeed: vi.fn(),
  };
}

describe("LegacyOrderNumberService", () => {
  it("uses scoped count rather than parsing maxima, gaps, duplicates, or Branch", () => {
    const orders = [
      commerce055Order,
      { ...commerce055Order, id: "gap", orderNumber: "ORD-9999", branchId: "other" },
      { ...commerce055Order, id: "custom", orderNumber: "CUSTOM" },
      { ...commerce055Order, id: "foreign", workspaceId: commerce055ForeignScope.workspaceId },
    ];
    expect(new LegacyOrderNumberService(repository(orders)).next(commerce055Scope)).toBe("ORD-0004");
    expect(new LegacyOrderNumberService(repository([])).next(commerce055Scope)).toBe("ORD-0001");
  });
});
