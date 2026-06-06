# Contract: Topbar Controls

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03

---

## Purpose

Defines the shared behavior contract for the four topbar controls that appear in both the onboarding topbar and the platform shell topbar: `LocaleToggle`, `ThemeToggle`, `NotificationsDropdown`, `UserMenuDropdown`.

---

## LocaleToggle

**Props**: None (reads from `core_locale` session key)
**Component**: `components/dashboard/LocaleToggle.tsx`

```ts
// Behavior
const locale = useSyncExternalStore(subscribeToLocale, getLocale, () => "en");
onClick EN: setLocale("en")
onClick AR: setLocale("ar")
```

Visual: pill container with two buttons `EN` | `AR`. Active button: `bg-white/15 text-white`. Inactive: `text-white/40`.

**Appears in**: Onboarding topbar, Platform shell topbar.

---

## ThemeToggle

**Props**: None (reads from `core_theme` session key)
**Component**: `components/dashboard/ThemeToggle.tsx`

```ts
// Behavior
const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "dark");
// icon: Sun when dark (click → setTheme("light"))
// icon: Moon when light (click → setTheme("dark"))
```

Visual: single icon button. Hoverable. Icon: `<Sun>` when in dark mode (indicating "switch to light"), `<Moon>` when in light mode (indicating "switch to dark").

**Appears in**: Onboarding topbar, Platform shell topbar.

---

## NotificationsDropdown

**Props**: None
**Component**: `components/dashboard/NotificationsDropdown.tsx`

```ts
// Behavior
const [open, setOpen] = useState(false);
// Click bell: toggle open
// Click outside: close
```

Visual:
- Closed: `<Bell>` icon button; badge dot when there are unread items
- Open: absolute dropdown panel, right-aligned, `z-50`, showing 3 mock notifications

Each notification row: colored icon, title (bold), body (small muted), time (xs muted).

A "Mark all read" or "View all" link at the bottom is disabled with Coming Soon state.

**Appears in**: Platform shell topbar only (NOT in onboarding topbar).

---

## UserMenuDropdown

**Props**: None (reads `getMockUserName()` and `getMockUserEmail()` from session)
**Component**: `components/dashboard/UserMenuDropdown.tsx`

```ts
// Behavior
const [open, setOpen] = useState(false);
const name = getMockUserName() ?? "Workspace Owner";
const email = getMockUserEmail() ?? "";
// Click avatar/initials: toggle open
// Click outside: close
```

Visual:
- Closed: circle with initials (e.g. "MM") or `<UserCircle2>` icon
- Open: dropdown panel with:
  - Header: name + email (read-only)
  - Divider
  - Account — disabled/Coming Soon
  - Billing — navigates to `/dashboard/billing`
  - Team — navigates to `/dashboard/team`
  - Divider
  - Sign out — clears session, navigates to `/login`

**Appears in**: Platform shell topbar only (NOT in onboarding topbar).

---

## Consistency Rule

`LocaleToggle` and `ThemeToggle` MUST be visually identical between the onboarding topbar and the platform shell topbar (same component, same styles, same behavior).

`NotificationsDropdown` and `UserMenuDropdown` appear **only** in the platform shell topbar.

The onboarding topbar contains: `[NexoraXS logo]` + `[spacer]` + `[LocaleToggle]` + `[ThemeToggle]`.
