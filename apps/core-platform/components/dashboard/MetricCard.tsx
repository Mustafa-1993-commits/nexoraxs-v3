import type { Metric } from "@/lib/mock-data/metrics";
import { Icon } from "@nexoraxs/ui";

export function MetricCard({ label, value, trend, accent, icon, color }: Metric) {
  return (
    <div className="card card-hover relative overflow-hidden p-5">
      {/* Glow blob */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-25 blur-3xl"
        style={{ background: color }}
      />

      {/* Label + icon */}
      <div className="relative mb-4 flex items-start justify-between">
        <div className="chip text-white/50">{label}</div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
          style={{ background: `${color}1f`, color }}
        >
          <Icon name={icon} className="h-4 w-4" />
        </div>
      </div>

      {/* Value + trend */}
      <div className="relative flex items-baseline gap-2">
        <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
        <div className={`font-mono text-xs ${accent}`}>{trend}</div>
      </div>
    </div>
  );
}
