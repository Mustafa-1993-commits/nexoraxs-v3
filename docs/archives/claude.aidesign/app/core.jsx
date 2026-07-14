// ============================================================
// NexoraXS — Core Platform: OS Launcher, Billing, Team, Integrations
// ============================================================

/* ---------------- Product Hub (Core Platform home) ---------------- */
const OS_STATUS = {
  active: { label: "Active", tone: "pos", dot: true },
  setup: { label: "Set up required", tone: "accent", dot: true },
  trial: { label: "Trial", tone: "warn", dot: true },
  soon: { label: "Coming Soon", tone: "neutral", dot: false },
  locked: { label: "Locked", tone: "neutral", dot: false },
};
function OSStatusBadge({ status }) {
  const s = OS_STATUS[status] || OS_STATUS.soon;
  return <Badge tone={s.tone} dot={s.dot}>{s.label}</Badge>;
}

function OsLauncher() {
  const { nav, setupDone, OPERATING_SYSTEMS, COMMERCE_PLAN, BUSINESS_UNITS, workspace, subscriptions, t, lang, money, currentUserDisplayName, currentBU, branch, orders, products, team } = useApp();
  const commerce = OPERATING_SYSTEMS[0];
  const others = OPERATING_SYSTEMS.slice(1);
  const commerceSub = subscriptions.find((s) => s.osId === "commerce");
  const commerceStatus = (commerceSub && commerceSub.status === "active") || setupDone ? "active" : "setup";
  const lim = COMMERCE_PLAN.limits;
  const planTier = COMMERCE_PLAN.plan ? COMMERCE_PLAN.plan.tier : "Starter";
  const latestOrder = orders[0];
  const latestOrderTotal = latestOrder ? (latestOrder.items || []).reduce((s, i) => s + (+i.price || 0) * (+i.qty || 0), 0) - (+latestOrder.discount || 0) : 0;
  const outProduct = products.find((p) => p.stock === 0);
  const invited = team.find((m) => m.status === "Invited");
  const activity = [
    latestOrder && { ic: "receipt", tone: "accent", t: `Order ${latestOrder.num} completed`, s: `${latestOrder.invoice} · ${money(latestOrderTotal)} · ${branch}`, time: "latest" },
    outProduct && { ic: "package-x", tone: "danger", t: `${outProduct.name} out of stock`, s: `${currentBU ? currentBU.name : "Commerce"} · reorder needed`, time: "now" },
    invited && { ic: "user-plus", tone: "teal", t: `${invited.name} invited`, s: `${invited.role} · ${invited.os}`, time: "pending" },
    commerceSub && { ic: "credit-card", tone: "neutral", t: `Commerce OS ${planTier} ${COMMERCE_PLAN.status === "trialing" ? "trial ends" : "renews"}`, s: `${COMMERCE_PLAN.renew} · ${money(COMMERCE_PLAN.total)}`, time: "plan" },
  ].filter(Boolean);

  return (
    <CoreShell crumb={<><Icon name="building-2" size={15} /><b>{workspace.name}</b><Icon name="chevron-right" size={14} /><span>{t("product_hub")}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">{lang === "ar" ? "أهلاً" : `Welcome back, ${currentUserDisplayName || "User"}`}</h1>
            <p className="nx-page-sub">{workspace.name} · {BUSINESS_UNITS.length} business units · {COMMERCE_PLAN.limits.branches.used} branches · {workspace.timezone}</p>
          </div>
          <div className="nx-row" style={{ gap: 10 }}>
            <Button variant="secondary" icon="users" onClick={() => nav("team")}>Team & access</Button>
            <Button variant="secondary" icon="credit-card" onClick={() => nav("billing")}>Billing</Button>
          </div>
        </div>

        {/* subscription summary */}
        <Card style={{ padding: 0, overflow: "hidden", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", flexWrap: "wrap" }}>
            <span className="nx-os-ic" style={{ width: 40, height: 40, background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="badge-check" size={19} /></span>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div className="nx-row" style={{ gap: 8 }}><b style={{ fontSize: 14.5 }}>{COMMERCE_PLAN.name}</b><Badge tone="pos" dot>Active</Badge></div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>Workspace subscription · renews {COMMERCE_PLAN.renew}</div>
            </div>
            {[["Business units", lim.businessUnits], ["Branches", lim.branches], ["Users", lim.users]].map(([label, m]) => (
              <div key={label} style={{ minWidth: 116 }}>
                <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{label}</span><span className="mono" style={{ fontSize: 11.5, fontWeight: 700 }}>{m.used}/{m.max}</span></div>
                <div className="nx-progress" style={{ height: 5 }}><span style={{ width: (m.used / m.max * 100) + "%" }} /></div>
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={() => nav("billing")}>Manage plan</Button>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 22 }} className="nx-detail">
          {/* Product Hub */}
          <div>
            <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
              <div className="nx-section-title">{t("product_hub")}</div>
              <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>Subscribe to the systems your business needs</span>
            </div>

            {/* Featured Commerce card */}
            <Card className="nx-os-feature" pad style={{ marginBottom: 16 }}>
              <div className="nx-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="nx-row" style={{ gap: 14, alignItems: "flex-start" }}>
                  <span className="nx-os-ic" style={{ width: 52, height: 52, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "#fff" }}><Icon name="store" size={24} /></span>
                  <div>
                    <div className="nx-row" style={{ gap: 9 }}><h3 style={{ fontSize: 19, fontWeight: 800 }}>Commerce OS</h3><Badge tone="accent">Pro</Badge><OSStatusBadge status={commerceStatus} /></div>
                    <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 6, fontWeight: 600 }}>{commerce.tagline}</p>
                    <p style={{ fontSize: 13.5, color: "var(--text-2)", marginTop: 8, lineHeight: 1.55, maxWidth: 440 }}>{commerce.desc}</p>
                    <div className="nx-row" style={{ gap: 7, marginTop: 12, flexWrap: "wrap" }}>
                      {BUSINESS_UNITS.filter((b) => b.os === "commerce").map((b) => <Badge key={b.id} tone="teal" icon={b.icon}>{b.name}</Badge>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="nx-row" style={{ gap: 10, marginTop: 20 }}>
                <Button icon={commerceStatus === "active" ? "arrow-right" : "settings-2"} onClick={() => nav(commerceStatus === "active" ? "dashboard" : "commerce-setup")}>{commerceStatus === "active" ? "Open Commerce" : t("set_up")}</Button>
                <Button variant="secondary" onClick={() => nav("billing")}>Manage plan</Button>
              </div>
            </Card>

            {/* Coming soon grid */}
            <div className="nx-hub-grid">
              {others.map((os) => (
                <Card key={os.id} className="nx-os-card soon" pad>
                  <div className="nx-row" style={{ justifyContent: "space-between" }}>
                    <span className="nx-os-ic" style={{ width: 40, height: 40, background: os.accent + "14", color: os.accent }}><Icon name={os.icon} size={19} /></span>
                    <OSStatusBadge status="soon" />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 13 }}>{os.name}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4, fontWeight: 600, lineHeight: 1.45 }}>{os.tagline}</p>
                  <div className="nx-row" style={{ gap: 8, marginTop: 14 }}>
                    <Button variant="ghost" size="sm" icon="bell">Notify me</Button>
                    <Button variant="ghost" size="sm">Learn more</Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="nx-note" style={{ marginTop: 16 }}><Icon name="info" size={15} />Each operating system is a standalone subscription — none requires another to run.</div>
          </div>

          {/* Recent activity */}
          <div>
            <div className="nx-section-title" style={{ marginBottom: 12 }}>Recent activity</div>
            <Card style={{ padding: 8 }}>
              {activity.length === 0 && <EmptyState icon="activity" title="No activity yet" desc="Workspace events will appear after setup, sales, invitations or billing changes." />}
              {activity.map((a, i) => (
                <div key={i} className="nx-row" style={{ gap: 11, padding: "11px 10px", alignItems: "flex-start", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span className={"nx-badge tone-" + a.tone} style={{ padding: 6, borderRadius: 9 }}><Icon name={a.ic} size={15} /></span>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{a.t}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>{a.s}</div></div>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>{a.time}</span>
                </div>
              ))}
            </Card>
            <div className="nx-section-title" style={{ margin: "20px 0 12px" }}>Quick links</div>
            <Card style={{ padding: 8 }}>
              {[["Team & access", "users", "team"], ["Billing & plans", "credit-card", "billing"], ["Integrations Hub", "plug", "integrations"], ["Audit log", "scroll-text", "platform-settings"], ["Platform settings", "settings", "platform-settings"]].map(([label, ic, screen]) => (
                <button key={label} className="nx-dd-item" onClick={() => nav(screen)} style={{ borderRadius: 9 }}><Icon name={ic} size={16} />{label}<Icon name="chevron-right" size={15} style={{ marginInlineStart: "auto", color: "var(--text-3)" }} /></button>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}

/* ---------------- Billing ---------------- */
function Billing() {
  const { nav, money, OPERATING_SYSTEMS, COMMERCE_PLAN, t, workspace, currentUser, currentCommerceSetup } = useApp();
  const lim = COMMERCE_PLAN.limits;
  const planTier = COMMERCE_PLAN.plan ? COMMERCE_PLAN.plan.tier : "Starter";
  const planName = `Commerce OS ${planTier}`;
  const planStatus = COMMERCE_PLAN.status === "trialing" ? "Trial" : COMMERCE_PLAN.status === "active" ? "Active" : COMMERCE_PLAN.status;
  const platformInvoices = [
    { num: "NX-2026-0006", date: "28 May 2026", os: "Commerce OS", plan: `${planTier} · ${COMMERCE_PLAN.status === "trialing" ? "Trial" : "Monthly"}`, total: COMMERCE_PLAN.total, status: COMMERCE_PLAN.status === "trialing" ? "Trialing" : "Paid" },
    { num: "NX-2026-0005", date: "28 Apr 2026", os: "Commerce OS", plan: `${planTier} · Monthly`, total: COMMERCE_PLAN.total, status: "Paid" },
    { num: "NX-2026-0004", date: "28 Mar 2026", os: "Commerce OS", plan: `${planTier} · Monthly`, total: COMMERCE_PLAN.total, status: "Paid" },
    { num: "NX-2026-0003", date: "28 Feb 2026", os: "Commerce OS", plan: `${planTier} · Monthly`, total: COMMERCE_PLAN.total, status: "Paid" },
  ];
  return (
    <CoreShell crumb={<><Icon name="building-2" size={15} /><b>{workspace.name}</b><Icon name="chevron-right" size={14} /><span>{t("billing")}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><h1 className="nx-page-title">{t("billing")} & subscriptions</h1><p className="nx-page-sub">Manage your NexoraXS plans, payment method and platform invoices.</p></div>
        </div>
        <div className="nx-helper" style={{ marginBottom: 22, maxWidth: "none" }}>
          <Icon name="info" size={16} />
          These are <b style={{ margin: "0 4px" }}>platform subscriptions</b> billed by NexoraXS to {workspace.name} — separate from the sales invoices your Commerce OS issues to its customers.
        </div>

        {/* Active subscription */}
        <Card style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 16, padding: 22, alignItems: "center", flexWrap: "wrap" }}>
            <span className="nx-os-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="store" size={22} /></span>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="nx-row" style={{ gap: 8 }}><h3 style={{ fontSize: 16, fontWeight: 700 }}>{planName} Plan</h3><Badge tone={COMMERCE_PLAN.status === "trialing" ? "warn" : "pos"} dot>{planStatus}</Badge></div>
              <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 3 }}>{COMMERCE_PLAN.status === "trialing" ? "Trial ends" : "Renews"} {COMMERCE_PLAN.renew} · Visa ending 4242</p>
            </div>
            <div style={{ textAlign: "end" }}>
              <div className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{money(1596)}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>per month · incl. {money(196)} VAT</div>
            </div>
            <div className="nx-row" style={{ gap: 8 }}>
              <Button variant="secondary" size="sm">Change plan</Button>
              <Button variant="ghost" size="sm" icon="ellipsis">Manage</Button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--border)" }}>
            {[["Plan", planName], ["Billing cycle", COMMERCE_PLAN.status === "trialing" ? "Trial" : "Monthly"], ["Net", money(COMMERCE_PLAN.price)], ["VAT (14%)", money(COMMERCE_PLAN.vat)]].map(([k, v], i) => (
              <div key={k} style={{ padding: 16, borderInlineStart: i ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{k}</div>
                <div style={{ fontWeight: 700, marginTop: 4, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan limits */}
        <Card style={{ marginBottom: 20 }}>
          <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
            <div className="nx-section-title">Plan limits · {planName}</div>
            <button className="nx-link" onClick={() => nav("os-launcher")}>View usage in Product Hub</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="nx-billing-cols">
            {[["Business units", lim.businessUnits, "building-2"], ["Branches", lim.branches, "map-pin"], ["Team users", lim.users, "users"]].map(([label, m, ic]) => (
              <div key={label}>
                <div className="nx-row" style={{ gap: 8, marginBottom: 9 }}><Icon name={ic} size={15} style={{ color: "var(--text-3)" }} /><span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span></div>
                <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 6 }}><span className="mono" style={{ fontSize: 18, fontWeight: 700 }}>{m.used}<span style={{ color: "var(--text-3)", fontSize: 13 }}> / {m.max}</span></span><span style={{ fontSize: 11.5, color: "var(--text-3)" }}>{m.max - m.used} left</span></div>
                <div className="nx-progress"><span style={{ width: (m.used / m.max * 100) + "%", background: m.used / m.max > 0.85 ? "var(--warn)" : "var(--accent)" }} /></div>
              </div>
            ))}
          </div>
          <div className="nx-helper" style={{ marginTop: 18 }}>
            <Icon name="arrow-up-circle" size={16} />Need more business units or branches? Upgrade to <b style={{ margin: "0 4px" }}>Commerce Business</b> for custom limits and advanced permissions.
          </div>
        </Card>

        {/* Future subscriptions */}
        <div className="nx-section-title" style={{ marginBottom: 12 }}>Add more operating systems</div>
        <div className="nx-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", marginBottom: 26 }}>
          {OPERATING_SYSTEMS.filter((o) => o.status !== "available").map((os) => (
            <Card key={os.id} pad style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="nx-os-ic" style={{ width: 38, height: 38, background: os.accent + "18", color: os.accent }}><Icon name={os.icon} size={18} /></span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{os.name}</div><Badge tone="neutral">Coming Soon</Badge></div>
            </Card>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }} className="nx-billing-cols">
          {/* Billing details */}
          <Card>
            <div className="nx-section-title" style={{ marginBottom: 14 }}>Billing details</div>
            <div className="nx-form-grid">
              <Field label="Billing name"><Input defaultValue={workspace.name} /></Field>
              <Field label="Billing email"><Input icon="mail" defaultValue={currentUser ? currentUser.email : "billing@company.com"} /></Field>
              <Field label="Address"><Input defaultValue={currentCommerceSetup ? `${currentCommerceSetup.address || ""}${currentCommerceSetup.city ? ", " + currentCommerceSetup.city : ""}` : ""} /></Field>
              <div className="nx-form-grid cols-2">
                <Field label="Tax number" optional><Input defaultValue={currentCommerceSetup ? currentCommerceSetup.taxNumber : ""} /></Field>
                <Field label="Country"><Select defaultValue={workspace.country || "Egypt"}><option>Egypt</option><option>Saudi Arabia</option><option>United Arab Emirates</option></Select></Field>
              </div>
              <Button variant="secondary" size="sm" style={{ alignSelf: "flex-start" }}>Save details</Button>
            </div>
          </Card>

          {/* Platform invoice preview */}
          <div>
            <div className="nx-section-title" style={{ marginBottom: 14 }}>Latest platform invoice</div>
            <Card style={{ padding: 22, background: "var(--surface-2)" }}>
              <div className="nx-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div><Logo size={24} /><div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>NexoraXS · nexoraxs.com</div></div>
                <div style={{ textAlign: "end" }}><div style={{ fontWeight: 800, fontSize: 16, color: "var(--accent)" }}>Subscription Invoice</div><div className="mono" style={{ fontSize: 12, color: "var(--text-2)" }}>NX-2026-0006</div></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0", fontSize: 12.5 }}>
                <div><div style={{ color: "var(--text-3)" }}>Billed to</div><b>{workspace.name}</b></div>
                <div style={{ textAlign: "end" }}><div style={{ color: "var(--text-3)" }}>Date</div><b>28 May 2026</b></div>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                {[[`${planName} Plan (${COMMERCE_PLAN.status === "trialing" ? "trial" : "monthly"})`, money(COMMERCE_PLAN.price)], ["Coupon (LAUNCH10)", "−" + money(0)]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span style={{ color: "var(--text-2)" }}>{k}</span><span className="mono">{v}</span></div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span style={{ color: "var(--text-2)" }}>VAT (14%)</span><span className="mono">{money(COMMERCE_PLAN.vat)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, borderTop: "2px solid #14161d", paddingTop: 10, marginTop: 4 }}><span>Total</span><span className="mono">{money(COMMERCE_PLAN.total)}</span></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Invoices list */}
        <div className="nx-section-title" style={{ margin: "26px 0 12px" }}>Platform invoices</div>
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead><tr><th>Invoice</th><th>Date</th><th>Operating system</th><th>Plan</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {platformInvoices.map((inv) => (
                <tr key={inv.num}>
                  <td className="num nx-td-strong">{inv.num}</td>
                  <td className="nx-td-muted">{inv.date}</td>
                  <td>{inv.os}</td>
                  <td className="nx-td-muted">{inv.plan}</td>
                  <td className="num">{money(inv.total)}</td>
                  <td><Badge tone="pos" dot>{inv.status}</Badge></td>
                  <td><button className="nx-link"><Icon name="download" size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CoreShell>
  );
}

/* ---------------- Team & Permissions ---------------- */
const ROLE_TONE = { Owner: "accent", "Commerce Manager": "accent", Manager: "teal", "Branch Manager": "teal", "Inventory Manager": "teal", Accountant: "warn", Cashier: "warn", Viewer: "neutral" };
const COMMERCE_ROLES = ["Commerce Manager", "Branch Manager", "Cashier", "Inventory Manager", "Accountant", "Viewer"];
function Team() {
  const { team, BRANCHES, BUSINESS_UNITS, t, showToast, platform, workspace, currentBU } = useApp();
  const [invite, setInvite] = useState(false);
  const [perms, setPerms] = useState(false);
  const defaultBUName = currentBU && currentBU.name ? currentBU.name : (BUSINESS_UNITS.find((b) => b.os === "commerce") || {}).name || "All business units";
  const [form, setForm] = useState({ email: "", name: "", wsRole: "Member", os: "Commerce OS", bu: defaultBUName, branch: "All branches", osRole: "Cashier" });

  const doInvite = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { showToast("Enter a valid email", "error"); return; }
    const name = form.name.trim() || form.email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const buRow = BUSINESS_UNITS.find((b) => b.name === form.bu);
    const brRow = (window.NexoraDB.Q.branches(platform.db)).find((b) => b.name === form.branch);
    platform.addTeamMember({
      email: form.email, name, workspaceRole: form.wsRole,
      osId: form.os === "Commerce OS" ? "commerce" : null, osRole: form.osRole,
      businessUnitId: buRow ? buRow.id : null, branchId: brRow ? brRow.id : null,
    });
    setInvite(false); setForm({ email: "", name: "", wsRole: "Member", os: "Commerce OS", bu: defaultBUName, branch: "All branches", osRole: "Cashier" }); showToast("Invitation sent");
  };

  return (
    <CoreShell crumb={<><Icon name="building-2" size={15} /><b>{workspace.name}</b><Icon name="chevron-right" size={14} /><span>{t("team")}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><h1 className="nx-page-title">{t("team")}</h1><p className="nx-page-sub">Invite people and control what they can do in each operating system.</p></div>
          <div className="nx-row" style={{ gap: 10 }}>
            <Button variant="secondary" icon="shield" onClick={() => setPerms(true)}>Permissions</Button>
            <Button icon="user-plus" onClick={() => setInvite(true)}>Invite member</Button>
          </div>
        </div>
        <div className="nx-helper" style={{ marginBottom: 20, maxWidth: "none" }}>
          <Icon name="info" size={16} />When HR OS is enabled, it becomes the master employee system and team members sync from there.
        </div>
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Assigned OS</th><th>Last active</th><th></th></tr></thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.id}>
                  <td><div className="nx-row" style={{ gap: 10 }}><Avatar name={m.name} size={32} /><div><div className="nx-td-strong">{m.name} {m.you && <span style={{ fontSize: 11, color: "var(--text-3)" }}>(you)</span>}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>{m.email}</div></div></div></td>
                  <td><Badge tone={ROLE_TONE[m.role]}>{m.role}</Badge></td>
                  <td><Badge tone={m.status === "Active" ? "pos" : "warn"} dot>{m.status}</Badge></td>
                  <td className="nx-td-muted">{m.os}</td>
                  <td className="nx-td-muted">{m.last}</td>
                  <td><button className="nx-icon-btn"><Icon name="ellipsis" size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={invite} onClose={() => setInvite(false)} width={560} title="Invite a team member" subtitle={`They'll get an email to join ${workspace.name}.`}
        footer={<><Button variant="ghost" onClick={() => setInvite(false)}>Cancel</Button><Button icon="send" onClick={doInvite}>Send invitation</Button></>}>
        <div className="nx-form-grid">
          <div className="nx-form-grid cols-2">
            <Field label="Email address"><Input icon="mail" placeholder="name@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Name" optional><Input icon="user" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          </div>
          <Field label="Workspace role" hint="Controls workspace-level access like billing and team.">
            <Select value={form.wsRole} onChange={(e) => setForm({ ...form, wsRole: e.target.value })}>{["Owner", "Administrator", "Member"].map((r) => <option key={r}>{r}</option>)}</Select>
          </Field>
          <hr className="nx-divider" />
          <div className="nx-field-label">Operating system access</div>
          <div className="nx-form-grid cols-2">
            <Field label="Assigned OS"><Select value={form.os} onChange={(e) => setForm({ ...form, os: e.target.value })}><option>Commerce OS</option><option disabled>Healthcare OS · soon</option><option disabled>Gym OS · soon</option></Select></Field>
            <Field label="OS role"><Select value={form.osRole} onChange={(e) => setForm({ ...form, osRole: e.target.value })}>{COMMERCE_ROLES.map((r) => <option key={r}>{r}</option>)}</Select></Field>
          </div>
          <div className="nx-form-grid cols-2">
            <Field label="Business unit access"><Select value={form.bu} onChange={(e) => setForm({ ...form, bu: e.target.value })}><option>All business units</option>{BUSINESS_UNITS.filter((b) => b.os === "commerce").map((b) => <option key={b.id}>{b.name}</option>)}</Select></Field>
            <Field label="Branch access"><Select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}><option>All branches</option>{BRANCHES.map((b) => <option key={b}>{b}</option>)}</Select></Field>
          </div>
          <div className="nx-note"><Icon name="info" size={14} />The same person can hold a different role and branch access in each operating system.</div>
        </div>
      </Modal>

      <Modal open={perms} onClose={() => setPerms(false)} width={560} title="Role permissions" subtitle="What each role can do across the platform.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            ["Core platform", [["core.billing.manage", "Owner"], ["core.team.manage", "Owner, Administrator"]]],
            ["Commerce OS", [["commerce.pos.use", "Commerce Manager, Branch Manager, Cashier"], ["commerce.products.manage", "Commerce Manager, Inventory Manager"], ["commerce.orders.view", "Commerce Manager, Branch Manager, Cashier"], ["commerce.invoices.view", "Commerce Manager, Accountant"], ["commerce.reports.view", "Commerce Manager, Accountant, Branch Manager"], ["commerce.settings.manage", "Commerce Manager"]]],
          ].map(([grp, rows]) => (
            <div key={grp}>
              <div className="nx-field-label" style={{ marginBottom: 8 }}>{grp}</div>
              <div className="nx-table-wrap">
                <table className="nx-table">
                  <tbody>{rows.map(([p, r]) => <tr key={p}><td className="mono" style={{ fontSize: 12 }}>{p}</td><td className="nx-td-muted" style={{ textAlign: "end" }}>{r}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </CoreShell>
  );
}

/* ---------------- Integrations Hub ---------------- */
function Integrations() {
  const { t, workspace } = useApp();
  const cards = [
    { from: "Commerce", to: "Healthcare", fi: "store", ti: "stethoscope", title: "Prescription to pharmacy fulfillment", desc: "A doctor creates a prescription in Healthcare OS. The pharmacy in Commerce OS fulfills it, creates a sale invoice, deducts inventory and updates prescription status." },
    { from: "Commerce", to: "HR", fi: "store", ti: "users-round", title: "Employees and cashier roles", desc: "Employees created in HR OS can be assigned as cashiers, managers or branch staff in Commerce OS." },
    { from: "Commerce", to: "CRM", fi: "store", ti: "git-branch", title: "Customers and campaigns", desc: "Customers from Commerce OS sync to CRM OS for campaigns, leads and follow-ups." },
    { from: "Gym", to: "HR", fi: "dumbbell", ti: "users-round", title: "Trainers and attendance", desc: "Trainers created in HR OS can be assigned to classes in Gym OS." },
    { from: "Maintenance", to: "Commerce", fi: "wrench", ti: "store", title: "Spare parts inventory sync", desc: "Repair tickets in Maintenance OS draw spare parts from Commerce OS inventory." },
  ];
  return (
    <CoreShell crumb={<><Icon name="building-2" size={15} /><b>{workspace.name}</b><Icon name="chevron-right" size={14} /><span>{t("integrations")}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">Integrations Hub</h1><p className="nx-page-sub">Connect operating systems so data flows between them. These light up as more systems launch.</p></div></div>
        <div className="nx-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))" }}>
          {cards.map((c, i) => (
            <Card key={i} pad style={{ display: "flex", flexDirection: "column" }}>
              <div className="nx-row" style={{ justifyContent: "space-between" }}>
                <div className="nx-row" style={{ gap: 8 }}>
                  <span className="nx-choice-ic" style={{ width: 34, height: 34 }}><Icon name={c.fi} size={16} /></span>
                  <Icon name="arrow-right" size={15} style={{ color: "var(--text-3)" }} />
                  <span className="nx-choice-ic" style={{ width: 34, height: 34 }}><Icon name={c.ti} size={16} /></span>
                </div>
                <Badge tone="neutral">Coming Soon</Badge>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", marginTop: 14 }}>{c.from} OS ↔ {c.to} OS</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 5 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 7, lineHeight: 1.55, flex: 1 }}>{c.desc}</p>
              <Button variant="secondary" size="sm" disabled icon="lock" style={{ marginTop: 16, alignSelf: "flex-start" }}>Notify me</Button>
            </Card>
          ))}
        </div>
      </div>
    </CoreShell>
  );
}

/* ---------------- Platform settings (Shopify-style) ---------------- */
function PlatformSettings() {
  const { t, lang, setLang, theme, setTheme, nav, showToast, workspace, platform } = useApp();
  const [tab, setTab] = useState("workspace");
  const [ws, setWs] = useState({ name: workspace.name, country: workspace.country, currency: workspace.currency, timezone: workspace.timezone });
  useEffect(() => { setWs({ name: workspace.name, country: workspace.country, currency: workspace.currency, timezone: workspace.timezone }); }, [workspace.id, workspace.name, workspace.country, workspace.currency, workspace.timezone]);
  const saveWorkspace = () => { platform.updateWorkspace(ws); showToast("Workspace settings saved"); };
  const sections = [
    ["workspace", "Workspace", "building-2"],
    ["region", "Language & Region", "languages"],
    ["appearance", "Appearance", "palette"],
    ["team", "Team & Access", "users"],
    ["billing", "Billing", "credit-card"],
  ];
  const comingSoon = [["api", "API Keys", "key-round"], ["security", "Advanced Security", "shield-check"], ["delete", "Delete Workspace", "trash-2"]];

  return (
    <CoreShell crumb={<><Icon name="building-2" size={15} /><b>{workspace.name}</b><Icon name="chevron-right" size={14} /><span>{t("settings")}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">Settings</h1><p className="nx-page-sub">Workspace-wide preferences for {workspace.name}.</p></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "224px 1fr", gap: 24 }} className="nx-detail">
          <nav style={{ position: "sticky", top: 20, alignSelf: "start", display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map(([id, label, ic]) => (
              <button key={id} className={"nx-nav-item" + (tab === id ? " active" : "")} onClick={() => setTab(id)}><Icon name={ic} size={17} />{label}</button>
            ))}
            <div className="nx-sb-group-label" style={{ paddingTop: 16 }}>Advanced</div>
            {comingSoon.map(([id, label, ic]) => (
              <button key={id} className="nx-nav-item" style={{ opacity: .55, cursor: "default" }} disabled><Icon name={ic} size={17} />{label}<span className="nx-nav-badge"><Badge tone="neutral">Soon</Badge></span></button>
            ))}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
            {tab === "workspace" && (
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 16 }}>Workspace</div>
                <div className="nx-form-grid">
                  <div className="nx-form-grid cols-2">
                    <Field label="Workspace name"><Input value={ws.name} onChange={(e) => setWs({ ...ws, name: e.target.value })} /></Field>
                    <Field label="Country"><Select value={ws.country || "EG"} onChange={(e) => setWs({ ...ws, country: e.target.value })}><option value="EG">Egypt</option><option value="SA">Saudi Arabia</option><option value="AE">United Arab Emirates</option></Select></Field>
                  </div>
                  <div className="nx-form-grid cols-2">
                    <Field label="Currency"><Select value={ws.currency || "EGP"} onChange={(e) => setWs({ ...ws, currency: e.target.value })}><option>EGP</option><option>SAR</option><option>AED</option><option>USD</option></Select></Field>
                    <Field label="Timezone"><Select value={ws.timezone || "Africa/Cairo"} onChange={(e) => setWs({ ...ws, timezone: e.target.value })}><option>Africa/Cairo</option><option>Asia/Riyadh</option><option>Asia/Dubai</option></Select></Field>
                  </div>
                  <Button size="sm" style={{ alignSelf: "flex-start" }} onClick={saveWorkspace}>Save changes</Button>
                </div>
              </Card>
            )}
            {tab === "region" && (
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 16 }}>Language & region</div>
                <div className="nx-form-grid">
                  <Field label="Interface language" hint="Arabic switches the whole interface to right-to-left.">
                    <div className="nx-seg">
                      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>English (LTR)</button>
                      <button className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>العربية (RTL)</button>
                    </div>
                  </Field>
                  <div className="nx-form-grid cols-2">
                    <Field label="Currency"><Select value={workspace.currency || "EGP"} onChange={() => {}}><option value="EGP">EGP — Egyptian Pound</option><option value="SAR">SAR — Saudi Riyal</option><option value="AED">AED — UAE Dirham</option></Select></Field>
                    <Field label="Date format"><Select defaultValue="dmy"><option value="dmy">DD/MM/YYYY</option><option value="mdy">MM/DD/YYYY</option></Select></Field>
                  </div>
                </div>
              </Card>
            )}
            {tab === "appearance" && (
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 6 }}>Appearance</div>
                <p className="nx-page-sub" style={{ marginBottom: 16 }}>Choose how NexoraXS looks for you on this device.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["light", "Light", "sun"], ["dark", "Dark", "moon"]].map(([id, label, ic]) => (
                    <button key={id} className={"nx-choice" + (theme === id ? " on" : "")} style={{ flexDirection: "column", alignItems: "stretch", gap: 12, padding: 14 }} onClick={() => setTheme(id)}>
                      <span className={"nx-theme-swatch " + id}><span /><span /><span /></span>
                      <span className="nx-row" style={{ gap: 8 }}><Icon name={ic} size={16} /><span style={{ fontWeight: 700, fontSize: 13.5 }}>{label}</span><span className="nx-choice-check" style={{ position: "static", marginInlineStart: "auto" }}><Icon name="check" size={13} /></span></span>
                    </button>
                  ))}
                </div>
              </Card>
            )}
            {tab === "team" && (
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 8 }}>Team & Access</div>
                <p className="nx-page-sub" style={{ marginBottom: 16 }}>Manage members, roles and branch access for your workspace.</p>
                <Button icon="users" onClick={() => nav("team")}>Open Team & Access</Button>
              </Card>
            )}
            {tab === "billing" && (
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 8 }}>Billing</div>
                <p className="nx-page-sub" style={{ marginBottom: 16 }}>Manage your NexoraXS operating-system subscriptions and platform invoices.</p>
                <Button icon="credit-card" onClick={() => nav("billing")}>Open Billing</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CoreShell>
  );
}

Object.assign(window, { OsLauncher, Billing, Team, Integrations, PlatformSettings });
