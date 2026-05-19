# Next.js Frontend Patterns

## Frontend Apps

Current/future apps:
- landing site: `www.nexoraxs.com`
- `core-platform`: `app.nexoraxs.com`
- `admin-app`: `admin.nexoraxs.com`
- `shops-app`: `shops.nexoraxs.com`
- future app-specific frontends

## core-app

`core-platform` should feel like a platform shell.

Screens may include:
- login/register
- workspace selection
- app launcher
- account/subscription settings
- shared platform settings

Do not add business modules to `core-platform`.

## shops-app

`shops-app` should feel like a workspace-specific application.

Current foundation screens:
- workspace route
- onboarding mode selection
- placeholder dashboard

Future screens:
- business management modules
- online store modules

## admin-app

`admin-app` should feel like an internal operations/admin console.

Screens may include:
- users
- workspaces
- subscriptions
- plans
- app access
- platform settings
- health/status

Do not mix customer workspace workflows into `admin-app`.

## API Clients

Prefer small typed API helpers per app.

Avoid:
- huge shared API clients too early
- duplicating complex logic without reason
- direct fetch scattered everywhere

## State

Prefer local state for simple flows.

Avoid global state unless:
- multiple distant components need it
- the flow is complex
- it reduces repeated API calls meaningfully

## Routing

Use clear workspace-aware routes.

Examples:
- `/dashboard` in core-app
- `/w/[workspaceSlug]` in shops-app
- `/admin/...` or equivalent inside admin-app

## Build Safety

After frontend changes:
- run app-specific lint
- run app-specific build
- run app-specific tests if present
