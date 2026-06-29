"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { useApp } from "@/lib/store";
import { computeDoc, getBusinessBillingAddress } from "@/lib/store";
import type { OrderItem } from "@/lib/store";

// Sample items used for preview only — no storage read
const PREVIEW_ITEMS: OrderItem[] = [
  { name: "Sample Product A", qty: 2, price: 120, taxable: true },
  { name: "Sample Product B", qty: 1, price: 85, taxable: true },
  { name: "Exempt Item", qty: 3, price: 30, taxable: false },
];

function ReceiptPreview({ setup, money }: { setup: ReturnType<ReturnType<typeof useApp>["getCommerceSetup"]>; money: (n: number) => string }) {
  const businessName = setup.displayName || "Commerce Business";
  const billingAddress = getBusinessBillingAddress(setup);
  const d = computeDoc(PREVIEW_ITEMS, setup, 0);
  const width = setup.receiptSize === "58mm" ? 230 : 300;
  const nowStr = new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  return (
    <div className="nx-receipt" style={{ width, margin: "0 auto" }}>
      <div className="nx-receipt-head">
        <div className="nx-receipt-logo ph">{businessName.charAt(0)}</div>
        <div className="nx-receipt-biz">{businessName}</div>
        {billingAddress.singleLine && <div className="nx-receipt-muted">{billingAddress.singleLine}</div>}
        {setup.phone && <div className="nx-receipt-muted">Tel: {setup.phone}</div>}
        {setup.vatRegistered && <div className="nx-receipt-muted">{setup.taxLabel || "VAT"} Reg: {setup.taxNumber}</div>}
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-meta">
        <div><span>Receipt</span><b>{setup.receiptPrefix || "RCPT"}-{setup.receiptStart || 1001}</b></div>
        <div><span>Order</span><b>Preview</b></div>
        <div><span>Date</span><b>{nowStr}</b></div>
        <div><span>Cashier</span><b>Current user</b></div>
      </div>
      <div className="nx-receipt-rule dashed" />
      <table className="nx-receipt-items">
        <thead>
          <tr>
            <th>Item</th><th>Qty</th><th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {PREVIEW_ITEMS.map((it, i) => (
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
        <div><span>{setup.pricesIncludeTax ? "Net" : "Subtotal"}</span><b>{money(d.net)}</b></div>
        {setup.vatRegistered && (
          <div><span>{setup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>
        )}
        <div className="grand"><span>Total</span><b>{money(d.total)}</b></div>
        <div className="pay"><span>Cash</span><b>{money(d.total)}</b></div>
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-foot">
        <div className="nx-receipt-barcode">
          {Array.from({ length: 44 }).map((_, i) => (
            <span key={i} style={{ width: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1 : 1.5 }} />
          ))}
        </div>
        <div className="nx-receipt-muted">{setup.receiptPrefix || "RCPT"}-{setup.receiptStart || 1001}</div>
        <div className="nx-receipt-thanks">{setup.footer || "Thank you for shopping with us"}</div>
        {setup.returnPolicy && <div className="nx-receipt-policy">{setup.returnPolicy}</div>}
      </div>
    </div>
  );
}

function InvoicePreview({ setup, money }: { setup: ReturnType<ReturnType<typeof useApp>["getCommerceSetup"]>; money: (n: number) => string }) {
  const businessName = setup.displayName || "Commerce Business";
  const billingAddress = getBusinessBillingAddress(setup);
  const d = computeDoc(PREVIEW_ITEMS, setup, 0);
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <div className="nx-invoice compact">
      <div className="nx-invoice-top">
        <div className="nx-invoice-brand">
          <div className="nx-invoice-logo ph">{businessName.charAt(0)}</div>
          <div>
            <div className="nx-invoice-biz">{businessName}</div>
            {setup.legalName && <div className="nx-invoice-muted">{setup.legalName}</div>}
            {billingAddress.singleLine && <div className="nx-invoice-muted">{billingAddress.singleLine}</div>}
            {setup.phone && <div className="nx-invoice-muted">{setup.phone}</div>}
          </div>
        </div>
        <div className="nx-invoice-titleblock">
          <div className="nx-invoice-doctype">Tax Invoice</div>
          <div className="nx-invoice-meta-grid">
            <span>Invoice #</span><b>{setup.invoicePrefix || "INV"}-{setup.invoiceStart || 1001}</b>
            <span>Order #</span><b>Preview</b>
            <span>Date</span><b>{dateStr}</b>
            {setup.vatRegistered && setup.taxNumber && (
              <><span>{setup.taxLabel || "VAT"} No.</span><b>{setup.taxNumber}</b></>
            )}
          </div>
        </div>
      </div>
      <div className="nx-invoice-parties">
        <div>
          <div className="nx-invoice-plabel">Billed to</div>
          <div className="nx-invoice-pname">Walk-in customer</div>
          <div className="nx-invoice-muted">In-store · Point of Sale</div>
        </div>
        <div className="r">
          <div className="nx-invoice-plabel">Payment</div>
          <div className="nx-invoice-pname">Cash</div>
          <div className="nx-invoice-muted">Paid in full</div>
        </div>
      </div>
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
          {PREVIEW_ITEMS.map((it, i) => (
            <tr key={i}>
              <td><b>{it.name}</b></td>
              <td className="c">{it.qty}</td>
              <td className="r">{money(it.price)}</td>
              <td className="r">{money(it.price * it.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nx-invoice-summary">
        <div className="nx-invoice-future">
          <div className="nx-invoice-plabel">Notes</div>
          <p className="nx-invoice-muted">{setup.footer || "Thank you for shopping with us"}</p>
          <div className="nx-invoice-future-fields">
            <span className="nx-fut">Expiry date</span>
            <span className="nx-fut">Batch number</span>
            <span className="nx-fut">Prescription ref</span>
          </div>
        </div>
        <div className="nx-invoice-totals">
          <div><span>Net amount</span><b>{money(d.net)}</b></div>
          {setup.vatRegistered && (
            <div><span>{setup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>
          )}
          <div className="grand"><span>Total due</span><b>{money(d.total)}</b></div>
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const { getCommerceSetup, money } = useApp();
  const setup = getCommerceSetup();

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Document Templates</h1>
            <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 3 }}>
              Preview how your receipts and invoices will look. Edit template settings in the setup wizard.
            </p>
          </div>
          <Link href="/setup" className="nx-btn" style={{ textDecoration: "none", display: "inline-flex", gap: 7, alignItems: "center", fontSize: 13, padding: "8px 14px" }}>
            <Settings size={14} /> Edit in Setup
          </Link>
        </div>

        {/* Configuration summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 32 }}>
          {[
            { label: "VAT", value: setup.vatRegistered ? `${setup.taxLabel || "VAT"} at ${setup.vatRate}% (${setup.pricesIncludeTax ? "inclusive" : "exclusive"})` : "Not registered" },
            { label: "Invoice prefix", value: `${setup.invoicePrefix || "INV"}-${setup.invoiceStart || 1001}` },
            { label: "Receipt prefix", value: `${setup.receiptPrefix || "RCPT"}-${setup.receiptStart || 1001}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "12px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", fontFamily: "var(--mono)" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Previews */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "start" }}>
          {/* Receipt */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>
              Thermal Receipt ({setup.receiptSize || "80mm"})
            </div>
            <ReceiptPreview setup={setup} money={money} />
          </div>

          {/* A4 Invoice */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 14 }}>
              A4 Tax Invoice
            </div>
            <InvoicePreview setup={setup} money={money} />
          </div>
        </div>

        <div style={{ marginTop: 24, padding: "12px 16px", background: "var(--surface-2)", borderRadius: "var(--r)", border: "1px solid var(--border)", fontSize: 12.5, color: "var(--text-3)" }}>
          Previews use sample data. Actual documents are generated per sale with real product names, quantities, and customer details.
        </div>
      </div>
    </div>
  );
}
