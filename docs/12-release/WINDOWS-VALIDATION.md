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
