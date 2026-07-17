import type { LegacyCommerceHandoffContext } from "@nexoraxs/contracts";

const PRODUCTS_KEY = "nexoraxs.db.commerceProducts";
const ORDERS_KEY = "nexoraxs.db.commerceOrders";
const SETUPS_KEY = "nexoraxs.db.commerceSetups";

const SESSION_KEYS = Object.freeze({
  actorId: "nexoraxs.session.currentUserId",
  workspaceId: "nexoraxs.session.currentWorkspaceId",
  osId: "nexoraxs.session.currentOSId",
  osSubscriptionId: "nexoraxs.session.currentOSSubscriptionId",
  legacyBusinessUnitId: "nexoraxs.session.currentBusinessUnitId",
  branchId: "nexoraxs.session.currentBranchId",
  onboardingState: "nexoraxs.session.onboardingState",
});

export interface LegacyBrowserStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface LegacyCommerceProjectionRecords {
  readonly products: readonly unknown[];
  readonly orders: readonly unknown[];
  readonly setups: readonly unknown[];
}

export interface LegacyCommerceIntegrationStore {
  readProjectionRecords(): Promise<LegacyCommerceProjectionRecords>;
  persistHandoff(context: LegacyCommerceHandoffContext): Promise<void>;
}

export class BrowserLegacyCommerceIntegrationStore implements LegacyCommerceIntegrationStore {
  private readonly localStorage: LegacyBrowserStorageLike | null;
  private readonly sessionStorage: LegacyBrowserStorageLike | null;

  constructor(input: {
    readonly localStorage?: LegacyBrowserStorageLike;
    readonly sessionStorage?: LegacyBrowserStorageLike;
  } = {}) {
    this.localStorage = input.localStorage
      ?? (typeof window === "undefined" ? null : window.localStorage);
    this.sessionStorage = input.sessionStorage
      ?? (typeof window === "undefined" ? null : window.sessionStorage);
  }

  async readProjectionRecords(): Promise<LegacyCommerceProjectionRecords> {
    if (!this.localStorage) throw new Error("commerce.integration.storage_unavailable");
    return {
      products: this.readArray(PRODUCTS_KEY),
      orders: this.readArray(ORDERS_KEY),
      setups: this.readArray(SETUPS_KEY),
    };
  }

  async persistHandoff(context: LegacyCommerceHandoffContext): Promise<void> {
    if (!this.sessionStorage) throw new Error("commerce.integration.storage_unavailable");
    const values: ReadonlyArray<readonly [string, string | null | undefined]> = [
      [SESSION_KEYS.actorId, context.actorId],
      [SESSION_KEYS.workspaceId, context.workspaceId],
      [SESSION_KEYS.osId, context.osId],
      [SESSION_KEYS.osSubscriptionId, context.osSubscriptionId],
      [SESSION_KEYS.legacyBusinessUnitId, context.legacyBusinessUnitId],
      [SESSION_KEYS.branchId, context.branchId],
    ];
    for (const [key, value] of values) {
      if (value) this.sessionStorage.setItem(key, JSON.stringify(value));
      else this.sessionStorage.removeItem(key);
    }
    this.sessionStorage.setItem(
      SESSION_KEYS.onboardingState,
      JSON.stringify({ phase: null, step: 0, completedOS: ["commerce"] }),
    );
  }

  private readArray(key: string): readonly unknown[] {
    const raw = this.localStorage?.getItem(key);
    if (raw === null || raw === undefined) return [];
    try {
      const value: unknown = JSON.parse(raw);
      if (!Array.isArray(value)) throw new Error("expected_array");
      return structuredClone(value);
    } catch (cause) {
      throw new Error("commerce.integration.storage_corrupt", { cause });
    }
  }
}
