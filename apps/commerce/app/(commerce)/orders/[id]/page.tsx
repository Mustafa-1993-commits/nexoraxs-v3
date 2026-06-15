"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useApp } from "@/lib/store";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, customers, invoices, money, t } = useApp();

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className="nx-main-scroll">
        <div style={{ padding: "40px 28px", textAlign: "center", color: "var(--text-3)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Order not found</div>
          <Link href="/orders" style={{ color: "var(--accent)", fontSize: 13 }}>← Orders</Link>
        </div>
      </div>
    );
  }

  const customer = order.customerId ? customers.find((c) => c.id === order.customerId) : null;
  const invoice = invoices.find((inv) => inv.orderId === id);

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 860, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Link href="/orders" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-2)", textDecoration: "none", marginBottom: 20 }}>
          <ArrowLeft size={13} />Orders
        </Link>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{order.orderNumber}</h1>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>
              {new Date(order.createdAt).toLocaleString("en-GB")}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {invoice && (
              <Link href={`/invoices/${invoice.id}`} className="nx-btn" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", fontSize: 12, padding: "7px 12px" }}>
                <FileText size={13} />View Invoice
              </Link>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Customer info */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "18px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Customer</div>
            {customer ? (
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{customer.name}</div>
                {customer.phone && <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>{customer.phone}</div>}
                {customer.email && <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{customer.email}</div>}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "var(--text-2)" }}>Walk-in customer</div>
            )}
          </div>

          {/* Payment info */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "18px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Payment</div>
            <div style={{ fontSize: 13, color: "var(--text)" }}>{order.payment}</div>
            {order.cashierName && (
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 8 }}>
                {t("cashier")}: <span style={{ fontWeight: 600, color: "var(--text)" }}>{order.cashierName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Line items */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", marginTop: 20, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 13.5 }}>Line Items</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                {["Product", "Qty", "Unit price", "Line total"].map((h) => (
                  <th key={h} style={{ padding: "9px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text-2)" }}>{item.qty}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13 }}>{money(item.price)}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700 }}>{money(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", marginTop: 14, padding: "18px 20px" }}>
          <div style={{ maxWidth: 280, marginLeft: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
              <span>Subtotal</span><span>{money(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
                <span>Discount</span><span>−{money(order.discount)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
              <span>VAT</span><span>{money(order.vat)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: "var(--text)", borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 4 }}>
              <span>Total</span><span style={{ color: "var(--pos)" }}>{money(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
