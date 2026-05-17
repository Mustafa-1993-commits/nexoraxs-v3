# NexoraXS Current Project State

Use this file to continue new conversations with the same context. Always inspect `git status`, `git branch --show-current`, `specs/`, and `AGENTS.md` before assuming the latest branch state.

## Founder context

- User: Mustafa Mohamed, founder of NexoraXS.
- Preferred language: Arabic بسيط ومباشر.
- User prefers step-by-step guidance and no distraction.
- User may not have coding background; explain what to run and why.
- Preferred workflow: Claude for planning/spec/plan/tasks/review, Codex for implementation only, user commits manually with exact paths.
- Never recommend `git add .`.

## Repo and environment

- Repo: `~/projects/nexoraxs-v3`
- Environment: Windows 11 + WSL2 Ubuntu 24.04
- Package manager: pnpm
- Next.js apps use App Router
- Current local ports used in testing:
  - Landing: `http://localhost:3000`
  - Core Platform: `http://localhost:3001`
  - Shops App: `http://localhost:3002`

## Apps

| App | Path | Purpose | Build gate |
|---|---|---|---|
| Landing | `apps/landing` | Public marketing website | `pnpm --filter landing build` |
| Core Platform | `apps/core-platform` | Workspace, app launcher, billing/settings shell, mock auth UI | `pnpm --filter core-platform build` |
| Shops App | `apps/shops-app` | Shops/commerce business app shell | `pnpm --filter shops-app build` |
| Backend API | `backend` | Laravel API, planned | Do not start without spec |

## Active local/untracked notes

- `docs/branding/` and `docs/magicpatterns/` were left untracked during recent work unless the user explicitly commits them as design references.
- Magic Patterns exports were used as visual references only. Do not copy external package dependencies from those exports into the apps.

## Established tooling

- Spec Kit installed.
- `.agents/commands` has `/speckit.*` commands.
- `.claude/commands` should mirror `.agents/commands` so Claude Code can run slash commands.
- `AGENTS.md` has an active feature block that should be updated for each feature.
- `.specify/feature.json` tracks the active spec directory.

## Completed major phases

### Landing

- Landing v1 built.
- Mobile polish completed.
- SEO metadata completed.
- Landing v2 motion polish completed.
- Cross-app CTA routing QA: main Get Started CTAs were connected to Core Platform login (`http://localhost:3001/login` in local dev). A non-blocking lint warning may exist in `features.tsx` for unused `Network` import.

### Core Platform

- Core Platform UI shell completed with `/login`, `/register`, `/workspaces`, `/dashboard`, `/dashboard/apps`, `/dashboard/settings`, `/dashboard/billing`.
- Workspace selector polish completed.
- Core Platform UI QA completed.
- Platform-to-Shops visual flow added.
- Workspace onboarding flow added at `/onboarding`.
- Core workspace onboarding now owns country, not currency.
- Mock auth routing QA:
  - `/register` Create account routes to `/login`.
  - `/login` Sign in checks `core_workspace_onboarding_done`.
  - If missing, route to `/onboarding`.
  - If present, route to `/workspaces`.
  - `/onboarding` Finish routes to `/dashboard/apps`.
- `/dashboard/apps` app launcher exists. If a 404 appears in runtime while files exist, restart the dev server and remove `apps/core-platform/.next`; this happened once due to stale Next dev cache.
- Core Platform app launcher Open Shops button was connected to Shops app. It initially opened a new tab; user may prefer same-tab navigation if asked.

### Shops App

- Shops app foundation completed.
- Shops dashboard UI polish completed from HTML/Magic Patterns reference.
- Shops UI QA completed.
- Platform-to-Shops visual flow completed.
- Shops onboarding v2 completed.
- Shops onboarding multi-step flow completed.
- Onboarding QA/clarity completed.
- Shops operations foundation completed.
- Dashboard cleanup completed: dashboard is operations-only; onboarding/foundation setup block removed; no “Visual foundation only” on dashboard.
- Sidebar currently includes: Dashboard, Products, Inventory, Customers, Sales, POS, Reports, Discounts, Taxes, Settings. Items without real routes can be visual-only or `href="#"`.
- Shops onboarding business-type flow completed:
  - Step 1: Business type (`Mobile Store`, `Accessories Store`, `Clothing Store`, `Supermarket`, `Electronics Store`, `Cosmetics Store`, `Other Retail`).
  - Step 2: Sales model (`Physical store only`, `Online store only`, `Both physical + online`).
  - Step 3: Set up shop.
  - Step 4: Review setup.
- Shops inherits country/currency from workspace:
  - Core stores `core_workspace_country`.
  - Shops derives and saves `shops_country` and `shops_currency` using a static mapping.
  - Mapping: Egypt→EGP, Saudi Arabia→SAR, United Arab Emirates→AED, Kuwait→KWD, Qatar→QAR.
  - Shops Step 3 does not show editable country/currency selects.
- Shops topbar/store display bug fixed: after onboarding, topbar should show `shops_store_name` (e.g. `Mustafa Phone`) and `shops_branch` (e.g. `alexandria`), not the workspace name as the store.
- Shops Back to Platform button should route to Core Platform dashboard (`http://localhost:3001/dashboard` in local dev) if the recent navigation QA is committed.

## Current important sessionStorage keys

### Core Platform

- `core_workspace_setup`
- `core_workspace_country`
- `core_workspace_onboarding_done`

### Shops App

- `shops_business_type`
- `shops_mode`
- `shops_store_name`
- `shops_branch`
- `shops_country`
- `shops_currency`
- `shops_onboarding_done`

Older keys to remember from previous flow:
- `shops_mode`
- `shops_branch`
- `shops_currency`
- `shops_onboarding_done`

## Current tested journey

Working desired MVP journey:

```text
Landing / Get Started
→ Core Platform /login
→ if first time: /onboarding
→ workspace setup: name + slug + region + country
→ choose apps
→ review
→ /dashboard/apps
→ Open Shops
→ Shops /onboarding
→ business type
→ sales model
→ shop setup: store display name + main branch, inherited workspace country/currency
→ review
→ Shops /dashboard
```

Second login expected:

```text
/login
→ if core_workspace_onboarding_done exists
→ /workspaces
```

## Recently tested issues and fixes

- `/dashboard` and `/dashboard/apps` returned 404 once although files existed. Fix was to stop dev server, remove `apps/core-platform/.next`, and restart `pnpm --filter core-platform dev`.
- Open Shops button did nothing, then was fixed to open Shops onboarding. It opened a new tab; acceptable unless user requests same-tab behavior.
- Shops dashboard Store selector showed workspace name instead of store display name; fixed to use `shops_store_name`.

## Do not start without explicit request/spec

- Backend implementation
- Laravel Sanctum auth wiring
- PostgreSQL/data models
- Real auth
- Payments/subscriptions real logic
- Real inventory/order persistence
- Microservices/Kubernetes
- New packages
