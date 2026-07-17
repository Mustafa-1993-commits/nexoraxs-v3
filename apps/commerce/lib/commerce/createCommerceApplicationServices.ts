import type { QueryClient } from "@tanstack/react-query";
import { createCorePlatformCompatibility, createCoreStorageCoordination, type CommerceServices as SdkCommerceServices } from "@nexoraxs/sdk";
import { nowISO, uid } from "@nexoraxs/shared";
import { LegacyCustomerHistoryService } from "@/features/customers/application/LegacyCustomerHistoryService";
import { LegacyInventoryProjectionService } from "@/features/inventory/application/LegacyInventoryProjectionService";
import { LegacyInvoiceViewService } from "@/features/invoices/application/LegacyInvoiceViewService";
import { LegacyOrderViewService } from "@/features/orders/application/LegacyOrderViewService";
import { LegacyCommerceSetupService } from "@/features/setup/application/LegacyCommerceSetupService";
import { LegacyCommerceDemoBootstrapService } from "@/features/setup/application/LegacyCommerceDemoBootstrapService";
import { LegacyProductMediaService } from "@/features/media/application/LegacyProductMediaService";
import { LegacyStockAdjustmentService } from "@/features/inventory/application/LegacyStockAdjustmentService";
import { LegacyStockTransferService } from "@/features/transfers/application/LegacyStockTransferService";
import { LegacyReturnCreationService } from "@/features/returns/application/LegacyReturnCreationService";
import { LegacyOrderCreationService } from "@/features/orders/application/LegacyOrderCreationService";
import { LegacyInvoiceCreationService } from "@/features/invoices/application/LegacyInvoiceCreationService";
import { ReactQueryCommerceChangeAdapter } from "./cache/ReactQueryCommerceChangeAdapter";
import { BrowserCanvasThumbnailAdapter } from "./media/BrowserCanvasThumbnailAdapter";
import type { CommerceApplicationServices } from "./CommerceApplicationServices";

export function createCommerceApplicationServices(
  sdk: SdkCommerceServices,
  queryClient: QueryClient,
): CommerceApplicationServices {
  const deterministic = { createId: (prefix: string) => uid(prefix), now: nowISO };
  const changes = new ReactQueryCommerceChangeAdapter(queryClient);
  const storageCoordination = createCoreStorageCoordination(sdk.operationsStore, deterministic);
  const corePlatformCompatibility = createCorePlatformCompatibility({ ...deterministic, nowMs: Date.now });
  return {
    commerceHandoff: sdk.commerceHandoff,
    productsRepository: sdk.productsRepository,
    productsCompatibility: sdk.productsFacade,
    customersRepository: sdk.customersRepository,
    customersCompatibility: sdk.customersFacade,
    inventoryRepository: sdk.inventoryRepository,
    ordersRepository: sdk.ordersRepository,
    invoicesRepository: sdk.invoicesRepository,
    customerHistoryService: new LegacyCustomerHistoryService(sdk.customersRepository, sdk.ordersRepository),
    inventoryProjectionService: new LegacyInventoryProjectionService(sdk.productsRepository, sdk.inventoryRepository),
    orderViewService: new LegacyOrderViewService(sdk.ordersRepository, sdk.customersRepository, sdk.invoicesRepository),
    invoiceViewService: new LegacyInvoiceViewService(sdk.invoicesRepository, sdk.ordersRepository, sdk.customersRepository),
    setupCommands: new LegacyCommerceSetupService(sdk.operationsStore, deterministic),
    demoBootstrap: new LegacyCommerceDemoBootstrapService(sdk.operationsStore),
    productMedia: new LegacyProductMediaService(
      new BrowserCanvasThumbnailAdapter(), storageCoordination, sdk.operationsStore, deterministic,
    ),
    storageCoordination,
    corePlatformCompatibility,
    stockAdjustments: new LegacyStockAdjustmentService(sdk.operationsStore, deterministic, changes),
    transfers: new LegacyStockTransferService(sdk.operationsStore, deterministic, changes),
    returns: new LegacyReturnCreationService(sdk.operationsStore, deterministic, changes),
    orderCommands: new LegacyOrderCreationService(sdk.operationsStore, deterministic, changes),
    invoiceCommands: new LegacyInvoiceCreationService(sdk.operationsStore, deterministic, changes),
  };
}
