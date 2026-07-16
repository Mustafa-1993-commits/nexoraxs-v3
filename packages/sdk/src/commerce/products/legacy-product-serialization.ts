import {
  LegacyProductRepositoryError,
  type CreateLegacyProductCommand,
  type LegacyJsonValue,
  type LegacyProductRecord,
  type LegacyProductScope,
  type UpdateLegacyProductCommand,
} from "@nexoraxs/contracts";

const MAX_PERSISTABLE_IMAGE_CHARS = 90 * 1024;
const IMMUTABLE_FIELDS = new Set(["id", "workspaceId", "businessUnitId", "createdAt", "updatedAt"]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new LegacyProductRepositoryError({
      code: "storage",
      messageKey: "products.errors.corrupt_record",
      fieldIssues: [{ field, messageKey: "products.errors.required" }],
    });
  }
  return value;
}

function stringOr(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function persistableImage(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string" || value.startsWith("blob:")) return null;
  if (value.startsWith("data:") && value.length > MAX_PERSISTABLE_IMAGE_CHARS) return null;
  return value;
}

export function parseLegacyProductRecord(value: unknown): LegacyProductRecord {
  if (!isObject(value)) {
    throw new LegacyProductRepositoryError({
      code: "storage",
      messageKey: "products.errors.corrupt_record",
    });
  }

  const record: LegacyProductRecord = {
    ...(value as Record<string, LegacyJsonValue | undefined>),
    id: requiredString(value.id, "id"),
    workspaceId: requiredString(value.workspaceId, "workspaceId"),
    businessUnitId: requiredString(value.businessUnitId, "businessUnitId"),
    branchId: stringOr(value.branchId),
    osSubscriptionId: stringOr(value.osSubscriptionId),
    name: requiredString(value.name, "name"),
    category: stringOr(value.category, "General"),
    sku: stringOr(value.sku),
    barcode: stringOr(value.barcode),
    price: numberOr(value.price, 0),
    cost: numberOr(value.cost, 0),
    taxable: typeof value.taxable === "boolean" ? value.taxable : true,
    stock: value.stock === null ? null : numberOr(value.stock, 0),
    lowStockThreshold: numberOr(value.lowStockThreshold, numberOr(value.low, 5)),
    notes: stringOr(value.notes),
    createdAt: stringOr(value.createdAt),
    updatedAt: stringOr(value.updatedAt),
  };

  const unit = optionalString(value.unit);
  const brand = optionalString(value.brand);
  const expiry = optionalString(value.expiry);
  const image = persistableImage(value.image);
  const low = typeof value.low === "number" && Number.isFinite(value.low) ? value.low : undefined;
  if (unit !== undefined) record.unit = unit;
  if (brand !== undefined) record.brand = brand;
  if (expiry !== undefined) record.expiry = expiry;
  if (image !== undefined) record.image = image;
  if (low !== undefined) record.low = low;
  return record;
}

export function parseLegacyProductRecords(values: readonly unknown[]): LegacyProductRecord[] {
  return values.map(parseLegacyProductRecord);
}

export function validateCreateCommand(command: CreateLegacyProductCommand): CreateLegacyProductCommand {
  const issues: { field: string; messageKey: string }[] = [];
  const name = command.name.trim();
  if (name.length < 3) issues.push({ field: "name", messageKey: "products.errors.name" });
  if (!Number.isFinite(command.price) || command.price <= 0) {
    issues.push({ field: "price", messageKey: "products.errors.price" });
  }
  if (!Number.isFinite(command.cost) || command.cost < 0) {
    issues.push({ field: "cost", messageKey: "products.errors.cost" });
  }
  if (command.stock !== null && (!Number.isFinite(command.stock) || command.stock < 0)) {
    issues.push({ field: "stock", messageKey: "products.errors.stock" });
  }
  if (!Number.isFinite(command.lowStockThreshold) || command.lowStockThreshold < 0) {
    issues.push({ field: "lowStockThreshold", messageKey: "products.errors.low_stock" });
  }
  if (issues.length > 0) {
    throw new LegacyProductRepositoryError({
      code: "validation",
      messageKey: "products.errors.validation",
      fieldIssues: issues,
    });
  }

  return {
    ...command,
    name,
    category: command.category.trim() || "General",
    sku: command.sku.trim(),
    barcode: command.barcode.trim(),
    notes: command.notes.trim(),
    brand: command.brand?.trim(),
    unit: command.unit?.trim(),
    expiry: command.expiry?.trim(),
    image: persistableImage(command.image),
  };
}

export function createLegacyProductRecord(input: {
  scope: LegacyProductScope;
  command: CreateLegacyProductCommand;
  id: string;
  timestamp: string;
}): LegacyProductRecord {
  const command = validateCreateCommand(input.command);
  const compatibilityFields = command.compatibilityFields ?? {};

  return parseLegacyProductRecord({
    ...compatibilityFields,
    ...command,
    compatibilityFields: undefined,
    id: input.id,
    workspaceId: input.scope.workspaceId,
    businessUnitId: input.scope.legacyBusinessUnitId,
    branchId: command.branchId ?? input.scope.branchId ?? "",
    osSubscriptionId: command.osSubscriptionId ?? "",
    createdAt: input.timestamp,
    updatedAt: input.timestamp,
  });
}

export function updateLegacyProductRecord(input: {
  record: LegacyProductRecord;
  command: UpdateLegacyProductCommand;
  timestamp: string;
}): LegacyProductRecord {
  const entries = Object.entries(input.command).filter(([key, value]) => (
    value !== undefined && key !== "compatibilityFields" && !IMMUTABLE_FIELDS.has(key)
  ));
  const compatibilityEntries = Object.entries(input.command.compatibilityFields ?? {})
    .filter(([key]) => !IMMUTABLE_FIELDS.has(key));
  if (entries.length === 0 && compatibilityEntries.length === 0) {
    throw new LegacyProductRepositoryError({
      code: "validation",
      messageKey: "products.errors.empty_update",
    });
  }

  const candidate = {
    ...input.record,
    ...Object.fromEntries(compatibilityEntries),
    ...Object.fromEntries(entries),
    id: input.record.id,
    workspaceId: input.record.workspaceId,
    businessUnitId: input.record.businessUnitId,
    createdAt: input.record.createdAt,
    updatedAt: input.timestamp,
  };

  const normalized = createLegacyProductRecord({
    scope: {
      workspaceId: input.record.workspaceId,
      legacyBusinessUnitId: input.record.businessUnitId,
      branchId: candidate.branchId,
    },
    command: {
      name: candidate.name,
      category: candidate.category,
      sku: candidate.sku,
      barcode: candidate.barcode,
      price: candidate.price,
      cost: candidate.cost,
      taxable: candidate.taxable,
      stock: candidate.stock,
      lowStockThreshold: candidate.lowStockThreshold,
      notes: candidate.notes,
      branchId: candidate.branchId,
      osSubscriptionId: candidate.osSubscriptionId,
      unit: candidate.unit,
      low: candidate.low,
      brand: candidate.brand,
      expiry: candidate.expiry,
      image: candidate.image,
      compatibilityFields: Object.fromEntries(
        Object.entries(candidate).filter(([key]) => ![
          "id", "workspaceId", "businessUnitId", "branchId", "osSubscriptionId", "name",
          "category", "sku", "barcode", "price", "cost", "taxable", "stock", "unit", "low",
          "lowStockThreshold", "brand", "expiry", "image", "notes", "createdAt", "updatedAt",
        ].includes(key)),
      ) as Record<string, LegacyJsonValue>,
    },
    id: input.record.id,
    timestamp: input.timestamp,
  });
  return {
    ...normalized,
    createdAt: input.record.createdAt,
    updatedAt: input.timestamp,
  };
}
