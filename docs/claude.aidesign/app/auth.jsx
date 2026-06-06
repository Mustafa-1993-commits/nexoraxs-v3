// ============================================================
// NexoraXS — Auth flow (Shopify-inspired: wordmark over white card)
// ============================================================

/* ---------- Shared shell: dark stage, logo, white card, legal ---------- */
function AuthShell({ title, subtitle, children, footer, narrow }) {
  const { nav } = useApp();
  return (
    <div className="nx-auth">
      <div className="nx-auth-glow" />
      <div className={"nx-auth-stage" + (narrow ? " narrow" : "")}>
        <button className="nx-auth-logo" onClick={() => nav("landing")} aria-label="NexoraXS home">
          <img src="assets/nexoraxs-wordmark.png" alt="NexoraXS" />
        </button>
        <div className="nx-auth-card">
          <div className="nx-auth-card-head">
            <h1 className="nx-auth-title">{title}</h1>
            {subtitle && <p className="nx-auth-sub">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="nx-auth-below">{footer}</div>}
        </div>
        <div className="nx-auth-legal">
          By continuing you agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms</a> and <a href="#" onClick={(e) => e.preventDefault()}>Privacy&nbsp;Policy</a>.
        </div>
      </div>
    </div>
  );
}

function pwStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

/* ---------- Password input with show/hide ---------- */
function PasswordInput({ value, onChange, placeholder, error, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <span className="nx-pw-wrap">
      <Input icon="lock" type={show ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} error={error} autoComplete={autoComplete} />
      <button type="button" className="nx-pw-toggle" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} tabIndex={-1}>
        <Icon name={show ? "eye-off" : "eye"} size={17} />
      </button>
    </span>
  );
}

/* ---------- Social auth (UI-only placeholders) ---------- */
function SocialAuth({ verb = "Continue" }) {
  const { showToast } = useApp();
  const soon = (name) => showToast(name + " sign-in is coming soon", "info");
  return (
    <>
      <div className="nx-auth-divider"><span>or</span></div>
      <div className="nx-social-row">
        <button type="button" className="nx-social-btn" onClick={() => soon("Google")} aria-label={verb + " with Google"} title={verb + " with Google"}>
          <svg width="22" height="22" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
          </svg>
        </button>
        <button type="button" className="nx-social-btn" onClick={() => soon("Facebook")} aria-label={verb + " with Facebook"} title={verb + " with Facebook"}>
          <svg width="22" height="22" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#1877F2" d="M18 9a9 9 0 1 0-10.41 8.89v-6.29H5.31V9h2.28V7.02c0-2.25 1.34-3.5 3.4-3.5.98 0 2.01.18 2.01.18v2.21h-1.13c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.6h-2.1v6.29A9 9 0 0 0 18 9z"/>
          </svg>
        </button>
      </div>
    </>
  );
}

/* ---------------- Register ---------------- */
function Register() {
  const { nav, platform } = useApp();
  const [f, setF] = useState({ name: "", email: "", pw: "", pw2: "" });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: null }); };
  const strength = pwStrength(f.pw);
  const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Enter your full name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = "Enter a valid email address";
    if (strength < 2) er.pw = "Use at least 8 characters with a number";
    if (f.pw !== f.pw2) er.pw2 = "Passwords do not match";
    setErr(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    setTimeout(() => {
      const next = platform.createUser({ fullName: f.name.trim(), email: f.email, password: f.pw });
      setLoading(false);
      if (next.authError) {
        setErr({ email: next.authError });
        return;
      }
      // Account created — require email verification, then sign-in.
      platform.logoutUser();
      nav("verify", { email: f.email.trim() });
    }, 500);
  };

  return (
    <AuthShell title="Create your account" subtitle="Start your 14-day free trial of Commerce OS. No credit card required."
      footer={<>Already have an account? <button className="nx-link" onClick={() => nav("login")}>Sign in</button></>}>
      <form onSubmit={submit} className="nx-auth-form-fields">
        <Field label="Full name" error={err.name}>
          <Input icon="user" placeholder="Your full name" value={f.name} onChange={set("name")} error={err.name} />
        </Field>
        <Field label="Work email" error={err.email}>
          <Input icon="mail" placeholder="you@company.com" value={f.email} onChange={set("email")} error={err.email} />
        </Field>
        <Field label="Password" error={err.pw}>
          <PasswordInput placeholder="Create a password" value={f.pw} onChange={set("pw")} error={err.pw} autoComplete="new-password" />
          {f.pw && <>
            <div className="nx-pw-meter">{[0, 1, 2, 3].map((i) => <span key={i} className={"nx-pw-bar" + (i < strength ? " on" + (strength - 1) : "")} />)}</div>
            <div className="nx-pw-label">Password strength: <b style={{ color: "var(--text-2)" }}>{strengthLabels[strength]}</b></div>
          </>}
        </Field>
        <Field label="Confirm password" error={err.pw2}>
          <PasswordInput placeholder="Re-enter your password" value={f.pw2} onChange={set("pw2")} error={err.pw2} autoComplete="new-password" />
        </Field>
        <button type="submit" className="nx-auth-btn" disabled={loading}>{loading ? <span className="nx-spin" /> : "Create account"}</button>
      </form>
      <SocialAuth verb="Sign up" />
    </AuthShell>
  );
}

/* ---------------- Email verification ---------------- */
function Verify() {
  const { nav, route } = useApp();
  const email = route.params.email || "you@company.com";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [state, setState] = useState("waiting");
  const [countdown, setCountdown] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const onChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code]; next[i] = v; setCode(next);
    if (v && i < 5) refs.current[i + 1] && refs.current[i + 1].focus();
    if (next.every((d) => d) && next.join("").length === 6) {
      setTimeout(() => { setState("verified"); setTimeout(() => nav("login", { verified: true, email }), 1300); }, 400);
    }
  };
  const onKey = (i, e) => { if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1].focus(); };

  if (state === "verified") return (
    <AuthShell title="Email verified" subtitle="Your account is ready. Redirecting you to sign in…">
      <div style={{ display: "grid", placeItems: "center", padding: "8px 0 6px" }}>
        <div className="nx-verify-ic" style={{ margin: 0, background: "var(--pos-weak)", color: "var(--pos)" }}><Icon name="check" size={28} /></div>
      </div>
    </AuthShell>
  );
  if (state === "expired") return (
    <AuthShell title="Link expired" subtitle="That verification link is no longer valid. Request a fresh one and we'll send it right away."
      footer={<>Wrong address? <button className="nx-link" onClick={() => nav("register")}>Change email</button></>}>
      <button className="nx-auth-btn" onClick={() => { setState("waiting"); setCountdown(30); }}>Send new link</button>
    </AuthShell>
  );
  return (
    <AuthShell title="Verify your email" subtitle={<>We sent a 6-digit code to <b style={{ color: "var(--text)" }}>{email}</b>.</>}
      footer={<>Wrong address? <button className="nx-link" onClick={() => nav("register")}>Change email</button></>}>
      <div className="nx-code-row">
        {code.map((d, i) => (
          <input key={i} ref={(el) => (refs.current[i] = el)} className="nx-code-box" inputMode="numeric" maxLength={1}
            value={d} onChange={(e) => onChange(i, e.target.value)} onKeyDown={(e) => onKey(i, e)} autoFocus={i === 0} />
        ))}
      </div>
      <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--text-2)", textAlign: "center" }}>
        Didn't get the code?{" "}
        {countdown > 0
          ? <span style={{ color: "var(--text-3)" }}>Resend in {countdown}s</span>
          : <button className="nx-link" onClick={() => setCountdown(30)}>Resend email</button>}
      </div>
      <button className="nx-link" style={{ display: "block", margin: "14px auto 0", color: "var(--text-3)" }} onClick={() => setState("expired")}>Simulate expired link</button>
    </AuthShell>
  );
}

/* ---------------- Login ---------------- */
function Login() {
  const { nav, route, platform } = useApp();
  const [f, setF] = useState({ email: route.params.email || "", pw: "" });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const verified = route.params.verified;

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = "Enter a valid email address";
    if (!f.pw) er.pw = "Enter your password";
    setErr(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    setTimeout(() => {
      const next = platform.loginUser({ email: f.email, password: f.pw });
      setLoading(false);
      if (next.authError) {
        setErr({ email: next.authError });
        return;
      }
      const dest = platform.authDestination(next);
      let seen = false;
      try { seen = sessionStorage.getItem("nexoraxs.session.hasSeenWelcome") === "1"; } catch (e) {}
      if (dest === "workspace-welcome" && !seen) { nav("welcome"); return; }
      nav(dest);
    }, 500);
  };

  return (
    <AuthShell title="Log in" subtitle="Continue to your NexoraXS workspace"
      footer={<>New to NexoraXS? <button className="nx-link" onClick={() => nav("register")}>Create an account</button></>}>
      {verified && (
        <div className="nx-auth-banner"><Icon name="check-circle-2" size={16} />Email verified — sign in to continue.</div>
      )}
      <form onSubmit={submit} className="nx-auth-form-fields">
        <Field label="Email" error={err.email}>
          <Input icon="mail" placeholder="you@company.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} />
        </Field>
        <Field label={<span style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>Password <button type="button" className="nx-link" onClick={() => nav("forgot")}>Forgot password?</button></span>} error={err.pw}>
          <PasswordInput placeholder="Enter your password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} error={err.pw} autoComplete="current-password" />
        </Field>
        <button type="submit" className="nx-auth-btn" disabled={loading}>{loading ? <span className="nx-spin" /> : "Log in"}</button>
      </form>
      <SocialAuth verb="Continue" />
    </AuthShell>
  );
}

/* ---------------- Forgot password ---------------- */
function Forgot() {
  const { nav, platform } = useApp();
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState("request"); // request | sent | noaccount
  const [err, setErr] = useState(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr("Enter a valid email address"); return; }
    const user = platform.db ? window.NexoraDB.Q.findUserByEmail(platform.db, email) : null;
    if (!user) { setStage("noaccount"); return; }
    setStage("sent"); setCountdown(30);
  };

  const onCode = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code]; next[i] = v; setCode(next);
    if (v && i < 5) refs.current[i + 1] && refs.current[i + 1].focus();
    if (next.every((d) => d) && next.join("").length === 6) {
      setTimeout(() => nav("reset"), 350);
    }
  };
  const onKey = (i, e) => { if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1].focus(); };

  if (stage === "noaccount") return (
    <AuthShell title="No account found" subtitle={<>We couldn't find an account for <b style={{ color: "var(--text)" }}>{email}</b>. Check the address or create a new account.</>}
      footer={<>Remembered it? <button className="nx-link" onClick={() => nav("login")}>Back to sign in</button></>}>
      <div className="nx-auth-banner" style={{ background: "var(--danger-weak)", borderColor: "#f3d4cf", color: "var(--danger)" }}>
        <Icon name="alert-circle" size={16} />This email isn't registered yet.
      </div>
      <button className="nx-auth-btn" onClick={() => nav("register")}>Create an account</button>
      <button className="nx-auth-btn nx-auth-btn-soft" style={{ marginTop: 10 }} onClick={() => { setStage("request"); setErr(null); }}>Try another email</button>
    </AuthShell>
  );

  if (stage === "sent") return (
    <AuthShell title="Enter reset code" subtitle={<>We sent a 6-digit code to <b style={{ color: "var(--text)" }}>{email}</b>. Enter it to reset your password.</>}
      footer={<>Wrong address? <button className="nx-link" onClick={() => { setStage("request"); setCode(["", "", "", "", "", ""]); }}>Change email</button></>}>
      <div className="nx-code-row">
        {code.map((d, i) => (
          <input key={i} ref={(el) => (refs.current[i] = el)} className="nx-code-box" inputMode="numeric" maxLength={1}
            value={d} onChange={(e) => onCode(i, e.target.value)} onKeyDown={(e) => onKey(i, e)} autoFocus={i === 0} />
        ))}
      </div>
      <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--text-2)", textAlign: "center" }}>
        Didn't get the code?{" "}
        {countdown > 0
          ? <span style={{ color: "var(--text-3)" }}>Resend in {countdown}s</span>
          : <button className="nx-link" onClick={() => setCountdown(30)}>Resend code</button>}
      </div>
    </AuthShell>
  );

  return (
    <AuthShell title="Reset your password" subtitle="Enter the email linked to your account and we'll send you a reset code."
      footer={<>Remembered it? <button className="nx-link" onClick={() => nav("login")}>Back to sign in</button></>}>
      <form onSubmit={submit} className="nx-auth-form-fields">
        <Field label="Email" error={err}>
          <Input icon="mail" placeholder="you@company.com" value={email} onChange={(e) => { setEmail(e.target.value); setErr(null); }} error={err} />
        </Field>
        <button type="submit" className="nx-auth-btn">Send code</button>
      </form>
    </AuthShell>
  );
}

/* ---------------- Reset password ---------------- */
function Reset() {
  const { nav } = useApp();
  const [f, setF] = useState({ pw: "", pw2: "" });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const [expired, setExpired] = useState(false);
  const strength = pwStrength(f.pw);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (strength < 2) er.pw = "Use at least 8 characters with a number";
    if (f.pw !== f.pw2) er.pw2 = "Passwords do not match";
    setErr(er); if (Object.keys(er).length) return;
    setDone(true);
  };
  if (expired) return (
    <AuthShell title="Invalid or expired link" subtitle="This password reset link is no longer valid. Request a new one to continue.">
      <button className="nx-auth-btn" onClick={() => nav("forgot")}>Request new link</button>
    </AuthShell>
  );
  if (done) return (
    <AuthShell title="Password updated" subtitle="Your password has been changed. You can now sign in with your new password.">
      <button className="nx-auth-btn" onClick={() => nav("login")}>Continue to sign in</button>
    </AuthShell>
  );
  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you haven't used before."
      footer={<button className="nx-link" style={{ color: "var(--text-3)" }} onClick={() => setExpired(true)}>Simulate expired link</button>}>
      <form onSubmit={submit} className="nx-auth-form-fields">
        <Field label="New password" error={err.pw}>
          <PasswordInput placeholder="Create a password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} error={err.pw} autoComplete="new-password" />
          {f.pw && <div className="nx-pw-meter">{[0, 1, 2, 3].map((i) => <span key={i} className={"nx-pw-bar" + (i < strength ? " on" + (strength - 1) : "")} />)}</div>}
        </Field>
        <Field label="Confirm new password" error={err.pw2}>
          <PasswordInput placeholder="Re-enter your password" value={f.pw2} onChange={(e) => setF({ ...f, pw2: e.target.value })} error={err.pw2} autoComplete="new-password" />
        </Field>
        <button type="submit" className="nx-auth-btn">Update password</button>
      </form>
    </AuthShell>
  );
}

/* ---------------- Post-auth welcome (first-time only) ---------------- */
function Welcome() {
  const { nav } = useApp();
  const start = () => {
    try { sessionStorage.setItem("nexoraxs.session.hasSeenWelcome", "1"); } catch (e) {}
    nav("workspace-welcome");
  };
  return (
    <div className="nx-auth">
      <div className="nx-auth-glow" />
      <div className="nx-auth-stage">
        <div className="nx-auth-card nx-welcome-card nx-gateway-card">
          <div className="nx-gateway-head">
            <div className="nx-welcome-art" aria-hidden="true">
              <span className="nx-welcome-ring" />
              <span className="nx-welcome-grid">
                {Array.from({ length: 9 }).map((_, i) => <i key={i} />)}
              </span>
              <span className="nx-welcome-badge"><Icon name="check" size={20} /></span>
            </div>
            <span className="nx-gateway-eyebrow">Core platform · Workspace setup</span>
            <h1 className="nx-auth-title" style={{ textAlign: "center" }}>Your NexoraXS workspace is ready</h1>
            <p className="nx-auth-sub" style={{ textAlign: "center", margin: "8px auto 0", maxWidth: 380 }}>
              Let's set up your workspace, main branch, and first operating system.
            </p>
          </div>

          <div className="nx-gateway-checklist">
            {[
              { ic: "building-2", label: "Workspace", desc: "Your company home" },
              { ic: "map-pin", label: "Main branch", desc: "Your first location" },
              { ic: "layout-grid", label: "First operating system", desc: "Start with Commerce OS" },
            ].map((row) => (
              <div className="nx-gateway-row" key={row.label}>
                <span className="nx-gateway-row-ic"><Icon name={row.ic} size={17} /></span>
                <div className="nx-gateway-row-txt">
                  <span className="nx-gateway-row-label">{row.label}</span>
                  <span className="nx-gateway-row-desc">{row.desc}</span>
                </div>
                <Icon name="circle-dashed" size={16} className="nx-gateway-row-state" />
              </div>
            ))}
          </div>

          <button className="nx-auth-btn" onClick={start}>Start setup</button>
          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--text-3)", marginTop: 14 }}>You can change these details later.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Register, Verify, Login, Forgot, Reset, AuthShell, Welcome });
