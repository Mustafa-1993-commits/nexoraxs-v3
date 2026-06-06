// ============================================================
// NexoraXS — Shared UI kit
// ============================================================

/* ---------- Icon (Lucide UMD) ---------- */
const Icon = ({ name, size = 18, className = "", strokeWidth = 1.75, style }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const toPascal = (s) => s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
      const def = window.lucide.icons[toPascal(name)] || window.lucide.icons.Circle;
      const svg = window.lucide.createElement(def);
      svg.setAttribute("width", size); svg.setAttribute("height", size);
      svg.setAttribute("stroke-width", strokeWidth);
      ref.current.appendChild(svg);
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} className={"nx-icon " + className} style={{ display: "inline-flex", ...style }}></span>;
};

/* ---------- Logo ---------- */
// light=true surfaces (dark backgrounds) use the real brand wordmark image.
const Logo = ({ light = false, size = 30, showText = true }) => {
  if (light && showText) {
    return <img src="assets/nexoraxs-wordmark.png" alt="NexoraXS" style={{ height: size * 1.04, width: "auto", display: "block" }} />;
  }
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <span style={{
        width: size, height: size, borderRadius: size * 0.28, display: "grid", placeItems: "center",
        background: "linear-gradient(135deg,#3b82f6,#6d4ae6 55%,#7c3aed)",
        boxShadow: "0 4px 14px -4px rgba(99,80,230,.55), inset 0 1px 0 rgba(255,255,255,.28)", flexShrink: 0,
      }}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
          <path d="M5 19V5l14 14V5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showText && (
        <span style={{ fontWeight: 800, fontSize: size * 0.6, letterSpacing: "-0.02em", color: light ? "#fff" : "var(--text)" }}>
          Nexora<span style={{ background: "linear-gradient(120deg,#3b82f6,#7c3aed)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>XS</span>
        </span>
      )}
    </div>
  );
};

/* ---------- Button ---------- */
const Button = ({ children, variant = "primary", size = "md", icon, iconRight, full, className = "", disabled, ...rest }) => {
  const base = "nx-btn nx-btn-" + variant + " nx-btn-" + size + (full ? " nx-btn-full" : "") + (disabled ? " nx-btn-disabled" : "");
  return (
    <button className={base + " " + className} disabled={disabled} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </button>
  );
};

/* ---------- Field / Input ---------- */
const Field = ({ label, hint, error, optional, children, className = "" }) => (
  <label className={"nx-field " + className}>
    {label && (
      <span className="nx-field-label">
        {label}{optional && <span className="nx-field-optional">Optional</span>}
      </span>
    )}
    {children}
    {error ? <span className="nx-field-error"><Icon name="alert-circle" size={13} />{error}</span>
      : hint ? <span className="nx-field-hint">{hint}</span> : null}
  </label>
);
const Input = React.forwardRef(({ icon, error, ...rest }, ref) => (
  <span className={"nx-input-wrap" + (error ? " nx-input-error" : "")}>
    {icon && <Icon name={icon} size={16} className="nx-input-icon" />}
    <input ref={ref} className="nx-input" {...rest} />
  </span>
));
const Select = ({ children, ...rest }) => (
  <span className="nx-input-wrap nx-select-wrap">
    <select className="nx-input nx-select" {...rest}>{children}</select>
    <Icon name="chevron-down" size={15} className="nx-select-chev" />
  </span>
);
const Textarea = (props) => <textarea className="nx-input nx-textarea" {...props} />;

/* ---------- Toggle ---------- */
const Toggle = ({ checked, onChange, disabled }) => (
  <button type="button" disabled={disabled} onClick={() => !disabled && onChange(!checked)}
    className={"nx-toggle" + (checked ? " on" : "") + (disabled ? " disabled" : "")} aria-pressed={checked}>
    <span className="nx-toggle-knob" />
  </button>
);

/* ---------- Badge ---------- */
const Badge = ({ children, tone = "neutral", dot, icon }) => (
  <span className={"nx-badge tone-" + tone}>
    {dot && <span className="nx-badge-dot" />}
    {icon && <Icon name={icon} size={12} />}
    {children}
  </span>
);

/* ---------- Card ---------- */
const Card = ({ children, className = "", pad = true, ...rest }) => (
  <div className={"nx-card" + (pad ? " nx-card-pad" : "") + " " + className} {...rest}>{children}</div>
);

/* ---------- Modal ---------- */
const Modal = ({ open, onClose, children, width = 520, title, subtitle, footer }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && open) onClose && onClose(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="nx-modal-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className="nx-modal nx-pop" style={{ maxWidth: width }}>
        {(title || onClose) && (
          <div className="nx-modal-head">
            <div>
              {title && <h3 className="nx-modal-title">{title}</h3>}
              {subtitle && <p className="nx-modal-sub">{subtitle}</p>}
            </div>
            {onClose && <button className="nx-icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>}
          </div>
        )}
        <div className="nx-modal-body">{children}</div>
        {footer && <div className="nx-modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

/* ---------- Empty state ---------- */
const EmptyState = ({ icon = "inbox", title, desc, action }) => (
  <div className="nx-empty">
    <div className="nx-empty-ic"><Icon name={icon} size={26} /></div>
    <h3 className="nx-empty-title">{title}</h3>
    {desc && <p className="nx-empty-desc">{desc}</p>}
    {action && <div style={{ marginTop: 18 }}>{action}</div>}
  </div>
);

/* ---------- Stepper ---------- */
const Stepper = ({ steps, current }) => (
  <div className="nx-stepper">
    {steps.map((s, i) => (
      <div key={s} className={"nx-step" + (i === current ? " current" : i < current ? " done" : "")}>
        <span className="nx-step-dot">{i < current ? <Icon name="check" size={13} /> : i + 1}</span>
        <span className="nx-step-label">{s}</span>
        {i < steps.length - 1 && <span className="nx-step-line" />}
      </div>
    ))}
  </div>
);

/* ---------- Stat tile ---------- */
const Stat = ({ label, value, delta, deltaTone = "pos", icon, sub }) => (
  <Card className="nx-stat">
    <div className="nx-stat-top">
      <span className="nx-stat-label">{label}</span>
      {icon && <span className="nx-stat-ic"><Icon name={icon} size={16} /></span>}
    </div>
    <div className="nx-stat-value">{value}</div>
    <div className="nx-stat-foot">
      {delta && <span className={"nx-stat-delta " + deltaTone}><Icon name={deltaTone === "pos" ? "trending-up" : "trending-down"} size={13} />{delta}</span>}
      {sub && <span className="nx-stat-sub">{sub}</span>}
    </div>
  </Card>
);

/* ---------- Avatar ---------- */
const Avatar = ({ name, size = 34, color }) => {
  const initials = (name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = ["#4f46e5", "#0d9488", "#d97706", "#db2777", "#7c3aed", "#0891b2"];
  const c = color || colors[(name || "").length % colors.length];
  return (
    <span style={{ width: size, height: size, borderRadius: size, background: c + "1f", color: c,
      display: "grid", placeItems: "center", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
      border: "1px solid " + c + "33" }}>{initials}</span>
  );
};

/* ---------- Toast host ---------- */
const ToastHost = () => {
  const { toast } = useApp();
  if (!toast) return null;
  const tone = toast.kind;
  return (
    <div className="nx-toast-host">
      <div className={"nx-toast nx-pop tone-" + tone}>
        <Icon name={tone === "success" ? "check-circle-2" : tone === "error" ? "x-circle" : "info"} size={17} />
        <span>{toast.msg}</span>
      </div>
    </div>
  );
};

/* ---------- Logo upload card ---------- */
const LogoUpload = ({ value, onChange, businessName }) => {
  const fileRef = useRef(null);
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(f);
  };
  return (
    <div className="nx-logo-upload">
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
      {value ? (
        <div className="nx-logo-have">
          <img src={value} alt="logo" />
          <div className="nx-logo-have-actions">
            <button className="nx-link" onClick={() => fileRef.current.click()}>Replace</button>
            <button className="nx-link danger" onClick={() => onChange(null)}>Remove</button>
          </div>
        </div>
      ) : (
        <button className="nx-logo-drop" onClick={() => fileRef.current.click()}>
          <span className="nx-logo-drop-ic"><Icon name="image-up" size={22} /></span>
          <span className="nx-logo-drop-t">Upload logo</span>
          <span className="nx-logo-drop-s">PNG or SVG, transparent · up to 2&nbsp;MB</span>
        </button>
      )}
    </div>
  );
};

/* ---------- Brand mark (deterministic placeholder logo) ---------- */
const BrandMark = ({ name = "M", logo, size = 40, radius = 10 }) => {
  if (logo) return <img src={logo} alt="" style={{ width: size, height: size, borderRadius: radius, objectFit: "cover" }} />;
  return (
    <span style={{ width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: "linear-gradient(140deg,#0f766e,#0d9488)", color: "#fff", display: "grid",
      placeItems: "center", fontWeight: 800, fontSize: size * 0.42, letterSpacing: "-0.02em" }}>
      {(name || "M").trim().charAt(0).toUpperCase()}
    </span>
  );
};

Object.assign(window, {
  Icon, Logo, Button, Field, Input, Select, Textarea, Toggle, Badge, Card, Modal,
  EmptyState, Stepper, Stat, Avatar, ToastHost, LogoUpload, BrandMark,
});
