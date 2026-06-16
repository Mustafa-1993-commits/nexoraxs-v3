"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, Plus, Trash2 } from "lucide-react";
import { useApp, fmtDate } from "@/lib/store";

interface ItemRow {
  productId: string;
  qty: string;
}

export default function StockTransfersPage() {
  const { products, BRANCHES, currentBranch, stockTransfers, transferStock, showToast, t } = useApp();

  const destinations = BRANCHES.filter((b) => b.id !== currentBranch?.id);
  const [toBranchId, setToBranchId] = useState(destinations[0]?.id || "");
  const [items, setItems] = useState<ItemRow[]>([]);
  const [note, setNote] = useState("");

  function addItemRow() {
    setItems((prev) => [...prev, { productId: products[0]?.id || "", qty: "1" }]);
  }
  function updateItem(i: number, patch: Partial<ItemRow>) {
    setItems((prev) => prev.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit() {
    if (!toBranchId) { showToast(t("select_branch"), "warn"); return; }
    const parsed = items
      .filter((row) => row.productId && row.qty.trim() !== "")
      .map((row) => ({ productId: row.productId, qty: +row.qty }));
    if (parsed.length === 0) return;

    const result = transferStock({ toBranchId, items: parsed, note: note.trim() || undefined });
    if (!result.ok) {
      showToast(t(result.error), "error");
      return;
    }
    showToast(t("transfer_completed"), "success");
    setItems([]);
    setNote("");
  }

  function branchName(id: string) {
    return BRANCHES.find((b) => b.id === id)?.name || id;
  }

  const history = [...stockTransfers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 920, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Link href="/inventory" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-2)", textDecoration: "none", marginBottom: 20 }}>
          <ArrowLeft size={13} />{t("inventory")}
        </Link>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{t("stock_transfer")}</h1>
        <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 16 }}>{t("review_transfer_stock")}</p>

        {/* New transfer */}
        <div className="nx-card" style={{ padding: "20px 22px", marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <ArrowRightLeft size={16} />{t("new_transfer")}
          </div>

          {destinations.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-3)" }}>
              {t("add_branch_for_transfers")}
            </p>
          ) : (
            <>
              <div className="nx-form-grid cols-2" style={{ marginBottom: 18 }}>
                <label className="nx-field">
                  <span className="nx-field-label">{t("from_branch")}</span>
                  <div className="nx-input" style={{ display: "flex", alignItems: "center", color: "var(--text-2)" }}>
                    {currentBranch?.name}
                  </div>
                </label>
                <label className="nx-field">
                  <span className="nx-field-label">{t("to_branch")}</span>
                  <select className="nx-input" value={toBranchId} onChange={(e) => setToBranchId(e.target.value)}>
                    {destinations.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ marginBottom: 18 }}>
                <span className="nx-field-label" style={{ display: "block", marginBottom: 10 }}>{t("items")}</span>
                {items.length === 0 && (
                  <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 10 }}>{t("no_items_added")}</p>
                )}
                {items.map((row, i) => (
                  <div key={i} className="nx-row" style={{ gap: 10, marginBottom: 10 }}>
                    <select
                      className="nx-input"
                      style={{ flex: 2 }}
                      value={row.productId}
                      onChange={(e) => updateItem(i, { productId: e.target.value })}
                    >
                      <option value="">{t("select_product")}...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.stock ?? 0} {t("in_stock")})</option>
                      ))}
                    </select>
                    <input
                      className="nx-input"
                      type="number"
                      min={1}
                      step={1}
                      style={{ width: 100 }}
                      value={row.qty}
                      onChange={(e) => updateItem(i, { qty: e.target.value })}
                      placeholder={t("qty")}
                    />
                    <button className="nx-icon-btn" onClick={() => removeItem(i)} aria-label={t("remove_item")}><Trash2 size={15} /></button>
                  </div>
                ))}
                <button className="nx-btn nx-btn-secondary nx-btn-sm" onClick={addItemRow} disabled={products.length === 0}>
                  <Plus size={14} />{t("add_item")}
                </button>
              </div>

              <label className="nx-field" style={{ marginBottom: 18 }}>
                <span className="nx-field-label">{t("note")}<span className="nx-field-optional">{t("optional")}</span></span>
                <input className="nx-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("example_transfer_note")} />
              </label>

              <button className="nx-btn nx-btn-primary nx-btn-md" onClick={handleSubmit} disabled={items.length === 0}>
                <ArrowRightLeft size={15} />{t("stock_transfer")}
              </button>
            </>
          )}
        </div>

        {/* History */}
        <div className="nx-section-title" style={{ marginBottom: 12 }}>{t("transfer_history")}</div>
        {history.length === 0 ? (
          <div className="nx-empty">
            <div className="nx-empty-ic"><ArrowRightLeft size={22} /></div>
            <div className="nx-empty-title">{t("no_transfers_yet")}</div>
            <div className="nx-empty-desc">{t("transfers_empty")}</div>
          </div>
        ) : (
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>{t("transfer")}</th>
                  <th>{t("from_branch")}</th>
                  <th>{t("to_branch")}</th>
                  <th>{t("items")}</th>
                  <th>{t("status")}</th>
                  <th>{t("cashier")}</th>
                  <th>{t("created")}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tr) => (
                  <tr key={tr.id}>
                    <td style={{ fontWeight: 700, fontFamily: "var(--mono)" }}>{tr.transferNumber}</td>
                    <td>{branchName(tr.fromBranchId)}</td>
                    <td>{branchName(tr.toBranchId)}</td>
                    <td style={{ color: "var(--text-2)", fontSize: 12.5 }}>{tr.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}</td>
                    <td>{t(tr.status)}</td>
                    <td>{tr.performedByName}</td>
                    <td style={{ color: "var(--text-3)", fontSize: 12 }}>{fmtDate(tr.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
