export function invalidPageCheckoutOrchestration(services: {
  orderCommands: { create(): void };
  invoiceCommands: { create(): void };
}) {
  services.orderCommands.create();
  services.invoiceCommands.create();
}
