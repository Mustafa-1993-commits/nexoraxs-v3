# Quickstart: Feature 051 Documentation-Only Reconciliation Audit

## Purpose

This guide contains the exact non-destructive commands and manual evidence procedure planned for
the later Feature 051 audit. Creating this quickstart does not execute the audit or create the
final reconciliation report.

Run commands from the repository root. Record each exact command, timestamp, exit code, concise
result, evidence ID, and limitation in the master report's test/evidence register. A failure is
documented, not fixed.

## Hard Guardrails

- Do not edit `apps/`, `packages/`, `tests/`, backend code, routes, storage, schemas, architecture,
  Design Intelligence, or historical audit documents.
- Do not run `git stash`, `git clean`, destructive checkout/reset, storage wipes against a regular
  browser profile, or any commit command.
- Do not install packages or add a test/configuration to make a command pass.
- Preserve and exclude pre-existing Feature 050 closure files.
- Use only synthetic seeded data in disposable browser contexts.
- Login and Register are inspected as Protected and may only be classified `Protected` or
  `Protected — Critical Fix Required`.
- A FAIL or BLOCKED result stays FAIL or BLOCKED.

## Phase 0 — Capture and Lock the Baseline

Run each command separately and copy concise results into the baseline and evidence registers:

```bash
git branch --show-current
git rev-parse HEAD
git show -s --format='%H%n%cI%n%s' HEAD
date --iso-8601=seconds
node --version
pnpm --version
pnpm exec playwright --version
git --version
rg --version
pnpm list -r --depth -1
git status --short --branch
git status --porcelain=v1 --untracked-files=all
git diff --name-only
git ls-files --others --exclude-standard
rg --files apps packages -g 'package.json' | sort
```

Read the current scripts and dependencies without a new parser dependency:

```bash
for manifest in package.json apps/landing/package.json apps/core-platform/package.json apps/commerce/package.json packages/ui/package.json packages/shared/package.json packages/types/package.json; do
  sed -n '1,240p' "$manifest"
done
```

Record the complete initial status as an allow-list. At planning time the unrelated dirty files
were under `docs/12-release/` and `specs/050-core-shell-stabilization/`; execution must recapture
the actual state rather than assuming the list is unchanged. Do not copy those files or their
unverified conclusions into Feature 051.

Lock one baseline ID after recording the application/package, route, and script manifests. If
source changes later, mark the baseline stale and perform an explicit delta review.

## Phase 1 — Static Repository Inventory

### Source and current specification manifest

```bash
rg --files apps/landing/src apps/core-platform apps/commerce packages/ui/src packages/shared/src packages/types/src tests | sort
rg --files specs | sort
```

### Route and layout entry files

```bash
rg --files apps/landing/src/app apps/core-platform/app apps/commerce/app | rg '/(page|route|layout|loading|error|not-found)\.(ts|tsx|js|jsx)$' | sort
```

The route-file list proves presence only. Convert route groups and dynamic segments into the route
inventory, then validate runtime behavior separately.

### Navigation, redirects, links, and visible controls

```bash
rg -n --glob '*.{ts,tsx,js,jsx}' "href=|href:|router\.(push|replace)\(|redirect\(|location\.(href|assign|replace)" apps/landing/src apps/core-platform apps/commerce
rg -n --glob '*.{tsx,jsx}' '<(button|a)[ >]|onClick=|disabled=|aria-disabled=' apps/landing/src apps/core-platform apps/commerce
rg -n --glob '*.{ts,tsx,js,jsx}' 'TODO|FIXME|coming soon|not implemented|visual-only|disabled' apps packages
rg -n --glob '*.{ts,tsx,js,jsx}' "href=\"#\"|href=\"\"|href='#'|href=''" apps/landing/src apps/core-platform apps/commerce
```

For every visible action, record exactly one result:

```text
functional
visual-only
intentionally-disabled
redirected
broken
blocked-from-validation
```

### Imports and dependency direction

```bash
rg -n --glob '*.{ts,tsx,js,jsx,mjs,cjs}' "^(import|export).*from[[:space:]]+['\"]" apps packages
rg -n --glob '*.{ts,tsx,js,jsx,mjs,cjs}' "(import|export).*from[[:space:]]+['\"][^'\"]*(apps/(landing|core-platform|commerce)|core-platform/|commerce/|landing/)" apps
rg -n --glob 'package.json' '"dependencies"|"devDependencies"|"peerDependencies"|"workspace:\*"' package.json apps packages
```

The direct application-import scan may exit 1 when no matches exist. Record the zero-match result
as PASS evidence; do not misreport it as a command failure. Review test imports into application
internals separately from production app-to-app imports.

### Hardcoded URLs and handoff state

```bash
rg -n --glob '*.{ts,tsx,js,jsx,mjs,cjs}' "https?://|localhost:[0-9]+|127\.0\.0\.1:[0-9]+" apps packages tests playwright.config.ts playwright.core.config.ts
rg -n --glob '*.{ts,tsx,js,jsx}' 'nx_handoff|currentWorkspaceId|currentBusinessUnitId|currentBranchId|currentOSSubscriptionId' apps packages tests
```

### Storage, seeds, readers, writers, and providers

```bash
sed -n '1,240p' packages/shared/src/mock-db/schema.ts
sed -n '1,320p' packages/shared/src/mock-db/seed.ts
rg -n --glob '*.{ts,tsx,js,jsx}' 'localStorage|sessionStorage|STORAGE_KEYS|nexoraxs\.(db|session|ui)\.|nx_' apps packages tests
rg -n --glob '*.{ts,tsx,js,jsx}' 'writeCollection|writeSession|setItem\(|removeItem\(|readCollection|readSession' apps packages tests
rg -n --glob '*.{ts,tsx}' 'createContext|useContext|Provider|AppProvider|ContextSwitcher' apps packages
```

### Shell duplication and compatibility-sensitive terms

```bash
rg -n --glob '*.{ts,tsx}' 'CoreShell|CommerceShell|function Shell|ContextSwitcher|LocaleToggle|ThemeToggle|NotificationsDropdown|UserMenuDropdown|BranchPill' apps/core-platform apps/commerce
rg -n --glob '*.{ts,tsx}' 'BusinessUnit|OSEnablement|CommerceSetup|OSSubscription|Repository|businessUnitId|workspaceId|branchId' apps packages tests
```

These scans identify review candidates; a text match alone is not a finding. Inspect ownership,
read/write behavior, compatibility purpose, and current use before classification.

## Phase 2 — Extract Authoritative Expectations

List the authoritative corpus without including archives:

```bash
git ls-files docs/99-architecture-freeze docs/00-governance docs/01-genesis docs/02-core-platform docs/03-business-brain docs/04-commerce-os docs/05-marketplace docs/06-ai-expert-network docs/07-global-platform docs/10-design-intelligence docs/11-execution | sort
```

Use the following targeted index scan, then read and cite every selected source in context:

```bash
rg -n --glob '*.md' 'Workspace|Business Unit|Product Hub|OS Subscription|OSEnablement|CommerceSetup|canonical owner|Operating System|app-to-app|localization|accessibility|mock|Laravel|Repository' docs/99-architecture-freeze docs/00-governance docs/01-genesis docs/02-core-platform docs/03-business-brain docs/04-commerce-os docs/05-marketplace docs/06-ai-expert-network docs/07-global-platform .specify/memory/constitution.md AGENTS.md docs/10-design-intelligence docs/11-execution
```

Build the expectation register from exact headings/ADR Decisions. Do not create expectations from
archives, unfinished proposals, historical specs, or earlier audit conclusions. If an archive is
mentioned for provenance, label it non-authoritative.

## Static Validation Gates

Run builds before standalone strict TypeScript so current Next-generated route metadata exists.
Record every command independently.

### Lint

```bash
pnpm --filter landing lint
pnpm --filter core-platform lint
pnpm --filter commerce lint
pnpm lint
```

### Builds

```bash
pnpm --filter landing build
pnpm --filter core-platform build
pnpm --filter commerce build
pnpm build
```

### Strict TypeScript

The repository has no root typecheck script, so run all six current TypeScript workspaces:

```bash
pnpm --filter landing exec tsc --noEmit
pnpm --filter core-platform exec tsc --noEmit
pnpm --filter commerce exec tsc --noEmit
pnpm --filter @nexoraxs/ui exec tsc --noEmit
pnpm --filter @nexoraxs/shared exec tsc --noEmit
pnpm --filter @nexoraxs/types exec tsc --noEmit
```

Build, Turbo, TypeScript, and Playwright may update ignored `.next`, `.turbo`, `test-results`, and
`playwright-report` data. Any tracked source-file change is unexpected and must be documented; it
does not authorize a fix.

## Existing Automated Suites

Check the required ports before test execution:

```bash
ss -ltnp | rg ':(3000|3001|3002)\b'
```

No matches means the ports are free. A match must be identified; do not terminate another process
without authorization.

The Core production build must have passed before these commands:

```bash
pnpm exec playwright test --config=playwright.core.config.ts tests/e2e/core-050-shell.spec.ts
pnpm exec playwright test --config=playwright.core.config.ts tests/e2e/core-050-performance.spec.ts
```

Run the existing Commerce suite with its current configuration:

```bash
pnpm exec playwright test --config=playwright.config.ts tests/e2e/commerce-044.spec.ts
```

The current Commerce configuration uses a headed browser and requires a working graphical
display. If unavailable, record BLOCKED; do not add or modify a Playwright configuration. There is
no current Landing automated suite, so Landing requires current source and manual runtime evidence.

## Phase 3 — Non-Destructive Runtime Journey Validation

### Start current applications

Use three separate terminals:

```bash
pnpm --filter landing dev
```

```bash
pnpm --filter core-platform dev
```

```bash
pnpm --filter commerce dev
```

Expected local origins are:

- Landing: `http://localhost:3000`
- Core Platform: `http://localhost:3001`
- Commerce OS: `http://localhost:3002`

### HTTP response and redirect smoke

Run in a fourth terminal:

```bash
for url in \
  http://localhost:3000/ \
  http://localhost:3001/ \
  http://localhost:3001/login \
  http://localhost:3001/register \
  http://localhost:3001/forgot-password \
  http://localhost:3001/reset-password \
  http://localhost:3001/verify \
  http://localhost:3001/verify-email \
  http://localhost:3001/welcome \
  http://localhost:3001/onboarding \
  http://localhost:3001/dashboard \
  http://localhost:3001/dashboard/apps \
  http://localhost:3001/dashboard/billing \
  http://localhost:3001/dashboard/team \
  http://localhost:3001/dashboard/integrations \
  http://localhost:3001/dashboard/settings \
  http://localhost:3002/ \
  http://localhost:3002/setup \
  http://localhost:3002/dashboard \
  http://localhost:3002/products \
  http://localhost:3002/products/new \
  http://localhost:3002/inventory \
  http://localhost:3002/inventory/transfers \
  http://localhost:3002/customers \
  http://localhost:3002/pos \
  http://localhost:3002/orders \
  http://localhost:3002/invoices \
  http://localhost:3002/reports \
  http://localhost:3002/settings \
  http://localhost:3002/settings/documents
do
  curl -sS -o /dev/null -w '%{http_code}\t%{redirect_url}\t%{url_effective}\n' "$url"
done
```

HTTP results do not prove functional depth. Dynamic customer, order, invoice, and return routes
must be opened through actual generated links. Do not fabricate IDs merely to obtain a response.

### Open a disposable browser profile

Run these commands in one shell so the variable remains available:

```bash
AUDIT_PROFILE="$(mktemp -d /tmp/nexoraxs-051-runtime.XXXXXX)"
printf '%s\n' "$AUDIT_PROFILE"
pnpm exec playwright open --user-data-dir="$AUDIT_PROFILE" http://localhost:3000/
```

Use synthetic data only. Do not clear or reuse a regular browser profile. In the isolated browser,
record relevant keys before and after a journey without copying unnecessary personal data:

```js
({
  localKeys: Object.keys(localStorage).sort(),
  sessionKeys: Object.keys(sessionStorage).sort(),
});
```

For a separate seeded Commerce pass, set the existing demo flag only in a fresh isolated tab:

```js
sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
location.reload();
```

### Required journey sequence

Record each action using the exact action vocabulary and capture source, runtime, storage, and test
evidence separately.

1. Landing route, navigation, calls to action, and Landing-to-Core handoff.
2. Core `/login` inspection as Protected.
3. Core `/register` inspection as Protected.
4. Current authentication aliases/recovery routes.
5. Core onboarding and Workspace creation/selection.
6. Product Hub route, state, launch, and recovery.
7. Commerce setup/onboarding handoff and current context.
8. Commerce dashboard and current sidebar destinations.
9. Products, product creation/edit behavior, and persistence.
10. Inventory, stock adjustment, Branch context, and transfers.
11. Customers and customer-linked operational behavior where present.
12. Sales/POS, order, invoice/payment representation, and success flow.
13. Reports and dashboard reaction to operational changes.
14. Settings, documents, taxes, discounts, payments, and any embedded or visual-only controls.
15. Returns/exchanges through actual generated order/invoice links where present.
16. Locale/direction, theme, responsive, keyboard, focus, loading/empty/error/success/recovery,
    and console-warning observations across applicable critical journeys.

Protected inspection does not authorize design comparison or preference recommendations. A
possible critical issue must meet the exact critical category and still records the Product Owner
approval gate.

### Optional concise screenshot evidence

Use screenshots only where they materially clarify an observation. Keep them outside the
repository unless a later reviewer explicitly requires a linked supporting artifact.

```bash
mkdir -p /tmp/nexoraxs-051-audit
pnpm exec playwright screenshot --full-page --viewport-size="1440,900" http://localhost:3000/ /tmp/nexoraxs-051-audit/landing.png
pnpm exec playwright screenshot --full-page --viewport-size="1440,900" http://localhost:3001/login /tmp/nexoraxs-051-audit/core-login-protected.png
pnpm exec playwright screenshot --full-page --viewport-size="1440,900" http://localhost:3001/register /tmp/nexoraxs-051-audit/core-register-protected.png
```

Authenticated observations remain in the interactive disposable profile because a simple
storage-state file does not preserve `sessionStorage`.

## Phase 4 — Functional-Depth Tracing

For every module create atomic checks for route, rendered UI, interaction, persistence, applicable
CRUD, related flow, applicable states, operational/decorative data, dependent-view reactivity,
visible actions, tests, and ownership.

Trace this Commerce chain with before/after evidence:

```text
Product creation
  -> browser persistence
  -> inventory presence/quantity
  -> sale/POS use
  -> stock effect
  -> dashboard/report effect
```

Plan equivalent evidence chains where current behavior and authoritative expectations apply:

- Core onboarding -> Workspace context -> Product Hub -> Commerce handoff/setup -> dashboard;
- customer creation/update -> sale/order association -> customer detail/history;
- Branch creation/selection -> inventory isolation -> transfer -> both Branch stock positions ->
  report/movement effect;
- sale -> order -> invoice/payment representation -> return/exchange -> stock/report effect; and
- settings/tax/document configuration -> applicable POS/invoice output.

If a link in a chain is absent, visual-only, broken, or blocked, record that exact result. Do not
implement the link.

## Phase 5–8 — Reconcile, Classify, Score, and Draft the Report

Follow `contracts/reconciliation-report-contract.md` exactly:

1. Link every current finding to implementation evidence and applicable authority.
2. Apply the bounded conflict protocol and stop only the affected boundary.
3. Assign exactly one allowed classification to every completed surface.
4. Calculate alignment and functional-depth from disclosed atomic checks.
5. Display raw fraction, whole-number estimate or N/E, exclusions, unknowns, blocked checks,
   coverage, confidence, and limitation.
6. Create the single report at
   `docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md`.
7. Rank only evidence-backed future features; identify reusable code/behavior and state **no
   rewrite** in every candidate.
8. Keep every failed requirement BLOCKED in the FR/SC trace and final conclusion.

Do not create the report during `/speckit.plan`; it is a later audit-execution deliverable.

## Final Isolation, Link, and Whitespace Checks

Compare final status with the Phase 0 baseline:

```bash
git status --porcelain=v1 --untracked-files=all
git status --porcelain=v1 -- apps/landing apps/core-platform apps/commerce packages tests backend
git diff --name-only -- apps/landing apps/core-platform apps/commerce packages tests backend
git diff --check
```

The product-scoped status/diff must be empty unless an exact pre-existing Phase 0 entry was already
recorded. Generated ignored build/test output is not a product-source change.

When the new master report is untracked, include it in whitespace validation:

```bash
git diff --no-index --check /dev/null docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md || test $? -eq 1
```

Review route/link results at all three evidence layers:

1. source destinations from Phase 1;
2. HTTP response/redirect results;
3. actual browser activation and final destination.

Then validate report-specific boundaries:

```bash
rg -n 'docs/archives' docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md
rg -n 'rewrite|redesign|visual modernization|style change|route change|component replacement' docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md
rg -n 'Protected — Critical Fix Required|Protected|Keep|Improve|Complete|Refactor|Defer|Blocked by Architecture' docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md
```

These are review scans, not automatic passes. Every archive reference must be labelled
non-authoritative; every protected/change phrase must obey its gate; every completed surface must
have exactly one allowed classification.

## Expected Audit-Time Blockers

- No graphical display for the headed Commerce Playwright suite.
- Core production build failure or an occupied Core port.
- Missing dependency/browser or unavailable application server.
- No current Landing automated suite.
- Existing suites do not cover every requested module or end-to-end relationship.
- Changed source after baseline lock.
- Missing classification-determining runtime evidence.
- A genuine authority contradiction or unresolved Deferred Decision.

Each blocker is recorded as BLOCKED. None authorizes a source, route, storage, configuration,
architecture, or threshold change.
