import type { LegacyCommerceBusinessUnitScope } from "../common";

export interface LegacyOrderNumberPort {
  next(scope: LegacyCommerceBusinessUnitScope): string;
}

