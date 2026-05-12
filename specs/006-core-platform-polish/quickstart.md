# Quickstart: Core Platform UI Polish

**Branch**: `006-core-platform-polish` | **Date**: 2026-05-12

## Run Dev Server

```bash
pnpm --filter core-platform dev
# → http://localhost:3001
```

## Verify Visual Polish

### Sidebar
- [ ] NexoraXS gradient logo visible at top
- [ ] "Platform" section label above nav links (mono, uppercase, gray)
- [ ] Nav items: Dashboard, Apps, Billing, Settings
- [ ] Active nav item has gradient left-border + blue-tinted background
- [ ] "Resources" section label below main nav
- [ ] Documentation, Changelog, Support text links
- [ ] "Beta access" card at sidebar bottom with gradient border

### Topbar (all dashboard pages)
- [ ] Workspace switcher button ("Mustafa's Co.") on the left
- [ ] Page title to the right of the workspace (e.g. "Dashboard")
- [ ] Search bar visible on desktop (≥ 768px)
- [ ] Bell icon with blue notification dot
- [ ] User avatar "MA" + "Mustafa A. / Owner" on the right

### Dashboard Overview (`/dashboard`)
- [ ] 4 metric cards each with glow blob, icon, label, value, trend
- [ ] Recent activity feed with 4 mock events (actor, action, timestamp)

### Billing (`/dashboard/billing`)
- [ ] Plan card with "Beta Early-Bird" heading + purple glow + badges
- [ ] Payment card with mock card number + gradient
- [ ] Invoices section with empty-state message

### Settings (`/dashboard/settings`)
- [ ] Profile tab active by default
- [ ] 5 tabs clickable and switching content
- [ ] Workspace tab has danger zone for deleting workspace
- [ ] Security tab has mock toggle switches
- [ ] API Keys tab shows 2 mock keys

## Build Verification

```bash
pnpm --filter core-platform build
# Expect: zero TypeScript errors, zero ESLint errors
```
