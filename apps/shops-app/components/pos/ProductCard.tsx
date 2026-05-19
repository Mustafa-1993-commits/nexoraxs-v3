"use client";

import type { Product } from "@/lib/pos-types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.status === "out_of_stock";
  const isLowStock = product.status === "low_stock";

  return (
    <button
      type="button"
      onClick={() => !isOutOfStock && onAddToCart(product)}
      disabled={isOutOfStock}
      className={[
        "card card-hover flex w-full flex-col items-start gap-2 p-3 text-left transition-all",
        isOutOfStock
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer active:scale-[0.97]",
      ].join(" ")}
    >
      {/* Stock badges */}
      <div className="flex w-full items-start justify-between gap-1">
        <span className="text-sm font-medium leading-tight text-white line-clamp-2">
          {product.name}
        </span>
        {isLowStock && (
          <span className="shrink-0 rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-orange-400">
            Low
          </span>
        )}
        {isOutOfStock && (
          <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">
            Out
          </span>
        )}
      </div>

      <div className="flex w-full items-end justify-between">
        <span className="text-sm font-semibold text-blue-400">
          EGP {product.price.toFixed(2)}
        </span>
        {!isOutOfStock && (
          <span className="text-[10px] text-gray-600">
            {product.stock} in stock
          </span>
        )}
      </div>
    </button>
  );
}
