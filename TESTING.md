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
pnpm test:e2e:ui
```

The Playwright config starts the Commerce app automatically with:

```bash
pnpm --filter commerce dev
```

The base URL is `http://localhost:3002`.

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
