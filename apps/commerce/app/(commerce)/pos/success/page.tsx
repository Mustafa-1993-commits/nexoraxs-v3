"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingCart, FileText, Printer } from "lucide-react";
import { useApp, computeDoc, fmtDate, readPosLastOrderId, clearPosLastOrderId } from "@/lib/store";
import type { CommerceOrder, CommerceInvoice } from "@/lib/store";

export default function POSSuccessPage() {
  const { orders, invoices, customers, money, getCommerceSetup, currentBranch, t } = useApp();
  const setup = getCommerceSetup();
  const businessName = setup.displayName || setup.legalName || "Commerce Business";
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

  const doc = order ? computeDoc(order.items, setup, order.discount || 0) : null;

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
        <div className="nx-print-hide" style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success)", color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 size={36} />
        </div>

        <h1 className="nx-print-hide" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Sale Complete!</h1>
        <p className="nx-print-hide" style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>
          Order {order.orderNumber} has been recorded successfully.
        </p>

        {/* Order summary card */}
        <div className="nx-print-hide" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "20px 22px", marginBottom: 20, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>Order number</div>
            <div style={{ fontWeight: 700, fontFamily: "var(--mono)", fontSize: 13 }}>{order.orderNumber}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>Payment</div>
            <div style={{ fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>{order.payment}</div>
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
        <div className="nx-print-hide" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
              href={`/invoices/${invoice.id}/document`}
              className="nx-btn"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", padding: "11px 20px", fontSize: 14 }}
            >
              <FileText size={16} />View Invoice
            </Link>
          )}

          <button
            className="nx-btn"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, padding: "11px 20px" }}
            onClick={() => window.print()}
          >
            <Printer size={16} />Print Receipt
          </button>
        </div>

        {/* Receipt */}
        {doc && (
          <div style={{ marginTop: 32, textAlign: "left" }}>
            <div className="nx-print-hide" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>
              Receipt
            </div>
            <div className="nx-receipt" style={{ margin: "0 auto" }}>
              <div className="nx-receipt-head">
                {setup.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={setup.logo} alt={businessName} style={{ height: 40, maxWidth: 120, objectFit: "contain", margin: "0 auto 6px" }} />
                ) : (
                  <div className="nx-receipt-logo ph">{businessName.charAt(0)}</div>
                )}
                <div className="nx-receipt-biz">{businessName}</div>
                {currentBranch?.name && <div className="nx-receipt-muted">{currentBranch.name}</div>}
                {setup.address && <div className="nx-receipt-muted">{setup.address}</div>}
                {setup.phone && <div className="nx-receipt-muted">Tel: {setup.phone}</div>}
                {setup.vatRegistered && setup.taxNumber && (
                  <div className="nx-receipt-muted">{setup.taxLabel || "VAT"} Reg: {setup.taxNumber}</div>
                )}
              </div>
              <div className="nx-receipt-rule" />
              <div className="nx-receipt-meta">
                {invoice && <div><span>Receipt</span><b>{invoice.invoiceNumber}</b></div>}
                <div><span>Order</span><b>{order.orderNumber}</b></div>
                <div><span>Date</span><b>{fmtDate(order.createdAt)}</b></div>
                <div><span>Payment</span><b style={{ textTransform: "capitalize" }}>{order.payment}</b></div>
                {order.cashierName && <div><span>{t("cashier")}</span><b>{order.cashierName}</b></div>}
                {order.customerId && (() => {
                  const customer = customers.find((c) => c.id === order.customerId);
                  return customer ? <div><span>{t("customer")}</span><b>{customer.name}</b></div> : null;
                })()}
              </div>
              <div className="nx-receipt-rule dashed" />
              <table className="nx-receipt-items">
                <thead>
                  <tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {order.items.map((it, i) => (
                    <tr key={i}>
                      <td>{it.name}<span className="nx-receipt-unit">{money(it.price)}</span></td>
                      <td className="c">{it.qty}</td>
                      <td className="r">{money(it.price * it.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="nx-receipt-rule dashed" />
              <div className="nx-receipt-totals">
                <div><span>{setup.pricesIncludeTax ? "Net" : "Subtotal"}</span><b>{money(doc.net)}</b></div>
                {(order.discount || 0) > 0 && (
                  <div><span>Discount</span><b>−{money(order.discount || 0)}</b></div>
                )}
                {setup.vatRegistered && (
                  <div><span>{setup.taxLabel || "VAT"} ({doc.rate}%)</span><b>{money(doc.vat)}</b></div>
                )}
                <div className="grand"><span>Total</span><b>{money(doc.total)}</b></div>
                <div className="pay"><span style={{ textTransform: "capitalize" }}>{order.payment}</span><b>{money(doc.total)}</b></div>
              </div>
              <div className="nx-receipt-rule" />
              <div className="nx-receipt-foot">
                <div className="nx-receipt-barcode">
                  {Array.from({ length: 44 }).map((_, i) => (
                    <span key={i} style={{ width: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1 : 1.5 }} />
                  ))}
                </div>
                {invoice && <div className="nx-receipt-muted">{invoice.invoiceNumber}</div>}
                <div className="nx-receipt-thanks">{setup.footer || "Thank you for shopping with us"}</div>
                {setup.returnPolicy && <div className="nx-receipt-policy">{setup.returnPolicy}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
