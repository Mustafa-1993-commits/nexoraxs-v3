"use client";

import { useState, type RefObject } from "react";
import { Icon } from "@/components/ui/Icon";
import { CategoryTabs } from "@/components/pos/CategoryTabs";
import { ProductCard } from "@/components/pos/ProductCard";
import { MOCK_CATEGORIES } from "@/lib/mock-data/products";
import type { Product } from "@/lib/pos-types";

interface ProductsPanelProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export function ProductsPanel({ products, onAddToCart, searchInputRef }: ProductsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Search bar */}
      <div className="border-b border-white/5 p-3 pb-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-blue-500/50 focus-within:bg-white/8 transition-colors">
          <Icon name="search" className="h-4 w-4 shrink-0 text-gray-500" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-gray-500 hover:text-white"
              aria-label="Clear search"
            >
              <Icon name="x" className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden rounded border border-white/10 px-1 text-[10px] text-gray-600 sm:inline">
            /
          </kbd>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-white/5 px-3 py-2">
        <CategoryTabs
          categories={MOCK_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {products.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Icon name="package" className="h-8 w-8 text-gray-700" />
            <p className="text-sm text-gray-500">No products yet — Add your first product</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Icon name="search" className="h-8 w-8 text-gray-700" />
            <p className="text-sm text-gray-500">No products match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
