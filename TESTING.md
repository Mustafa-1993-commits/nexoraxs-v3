# Testing

## Playwright E2E

The repository uses Playwright for browser-level Core Platform and Commerce OS regression coverage.

### Install

```bash
pnpm install
pnpm exec playwright install chromium
```

### Run

```bash
pnpm test:e2e
pnpm test:e2e:headed
pnpm test:e2e:slow
PWDEBUG=1 pnpm test:e2e:debug
pnpm test:e2e:ui
```

The Playwright base URL is `http://localhost:3002`.
The E2E suite also uses absolute app URLs for:

- Landing: `http://localhost:3000`
- Core Platform: `http://localhost:3001`
- Commerce OS: `http://localhost:3002`

Core Platform and Commerce OS are separate local origins in this MVP. They do not share `localStorage`, and tests validate handoff behavior without asserting live cross-origin sync.

### Manual QA modes

Use slow mode to watch the Commerce E2E flow run visibly:

```bash
pnpm test:e2e:slow
```

The Playwright config sets `headless=false`, which shows the browser, and `slowMo=2000`, which adds 2000ms between actions.

Use debug mode with the Playwright Inspector:

```bash
PWDEBUG=1 pnpm test:e2e:debug
```

`PWDEBUG=1` enables the Playwright Inspector. The Inspector allows step-by-step execution for manual QA review.

#### Mode A: reuse a manually started dev server

In one terminal:

```bash
pnpm dev
```

In another terminal:

```bash
pnpm test:e2e
pnpm test:e2e:ui
pnpm test:e2e:headed
pnpm test:e2e:slow
PWDEBUG=1 pnpm test:e2e:debug
```

Playwright reuses the already-running Commerce app on `localhost:3002`.

#### Mode B: let Playwright start Commerce

If no dev server is running, run Playwright directly:

```bash
pnpm test:e2e:ui
```

The Playwright config starts all frontend apps automatically with:

```bash
pnpm dev
```

### Single Spec

Run one spec in headed mode:

```bash
pnpm exec playwright test tests/e2e/core-3001-flow.spec.ts --headed
```

### Current Coverage

`tests/e2e/smoke.spec.ts` validates all three local app servers:

- Landing on `localhost:3000`
- Core Platform on `localhost:3001`
- Commerce OS on `localhost:3002`
- basic shell/render health without fatal crash pages

`tests/e2e/core-3001-flow.spec.ts` validates the Core MVP flow:

- registration and email verification
- welcome screen
- workspace onboarding
- Core dashboard
- Product Hub OS cards and Commerce handoff
- Billing, Team & Access, invite modal, and Settings
- hidden Business Unit terminology stays hidden

`tests/e2e/commerce-3002-flow.spec.ts` validates the Commerce MVP flow:

- Commerce setup wizard
- dashboard render and refresh stability
- product creation
- customer creation
- POS checkout with selected customer
- receipt, invoice document, orders, customers, and reports

`tests/e2e/cross-app-handoff.spec.ts` validates Core-to-Commerce navigation only:

- Core Product Hub opens Commerce on `localhost:3002`
- Commerce receives handoff context or lands on setup/dashboard
- no assertion is made that Core reflects Commerce setup completion after returning

`tests/e2e/commerce-negative-cases.spec.ts` validates important edge cases:

- same-branch transfer is unavailable
- insufficient transfer stock is rejected
- POS insufficient stock is rejected
- double return after full return is unavailable
- branch-scoped orders and reports stay isolated

`tests/e2e/commerce-044.spec.ts` validates the Spec 044 Commerce flow:

- demo mock data reset
- second branch creation
- branch-specific inventory updates
- POS sale stock deduction
- branch-to-branch stock transfer
- partial return with restock
- printable return receipt content
- original invoice immutability after returns
- branch-aware reports for Gross Sales, Returns/Refunds, and Net Sales

The test uses `data-testid` selectors for stable targeting and seeds the existing demo state through the app's demo flag. It does not add backend persistence or change the mock-db architecture.
