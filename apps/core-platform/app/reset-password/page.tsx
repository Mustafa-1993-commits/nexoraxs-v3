"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push("/login?reset=success");
  }

  return (
    <AuthShell title="Set new password" subtitle="Choose a strong password for your account." narrow>
      <form onSubmit={handleSubmit} className="nx-auth-form-fields">
        {error && (
          <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
            {error}
          </div>
        )}
        <div className="nx-field">
          <label className="nx-field-label" htmlFor="password">New password</label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength password={password} />
        </div>
        <div className="nx-field">
          <label className="nx-field-label" htmlFor="confirm">Confirm password</label>
          <PasswordInput
            id="confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button type="submit" className="nx-auth-btn" disabled={loading}>
          {loading ? "Saving…" : "Set new password"}
        </button>
        <div className="nx-auth-below" style={{ marginTop: 8 }}>
          <Link href="/login" className="nx-link">Back to sign in</Link>
        </div>
      </form>
    </AuthShell>
  );
}
