# Capability Model

**Version:** 1.0  
**Status:** Foundation

---

## Purpose

Capabilities are the reusable building blocks of Nexoraxs.

Nexoraxs should not build one isolated system for every industry. Instead, it should compose industries from reusable business capabilities.

---

## Examples of capabilities

### Commerce capabilities

- POS
- Inventory
- Barcode
- Batch tracking
- Expiry tracking
- Suppliers
- Purchases
- Returns
- Discounts
- Online store
- Delivery
- Customer accounts
- Installments
- Warranty
- Repair tickets

### Operations capabilities

- Branch management
- User roles
- Approvals
- Tasks
- Notifications
- Audit logs
- Document management

### People capabilities

- Employees
- Attendance
- Payroll
- Shifts
- Leave requests
- Performance

### Customer capabilities

- CRM
- Leads
- Customer timeline
- Follow-ups
- Segments
- Campaigns

### Asset capabilities

- Fleet
- Equipment
- Maintenance
- Asset assignment

---

## Industry composition examples

```yaml
pharmacy:
  capabilities:
    - pos
    - inventory
    - barcode
    - expiry_tracking
    - suppliers
    - returns
    - vat

restaurant:
  capabilities:
    - pos
    - tables
    - kitchen
    - delivery
    - inventory
    - shifts

mobile_store:
  capabilities:
    - pos
    - inventory
    - imei
    - warranty
    - repairs
    - installments
```

---

## Rule

When adding an industry, first ask:

> Which capabilities does this industry need?

Do not create a new module if an existing capability can be reused.
