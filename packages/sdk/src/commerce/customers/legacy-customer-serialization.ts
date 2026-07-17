import {
  LegacyCommerceRepositoryError,
  type CreateLegacyCustomerCommand,
  type LegacyCustomerCompatibilityRecord,
  type LegacyJsonValue,
  type UpdateLegacyCustomerCommand,
} from "@nexoraxs/contracts";

function object(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation: "customers.list" });
  }
  return value as Record<string, unknown>;
}

function required(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation: "customers.list" });
  }
  return value;
}

function optional(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function parseLegacyCustomerRecord(value: unknown): LegacyCustomerCompatibilityRecord {
  const source = object(value);
  return {
    ...(source as Record<string, LegacyJsonValue | undefined>),
    id: required(source.id),
    workspaceId: required(source.workspaceId),
    businessUnitId: required(source.businessUnitId),
    branchId: required(source.branchId),
    name: required(source.name),
    phone: optional(source.phone),
    email: optional(source.email),
    notes: optional(source.notes),
    createdAt: required(source.createdAt),
    updatedAt: required(source.updatedAt),
  };
}

export function parseLegacyCustomerRecords(values: readonly unknown[]): LegacyCustomerCompatibilityRecord[] {
  return values.map(parseLegacyCustomerRecord);
}

function validateFields(input: { name: string; phone: string; email: string; notes: string }) {
  const name = input.name.trim();
  if (!name) {
    throw new LegacyCommerceRepositoryError({
      code: "validation",
      operation: "customers.create",
      fieldIssues: [{ field: "name", code: "required" }],
    });
  }
  return { name, phone: input.phone.trim(), email: input.email.trim(), notes: input.notes.trim() };
}

export function createLegacyCustomerRecord(input: {
  readonly scope: { workspaceId: string; legacyBusinessUnitId: string };
  readonly command: CreateLegacyCustomerCommand;
  readonly id: string;
  readonly timestamp: string;
}): LegacyCustomerCompatibilityRecord {
  const branchId = input.command.branchId.trim();
  if (!branchId) {
    throw new LegacyCommerceRepositoryError({
      code: "validation",
      operation: "customers.create",
      fieldIssues: [{ field: "branchId", code: "required" }],
    });
  }
  return {
    id: input.id,
    workspaceId: input.scope.workspaceId,
    businessUnitId: input.scope.legacyBusinessUnitId,
    branchId,
    ...validateFields(input.command),
    createdAt: input.timestamp,
    updatedAt: input.timestamp,
  };
}

export function updateLegacyCustomerRecord(input: {
  readonly record: LegacyCustomerCompatibilityRecord;
  readonly command: UpdateLegacyCustomerCommand;
  readonly timestamp: string;
}): LegacyCustomerCompatibilityRecord {
  const entries = (["name", "phone", "email", "notes"] as const)
    .filter((field) => input.command[field] !== undefined);
  if (entries.length === 0) {
    throw new LegacyCommerceRepositoryError({ code: "validation", operation: "customers.update" });
  }
  const next = { ...input.record };
  for (const field of entries) next[field] = input.command[field]!.trim();
  if (!next.name) {
    throw new LegacyCommerceRepositoryError({
      code: "validation",
      operation: "customers.update",
      fieldIssues: [{ field: "name", code: "required" }],
    });
  }
  next.updatedAt = input.timestamp;
  return parseLegacyCustomerRecord(next);
}
