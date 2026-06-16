"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, RotateCcw, X } from "lucide-react";
import { useApp, type RefundMethod } from "@/lib/store";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const {
    allOrders, allInvoices, allCommerceReturns, customers, currentBranch, BRANCHES,
    money, t, createReturn, showToast,
  } = useApp();
  const [showReturn, setShowReturn] = useState(false);
  const [returnQtys, setReturnQtys] = useState<Record<string, string>>({});
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState<RefundMethod>("original");
  const [restock, setRestock] = useState(true);

  const order = allOrders.find((o) => o.id === id);
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
  const invoice = allInvoices.find((inv) => inv.orderId === id);
  const isOtherBranch = order.branchId !== currentBranch?.id;
  const orderBranchName = BRANCHES.find((b) => b.id === order.branchId)?.name || order.branchId;

  // already-returned qty per product across all returns for this order
  const returnedQtyByProduct: Record<string, number> = {};
  allCommerceReturns
    .filter((r) => r.orderId === order.id)
    .forEach((r) => r.items.forEach((it) => {
      returnedQtyByProduct[it.productId] = (returnedQtyByProduct[it.productId] || 0) + it.qty;
    }));

  const returnableItems = order.items
    .map((item) => {
      const key = item.productId || item.id || "";
      const remaining = item.qty - (returnedQtyByProduct[key] || 0);
      return { key, name: item.name, qty: item.qty, remaining };
    })
    .filter((item) => item.key && item.remaining > 0);

  const returnStatus = order.returnStatus || "none";

  function openReturnModal() {
    setReturnQtys({});
    setReason("");
    setRefundMethod("original");
    setRestock(true);
    setShowReturn(true);
  }

  function handleSubmitReturn() {
    const items = returnableItems
      .map((ri) => ({ productId: ri.key, qty: +(returnQtys[ri.key] || 0) }))
      .filter((ri) => ri.qty > 0);
    if (items.length === 0) return;

    const result = createReturn({ orderId: id, items, reason, refundMethod, restock });
    if (!result.ok) {
      showToast(t(result.error), "error");
      return;
    }
    setShowReturn(false);
    router.push(`/returns/${result.return.id}/document`);
  }

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
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{order.orderNumber}</h1>
              {isOtherBranch && (
                <span className="nx-badge tone-neutral">{t("branch")}: {orderBranchName}</span>
              )}
              {returnStatus !== "none" && (
                <span className={`nx-badge ${returnStatus === "returned" ? "tone-danger" : "tone-warn"}`}>
                  {returnStatus === "returned" ? t("returned") : t("partially_returned")}
                </span>
              )}
            </div>
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
            {returnableItems.length > 0 && (
              <button
                className="nx-btn nx-btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, padding: "7px 12px" }}
                onClick={openReturnModal}
                data-testid="open-return-button"
              >
                <RotateCcw size={13} />{t("return")}
              </button>
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
                {["Product", "Qty", "Unit price", "Line total", t("remaining_returnable")].map((h) => (
                  <th key={h} style={{ padding: "9px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => {
                const key = item.productId || item.id || "";
                const remaining = item.qty - (returnedQtyByProduct[key] || 0);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text-2)" }}>{item.qty}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13 }}>{money(item.price)}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700 }}>{money(item.price * item.qty)}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text-2)" }}>{remaining}</td>
                  </tr>
                );
              })}
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
            {(order.returnedTotal || 0) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--danger)" }}>
                <span>{t("returns_refunds")}</span><span>−{money(order.returnedTotal || 0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReturn && (
        <div style={{ position: "fixed", inset: 0, background: "#0006", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", padding: 28, width: 440, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700 }}>{t("process_return")}</h3>
              <button onClick={() => setShowReturn(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>

            <div style={{ marginBottom: 16 }}>
              {returnableItems.map((ri) => (
                <div key={ri.key} className="nx-row" style={{ justifyContent: "space-between", marginBottom: 10, gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{ri.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{t("remaining_returnable")}: {ri.remaining}</div>
                  </div>
                  <input
                    className="nx-input"
                    type="number"
                    min={0}
                    max={ri.remaining}
                    style={{ width: 80 }}
                    value={returnQtys[ri.key] || ""}
                    onChange={(e) => setReturnQtys((prev) => ({ ...prev, [ri.key]: e.target.value }))}
                    placeholder="0"
                    data-testid={`return-qty-${ri.key}`}
                  />
                </div>
              ))}
            </div>

            <div className="nx-field" style={{ marginBottom: 14 }}>
              <label className="nx-field-label">Reason</label>
              <input className="nx-input" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Customer changed mind" data-testid="return-reason-input" />
            </div>

            <div className="nx-field" style={{ marginBottom: 14 }}>
              <label className="nx-field-label">{t("refund_method")}</label>
              <select className="nx-input" value={refundMethod} onChange={(e) => setRefundMethod(e.target.value as RefundMethod)}>
                <option value="original">Original payment method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 22, cursor: "pointer" }}>
              <input type="checkbox" checked={restock} onChange={(e) => setRestock(e.target.checked)} data-testid="return-restock-checkbox" />
              {t("restock")}
            </label>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="nx-btn" onClick={() => setShowReturn(false)}>Cancel</button>
              <button className="nx-btn-primary" onClick={handleSubmitReturn} data-testid="submit-return-button">{t("process_return")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
