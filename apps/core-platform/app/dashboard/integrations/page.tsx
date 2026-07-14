"use client";

import { useApp } from "@/lib/store";

const INTEGRATIONS = [
  {
    id: "accounting",
    name: "Accounting",
    desc: "Sync invoices, expenses and VAT reports with your accounting software.",
    osA: "Commerce OS",
    osB: "Accounting",
    icon: "📊",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    desc: "Send order confirmations, receipts and customer notifications via WhatsApp.",
    osA: "Commerce OS",
    osB: "WhatsApp",
    icon: "💬",
  },
  {
    id: "delivery",
    name: "Delivery & Logistics",
    desc: "Create delivery orders directly from Commerce OS and track shipments.",
    osA: "Commerce OS",
    osB: "Delivery",
    icon: "🚚",
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    desc: "Sync your product catalog and inventory with your online store.",
    osA: "Commerce OS",
    osB: "E-Commerce",
    icon: "🛍️",
  },
  {
    id: "hr-commerce",
    name: "HR Sync",
    desc: "HR manages employee profiles; Commerce grants cashier and branch access.",
    osA: "Commerce OS",
    osB: "HR OS",
    icon: "👥",
  },
  {
    id: "maintenance",
    name: "Spare Parts Inventory",
    desc: "Maintenance uses spare parts; Commerce manages stock and invoices.",
    osA: "Maintenance OS",
    osB: "Commerce OS",
    icon: "🔧",
  },
];

export default function IntegrationsPage() {
  const { showToast } = useApp();

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)" }}>Integrations</h1>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>
            Connect NexoraXS with your other tools and services.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {INTEGRATIONS.map((intg) => (
            <div
              key={intg.id}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)", padding: "22px 24px",
                display: "flex", flexDirection: "column", gap: 14,
                boxShadow: "var(--sh-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ fontSize: 32 }}>{intg.icon}</div>
                <span className="nx-badge tone-warn" style={{ fontSize: 11 }}>Coming Soon</span>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>{intg.name}</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  <span className="nx-badge tone-accent" style={{ fontSize: 10 }}>{intg.osA}</span>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>↔</span>
                  <span className="nx-badge tone-neutral" style={{ fontSize: 10 }}>{intg.osB}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{intg.desc}</p>
              </div>

              <div style={{ marginTop: "auto" }}>
                <button
                  className="nx-btn"
                  style={{ fontSize: 12, padding: "7px 14px" }}
                  onClick={() => showToast(`${intg.name} integration is coming soon`, "info")}
                >
                  Notify me
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
