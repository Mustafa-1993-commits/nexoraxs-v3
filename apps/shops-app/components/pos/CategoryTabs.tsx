"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChange(cat)}
          className={[
            "shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
            cat === activeCategory
              ? "bg-blue-600 text-white"
              : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
          ].join(" ")}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
