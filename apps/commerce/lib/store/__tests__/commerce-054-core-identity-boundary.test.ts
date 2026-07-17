import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Feature 054 Commerce identity ownership source boundary", () => {
  it("does not persist Core identity records while accepting a handoff", () => {
    const source = readFileSync(new URL("../AppProvider.tsx", import.meta.url), "utf8");
    expect(source).not.toContain("applyCommerceHandoffFromUrl");
    const handoffReader = source.slice(
      source.indexOf("function readCommerceHandoffFromUrl"),
      source.indexOf("async function acceptCommerceHandoff"),
    );
    for (const forbidden of [
      "writeCollection(STORAGE_KEYS.users",
      "writeCollection(STORAGE_KEYS.workspaces",
      "writeCollection(STORAGE_KEYS.businessUnits",
      "writeCollection(STORAGE_KEYS.branches",
      "writeCollection(STORAGE_KEYS.osSubscriptions",
      "writeCollection(STORAGE_KEYS.osEnablements",
    ]) {
      expect(handoffReader, forbidden).not.toContain(forbidden);
    }
  });
});
