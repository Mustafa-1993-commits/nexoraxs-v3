// @vitest-environment jsdom

import { act, render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { CommerceProviders } from "@/lib/commerce/CommerceProviders";
import { useApp } from "@/lib/store";

let app: ReturnType<typeof useApp> | null = null;

function Probe() {
  const value = useApp();
  useEffect(() => { app = value; }, [value]);
  return <output>{value.branchInventory.length}</output>;
}

describe("Feature 054 provider publication characterization", () => {
  beforeEach(() => {
    app = null;
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
  });

  it("publishes the committed adjustment once with the current callback result", async () => {
    render(<CommerceProviders><Probe /></CommerceProviders>);
    await waitFor(() => expect(app?.isHydrated).toBe(true));
    await waitFor(() => expect(app?.products.some((product) => product.id === "p1")).toBe(true));

    let result: ReturnType<NonNullable<typeof app>["adjustStock"]> | undefined;
    act(() => { result = app!.adjustStock({ productId: "p1", qty: 11, lowStockThreshold: 4 }); });
    expect(result).toEqual({ ok: true });
    await waitFor(() => expect(app?.branchInventory.find((row) => row.productId === "p1")?.qty).toBe(11));

    const stored = JSON.parse(localStorage.getItem("nexoraxs.db.branchInventory") || "[]") as Array<{ productId: string; qty: number }>;
    expect(stored.filter((row) => row.productId === "p1")).toHaveLength(1);
    expect(stored.find((row) => row.productId === "p1")?.qty).toBe(11);
  });
});
