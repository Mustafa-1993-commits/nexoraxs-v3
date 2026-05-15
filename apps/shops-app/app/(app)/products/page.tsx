import { Badge } from "@/components/dashboard/Badge";
import { Icon } from "@/components/ui/Icon";

type ProductStatus = "Active" | "Low Stock" | "Draft";

const statusColor: Record<ProductStatus, "emerald" | "amber" | "gray"> = {
  Active: "emerald",
  "Low Stock": "amber",
  Draft: "gray",
};

const products: {
  name: string;
  category: string;
  status: ProductStatus;
  stock: number;
  price: string;
}[] = [
  { name: "Iced Latte", category: "Beverages", status: "Active", stock: 482, price: "EGP 38.50" },
  { name: "Chicken Sandwich", category: "Food", status: "Active", stock: 311, price: "EGP 48.00" },
  { name: "Croissant", category: "Bakery", status: "Active", stock: 268, price: "EGP 24.00" },
  { name: "Cold Brew", category: "Beverages", status: "Active", stock: 224, price: "EGP 44.00" },
  { name: "Espresso Beans 1kg", category: "Supplies", status: "Low Stock", stock: 3, price: "EGP 210.00" },
  { name: "Oat Milk Carton", category: "Supplies", status: "Low Stock", stock: 5, price: "EGP 42.00" },
];

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// products"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
        <p className="mt-2 text-sm text-gray-400">
          Manage your product catalogue and inventory.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Icon name="search" className="h-4 w-4 text-gray-500" />
          <input
            disabled
            className="bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-600"
            placeholder="Search products…"
            aria-label="Search (preview only)"
          />
        </div>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600/50 px-3.5 py-2 text-xs font-semibold text-white/60 cursor-not-allowed"
        >
          <Icon name="package-plus" className="h-4 w-4" />
          Add product
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5">
              <tr className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4 text-left">Product</th>
                <th className="px-5 py-4 text-left">Category</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Stock</th>
                <th className="px-5 py-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.name} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-sm font-medium text-white">
                    {product.name}
                  </td>
                  <td className="px-5 py-4">
                    <Badge color="gray">{product.category}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge color={statusColor[product.status]}>{product.status}</Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-gray-400">
                    {product.stock}
                  </td>
                  <td className="px-5 py-4 text-sm text-white">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-amber-400/80">
        Sample data
      </p>
    </div>
  );
}
