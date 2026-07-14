// ============================================================
// NexoraXS — Commerce OS: Dashboard, Products, Inventory, Add Product
// ============================================================

function CommerceCrumb({ label }) {
  const { currentBU } = useApp();
  const name = currentBU && currentBU.name ? currentBU.name : "Commerce";
  return <><BrandMark name={name} size={20} radius={6} /><b>{name}</b><Icon name="chevron-right" size={14} /><span>{label}</span></>;
}
const COMMERCE_CRUMB = (label) => <CommerceCrumb label={label} />;

/* ---------------- Dashboard ---------------- */
const NX_PERIOD_LABELS = { today: "Today", week: "Week", month: "Month" };

function Dashboard() {
  const { nav, money, orders, products, invoices, customers, setup, t, currentBU, currentBranch, subscriptions, showToast } = useApp();
  const [period, setPeriod] = useState("today");
  const businessName = currentBU && currentBU.name ? currentBU.name : "Commerce business";
  const branchName = (currentBranch && currentBranch.name) || "Main branch";

  // ---- setup completeness (kept) ----
  const checklist = [
    { t: "Business identity", done: !!(setup.displayName && setup.address) },
    { t: "Tax setup", done: setup.vatRegistered !== undefined && !!setup.taxNumber },
    { t: "Invoice template", done: !!setup.invoiceTemplate },
    { t: "First product", done: products.length > 0 },
    { t: "First sale", done: orders.length > 0 },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const allDone = doneCount === 5;
  const [setupDismissed, setSetupDismissed] = useState(() => { try { return localStorage.getItem("nx_setup_celebrated") === "1"; } catch (e) { return false; } });
  const dismissSetup = () => { try { localStorage.setItem("nx_setup_celebrated", "1"); } catch (e) {} setSetupDismissed(true); };

  // ---- derived metrics (real DB only) ----
  const periodOrders = useMemo(() => nxOrdersForPeriod(orders, period), [orders, period]);
  const periodInvoices = useMemo(() => nxOrdersForPeriod(invoices, period), [invoices, period]);
  const revenue = useMemo(() => nxRevenue(periodOrders), [periodOrders]);
  const orderCount = periodOrders.length;
  const vatCollected = useMemo(() => periodInvoices.reduce((sum, inv) => {
    if (inv.vat != null && !isNaN(+inv.vat)) return sum + +inv.vat;
    if (inv.tax != null && !isNaN(+inv.tax)) return sum + +inv.tax;
    try { return sum + computeDoc(inv.items || [], setup, inv.discount || 0).vat; } catch (e) { return sum; }
  }, 0), [periodInvoices, setup]);
  const categoryCount = useMemo(() => new Set(products.map((p) => p.category).filter(Boolean)).size, [products]);
  const lowStockList = useMemo(() => products.filter((p) => (p.stock || 0) <= (p.low || 0)).sort((a, b) => (a.stock || 0) - (b.stock || 0)), [products]);
  const bestSellers = useMemo(() => nxBestSellers(periodOrders, products, 5), [periodOrders, products]);
  const rhythm = useMemo(() => nxGroupSales(periodOrders, period), [periodOrders, period]);
  const recent = useMemo(() => [...orders].sort((a, b) => { const da = nxOrderDate(a), db2 = nxOrderDate(b); return (db2 ? db2.getTime() : 0) - (da ? da.getTime() : 0); }).slice(0, 6), [orders]);

  const sub = subscriptions.find((s) => s.osId === "commerce");
  const subStatus = sub ? (sub.status === "active" ? "Active" : sub.status === "trialing" ? "Trial" : "Unified") : "Unified";
  const posReady = doneCount >= 4;
  const todayStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });

  const shortcuts = [
    { label: "Add product", ic: "package-plus", fn: () => nav("product-new") },
    { label: "New sale", ic: "scan-barcode", fn: () => nav("pos") },
    { label: "Add customer", ic: "user-plus", fn: () => nav("customers") },
    { label: "Stock adjustment", ic: "sliders-horizontal", fn: () => nav("inventory") },
    { label: "Daily Z-report", ic: "receipt-text", fn: () => nav("reports") },
  ];
  const periodSuffix = period === "today" ? "today" : period === "week" ? "this week" : "this month";

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("dashboard"))}>
      <div className="nx-page">
        {/* Header */}
        <div className="nx-dash-head">
          <div>
            <div className="nx-dash-crumb">Platform <Icon name="chevron-right" size={12} /> Commerce OS <Icon name="chevron-right" size={12} /> Dashboard</div>
            <div className="nx-row" style={{ gap: 10, marginTop: 4 }}>
              <h1 className="nx-page-title" style={{ fontSize: 26 }}>Commerce Dashboard</h1>
              <Badge tone="accent" icon="zap">{subStatus}</Badge>
            </div>
            <p className="nx-page-sub">{todayStr} · {branchName}</p>
          </div>
          <div className="nx-row" style={{ gap: 10, flexWrap: "wrap" }}>
            <div className="nx-seg">
              {["today", "week", "month"].map((p) => <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>{NX_PERIOD_LABELS[p]}</button>)}
            </div>
            <Button variant="secondary" icon="download" onClick={() => showToast("Export is coming soon", "info")}>Export</Button>
            <Button icon="plus" onClick={() => nav("product-new")}>New product</Button>
          </div>
        </div>

        {/* Setup hero (until complete) */}
        {!allDone ? (
          <Card className="nx-setup-hero" style={{ marginBottom: 20 }}>
            <div className="nx-setup-hero-top">
              <div>
                <span className="nx-eyebrow">Get started</span>
                <h2 className="nx-setup-hero-title">Finish setting up Commerce OS</h2>
                <p className="nx-setup-hero-sub">{doneCount} of 5 steps done — you're almost ready to make your first sale.</p>
              </div>
              <div className="nx-setup-pct"><span className="mono">{Math.round(doneCount / 5 * 100)}%</span></div>
            </div>
            <div className="nx-progress" style={{ margin: "4px 0 18px" }}><span style={{ width: (doneCount / 5 * 100) + "%" }} /></div>
            <div className="nx-setup-tasks">
              {checklist.map((c) => (
                <div key={c.t} className={"nx-task" + (c.done ? " done" : "")} onClick={() => !c.done && nav(c.t.includes("product") ? "product-new" : "pos")}>
                  <span className="nx-check-ring">{c.done && <Icon name="check" size={12} />}</span>
                  <span className="nx-task-label">{c.t}</span>
                  {!c.done && <Icon name="arrow-right" size={15} className="nx-task-go" />}
                </div>
              ))}
            </div>
          </Card>
        ) : !setupDismissed ? (
          <Card className="nx-setup-done nx-pop" style={{ marginBottom: 20 }}>
            <div className="nx-setup-done-ic"><Icon name="party-popper" size={22} /></div>
            <div style={{ flex: 1 }}>
              <h2 className="nx-setup-hero-title">You're all set! 🎉</h2>
              <p className="nx-setup-hero-sub">Commerce OS is fully configured — {businessName} is up and running and ready to sell.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={dismissSetup}>Dismiss</Button>
            <button className="nx-icon-btn" onClick={dismissSetup} aria-label="Dismiss"><Icon name="x" size={18} /></button>
          </Card>
        ) : null}

        {/* POS + Storefront bars */}
        <div className="nx-channel-row">
          <Card className="nx-channel">
            <span className="nx-channel-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="scan-barcode" size={18} /></span>
            <div style={{ flex: 1 }}>
              <div className="nx-channel-title">POS</div>
              <div className="nx-channel-sub">{posReady ? <><span className="nx-dot ok" /> Ready · in-store checkout</> : <><span className="nx-dot warn" /> Needs setup</>}</div>
            </div>
            <Button size="sm" iconRight="arrow-right" onClick={() => nav("pos")}>Open</Button>
          </Card>
          <Card className="nx-channel">
            <span className="nx-channel-ic" style={{ background: "var(--surface-3)", color: "var(--text-2)" }}><Icon name="globe" size={18} /></span>
            <div style={{ flex: 1 }}>
              <div className="nx-channel-title">Storefront</div>
              <div className="nx-channel-sub"><span className="nx-dot" /> Coming soon · online orders</div>
            </div>
            <Button size="sm" variant="secondary" disabled>Configure</Button>
          </Card>
        </div>

        {/* KPI cards */}
        <div className="nx-kpi-grid">
          <KpiCard label={`Sales ${periodSuffix}`} value={money(revenue)} icon="trending-up" tint="#4f46e5" sub={`${orderCount} ${orderCount === 1 ? "order" : "orders"} · ${branchName}`} />
          <KpiCard label="Products" value={String(products.length)} icon="package" tint="#7c3aed" sub={`${categoryCount} ${categoryCount === 1 ? "category" : "categories"}`} />
          <KpiCard label="Low stock" value={String(lowStockList.length)} icon="alert-triangle" tint="#b25e09" sub="below threshold" tone={lowStockList.length ? "warn" : "ok"} />
          <KpiCard label="VAT collected" value={money(vatCollected)} icon="landmark" tint="#0d9488" sub={`${periodInvoices.length} ${periodInvoices.length === 1 ? "invoice" : "invoices"}`} />
        </div>

        {/* Operation shortcuts */}
        <div className="nx-row" style={{ justifyContent: "space-between", margin: "24px 0 12px" }}>
          <div className="nx-section-title">Operations shortcuts</div>
        </div>
        <div className="nx-shortcut-row">
          {shortcuts.map((s) => (
            <button key={s.label} className="nx-shortcut" onClick={s.fn}>
              <span className="nx-shortcut-ic"><Icon name={s.ic} size={17} /></span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Recent sales + Low stock */}
        <div className="nx-dash-2col">
          <Card style={{ padding: 0 }}>
            <div className="nx-row" style={{ justifyContent: "space-between", padding: "16px 18px 12px" }}>
              <div><div className="nx-eyebrow" style={{ color: "var(--text-3)" }}>Recent sales</div><div className="nx-section-title" style={{ marginTop: 2 }}>Sales and orders</div></div>
              <button className="nx-link" onClick={() => nav("orders")}>View all</button>
            </div>
            {recent.length === 0 ? (
              <EmptyState icon="shopping-bag" title="No sales yet" desc="Completed POS sales appear here." />
            ) : (
              <table className="nx-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Method</th><th>Status</th><th>Time</th></tr></thead>
                <tbody>
                  {recent.map((o) => {
                    const d = nxOrderDate(o);
                    const time = d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—";
                    return (
                      <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => nav("order-details", { id: o.id })}>
                        <td className="num nx-td-strong">{o.num}</td>
                        <td><div className="nx-row" style={{ gap: 8 }}><Avatar name={o.customerName || o.customer || "Walk-in"} size={24} /><span className="nx-td-muted" style={{ fontSize: 12.5 }}>{o.customerName || o.customer || "Walk-in customer"}</span></div></td>
                        <td className="num">{nxOrderItemCount(o)}</td>
                        <td className="num nx-td-strong">{money(nxOrderTotal(o))}</td>
                        <td><span className="nx-td-muted" style={{ fontSize: 12.5 }}>{o.payment || "—"}</span></td>
                        <td><Badge tone={nxOrderPaid(o) ? "pos" : "warn"}>{o.status || (o.paid ? "Paid" : "Pending")}</Badge></td>
                        <td className="nx-td-muted num" style={{ fontSize: 12 }}>{time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Card>

          <Card style={{ padding: 0 }}>
            <div className="nx-row" style={{ justifyContent: "space-between", padding: "16px 18px 12px" }}>
              <div><div className="nx-eyebrow" style={{ color: "var(--warn)" }}>Low stock alert</div><div className="nx-section-title" style={{ marginTop: 2 }}>Low stock panel</div></div>
              <Badge tone={lowStockList.length ? "warn" : "neutral"}>{lowStockList.length}</Badge>
            </div>
            <div style={{ padding: "0 14px 14px" }}>
              {lowStockList.length === 0 ? (
                <EmptyState icon="boxes" title="No low stock items" desc="Stock is healthy across your catalog." />
              ) : lowStockList.slice(0, 5).map((p) => {
                const pct = Math.min(100, Math.round(((p.stock || 0) / Math.max(1, (p.low || 1) * 2)) * 100));
                return (
                  <div key={p.id} className="nx-lowstock">
                    <ProductThumb p={p} size={34} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="nx-row" style={{ justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                        <span className="num" style={{ fontSize: 12, fontWeight: 700, color: p.stock === 0 ? "var(--danger)" : "var(--warn)" }}>{p.stock}<span style={{ color: "var(--text-3)", fontWeight: 500 }}> / {p.low}</span></span>
                      </div>
                      <div className="nx-lowstock-bar"><span style={{ width: pct + "%", background: p.stock === 0 ? "var(--danger)" : "var(--warn)" }} /></div>
                      {p.sku && <span className="num" style={{ fontSize: 10.5, color: "var(--text-3)" }}>{p.sku}</span>}
                    </div>
                  </div>
                );
              })}
              {lowStockList.length > 0 && <Button variant="secondary" size="sm" full icon="clipboard-list" style={{ marginTop: 10 }} onClick={() => nav("inventory")}>Manage inventory</Button>}
            </div>
          </Card>
        </div>

        {/* Best sellers + Rhythm */}
        <div className="nx-dash-2col" style={{ marginTop: 20 }}>
          <Card>
            <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
              <div><div className="nx-eyebrow" style={{ color: "var(--text-3)" }}>Top products</div><div className="nx-section-title" style={{ marginTop: 2 }}>Best sellers {periodSuffix}</div></div>
              <button className="nx-link" onClick={() => nav("reports")}>View report</button>
            </div>
            {bestSellers.length === 0 ? (
              <EmptyState icon="package" title="No products sold yet" desc="Best sellers calculate from completed orders." />
            ) : (() => {
              const max = Math.max(...bestSellers.map((b) => b.rev), 1);
              const colors = ["#4f46e5", "#7c3aed", "#0d9488", "#db2777", "#0891b2"];
              return bestSellers.map((b, i) => (
                <div key={b.name} className="nx-bestseller">
                  <span className="nx-bestseller-rank">#{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="nx-row" style={{ justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</span>
                      <span className="num" style={{ fontSize: 13, fontWeight: 700 }}>{money(b.rev)}</span>
                    </div>
                    <div className="nx-bestseller-meta">{b.category} · {b.qty} sold</div>
                    <div className="nx-bestseller-bar"><span style={{ width: Math.max(4, (b.rev / max) * 100) + "%", background: colors[i % colors.length] }} /></div>
                  </div>
                </div>
              ));
            })()}
          </Card>

          <Card>
            <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
              <div><div className="nx-eyebrow" style={{ color: "var(--text-3)" }}>Sales by {rhythm.kind}</div><div className="nx-section-title" style={{ marginTop: 2 }}>{period === "today" ? "Today's rhythm" : "Sales rhythm"}</div></div>
            </div>
            <RhythmChart rhythm={rhythm} money={money} />
          </Card>
        </div>
      </div>
    </CommerceShell>
  );
}

function KpiCard({ label, value, icon, tint, sub, tone }) {
  return (
    <Card className="nx-kpi">
      <div className="nx-kpi-top">
        <span className="nx-kpi-label">{label}</span>
        <span className="nx-kpi-ic" style={{ background: tint + "1a", color: tint }}><Icon name={icon} size={16} /></span>
      </div>
      <div className="nx-kpi-value">{value}</div>
      <div className={"nx-kpi-sub" + (tone === "warn" ? " warn" : "")}>{sub}</div>
      <div className="nx-kpi-spark" style={{ background: `linear-gradient(90deg, ${tint}22, transparent)` }} />
    </Card>
  );
}

function RhythmChart({ rhythm, money }) {
  const max = Math.max(...rhythm.buckets.map((b) => b.total), 1);
  const hasData = rhythm.buckets.some((b) => b.total > 0);
  if (!hasData) return <div style={{ padding: "30px 0" }}><EmptyState icon="bar-chart-3" title="No sales in this period" desc="The rhythm chart fills in as orders come through." /></div>;
  const peak = rhythm.buckets.reduce((m, b) => b.total > m.total ? b : m, rhythm.buckets[0]);
  const total = rhythm.buckets.reduce((s, b) => s + b.total, 0);
  const count = rhythm.buckets.filter((b) => b.total > 0).length;
  return (
    <div>
      <div className="nx-rhythm">
        {rhythm.buckets.map((b, i) => (
          <div key={i} className="nx-rhythm-col" title={money(b.total)}>
            <div className="nx-rhythm-bar" style={{ height: Math.max(2, (b.total / max) * 100) + "%", opacity: b.total > 0 ? 1 : 0.25 }} />
          </div>
        ))}
      </div>
      <div className="nx-rhythm-axis">{rhythm.axis.map((a, i) => <span key={i}>{rhythm.kind === "hour" ? a : a}</span>)}</div>
      <div className="nx-rhythm-stats">
        <div><span className="nx-rhythm-stat-label">Peak {rhythm.kind}</span><span className="nx-rhythm-stat-val mono">{rhythm.kind === "hour" ? String(peak.label).padStart(2, "0") + ":00" : peak.label}</span></div>
        <div><span className="nx-rhythm-stat-label">Avg / {rhythm.kind}</span><span className="nx-rhythm-stat-val mono">{money(total / Math.max(1, count))}</span></div>
        <div><span className="nx-rhythm-stat-label">Total</span><span className="nx-rhythm-stat-val mono">{money(total)}</span></div>
      </div>
    </div>
  );
}

/* ---------------- Products ---------------- */
function Products() {
  const { nav, money, products, t } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => (cat === "All" || p.category === cat) && (p.name.toLowerCase().includes(q.toLowerCase()) || p.barcode.includes(q) || p.sku.toLowerCase().includes(q.toLowerCase())));

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("products"))}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><h1 className="nx-page-title">{t("products")}</h1><p className="nx-page-sub">{products.length} products · {products.filter((p) => p.stock === 0).length} out of stock · {products.filter((p) => p.stock > 0 && p.stock <= p.low).length} low</p></div>
          <div className="nx-row" style={{ gap: 10 }}>
            <Button variant="secondary" icon="upload">Import</Button>
            <Button icon="plus" onClick={() => nav("product-new")}>{t("add_product")}</Button>
          </div>
        </div>
        <div className="nx-filterbar">
          <div style={{ flex: 1, maxWidth: 340 }}><Input icon="search" placeholder="Search name, SKU or barcode…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="nx-row" style={{ gap: 6 }}>{cats.map((c) => <button key={c} className={"nx-chip-filter" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}</div>
        </div>
        {filtered.length === 0 ? (
          <Card><EmptyState icon={q ? "search-x" : "package"} title={q ? "No products match your search" : "No products yet"} desc={q ? "Try a different name, SKU or barcode." : "Add your first product to start selling on the POS."} action={!q && <Button icon="plus" onClick={() => nav("product-new")}>{t("add_product")}</Button>} /></Card>
        ) : (
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead><tr><th>Product</th><th>Category</th><th>SKU</th><th>Barcode</th><th>Price</th><th>Stock</th><th>Tax</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><div className="nx-row" style={{ gap: 11 }}><ProductThumb p={p} /><div><div className="nx-td-strong">{p.name}</div><div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{p.brand} · {p.unit}</div></div></div></td>
                    <td className="nx-td-muted">{p.category}</td>
                    <td className="num" style={{ fontSize: 12 }}>{p.sku}</td>
                    <td className="num" style={{ fontSize: 12 }}>{p.barcode}</td>
                    <td className="num nx-td-strong">{money(p.price)}</td>
                    <td><span className="num">{p.stock}</span></td>
                    <td>{p.taxable ? <Badge tone="neutral">14%</Badge> : <Badge tone="neutral">None</Badge>}</td>
                    <td>{p.stock === 0 ? <Badge tone="danger" dot>Out of stock</Badge> : p.stock <= p.low ? <Badge tone="warn" dot>Low stock</Badge> : <Badge tone="pos" dot>In stock</Badge>}</td>
                    <td><button className="nx-icon-btn" onClick={() => nav("product-new", { edit: p.id })}><Icon name="pencil" size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CommerceShell>
  );
}

/* ---------------- Add / Edit Product ---------------- */
function ProductThumb({ p, size = 38 }) {
  if (p && p.image) return <img src={p.image} alt="" style={{ width: size, height: size, borderRadius: 9, objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }} />;
  return <span className="nx-thumb nx-thumb-stripe" style={{ width: size, height: size }} />;
}
function ProductNew() {
  const { nav, products, setProducts, showToast, route, t, setup, workspace, currentBU, currentBranch } = useApp();
  const editing = route.params.edit ? products.find((p) => p.id === route.params.edit) : null;
  const presetId = setup.presetId || setup.businessType || setup.preset || "retail";
  const fallbackCategories = (typeof PRESET_CATEGORIES !== "undefined" && PRESET_CATEGORIES[presetId]) ? PRESET_CATEGORIES[presetId] : ["General", "Accessories", "Other"];
  const categories = setup.categories && setup.categories.length ? setup.categories : fallbackCategories;
  const previewExample = (typeof previewItemsForPreset !== "undefined" ? previewItemsForPreset(presetId)[0] : null) || { name: "Sample item", sku: "SKU-001", price: 100 };
  const units = presetId === "pharmacy" ? ["Box", "Bottle", "Pack", "Tube", "Piece"] : ["Piece", "Box", "Pack", "Kg", "Gram", "Liter"];
  const [f, setF] = useState(editing || { name: "", category: categories[0], sku: "", barcode: "", price: "", cost: "", taxable: true, stock: "", unit: units[0], low: 20, expiry: "", brand: "", image: null });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const imgRef = useRef(null);
  const onImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setF((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    const er = {};
    if (!f.name.trim() || f.name.trim().length < 3) er.name = "Enter a real product name";
    if (!f.price || +f.price <= 0) er.price = "Enter a valid price";
    setErr(er); if (Object.keys(er).length) return;
    const prod = {
      ...f,
      id: editing ? editing.id : "p" + Date.now(),
      workspaceId: workspace && workspace.id,
      businessUnitId: currentBU && currentBU.id,
      branchId: currentBranch && currentBranch.id,
      price: +f.price,
      cost: +f.cost || 0,
      stock: +f.stock || 0,
      low: +f.low || 0,
      lowStockThreshold: +f.low || 0,
    };
    setProducts(editing ? products.map((p) => p.id === editing.id ? prod : p) : [prod, ...products]);
    showToast(editing ? "Product updated" : "Product added — now available in POS");
    nav("products");
  };

  return (
    <CommerceShell crumb={<>{COMMERCE_CRUMB(t("products"))}<Icon name="chevron-right" size={14} /><span>{editing ? "Edit" : "New"}</span></>}>
      <div className="nx-page" style={{ maxWidth: 920 }}>
        <div className="nx-page-head">
          <div><button className="nx-link" onClick={() => nav("products")} style={{ marginBottom: 8 }}>← Back to products</button><h1 className="nx-page-title">{editing ? "Edit product" : "Add a product"}</h1></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }} className="nx-detail">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Details</div>
              <div className="nx-form-grid">
                <Field label="Product name" error={err.name}><Input value={f.name} onChange={set("name")} placeholder={previewExample.name} error={err.name} /></Field>
                <div className="nx-form-grid cols-2">
                  <Field label="Category"><Select value={f.category} onChange={set("category")}>{categories.map((c) => <option key={c}>{c}</option>)}</Select></Field>
                  <Field label="Brand" optional><Input value={f.brand} onChange={set("brand")} placeholder={presetId === "pharmacy" ? "GSK" : "Brand"} /></Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label="SKU" optional><Input value={f.sku} onChange={set("sku")} placeholder={previewExample.sku || "SKU-001"} /></Field>
                  <Field label="Barcode" optional><Input icon="scan-barcode" value={f.barcode} onChange={set("barcode")} placeholder="Scan or enter barcode" /></Field>
                </div>
              </div>
            </Card>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Pricing & tax</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label="Price (EGP)" error={err.price}><Input type="number" value={f.price} onChange={set("price")} placeholder={String(previewExample.price || 100)} error={err.price} /></Field>
                  <Field label="Cost (EGP)" optional><Input type="number" value={f.cost} onChange={set("cost")} placeholder="0.00" /></Field>
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px" }}>
                  <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Taxable</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Apply 14% VAT to this product</div></div>
                  <Toggle checked={f.taxable} onChange={(v) => setF({ ...f, taxable: v })} />
                </div>
              </div>
            </Card>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Inventory</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label="Stock quantity"><Input type="number" value={f.stock} onChange={set("stock")} placeholder="100" /></Field>
                  <Field label="Unit"><Select value={f.unit} onChange={set("unit")}>{units.map((u) => <option key={u}>{u}</option>)}</Select></Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label="Low stock threshold"><Input type="number" value={f.low} onChange={set("low")} placeholder="20" /></Field>
                  {presetId === "pharmacy" ? <Field label="Expiry date" optional hint="Pharmacy preset"><Input type="month" value={f.expiry === "—" ? "" : f.expiry} onChange={set("expiry")} /></Field> : <Field label="Variant" optional><Input value={f.expiry === "—" ? "" : f.expiry} onChange={set("expiry")} placeholder="Size / color" /></Field>}
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px", opacity: .6 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Batch number <Badge tone="neutral"><Icon name="lock" size={11} />Future</Badge></div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Available when batch tracking launches</div></div>
                  <Toggle checked={false} disabled onChange={() => {}} />
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card style={{ position: "sticky", top: 20 }}>
              <div className="nx-section-title" style={{ marginBottom: 12 }}>Product image</div>
              <input ref={imgRef} type="file" accept="image/*" hidden onChange={onImage} />
              {f.image ? (
                <div style={{ width: "100%", height: 150, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <img src={f.image} alt="product" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ) : (
                <button type="button" onClick={() => imgRef.current && imgRef.current.click()} className="nx-thumb nx-thumb-stripe" style={{ width: "100%", height: 150, borderRadius: 12, flexDirection: "column", gap: 6, border: "none", cursor: "pointer" }}>
                  <Icon name="image-up" size={22} /><span className="mono" style={{ fontSize: 11 }}>product photo</span>
                </button>
              )}
              <Button variant="secondary" size="sm" full style={{ marginTop: 12 }} icon={f.image ? "refresh-cw" : "upload"} onClick={() => imgRef.current && imgRef.current.click()}>{f.image ? "Replace image" : "Upload image"}</Button>
              {f.image && <button type="button" className="nx-link danger" style={{ display: "block", margin: "10px auto 0" }} onClick={() => setF((prev) => ({ ...prev, image: null }))}>Remove image</button>}
              <hr className="nx-divider" style={{ margin: "18px 0" }} />
              <Button full icon="check" onClick={save}>{editing ? "Save changes" : "Add product"}</Button>
              <Button variant="ghost" full size="sm" style={{ marginTop: 8 }} onClick={() => nav("products")}>Cancel</Button>
            </Card>
          </div>
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Inventory ---------------- */
function Inventory() {
  const { products, setProducts, money, showToast, t } = useApp();
  const [adj, setAdj] = useState(null);
  const [form, setForm] = useState({ qty: "", reason: "initial", type: "add" });
  const stockValue = products.reduce((s, p) => s + p.cost * p.stock, 0);

  const applyAdj = () => {
    const delta = (form.type === "add" ? 1 : -1) * (+form.qty || 0);
    setProducts(products.map((p) => p.id === adj.id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
    showToast("Stock adjusted for " + adj.name); setAdj(null); setForm({ qty: "", reason: "initial", type: "add" });
  };

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("inventory"))}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">{t("inventory")}</h1><p className="nx-page-sub">Track stock levels and make adjustments.</p></div></div>
        <div className="nx-dash-grid" style={{ marginBottom: 20 }}>
          <Stat label="Stock value (cost)" value={money(stockValue)} icon="boxes" sub="across all products" />
          <Stat label="Low stock items" value={products.filter((p) => p.stock > 0 && p.stock <= p.low).length} icon="alert-triangle" sub="below threshold" />
          <Stat label="Out of stock" value={products.filter((p) => p.stock === 0).length} icon="package-x" sub="needs reorder" />
        </div>
        <div className="nx-table-wrap">
          {products.length === 0 ? <Card><EmptyState icon="boxes" title="No inventory yet" desc="Add products to begin tracking stock value, thresholds and adjustments." /></Card> : <table className="nx-table">
            <thead><tr><th>Product</th><th>Current stock</th><th>Threshold</th><th>Status</th><th>Last updated</th><th></th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><div className="nx-row" style={{ gap: 11 }}><ProductThumb p={p} /><div><div className="nx-td-strong">{p.name}</div><div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{p.sku}</div></div></div></td>
                  <td><span className="num nx-td-strong" style={{ fontSize: 15 }}>{p.stock}</span> <span className="nx-td-muted" style={{ fontSize: 12 }}>{p.unit}</span></td>
                  <td className="num nx-td-muted">{p.low}</td>
                  <td>{p.stock === 0 ? <Badge tone="danger" dot>Out of stock</Badge> : p.stock <= p.low ? <Badge tone="warn" dot>Low stock</Badge> : <Badge tone="pos" dot>Healthy</Badge>}</td>
                  <td className="nx-td-muted" style={{ fontSize: 12 }}>01 Jun, 09:14</td>
                  <td><Button variant="secondary" size="sm" onClick={() => setAdj(p)}>Adjust</Button></td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>

      <Modal open={!!adj} onClose={() => setAdj(null)} title={adj && "Adjust stock"} subtitle={adj && adj.name}
        footer={<><Button variant="ghost" onClick={() => setAdj(null)}>Cancel</Button><Button onClick={applyAdj}>Apply adjustment</Button></>}>
        {adj && <div className="nx-form-grid">
          <div className="nx-row" style={{ justifyContent: "space-between", padding: "10px 14px", background: "var(--surface-2)", borderRadius: 10 }}>
            <span style={{ color: "var(--text-2)", fontSize: 13 }}>Current stock</span><span className="num" style={{ fontWeight: 700, fontSize: 16 }}>{adj.stock} {adj.unit}</span>
          </div>
          <Field label="Adjustment type">
            <div className="nx-seg" style={{ width: "100%" }}>
              <button className={form.type === "add" ? "on" : ""} style={{ flex: 1 }} onClick={() => setForm({ ...form, type: "add" })}>Add stock</button>
              <button className={form.type === "remove" ? "on" : ""} style={{ flex: 1 }} onClick={() => setForm({ ...form, type: "remove" })}>Remove stock</button>
            </div>
          </Field>
          <div className="nx-form-grid cols-2">
            <Field label="Quantity"><Input type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} placeholder="10" /></Field>
            <Field label="Reason"><Select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}><option value="initial">Initial stock</option><option value="correction">Correction</option><option value="damaged">Damaged</option><option value="returned">Returned</option></Select></Field>
          </div>
        </div>}
      </Modal>
    </CommerceShell>
  );
}

Object.assign(window, { Dashboard, Products, ProductNew, ProductThumb, Inventory, COMMERCE_CRUMB });
