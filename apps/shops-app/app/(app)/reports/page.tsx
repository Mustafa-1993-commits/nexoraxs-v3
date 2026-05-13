import { StatCard } from "@/components/dashboard/StatCard";

const stats = [
  {
    label: "Revenue this week",
    value: "EGP 168,420",
    trend: "+12%",
    icon: "trending-up" as const,
    color: "#3b82f6",
    sub: "vs last week",
    spark: "M0,22 L14,18 L28,15 L42,16 L56,12 L70,14 L84,9 L100,4",
  },
  {
    label: "Orders this week",
    value: "1,284",
    trend: "+8%",
    icon: "receipt" as const,
    color: "#8b5cf6",
    sub: "all branches",
    spark: "M0,20 L14,19 L28,17 L42,18 L56,14 L70,15 L84,11 L100,8",
  },
  {
    label: "New customers",
    value: "86",
    trend: "+23%",
    icon: "users" as const,
    color: "#06b6d4",
    sub: "this week",
    spark: "M0,22 L14,20 L28,18 L42,19 L56,15 L70,16 L84,12 L100,9",
  },
  {
    label: "Avg. ticket",
    value: "EGP 755",
    trend: "+4%",
    icon: "banknote" as const,
    color: "#10b981",
    sub: "per order",
    spark: "M0,20 L14,19 L28,18 L42,17 L56,16 L70,15 L84,14 L100,13",
  },
];

const weekData = [
  { day: "Mon", pct: 45 },
  { day: "Tue", pct: 62 },
  { day: "Wed", pct: 78 },
  { day: "Thu", pct: 55 },
  { day: "Fri", pct: 92 },
  { day: "Sat", pct: 88 },
  { day: "Sun", pct: 40 },
];

const categories = [
  { name: "Beverages", revenue: "EGP 82,100", orders: "706 orders" },
  { name: "Food", revenue: "EGP 54,920", orders: "311 orders" },
  { name: "Bakery", revenue: "EGP 18,400", orders: "268 orders" },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// reports"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Reports</h1>
        <p className="mt-2 text-sm text-gray-400">
          Analyse your store performance and trends.{" "}
          <span className="font-mono text-[11px] text-amber-400/80">mock data</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card p-5">
          <p className="chip mb-2 text-gray-500">{"// sales by day"}</p>
          <h2 className="text-lg font-semibold text-white">This week&apos;s rhythm</h2>
          <div className="mt-4 flex h-44 items-end gap-2">
            {weekData.map((day) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full items-end">
                  <div
                    className="w-full rounded-t bg-blue-500/70"
                    style={{ height: `${day.pct}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-amber-400/80">mock data · foundation</p>
        </div>

        <div className="card p-5">
          <p className="chip mb-2 text-gray-500">{"// top categories"}</p>
          <h2 className="text-lg font-semibold text-white">By revenue</h2>
          <div className="mt-4 divide-y divide-white/5">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-white">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.orders}</div>
                </div>
                <div className="text-sm text-white">{category.revenue}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-amber-400/80">mock data · foundation</p>
        </div>
      </div>
    </div>
  );
}
