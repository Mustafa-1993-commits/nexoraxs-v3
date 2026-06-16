"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, FileText } from "lucide-react";
import { useApp, computeDoc } from "@/lib/store";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { allInvoices, allOrders, allCommerceReturns, customers, currentBranch, BRANCHES, money, getCommerceSetup, showToast, t } = useApp();

  const invoice = allInvoices.find((inv) => inv.id === id);
  if (!invoice) {
    return (
      <div className="nx-main-scroll">
        <div style={{ padding: "40px 28px", textAlign: "center", color: "var(--text-3)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Invoice not found</div>
          <Link href="/invoices" style={{ color: "var(--accent)", fontSize: 13 }}>← Invoices</Link>
        </div>
      </div>
    );
  }

  const order = allOrders.find((o) => o.id === invoice.orderId);
  const customer = order?.customerId ? customers.find((c) => c.id === order.customerId) : null;
  const setup = getCommerceSetup();
  const d = computeDoc(order?.items ?? invoice.items, setup, invoice.discount);
  const isOtherBranch = invoice.branchId !== currentBranch?.id;
  const invoiceBranchName = BRANCHES.find((b) => b.id === invoice.branchId)?.name || invoice.branchId;
  const returns = (invoice.returnIds || [])
    .map((rid) => allCommerceReturns.find((r) => r.id === rid))
    .filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 860, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Link href="/invoices" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-2)", textDecoration: "none", marginBottom: 20 }}>
          <ArrowLeft size={13} />Invoices
        </Link>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{invoice.invoiceNumber}</h1>
              {isOtherBranch && (
                <span className="nx-badge tone-neutral">{t("branch")}: {invoiceBranchName}</span>
              )}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>
              {new Date(invoice.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              {order?.cashierName && <> · {t("cashier")}: <span style={{ fontWeight: 600, color: "var(--text)" }}>{order.cashierName}</span></>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href={`/invoices/${id}/document`}
              className="nx-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", fontSize: 13, padding: "8px 14px" }}
            >
              <FileText size={14} />View Document
            </Link>
            <button
              className="nx-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "8px 14px" }}
              onClick={() => showToast("Printing coming soon", "info")}
            >
              <Printer size={14} />Print
            </button>
          </div>
        </div>

        {returns.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {returns.map((r) => (
              <Link
                key={r.id}
                href={`/returns/${r.id}/document`}
                className="nx-badge tone-warn"
                style={{ textDecoration: "none" }}
              >
                {t("return")} issued — {r.returnNumber}
              </Link>
            ))}
          </div>
        )}

        {/* Business + customer info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "18px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text-2)" }}>FROM</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{setup.displayName || "Business Name"}</div>
            {setup.address && <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>{setup.address}</div>}
            {setup.phone && <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>{setup.phone}</div>}
            {setup.taxNumber && <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Tax No: {setup.taxNumber}</div>}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "18px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "var(--text-2)" }}>TO</div>
            {customer ? (
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{customer.name}</div>
                {customer.phone && <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>{customer.phone}</div>}
                {customer.email && <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>{customer.email}</div>}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: "var(--text-2)" }}>Walk-in customer</div>
            )}
          </div>
        </div>

        {/* Line items */}
        {order && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {["Item", "Qty", "Unit price", "VAT", "Total"].map((h) => (
                    <th key={h} style={{ padding: "9px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.lines.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }} data-testid={`invoice-item-${i}`}>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text-2)" }} data-testid={`invoice-item-qty-${i}`}>{item.qty}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13 }}>{money(item.price)}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text-2)" }}>{money(item.vat)}</td>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700 }}>{money(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "18px 20px" }}>
          <div style={{ maxWidth: 280, marginLeft: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
              <span>Subtotal</span><span>{money(invoice.subtotal)}</span>
            </div>
            {invoice.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
                <span>Discount</span><span>−{money(invoice.discount)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
              <span>VAT ({setup.vatRate || 14}%)</span><span>{money(invoice.vat)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 4 }}>
              <span>Total</span><span style={{ color: "var(--pos)" }} data-testid="invoice-total">{money(invoice.total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-3)" }}>
              <span>Net</span><span>{money(invoice.net)}</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        {setup.footer && (
          <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--surface-2)", borderRadius: "var(--r-sm)", fontSize: 12, color: "var(--text-3)", textAlign: "center" }}>
            {setup.footer}
          </div>
        )}
      </div>
    </div>
  );
}
