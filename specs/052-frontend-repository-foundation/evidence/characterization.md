# Feature 052 Products Characterization Evidence

**Captured**: 2026-07-17  
**Boundary**: Existing Commerce Products implementation before repository/package structural work  
**Command**: `pnpm exec playwright test tests/e2e/commerce-052-products-characterization.spec.ts --project=chromium`

## Result

```text
1 passed (35.9s)
```

## Frozen Behavior

- `/products` retains the `Products` heading, existing table columns, seeded Product names, search,
  category filters, totals, empty behavior, edit links, and `/products/new` navigation.
- The initial stored IDs are `p1` and `p2`, in that order.
- The persistence key is `nexoraxs.db.commerceProducts`.
- `/products/new` creates a Product using the existing `p_...` ID convention and returns to
  `/products` with the visible completion result.
- `/products/new?edit=<id>` edits the same record ID and returns to `/products`.
- A JSON-safe opaque marker inserted into the combined legacy record survives the existing edit
  round trip.
- Created and edited values remain visible after full browser reload.
- Stored Product records contain the currently available `workspaceId` and `businessUnitId` fields;
  this observation is compatibility evidence only and makes no canonical scope claim.

## Regression Test

The executable characterization is preserved in
`tests/e2e/commerce-052-products-characterization.spec.ts` and must continue to pass after cutover.
