import type { IconName } from "@/lib/types";

export interface Metric {
  label:  string;
  value:  string;
  trend:  string;
  accent: string;
  icon:   IconName;
  color:  string;
}

export const mockMetrics: Metric[] = [
  {
    label:  "Apps enabled",
    value:  "2",
    trend:  "+1",
    accent: "text-blue-400",
    icon:   "apps",
    color:  "#3b82f6",
  },
  {
    label:  "Team members",
    value:  "14",
    trend:  "+3 this month",
    accent: "text-purple-400",
    icon:   "users",
    color:  "#8b5cf6",
  },
  {
    label:  "Workspaces",
    value:  "3",
    trend:  "2 active",
    accent: "text-cyan-400",
    icon:   "dashboard",
    color:  "#06b6d4",
  },
  {
    label:  "Current plan",
    value:  "Beta",
    trend:  "Renews 2027",
    accent: "text-pink-400",
    icon:   "trending-up",
    color:  "#ec4899",
  },
];
