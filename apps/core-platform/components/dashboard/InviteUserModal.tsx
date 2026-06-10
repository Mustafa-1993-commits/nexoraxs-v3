"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getBUName, getBranchName } from "@/lib/core-session";

const WORKSPACE_ROLES = ["Owner", "Admin", "Member"] as const;
const OS_OPTIONS = ["Commerce OS"] as const;

const COMMERCE_OS_ROLES = [
  "Commerce Admin",
  "Branch Manager",
  "Cashier",
  "Inventory Manager",
  "Accountant",
  "Viewer",
] as const;

export interface MockTeamMember {
  id: string;
  email: string;
  name?: string;
  workspaceRole: string;
  osAccess: string;
  businessUnitAccess: string;
  branchAccess: string;
  osRole: string;
  status: "active" | "pending";
}

interface Props {
  open: boolean;
  onClose: () => void;
  onInvite: (member: MockTeamMember) => void;
}

const EMPTY_FORM = {
  email: "", name: "", workspaceRole: "Member" as string,
  os: "Commerce OS" as string, buAccess: "All" as string,
  branchAccess: "All" as string, osRole: COMMERCE_OS_ROLES[0] as string,
  emailError: "",
};

export function InviteUserModal({ open, onClose, onInvite }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const upd = (p: Partial<typeof EMPTY_FORM>) => setForm((f) => ({ ...f, ...p }));

  const buName = getBUName() ?? null;
  const branchName = getBranchName() ?? null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  if (!open) return null;

  function handleSubmit() {
    if (!form.email.trim()) { upd({ emailError: "Email is required" }); return; }
    upd({ emailError: "" });
    onInvite({
      id: `mock-${Date.now()}`,
      email: form.email.trim(),
      name: form.name.trim() || undefined,
      workspaceRole: form.workspaceRole,
      osAccess: form.os,
      businessUnitAccess: form.buAccess,
      branchAccess: form.branchAccess,
      osRole: form.osRole,
      status: "pending",
    });
    onClose();
  }

  return (
    <div className="nx-modal-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nx-modal" style={{ maxWidth: 520 }}>
        <div className="nx-modal-head">
          <div>
            <h3 className="nx-modal-title">Invite a team member</h3>
            <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>
              They&apos;ll get an email to join your workspace.
            </p>
          </div>
          <button className="nx-icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="nx-modal-body">
          <div className="nx-form-grid">
            {/* Email */}
            <div className="nx-field">
              <label className="nx-field-label">Email *</label>
              <input
                className={`nx-input${form.emailError ? " error" : ""}`}
                type="email"
                autoFocus
                value={form.email}
                onChange={(e) => upd({ email: e.target.value, emailError: "" })}
                placeholder="colleague@example.com"
              />
              {form.emailError && <p style={{ fontSize: 12, color: "var(--neg)", marginTop: 4 }}>{form.emailError}</p>}
            </div>

            {/* Name */}
            <div className="nx-field">
              <label className="nx-field-label">Name <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(optional)</span></label>
              <input
                className="nx-input"
                value={form.name}
                onChange={(e) => upd({ name: e.target.value })}
                placeholder="Full name"
              />
            </div>

            {/* Workspace role + OS access row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="nx-field">
                <label className="nx-field-label">Workspace role</label>
                <select className="nx-input" value={form.workspaceRole} onChange={(e) => upd({ workspaceRole: e.target.value })}>
                  {WORKSPACE_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <span style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>Controls workspace-level access like billing and team.</span>
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Operating system</label>
                <select className="nx-input" value={form.os} onChange={(e) => upd({ os: e.target.value })}>
                  {OS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* BU + Branch row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="nx-field">
                <label className="nx-field-label">Business</label>
                <select className="nx-input" value={form.buAccess} onChange={(e) => upd({ buAccess: e.target.value })}>
                  <option value="All">All</option>
                  {buName && <option value={buName}>{buName}</option>}
                </select>
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Branch</label>
                <select className="nx-input" value={form.branchAccess} onChange={(e) => upd({ branchAccess: e.target.value })}>
                  <option value="All">All</option>
                  {branchName && <option value={branchName}>{branchName}</option>}
                </select>
              </div>
            </div>

            {/* OS Role */}
            <div className="nx-field">
              <label className="nx-field-label">OS role</label>
              <select className="nx-input" value={form.osRole} onChange={(e) => upd({ osRole: e.target.value })}>
                {COMMERCE_OS_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="nx-modal-foot">
          <button className="nx-btn nx-btn-secondary nx-btn-md" onClick={onClose}>Cancel</button>
          <button className="nx-btn nx-btn-primary nx-btn-md" onClick={handleSubmit}>Send invite</button>
        </div>
      </div>
    </div>
  );
}
