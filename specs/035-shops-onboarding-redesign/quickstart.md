# Quickstart & Integration Scenarios: Shops Onboarding 4-Step Redesign

**Feature**: 035-shops-onboarding-redesign  
**Date**: 2026-05-17

---

## Scenario 1: Complete Onboarding as a Physical Store

**Setup**: Clear all `shops_*` session storage keys. Navigate to `/onboarding`.

**Steps**:

1. **Step 1 — Business & Sales**
   - Select "Food & Beverage" from the grid
   - Select the "Physical store only" card (emerald, "IN-STORE" tag)
   - Observe module preview shows: POS · Inventory · Branches · Reports
   - Click "Continue →"

2. **Step 2 — Store Setup**
   - Enter Store Name: "Al Nakheel Café"
   - Enter Branch Name: "Riyadh Main"
   - Select Country: "Saudi Arabia"
   - Observe Currency auto-fills: SAR
   - Observe Timezone auto-fills: Asia/Riyadh
   - Observe live preview updates with initials "AN", store name, and branch
   - Click "Continue →"

3. **Step 3 — First Products**
   - Add product: Name="Espresso", Price=15, Stock=100
   - Add product: Name="Croissant", Price=8, Stock=50
   - Click "Continue →"

4. **Step 4 — Review & Launch**
   - Left column: Workspace · Food & Beverage · Physical only
   - Right column: Al Nakheel Café · Riyadh Main · Saudi Arabia · SAR · Asia/Riyadh · 2 products
   - Modules grid: POS ✅ · Inventory ✅ · Branches ✅ · Storefront ❌ · Online Orders ❌ · Checkout ❌ · Reports ✅
   - Click "Launch Store →"

**Expected result**: Redirect to `/dashboard`. Dashboard shows:
- Title: "Shops Dashboard" with emerald "🏪 In-Store" badge
- Cyan POS banner above stats
- Stats: Sales Today / Products / Low Stock / Customers
- Sidebar: POS visible, Storefront hidden
- Quick actions: Add product, New sale, Stock adjustment, Daily Z-report

---

## Scenario 2: Complete Onboarding as an Online Store (Skip Products)

**Setup**: Clear session. Navigate to `/onboarding`.

**Steps**:

1. **Step 1** — Select "Books & Media" → Select "Online store only" (blue, "E-COMMERCE") → Continue
2. **Step 2** — Enter "Read More" / "Cairo Hub" / Egypt → Continue auto-fill (EGP, Africa/Cairo) → Continue
3. **Step 3** — Click "Skip for now →" (no products added)
4. **Step 4** — Right column shows "No products added yet" · Modules: Storefront ✅ · Online Orders ✅ · Checkout ✅ · POS ❌ · Branches ❌ → Launch Store

**Expected result**: Dashboard shows:
- Blue "🌐 Online" badge
- Blue Storefront banner above stats
- Stats: Online Orders / Revenue / Products / Customers
- Sidebar: Storefront visible, POS hidden

---

## Scenario 3: Complete Onboarding — Both Mode (Default Path)

**Setup**: Clear session. Navigate to `/onboarding`.

**Steps**:

1. **Step 1** — "Both physical + online" is pre-selected (purple, "RECOMMENDED") → Select "Supermarket" → module preview shows all 6+ modules → Continue
2. **Step 2** — Enter store details → Continue
3. **Step 3** — Add 1 product → Continue
4. **Step 4** — All modules ✅ → Launch Store

**Expected result**: Dashboard shows:
- Purple "⚡ Unified" badge
- Both POS and Storefront CTAs visible
- All 4 stats visible
- Full sidebar (all items)

---

## Scenario 4: Custom "Other" Business Type

**Setup**: Clear session. Navigate to `/onboarding`.

**Steps**:

1. **Step 1** — Click "Other" in the business type grid
   - Observe: a text input appears below the grid (or inline)
   - The "Continue →" button remains disabled while the text input is empty
   - Type "Flower Shop"
   - Both a business type ("other") and sales model are selected → Continue

**Expected result**: Step 4 left column shows "Business Type: Flower Shop" (reading from `shops_business_type_custom`).

---

## Scenario 5: Back Navigation Preserves Data

**Setup**: Start onboarding, complete through to Step 3.

**Steps**:

1. Navigate forward: Step 1 → Step 2 → Step 3 (add 2 products)
2. Click "Back" from Step 3 → go to Step 2
3. Observe all fields still populated (store name, branch, country, currency, timezone)
4. Click "Back" from Step 2 → go to Step 1
5. Observe business type still selected, sales model still selected
6. Change sales model to "Online only"
7. Click "Continue →" → go to Step 2 → verify old form data preserved
8. Continue to Step 3 → verify products are still in the form

**Expected result**: All data persists across back/forward navigation with no data loss.

---

## Scenario 6: Manual Country Override After Auto-Fill

**Setup**: Navigate to Step 2.

**Steps**:

1. Select "Egypt" as country → observe Currency = EGP, Timezone = Africa/Cairo
2. Change currency manually to "USD" → observe field updates to USD
3. Change country to "Saudi Arabia" → observe Currency reverts to SAR, Timezone = Asia/Riyadh
4. Change timezone manually to "UTC" → observe field stays as UTC
5. Click "Continue →"

**Expected result**: `shops_currency = "SAR"` and `shops_timezone = "UTC"` in session storage (auto-fill + manual override both work correctly).

---

## Scenario 7: Max Products Limit

**Setup**: Navigate to Step 3.

**Steps**:

1. 1 product row visible by default
2. Click "+ Add another product" → 2 rows
3. Click "+ Add another product" → 3 rows
4. Verify "+ Add another product" button is no longer visible
5. Remove one product (× button on row 2) → 2 rows, button reappears
6. Fill all 3 products → Continue

**Expected result**: `shops_onboarding_products` in session storage = JSON array of 3 product objects.

---

## Verification Checklist

After implementing, manually verify each scenario:

- [ ] Scenario 1: Physical store full flow → correct dashboard layout
- [ ] Scenario 2: Online store, skip products → correct dashboard layout
- [ ] Scenario 3: Both mode (default) → all modules enabled
- [ ] Scenario 4: Custom "Other" type → displays custom label in review and dashboard
- [ ] Scenario 5: Back navigation → zero data loss across all steps
- [ ] Scenario 6: Manual currency/timezone override → correct session values
- [ ] Scenario 7: 3-product max enforced → + button hides at 3, reappears after remove

### Mobile viewport check (375px)

- [ ] Step 1: Business type grid shows correctly (2-column or single column on mobile)
- [ ] Step 1: Sales model cards are full-width and tappable
- [ ] Step 2: Form + live preview stack vertically on mobile
- [ ] Step 3: Product rows are full-width on mobile
- [ ] Step 4: Two-column layout stacks to single column on mobile
- [ ] Step 4: Modules grid shows 2 columns on mobile
- [ ] Fixed bottom nav bar (Back + Continue) is usable on mobile without clipping

### TypeScript

- [ ] `pnpm --filter shops-app exec tsc --noEmit` → 0 errors
- [ ] `pnpm --filter shops-app lint` → 0 errors
- [ ] `pnpm --filter shops-app build` → exit 0
