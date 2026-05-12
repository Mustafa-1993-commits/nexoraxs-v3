export type IconName =
  | "dashboard"
  | "apps"
  | "settings"
  | "users"
  | "menu"
  | "x"
  | "chevron-right";

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Apps", href: "/dashboard/apps", icon: "apps" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];
