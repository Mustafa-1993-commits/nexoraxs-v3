/**
 * Temporary frontend-only scope for the existing mock Product record.
 *
 * `legacyBusinessUnitId` names the identifier exactly for what it is: the current
 * legacy `BusinessUnit` storage identifier. It is not a canonical Business identity,
 * canonical Business Unit ancestry contract, or proof of authorization.
 */
export interface LegacyProductScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string;
}
