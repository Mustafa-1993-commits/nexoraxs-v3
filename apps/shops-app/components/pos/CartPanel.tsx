"use client";

import { Icon } from "@nexoraxs/ui";
import { CartItemRow } from "@/components/pos/CartItemRow";
import { PaymentSection } from "@/components/pos/PaymentSection";
import type { CartItem, Discount, PaymentMethod } from "@/lib/pos-types";

interface CartPanelProps {
  items: CartItem[];
  discount: Discount;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  subtotal: number;
  discountAmt: number;
  grandTotal: number;
  change: number | null;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onDiscountChange: (discount: Discount) => void;
  onMethodChange: (method: PaymentMethod) => void;
  onAmountReceivedChange: (amount: number) => void;
  onCompleteSale: () => void;
}

export function CartPanel({
  items,
  discount,
  paymentMethod,
  amountReceived,
  subtotal,
  discountAmt,
  grandTotal,
  onIncrement,
  onDecrement,
  onRemove,
  onDiscountChange,
  onMethodChange,
  onAmountReceivedChange,
  onCompleteSale,
}: CartPanelProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="relative flex h-full flex-col bg-[#0a0a0f]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Cart header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f] px-4 py-3">
          <div className="flex items-center gap-2">
            <Icon name="shopping-cart" className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-semibold text-white">Cart</span>
            {!isEmpty && (
              <span className="rounded-full bg-blue-600/20 px-1.5 text-xs font-medium text-blue-400">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 p-4">
          {/* Cart items or empty state */}
          {isEmpty ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Icon name="shopping-cart" className="h-10 w-10 text-gray-700" />
              <p className="text-sm text-gray-500">Add products from the left to start</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}

          {!isEmpty && (
            <>
              {/* Customer section */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">Customer</p>
                <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                  <Icon name="users" className="h-4 w-4 shrink-0 text-gray-500" />
                  <span className="flex-1 text-sm text-gray-300">Walk-in</span>
                  <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                    <Icon name="search" className="h-3 w-3 text-gray-600" />
                    <span className="text-[11px] text-gray-600">Search</span>
                  </div>
                </div>
              </div>

              {/* Discount section */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">Discount</p>
                <div className="flex items-stretch gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-xs text-gray-500">
                      {discount.mode === "amount" ? "EGP" : "%"}
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={discount.mode === "amount" ? 1 : 0.1}
                      max={discount.mode === "percentage" ? 100 : undefined}
                      value={discount.value === 0 ? "" : discount.value}
                      onChange={(e) =>
                        onDiscountChange({
                          ...discount,
                          value: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                  {/* Toggle mode */}
                  <button
                    type="button"
                    onClick={() =>
                      onDiscountChange({ value: 0, mode: discount.mode === "amount" ? "percentage" : "amount" })
                    }
                    className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon name="percent" className="h-3.5 w-3.5" />
                    {discount.mode === "amount" ? "%" : "EGP"}
                  </button>
                </div>
              </div>

              {/* Payment method */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">Payment</p>
                <PaymentSection
                  selectedMethod={paymentMethod}
                  amountReceived={amountReceived}
                  grandTotal={grandTotal}
                  onMethodChange={onMethodChange}
                  onAmountReceivedChange={onAmountReceivedChange}
                />
              </div>

              {/* Totals */}
              <div className="space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>EGP {subtotal.toFixed(2)}</span>
                </div>
                {discountAmt > 0 && (
                  <div className="flex justify-between text-sm text-emerald-400">
                    <span>Discount</span>
                    <span>− EGP {discountAmt.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/10 pt-1.5 text-base font-bold text-white">
                  <span>Total</span>
                  <span>EGP {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Sale — desktop */}
              <button
                type="button"
                onClick={onCompleteSale}
                disabled={isEmpty}
                className="btn-primary hidden w-full rounded-xl py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 md:block"
              >
                Complete Sale
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile sticky summary — visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/10 bg-[#0d0d14]/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <div>
          <p className="text-[10px] text-gray-500">Total</p>
          <p className="text-base font-bold text-white">EGP {grandTotal.toFixed(2)}</p>
        </div>
        <button
          type="button"
          onClick={onCompleteSale}
          disabled={isEmpty}
          className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}
