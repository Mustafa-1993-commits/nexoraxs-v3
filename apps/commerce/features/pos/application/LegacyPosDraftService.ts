import type {
  LegacyPosCommercialSettings,
  LegacyPosCommercialSnapshot,
  LegacyPosCommercialSnapshotPort,
  LegacyPosDraft,
  LegacyPosDraftCommand,
  LegacyPosDraftResult,
  LegacyPosDraftServicePort,
} from "@nexoraxs/contracts";
import { LegacyPosDraftCommandError } from "@nexoraxs/contracts";
import type { OrderItem } from "@nexoraxs/types";

const initialDraft = (): LegacyPosDraft => ({
  items: [],
  customerId: null,
  payment: "cash",
  discount: 0,
});

/** POS-owned synchronous transient-state rules. This service never persists an Order. */
export class LegacyPosDraftService implements LegacyPosDraftServicePort {
  constructor(private readonly calculator: LegacyPosCommercialSnapshotPort) {}

  createInitial(): LegacyPosDraft {
    return initialDraft();
  }

  snapshot(
    draft: LegacyPosDraft,
    setup: LegacyPosCommercialSettings,
  ): LegacyPosCommercialSnapshot {
    return this.calculator.calculate({
      items: this.toOrderItems(draft),
      setup,
      discount: draft.discount,
    });
  }

  execute(input: {
    readonly draft: LegacyPosDraft;
    readonly command: LegacyPosDraftCommand;
    readonly setup: LegacyPosCommercialSettings;
  }): LegacyPosDraftResult {
    const draft = this.apply(input.draft, input.command);
    return {
      draft,
      commercialSnapshot: this.snapshot(draft, input.setup),
    };
  }

  toOrderItems(draft: LegacyPosDraft): readonly OrderItem[] {
    return draft.items.map((item) => ({
      productId: item.id,
      id: item.id,
      name: item.name,
      qty: item.qty,
      price: item.price,
      sku: item.sku,
      taxable: item.taxable,
    }));
  }

  private apply(draft: LegacyPosDraft, command: LegacyPosDraftCommand): LegacyPosDraft {
    switch (command.type) {
      case "add-product": {
        if (command.product.stock === 0) {
          throw new LegacyPosDraftCommandError("out_of_stock", command.product.name);
        }
        const existing = draft.items.find((item) => item.id === command.product.id);
        const items = existing
          ? draft.items.map((item) => item.id === command.product.id
            ? { ...item, qty: item.qty + 1 }
            : { ...item })
          : [
              ...draft.items.map((item) => ({ ...item })),
              { ...command.product, qty: 1 },
            ];
        return { ...draft, items };
      }
      case "change-quantity":
        return {
          ...draft,
          items: draft.items.map((item) => item.id === command.productId
            ? { ...item, qty: Math.max(1, item.qty + command.delta) }
            : { ...item }),
        };
      case "remove-item":
        return {
          ...draft,
          items: draft.items
            .filter((item) => item.id !== command.productId)
            .map((item) => ({ ...item })),
        };
      case "clear":
        return { ...draft, items: [] };
      case "select-customer":
        return { ...draft, items: draft.items.map((item) => ({ ...item })), customerId: command.customerId };
      case "select-payment":
        return { ...draft, items: draft.items.map((item) => ({ ...item })), payment: command.payment };
      case "set-discount-input":
        return {
          ...draft,
          items: draft.items.map((item) => ({ ...item })),
          discount: Math.max(0, +command.value || 0),
        };
      case "remove-discount":
        return { ...draft, items: draft.items.map((item) => ({ ...item })), discount: 0 };
      default:
        throw new LegacyPosDraftCommandError("unsupported_command");
    }
  }
}
