"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, FileText, X, ExternalLink } from "lucide-react";
import { useApp } from "@/lib/store";
import { type CommerceInvoice } from "@/lib/store";
import { fmtDate, computeDoc } from "@/lib/store";

export default function InvoicesPage() {
  const { invoices, orders, money, currentWorkspace, getCommerceSetup, t } = useApp();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<CommerceInvoice | null>(null);
  const setup = getCommerceSetup();

  const filtered = invoices.filter((inv) => !q || inv.invoiceNumber.includes(q)).slice().reverse();

  function orderNumber(orderId: string): string {
    const o = orders.find((x) => x.id === orderId);
    return o ? o.orderNumber : orderId.slice(0, 8);
  }

  function cashierName(orderId: string): string {
    const o = orders.find((x) => x.id === orderId);
    return o?.cashierName || "—";
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Invoices</h1>
        </div>
        <div style={{ position: "relative", marginBottom: 18 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
          <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13, maxWidth: 360 }} placeholder="Search invoices…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-3)" }}>
            <FileText size={40} style={{ opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 600 }}>{invoices.length === 0 ? "No invoices yet — complete a sale to generate one" : "No invoices match your search"}</div>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {["Invoice", "Order", t("cashier"), "Date", "Net", setup.vatRegistered ? (setup.taxLabel || "VAT") : null, "Total", ""].filter(Boolean).map((h) => (
                    <th key={h!} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => {
                  const doc = computeDoc(inv.items, setup, inv.discount || 0);
                  return (
                    <tr key={inv.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "11px 14px", fontWeight: 600, fontSize: 13, fontFamily: "var(--mono)" }}>{inv.invoiceNumber}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--accent)", fontFamily: "var(--mono)" }}>
                        <Link href={`/orders/${inv.orderId}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{orderNumber(inv.orderId)}</Link>
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{cashierName(inv.orderId)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{fmtDate(inv.createdAt)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "var(--text-2)" }}>{money(doc.net)}</td>
                      {setup.vatRegistered && <td style={{ padding: "11px 14px", fontSize: 13, color: "var(--text-2)" }}>{money(doc.vat)}</td>}
                      <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13 }}>{money(doc.total)}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <button onClick={() => setSelected(inv)} style={{ padding: "5px 10px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", cursor: "pointer", display: "flex", gap: 5, alignItems: "center", fontSize: 12 }}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice detail modal */}
      {selected && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 480 }}>
            <div className="nx-modal-head">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 2 }}>Tax Invoice</div>
                <h3 className="nx-modal-title" style={{ fontFamily: "var(--mono)" }}>{selected.invoiceNumber}</h3>
              </div>
              <button className="nx-icon-btn" onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="nx-modal-body">
              <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 14 }}>
                {fmtDate(selected.createdAt)}
                {cashierName(selected.orderId) !== "—" && <> · {t("cashier")}: <span style={{ fontWeight: 600, color: "var(--text)" }}>{cashierName(selected.orderId)}</span></>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{setup.displayName || currentWorkspace?.name || "Business"}</div>
                {setup.address && <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{setup.address}{setup.city ? `, ${setup.city}` : ""}</div>}
                {setup.taxNumber && <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{setup.taxLabel || "VAT"} Reg: {setup.taxNumber}</div>}
              </div>
              <div style={{ height: 1, background: "var(--border)", marginBottom: 12 }} />
              {selected.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span>{item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 600 }}>{money(item.price * item.qty)}</span>
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                {selected.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)", marginBottom: 4 }}>
                    <span>Discount</span><span>−{money(selected.discount)}</span>
                  </div>
                )}
                {setup.vatRegistered && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)", marginBottom: 4 }}>
                    <span>{setup.taxLabel || "VAT"} ({setup.vatRate}%)</span><span>{money(selected.vat)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, paddingTop: 10, borderTop: "1px solid var(--border)", marginTop: 6 }}>
                  <span>Total</span><span>{money(selected.total)}</span>
                </div>
              </div>
              {setup.footer && (
                <div style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", marginTop: 18, borderTop: "1px dashed var(--border)", paddingTop: 12 }}>{setup.footer}</div>
              )}
            </div>
            <div className="nx-modal-foot">
              <button className="nx-btn" onClick={() => setSelected(null)}>Close</button>
              <Link href={`/invoices/${selected.id}/document`} className="nx-btn-primary" style={{ textDecoration: "none", display: "inline-flex", gap: 6, alignItems: "center", padding: "9px 16px", borderRadius: "var(--r)", fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--accent)" }}>
                <ExternalLink size={13} /> View Full Invoice
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
