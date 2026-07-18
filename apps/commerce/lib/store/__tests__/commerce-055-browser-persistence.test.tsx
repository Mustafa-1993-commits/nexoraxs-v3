// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { LegacyOrderCommandRepositoryError } from "@nexoraxs/contracts";
import { BrowserStorageCommerceStore, LEGACY_ORDERS_STORAGE_KEY } from "../../../../../packages/sdk/src/commerce/products/BrowserStorageCommerceStore";
import { LocalOrderCommandRepository } from "../../../../../packages/sdk/src/commerce/orders/LocalOrderCommandRepository";
import { BrowserLegacyPosLastOrderAdapter } from "@/lib/commerce/pos/BrowserLegacyPosLastOrderAdapter";
import { commerce055Order, commerce055Scope } from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("Feature 055 browser persistence", () => {
  it("preserves the exact Order key, serialized unknown fields, refresh read, and raw last-Order key", () => {
    localStorage.clear(); sessionStorage.clear();
    const repository = new LocalOrderCommandRepository(new BrowserStorageCommerceStore(localStorage));
    repository.create(commerce055Scope, { ...commerce055Order, compatibilityUnknown: "keep" } as typeof commerce055Order);
    expect(JSON.parse(localStorage.getItem(LEGACY_ORDERS_STORAGE_KEY) ?? "[]")).toMatchObject([{ compatibilityUnknown: "keep" }]);
    expect(new LocalOrderCommandRepository(new BrowserStorageCommerceStore(localStorage)).getById(commerce055Scope, commerce055Order.id)).toMatchObject(commerce055Order);
    const lastOrder = new BrowserLegacyPosLastOrderAdapter();
    lastOrder.write(commerce055Order.id);
    expect(sessionStorage.getItem("nx_last_order_id")).toBe(commerce055Order.id);
  });

  it("surfaces corruption, unavailable storage, and write quota failures", () => {
    const corrupt = new BrowserStorageCommerceStore({ getItem: () => "not-json", setItem: () => undefined });
    expect(() => new LocalOrderCommandRepository(corrupt).listForNumbering(commerce055Scope)).toThrowError(LegacyOrderCommandRepositoryError);
    const quota = new BrowserStorageCommerceStore({ getItem: () => "[]", setItem: () => { throw new Error("quota"); } });
    expect(() => new LocalOrderCommandRepository(quota).create(commerce055Scope, commerce055Order)).toThrowError(LegacyOrderCommandRepositoryError);
  });
});
