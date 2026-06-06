# Contract: Core Platform Session Storage

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03

---

## Purpose

Defines the authoritative session storage keys, types, and access rules for all Core Platform session data. All Core Platform components MUST use these keys and MUST NOT invent alternatives.

---

## Exact Keys and Types

| Key | Type | Written by | Default |
|-----|------|-----------|---------|
| `core_theme` | `"light" \| "dark"` | CoreProvider, ThemeToggle | `"dark"` |
| `core_locale` | `"en" \| "ar"` | LocaleToggle, StepLanguage | `"en"` |
| `core_workspace_name` | `string` | StepWorkspace | — |
| `core_workspace_country` | `string` | StepWorkspace | — |
| `core_workspace_currency` | `string` | StepWorkspace | — |
| `core_workspace_timezone` | `string` | StepWorkspace | — |
| `core_bu_name` | `string` | StepBusinessUnit | — |
| `core_bu_industry` | `string` | StepBusinessUnit | — |
| `core_branch_name` | `string` | StepBranch | — |
| `core_branch_city` | `string` | StepBranch | — |
| `core_branch_country` | `string` | StepBranch | — |
| `core_onboarding_done` | `"true"` | StepBranch (on finish) | absent |

---

## Rules

1. Keys are written **only** at the points listed above. No other component writes to these keys.
2. `core_onboarding_done` is written **only** when the user successfully completes Step 4 (Main Branch) — never before.
3. `core_locale` MUST also trigger `document.documentElement.lang` and `document.documentElement.dir` changes via `CoreProvider`.
4. `core_theme` MUST also trigger `document.documentElement.setAttribute("data-theme", ...)` via `CoreProvider`.
5. Legacy keys (`core_workspace_onboarding_done`, `core_workspace_setup`, `nexoraxs_locale`) MUST NOT be read or written by the new onboarding or shell code. They may remain in session but are ignored.
6. All `get*()` functions MUST return `null` when the key is absent, not throw.
7. All functions MUST guard against SSR with `if (typeof window === "undefined") return null/default`.

---

## Sign-out Behavior

When the user signs out (`UserMenuDropdown` → Sign out):
- `sessionStorage.clear()` is called (or individual keys are removed)
- User is navigated to `/login`
- Login page remains untouched

---

## useSyncExternalStore Caching Rule

`get*()` functions used as `getSnapshot` in `useSyncExternalStore` MUST cache their return value against the raw string in sessionStorage. If the raw string has not changed since the last call, the same object/value reference MUST be returned to avoid infinite render loops.

For primitive string values (`core_theme`, `core_locale`, etc.), this is naturally stable as long as the function returns the string directly (primitives compare by value, not reference).
