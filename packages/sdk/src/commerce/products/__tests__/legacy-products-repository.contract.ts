import { expect, it } from "vitest";
import type {
  CreateLegacyProductCommand,
  LegacyProductRecord,
  LegacyProductsRepository,
} from "@nexoraxs/contracts";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import type { MockCommerceStore } from "../MockCommerceStore";
import {
  createLegacyProductFixtures,
  LEGACY_SCOPE_A,
  LEGACY_SCOPE_B,
} from "./legacy-product-fixtures";

export interface LegacyProductsRepositoryHarness {
  readonly repository: LegacyProductsRepository;
  readonly store: MockCommerceStore;
}

const createCommand = (overrides: Partial<CreateLegacyProductCommand> = {}): CreateLegacyProductCommand => ({
  name: "Created Product",
  category: "General",
  sku: "CREATED-001",
  barcode: "BAR-CREATED",
  price: 25,
  cost: 10,
  taxable: true,
  stock: 4,
  lowStockThreshold: 1,
  notes: "",
  branchId: LEGACY_SCOPE_A.branchId,
  osSubscriptionId: "sub-commerce",
  ...overrides,
});

function expectRepositoryError(error: unknown, code: LegacyProductRepositoryError["code"]): boolean {
  expect(error).toBeInstanceOf(LegacyProductRepositoryError);
  expect((error as LegacyProductRepositoryError).code).toBe(code);
  return true;
}

export function runLegacyProductsRepositoryContract(
  createHarness: (records?: readonly LegacyProductRecord[]) => LegacyProductsRepositoryHarness,
) {
  it("lists and retrieves only the requested legacy scope", async () => {
    const { repository } = createHarness(createLegacyProductFixtures());

    const result = await repository.list(LEGACY_SCOPE_A);

    expect(result.items.map((record) => record.name)).toEqual(["Workspace A Product"]);
    await expect(repository.getById(LEGACY_SCOPE_A, "shared-product-id")).resolves.toMatchObject({
      workspaceId: "ws-a",
      businessUnitId: "legacy-bu-shared",
    });
  });

  it("creates a final compatible record with controlled identity and scope", async () => {
    const { repository } = createHarness(createLegacyProductFixtures());

    const created = await repository.create(LEGACY_SCOPE_A, createCommand());

    expect(created).toMatchObject({
      id: "p_contract_1",
      workspaceId: LEGACY_SCOPE_A.workspaceId,
      businessUnitId: LEGACY_SCOPE_A.legacyBusinessUnitId,
      branchId: LEGACY_SCOPE_A.branchId,
      name: "Created Product",
      sku: "CREATED-001",
    });
    expect(created.createdAt).toBe("2026-07-17T10:00:00.000Z");
  });

  it("updates the final record while preserving unknown compatibility fields", async () => {
    const { repository } = createHarness(createLegacyProductFixtures());

    const updated = await repository.update(LEGACY_SCOPE_A, "shared-product-id", {
      name: "Workspace A Product Updated",
    });

    expect(updated.name).toBe("Workspace A Product Updated");
    expect(updated.compatibilityMarker).toEqual({ source: "workspace-a" });
    expect(updated.id).toBe("shared-product-id");
    expect(updated.createdAt).toBe("2026-01-01T00:00:00.000Z");
  });

  it("removes only the matching scoped record", async () => {
    const { repository, store } = createHarness(createLegacyProductFixtures());

    await expect(repository.remove(LEGACY_SCOPE_A, "shared-product-id")).resolves.toEqual({
      removedId: "shared-product-id",
    });

    const stored = await store.readProducts() as LegacyProductRecord[];
    expect(stored).toHaveLength(2);
    expect(stored.some((record) => record.workspaceId === LEGACY_SCOPE_B.workspaceId)).toBe(true);
    await expect(repository.remove(LEGACY_SCOPE_A, "shared-product-id")).rejects.toSatisfy((error) => (
      expectRepositoryError(error, "not_found")
    ));
  });

  it("paginates in stored order and rejects incomplete pagination", async () => {
    const records = createLegacyProductFixtures();
    const base = records[0];
    const { repository } = createHarness([
      ...records,
      { ...base, id: "a-second", name: "Second", sku: "A-SECOND" },
      { ...base, id: "a-third", name: "Third", sku: "A-THIRD" },
    ]);

    await expect(repository.list(LEGACY_SCOPE_A, { page: 2, pageSize: 1 })).resolves.toMatchObject({
      total: 3,
      page: 2,
      pageSize: 1,
      hasNextPage: true,
      items: [{ id: "a-second" }],
    });
    await expect(repository.list(LEGACY_SCOPE_A, { page: 1 })).rejects.toSatisfy((error) => (
      expectRepositoryError(error, "validation")
    ));
  });

  it("rejects normalized duplicate SKU without mutating state", async () => {
    const fixtures = createLegacyProductFixtures();
    const { repository, store } = createHarness(fixtures);

    await expect(repository.create(LEGACY_SCOPE_A, createCommand({ sku: "  shared-sku  " })))
      .rejects.toSatisfy((error) => expectRepositoryError(error, "duplicate_sku"));

    expect(await store.readProducts()).toEqual(fixtures);
  });

  it("returns non-leaking internal not-found behavior", async () => {
    const { repository } = createHarness(createLegacyProductFixtures());

    await expect(repository.getById(LEGACY_SCOPE_A, "missing-product"))
      .rejects.toSatisfy((error) => expectRepositoryError(error, "not_found"));
  });
}
