import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { LegacyCommandPublicationHub } from "@/lib/commerce/publication/LegacyCommandPublicationHub";
import {
  commerce055Invoice,
  commerce055Movement,
  commerce055Order,
  commerce055Position,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("LegacyCommandPublicationHub", () => {
  it("publishes cloned committed snapshots and cleans up subscriptions", () => {
    const hub = new LegacyCommandPublicationHub();
    const listener = vi.fn();
    const unsubscribe = hub.subscribe(listener);
    const orderResult = { order: commerce055Order, orders: [commerce055Order], branchInventory: [commerce055Position], stockMovements: [commerce055Movement] };
    hub.publishOrderResult(orderResult);
    expect(listener).toHaveBeenCalledWith({ type: "order", result: orderResult });
    expect(listener.mock.calls[0][0].result).not.toBe(orderResult);
    unsubscribe();
    hub.publishInvoiceResult({ invoice: commerce055Invoice, invoices: [commerce055Invoice] });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("keeps AppProvider a subscriber rather than an Order or Invoice owner", () => {
    const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
    expect(source).toContain("services.commandPublication.subscribe");
    expect(source).not.toContain("const createOrder = useCallback");
    expect(source).not.toContain("const createInvoice = useCallback");
  });
});
