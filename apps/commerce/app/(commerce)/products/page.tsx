"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Upload, Pencil, Package, SearchX } from "lucide-react";
import { useApp } from "@/lib/store";

export default function ProductsPage() {
  const { products, money, showToast } = useApp();

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category || "General")))];
  const filtered = products.filter((p) =>
    (cat === "All" || (p.category || "General") === cat) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p.barcode || "").includes(q) ||
      (p.sku || "").toLowerCase().includes(q.toLowerCase()))
  );

  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= (p.lowStockThreshold || 5)).length;

  return (
    <div className="nx-main-scroll">
      <div className="nx-page">
        {/* Header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Products</h1>
            <p className="nx-page-sub">{products.length} products · {outOfStock} out of stock · {lowStock} low</p>
          </div>
          <div className="nx-row" style={{ gap: 10 }}>
            <button className="nx-btn nx-btn-secondary nx-btn-md" onClick={() => showToast("Import is coming soon", "info")}>
              <Upload size={15} />Import
            </button>
            <Link href="/products/new" className="nx-btn nx-btn-primary nx-btn-md" style={{ textDecoration: "none" }}>
              <Plus size={15} />Add Product
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="nx-filterbar">
          <div style={{ flex: 1, maxWidth: 340 }}>
            <span className="nx-input-wrap">
              <Search size={16} className="nx-input-icon" />
              <input className="nx-input" placeholder="Search name, SKU or barcode…" value={q} onChange={(e) => setQ(e.target.value)} />
            </span>
          </div>
          <div className="nx-row" style={{ gap: 6 }}>
            {(products.length === 0 ? ["All"] : cats).map((c) => (
              <button key={c} className={"nx-chip-filter" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="nx-card nx-card-pad">
            <div className="nx-empty">
              <div className="nx-empty-ic">{q ? <SearchX size={26} /> : <Package size={26} />}</div>
              <h3 className="nx-empty-title">{q ? "No products match your search" : "No products yet"}</h3>
              <p className="nx-empty-desc">
                {q ? "Try a different name, SKU or barcode." : "Add your first product to start selling on the POS."}
              </p>
              {!q && (
                <div style={{ marginTop: 18 }}>
                  <Link href="/products/new" className="nx-btn nx-btn-primary nx-btn-md" style={{ textDecoration: "none" }}>
                    <Plus size={15} />Add Product
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nx-table-wrap" data-testid="product-list">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>Barcode</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Tax</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} data-testid={`product-card-${p.id}`}>
                    <td>
                      <div className="nx-row" style={{ gap: 11 }}>
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt="" style={{ width: 38, height: 38, borderRadius: 9, objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }} />
                        ) : (
                          <span className="nx-thumb nx-thumb-stripe" style={{ width: 38, height: 38 }} />
                        )}
                        <div>
                          <div className="nx-td-strong">{p.name}</div>
                          <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{p.brand || "—"} · {p.unit || "Piece"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="nx-td-muted">{p.category || "General"}</td>
                    <td className="num" style={{ fontSize: 12 }}>{p.sku || "—"}</td>
                    <td className="num" style={{ fontSize: 12 }}>{p.barcode || "—"}</td>
                    <td className="num nx-td-strong">{money(p.price)}</td>
                    <td><span className="num">{p.stock ?? "—"}</span></td>
                    <td>{p.taxable ? <span className="nx-badge tone-neutral">14%</span> : <span className="nx-badge tone-neutral">None</span>}</td>
                    <td>
                      {p.stock === 0
                        ? <span className="nx-badge tone-danger"><span className="nx-badge-dot" />Out of stock</span>
                        : (p.stock ?? 0) <= (p.lowStockThreshold || 5)
                          ? <span className="nx-badge tone-warn"><span className="nx-badge-dot" />Low stock</span>
                          : <span className="nx-badge tone-pos"><span className="nx-badge-dot" />In stock</span>}
                    </td>
                    <td>
                      <Link href={`/products/new?edit=${p.id}`} className="nx-icon-btn" aria-label="Edit product">
                        <Pencil size={15} />
                      </Link>
                    </td>
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
