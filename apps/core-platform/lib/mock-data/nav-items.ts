import type { IconName } from "@/lib/types";

export type { IconName };

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard",         icon: "dashboard"   },
  { label: "Product Hub", href: "/dashboard/apps",   icon: "apps"        },
  { label: "Billing",   href: "/dashboard/billing", icon: "credit-card" },
  { label: "Settings",  href: "/dashboard/settings",icon: "settings"    },
];
