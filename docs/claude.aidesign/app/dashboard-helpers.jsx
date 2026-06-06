// ============================================================
// NexoraXS — Commerce OS Dashboard helpers (real DB only)
// ============================================================

// Parse an order's timestamp defensively → Date or null
function nxOrderDate(o) {
  if (!o) return null;
  const raw = o.createdAt || o.date || o.time || null;
  if (!raw) return null;
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d;
  // fallback: "YYYY-MM-DD HH:mm"
  const m = String(raw).match(/(\d{4})-(\d{2})-(\d{2})[ T]?(\d{2})?:?(\d{2})?/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3], +m[4] || 0, +m[5] || 0);
  return null;
}

// Order total — prefer stored total, else compute from items - discount
function nxOrderTotal(o) {
  if (!o) return 0;
  if (typeof o.total === "number") return o.total;
  const items = o.items || [];
  const gross = items.reduce((s, i) => s + (+i.price || 0) * (+i.qty || 0), 0);
  return Math.max(0, gross - (+o.discount || 0));
}

function nxOrderItemCount(o) {
  return (o && o.items || []).reduce((s, i) => s + (+i.qty || 0), 0);
}

function nxOrderPaid(o) {
  const st = String(o && (o.status || (o.paid ? "Paid" : "")) || "").toLowerCase();
  return st === "paid" || st === "completed" || o && o.paid === true;
}

// Period boundary: returns a predicate (Date) => bool
function nxPeriodFilter(period, now) {
  const ref = now || new Date();
  if (period === "today") {
    return (d) => d && d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
  }
  if (period === "week") {
    const start = new Date(ref); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - 6);
    return (d) => d && d >= start && d <= ref;
  }
  // month
  return (d) => d && d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

function nxOrdersForPeriod(orders, period, now) {
  const inP = nxPeriodFilter(period, now);
  return (orders || []).filter((o) => { const d = nxOrderDate(o); return d ? inP(d) : (period === "month" || period === "week"); });
}

function nxRevenue(orders) {
  return (orders || []).reduce((s, o) => s + (nxOrderPaid(o) || o.paid === undefined ? nxOrderTotal(o) : 0), 0);
}

function nxNewCustomers(customers, period, now) {
  const inP = nxPeriodFilter(period, now);
  return (customers || []).filter((c) => { const d = c && (c.createdAt || c.since) ? new Date(c.createdAt || c.since) : null; return d && !isNaN(d) ? inP(d) : false; }).length;
}

// Best sellers from order items, resolving category via products
function nxBestSellers(orders, products, limit) {
  const byProd = {};
  (orders || []).forEach((o) => (o.items || []).forEach((i) => {
    const key = i.id || i.sku || i.name;
    if (!byProd[key]) {
      const prod = (products || []).find((p) => p.id === i.id || p.sku === i.sku || p.name === i.name);
      byProd[key] = { name: i.name || (prod && prod.name) || "Item", category: (prod && prod.category) || i.category || "—", qty: 0, rev: 0 };
    }
    byProd[key].qty += (+i.qty || 0);
    byProd[key].rev += (+i.qty || 0) * (+i.price || 0);
  }));
  return Object.values(byProd).sort((a, b) => b.rev - a.rev).slice(0, limit || 5);
}

// Group sales into buckets for the rhythm chart
function nxGroupSales(orders, period, now) {
  const ref = now || new Date();
  if (period === "today") {
    const buckets = Array.from({ length: 24 }, (_, h) => ({ label: h, total: 0 }));
    (orders || []).forEach((o) => { const d = nxOrderDate(o); if (d) buckets[d.getHours()].total += nxOrderTotal(o); });
    return { buckets, axis: ["00", "06", "12", "18", "24"], kind: "hour" };
  }
  if (period === "week") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const buckets = [];
    for (let i = 6; i >= 0; i--) { const d = new Date(ref); d.setDate(d.getDate() - i); buckets.push({ label: days[d.getDay()], total: 0, key: d.toDateString() }); }
    (orders || []).forEach((o) => { const d = nxOrderDate(o); if (!d) return; const b = buckets.find((x) => x.key === d.toDateString()); if (b) b.total += nxOrderTotal(o); });
    return { buckets, axis: buckets.map((b) => b.label), kind: "day" };
  }
  // month → days of month
  const daysIn = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate();
  const buckets = Array.from({ length: daysIn }, (_, i) => ({ label: i + 1, total: 0 }));
  (orders || []).forEach((o) => { const d = nxOrderDate(o); if (d && d.getMonth() === ref.getMonth()) buckets[d.getDate() - 1].total += nxOrderTotal(o); });
  return { buckets, axis: ["1", String(Math.ceil(daysIn / 2)), String(daysIn)], kind: "day" };
}

Object.assign(window, {
  nxOrderDate, nxOrderTotal, nxOrderItemCount, nxOrderPaid,
  nxOrdersForPeriod, nxRevenue, nxNewCustomers, nxBestSellers, nxGroupSales, nxPeriodFilter,
});
