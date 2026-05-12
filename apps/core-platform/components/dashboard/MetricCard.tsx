import type { Metric } from "@/lib/mock-data/metrics";

export function MetricCard({ label, value, trend, accent }: Metric) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className={`text-xs font-semibold uppercase tracking-wider ${accent}`}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/50">{trend}</p>
    </div>
  );
}
