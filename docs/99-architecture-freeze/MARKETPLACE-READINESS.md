# Marketplace Architecture v1.0 Readiness Validation

**Validation Version:** 1.0  
**Validation Date:** 2026-07-13  
**Architecture Version:** Marketplace Architecture v1.0  
**Documentation Baseline:** Marketplace Documentation Baseline v1.0  
**Freeze Status:** FROZEN  
**Validation Type:** Milestone Completion and Implementation Readiness  
**Owner:** Nexoraxs

---

## 1. Executive Summary

Marketplace Architecture v1.0 is complete, frozen, internally consistent, traceable to its
governing authorities, and ready to serve as the implementation baseline for future Marketplace
work.

This Readiness Validation is a governance quality gate. It validates the already-frozen baseline
and does not review, reinterpret, extend, or modify architecture. Marketplace Architecture v1.0
remains the sole controlling Marketplace architecture reference.

The validation result is:

| Readiness measure | Result |
|---|---|
| Authoritative documents present | PASS — 10 source artifacts plus Freeze |
| Documentation completeness | PASS |
| Architecture completeness | PASS |
| Freeze completeness | PASS |
| Governance and Genesis compliance | PASS |
| Cross-milestone consistency | PASS |
| Ownership conflicts | 0 |
| Blocking Issues | 0 |
| Deferred Decisions preserved | 50 |
| Accepted ADR dependencies represented | 32 |
| Draft ADR subjects preserved as Draft | 14 |
| Remaining risk groups | 6, non-blocking for architecture readiness |
| Readiness Status | READY |

Readiness for implementation means work may begin within the frozen logical architecture. It does
not mean that every deferred policy is ready for implementation. Any work that depends on
DD-MP-01 through DD-MP-50 must first obtain the applicable governed resolution. Implementation
cannot answer a Deferred Decision silently or weaken a Freeze guarantee.

## 2. Readiness Assessment

### 2.1 Authority and validation boundary

This validation applies the following authority order:

1. Marketplace Architecture v1.0 Freeze;
2. Accepted Governance ADRs and the approved Milestone Lifecycle;
3. Genesis v1.1;
4. Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
5. Business Brain Architecture v1.0 and Documentation Baseline v1.0;
6. Commerce OS Architecture v1.0 and Documentation Baseline v1.0; and
7. Marketplace source artifacts as frozen provenance.

This validation checks completeness, integrity, traceability, compliance, and readiness only. It
does not change an owner, Domain, Capability, fact, write model, aggregate, lifecycle, Deferred
Decision, ADR, guarantee, or external boundary. It introduces no implementation or technology.

### 2.2 Required readiness validation matrix

| # | Required validation | Result | Evidence |
|---:|---|---|---|
| 1 | Documentation completeness | PASS | Discovery through Final Review and Freeze are present and approved |
| 2 | Architectural completeness | PASS | Scope, Domains, Capabilities, facts, writes, aggregates, lifecycles, models, participation, and boundaries are frozen |
| 3 | Freeze completeness | PASS | Version, authority, scope, guarantees, exclusions, deferrals, ADR status, risks, change control, validation, and declaration are present |
| 4 | Cross-document traceability | PASS | Proposal/Patch provenance, finding closure, Waves, Final Review, and Freeze are connected |
| 5 | Cross-milestone consistency | PASS | Core, Business Brain, Commerce OS, and external owners remain unchanged |
| 6 | Governance compliance | PASS | canonical ownership, explicit context, immutable Assets, projection boundaries, Audit, ADR discipline, and change control are preserved |
| 7 | Genesis compliance | PASS | Marketplace purpose, categories, lifecycle, scoped state, Review, Security, intelligence, and ecosystem meaning are preserved |
| 8 | Core Platform compliance | PASS | Core identity, organization, commercial, Product Hub, Permission, shared-service, and lifecycle ownership remains intact |
| 9 | Business Brain compliance | PASS | Decision and candidate reasoning remain Business Brain-owned; Recommendation remains externally owned |
| 10 | Commerce OS compliance | PASS | Commerce facts, configuration, authorization, and operations remain Commerce-owned and independent |
| 11 | Marketplace internal consistency | PASS | Proposal corrections, Waves, Final Review, and Freeze use one merged baseline interpretation |
| 12 | Canonical ownership completeness | PASS | 23 canonical facts have one owner each |
| 13 | Domain completeness | PASS | 12 non-overlapping logical Domains cover the frozen boundary |
| 14 | Capability completeness | PASS | 24 Capabilities each have one accountable Domain |
| 15 | Aggregate completeness | PASS | 18 aggregate candidates each have one owner and explicit exclusions |
| 16 | Lifecycle completeness | PASS | shared, assurance, commercial, distribution, scoped, and governance lifecycle owners are explicit |
| 17 | Deferred Decision preservation | PASS | DD-MP-01 through DD-MP-50 remain unresolved and unchanged |
| 18 | ADR dependency completeness | PASS | 32 Accepted dependencies and 14 Draft subjects are explicitly classified |
| 19 | Security readiness | PASS WITH GOVERNED GATES | frozen trust boundary and invariants are complete; detailed DD-MP-47/DD-MP-49/DD-MP-50 policy remains gated |
| 20 | Privacy readiness | PASS WITH GOVERNED GATES | purpose, minimization, isolation, and scope are frozen; DD-MP-48 details remain gated |
| 21 | Audit readiness | PASS WITH GOVERNED GATES | Core Audit ownership and Marketplace evidence boundary are frozen; DD-MP-50 detail remains gated |
| 22 | Operational readiness | PASS WITH GOVERNED GATES | projection ownership and failure isolation are frozen; service/recovery/continuity detail remains DD-MP-50 |
| 23 | Implementation readiness | PASS | logical implementation may begin within Freeze and applicable DD gates |
| 24 | Future milestone readiness | PASS | future OS, AI Expert, partner, and global work can extend through frozen owner-preserving boundaries |

**Required validation result: PASS**

### 2.3 Conflict verification

| Verification | Unresolved count | Result |
|---|---:|---|
| Blocking Issue | 0 | PASS |
| missing authoritative document | 0 | PASS |
| ownership conflict | 0 | PASS |
| canonical fact conflict | 0 | PASS |
| canonical write-model conflict | 0 | PASS |
| aggregate conflict | 0 | PASS |
| lifecycle conflict | 0 | PASS |
| Domain overlap | 0 | PASS |
| Capability overlap | 0 | PASS |
| undocumented architectural decision | 0 | PASS |
| missing Freeze guarantee | 0 | PASS |
| missing change-control rule | 0 | PASS |
| implementation leakage | 0 | PASS |
| technology leakage | 0 | PASS |

### 2.4 Implementation readiness meaning

The baseline is ready to guide implementation of:

- the 12 frozen logical Domain boundaries;
- the 24 Capability accountability homes;
- the 23 canonical fact ownership boundaries;
- MWM-01 through MWM-18;
- the 18 aggregate invariant boundaries;
- shared Asset, immutable version, and scoped-state separation;
- Publisher, Review, Certification, Trust, Compatibility, Dependency, commercial, and scoped
  adoption responsibilities;
- projection participation without source ownership;
- Core, Business Brain, Commerce OS, Knowledge, Recommendation, Configuration, Product Hub, and
  AI owner boundaries; and
- Security, privacy, Audit, operational, and change-control invariants.

Implementation readiness does not authorize a physical design, API, Event, Contract, database,
deployment, infrastructure, framework, vendor, or cloud decision. Those decisions require their
own approved process where applicable.

### 2.5 Governed implementation gates

| Implementation subject | Applicable unresolved gate | Readiness rule |
|---|---|---|
| category-specific Asset information, identity, and version behavior | DD-MP-01–DD-MP-06 | Implement only frozen universal invariants until detail is approved |
| Publisher onboarding and third-party participation | DD-MP-07–DD-MP-12 | Do not launch unapproved participation or authority models |
| Review, Certification, Trust, and Governance detail | DD-MP-13–DD-MP-20 | Preserve frozen separation; approve detailed policy first |
| Compatibility and dependencies | DD-MP-21–DD-MP-27 | Do not infer ranges, cycles, acquisition, consent, or propagation behavior |
| License, Offer, Purchase, Entitlement, and Distribution policy | DD-MP-28–DD-MP-36 | Preserve owner separation; approve commercial/legal behavior first |
| Installation, Activation, Applicability, upgrade, removal, and recovery | DD-MP-37–DD-MP-43 | Do not infer lifecycle vocabulary or recovery behavior |
| Search, Recommendation, Analytics, Security, privacy, Audit, and operations detail | DD-MP-44–DD-MP-50 | Preserve frozen ownership and approve policy before affected production use |

The gates constrain affected work; they do not invalidate the complete frozen ownership model.

## 3. Completeness Assessment

### 3.1 Frozen baseline manifest

| # | Authoritative artifact | Lifecycle role | Validation |
|---:|---|---|---|
| 1 | `docs/05-marketplace/00-MARKETPLACE-DISCOVERY.md` | Discovery | PASS |
| 2 | `docs/05-marketplace/01-MARKETPLACE-CAPABILITY-MAP.md` | Capability Map | PASS |
| 3 | `docs/05-marketplace/02-MARKETPLACE-PROPOSAL.md` | Proposal v0.1 provenance | PASS |
| 4 | `docs/05-marketplace/03-MARKETPLACE-ARCHITECTURE-REVIEW.md` | Independent Proposal Review | PASS |
| 5 | `docs/05-marketplace/04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md` | approved alignment corrections | PASS |
| 6 | `docs/05-marketplace/05-MARKETPLACE-RE-REVIEW.md` | Proposal Baseline v0.1.1 approval | PASS |
| 7 | `docs/05-marketplace/06-MARKETPLACE-WAVE-1.md` | terminology and traceability | PASS |
| 8 | `docs/05-marketplace/07-MARKETPLACE-WAVE-2.md` | cross-milestone and ownership navigation | PASS |
| 9 | `docs/05-marketplace/08-MARKETPLACE-WAVE-3.md` | completeness and review readiness | PASS |
| 10 | `docs/05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md` | final Architecture Quality Gate | PASS |
| 11 | `docs/99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md` | authoritative Architecture v1.0 Freeze | PASS |

No authoritative Marketplace milestone artifact is missing.

**Frozen baseline manifest result: PASS**

### 3.2 Milestone lifecycle completion

| Milestone phase | Required outcome | Evidence | Result |
|---|---|---|---|
| Discovery | problem space and exclusions understood | approved Discovery | PASS |
| Capability Map | logical responsibility collaboration understood | approved Capability Map | PASS |
| Proposal | complete logical architecture proposed | Proposal v0.1 | PASS |
| Proposal Architecture Review | independent findings recorded | Architecture Review | PASS |
| Freeze Alignment Patch | accepted findings corrected without redesign | Patch v0.1.1 | PASS |
| Re-Review | merged Proposal Baseline approved | APPROVED WITH EDITORIAL NOTES | PASS |
| Documentation Wave 1 | terminology, editorial, and baseline traceability complete | approved Wave 1 | PASS |
| Documentation Wave 2 | cross-milestone and ownership navigation complete | approved Wave 2 | PASS |
| Documentation Wave 3 | completeness and review-readiness validation complete | approved Wave 3 | PASS |
| Final Architecture Review | complete milestone approved for Freeze | APPROVED FOR FREEZE | PASS |
| Freeze | Architecture v1.0 declared authoritative | Marketplace Freeze v1.0 | PASS |
| Readiness Validation | implementation and milestone readiness determined | this document | PASS |

No phase silently redesigned or overrode an approved predecessor.

### 3.3 Architecture and Freeze completeness

| Frozen area | Frozen record | Completeness |
|---|---|---|
| scope and non-scope | Freeze sections 3–4 | COMPLETE |
| architectural principles | Freeze section 5 | COMPLETE |
| 12 Domains and guarantees | Freeze section 6 | COMPLETE |
| 24 Capabilities and accountable homes | Freeze section 7 | COMPLETE |
| 23 canonical facts | Freeze section 8.1 | COMPLETE |
| 18 canonical write models | Freeze section 8.2 | COMPLETE |
| 18 aggregate candidates | Freeze section 8.3 | COMPLETE |
| non-canonical projections | Freeze section 8.4 | COMPLETE |
| lifecycle ownership | Freeze section 9 | COMPLETE |
| Asset, version, Publisher, assurance, compatibility, dependency, commercial, and scoped models | Freeze section 10 | COMPLETE |
| Search, Recommendation, Analytics, Security, privacy, Audit, and operations | Freeze section 11 | COMPLETE |
| external owner boundaries | Freeze section 12 | COMPLETE |
| Asset-family boundaries | Freeze section 13 | COMPLETE |
| cross-milestone dependencies | Freeze section 14 | COMPLETE |
| 22 explicit architecture and Freeze guarantees | Freeze section 15 | COMPLETE |
| explicit exclusions | Freeze section 16 | COMPLETE |
| 50 Deferred Decisions | Freeze section 17 | COMPLETE |
| six remaining risk groups | Freeze section 18 | COMPLETE |
| 32 Accepted ADR dependencies and 14 Draft subjects | Freeze section 19 | COMPLETE |
| change-control rules | Freeze section 20 | COMPLETE |
| Freeze validation and declaration | Freeze sections 21–22 | COMPLETE |

### 3.4 Ownership completeness

| Ownership layer | Frozen count | Completeness result |
|---|---:|---|
| canonical facts | 23 | every fact has one owner |
| canonical write models | 18 | every write model has one owner |
| aggregate candidates | 18 | every aggregate has one owner |
| Domain accountability homes | 12 | every Domain has a non-overlapping responsibility |
| Capability accountability assignments | 24 | every Capability has one accountable Domain |
| projection-only Domains | 2 | MPD-10 and MPD-12 have no canonical writer or aggregate |
| external owner boundaries | complete owner matrix | no Marketplace ownership transfer |

No shared, hidden, duplicated, missing, or circular canonical ownership remains.

### 3.5 Lifecycle completeness

The Freeze identifies exactly one owner for Asset identity, Asset Version, Marketplace Review,
Certification, Compatibility Assessment, Dependency Declaration, License, Offer, Purchase,
Marketplace Entitlement, Distribution Availability, Version Selection, Installation, Scoped
Configuration, Activation, Applicability, upgrade/removal coordination, and Governance Action.

Detailed lifecycle policy remains deferred where declared. Deferral of state vocabulary or
operational mechanics is not a missing lifecycle owner.

### 3.6 Traceability completeness

Traceability is complete from:

- Governance and Genesis;
- upstream frozen milestones;
- Discovery candidates and Open Questions;
- Capability Map flows;
- Proposal decisions;
- Architecture Review findings;
- PP-01 through PP-10;
- Re-Review closure;
- Documentation Waves 1–3;
- Final Architecture Review; and
- Marketplace Freeze v1.0.

All required Markdown references in the frozen Marketplace artifact chain resolve to existing
documents. No required reference or authoritative artifact is missing.

## 4. Governance Assessment

### 4.1 Governance compliance

**Result: PASS**

Marketplace Architecture v1.0 preserves:

- Domain First and canonical ownership;
- one source of truth and one writer per canonical model;
- explicit Workspace and applicable Business/resource context;
- tenant isolation, least privilege, and human control;
- shared immutable Published Assets and separate scoped state;
- target-owner validation and optional OS integration;
- projection-is-never-ownership rules;
- append-only Core Audit ownership;
- technology-independent boundary evolution;
- Accepted/Draft ADR separation; and
- approved milestone and Freeze change control.

### 4.2 ADR dependency readiness

| ADR validation | Result |
|---|---:|
| directly applicable Accepted ADR dependencies represented | 32 |
| Accepted ADRs created by Marketplace | 0 |
| Accepted ADRs modified by Marketplace | 0 |
| Accepted ADRs contradicted by Marketplace | 0 |
| PP-07 normalized dependency mappings | 6 |
| retained Draft Marketplace subjects | 14 |
| Draft subjects represented as Accepted | 0 |
| ADRs created by Readiness Validation | 0 |

The 14 Draft subjects reserve no Governance number and carry no authority outside the Freeze.
Future disposition must follow Governance. This validation does not promote, reject, merge, or
rename them.

### 4.3 Deferred Decision readiness

All 50 Deferred Decisions remain explicit, grouped, unresolved, and subject to change control.
They do not hide ownership. DD-MP-14 preserves detailed Review policy while all six Genesis
Review dimensions remain mandatory under the frozen Patch correction.

**Deferred Decisions silently resolved: 0**

### 4.4 Change-control readiness

The Freeze requires:

```text
Proposed change
  -> ADR or approved decision process
  -> independent Architecture Review
  -> Patch when documentation alignment only is authorized
  -> updated Freeze
  -> Readiness validation
```

Changes to a Domain, Capability, owner, fact, write model, aggregate, lifecycle, invariant,
external boundary, Asset category, or compatibility guarantee cannot be made through
implementation or editorial documentation.

**Missing change-control rules: 0**

### 4.5 Security, privacy, Audit, and operations readiness

| Area | Frozen readiness | Intentionally gated detail | Result |
|---|---|---|---|
| Security | explicit context, isolation, least privilege, declaration/grant separation, untrusted-input treatment, target reauthorization, fail-closed behavior | Permission catalog and administration DD-MP-47; executable controls DD-MP-49; incident detail DD-MP-50 | READY WITH GOVERNED GATES |
| Privacy | purpose limitation, minimization, source references, same-or-narrower scope, restricted disclosure | classification, consent, residency, retention, erasure, export, masking, legal hold DD-MP-48 | READY WITH GOVERNED GATES |
| Audit | Core owns append-only Audit Records; Marketplace submits attributable evidence | evidence detail, retention and operational correlation DD-MP-50 | READY WITH GOVERNED GATES |
| Operations | MPD-12 projection-only, failure isolation, no hidden support/incident writer | service objectives, recovery, continuity, support, incident, capacity, global operations DD-MP-50 | READY WITH GOVERNED GATES |

The frozen logical responsibilities are ready for implementation. Affected production behavior
must wait for the listed policy gates.

## 5. Cross-Milestone Assessment

### 5.1 Genesis compliance

**Result: PASS**

Marketplace v1.0 preserves Genesis Marketplace purpose, the ten top-level Asset categories,
Published-version immutability, Workspace-scoped Purchase/Installation/Activation, selected-
Business Applicability, six mandatory Review dimensions, Permission isolation, Business Brain
integration, and partner ecosystem boundaries.

No Genesis term, owner, lifecycle, or principle is redefined.

### 5.2 Core Platform compliance

**Result: PASS**

Core retains identity, Authentication, Membership, organization, Product Hub, Workspace
Entitlement, OS Product/Plan/Subscription, financial truth, canonical Permission grants, Audit,
Notification, Search, Analytics, Security, navigation, and shared operational foundations.

Marketplace remains a bounded context in Core and owns its governed surface and Marketplace
facts only. Marketplace state never substitutes for Core commercial or OS lifecycle state.

### 5.3 Business Brain compliance

**Result: PASS**

Business Brain retains completed Decision and candidate reasoning. Recommendation Engine retains
Recommendation; Core intelligence mapping retains Implementation Option mapping. Marketplace
supplies eligible Asset and governed outcome context only and never contributes to canonical
Decision formation.

### 5.4 Commerce OS compliance

**Result: PASS**

Commerce OS retains Commerce facts, write models, aggregates, target configuration,
authorization, workflows, navigation, reports, dashboards, and operational lifecycle. Commerce
independently validates optional Marketplace Asset effects, and Marketplace failure cannot block
Commerce Core.

### 5.5 Knowledge, Capability, Configuration, AI, and future OS compliance

| Owner | Frozen responsibility retained | Marketplace readiness relationship |
|---|---|---|
| Knowledge Engine | Knowledge and Knowledge Pack content/use | Marketplace may distribute a referencing representation |
| Capability Registry | Capability identity, meaning, dependencies, applicability, lifecycle | Capability Packs reference without redefining |
| Rules owner | deterministic Rule definitions | Automation Packs reference without owning Rules |
| Configuration Engine | Configuration Proposal | Marketplace never proposes or applies target configuration |
| AI Coordinator | Expert eligibility/selection, coordination, providers/models, AI artifacts | active/applicable Expert definition is eligibility context only |
| future Operating System | setup, Permission semantics, target configuration, workflows, navigation, operational data | Marketplace integration remains optional and target-validated |

**Cross-milestone ownership conflicts: 0**

### 5.6 Future milestone readiness

| Future work | Readiness | Frozen dependency |
|---|---|---|
| Marketplace implementation | READY | conform to all Marketplace v1.0 guarantees and applicable DD gates |
| future Operating Systems | READY | reuse optional, versioned, owner-preserving Asset relationships |
| Product Hub evolution | READY | compose and hand off without Marketplace writes |
| AI Expert Network | READY | use Marketplace distribution and AI Coordinator eligibility boundaries |
| partner ecosystem expansion | READY WITH GOVERNED GATES | DD-MP-07–DD-MP-12 and DD-MP-47–DD-MP-50 before rollout |
| Global Platform | READY WITH GOVERNED GATES | country, privacy, commercial, support, and operations decisions before affected rollout |

Future milestone readiness means the integration boundary is stable. It does not pre-approve the
deferred policies named above.

## 6. Remaining Risks

The six risk groups recorded by the Final Architecture Review and Freeze remain non-blocking for
architecture implementation readiness. They constrain affected work and production rollout.

| ID | Remaining risk | Readiness effect | Required handling |
|---|---|---|---|
| MR-01 | broad deferred-policy surface | Non-blocking for baseline; affected implementation is gated | resolve the applicable DD before dependent work |
| MR-02 | third-party and executable Asset Security | Non-blocking because rollout is not approved implicitly | approve entry, isolation, supply-chain, vulnerability, and incident policy |
| MR-03 | Compatibility and dependency complexity | Non-blocking because owners and validation boundaries are fixed | approve semantics, conflicts, consent, and propagation before affected behavior |
| MR-04 | Installation, upgrade, removal, and recovery behavior | Non-blocking because MPD-09 and immutable history are fixed | approve states, idempotency, retry, timeout, rollback, cleanup, and recovery |
| MR-05 | Publisher, assurance, commercial, and legal policy | Non-blocking because responsibilities remain separate | approve participation, Review, Certification, License, Offer, billing, and Distribution policy |
| MR-06 | discovery, intelligence, privacy, Analytics, and global operations | Non-blocking because projections and external owners are fixed | approve ranking, feedback, measures, privacy, service, continuity, and global policy |

### 6.1 Risk validation

- Remaining risk groups: **6**
- Blocking architecture contradictions represented by those risks: **0**
- Risks that silently transfer ownership: **0**
- Deferred Decisions silently resolved: **0**
- Risk-driven exceptions to Freeze guarantees: **0**

## 7. Readiness Verdict

### 7.1 Milestone exit criteria

| Exit criterion | Evidence | Result |
|---|---|---|
| complete logical boundary approved | Marketplace Proposal Baseline v0.1.1 | PASS |
| independent final quality gate passed | Final verdict APPROVED FOR FREEZE | PASS |
| Documentation Waves complete and approved | Waves 1–3 | PASS |
| authoritative Freeze issued | Marketplace Architecture v1.0 Freeze | PASS |
| canonical ownership complete and conflict-free | Freeze sections 6–12 | PASS |
| Deferred Decisions explicit and preserved | DD-MP-01 through DD-MP-50 | PASS |
| ADR dependencies and Draft status explicit | 32 Accepted dependencies; 14 Draft subjects | PASS |
| external ownership and cross-milestone consistency preserved | section 5 | PASS |
| Security, privacy, Audit, and operations boundaries ready | section 4.5 | PASS WITH GOVERNED GATES |
| implementation baseline ready | section 2.4 | PASS |
| no blocking issue remains | Blocking Issues 0 | PASS |
| change control complete | Freeze section 20 | PASS |

### 7.2 Final readiness status

# READY FOR IMPLEMENTATION

Marketplace Architecture v1.0 and Marketplace Documentation Baseline v1.0 are frozen, complete
at the approved logical level, internally consistent, traceable, compliant with all governing
baselines, and free of blocking issues.

Future Marketplace work may begin on this baseline. Work touching a Deferred Decision must wait
for its governed resolution, and production rollout must satisfy the applicable Security,
privacy, commercial, operational, and global gates. These constraints preserve readiness; they do
not constitute missing architecture.

# MARKETPLACE MILESTONE COMPLETE

## References

### Authoritative Marketplace baseline

- [Marketplace Architecture v1.0 Freeze](MARKETPLACE-v1.0-FREEZE.md)

### Marketplace frozen provenance

- [Marketplace Discovery v0.1](../05-marketplace/00-MARKETPLACE-DISCOVERY.md)
- [Marketplace Capability Map v0.1](../05-marketplace/01-MARKETPLACE-CAPABILITY-MAP.md)
- [Marketplace Architecture Proposal v0.1](../05-marketplace/02-MARKETPLACE-PROPOSAL.md)
- [Marketplace Independent Architecture Review](../05-marketplace/03-MARKETPLACE-ARCHITECTURE-REVIEW.md)
- [Marketplace Proposal Patch v0.1.1](../05-marketplace/04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md)
- [Marketplace Independent Re-Review](../05-marketplace/05-MARKETPLACE-RE-REVIEW.md)
- [Marketplace Documentation Wave 1](../05-marketplace/06-MARKETPLACE-WAVE-1.md)
- [Marketplace Documentation Wave 2](../05-marketplace/07-MARKETPLACE-WAVE-2.md)
- [Marketplace Documentation Wave 3](../05-marketplace/08-MARKETPLACE-WAVE-3.md)
- [Marketplace Final Architecture Review](../05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md)

### Governance, Genesis, and upstream Freezes

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Architectural Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Core Platform Freeze v1.0](CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Business Brain Readiness](BUSINESS-BRAIN-READINESS.md)
- [Commerce OS Freeze v1.0](COMMERCE-OS-v1.0-FREEZE.md)
- [Commerce OS Readiness](COMMERCE-OS-READINESS.md)
