// @vitest-environment jsdom

import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEffect } from "react";
import type { CommerceApplicationServices } from "@/lib/commerce/CommerceApplicationServices";
import type { CreateLegacyProductCommand } from "@nexoraxs/contracts";
import { CommerceProviders } from "@/lib/commerce/CommerceProviders";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { useApp } from "@/lib/store";

let observedApp: ReturnType<typeof useApp> | null = null;
let observedServices: CommerceApplicationServices | null = null;

function Probe({ onObserved }: {
  onObserved: (app: ReturnType<typeof useApp>, services: CommerceApplicationServices) => void;
}) {
  const app = useApp();
  const services = useCommerceServices().services;
  useEffect(() => onObserved(app, services), [app, services, onObserved]);
  return <output>{app.products.length}</output>;
}

const command: CreateLegacyProductCommand = {
  name: "Facade-fed Product",
  category: "General",
  sku: "FACADE-FED",
  barcode: "",
  price: 10,
  cost: 3,
  taxable: true,
  stock: 2,
  lowStockThreshold: 1,
  notes: "",
  branchId: "br1",
  osSubscriptionId: "sub_commerce",
};

describe("AppProvider Product compatibility facade", () => {
  it("hydrates and receives successful facade mutations without a second Product write", async () => {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
    const onObserved = (app: ReturnType<typeof useApp>, services: CommerceApplicationServices) => {
      observedApp = app;
      observedServices = services;
    };
    render(<CommerceProviders><Probe onObserved={onObserved} /></CommerceProviders>);

    await waitFor(() => expect(observedApp?.isHydrated).toBe(true));
    await waitFor(() => expect(observedApp?.products.map((product) => product.id)).toEqual(["p1", "p2"]));
    const scope = {
      workspaceId: observedApp!.currentWorkspace!.id,
      legacyBusinessUnitId: observedApp!.currentBU!.id,
      branchId: observedApp!.currentBranch!.id,
    };

    await act(async () => {
      await observedServices!.productsCompatibility.create(scope, command);
    });

    await waitFor(() => expect(observedApp?.products.some((product) => product.sku === "FACADE-FED")).toBe(true));
    await expect(observedServices!.productsRepository.list(scope)).resolves.toMatchObject({ total: 3 });
  });

  it("receives Customer snapshots from the repository-upstream compatibility facade", async () => {
    localStorage.clear(); sessionStorage.clear(); sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
    const onObserved = (app: ReturnType<typeof useApp>, services: CommerceApplicationServices) => { observedApp = app; observedServices = services; };
    render(<CommerceProviders><Probe onObserved={onObserved} /></CommerceProviders>);
    await waitFor(() => expect(observedApp?.isHydrated).toBe(true));
    const scope = { workspaceId: observedApp!.currentWorkspace!.id, legacyBusinessUnitId: observedApp!.currentBU!.id };
    await act(async () => { await observedServices!.customersCompatibility.create(scope, { branchId: observedApp!.currentBranch!.id, name: "Facade Customer", phone: "", email: "", notes: "" }); });
    await waitFor(() => expect(observedApp?.customers.some((customer) => customer.name === "Facade Customer")).toBe(true));
  });
});
