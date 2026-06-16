export {
  STORAGE_KEYS,
  OS_CATALOG,
  OPERATING_SYSTEMS,
  PLAN_CATALOG,
  OS_BU_PRESETS,
  ONB_PLANS,
  COUNTRIES,
  CURRENCIES,
  TIMEZONES,
  planIdFor,
  prettyPreset,
  t,
} from "./schema";
export type { StorageKey, Lang } from "./schema";

export {
  readCollection,
  writeCollection,
  readSession,
  writeSession,
  clearAllStorage,
  readPosLastOrderId,
  writePosLastOrderId,
  clearPosLastOrderId,
} from "./storage";

export {
  uid,
  nowISO,
  normalizeEmail,
  getUserDisplayName,
  compressImageToThumbnail,
  canAttachMedia,
  buildMediaAsset,
  applyUsageDelta,
  effectiveStockFor,
  buildStockMovement,
  buildStockTransfer,
  buildCommerceReturn,
} from "./actions";
export type { CompressedImage } from "./actions";

export { DEFAULT_SETUP, emptyDB, seedDB } from "./seed";

export {
  money,
  taxBreak,
  nxOrderDate,
  nxOrderTotal,
  nxOrdersForPeriod,
  nxRevenue,
  nxBestSellers,
  nxGroupSales,
  nxNewCustomers,
  nxBranchInventoryMap,
  nxReturnsForPeriod,
  nxNetSales,
  computeDoc,
  computeReturnTotals,
  fmtDate,
  storageUsagePercent,
  formatBytes,
  remainingBytes,
} from "./selectors";
export type { SalesBucket, SalesGroup } from "./selectors";
