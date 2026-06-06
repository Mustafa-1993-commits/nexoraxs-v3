"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingCart, FileText, Printer } from "lucide-react";
import { useApp } from "@/lib/store";
import type { CommerceOrder, CommerceInvoice } from "@/lib/store";
import { readPosLastOrderId, clearPosLastOrderId } from "@nexoraxs/shared";

export default function POSSuccessPage() {
  const { orders, invoices, money, showToast } = useApp();
  const [order, setOrder] = useState<CommerceOrder | null>(null);
  const [invoice, setInvoice] = useState<CommerceInvoice | null>(null);

  useEffect(() => {
    const orderId = readPosLastOrderId();
    if (orderId) {
      const o = orders.find((x) => x.id === orderId) ?? null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(o);
      if (o) {
        const inv = invoices.find((x) => x.orderId === orderId) ?? null;
        setInvoice(inv);
      }
    }
  }, [orders, invoices]);

  if (!order) {
    return (
      <div className="nx-main-scroll">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, textAlign: "center", padding: 24 }}>
          <CheckCircle2 size={48} style={{ color: "var(--success)", opacity: 0.5 }} />
          <div style={{ fontSize: 18, fontWeight: 700 }}>Sale Complete</div>
          <Link href="/pos" className="nx-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <ShoppingCart size={15} />New Sale
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "40px 28px", maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        {/* Success icon */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success)", color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 size={36} />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Sale Complete!</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>
          Order {order.orderNumber} has been recorded successfully.
        </p>

        {/* Order summary card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "20px 22px", marginBottom: 20, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>Order number</div>
            <div style={{ fontWeight: 700, fontFamily: "var(--mono)", fontSize: 13 }}>{order.orderNumber}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>Payment</div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{order.payment}</div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span style={{ color: "var(--text-2)" }}>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: 600 }}>{money(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Total</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--pos)" }}>{money(order.total)}</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/pos"
            className="nx-btn-primary"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", padding: "12px 20px", fontSize: 14 }}
            onClick={() => clearPosLastOrderId()}
          >
            <ShoppingCart size={16} />New Sale
          </Link>

          {invoice && (
            <Link
              href={`/invoices/${invoice.id}`}
              className="nx-btn"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", padding: "11px 20px", fontSize: 14 }}
            >
              <FileText size={16} />View Invoice
            </Link>
          )}

          <button
            className="nx-btn"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, padding: "11px 20px" }}
            onClick={() => showToast("Printing coming soon", "info")}
          >
            <Printer size={16} />Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
