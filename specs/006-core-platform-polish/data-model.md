# Data Model: Core Platform UI Polish

**Branch**: `006-core-platform-polish` | **Date**: 2026-05-12

---

## IconName (moved to `lib/types.ts`)

```typescript
export type IconName =
  | "dashboard"
  | "apps"
  | "settings"
  | "users"
  | "menu"
  | "x"
  | "chevron-right"
  | "credit-card"
  | "search"
  | "bell"
  | "chevron-down"
  | "trending-up";
```

---

## NavItem (updated — imports IconName from `lib/types.ts`)

```typescript
export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard",          icon: "dashboard"   },
  { label: "Apps",      href: "/dashboard/apps",     icon: "apps"        },
  { label: "Billing",   href: "/dashboard/billing",  icon: "credit-card" },
  { label: "Settings",  href: "/dashboard/settings", icon: "settings"    },
];
```

---

## Metric (updated — adds `icon` and `color`)

```typescript
export interface Metric {
  label:  string;    // "Apps enabled"
  value:  string;    // "2"
  trend:  string;    // "+1"
  accent: string;    // Tailwind class: "text-blue-400"
  icon:   IconName;  // "apps"
  color:  string;    // hex: "#3b82f6" — used for glow blob + icon bg
}

export const mockMetrics: Metric[] = [
  { label: "Apps enabled",  value: "2",    trend: "+1",            accent: "text-blue-400",   icon: "apps",        color: "#3b82f6" },
  { label: "Team members",  value: "14",   trend: "+3 this month", accent: "text-purple-400", icon: "users",       color: "#8b5cf6" },
  { label: "Workspaces",    value: "3",    trend: "2 active",      accent: "text-cyan-400",   icon: "dashboard",   color: "#06b6d4" },
  { label: "Current plan",  value: "Beta", trend: "Renews 2027",   accent: "text-pink-400",   icon: "trending-up", color: "#ec4899" },
];
```

---

## ActivityEvent (new — `lib/mock-data/activity.ts`)

```typescript
export interface ActivityEvent {
  who:    string;  // "Sara M.", "You", "System"
  action: string;  // "enabled the CRM app"
  when:   string;  // "2m ago", "1h ago", "Today, 09:00"
  color:  string;  // hex — used for icon background tint
}

export const mockActivity: ActivityEvent[] = [
  { who: "Sara M.", action: "enabled the CRM app",              when: "2m ago",        color: "#10b981" },
  { who: "You",     action: "invited 3 team members to Shops",  when: "1h ago",        color: "#3b82f6" },
  { who: "System",  action: "auto-renewed your Beta plan",      when: "Today, 09:00",  color: "#8b5cf6" },
  { who: "Omar K.", action: 'created workspace "Cairo branch"', when: "Yesterday",     color: "#06b6d4" },
];
```

---

## SettingsTab (local to settings page)

```typescript
interface SettingsTab {
  id:    "profile" | "workspace" | "team" | "security" | "api";
  label: string;
}

const tabs: SettingsTab[] = [
  { id: "profile",   label: "Profile"    },
  { id: "workspace", label: "Workspace"  },
  { id: "team",      label: "Team"       },
  { id: "security",  label: "Security"   },
  { id: "api",       label: "API Keys"   },
];
```
