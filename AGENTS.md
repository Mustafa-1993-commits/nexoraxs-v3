# NexoraXS — Agent Instructions (AGENTS.md)

> This file is the single source of truth for any AI agent (Claude Code, Codex, or other)
> working on the NexoraXS platform. Read this fully before writing any code.

---
## Project Documentation

| Document | Path | Purpose |
|----------|------|---------|
| Master Plan | `docs/NexoraXS-Master-Plan.docx` | Full roadmap — Phases 0–5 |
| UX Master Plan | `docs/NexoraXS-UX-Master-Plan.docx` | All screens, flows, states |


## 1. Project Identity

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| Project      | NexoraXS — Modular SaaS Platform                  |
| Version      | v3 (active development)                            |
| Repo         | git@github.com:Mustafa-1993-commits/nexoraxs-v3.git|
| Owner        | Mustafa Mohamed                                    |
| Domain       | https://www.nexoraxs.com                           |
| Architecture | Modular Monolith (NOT microservices)               |
| Strategy     | Spec-Driven Development via Specify CLI            |

---

## 2. What NexoraXS Is (and Is NOT)

### ✅ IS:
- A modular SaaS ecosystem (Core Platform Shell + Independent Apps)
- Multi-tenant platform using `workspace_id` isolation
- Business Operating System: one login, multiple business apps

### ❌ IS NOT:
- A giant ERP monolith
- A microservices architecture (do NOT suggest this)
- A Kubernetes cluster (do NOT suggest this)
- A single-app product

---

## 3. Monorepo Structure

```
nexoraxs-v3/
├── apps/
│   ├── landing/          → nexoraxs.com (Marketing site)
│   ├── core-platform/    → app.nexoraxs.com (Auth, Workspace, Billing)
│   ├── shops-app/        → shops.nexoraxs.com (Commerce app)
│   ├── clinics-app/      → (future)
│   ├── maintenance-app/  → (future)
│   └── restaurants-app/  → (future)
│
├── packages/
│   ├── ui/               → Shared component library (ShadCN-based)
│   ├── sdk/              → API clients, fetch helpers, shared services
│   ├── auth/             → Shared auth helpers and clients
│   ├── types/            → Shared TypeScript types across all apps
│   └── shared/           → Shared utilities and constants
│
├── backend/              → Laravel API (api.nexoraxs.com)
├── infra/                → Docker, Nginx configs
├── docs/                 → Documentation
└── .specify/             → Specify CLI (spec-driven workflow)
```

---

## 4. Technology Stack

### Frontend
| Technology   | Version  | Usage                              |
|--------------|----------|------------------------------------|
| Next.js      | 16.x     | All frontend apps                  |
| React        | 19.x     | UI framework                       |
| TypeScript   | 5.x      | All frontend code (strict mode)    |
| TailwindCSS  | 4.x      | Styling system                     |
| ShadCN UI    | latest   | Component library (in packages/ui) |
| pnpm         | 9.15.9   | Package manager                    |
| Turborepo    | 2.x      | Monorepo build system              |

### Backend
| Technology      | Usage                                      |
|-----------------|--------------------------------------------|
| Laravel         | Main API (api.nexoraxs.com)                |
| Laravel Sanctum | Session-based auth across subdomains       |
| PostgreSQL      | Primary database                           |
| Redis           | Cache, queues, sessions                    |

### Infrastructure
| Technology     | Usage                    |
|----------------|--------------------------|
| Docker Compose | Local + Production       |
| Ubuntu 24.04   | VPS / WSL2 dev machine   |
| Cloudflare     | DNS + CDN                |

---

## 5. Local Development Ports

| App              | Port  | URL                       |
|------------------|-------|---------------------------|
| landing          | 3000  | http://localhost:3000     |
| core-platform    | 3001  | http://localhost:3001     |
| shops-app        | 3002  | http://localhost:3002     |
| backend (Laravel)| 8080  | http://localhost:8080     |

---

## 6. Domain Map

| Domain                      | App           | Purpose                        |
|-----------------------------|---------------|--------------------------------|
| nexoraxs.com                | landing       | Marketing, pricing, docs       |
| app.nexoraxs.com            | core-platform | Auth, workspace, billing       |
| admin.nexoraxs.com          | admin panel   | Internal ops (future)          |
| api.nexoraxs.com            | backend       | Laravel REST API               |
| shops.nexoraxs.com          | shops-app     | Commerce application           |
| clinics.nexoraxs.com        | clinics-app   | (future)                       |
| maintenance.nexoraxs.com    | maintenance   | (future)                       |

---

## 7. Architecture Rules (CRITICAL — Never Violate)

### Core Platform (app.nexoraxs.com) — ALLOWED:
- Authentication & sessions
- Workspace creation and management
- App launcher (enabling/disabling apps per workspace)
- Billing & subscriptions
- Team management & permissions
- Notifications (platform-level)
- Shared platform settings

### Core Platform — FORBIDDEN (business logic belongs in apps):
- ❌ Products, inventory, orders
- ❌ Sales, purchases, customers
- ❌ Any commerce logic
- ❌ Any clinics logic
- ❌ Any maintenance logic

### Shared Packages Rules:
- `packages/ui` (`@nexoraxs/ui`) → UI components ONLY, no business logic, no API calls, no domain data
  - Exports: `Button`, `Input`, `Badge`, `Card`, `Icon`, `Logo` + their prop types
  - `Icon` contains 48 SVG icons (stroke style); add new icons here, NOT in apps
  - `Badge` uses semantic variants: `default | success | warning | error | info | purple`
  - `Logo` uses `app` prop: `"core"` (NexoraXS wordmark) | `"shops"` (Shops brandmark)
  - Consuming apps must add `"@nexoraxs/ui": "workspace:*"` and `transpilePackages: ["@nexoraxs/ui"]`
- `packages/sdk` → API clients and fetch helpers ONLY
- `packages/types` → TypeScript interfaces/types ONLY
- `packages/auth` → Auth helpers ONLY
- Each app imports from packages, never from another app directly

### Multi-Tenancy Rule:
- Every database table that holds business data MUST have `workspace_id`
- Always filter queries by `workspace_id` — never expose cross-tenant data
- Example:
  ```sql
  SELECT * FROM products WHERE workspace_id = :workspace_id
  ```

---

## 8. Coding Standards

### TypeScript
- Strict mode enabled in all apps (`"strict": true` in tsconfig)
- No `any` types — use proper interfaces from `packages/types`
- Always type function parameters and return values
- Use `interface` for objects, `type` for unions/primitives

### React / Next.js
- Use App Router (`app/` directory) — NOT Pages Router
- Server Components by default; use `"use client"` only when needed
- Keep components small and focused (single responsibility)
- Co-locate component styles, tests, and types with the component

### File Naming
- Components: `PascalCase.tsx` (e.g., `WorkspaceSwitcher.tsx`)
- Utilities/hooks: `camelCase.ts` (e.g., `useWorkspace.ts`)
- Constants: `SCREAMING_SNAKE_CASE` in a `constants.ts` file
- Folders: `kebab-case/`

### Import Order (always in this sequence):
```typescript
// 1. React / Next.js
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party packages
import { Button } from '@nexoraxs/ui'

// 3. Internal packages
import { type Workspace } from '@nexoraxs/types'

// 4. Local imports (relative)
import { WorkspaceCard } from './WorkspaceCard'
```

### API Calls
- Always use the SDK from `packages/sdk` — never call `api.nexoraxs.com` directly from components
- All API errors must be handled gracefully with user-friendly messages
- Use loading and error states in every data-fetching component

---

## 9. Git Workflow

### Branch Strategy:
```
main         → production-ready code only
develop      → integration branch
feature/*    → new features (e.g., feature/workspace-creation)
hotfix/*     → urgent production fixes
```

### Commit Message Format (Conventional Commits):
```
feat(core-platform): add workspace creation flow
fix(shops-app): resolve inventory pagination bug
chore(packages/ui): update Button component variants
docs: update AGENTS.md with new package rules
```

### Rules:
- Never commit directly to `main`
- Never commit `.next/` build folders (add to .gitignore)
- Never commit `node_modules/`
- Always run `pnpm lint` before committing

---

## 10. .gitignore Requirements

The following MUST be in `.gitignore`:
```
.next/
node_modules/
*.local
.env
.env.*
!.env.example
```

---

## 11. Shared Authentication (Critical Config)

Because apps run on different subdomains, session must be shared:

### Laravel `.env`:
```env
SESSION_DOMAIN=.nexoraxs.com
SANCTUM_STATEFUL_DOMAINS=app.nexoraxs.com,shops.nexoraxs.com,clinics.nexoraxs.com,maintenance.nexoraxs.com,admin.nexoraxs.com
```

### CORS allowed origins:
```env
ALLOWED_ORIGINS=https://app.nexoraxs.com,https://shops.nexoraxs.com,https://clinics.nexoraxs.com,https://maintenance.nexoraxs.com,https://admin.nexoraxs.com
```

---

## 12. MVP Scope (Build ONLY These — Phase 1)

### Core Platform MVP:
- [ ] Register / Login / Logout
- [ ] Email verification
- [ ] Workspace creation
- [ ] Workspace switcher
- [ ] App Launcher (enable/disable apps)
- [ ] Basic team invitations
- [ ] Billing page (Stripe integration)

### Shops App MVP:
- [ ] Products & Categories
- [ ] Inventory management
- [ ] POS (Point of Sale)
- [ ] Basic Sales
- [ ] Customers list
- [ ] Simple reports (daily sales)

### Landing Page MVP:
- [ ] Hero section
- [ ] Features section
- [ ] Pricing section
- [ ] Footer
- [ ] Contact form

---

## 13. What NOT to Build (Yet)

- ❌ E-commerce storefront / online store
- ❌ Shipping & logistics
- ❌ Clinics app
- ❌ Maintenance app
- ❌ Restaurants app
- ❌ AI modules
- ❌ Advanced analytics
- ❌ Complex event system
- ❌ Microservices
- ❌ Kubernetes configs

---

## 14. Specify CLI Workflow

This project uses Specify for spec-driven development. Always follow this order:

```
/speckit.constitution  → Establish project principles
/speckit.specify       → Create baseline spec
/speckit.clarify       → Resolve ambiguities (optional)
/speckit.plan          → Create implementation plan
/speckit.checklist     → Validate requirements (optional)
/speckit.tasks         → Generate actionable tasks
/speckit.analyze       → Cross-check consistency (optional)
/speckit.implement     → Execute implementation
```

Agent commands are located in: `.agents/commands/`

---

## 15. Backend Architecture (Laravel)

```
backend/
├── app/
├── domains/
│   ├── auth/           → Authentication, sessions, tokens
│   ├── workspaces/     → Workspace CRUD, user-workspace relations
│   ├── billing/        → Subscriptions, plans, payments
│   ├── notifications/  → Platform notifications
│   └── shared/         → Shared services, base classes
├── routes/
│   ├── api.php
│   └── web.php
└── tests/
```

### API Response Format (always use this structure):
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "errors": null
}
```

---

## 16. Environment Variables

### Frontend apps (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_SHOPS_URL=http://localhost:3002
```

### Backend (`.env`):
```env
APP_NAME=NexoraXS
APP_URL=http://localhost:8080
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=nexoraxs
DB_USERNAME=postgres
DB_PASSWORD=secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SESSION_DRIVER=redis
SESSION_DOMAIN=.nexoraxs.com
```

---

## 17. Agent Behavior Rules

### Always:
- ✅ Read this file fully before starting any task
- ✅ Follow the MVP scope — build what's needed, nothing more
- ✅ Keep business logic inside its own app (shops logic → shops-app)
- ✅ Use shared packages from `packages/` for UI, types, SDK
- ✅ Add `workspace_id` to every business data table
- ✅ Write TypeScript — never plain JavaScript
- ✅ Use App Router (Next.js) — never Pages Router
- ✅ Follow conventional commit messages
- ✅ Ask for clarification if a requirement is ambiguous

### Never:
- ❌ Add business logic to `core-platform`
- ❌ Call the API directly from components (use SDK)
- ❌ Use `any` type in TypeScript
- ❌ Suggest microservices or Kubernetes
- ❌ Break Docker setup or auth/session flow
- ❌ Commit `.next/` or `node_modules/` folders
- ❌ Import from one app into another app directly
- ❌ Over-engineer — keep it simple and maintainable

---

## 18. Quick Reference Commands

```bash
# Install dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Run specific app
pnpm --filter landing dev
pnpm --filter core-platform dev
pnpm --filter shops-app dev

# Build all
pnpm build

# Lint all
pnpm lint

# Add package to specific app
pnpm --filter shops-app add axios

# Add package to shared packages
pnpm --filter @nexoraxs/ui add class-variance-authority
```

---

## 19. Long-Term Vision

NexoraXS aims to become a **Business Operating System** supporting:

- Multi-business operations under one login
- Modular SaaS applications per business domain
- Cloud-native infrastructure
- AI-powered workflows (future)
- Enterprise scalability

**Current phase: MVP — Core Platform + Shops App**

---

*Last updated: May 2026 | Maintained by Mustafa Mohamed*

---

## 20. Active Feature Plan

<!-- SPECKIT START -->
**Current feature**: `032-shared-ui-library` ✅ IMPLEMENTED
**Plan**: [specs/032-shared-ui-library/plan.md](specs/032-shared-ui-library/plan.md)
**Spec**: [specs/032-shared-ui-library/spec.md](specs/032-shared-ui-library/spec.md)
**Branch**: `032-shared-ui-library`
<!-- SPECKIT END -->
