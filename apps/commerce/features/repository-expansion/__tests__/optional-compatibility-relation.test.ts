import { describe, expect, it } from "vitest";
import { LegacyCommerceRepositoryError } from "@nexoraxs/contracts";
import { optionalCompatibilityRelation } from "../application/optionalCompatibilityRelation";

describe("optionalCompatibilityRelation", () => {
  it("maps only typed not_found to null", async () => {
    await expect(optionalCompatibilityRelation(async () => { throw new LegacyCommerceRepositoryError({ code: "not_found", operation: "orders.getById" }); })).resolves.toBeNull();
    await expect(optionalCompatibilityRelation(async () => "value")).resolves.toBe("value");
  });

  it.each(["invalid_scope", "validation", "scope_mismatch", "configured_failure", "storage_unavailable", "configuration"] as const)("propagates %s", async (code) => {
    const error = new LegacyCommerceRepositoryError({ code, operation: "orders.getById" });
    await expect(optionalCompatibilityRelation(async () => { throw error; })).rejects.toBe(error);
  });

  it("propagates unknown and future transport-like failures unchanged", async () => {
    const error = new Error("transport");
    await expect(optionalCompatibilityRelation(async () => { throw error; })).rejects.toBe(error);
  });
});
