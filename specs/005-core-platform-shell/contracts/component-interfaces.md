# Component Interfaces: Core Platform UI Shell

**Branch**: `005-core-platform-shell` | **Date**: 2026-05-12

All paths relative to `apps/core-platform/`.

---

## UI Primitives (`components/ui/`)

### Button

```tsx
// components/ui/Button.tsx — Server Component
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}
```

Variant styles:
- `primary`: `bg-blue-600 hover:bg-blue-500 text-white`
- `secondary`: `border border-white/20 hover:bg-white/10 text-white`
- `ghost`: `text-white/60 hover:text-white hover:bg-white/5`

### Input

```tsx
// components/ui/Input.tsx — Server Component
interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
}
```

Renders a `<label>` + `<input>` pair. Input styled with
`bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white`.

### Icon

```tsx
// components/ui/Icon.tsx — Server Component
interface IconProps {
  name: IconName;
  className?: string;
}
```

Returns a 20×20 `<svg>` with the path for the given icon name.
Supported names: `dashboard`, `apps`, `settings`, `users`, `menu`, `x`, `chevron-right`.

---

## Dashboard Components (`components/dashboard/`)

### Sidebar

```tsx
// components/dashboard/Sidebar.tsx — "use client"
// No props — self-contained. Reads navItems from lib/mock-data/nav-items.ts
// Uses usePathname() for active state
// Uses useState(false) for mobile isOpen state

export default function Sidebar(): JSX.Element
```

Renders:
- Desktop: fixed left sidebar `w-64`, always visible
- Mobile: drawer overlay, hidden by default, toggled by internal hamburger button
- Brand name "NexoraXS" at top
- `navItems` array mapped to nav links with Icon + label
- Active link: `bg-blue-600/20 text-blue-400 border-l-2 border-blue-500`
- Inactive link: `text-white/60 hover:bg-white/5 hover:text-white`
- User section at bottom (mock user: "Mustafa Mohamed", "Admin")

### MetricCard

```tsx
// components/dashboard/MetricCard.tsx — Server Component
interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  accent: string; // Tailwind text color class
}
```

### AppCard

```tsx
// components/dashboard/AppCard.tsx — Server Component
interface AppCardProps {
  name: string;
  description: string;
  available: boolean;
}
```

Renders:
- Available: blue "Open" button
- Unavailable: grey "Coming Soon" badge, button disabled

### WorkspaceCard

```tsx
// components/dashboard/WorkspaceCard.tsx — "use client"
interface WorkspaceCardProps {
  workspace: Workspace; // { id, name, type, initials }
}
```

Renders a card with initials avatar, name, type, and arrow.
`onClick` navigates to `/dashboard` via `useRouter().push("/dashboard")`.

---

## Pages

### `/login` — `app/login/page.tsx` (Server Component)

Full-page centred layout. Contains:
- "NexoraXS" heading
- "Sign in to your account" subheading
- `<Input>` for email, `<Input>` for password
- `<Button variant="primary">` — Sign In (type="button", no action)
- Link to `/register`

### `/register` — `app/register/page.tsx` (Server Component)

Same layout as login. Contains:
- Name, email, password `<Input>` fields
- `<Button variant="primary">` — Create Account (type="button", no action)
- Link to `/login`

### `/workspaces` — `app/workspaces/page.tsx` (Server Component)

Full-page. Contains:
- "Select a Workspace" heading
- `mockWorkspaces` mapped to `<WorkspaceCard>` components

### `/dashboard` — `app/dashboard/page.tsx` (Server Component)

Inside dashboard layout. Contains:
- Page heading "Dashboard"
- `mockMetrics` mapped to `<MetricCard>` components in a 2×2 / 4-col grid

### `/dashboard/apps` — `app/dashboard/apps/page.tsx` (Server Component)

Inside dashboard layout. Contains:
- Page heading "App Launcher"
- `mockApps` mapped to `<AppCard>` components in a responsive grid

---

## Layouts

### Root layout — `app/layout.tsx` (Server Component)

Updated metadata:
```typescript
export const metadata: Metadata = {
  title: "NexoraXS — Core Platform",
  description: "NexoraXS Business Operating System",
};
```

### Dashboard layout — `app/dashboard/layout.tsx` (Server Component)

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 md:ml-64">
        {children}
      </main>
    </div>
  );
}
```

Note: `md:ml-64` offsets the main content by the sidebar width on desktop.
On mobile, no offset (sidebar overlays).
