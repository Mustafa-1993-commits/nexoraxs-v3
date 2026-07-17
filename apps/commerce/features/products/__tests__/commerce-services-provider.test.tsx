// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useApp } from "@/lib/store";
import { CommerceProviders, useLegacyProductEditor } from "@/lib/commerce/CommerceProviders";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

const snapshots: Array<{
  repository: unknown;
  facade: unknown;
  queryClient: unknown;
  editor: unknown;
  customers: unknown;
  inventory: unknown;
  orders: unknown;
  invoices: unknown;
  customerHistory: unknown;
  stockAdjustments: unknown;
}> = [];

function IdentityProbe({ renderNumber }: { renderNumber: number }) {
  const { services, queryClient } = useCommerceServices();
  const editor = useLegacyProductEditor();
  useApp();
  snapshots.push({
    repository: services.productsRepository,
    facade: services.productsCompatibility,
    queryClient,
    editor,
    customers: services.customersRepository,
    inventory: services.inventoryRepository,
    orders: services.ordersRepository,
    invoices: services.invoicesRepository,
    customerHistory: services.customerHistoryService,
    stockAdjustments: services.stockAdjustments,
  });
  return <output>{renderNumber}</output>;
}

describe("CommerceProviders service identity", () => {
  it("preserves repository, QueryClient, and editor identity through 100 root re-renders", async () => {
    snapshots.length = 0;
    localStorage.clear();
    sessionStorage.clear();
    const view = render(
      <CommerceProviders><IdentityProbe renderNumber={0} /></CommerceProviders>,
    );

    for (let index = 1; index <= 100; index += 1) {
      view.rerender(
        <CommerceProviders><IdentityProbe renderNumber={index} /></CommerceProviders>,
      );
    }

    expect(snapshots.length).toBeGreaterThanOrEqual(101);
    expect(new Set(snapshots.map((snapshot) => snapshot.repository)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.facade)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.queryClient)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.editor)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.customers)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.inventory)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.orders)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.invoices)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.customerHistory)).size).toBe(1);
    expect(new Set(snapshots.map((snapshot) => snapshot.stockAdjustments)).size).toBe(1);
  });
});
