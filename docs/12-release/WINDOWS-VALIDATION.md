# Feature 050 Windows Validation

**Task**: T047  
**Status**: **Blocked by Environment**  
**Waiting for**: **Windows Validation**

Feature 050 was implemented and automatically validated in WSL Ubuntu 24.04. The required
Windows, NVDA, Chrome, and Edge manual validation cannot execute inside WSL. This is an environment
blocker, not an implementation failure, pass, waiver, or N/A result.

Complete this checklist on Windows before release approval. Do not check an item without an
observation. Record defects with reproducible steps and leave the affected item unchecked.

## Validation record

- [ ] Date and local time: ____________________
- [ ] Reviewer: ____________________
- [ ] Feature/build or revision: ____________________
- [ ] Windows edition/version/build: ____________________
- [ ] Display scaling and resolution: ____________________
- [ ] Chrome version: ____________________
- [ ] Edge version: ____________________
- [ ] NVDA version: ____________________
- [ ] Keyboard/layout: ____________________
- [ ] Evidence folder or issue links: ____________________

Use the approved Feature 050 seeded mock session. Preserve its routes, storage keys, seeded IDs,
legacy BusinessUnit-as-Business compatibility, and current UI while validating.

## Concise operator run sheet

This run sheet is preparation, not evidence. Every result field stays unchecked until a human
reviewer observes it on Windows.

### 1. Record the environment

- [ ] Windows edition, version, and build: ____________________
- [ ] Display scaling and physical resolution: ____________________
- [ ] Current-stable Chrome version: ____________________
- [ ] Current-stable Edge version: ____________________
- [ ] Current-stable NVDA version: ____________________
- [ ] Keyboard/layout: ____________________
- [ ] Feature revision/build: ____________________
- [ ] Reviewer, date, and local time: ____________________
- [ ] Screenshot, speech-viewer note, and defect-link folder: ____________________

### 2. Pin the exact seeded state

Use `http://127.0.0.1:3001` and an isolated browser profile seeded by
`tests/e2e/fixtures/core-050.ts`. Record how the fixture was installed. Do not clear or rename keys,
edit IDs, or create canonical Business data.

| Field | Required starting value |
|---|---|
| Fixture | `valid`, English, light theme; use only the named variants below for their stated journey |
| User | `user_001` — Mustafa Hassan |
| Workspace | `ws_001` — Mustafa Group |
| OS Subscription | `sub_001` |
| Legacy Business-labelled `BusinessUnit` | `bu_001` — Mustafa Pharmacy |
| Branch | `br_001` — Smouha Branch |
| Legacy `OSEnablement` | `ose_001` |
| Team member / Commerce setup | `tm_001` / `cs_001` |
| Protected products | `p1`, `p2` |
| OS and onboarding | `commerce`; `completedOS` contains `commerce` |
| Locale/direction | `en` / `ltr` initially |
| Theme | `light` initially |

Exact shell URLs:

- `http://127.0.0.1:3001/dashboard`
- `http://127.0.0.1:3001/dashboard/apps`
- `http://127.0.0.1:3001/dashboard/billing`
- `http://127.0.0.1:3001/dashboard/team`
- `http://127.0.0.1:3001/dashboard/integrations`
- `http://127.0.0.1:3001/dashboard/settings`

Redirect smoke URLs are `/`, `/login`, `/onboarding`, `/register`, `/verify`, `/verify-email`,
`/forgot-password`, `/reset-password`, and `/welcome`. Record the observed destination; do not
change an expected route to make the checklist pass.

### 3. Execute the exact normal-shell journeys

| Journey | Expected keyboard focus | Expected NVDA/semantic observation |
|---|---|---|
| Skip link | First Tab exposes the link; activation focuses the single `main` region. | Skip-link name is understandable; one main is announced. |
| Primary navigation | Focus follows the existing five destinations in their existing order. | One named “Primary navigation” landmark; active destination is announced as current page. |
| Compact drawer at 375/768 | Menu opens the dialog; focus stays inside; Escape, Close menu, selection, or scrim closes it and returns focus to Menu. | Menu exposes expanded state; open surface is named “Navigation menu”; hidden drawer is not active content. |
| Search | Opening/focusing search places focus in the Search combobox; Arrow keys move the active option, Enter follows it, Escape restores focus. | Search/results/no-results are named; results contain only existing Core destinations and never claim API, command, AI, or Commerce search. |
| Notifications | Trigger opens its dialog; Escape/outside dismissal returns focus to Notifications. | Trigger expanded state and “Notifications” dialog name are announced; projected items or “No new notifications” are understandable without the colored dot. Use `populated` only for the projected-item journey. |
| Profile | Trigger opens the User menu; keyboard reaches Account, Billing, Team, and Sign out; dismissal restores focus. | Menu name, expanded state, and item names are announced; no unintended item activates. |
| Workspace menu | Trigger retains/restores focus after dismissal. | “Workspace menu”, current selection, and checked state are announced; user-entered names are read as displayed. |
| Locale | English and Arabic controls retain predictable focus after activation. | English is `lang="en" dir="ltr"`; Arabic is `lang="ar" dir="rtl"`; pressed state matches the active locale. |
| Theme | Theme button retains predictable focus after activation/reload. | In light mode the action is “Switch to dark mode”; in dark mode it is “Switch to light mode”; pressed state and stored theme agree. |
| Route navigation | After activation, the next Tab stop remains predictable and focus is never trapped in a closed surface. | New active route is announced through current-page semantics without duplicate live announcements. |

Repeat the normal-shell journeys in Chrome and Edge at 375, 768, 1024, and 1440 CSS pixels; repeat
skip-link validation in English/LTR and Arabic/RTL in both browsers. At 1024/1440, confirm the
sidebar is persistent. At 375/768, confirm drawer behavior. Also inspect 879/881 around the 880-pixel
breakpoint, browser zoom at 200%, reduced motion, dark/light, and Windows forced colors.

### 4. Execute the exact state journeys

| State | Deterministic method | Expected announcement/focus result |
|---|---|---|
| Loading | Open `/dashboard/apps` with JavaScript disabled in the isolated profile. | One polite busy status: “Loading Core Platform” and “Preparing your saved Core Platform session.” Arabic equivalent must be observed in the Arabic pass. |
| Empty | Use `missing-context-complete`. | One polite status: “Workspace context is missing”; Retry context is reachable. |
| Unavailable | Use `stale` or `unavailable-context`. | One polite status: “Workspace context is unavailable”; no foreign record is announced. |
| Unauthorized mock-session mismatch | Use `cross-scope`. | One polite status: “Context is not available for this session”; no foreign Workspace, Business, or Branch name is announced. |
| Recovering | From `stale`, activate Retry context. | “Checking Workspace context” is announced once, focus remains predictable, and the state returns to unavailable without changing storage. |
| Error | No approved deterministic manual browser fixture currently exposes this contract state. | **BLOCKED**: do not fabricate an announcement or modify product code. Link an approved trigger/defect disposition before checking the existing error item. Expected contract copy is “Core Platform could not be displayed” / “The current presentation read failed. Retry it without changing saved data.” |

Arabic state titles expected in the Arabic/RTL pass are: “جارٍ تحميل المنصة الأساسية”، “سياق مساحة
العمل مفقود”، “سياق مساحة العمل غير متاح”، “السياق غير متاح لهذه الجلسة”، “جارٍ فحص سياق مساحة
العمل”، and—only when an approved error trigger exists—“تعذر عرض المنصة الأساسية”. Record the
actual spoken output; these strings are expectations, not pre-filled results.

### 5. Record every result

For every journey record locale/direction, theme, CSS viewport, browser/version, NVDA version,
fixture, expected result, observed focus destination, concise spoken announcement or speech-viewer
evidence, PASS/BLOCKED, defect link, reviewer, and date. Do not record secrets or participant data.
Any unchecked item, missing version, unobservable state, duplicate/stale announcement, focus loss,
critical/serious accessibility finding, route/storage/context regression, or Chrome/Edge mismatch
keeps T047 blocked.

## Chrome

- [ ] Open Core Platform in current-stable Chrome with a clean browser profile or documented
      isolated test profile.
- [ ] Confirm login/onboarding redirects and all existing shell routes resolve without a blank,
      looping, or unauthorized page.
- [ ] Confirm the shell is operable at 375, 768, 1024, and 1440 CSS-pixel widths.
- [ ] Confirm there are no critical or serious browser-console errors attributable to Feature 050.
- [ ] Record screenshots for compact and desktop layouts in English/light and Arabic/dark.

## Edge

- [ ] Repeat the Core shell route and redirect smoke pass in current-stable Edge.
- [ ] Confirm sidebar, drawer, dialogs, menus, search, theme, and locale behavior matches Chrome.
- [ ] Confirm no horizontal document overflow at each required width.
- [ ] Confirm browser zoom at 200% keeps the active route heading and controls usable.
- [ ] Record any Chrome/Edge difference as a defect with both browser versions.

## NVDA

- [ ] Start current-stable NVDA before loading the application in current-stable Chrome.
- [ ] Record NVDA speech-viewer output or concise announcement notes without personal data.
- [ ] Navigate by landmark and confirm one banner, one named primary navigation, and one main.
- [ ] Confirm the active navigation item and expanded/collapsed control states are announced.
- [ ] Confirm loading, unavailable, error, unauthorized, and recovery messages are announced once,
      without duplicate or stale announcements.
- [ ] Repeat one compact-width and one desktop-width pass spanning English and Arabic.

## Keyboard only

- [ ] Complete validation without using a mouse or touch input.
- [ ] Confirm every interactive shell control is reachable in a logical order.
- [ ] Confirm Enter and Space activate buttons and menu items where applicable.
- [ ] Confirm Escape closes the drawer, dialogs, profile menu, notifications, search, and Workspace
      switcher where each is open.
- [ ] Confirm no focus trap remains after closing a transient surface.

## RTL

- [ ] Switch to Arabic and confirm `lang="ar"` and `dir="rtl"` are applied.
- [ ] Confirm sidebar/drawer placement, icons, spacing, control order, and text alignment follow RTL
      without changing stored user-entered names.
- [ ] Confirm mixed Arabic/Latin Workspace, BusinessUnit-compatible, and Branch names remain readable.
- [ ] Confirm all transient surfaces stay within the viewport and anchor to the logical edge.

## LTR

- [ ] Switch to English and confirm `lang="en"` and `dir="ltr"` are applied.
- [ ] Confirm sidebar/drawer placement, spacing, navigation order, and overlays follow LTR.
- [ ] Confirm switching back from Arabic restores LTR without reload or storage corruption.

## Dark Mode

- [ ] Select dark theme and confirm the current theme storage behavior persists after reload.
- [ ] Confirm text, focus rings, badges, boundaries, overlays, disabled controls, and status messages
      remain distinguishable without relying on color alone.
- [ ] Validate English and Arabic at one compact and one desktop width.

## Light Mode

- [ ] Select light theme and confirm persistence after reload.
- [ ] Confirm text, focus rings, badges, boundaries, overlays, disabled controls, and status messages
      remain distinguishable without relying on color alone.
- [ ] Validate English and Arabic at one compact and one desktop width.

## Screen Reader

- [ ] Confirm every icon-only control has an accessible name matching its purpose.
- [ ] Confirm menu, menuitem, dialog, navigation, main, banner, status, and alert semantics match the
      visible interaction.
- [ ] Confirm Workspace and user-entered organization names are read as displayed.
- [ ] Confirm hidden menus/drawers are not exposed as active content.
- [ ] Confirm no announcement claims search data or notifications that the mock projection does not
      provide.

## Focus

- [ ] Confirm a visible focus indicator on every interactive element in light and dark themes.
- [ ] Confirm opening a menu/dialog/drawer moves or contains focus as appropriate.
- [ ] Confirm closing with Escape, activation, or outside dismissal returns focus to the opener.
- [ ] Confirm route navigation places the next keyboard action in a predictable shell position.
- [ ] Confirm reduced-motion mode does not hide focus transitions or status feedback.

## Skip Links

- [ ] Press Tab from the top of the page and confirm the skip link becomes visible.
- [ ] Activate the skip link and confirm focus moves to the single main content region.
- [ ] Repeat in English/LTR, Arabic/RTL, Chrome, and Edge.

## Sidebar

- [ ] At 1024 and 1440 widths, confirm the existing sidebar is persistent and the current route is
      indicated semantically and visually.
- [ ] Confirm all existing destinations remain unchanged and no unapproved destination appears.
- [ ] Confirm names and navigation remain readable at 200% zoom and with long mixed-direction text.

## Dialogs

- [ ] Open every shell dialog/recovery surface available in the seeded flow.
- [ ] Confirm accessible name, initial focus, contained focus, Escape behavior, dismissal behavior,
      and focus restoration.
- [ ] Confirm background content cannot be operated when a modal dialog is active.

## Notifications

- [ ] Open notifications by keyboard and screen reader.
- [ ] Confirm the trigger exposes its expanded state and the panel has a meaningful name.
- [ ] Confirm projected mock notifications, empty/unavailable state, and links match existing behavior.
- [ ] Close the panel by Escape and confirm focus returns to the notifications trigger.

## Profile Menu

- [ ] Open the profile menu and confirm its accessible name and expanded state.
- [ ] Navigate every existing item by keyboard without activating an unintended item.
- [ ] Confirm Escape/outside dismissal closes it and restores focus.
- [ ] Confirm logout retains the existing route/storage behavior when intentionally exercised.

## Search

- [ ] Open search from its existing shell control and confirm the input receives focus.
- [ ] Confirm only existing Core destinations are offered; no command palette, AI entry, or remote
      result is introduced.
- [ ] Confirm arrow keys, Enter, and Escape work and restore focus correctly.
- [ ] Confirm the unavailable/no-result presentation is named and does not imply a real API.

## Workspace Switching

- [ ] Open the Workspace switcher and confirm current selection and expanded state are announced.
- [ ] Switch between existing compatible Workspaces and confirm persistence after reload.
- [ ] Exercise an invalid/stale saved context and confirm bounded recovery without foreign records.
- [ ] Confirm legacy BusinessUnit-as-Business and Branch compatibility remains unchanged.

## Responsive

- [ ] Validate 375, 768, 1024, and 1440 CSS-pixel widths in Chrome and Edge.
- [ ] At compact widths, confirm the menu opens the drawer, focus is contained, Escape/scrim closes
      it, and focus returns to the menu button.
- [ ] Confirm tablet behavior has no clipped controls, obscured headings, or horizontal overflow.
- [ ] Confirm the 880-pixel breakpoint behaves consistently immediately below and above the boundary.

## Accessibility

- [ ] Confirm primary interactive targets are at least 44 by 44 CSS pixels at 375 and 768 widths.
- [ ] Confirm no information depends on color alone.
- [ ] Confirm critical flows are keyboard-operable and semantically named.
- [ ] Run the available browser accessibility inspection and record zero unresolved critical or
      serious findings, including rule IDs and affected selectors when a finding exists.
- [ ] Confirm Windows high-contrast/forced-colors behavior remains readable where available.

## Performance

- [ ] Use a production build with browser extensions disabled and document power mode/background load.
- [ ] Confirm drawer and menu opening, locale/theme switching, and route navigation provide immediate
      visible feedback without visible jank.
- [ ] Record any consistently delayed interaction with five repeated observations and timestamps.
- [ ] Do not compare Windows manual timings directly to the WSL automated baseline as an identical
      environment; use them as release smoke evidence only.

## Smoke Tests

- [ ] Login and existing authentication redirects.
- [ ] Onboarding redirect behavior.
- [ ] Dashboard and every existing Core shell route.
- [ ] Workspace context persistence and stale-context recovery.
- [ ] Locale and theme persistence after reload.
- [ ] Drawer, notifications, profile, search, loading, unavailable, unauthorized, and recovery states.
- [ ] Commerce launch/setup handoff remains unchanged.

## Release Validation

- [ ] Every checklist item is completed or linked to an accepted blocking defect; no result is
      silently waived or marked N/A.
- [ ] Exact Windows, Chrome, Edge, and NVDA versions and reviewer identity are recorded.
- [ ] Evidence includes screenshots, announcement notes, and defect links without secrets or personal
      data.
- [ ] No critical/serious accessibility defect or route/storage/context regression remains open.
- [ ] Product Owner/release approver records the final decision: ____________________
- [ ] Final result is synchronized into
      `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md` and
      `docs/12-release/FEATURE-050-VALIDATION-REPORT.md`.

Until this checklist is completed and approved, T047 remains **Blocked by Environment — Waiting
for Windows Validation**.
