# Quickstart: Claude Prototype Local Port

**Feature**: `042-claude-prototype-local-port`
**Branch**: `041-core-platform-ux-alignment`
**Date**: 2026-06-06

---

## Prerequisites

```bash
node >= 18
pnpm >= 8
```

All dependencies are already installed in the monorepo. No new packages are required for Phase 1.

---

## Run the local app

```bash
cd apps/core-platform
pnpm dev
```

App runs at `http://localhost:3000`.

---

## First-run flow (empty DB)

1. Open `http://localhost:3000/register`
2. Create account → Welcome screen
3. Complete onboarding: Language → Workspace → Branch → OS → Plan → Business Unit
4. Complete Commerce Setup (8 steps)
5. Land on Commerce OS Dashboard

---

## Demo mode (seeded data)

To pre-populate the app with demo data (Mustafa Group workspace, Mustafa Pharmacy BU, sample products, orders, and invoices), open browser devtools console and run:

```js
// Seed demo data
localStorage.setItem('nexoraxs.session.demo', '1');
location.reload();
```

Or call `seedDB()` directly if exposed via the AppProvider dev helper.

---

## Reset to empty state

```js
// Clear all NexoraXS storage
Object.keys(localStorage)
  .filter(k => k.startsWith('nexoraxs.'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## Prototype reference

Open the Claude prototype for side-by-side visual comparison:

```bash
open docs/claude.aidesign/NexoraXS\ Commerce\ OS\ Full\ MVP\ Journey.html
```

---

## Reference the source prototype

| What you're porting | Source file in prototype |
|--------------------|-------------------------|
| Auth screens | `docs/claude.aidesign/app/auth.jsx` |
| Onboarding + Welcome + OS Launcher + Commerce Setup | `docs/claude.aidesign/app/onboarding.jsx` |
| Shell (topbar + sidebar + canvas) | `docs/claude.aidesign/app/shells.jsx` |
| Data store + DB helpers | `docs/claude.aidesign/app/store.jsx` + `db.jsx` |
| Commerce Dashboard + Products + Inventory | `docs/claude.aidesign/app/commerce.jsx` |
| POS + Sale Success | `docs/claude.aidesign/app/pos.jsx` |
| Orders + Invoices + Customers + Reports | `docs/claude.aidesign/app/records.jsx` |
| Invoice/Receipt document view | `docs/claude.aidesign/app/documents.jsx` |
| Core Platform (Billing, Team, Integrations, Settings) | `docs/claude.aidesign/app/core.jsx` |
| Shared UI primitives (Avatar, Badge, BrandMark, etc.) | `docs/claude.aidesign/app/ui.jsx` |
| Dashboard metrics helpers | `docs/claude.aidesign/app/dashboard-helpers.jsx` |
| **EXCLUDED — DO NOT PORT** | `docs/claude.aidesign/app/landing.jsx` |
| **EXCLUDED — DO NOT PORT** | `docs/claude.aidesign/app/landing.css` |

---

## TypeScript check

```bash
cd apps/core-platform
pnpm tsc --noEmit
```

---

## Lint check

```bash
cd apps/core-platform
pnpm lint
```

---

## Verify landing page is unchanged

```bash
git diff apps/core-platform/app/page.tsx
# Must show no changes
```

---

## Visual QA

Open the prototype HTML file in one browser window and the local app at `http://localhost:3000` in another. For each screen, compare:
- Layout structure (topbar, sidebar, canvas, main)
- Color system (dark topbar, light canvas, white cards)
- Typography and spacing
- Component visual design (nav items, dropdowns, badges, buttons)
- Data display (metrics, tables, lists)
