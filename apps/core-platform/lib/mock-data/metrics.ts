export interface Metric {
  label: string;
  value: string;
  trend: string;
  accent: string;
}

export const mockMetrics: Metric[] = [
  {
    label: "Total Revenue",
    value: "$48,200",
    trend: "+12% this month",
    accent: "text-blue-400",
  },
  {
    label: "Active Users",
    value: "1,340",
    trend: "+5 today",
    accent: "text-cyan-400",
  },
  {
    label: "Workspaces",
    value: "3",
    trend: "2 active",
    accent: "text-purple-400",
  },
  {
    label: "Apps Enabled",
    value: "1",
    trend: "Shops running",
    accent: "text-emerald-400",
  },
];
