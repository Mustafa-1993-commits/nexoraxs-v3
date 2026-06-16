"use client";

import { use } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { computeDoc, fmtDate } from "@/lib/store";

export default function InvoiceDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { allInvoices, allOrders, customers, allCommerceReturns, money, getCommerceSetup, currentBU, t } = useApp();

  const invoice = allInvoices.find((inv) => inv.id === id);
  if (!invoice) {
    return (
      <div style={{ minHeight: "100vh", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#999" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
          <div style={{ fontWeight: 600 }}>Invoice not found.</div>
          <Link href="/invoices" style={{ display: "inline-flex", marginTop: 16, color: "#4f46e5", fontSize: 13, textDecoration: "none", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> Back to Invoices
          </Link>
        </div>
      </div>
    );
  }

  const setup = getCommerceSetup();
  const businessName = setup.displayName || setup.legalName || currentBU?.name || "Commerce Business";
  const order = allOrders.find((o) => o.id === invoice.orderId);
  const customer = invoice.customerId ? customers.find((c) => c.id === invoice.customerId) : null;
  const payment = order?.payment || "Cash";
  const isPaid = order ? (order as { paid?: boolean }).paid !== false : true;

  // recompute from line items for accuracy
  const d = computeDoc(invoice.items, setup, invoice.discount);
  const returns = (invoice.returnIds || [])
    .map((rid) => allCommerceReturns.find((r) => r.id === rid))
    .filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div style={{ minHeight: "100vh", background: "#e5e7eb", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div className="nx-doc-topbar" style={{ background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 10, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/invoices" style={{ color: "#aaa", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, textDecoration: "none" }}>
            <ArrowLeft size={14} /> Invoices
          </Link>
          <span style={{ color: "#555" }}>›</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{invoice.invoiceNumber}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {returns.map((r) => (
            <Link
              key={r.id}
              href={`/returns/${r.id}/document`}
              className="nx-print-hide"
              style={{ color: "#fbbf24", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, textDecoration: "none" }}
            >
              {t("return")} issued — {r.returnNumber}
            </Link>
          ))}
          <button
            onClick={() => window.print()}
            className="nx-print-hide"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--accent, #4f46e5)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            <Printer size={14} />Print
          </button>
        </div>
      </div>

      {/* A4 Invoice */}
      <div style={{ flex: 1, padding: "40px 24px", display: "flex", justifyContent: "center" }}>
        <div className="nx-invoice nx-pop" id="invoice-doc">
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
                {setup.address && <div className="nx-invoice-muted">{setup.address}{setup.city ? `, ${setup.city}` : ""}</div>}
                {setup.phone && <div className="nx-invoice-muted">{setup.phone}</div>}
              </div>
            </div>
            <div className="nx-invoice-titleblock">
              <div className="nx-invoice-doctype">Tax Invoice</div>
              <div className="nx-invoice-meta-grid">
                <span>Invoice #</span><b>{invoice.invoiceNumber}</b>
                {order && <><span>Order #</span><b>{order.orderNumber}</b></>}
                <span>Date</span><b>{fmtDate(invoice.createdAt)}</b>
                <span>Salesperson</span><b>{invoice.cashierName || order?.cashierName || "Cashier"}</b>
                {setup.vatRegistered && setup.taxNumber && (
                  <><span>{setup.taxLabel || "VAT"} No.</span><b>{setup.taxNumber}</b></>
                )}
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="nx-invoice-parties">
            <div>
              <div className="nx-invoice-plabel">Billed to</div>
              <div className="nx-invoice-pname">{customer ? customer.name : "Walk-in customer"}</div>
              {customer?.phone && <div className="nx-invoice-muted">{customer.phone}</div>}
              {customer?.email && <div className="nx-invoice-muted">{customer.email}</div>}
              {!customer && <div className="nx-invoice-muted">In-store · Point of Sale</div>}
            </div>
            <div className="r">
              <div className="nx-invoice-plabel">Payment</div>
              <div className="nx-invoice-pname" style={{ textTransform: "capitalize" }}>{payment}</div>
              <div className="nx-invoice-muted">{isPaid ? "Paid in full" : "Pending"}</div>
            </div>
          </div>

          {/* Line items */}
          <table className="nx-invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th className="c">Qty</th>
                <th className="r">Unit</th>
                <th className="r">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((it, i) => (
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
              <div className="nx-invoice-plabel">Notes</div>
              <p className="nx-invoice-muted">{setup.footer || "Thank you for shopping with us"}</p>
              {setup.returnPolicy && (
                <p className="nx-invoice-muted" style={{ marginTop: 4 }}>{setup.returnPolicy}</p>
              )}
              <div className="nx-invoice-future-fields">
                <span className="nx-fut">Expiry date</span>
                <span className="nx-fut">Batch number</span>
                <span className="nx-fut">Prescription ref</span>
              </div>
            </div>
            <div className="nx-invoice-totals">
              <div><span>Net amount</span><b>{money(d.net)}</b></div>
              {d.discount > 0 && <div><span>Discount</span><b>−{money(d.discount)}</b></div>}
              {setup.vatRegistered && (
                <div>
                  <span>{setup.taxLabel || "VAT"} ({d.rate}%)</span>
                  <b>{money(d.vat)}</b>
                </div>
              )}
              <div className="grand"><span>Total due</span><b>{money(d.total)}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
