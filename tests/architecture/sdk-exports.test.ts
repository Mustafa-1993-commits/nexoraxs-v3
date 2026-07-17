import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("SDK public surface", () => {
  it("exposes only root and testing paths and keeps concrete infrastructure out of root", () => {
    const manifest = JSON.parse(readFileSync("packages/sdk/package.json", "utf8")) as { exports: Record<string, string> };
    expect(Object.keys(manifest.exports).sort()).toEqual([".", "./testing"]);
    const root = readFileSync("packages/sdk/src/index.ts", "utf8");
    for (const concrete of ["MockProductsRepository", "MemoryCommerceStore", "BrowserStorageCommerceStore", "LegacyProductsCompatibilityFacade", "serialization", "Behavior"]) {
      expect(root).not.toContain(concrete);
    }
    const testing = readFileSync("packages/sdk/src/testing/index.ts", "utf8");
    expect(testing).toContain("MemoryCommerceStore");
  });
});
