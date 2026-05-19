"use client";

import { Icon } from "@nexoraxs/ui";
import type { SaleReceipt } from "@/lib/pos-types";

interface SaleSuccessModalProps {
  receipt: SaleReceipt;
  onNewSale: () => void;
  onViewOrder: () => void;
}

const METHOD_LABEL: Record<string, string> = {
  cash: "Cash",
  card: "Card",
  wallet: "Wallet",
};

export function SaleSuccessModal({ receipt, onNewSale, onViewOrder }: SaleSuccessModalProps) {
  const time = new Date(receipt.completedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="card w-full max-w-sm space-y-4 p-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
            <Icon name="check-circle" className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Sale Complete</h2>
          <p className="text-xs text-gray-500">{time}</p>
        </div>

        {/* Receipt items */}
        <div className="space-y-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          {receipt.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-gray-300">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium text-white">
                EGP {item.lineTotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span>EGP {receipt.subtotal.toFixed(2)}</span>
          </div>
          {receipt.discountAmt > 0 && (
            <div className="flex justify-between text-sm text-emerald-400">
              <span>Discount</span>
              <span>− EGP {receipt.discountAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-white/10 pt-1.5 text-base font-bold text-white">
            <span>Total</span>
            <span>EGP {receipt.grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Payment</span>
            <span>{METHOD_LABEL[receipt.paymentMethod]}</span>
          </div>
          {receipt.paymentMethod === "cash" && receipt.amountReceived !== null && (
            <>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Received</span>
                <span>EGP {receipt.amountReceived.toFixed(2)}</span>
              </div>
              {receipt.change !== null && (
                <div className="flex justify-between text-sm font-medium text-emerald-400">
                  <span>Change</span>
                  <span>EGP {receipt.change.toFixed(2)}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onViewOrder}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            View Order
          </button>
          <button
            type="button"
            onClick={onNewSale}
            className="btn-primary flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
          >
            New Sale
          </button>
        </div>
      </div>
    </div>
  );
}
