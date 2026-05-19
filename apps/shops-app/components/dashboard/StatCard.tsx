import { Icon, type IconName } from "@nexoraxs/ui";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: IconName;
  color: string;
  trend?: string;
  spark?: string;
}

export function StatCard({ label, value, sub, icon, color, trend, spark }: StatCardProps) {
  const trendColor = trend?.startsWith("+") ? "text-emerald-400" : "text-rose-400";

  return (
    <div className="card relative overflow-hidden p-5">
      {/* Glow blob */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl"
        style={{ background: color, opacity: 0.25 }}
      />

      {/* Header row */}
      <div className="relative mb-3 flex items-start justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
          {label}
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
          style={{ background: `${color}1f`, color }}
        >
          <Icon name={icon} className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      {/* Value + trend */}
      <div className="relative flex items-baseline gap-2">
        <div className="text-2xl font-bold tracking-tight text-white">{value}</div>
        {trend && (
          <div className={`font-mono text-xs ${trendColor}`}>{trend}</div>
        )}
      </div>

      {/* Sub-label */}
      {sub && (
        <div className="relative mt-1 text-xs text-gray-500">{sub}</div>
      )}

      {/* Sparkline */}
      {spark && (
        <svg
          viewBox="0 0 100 30"
          className="relative mt-3 h-8 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={spark} fill="none" stroke={color} strokeWidth="1.5" />
          <path d={`${spark} L100,30 L0,30 Z`} fill={`url(#sg-${label})`} />
        </svg>
      )}
    </div>
  );
}
