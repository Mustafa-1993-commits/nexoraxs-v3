import { MetricCard } from "@/components/dashboard/MetricCard";
import { mockMetrics } from "@/lib/mock-data/metrics";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">
          Welcome back, Mustafa. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-base font-semibold text-white">
          Recent Activity
        </h2>
        <p className="mt-4 text-sm text-white/40">
          No recent activity to display.
        </p>
      </div>
    </div>
  );
}
