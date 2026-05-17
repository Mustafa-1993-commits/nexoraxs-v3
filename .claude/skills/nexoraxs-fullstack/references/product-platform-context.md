# NexoraXS Product Platform Context

NexoraXS is a SaaS platform that sells multiple business applications by subscription.

## Domains

Public marketing site:
- `www.nexoraxs.com`
- Landing page for marketing, pricing, app descriptions, lead generation, and public brand presence.
- Connected through Cloudflare.

Customer platform:
- `app.nexoraxs.com`
- Main customer platform shell.
- Owns auth, workspaces, app launcher, account settings, subscription settings, and shared platform settings.

Backend API:
- `api.nexoraxs.com`
- Laravel API.
- Owns Sanctum auth/session, PostgreSQL, Redis, shared backend services, workspace APIs, subscription APIs, and app access APIs.

Platform admin:
- `admin.nexoraxs.com`
- Internal administration panel for NexoraXS operators only.
- Not for customer business usage.

Shops app:
- `shops.nexoraxs.com`
- App-specific workspace for shops and commerce.

Future apps:
- `clinics.nexoraxs.com`
- `maintenance.nexoraxs.com`
- `restaurants.nexoraxs.com`
- `crm.nexoraxs.com`

## Subscription Model

Users should be able to subscribe to one or more apps.

Examples:
- Shops only
- Clinics only
- Shops + Clinics
- Future bundles

The `core-platform` app should manage:
- account subscription
- available apps
- app access
- workspace selection
- app launcher

Each app should own its own domain logic.

## Admin Platform

`admin.nexoraxs.com` is separate from `app.nexoraxs.com`.

Admin app responsibilities:
- manage users
- manage workspaces/tenants
- manage app subscriptions
- manage plans/pricing
- manage enabled apps
- manage platform settings
- view system reports/health
- perform support/admin actions

Customer core app responsibilities:
- customer auth
- workspace selection
- app launcher
- customer account settings
- subscription self-service

Do not mix admin platform management screens into `core-platform`.

Do not put customer business modules inside `admin-app`.

## Cloudflare Context

Cloudflare is used for DNS/domain management.

Any deployment or DNS guidance should consider:
- subdomains
- DNS records
- SSL/TLS
- environment separation
- production vs staging
- API CORS/Sanctum stateful domains
- secure cookies
