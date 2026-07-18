import { describe, expect, it, vi } from "vitest";
import type {
  LegacyOrderCommandRepository,
  LegacyOrderInventoryEffectPort,
} from "@nexoraxs/contracts";
import { LegacyOrderCreationService } from "../application/LegacyOrderCreationService";
import {
  commerce055Context,
  commerce055Order,
  commerce055Position,
  commerce055Movement,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

const command = {
  items: commerce055Order.items,
  customerId: commerce055Order.customerId,
  payment: commerce055Order.payment,
  discount: commerce055Order.discount,
  vat: commerce055Order.vat,
  subtotal: commerce055Order.subtotal,
  total: commerce055Order.total,
  net: commerce055Order.net,
};

describe("LegacyOrderCreationService", () => {
  it("preserves prepare → number → create → Inventory commit → notification order", () => {
    const calls: string[] = [];
    const repository: LegacyOrderCommandRepository = {
      listForNumbering: vi.fn(), getById: vi.fn(), applyReturnCompatibilityPatch: vi.fn(), replaceDemoSeed: vi.fn(),
      create: vi.fn((_scope, order) => { calls.push("order.create"); return [order]; }),
    };
    const inventory: LegacyOrderInventoryEffectPort = {
      prepareSaleDeduction: vi.fn(() => { calls.push("inventory.prepare"); return { compatibilityToken: "prepared" }; }),
      commitSaleDeduction: vi.fn(() => { calls.push("inventory.commit"); return { branchInventory: [commerce055Position], stockMovements: [commerce055Movement] }; }),
    };
    const changes = {
      productsChanged: vi.fn(), customersChanged: vi.fn(), invoicesChanged: vi.fn(),
      ordersChanged: vi.fn(() => { calls.push("orders.notify"); return Promise.resolve(); }),
      inventoryChanged: vi.fn(() => { calls.push("inventory.notify"); return Promise.resolve(); }),
    };
    const service = new LegacyOrderCreationService(
      repository,
      { next: () => { calls.push("number"); return "ORD-0001"; } },
      inventory,
      { createId: () => "ord-055", now: () => "2026-07-17T00:00:01.000Z" },
      changes,
    );

    const result = service.create(commerce055Context, command);
    expect(result.order).toEqual(commerce055Order);
    expect(result.branchInventory).toEqual([commerce055Position]);
    expect(calls).toEqual(["inventory.prepare", "number", "order.create", "inventory.commit", "orders.notify", "inventory.notify"]);
  });

  it("does not commit Inventory after an Order persistence failure", () => {
    const inventory: LegacyOrderInventoryEffectPort = {
      prepareSaleDeduction: vi.fn(() => ({ compatibilityToken: "prepared" })),
      commitSaleDeduction: vi.fn(),
    };
    const repository = {
      listForNumbering: vi.fn(), getById: vi.fn(), applyReturnCompatibilityPatch: vi.fn(), replaceDemoSeed: vi.fn(),
      create: vi.fn(() => { throw new Error("order_write_failed"); }),
    };
    const service = new LegacyOrderCreationService(
      repository,
      { next: () => "ORD-0001" },
      inventory,
      { createId: () => "ord-055", now: () => "2026-07-17T00:00:01.000Z" },
      { productsChanged: vi.fn(), customersChanged: vi.fn(), invoicesChanged: vi.fn(), ordersChanged: vi.fn(), inventoryChanged: vi.fn() },
    );
    expect(() => service.create(commerce055Context, command)).toThrow("order_write_failed");
    expect(inventory.commitSaleDeduction).not.toHaveBeenCalled();
  });
});
