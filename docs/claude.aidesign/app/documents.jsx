// ============================================================
// NexoraXS — Document templates (POS receipt + A4 tax invoice)
// ============================================================

function computeDoc(items, setup, discount = 0) {
  const safeSetup = setup || {};
  const rows = Array.isArray(items) ? items : [];
  const rate = safeSetup.vatRegistered ? (+safeSetup.vatRate || 0) : 0;
  let gross = 0, taxableGross = 0;
  rows.forEach((it) => {
    const line = (+it.price || 0) * (+it.qty || 0);
    gross += line;
    if (it.taxable !== false) taxableGross += line;
  });
  // distribute discount proportionally onto gross
  const afterDiscount = gross - discount;
  const taxablePortion = gross > 0 ? Math.max(0, taxableGross - discount * (taxableGross / gross)) : 0;
  const vat = safeSetup.pricesIncludeTax
    ? taxablePortion - taxablePortion / (1 + rate / 100)
    : taxablePortion * (rate / 100);
  const net = afterDiscount - (safeSetup.pricesIncludeTax ? vat : 0);
  const total = safeSetup.pricesIncludeTax ? afterDiscount : afterDiscount + vat;
  return { gross, discount, net, vat, total, rate };
}

/* ---------- POS Receipt (thermal) ---------- */
const ReceiptDoc = ({ setup, items, discount = 0, meta = {}, scale = 1 }) => {
  const { money, currentBU } = useApp();
  const safeSetup = setup || {};
  const rows = Array.isArray(items) ? items : [];
  const businessName = safeSetup.displayName || safeSetup.businessDisplayName || (currentBU && currentBU.name) || "Commerce business";
  const d = computeDoc(rows, safeSetup, discount);
  const width = safeSetup.receiptSize === "58mm" ? 230 : 300;
  return (
    <div className="nx-receipt" style={{ width, transform: `scale(${scale})`, transformOrigin: "top center" }}>
      <div className="nx-receipt-head">
        {safeSetup.logo
          ? <img src={safeSetup.logo} alt="" className="nx-receipt-logo" />
          : <div className="nx-receipt-logo ph">{businessName.charAt(0)}</div>}
        <div className="nx-receipt-biz">{businessName}</div>
        {safeSetup.address && <div className="nx-receipt-muted">{safeSetup.address}</div>}
        {safeSetup.phone && <div className="nx-receipt-muted">Tel: {safeSetup.phone}</div>}
        {safeSetup.vatRegistered && <div className="nx-receipt-muted">{safeSetup.taxLabel || "VAT"} Reg: {safeSetup.taxNumber || ""}</div>}
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-meta">
        <div><span>Receipt</span><b>{meta.receipt || `${safeSetup.receiptPrefix || "RCPT"}-${safeSetup.receiptStart || 1001}`}</b></div>
        <div><span>Order</span><b>{meta.order || "Preview"}</b></div>
        <div><span>Date</span><b>{meta.date || new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</b></div>
        <div><span>Cashier</span><b>{meta.cashier || "Current user"}</b></div>
      </div>
      <div className="nx-receipt-rule dashed" />
      <table className="nx-receipt-items">
        <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
        <tbody>
          {rows.map((it, i) => (
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
        <div><span>{safeSetup.pricesIncludeTax ? "Net" : "Subtotal"}</span><b>{money(d.net)}</b></div>
        {discount > 0 && <div><span>Discount</span><b>−{money(discount)}</b></div>}
        {safeSetup.vatRegistered && <div><span>{safeSetup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>}
        <div className="grand"><span>Total</span><b>{money(d.total)}</b></div>
        {meta.payment && <div className="pay"><span>{meta.payment}</span><b>{money(d.total)}</b></div>}
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-foot">
        <div className="nx-receipt-barcode">{Array.from({ length: 44 }).map((_, i) =>
          <span key={i} style={{ width: (i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1 : 1.5) }} />)}</div>
        <div className="nx-receipt-muted">{meta.receipt || `${safeSetup.receiptPrefix || "RCPT"}-${safeSetup.receiptStart || 1001}`}</div>
        <div className="nx-receipt-thanks">{safeSetup.footer || "Thank you for shopping with us"}</div>
        {safeSetup.returnPolicy && <div className="nx-receipt-policy">{safeSetup.returnPolicy}</div>}
      </div>
    </div>
  );
};

/* ---------- A4 Tax Invoice ---------- */
const InvoiceDoc = ({ setup, items, discount = 0, meta = {}, compact = false }) => {
  const { money, currentBU } = useApp();
  const safeSetup = setup || {};
  const rows = Array.isArray(items) ? items : [];
  const businessName = safeSetup.displayName || safeSetup.businessDisplayName || (currentBU && currentBU.name) || "Commerce business";
  const d = computeDoc(rows, safeSetup, discount);
  return (
    <div className={"nx-invoice" + (compact ? " compact" : "")}>
      <div className="nx-invoice-top">
        <div className="nx-invoice-brand">
          {safeSetup.logo
            ? <img src={safeSetup.logo} alt="" className="nx-invoice-logo" />
            : <div className="nx-invoice-logo ph">{businessName.charAt(0)}</div>}
          <div>
            <div className="nx-invoice-biz">{businessName}</div>
            {safeSetup.legalName && <div className="nx-invoice-muted">{safeSetup.legalName}</div>}
            {safeSetup.address && <div className="nx-invoice-muted">{safeSetup.address}</div>}
            {safeSetup.phone && <div className="nx-invoice-muted">{safeSetup.phone}</div>}
          </div>
        </div>
        <div className="nx-invoice-titleblock">
          <div className="nx-invoice-doctype">Tax Invoice</div>
          <div className="nx-invoice-meta-grid">
            <span>Invoice #</span><b>{meta.invoice || `${safeSetup.invoicePrefix || "INV"}-${safeSetup.invoiceStart || 1001}`}</b>
            <span>Order #</span><b>{meta.order || "Preview"}</b>
            <span>Date</span><b>{meta.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</b>
            {safeSetup.vatRegistered && <><span>{safeSetup.taxLabel || "VAT"} No.</span><b>{safeSetup.taxNumber || ""}</b></>}
          </div>
        </div>
      </div>
      <div className="nx-invoice-parties">
        <div>
          <div className="nx-invoice-plabel">Billed to</div>
          <div className="nx-invoice-pname">{meta.customer || "Walk-in customer"}</div>
          <div className="nx-invoice-muted">In-store · Point of Sale</div>
        </div>
        <div className="r">
          <div className="nx-invoice-plabel">Payment</div>
          <div className="nx-invoice-pname">{meta.payment || "Cash"}</div>
          <div className="nx-invoice-muted">{meta.paid === false ? "Pending" : "Paid in full"}</div>
        </div>
      </div>
      <table className="nx-invoice-table">
        <thead><tr><th>Description</th><th className="c">Qty</th><th className="r">Unit</th><th className="r">Amount</th></tr></thead>
        <tbody>
          {rows.map((it, i) => (
            <tr key={i}>
              <td><b>{it.name}</b>{it.sku && <span className="nx-invoice-sku">{it.sku}</span>}</td>
              <td className="c">{it.qty}</td>
              <td className="r">{money(it.price)}</td>
              <td className="r">{money((+it.price || 0) * (+it.qty || 0))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nx-invoice-summary">
        <div className="nx-invoice-future">
          <div className="nx-invoice-plabel">Notes</div>
          <p className="nx-invoice-muted">{safeSetup.footer || "Thank you for shopping with us"}</p>
          <div className="nx-invoice-future-fields">
            <span className="nx-fut">Expiry date</span>
            <span className="nx-fut">Batch number</span>
            <span className="nx-fut">Prescription ref</span>
          </div>
        </div>
        <div className="nx-invoice-totals">
          <div><span>Net amount</span><b>{money(d.net)}</b></div>
          {discount > 0 && <div><span>Discount</span><b>−{money(discount)}</b></div>}
          {safeSetup.vatRegistered && <div><span>{safeSetup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>}
          <div className="grand"><span>Total due</span><b>{money(d.total)}</b></div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ReceiptDoc, InvoiceDoc, computeDoc });
