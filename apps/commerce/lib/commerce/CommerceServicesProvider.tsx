"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createCommerceServices,
  type CommerceRuntimeConfig,
  type CommerceServices,
} from "@nexoraxs/sdk";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { CommerceApplicationServices } from "./CommerceApplicationServices";
import { createCommerceApplicationServices } from "./createCommerceApplicationServices";

interface CommerceServicesContextValue {
  readonly services: CommerceApplicationServices;
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
  runtimeServices,
}: {
  readonly children: ReactNode;
  readonly config: CommerceRuntimeConfig;
  readonly runtimeServices?: CommerceServices;
}) {
  const [root] = useState(() => {
    try {
      const sdkServices = runtimeServices ?? createCommerceServices(config);
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 10_000,
          },
          mutations: { retry: false },
        },
      });
      return {
        value: {
          services: createCommerceApplicationServices(sdkServices, queryClient),
          queryClient,
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
