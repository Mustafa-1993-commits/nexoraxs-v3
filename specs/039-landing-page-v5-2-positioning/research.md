# Research: Landing Page v5.2 Positioning

**Feature**: 039-landing-page-v5-2-positioning
**Date**: 2026-06-02
**Status**: Complete — all decisions resolved

---

## Decision 1: Nav / Footer link label

**Decision**: "Apps" → **"Products"**

**Rationale**: "Products" is concise (8 chars), standard in SaaS navigation, and maps directly to what visitors expect. "Operating Systems" (17 chars) is the architectural term but is too long for a top-level nav label and could wrap on smaller viewports.

**Alternatives considered**:
- "Operating Systems" — architecturally correct but too long for a nav chip
- "OS Products" — unusual; no prior SaaS convention
- "Platform" — too generic; conflicts with the Platform section

---

## Decision 2: Section anchor id

**Decision**: `#apps` → **`#products`**

**Rationale**: Anchor ids must match the visible nav/footer labels for semantic consistency. Updated simultaneously across all four reference points: navbar, footer, CTA secondary button, and the section element itself.

**Affected files**: `navbar.tsx`, `footer.tsx`, `cta.tsx`, `apps.tsx`

---

## Decision 3: Products section chip

**Decision**: `// app launcher` → **`// product hub`**

**Rationale**: "Product Hub / OS Launcher" is the official Core Platform module name from AGENTS.md and the constitution. `// product hub` matches the monospace chip pattern and directly references the architectural concept.

---

## Decision 4: Products section heading

**Decision**: "Our Apps" → **"Product Hub"**

**Rationale**: "Product Hub" maps to the Core Platform concept from AGENTS.md Section 3. "Operating Systems" as a heading would be technically accurate but may read as a computer OS reference to non-technical visitors. "Product Hub" is friendlier while staying architecturally grounded.

**Section subheading decision**: "One platform. Multiple Operating Systems. All under one login." (replaces "One platform. Multiple business tools. All under one login.")

---

## Decision 5: Hero headline

**Decision**: **"The Business Operating Platform for every business domain"**

**Rationale**: Names the product category directly. "Business Operating Platform" is the official platform identity per constitution Article I and AGENTS.md Section 2. The gradient highlight can start from "Business Operating Platform" for visual weight.

**Alternatives considered**:
- "Business operations, powered by Operating Systems" — less direct
- "One Platform. Six Operating Systems." — too focused on count, which may change
- "Run every business domain on one platform" — accurate but generic

---

## Decision 6: Hero description

**Decision**: **"NexoraXS is a Business Operating Platform — a shared foundation powering independent Operating Systems for Commerce, Healthcare, HR, CRM, Gym, and Maintenance."**

**Rationale**: Removes all "modular SaaS apps" and "future business apps" language. Names the 6 OS domains explicitly so visitors immediately understand breadth. Stays under 2 lines at standard viewport widths.

---

## Decision 7: Hero feature pills

**Decision**: Replace current three pills with:
1. `"Business Operating Platform"`
2. `"6 Operating Systems planned"`
3. `"Commerce OS — available now"`

**Rationale**: Three pills tell a progressive story — what NexoraXS is, how big the roadmap is, and what visitors can start with today. Replaces the outdated "Modular SaaS architecture", "Workspace-based platform", "Built for future apps".

---

## Decision 8: CTA section

**Decision**:
- Secondary button label: "Explore Apps" → **"Explore Products"**
- Secondary button href: `#apps` → `#products`
- Description: "Explore the MVP path for a workspace-based platform with modular apps." → **"Explore Commerce OS — the first Operating System available on the platform."**

**Rationale**: CTA description still referenced "modular apps" language; updated to directly name the available product.

---

## Decision 9: Commerce OS card

**Decision**:
- Name: `"Shops"` → **`"Commerce OS"`**
- Tagline: `"Commerce & POS"` → **`"Commerce & Business Presets"`**
- Description: **`"Sell, manage inventory, run POS, and serve customers — with presets for retail, restaurants, pharmacy, and more."`**

**Rationale**: "Business Presets" is the correct term from the architecture (AGENTS.md Section 12). The description explicitly names restaurant and pharmacy as presets inside Commerce OS, which prevents visitors from looking for them as separate products.

---

## Decision 10: Healthcare OS card (was Clinics)

**Decision**:
- Name: `"Clinics"` → **`"Healthcare OS"`**
- Tagline: `"Healthcare Management"` — kept
- Description: **`"A planned Operating System for appointments, patient records, clinical workflows, and healthcare teams."`**

**Rationale**: "Clinics" was a legacy code label. "Healthcare OS" aligns with the architecture. `clinics-app` is a placeholder; the future product is Healthcare OS per AGENTS.md.

---

## Decision 11: Remove Restaurants card

**Decision**: Card removed entirely — no replacement at the same position.

**Rationale**: Restaurants/Cafe is a Commerce OS preset, not a separate product. AGENTS.md Section 2 explicitly states `restaurants-app` is deprecated. Showing it as a standalone product card creates architectural confusion.

---

## Decision 12: HR OS card (new)

**Decision**:
- Name: **`"HR OS"`**
- Tagline: **`"People & Workforce"`**
- Description: **`"A planned Operating System for employees, attendance, payroll, leaves, and HR workflows."`**
- Icon: `BriefcaseBusiness` (Lucide 1.x) — fallback: `Briefcase`
- Accent: `text-violet-300`
- Icon bg: `bg-violet-500/15`
- Glow: `rgba(139, 92, 246, 0.2)`

**Rationale**: HR OS is listed as a planned product in AGENTS.md. `BriefcaseBusiness` is available in lucide-react ≥0.400 (confirmed available at v1.14.0). Violet is unused by other OS cards.

---

## Decision 13: Gym OS card (new)

**Decision**:
- Name: **`"Gym OS"`**
- Tagline: **`"Fitness & Memberships"`**
- Description: **`"A planned Operating System for gym members, memberships, trainers, classes, and renewals."`**
- Icon: `Dumbbell` (Lucide — widely available since v0.2xx)
- Accent: `text-orange-300`
- Icon bg: `bg-orange-500/15`
- Glow: `rgba(249, 115, 22, 0.2)`

**Rationale**: `Dumbbell` is the clearest gym metaphor in Lucide. Orange color is freed from the Maintenance card position (Maintenance OS moves to pink, which was freed by removing Restaurants).

---

## Decision 14: CRM OS card (rename)

**Decision**:
- Name: `"CRM"` → **`"CRM OS"`**
- Tagline: `"Customer Relations"` — kept
- Description: `"A planned customer workspace for leads, deals, and follow-up activity."` → **`"A planned Operating System for leads, deals, campaigns, and customer relationship workflows."`**

**Rationale**: Name aligned to OS naming convention. Description updated to remove "workspace" (a Core Platform term) and add "campaigns" which is a CRM domain concept from the architecture.

---

## Decision 15: Maintenance OS card (rename)

**Decision**:
- Name: `"Maintenance"` → **`"Maintenance OS"`**
- Tagline: `"Field Service"` — kept
- Description: `"A planned app for jobs, assets, technicians, and service operations."` → **`"A planned Operating System for repair centers, tickets, technicians, warranties, and service operations."`**
- Accent: `text-pink-300` (moved from orange; orange now belongs to Gym OS)
- Icon bg: `bg-pink-500/15`
- Glow: `rgba(236, 72, 153, 0.2)`

**Rationale**: Color reassignment avoids orange collision with Gym OS. Pink was freed by removing Restaurants.

---

## Decision 16: Final OS card color map

| OS | Accent | Icon Bg | Glow |
|----|--------|---------|------|
| Commerce OS | text-blue-300 | bg-blue-500/15 | rgba(59, 130, 246, 0.22) |
| Healthcare OS | text-emerald-300 | bg-emerald-500/15 | rgba(16, 185, 129, 0.2) |
| HR OS | text-violet-300 | bg-violet-500/15 | rgba(139, 92, 246, 0.2) |
| CRM OS | text-cyan-300 | bg-cyan-500/15 | rgba(6, 182, 212, 0.2) |
| Gym OS | text-orange-300 | bg-orange-500/15 | rgba(249, 115, 22, 0.2) |
| Maintenance OS | text-pink-300 | bg-pink-500/15 | rgba(236, 72, 153, 0.2) |

All 6 colors are distinct; no collisions.

---

## Decision 17: Platform section heading

**Decision**: `"One Core. Many Apps."` → **`"One Core. Six Operating Systems."`**

**Rationale**: "Six" is specific and current (matches the 6 OS cards). "Many Apps" undersells the platform concept. Mirrors the existing heading rhythm and line length.

---

## Decision 18: Platform section description

**Decision**: Replace:
> "NexoraXS separates the shared platform shell from focused business apps, so workspaces, authentication, billing, and app access stay in one core while each app can serve its own domain."

With:
> "NexoraXS separates the shared Core Platform from independent Operating Systems — so workspaces, authentication, billing, and OS access stay in one core while each Operating System owns its domain."

**Rationale**: Replaces "focused business apps" and "each app" with the architectural terminology without changing the sentence structure significantly.

---

## Decision 19: Platform "App Satellites" label

**Decision**: `"App Satellites"` → **`"Operating Systems"`**
**Rationale**: "App Satellites" was an informal label. "Operating Systems" is the official term per constitution.

---

## Decision 20: Features section copy updates

**Decision**: Update two feature card descriptions:

1. "Modular Architecture" card:
   - Old: "Start with the platform core, then add focused business apps as the product expands."
   - New: **"Start with the Core Platform, then activate independent Operating Systems as your business grows."**

2. "Workspace Management" card:
   - Old: "Keep teams, billing, and enabled apps organized around workspace boundaries."
   - New: **"Keep teams, billing, and enabled Operating Systems organized around workspace boundaries."**

**Rationale**: Only cards that contain "apps" in a domain-product context are updated. Other cards (Auth, Multi-Tenant, Cloud-Native, AI-Ready) do not reference "apps" in that context and are left unchanged.

---

## Summary Table

| File | Changes |
|------|---------|
| `hero/hero.tsx` | Headline, description, feature pills |
| `navbar/navbar.tsx` | Link label "Apps"→"Products", href "#apps"→"#products" |
| `apps/apps.tsx` | Section id, chip, heading, subheading, full cards array (6 cards) |
| `platform/platform.tsx` | Heading, description, "App Satellites"→"Operating Systems", tile list |
| `features/features.tsx` | 2 card descriptions ("Modular Architecture", "Workspace Management") |
| `cta/cta.tsx` | Secondary button label+href, description |
| `footer/footer.tsx` | Link label "Apps"→"Products", href "#apps"→"#products" |
