"use client";

import { Icon } from "@/components/ui/Icon";
import type { CartItem } from "@/lib/pos-types";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      {/* Name + unit price */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{item.product.name}</p>
        <p className="text-xs text-gray-500">EGP {item.product.price.toFixed(2)} each</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onDecrement(item.product.id)}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Decrease quantity"
        >
          <Icon name="minus" className="h-3 w-3" />
        </button>
        <span className="w-6 text-center text-sm font-medium text-white">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onIncrement(item.product.id)}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Increase quantity"
        >
          <Icon name="plus" className="h-3 w-3" />
        </button>
      </div>

      {/* Line total */}
      <span className="w-20 text-right text-sm font-semibold text-white">
        EGP {item.lineTotal.toFixed(2)}
      </span>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(item.product.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
        aria-label={`Remove ${item.product.name}`}
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
