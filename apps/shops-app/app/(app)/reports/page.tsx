import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="chip mb-2 text-gray-500">{"// reports"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Reports</h1>
        <p className="mt-2 text-sm text-gray-400">Analyse your store performance and trends.</p>
      </div>
      <PlaceholderPage
        icon="chart-bar"
        title="Reports coming soon"
        description="Sales summaries, revenue trends, and inventory insights — all in one dashboard."
      />
    </div>
  );
}
