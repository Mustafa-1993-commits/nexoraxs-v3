import { describe, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockCustomersRepository } from "../MockCustomersRepository";
import { assertLegacyCustomersRepositoryContract, CUSTOMER_A, CUSTOMER_B } from "./legacy-customers-repository.contract";

describe("Memory Customer repository conformance", () => {
  it("preserves CRUD compatibility and scope", async () => {
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A, CUSTOMER_B] });
    await assertLegacyCustomersRepositoryContract(new MockCustomersRepository(store, {
      now: () => new Date("2026-02-01T00:00:00.000Z"), createId: () => "cust-fixed",
    }));
  });
});
