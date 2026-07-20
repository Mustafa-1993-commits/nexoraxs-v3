# UI/UX Gap Register

| Field | Value |
|---|---|
| Version | 1.1 reconciliation evidence snapshot |
| Status | Evidence and intake register only; no implementation authorization |
| Owner | Product Experience with applicable Core or OS owner |

## 1. Purpose

Record verified differences between current evidence and reconciled target authority. A gap can
require documentation, design, feature intake, Governance, or later implementation. It is not an
approved task merely because it appears here.

## 2. Classification

- **Blocking level:** Critical, High, Medium, Low.
- **Required artifact:** Documentation reconciliation, design work, feature-intake candidate,
  implementation candidate, deferred Governance, or obsolete evidence.
- **Gate columns:** `Yes`, `No`, or `Conditional`; “implementation” includes frontend/backend work.

## 3. Gap Register

| ID | Current evidence | Target authority and architecture source | Impact / level | Required artifact | Future dependency | Blocks UI approval | Blocks feature spec | Blocks implementation |
|---|---|---|---|---|---|---|---|---|
| UXG-001 Discovery entry absent | Landing only; no Discovery surface | Value before registration; Freeze 5.1–5.3, ADR-042/043 | Core value journey absent / High | Design work + feature-intake candidate | Discovery privacy/retention inputs | No if authority is precise | No | Yes |
| UXG-002 Discovery conflated with interview in older UX docs | Old journey/form language | Method-independent capability; Freeze 5.2 | Ownership/experience distortion / Critical | Documentation reconciliation | None | Yes until corrected | Yes | Yes |
| UXG-003 Candidate reflection absent | No verified surface | Temporary, confidence/provenance-aware candidate; Freeze 5.3–5.4 | Review/value unavailable / High | Design work + feature intake | Evidence/materiality policy | No | No | Yes |
| UXG-004 Direct-entry convergence absent | Register/Login exist; generic onboarding redirect | One authenticated candidate/review/publication path; Freeze 5.5, ADR-043 | Direct users could bypass controls / Critical | Design work + feature intake | Identity and organization specs | No if documented | Yes | Yes |
| UXG-005 Canonical Business resolution absent | Legacy BusinessUnit-as-Business compatibility | Business owns DNA; ADR-004/005, Freeze 6.1 | Cannot bind pipeline safely / Critical | Deferred Governance + feature intake | Organization reconciliation | No | Yes for implementation spec requiring model | Yes |
| UXG-006 BA resume absent | No governed pipeline UI | Inherited Session lifecycle; Freeze 5.6 | Interrupted work cannot resume safely / High | Design work + feature intake | Owner continuity projection | No | No | Yes |
| UXG-007 Explicit publication approval absent | No candidate review/publication UI | Review/correction/approval before DNA v1; Freeze 5.5 | Canonical-control risk / Critical | Design work + feature intake | Permission/owner validation spec | No | Yes | Yes |
| UXG-008 Guided Activation absent | No surface | Post-publication continuation; Freeze 5.7 | Foundation flow incomplete / High | Design work + feature intake | Publication and readiness inputs | No | No | Yes |
| UXG-009 Blueprint absent | No surface | Governed authenticated non-writing projection; Freeze 5.8 | Customer result unavailable / High | Design work + feature intake | Projection composition | No | No | Yes |
| UXG-010 Insight presentation absent | No surface | Conceptual inside Business Brain Decision; Freeze 5.9 | Insight cannot be shown safely / Medium | Design work + feature intake | Owner projection | No | No | Yes |
| UXG-011 Recommendation presentation absent | No surface | Optional capability-first advice; Freeze 5.10, ADR-013/014 | Advice/customer choice absent / Medium | Design work + feature intake | Review/invalidation policy | No | Conditional | Yes |
| UXG-012 Dashboard gated by mock OS completion | Current Core layout redirect behavior | Platform value before OS readiness; Freeze guarantees G-CP-48/49 | Core entry delayed / High | Feature-intake candidate | Destination-resolution spec | No | No | Yes |
| UXG-013 Product Hub lifecycle compression | Current browser `osEnablements`/card state | Separate entitlement, subscription, setup, readiness, permission; guarantees/ADR-023 | Misleading actions/status / High | Deferred Governance + feature intake | Subscription successor and owner projections | No | Conditional | Yes |
| UXG-014 Exact routes presented as target in older docs | Proposed `/onboarding/...` paths | Routes deferred by Freeze | Planning can masquerade as authority / High | Documentation reconciliation | Future IA/feature spec | Yes until corrected | Yes | Yes |
| UXG-015 State-machine overreach | Older exact UI transitions for Candidate/Analysis/Recommendation | Exact new lifecycles deferred; Freeze section 10 | Accidental domain lifecycle / Critical | Documentation reconciliation | Owning future decisions | Yes until corrected | Yes | Yes |
| UXG-016 Wireframes absent | No approved wireframe set | Wireframe boundary document | Feature UX not reviewable visually / Medium | Design work | Approved feature intake | No | Conditional | Yes |
| UXG-017 Accessibility placeholder | Previous placeholder | WCAG 2.2 AA authority from Design DNA/checklist | Cross-experience acceptance unclear / High | Documentation reconciliation | None | Yes until corrected | Yes | Yes |
| UXG-018 UI copy placeholder | Previous placeholder | Accurate confidence/approval/terminology rules | Risk of false certainty/implicit approval / High | Documentation reconciliation | Bilingual content review | Yes until corrected | Yes | Yes |
| UXG-019 Localization coverage uneven | Partial Core/Commerce seams; hard-coded copy | ADR-041, English/LTR and Arabic/RTL parity | Launch parity unavailable / High | Design work + feature intake | Preference precedence deferred | No | No | Yes |
| UXG-020 Responsive/a11y coverage uneven | Current routes vary | Accessibility and Design System authority | Critical flows may fail on device/AT / High | Design work + implementation candidate | Feature-specific evidence | No | No | Yes |
| UXG-021 Permission presentation incomplete | Mock roles/no action-level guards | Explicit tenant/resource scope; ADR-034 | Misleading access and leakage risk / Critical | Feature intake + later implementation | Permission catalog/owner contracts | No | Conditional | Yes |
| UXG-022 Cross-flow recovery inconsistent | Scattered mock states | Reconciled flow/state authority | Lost work/unsafe retry risk / High | Design work + feature intake | Retention/error contracts | No | No | Yes |
| UXG-023 Commerce localization/recovery gaps | Strong mock routes, uneven states | OS-owned UI plus global UX baseline | Daily use quality risk / High | Separate Commerce feature intake | Current compatibility seams | No | No for Commerce specs | Yes |
| UXG-024 Missing Commerce Movements/Returns destinations | No Movements page; Returns document only | Commerce ownership; not Foundation-created scope | Operational completeness gap / Medium | Feature-intake candidate | Commerce domain specs | No | No for Foundation | Yes for those features |
| UXG-025 Legacy Genesis path ambiguity | Pre-existing working tree replaces active journey with legacy content and removes legacy path | v1.1 manifest and authority interpretation require canonical Genesis/provenance integrity | Active link/authority collision / Critical | Documentation hygiene under authorized Genesis ownership | Restore canonical v1.2 and preserve legacy marker | Yes | Yes | Yes |

## 4. Reconciliation Disposition

| Gap class | Disposition in this package |
|---|---|
| Documentation reconciliation | UXG-002, UXG-014, UXG-015, UXG-017, UXG-018 addressed in current candidate documents |
| Design work | Recorded but not performed: UXG-001, 003–004, 006–011, 016, 019–020, 022 |
| Feature-intake candidates | Recorded in the planning-only backlog; not authorized |
| Deferred Governance | UXG-005 and UXG-013 retain their controlling deferrals |
| Implementation candidates | Remain blocked behind approval, specs, plans, tasks, and Constitution Checks |
| Hygiene blocker | UXG-025 / UIAUTH-HYGIENE-001 cannot be corrected here without overwriting a pre-existing Genesis change |

## 5. Relationships and Verified Against

- [Frontend Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md)
- [Frontend Backlog](./14-FRONTEND-BACKLOG.md)
- [Reconciliation Decision](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md)
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`
- `docs/08-implementation-audit/CORE-PLATFORM-v1.1-POST-FREEZE-READINESS-VALIDATION-v1.0.md`

