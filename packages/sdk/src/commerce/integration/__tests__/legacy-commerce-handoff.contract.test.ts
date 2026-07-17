import { describe, expect, it } from "vitest";
import { BrowserLegacyCommerceIntegrationStore } from "../BrowserLegacyCommerceIntegrationStore";
import { LegacyCommerceHandoffIngress } from "../LegacyCommerceHandoffIngress";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

const validContext = {
  actorId: "user-1",
  workspaceId: "ws-1",
  legacyBusinessUnitId: "bu-1",
  branchId: "br-1",
  osId: "commerce" as const,
  osSubscriptionId: "sub-1",
  action: "setup",
};

describe("Feature 054 Commerce handoff ingress contract", () => {
  it("persists only existing compatibility session identifiers", async () => {
    const local = new MemoryStorage();
    const session = new MemoryStorage();
    const ingress = new LegacyCommerceHandoffIngress(
      new BrowserLegacyCommerceIntegrationStore({ localStorage: local, sessionStorage: session }),
    );

    await ingress.accept(validContext);

    expect(JSON.parse(session.getItem("nexoraxs.session.currentUserId")!)).toBe("user-1");
    expect(JSON.parse(session.getItem("nexoraxs.session.currentWorkspaceId")!)).toBe("ws-1");
    expect(JSON.parse(session.getItem("nexoraxs.session.currentBusinessUnitId")!)).toBe("bu-1");
    expect(JSON.parse(session.getItem("nexoraxs.session.currentBranchId")!)).toBe("br-1");
    expect(JSON.parse(session.getItem("nexoraxs.session.currentOSSubscriptionId")!)).toBe("sub-1");
    expect(JSON.parse(session.getItem("nexoraxs.session.currentOSId")!)).toBe("commerce");
    expect(local.length).toBe(0);
  });

  it("replaces stale session context but rejects missing or non-Commerce context", async () => {
    const session = new MemoryStorage();
    session.setItem("nexoraxs.session.currentWorkspaceId", JSON.stringify("ws-stale"));
    const ingress = new LegacyCommerceHandoffIngress(
      new BrowserLegacyCommerceIntegrationStore({ localStorage: new MemoryStorage(), sessionStorage: session }),
    );

    await ingress.accept(validContext);
    expect(JSON.parse(session.getItem("nexoraxs.session.currentWorkspaceId")!)).toBe("ws-1");
    await expect(ingress.accept({ ...validContext, actorId: "" })).rejects.toThrow("commerce.handoff.invalid_context");
    await expect(ingress.accept({ ...validContext, osId: "other" as "commerce" })).rejects.toThrow("commerce.handoff.invalid_context");
  });
});
