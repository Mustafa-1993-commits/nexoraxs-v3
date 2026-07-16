# Feature 052 Excluded-Domain Regression Evidence

Date: 2026-07-17

The existing affected Commerce suite was run unchanged after Product repository/facade cutover:

```text
pnpm exec playwright test tests/e2e/commerce-044.spec.ts --project=chromium

1 passed (2.0m)
```

It covers Branch stock isolation, stock adjustment, transfers, POS/order creation, returns,
restocking, immutable invoice behavior, and reports. The pass demonstrates that the retained
`AppProvider` state and Product compatibility projection continue to serve those excluded readers.

No Orders, Inventory, Customers, Invoices, Workspace/organization management, Team,
Subscriptions, or OS lifecycle repository/service migration was made by Feature 052.
