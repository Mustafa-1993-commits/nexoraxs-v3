# Data Model: App Launcher — Complete Card States

**Branch**: `030-app-launcher-card-states` | **Date**: 2026-05-16

## Types

### `AppStatus`

```ts
// apps/core-platform/lib/types.ts
export type AppStatus = "active" | "enable" | "upgrade" | "coming-soon";
```

| Value | Meaning | Card treatment | Button |
|---|---|---|---|
| `"active"` | App enabled for this workspace | Full opacity | "Open →" (blue, navigates to `href`) |
| `"enable"` | Available on plan, not yet enabled | Full opacity | "Enable App" (outline, opens confirm modal) |
| `"upgrade"` | Requires higher subscription plan | Dimmed | "Upgrade Plan" (amber) |
| `"coming-soon"` | Not yet released | Dimmed | Disabled (no label / "Coming Soon") |

---

### `App` interface (updated)

```ts
// apps/core-platform/lib/mock-data/apps.ts
export interface App {
  id: string;
  name: string;
  description: string;
  status: AppStatus;          // replaces available: boolean
  href?: string;              // only populated for status === "active"
  subtitle?: string;
}
```

**Removed fields**:
- `available: boolean` — replaced by `status`
- `buttonLabel?: string` — now derived from `status`, not configurable per-item

---

### `EnableModal` props

```ts
// apps/core-platform/components/dashboard/EnableModal.tsx
interface EnableModalProps {
  app: Pick<App, "name" | "description">;
  onConfirm: () => void;
  onClose: () => void;
}
```

---

## Mock Data Mapping

| App | `status` | `href` |
|---|---|---|
| Shops | `"active"` | `SHOPS_URL` (env: `NEXT_PUBLIC_SHOPS_APP_URL`) |
| CRM | `"upgrade"` | — |
| Clinics | `"coming-soon"` | — |
| Maintenance | `"coming-soon"` | — |
| Restaurants | `"coming-soon"` | — |

---

## State Transitions

```
[enable] --confirm modal--> [enabled (mock, no persistence)]
[upgrade] --click--> upgrade path (placeholder)
[active] --click--> navigates to href
[coming-soon] --click--> no-op
```

No persistence layer. Enablement confirmation is captured as local UI state only.
