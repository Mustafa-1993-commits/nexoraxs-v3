# Core Platform Architecture v1.1 Source Manifest

**Version:** 1.0

**Status:** Approved — immutable-source inventory for Core Platform Architecture v1.1 Freeze input

**Owner:** NexoraXS Architecture Governance

**Authority:** Reproducibility evidence subordinate to the controlling Architecture Freezes and Accepted ADRs

**Predecessor:** Core Platform Architecture v1.0 frozen source set

**Successor relationship:** Proposed source basis for Core Platform Architecture v1.1; effective only through an approved successor Freeze

**Approval state:** Approved by Foundation Governance Approval v2.0; final Freeze records this manifest's final blob

**Repository snapshot inspected:** `8c860df6d9c8b6c07672ecb30e54cf2441776733`

---

## 1. Purpose

This manifest identifies the exact historical and proposal-state sources used to review the Core
Platform Foundation successor package. It separates immutable committed evidence from current
uncommitted proposal evidence and does not assign authority by chronology alone.

## 2. Identifier Rules

- **Commit SHA** identifies the most recent committed version of a tracked source used by the
  package.
- **Blob SHA** identifies the exact file content reviewed.
- **Not committed at Stage 1** means the artifact has a reproducible Git object hash but no commit
  provenance yet; it remains proposal evidence.
- The manifest cannot contain its own final blob SHA without becoming self-referential. A future
  Freeze records the final manifest blob after Governance approval.
- A later commit does not supersede a Freeze, ADR, or Genesis source by date alone. Authority is
  governed by the
  [Successor Authority Interpretation](./FOUNDATION-SUCCESSOR-AUTHORITY-INTERPRETATION-v1.0.md).

## 3. Controlling Historical and Approved Inputs

| Repository path | Title / version | Status | Governing role | Commit SHA | Blob SHA | Classification | Relationship |
|---|---|---|---|---|---|---|---|
| `AGENTS.md` | NexoraXS Agent Instructions | Current runtime guidance | Subordinate operating guidance | `31937784e4b2c0951cff1d803ab1537835f6b14c` | `85759d3a163660af5b5624ad373b5b5a0c91ec78` | Current operational source | Interpreted; does not create architecture |
| `docs/00-governance/MILESTONE-LIFECYCLE.md` | NexoraXS Architecture Milestone Lifecycle | Approved | Governance lifecycle | `605efc30e039af8158f08015be310a7a36165be7` | `f534712e5c39901aafb46e48926039df96254922` | Controlling governance source | Preserved |
| `docs/00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md` | ADR-015 | Accepted | Infer-before-asking and conversational experience | `605efc30e039af8158f08015be310a7a36165be7` | `d72947ba605098b37b4331655ef85a13bdea4a87` | Accepted authority | Relationship proposed by ADR-043 |
| `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md` | ADR-016 | Accepted | Authenticated selected-Business pipeline | `605efc30e039af8158f08015be310a7a36165be7` | `8d5dc364e589428e4006fa7a926c665f98444c6f` | Accepted authority | Relationship proposed by ADR-043 |
| `docs/00-governance/ADR/ADR-042-pre-registration-business-discovery.md` | ADR-042 | Accepted | Pre-registration Discovery and candidate conversion | `664fd597562708ed5cf1463e47610e506be35a0e` | `5711267b8496305ffb03fc406a55fddf5d6911f7` | Accepted authority | Foundation extension; explicit relation pending ADR-043 |
| `docs/00-governance/FOUNDATION-BASELINE-v0.1.md` | Foundation Baseline v0.1 | Active — approved snapshot | Sessions 1–4 baseline | `bde2eebf83eb0fb01ebb16e1507facc7fee2c0de` | `9e92e6f736dc237c8c2f35a8ae5eb5d1fdf12610` | Approved input subordinate to Freezes | Successor input |
| `docs/08-implementation-audit/FOUNDATION-AUDIT-v0.1.md` | Foundation Audit v0.1 | Completed audit | Evidence and gap inventory | `2245d45bde8f13915b9210c7c723c6ba3e37599e` | `1130f01afaa12a485fb7dcd577e778eb078e2ad5` | Historical analysis | Remediation input; not authority |
| `docs/00-governance/FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md` | Foundation Authority Crosswalk v0.1 | Proposed analysis | Authority collision evidence | `f4ff07770873d53da8ae0b78f4bc82130298974d` | `79f45f6ac759af25e9e482d81811ce21128fd118` | Historical proposal evidence | Predecessor to disposition and interpretation |
| `docs/00-governance/PRODUCT-DECISIONS.md` | Product Decision Register | Current approved product decisions | Product-level constraints | `ebe52548099efdf2401f5c3fff75285fef55d075` | `5d41f0e1b3ad0c8e2da04b7bcc4415ee056617dc` | Approved input | Preserved; no Product Decision edited |
| `docs/00-governance/SESSION-DECISION-REGISTER.md` | Session Decision Register | Sessions 1–4 approved and locked | Provenance register | `bde2eebf83eb0fb01ebb16e1507facc7fee2c0de` | `f128d6db2ced6adb6fd0acf24b77461d219da6d8` | Approved provenance input | Preserved; does not compete with ADRs or Product Decisions |
| `docs/00-governance/glossary/GLOSSARY.md` | Canonical Glossary / Foundation Domain Lexicon | Current canonical terminology | Canonical vocabulary | `bde2eebf83eb0fb01ebb16e1507facc7fee2c0de` | `02008602a8fcf457be44fe9459adaed5fe0ec075` | Approved source with Stage 1 terminology clarification | Business Blueprint definition clarified; no owner change |
| `docs/01-genesis/02-CONSTITUTION.md` | Product Constitution v1.1 | Active | Durable doctrine and laws | `bde2eebf83eb0fb01ebb16e1507facc7fee2c0de` | `c2c16f169c71d8a7ce26a2e4a9dedff6782f69ad` | Approved Genesis input | Preserved |
| `docs/01-genesis/11-CUSTOMER-JOURNEY.md` | Customer Journey v1.2 | Active current Genesis journey | Product-intent source | `6a06127c95a2a658f1e874eb6decc9165ed1c14b` | `764fa160b6c78b1bcc600e301d7e7a22154cdd22` | Approved input preserved without edit | Predecessor to Genesis successor addendum; ambiguous historical terminology clarified in the addendum |
| `docs/01-genesis/12-WORKSPACE-LIFECYCLE.md` | Workspace Lifecycle v1.0 | Historical frozen Genesis source | Account-first predecessor lifecycle | `605efc30e039af8158f08015be310a7a36165be7` | `8f9067690b7ec8cff3523baf7b84dfd964243b85` | Historical controlling source within v1.0 Freeze | Preserved; successor relation proposed by addendum |
| `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md` | Core Platform Architecture v1.0 Freeze | Frozen | Current Core architecture authority | `605efc30e039af8158f08015be310a7a36165be7` | `03d1bbe345f77ca418cedfe68786b6f986631891` | Controlling Architecture Freeze | Predecessor; remains controlling until v1.1 approval |
| `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md` | Business Brain Architecture v1.0 Freeze | Frozen | Current Business Brain authority | `605efc30e039af8158f08015be310a7a36165be7` | `0affc18b578dcb3dd58af115e7ef999c16f2958f` | Controlling Architecture Freeze | Unchanged; compatibility evidence required |
| `docs/02-core-platform/13-CORE-FOUNDATION-ARCHITECTURE-IMPACT-REVIEW-v0.1.md` | Core/Foundation Architecture Impact Review v0.1 | Proposed assessment | Impact evidence | `8c860df6d9c8b6c07672ecb30e54cf2441776733` | `500e7220879f2bb72a23be115fc1632e935523b6` | Historical review evidence | Predecessor to Review v1 and remediation |

## 4. Frozen-Source Snapshot Recovery

Core Platform Freeze v1.0 was committed at
`605efc30e039af8158f08015be310a7a36165be7`. The following mutable paths are treated at their exact
Freeze-time blobs when evaluating the predecessor, even where a later file now exists at the same
path.

| Path | Freeze-time blob SHA | Current treatment |
|---|---|---|
| `docs/01-genesis/02-CONSTITUTION.md` | `6c77b6c8c098b6b16e807484b3f51a0701c52f85` | Immutable predecessor content; current v1.1 Constitution is a later approved Foundation input |
| `docs/01-genesis/11-CUSTOMER-JOURNEY.md` | `035cb2fa4cab88fca3e83a1465d1dad7e3be8b16` | Immutable account-first predecessor; current v1.2 and addendum are successor evidence |
| `docs/01-genesis/12-WORKSPACE-LIFECYCLE.md` | `8f9067690b7ec8cff3523baf7b84dfd964243b85` | Same content remains the historical predecessor |
| `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md` | `03d1bbe345f77ca418cedfe68786b6f986631891` | Controlling predecessor Freeze |
| `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md` | `0affc18b578dcb3dd58af115e7ef999c16f2958f` | Controlling Business Brain Freeze |

The complete inherited ADR-001–ADR-041, Genesis v1.1, and Core Platform documentation set is
identified by path in Core Platform Freeze v1.0 **2. Frozen Scope**. The Freeze commit and blob
above are the immutable root for that set. This manifest does not substitute current mutable files
for those historical source versions.

## 5. Stage 1 Proposal Evidence

| Repository path | Title / version | Status | Governing role | Commit SHA | Blob SHA reviewed | Classification | Predecessor / successor relationship |
|---|---|---|---|---|---|---|---|
| `docs/00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md` | ADR-043 v0.1 | Proposed | Explicit ADR-015 / ADR-016 / ADR-042 composition | Not committed at Stage 1 | `a1efb42ec37370ec554020c0aa09afe18fb84e65` | Proposed decision evidence | Does not edit predecessors; must be independently reviewed and accepted |
| `docs/00-governance/CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md` | Governance Disposition v0.1 | Proposed — remediated | Bounded successor disposition | Not committed at Stage 1 | `7018499b06be24181790d1787dc8e25d2fafec9f` | Proposed Governance evidence | Successor treatment for documented collision |
| `docs/00-governance/FOUNDATION-SUCCESSOR-AUTHORITY-INTERPRETATION-v1.0.md` | Successor Authority Interpretation v1.0 | Proposed | Successor-use authority rule | Not committed at Stage 1 | `9414077a9f6faa2b28c8d4f8efd35ca9e9e8518e` | Proposed Governance evidence | Preserves historical authority; future Freeze may supersede scoped predecessor |
| `docs/01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md` | Foundation Journey Successor Addendum v1.0 | Proposed | Versioned Genesis successor evidence | Not committed at Stage 1 | `95a6ad3a59fdc3a51f1dc0fe6fef4f8ade84f2c3` | Proposed Genesis evidence | Preserves Customer Journey and Workspace Lifecycle predecessors |
| `docs/02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md` | Core Foundation Successor Architecture v0.1 | Proposed — remediated | Minimum Core architecture delta | Not committed at Stage 1 | `0426d2989e85b51f25206af162c90d6fcf143899` | Proposed architecture evidence | Proposed successor to Core Platform v1.0 |
| `docs/02-core-platform/15-CORE-PLATFORM-FREEZE-ALIGNMENT-v0.1.md` | Core Platform Freeze Alignment v0.1 | Proposed — remediated | Pre-Freeze alignment evidence | Not committed at Stage 1 | `726abe035718cb6f5e4a69e2ed90ffcff2e0c8e2` | Proposed alignment evidence | Bridge only; does not supersede v1.0 |
| `docs/03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md` | Business Brain Foundation Compatibility v1.0 | Proposed | Business Brain compatibility evidence | Not committed at Stage 1 | `36ea48d2386f613f9688b0a06ecd5c8fa6d974a6` | Proposed architecture evidence | Compatible conceptual extension; no Business Brain Freeze replacement |
| `docs/02-core-platform/ARCHITECTURE-REVIEW-REPORT-v1.0.md` | Architecture Review Report v1.0 | Completed — requires revision | Independent predecessor review | Not committed before Stage 1 | `a257fc7fdfe5511e69b524875799d5b6b8c4b87f` | Historical review evidence | Findings ARB-001–ARB-008 drive remediation |
| `docs/02-core-platform/ARCHITECTURE-REVIEW-RESOLUTION-v1.0.md` | Architecture Review Resolution v1.0 | Completed response | Predecessor resolution record | Not committed before Stage 1 | `5d74e61219ac76a3273ba4358ec4544e4e8772ef` | Historical response evidence | Conditions GOV-C01–GOV-C08 drive gated pipeline |
| `docs/00-governance/FOUNDATION-GOVERNANCE-APPROVAL-v1.0.md` | Foundation Governance Approval v1.0 | Requires additional Governance | Prior Governance decision | Not committed before Stage 1 | `d4e08008c1076f88ea1864784db654761f5dca35` | Historical Governance evidence | Defines conditions; does not authorize v1.1 Freeze |
| `docs/00-governance/FOUNDATION-GOVERNANCE-REMEDIATION-REPORT-v1.0.md` | Governance Remediation Report v1.0 | FAIL | Earlier pipeline execution record | Not committed before Stage 1 | `cf5251c1f338c0ce22e1d46d97b55cada1281786` | Historical failure evidence | Preserved intact; superseded operationally only by a new completion record |
| `docs/00-governance/FOUNDATION-GOVERNANCE-REMEDIATION-COMPLETION-v1.0.md` | Governance Remediation Completion v1.0 | Completed — Stage 1 PASS | Corrected pipeline and GOV-C01–GOV-C07 closure evidence | Not committed at Stage 1 | `ce0555f13d002aff86a111280dd5ee6ef558672c` | Stage 1 gate evidence | Authorizes only independent Architecture Review v2 |

### 5.1 Stage 3 approval-state identifiers

Architecture Review v2 reviewed the Stage 1 blobs above. Foundation Governance Approval v2.0 then
accepted ADR-043 and applied status/approval metadata only. The following hashes identify the exact
post-approval files; no substantive architecture content changed after review.

| Repository path | Approval-state blob SHA | Stage 3 status |
|---|---|---|
| `docs/00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md` | `958af2e0cc0a667b21056c47969ee3d73fcc3dc7` | Accepted |
| `docs/00-governance/ADR/README.md` | `3304304293ff43d141bfb71e21bfdec95a4589a7` | Current set records ADR-043 Accepted; authoritative-source link corrected |
| `docs/00-governance/CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md` | `07905f4ff8db8a8939dcc155d9d68963d7289730` | Approved |
| `docs/00-governance/FOUNDATION-SUCCESSOR-AUTHORITY-INTERPRETATION-v1.0.md` | `f646ed17dc3a2fc68ae4823202992e50fa50b8e7` | Approved |
| `docs/01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md` | `86f2bf45aeb419f11841e510dc68dab8066127c7` | Approved |
| `docs/02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md` | `eaecc2ab8050f5b51978291ccdc4af0c5ba3018e` | Approved |
| `docs/02-core-platform/15-CORE-PLATFORM-FREEZE-ALIGNMENT-v0.1.md` | `8f96ae0722531891596be76275bd8e2329d197d4` | Approved |
| `docs/03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md` | `f29d7558810ae70300e05e4989ba859266150ba2` | Approved |
| `docs/02-core-platform/ARCHITECTURE-REVIEW-REPORT-v2.0.md` | `f6ab853c04ab62be7b757eb1ab87c482c0cadf8e` | Final — APPROVED |
| `docs/00-governance/FOUNDATION-GOVERNANCE-APPROVAL-v2.0.md` | `9fa8476fa1c0a23e972d9056101cd800a838bc3a` | Final — APPROVED; Freeze preparation authorized |

## 6. Provenance Limits

The repository proves the historical predecessor versions above through committed Git objects. It
does not yet prove commit provenance for the Stage 1 proposal artifacts because they are current
working-tree files. Their blob SHAs identify the exact content reviewed, but they must not be cited
as Accepted or frozen until the normal review and Governance gates complete.

No approval date is inferred. No identifier is reused. No current mutable path silently replaces a
historical frozen version.

## 7. Approval and Update Policy

1. Architecture Review v2 must review the Stage 1 blob set recorded here.
2. Governance Approval v2 may update proposal statuses and accept ADR-043 only through the
   repository ADR lifecycle.
3. Any status-only Governance edit after Architecture Review must be identified in the approval
   record and this manifest must record the resulting blob.
4. A Core Platform v1.1 Freeze, if authorized, must record the final blobs for this manifest, the
   accepted ADR, the approved successor artifacts, Architecture Review v2, and Governance Approval
   v2.
5. If substantive architecture content changes after Architecture Review, a new independent review
   is required.

## 8. Non-Supersession

This manifest inventories evidence. It does not supersede an Architecture Freeze, Accepted ADR,
Genesis source, Product Decision, or Governance approval.

## 9. References

- [Milestone Lifecycle](./MILESTONE-LIFECYCLE.md)
- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md)
- [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md)
- [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md)
- [Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Architecture v1.0 Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Proposed ADR-043](./ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)
- [Foundation Journey Successor Addendum v1.0](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
- [Core Foundation Successor Architecture v0.1](../02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md)
- [Core Platform Freeze Alignment v0.1](../02-core-platform/15-CORE-PLATFORM-FREEZE-ALIGNMENT-v0.1.md)
- [Business Brain Foundation Compatibility v1.0](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md)
