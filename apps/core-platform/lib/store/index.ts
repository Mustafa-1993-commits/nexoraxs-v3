export { AppProvider, useApp } from "./AppProvider";
export type {
  User, Workspace, Branch, OSSubscription, OSEnablement, BusinessUnit, WorkspaceMember, TeamMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer,
  OrderItem, Toast, CommercePlanInfo, OnboardingState,
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
  nxGroupSales, nxOrderDate, nxOrderTotal, computeDoc, fmtDate,
  suggestCommercePresetForIndustry, getBusinessBillingAddress, getBranchOperationalAddress,
} from "@nexoraxs/shared";
export type { SalesBucket, SalesGroup, ResolvedAddress } from "@nexoraxs/shared";
export { uid, nowISO, normalizeEmail, getUserDisplayName } from "@nexoraxs/shared";
