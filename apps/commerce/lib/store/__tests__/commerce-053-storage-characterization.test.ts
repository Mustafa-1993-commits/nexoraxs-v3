// @vitest-environment jsdom

import { afterEach, describe, expect, it } from "vitest";
import { readCollection, writeCollection } from "@nexoraxs/shared";

const KEY = "nexoraxs.db.commerceCustomers";

afterEach(() => localStorage.clear());

describe("Feature 053 storage characterization", () => {
  it("round-trips ordering and unknown serializable fields without normalization", () => {
    const records = [
      { id: "c-1", workspaceId: "ws", businessUnitId: "bu", branchId: "br", name: "A", opaque: { keep: true } },
      { id: "c-2", workspaceId: "ws", businessUnitId: "bu", branchId: "br", name: "B", extra: [1, 2] },
    ];
    writeCollection(KEY, records);
    expect(readCollection(KEY)).toEqual(records);
    expect(JSON.parse(localStorage.getItem(KEY) || "[]").map((record: { id: string }) => record.id))
      .toEqual(["c-1", "c-2"]);
  });

  it("returns the existing safe empty fallback for corrupt JSON", () => {
    localStorage.setItem(KEY, "{corrupt");
    expect(readCollection(KEY)).toEqual([]);
  });
});
