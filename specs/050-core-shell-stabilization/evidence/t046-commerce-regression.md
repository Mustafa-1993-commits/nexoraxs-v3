# T046 Commerce Regression Investigation

**Date**: 2026-07-14  
**Environment**: WSL Ubuntu 24.04; headless Chromium using the existing Commerce application and seeded browser-storage flow  
**Result**: Outdated regression expectation; no Feature 050 Commerce implementation regression

## Observed mismatch

`tests/e2e/commerce-044.spec.ts` created a branch with city `Cairo` and expected the branch card's
exact text to be `Cairo`. The current Commerce UI rendered `Cairo, Egypt`.

## Source of truth and fixture origin

- The test clears browser storage and enables the existing demo seed through
  `nexoraxs.session.demo`; it does not install a Feature 050 fixture.
- The seeded Workspace country is `Egypt` in `packages/shared/src/mock-db/seed.ts`.
- The test supplies only the branch city (`Cairo`). The existing `addBranch` action in
  `apps/commerce/lib/store/AppProvider.tsx` preserves the city and inherits the current Workspace
  country.
- `getBranchOperationalAddress` in `packages/shared/src/mock-db/selectors.ts` resolves the legacy
  compatible Branch address fields and produces the single-line value `Cairo, Egypt`.
- The Commerce settings branch card intentionally renders that resolved operational address.

This behavior is governed by Feature 048's Address Contract: Branch `address`, `city`, and
`country` remain compatible Branch operational-location fields, while the Workspace country
remains the current MVP default. Feature 048 commit `fb642b3de01736c832a273f59e779c7bcf02a140`
changed the branch-card presentation from `br.city` to the resolved Branch operational address.

## Regression determination

- `git diff -- apps/commerce tests/e2e/commerce-044.spec.ts` showed no Feature 050 Commerce
  application change before this correction.
- Git history shows that the exact `Cairo` assertion predates the Feature 048 resolved-address
  presentation.
- The implementation's `Cairo, Egypt` output is therefore intended existing behavior, and the
  exact test expectation was stale.
- No route, storage key, seeded identifier, fixture, Branch model, or Commerce runtime behavior was
  changed for this recovery.

## Smallest correction

Only the stale exact assertion was synchronized from `Cairo` to `Cairo, Egypt` in
`tests/e2e/commerce-044.spec.ts`. The application and fixture were left unchanged. This is not a
test relaxation: the assertion remains exact and now verifies both the supplied city and inherited
Workspace-country behavior required by the existing address contract.

## Validation

The repository's Commerce configuration is headed and deliberately slow for manual QA. A temporary
headless, one-worker, zero-slow-motion configuration preserved the same application, base URL,
fixture, browser project, and test; it was deleted immediately after execution.

```text
pnpm exec playwright test --config=playwright.commerce-050.tmp.config.ts tests/e2e/commerce-044.spec.ts
1 passed (19.8s); test body 13.3s; retries 0
```

The corrected exact assertion passed in the full Commerce 044 inventory, transfer, return,
invoice, and report journey. The first recovery attempt used `127.0.0.1` while the development
server expected `localhost` and timed out at the loading screen before reaching the corrected
assertion; it was an invalid harness-origin run, not an implementation result. Repeating with the
existing `localhost:3002` origin passed.
