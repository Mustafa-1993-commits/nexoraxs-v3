"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft, ShoppingCart, Plus, Minus, Trash2, X, ScanBarcode, CreditCard, Wallet, Banknote } from "lucide-react";
import { useApp, computeDoc, writePosLastOrderId } from "@/lib/store";

export default function POSPage() {
  const router = useRouter();
  const { products, customers, money, showToast, createOrder, createInvoice, updateProduct, getCommerceSetup } = useApp();
  const setup = getCommerceSetup();

  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number; sku: string; taxable: boolean; stock: number; category: string }[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [discount, setDiscount] = useState(0);
  const [custSearch, setCustSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<{ id?: string; name: string; phone?: string } | null>(null);
  const [showCustPicker, setShowCustPicker] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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
      if (e.key === "F2" && cart.length && !showPayment) { e.preventDefault(); setShowPayment(true); }
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
    router.push("/pos/success");
  }

  const filteredCustomers = customers.filter((c) => c.name.toLowerCase().includes(custSearch.toLowerCase()) || (c.phone || "").includes(custSearch));

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Left: product grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* POS topbar */}
        <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", background: "var(--surface)", display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "var(--text-2)", display: "grid", placeItems: "center" }}><ArrowLeft size={18} /></Link>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--accent)" }}>
            <ScanBarcode size={18} />
            <strong style={{ fontSize: 15 }}>Point of Sale</strong>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
            <input
              ref={searchRef}
              className="nx-input"
              style={{ paddingLeft: 34, fontSize: 13 }}
              placeholder="Search products… ( / )"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        {/* Category tabs */}
        <div style={{ display: "flex", gap: 6, padding: "10px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface)", overflowX: "auto" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "6px 14px", borderRadius: "var(--r-sm)", border: "1px solid",
              borderColor: cat === c ? "var(--accent)" : "var(--border)",
              background: cat === c ? "var(--accent)" : "var(--surface-2)",
              color: cat === c ? "#fff" : "var(--text-2)", fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap",
            }}>{c}</button>
          ))}
        </div>
        {/* Products */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 48, color: "var(--text-3)" }}>
              <Package size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div>No products found</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))", gap: 12 }}>
              {filtered.map((p) => {
                const inCart = cart.find((i) => i.id === p.id);
                const oos = (p.stock ?? 99) === 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    disabled={oos}
                    style={{
                      background: "var(--surface)", border: `1px solid ${inCart ? "var(--accent)" : "var(--border)"}`,
                      borderRadius: "var(--r)", padding: "14px 12px",
                      textAlign: "left", cursor: oos ? "not-allowed" : "pointer",
                      opacity: oos ? 0.5 : 1, position: "relative",
                      boxShadow: inCart ? "0 0 0 2px var(--accent-weak)" : "var(--sh-sm)",
                    }}
                  >
                    {inCart && (
                      <span style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 11, display: "grid", placeItems: "center", fontWeight: 700 }}>
                        {inCart.qty}
                      </span>
                    )}
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 6 }}>{p.category || "General"}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", marginBottom: 6, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--pos)" }}>{money(p.price)}</div>
                    {p.stock != null && <div style={{ fontSize: 11, color: p.stock < 5 ? "var(--warn)" : "var(--text-3)", marginTop: 4 }}>{oos ? "Out of stock" : `${p.stock} in stock`}</div>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: cart */}
      <div style={{ width: 320, borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", background: "var(--surface)" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700 }}>
            <ShoppingCart size={17} />
            Cart {itemCount > 0 && <span style={{ background: "var(--accent)", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "grid", placeItems: "center", fontSize: 11 }}>{itemCount}</span>}
          </div>
          {cart.length > 0 && <button onClick={() => setCart([])} style={{ fontSize: 12, color: "var(--danger)", background: "none", border: "none", cursor: "pointer" }}>Clear</button>}
        </div>

        {/* Customer */}
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
          {selectedCustomer ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{selectedCustomer.name}</div>
              <button onClick={() => setSelectedCustomer(null)} style={{ color: "var(--text-3)", background: "none", border: "none", cursor: "pointer" }}><X size={14} /></button>
            </div>
          ) : (
            <button onClick={() => setShowCustPicker(true)} style={{ width: "100%", background: "none", border: "1px dashed var(--border)", borderRadius: "var(--r-sm)", padding: "8px 12px", color: "var(--text-3)", cursor: "pointer", fontSize: 12.5, textAlign: "left" }}>
              + Add customer (optional)
            </button>
          )}
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
          {cart.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>
              <ShoppingCart size={28} style={{ opacity: 0.3, marginBottom: 8 }} />
              <div>Cart is empty</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Click products to add</div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>{money(item.price)} each</div>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <button onClick={() => setQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--surface-2)", cursor: "pointer", display: "grid", placeItems: "center" }}><Minus size={11} /></button>
                  <span style={{ width: 24, textAlign: "center", fontWeight: 700, fontSize: 13 }}>{item.qty}</span>
                  <button onClick={() => setQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--surface-2)", cursor: "pointer", display: "grid", placeItems: "center" }}><Plus size={11} /></button>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, minWidth: 60, textAlign: "right" }}>{money(item.price * item.qty)}</div>
                <button onClick={() => removeItem(item.id)} style={{ color: "var(--danger)", background: "none", border: "none", cursor: "pointer", padding: 2 }}><Trash2 size={13} /></button>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <label style={{ fontSize: 12.5, color: "var(--text-2)", flex: 1 }}>Discount (EGP)</label>
            <input
              className="nx-input"
              type="number"
              min={0}
              value={discount || ""}
              onChange={(e) => setDiscount(Math.max(0, +e.target.value))}
              placeholder="0"
              style={{ width: 80, textAlign: "right", fontSize: 13 }}
            />
          </div>
          {([
            [setup.pricesIncludeTax ? "Net" : "Subtotal", money(doc.net)],
            ...(discount > 0 ? [["Discount", `-${money(discount)}`]] : []),
            ...(setup.vatRegistered ? [[`${setup.taxLabel || "VAT"} (${doc.rate}%)`, money(doc.vat)]] : []),
          ] as [string, string][]).map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)", marginBottom: 4 }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 17, color: "var(--text)", borderTop: "1px solid var(--border)", paddingTop: 8, marginTop: 6 }}>
            <span>Total</span><span style={{ color: "var(--pos)" }}>{money(doc.total)}</span>
          </div>

          <button
            className="nx-btn-primary"
            onClick={() => setShowPayment(true)}
            disabled={cart.length === 0}
            style={{ width: "100%", marginTop: 14, padding: "12px", fontSize: 15, fontWeight: 700 }}
          >
            Charge {cart.length > 0 ? money(doc.total) : ""}
          </button>
        </div>
      </div>

      {/* Customer picker modal */}
      {showCustPicker && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 400 }}>
            <div className="nx-modal-head">
              <h3 style={{ fontWeight: 700 }}>Select customer</h3>
              <button className="nx-icon-btn" onClick={() => setShowCustPicker(false)}><X size={16} /></button>
            </div>
            <div className="nx-modal-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <input className="nx-input" placeholder="Search customers…" value={custSearch} onChange={(e) => setCustSearch(e.target.value)} style={{ marginBottom: 12, width: "100%" }} autoFocus />
              <button onClick={() => { setSelectedCustomer(null); setShowCustPicker(false); setCustSearch(""); }} style={{ width: "100%", padding: "10px 12px", textAlign: "left", background: "none", border: "1px dashed var(--border)", borderRadius: "var(--r-sm)", cursor: "pointer", marginBottom: 8, fontSize: 13, color: "var(--text-2)" }}>
                Walk-in / Guest
              </button>
              {filteredCustomers.map((c) => (
                <button key={c.id} onClick={() => { setSelectedCustomer({ id: c.id, name: c.name, phone: c.phone }); setShowCustPicker(false); setCustSearch(""); }} style={{ width: "100%", padding: "10px 12px", textAlign: "left", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", cursor: "pointer", marginBottom: 6, fontSize: 13 }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  {c.phone && <div style={{ fontSize: 12, color: "var(--text-3)" }}>{c.phone}</div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPayment && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 360 }}>
            <div className="nx-modal-head">
              <h3 style={{ fontWeight: 700 }}>Payment method</h3>
              <button className="nx-icon-btn" onClick={() => setShowPayment(false)}><X size={16} /></button>
            </div>
            <div className="nx-modal-body">
              <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", color: "var(--pos)", marginBottom: 20 }}>{money(doc.total)}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {([
                  { method: "cash" as const, label: "Cash", icon: <Banknote size={20} /> },
                  { method: "card" as const, label: "Card", icon: <CreditCard size={20} /> },
                  { method: "wallet" as const, label: "Mobile Wallet", icon: <Wallet size={20} /> },
                ]).map(({ method, label, icon }) => (
                  <button key={method} onClick={() => completeSale(method)} style={{
                    display: "flex", gap: 14, alignItems: "center", padding: "14px 18px",
                    background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r)",
                    cursor: "pointer", fontSize: 15, fontWeight: 600,
                  }}>
                    <span style={{ color: "var(--accent)" }}>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Package({ size, style }: { size: number; style?: React.CSSProperties }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>;
}
