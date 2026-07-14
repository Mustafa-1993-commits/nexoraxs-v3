# Global Platform Documentation Wave 1

**Milestone:** Global Platform  
**Artifact type:** Documentation Quality Layer  
**Applies to:** Global Platform Proposal Baseline v0.1.1  
**Architecture authority:** NONE — documentation-only  
**Architecture impact:** NONE  
**Ownership impact:** NONE  
**Status:** Complete

---

## Baseline and Precedence

This Wave improves how the approved Global Platform documentation is read, traced, and
maintained. It does not amend, replace, interpret beyond, or add to the architecture.

The controlling Proposal baseline is:

```text
02-GLOBAL-PLATFORM-PROPOSAL.md
  +
03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md
  =
Global Platform Proposal Baseline v0.1.1
```

The Patch controls only the three authorized corrections. Every unaffected Proposal statement
retains its original meaning. The Independent Re-Review verifies that the merged baseline is
stable and ready for Documentation Wave 1.

This Wave has the lowest authority in that chain. If its explanatory navigation conflicts with
the Proposal Baseline, governing authority, or frozen milestone, the higher authority controls.

## 1. Executive Documentation Summary

Documentation Wave 1 establishes a consistent reading model for the Global Platform milestone.
It records terminology, identifier, cross-reference, heading, responsibility, ownership,
Deferred Decision, Draft ADR, navigation, and traceability conventions without changing any
architectural statement.

The Wave records 15 documentation observations:

- the Proposal must always be read with its Patch;
- historical artifacts must remain visible without being mistaken for controlling authority;
- qualified architectural terminology must be distinguished from canonical platform concepts;
- every identifier family must retain its existing meaning, range, and source;
- responsibility wording must preserve the six responsibility kinds established by the Patch;
- ownership language must distinguish coordination and consumption from ownership;
- Deferred Decisions and Draft ADR candidates must remain unresolved and non-Accepted;
- cross-references must lead readers to the controlling source rather than restating it; and
- documentation improvements must remain visibly non-architectural.

No Proposal statement, domain, capability, owner, identifier, mapping, risk, Deferred Decision,
Draft ADR candidate, model, lifecycle, or cross-milestone responsibility is changed.

## 2. Documentation Improvements

### 2.1 Documentation observation register

| ID | Documentation area | Improvement recorded by this Wave | Reader outcome | Architectural impact |
|---|---|---|---|---|
| DOC-GP-W1-01 | terminology consistency | use the controlling qualified terms in section 5 | canonical and architectural meanings remain distinct | NONE |
| DOC-GP-W1-02 | identifier consistency | use the identifier registry in section 3.2 | identifier purpose, range, count, and status remain visible | NONE |
| DOC-GP-W1-03 | cross-reference consistency | link to the controlling artifact instead of duplicating its decision text | source authority is easier to verify | NONE |
| DOC-GP-W1-04 | section naming consistency | use artifact-role headings consistently in navigation and future documentation | readers can distinguish Discovery, Proposal, review, Patch, and Wave roles | NONE |
| DOC-GP-W1-05 | responsibility wording consistency | preserve the six responsibility kinds in section 2.4 | coordination is not mistaken for ownership or execution | NONE |
| DOC-GP-W1-06 | architectural capability wording | qualify `GPC-01` through `GPC-30` as Global Platform Architectural Capabilities | no collision with canonical Capability | NONE |
| DOC-GP-W1-07 | ownership wording consistency | use “frozen owner,” “consumes,” “references,” and “coordinates” only in their approved senses | no implied ownership transfer | NONE |
| DOC-GP-W1-08 | Proposal wording consistency | apply Patch precedence whenever one of RC-GP-01 through RC-GP-03 controls wording | the merged Proposal Baseline is read as one proposal | NONE |
| DOC-GP-W1-09 | Deferred Decision references | retain stable `DD-GP` identifiers and show overlapping inherited deferrals as simultaneously open | no deferred subject appears resolved or superseded | NONE |
| DOC-GP-W1-10 | ADR references | distinguish Accepted ADRs from `DADR-GP` Draft ADR candidates | candidate status cannot be mistaken for governance authority | NONE |
| DOC-GP-W1-11 | internal navigation | provide the reading order and role map in section 2.2 | readers can enter the milestone without authority ambiguity | NONE |
| DOC-GP-W1-12 | traceability | provide source-to-decision and cross-milestone navigation in section 3 | evidence can be followed without new mappings | NONE |
| DOC-GP-W1-13 | documentation observations | use stable `DOC-GP-W1` labels for this Wave’s documentation-only observations | future quality work can refer to observations without creating architecture identifiers | NONE |
| DOC-GP-W1-14 | editorial consistency | apply the conventions in section 4 | prose and tables become easier to compare | NONE |
| DOC-GP-W1-15 | clarification opportunities | place all remaining work in the documentation-only register in section 6 | later documentation work cannot be confused with proposal correction | NONE |

The `DOC-GP-W1` labels are local documentation observation labels only. They are not
architectural identifiers, findings, requirements, Deferred Decisions, or ADR candidates.

### 2.2 Internal navigation and reading order

| Order | Artifact | Architectural role | How to read it now |
|---:|---|---|---|
| 1 | [Discovery v0.1](00-GLOBAL-PLATFORM-DISCOVERY.md) | historical problem-space record | read with the Discovery Patch; unpatched repository-readiness statements are historical |
| 2 | [Discovery Patch v0.1.1](00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md) | repository-authority correction | controls only repository validation, readiness, and the Genesis authority-chain correction |
| 3 | [Capability Map](01-GLOBAL-PLATFORM-CAPABILITY-MAP.md) | approved candidate logical mapping | preserves candidate-only status and introduces no architecture |
| 4 | [Proposal v0.1](02-GLOBAL-PLATFORM-PROPOSAL.md) | base proposed architecture | read with the Proposal Patch, never alone |
| 5 | [Independent Architecture Review](03-GLOBAL-PLATFORM-ARCHITECTURE-REVIEW.md) | historical quality gate | records `F-GP-AR-01` through `F-GP-AR-03` and their authorized corrections |
| 6 | [Proposal Patch v0.1.1](03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md) | controlling Proposal corrections | overrides only the wording governed by RC-GP-01 through RC-GP-03 |
| 7 | [Independent Re-Review](04-GLOBAL-PLATFORM-RE-REVIEW.md) | merged-baseline validation | verifies all three corrections and authorizes Documentation Wave 1 |
| 8 | this Wave | documentation quality layer | improves reading, consistency, and traceability; creates no architecture |

### 2.3 Section naming consistency

Future Global Platform documentation should use artifact-role names consistently:

| Name | Documentation meaning |
|---|---|
| Discovery | exploratory problem-space artifact |
| Discovery Patch | bounded correction to Discovery interpretation or provenance |
| Capability Map | candidate logical interaction map, not architecture |
| Proposal | proposed architecture submitted to governance gates |
| Architecture Review | independent challenge of a Proposal |
| Proposal Patch | authorized correction applied through precedence, without rewriting the Proposal |
| Re-Review | verification of the merged Proposal Baseline |
| Documentation Wave | documentation-only quality or expansion artifact governed by the approved Proposal Baseline |

These labels organize documents only. They do not rename existing files, headings, identifiers,
or governance phases.

### 2.4 Responsibility wording consistency

The Proposal Patch distinguishes six responsibility kinds. Documentation must preserve those
distinctions whenever a composite interaction is described.

| Responsibility kind | Documentation wording rule | Must not imply |
|---|---|---|
| Logical Coordination | state that authorized, source-attributed context is resolved and conveyed among existing owners | ownership of a referenced fact, target decision, or target action |
| Canonical Ownership | name exactly one frozen source-of-truth owner | shared or conditional ownership created by Global Platform |
| Artifact Ownership | name the frozen owner of the specific governed artifact | ownership of another artifact or source fact |
| Deterministic Evaluation | name the applicable Rules Engine or frozen evaluating owner | generic Core coordination or AI evaluation authority |
| Validation | name the applicable target owner for the protected operation | approval by a relationship group or coordination label |
| Execution | name the applicable target owner that performs or rejects the canonical action | Global Platform execution authority |

The phrases “Core context coordination,” “Core Platform context coordination,” “Core shared
intelligence coordination,” and “Core projection coordination” remain logical accountability
labels only. They do not name Components, Domains, services, aggregates, canonical writers,
runtimes, or deployment units.

### 2.5 Ownership wording consistency

Documentation must use the following distinctions without restating or changing the frozen owner
matrix:

- **owns** means canonical source-of-truth or artifact ownership already established by a frozen
  authority;
- **coordinates** means logical accountability for explicit context movement, not fact ownership;
- **consumes** means use under contract, authorization, and scope, not co-ownership;
- **references** means retain an identifier or immutable reference, not copied canonical content;
- **projects** means produce or consume a non-canonical read model; and
- **validates** or **executes** always points back to the applicable target owner.

`GPLRD-01` through `GPLRD-10` are Logical Responsibility Domains. They group relationships and do
not own data, artifacts, capabilities, writes, lifecycles, or execution.

### 2.6 Proposal wording consistency

When Proposal v0.1 and Proposal Patch v0.1.1 use different wording for one of the three reviewed
subjects, the Patch controls:

| Subject | Controlling reading |
|---|---|
| `GPC` terminology | Global Platform Architectural Capability, not canonical Capability |
| Global Platform structural definition | the proposed Core-coordinated, cross-cutting logical responsibility architecture is not deferred; only the narrowed `DD-GP-01` remains deferred |
| composite responsibility allocation | coordination, ownership, evaluation, validation, and execution are distinct; the Patch’s allocation controls |

This table is a navigation aid to RC-GP-01 through RC-GP-03. It does not restate a new decision.

## 3. Traceability Improvements

### 3.1 Traceability path

Use this documentation path when validating any Global Platform statement:

```text
Governance and Accepted ADRs
  -> Genesis v1.1
  -> frozen milestone authority
  -> Discovery Baseline v0.1.1
  -> Capability Map
  -> Proposal Baseline v0.1.1
  -> Architecture Review finding, when relevant
  -> Independent Re-Review verification
  -> Documentation Wave reference
```

This path describes evidence order only. It creates no new dependency or authority.

### 3.2 Identifier consistency registry

| Identifier family | Existing range | Count | Existing role | Controlling source or status |
|---|---:|---:|---|---|
| `GPCT` | `GPCT-01`–`GPCT-30` | 30 | Discovery candidate capability themes | Discovery Baseline v0.1.1 |
| `GPC` | `GPC-01`–`GPC-30` | 30 | Global Platform Architectural Capabilities | Proposal Baseline v0.1.1 |
| `GPLRD` | `GPLRD-01`–`GPLRD-10` | 10 | Logical Responsibility Domains | Proposal Baseline v0.1.1 |
| `GPABC` | `GPABC-01`–`GPABC-08` | 8 | Aggregate Boundary Candidates | candidate-only; Proposal Baseline v0.1.1 |
| `GPCF` | `GPCF-01`–`GPCF-15` | 15 | Candidate Canonical Facts | candidate-only; Proposal Baseline v0.1.1 |
| `GPCWM` | `GPCWM-01`–`GPCWM-12` | 12 | Candidate Write Models | candidate-only; Proposal Baseline v0.1.1 |
| `GPRM` | `GPRM-01`–`GPRM-10` | 10 | Candidate Read Models | candidate-only; Proposal Baseline v0.1.1 |
| `GPLC` | `GPLC-01`–`GPLC-08` | 8 | Candidate Lifecycles | candidate-only; Proposal Baseline v0.1.1 |
| `DD-GP` | `DD-GP-01`–`DD-GP-36` | 36 | Global Platform Deferred Decisions | unresolved; `DD-GP-01` uses Patch wording |
| `DADR-GP` | `DADR-GP-01`–`DADR-GP-14` | 14 | Draft ADR candidate subjects | non-Accepted; `DADR-GP-01` uses Patch wording |
| `GPR` | `GPR-01`–`GPR-24` | 24 retained / 23 active | Proposal risk provenance | unchanged; `GPR-01` controlled by Discovery Patch |
| `GPOQ` | `GPOQ-01`–`GPOQ-72` | 72 | Discovery open questions | `GPOQ-01` historical under Discovery Patch; `GPOQ-02` addressed by the proposed structural decision |

Ranges use inclusive endpoints. A range reference must not imply that every item has the same
owner, status, or disposition beyond the common role shown here.

### 3.3 Source-to-baseline traceability

| Evidence | Existing trace | Documentation use |
|---|---|---|
| Discovery theme | `GPCT-xx` | locate the exploratory source and justification |
| approved architectural responsibility | `GPCT-xx` -> `GPC-xx` | verify the preserved one-to-one source mapping |
| logical grouping | `GPC-xx` -> `GPLRD-xx` | locate the approved relationship group without inferring ownership |
| unresolved subject | `GPOQ-xx` -> `DD-GP-xx` | verify that the question remains deferred unless the Patch records its disposition |
| future governance subject | `DD-GP-xx` -> `DADR-GP-xx`, where mapped | identify a Draft ADR subject without treating it as Accepted |
| reviewed correction | `F-GP-AR-xx` -> `RC-GP-xx` -> Re-Review result | verify the controlling wording and closure evidence |

No mapping in this table extends or replaces the mappings already recorded by the Proposal,
Patch, and Re-Review.

### 3.4 Cross-milestone reference navigation

| Authority | Primary reference | Documentation purpose |
|---|---|---|
| Governance | [Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md) | artifact lifecycle, quality gates, versioning, and change control |
| Governance | [ADR Repository](../00-governance/ADR/README.md) | Accepted ADR status and ADR process |
| Governance | [Glossary](../00-governance/glossary/GLOSSARY.md) | canonical terms and owners |
| Genesis | [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md) | approved ecosystem authority; no Genesis 21 artifact is required |
| Core Platform | [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | frozen shared-platform guarantees and ownership |
| Core Platform | [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md) | aligned documentation baseline readiness |
| Business Brain | [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) | Decision, intelligence, and AI sequencing boundaries |
| Commerce OS | [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md) | independently owned Commerce responsibilities and global participation boundary |
| Marketplace | [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md) | Marketplace publication-path ownership and scoped lifecycle boundaries |
| AI Expert Network | [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md) | Expert and AI coordination boundaries |

These references point to existing authorities. They do not duplicate or modify those
authorities.

### 3.5 Deferred Decision navigation

Deferred Decision references follow these documentation rules:

1. use the complete stable identifier, such as `DD-GP-09`, on first reference;
2. use inclusive ranges only for contiguous register navigation;
3. preserve `DD-GP-01` through `DD-GP-36` exactly;
4. treat `DD-GP-01` according to RC-GP-02, without remapping `GPOQ-02` into it;
5. retain every overlapping Core Platform, Business Brain, Commerce OS, Marketplace, and AI
   Expert Network deferral as independently open; and
6. never use documentation wording to select an answer, default, owner, model, lifecycle, or
   implementation for a deferred subject.

### 3.6 ADR reference navigation

Accepted ADRs and Draft ADR candidates use distinct forms:

| Form | Meaning | Authority |
|---|---|---|
| `ADR-xxx` | an Accepted Governance ADR when verified in the ADR Repository | controlling according to Governance |
| `DADR-GP-xx` | a Global Platform Draft ADR candidate subject | no Accepted status and no decision authority |

`DADR-GP-01` through `DADR-GP-14` remain candidate subjects only. This Wave creates no ADR,
accepts none, rejects none, and changes no ADR status or dependency.

## 4. Editorial Improvements

### 4.1 Editorial conventions

The following conventions improve comparison across the milestone:

- use exact file links for authority references and exact identifiers for registers;
- capitalize canonical terms as they appear in Governance and frozen baselines;
- introduce **Global Platform Architectural Capability** in full before using `GPC`;
- keep **Logical Responsibility Domain** qualified and never shorten it to an ownership domain;
- format identifiers in code style and preserve zero padding;
- use “candidate,” “deferred,” “proposed,” “approved by Re-Review,” and “frozen” only for their
  current lifecycle states;
- use “must” or “never” only when restating an existing invariant and cite the controlling source;
- use arrows only for logical traceability or information order, never as evidence of an API,
  event, transport, runtime, or deployment path;
- keep table headers parallel and use complete responsibility phrases; and
- avoid new abbreviations or synonyms for canonical concepts.

### 4.2 Reference conventions

- Relative Markdown links are preferred for repository navigation.
- A summary table points to its authority instead of copying a full register.
- Patch-controlled subjects link to both the base Proposal and the Patch when context requires.
- Historical findings remain linkable for provenance even after Re-Review verifies resolution.
- A documentation observation uses `DOC-GP-W1`; it must not be cited as architectural authority.

### 4.3 Non-architectural clarification conventions

Clarification may explain document role, precedence, terminology, identifier status, reading
order, or source location. It must not specify a new responsibility, owner, model, relationship,
mapping, invariant, requirement, lifecycle, risk treatment, or decision. Any future need for such
a change exits documentation scope and follows the approved milestone change-control process.

## 5. Terminology Improvements

### 5.1 Controlling terminology guide

| Term | Consistent documentation use | Do not use it to mean |
|---|---|---|
| Global Platform Proposal Baseline v0.1.1 | Proposal v0.1 plus Proposal Patch v0.1.1 read as one proposal | Proposal v0.1 alone or a frozen architecture |
| Global Platform Architectural Capability | one of `GPC-01` through `GPC-30`, a logical architectural responsibility | canonical Capability, Capability Registry entry, Component, service, or owner |
| Capability | the canonical Governance and Genesis concept owned through the Core Capability Registry | a `GPC` shorthand |
| Logical Responsibility Domain | one of `GPLRD-01` through `GPLRD-10`, organizing related responsibilities | bounded context, ownership domain, service, aggregate, runtime, or deployment unit |
| frozen owner | the one canonical owner established by Governance, Genesis, or a current Freeze | a coordinator, consumer, projector, or relationship group |
| Core coordination label | logical accountability for resolving and conveying explicit context | Component, Domain, service, aggregate, writer, validator, executor, or fact owner |
| candidate | a possible future concept with no approved canonical status | an approved model or implementation default |
| Deferred Decision | an intentionally unresolved decision with a stable identifier | permission to resolve the decision implicitly |
| Draft ADR candidate | a future ADR subject with no Accepted status | an ADR file or governing decision |
| read model / projection | a non-canonical, disposable view derived from source-owned facts | a canonical fact or write model |

### 5.2 Responsibility and ownership terminology validation

The terminology guide preserves:

- the distinction between Global Platform Architectural Capabilities and canonical Capability;
- the distinction between Logical Responsibility Domains and ownership domains;
- the distinction between logical coordination and canonical or artifact ownership;
- the distinction between deterministic evaluation, validation, and execution;
- frozen cross-milestone ownership; and
- candidate and deferred status for every unapproved model and lifecycle.

No new canonical term or synonym is introduced.

## 6. Remaining Documentation Opportunities

### 6.1 Documentation-only opportunity register

The following work may be considered in Documentation Wave 2. Each item is limited to navigation
or quality validation and has no architectural effect.

| ID | Remaining documentation work | Intended result | Architectural impact |
|---|---|---|---|
| DOC-GP-W2-01 | validate every relative link and heading anchor across the Global Platform milestone | complete cross-reference integrity report | NONE |
| DOC-GP-W2-02 | provide a cross-milestone authority and reading matrix | faster navigation to each frozen owner and inherited concept | NONE |
| DOC-GP-W2-03 | provide a source index for every existing identifier family | easier register lookup without duplicating register content | NONE |
| DOC-GP-W2-04 | provide reviewer and maintainer navigation checklists | repeatable documentation-quality review | NONE |
| DOC-GP-W2-05 | validate reference coverage for every Proposal section | visible documentation completeness without new traceability mappings | NONE |

These opportunities are not Proposal corrections, governance corrections, ownership corrections,
architectural recommendations, or implementation work.

### 6.2 Documentation-only validation

| Validation | Result |
|---|---|
| all recommendations are documentation-only | PASS |
| architectural recommendations exist | NO |
| Proposal corrections exist | NO |
| Governance corrections exist | NO |
| ownership corrections exist | NO |
| capability, domain, identifier, mapping, or count changes exist | NO |
| risk, ADR, or Deferred Decision changes exist | NO |
| canonical fact, write model, read model, or lifecycle changes exist | NO |
| cross-milestone responsibility changes exist | NO |
| implementation, API, service, database, infrastructure, deployment, or runtime content exists | NO |
| architectural changes proposed | 0 |

**Documentation observations:** 15  
**Remaining documentation opportunities:** 5  
**Architectural changes proposed:** 0

## 7. Recommendation

# READY FOR DOCUMENTATION WAVE 2

## References

### Global Platform baseline

- [Global Platform Discovery v0.1](00-GLOBAL-PLATFORM-DISCOVERY.md)
- [Global Platform Discovery Patch v0.1.1](00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md)
- [Global Platform Capability Map](01-GLOBAL-PLATFORM-CAPABILITY-MAP.md)
- [Global Platform Proposal v0.1](02-GLOBAL-PLATFORM-PROPOSAL.md)
- [Global Platform Independent Architecture Review](03-GLOBAL-PLATFORM-ARCHITECTURE-REVIEW.md)
- [Global Platform Proposal Patch v0.1.1](03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md)
- [Global Platform Independent Re-Review](04-GLOBAL-PLATFORM-RE-REVIEW.md)

### Governing authorities

- [Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md)
