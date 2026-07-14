# Quickstart: Core Shell Validation

This guide is for implementing and validating feature `050-core-shell-stabilization` after the
Draft specification and plan receive the required approval. It does not authorize code work.

## Prerequisites

- Run from the repository root.
- Use the repository-pinned pnpm version.
- Install workspace dependencies and the Playwright Chromium browser as required by the local
  environment.
- Do not change or clear unrelated user data outside the deterministic test browser profile.
- Preserve the existing Commerce Playwright configuration and test.

## Development server

```bash
pnpm --filter core-platform dev
```

The current Core app listens on `http://localhost:3001`. Use only deterministic mock users and
fixtures; do not use real credentials or customer data.

## Required static gates

```bash
pnpm --filter core-platform lint
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter core-platform build
git diff --check
```

## Core characterization and acceptance

The implementation plan adds a dedicated `playwright.core.config.ts` so Core tests do not inherit
the Commerce-only port, headed mode, or 2000 ms delay.

```bash
pnpm exec playwright test --config=playwright.core.config.ts tests/e2e/core-050-shell.spec.ts
pnpm exec playwright test --config=playwright.core.config.ts tests/e2e/core-050-performance.spec.ts
```

Retain the existing Commerce boundary regression:

```bash
pnpm exec playwright test --config=playwright.config.ts tests/e2e/commerce-044.spec.ts
```

If the implementation splits the Core test file by concern, the config remains the stable entry
point and the feature task list must record the exact replacement commands.

## Phase A baseline procedure

No structural shell change may begin until these scenarios are characterized against the current
implementation:

1. All six dashboard URLs, refresh, history back/forward, and current sidebar destinations.
2. Unauthenticated redirect to `/login`.
3. Authenticated/incomplete redirect to `/onboarding`.
4. Completed mock onboarding entry to the current dashboard destination.
5. Exact persistence of current Workspace, BusinessUnit, Branch, locale, theme, and onboarding
   values.
6. Theme and locale behavior, including `<html lang>`, `dir`, and `data-theme`.
7. Mobile drawer open, link close, and scrim close as currently implemented.
8. Profile destinations and sign out.
9. Current notification items, order, empty state, and indicator behavior.
10. Current placeholder search unavailable behavior.
11. Stale/malformed/cross-scope Workspace, BusinessUnit, and Branch combinations.
12. Legacy `BusinessUnit` ID/type/storage presented as Business where it already appears.

Store the environment metadata and raw timing samples in
`specs/050-core-shell-stabilization/evidence/performance-baseline.json`. Record at minimum the Git
revision, OS/CPU, Node/pnpm, Playwright/Chromium versions, build mode, viewport, locale, theme,
fixture version, warm-up count, and every raw sample.

## Performance reference method

Measure the current and changed implementation under the same local conditions:

- production Core build/start when measuring route readiness;
- pinned Chromium project, one worker, headless, no `slowMo`;
- deterministic browser storage fixture;
- fixed viewport/theme/locale per comparison;
- one warm-up and at least 10 measured samples per scenario;
- browser `performance.now()` for interaction boundaries where possible;
- median for the route regression comparison plus the percentage at or below 100 ms for local
  interaction feedback.

Measure:

- initial shell hydration/readiness;
- drawer open feedback and drawer close feedback (animation completion separately);
- notification/profile/context/search menu open feedback;
- locale switch feedback;
- theme switch feedback;
- route navigation readiness.

Gates:

- No changed shell route may be more than 10% slower than its own characterized median baseline.
- At least 95% of measurable local mock drawer, menu, locale, theme, and route-selection
  interactions must show visible/semantic feedback within 100 ms.

These are local regression references, not production SLOs. They exclude backend/network latency,
device diversity, and production scheduling. If variance is high, retain raw samples, repeat under
the same profile, and do not weaken the gate without approved evidence.

## Required product-quality matrix

Run all critical shell journeys at every base combination:

| Locale/direction | Theme | Widths |
|---|---|---|
| English/LTR | Light | 375, 768, 1024, 1440 |
| English/LTR | Dark | 375, 768, 1024, 1440 |
| Arabic/RTL | Light | 375, 768, 1024, 1440 |
| Arabic/RTL | Dark | 375, 768, 1024, 1440 |

At each combination validate:

- no horizontal page overflow or overlapping/unreachable topbar controls;
- exact route destinations and current-page semantics;
- Workspace-only global context plus safe recovery;
- drawer/persistent sidebar behavior appropriate to the current 880 px breakpoint;
- search query/result/no-match interaction;
- notification and profile popup interaction;
- locale/theme controls and stored values;
- visible focus and non-color state cues;
- loading, empty, error, unauthorized/unavailable, and recovery presentation.

Add supplementary 879 px and 881 px checks when diagnosing the existing breakpoint; these do not
replace the required widths.

## Keyboard-only pass

Complete the critical journey without a pointer:

1. Use the skip link to reach the main content.
2. Open and close the mobile drawer; verify containment and return focus.
3. Navigate each sidebar destination and confirm `aria-current`.
4. Operate search with text input, arrow keys, Enter, and Escape.
5. Open/close context, notification, and profile surfaces; verify only the topmost surface closes.
6. Change locale and theme without losing focus.
7. Trigger invalid-context recovery and verify no silent context selection.

Focus must be visible, unobscured, logical in both directions, and absent from closed/inert content.

## Screen-reader and semantic pass

Automated Axe/role/name/state assertions supplement but do not replace manual assistive-technology
validation. Perform at least English and Arabic passes on one drawer viewport (375 or 768) and one
persistent-sidebar viewport (1024 or 1440), covering light and dark themes across the recorded
passes.

Verify:

- one main landmark and labelled navigation/header regions;
- named buttons/inputs and accurate expanded/current/busy states;
- understandable loading, empty, error, unavailable, and recovery messages;
- notification indicator/item meaning is not conveyed by color alone;
- live changes are announced once, not duplicated;
- mixed Arabic/Latin names remain understandable and are not auto-translated.

## Reduced-motion pass

Emulate `prefers-reduced-motion: reduce` and repeat loading, drawer, popup, locale, theme, and route
interactions across the critical matrix. Immediate visual/semantic state feedback must remain even
when non-essential transition or spinner motion is removed.

## Compatibility assertions

Tests must snapshot and compare all protected keys before/after critical interactions. At minimum:

```text
nexoraxs.session.currentUserId
nexoraxs.session.currentWorkspaceId
nexoraxs.session.currentOSSubscriptionId
nexoraxs.session.currentBusinessUnitId
nexoraxs.session.currentBranchId
nexoraxs.session.currentOSId
nexoraxs.session.onboardingState
nexoraxs.session.entryContext
nexoraxs.session.locale
nexoraxs.session.demo
nexoraxs.ui.theme
```

All existing `nexoraxs.db.*`, `nx_last_order_id`, `core_*`, and `core_locale` keys must remain
untouched as well. The implementation must preserve seed IDs `user_001`, `ws_001`, `sub_001`,
`bu_001`, `br_001`, `ose_001`, `tm_001`, `cs_001`, `p1`, and `p2`.

## Boundary scan

Before handoff, verify no cross-app import, backend/API/SDK/auth work, Commerce write, new canonical
Business, or new shared shell primitive was introduced. Review changed imports and run repository
searches targeted at the changed files. Any detected violation blocks the feature; it is not a
cleanup exception.

## Evidence completion

Before UI Freeze/release, attach:

- characterization and acceptance test output;
- raw and summarized performance results;
- completed Design Quality Checklist;
- accessibility and screen-reader notes;
- Arabic/English, RTL/LTR, theme, motion, and viewport matrix results;
- protected storage/ID/route comparison;
- boundary scan result;
- rollback rehearsal/result for every changed phase;
- Design Memory record and named approvers.
