export { AppProvider, useApp } from "./AppProvider";
export type {
  User, Workspace, Branch, OSSubscription, OSEnablement, BusinessUnit, WorkspaceMember, TeamMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer,
  OrderItem, Toast, CommercePlanInfo, OnboardingState, CommerceIdentity,
} from "./AppProvider";
export { STORAGE_KEYS } from "@nexoraxs/shared";
export {
  OS_CATALOG, OPERATING_SYSTEMS, PLAN_CATALOG, OS_BU_PRESETS,
  ONB_PLANS, COUNTRIES, CURRENCIES, TIMEZONES,
  planIdFor, prettyPreset,
} from "@nexoraxs/shared";
export { t } from "@nexoraxs/shared";
export type { Lang } from "@nexoraxs/shared";
export {
  money, fmtDate,
} from "@nexoraxs/shared";
export { uid, nowISO, normalizeEmail, getUserDisplayName } from "@nexoraxs/shared";
export {
  nxOrdersForPeriod, nxRevenue, nxBestSellers, nxGroupSales, nxNewCustomers,
  nxOrderDate, nxOrderTotal, nxReturnsForPeriod, nxNetSales,
} from "@/features/reporting/application/legacy-commerce-reporting";
export type { SalesBucket, SalesGroup } from "@/features/reporting/application/legacy-commerce-reporting";
export {
  computeDoc, computeReturnTotals, getBusinessBillingAddress, getBranchOperationalAddress,
} from "@/features/documents/application/legacy-commerce-documents";
export type { ResolvedAddress } from "@/features/documents/application/legacy-commerce-documents";
export { DEFAULT_SETUP, legacyCommercePreset as suggestCommercePresetForIndustry } from "@/features/setup/application/legacy-commerce-setup-policy";
export { legacyEffectiveStock as effectiveStockFor, createLegacyStockMovement as buildStockMovement } from "@/features/inventory/application/legacy-inventory-policy";
export { createLegacyTransfer as buildStockTransfer } from "@/features/transfers/application/legacy-transfer-policy";
export { createLegacyReturn as buildCommerceReturn } from "@/features/returns/application/legacy-return-compatibility-policy";
export type {
  BranchInventory, StockMovement, StockMovementReason, StockTransfer,
  CommerceReturn, CommerceReturnItem, RefundMethod,
} from "@nexoraxs/types";
export { writePosLastOrderId, readPosLastOrderId, clearPosLastOrderId } from "@nexoraxs/shared";
