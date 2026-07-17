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
import { LegacyCustomerHistoryService } from "@/features/customers/application/LegacyCustomerHistoryService";
import { LegacyInventoryProjectionService } from "@/features/inventory/application/LegacyInventoryProjectionService";
import { LegacyInvoiceViewService } from "@/features/invoices/application/LegacyInvoiceViewService";
import { LegacyOrderViewService } from "@/features/orders/application/LegacyOrderViewService";
import { LegacyCommerceReadCoordinator } from "@/features/repository-expansion/application/LegacyCommerceReadCoordinator";

export interface CommerceApplicationServices extends CommerceServices {
  readonly customerHistoryService: LegacyCustomerHistoryService;
  readonly inventoryProjectionService: LegacyInventoryProjectionService;
  readonly orderViewService: LegacyOrderViewService;
  readonly invoiceViewService: LegacyInvoiceViewService;
  readonly readCoordinator: LegacyCommerceReadCoordinator;
}

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
  overrides,
}: {
  readonly children: ReactNode;
  readonly config: CommerceRuntimeConfig;
  readonly overrides?: CommerceServiceOverrides;
}) {
  const [root] = useState(() => {
    try {
      const sdkServices = createCommerceServices(config, overrides);
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
          services: {
            ...sdkServices,
            customerHistoryService: new LegacyCustomerHistoryService(sdkServices.customersRepository, sdkServices.ordersRepository),
            inventoryProjectionService: new LegacyInventoryProjectionService(sdkServices.productsRepository, sdkServices.inventoryRepository),
            orderViewService: new LegacyOrderViewService(sdkServices.ordersRepository, sdkServices.customersRepository, sdkServices.invoicesRepository),
            invoiceViewService: new LegacyInvoiceViewService(sdkServices.invoicesRepository, sdkServices.ordersRepository, sdkServices.customersRepository),
            readCoordinator: new LegacyCommerceReadCoordinator(queryClient),
          },
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
