# Quickstart: Core Platform UI Shell

**Branch**: `005-core-platform-shell` | **Date**: 2026-05-12

## Run Dev Server

```bash
pnpm --filter core-platform dev
# → http://localhost:3001
```

## Verify All 5 Pages

| URL | Expected |
|-----|----------|
| http://localhost:3001/ | Redirects to `/login` |
| http://localhost:3001/login | Login form, no sidebar |
| http://localhost:3001/register | Register form, no sidebar |
| http://localhost:3001/workspaces | 3 workspace cards, no sidebar |
| http://localhost:3001/dashboard | Sidebar + 4 metric cards |
| http://localhost:3001/dashboard/apps | Sidebar + 5 app cards |

## Verify Dashboard Sidebar

- [ ] Sidebar visible on desktop (≥ 768px)
- [ ] Hamburger button visible on mobile (< 768px)
- [ ] Hamburger opens/closes sidebar overlay
- [ ] Active nav item highlighted (different page, different active state)
- [ ] Tapping nav link on mobile closes sidebar

## Verify Navigation

- [ ] `/login` → "Create an account" link → `/register`
- [ ] `/register` → "Sign in" link → `/login`
- [ ] `/workspaces` → click any workspace card → `/dashboard`
- [ ] `/dashboard` sidebar → click "Apps" → `/dashboard/apps`
- [ ] `/dashboard/apps` sidebar → click "Dashboard" → `/dashboard`

## Verify Mobile Layout (375px)

- [ ] `/login` — form centred, no overflow
- [ ] `/register` — form centred, no overflow
- [ ] `/workspaces` — workspace cards stacked single column
- [ ] `/dashboard` — metric cards in 2-column grid, no overflow
- [ ] `/dashboard/apps` — app cards in 1 column, no overflow

## Run Build

```bash
pnpm --filter core-platform build
# Expect: zero TypeScript errors, zero ESLint errors
```
