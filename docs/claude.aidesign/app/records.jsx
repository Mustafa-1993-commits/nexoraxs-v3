// ============================================================
// NexoraXS — Commerce OS: Orders, Invoices, Reports, Customers, Settings
// ============================================================

function orderTotal(o, setup) { return computeDoc(o.items, setup, o.discount).total; }
function orderMetrics(orders, setup) {
  const docs = orders.map((o) => computeDoc(o.items || [], setup, o.discount || 0));
  return {
    gross: docs.reduce((s, d) => s + d.gross, 0),
    discounts: docs.reduce((s, d) => s + d.discount, 0),
    net: docs.reduce((s, d) => s + d.net, 0),
    vat: docs.reduce((s, d) => s + d.vat, 0),
    total: docs.reduce((s, d) => s + d.total, 0),
    count: orders.length,
  };
}
function productPerformance(orders) {
  const rows = {};
  orders.forEach((o) => (o.items || []).forEach((i) => {
    const key = i.id || i.name;
    rows[key] = rows[key] || { name: i.name, units: 0 };
    rows[key].units += +i.qty || 0;
  }));
  return Object.values(rows).sort((a, b) => b.units - a.units);
}

/* ===== Reports analytics helpers — all derived from real DB records ===== */
function parseOrderDate(o) {
  const raw = o && (o.createdAt || o.date);
  if (!raw) return null;
  const d = new Date(String(raw).replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}
function periodRange(period, now = new Date()) {
  const start = new Date(now);
  if (period === "today") { start.setHours(0, 0, 0, 0); }
  else if (period === "week") { start.setDate(now.getDate() - 6); start.setHours(0, 0, 0, 0); }
  else if (period === "month") { start.setDate(1); start.setHours(0, 0, 0, 0); }
  return { start, end: now };
}
function getOrdersForPeriod(orders, period, now = new Date()) {
  if (!period || period === "all") return orders;
  const { start } = periodRange(period, now);
  return orders.filter((o) => { const d = parseOrderDate(o); return d && d >= start && d <= now; });
}
function getOrderTotal(o, setup) {
  if (o && o.total != null && !isNaN(+o.total)) return +o.total;
  try { return computeDoc(o.items || [], setup, o.discount || 0).total; } catch (e) { return 0; }
}
function getRevenue(orders, setup) { return orders.reduce((s, o) => s + getOrderTotal(o, setup), 0); }
function getAverageTicket(orders, setup) { return orders.length ? getRevenue(orders, setup) / orders.length : 0; }
function getNewCustomersForPeriod(customers, period, now = new Date()) {
  if (!period || period === "all") return customers.length;
  const { start } = periodRange(period, now);
  return customers.filter((c) => { const d = c.createdAt ? new Date(c.createdAt) : null; return d && !isNaN(d) && d >= start && d <= now; }).length;
}
function getPaymentBreakdown(orders, setup) {
  const buckets = { Cash: 0, Card: 0, Wallet: 0, Other: 0 };
  orders.forEach((o) => {
    const m = o.paymentMethod || o.payment || "Other";
    const key = buckets[m] !== undefined ? m : "Other";
    buckets[key] += getOrderTotal(o, setup);
  });
  const total = Object.values(buckets).reduce((s, v) => s + v, 0);
  return Object.entries(buckets).map(([name, amount]) => ({ name, amount, pct: total ? Math.round(amount / total * 100) : 0 }));
}
function resolveCategory(item, products) {
  const p = products.find((x) => x.id === item.id)
    || (item.sku && products.find((x) => x.sku === item.sku))
    || products.find((x) => x.name === item.name);
  return (p && p.category) || "Uncategorized";
}
function getCategoryRevenue(orders, products) {
  const rows = {};
  orders.forEach((o) => (o.items || []).forEach((i) => {
    const cat = resolveCategory(i, products);
    rows[cat] = rows[cat] || { name: cat, revenue: 0, units: 0 };
    rows[cat].revenue += (+i.price || 0) * (+i.qty || 0);
    rows[cat].units += +i.qty || 0;
  }));
  return Object.values(rows).sort((a, b) => b.revenue - a.revenue);
}
function getBestSellers(orders) {
  const rows = {};
  orders.forEach((o) => (o.items || []).forEach((i) => {
    const key = i.id || i.name;
    rows[key] = rows[key] || { name: i.name, units: 0, revenue: 0 };
    rows[key].units += +i.qty || 0;
    rows[key].revenue += (+i.price || 0) * (+i.qty || 0);
  }));
  return Object.values(rows).sort((a, b) => b.revenue - a.revenue);
}
function groupSalesByPeriod(orders, period, setup, now = new Date()) {
  if (period === "today") {
    const buckets = Array.from({ length: 24 }, (_, h) => ({ label: h, value: 0 }));
    orders.forEach((o) => { const d = parseOrderDate(o); if (d) buckets[d.getHours()].value += getOrderTotal(o, setup); });
    return { bars: buckets, axis: [0, 6, 12, 18, 23], fmtLabel: (h) => String(h).padStart(2, "0") };
  }
  if (period === "month") {
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const buckets = Array.from({ length: days }, (_, i) => ({ label: i + 1, value: 0 }));
    orders.forEach((o) => { const d = parseOrderDate(o); if (d && d.getMonth() === now.getMonth()) buckets[d.getDate() - 1].value += getOrderTotal(o, setup); });
    return { bars: buckets, axis: [1, Math.ceil(days / 2), days], fmtLabel: (n) => String(n) };
  }
  // week: last 7 days
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const buckets = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now); d.setDate(now.getDate() - (6 - i)); d.setHours(0, 0, 0, 0);
    return { label: dayNames[d.getDay()], key: d.toDateString(), value: 0 };
  });
  orders.forEach((o) => { const d = parseOrderDate(o); if (d) { const k = new Date(d); k.setHours(0, 0, 0, 0); const b = buckets.find((x) => x.key === k.toDateString()); if (b) b.value += getOrderTotal(o, setup); } });
  return { bars: buckets, axis: null, fmtLabel: (l) => l };
}
function shortDate(value) {
  if (!value) return "—";
  const text = String(value);
  return text.includes(",") ? text.substring(0, text.indexOf(",")) : text.substring(0, 10);
}

/* ---------------- Orders ---------------- */
function Orders() {
  const { nav, money, orders, setup, t } = useApp();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Today", "Cash", "Card", "Wallet"];
  const today = new Date().toISOString().slice(0, 10);
  const list = orders.filter((o) => filter === "All" ? true : filter === "Today" ? String(o.date || "").startsWith(today) : o.payment === filter);

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("orders"))}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">{t("orders")}</h1><p className="nx-page-sub">{orders.length} orders · all paid · POS channel</p></div><Button variant="secondary" icon="download">Export</Button></div>
        <div className="nx-filterbar">
          {filters.map((f) => <button key={f} className={"nx-chip-filter" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>)}
          <span className="nx-spacer" />
          <div style={{ width: 260 }}><Input icon="search" placeholder="Search orders…" /></div>
        </div>
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Channel</th><th>Payment</th><th>Invoice</th><th>Total</th><th></th></tr></thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan="8"><EmptyState icon="shopping-bag" title="No orders yet" desc="Completed POS sales will appear here." /></td></tr>}
              {list.map((o) => (
                <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => nav("order-details", { id: o.id })}>
                  <td className="num nx-td-strong">{o.num}</td>
                  <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{o.date}</td>
                  <td><div className="nx-row" style={{ gap: 9 }}><Avatar name={o.customer} size={26} /><span className="nx-td-strong">{o.customer}</span></div></td>
                  <td><Badge tone="neutral" icon="scan-barcode">{o.channel}</Badge></td>
                  <td><Badge tone="neutral">{o.payment}</Badge></td>
                  <td><div className="nx-row" style={{ gap: 6 }}><Badge tone="pos" dot>Paid</Badge><span className="num" style={{ fontSize: 12, color: "var(--text-3)" }}>{o.invoice}</span></div></td>
                  <td className="num nx-td-strong">{money(orderTotal(o, setup))}</td>
                  <td><Icon name="chevron-right" size={16} style={{ color: "var(--text-3)" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Order details ---------------- */
function OrderDetails() {
  const { nav, money, orders, setup, route, t } = useApp();
  const o = orders.find((x) => x.id === route.params.id) || orders[0];
  if (!o) return <CommerceShell crumb={COMMERCE_CRUMB(t("orders"))}><div className="nx-page"><EmptyState icon="shopping-bag" title="No order selected" desc="There are no orders in the current mock database." action={<Button onClick={() => nav("orders")}>Back to orders</Button>} /></div></CommerceShell>;
  const doc = computeDoc(o.items, setup, o.discount);
  return (
    <CommerceShell crumb={<>{COMMERCE_CRUMB(t("orders"))}<Icon name="chevron-right" size={14} /><span>{o.num}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><button className="nx-link" onClick={() => nav("orders")} style={{ marginBottom: 8 }}>← Back to orders</button>
            <div className="nx-row" style={{ gap: 12 }}><h1 className="nx-page-title">{o.num}</h1><Badge tone="pos" dot>Paid</Badge></div>
            <p className="nx-page-sub">{o.date} · {o.channel} · {o.payment}</p>
          </div>
          <div className="nx-row" style={{ gap: 10 }}><Button variant="secondary" icon="receipt" onClick={() => nav("invoice-details", { id: o.id })}>View invoice</Button><Button variant="secondary" icon="printer">Print receipt</Button></div>
        </div>
        <div className="nx-detail">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ padding: 0 }}>
              <div className="nx-section-title" style={{ padding: "18px 20px 0" }}>Items</div>
              <table className="nx-table" style={{ marginTop: 12 }}>
                <thead><tr><th>Product</th><th>Qty</th><th>Unit</th><th style={{ textAlign: "end" }}>Amount</th></tr></thead>
                <tbody>{o.items.map((i, x) => (
                  <tr key={x}><td className="nx-td-strong">{i.name}</td><td className="num">{i.qty}</td><td className="num">{money(i.price)}</td><td className="num" style={{ textAlign: "end", fontWeight: 600 }}>{money(i.price * i.qty)}</td></tr>
                ))}</tbody>
              </table>
              <div style={{ padding: 18, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 7 }}>
                  <div className="nx-cart-line" style={{ padding: 0 }}><span>{t("net")}</span><span className="num">{money(doc.net)}</span></div>
                  {o.discount > 0 && <div className="nx-cart-line" style={{ padding: 0 }}><span>{t("discount")}</span><span className="num">−{money(o.discount)}</span></div>}
                  <div className="nx-cart-line" style={{ padding: 0 }}><span>VAT (14%)</span><span className="num">{money(doc.vat)}</span></div>
                  <div className="nx-cart-line grand" style={{ fontSize: 17 }}><span>Total</span><span className="num">{money(doc.total)}</span></div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>Activity</div>
              <div className="nx-timeline">
                {[["check", "Sale completed", o.date + " · POS cashier"], ["receipt", "Invoice " + o.invoice + " generated", o.date], ["printer", "Receipt " + o.receipt + " printed", o.date], ["package-minus", "Inventory deducted", o.date]].map(([ic, ti, sub], i) => (
                  <div className="nx-tl-item" key={i}><span className="nx-tl-dot"><Icon name={ic} size={13} /></span><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{ti}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>{sub}</div></div></div>
                ))}
              </div>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Customer</div>
              <div className="nx-row" style={{ gap: 12 }}><Avatar name={o.customer} size={40} /><div><div style={{ fontWeight: 700 }}>{o.customer}</div><div style={{ fontSize: 12.5, color: "var(--text-3)" }}>In-store · POS</div></div></div>
            </Card>
            <Card>
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Payment</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="nx-row" style={{ justifyContent: "space-between" }}><span style={{ color: "var(--text-2)", fontSize: 13 }}>Method</span><Badge tone="neutral">{o.payment}</Badge></div>
                <div className="nx-row" style={{ justifyContent: "space-between" }}><span style={{ color: "var(--text-2)", fontSize: 13 }}>Status</span><Badge tone="pos" dot>Paid in full</Badge></div>
                <div className="nx-row" style={{ justifyContent: "space-between" }}><span style={{ color: "var(--text-2)", fontSize: 13 }}>Linked invoice</span><button className="nx-link" onClick={() => nav("invoice-details", { id: o.id })}>{o.invoice}</button></div>
              </div>
            </Card>
            <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 18 }}>
              <div className="nx-wiz-aside-label" style={{ alignSelf: "flex-start", marginBottom: 12 }}>Receipt</div>
              <div style={{ transform: "scale(.82)", transformOrigin: "top center" }}><ReceiptDoc setup={setup} items={o.items} discount={o.discount} meta={{ order: o.num, receipt: o.receipt, payment: o.payment, date: o.date, cashier: "POS cashier" }} /></div>
            </Card>
          </div>
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Invoices ---------------- */
function Invoices() {
  const { nav, money, invoices, setup, t, currentBU } = useApp();
  const businessName = currentBU && currentBU.name ? currentBU.name : setup.displayName || "your business";
  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("invoices"))}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">{t("invoices")}</h1><p className="nx-page-sub">Tax invoices issued by {businessName} to its customers.</p></div><Button variant="secondary" icon="download">Export</Button></div>
        <div className="nx-helper" style={{ marginBottom: 20, maxWidth: "none" }}>
          <Icon name="info" size={16} />These are <b style={{ margin: "0 4px" }}>sales invoices</b> ({businessName} → customer). Your NexoraXS subscription invoices live in Core Platform → Billing.
        </div>
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead><tr><th>Invoice</th><th>Order</th><th>Customer</th><th>Date</th><th>Net</th><th>VAT</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {invoices.map((o) => {
                const doc = computeDoc(o.items || [], setup, o.discount || 0);
                return (
                  <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => nav("invoice-details", { id: o.id })}>
                    <td className="num nx-td-strong">{o.invoice}</td>
                    <td className="num nx-td-muted">{o.order || o.orderId || "—"}</td>
                    <td className="nx-td-strong">{o.customer}</td>
                    <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{shortDate(o.date)}</td>
                    <td className="num">{money(doc.net)}</td>
                    <td className="num">{money(doc.vat)}</td>
                    <td className="num nx-td-strong">{money(doc.total)}</td>
                    <td><Badge tone={o.status === "Pending" ? "warn" : "pos"} dot>{o.status || "Paid"}</Badge></td>
                    <td><button className="nx-icon-btn"><Icon name="download" size={15} /></button></td>
                  </tr>
                );
              })}
              {invoices.length === 0 && <tr><td colSpan="9"><EmptyState icon="receipt" title="No invoices yet" desc="Sales invoices will appear after a POS sale is completed." /></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Invoice details ---------------- */
function InvoiceDetails() {
  const { nav, invoices, setup, route, t } = useApp();
  const o = invoices.find((x) => x.id === route.params.id) || invoices[0];
  if (!o) return <CommerceShell crumb={COMMERCE_CRUMB(t("invoices"))}><div className="nx-page"><EmptyState icon="receipt" title="No invoice selected" desc="There are no invoices in the current mock database." action={<Button onClick={() => nav("invoices")}>Back to invoices</Button>} /></div></CommerceShell>;
  return (
    <CommerceShell crumb={<>{COMMERCE_CRUMB(t("invoices"))}<Icon name="chevron-right" size={14} /><span>{o.invoice}</span></>}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><button className="nx-link" onClick={() => nav("invoices")} style={{ marginBottom: 8 }}>← Back to invoices</button><div className="nx-row" style={{ gap: 12 }}><h1 className="nx-page-title">{o.invoice}</h1><Badge tone="pos" dot>Paid</Badge></div></div>
          <div className="nx-row" style={{ gap: 10 }}><Button variant="secondary" icon="layout-template">Change template</Button><Button variant="secondary" icon="download">Download</Button><Button icon="printer" onClick={() => window.print()}>Print</Button></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", background: "var(--surface-3)", padding: 28, borderRadius: 16, border: "1px solid var(--border)" }}>
          <InvoiceDoc setup={setup} items={o.items || []} discount={o.discount || 0} meta={{ invoice: o.invoice, order: o.order || o.orderId, customer: o.customer, payment: o.payment, date: shortDate(o.date) }} />
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Reports ---------------- */
const REPORT_CAT_COLORS = ["#4f46e5", "#0d9488", "#d97706", "#7c3aed", "#0891b2", "#db2777", "#65a30d"];

function invoiceVatTotal(invoices, setup) {
  return (invoices || []).reduce((sum, inv) => {
    if (inv.vat != null && !isNaN(+inv.vat)) return sum + +inv.vat;
    if (inv.tax != null && !isNaN(+inv.tax)) return sum + +inv.tax;
    try { return sum + computeDoc(inv.items || [], setup, inv.discount || 0).vat; } catch (e) { return sum; }
  }, 0);
}

function Reports() {
  const { money, products, orders, invoices, customers, setup, t, showToast, currentBU } = useApp();
  const [period, setPeriod] = useState("today");
  const periods = [["today", "Today"], ["week", "This Week"], ["month", "This Month"]];
  const buName = (currentBU && currentBU.name) || "your business";

  const now = new Date();
  const periodOrders = getOrdersForPeriod(orders, period, now);
  const periodInvoices = getOrdersForPeriod(invoices, period, now);
  const revenue = getRevenue(periodOrders, setup);
  const orderCount = periodOrders.length;
  const newCustomers = getNewCustomersForPeriod(customers, period, now);
  const avgTicket = getAverageTicket(periodOrders, setup);
  const vatCollected = invoiceVatTotal(periodInvoices, setup);

  const chart = groupSalesByPeriod(periodOrders, period, setup, now);
  const maxBar = Math.max(1, ...chart.bars.map((b) => b.value));
  const hasSales = periodOrders.length > 0;

  const payments = getPaymentBreakdown(periodOrders, setup).filter((p) => p.amount > 0);
  const categories = getCategoryRevenue(periodOrders, products);
  const catTotal = categories.reduce((s, c) => s + c.revenue, 0);
  const bestSellers = getBestSellers(periodOrders).slice(0, 5);

  const stockValue = products.reduce((s, p) => s + (+p.cost || 0) * (+p.stock || 0), 0);
  const lowCount = products.filter((p) => p.stock > 0 && p.stock <= p.low).length;
  const outCount = products.filter((p) => p.stock === 0).length;

  // donut geometry
  const R = 54, C = 2 * Math.PI * R;
  let acc = 0;
  const segs = categories.map((c, i) => {
    const frac = catTotal ? c.revenue / catTotal : 0;
    const seg = { color: REPORT_CAT_COLORS[i % REPORT_CAT_COLORS.length], dash: frac * C, offset: -acc * C, pct: Math.round(frac * 100), name: c.name };
    acc += frac; return seg;
  });

  const periodLabel = period === "today" ? "today" : period === "week" ? "this week" : "this month";

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("reports"))}>
      <div className="nx-page">
        <div className="nx-page-head">
          <div><h1 className="nx-page-title">{t("reports")}</h1><p className="nx-page-sub">Analyze {buName} performance and trends.</p></div>
          <div className="nx-row" style={{ gap: 10 }}>
            <div className="nx-seg">{periods.map(([id, label]) => <button key={id} className={period === id ? "on" : ""} onClick={() => setPeriod(id)}>{label}</button>)}</div>
            <Button variant="secondary" icon="download" onClick={() => showToast("Export queued — you'll get a CSV by email")}>Export</Button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="nx-kpi-grid" style={{ marginBottom: 20 }}>
          <Stat label="Revenue" value={money(revenue)} icon="wallet" sub={periodLabel} />
          <Stat label="Orders" value={String(orderCount)} icon="shopping-bag" sub={periodLabel} />
          <Stat label="New customers" value={String(newCustomers)} icon="user-plus" sub={periodLabel} />
          <Stat label="Avg ticket" value={money(avgTicket)} icon="receipt" sub="per order" />
        </div>

        {/* Chart + Top categories */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 20 }} className="nx-detail">
          <Card>
            <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 18 }}>
              <div><div className="nx-eyebrow">Sales by period</div><div className="nx-section-title" style={{ marginTop: 4 }}>{period === "today" ? "Today by hour" : period === "week" ? "Last 7 days" : "This month by day"}</div></div>
              <div className="num" style={{ fontWeight: 800, fontSize: 18 }}>{money(revenue)}</div>
            </div>
            {!hasSales ? (
              <div style={{ height: 210, display: "grid", placeItems: "center" }}><EmptyState icon="bar-chart-3" title="No sales data yet" desc={`No sales recorded ${periodLabel}. Complete a POS sale to see it here.`} /></div>
            ) : (
              <>
                <div className="nx-chart" style={{ height: 200 }}>
                  {chart.bars.map((b, i) => (
                    <div key={i} className="nx-chart-col" title={`${chart.fmtLabel(b.label)} · ${money(b.value)}`}>
                      <div className="nx-chart-bar" style={{ height: Math.max(2, b.value / maxBar * 180) + "px", opacity: b.value > 0 ? 1 : .18 }} />
                    </div>
                  ))}
                </div>
                <div className="nx-chart-axis">
                  {chart.axis
                    ? chart.axis.map((a) => <span key={a}>{chart.fmtLabel(a)}</span>)
                    : chart.bars.map((b, i) => <span key={i}>{b.label}</span>)}
                </div>
              </>
            )}
          </Card>

          <Card>
            <div className="nx-eyebrow" style={{ marginBottom: 4 }}>Top categories</div>
            <div className="nx-section-title" style={{ marginBottom: 16 }}>By revenue</div>
            {categories.length === 0 ? (
              <EmptyState icon="layers" title="No category data" desc="Sell products to see category revenue." />
            ) : categories.slice(0, 5).map((c, i) => (
              <div key={c.name} style={{ marginBottom: 16 }}>
                <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                  <div><div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.name}</div><div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{c.units} {c.units === 1 ? "item" : "items"} sold</div></div>
                  <span className="num" style={{ fontWeight: 700, fontSize: 13.5 }}>{money(c.revenue)}</span>
                </div>
                <div className="nx-progress"><span style={{ width: (catTotal ? c.revenue / catTotal * 100 : 0) + "%", background: REPORT_CAT_COLORS[i % REPORT_CAT_COLORS.length] }} /></div>
              </div>
            ))}
          </Card>
        </div>

        {/* Revenue split + Best sellers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, marginBottom: 20 }} className="nx-detail">
          <Card>
            <div className="nx-eyebrow" style={{ marginBottom: 4 }}>By category</div>
            <div className="nx-section-title" style={{ marginBottom: 16 }}>Revenue split</div>
            {categories.length === 0 ? (
              <EmptyState icon="pie-chart" title="No data" desc="No products sold yet." />
            ) : (
              <div className="nx-row" style={{ gap: 22, alignItems: "center" }}>
                <svg width="132" height="132" viewBox="0 0 132 132" style={{ flexShrink: 0 }}>
                  <circle cx="66" cy="66" r={R} fill="none" stroke="var(--surface-3)" strokeWidth="16" />
                  {segs.map((s, i) => (
                    <circle key={i} cx="66" cy="66" r={R} fill="none" stroke={s.color} strokeWidth="16"
                      strokeDasharray={`${s.dash} ${C - s.dash}`} strokeDashoffset={s.offset}
                      transform="rotate(-90 66 66)" strokeLinecap="butt" />
                  ))}
                  <text x="66" y="62" textAnchor="middle" style={{ fontSize: 11, fill: "var(--text-3)" }}>Total</text>
                  <text x="66" y="78" textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: "var(--text)", fontFamily: "var(--mono)" }}>{Math.round(catTotal).toLocaleString()}</text>
                </svg>
                <div style={{ flex: 1 }}>
                  {segs.slice(0, 6).map((s) => (
                    <div key={s.name} className="nx-row" style={{ justifyContent: "space-between", marginBottom: 9 }}>
                      <div className="nx-row" style={{ gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} /><span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span></div>
                      <span className="num" style={{ fontSize: 13, color: "var(--text-2)" }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card style={{ padding: 0 }}>
            <div style={{ padding: "18px 20px 6px" }}><div className="nx-eyebrow">Top products</div><div className="nx-section-title" style={{ marginTop: 4 }}>Best sellers</div></div>
            {bestSellers.length === 0 ? (
              <div style={{ padding: "10px 20px 24px" }}><EmptyState icon="package" title="No products sold yet" desc={`No items sold ${periodLabel}.`} /></div>
            ) : (
              <table className="nx-table">
                <tbody>
                  {bestSellers.map((p, i) => (
                    <tr key={p.name}>
                      <td style={{ width: 40 }}><span className="nx-rank">{i + 1}</span></td>
                      <td className="nx-td-strong">{p.name}</td>
                      <td className="num nx-td-muted" style={{ textAlign: "end" }}>{p.units} sold</td>
                      <td className="num nx-td-strong" style={{ textAlign: "end" }}>{money(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>

        {/* Payment methods + Inventory insight */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }} className="nx-detail">
          <Card>
            <div className="nx-section-title" style={{ marginBottom: 16 }}>Payment methods</div>
            {payments.length === 0 ? (
              <EmptyState icon="credit-card" title="No payments yet" desc={`No paid orders ${periodLabel}.`} />
            ) : payments.map((p) => {
              const c = p.name === "Cash" ? "var(--accent)" : p.name === "Card" ? "var(--teal)" : p.name === "Wallet" ? "var(--warn)" : "var(--text-3)";
              return (
                <div key={p.name} style={{ marginBottom: 14 }}>
                  <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 13 }}><span className="num" style={{ fontWeight: 700 }}>{money(p.amount)}</span> <span style={{ color: "var(--text-3)" }}>· {p.pct}%</span></span>
                  </div>
                  <div className="nx-progress"><span style={{ width: p.pct + "%", background: c }} /></div>
                </div>
              );
            })}
            {payments.length > 0 && <>
              <hr className="nx-divider" style={{ margin: "16px 0" }} />
              <div className="nx-row" style={{ justifyContent: "space-between" }}><span style={{ color: "var(--text-2)", fontSize: 13 }}>VAT collected ({setup.vatRate || 0}%)</span><span className="num" style={{ fontWeight: 700 }}>{money(vatCollected)}</span></div>
            </>}
          </Card>

          <Card>
            <div className="nx-section-title" style={{ marginBottom: 16 }}>Inventory insight</div>
            <div className="nx-inv-insight">
              <div><span className="nx-inv-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="coins" size={16} /></span><div><div className="num" style={{ fontWeight: 800, fontSize: 17 }}>{money(stockValue)}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Inventory value (at cost)</div></div></div>
              <div><span className="nx-inv-ic" style={{ background: "var(--warn-weak)", color: "var(--warn)" }}><Icon name="alert-triangle" size={16} /></span><div><div className="num" style={{ fontWeight: 800, fontSize: 17 }}>{lowCount}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Low stock items</div></div></div>
              <div><span className="nx-inv-ic" style={{ background: "var(--danger-weak)", color: "var(--danger)" }}><Icon name="package-x" size={16} /></span><div><div className="num" style={{ fontWeight: 800, fontSize: 17 }}>{outCount}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Out of stock</div></div></div>
            </div>
          </Card>
        </div>
      </div>
    </CommerceShell>
  );
}

/* ---------------- Customers: shared helpers ---------------- */
function customerTag(count, spent) {
  if (spent >= 10000 || count >= 10) return { label: "VIP", tone: "accent" };
  if (count >= 2) return { label: "Regular", tone: "teal" };
  return { label: "New", tone: "neutral" };
}
function useCustomerMetrics(orders) {
  return (id) => {
    const os = orders.filter((o) => o.customerId === id);
    const spent = os.reduce((s, o) => s + (o.total != null ? o.total : 0), 0);
    const sorted = [...os].sort((a, b) => (b.createdAt || b.date || "").localeCompare(a.createdAt || a.date || ""));
    return { count: os.length, spent, last: sorted[0] ? (sorted[0].date || sorted[0].createdAt) : null, orders: sorted, tag: customerTag(os.length, spent) };
  };
}
function fmtSinceMonth(c) {
  const iso = c && (c.createdAt || c.since);
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" }); } catch (e) { return iso; }
}
function isThisMonth(iso) {
  if (!iso) return false;
  const d = new Date(iso), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}
function isThisWeek(iso) {
  if (!iso) return false;
  const d = new Date(iso), n = new Date();
  return (n - d) <= 7 * 864e5 && d <= n;
}

/* ---------------- Customers list ---------------- */
function Customers() {
  const { money, customers, orders, nav, t } = useApp();
  const [sel, setSel] = useState(null);
  const [q, setQ] = useState("");
  const metricsFor = useCustomerMetrics(orders);

  // summary metrics derived from real records
  const activeThisMonth = customers.filter((c) => orders.some((o) => o.customerId === c.id && isThisMonth(o.createdAt || o.date))).length;
  const newThisWeek = customers.filter((c) => isThisWeek(c.createdAt)).length;

  const term = q.trim().toLowerCase();
  const shown = customers.filter((c) => !term
    || (c.name || "").toLowerCase().includes(term)
    || (c.phone || "").toLowerCase().includes(term)
    || (c.email || "").toLowerCase().includes(term));

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("customers"))}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">{t("customers")}</h1><p className="nx-page-sub">Created automatically from POS sales</p></div></div>

        {/* summary cards */}
        <div className="nx-dash-grid" style={{ marginBottom: 20 }}>
          <Stat label="Total customers" value={customers.length} icon="users" sub="all time" />
          <Stat label="Active this month" value={activeThisMonth} icon="user-check" sub="ordered this month" />
          <Stat label="New this week" value={newThisWeek} icon="user-plus" sub="added in last 7 days" />
        </div>

        {customers.length === 0 ? (
          <Card><EmptyState icon="user-round" title="No customers yet" desc="Add a customer during POS checkout and they'll appear here with full order history. Walk-in sales stay anonymous." action={<Button icon="scan-barcode" onClick={() => nav("pos")}>Open POS</Button>} /></Card>
        ) : (
          <Card style={{ padding: 0 }}>
            <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
              <div style={{ maxWidth: 340 }}><Input icon="search" placeholder="Search name, phone or email…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
            </div>
            <table className="nx-table">
              <thead><tr><th>Customer</th><th>Contact</th><th>Tag</th><th>Orders</th><th>Total spent</th><th>Last order</th><th>Since</th><th></th></tr></thead>
              <tbody>
              {shown.length === 0 && <tr><td colSpan="8"><div style={{ textAlign: "center", padding: "26px 0", color: "var(--text-3)", fontSize: 13 }}>No customers match "{q}".</div></td></tr>}
              {shown.map((c) => {
                const m = metricsFor(c.id);
                return (
                  <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => setSel(c)}>
                    <td><div className="nx-row" style={{ gap: 10 }}><Avatar name={c.name} size={32} /><span className="nx-td-strong">{c.name}</span></div></td>
                    <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{c.phone || c.email || "—"}</td>
                    <td><Badge tone={m.tag.tone}>{m.tag.label}</Badge></td>
                    <td className="num">{m.count}</td>
                    <td className="num nx-td-strong">{money(m.spent)}</td>
                    <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{m.last ? String(m.last).split(" ")[0] : "—"}</td>
                    <td className="nx-td-muted">{fmtSinceMonth(c)}</td>
                    <td><button className="nx-icon-btn" onClick={(e) => { e.stopPropagation(); setSel(c); }}><Icon name="chevron-right" size={16} /></button></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </Card>
        )}
      </div>
      <CustomerDrawer customer={sel} metricsFor={metricsFor} onClose={() => setSel(null)} />
    </CommerceShell>
  );
}

/* ---------------- Customer drawer (quick view) ---------------- */
function CustomerDrawer({ customer, metricsFor, onClose }) {
  const { money, nav } = useApp();
  if (!customer) return null;
  const m = metricsFor(customer.id);
  const recent = m.orders.slice(0, 3);
  return (
    <div className="nx-drawer-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nx-drawer nx-drawer-in">
        <div className="nx-drawer-head">
          <div className="nx-row" style={{ gap: 12 }}>
            <Avatar name={customer.name} size={46} />
            <div>
              <div className="nx-row" style={{ gap: 8 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>{customer.name}</h3><Badge tone={m.tag.tone}>{m.tag.label}</Badge></div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>Customer since {fmtSinceMonth(customer)} · from {customer.source || "POS"}</div>
            </div>
          </div>
          <button className="nx-icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <div className="nx-drawer-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            <Card style={{ padding: 14 }}><div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>Total orders</div><div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{m.count}</div></Card>
            <Card style={{ padding: 14 }}><div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>Total spent</div><div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{money(m.spent)}</div></Card>
          </div>
          <div className="nx-section-title" style={{ marginBottom: 10 }}>Contact</div>
          <Card style={{ padding: 0, marginBottom: 20 }}>
            <div className="nx-cust-detail"><Icon name="phone" size={15} /><span>{customer.phone || "No phone on file"}</span></div>
            <div className="nx-cust-detail"><Icon name="mail" size={15} /><span>{customer.email || "No email on file"}</span></div>
          </Card>
          <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <div className="nx-section-title">Recent orders</div>
            {m.count > 3 && <span style={{ fontSize: 12, color: "var(--text-3)" }}>Latest 3 of {m.count}</span>}
          </div>
          {recent.length === 0
            ? <EmptyState icon="shopping-bag" title="No orders" desc="This customer has no linked sales yet." />
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {recent.map((o) => (
                  <button key={o.id} className="nx-cust-order" onClick={() => { onClose(); nav("order-details", { id: o.id }); }}>
                    <div style={{ flex: 1, textAlign: "start" }}>
                      <div className="num" style={{ fontWeight: 700, fontSize: 13 }}>{o.num}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{o.date} · {o.payment} · {o.items.length} {o.items.length === 1 ? "item" : "items"}</div>
                    </div>
                    <span className="num" style={{ fontWeight: 700 }}>{money(o.total != null ? o.total : 0)}</span>
                    <Icon name="chevron-right" size={16} style={{ color: "var(--text-3)" }} />
                  </button>
                ))}
              </div>}
          <Button full icon="user-round" style={{ marginTop: 18 }} onClick={() => { onClose(); nav("customer-profile", { id: customer.id }); }}>View full profile</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Full customer profile page ---------------- */
function CustomerProfilePage() {
  const { money, customers, orders, route, nav, t } = useApp();
  const metricsFor = useCustomerMetrics(orders);
  const customer = customers.find((c) => c.id === route.params.id);

  if (!customer) {
    return (
      <CommerceShell crumb={COMMERCE_CRUMB(t("customers"))}>
        <div className="nx-page">
          <Card><EmptyState icon="user-x" title="Customer not found" desc="This customer record is no longer available." action={<Button icon="arrow-left" onClick={() => nav("customers")}>Back to customers</Button>} /></Card>
        </div>
      </CommerceShell>
    );
  }
  const m = metricsFor(customer.id);

  return (
    <CommerceShell crumb={<><span onClick={() => nav("customers")} style={{ cursor: "pointer" }}>{t("customers")}</span><Icon name="chevron-right" size={14} /><b>{customer.name}</b></>}>
      <div className="nx-page" style={{ maxWidth: 1040 }}>
        <button className="nx-link" style={{ marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => nav("customers")}><Icon name="arrow-left" size={15} />Back to customers</button>

        {/* header card */}
        <Card style={{ marginBottom: 20 }}>
          <div className="nx-cust-header">
            <div className="nx-row" style={{ gap: 16, minWidth: 0, flex: 1 }}>
              <Avatar name={customer.name} size={64} />
              <div style={{ minWidth: 0 }}>
                <div className="nx-row" style={{ gap: 10 }}><h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", whiteSpace: "nowrap" }}>{customer.name}</h1><Badge tone={m.tag.tone}>{m.tag.label}</Badge></div>
                <div className="nx-row" style={{ gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="nx-cust-meta"><Icon name="phone" size={14} />{customer.phone || "No phone"}</span>
                  <span className="nx-cust-meta"><Icon name="mail" size={14} />{customer.email || "No email"}</span>
                  <span className="nx-cust-meta"><Icon name="calendar" size={14} />Since {fmtSinceMonth(customer)}</span>
                  <span className="nx-cust-meta"><Icon name="map-pin" size={14} />from {customer.source || "POS"}</span>
                </div>
              </div>
            </div>
            <div className="nx-cust-header-stats">
              <div><div className="num" style={{ fontSize: 28, fontWeight: 800 }}>{m.count}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Total orders</div></div>
              <div style={{ width: 1, background: "var(--border)" }} />
              <div><div className="num" style={{ fontSize: 28, fontWeight: 800 }}>{money(m.spent)}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Total spent</div></div>
            </div>
          </div>
        </Card>

        {/* order history */}
        <div className="nx-section-title" style={{ marginBottom: 12 }}>Order history</div>
        {m.orders.length === 0 ? (
          <Card><EmptyState icon="shopping-bag" title="No orders yet" desc="Orders linked to this customer will appear here." /></Card>
        ) : (
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {m.orders.map((o) => (
                  <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => nav("order-details", { id: o.id })}>
                    <td className="num nx-td-strong">{o.num}</td>
                    <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{o.date}</td>
                    <td className="num">{o.items.length}</td>
                    <td><Badge tone="neutral">{o.payment}</Badge></td>
                    <td className="num nx-td-strong">{money(o.total != null ? o.total : 0)}</td>
                    <td><Badge tone="pos" dot>{o.status || "Paid"}</Badge></td>
                    <td><button className="nx-icon-btn"><Icon name="chevron-right" size={16} /></button></td>
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

/* ---------------- Commerce Settings ---------------- */
function CommerceSettings() {
  const { setup, setSetup, money, lang, setLang, t, showToast, currentBU, workspace, products } = useApp();
  const businessName = currentBU && currentBU.name ? currentBU.name : setup.displayName || "Commerce business";
  const [tab, setTab] = useState("identity");
  const upd = (patch) => setSetup({ ...setup, ...patch });
  const sections = [
    ["identity", "Business Identity", "building-2"], ["tax", "Tax Settings", "landmark"], ["numbering", "Numbering", "hash"],
    ["templates", "Document Templates", "layout-template"], ["pos", "POS Settings", "scan-barcode"], ["region", "Language & Region", "languages"],
  ];
  const presetId = setup.presetId || setup.businessType || setup.preset || "retail";
  const sampleItems = products.length
    ? products.slice(0, 2).map((p) => ({ name: p.name, qty: 1, price: p.price, taxable: p.taxable, sku: p.sku }))
    : previewItemsForPreset(presetId).slice(0, 2);

  return (
    <CommerceShell crumb={COMMERCE_CRUMB(t("settings"))}>
      <div className="nx-page">
        <div className="nx-page-head"><div><h1 className="nx-page-title">Commerce settings</h1><p className="nx-page-sub">Configure {businessName}'s Commerce OS.</p></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: 24 }} className="nx-detail">
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 20, alignSelf: "start" }}>
            {sections.map(([id, label, ic]) => (
              <button key={id} className={"nx-nav-item" + (tab === id ? " active" : "")} onClick={() => setTab(id)}><Icon name={ic} size={17} />{label}</button>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {tab === "identity" && <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>Business identity</div>
              <div className="nx-form-grid">
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <BrandMark name={setup.displayName} logo={setup.logo} size={56} radius={14} />
                  <LogoUpload value={setup.logo} onChange={(v) => upd({ logo: v })} />
                </div>
                <Field label="Business display name"><Input value={setup.displayName} onChange={(e) => upd({ displayName: e.target.value })} placeholder={businessName} /></Field>
                <div className="nx-form-grid cols-2"><Field label="Phone"><Input value={setup.phone} onChange={(e) => upd({ phone: e.target.value })} /></Field><Field label="Address"><Input value={setup.address} onChange={(e) => upd({ address: e.target.value })} /></Field></div>
                <Button size="sm" style={{ alignSelf: "flex-start" }} onClick={() => showToast("Settings saved")}>Save changes</Button>
              </div>
            </Card>}
            {tab === "tax" && <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>Tax settings</div>
              <div className="nx-form-grid">
                <div className="nx-row" style={{ justifyContent: "space-between" }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Registered for VAT</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>Show tax on all documents</div></div><Toggle checked={setup.vatRegistered} onChange={(v) => upd({ vatRegistered: v })} /></div>
                <div className="nx-form-grid cols-2"><Field label="Tax number"><Input value={setup.taxNumber} onChange={(e) => upd({ taxNumber: e.target.value })} /></Field><Field label="VAT rate (%)"><Input type="number" value={setup.vatRate} onChange={(e) => upd({ vatRate: +e.target.value })} /></Field></div>
                <Field label="Prices include tax"><div className="nx-seg"><button className={setup.pricesIncludeTax ? "on" : ""} onClick={() => upd({ pricesIncludeTax: true })}>Inclusive</button><button className={!setup.pricesIncludeTax ? "on" : ""} onClick={() => upd({ pricesIncludeTax: false })}>Exclusive</button></div></Field>
              </div>
            </Card>}
            {tab === "numbering" && <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>Invoice & receipt numbering</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2"><Field label="Invoice prefix"><Input value={setup.invoicePrefix} onChange={(e) => upd({ invoicePrefix: e.target.value })} /></Field><Field label="Receipt prefix"><Input value={setup.receiptPrefix} onChange={(e) => upd({ receiptPrefix: e.target.value })} /></Field></div>
                <Field label="Footer message"><Input value={setup.footer} onChange={(e) => upd({ footer: e.target.value })} /></Field>
              </div>
            </Card>}
            {tab === "templates" && <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }} className="nx-detail">
              <Card>
                <div className="nx-section-title" style={{ marginBottom: 16 }}>Document templates</div>
                <Field label="Receipt size"><div className="nx-seg">{["58mm", "80mm"].map((s) => <button key={s} className={setup.receiptSize === s ? "on" : ""} onClick={() => upd({ receiptSize: s })}>{s}</button>)}</div></Field>
                <Field label="Receipt style" className="" ><div className="nx-seg">{["minimal", "classic", "detailed"].map((s) => <button key={s} className={setup.receiptStyle === s ? "on" : ""} onClick={() => upd({ receiptStyle: s })} style={{ textTransform: "capitalize" }}>{s}</button>)}</div></Field>
                <Field label="Logo position"><div className="nx-seg"><button className="on">Center</button><button>Left</button></div></Field>
                <Field label="Footer message"><Input value={setup.footer} onChange={(e) => upd({ footer: e.target.value })} /></Field>
              </Card>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><div className="nx-wiz-aside-label" style={{ alignSelf: "flex-start", marginBottom: 10 }}>Live preview</div><ReceiptDoc setup={setup} items={sampleItems} meta={{ payment: "Cash" }} /></div>
            </div>}
            {tab === "pos" && <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>POS settings</div>
              <div className="nx-form-grid">
                <Field label="Default payment method"><Select defaultValue="Cash">{["Cash", "Card", "Wallet"].map((m) => <option key={m}>{m}</option>)}</Select></Field>
                <Field label="Barcode input behavior"><Select defaultValue="add"><option value="add">Add to cart on scan</option><option value="find">Find & highlight only</option></Select></Field>
                <Field label="Receipt print size"><div className="nx-seg">{["58mm", "80mm"].map((s) => <button key={s} className={setup.receiptSize === s ? "on" : ""} onClick={() => upd({ receiptSize: s })}>{s}</button>)}</div></Field>
                <div className="nx-row" style={{ justifyContent: "space-between", opacity: .6 }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Cash drawer <Badge tone="neutral"><Icon name="lock" size={11} />Future</Badge></div></div><Toggle checked={false} disabled onChange={() => {}} /></div>
                <div className="nx-row" style={{ justifyContent: "space-between", opacity: .6 }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>Printer <Badge tone="neutral"><Icon name="lock" size={11} />Future</Badge></div></div><Toggle checked={false} disabled onChange={() => {}} /></div>
              </div>
            </Card>}
            {tab === "region" && <Card>
              <div className="nx-section-title" style={{ marginBottom: 16 }}>Language & region</div>
              <div className="nx-form-grid">
                <Field label="Interface language"><div className="nx-seg"><button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>English (LTR)</button><button className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")}>العربية (RTL)</button></div></Field>
                <div className="nx-form-grid cols-2"><Field label="Currency"><Select value={workspace.currency || "EGP"} onChange={() => {}}><option value="EGP">EGP — Egyptian Pound</option><option value="SAR">SAR — Saudi Riyal</option><option value="AED">AED — UAE Dirham</option></Select></Field><Field label="Timezone"><Select value={workspace.timezone || "Africa/Cairo"} onChange={() => {}}><option value="Africa/Cairo">Africa/Cairo (GMT+2)</option><option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option><option value="Asia/Dubai">Asia/Dubai (GMT+4)</option></Select></Field></div>
                <Field label="Date format"><Select defaultValue="dmy"><option value="dmy">DD/MM/YYYY</option><option value="mdy">MM/DD/YYYY</option></Select></Field>
              </div>
            </Card>}
          </div>
        </div>
      </div>
    </CommerceShell>
  );
}

Object.assign(window, { Orders, OrderDetails, Invoices, InvoiceDetails, Reports, Customers, CustomerProfilePage, CommerceSettings });
