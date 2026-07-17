import type {
  CommerceProjectionPort as PublicCommerceProjectionPort,
  LegacyCommerceProjection,
} from "@nexoraxs/contracts";

export type CommerceProjectionPort = PublicCommerceProjectionPort;

export type CoreCommerceProjection = LegacyCommerceProjection & Readonly<{
  isSetupComplete: boolean;
}>;

export function emptyCoreCommerceProjection(input: {
  readonly workspaceId?: string | null;
  readonly legacyBusinessUnitId?: string | null;
  readonly branchId?: string | null;
} = {}): CoreCommerceProjection {
  return {
    scope: {
      workspaceId: input.workspaceId ?? "",
      legacyBusinessUnitId: input.legacyBusinessUnitId ?? "",
    },
    branchId: input.branchId ?? null,
    products: [],
    orders: [],
    setup: null,
    isSetupComplete: false,
  };
}

export async function readCoreCommerceProjection(
  port: CommerceProjectionPort,
  input: {
    readonly workspaceId: string;
    readonly legacyBusinessUnitId: string;
    readonly branchId?: string | null;
  },
): Promise<CoreCommerceProjection> {
  const projection = await port.readProjection({
    scope: {
      workspaceId: input.workspaceId,
      legacyBusinessUnitId: input.legacyBusinessUnitId,
    },
    branchId: input.branchId,
  });
  return { ...projection, isSetupComplete: projection.setup !== null };
}
