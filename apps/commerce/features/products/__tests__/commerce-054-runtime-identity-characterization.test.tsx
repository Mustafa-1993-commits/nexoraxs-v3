// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CommerceProviders } from "@/lib/commerce/CommerceProviders";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

const snapshots: unknown[][] = [];

function Probe({ value }: { value: number }) {
  const { services, queryClient } = useCommerceServices();
  snapshots.push([
    services.productsRepository, services.productsCompatibility, services.customersRepository,
    services.customersCompatibility, services.inventoryRepository, services.ordersRepository,
    services.invoicesRepository, services.customerHistoryService, services.inventoryProjectionService,
    services.orderViewService, services.invoiceViewService, services.stockAdjustments,
    services.transfers, services.returns, services.orderCommands, services.invoiceCommands, queryClient,
  ]);
  return <output>{value}</output>;
}

describe("Feature 054 runtime identity characterization", () => {
  it("keeps every composed dependency stable through 100 rerenders", () => {
    snapshots.length = 0;
    localStorage.clear();
    sessionStorage.clear();
    const view = render(<CommerceProviders><Probe value={0} /></CommerceProviders>);
    for (let index = 1; index <= 100; index += 1) {
      view.rerender(<CommerceProviders><Probe value={index} /></CommerceProviders>);
    }
    expect(snapshots).toHaveLength(101);
    for (let column = 0; column < snapshots[0].length; column += 1) {
      expect(new Set(snapshots.map((snapshot) => snapshot[column])).size).toBe(1);
    }
  });
});
