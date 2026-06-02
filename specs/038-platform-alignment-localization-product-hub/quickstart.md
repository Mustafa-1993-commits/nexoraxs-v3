# Quickstart: Platform Alignment — Localization Foundation & Product Hub

**Date**: 2026-06-02

---

## Prerequisites

```bash
# From repo root
pnpm install
```

No new environment variables required. Existing `.env.local` values are sufficient.

---

## Running the apps

```bash
# Start all apps (from repo root)
pnpm dev

# Or start individually
pnpm --filter core-platform dev    # http://localhost:3001 (or :3000)
pnpm --filter shops-app dev        # http://localhost:3002
```

---

## Testing the Product Hub

1. Navigate to `http://localhost:3001`
2. Complete workspace onboarding (or skip if session already exists)
3. Navigate to `/dashboard/apps`
4. Verify:
   - Page heading: **"Product Hub"**
   - Sidebar nav item: **"Product Hub"**
   - Topbar breadcrumb: **"Product Hub"** (not "App Launcher")
   - 6 OS cards visible: Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS
   - Commerce OS card: **"Open →"** button navigates to `NEXT_PUBLIC_SHOPS_APP_URL`
   - All other cards: dimmed, **"Coming Soon"** button disabled

## Testing terminology cleanup

1. Navigate to `/dashboard` (overview)
2. Verify:
   - Active OS section shows **"Commerce OS"** (not "NexoraXS Shops")
   - Activity feed uses OS language (not "Shops", not "CRM app")
3. Open Commerce OS (`http://localhost:3002`)
4. Verify browser tab title reads **"Commerce OS"**

## Testing onboarding alignment

1. Clear session storage (DevTools → Application → Session Storage → clear)
2. Navigate to `http://localhost:3001/onboarding`
3. Reach Step 2 ("Choose your operating systems")
4. Verify:
   - Step heading: **"Choose your operating systems"** (not "Choose your apps")
   - OS cards: Commerce OS (selected), Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS (all Coming Soon)
   - No "Restaurants", "Clinics", or "NexoraXS Shops" entries
5. Reach Step 3 (Review)
6. Verify summary card shows **"Commerce OS"** (not "Shops" or "Enabled apps")

## Testing the language switcher

1. Navigate to any dashboard page
2. Locate the language switcher in the topbar (right of search, left of notification bell)
3. Click **"AR"**
4. Verify:
   - `<html dir="rtl">` in DevTools
   - Page layout mirrors to RTL (sidebar mirrors, text aligns right)
5. Navigate to another page — verify RTL persists
6. Click **"EN"** — verify layout returns to LTR

## Testing Commerce OS presets

1. Navigate to `http://localhost:3002/onboarding`
2. Reach the business type selection step
3. Verify:
   - **"Pharmacy"** option visible (emoji: 💊)
   - **"Restaurant / Cafe"** option visible (emoji: 🍽️)
   - No "Gym", "Healthcare", or "Clinic" option visible
4. Select Pharmacy → proceed to Review step
5. Verify business type label reads **"Pharmacy"**
