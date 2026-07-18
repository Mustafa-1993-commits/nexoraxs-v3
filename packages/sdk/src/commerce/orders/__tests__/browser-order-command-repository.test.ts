import { describe, expect, it } from "vitest";
import { LegacyOrderCommandRepositoryError } from "@nexoraxs/contracts";
import { BrowserStorageCommerceStore, LEGACY_ORDERS_STORAGE_KEY } from "../../products/BrowserStorageCommerceStore";
import { LocalOrderCommandRepository } from "../LocalOrderCommandRepository";
import { commerce055Order } from "../../../../../../apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";
import { foreignOrder, verifyLegacyOrderCommandRepository } from "./legacy-order-command-repository.contract";

describe("browser Order command repository", () => {
  it("passes the reusable contract on the unchanged key and preserves unknown fields", () => {
    const values = new Map([[LEGACY_ORDERS_STORAGE_KEY, JSON.stringify([
      foreignOrder,
      { ...commerce055Order, compatibilityUnknown: "preserved" },
    ])]]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
    const store = new BrowserStorageCommerceStore(storage);
    verifyLegacyOrderCommandRepository({
      repository: new LocalOrderCommandRepository(store),
      readRaw: () => JSON.parse(values.get(LEGACY_ORDERS_STORAGE_KEY) ?? "[]") as unknown[],
    });
    expect(values.has(LEGACY_ORDERS_STORAGE_KEY)).toBe(true);
  });

  it("classifies corrupt and unavailable storage", () => {
    const corrupt = new BrowserStorageCommerceStore({ getItem: () => "{}", setItem: () => undefined });
    expect(() => new LocalOrderCommandRepository(corrupt).listForNumbering({ workspaceId: "ws", legacyBusinessUnitId: "bu" }))
      .toThrowError(LegacyOrderCommandRepositoryError);
  });
});
