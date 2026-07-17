import type { LegacyCommerceDeterministicDependencies } from "@nexoraxs/contracts";
import type { StockTransfer } from "@nexoraxs/types";

export function createLegacyTransfer(
  input: Omit<StockTransfer, "id" | "status" | "createdAt">,
  deterministic: LegacyCommerceDeterministicDependencies,
): StockTransfer {
  return { id: deterministic.createId("st"), ...input, status: "completed", createdAt: deterministic.now() };
}
