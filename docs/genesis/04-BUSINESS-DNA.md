# Business DNA

**Version:** 1.0  
**Status:** Foundation

---

## Purpose

Business DNA is the structured identity of a company inside Nexoraxs.

It allows the platform to understand the business before recommending software.

---

## Business DNA model

```yaml
business_dna:
  identity:
    name: string
    country: string
    language: string
    currency: string

  classification:
    industry: string
    sub_industry: string
    business_model: string
    business_stage: startup | growing | scaling | enterprise

  structure:
    branches_count: number
    employees_count: number
    departments: list

  operations:
    sales_channels: list
    customer_types: list
    supplier_types: list
    inventory_type: list
    service_type: list

  capabilities:
    required: list
    recommended: list
    optional: list

  compliance:
    tax_model: string
    invoice_requirements: list
    country_rules: list

  goals:
    short_term: list
    long_term: list

  risks:
    operational: list
    financial: list
    compliance: list
```

---

## Why it matters

Two businesses in the same industry may need different systems.

A one-branch mobile shop is not the same as a ten-branch mobile retailer with repairs, warranties, installments, and online sales.

Nexoraxs must understand the business shape, not only the industry label.

---

## Rule

Every major recommendation must be traceable to Business DNA.
