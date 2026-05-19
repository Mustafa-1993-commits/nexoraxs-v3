# NexoraXS Project Progress Roadmap

Use this reference to continue future conversations without losing context. Always inspect the repo before assuming these items are committed in the current branch.

## Completed / established workflow

- Arabic, simple, step-by-step guidance.
- Claude handles spec/plan/tasks/review.
- Codex handles implementation from exact `tasks.md`.
- User usually commits manually with exact paths.
- Spec Kit slash commands were fixed by copying `.agents/commands/*.md` into `.claude/commands/`.
- Avoid `git add .`; use explicit paths.
- No backend/API/real auth/new packages unless explicitly agreed.

## Completed product phases from the build session

### Landing

- Landing v1 built.
- Mobile polish completed.
- SEO metadata completed.
- Landing v2 motion polish completed.
- Landing CTA routing connected to Core Platform login during cross-app navigation QA.

### Core Platform

- `005-core-platform-shell`: Core Platform UI Shell with `/login`, `/register`, `/workspaces`, `/dashboard`, `/dashboard/apps`, `/dashboard/settings`, `/dashboard/billing`.
- `006/007`: Core Platform UI polish and workspace selector redesign.
- `009-core-platform-ui-qa`: QA pass; removed workspace grid/glow mismatch, fixed mobile topbar clearance, lint/tsc/build passed.
- `020-core-workspace-onboarding-flow`: Core workspace onboarding at `/onboarding` with 3 steps: workspace, apps, review.
- `022-onboarding-country-currency-from-workspace`: Core owns workspace country; Shops inherits country/currency.
- `023/024 core auth/workspace routing QA`: Register/login mock routing and dashboard app launcher QA:
  - `/register` → Create Account → `/login`.
  - `/login` → first-time `/onboarding`, completed `/workspaces`.
  - `/onboarding` finish → `/dashboard/apps`.
  - `/dashboard/apps` must be available at runtime; restart dev/cache if 404 despite files existing.

### Shops App

- `010-shops-app-foundation`: Shops app shell with onboarding, dashboard, products, orders, customers, reports, settings placeholders.
- `011-shops-app-ui-polish`: Dashboard polished using `NexoraXS Shops.html` as visual reference. Added rich shops dashboard UI with mock stat cards, quick actions, recent orders table, low-stock panel, top products, and sales-by-hour chart.
- `012-shops-app-ui-qa`: QA pass; fixed mobile action row wrap, lint/build passed.
- `013-platform-to-shops-flow`: Visual flow between Core Platform and Shops. Core app launcher shows `Open Shops`; dashboard has enabled apps card; Shops sidebar has visible `Back to Platform`; no unintended external links.
- `014-shops-onboarding-v2`: Richer onboarding and setup flow. Mode cards use icons and feature bullets, `Both` is recommended, dashboard includes `NextSteps`, `SetupChecklist`, and `StoreProfile`.
- `015/016`: Shops onboarding multi-step flow and QA/clarity.
- `017-shops-operations-foundation`: Shops dashboard became operations foundation.
- `018-shops-operations-qa`: Dashboard cleanup and QA; operations-only dashboard, no onboarding/foundation setup block.
- `019-shops-onboarding-business-type-flow`: Business type and sales model separation.
- `022-onboarding-country-currency-from-workspace`: Shops inherits workspace country/currency read-only and stores derived values.
- Cross-app navigation QA: Back to Platform routes to Core dashboard; store selector reads `shops_store_name`, branch selector reads `shops_branch`.

## Current/next likely phase

The next planned product feature after onboarding/routing QA is:

```text
023/025-shops-products-and-inventory-module
```

Use the next available feature number in the repo, not necessarily this document’s number. Goal: start Products + Inventory as a wider UI module inside `apps/shops-app` only, mock/static only.

Recommended scope:

- Work only in `apps/shops-app`.
- Frontend UI only.
- No backend, API, database, real inventory logic, product persistence, payments, or new packages.
- Do not touch `core-platform` or `landing` unless a separate routing feature explicitly requires it.

Recommended Products UI:

- Header with title `Products`, subtitle, visual `Add product` button.
- Stat cards: Total products, Active products, Low stock, Draft products.
- Visual search/filter bar: search, category, status.
- Mock products table/cards with Product, SKU, Category, Stock, Price, Status, Action.
- Example products should match selected shop context where possible. For mobile shop examples: iPhone case, charger, screen protector, earbuds, repair service, etc.
- Clear mock/static/foundation note.
- Responsive, no page overflow; table can scroll horizontally.

Recommended Inventory UI:

- Header with title `Inventory`.
- Overview cards: In stock, Low stock, Out of stock, Stock value.
- Low-stock panel.
- Mock stock movement table.
- Branch selector should reflect `shops_branch` visually.
- No real inventory calculations or mutations.

Success criteria:

- `/products` renders as a full foundation screen.
- `/inventory` renders as a full foundation screen if included in the feature.
- Search/filter/add/view/actions are visual only.
- No localhost URLs or unintended external links.
- `shops-app` lint and build pass.

## Current architectural boundary

- `core-platform`: customer platform shell, mock auth UI, workspaces, app launcher, billing/settings shell.
- `shops-app`: commerce/business app UI shell and future Shops business logic.
- `landing`: public marketing only.
- Backend/auth/payments/database should not start without an explicit spec.
