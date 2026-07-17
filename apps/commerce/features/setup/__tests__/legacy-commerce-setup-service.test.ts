import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyCommerceSetupService } from "../application/LegacyCommerceSetupService";
import { deterministic } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

const context = { workspaceId: "ws", legacyBusinessUnitId: "bu", osSubscriptionId: "sub", industryOrPreset: "pharmacy" };

describe("LegacyCommerceSetupService", () => {
  it("returns virtual scoped defaults without writing", () => {
    const store = new MemoryLegacyCommerceOperationsStore();
    expect(new LegacyCommerceSetupService(store, deterministic()).read(context)).toMatchObject({ id: "", workspaceId: "ws", businessUnitId: "bu", preset: "pharmacy" });
    expect(store.writes).toEqual([]);
  });

  it("strips caller identity and persists one compatible snapshot", () => {
    const store = new MemoryLegacyCommerceOperationsStore();
    const result = new LegacyCommerceSetupService(store, deterministic()).save({ context, changes: { id: "caller", displayName: "Store", createdAt: "caller" } });
    expect(result.setup).toMatchObject({ id: "cs-1", displayName: "Store", workspaceId: "ws", createdAt: "2026-07-17T00:00:00.000Z" });
    expect(store.writes).toEqual(["setups"]);
  });
});
