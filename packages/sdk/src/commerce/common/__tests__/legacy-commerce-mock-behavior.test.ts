import { describe, expect, it, vi } from "vitest";
import { LegacyCommerceMockBehavior } from "../legacy-commerce-mock-behavior";
describe("legacy Commerce deterministic behavior", () => {
  it("matches a stable invocation and emits sanitized diagnostics", async () => {
    vi.useFakeTimers(); const diagnostic = vi.fn();
    const behavior = new LegacyCommerceMockBehavior({ latencyMs: 5, failureRules: [{ operation: "orders.list", invocation: 2 }], onDiagnostic: diagnostic });
    const scope = { workspaceId: "workspace-secret", legacyBusinessUnitId: "unit-secret" };
    const first = behavior.execute({ operation: "orders.list", scope, action: async () => "first" });
    await vi.advanceTimersByTimeAsync(5); await expect(first).resolves.toBe("first");
    const second = behavior.execute({ operation: "orders.list", scope, action: async () => "second" });
    const failure = expect(second).rejects.toMatchObject({ code: "configured_failure" });
    await vi.advanceTimersByTimeAsync(5); await failure;
    expect(JSON.stringify(diagnostic.mock.calls)).not.toContain("workspace-secret");
    vi.useRealTimers();
  });
});
