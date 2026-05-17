"use client";

import { Icon } from "@/components/ui/Icon";
import type { PaymentMethod } from "@/lib/pos-types";

interface PaymentSectionProps {
  selectedMethod: PaymentMethod;
  amountReceived: number;
  grandTotal: number;
  onMethodChange: (method: PaymentMethod) => void;
  onAmountReceivedChange: (amount: number) => void;
}

const METHODS: { id: PaymentMethod; label: string; icon: "banknote" | "credit-card" | "wallet" }[] = [
  { id: "cash",   label: "Cash",   icon: "banknote" },
  { id: "card",   label: "Card",   icon: "credit-card" },
  { id: "wallet", label: "Wallet", icon: "wallet" },
];

export function PaymentSection({
  selectedMethod,
  amountReceived,
  grandTotal,
  onMethodChange,
  onAmountReceivedChange,
}: PaymentSectionProps) {
  const change = amountReceived - grandTotal;

  return (
    <div className="space-y-3">
      {/* Method buttons */}
      <div className="grid grid-cols-3 gap-1.5">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onMethodChange(m.id)}
            className={[
              "flex flex-col items-center gap-1 rounded-xl border py-2.5 text-xs font-medium transition-colors",
              selectedMethod === m.id
                ? "border-blue-500/60 bg-blue-600/20 text-blue-300"
                : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            <Icon name={m.icon} className="h-4 w-4" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Cash: amount received + change */}
      {selectedMethod === "cash" && (
        <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <label className="block text-xs text-gray-500">Amount received</label>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-xs text-gray-500">EGP</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={amountReceived === 0 ? "" : amountReceived}
              onChange={(e) =>
                onAmountReceivedChange(parseFloat(e.target.value) || 0)
              }
              placeholder="0.00"
              className="flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-600"
            />
          </div>

          {amountReceived > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Change</span>
              <span
                className={[
                  "text-sm font-semibold",
                  change >= 0 ? "text-emerald-400" : "text-red-400",
                ].join(" ")}
              >
                EGP {change.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
