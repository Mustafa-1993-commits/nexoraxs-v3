import { describe, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockOrdersRepository } from "../MockOrdersRepository";
import { assertLegacyOrdersRepositoryContract, ORDER_A, ORDER_B } from "./legacy-orders-repository.contract";
describe("Memory Order repository conformance", () => {
  it("provides scoped read-only snapshots", async () => {
    await assertLegacyOrdersRepositoryContract(new MockOrdersRepository(new MemoryCommerceStore([], { orders: [ORDER_A, ORDER_B] })));
  });
});
