"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, ArrowLeft, ShoppingCart, Plus, Minus, Trash2, X, ScanBarcode, CreditCard, Banknote, Smartphone, Lock,
  Pill, UserPlus, Tag, Check, CircleAlert, User, Phone, Mail, Info,
} from "lucide-react";
import { useApp, computeDoc, writePosLastOrderId } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { BrandMark } from "@/components/ui/BrandMark";
import { BranchPill } from "@/components/dashboard/BranchPill";

export default function POSPage() {
  const router = useRouter();
  const { products, customers, money, showToast, createOrder, createInvoice, updateProduct, createCustomer, getCommerceSetup, commerceIdentity } = useApp();
  const setup = getCommerceSetup();

  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number; sku: string; taxable: boolean; stock: number; category: string }[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [discount, setDiscount] = useState(0);
  const [custSearch, setCustSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<{ id?: string; name: string; phone?: string } | null>(null);
  const [showCustPicker, setShowCustPicker] = useState(false);
  const [custMode, setCustMode] = useState<"list" | "new">("list");
  const [custForm, setCustForm] = useState({ name: "", phone: "", email: "" });
  const [custErr, setCustErr] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [payMethod, setPayMethod] = useState<"cash" | "card" | "wallet">("cash");
  const [tendered, setTendered] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category || "General")))];
  const filtered = products.filter((p) =>
    (cat === "All" || (p.category || "General") === cat) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) || (p.barcode || "").includes(q) || (p.sku || "").toLowerCase().includes(q.toLowerCase()))
  );

  const addToCart = (p: typeof products[0]) => {
    if ((p.stock ?? 99) === 0) { showToast(`${p.name} is out of stock`, "warn"); return; }
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1, sku: p.sku || "", taxable: p.taxable ?? true, stock: p.stock ?? 99, category: p.category || "General" }];
    });
  };
  const setQty = (id: string, d: number) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const doc = computeDoc(cart.map((i) => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price, taxable: i.taxable })), setup as Parameters<typeof computeDoc>[1], discount);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === "F2" && cart.length && !showPayment) { e.preventDefault(); setPayMethod("cash"); setTendered(""); setShowPayment(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [cart, showPayment]);

  function completeSale(method: "cash" | "card" | "wallet") {
    const order = createOrder({
      items: cart.map((i) => ({ productId: i.id, id: i.id, name: i.name, qty: i.qty, price: i.price, sku: i.sku, taxable: i.taxable })),
      customerId: selectedCustomer?.id || null,
      payment: method,
      discount,
      vat: doc.vat,
      subtotal: doc.net,
      total: doc.total,
      net: doc.net,
    });
    createInvoice(order.id);
    cart.forEach((ci) => {
      const prod = products.find((p) => p.id === ci.id);
      if (prod && prod.stock != null) {
        updateProduct(ci.id, { stock: Math.max(0, prod.stock - ci.qty) });
      }
    });
    writePosLastOrderId(order.id);
    setCart([]); setDiscount(0); setSelectedCustomer(null); setShowPayment(false);
    setPayMethod("cash"); setTendered("");
    router.push("/pos/success");
  }

  const change = payMethod === "cash" && tendered ? +tendered - doc.total : 0;

  const filteredCustomers = customers.filter((c) => c.name.toLowerCase().includes(custSearch.toLowerCase()) || (c.phone || "").includes(custSearch));

  function openCustomerPicker() {
    setCustMode("list"); setCustSearch(""); setCustForm({ name: "", phone: "", email: "" }); setCustErr("");
    setShowCustPicker(true);
  }

  function saveNewCustomer() {
    if (!custForm.name.trim()) { setCustErr("Customer name is required"); return; }
    const c = createCustomer({ name: custForm.name.trim(), phone: custForm.phone.trim(), email: custForm.email.trim().toLowerCase(), notes: "" });
    setSelectedCustomer({ id: c.id, name: c.name, phone: c.phone });
    setShowCustPicker(false);
    setCustMode("list"); setCustSearch(""); setCustForm({ name: "", phone: "", email: "" }); setCustErr("");
    showToast("Customer added and selected", "success");
  }

  return (
    <div className="nx-pos">
      {/* Left: product grid */}
      <div className="nx-pos-left">
        <div className="nx-pos-topbar">
          <Link href="/dashboard" className="nx-icon-btn" aria-label="Back to dashboard"><ArrowLeft size={19} /></Link>
          <div className="nx-row nx-pos-title-row" style={{ gap: 8 }}>
            <ScanBarcode size={18} style={{ color: "var(--accent)" }} />
            <b style={{ fontSize: 15 }}>Point of Sale</b>
            <Badge tone="neutral" className="nx-pos-business-badge">
              <BrandMark name={commerceIdentity.name} logo={commerceIdentity.logo} variant="badge" />
              {commerceIdentity.name}
            </Badge>
            <span className="nx-pos-title-branch">
              <BranchPill variant="header" />
            </span>
          </div>
        </div>
        <div className="nx-pos-topbar" style={{ borderTop: "none", height: "auto", paddingBlock: 12 }}>
          <div className="nx-pos-search">
            <span className="nx-input-wrap">
              <Search size={16} className="nx-input-icon" />
              <input
                ref={searchRef}
                className="nx-input"
                placeholder="Scan barcode or search products (/)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
              />
            </span>
          </div>
        </div>
        <div className="nx-pos-cats">
          {cats.map((c) => (
            <button key={c} className={"nx-chip-filter" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="nx-pos-grid">
          {filtered.map((p) => {
            const oos = (p.stock ?? 99) === 0;
            const low = oos ? false : (p.stock ?? 99) <= (p.lowStockThreshold || 5);
            return (
              <button key={p.id} className={"nx-pcard" + (oos ? " oos" : "")} onClick={() => addToCart(p)} disabled={oos}>
                <div className="nx-pcard-img nx-thumb-stripe">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" />
                  ) : (
                    <Pill size={20} />
                  )}
                </div>
                <div className="nx-pcard-name">{p.name}</div>
                <div className="nx-pcard-foot">
                  <span className="nx-pcard-price">{money(p.price)}</span>
                  {oos
                    ? <Badge tone="danger">Out</Badge>
                    : low
                      ? <Badge tone="warn">{p.stock}</Badge>
                      : <span style={{ fontSize: 11, color: "var(--text-3)" }}>{p.stock ?? "—"} in stock</span>}
                </div>
              </button>
            );
          })}
        </div>
        <div className="nx-pos-help">
          <span><span className="nx-kbd">/</span> Focus search</span>
          <span><span className="nx-kbd">Enter</span> Add exact match</span>
          <span><span className="nx-kbd">F2</span> Checkout</span>
          <span><span className="nx-kbd">Esc</span> Close modal</span>
        </div>
      </div>

      {/* Right: cart */}
      <div className="nx-cart">
        <div className="nx-cart-head">
          <div className="nx-row" style={{ gap: 8 }}>
            <ShoppingCart size={18} />
            <b style={{ fontSize: 15 }}>Cart</b>
            {itemCount > 0 && <Badge tone="accent">{itemCount}</Badge>}
          </div>
          {cart.length > 0 && <button className="nx-link" style={{ color: "var(--danger)" }} onClick={() => setCart([])}>Clear</button>}
        </div>

        {/* Customer */}
        <div className="nx-cart-cust">
          <button className="nx-sb-switch" style={{ background: "var(--surface)" }} onClick={openCustomerPicker}>
            <Avatar name={selectedCustomer ? selectedCustomer.name : "Walk in"} size={30} />
            <span className="nx-sb-switch-txt">
              <span className="nx-sb-switch-name">{selectedCustomer ? selectedCustomer.name : "Walk-in customer"}</span>
              <span className="nx-sb-switch-sub">{selectedCustomer ? (selectedCustomer.phone || "Saved customer") : "Customer · optional"}</span>
            </span>
            {selectedCustomer ? (
              <span className="nx-icon-btn" style={{ width: 26, height: 26 }} onClick={(e) => { e.stopPropagation(); setSelectedCustomer(null); }}><X size={15} /></span>
            ) : (
              <UserPlus size={16} style={{ color: "var(--accent)" }} />
            )}
          </button>
        </div>

        {/* Items */}
        <div className="nx-cart-items">
          {cart.length === 0 ? (
            <div className="nx-empty" style={{ paddingTop: 50 }}>
              <div className="nx-empty-ic"><ShoppingCart size={26} /></div>
              <h3 className="nx-empty-title">Cart is empty</h3>
              <p className="nx-empty-desc">Scan a barcode or tap a product to add it.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="nx-citem" key={item.id}>
                <span className="nx-thumb nx-thumb-stripe" style={{ width: 42, height: 42 }}><Pill size={16} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{money(item.price)} {!item.taxable && "· no VAT"}</div>
                  <div className="nx-row" style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <div className="nx-qty">
                      <button onClick={() => setQty(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.id, 1)}><Plus size={14} /></button>
                    </div>
                    <span className="num" style={{ fontWeight: 700, fontSize: 14 }}>{money(item.price * item.qty)}</span>
                  </div>
                </div>
                <button className="nx-icon-btn" style={{ width: 28, height: 28 }} onClick={() => removeItem(item.id)}><Trash2 size={15} /></button>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="nx-cart-foot">
          {cart.length > 0 && (
            <div className="nx-row" style={{ gap: 8, marginBottom: 12 }}>
              <Tag size={15} style={{ color: "var(--text-3)" }} />
              <span style={{ fontSize: 13, color: "var(--text-2)", flex: 1 }}>Discount</span>
              <div style={{ width: 110 }}>
                <input className="nx-input" type="number" min={0} value={discount || ""} onChange={(e) => setDiscount(Math.max(0, +e.target.value || 0))} placeholder="0.00" style={{ textAlign: "right" }} />
              </div>
            </div>
          )}
          <div className="nx-cart-line"><span>{setup.pricesIncludeTax ? "Net" : "Subtotal"}</span><span className="num">{money(doc.net)}</span></div>
          {discount > 0 && <div className="nx-cart-line"><span>Discount</span><span className="num">−{money(discount)}</span></div>}
          {setup.vatRegistered && <div className="nx-cart-line"><span>{setup.taxLabel || "VAT"} ({doc.rate}%)</span><span className="num">{money(doc.vat)}</span></div>}
          <div className="nx-cart-line grand"><span>Total</span><span className="num">{money(doc.total)}</span></div>
          <button
            className="nx-btn nx-btn-primary nx-btn-md nx-btn-full"
            disabled={cart.length === 0}
            style={{ marginTop: 14, padding: "12px", fontSize: 15 }}
            onClick={() => { setPayMethod("cash"); setTendered(""); setShowPayment(true); }}
          >
            <CreditCard size={16} />
            Checkout · <span className="nx-kbd" style={{ background: "rgba(255,255,255,.2)", color: "#fff", borderColor: "transparent" }}>F2</span>
          </button>
        </div>
      </div>

      {/* Checkout modal */}
      {showPayment && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 440 }}>
            <div className="nx-modal-head">
              <div>
                <h3 className="nx-modal-title">Complete sale</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>Payment method</p>
              </div>
              <button className="nx-icon-btn" onClick={() => setShowPayment(false)}><X size={16} /></button>
            </div>
            <div className="nx-modal-body">
              {/* Customer */}
              <div className="nx-field-label" style={{ marginBottom: 8 }}>Customer</div>
              <button className="nx-checkout-cust" onClick={openCustomerPicker}>
                <Avatar name={selectedCustomer ? selectedCustomer.name : "Walk in"} size={34} />
                <div style={{ flex: 1, textAlign: "start", minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{selectedCustomer ? selectedCustomer.name : "Walk-in customer"}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>{selectedCustomer ? (selectedCustomer.phone || "Saved customer") : "Guest · no record created"}</div>
                </div>
                <span className="nx-link">{selectedCustomer ? "Change" : "Add"}</span>
              </button>
              <hr className="nx-divider" style={{ margin: "16px 0" }} />

              {/* Payment method cards */}
              <div className="nx-pay-methods">
                {([
                  { method: "cash" as const, label: "Cash", icon: <Banknote size={19} /> },
                  { method: "card" as const, label: "Card", icon: <CreditCard size={19} /> },
                  { method: "wallet" as const, label: "Wallet", icon: <Smartphone size={19} /> },
                ]).map(({ method, label, icon }) => (
                  <button key={method} className={"nx-choice" + (payMethod === method ? " on" : "")} onClick={() => setPayMethod(method)}>
                    <span className="nx-choice-ic">{icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{label}</span>
                  </button>
                ))}
              </div>

              {payMethod === "cash" && (
                <label className="nx-field" style={{ marginBottom: 18 }}>
                  <span className="nx-field-label">Amount tendered</span>
                  <input
                    className="nx-input"
                    type="number"
                    value={tendered}
                    onChange={(e) => setTendered(e.target.value)}
                    placeholder={doc.total.toFixed(2)}
                  />
                  <span className="nx-field-hint">{change >= 0 && tendered ? `Change due: ${money(change)}` : "Optional — for change calculation"}</span>
                </label>
              )}

              {/* Totals summary */}
              <div className="nx-card" style={{ background: "var(--surface-2)", padding: 16, border: "1px solid var(--border)" }}>
                <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>Net</span><span className="num">{money(doc.net)}</span></div>
                {discount > 0 && <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>Discount</span><span className="num">−{money(discount)}</span></div>}
                <div className="nx-cart-line" style={{ padding: "3px 0" }}><span>VAT</span><span className="num">{money(doc.vat)}</span></div>
                <div className="nx-cart-line grand" style={{ fontSize: 17, borderTopStyle: "solid" }}><span>Total</span><span className="num">{money(doc.total)}</span></div>
              </div>

              <p className="nx-note" style={{ marginTop: 14, justifyContent: "center" }}><Lock size={13} />One payment method per sale in this MVP.</p>
            </div>
            <div className="nx-modal-foot">
              <button className="nx-btn nx-btn-primary nx-btn-lg nx-btn-full" onClick={() => completeSale(payMethod)}>
                Complete Sale · {money(doc.total)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer picker modal */}
      {showCustPicker && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 460 }}>
            <div className="nx-modal-head">
              <div>
                <h3 className="nx-modal-title">{custMode === "new" ? "Add new customer" : "Customer"}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>
                  {custMode === "new" ? "Saved to this business unit and linked to the sale." : "Attach a customer or continue as guest."}
                </p>
              </div>
              <button className="nx-icon-btn" onClick={() => setShowCustPicker(false)}><X size={16} /></button>
            </div>
            <div className="nx-modal-body" style={{ maxHeight: "64vh", overflowY: "auto" }}>
              {custMode === "list" ? (
                <div>
                  <button className={"nx-cust-row" + (!selectedCustomer ? " on" : "")} onClick={() => { setSelectedCustomer(null); setShowCustPicker(false); }}>
                    <span className="nx-choice-ic" style={{ width: 38, height: 38 }}><User size={18} /></span>
                    <span style={{ flex: 1, textAlign: "left" }}>
                      <span style={{ display: "block", fontWeight: 700, fontSize: 13.5 }}>Walk-in customer</span>
                      <span style={{ display: "block", fontSize: 12, color: "var(--text-3)" }}>Guest · fast checkout, no record created</span>
                    </span>
                    {!selectedCustomer && <Check size={17} style={{ color: "var(--accent)" }} />}
                  </button>

                  <div className="nx-row" style={{ gap: 8, margin: "16px 0 10px" }}>
                    <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>OR SELECT EXISTING</span>
                    <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  </div>

                  <span className="nx-input-wrap">
                    <Search size={16} className="nx-input-icon" />
                    <input className="nx-input" placeholder="Search name, phone or email..." value={custSearch} onChange={(e) => setCustSearch(e.target.value)} autoFocus />
                  </span>
                  <div style={{ maxHeight: 230, overflowY: "auto", marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {filteredCustomers.length === 0 && (
                      <div style={{ textAlign: "center", padding: "22px 0", color: "var(--text-3)", fontSize: 13 }}>
                        {customers.length === 0 ? "No saved customers yet." : "No customers match your search."}
                      </div>
                    )}
                    {filteredCustomers.map((c) => {
                      const sel = selectedCustomer?.id === c.id;
                      return (
                        <button key={c.id} className={"nx-cust-row" + (sel ? " on" : "")} onClick={() => { setSelectedCustomer({ id: c.id, name: c.name, phone: c.phone }); setShowCustPicker(false); }}>
                          <Avatar name={c.name} size={36} />
                          <span style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                            <span style={{ display: "block", fontWeight: 700, fontSize: 13.5 }}>{c.name}</span>
                            <span style={{ display: "block", fontSize: 12, color: "var(--text-3)" }}>{c.phone || c.email || "No contact"}</span>
                          </span>
                          {sel && <Check size={17} style={{ color: "var(--accent)", marginInlineStart: 6 }} />}
                        </button>
                      );
                    })}
                  </div>

                  <button type="button" className="nx-btn nx-btn-secondary nx-btn-md nx-btn-full" style={{ marginTop: 14 }} onClick={() => { setCustForm({ name: custSearch, phone: "", email: "" }); setCustErr(""); setCustMode("new"); }}>
                    <UserPlus size={15} />Add new customer
                  </button>
                </div>
              ) : (
                <div className="nx-form-grid">
                  <label className="nx-field">
                    <span className="nx-field-label">Customer name</span>
                    <span className="nx-input-wrap">
                      <User size={16} className="nx-input-icon" />
                      <input className="nx-input" placeholder="e.g. Aya Hassan" value={custForm.name} onChange={(e) => { setCustForm((f) => ({ ...f, name: e.target.value })); setCustErr(""); }} autoFocus />
                    </span>
                    {custErr && <span className="nx-field-error"><CircleAlert size={13} />{custErr}</span>}
                  </label>
                  <div className="nx-form-grid cols-2">
                    <label className="nx-field">
                      <span className="nx-field-label">Phone<span className="nx-field-optional">Optional</span></span>
                      <span className="nx-input-wrap">
                        <Phone size={16} className="nx-input-icon" />
                        <input className="nx-input" placeholder="+20 100 123 4567" value={custForm.phone} onChange={(e) => setCustForm((f) => ({ ...f, phone: e.target.value }))} />
                      </span>
                    </label>
                    <label className="nx-field">
                      <span className="nx-field-label">Email<span className="nx-field-optional">Optional</span></span>
                      <span className="nx-input-wrap">
                        <Mail size={16} className="nx-input-icon" />
                        <input className="nx-input" placeholder="name@email.com" value={custForm.email} onChange={(e) => setCustForm((f) => ({ ...f, email: e.target.value }))} />
                      </span>
                    </label>
                  </div>
                  <div className="nx-row" style={{ gap: 10, marginTop: 4 }}>
                    <button type="button" className="nx-btn nx-btn-ghost nx-btn-md" onClick={() => setCustMode("list")}>Cancel</button>
                    <span className="nx-spacer" />
                    <button type="button" className="nx-btn nx-btn-primary nx-btn-md" onClick={saveNewCustomer}><Check size={15} />Save customer</button>
                  </div>
                  <p className="nx-note"><Info size={14} />The record is created when you save.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
