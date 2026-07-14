# Global Platform Proposal Alignment Patch v0.1.1

**Milestone:** Global Platform  
**Artifact type:** Proposal Patch  
**Applies to:** `02-GLOBAL-PLATFORM-PROPOSAL.md`  
**Authorized by:** `03-GLOBAL-PLATFORM-ARCHITECTURE-REVIEW.md`  
**Patch scope:** RC-GP-01, RC-GP-02, and RC-GP-03 only  
**Classification:** Proposal authority and responsibility-allocation clarification  
**Architecture impact:** NONE  
**Ownership impact:** NONE  
**Status:** Complete — pending independent Re-Review

---

## Patch Authority and Precedence

This Patch implements exactly the three corrections authorized by the Independent Architecture
Review. It introduces no architectural redesign, new owner, new logical grouping, new
architectural responsibility, new model, new deferral, new ADR subject, implementation, or
technology decision.

The Proposal baseline after this Patch is:

```text
02-GLOBAL-PLATFORM-PROPOSAL.md
  +
03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md
  =
Global Platform Proposal Baseline v0.1.1
```

This Patch controls only the statements expressly corrected below. Every unaffected Proposal
statement retains its original wording, status, identifier, mapping, count, relationship,
ownership boundary, and meaning.

Authority remains, in order:

1. Governance and Accepted ADRs;
2. Genesis v1.1;
3. frozen Core Platform, Business Brain, Commerce OS, Marketplace, and AI Expert Network
   baselines;
4. approved Global Platform Discovery Baseline v0.1.1;
5. approved Global Platform Capability Map; and
6. Global Platform Proposal Baseline v0.1.1 as a proposed architecture pending Re-Review.

## 1. Patch Summary

| Correction | Review finding | Corrected subject | Architecture changed? | Ownership changed? |
|---|---|---|---|---|
| RC-GP-01 | F-GP-AR-01 | `GPC` terminology is separated from canonical Genesis Capability | NO | NO |
| RC-GP-02 | F-GP-AR-02 | proposed structural definition is separated from `DD-GP-01` | NO | NO |
| RC-GP-03 | F-GP-AR-03 | coordination, artifact ownership, evaluation, validation, and execution are allocated explicitly | NO | NO |

**Authorized findings corrected: 3**  
**Additional findings addressed: 0**  
**Architecture changes introduced: 0**

## 2. RC-GP-01 Resolution

### 2.1 Finding reference

- **Review finding:** F-GP-AR-01
- **Required change:** RC-GP-01
- **Subject:** Canonical Capability terminology

### 2.2 Controlling terminology correction

For the complete Proposal Baseline v0.1.1:

> `GPC-01` through `GPC-30` are **Global Platform Architectural Capabilities**.

A **Global Platform Architectural Capability** is a logical architectural responsibility used to
describe how the proposed Global Platform architecture coordinates or assigns work. It is not the
canonical Governance and Genesis concept **Capability**.

The unqualified canonical term **Capability** retains its frozen meaning:

> A reusable, independent, configurable, composable, platform-wide business function describing
> what a Business needs, canonically owned by the Core Capability Registry.

This Patch does not modify that meaning, ADR-007, the Governance Glossary, Genesis Capabilities,
or Capability Registry ownership.

### 2.3 Proposal interpretation corrections

The following Proposal wording is corrected by this Patch wherever it refers to `GPC-01` through
`GPC-30`:

| Proposal wording | Corrected Baseline v0.1.1 interpretation |
|---|---|
| “Capability” | “Global Platform Architectural Capability” |
| “Approved Capabilities” | “Approved Global Platform Architectural Capabilities” |
| “Capability Responsibilities” | “Global Platform Architectural Capability Responsibilities” |
| “Capability Non-Responsibilities” | “Global Platform Architectural Capability Non-Responsibilities” |
| “Approved Capability Relationships” | “Approved Global Platform Architectural Capability Relationships” |
| “Approved Capability count: 30” | “Approved Global Platform Architectural Capability count: 30” |
| “Rejected candidate Capability count: 0” | “Rejected candidate architectural responsibility theme count: 0” |
| “each `GPC` has exactly one accountable boundary” | “each Global Platform Architectural Capability has the clarified logical accountability described by this Patch” |

This correction applies to the Executive Summary, Proposal Decision Language, sections 3 through
7, Proposal Readiness, and every other unqualified use that refers specifically to a `GPC`.
It does not alter references to the canonical Genesis Capability, Capability Registry, Business
Capability, or OS Module concepts.

### 2.4 Explicit non-equivalence

`GPC-01` through `GPC-30` are not:

- Capability Registry entries;
- Genesis Business Capabilities;
- canonical Capability definitions;
- versions of a canonical Capability;
- Business Brain Capability recommendations;
- Marketplace Capability assets;
- OS Modules;
- a transfer of Capability Registry ownership; or
- authorization to create, change, publish, deprecate, or map a canonical Capability.

### 2.5 Preservation guarantee

RC-GP-01 changes terminology authority only. It preserves exactly:

- identifiers `GPC-01` through `GPC-30`;
- all 30 names;
- mappings to `GPCT-01` through `GPCT-30`;
- mappings to `GPLRD-01` through `GPLRD-10`;
- responsibilities and non-responsibilities;
- relationship order and domain relationships;
- accountable-boundary intent as clarified by RC-GP-03; and
- the count of 30.

**F-GP-AR-01 status: RESOLVED**

## 3. RC-GP-02 Resolution

### 3.1 Finding reference

- **Review finding:** F-GP-AR-02
- **Required change:** RC-GP-02
- **Subject:** Proposed structural definition versus deferred status

### 3.2 Controlling structural decision

The Executive Summary, Architectural Mission, and Architectural Scope remain unchanged and
control the structural meaning of the Proposal Baseline:

> Global Platform is a Core-coordinated, platform-wide, cross-cutting logical responsibility
> architecture. It is not a tenant, an Operating System, a bounded context, a global super-domain,
> or a replacement canonical owner.

This is the Proposal's structural architecture decision. It remains proposed until the Proposal
Baseline passes independent Re-Review and the later milestone lifecycle. It is no longer treated
as simultaneously unknown or deferred inside the Proposal.

### 3.3 GPOQ-02 disposition

`GPOQ-02` asked whether Global Platform describes a milestone, expansion posture, platform layer,
or another concept. Proposal Baseline v0.1.1 records that question as:

> **Addressed by the proposed structural decision; subject to Re-Review and later approval, not a
> Deferred Decision.**

The historical Discovery question remains unchanged for provenance. This Patch changes only its
Proposal-phase disposition.

### 3.4 Corrected DD-GP-01

The stable identifier and Deferred Decision count are preserved. The controlling `DD-GP-01`
statement becomes:

| ID | Corrected Deferred Decision | Discovery questions preserved | Required authority before resolution |
|---|---|---|---|
| DD-GP-01 | mandatory Global Platform outcomes and explicit exclusion criteria not already fixed by the proposed Mission, Scope, and Non-Scope | GPOQ-03, GPOQ-06 | Proposal Re-Review, affected-owner review, and successor Freeze |

`DD-GP-01` no longer defers the architectural definition of Global Platform and no longer maps
`GPOQ-02`. It remains one Deferred Decision, so `DD-GP-01` through `DD-GP-36` and the total count
of 36 remain unchanged.

### 3.5 Corrected DADR-GP-01

The stable identifier and Draft ADR Candidate count are preserved. The controlling
`DADR-GP-01` statement becomes:

| ID | Corrected Draft ADR candidate subject | Corrected proposed decision purpose | Related Proposal state |
|---|---|---|---|
| DADR-GP-01 | Global Platform as a Core-coordinated cross-cutting logical responsibility architecture | record and ratify the Proposal's non-owner, non-OS structural decision after approval; it does not discover an unknown structural definition | proposed structural decision; DD-GP-01 only for remaining outcome and exclusion alignment |

`DADR-GP-01` remains a Draft ADR candidate only. It is not an ADR file and acquires no Accepted
status through this Patch.

### 3.6 Preservation guarantee

RC-GP-02 changes no Mission, Vision, Scope, Non-Scope, structural design, identifier, or count. It
only removes contradictory decision status among the Executive Summary, Mission, `DD-GP-01`, and
`DADR-GP-01`.

**F-GP-AR-02 status: RESOLVED**

## 4. RC-GP-03 Resolution

### 4.1 Finding reference

- **Review finding:** F-GP-AR-03
- **Required change:** RC-GP-03
- **Subject:** Composite responsibility allocation and Core coordination labels

### 4.2 Responsibility-allocation model

Proposal Baseline v0.1.1 distinguishes six non-overlapping responsibility kinds:

| Responsibility kind | Meaning | Owner rule |
|---|---|---|
| Logical Coordination | resolve and convey explicit, source-attributed, authorized global context among existing owners | the accountable Core coordination boundary named by the relevant `GPC`; it owns no referenced fact or target action |
| Canonical Ownership | own the source-of-truth identity, fact, lifecycle, or domain state | exactly one frozen owner; unchanged by this Patch |
| Artifact Ownership | own a specific governed artifact such as Knowledge, Rule, Decision, Recommendation, Configuration Proposal, Marketplace Asset, or AI artifact | exactly the artifact owner named by its frozen baseline |
| Deterministic Evaluation | apply deterministic Rules or owner-domain logic and retain the governed outcome | Rules Engine or the applicable frozen evaluating owner; never generic Core coordination or AI |
| Validation | confirm current authorization, applicability, invariants, and permitted target change | exactly one applicable target owner for the protected operation |
| Execution | perform or reject the canonical target action and own its result | exactly one applicable target owner; no Global Platform execution authority |

A participant may consume another owner's immutable reference or projection, but consumption does
not create co-ownership. Each distinct responsibility has one named owner.

### 4.3 Core coordination label correction

The Proposal labels:

- “Core context coordination”;
- “Core Platform context coordination”;
- “Core shared intelligence coordination”;
- “Core projection coordination”; and
- similar Core coordination wording

mean only **Logical Coordination** under existing Core responsibilities.

These labels are not:

- Components;
- Domains or bounded contexts;
- services;
- aggregates;
- canonical facts;
- canonical write models;
- canonical writers;
- deterministic evaluators unless an existing named owner already has that responsibility;
- validators of another owner's invariants;
- execution authorities; or
- physical module, runtime, deployment, or implementation boundaries.

No new Core owner is introduced.

### 4.4 GPC-22 responsibility allocation

`GPC-22` retains its name **Knowledge and Rule Global Applicability**, identifier, source mapping,
logical grouping, and relationship. Its responsibilities are allocated as follows:

| Responsibility | Exact owner |
|---|---|
| logical coordination of authorized country-aware context and exact source references | Core Platform shared-context coordination |
| canonical Knowledge and Knowledge version ownership | Knowledge Engine / frozen Knowledge owner |
| canonical Rule and Rule version ownership | Rules Engine / frozen Rule owner |
| deterministic Rule selection, evaluation, and governed Rule outcome | Rules Engine |
| validation of how an outcome applies to a target action | applicable target owner |
| execution of the target action | applicable target owner |

There is no combined Knowledge-and-Rule canonical artifact, no copied global Knowledge or Rule,
and no Core coordination write authority.

### 4.5 GPC-23 responsibility allocation

`GPC-23` retains its name **Recommendation and Configuration Global Context**, identifier, source
mapping, logical grouping, and relationship. Its responsibilities are allocated as follows:

| Responsibility | Exact owner |
|---|---|
| logical coordination of permitted global context references | Core Platform shared-context coordination |
| Recommendation identity, content, explanation, lifecycle, disposition, and feedback | Recommendation Engine |
| Configuration Proposal identity, content, version, and traceability | Configuration Engine |
| target configuration validation | applicable target owner |
| target configuration execution and resulting state | applicable target owner |

The Recommendation Engine does not own Configuration Proposals. The Configuration Engine does not
own Recommendation disposition or target state. Core coordination owns neither artifact.

### 4.6 GPC-25 responsibility allocation

`GPC-25` retains its name **Independent OS Global Participation**, identifier, source mapping,
logical grouping, and relationship. It is an architectural participation pattern, not one shared
global operational capability instance.

For every OS-specific instance:

| Responsibility | Exact owner |
|---|---|
| supply shared authorized context references | applicable existing Core context owner |
| OS-specific interpretation, deterministic domain validation, setup, configuration, and policy application | that Operating System |
| OS canonical facts, write models, aggregates, reports, and lifecycles | that Operating System |
| OS operational execution and result | that Operating System |

No Operating System owns another OS instance, and no global shared OS writer or mandatory
cross-OS dependency exists.

### 4.7 GPLRD relationship-group correction

All 10 `GPLRD` entries remain **Logical Responsibility Domains** only. In particular:

- `GPLRD-03` groups Core context coordination, Knowledge, Rules, and target-owner participation;
- `GPLRD-06` groups Marketplace and independently owned OS participation; and
- `GPLRD-07` groups Business Brain, Knowledge, Rules, Recommendation, Configuration, and AI
  participation under their separate frozen owners.

A `GPLRD`:

- organizes relationships;
- does not own any participating responsibility;
- does not become the parent of a frozen owner;
- does not merge artifacts or lifecycles;
- does not authorize a write or target action; and
- is not a Component, bounded context, service, aggregate, canonical writer, or physical boundary.

The “Accountable coordination boundary” column in Proposal section 3 identifies participating
coordination responsibility, not ownership by the `GPLRD` grouping.

### 4.8 General composite-responsibility invariant

For all `GPC` and `GPLRD` relationships, including Business Brain, Marketplace, Commerce OS,
AI Expert Network, Reporting, Search, Observability, and future Operating Systems:

```text
Core logical coordination
  ≠ canonical ownership
  ≠ artifact ownership
  ≠ deterministic evaluation
  ≠ target validation
  ≠ target execution
```

Each equality is prohibited unless a frozen authority already assigns both named responsibilities
to the same owner. This Patch does not make such an assignment.

**F-GP-AR-03 status: RESOLVED**

## 5. Validation Summary

### 5.1 Authorized correction validation

| Validation | Result |
|---|---|
| F-GP-AR-01 corrected by RC-GP-01 | PASS |
| F-GP-AR-02 corrected by RC-GP-02 | PASS |
| F-GP-AR-03 corrected by RC-GP-03 | PASS |
| Review findings corrected | 3 |
| findings outside authorized scope addressed | 0 |
| new findings introduced | 0 |

### 5.2 Preservation validation

| Preserved subject | Baseline v0.1.1 result |
|---|---|
| Mission and Vision | UNCHANGED |
| Scope and Non-Scope | UNCHANGED |
| Logical Responsibility Domains | 10 — UNCHANGED |
| Global Platform Architectural Capabilities | 30 — names, identifiers, mappings, responsibilities, relationships, and count UNCHANGED |
| rejected architectural responsibility themes | 0 — UNCHANGED |
| risks | 24 retained / 23 active — UNCHANGED |
| Deferred Decisions | DD-GP-01 through DD-GP-36; 36 identifiers and count UNCHANGED |
| Draft ADR candidates | DADR-GP-01 through DADR-GP-14; 14 identifiers and count UNCHANGED |
| Aggregate Boundary Candidates | 8 — UNCHANGED |
| Candidate Canonical Facts | 15 — UNCHANGED |
| Candidate Write Models | 12 — UNCHANGED |
| Candidate Read Models | 10 — UNCHANGED |
| Candidate Lifecycles | 8 — UNCHANGED |
| cross-milestone responsibilities and ownership | UNCHANGED |
| technology independence | UNCHANGED |
| inherited Deferred Decision registers | UNCHANGED AND UNRESOLVED |

`DD-GP-01` and `DADR-GP-01` retain their identifiers and register positions; only their
descriptions are aligned with the structural decision already present in the Proposal.

### 5.3 Impact validation

| Impact category | Change introduced |
|---|---:|
| architecture | 0 |
| ownership | 0 |
| logical groupings | 0 |
| architectural responsibilities | 0 |
| canonical Capabilities | 0 |
| canonical facts | 0 |
| write models | 0 |
| aggregates | 0 |
| read models | 0 |
| lifecycles | 0 |
| Deferred Decision identifiers | 0 |
| Draft ADR identifiers | 0 |
| implementation or technology | 0 |

### 5.4 Patch completion

The three Review findings are fully corrected through terminology authority, decision-status
alignment, and explicit responsibility allocation. No frozen baseline is changed. No Proposal
architecture is redesigned. No new Review finding is introduced.

## 6. Recommendation

# READY FOR RE-REVIEW

## References

### Patched Proposal baseline

- [Global Platform Proposal v0.1](02-GLOBAL-PLATFORM-PROPOSAL.md)
- [Global Platform Architecture Review](03-GLOBAL-PLATFORM-ARCHITECTURE-REVIEW.md)

### Approved pre-Proposal inputs

- [Global Platform Discovery v0.1](00-GLOBAL-PLATFORM-DISCOVERY.md)
- [Global Platform Discovery Patch v0.1.1](00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md)
- [Global Platform Capability Map](01-GLOBAL-PLATFORM-CAPABILITY-MAP.md)

### Controlling authorities

- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-007 — Capabilities Before Industries](../00-governance/ADR/ADR-007-capabilities-before-industries.md)
- [Genesis Capabilities](../01-genesis/04-CAPABILITIES.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md)
