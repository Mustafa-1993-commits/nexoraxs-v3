# Auth and Session Rules

NexoraXS currently depends on Laravel Sanctum session auth.

Protect this flow carefully.

## Rules

Do not casually change:
- Sanctum configuration
- stateful domains
- CORS allowed origins
- cookie settings
- session domain
- CSRF flow
- login/logout/me endpoints
- workspace auth assumptions

## Local Development

Local apps may include:
- landing on localhost:3000
- core-platform on localhost:3001
- shops-app on localhost:3002
- backend API on localhost:8080
- backend API on localhost:8080

When adding a new frontend app locally, remember:
- update Sanctum stateful domains
- update CORS allowed origins
- preserve credentials/cookies behavior

## Frontend Requests

For Sanctum browser session auth:
- include credentials where needed
- preserve CSRF flow
- avoid switching to token auth unless explicitly requested

## Tests

Auth/session related changes need tests for:
- authenticated user
- unauthenticated user
- workspace access
- logout/session invalidation when relevant
