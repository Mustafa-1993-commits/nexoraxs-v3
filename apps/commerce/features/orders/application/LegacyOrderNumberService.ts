import type {
  LegacyCommerceBusinessUnitScope,
  LegacyOrderCommandRepository,
  LegacyOrderNumberPort,
} from "@nexoraxs/contracts";

/** Exact count-based compatibility numbering; it is not a reservation or backend policy. */
export class LegacyOrderNumberService implements LegacyOrderNumberPort {
  constructor(private readonly orders: LegacyOrderCommandRepository) {}

  next(scope: LegacyCommerceBusinessUnitScope): string {
    const count = this.orders.listForNumbering(scope).length;
    return `ORD-${String(count + 1).padStart(4, "0")}`;
  }
}
