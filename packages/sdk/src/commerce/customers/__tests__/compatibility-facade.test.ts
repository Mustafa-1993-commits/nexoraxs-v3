import { describe, expect, it, vi } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { LegacyCustomersCompatibilityFacade } from "../LegacyCustomersCompatibilityFacade";
import { MockCustomersRepository } from "../MockCustomersRepository";
import { CUSTOMER_A, CUSTOMER_SCOPE } from "./legacy-customers-repository.contract";

describe("Customer compatibility facade", () => {
  it("publishes a scoped post-commit snapshot exactly once and never publishes failed writes", async () => {
    const repository = new MockCustomersRepository(new MemoryCommerceStore([], { customers: [CUSTOMER_A] }), {
      createId: () => "cust-facade", now: () => new Date("2026-02-01T00:00:00Z"),
    });
    const facade = new LegacyCustomersCompatibilityFacade(repository);
    const listener = vi.fn();
    const unsubscribe = facade.subscribe(listener);
    await facade.create(CUSTOMER_SCOPE, { branchId: "br-a", name: "Facade", phone: "", email: "", notes: "" });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].scope).toEqual(CUSTOMER_SCOPE);
    await expect(facade.update(CUSTOMER_SCOPE, { id: "missing", name: "Nope" })).rejects.toMatchObject({ code: "not_found" });
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});
