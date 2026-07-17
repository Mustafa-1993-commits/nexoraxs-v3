import type { CommerceChangeNotificationPort } from "@nexoraxs/contracts";

export type { CommerceChangeNotificationPort } from "@nexoraxs/contracts";

export const NOOP_COMMERCE_CHANGE_NOTIFICATIONS: CommerceChangeNotificationPort = Object.freeze({
  async productsChanged() {},
  async customersChanged() {},
  async inventoryChanged() {},
  async ordersChanged() {},
  async invoicesChanged() {},
});
