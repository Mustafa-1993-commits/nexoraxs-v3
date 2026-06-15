"use client";

import Link from "next/link";
import { Store, Stethoscope, Users, GitBranch, Dumbbell, Wrench, Receipt, PackageX, CreditCard, Info, ChevronRight, Bell, ExternalLink, Settings } from "lucide-react";
import { useApp, OPERATING_SYSTEMS } from "@/lib/store";
import { commerceDashboardUrl, commerceSetupUrl } from "@/lib/commerce-url";

const OS_ICON_MAP: Record<string, React.ReactNode> = {
  store: <Store size={22} />,
  stethoscope: <Stethoscope size={22} />,
  "users-round": <Users size={22} />,
  "git-branch": <GitBranch size={22} />,
  dumbbell: <Dumbbell size={22} />,
  wrench: <Wrench size={22} />,
};

export default function ProductHubPage() {
  const {
    currentUser,
    currentUserDisplayName,
    currentWorkspace,
    currentBU,
    currentBranch,
    currentOSSubscription,
    BUSINESS_UNITS,
    BRANCHES,
    COMMERCE_PLAN,
    subscriptions,
    isCommerceSetupComplete,
    isOnboardingComplete,
    orders,
    products,
    money,
  } = useApp();

  const commerce = OPERATING_SYSTEMS[0];
  const others = OPERATING_SYSTEMS.slice(1);
  const commerceSub = subscriptions.find((s) => s.osId === "commerce");
  const commerceActive = isCommerceSetupComplete && !!commerceSub;

  const setupHref = commerceSetupUrl({
    user: currentUser,
    workspace: currentWorkspace,
    businessUnit: currentBU,
    branch: currentBranch,
    subscription: currentOSSubscription,
  });

  const lim = COMMERCE_PLAN?.limits;
  const buUsed = BUSINESS_UNITS.length;
  const brUsed = BRANCHES.length;
  const usersUsed = 1;

  // Recent activity items
  const latestOrder = orders[0] ?? null;
  const outProduct = products.find((p) => p.stock === 0) ?? null;

  const activity = [
    latestOrder && {
      icon: <Receipt size={15} />, tone: "tone-accent",
      title: `Order ${latestOrder.orderNumber} completed`,
      sub: `${currentBU?.name ?? "Commerce"} · ${money(latestOrder.total)}`,
      time: "latest",
    },
    outProduct && {
      icon: <PackageX size={15} />, tone: "tone-danger",
      title: `${outProduct.name} out of stock`,
      sub: `${currentBU?.name ?? "Commerce"} · reorder needed`,
      time: "now",
    },
    commerceSub && COMMERCE_PLAN && {
      icon: <CreditCard size={15} />, tone: "tone-neutral",
      title: `Commerce OS ${COMMERCE_PLAN.name} renews`,
      sub: `${COMMERCE_PLAN.renew} · ${money(COMMERCE_PLAN.total ?? 0)}`,
      time: "plan",
    },
  ].filter(Boolean) as { icon: React.ReactNode; tone: string; title: string; sub: string; time: string }[];

  const quickLinks = [
    { label: "Team & access", icon: <Users size={16} />, href: "/dashboard/team" },
    { label: "Billing & plans", icon: <CreditCard size={16} />, href: "/dashboard/billing" },
    { label: "Integrations Hub", icon: <GitBranch size={16} />, href: "/dashboard/integrations" },
    { label: "Platform settings", icon: <Settings size={16} />, href: "/dashboard/settings" },
  ];

  return (
    <div className="nx-main-scroll">
      <div className="nx-page" style={{ paddingBlock: "24px" }}>

        {/* Page header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Welcome back, {currentUserDisplayName || "User"}</h1>
            <p className="nx-page-sub">
              {currentWorkspace?.name} · {BUSINESS_UNITS.length} business{BUSINESS_UNITS.length !== 1 ? "es" : ""} · {BRANCHES.length} branch{BRANCHES.length !== 1 ? "es" : ""} · {currentWorkspace?.timezone ?? "UTC"}
            </p>
          </div>
          <div className="nx-row" style={{ gap: 10 }}>
            <Link href="/dashboard/team" className="nx-btn nx-btn-secondary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Users size={15} />Team &amp; access
            </Link>
            <Link href="/dashboard/billing" className="nx-btn nx-btn-secondary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <CreditCard size={15} />Billing
            </Link>
          </div>
        </div>

        {/* Subscription summary card */}
        {COMMERCE_PLAN && lim && (
          <div className="nx-card" style={{ padding: 0, overflow: "hidden", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", flexWrap: "wrap" }}>
              <span className="nx-os-ic" style={{ width: 40, height: 40, background: "var(--accent-weak)", color: "var(--accent)" }}>
                <Store size={19} />
              </span>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div className="nx-row" style={{ gap: 8 }}>
                  <b style={{ fontSize: 14.5 }}>Commerce OS {COMMERCE_PLAN.name}</b>
                  <span className="nx-badge tone-pos" style={{ fontSize: 11 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                    Active
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>
                  Workspace subscription · renews {COMMERCE_PLAN.renew}
                </div>
              </div>
              {[
                { label: "Businesses", used: buUsed, max: lim.businessUnits },
                { label: "Branches", used: brUsed, max: lim.branches },
                { label: "Users", used: usersUsed, max: lim.users },
              ].map(({ label, used, max }) => (
                <div key={label} style={{ minWidth: 116 }}>
                  <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, fontFamily: "var(--mono)" }}>{used}/{max === 99 ? "∞" : max}</span>
                  </div>
                  <div className="nx-progress" style={{ height: 5 }}>
                    <span style={{ width: max === 99 ? "10%" : `${Math.min(100, (used / max) * 100)}%` }} />
                  </div>
                </div>
              ))}
              <Link href="/dashboard/billing" className="nx-btn nx-btn-secondary nx-btn-sm" style={{ textDecoration: "none", display: "inline-flex" }}>
                Manage plan
              </Link>
            </div>
          </div>
        )}

        {/* Two-column layout: product hub + sidebar */}
        <div className="nx-detail">
          {/* Left: Product hub */}
          <div>
            <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
              <div className="nx-section-title">Product Hub</div>
              <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>Subscribe to the systems your business needs</span>
            </div>

            {/* Featured Commerce OS card */}
            <div className="nx-card nx-card-pad nx-os-feature nx-os-card" style={{ marginBottom: 16 }}>
              <div className="nx-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="nx-row" style={{ gap: 14, alignItems: "flex-start" }}>
                  <span className="nx-os-ic" style={{ width: 52, height: 52, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff" }}>
                    <Store size={24} />
                  </span>
                  <div>
                    <div className="nx-row" style={{ gap: 9 }}>
                      <h3 style={{ fontSize: 19, fontWeight: 800 }}>Commerce OS</h3>
                      <span className="nx-badge tone-accent" style={{ fontSize: 11 }}>{COMMERCE_PLAN?.name ?? "Starter"}</span>
                      <span className={`nx-badge ${commerceActive ? "tone-pos" : "tone-neutral"}`} style={{ fontSize: 11 }}>
                        {commerceActive ? (
                          <>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                            Active
                          </>
                        ) : "Set up required"}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 6, fontWeight: 600 }}>{commerce.tagline}</p>
                    <p style={{ fontSize: 13.5, color: "var(--text-2)", marginTop: 8, lineHeight: 1.55, maxWidth: 440 }}>{commerce.desc}</p>
                    {currentBU && (
                      <div className="nx-row" style={{ gap: 7, marginTop: 12, flexWrap: "wrap" }}>
                        <span className="nx-badge tone-accent" style={{ fontSize: 11 }}>{currentBU.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="nx-row" style={{ gap: 10, marginTop: 20 }}>
                {commerceActive ? (
                  <Link href={commerceDashboardUrl()} className="nx-btn nx-btn-primary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <ExternalLink size={15} />Open Commerce
                  </Link>
                ) : (
                  <Link href={isOnboardingComplete ? setupHref : "/onboarding"} className="nx-btn nx-btn-primary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Settings size={15} />Complete Setup
                  </Link>
                )}
                <Link href="/dashboard/billing" className="nx-btn nx-btn-secondary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex" }}>
                  Manage plan
                </Link>
              </div>
            </div>

            {/* Coming soon grid */}
            <div className="nx-hub-grid">
              {others.map((os) => (
                <div key={os.id} className="nx-card nx-card-pad nx-os-card soon">
                  <div className="nx-row" style={{ justifyContent: "space-between" }}>
                    <span className="nx-os-ic" style={{ width: 40, height: 40, background: `${os.accent}14`, color: os.accent }}>
                      {OS_ICON_MAP[os.icon] ?? <Store size={18} />}
                    </span>
                    <span className="nx-badge tone-neutral" style={{ fontSize: 11 }}>Coming Soon</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 13 }}>{os.name}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4, fontWeight: 600, lineHeight: 1.45 }}>{os.tagline}</p>
                  <div className="nx-row" style={{ gap: 8, marginTop: 14 }}>
                    <button className="nx-btn nx-btn-ghost nx-btn-sm" style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Bell size={12} />Notify me
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="nx-note" style={{ marginTop: 16 }}>
              <Info size={14} />
              <span>Each operating system is a standalone subscription — none requires another to run.</span>
            </div>
          </div>

          {/* Right: Activity + Quick links */}
          <div>
            <div className="nx-section-title" style={{ marginBottom: 12 }}>Recent activity</div>
            <div className="nx-card" style={{ padding: 8, marginBottom: 22 }}>
              {activity.length === 0 ? (
                <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>
                  Workspace events will appear after setup, sales, or billing changes.
                </div>
              ) : (
                activity.map((a, i) => (
                  <div key={i} className="nx-row" style={{ gap: 11, padding: "11px 10px", alignItems: "flex-start", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span className={`nx-badge ${a.tone}`} style={{ padding: 6, borderRadius: 9 }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{a.sub}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{a.time}</span>
                  </div>
                ))
              )}
            </div>

            <div className="nx-section-title" style={{ marginBottom: 12 }}>Quick links</div>
            <div className="nx-card" style={{ padding: 8 }}>
              {quickLinks.map(({ label, icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="nx-dd-item"
                  style={{ borderRadius: 9, textDecoration: "none" }}
                >
                  {icon}
                  {label}
                  <ChevronRight size={15} style={{ marginInlineStart: "auto", color: "var(--text-3)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
