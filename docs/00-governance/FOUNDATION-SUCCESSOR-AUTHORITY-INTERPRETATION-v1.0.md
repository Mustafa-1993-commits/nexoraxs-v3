# Foundation Successor Authority Interpretation v1.0

**Version:** 1.0

**Status:** Approved — successor-use Governance interpretation; not an Architecture Freeze or ADR

**Owner:** NexoraXS Architecture Governance

**Authority:** Approved Governance interpretation for the Foundation/Core successor package

**Predecessor:** Foundation Authority Crosswalk v0.1

**Successor effect:** Effective only if explicitly approved by Foundation Governance Approval v2.0

**Approval state:** Approved by Foundation Governance Approval v2.0 after Architecture Review v2

---

## 1. Purpose

This document defines the safest successor-use interpretation of the differing authority language
in AGENTS, Foundation, Genesis, Accepted ADRs, Core Platform Freeze v1.0, and Business Brain Freeze
v1.0. It preserves each historical statement and establishes how a future approved Freeze relates to
its predecessor.

## 2. Scope

The interpretation applies only to reading, reviewing, approving, and freezing the Foundation/Core
successor package. It does not change product meaning, canonical ownership, or implementation.

## 3. Authority Classes

### 3.1 Immutable historical source authority

An Accepted ADR, approved Genesis version, approved milestone artifact, Architecture Freeze, review,
or decision record remains immutable evidence of what was approved at that time. Later approval does
not rewrite that history.

### 3.2 Active operational authority

For repository work, [AGENTS section 1](../../AGENTS.md) supplies the conservative reading and
conflict-stop order. It is operational guidance, not architecture. It requires the current
controlling Freeze to be applied first within its scope and work to stop where another controlling
source would produce a different result.

### 3.3 Architecture Freeze authority

The latest approved Architecture Freeze for a bounded scope is the controlling architecture
baseline for that scope. It carries its included sources, guarantees, deferrals, and change-control
rules. A later proposal, merge, Genesis edit, or Accepted ADR does not by itself make the current
Freeze disappear.

### 3.4 Accepted ADR authority

An Accepted ADR is authoritative for its durable decision within the repository hierarchy. When it
adds or changes meaning governed by a current Freeze, it authorizes the direction but must complete
the Freeze's successor controls before the changed architecture becomes the controlling frozen
baseline. Accepted ADR history is never silently edited.

### 3.5 Genesis product-intent authority

Genesis supplies durable product identity, doctrine, ontology, and intended outcomes. Its product
intent constrains successor proposals. Where a later Genesis version changes architecture already
frozen, the new intent requires explicit ADR and successor-Freeze reconciliation. Calling Genesis
“ultimate authority” does not permit a mutable Genesis path to retroactively alter a dated Freeze.

### 3.6 Successor proposal authority

A Proposed Governance artifact, ADR, successor architecture, compatibility assessment, alignment,
or review has no controlling architecture authority. It is review evidence until its declared
approval gate passes.

## 4. Conflict-Stop Rule

When sources differ:

1. identify the exact bounded scope and current Freeze;
2. preserve all non-conflicting guarantees;
3. identify later Accepted ADR or approved Genesis/Foundation intent;
4. stop any implementation or subordinate documentation that depends on the conflicting meaning;
5. use the current Freeze's change-control process; and
6. record the relationship explicitly in the approved successor Freeze.

Later date, narrower topic, filename, merge state, or proposal status never creates silent
supersession.

## 5. Successor Freeze Rule

An approved later Freeze supersedes an earlier Freeze only within the scope and statements it
explicitly identifies. The successor must record:

- its predecessor and effective version;
- the Accepted ADRs and approved sources authorizing each change;
- exact replaced statements or relationships;
- every preserved guarantee;
- compatibility classification;
- remaining deferrals;
- historical and source-version provenance; and
- approval and readiness state.

The predecessor remains immutable historical authority. Unaffected guarantees continue through the
successor. Anything not explicitly replaced remains inherited.

## 6. Foundation/Core Application

For the current package:

- Core Platform Freeze v1.0 remains controlling until v1.1 is approved.
- Business Brain Freeze v1.0 remains controlling for Business Brain ownership and physical boundary.
- ADR-042 is the Accepted Foundation direction for pre-registration Discovery and conversion.
- Accepted ADR-043 supplies the explicit ADR-015/016/042 relationship.
- Foundation Baseline v0.1 and Customer Journey v1.2 are approved successor inputs, not mechanisms
  that rewrite the v1.0 Freeze.
- Workspace Lifecycle v1.0 and earlier Core sources remain historical predecessor evidence.
- Governance Disposition, Successor Architecture, Freeze Alignment, Business Brain Compatibility,
  Genesis Addendum, and this Interpretation are approved successor inputs; they become controlling
  Core architecture only through the v1.1 Freeze.

## 7. Prohibited Interpretations

This interpretation does not permit:

- a mutable source path to change a historical Freeze retroactively;
- an Accepted ADR to be ignored because a Freeze predates it;
- an Accepted ADR to replace a Freeze without the Freeze's successor lifecycle;
- Genesis intent to bypass ownership, security, review, or change control;
- a proposal or review to become architecture through merge or citation;
- a subordinate specification or implementation to resolve an authority conflict; or
- rewriting prior artifacts to make later meaning appear original.

## 8. Approval and Change Control

This interpretation is active for successor use through Foundation Governance Approval v2.0. A
future change requires a new Governance record and, where architecture meaning is affected, the
normal ADR and Freeze controls.

## 9. References

- [AGENTS.md](../../AGENTS.md)
- [Milestone Lifecycle](./MILESTONE-LIFECYCLE.md)
- [ADR governance](./ADR/README.md)
- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md)
- [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
