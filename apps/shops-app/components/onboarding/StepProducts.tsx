"use client";

import type { OnboardingProduct } from "@/lib/onboarding-types";

interface StepProductsProps {
  currency: string;
  products: OnboardingProduct[];
  onChange: (products: OnboardingProduct[]) => void;
  onSkip: () => void;
}

export function StepProducts({ currency, products, onChange, onSkip }: StepProductsProps) {
  const addProduct = (): void => {
    if (products.length >= 3) return;
    onChange([...products, { name: "", price: 0, stock: 0 }]);
  };

  const removeProduct = (index: number): void => {
    onChange(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof OnboardingProduct, value: string): void => {
    const updated = products.map((p, i) => {
      if (i !== index) return p;
      if (field === "name") return { ...p, name: value };
      const num = parseFloat(value);
      return { ...p, [field]: isNaN(num) ? 0 : field === "stock" ? Math.floor(Math.max(0, num)) : Math.max(0, num) };
    });
    onChange(updated);
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="chip text-gray-500">{"// first products"}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Add your first products
        </h2>
        <p className="text-sm text-gray-400">
          Start with 1–3 products to see how your store looks. You can add more anytime.
        </p>
      </div>

      <div className="space-y-3">
        {products.map((product, index) => (
          <div
            key={index}
            className="card space-y-4 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/50">
                Product {index + 1}
              </span>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                  aria-label={`Remove product ${index + 1}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-medium text-white/60">Product name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(index, "name", e.target.value)}
                  maxLength={80}
                  placeholder="e.g. Coffee Bag 250g"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">Price</label>
                <div className="flex items-center gap-0">
                  <span className="flex h-10 items-center rounded-l-xl border border-r-0 border-white/10 bg-white/5 px-3 text-xs font-medium text-white/50">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price === 0 ? "" : product.price}
                    onChange={(e) => updateProduct(index, "price", e.target.value)}
                    placeholder="0.00"
                    className="h-10 w-full rounded-r-xl border border-white/10 bg-[#0a0a0f] px-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">Stock quantity</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={product.stock === 0 ? "" : product.stock}
                  onChange={(e) => updateProduct(index, "stock", e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
            </div>
          </div>
        ))}

        {products.length < 3 && (
          <button
            type="button"
            onClick={addProduct}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.01] py-4 text-sm text-white/50 transition-colors hover:border-white/25 hover:bg-white/[0.03] hover:text-white/70"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add another product
          </button>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-white/40 transition-colors hover:text-white/70"
        >
          Skip for now →
          <span className="mt-1 block text-xs text-white/25">
            You can add products anytime from your dashboard
          </span>
        </button>
      </div>
    </section>
  );
}
