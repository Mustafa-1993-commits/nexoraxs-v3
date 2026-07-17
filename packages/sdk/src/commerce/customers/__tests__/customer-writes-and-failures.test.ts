import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockCustomersRepository } from "../MockCustomersRepository";
import { CUSTOMER_A, CUSTOMER_SCOPE } from "./legacy-customers-repository.contract";

describe("Customer writes and failures", () => {
  it("validates before writing and preserves compatible unknown fields", async () => {
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A] });
    const repository = new MockCustomersRepository(store, { now: () => new Date("2026-02-01T00:00:00Z") });
    await expect(repository.create(CUSTOMER_SCOPE, { branchId: "br-a", name: " ", phone: "", email: "", notes: "" }))
      .rejects.toMatchObject({ code: "validation" });
    const updated = await repository.update(CUSTOMER_SCOPE, { id: CUSTOMER_A.id, notes: "changed" });
    expect(updated.legacyFlag).toBe("keep");
  });
  it("uses deterministic invocation failures and queues concurrent writes without partial commits", async () => {
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A] });
    const repository = new MockCustomersRepository(store, {
      failureRules: [{ operation: "customers.update", invocation: 1 }],
      now: () => new Date("2026-02-01T00:00:00Z"),
    });
    await expect(repository.update(CUSTOMER_SCOPE, { id: CUSTOMER_A.id, name: "failed" }))
      .rejects.toMatchObject({ code: "configured_failure" });
    await repository.update(CUSTOMER_SCOPE, { id: CUSTOMER_A.id, name: "committed" });
    expect((await repository.getById(CUSTOMER_SCOPE, CUSTOMER_A.id)).name).toBe("committed");
    await Promise.all([
      repository.update(CUSTOMER_SCOPE, { id: CUSTOMER_A.id, name: "queued-name" }),
      repository.update(CUSTOMER_SCOPE, { id: CUSTOMER_A.id, notes: "queued-notes" }),
    ]);
    await expect(repository.getById(CUSTOMER_SCOPE, CUSTOMER_A.id)).resolves.toMatchObject({
      name: "queued-name", notes: "queued-notes",
    });
  });
});
