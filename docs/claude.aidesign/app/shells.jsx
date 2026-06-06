// ============================================================
// NexoraXS — App shells (Core Platform + Commerce OS)
// ============================================================

function useDismiss(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return ref;
}

/* ---------- Language switch ---------- */
function LangSwitch() {
  const { lang, setLang } = useApp();
  return (
    <div className="nx-langswitch" title="Language / اللغة">
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
      <button className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>ع</button>
    </div>
  );
}

/* ---------- Theme toggle ---------- */
function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button className="nx-icon-btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light" : "Switch to dark"} aria-label="Toggle theme">
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}

/* ---------- Notifications ---------- */
function NotifBell() {
  const { products, orders, COMMERCE_PLAN, money } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));
  const low = products.find((p) => p.stock > 0 && p.stock <= p.low);
  const out = products.find((p) => p.stock === 0);
  const latest = orders[0];
  const items = [
    low && { ic: "alert-triangle", tone: "warn", t: `${low.name} is low on stock`, s: `${low.stock} left · threshold ${low.low}`, time: "now" },
    out && { ic: "package-x", tone: "danger", t: `${out.name} is out of stock`, s: "Reorder to keep selling", time: "now" },
    latest && { ic: "receipt", tone: "accent", t: `Order ${latest.num} completed`, s: `${latest.invoice} · ${latest.payment}`, time: "latest" },
    COMMERCE_PLAN.subscription && { ic: "credit-card", tone: "neutral", t: `Commerce OS ${COMMERCE_PLAN.status === "trialing" ? "trial ends" : "renews"}`, s: `${COMMERCE_PLAN.name} · ${money(COMMERCE_PLAN.total)}`, time: COMMERCE_PLAN.renew },
  ].filter(Boolean);
  return (
    <div className="nx-pop-wrap" ref={ref}>
      <button className="nx-icon-btn" onClick={() => setOpen(!open)} style={{ position: "relative" }}><Icon name="bell" size={19} /><span className="nx-notif-dot" /></button>
      {open && (
        <div className="nx-dd" style={{ minWidth: 320 }}>
          <div className="nx-dd-label" style={{ display: "flex", justifyContent: "space-between" }}>Notifications <span style={{ color: "var(--accent)" }}>{items.length} new</span></div>
          {items.length === 0 && <div style={{ padding: "12px 11px", fontSize: 13, color: "var(--text-3)" }}>No notifications for the current mock data.</div>}
          {items.map((n, i) => (
            <button className="nx-dd-item" key={i} style={{ alignItems: "flex-start" }}>
              <span className={"nx-badge tone-" + n.tone} style={{ padding: 6, borderRadius: 9 }}><Icon name={n.ic} size={15} /></span>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 600, fontSize: 13 }}>{n.t}</span>
                <span style={{ display: "block", fontSize: 12, color: "var(--text-3)" }}>{n.s}</span>
              </span>
              <span style={{ fontSize: 11, color: "var(--text-3)" }}>{n.time}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- User menu ---------- */
function UserMenu({ compact }) {
  const { nav, currentUser, currentUserDisplayName, platform } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));
  const user = currentUser || { fullName: "", name: "", email: "", role: "owner" };
  const displayName = currentUserDisplayName || "Signed out";
  const role = user.role === "owner" ? "Owner" : user.role;
  const logout = () => { platform.logoutUser(); setOpen(false); nav("login"); };
  return (
    <div className="nx-pop-wrap" ref={ref} style={{ width: compact ? "100%" : "auto" }}>
      <button className={compact ? "nx-sb-user" : "nx-icon-btn"} onClick={() => setOpen(!open)} style={!compact ? { width: "auto", padding: "0 4px" } : {}}>
        <Avatar name={displayName} size={compact ? 34 : 30} />
        {compact && <span className="nx-sb-user-txt"><span className="nx-sb-user-name">{displayName}</span><span className="nx-sb-user-sub">{role}</span></span>}
        {compact && <Icon name="chevron-up" size={15} style={{ color: "var(--text-3)" }} />}
      </button>
      {open && (
        <div className={"nx-dd" + (compact ? " left" : "")} style={compact ? { insetBlockStart: "auto", insetBlockEnd: "calc(100% + 6px)" } : {}}>
          <div style={{ padding: "8px 11px" }}>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{displayName}</div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>{user.email}</div>
          </div>
          <div className="nx-dd-sep" />
          <button className="nx-dd-item" onClick={() => { setOpen(false); nav("settings"); }}><Icon name="user" size={16} />Account</button>
          <button className="nx-dd-item" onClick={() => { setOpen(false); nav("billing"); }}><Icon name="credit-card" size={16} />Billing</button>
          <button className="nx-dd-item" onClick={() => { setOpen(false); nav("team"); }}><Icon name="users" size={16} />Team</button>
          <div className="nx-dd-sep" />
          <button className="nx-dd-item danger" onClick={logout}><Icon name="log-out" size={16} />Sign out</button>
        </div>
      )}
    </div>
  );
}

/* ---------- Workspace / business switcher ---------- */
function ContextSwitcher({ mode }) {
  // mode: "core" => workspace, "commerce" => business unit + branch under workspace
  const { nav, branch, setBranch, BUSINESS_UNITS, BRANCHES, workspace, currentBU, setup, platform } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));
  const activeBU = currentBU || BUSINESS_UNITS.find((b) => b.os === "commerce") || { name: "Business Unit" };
  return (
    <div className="nx-pop-wrap" ref={ref}>
      <button className="nx-sb-switch" onClick={() => setOpen(!open)}>
        {mode === "core"
          ? <span className="nx-choice-ic" style={{ width: 34, height: 34, background: "#14161d", color: "#fff" }}><Icon name="building-2" size={17} /></span>
          : <BrandMark name={activeBU.name} logo={setup && setup.logo} size={34} radius={9} />}
        <span className="nx-sb-switch-txt">
          <span className="nx-sb-switch-name">{mode === "core" ? (workspace.name || "Workspace") : activeBU.name}</span>
          <span className="nx-sb-switch-sub">{mode === "core" ? "Workspace" : branch + " · Commerce OS"}</span>
        </span>
        <Icon name="chevrons-up-down" size={15} style={{ color: "var(--text-3)" }} />
      </button>
      {open && (
        <div className="nx-dd left" style={{ minWidth: 256 }}>
          <div className="nx-dd-label">Workspace</div>
          <button className="nx-dd-item"><span className="nx-choice-ic" style={{ width: 28, height: 28, background: "#14161d", color: "#fff" }}><Icon name="building-2" size={14} /></span>{workspace.name || "Workspace"} <Icon name="check" size={15} style={{ marginInlineStart: "auto", color: "var(--accent)" }} /></button>
          {mode === "commerce" && <>
            <div className="nx-dd-label">Business units</div>
            {BUSINESS_UNITS.map((b) => (
              <button key={b.id} className="nx-dd-item" onClick={() => { if (b.active) { platform.setCurrent({ currentBusinessUnitId: b.id }); setOpen(false); nav("dashboard"); } }} style={!b.active ? { opacity: .6 } : {}}>
                <span className="nx-choice-ic" style={{ width: 28, height: 28, background: b.color + "1a", color: b.color }}><Icon name={b.icon} size={14} /></span>
                <span style={{ flex: 1, textAlign: "start" }}>{b.name}<span style={{ display: "block", fontSize: 11, color: "var(--text-3)" }}>{b.active ? "Commerce OS" : b.preset + " · soon"}</span></span>
                {b.active && b.id === activeBU.id && <Icon name="check" size={15} style={{ color: "var(--accent)" }} />}
              </button>
            ))}
            <div className="nx-dd-label">Branch</div>
            {BRANCHES.map((br) => (
              <button key={br} className="nx-dd-item" onClick={() => { setBranch(br); setOpen(false); }}>
                <span className="nx-choice-ic" style={{ width: 28, height: 28 }}><Icon name="map-pin" size={14} /></span>{br}
                {branch === br && <Icon name="check" size={15} style={{ marginInlineStart: "auto", color: "var(--accent)" }} />}
              </button>
            ))}
          </>}
          <div className="nx-dd-sep" />
          <button className="nx-dd-item" onClick={() => { setOpen(false); nav("os-launcher"); }}><Icon name="layout-grid" size={16} />Product Hub</button>
        </div>
      )}
    </div>
  );
}

/* ---------- Branch pill (Commerce topbar) ---------- */
function BranchPill() {
  const { branch, setBranch, BRANCHES, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(() => setOpen(false));
  return (
    <div className="nx-pop-wrap" ref={ref}>
      <button className="nx-branch-pill" onClick={() => setOpen(!open)}>
        <Icon name="map-pin" size={15} /><span>{branch}</span><Icon name="chevron-down" size={14} style={{ color: "var(--text-3)" }} />
      </button>
      {open && (
        <div className="nx-dd" style={{ minWidth: 190 }}>
          <div className="nx-dd-label">{t("branch")}</div>
          {BRANCHES.map((br) => (
            <button key={br} className="nx-dd-item" onClick={() => { setBranch(br); setOpen(false); }}>
              <Icon name="map-pin" size={15} />{br}{branch === br && <Icon name="check" size={15} style={{ marginInlineStart: "auto", color: "var(--accent)" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Generic shell ---------- */
function Shell({ mode, nav: navKey, items, crumb, children }) {
  const { route, nav, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = route.screen;
  return (
    <div className="nx-app-root">
      {mobileOpen && <div className="nx-shell-scrim" onClick={() => setMobileOpen(false)} />}
      <header className="nx-topbar">
        <div className="nx-topbar-brand">
          <Logo light size={24} />
          <span className="nx-topbar-product">{mode === "commerce" ? "Commerce OS" : "Core Platform"}</span>
        </div>
        <button className="nx-icon-btn nx-burger" onClick={() => setMobileOpen(true)}><Icon name="menu" size={20} /></button>
        <div className="nx-topbar-search">
          <span className="nx-input-wrap">
            <Icon name="search" size={16} className="nx-input-icon" />
            <input className="nx-input" placeholder={mode === "commerce" ? "Search products, orders, invoices…" : "Search workspace…"} />
            <span className="nx-topbar-kbd">⌘K</span>
          </span>
        </div>
        {mode === "commerce" && <BranchPill />}
        <ThemeToggle />
        <LangSwitch />
        <NotifBell />
        <span style={{ width: 1, height: 24, background: "rgba(255,255,255,.14)" }} />
        <UserMenu />
      </header>
      <section className="nx-page-canvas">
      <aside className={"nx-sidebar" + (mobileOpen ? " open" : "")}>
        <div className="nx-sb-top"><Logo size={26} /></div>
        <div className="nx-sb-context"><ContextSwitcher mode={mode} /></div>
        <nav className="nx-sb-nav">
          {items.map((grp, gi) => (
            <React.Fragment key={gi}>
              {grp.label && <div className="nx-sb-group-label">{grp.label}</div>}
              {grp.links.map((l) => (
                <button key={l.screen} className={"nx-nav-item" + (active === l.screen || (l.match && l.match.includes(active)) ? " active" : "")}
                  onClick={() => { nav(l.screen); setMobileOpen(false); }} disabled={l.disabled}
                  style={l.disabled ? { opacity: .5, cursor: "default" } : {}}>
                  <Icon name={l.icon} size={18} />{t(l.key) || l.label}
                  {l.badge && <span className="nx-nav-badge"><Badge tone={l.badgeTone || "neutral"}>{l.badge}</Badge></span>}
                  {l.soon && <span className="nx-nav-badge"><Badge tone="neutral">Soon</Badge></span>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="nx-sb-foot"><UserMenu compact /></div>
      </aside>
      <div className="nx-main">
        <div className="nx-main-scroll" data-scroll-main>{children}</div>
      </div>
      </section>
    </div>
  );
}

/* ---------- Core Platform shell ---------- */
function CoreShell({ children, crumb }) {
  const items = [{
    links: [
      { screen: "os-launcher", icon: "layout-grid", key: "product_hub", label: "Product Hub" },
      { screen: "billing", icon: "credit-card", key: "billing", label: "Billing" },
      { screen: "team", icon: "users", key: "team", label: "Team" },
      { screen: "integrations", icon: "plug", key: "integrations", label: "Integrations" },
      { screen: "platform-settings", icon: "settings", key: "settings", label: "Settings" },
    ],
  }];
  return <Shell mode="core" items={items} crumb={crumb}>{children}</Shell>;
}

/* ---------- Commerce OS shell ---------- */
function CommerceShell({ children, crumb }) {
  const items = [{
    label: "Commerce OS",
    links: [
      { screen: "dashboard", icon: "layout-dashboard", key: "dashboard", label: "Dashboard" },
      { screen: "pos", icon: "scan-barcode", key: "pos", label: "POS" },
      { screen: "products", icon: "package", key: "products", label: "Products", match: ["products"] },
      { screen: "inventory", icon: "boxes", key: "inventory", label: "Inventory" },
      { screen: "orders", icon: "shopping-bag", key: "orders", label: "Orders", match: ["orders", "order-details"] },
      { screen: "invoices", icon: "receipt", key: "invoices", label: "Invoices", match: ["invoices", "invoice-details"] },
      { screen: "customers", icon: "user-round", key: "customers", label: "Customers" },
      { screen: "reports", icon: "bar-chart-3", key: "reports", label: "Reports" },
      { screen: "commerce-settings", icon: "settings", key: "settings", label: "Settings" },
    ],
  }];
  return <Shell mode="commerce" items={items} crumb={crumb}>{children}</Shell>;
}

Object.assign(window, { CoreShell, CommerceShell, LangSwitch, ThemeToggle, useDismiss });
