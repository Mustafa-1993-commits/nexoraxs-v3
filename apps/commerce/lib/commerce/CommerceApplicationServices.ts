import type {
  CommerceHandoffPort,
  CoreStorageCoordinationCompatibilityPort,
  LegacyCorePlatformCompatibilityPort,
  LegacyCommerceSetupPort,
  LegacyCustomersCompatibilityPort,
  LegacyCustomersRepository,
  LegacyInvoiceCreationPort,
  LegacyInvoicesRepository,
  LegacyInventoryRepository,
  LegacyOrderCreationPort,
  LegacyOrdersRepository,
  LegacyProductsCompatibilityPort,
  LegacyProductsRepository,
  LegacyReturnCreationPort,
  LegacyStockAdjustmentPort,
  LegacyStockTransferPort,
} from "@nexoraxs/contracts";
import type { LegacyCustomerHistoryService } from "@/features/customers/application/LegacyCustomerHistoryService";
import type { LegacyInventoryProjectionService } from "@/features/inventory/application/LegacyInventoryProjectionService";
import type { LegacyInvoiceViewService } from "@/features/invoices/application/LegacyInvoiceViewService";
import type { LegacyOrderViewService } from "@/features/orders/application/LegacyOrderViewService";
import type { LegacyProductMediaService } from "@/features/media/application/LegacyProductMediaService";
import type { LegacyCommerceDemoBootstrapService } from "@/features/setup/application/LegacyCommerceDemoBootstrapService";

/** Stable application-facing runtime. Concrete SDK implementations never appear here. */
export interface CommerceApplicationServices {
  readonly commerceHandoff: CommerceHandoffPort;
  readonly productsRepository: LegacyProductsRepository;
  readonly productsCompatibility: LegacyProductsCompatibilityPort;
  readonly customersRepository: LegacyCustomersRepository;
  readonly customersCompatibility: LegacyCustomersCompatibilityPort;
  readonly inventoryRepository: LegacyInventoryRepository;
  readonly ordersRepository: LegacyOrdersRepository;
  readonly invoicesRepository: LegacyInvoicesRepository;
  readonly customerHistoryService: LegacyCustomerHistoryService;
  readonly inventoryProjectionService: LegacyInventoryProjectionService;
  readonly orderViewService: LegacyOrderViewService;
  readonly invoiceViewService: LegacyInvoiceViewService;
  readonly setupCommands: LegacyCommerceSetupPort;
  readonly demoBootstrap: LegacyCommerceDemoBootstrapService;
  readonly productMedia: LegacyProductMediaService;
  readonly storageCoordination: CoreStorageCoordinationCompatibilityPort;
  readonly corePlatformCompatibility: LegacyCorePlatformCompatibilityPort;
  readonly stockAdjustments: LegacyStockAdjustmentPort;
  readonly transfers: LegacyStockTransferPort;
  readonly returns: LegacyReturnCreationPort;
  readonly orderCommands: LegacyOrderCreationPort;
  readonly invoiceCommands: LegacyInvoiceCreationPort;
}
