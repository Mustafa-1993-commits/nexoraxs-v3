import type { CommerceHandoffPort, LegacyCommerceHandoffContext } from "@nexoraxs/contracts";
import type { LegacyCommerceIntegrationStore } from "./BrowserLegacyCommerceIntegrationStore";

function nonEmpty(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export class LegacyCommerceHandoffIngress implements CommerceHandoffPort {
  constructor(private readonly store: LegacyCommerceIntegrationStore) {}

  async accept(context: LegacyCommerceHandoffContext): Promise<void> {
    if (
      context.osId !== "commerce"
      || !nonEmpty(context.actorId)
      || !nonEmpty(context.workspaceId)
      || !nonEmpty(context.legacyBusinessUnitId)
      || !nonEmpty(context.action)
    ) {
      throw new Error("commerce.handoff.invalid_context");
    }
    await this.store.persistHandoff({
      ...context,
      actorId: context.actorId.trim(),
      workspaceId: context.workspaceId.trim(),
      legacyBusinessUnitId: context.legacyBusinessUnitId.trim(),
      branchId: context.branchId?.trim() || null,
      osSubscriptionId: context.osSubscriptionId?.trim() || null,
      action: context.action.trim(),
      resourceId: context.resourceId?.trim() || null,
    });
  }
}
