import { LocalOrderCommandRepository } from "../../../../../packages/sdk/src/commerce/orders/LocalOrderCommandRepository";

export const invalidConstruction = new LocalOrderCommandRepository({
  readOrderCommandRecords: () => [],
  replaceOrderCommandRecords: () => undefined,
});
