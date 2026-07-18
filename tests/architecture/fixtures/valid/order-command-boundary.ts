interface OrderRepository { create(): void }
interface InventoryEffect { commit(): void }
interface OrderService { execute(): void }

class LocalOrderRepository implements OrderRepository { create() {} }
class LocalInventoryEffect implements InventoryEffect { commit() {} }
class ApplicationOrderService implements OrderService {
  constructor(private readonly orders: OrderRepository, private readonly inventory: InventoryEffect) {}
  execute() { this.orders.create(); this.inventory.commit(); }
}

export function createValidOrderCommandBoundary(): OrderService {
  return new ApplicationOrderService(new LocalOrderRepository(), new LocalInventoryEffect());
}
