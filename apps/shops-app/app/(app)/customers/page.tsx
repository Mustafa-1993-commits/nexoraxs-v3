import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export default function CustomersPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="chip mb-2 text-gray-500">{"// customers"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Customers</h1>
        <p className="mt-2 text-sm text-gray-400">View and manage your customer base.</p>
      </div>
      <PlaceholderPage
        icon="users"
        title="Customers coming soon"
        description="Access customer profiles, purchase history, and contact details in one place."
      />
    </div>
  );
}
