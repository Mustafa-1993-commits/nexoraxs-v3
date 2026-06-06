# UI Route Contract

**Feature**: `042-claude-prototype-local-port`
**Date**: 2026-06-06

---

## Overview

This document defines the routing contract for all authenticated and unauthenticated routes in the `apps/core-platform` Next.js App Router application.

**Critical rule**: The `/` route (public landing page) is NOT in this contract. It must remain unchanged.

---

## Public Routes (No Auth Required)

| Route | Component | Guard | Post-Submit Redirect |
|-------|-----------|-------|---------------------|
| `/login` | `app/login/page.tsx` | If authenticated + onboarding complete → `/commerce/dashboard`; if authenticated + onboarding incomplete → `/onboarding` | On success: see guard |
| `/register` | `app/register/page.tsx` | If authenticated → `/welcome` | On success: `/welcome` |
| `/verify-email` | `app/verify-email/page.tsx` | None | On verify: `/onboarding` |
| `/forgot-password` | `app/forgot-password/page.tsx` | None | On submit: same page with confirmation |
| `/reset-password` | `app/reset-password/page.tsx` | None | On success: `/login?reset=success` |

---

## Core Platform Routes (Auth Required)

All routes under `app/dashboard/` use `CoreShell` via `dashboard/layout.tsx`.

| Route | Component | Guard | Notes |
|-------|-----------|-------|-------|
| `/welcome` | `app/welcome/page.tsx` | Auth required; if onboarding complete → `/commerce/dashboard` | First-registration welcome gateway |
| `/onboarding` | `app/onboarding/page.tsx` | Auth required; if onboarding complete → `/commerce/dashboard` | Full onboarding wizard (6 steps) |
| `/workspaces` | `app/workspaces/page.tsx` | Auth required | Workspace selector for multi-workspace (future) |
| `/dashboard` | `app/dashboard/page.tsx` | Auth required | Redirects to `/dashboard/apps` or `/commerce/dashboard` |
| `/dashboard/apps` | `app/dashboard/apps/page.tsx` | Auth + onboarding complete | OS Launcher / Product Hub |
| `/dashboard/billing` | `app/dashboard/billing/page.tsx` | Auth + onboarding complete | Subscription + plan management |
| `/dashboard/team` | `app/dashboard/team/page.tsx` | Auth + onboarding complete | Team members + invite |
| `/dashboard/integrations` | `app/dashboard/integrations/page.tsx` | Auth + onboarding complete | Integrations list |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Auth + onboarding complete | Workspace + account settings |

---

## Commerce OS Setup Route

Uses minimal layout (`commerce/setup/layout.tsx`) — no sidebar, topbar only.

| Route | Component | Guard | Notes |
|-------|-----------|-------|-------|
| `/commerce/setup` | `app/commerce/setup/page.tsx` | Auth + OS activated; if setup complete → `/commerce/dashboard` | 8-step Commerce Setup wizard |

---

## Commerce OS Routes (Auth + Onboarding + Setup Complete)

All routes under `app/commerce/` (except `/commerce/setup`) use `CommerceShell` via `commerce/layout.tsx`.

**Commerce Layout Guards** (applied to all routes below):
1. `!isAuthenticated` → redirect to `/login`
2. `!isOnboardingComplete` → redirect to `/onboarding`
3. `!isCommerceOSActive` → redirect to `/dashboard/apps`
4. `!isCommerceSetupComplete` → redirect to `/commerce/setup`

| Route | Component | Method | Notes |
|-------|-----------|--------|-------|
| `/commerce/dashboard` | `app/commerce/dashboard/page.tsx` | GET | Metrics + quick actions |
| `/commerce/pos` | `app/commerce/pos/page.tsx` | GET | POS screen |
| `/commerce/pos/success` | `app/commerce/pos/success/page.tsx` | GET | Post-sale success; requires `orderId` in session/param |
| `/commerce/products` | `app/commerce/products/page.tsx` | GET | Products list |
| `/commerce/products/new` | `app/commerce/products/new/page.tsx` | GET + POST | Add product form |
| `/commerce/inventory` | `app/commerce/inventory/page.tsx` | GET | Inventory view with inline adjustments |
| `/commerce/orders` | `app/commerce/orders/page.tsx` | GET | Orders list |
| `/commerce/orders/[id]` | `app/commerce/orders/[id]/page.tsx` | GET | Order detail |
| `/commerce/invoices` | `app/commerce/invoices/page.tsx` | GET | Invoices list |
| `/commerce/invoices/[id]` | `app/commerce/invoices/[id]/page.tsx` | GET | Invoice detail |
| `/commerce/invoices/[id]/document` | `app/commerce/invoices/[id]/document/page.tsx` | GET | Printable document view |
| `/commerce/customers` | `app/commerce/customers/page.tsx` | GET | Customers list |
| `/commerce/customers/[id]` | `app/commerce/customers/[id]/page.tsx` | GET | Customer profile |
| `/commerce/reports` | `app/commerce/reports/page.tsx` | GET | Sales reports + analytics |
| `/commerce/settings` | `app/commerce/settings/page.tsx` | GET + POST | Commerce settings (identity, tax, numbering, templates, categories) |

---

## Redirect Logic Summary

```
User opens app:
  If authenticated + onboarding complete + commerce setup complete
    → /commerce/dashboard
  If authenticated + onboarding complete + commerce setup NOT complete
    → /commerce/setup
  If authenticated + onboarding NOT complete
    → /onboarding
  If NOT authenticated
    → /login

User completes registration:
  → /welcome

User completes welcome:
  → /onboarding

User completes core onboarding (Language + Workspace + Branch):
  Stays in /onboarding for Phase 2 (OS Activation steps)

User completes OS activation (OS + Plan + Business Unit):
  → /commerce/setup

User completes Commerce Setup:
  → /commerce/dashboard

User logs out:
  → /login
```
