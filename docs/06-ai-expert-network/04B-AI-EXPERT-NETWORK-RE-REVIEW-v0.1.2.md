# AI Expert Network Proposal Baseline v0.1.2 — Independent Re-Review

**Milestone:** AI Expert Network  
**Artifact type:** Independent Architecture Re-Review  
**Baseline reviewed:** Proposal Baseline v0.1.2  
**Review status:** Complete  
**Architecture stability:** Stable  
**Final verdict:** APPROVED FOR DOCUMENTATION WAVES

---

## 1. Executive Summary

This Re-Review evaluates the following three documents as one precedence-ordered architectural
baseline:

1. `02-AI-EXPERT-NETWORK-PROPOSAL.md`;
2. `03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md`; and
3. `03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md`.

Patch v0.1.2 supersedes only the Registry-only ownership, version, aggregate, Draft ADR, and
dependent validation statements identified by its explicit precedence rules. Proposal v0.1
continues to control the architecture otherwise, and compatible clarifications from Patch v0.1.1
remain part of the merged baseline.

The merged baseline restores the publication-path model already frozen by Governance and Core
Platform:

- Core-held AI Expert Definitions and versions are canonically owned by the Core AI Coordinator
  Expert Registry;
- Marketplace-published AI Expert Definitions and versions are canonically owned by Marketplace
  through the exact Marketplace Asset Version; and
- for that Marketplace path, Expert Registry owns only registration, eligibility, compatibility,
  and coordination metadata plus the exact Marketplace version reference.

F-AEN-RR-01 and F-AEN-RR-02 are fully resolved. The conclusions of the Conflict Analysis are
satisfied. No duplicated owner, duplicate write model, aggregate leakage, hidden redesign, new
Domain, new Capability, new ADR, or new Deferred Decision remains in Proposal Baseline v0.1.2.

| Review measure | Result |
|---|---|
| F-AEN-RR-01 | RESOLVED |
| F-AEN-RR-02 | RESOLVED |
| Remaining findings | 0 |
| Logical Responsibility Domains | 6, unchanged |
| Approved Capabilities | 18, unchanged |
| Canonical AI write models | 2, unchanged |
| Deferred Decisions | 24, unchanged |
| Draft ADR candidates | 12, unchanged and Draft |
| Existing Proposal risks | 20, unchanged and non-blocking |
| New architecture decisions | 0 |
| Architecture stability | STABLE |

## 2. Resolution Verification

### 2.1 Baseline precedence

The three-document baseline has an explicit and usable precedence rule. Patch v0.1.2 supersedes
Patch v0.1.1 only where v0.1.1 asserted or depended upon:

- Registry-only ownership of every AI Expert Definition;
- Registry-only ownership of every AI Expert Definition Version;
- a mandatory separate Registry-owned Definition Version behind Marketplace publication;
- placement of all canonical Definition content in Expert Registry Registration;
- Registry-only normalization of `DADR-AEN-03`; or
- validation claims derived from those superseded statements.

No other Proposal decision is displaced. This makes the merged baseline deterministic without
rewriting or erasing its quality-gate history.

### 2.2 F-AEN-RR-01 — canonical ownership

| Validation | Evidence in merged baseline | Result |
|---|---|---|
| Core-held Definition has one owner | AI Coordinator Expert Registry owns identity, content, version, lineage, registration metadata, and Core-held Definition Lifecycle | PASS |
| Marketplace-published Definition has one owner | Marketplace owns the published Definition content through the exact Marketplace Asset Version | PASS |
| Ownership is mutually exclusive | Publication path selects one owner for each Definition instance and version | PASS |
| Publication does not transfer historical Core ownership | A separately published Marketplace version has explicit lineage and does not rewrite the historical Core-held version | PASS |
| Registry does not duplicate Marketplace content | Marketplace path retains Coordinator metadata and an exact external version reference only | PASS |
| Governance and frozen Core wording is restored | Owner is Core or Marketplace according to publication | PASS |

**Resolution:** F-AEN-RR-01 is fully resolved.

### 2.3 F-AEN-RR-02 — version relationship and aggregate allocation

| Validation | Evidence in merged baseline | Result |
|---|---|---|
| Core-held version ownership | Core AI Coordinator Expert Registry owns the immutable Core-held Definition Version | PASS |
| Marketplace-published version ownership | Exact Marketplace Asset Version is the canonical Marketplace-published Definition Version | PASS |
| No mandatory paired Registry version | Registry revision is Coordinator metadata and never a second Marketplace-path Definition Version | PASS |
| Exact selection reference | AI Interaction preserves the exact selected canonical Definition version and its source | PASS |
| Marketplace aggregate placement | Marketplace-published Definition content remains inside Marketplace Asset / Marketplace Asset Version | PASS |
| Registry aggregate placement | Marketplace path contains registration and Coordinator metadata plus exact reference, not Marketplace content | PASS |
| No hidden aggregate | Both path-specific Registry rows describe one approved aggregate with different content rules | PASS |

**Resolution:** F-AEN-RR-02 is fully resolved.

### 2.4 Conflict Analysis conclusions

| Conflict Analysis conclusion | Baseline v0.1.2 result |
|---|---|
| Proposal v0.1 was consistent with the frozen architecture | Preserved |
| Patch v0.1.1 introduced the two conflicts | Conflicting meanings are explicitly superseded |
| Core Platform remains authoritative | Satisfied |
| Governance remains authoritative | Satisfied |
| Marketplace Freeze remains authoritative | Satisfied |
| Proposal was the artifact class requiring correction | Corrective Patch v0.1.2 applies the correction only there |
| Core Platform or Governance change was unnecessary | Neither was changed or reinterpreted |
| A Draft ADR was insufficient to override the freeze | `DADR-AEN-03` is restored to its original subject and remains Draft |

## 3. Ownership Verification

### 3.1 Canonical ownership and facts

| Canonical subject | Sole owner in Baseline v0.1.2 | Verification |
|---|---|---|
| Core-held AI Expert Definition and Definition Version | Core AI Coordinator Expert Registry | PASS |
| Marketplace-published AI Expert Definition and Definition Version | Marketplace through the exact Marketplace Asset Version | PASS |
| Expert Registry registration and Coordinator metadata | Core AI Coordinator Expert Registry | PASS |
| Marketplace Publisher, Asset, Asset Version, Review, Certification, Trust, Compatibility, Dependency, commercial, Distribution, and scoped lifecycle facts | Applicable frozen Marketplace owner | PASS |
| Authorization Context and Permission grant | Core Identity and Access | PASS |
| Business DNA | Business DNA owner | PASS |
| Knowledge and Knowledge Pack content | Knowledge Engine | PASS |
| Rule and Rule outcome | Applicable Rules owner | PASS |
| Capability | Capability Registry | PASS |
| Completed Decision and candidate reasoning | Business Brain | PASS |
| Recommendation and disposition | Recommendation Engine | PASS |
| Configuration Proposal | Configuration Engine | PASS |
| AI Interaction, eligibility, selection, Expert Contribution, collaboration, assurance, unified response, final confidence, AI Action Proposal, and governed evaluation observation | Core AI Coordinator | PASS |
| Target configuration and operational fact | Applicable Core or Operating System owner | PASS |
| Audit Record | Core Audit Service | PASS |

References and projections do not transfer ownership. No row introduces simultaneous canonical
writers, and no external fact becomes an AI-owned fact through consumption, observation, or
explanation.

### 3.2 Canonical write models

| Write model | Sole owner | Permitted writes | Excluded writes | Result |
|---|---|---|---|---|
| `AEN-WM-01` — Expert Registry write model | Core AI Coordinator | Core-held Definition/version; registration; Coordinator metadata; Core-held lifecycle; exact Marketplace version reference | Marketplace-published content or scoped state | PASS |
| `AEN-WM-02` — AI coordination write model | Core AI Coordinator | AI Interaction and AI-owned eligibility, selection, contribution, collaboration, assurance, response, proposal, and observation artifacts | canonical source facts or target effects | PASS |

Marketplace write models remain Marketplace-owned. Decision, Recommendation, Configuration
Proposal, target facts, and Audit Record retain their frozen external writers. The approved count
remains two AI write models, with no hidden third writer.

### 3.3 Aggregate ownership

| Aggregate | Sole owner | Baseline v0.1.2 boundary | Result |
|---|---|---|---|
| Expert Registry Registration | Core AI Coordinator Expert Registry | Core-held content for the Core path; metadata and exact Marketplace reference only for the Marketplace path | PASS |
| Marketplace Asset / Marketplace Asset Version | Marketplace | Marketplace-published Definition content, version, representation, declarations, provenance, and Marketplace lifecycle facts | PASS |
| AI Interaction | Core AI Coordinator | selected versions, eligibility, contributions, collaboration, validation, response, proposal, and governed observations | PASS |
| Audit Record | Core Audit Service | append-only consequential history | PASS |

Expert Contribution, eligibility evaluation, selection, collaboration lineage, assurance finding,
and feedback observation remain children of AI Interaction rather than concealed aggregate roots.
Cross-aggregate references do not create write authority.

### 3.4 Logical Responsibility Domains

The six approved AEND-01 through AEND-06 areas remain Logical Responsibility Domains inside the
already-frozen AI Coordination Domain. They are not bounded contexts, services, deployment units,
ownership Domains, independent aggregates, or new runtime authorities. Their clarification does
not move ownership from Core AI Coordinator or any external owner.

### 3.5 Lifecycle separation

| Lifecycle concern | Owner or controlling boundary | Result |
|---|---|---|
| Core-held Definition Lifecycle | Core AI Coordinator Expert Registry | PASS |
| Marketplace-published Definition and Marketplace lifecycles | Marketplace | PASS |
| Eligibility Lifecycle | Core AI Coordinator | PASS |
| Interaction Lifecycle | Core AI Coordinator | PASS |
| Provider Lifecycle | Existing deferred external boundary | PASS |

There is no unified Expert Lifecycle and no lifecycle-spanning aggregate. Review, Certification,
licensing, purchase, entitlement, Distribution, Installation, Activation, Applicability, upgrade,
removal, and Governance lifecycles remain independently Marketplace-owned as frozen.

### 3.6 Evaluation boundary

AEND-06 remains limited to governed evaluation observations within AI Coordinator. It does not own
Marketplace Trust, Business Outcomes, Knowledge evolution, provider truth, customer feedback
source truth, Business DNA, Rules, Capabilities, Decisions, Recommendations, Configuration
Proposals, target state, or Audit Records. Only the canonical owner may accept or apply a change
arising from an observation.

## 4. Cross-Milestone Verification

| Authority or milestone | Verification focus | Result |
|---|---|---|
| Governance Glossary | Core-or-Marketplace Definition ownership according to publication; Expert Registry boundary | PASS |
| Governance Milestone Lifecycle | corrective Patch and independent Re-Review preserve change-control order | PASS |
| Accepted ADRs | Marketplace boundary, immutable published assets, downstream AI, separated coordination, coordinated Experts, and governed learning remain intact | PASS |
| Genesis v1.1 | one coordinated AI Expert Network, Business-first context, governed Knowledge use, and platform ecosystem boundaries remain intact | PASS |
| Core Platform Domain Model | AI Expert Definition remains a versioned Core or Marketplace asset according to publication | PASS |
| Core Platform Data Ownership | source/write/version owner remains Expert Registry or Marketplace according to publication path | PASS |
| Core Platform Freeze | no Architecture Guarantee, owner, or accepted decision changed | PASS |
| Business Brain Freeze | Business Brain completes the canonical Decision before AI; AI owns only downstream artifacts | PASS |
| Commerce OS Freeze | Commerce remains independently usable and retains every operational fact and effect | PASS |
| Marketplace Freeze | Marketplace owns its Asset/version, Publisher, commercial, Distribution, Trust, and scoped lifecycle facts | PASS |
| Recommendation Engine | Recommendation creation and disposition remain outside AI Expert Network | PASS |
| Knowledge Engine | Knowledge content, version, applicability, and evolution remain outside AI Expert Network | PASS |
| Configuration Engine | Configuration Proposal remains separate from AI guidance and AI Action Proposal | PASS |

### 4.1 Marketplace representation and version boundary

`Marketplace AI Expert Asset` and `Marketplace AI Expert Asset Version` remain category-qualified
references to the frozen Marketplace Asset concepts, not new canonical types. For the
Marketplace-published path, the exact Marketplace Asset Version contains and owns the canonical
published Definition content. Marketplace Activation or Applicability never grants Permission,
determines interaction eligibility, selects an Expert, starts an AI Interaction, owns AI output,
or authorizes a target effect.

### 4.2 AI Coordinator boundary

AI Coordinator retains authorization resolution, minimum-context construction, policy and safety,
registration metadata, interaction eligibility, selection, provider/model coordination, bounded
execution, contribution, collaboration, validation, synthesis, AI response, final confidence, AI
Action Proposal, and governed observations. It does not obtain Marketplace publication authority,
Knowledge ownership, Recommendation ownership, Configuration ownership, Business Decision
ownership, or target write authority.

### 4.3 Deferred Decisions and ADR discipline

- `DD-AEN-01` through `DD-AEN-24` remain visible and unresolved.
- Inherited Core, Business Brain, Commerce OS, and Marketplace deferrals remain controlling.
- No Patch answers a deferred policy, implementation, runtime, provider, retention, or operating
  question.
- `DADR-AEN-01` through `DADR-AEN-12` remain Draft subjects only.
- `DADR-AEN-03` retains the original subject, **AI Expert Definition Publication-Path
  Ownership**.
- No Accepted ADR is reopened, modified, replaced, or created.

## 5. Remaining Findings

No remaining architectural finding was identified.

| Validation | Remaining finding count | Result |
|---|---:|---|
| Ownership ambiguity | 0 | PASS |
| Conditional ownership contradiction | 0 | PASS |
| Duplicate canonical owner | 0 | PASS |
| Duplicate canonical write model | 0 | PASS |
| Aggregate leakage or hidden aggregate | 0 | PASS |
| Marketplace ownership leakage | 0 | PASS |
| AI Coordinator ownership leakage | 0 | PASS |
| External milestone ownership leakage | 0 | PASS |
| Hidden architecture redesign | 0 | PASS |
| New Domain or Capability | 0 | PASS |
| New ADR or Deferred Decision | 0 | PASS |
| Implementation or technology leakage | 0 | PASS |

**Remaining Findings: 0**

## 6. Remaining Risks

The twenty risks already registered as `R-AEN-01` through `R-AEN-20` in Proposal v0.1 remain
unchanged and non-blocking. They cover ownership and terminology drift, version and eligibility
staleness, context and contribution isolation, orchestration and evidence failure, unsafe action
interpretation, opaque provider behavior, evaluation or telemetry becoming source truth,
third-party and operational Governance, and accidental Operating System dependency.

These risks remain controlled at architecture level by explicit owner boundaries, exact-version
references, fail-closed eligibility, minimum authorized context, contribution isolation, evidence
and confidence visibility, proposal-only consequential output, optional integration, and the
preserved Deferred Decision and ADR processes. Detailed policies intentionally remain deferred.

No new risk was introduced by Patch v0.1.2. The two conflict risks recorded by the v0.1.1
Re-Review are closed by the verified correction and are not remaining Baseline v0.1.2 findings.

| Risk register | Count | Status |
|---|---:|---|
| Existing Proposal risks | 20 | Preserved; non-blocking |
| New risks from Patch v0.1.2 | 0 | None |
| Remaining conflict findings | 0 | Resolved |

## 7. Architecture Stability

Proposal Baseline v0.1.2 is **STABLE**.

Stability is demonstrated by:

1. one canonical owner per Definition instance, version, fact, write model, aggregate, and
   lifecycle concern;
2. deterministic publication-path ownership without simultaneous or duplicated truth;
3. exact Marketplace version reference without Registry content duplication;
4. preservation of all frozen Marketplace, AI Coordinator, Business Brain, Recommendation,
   Knowledge, Configuration, Core, and Operating System boundaries;
5. preservation of six Logical Responsibility Domains and eighteen Capabilities;
6. preservation of all twenty-four Deferred Decisions and twelve Draft ADR candidates;
7. no new architecture, owner, Domain, Capability, write model, aggregate, lifecycle, ADR, or
   Deferred Decision; and
8. no implementation, API, Contract, Event, database, infrastructure, runtime, deployment,
   framework, vendor, or technology decision.

The baseline is sufficiently stable to be expanded into documentation without reopening Proposal
architecture. Documentation Waves must continue to apply the v0.1.2 precedence rule and must not
repeat the superseded Registry-only statements from Patch v0.1.1.

## 8. Recommendation

# APPROVED FOR DOCUMENTATION WAVES

Proposal Baseline v0.1.2 is internally consistent, satisfies the Conflict Analysis, and is aligned
with all frozen baselines. F-AEN-RR-01 and F-AEN-RR-02 are resolved, and no blocking or
non-blocking architecture finding remains from this Re-Review.

**Recommendation: READY FOR DOCUMENTATION WAVE 1**

## References

### Proposal Baseline v0.1.2

- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)
- [AI Expert Network Corrective Proposal Patch v0.1.2](03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md)

### Discovery and quality gates

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Re-Review for Baseline v0.1.1](04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Conflict Analysis](04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md)

### Governing authorities

- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)

### Directly relevant Accepted ADRs

- [ADR-027 — Marketplace Bounded Context Within Core](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separated Orchestration](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
