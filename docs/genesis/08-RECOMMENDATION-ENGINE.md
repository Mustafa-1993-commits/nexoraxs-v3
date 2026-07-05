# Recommendation Engine

**Version:** 1.0  
**Status:** Foundation

---

## Purpose

The Recommendation Engine converts business knowledge into explainable product guidance.

It helps customers choose the right OS products, capabilities, plans, workflows, reports, and automations.

---

## Recommendation types

- Required
- Recommended
- Optional
- Later
- Not relevant

---

## Recommendation object

```yaml
recommendation:
  id: enable_expiry_tracking
  type: recommended
  applies_when:
    industry: pharmacy
    capabilities:
      - inventory
  reason: Pharmacies usually need expiry tracking to reduce expired stock risk.
  impact:
    - Adds expiry fields to inventory
    - Enables expiry alerts
    - Adds expiry risk report
  next_action: Enable expiry tracking
```

---

## Explainability rule

Every recommendation must include:

- Reason
- Impact
- Confidence
- Next action

---

## First implementation

The first version should use deterministic rules, not AI guesses.

AI can later explain or summarize recommendations, but the source of truth should be rules and knowledge.
