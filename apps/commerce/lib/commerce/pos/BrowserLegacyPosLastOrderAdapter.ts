import type { LegacyPosLastOrderPort } from "@nexoraxs/contracts";
import {
  clearPosLastOrderId,
  readPosLastOrderId,
  writePosLastOrderId,
} from "@nexoraxs/shared";

/** Approved browser-session adapter for the unchanged raw `nx_last_order_id` value. */
export class BrowserLegacyPosLastOrderAdapter implements LegacyPosLastOrderPort {
  read(): string | null {
    return readPosLastOrderId();
  }

  write(orderId: string): void {
    writePosLastOrderId(orderId);
  }

  clear(): void {
    clearPosLastOrderId();
  }
}
