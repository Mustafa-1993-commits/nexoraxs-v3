import { describe, expect, it } from "vitest";
import { LegacyOrderCommandRepositoryError } from "@nexoraxs/contracts";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { LocalOrderCommandRepository } from "../LocalOrderCommandRepository";
import { commerce055Order } from "../../../../../../apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";
import { foreignOrder, verifyLegacyOrderCommandRepository } from "./legacy-order-command-repository.contract";

describe("memory Order command repository", () => {
  it("passes the reusable command contract with cloned values", () => {
    const store = new MemoryCommerceStore([], { orders: [foreignOrder, commerce055Order] });
    verifyLegacyOrderCommandRepository({
      repository: new LocalOrderCommandRepository(store),
      readRaw: () => store.readOrderCommandRecords(),
    });
  });

  it("fails deterministically at configured read and write stages", () => {
    const readStore = new MemoryCommerceStore([], { orders: [] }, { orderCommandFailures: [{ operation: "read", remaining: 1 }] });
    expect(() => new LocalOrderCommandRepository(readStore).listForNumbering({ workspaceId: "ws", legacyBusinessUnitId: "bu" }))
      .toThrowError(LegacyOrderCommandRepositoryError);
    const writeStore = new MemoryCommerceStore([], { orders: [] }, { orderCommandFailures: [{ operation: "replace", remaining: 1 }] });
    expect(() => writeStore.replaceOrderCommandRecords([])).toThrow("commerce.orders.command.store.configured_failure");
  });
});
