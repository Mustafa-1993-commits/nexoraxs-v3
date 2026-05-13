import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="chip mb-2 text-gray-500">{"// products"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
        <p className="mt-2 text-sm text-gray-400">
          Manage your product catalogue and inventory.
        </p>
      </div>
      <PlaceholderPage
        icon="package"
        title="Products coming soon"
        description="Add, edit, and organise your product listings. Set prices, stock levels, and categories."
      />
    </div>
  );
}
