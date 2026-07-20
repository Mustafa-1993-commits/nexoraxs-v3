# Foundation Journey Successor Addendum v1.0

**Version:** 1.0

**Status:** Approved — versioned Genesis successor input for Core Platform Architecture v1.1

**Owner:** NexoraXS Product Governance

**Authority:** Approved Genesis addendum subordinate to the controlling Freeze until v1.1 is issued

**Predecessors:** Customer Journey v1.2; Workspace Lifecycle v1.0; historical Customer Journey versions

**Successor scope:** Foundation/Core journey relationship only

**Approval state:** Approved by Foundation Governance Approval v2.0 after Architecture Review v2

---

## 1. Purpose

This addendum reconciles the current Foundation journey with the earlier Workspace-first lifecycle
without rewriting either source. It defines the proposed successor relationship for Core Platform
Architecture v1.1 review.

## 2. Historical Preservation

[Workspace Lifecycle v1.0](./12-WORKSPACE-LIFECYCLE.md) remains historical predecessor evidence for
the account-first sequence frozen in Core Platform v1.0:

```text
Sign Up / Login
→ Workspace
→ Business
→ Business Architect
→ Business DNA
```

[Customer Journey v1.2](./11-CUSTOMER-JOURNEY.md) records the later Foundation primary path with
value before registration. Neither document is rewritten to imply that both sequences were frozen
on 2026-07-12.

## 3. Successor Journey Relationship

### 3.1 Primary value-before-registration path

```text
Public entry
→ Pre-Registration Business Discovery
→ Business Mapping
→ Candidate Business Understanding
→ Understanding Reflection
→ Business Report Preview
→ Create Workspace Intent
→ Authentication
→ Workspace resolution or creation
→ Business resolution or creation
→ candidate review and explicit approval
→ first governed Business DNA v1 publication
→ Business Architect continuation as Guided Activation
→ governed authenticated Business Blueprint projection
→ governed Recommendations
→ Core Workspace Ready
→ Product Hub
```

### 3.2 Direct-registration compatibility path

Pre-registration Discovery is the primary customer-value path but is not a mandatory UI.

A new customer entering directly through Register/Login follows:

```text
Register or Login
→ authenticated Workspace resolution or creation
→ authenticated Business resolution or creation
→ authenticated candidate-understanding and review path
→ explicit approval
→ first governed Business DNA v1 publication
→ Business Architect continuation as Guided Activation
→ governed authenticated Business Blueprint projection
→ governed Recommendations
→ Core Workspace Ready
→ Product Hub
```

This path preserves the account-first entry permitted by ADR-042 compatibility while applying the
same candidate/canonical and publication safeguards. Registration never publishes Business DNA by
itself.

### 3.3 Returning-customer path

A returning customer may enter an existing authorized Workspace, Business, incomplete Guided
Activation context, Product Hub, or Operating System according to current Permission, context, and
readiness rules. Existing canonical understanding need not be recreated.

## 4. Canonical Journey Rules

1. Discovery is a method-independent capability; Guided Business Conversation is Experience v1,
   not a mandatory interface.
2. No anonymous Workspace or Business is created.
3. Candidate Business Understanding remains temporary and non-canonical.
4. A direct-registering user enters an authenticated candidate/review path and cannot bypass
   canonical publication controls.
5. Authentication, Workspace and Business resolution, material review, and explicit approval
   precede first Business DNA publication.
6. Business remains the sole owner context for Business DNA.
7. Guided Activation begins only after first governed Business DNA publication.
8. The governed Business Architect pipeline remains resumable, validated, reviewable, and separate
   from published Business DNA.
9. Business Report Preview and Business Blueprint remain distinct projections.
10. Recommendations remain separate from Business Blueprint and Capability-first.
11. Product Hub remains a composition and handoff boundary.
12. Guided Activation remains separate from OS-Specific Setup.
13. Core Workspace Ready remains separate from Operating System Ready.

## 5. Business Architect and Guided Activation

Business Architect remains the governed authenticated pipeline. For a direct-registering new
customer, its pre-publication segment coordinates authenticated candidate understanding, review, and
first-publication readiness. After first Business DNA v1 publication, its continuation is Guided
Activation.

Guided Activation may close remaining knowledge gaps and request governed Business DNA revisions. It
does not own first publication, replace OS-Specific Setup, or redefine the frozen Business Architect
Session record lifecycle.

## 6. Business Blueprint Terminology

Business Blueprint is a **governed authenticated customer-facing projection** derived from Business
DNA and other governed owner outputs. It is non-writing, is not canonical storage, is not a source of
truth, and has no independent ownership of its inputs.

The earlier phrase **“Canonical Business Blueprint”** is superseded terminology. It described the
main authenticated onboarding presentation, not a canonical write model or data owner. Historical
occurrences remain provenance; current successor sources must use the projection wording above.

## 7. Workspace Lifecycle Relationship

Workspace Lifecycle v1.0 remains correct for Workspace identity, ownership, Core Workspace Ready,
Product Hub, OS selection, OS-Specific Setup, and Operating System Ready boundaries. Its claim that
“Everything begins here” and its universal Sign Up/Login-first ordering are replaced only for the
Foundation new-customer journey after successor approval.

The direct-registration compatibility path retains an account-first entry without making it the only
new-customer path.

## 8. Exclusions

This addendum defines no screen, route, interaction, state machine, API, Event, Contract, service,
database, persistence, token, infrastructure, deployment, runtime, or migration mechanism.

## 9. Approval and Successor Effect

This addendum is approved through Foundation Governance Approval v2.0. When included in Core
Platform Architecture v1.1 Freeze, it becomes the controlling versioned Genesis relationship for
the bounded journey delta. It does not erase or rewrite its predecessors.

## 10. References

- [Customer Journey v1.2](./11-CUSTOMER-JOURNEY.md)
- [Workspace Lifecycle v1.0](./12-WORKSPACE-LIFECYCLE.md)
- [Product Constitution v1.1](./02-CONSTITUTION.md)
- [ADR-015](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md)
- [ADR-042](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md)
- [Accepted ADR-043](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)
- [Foundation Baseline v0.1](../00-governance/FOUNDATION-BASELINE-v0.1.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
