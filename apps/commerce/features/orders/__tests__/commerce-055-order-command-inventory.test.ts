import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Feature 055 durable Order command inventory", () => {
  it("keeps only create, Return patch, and demo seed owner paths", () => {
    const contract = readFileSync(join(process.cwd(), "packages/contracts/src/commerce/orders/legacy-order-command-repository.ts"), "utf8");
    expect(contract).toContain("create(scope");
    expect(contract).toContain("applyReturnCompatibilityPatch");
    expect(contract).toContain("replaceDemoSeed");
    for (const absent of ["delete(", "cancel(", "changeStatus(", "updateItem(", "updatePrice(", "reserve(", "release("]) {
      expect(contract).not.toContain(absent);
    }
  });
});
