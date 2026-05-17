# Quickstart: packages/ui — @nexoraxs/ui

**Branch**: `032-shared-ui-library` | **Date**: 2026-05-17

---

## Prerequisites

- Node.js 20+, pnpm 9.x installed
- WSL2 environment (per project setup)

---

## Verify Package is Registered

```bash
# From repo root — pnpm-workspace.yaml already includes packages/*
cat pnpm-workspace.yaml
# Should contain: - "packages/*"
```

---

## Install After Adding Dependency

After adding `"@nexoraxs/ui": "workspace:*"` to an app's `package.json`:

```bash
pnpm install
```

---

## Import Components

```tsx
import { Button, Input, Badge, Card, Icon, Logo } from "@nexoraxs/ui";
import type { IconName, BadgeVariant } from "@nexoraxs/ui";
```

---

## Component Usage Examples

### Button

```tsx
<Button variant="primary" size="md">Save Changes</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="destructive" size="lg" onClick={handleDelete}>Delete Account</Button>
<Button disabled>Loading...</Button>
```

### Input

```tsx
<Input label="Email address" id="email" type="email" placeholder="you@example.com" />
<Input label="Password" id="password" type="password" error="Password is required" />
```

### Badge

```tsx
<Badge variant="success">Paid</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>
<Badge variant="purple">Pro</Badge>
<Badge>Default</Badge>
```

### Card

```tsx
<Card>
  <p className="text-white">Card content here</p>
</Card>

<Card hover>
  <p>Interactive card with hover effect</p>
</Card>
```

### Icon

```tsx
<Icon name="search" className="h-5 w-5 text-gray-400" />
<Icon name="check-circle" className="h-6 w-6 text-emerald-400" strokeWidth={2.5} />
```

### Logo

```tsx
{/* NexoraXS wordmark (default) */}
<Logo />
<Logo app="core" />

{/* Shops brandmark */}
<Logo app="shops" />
<Logo app="shops" size="sm" />
```

---

## Build Verification

After all migration is complete:

```bash
# Type check packages/ui
cd packages/ui && pnpm exec tsc --noEmit

# Build each consuming app
pnpm --filter core-platform build
pnpm --filter shops-app build
pnpm --filter landing build

# Lint
pnpm --filter core-platform lint
pnpm --filter shops-app lint
```

Expected: all commands exit with code 0, zero errors.

---

## Manual Verification Checklist

After implementation:

- [ ] `packages/ui/package.json` exists with `name: "@nexoraxs/ui"`
- [ ] `packages/ui/tsconfig.json` exists with `"strict": true`
- [ ] `packages/ui/src/index.ts` exports all 6 components and their types
- [ ] `packages/ui/src/tokens.css` exists with all 8 CSS variables
- [ ] All 6 components render correctly in a browser (visual check)
- [ ] Button: all 4 variants and 3 sizes render correctly
- [ ] Input: label renders, error message appears in red when set
- [ ] Badge: all 6 variants render with distinct colors
- [ ] Card: dark glass style renders; hover effect works when `hover={true}`
- [ ] Icon: all 48 icons render an SVG (spot check 10 icons)
- [ ] Logo: `app="core"` renders NexoraXS wordmark; `app="shops"` renders Shops logo
- [ ] `apps/core-platform/components/ui/Icon.tsx` does NOT exist
- [ ] `apps/core-platform/components/ui/Logo.tsx` does NOT exist
- [ ] `apps/core-platform/components/ui/Button.tsx` does NOT exist
- [ ] `apps/core-platform/components/ui/Input.tsx` does NOT exist
- [ ] `apps/shops-app/components/ui/Icon.tsx` does NOT exist
- [ ] `apps/shops-app/components/ui/Logo.tsx` does NOT exist
- [ ] `apps/shops-app/components/dashboard/Badge.tsx` does NOT exist
- [ ] `pnpm --filter core-platform build` → exit 0
- [ ] `pnpm --filter shops-app build` → exit 0
- [ ] `pnpm --filter landing build` → exit 0
- [ ] `pnpm --filter core-platform lint` → exit 0
- [ ] `pnpm --filter shops-app lint` → exit 0
- [ ] `AGENTS.md` has updated `packages/ui` documentation
