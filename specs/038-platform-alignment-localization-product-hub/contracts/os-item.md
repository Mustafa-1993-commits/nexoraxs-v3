# Internal Contract: OSItem — Product Hub Data Interface

**Version**: 1.0
**Owner**: Core Platform
**Consumer**: `components/dashboard/AppCard.tsx` (Product Hub OS card component)

---

## Purpose

This contract defines the data shape that any developer must provide to add a new OS entry to the Product Hub. It decouples the data source from the card component — adding an OS requires one array entry, no component changes.

---

## Interface

```ts
interface OSItem {
  id: string;          // unique, stable, kebab-case: "commerce", "healthcare", "hr", "crm", "gym", "maintenance"
  name: string;        // user-facing display name: "Commerce OS", "Healthcare OS", etc.
  description: string; // 1–2 sentence user-facing description of the OS product
  state: OSState;      // "active" | "coming-soon" | "trial" | "locked"
  href?: string;       // required when state === "active"; navigation target URL
}
```

---

## Rendering contract

| `state` value | Button label | Button action | Card visual |
|---|---|---|---|
| `"active"` | `"Open →"` | Navigate to `href` | Full opacity |
| `"coming-soon"` | `"Coming Soon"` | Disabled (no action) | Dimmed (opacity-50) |
| `"trial"` | `"Active (Trial)"` | Navigate to `href` | Full opacity + trial badge |
| `"locked"` | `"Upgrade Plan"` | Open billing page | Dimmed |

For this spec, only `"active"` and `"coming-soon"` are rendered. `"trial"` and `"locked"` are defined for future use and MUST NOT silently break the component if provided.

---

## Adding a new OS entry

To add a new OS to the Product Hub, add one entry to `apps/core-platform/lib/mock-data/apps.ts`:

```ts
{
  id: "new-os-id",
  name: "New OS",
  description: "Short description visible on the Product Hub card.",
  state: "coming-soon",
}
```

No changes to page layout or card component are required (SC-007 from spec).

---

## Constraints

- `id` must be unique across all entries in `mockOS`
- `href` must be a valid URL (absolute or root-relative) when `state === "active"`
- `name` and `description` must be localizable — wrap in `t()` when the locale utility is wired to real translations
- Entries are rendered in array order — order is intentional (Commerce OS first, future OS alphabetical)
