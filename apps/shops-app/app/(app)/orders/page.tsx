import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="chip mb-2 text-gray-500">{"// orders"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
        <p className="mt-2 text-sm text-gray-400">Track and manage customer orders.</p>
      </div>
      <PlaceholderPage
        icon="receipt"
        title="Orders coming soon"
        description="View, process, and fulfil customer orders. Track status from placement to delivery."
      />
    </div>
  );
}
