# Implementation Plan: Core Platform UI Polish

**Branch**: `006-core-platform-polish` | **Date**: 2026-05-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/006-core-platform-polish/spec.md`
**Visual Reference**: `docs/NexoraXS Platform.html`

---

## Summary

Polish the `apps/core-platform` UI shell to match the NexoraXS Platform
reference design. 15 files total: 3 new, 12 updated. Key additions: Logo
component, Topbar (with usePathname title derivation), improved Sidebar
(sections + Beta card), enhanced MetricCard (glow + icon), activity feed,
Billing page, Settings page with 5 tabs, and design utility classes in
`globals.css`.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16, React 19, TailwindCSS 4 — no changes
**Storage**: N/A — mock data only
**Testing**: Not in scope
**Target Platform**: Desktop (≥ 1024px) primary; mobile (≥ 375px) must not break
**Constraints**: No new packages; `@/*` alias maps to `apps/core-platform/`
**Scale/Scope**: 15 files; 2 new pages; 3 new components; updated data model

---

## Constitution Check

| Principle | Check | Status |
|-----------|-------|--------|
| I. Modular Monolith | All changes in `apps/core-platform` | ✅ PASS |
| II. Multi-Tenant Isolation | No DB — mock data only | ✅ PASS |
| III. App Boundary Enforcement | No cross-app imports | ✅ PASS |
| IV. Type Safety | `IconName` moved to shared `lib/types.ts`; all new types strict | ✅ PASS |
| V. SDK-First | N/A — no API calls | ✅ PASS |
| VI. Spec-Driven | Spec written, checklist passed | ✅ PASS |

---

## Project Structure

### Source Changes

```text
apps/core-platform/
├── lib/
│   ├── types.ts                        CREATE — shared IconName type
│   └── mock-data/
│       ├── nav-items.ts                UPDATE — import from types; add billing
│       ├── metrics.ts                  UPDATE — add icon + color fields
│       └── activity.ts                 CREATE — 4 mock activity events
├── components/
│   ├── ui/
│   │   ├── types.ts → lib/types.ts     (moved)
│   │   ├── Icon.tsx                    UPDATE — import IconName from lib/types; add 5 paths
│   │   ├── Logo.tsx                    CREATE — gradient brand mark
│   │   └── Button.tsx                  UPDATE — primary variant → btn-primary CSS class
│   └── dashboard/
│       ├── Sidebar.tsx                 UPDATE — Logo, sections, Beta card, nav-item-active
│       ├── Topbar.tsx                  CREATE — "use client", usePathname title map
│       └── MetricCard.tsx              UPDATE — glow blob, icon square, trend badge
├── app/
│   ├── globals.css                     UPDATE — add design utility classes
│   └── dashboard/
│       ├── layout.tsx                  UPDATE — Topbar + flex-col restructure
│       ├── page.tsx                    UPDATE — improved header + activity feed
│       ├── billing/
│       │   └── page.tsx                CREATE
│       └── settings/
│           └── page.tsx                CREATE — "use client" tab state
```

---

## Implementation Specifications

### Phase A — Type System Foundation

**`lib/types.ts`** — new file, establishes the shared `IconName` union.
All other files import from here.

**`components/ui/Icon.tsx`** — update import to `lib/types.ts`; add 5 new SVG paths.

**`lib/mock-data/nav-items.ts`** — update import; add `billing` nav item.

**`lib/mock-data/metrics.ts`** — add `icon: IconName` and `color: string` to `Metric` interface and update all 4 mock entries.

**`lib/mock-data/activity.ts`** — new file, 4 `ActivityEvent` entries.

### Phase B — New UI Components

**`components/ui/Logo.tsx`** — Server Component:
```tsx
export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-7 w-7 overflow-hidden rounded-lg"
           style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6 50%,#06b6d4)" }}>
        <div className="absolute inset-[1.5px] flex items-center justify-center rounded-[6px] bg-[#0a0a0f]">
          <div className="h-3 w-3 rounded-sm"
               style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)" }} />
        </div>
      </div>
      <span className="text-[15px] font-bold tracking-tight text-white">
        Nexora<span className="gradient-text">XS</span>
      </span>
    </div>
  );
}
```

**`components/dashboard/Topbar.tsx`** — `"use client"`:
- `usePathname()` → look up title from `titleMap`
- Workspace switcher: gradient "M" avatar + "Mustafa's Co." + `chevron-down` icon
- Breadcrumb: `"/"` separator + page title (hidden mobile)
- Search: `border border-white/10 bg-white/5 rounded-lg` input with `search` icon (hidden mobile)
- Bell: `w-9 h-9` button + blue dot indicator
- User: "MA" gradient avatar + name + role + `chevron-down` icon

### Phase C — Updated Components

**`components/ui/Button.tsx`** — primary variant changes from Tailwind utility to CSS class:
```typescript
const variants = {
  primary: "btn-primary text-white",          // ← was "bg-blue-600 hover:bg-blue-500 text-white"
  secondary: "border border-white/20 hover:bg-white/10 text-white",
  ghost: "text-white/60 hover:text-white hover:bg-white/5",
};
```

**`components/dashboard/Sidebar.tsx`** — key changes:
1. Import `Logo` from `@/components/ui/Logo`
2. Replace `<span>NexoraXS</span>` with `<Logo />`
3. Add `"PLATFORM"` section label above main nav (mono, 10px, text-gray-600)
4. Change active link class from Tailwind `border-l-2 border-blue-500 bg-blue-600/10 pl-[10px] text-blue-400` to CSS classes `nav-item nav-item-active`; inactive links get `nav-item text-white/60`
5. Add "RESOURCES" section label + 3 text-only links (Documentation, Changelog, Support) below nav
6. Replace user section at bottom with Beta access card:
   ```tsx
   <div className="rounded-xl border border-white/10 p-4"
        style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.05),transparent)" }}>
     <div className="mb-2 flex items-center gap-2">
       <span className="text-xs font-semibold text-white">✦ Beta access</span>
     </div>
     <p className="text-[11px] leading-relaxed text-white/40">
       Early-bird plan. Pricing locked for 12 months.
     </p>
   </div>
   ```

**`components/dashboard/MetricCard.tsx`** — enhanced:
```tsx
<div className="card card-hover relative overflow-hidden p-5">
  {/* glow blob */}
  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl opacity-25"
       style={{ background: color }} />
  {/* label + icon row */}
  <div className="relative mb-4 flex items-start justify-between">
    <div className="chip text-white/50">{label}</div>
    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
         style={{ background: `${color}1f`, color }}>
      <Icon name={icon} className="h-4 w-4" />
    </div>
  </div>
  {/* value + trend */}
  <div className="relative flex items-baseline gap-2">
    <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
    <div className={`font-mono text-xs ${accent}`}>{trend}</div>
  </div>
</div>
```

### Phase D — Layout + Pages

**`app/globals.css`** — append all CSS utility classes after existing rules (`.gradient-text`, `.card`, `.card-hover`, `.btn-primary`, `.chip`, `.nav-item`, `.nav-item-active` with `::before`).

**`app/dashboard/layout.tsx`** — restructure:
```tsx
<div className="flex min-h-screen bg-[#0a0a0f]">
  <Sidebar />
  <div className="flex flex-1 flex-col md:ml-64">
    <Topbar />
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      {children}
    </main>
  </div>
</div>
```

**`app/dashboard/page.tsx`** — improvements:
- Add `chip` eyebrow `// overview` above heading
- Change heading to "Welcome back, Mustafa."
- Map `mockActivity` to activity feed items with colored icon squares, actor bold, action muted, timestamp mono

**`app/dashboard/billing/page.tsx`** — Server Component:
- Plan card (lg:col-span-2): purple glow blob, "Beta Early-Bird" gradient-text heading, badges (Active, Renews May 12 2027, Locked-in rate), usage stats box, "Upgrade plan" + "Cancel" buttons
- Payment card: mock Visa card with gradient background, card number `•••• •••• •••• 4242`
- Invoices card: empty state with file icon + message

**`app/dashboard/settings/page.tsx`** — `"use client"`:
- `useState<"profile"|"workspace"|"team"|"security"|"api">("profile")`
- Left tab nav (5 tabs)
- Profile panel: avatar "MA", form fields (Full name, Email, Role disabled, Timezone), Save + Cancel buttons
- Workspace panel: form fields + danger zone (Delete workspace, red border card)
- Team panel: empty state (coming soon)
- Security panel: 3 toggle rows (2FA, sign-in alerts, IP restrict)
- API Keys panel: 2 key rows (Production, Sandbox) + "Generate new key" button

---

## Implementation Order

All phases can proceed once Phase A (types) is done:

1. **Phase A** (blocking): `lib/types.ts` → then all mock-data + Icon.tsx in parallel
2. **Phase B** (parallel after A): `Logo.tsx`, `Topbar.tsx`
3. **Phase C** (parallel after A): `Button.tsx`, `Sidebar.tsx`, `MetricCard.tsx`
4. **Phase D** (after B+C): `globals.css`, `layout.tsx`, `page.tsx`, `billing/page.tsx`, `settings/page.tsx`

---

## Complexity Tracking

No constitution violations. No complexity justification required.
