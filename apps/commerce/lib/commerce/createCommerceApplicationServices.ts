import type { QueryClient } from "@tanstack/react-query";
import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandPublicationPort,
  LegacyCommerceDeterministicDependencies,
  LegacyInvoiceCreationPort,
  LegacyOrderInventoryEffectPort,
  LegacyOrderNumberPort,
  LegacyPosCommercialSnapshotPort,
  LegacyPosLastOrderPort,
} from "@nexoraxs/contracts";
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
import { LegacyPosDraftService } from "@/features/pos/application/LegacyPosDraftService";
import { LegacyOrderInventoryEffectService } from "@/features/inventory/application/LegacyOrderInventoryEffectService";
import { LegacyOrderNumberService } from "@/features/orders/application/LegacyOrderNumberService";
import { LegacyOrderReturnHandoffService } from "@/features/orders/application/LegacyOrderReturnHandoffService";
import { LegacyPosCheckoutService } from "@/features/pos/application/LegacyPosCheckoutService";
import { ReactQueryCommerceChangeAdapter } from "./cache/ReactQueryCommerceChangeAdapter";
import { BrowserCanvasThumbnailAdapter } from "./media/BrowserCanvasThumbnailAdapter";
import { LegacyDocumentSnapshotAdapter } from "./pos/LegacyDocumentSnapshotAdapter";
import { BrowserLegacyPosLastOrderAdapter } from "./pos/BrowserLegacyPosLastOrderAdapter";
import { LegacyCommandPublicationHub } from "./publication/LegacyCommandPublicationHub";
import type { CommerceApplicationServices } from "./CommerceApplicationServices";

export interface CommerceApplicationServiceOverrides {
  readonly deterministic?: LegacyCommerceDeterministicDependencies;
  readonly changes?: CommerceChangeNotificationPort;
  readonly commercialSnapshot?: LegacyPosCommercialSnapshotPort;
  readonly orderInventoryEffects?: LegacyOrderInventoryEffectPort;
  readonly orderNumber?: LegacyOrderNumberPort;
  readonly invoiceCommands?: LegacyInvoiceCreationPort;
  readonly commandPublication?: LegacyCommerceCommandPublicationPort;
  readonly posLastOrder?: LegacyPosLastOrderPort;
}

export function createCommerceApplicationServices(
  sdk: SdkCommerceServices,
  queryClient: QueryClient,
  overrides: CommerceApplicationServiceOverrides = {},
): CommerceApplicationServices {
  const deterministic = overrides.deterministic ?? { createId: (prefix: string) => uid(prefix), now: nowISO };
  const changes = overrides.changes ?? new ReactQueryCommerceChangeAdapter(queryClient);
  const storageCoordination = createCoreStorageCoordination(sdk.operationsStore, deterministic);
  const corePlatformCompatibility = createCorePlatformCompatibility({ ...deterministic, nowMs: Date.now });
  const orderInventoryEffects = overrides.orderInventoryEffects ?? new LegacyOrderInventoryEffectService(
    sdk.saleProductSnapshots,
    sdk.saleInventoryPersistence,
    deterministic,
  );
  const orderNumber = overrides.orderNumber ?? new LegacyOrderNumberService(sdk.orderCommandRepository);
  const orderReturnHandoff = new LegacyOrderReturnHandoffService(sdk.orderCommandRepository);
  const orderCommands = new LegacyOrderCreationService(
    sdk.orderCommandRepository,
    orderNumber,
    orderInventoryEffects,
    deterministic,
    changes,
  );
  const invoiceCommands = overrides.invoiceCommands
    ?? new LegacyInvoiceCreationService(sdk.operationsStore, deterministic, changes);
  const commandPublication = overrides.commandPublication ?? new LegacyCommandPublicationHub();
  const posLastOrder = overrides.posLastOrder ?? new BrowserLegacyPosLastOrderAdapter();
  const posCheckout = new LegacyPosCheckoutService(
    orderCommands,
    invoiceCommands,
    commandPublication,
    posLastOrder,
  );
  return {
    posDraftCommands: new LegacyPosDraftService(
      overrides.commercialSnapshot ?? new LegacyDocumentSnapshotAdapter(),
    ),
    posCheckout,
    posLastOrder,
    commandPublication,
    orderInventoryEffects,
    orderCommandRepository: sdk.orderCommandRepository,
    orderNumber,
    orderReturnHandoff,
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
    demoBootstrap: new LegacyCommerceDemoBootstrapService(sdk.operationsStore, sdk.orderCommandRepository),
    productMedia: new LegacyProductMediaService(
      new BrowserCanvasThumbnailAdapter(), storageCoordination, sdk.operationsStore, deterministic,
    ),
    storageCoordination,
    corePlatformCompatibility,
    stockAdjustments: new LegacyStockAdjustmentService(sdk.operationsStore, deterministic, changes),
    transfers: new LegacyStockTransferService(sdk.operationsStore, deterministic, changes),
    returns: new LegacyReturnCreationService(sdk.operationsStore, deterministic, changes, orderReturnHandoff),
    orderCommands,
    invoiceCommands,
  };
}
