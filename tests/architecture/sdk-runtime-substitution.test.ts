import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("SDK runtime substitution surface", () => {
  it("keeps concrete infrastructure private while allowing test-only memory substitution", () => {
    const manifest = JSON.parse(readFileSync("packages/sdk/package.json", "utf8")) as { exports: Record<string, string> };
    expect(manifest.exports).toEqual({ ".": "./src/index.ts", "./testing": "./src/testing/index.ts" });
    expect(readFileSync("packages/sdk/src/testing/index.ts", "utf8")).toContain("MemoryLegacyCommerceOperationsStore");
    expect(readFileSync("packages/sdk/src/index.ts", "utf8")).not.toContain("MemoryLegacyCommerceOperationsStore");
  });
});
