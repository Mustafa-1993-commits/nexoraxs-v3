import type { LegacyJsonValue } from "../products";

/** Existing browser Customer record; not a canonical Customer aggregate. */
export interface LegacyCustomerCompatibilityRecord {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: LegacyJsonValue | undefined;
}

export interface CreateLegacyCustomerCommand {
  readonly branchId: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly notes: string;
}

export interface UpdateLegacyCustomerCommand {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly notes?: string;
}
