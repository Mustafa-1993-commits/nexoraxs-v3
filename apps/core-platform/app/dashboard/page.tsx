"use client";

import Link from "next/link";
import { Store, Stethoscope, UsersRound, GitBranch, Dumbbell, Wrench, ArrowRight, ExternalLink } from "lucide-react";
import { useApp } from "@/lib/store";
import { OPERATING_SYSTEMS } from "@/lib/store";
import { commerceDashboardUrl, commerceSetupUrl } from "@/lib/commerce-url";

const OS_ICONS: Record<string, React.ReactNode> = {
  store: <Store size={22} />,
  stethoscope: <Stethoscope size={22} />,
  "users-round": <UsersRound size={22} />,
  "git-branch": <GitBranch size={22} />,
  dumbbell: <Dumbbell size={22} />,
  wrench: <Wrench size={22} />,
};

export default function DashboardPage() {
  const {
    currentUser,
    currentWorkspace,
    currentUserDisplayName,
    currentBranch,
    currentBU,
    currentOSSubscription,
    isCommerceOSActive,
    isCommerceSetupComplete,
    workspaceStorageUsage,
    storageUsagePercent,
    storageUsageLabel,
    t,
  } = useApp();
  const setupHref = commerceSetupUrl({
    user: currentUser,
    workspace: currentWorkspace,
    businessUnit: currentBU,
    branch: currentBranch,
    subscription: currentOSSubscription,
  });

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">
              Welcome back{currentUserDisplayName ? `, ${currentUserDisplayName.split(" ")[0]}` : ""}
            </h1>
            <p className="nx-page-sub">{currentWorkspace?.name || "Your workspace"} · Product Hub</p>
          </div>
          <Link href="/dashboard/apps" className="nx-btn nx-btn-sm" style={{ textDecoration: "none" }}>
            All systems <ExternalLink size={13} />
          </Link>
        </div>

        {/* Operating Systems */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>
            Operating Systems
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {OPERATING_SYSTEMS.map((os) => {
              const active = os.id === "commerce" && isCommerceOSActive;
              const available = os.status === "available";
              return (
                <div key={os.id} style={{
                  background: "var(--surface)", border: `1px solid ${active ? "var(--accent-weak-2)" : "var(--border)"}`,
                  borderRadius: "var(--r-lg)", padding: "16px 18px", boxShadow: active ? `0 0 0 2px ${os.accent}30` : "var(--sh-sm)",
                  opacity: available ? 1 : 0.65, display: "flex", flexDirection: "column", gap: 10,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "var(--r)", background: os.accent + "18", color: os.accent, display: "grid", placeItems: "center" }}>
                      {OS_ICONS[os.icon] ?? <Store size={22} />}
                    </div>
                    <span className={`nx-badge ${active ? "tone-pos" : available ? "tone-accent" : "tone-neutral"}`} style={{ fontSize: 11 }}>
                      {active ? "Active" : available ? "Available" : "Soon"}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{os.name}</div>
                    <div style={{ fontSize: 11.5, color: os.accent, fontWeight: 600, marginTop: 2 }}>{os.tagline}</div>
                  </div>
                  {active && isCommerceSetupComplete && (
                    <Link href={commerceDashboardUrl()} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--accent)", textDecoration: "none", fontWeight: 600, marginTop: "auto" }}>
                      Open Commerce OS <ArrowRight size={13} />
                    </Link>
                  )}
                  {active && !isCommerceSetupComplete && (
                    <Link href={setupHref} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--accent)", textDecoration: "none", fontWeight: 600, marginTop: "auto" }}>
                      Complete setup <ArrowRight size={13} />
                    </Link>
                  )}
                  {!available && (
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>Coming soon — stay tuned.</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {workspaceStorageUsage && (
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)", padding: "16px 18px", boxShadow: "var(--sh-sm)",
            display: "flex", flexDirection: "column", gap: 10, maxWidth: 380,
          }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".07em" }}>
              {t("storage_used")}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{storageUsageLabel}</div>
            <div style={{ height: 6, borderRadius: 999, background: "var(--surface-2)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${storageUsagePercent}%`, background: "var(--accent)", borderRadius: 999 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
