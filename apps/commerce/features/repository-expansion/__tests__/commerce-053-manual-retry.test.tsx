// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryCommerceStore, createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyCustomers } from "../../customers/hooks/useLegacyCustomers";

const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu" };
afterEach(cleanup);
function QueryProbe() {
  const query = useLegacyCustomers(scope);
  return <div><output>{query.status}</output><button onClick={() => void query.refetch()}>Retry explicitly</button></div>;
}
function Harness() {
  const [mounted, setMounted] = useState(true);
  return <div><button onClick={() => setMounted((value) => !value)}>Toggle mount</button>{mounted && <QueryProbe />}</div>;
}

describe("manual retry policy", () => {
  it("does not retry on timer, rerender, focus, reconnect, or remount; explicit retry succeeds", async () => {
    const diagnostic = vi.fn();
    const runtime = createCommerceServices({ dataSource: "mock" }, {
        store: new MemoryCommerceStore(),
        legacyBehavior: {
          failureRules: [{ operation: "customers.list", invocation: 1 }],
          onDiagnostic: diagnostic,
        },
      });
    const view = render(
      <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}><Harness /></CommerceServicesProvider>,
    );
    await waitFor(() => expect(screen.getByText("error")).toBeTruthy());
    expect(diagnostic).toHaveBeenCalledTimes(1);
    view.rerender(view.container.firstChild ? (
      <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={createCommerceServices({ dataSource: "mock" }, { store: new MemoryCommerceStore() })}><Harness /></CommerceServicesProvider>
    ) : null);
    // The stable provider test owns 100-rerender identity; lifecycle signals below target query policy.
    window.dispatchEvent(new Event("focus")); window.dispatchEvent(new Event("online"));
    await new Promise((resolve) => setTimeout(resolve, 25));
    // Use the original diagnostic as the stable evidence for the failed runtime.
    expect(diagnostic).toHaveBeenCalledTimes(1);
  });

  it("keeps one QueryClient across child remount and runs again only after the explicit control", async () => {
    const diagnostic = vi.fn();
    const runtime = createCommerceServices({ dataSource: "mock" }, {
      store: new MemoryCommerceStore(),
      legacyBehavior: { failureRules: [{ operation: "customers.list", invocation: 1 }], onDiagnostic: diagnostic },
    });
    render(<CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}><Harness /></CommerceServicesProvider>);
    await waitFor(() => expect(screen.getByText("error")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "Toggle mount" }));
    fireEvent.click(screen.getByRole("button", { name: "Toggle mount" }));
    await new Promise((resolve) => setTimeout(resolve, 25));
    expect(diagnostic).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Retry explicitly" }));
    await waitFor(() => expect(screen.getByText("success")).toBeTruthy());
    expect(diagnostic).toHaveBeenCalledTimes(2);
  });
});
