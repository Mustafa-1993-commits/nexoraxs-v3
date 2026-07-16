import { describe, expect, it } from "vitest";
import {
  legacyProductKeys,
  normalizeLegacyProductListQuery,
} from "../hooks/legacy-product-query-keys";

const scope = {
  workspaceId: " ws-a ",
  legacyBusinessUnitId: " legacy-bu-a ",
  branchId: " branch-a ",
};

describe("legacy Product query keys", () => {
  it("contains the complete normalized applicable scope in every key", () => {
    expect(legacyProductKeys.scope(scope)).toEqual([
      "commerce",
      "legacy-products",
      "ws-a",
      "legacy-bu-a",
      "branch-a",
    ]);
    expect(legacyProductKeys.list(scope, { pageSize: 25, page: 2 })).toEqual([
      "commerce",
      "legacy-products",
      "ws-a",
      "legacy-bu-a",
      "branch-a",
      "list",
      { page: 2, pageSize: 25 },
    ]);
    expect(legacyProductKeys.item(scope, " product-a ")).toEqual([
      "commerce",
      "legacy-products",
      "ws-a",
      "legacy-bu-a",
      "branch-a",
      "item",
      "product-a",
    ]);
  });

  it("uses a serializable null marker when Branch does not shape the view", () => {
    expect(legacyProductKeys.scope({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" })).toEqual([
      "commerce",
      "legacy-products",
      "ws-a",
      "bu-a",
      null,
    ]);
  });

  it("normalizes equivalent list inputs to the same stable object shape", () => {
    expect(normalizeLegacyProductListQuery({ pageSize: 20, page: 1 })).toEqual({ page: 1, pageSize: 20 });
    expect(legacyProductKeys.list(scope, { pageSize: 20, page: 1 })).toEqual(
      legacyProductKeys.list(scope, { page: 1, pageSize: 20 }),
    );
  });

  it("does not invent canonical Business scope in the cache identity", () => {
    expect(JSON.stringify(legacyProductKeys.item(scope, "p1"))).not.toContain("businessId");
  });
});
