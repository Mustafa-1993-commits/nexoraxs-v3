"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";

const CODE_LENGTH = 6;
const MOCK_RESET_CODE = "123456";
const AUTO_VERIFY_DELAY_MS = 150;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [step, setStep] = useState<"request" | "code" | "password">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array.from({ length: CODE_LENGTH }, () => ""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const codeValue = code.join("");

  useEffect(() => {
    if (step !== "code" || codeValue.length !== CODE_LENGTH) return;
    const timer = window.setTimeout(() => {
      if (codeValue === MOCK_RESET_CODE) {
        setError("");
        setStep("password");
        return;
      }
      setError("Invalid reset code. Please try again.");
    }, AUTO_VERIFY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [codeValue, step]);

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  }

  function validateEmail(): string {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
    return "";
  }

  async function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setEmail(email.trim());
    setLoading(false);
    setStep("code");
  }

  function handleCodeChange(index: number, value: string) {
    setError("");
    const digit = value.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < CODE_LENGTH - 1) focusInput(index + 1);
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace") return;
    if (code[index]) {
      setCode((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    if (index > 0) focusInput(index - 1);
  }

  function handleCodePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    setError("");
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    setCode(Array.from({ length: CODE_LENGTH }, (_, index) => pasted[index] ?? ""));
    focusInput(Math.min(pasted.length, CODE_LENGTH) - 1);
  }

  function handleChangeEmail() {
    setError("");
    setCode(Array.from({ length: CODE_LENGTH }, () => ""));
    setPassword("");
    setConfirm("");
    setStep("request");
  }

  function handleResendCode() {
    setError("");
    setCode(Array.from({ length: CODE_LENGTH }, () => ""));
    focusInput(0);
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("New password is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push("/login?reset=success");
  }

  return (
    <AuthShell
      title={step === "request" ? "Reset your password" : step === "code" ? "Enter reset code" : "Create a new password"}
      subtitle={
        step === "request"
          ? "Enter your email and we'll send you a 6-digit reset code."
          : step === "code"
            ? `We sent a 6-digit reset code to ${email}.`
            : `Choose a new password for ${email}.`
      }
      narrow
    >
      {step === "request" ? (
        <form onSubmit={handleRequestSubmit} className="nx-auth-form-fields">
          {error && (
            <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
              {error}
            </div>
          )}
          <div className="nx-field">
            <label className="nx-field-label" htmlFor="email">Email address</label>
            <input
              id="email"
              className="nx-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="nx-auth-btn" disabled={loading}>
            {loading ? "Sending…" : "Send reset code"}
          </button>
          <div className="nx-auth-below" style={{ marginTop: 8 }}>
            <Link href="/login" className="nx-link">Back to sign in</Link>
          </div>
        </form>
      ) : step === "code" ? (
        <form onSubmit={(e) => e.preventDefault()} className="nx-auth-form-fields">
          {error && (
            <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
              {error}
            </div>
          )}

          <div className="nx-auth-otp" aria-label="Reset code">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                className="nx-auth-otp-input"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                onPaste={handleCodePaste}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <div className="nx-auth-verify-actions">
            <button type="button" className="nx-link" onClick={handleResendCode}>Resend code</button>
            <span aria-hidden="true">·</span>
            <button type="button" className="nx-link" onClick={handleChangeEmail}>Change email</button>
          </div>

          <div className="nx-auth-below" style={{ marginTop: 8 }}>
            <Link href="/login" className="nx-link">Back to sign in</Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} className="nx-auth-form-fields">
          {error && (
            <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "var(--danger)", color: "var(--danger)" }}>
              {error}
            </div>
          )}

          <div className="nx-field">
            <label className="nx-field-label" htmlFor="new-password">New password</label>
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordStrength password={password} />
          </div>

          <div className="nx-field">
            <label className="nx-field-label" htmlFor="confirm-password">Confirm password</label>
            <PasswordInput
              id="confirm-password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="nx-auth-btn" disabled={loading}>
            {loading ? "Resetting…" : "Reset password"}
          </button>

          <button type="button" className="nx-auth-under-link" onClick={handleChangeEmail}>
            Use a different email
          </button>

          <div className="nx-auth-below" style={{ marginTop: 8 }}>
            <Link href="/login" className="nx-link">Back to sign in</Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
