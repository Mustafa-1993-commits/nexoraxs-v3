# Laravel Backend Patterns

## Backend Role

The Laravel backend powers:
- authentication
- Sanctum session auth
- users
- workspaces
- app access
- subscriptions
- shared APIs
- app foundation APIs

## Backend Rules

Prefer:
- small controllers
- request validation classes
- policies/authorization where needed
- migrations with safe indexes
- clear feature tests
- stable API response shapes

Avoid:
- placing business logic directly in routes
- large controllers
- changing auth/session behavior casually
- introducing app-specific domain logic into shared platform APIs unless it is an app-access/foundation concern

## Workspace-Aware Data

Any user/customer app setting should usually be scoped by:
- workspace_id
- app key or setting key
- created_by / updated_by when useful

Example foundation setting:
- `workspace_settings`
- key: `shops.mode`
- value: `business_management | online_store | both`

## API Response Rules

Use predictable JSON shapes.

Example:
```json
{
  "data": {
    "workspace": {},
    "app": "shops",
    "shops_mode": "business_management",
    "onboarding_required": false
  }
}
```

## Tests

For backend behavior changes, add feature tests covering:
- authenticated access
- unauthorized access
- workspace scoping
- persistence
- validation
- repeat visits where applicable

## Migrations

Migrations should be:
- reversible
- minimal
- indexed where needed
- safe for local Docker/PostgreSQL

Do not add large schema for future features before the feature exists.
