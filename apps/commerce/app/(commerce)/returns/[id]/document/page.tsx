"use client";

import { use } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useApp, fmtDate, getBusinessBillingAddress, getBranchOperationalAddress } from "@/lib/store";

export default function ReturnDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { allCommerceReturns, allOrders, allInvoices, customers, BRANCHES, money, getCommerceSetup, currentBU, t } = useApp();

  const ret = allCommerceReturns.find((r) => r.id === id);
  if (!ret) {
    return (
      <div style={{ minHeight: "100vh", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#999" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
          <div style={{ fontWeight: 600 }}>{t("return_not_found")}</div>
          <Link href="/orders" style={{ display: "inline-flex", marginTop: 16, color: "#4f46e5", fontSize: 13, textDecoration: "none", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> {t("back_to_orders")}
          </Link>
        </div>
      </div>
    );
  }

  const setup = getCommerceSetup();
  const billingAddress = getBusinessBillingAddress(setup);
  const businessName = setup.displayName || setup.legalName || currentBU?.name || "Commerce Business";
  const order = allOrders.find((o) => o.id === ret.orderId);
  const invoice = ret.invoiceId ? allInvoices.find((inv) => inv.id === ret.invoiceId) : null;
  const customer = order?.customerId ? customers.find((c) => c.id === order.customerId) : null;
  const branch = BRANCHES.find((b) => b.id === ret.branchId);
  const branchName = branch?.name || ret.branchId;
  const branchAddress = getBranchOperationalAddress(branch);

  return (
    <div style={{ minHeight: "100vh", background: "#e5e7eb", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div className="nx-doc-topbar" style={{ background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 10, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={order ? `/orders/${order.id}` : "/orders"} style={{ color: "#aaa", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, textDecoration: "none" }}>
            <ArrowLeft size={14} /> {order ? order.orderNumber : t("orders")}
          </Link>
          <span style={{ color: "#555" }}>›</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{ret.returnNumber}</span>
        </div>
        <button
          onClick={() => window.print()}
          style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--accent, #4f46e5)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          <Printer size={14} />{t("print")}
        </button>
      </div>

      {/* A4 Return Receipt */}
      <div style={{ flex: 1, padding: "40px 24px", display: "flex", justifyContent: "center" }}>
        <div className="nx-invoice nx-pop" id="return-doc">
          {/* Header */}
          <div className="nx-invoice-top">
            <div className="nx-invoice-brand">
              {setup.logo
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={setup.logo} alt="" className="nx-invoice-logo" />
                : <div className="nx-invoice-logo ph">{businessName.charAt(0)}</div>}
              <div>
                <div className="nx-invoice-biz">{businessName}</div>
                {setup.legalName && setup.legalName !== businessName && (
                  <div className="nx-invoice-muted">{setup.legalName}</div>
                )}
                {billingAddress.singleLine && <div className="nx-invoice-muted">{billingAddress.singleLine}</div>}
                {setup.phone && <div className="nx-invoice-muted">{setup.phone}</div>}
                <div className="nx-invoice-muted" data-testid="return-doc-branch">{t("branch")}: {branchName}</div>
                {branchAddress.singleLine && <div className="nx-invoice-muted">{branchAddress.singleLine}</div>}
              </div>
            </div>
            <div className="nx-invoice-titleblock">
              <div className="nx-invoice-doctype">{t("return_receipt")}</div>
              <div className="nx-invoice-meta-grid">
                <span>{t("return_number")}</span><b data-testid="return-doc-return-number">{ret.returnNumber}</b>
                {order && <><span>{t("order_number")}</span><b data-testid="return-doc-order-number">{order.orderNumber}</b></>}
                {invoice && <><span>{t("invoice_number")}</span><b data-testid="return-doc-invoice-number">{invoice.invoiceNumber}</b></>}
                <span>{t("date")}</span><b>{fmtDate(ret.createdAt)}</b>
                <span>{t("cashier")}</span><b>{ret.cashierName}</b>
                {setup.vatRegistered && setup.taxNumber && (
                  <><span>{setup.taxLabel || t("vat")} No.</span><b>{setup.taxNumber}</b></>
                )}
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="nx-invoice-parties">
            <div>
              <div className="nx-invoice-plabel">{t("customer")}</div>
              <div className="nx-invoice-pname">{customer ? customer.name : t("walk_in")}</div>
              {customer?.phone && <div className="nx-invoice-muted">{customer.phone}</div>}
              {customer?.email && <div className="nx-invoice-muted">{customer.email}</div>}
              {!customer && <div className="nx-invoice-muted">{t("in_store")} · {t("point_of_sale")}</div>}
            </div>
            <div className="r">
              <div className="nx-invoice-plabel">{t("refund_method")}</div>
              <div className="nx-invoice-pname" style={{ textTransform: "capitalize" }}>{ret.refundMethod}</div>
              <div className="nx-invoice-muted">{ret.restock ? t("restocked") : t("not_restocked")}</div>
            </div>
          </div>

          {/* Line items */}
          <table className="nx-invoice-table">
            <thead>
              <tr>
                <th>{t("description")}</th>
                <th className="c">{t("qty")}</th>
                <th className="r">{t("unit")}</th>
                <th className="r">{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {ret.items.map((it, i) => (
                <tr key={i}>
                  <td>
                    <b>{it.name}</b>
                    {it.sku && <span className="nx-invoice-sku">{it.sku}</span>}
                  </td>
                  <td className="c">{it.qty}</td>
                  <td className="r">{money(it.price)}</td>
                  <td className="r">{money((+it.price || 0) * (+it.qty || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="nx-invoice-summary">
            <div className="nx-invoice-future">
              <div className="nx-invoice-plabel">{t("reason")}</div>
              <p className="nx-invoice-muted">{ret.reason || "—"}</p>
            </div>
            <div className="nx-invoice-totals">
              <div><span>{t("subtotal")}</span><b>{money(ret.subtotal)}</b></div>
              {setup.vatRegistered && (
                <div>
                  <span>{setup.taxLabel || t("vat")}</span>
                  <b>{money(ret.vat)}</b>
                </div>
              )}
              <div className="grand"><span>{t("total_refunded")}</span><b data-testid="return-doc-refund-total">{money(ret.total)}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
