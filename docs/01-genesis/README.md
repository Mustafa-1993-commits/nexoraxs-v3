# Legacy Genesis Path — Historical Only

| Field | Value |
|---|---|
| Status | Historical/non-authoritative path marker |
| Finding | UIAUTH-HYGIENE-001 |
| Owner | Documentation Governance |

## Authority Notice

`docs/genesis/` is not an active Genesis authority location. Active readers must use:

1. the canonical `docs/01-genesis/` tree, beginning with [Vision](../01-genesis/01-VISION.md);
2. [Foundation Journey Successor Addendum v1.0](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md); and
3. [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md).

Files historically stored under this path are provenance only. They must not be used to override
the canonical Genesis tree, Accepted ADRs, or the controlling Freeze.

## Current Working-Tree Caution

At the time of UI/UX reconciliation, the historical `docs/genesis/11-CUSTOMER-JOURNEY.md` path is
deleted in the pre-existing working tree, while `docs/01-genesis/11-CUSTOMER-JOURNEY.md` contains
the legacy v1.0 content rather than the v1.2 source identified by the v1.1 source manifest. This
marker does not restore, move, or rewrite either user-owned change. Active authority reconciliation
must restore canonical/provenance integrity through an explicitly authorized Genesis hygiene
change before the UI/UX package can pass final review.

## Historical Preservation Rule

Do not copy legacy wording into active documents without a historical label and a link to current
authority. Do not delete historical evidence merely because it is superseded for active use.
