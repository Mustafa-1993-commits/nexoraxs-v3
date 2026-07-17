"use client";
import { useQuery } from "@tanstack/react-query";
import type { LegacyCommerceBranchScope, LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyInvoiceKeys } from "./legacy-invoice-query-keys";
const DISABLED = { workspaceId: "", legacyBusinessUnitId: "" };
export function useLegacyInvoices(scope: LegacyCommerceBranchScope | null) {
  const { services } = useCommerceServices(); const effective = scope ?? { ...DISABLED, branchId: "" };
  return useQuery({ queryKey: legacyInvoiceKeys.list(effective, effective.branchId), queryFn: () => services.invoiceViewService.listInvoices({ scope: effective }), enabled: scope !== null });
}
export function useLegacyInvoice(scope: LegacyCommerceBusinessUnitScope | null, invoiceId: string | null, viewKind: "detail" | "document") {
  const { services } = useCommerceServices(); const effective = scope ?? DISABLED; const id = invoiceId ?? "";
  return useQuery({ queryKey: legacyInvoiceKeys.item(effective, id, viewKind), queryFn: () => services.invoiceViewService.getInvoice({ scope: effective, invoiceId: id, viewKind }), enabled: scope !== null && invoiceId !== null });
}
