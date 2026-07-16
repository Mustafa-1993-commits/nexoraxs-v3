# US6 Determinism Evidence

Date: 2026-07-17

The failing-first run produced six expected failures: latency settled immediately, configured
rules did not reject, updates committed, and no diagnostic outcomes were emitted. After the mock
behavior wrapper was integrated around every repository operation, the focused checkpoint passed:

```text
Test Files  4 passed (4)
Tests       21 passed (21)
```

This includes the two deterministic suites plus both memory/browser repository contracts.

`scripts/validate-commerce-052-determinism.sh` then ran the two deterministic suites in 20 fresh
Vitest processes:

```text
Runs        20 / 20 passed
Per run     2 files, 7 tests
Retries     0
Failures    0
Flakes      0
```

The tests prove:

- latency is asynchronous, exact, non-negative, and controlled by fake timers;
- fixed clocks, fixed IDs, stored order, and invocation counters repeat exactly;
- ordered operation/invocation/Product-ID/normalized-SKU rules select the first match;
- a pre-commit configured failure does not consume an ID or partially change storage;
- deterministic `scope_mismatch`, storage, and generic configured outcomes can be selected without
  randomness; and
- diagnostics include operation, configured duration, outcome, a length-only scope correlation,
  and optional Product ID, but no Workspace/legacy-BusinessUnit/Branch value, SKU, name, barcode,
  notes, price, stock, full payload, or foreign record.

These events are test/local-development diagnostics only. They are not canonical Audit evidence,
production telemetry, authorization proof, or a platform error contract.
