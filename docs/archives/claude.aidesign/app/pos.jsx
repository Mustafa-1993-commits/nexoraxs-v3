// ============================================================
// NexoraXS — Commerce OS: POS, Checkout, Sale Success, Receipt
// ============================================================

/* ---------------- POS ---------------- */
function POS() {
  const { nav, money, products, setProducts, orders, setOrders, invoices, setInvoices, customers, setCustomers, setup, lang, t, showToast, workspace, currentBU, currentBranch } = useApp();
  const [cart, setCart] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [discount, setDiscount] = useState(0);
  const [customer, setCustomer] = useState(null); // null = Walk-in / Guest
  const [custPicker, setCustPicker] = useState(false);
  const [pay, setPay] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const searchRef = useRef(null);

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => (cat === "All" || p.category === cat) && (p.name.toLowerCase().includes(q.toLowerCase()) || p.barcode.includes(q) || p.sku.toLowerCase().includes(q.toLowerCase())));

  const add = (p) => {
    if (p.stock === 0) return;
    setCart((c) => { const ex = c.find((i) => i.id === p.id); return ex ? c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...p, qty: 1 }]; });
  };
  const setQty = (id, d) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const doc = computeDoc(cart, setup, discount);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  // keyboard shortcuts
  useEffect(() => {
    const h = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) { e.preventDefault(); searchRef.current && searchRef.current.focus(); }
      if (e.key === "F2" && cart.length && !pay) { e.preventDefault(); setPay(true); }
      if (e.key === "Enter" && document.activeElement === searchRef.current && filtered.length === 1) { add(filtered[0]); setQ(""); }
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [cart, pay, filtered]);

  const completeSale = (method) => {
    const n = 1001 + orders.length;
    const saleDate = new Date().toISOString().slice(0, 16).replace("T", " ");
    const ts = window.NexoraDB.nowISO();

    // ---- resolve customer: Walk-in (null) | existing (has id) | new (create record) ----
    let customerId = null, customerName = "Walk-in customer";
    let nextCustomers = customers;
    if (customer && customer.name && customer.name.trim()) {
      if (customer.id) {
        customerId = customer.id; customerName = customer.name.trim();
      } else {
        const rec = {
          id: "cust_" + Date.now(),
          workspaceId: workspace && workspace.id, businessUnitId: currentBU && currentBU.id, branchId: currentBranch && currentBranch.id,
          name: customer.name.trim(), phone: (customer.phone || "").trim(), email: (customer.email || "").trim().toLowerCase(),
          createdAt: ts, updatedAt: ts, source: "pos",
        };
        nextCustomers = [rec, ...customers];
        customerId = rec.id; customerName = rec.name;
      }
    }

    const items = cart.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, sku: i.sku, taxable: i.taxable }));
    const sale = {
      id: String(n), workspaceId: workspace && workspace.id, businessUnitId: currentBU && currentBU.id, branchId: currentBranch && currentBranch.id,
      num: `ORD-${n}`, date: saleDate, createdAt: ts,
      customerId, customerName, customer: customerName,
      channel: "POS", payment: method, paymentMethod: method, paid: true, status: "Paid",
      invoice: `${setup.invoicePrefix}-${setup.invoiceStart + orders.length}`, receipt: `${setup.receiptPrefix}-${setup.receiptStart + orders.length}`,
      items, discount,
      subtotal: doc.net, tax: doc.vat, total: doc.total,
    };
    const invoice = {
      id: sale.id, workspaceId: sale.workspaceId, businessUnitId: sale.businessUnitId, branchId: sale.branchId,
      orderId: sale.id, order: sale.num, invoice: sale.invoice,
      customerId, customerName, customer: customerName,
      date: sale.date, createdAt: ts, payment: sale.payment, items: sale.items, discount: sale.discount,
      net: doc.net, vat: doc.vat, tax: doc.vat, total: doc.total, status: "Paid",
    };
    setOrders([sale, ...orders]);
    setInvoices([invoice, ...invoices]);
    setProducts(products.map((p) => { const ci = cart.find((c) => c.id === p.id); return ci ? { ...p, stock: Math.max(0, p.stock - ci.qty) } : p; }));
    if (nextCustomers !== customers) setCustomers(nextCustomers);
    setPay(false); setCart([]); setDiscount(0); setCustomer(null);
    nav("sale-success", { sale });
  };

  return (
    <div className="nx-pos">
      <div className="nx-pos-left">
        <div className="nx-pos-topbar">
          <button className="nx-icon-btn" onClick={() => nav("dashboard")}><Icon name="arrow-left" size={19} /></button>
          <div className="nx-row" style={{ gap: 8 }}><Icon name="scan-barcode" size={18} style={{ color: "var(--accent)" }} /><b style={{ fontSize: 15 }}>Point of Sale</b><Badge tone="neutral">{currentBU ? currentBU.name : setup.displayName || "Commerce"}</Badge></div>
          <span className="nx-spacer" />
          <LangSwitch />
        </div>
        <div className="nx-pos-topbar" style={{ borderTop: "none", height: "auto", paddingBlock: 12 }}>
          <div className="nx-pos-search"><Input ref={searchRef} icon="search" placeholder={t("scan_or_search") + "   ( / )"} value={q} onChange={(e) => setQ(e.target.value)} autoFocus /></div>
        </div>
        <div className="nx-pos-cats">
          {cats.map((c) => <button key={c} className={"nx-chip-filter" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="nx-pos-grid">
          {filtered.map((p) => (
            <button key={p.id} className={"nx-pcard" + (p.stock === 0 ? " oos" : "")} onClick={() => add(p)}>
              <div className="nx-pcard-img nx-thumb-stripe">{p.image ? <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} /> : <Icon name="pill" size={20} />}</div>
              <div className="nx-pcard-name">{p.name}</div>
              <div className="nx-pcard-foot">
                <span className="nx-pcard-price">{money(p.price)}</span>
                {p.stock === 0 ? <Badge tone="danger">Out</Badge> : p.stock <= p.low ? <Badge tone="warn">{p.stock}</Badge> : <span style={{ fontSize: 11, color: "var(--text-3)" }}>{p.stock} in stock</span>}
              </div>
            </button>
          ))}
          {filtered.length === 0 && <div style={{ gridColumn: "1/-1" }}><EmptyState icon="search-x" title="No products found" desc="Try another search or category." /></div>}
        </div>
        <div className="nx-pos-help">
          <span><span className="nx-kbd">/</span> Focus search</span>
          <span><span className="nx-kbd">Enter</span> Add exact match</span>
          <span><span className="nx-kbd">F2</span> Checkout</span>
          <span><span className="nx-kbd">Esc</span> Close modal</span>
          <span className="nx-spacer" />
          <button className="nx-link nx-pos-cartbtn" onClick={() => setCartOpen(true)} style={{ display: "none" }}>Cart ({itemCount})</button>
        </div>
      </div>

      {/* CART */}
      <div className={"nx-cart" + (cartOpen ? " open" : "")}>
        <div className="nx-cart-head">
          <div className="nx-row" style={{ gap: 8 }}><Icon name="shopping-cart" size={18} /><b style={{ fontSize: 15 }}>{t("cart")}</b>{itemCount > 0 && <Badge tone="accent">{itemCount}</Badge>}</div>
          <div className="nx-row" style={{ gap: 4 }}>
            {cart.length > 0 && <button className="nx-link danger" onClick={() => setCart([])}>Clear</button>}
            <button className="nx-icon-btn nx-pos-cartbtn" style={{ display: "none" }} onClick={() => setCartOpen(false)}><Icon name="x" size={18} /></button>
          </div>
        </div>
        <div className="nx-cart-cust">
          <button className="nx-sb-switch" style={{ background: "var(--surface)" }} onClick={() => setCustPicker(true)}>
            <Avatar name={customer ? customer.name : "Walk in"} size={30} />
            <span className="nx-sb-switch-txt">
              <span className="nx-sb-switch-name">{customer ? customer.name : "Walk-in customer"}</span>
              <span className="nx-sb-switch-sub">{customer ? (customer.phone || customer.email || (customer.id ? "Saved customer" : "New customer")) : t("customer") + " · optional"}</span>
            </span>
            {customer
              ? <span className="nx-icon-btn" style={{ width: 26, height: 26 }} onClick={(e) => { e.stopPropagation(); setCustomer(null); }}><Icon name="x" size={15} /></span>
              : <Icon name="user-plus" size={16} style={{ color: "var(--accent)" }} />}
          </button>
        </div>
        <div className="nx-cart-items">
          {cart.length === 0
            ? <div style={{ paddingTop: 50 }}><EmptyState icon="shopping-cart" title={t("empty_cart")} desc="Scan a barcode or tap a product to add it." /></div>
            : cart.map((i) => (
              <div className="nx-citem" key={i.id}>
                <span className="nx-thumb nx-thumb-stripe" style={{ width: 42, height: 42 }}><Icon name="pill" size={16} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{money(i.price)} {i.taxable === false && "· no VAT"}</div>
                  <div className="nx-row" style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <div className="nx-qty"><button onClick={() => setQty(i.id, -1)}><Icon name="minus" size={14} /></button><span>{i.qty}</span><button onClick={() => setQty(i.id, 1)}><Icon name="plus" size={14} /></button></div>
                    <span className="num" style={{ fontWeight: 700, fontSize: 14 }}>{money(i.price * i.qty)}</span>
                  </div>
                </div>
                <button className="nx-icon-btn" style={{ width: 28, height: 28 }} onClick={() => removeItem(i.id)}><Icon name="trash-2" size={15} /></button>
              </div>
            ))}
        </div>
        <div className="nx-cart-foot">
          {cart.length > 0 && (
            <div className="nx-row" style={{ gap: 8, marginBottom: 12 }}>
              <Icon name="tag" size={15} style={{ color: "var(--text-3)" }} />
              <span style={{ fontSize: 13, color: "var(--text-2)", flex: 1 }}>{t("discount")}</span>
              <div style={{ width: 110 }}><Input type="number" value={discount || ""} onChange={(e) => setDiscount(Math.max(0, +e.target.value || 0))} placeholder="0.00" /></div>
            </div>
          )}
          <div className="nx-cart-line"><span>{setup.pricesIncludeTax ? t("net") : t("subtotal")}</span><span className="num">{money(doc.net)}</span></div>
          {discount > 0 && <div className="nx-cart-line"><span>{t("discount")}</span><span className="num">−{money(discount)}</span></div>}
          {setup.vatRegistered && <div className="nx-cart-line"><span>{setup.taxLabel} ({doc.rate}%)</span><span className="num">{money(doc.vat)}</span></div>}
          <div className="nx-cart-line grand"><span>{t("total")}</span><span className="num">{money(doc.total)}</span></div>
          <Button full size="lg" icon="credit-card" disabled={cart.length === 0} style={{ marginTop: 14 }} onClick={() => setPay(true)}>{t("checkout")} · <span className="nx-kbd" style={{ background: "rgba(255,255,255,.2)", color: "#fff", borderColor: "transparent" }}>F2</span></Button>
        </div>
      </div>

      <Checkout open={pay} onClose={() => setPay(false)} doc={doc} discount={discount} customer={customer} onChangeCustomer={() => setCustPicker(true)} onComplete={completeSale} />
      <CustomerPicker open={custPicker} onClose={() => setCustPicker(false)} customers={customers} orders={orders} value={customer} onPick={(c) => { setCustomer(c); setCustPicker(false); }} />
    </div>
  );
}

/* ---------------- Checkout (payment modal) ---------------- */
function Checkout({ open, onClose, doc, discount, customer, onChangeCustomer, onComplete }) {
  const { money, t } = useApp();
  const [method, setMethod] = useState("Cash");
  const [tendered, setTendered] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = [["Cash", "banknote"], ["Card", "credit-card"], ["Wallet", "smartphone"]];
  const change = method === "Cash" && tendered ? +tendered - doc.total : 0;

  useEffect(() => { if (open) { setMethod("Cash"); setTendered(""); setLoading(false); } }, [open]);

  const complete = () => { setLoading(true); setTimeout(() => onComplete(method), 850); };

  return (
    <Modal open={open} onClose={onClose} width={440} title="Complete sale" subtitle={t("payment_method")}
      footer={<Button full size="lg" disabled={loading} onClick={complete}>{loading ? <span className="nx-spin" /> : <>Complete Sale · {money(doc.total)}</>}</Button>}>
      {/* Customer section */}
      <div className="nx-field-label" style={{ marginBottom: 8 }}>{t("customer")}</div>
      <button className="nx-checkout-cust" onClick={onChangeCustomer}>
        <Avatar name={customer ? customer.name : "Walk in"} size={34} />
        <div style={{ flex: 1, textAlign: "start", minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5 }}>{customer ? customer.name : "Walk-in customer"}</div>
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>{customer ? (customer.phone || customer.email || (customer.id ? "Saved customer" : "New — will be saved")) : "Guest · no record created"}</div>
        </div>
        <span className="nx-link">{customer ? "Change" : "Add"}</span>
      </button>
      <hr className="nx-divider" style={{ margin: "16px 0" }} />
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {methods.map(([m, ic]) => (
          <button key={m} className={"nx-choice" + (method === m ? " on" : "")} style={{ flexDirection: "column", alignItems: "center", gap: 8, padding: 16 }} onClick={() => setMethod(m)}>
            <span className="nx-choice-ic"><Icon name={ic} size={19} /></span><span style={{ fontWeight: 700, fontSize: 13 }}>{t(m.toLowerCase())}</span>
          </button>
        ))}
      </div>
      {method === "Cash" && (
        <Field label="Amount tendered" hint={change >= 0 && tendered ? `Change due: ${money(change)}` : "Optional — for change calculation"}>
          <Input type="number" value={tendered} onChange={(e) => setTendered(e.target.value)} placeholder={doc.total.toFixed(2)} />
        </Field>
      )}
      <Card style={{ marginTop: 18, background: "var(--surface-2)", padding: 16 }}>
        <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>{t("net")}</span><span className="num">{money(doc.net)}</span></div>
        {discount > 0 && <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>{t("discount")}</span><span className="num">−{money(discount)}</span></div>}
        <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>VAT</span><span className="num">{money(doc.vat)}</span></div>
        <div className="nx-cart-line grand" style={{ fontSize: 17, borderTopStyle: "solid" }}><span>{t("total")}</span><span className="num">{money(doc.total)}</span></div>
      </Card>
      <p className="nx-note" style={{ marginTop: 14, justifyContent: "center" }}><Icon name="lock" size={13} />One payment method per sale in this MVP.</p>
    </Modal>
  );
}

/* ---------------- Customer Picker (Walk-in / Existing / New) ---------------- */
function CustomerPicker({ open, onClose, customers, orders, value, onPick }) {
  const { money } = useApp();
  const [mode, setMode] = useState("list");
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [err, setErr] = useState("");

  useEffect(() => { if (open) { setMode("list"); setQ(""); setForm({ name: "", phone: "", email: "" }); setErr(""); } }, [open]);

  // order metrics per customer (by customerId)
  const metricsFor = (id) => {
    const os = (orders || []).filter((o) => o.customerId === id);
    const spent = os.reduce((s, o) => s + (o.total != null ? o.total : 0), 0);
    return { count: os.length, spent };
  };
  const term = q.trim().toLowerCase();
  const matches = (customers || []).filter((c) => !term
    || (c.name || "").toLowerCase().includes(term)
    || (c.phone || "").toLowerCase().includes(term)
    || (c.email || "").toLowerCase().includes(term));

  const saveNew = () => {
    if (!form.name.trim()) { setErr("Customer name is required"); return; }
    onPick({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim().toLowerCase() });
  };

  return (
    <Modal open={open} onClose={onClose} width={460}
      title={mode === "new" ? "Add new customer" : "Customer"}
      subtitle={mode === "new" ? "Saved to this business unit and linked to the sale." : "Attach a customer or continue as a guest."}>
      {mode === "list" ? (
        <div>
          {/* Walk-in */}
          <button className={"nx-cust-row" + (!value ? " on" : "")} onClick={() => onPick(null)}>
            <span className="nx-choice-ic" style={{ width: 38, height: 38 }}><Icon name="user-round" size={18} /></span>
            <div style={{ flex: 1, textAlign: "start" }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Walk-in customer</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>Guest · fast checkout, no record created</div>
            </div>
            {!value && <Icon name="check" size={17} style={{ color: "var(--accent)" }} />}
          </button>

          <div className="nx-row" style={{ gap: 8, margin: "16px 0 10px" }}>
            <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>OR SELECT EXISTING</span>
            <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <Input icon="search" placeholder="Search name, phone or email…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          <div style={{ maxHeight: 230, overflowY: "auto", marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {matches.length === 0 && (
              <div style={{ textAlign: "center", padding: "22px 0", color: "var(--text-3)", fontSize: 13 }}>
                {(customers || []).length === 0 ? "No saved customers yet." : "No customers match your search."}
              </div>
            )}
            {matches.map((c) => {
              const m = metricsFor(c.id);
              const sel = value && value.id === c.id;
              return (
                <button key={c.id} className={"nx-cust-row" + (sel ? " on" : "")} onClick={() => onPick({ id: c.id, name: c.name, phone: c.phone, email: c.email })}>
                  <Avatar name={c.name} size={36} />
                  <div style={{ flex: 1, textAlign: "start", minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{c.phone || c.email || "No contact"} · {m.count} {m.count === 1 ? "order" : "orders"}</div>
                  </div>
                  {m.spent > 0 && <span className="num" style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600 }}>{money(m.spent)}</span>}
                  {sel && <Icon name="check" size={17} style={{ color: "var(--accent)", marginInlineStart: 6 }} />}
                </button>
              );
            })}
          </div>

          <Button full variant="secondary" icon="user-plus" style={{ marginTop: 14 }} onClick={() => { setMode("new"); setForm({ name: q, phone: "", email: "" }); }}>Add new customer</Button>
        </div>
      ) : (
        <div className="nx-form-grid">
          <Field label="Customer name" error={err}>
            <Input icon="user" placeholder="e.g. Aya Hassan" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErr(""); }} autoFocus error={err} />
          </Field>
          <div className="nx-form-grid cols-2">
            <Field label="Phone" optional><Input icon="phone" placeholder="+20 100 123 4567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email" optional><Input icon="mail" placeholder="name@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          </div>
          <div className="nx-row" style={{ gap: 10, marginTop: 4 }}>
            <Button variant="ghost" icon="arrow-left" onClick={() => setMode("list")}>Back</Button>
            <span className="nx-spacer" />
            <Button icon="check" onClick={saveNew}>Use this customer</Button>
          </div>
          <div className="nx-note"><Icon name="info" size={14} />The record is created when you complete the sale.</div>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- Sale Success ---------------- */
function SaleSuccess() {
  const { nav, money, setup, route, t } = useApp();
  const sale = route.params.sale;
  if (!sale) { nav("pos"); return null; }
  const doc = computeDoc(sale.items, setup, sale.discount);
  return (
    <div className="nx-success">
      <div className="nx-success-card nx-pop">
        <div className="nx-success-left">
          <div className="nx-success-ic"><Icon name="check" size={32} /></div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>Sale completed</h1>
          <p style={{ color: "var(--text-2)", marginTop: 8, fontSize: 14.5 }}>Inventory updated and documents generated.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", marginTop: 26 }}>
            {[["Order", sale.num], ["Payment", sale.payment], ["Invoice", sale.invoice], ["Receipt", sale.receipt]].map(([k, v]) => (
              <div key={k} style={{ background: "var(--surface)", padding: "14px 16px" }}><div style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{k}</div><div className="num" style={{ fontWeight: 700, marginTop: 3 }}>{v}</div></div>
            ))}
            <div style={{ background: "var(--accent-weak)", padding: "14px 16px", gridColumn: "1/-1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "var(--accent-700)", fontWeight: 600 }}>Total paid</div><div className="num" style={{ fontWeight: 800, fontSize: 20, color: "var(--accent-700)" }}>{money(doc.total)}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
            <Button icon="printer" onClick={() => window.print()}>Print Receipt</Button>
            <Button variant="secondary" icon="plus" onClick={() => nav("pos")}>{t("new_sale")}</Button>
            <Button variant="ghost" icon="shopping-bag" onClick={() => nav("order-details", { id: sale.id })}>View Order</Button>
            <Button variant="ghost" icon="receipt" onClick={() => nav("invoice-details", { id: sale.id })}>View Invoice</Button>
          </div>
        </div>
        <div className="nx-success-right">
          <div className="nx-wiz-aside-label" style={{ alignSelf: "flex-start", marginBottom: 14 }}>Receipt</div>
          <ReceiptDoc setup={setup} items={sale.items} discount={sale.discount} meta={{ order: sale.num, receipt: sale.receipt, payment: sale.payment, date: sale.date, cashier: "Omar T." }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { POS, Checkout, CustomerPicker, SaleSuccess });
