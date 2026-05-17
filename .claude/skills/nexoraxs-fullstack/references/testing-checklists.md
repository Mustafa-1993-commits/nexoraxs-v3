# Testing Checklists

## Backend

Run relevant backend tests.

Common commands may include:
```bash
php artisan test
```

Or Docker equivalent depending on repo setup.

Test:
- auth required
- workspace access
- validation
- persistence
- isolation between workspaces
- expected JSON responses

## Frontend

Run relevant app commands.

Examples:
```bash
pnpm test
pnpm lint
pnpm build
```

For monorepos, run the command in the affected app if appropriate:
```bash
pnpm --filter landing build
pnpm --filter core-platform build
pnpm --filter shops-app build
```

## Before Final Report

Confirm:
- tests passed or clearly report failures
- lint passed
- build passed
- changed files listed
- no unintended scope added
- nexoraxs-old untouched
- architecture boundaries preserved

## Failure Rule

If a command fails:
1. Read the exact error.
2. Identify the smallest direct fix.
3. Do not refactor broadly.
4. Rerun only the affected command first.
5. Then rerun the full relevant check if needed.
