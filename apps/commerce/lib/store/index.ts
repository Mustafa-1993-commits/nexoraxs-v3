export { AppProvider, useApp } from "./AppProvider";
export type {
  User, Workspace, Branch, OSSubscription, OSEnablement, BusinessUnit, WorkspaceMember, TeamMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer,
  OrderItem, Toast, CommercePlanInfo, OnboardingState, CommerceIdentity,
} from "./AppProvider";
export { STORAGE_KEYS } from "@nexoraxs/shared";
export {
  OS_CATALOG, OPERATING_SYSTEMS, PLAN_CATALOG, OS_BU_PRESETS,
  ONB_PLANS, DEFAULT_SETUP, COUNTRIES, CURRENCIES, TIMEZONES,
  planIdFor, prettyPreset,
} from "@nexoraxs/shared";
export { t } from "@nexoraxs/shared";
export type { Lang } from "@nexoraxs/shared";
export {
  money, taxBreak, nxOrdersForPeriod, nxRevenue, nxBestSellers,
  nxGroupSales, nxNewCustomers, nxOrderDate, nxOrderTotal, computeDoc, fmtDate,
  nxBranchInventoryMap, nxReturnsForPeriod, nxNetSales, computeReturnTotals,
  suggestCommercePresetForIndustry, getBusinessBillingAddress, getBranchOperationalAddress,
} from "@nexoraxs/shared";
export type { SalesBucket, SalesGroup, ResolvedAddress } from "@nexoraxs/shared";
export { uid, nowISO, normalizeEmail, getUserDisplayName } from "@nexoraxs/shared";
export {
  effectiveStockFor, buildStockMovement, buildStockTransfer, buildCommerceReturn,
} from "@nexoraxs/shared";
export type {
  BranchInventory, StockMovement, StockMovementReason, StockTransfer,
  CommerceReturn, CommerceReturnItem, RefundMethod,
} from "@nexoraxs/types";
export { writePosLastOrderId, readPosLastOrderId, clearPosLastOrderId } from "@nexoraxs/shared";
