# Knowledge Engine

**Version:** 1.0  
**Status:** Foundation

---

## Purpose

The Knowledge Engine is the structured source of business knowledge inside Nexoraxs.

It stores knowledge as data before that knowledge becomes product behavior.

---

## What the Knowledge Engine stores

- Industry profiles
- Capability definitions
- Onboarding questions
- Recommendation rules
- Configuration defaults
- Workflow templates
- Dashboard definitions
- Report definitions
- KPI definitions
- Automation templates
- Terminology
- Country rules
- Tax rules
- Compliance notes
- AI instructions

---

## Principle

Everything should be data before it becomes code.

If a workflow, dashboard, KPI, recommendation, or question can be represented as knowledge, it should not be hard-coded first.

---

## Example structure

```yaml
industry_profile:
  id: pharmacy
  name: Pharmacy
  common_capabilities:
    - pos
    - inventory
    - barcode
    - expiry_tracking
    - suppliers
  questions:
    - branches_count
    - has_delivery
    - tracks_expiry
  recommendations:
    - enable_expiry_alerts
    - enable_supplier_management
  dashboards:
    - daily_sales
    - expiry_risk
  kpis:
    - sales
    - stock_value
    - expired_items
```

---

## Rule

The Knowledge Engine is the long-term asset of Nexoraxs.

Code can be rewritten. Knowledge compounds.
