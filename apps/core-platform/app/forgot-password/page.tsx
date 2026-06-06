"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // mock delay
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <AuthShell
      title={submitted ? "Check your inbox" : "Reset your password"}
      subtitle={submitted ? undefined : "Enter your email and we'll send you a reset link."}
      narrow
    >
      {submitted ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 20 }}>
            We sent a reset link to <strong>{email}</strong>. It may take a few minutes to arrive.
          </p>
          <Link href="/reset-password" className="nx-auth-btn" style={{ display: "flex", justifyContent: "center", marginBottom: 16, textDecoration: "none" }}>
            Enter reset link manually
          </Link>
          <div className="nx-auth-below" style={{ marginTop: 8 }}>
            <Link href="/login" className="nx-link">Back to sign in</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="nx-auth-form-fields">
          <div className="nx-field">
            <label className="nx-field-label" htmlFor="email">Email address</label>
            <input
              id="email"
              className="nx-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="nx-auth-btn" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </button>
          <div className="nx-auth-below" style={{ marginTop: 8 }}>
            <Link href="/login" className="nx-link">Back to sign in</Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
