# Data Model: Core Platform UI Shell

**Branch**: `005-core-platform-shell` | **Date**: 2026-05-12
**Note**: All data is static mock data — no database, no API.

---

## NavItem

Represents one entry in the sidebar navigation array.

```typescript
interface NavItem {
  label: string;  // "Dashboard", "Apps", "Settings"
  href: string;   // "/dashboard", "/dashboard/apps", "/dashboard/settings"
  icon: IconName; // matches Icon component lookup key
}
```

**Mock data** (`lib/mock-data/nav-items.ts`):
```typescript
export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Apps",      href: "/dashboard/apps", icon: "apps" },
  { label: "Settings",  href: "/dashboard/settings", icon: "settings" },
];
```

---

## Workspace

Represents one workspace on the selector page.

```typescript
interface Workspace {
  id: string;
  name: string;
  type: string;  // "Retail", "Healthcare", "Technology"
  initials: string; // 2-char abbreviation for avatar placeholder
}
```

**Mock data** (`lib/mock-data/workspaces.ts`):
```typescript
export const mockWorkspaces: Workspace[] = [
  { id: "1", name: "Acme Retail Co.", type: "Retail", initials: "AR" },
  { id: "2", name: "HealthFirst Clinics", type: "Healthcare", initials: "HF" },
  { id: "3", name: "TechNova Solutions", type: "Technology", initials: "TN" },
];
```

---

## Metric

Represents one summary card on the dashboard overview.

```typescript
interface Metric {
  label: string;    // "Total Revenue", "Active Users"
  value: string;    // "$48,200", "1,340"
  trend: string;    // "+12% this month", "+5 today"
  accent: string;   // Tailwind color class: "text-blue-400", "text-cyan-400"
}
```

**Mock data** (`lib/mock-data/metrics.ts`):
```typescript
export const mockMetrics: Metric[] = [
  { label: "Total Revenue",  value: "$48,200", trend: "+12% this month", accent: "text-blue-400" },
  { label: "Active Users",   value: "1,340",   trend: "+5 today",       accent: "text-cyan-400" },
  { label: "Workspaces",     value: "3",       trend: "2 active",       accent: "text-purple-400" },
  { label: "Apps Enabled",   value: "1",       trend: "Shops running",  accent: "text-emerald-400" },
];
```

---

## App

Represents one app on the app launcher page.

```typescript
interface App {
  id: string;
  name: string;
  description: string;
  available: boolean; // true = "Open", false = "Coming Soon"
}
```

**Mock data** (`lib/mock-data/apps.ts`):
```typescript
export const mockApps: App[] = [
  { id: "shops",       name: "Shops",       description: "Commerce & POS — manage products, sales, and customers.", available: true },
  { id: "clinics",     name: "Clinics",     description: "Healthcare management for appointments and billing.",     available: false },
  { id: "maintenance", name: "Maintenance", description: "Field service — schedule jobs and track assets.",         available: false },
  { id: "restaurants", name: "Restaurants", description: "Table management and kitchen operations.",                available: false },
  { id: "crm",         name: "CRM",         description: "Track leads, deals, and customer communications.",       available: false },
];
```

---

## IconName (union type)

```typescript
type IconName =
  | "dashboard"
  | "apps"
  | "settings"
  | "users"
  | "menu"
  | "x"
  | "chevron-right";
```
