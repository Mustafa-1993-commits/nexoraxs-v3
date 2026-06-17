"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { SocialAuth } from "@/components/auth/SocialAuth";

function AuthButtonArrow() {
  return (
    <span className="nx-auth-btn-hover-icon" aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        focusable="false"
      >
        <path
          d="M4.5 10h9.2m0 0-4.1-4.1M13.7 10l-4.1 4.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function RegisterPage() {
  const { createUser, isAuthenticated } = useApp();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowCredentialInput, setAllowCredentialInput] = useState(false);
  const [step, setStep] = useState<"email" | "details">("email");

  useEffect(() => {
    if (isAuthenticated && step === "email") router.replace("/welcome");
  }, [isAuthenticated, router, step]);

  if (isAuthenticated) return null;

  function validateEmail(): string {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
    return "";
  }

  function validateDetails(): string {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  }

  function handleEmailContinue(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const err = validateEmail();
    if (err) {
      setError(err);
      return;
    }
    setEmail(email.trim());
    setStep("details");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const err = validateDetails();
    if (err) { setError(err); return; }
    setLoading(true);
    const fullName = `${firstName} ${lastName}`.trim();
    const result = createUser({ fullName: fullName.trim(), email, password });
    setLoading(false);
    if (result === "email_taken") {
      setError("An account with this email already exists.");
    } else {
      router.push("/verify");
    }
  }

  return (
    <AuthShell
      title="Start your free trial"
      subtitle={step === "email" ? "Create your NexoraXS account and set up your workspace." : "Create your NexoraXS account"}
    >
      {step === "email" ? (
        <>
          <form onSubmit={handleEmailContinue} className="nx-auth-form-fields" style={{ marginTop: 4 }} data-testid="core-register-form">
            {error && (
              <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
                {error}
              </div>
            )}

            <div className="nx-field">
              <label className="nx-field-label" htmlFor="register-email">Email</label>
              <input
                id="register-email"
                className="nx-input"
                type="email"
                autoComplete="email"
                name="email"
                readOnly={!allowCredentialInput}
                value={email}
                onFocus={() => setAllowCredentialInput(true)}
                onPointerDown={() => setAllowCredentialInput(true)}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="nx-auth-btn nx-auth-btn-has-icon" style={{ marginTop: 8 }}>
              <span className="nx-auth-btn-content">
                <span className="nx-auth-btn-text">Continue with email</span>
                <AuthButtonArrow />
              </span>
            </button>
          </form>

          <SocialAuth />

          <div className="nx-auth-below">
            Already have a NexoraXS account?{" "}
            <Link href="/login" className="nx-link">Log in</Link>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="nx-auth-form-fields" style={{ marginTop: 4 }} data-testid="core-register-form">
          {error && (
            <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
              {error}
            </div>
          )}

          <div className="nx-auth-selected-email">
            <span>{email}</span>
            <button type="button" className="nx-link" onClick={() => { setError(""); setStep("email"); }}>
              Change
            </button>
          </div>

          <div className="nx-auth-section-title">Create an account</div>

          <div className="nx-auth-name-grid">
            <div className="nx-field">
              <label className="nx-field-label" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                className="nx-input"
                type="text"
                autoComplete="given-name"
                name="given-name"
                readOnly={!allowCredentialInput}
                value={firstName}
                onFocus={() => setAllowCredentialInput(true)}
                onPointerDown={() => setAllowCredentialInput(true)}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="nx-field">
              <label className="nx-field-label" htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                className="nx-input"
                type="text"
                autoComplete="family-name"
                name="family-name"
                readOnly={!allowCredentialInput}
                value={lastName}
                onFocus={() => setAllowCredentialInput(true)}
                onPointerDown={() => setAllowCredentialInput(true)}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="nx-field">
            <label className="nx-field-label" htmlFor="password">Password</label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              name="new-password"
              readOnly={!allowCredentialInput}
              value={password}
              onFocus={() => setAllowCredentialInput(true)}
              onPointerDown={() => setAllowCredentialInput(true)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordStrength password={password} />
          </div>

          <div className="nx-field">
            <label className="nx-field-label" htmlFor="confirm">Confirm password</label>
            <PasswordInput
              id="confirm"
              autoComplete="new-password"
              name="confirm-password"
              readOnly={!allowCredentialInput}
              value={confirm}
              onFocus={() => setAllowCredentialInput(true)}
              onPointerDown={() => setAllowCredentialInput(true)}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="nx-auth-btn nx-auth-btn-has-icon" disabled={loading} style={{ marginTop: 8 }}>
            <span className="nx-auth-btn-content">
              <span className="nx-auth-btn-text">{loading ? "Creating account…" : "Create account"}</span>
              <AuthButtonArrow />
            </span>
          </button>
        </form>
      )}
    </AuthShell>
  );
}
