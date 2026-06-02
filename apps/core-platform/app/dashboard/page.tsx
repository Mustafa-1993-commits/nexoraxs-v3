import { MetricCard } from "@/components/dashboard/MetricCard";
import { mockMetrics } from "@/lib/mock-data/metrics";
import { mockActivity } from "@/lib/mock-data/activity";

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="chip mb-2 text-white/30">{"// overview"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, Mustafa.
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Here&apos;s what&apos;s happening across your workspaces today.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Active OS */}
      <div className="card mt-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="chip mb-1 text-white/30">{"// active os"}</p>
            <h2 className="text-lg font-semibold text-white">Operating systems active in this workspace</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-bold">
            C
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">Commerce OS</p>
            <p className="text-xs text-white/40">Commerce &amp; POS · Sample data</p>
          </div>
          <span className="chip rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
            Active
          </span>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card mt-6 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="chip mb-1 text-white/30">{"// recent activity"}</p>
            <h2 className="text-lg font-semibold text-white">Latest events</h2>
          </div>
          <button className="text-xs text-white/40 hover:text-white transition-colors">
            View all
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {mockActivity.map((event, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 text-sm font-semibold"
                style={{
                  background: `${event.color}1a`,
                  color: event.color,
                }}
              >
                {event.who.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white/70">
                  <span className="font-medium text-white">{event.who}</span>{" "}
                  {event.action}
                </p>
              </div>
              <span className="chip flex-shrink-0 text-white/30">
                {event.when}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
