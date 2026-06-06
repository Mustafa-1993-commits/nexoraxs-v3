"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useApp } from "@/lib/store";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuth } from "@/components/auth/SocialAuth";

function LoginForm() {
  const { loginUser, isAuthenticated, isOnboardingComplete } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowCredentialInput, setAllowCredentialInput] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");
  const [resetBanner, setResetBanner] = useState(searchParams.get("reset") === "success");

  useEffect(() => {
    if (isAuthenticated) {
      if (isOnboardingComplete) router.replace("/dashboard/apps");
      else router.replace("/onboarding");
    }
  }, [isAuthenticated, isOnboardingComplete, router]);

  useEffect(() => {
    if (resetBanner) {
      const t = setTimeout(() => setResetBanner(false), 4000);
      return () => clearTimeout(t);
    }
  }, [resetBanner]);

  function handleEmailContinue(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    setEmail(normalizedEmail);
    setStep("password");
  }

  function handleDifferentMethod() {
    setError("");
    setPassword("");
    setStep("email");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setLoading(true);
    const result = loginUser(email, password);
    setLoading(false);
    if (result === "invalid_credentials") {
      setError("Invalid email or password.");
    }
  }

  return (
    <AuthShell title="Log in" subtitle="Continue to your NexoraXS account">
      {resetBanner && (
        <div className="nx-auth-banner">
          <CheckCircle size={16} />
          Password reset successfully — you can now sign in.
        </div>
      )}

      {step === "email" ? (
        <>
          <form onSubmit={handleEmailContinue} className="nx-auth-form-fields" style={{ marginTop: 4 }}>
            {error && (
              <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
                {error}
              </div>
            )}

            <div className="nx-field">
              <label className="nx-field-label" htmlFor="email">Email</label>
              <input
                id="email"
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
              </span>
            </button>
          </form>

          <SocialAuth />

          <div className="nx-auth-below">
            <span>New to NexoraXS?</span>{" "}
            <Link href="/register" className="nx-auth-arrow-link">
              <span>Get started</span>
              <span className="nx-auth-arrow-link-icon" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  focusable="false"
                >
                  <path
                    d="M4.5 10h9.2m0 0-4.1-4.1M13.7 10l-4.1 4.1"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="nx-auth-form-fields" style={{ marginTop: 4 }}>
        {error && (
          <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
            {error}
          </div>
        )}

        <div className="nx-auth-selected-email">
          <span>{email}</span>
          <button type="button" className="nx-link" onClick={() => { setError(""); setStep("email"); }}>
            Change email
          </button>
        </div>

        <div className="nx-field">
          <label className="nx-field-label" htmlFor="password">Password</label>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            name="password"
            readOnly={!allowCredentialInput}
            value={password}
            onFocus={() => setAllowCredentialInput(true)}
            onPointerDown={() => setAllowCredentialInput(true)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/forgot-password" className="nx-auth-under-link">Forgot password?</Link>
        </div>

        <button type="submit" className="nx-auth-btn nx-auth-btn-has-icon" disabled={loading} style={{ marginTop: 8 }}>
          <span className="nx-auth-btn-content">
            <span className="nx-auth-btn-text">{loading ? "Logging in…" : "Log in"}</span>
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
          </span>
        </button>

        <button type="button" className="nx-auth-method-btn" onClick={handleDifferentMethod}>
          Log in using a different method
        </button>
        </form>
      )}
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
