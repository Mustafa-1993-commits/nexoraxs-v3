import { describe } from "vitest";
import type { LegacyProductRecord } from "@nexoraxs/contracts";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";
import { runLegacyProductsRepositoryContract } from "./legacy-products-repository.contract";

describe("MemoryCommerceStore LegacyProductsRepository contract", () => {
  runLegacyProductsRepositoryContract((records: readonly LegacyProductRecord[] = []) => {
    const store = new MemoryCommerceStore(records);
    return {
      store,
      repository: new MockProductsRepository(store, {
        now: () => new Date("2026-07-17T10:00:00.000Z"),
        createId: () => "p_contract_1",
      }),
    };
  });
});
