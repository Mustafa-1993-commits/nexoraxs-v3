"use client";

import { useState } from "react";
import { Shield, UserPlus, Info } from "lucide-react";
import { useApp } from "@/lib/store";
import { InviteUserModal, type MockTeamMember } from "@/components/dashboard/InviteUserModal";

const ROLE_TONE: Record<string, string> = {
  Owner: "tone-accent",
  "Commerce Admin": "tone-accent",
  Admin: "tone-accent",
  Manager: "tone-teal",
  "Branch Manager": "tone-teal",
  "Inventory Manager": "tone-teal",
  Accountant: "tone-warn",
  Cashier: "tone-warn",
  Viewer: "tone-neutral",
  Member: "tone-neutral",
};

const PERMS_MATRIX = [
  ["Core platform", [
    ["core.billing.manage", "Owner"],
    ["core.team.manage", "Owner, Admin"],
  ]],
  ["Commerce OS", [
    ["commerce.pos.use", "Commerce Admin, Branch Manager, Cashier"],
    ["commerce.products.manage", "Commerce Admin, Inventory Manager"],
    ["commerce.orders.view", "Commerce Admin, Branch Manager, Cashier"],
    ["commerce.invoices.view", "Commerce Admin, Accountant"],
    ["commerce.reports.view", "Commerce Admin, Accountant, Branch Manager"],
    ["commerce.settings.manage", "Commerce Admin"],
  ]],
] as [string, [string, string][]][];

export default function TeamPage() {
  const { currentUser, currentUserDisplayName, currentWorkspace } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [permsOpen, setPermsOpen] = useState(false);
  const [invited, setInvited] = useState<MockTeamMember[]>([]);

  const owner: MockTeamMember = {
    id: currentUser?.id ?? "owner",
    email: currentUser?.email ?? "owner@nexoraxs.local",
    name: currentUserDisplayName,
    workspaceRole: "Owner",
    osAccess: "Commerce OS",
    businessUnitAccess: "All",
    branchAccess: "All",
    osRole: "Commerce Admin",
    status: "active",
  };

  const allMembers = [owner, ...invited];

  return (
    <>
      <div className="nx-page" style={{ paddingBlock: "24px" }}>

        {/* Page header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Team</h1>
            <p className="nx-page-sub">Invite people and control what they can do in each operating system.</p>
          </div>
          <div className="nx-row" style={{ gap: 10 }}>
            <button
              className="nx-btn nx-btn-secondary nx-btn-md"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              onClick={() => setPermsOpen(true)}
            >
              <Shield size={15} />Permissions
            </button>
            <button
              className="nx-btn nx-btn-primary nx-btn-md"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              onClick={() => setModalOpen(true)}
            >
              <UserPlus size={15} />Invite member
            </button>
          </div>
        </div>

        {/* HR OS info banner */}
        <div className="nx-helper" style={{ marginBottom: 20, maxWidth: "none" }}>
          <Info size={16} />When HR OS is enabled, it becomes the master employee system and team members sync from there.
        </div>

        {/* Members table */}
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Assigned OS</th>
                <th>Last active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="nx-row" style={{ gap: 10 }}>
                      <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                        {(m.name ?? m.email).charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <div className="nx-td-strong">
                          {m.name ?? m.email}
                          {m.id === (currentUser?.id ?? "owner") && (
                            <span style={{ fontSize: 11, color: "var(--text-3)", marginLeft: 6 }}>(you)</span>
                          )}
                        </div>
                        {m.name && <div style={{ fontSize: 12, color: "var(--text-3)" }}>{m.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`nx-badge ${ROLE_TONE[m.osRole] ?? "tone-neutral"}`} style={{ fontSize: 11 }}>
                      {m.workspaceRole === "Owner" ? m.workspaceRole : m.osRole}
                    </span>
                  </td>
                  <td>
                    <span className={`nx-badge ${m.status === "active" ? "tone-pos" : "tone-warn"}`} style={{ fontSize: 11 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                      {m.status === "active" ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="nx-td-muted">{m.osAccess}</td>
                  <td className="nx-td-muted">{m.status === "active" ? "Just now" : "Invited"}</td>
                  <td>
                    <button className="nx-icon-btn" style={{ fontSize: 18 }}>···</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite modal */}
      <InviteUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onInvite={(m) => { setInvited((prev) => [...prev, m]); }}
      />

      {/* Permissions modal */}
      {permsOpen && (
        <div className="nx-modal-scrim" onClick={(e) => { if (e.target === e.currentTarget) setPermsOpen(false); }}>
          <div className="nx-modal" style={{ maxWidth: 560 }}>
            <div className="nx-modal-head">
              <div>
                <h3 className="nx-modal-title">Permission matrix</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>Default permissions by role for {currentWorkspace?.name}.</p>
              </div>
              <button className="nx-icon-btn" onClick={() => setPermsOpen(false)}>✕</button>
            </div>
            <div className="nx-modal-body">
              {PERMS_MATRIX.map(([section, rows]) => (
                <div key={section} style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>{section}</div>
                  {rows.map(([perm, roles]) => (
                    <div key={perm} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5 }}>
                      <span style={{ fontFamily: "var(--mono)", color: "var(--text-2)" }}>{perm}</span>
                      <span style={{ color: "var(--text-3)", textAlign: "end", maxWidth: 220 }}>{roles}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="nx-modal-foot">
              <button className="nx-btn nx-btn-secondary nx-btn-md" onClick={() => setPermsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
