# Testing

## Playwright E2E

The repository uses Playwright for browser-level Commerce OS regression coverage.

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
pnpm test:e2e:ui
pnpm test:e2e:headed
```

Playwright reuses the already-running Commerce app on `localhost:3002`.

#### Mode B: let Playwright start Commerce

If no dev server is running, run Playwright directly:

```bash
pnpm test:e2e:ui
```

The Playwright config starts the Commerce app automatically with:

```bash
pnpm --filter commerce dev
```

### Current Coverage

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
