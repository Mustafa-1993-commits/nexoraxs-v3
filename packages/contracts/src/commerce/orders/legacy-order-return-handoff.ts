import type { CommerceOrder } from "@nexoraxs/types";
import type { LegacyCommerceBranchScope } from "../common";
import type { LegacyOrderReturnCompatibilityPatch } from "./legacy-order-command-repository";

/** Orders-owned handoff used only by the existing Return compatibility workflow. */
export interface LegacyOrderReturnHandoffPort {
  getOrder(scope: LegacyCommerceBranchScope, orderId: string): CommerceOrder | null;
  applyPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ): readonly CommerceOrder[];
}

