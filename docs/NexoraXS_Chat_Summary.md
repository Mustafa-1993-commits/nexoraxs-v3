# NexoraXS — ملخص الشات الكامل

**التاريخ:** مايو 2026  
**المشروع:** NexoraXS SaaS Platform  
**المؤسس:** مصطفى محمد  
**الريبو:** `git@github.com:Mustafa-1993-commits/nexoraxs-v3.git`

---

## 1. نظرة عامة على المشروع

NexoraXS منصة SaaS معيارية (Modular) تستضيف تطبيقات أعمال متعددة تحت بنية تحتية موحدة.

**الفلسفة:** Core Platform Shell + Independent Apps — مش ERP monolith.

---

## 2. البيئة والـ Stack

| العنصر | التفاصيل |
|---|---|
| OS | Windows 11 + WSL2 Ubuntu 24.04 |
| Package Manager | pnpm 9.15.9 |
| Monorepo | Turborepo 2.x |
| Frontend | Next.js 16.x + React 19.x + TypeScript 5.x + TailwindCSS 4.x |
| Backend | Laravel + Sanctum (مخطط - لم يُبنَ بعد) |
| Database | PostgreSQL (مخطط) |
| Cache/Queue | Redis (مخطط) |
| Infra | Docker Compose + WSL2 |

**Local Ports:**
- Landing: `http://localhost:3000`
- Core Platform: `http://localhost:3001`
- Shops App: `http://localhost:3002`
- Backend API: `http://localhost:8080` (مخطط)

---

## 3. هيكل الـ Monorepo

```
nexoraxs-v3/
├── apps/
│   ├── landing/          → nexoraxs.com
│   ├── core-platform/    → app.nexoraxs.com
│   └── shops-app/        → shops.nexoraxs.com
├── packages/             → (فاضي - للمستقبل)
│   ├── ui/
│   ├── sdk/
│   ├── auth/
│   ├── types/
│   └── shared/
├── backend/              → Laravel API (فاضي)
├── docs/                 → توثيق + HTML references
├── specs/                → Spec Kit features
└── .specify/             → Specify CLI config
```

---

## 4. الـ Workflow المتبع

```
Claude (التخطيط)  →  Specify CLI (Spec/Plan/Tasks)  →  Claude Code/Codex (التنفيذ)
```

**الترتيب الإلزامي:**
```
/speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement
```

**قواعد الـ Commit:**
- دايماً explicit paths — مش `git add .`
- مثال: `git add AGENTS.md .specify/feature.json specs/<feature> apps/<app>`

---

## 5. الـ Features المكتملة

### Landing App (apps/landing)

| Feature | الوصف |
|---|---|
| 001-landing-website | Landing Page v1 — 7 sections (Navbar, Hero, Features, Apps, Pricing, FAQ, Footer) |
| 002-mobile-polish | Mobile responsive polish لكل الـ sections |
| 003-seo-metadata | SEO كامل — OG tags, Twitter cards, robots.txt, sitemap.xml |
| 008-landing-v2-motion-polish | Landing v2 — premium design مع CSS animations وglow blobs |

**الحالة الحالية:** frozen ✅

**الـ Sections الموجودة:**
- `src/sections/navbar/navbar.tsx` — sticky + mobile menu
- `src/sections/hero/hero.tsx` — gradient headline + Splash.png
- `src/sections/features/features.tsx` — 6 feature cards
- `src/sections/apps/apps.tsx` — 5 app cards
- `src/sections/pricing/pricing.tsx` — Coming Soon
- `src/sections/faq/faq.tsx` — 6 accordion items
- `src/sections/footer/footer.tsx` — 3 link groups

---

### Core Platform (apps/core-platform)

| Feature | الوصف |
|---|---|
| 005-core-platform-shell | UI Shell — /login, /register, /workspaces, /dashboard, /dashboard/apps, /dashboard/settings, /dashboard/billing |
| 006-core-platform-polish | Premium design system — Logo, Topbar, Sidebar upgrade, MetricCard, Billing page, Settings page |
| 007-workspace-selector-polish | Workspace selector redesign مع glow blobs |
| 009-core-platform-ui-qa | QA pass كامل |
| 013-platform-to-shops-flow | Visual flow من Core Platform لـ Shops |

**الحالة الحالية:** frozen ✅

**Routes الموجودة:**
```
/                    → redirect to /login
/login               → form UI (mock)
/register            → form UI (mock)
/workspaces          → workspace selector (3 mock workspaces)
/dashboard           → metric cards + activity feed
/dashboard/apps      → app launcher (Shops active)
/dashboard/billing   → plan card + payment
/dashboard/settings  → 5 tabs (Profile, Workspace, Team, Security, API Keys)
```

**Session Storage Keys:**
- `core_workspace_setup`
- `core_workspace_country`
- `core_workspace_onboarding_done`

**Design System (globals.css):**
```css
.gradient-text     → blue → purple → cyan
.card              → border rgba(255,255,255,0.08), bg rgba(255,255,255,0.03), radius 20px
.card-hover        → hover lift effect
.btn-primary       → gradient #3b82f6 → #6366f1 + glow shadow
.chip              → mono 10px uppercase tracking-wider
.nav-item-active   → gradient bg + 2px left border
```

**Design Tokens:**
- Background: `#0a0a0f`
- Sidebar: `#0a0a0f` border-r border-white/5
- Blue accent: `#3b82f6`
- Purple accent: `#8b5cf6`
- Cyan accent: `#06b6d4`

---

### Shops App (apps/shops-app)

| Feature | الوصف |
|---|---|
| 010-shops-app-foundation | Foundation shell — 9 routes |
| 011-shops-app-ui-polish | Dashboard UI كامل من HTML reference |
| 012-shops-app-ui-qa | QA pass |
| 013-platform-to-shops-flow | Back to Platform link |
| 019-shops-onboarding-business-type-flow | Onboarding 4-step flow |

**الحالة الحالية:** frozen ✅

**Routes الموجودة:**
```
/                    → redirect to /onboarding
/onboarding          → 4-step onboarding flow
/dashboard           → full dashboard مع mock data
/products            → placeholder
/orders              → placeholder
/customers           → placeholder
/reports             → placeholder
/settings            → placeholder
```

**Session Storage Keys:**
- `shops_business_type`
- `shops_mode`
- `shops_store_name`
- `shops_branch`
- `shops_country`
- `shops_currency`
- `shops_onboarding_done`

**Onboarding Flow (4 Steps):**
1. Business type (Mobile Store, Accessories Store, Clothing Store, Supermarket, Electronics Store, Cosmetics Store, Other Retail)
2. Sales model (Physical only, Online only, Both)
3. Setup (Store name, Main branch — currency inherited من workspace)
4. Review → Finish → `/dashboard`

**Dashboard Sections:**
- 4 StatCards مع sparklines
- Quick actions bar
- Recent orders table (mock)
- Low stock panel (mock)
- Top products list (mock)
- Sales by hour CSS bars (mock)

**Sidebar Sections:**
- Operations: Dashboard, Products, Orders, Customers, Reports
- Configure: Settings
- POS card (visual only)

---

## 6. الـ User Journey الكامل

### أول مرة:
```
Landing / Get Started
→ Core Platform /login
→ /onboarding (3 steps: workspace + apps + review)
→ /dashboard/apps
→ Open Shops
→ Shops /onboarding (4 steps)
→ Shops /dashboard
```

### دخول عادي:
```
/login → /workspaces → /dashboard
```

---

## 7. Architecture Rules (لا تُكسر أبداً)

**Core Platform مسموح:**
- Authentication UI
- Workspaces
- App Launcher
- Billing/Settings shell

**Core Platform ممنوع:**
- Products, Inventory, Orders
- Sales, Customers
- أي business logic

**Shops App يملك:**
- كل Commerce/Business logic
- Branches (مش في Core Platform)

**Multi-tenancy:**
- كل business data لازم يكون فيها `workspace_id`
- Branches جوه Shops Settings — مش Workspace جديد

---

## 8. Design System المشترك

**ألوان:**
```
Background:  #0a0a0f
Blue:        #3b82f6
Purple:      #8b5cf6
Cyan:        #06b6d4
Indigo:      #6366f1
```

**CSS Classes المشتركة (في كل app):**
```css
.card           → glass card style
.btn-primary    → gradient button + glow
.chip           → mono uppercase label
.gradient-text  → blue→purple→cyan text
.glow-blob      → absolute blur blob
.nav-item-active → active sidebar state
```

**Typography:**
- Font: Geist Sans + Geist Mono
- `.chip` = 10px mono uppercase

---

## 9. الـ Tooling

| الأداة | الاستخدام |
|---|---|
| Specify CLI | Spec-driven development workflow |
| Claude (هذا الشات) | التخطيط والـ spec والـ review |
| Claude Code / Codex | التنفيذ الفعلي |
| `AGENTS.md` | system instructions لـ Claude Code |
| `.specify/feature.json` | tracks الـ active feature |
| `.agents/commands/` | Spec Kit slash commands |

---

## 10. المراحل الجاية

### Phase 4 — Backend Foundation
```
014 - Laravel API Setup + Docker
015 - Authentication API (Sanctum)
```

### Phase 5 — Core Platform Integration
```
016 - Workspace API
017 - Connect Core Platform UI to real API
```

### Phase 6 — Shops Backend Integration
```
018 - Shops Data Models (Products, Categories, Inventory, Customers, Orders)
019 - Shops API Endpoints
020 - Connect Shops UI to real data
```

### Phase 7 — Billing
```
021 - Stripe Integration
```

### Phase 8 — Production
```
022 - VPS Deploy (Ubuntu 24.04 + Docker Compose + Nginx + Cloudflare)
023 - Monitoring + Backups
```

**الخطوة الأقرب للتنفيذ:**
```
Products + Inventory Module في apps/shops-app (UI فقط أولاً)
```

---

## 11. Build Commands

```bash
pnpm --filter landing build
pnpm --filter core-platform build
pnpm --filter shops-app build

# Lint
pnpm --filter landing lint
pnpm --filter core-platform lint
pnpm --filter shops-app lint
```

---

## 12. قواعد مهمة تتذكرها دايماً

- مش `git add .` — دايماً explicit paths
- مش packages جديدة إلا بـ spec
- مش backend إلا بـ spec
- مش business logic في core-platform
- كل app لها scope محدد
- Branches هي جوه Shops Settings مش Core Platform
- Mock data لازم تكون labeled بوضوح
- كل feature = branch منفصل + spec + plan + tasks

---

*آخر تحديث: مايو 2026*
