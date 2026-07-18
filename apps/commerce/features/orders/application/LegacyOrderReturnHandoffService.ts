import type {
  LegacyCommerceBranchScope,
  LegacyOrderCommandRepository,
  LegacyOrderReturnCompatibilityPatch,
  LegacyOrderReturnHandoffPort,
} from "@nexoraxs/contracts";

/** Orders-owned compatibility handoff; Return notification timing remains with Returns. */
export class LegacyOrderReturnHandoffService implements LegacyOrderReturnHandoffPort {
  constructor(private readonly orders: LegacyOrderCommandRepository) {}

  getOrder(scope: LegacyCommerceBranchScope, orderId: string) {
    return this.orders.getById(scope, orderId);
  }

  applyPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ) {
    return this.orders.applyReturnCompatibilityPatch(scope, orderId, patch);
  }
}
