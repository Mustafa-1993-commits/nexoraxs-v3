import type {
  CommerceProjectionPort,
  LegacyCommerceOrderSummary,
  LegacyCommerceProductSummary,
  LegacyCommerceProjection,
  LegacyCommerceSetupSummary,
} from "@nexoraxs/contracts";
import type { LegacyCommerceIntegrationStore } from "./BrowserLegacyCommerceIntegrationStore";

type UnknownRecord = Readonly<Record<string, unknown>>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(record: UnknownRecord, key: string): string | null {
  return typeof record[key] === "string" ? record[key] : null;
}

function numberValue(record: UnknownRecord, key: string): number | null {
  return typeof record[key] === "number" && Number.isFinite(record[key]) ? record[key] : null;
}

function matchesScope(record: UnknownRecord, workspaceId: string, businessUnitId: string): boolean {
  return stringValue(record, "workspaceId") === workspaceId
    && stringValue(record, "businessUnitId") === businessUnitId;
}

function matchesBranch(record: UnknownRecord, branchId: string | null): boolean {
  return branchId === null || stringValue(record, "branchId") === branchId;
}

function productSummary(record: UnknownRecord): LegacyCommerceProductSummary | null {
  const id = stringValue(record, "id");
  const name = stringValue(record, "name");
  if (!id || !name) return null;
  return {
    id,
    name,
    stock: numberValue(record, "stock"),
    lowStockThreshold: numberValue(record, "lowStockThreshold"),
  };
}

function orderSummary(record: UnknownRecord): LegacyCommerceOrderSummary | null {
  const id = stringValue(record, "id");
  const orderNumber = stringValue(record, "orderNumber");
  const total = numberValue(record, "total");
  const createdAt = stringValue(record, "createdAt");
  if (!id || !orderNumber || total === null || !createdAt) return null;
  return { id, orderNumber, total, createdAt };
}

function setupSummary(record: UnknownRecord): LegacyCommerceSetupSummary {
  const value = (key: string): string | undefined => stringValue(record, key) ?? undefined;
  return {
    billingAddressLine1: value("billingAddressLine1") ?? value("address"),
    billingAddressLine2: value("billingAddressLine2"),
    billingCity: value("billingCity") ?? value("city"),
    billingCountry: value("billingCountry") ?? value("country"),
    billingPostalCode: value("billingPostalCode"),
    vatRegistered: typeof record.vatRegistered === "boolean" ? record.vatRegistered : undefined,
    vatNumber: value("taxNumber") ?? value("trn"),
  };
}

export class LegacyCommerceProjectionAdapter implements CommerceProjectionPort {
  constructor(private readonly store: LegacyCommerceIntegrationStore) {}

  async readProjection(input: Parameters<CommerceProjectionPort["readProjection"]>[0]): Promise<LegacyCommerceProjection> {
    const workspaceId = input.scope.workspaceId.trim();
    const businessUnitId = input.scope.legacyBusinessUnitId.trim();
    if (!workspaceId || !businessUnitId) throw new Error("commerce.projection.invalid_scope");
    const branchId = input.branchId?.trim() || null;
    const records = await this.store.readProjectionRecords();
    const products = records.products
      .filter(isRecord)
      .filter((record) => matchesScope(record, workspaceId, businessUnitId) && matchesBranch(record, branchId))
      .map(productSummary)
      .filter((record): record is LegacyCommerceProductSummary => record !== null);
    const orders = records.orders
      .filter(isRecord)
      .filter((record) => matchesScope(record, workspaceId, businessUnitId) && matchesBranch(record, branchId))
      .map(orderSummary)
      .filter((record): record is LegacyCommerceOrderSummary => record !== null);
    const setupRecord = records.setups
      .filter(isRecord)
      .find((record) => matchesScope(record, workspaceId, businessUnitId));

    return structuredClone({
      scope: { workspaceId, legacyBusinessUnitId: businessUnitId },
      branchId,
      products,
      orders,
      setup: setupRecord ? setupSummary(setupRecord) : null,
    });
  }
}
