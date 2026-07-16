// @vitest-environment jsdom

import { beforeEach, describe } from "vitest";
import type { LegacyProductRecord } from "@nexoraxs/contracts";
import {
  BrowserStorageCommerceStore,
  LEGACY_PRODUCTS_STORAGE_KEY,
} from "../BrowserStorageCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";
import { runLegacyProductsRepositoryContract } from "./legacy-products-repository.contract";

describe("BrowserStorageCommerceStore LegacyProductsRepository contract", () => {
  beforeEach(() => window.localStorage.clear());

  runLegacyProductsRepositoryContract((records: readonly LegacyProductRecord[] = []) => {
    window.localStorage.setItem(LEGACY_PRODUCTS_STORAGE_KEY, JSON.stringify(records));
    const store = new BrowserStorageCommerceStore(window.localStorage);
    return {
      store,
      repository: new MockProductsRepository(store, {
        now: () => new Date("2026-07-17T10:00:00.000Z"),
        createId: () => "p_contract_1",
      }),
    };
  });
});
