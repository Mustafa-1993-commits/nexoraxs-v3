# Core Platform Architecture Patch Plan v1.0.1

Version: 1.0.1  
Status: Proposed Documentation Patch Plan  
Baseline: Core Platform Architecture v1.0  
Patch type under review: Freeze-alignment correction  
Owner: Nexoraxs

---

## 1. Purpose

This document records the official patch plan for two contradictions detected while preparing Milestone 2.

It does not resolve either contradiction, modify an approved decision, rewrite a frozen document, or authorize Business Brain documentation. It identifies the conflicting text, evaluates its impact, and recommends the correction that would restore consistency with the frozen Core Platform Architecture v1.0 baseline.

## 2. Review Basis

The review uses the following frozen authorities:

- Genesis v1.1;
- Governance Foundation and accepted ADRs;
- approved Core Platform Architecture Proposal v0.2;
- Core Platform Principles;
- approved Core Platform Waves 1–4;
- approved Core Platform Architecture Review; and
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`.

The freeze requires canonical terminology, one approved meaning per concept, backward-compatible contracts, and formal change control for architectural changes.

## 3. Contradiction 1 — Business Architect Component Names and Coverage

### 3.1 Source document

Primary frozen source:

- `docs/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md`, section **Business Architect Pipeline**, component table.

Confirmed by:

- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`, section **3.1 Internal components**.

The frozen component set is:

1. Session Orchestrator;
2. Context Resolver;
3. Evidence Collector;
4. Inference Service;
5. Question Planner;
6. Conversation Adapter;
7. Answer Normalizer;
8. Provenance Registry;
9. DNA Assembler and Validator;
10. Review Checkpoint;
11. DNA Publisher;
12. Analysis Trigger; and
13. Pipeline State Store.

### 3.2 Conflicting document

- `docs/02-core-platform/12-CORE-PLATFORM-ROADMAP.md`, Phase 2, section **6.2 Deliverables**.

The conflicting statement lists:

> Business Architect components: Session Orchestrator, Context Collector, Inference Engine, Question Planner, Answer Interpreter, Confidence and Conflict Evaluator, Human Review Gate, and DNA Publisher.

### 3.3 Exact conflicting concept

The roadmap presents a different Business Architect component set and introduces names that are not the frozen canonical component names:

| Roadmap term | Frozen architecture conflict |
|---|---|
| Context Collector | Frozen component is **Context Resolver**. **Evidence Collector** is a separate component. |
| Inference Engine | Frozen component is **Inference Service**. |
| Answer Interpreter | Frozen component is **Answer Normalizer**. |
| Confidence and Conflict Evaluator | No component with this canonical name exists in the frozen Business Architect Pipeline. Confidence, evidence, assumptions, validation, conflicts, and review are distributed across approved components. |
| Human Review Gate | Frozen component is **Review Checkpoint**. |

The roadmap list also omits the explicit frozen names **Evidence Collector**, **Conversation Adapter**, **Provenance Registry**, **DNA Assembler and Validator**, **Analysis Trigger**, and **Pipeline State Store**.

The contradiction is not that a roadmap must repeat every internal component. The contradiction is that the roadmap labels a renamed and partial list as “Business Architect components,” creating a competing canonical decomposition inside the frozen document set.

### 3.4 Root cause

Wave 4 summarized the Phase 2 deliverable using generalized functional labels instead of referencing the already frozen Business Architect Pipeline decomposition. The summary unintentionally renamed established concepts and made an incomplete milestone list appear to be an alternative component architecture.

No accepted ADR supersedes the Proposal or Wave 1 component names. No Architecture Review approved a replacement decomposition.

### 3.5 Recommended correction

For the future patch execution, choose one documentation-only alignment approach:

1. replace the roadmap's renamed list with the exact frozen component names from the approved Proposal and Wave 1; or
2. replace the component enumeration with a direct reference to the frozen Business Architect Pipeline decomposition, without defining another list.

The first approach provides stronger roadmap traceability. The second avoids duplicating a detailed component list in a roadmap. Either approach must preserve all thirteen frozen component names and responsibilities in the authoritative architecture.

This patch plan does not select or apply either editorial form.

### 3.6 Impact assessment

| Impact area | Assessment |
|---|---|
| Architecture | The approved architecture remains clear in the Proposal and Wave 1; no architecture redesign is required. |
| Terminology | High documentation impact because implementers may treat the Wave 4 names as canonical. |
| Ownership | No ownership transfer has occurred, but renamed components obscure responsibility allocation. |
| Traceability | The Roadmap cannot be traced cleanly to the Proposal, Wave 1, Glossary, or future component specifications. |
| Implementation | Teams could create duplicate components, omit required pipeline responsibilities, or use incompatible names in contracts and code. |
| Compatibility | Restoring the canonical names changes no approved contract or domain behavior. |
| Milestone 2 | Business Brain planning should remain paused until the frozen roadmap is aligned or the authority of its conflicting wording is formally clarified. |

### 3.7 Correction classification

**Documentation only**

The frozen architecture is unambiguous in the approved Proposal and Wave 1. The recommended correction removes an unauthorized restatement; it does not change the Business Architect architecture.

If the Wave 4 names were intended as a replacement decomposition, that intent would be an architectural change and would require a new ADR, Architecture Review, and updated Freeze. No evidence of such approval exists, so replacement is not the recommended patch.

## 4. Contradiction 2 — Implementation Option Definition

### 4.1 Source document

Primary frozen source:

- `docs/00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md`.

Canonical definition:

> Every Recommendation identifies a business improvement and Capability need before mapping an Operating System, Plan, or Marketplace Asset as an Implementation Option.

Confirmed by:

- `docs/00-governance/glossary/GLOSSARY.md`, concept **Implementation Option**;
- `docs/01-genesis/06-BUSINESS-BRAIN.md`;
- `docs/01-genesis/07-RECOMMENDATION-ENGINE.md`; and
- `docs/02-core-platform/03-DOMAIN-MODEL.md`, concept **Implementation Option**.

The frozen canonical concept is a mapped **Operating System**, **Plan**, or **Marketplace Asset** capable of implementing a recommended business improvement or Capability.

### 4.2 Conflicting document

- `docs/02-core-platform/12-CORE-PLATFORM-ROADMAP.md`, Phase 2, section **6.2 Deliverables**.

The conflicting statement says:

> Implementation Options that map a need to Nexoraxs, Marketplace, Integration, External, or Manual approaches without forcing product selection.

### 4.3 Exact conflicting concept

The roadmap replaces the canonical Implementation Option targets with a different and broader taxonomy:

| Frozen Implementation Option target | Conflicting roadmap target |
|---|---|
| Operating System | Nexoraxs |
| Plan | Not represented explicitly |
| Marketplace Asset | Marketplace |
| No approved equivalent | Integration |
| No approved equivalent | External |
| No approved equivalent | Manual |

The words **Nexoraxs**, **Marketplace**, **Integration**, **External**, and **Manual** are not approved synonyms for the canonical Implementation Option targets. The roadmap therefore changes the meaning and potential domain model of Implementation Option instead of merely summarizing it.

### 4.4 Root cause

Wave 4 appears to have introduced a broader solution-approach taxonomy while describing the Business Brain phase. That taxonomy was not approved in Genesis, Governance, the Proposal, Principles, Waves 1–3, or the Architecture Review, and it was not introduced through an ADR.

The likely documentation cause is a conflation of:

- the business improvement and Capability that a Recommendation identifies;
- the approved OS, Plan, or Marketplace Asset mapped as an Implementation Option; and
- possible real-world approaches that are not part of the frozen Implementation Option model.

### 4.5 Recommended correction

For the future patch execution, restore the roadmap deliverable to the frozen canonical meaning:

- a Recommendation begins with a business improvement and Capability need; and
- an Implementation Option maps that need to an Operating System, Plan, or Marketplace Asset.

The corrected roadmap should reference the accepted definition in `ADR-013` and the Governance Glossary. It must not introduce synonyms or additional target categories.

This patch plan does not rewrite the roadmap or approve the proposed wording.

If **Integration**, **External**, or **Manual** approaches are desired as future canonical Implementation Option categories, they require separate architectural evaluation covering terminology, ownership, lifecycle, eligibility, APIs, Events, Product Hub presentation, Recommendation contracts, and compatibility. That expansion is outside a documentation patch.

### 4.6 Impact assessment

| Impact area | Assessment |
|---|---|
| Architecture | The accepted ADR and Glossary retain one clear definition; restoring that definition requires no redesign. |
| Domain model | High documentation risk because the conflicting taxonomy could lead to new unapproved variants and ownership rules. |
| Recommendation Engine | The conflict could alter the output contract and weaken the Capability-first sequence. |
| Product Hub | The conflict could make Product Hub resolve non-canonical option types for which no approved source owner or lifecycle exists. |
| Marketplace | “Marketplace” could be confused with the Marketplace bounded context rather than a canonical Marketplace Asset reference. |
| APIs and Events | Implementers could publish incompatible schemas or Event facts for unapproved option categories. |
| Compatibility | Removing the unapproved taxonomy restores compatibility with the accepted ADR, Glossary, Domain Model, and frozen contracts. |
| Milestone 2 | Business Brain proposal work should not choose or model Implementation Option categories until the frozen roadmap wording is aligned. |

### 4.7 Correction classification

**Documentation only**

The recommended correction restores the accepted architecture and removes an unapproved expansion from the Roadmap. It does not change the canonical Implementation Option concept.

Adopting the expanded taxonomy would instead be **Architectural** and would require the full change-control process. That is not the recommended v1.0.1 correction.

## 5. Patch Boundary

The proposed v1.0.1 patch is limited to two future documentation corrections in `docs/02-core-platform/12-CORE-PLATFORM-ROADMAP.md`:

1. align the Phase 2 Business Architect deliverable with the frozen Pipeline component names and coverage; and
2. align the Phase 2 Implementation Option deliverable with the accepted OS, Plan, or Marketplace Asset definition.

The patch must not:

- change Genesis;
- amend accepted ADR decisions;
- change the Governance Glossary definition;
- redesign the Business Architect Pipeline;
- expand Implementation Option categories;
- change ownership, lifecycle, API, Event, Security, or deployment rules;
- generate Business Brain documentation; or
- imply that the patch is applied merely because this plan exists.

## 6. Patch Validation Plan

After a separately authorized patch is applied, validation should confirm:

1. the roadmap uses only canonical Business Architect component names or references the frozen decomposition directly;
2. no canonical Business Architect responsibility is replaced by a renamed component;
3. Implementation Option means only an Operating System, Plan, or Marketplace Asset;
4. Proposal, Governance, Glossary, Principles, Waves 1–4, Architecture Review, and Freeze contain no competing meaning for either concept;
5. all affected references and traceability links remain valid;
6. no architecture, ADR status, or ownership rule changed; and
7. Milestone 2 can restart from one unambiguous frozen baseline.

## 7. Change-Control Assessment

Because both recommended corrections restore already accepted architecture, they qualify as documentation-only errata. They do not require a major architecture version.

Patch execution should still be reviewed against the freeze because the conflicting Roadmap is itself a frozen document. The review should verify that the edits are strictly corrective and record the resulting v1.0.1 baseline. If review determines that either conflicting statement expresses intended new architecture, this patch plan must not be used to apply it; the proposed change must instead follow ADR, Architecture Review, and updated Freeze controls.

## 8. Recommendation

| Result | Count |
|---|---:|
| Documentation fixes | **2** |
| Architectural fixes | **0** |

**Recommendation: Patch v1.0.1**

## Patch Authority

### Reason

This patch restores documentation consistency with the approved Core Platform Architecture v1.0 baseline.

### Authority

- Approved Core Platform Freeze
- Approved Proposal
- Governance Foundation
- Accepted ADRs

### Classification

Freeze Alignment Patch

### Architecture Impact

None

### ADR Impact

None

### Backward Compatibility

Fully Compatible

### Version Impact

Architecture remains v1.0.

Documentation baseline becomes v1.0.1.

### Change Control

Any modification beyond this alignment requires:

- ADR
- Architecture Review
- Updated Freeze
