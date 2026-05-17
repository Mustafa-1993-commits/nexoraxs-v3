# Architecture Rules

## Core Principle

NexoraXS is a multi-app SaaS platform.

The platform must remain modular:
- public landing site
- customer core platform
- backend API
- admin platform
- app-specific frontends

## core-platform

`core-platform` is only the customer platform shell.

Allowed responsibilities:
- authentication UI
- register/login/logout flows
- workspace creation/selection
- app launcher
- account settings
- subscription settings
- shared platform settings

Not allowed inside `core-platform`:
- products
- inventory
- sales
- invoices
- customers
- suppliers
- expenses
- reports
- branches
- storefront
- orders
- payments
- shipping
- clinic-specific modules
- crm-specific modules
- maintenance-specific modules
- platform admin/operator screens

## admin-app

`admin-app` is for NexoraXS platform operators.

Allowed responsibilities:
- manage users
- manage tenants/workspaces
- manage plans/pricing
- manage subscriptions
- manage app access
- manage platform settings
- support actions
- platform health/status/reporting

Not allowed inside `admin-app`:
- customer daily business workflows
- shop product management
- shop inventory management
- shop sales screens
- online store operations
- clinic operations
- car/maintenance operations

## shops-app

`shops-app` owns all shop/commerce logic.

Future responsibilities:
- shops onboarding
- business management
- products
- inventory
- sales
- invoices
- customers
- suppliers
- expenses
- reports
- branches
- online store
- storefront
- categories
- orders
- payments
- shipping

Current foundation scope may include only:
- placeholder app shell
- workspace-aware route
- onboarding mode selection
- selected shops mode persistence
- placeholder dashboard

Do not implement real shop features until explicitly requested.

## App Launcher Rule

`core-platform` may know that an app exists and whether the workspace/user can access it.

`core-platform` must not own internal app workflows.

Correct:
- core-platform shows "Shops"
- clicking Shops routes to shops-app
- shops-app handles shops onboarding/dashboard

Incorrect:
- core-platform/products
- core-platform/inventory
- core-platform/orders
- core-platform/shop-dashboard

## Repo Safety

Do not touch:
- `nexoraxs-old`

Avoid:
- large refactors
- unrelated formatting
- unrelated dependency upgrades
- app boundary violations
- moving files without a reason

Prefer:
- small changes
- clear tests
- explicit acceptance criteria
- final report with exact commands/results
