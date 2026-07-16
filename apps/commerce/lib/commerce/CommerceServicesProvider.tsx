"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createCommerceServices,
  type CommerceRuntimeConfig,
  type CommerceServiceOverrides,
  type CommerceServices,
} from "@nexoraxs/sdk";
import { createContext, useContext, useState, type ReactNode } from "react";

interface CommerceServicesContextValue {
  readonly services: CommerceServices;
  readonly queryClient: QueryClient;
}

const CommerceServicesContext = createContext<CommerceServicesContextValue | null>(null);

export function useCommerceServices(): CommerceServicesContextValue {
  const value = useContext(CommerceServicesContext);
  if (!value) throw new Error("useCommerceServices must be used within CommerceServicesProvider");
  return value;
}

export function CommerceServicesProvider({
  children,
  config,
  overrides,
}: {
  readonly children: ReactNode;
  readonly config: CommerceRuntimeConfig;
  readonly overrides?: CommerceServiceOverrides;
}) {
  const [root] = useState(() => {
    try {
      return {
        value: {
          services: createCommerceServices(config, overrides),
          queryClient: new QueryClient({
            defaultOptions: {
              queries: { retry: false, staleTime: 10_000 },
              mutations: { retry: false },
            },
          }),
        } satisfies CommerceServicesContextValue,
        error: null,
      };
    } catch (error) {
      return { value: null, error };
    }
  });

  if (!root.value) {
    return (
      <main className="nx-page" role="main">
        <div className="nx-card nx-card-pad" role="alert">
          Commerce Products could not start. Check the Commerce runtime configuration and reload.
        </div>
      </main>
    );
  }

  return (
    <CommerceServicesContext.Provider value={root.value}>
      <QueryClientProvider client={root.value.queryClient}>{children}</QueryClientProvider>
    </CommerceServicesContext.Provider>
  );
}
