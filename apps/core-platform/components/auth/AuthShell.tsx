"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { NexoraLogo } from "@nexoraxs/ui";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}

export function AuthShell({ title, subtitle, footer, narrow, children }: AuthShellProps) {
  return (
    <div className="nx-auth">
      <div className="nx-auth-glow" />

      <div className={`nx-auth-stage${narrow ? " narrow" : ""}`}>
        {/* Logo wordmark */}
        <Link href="/" className="nx-auth-logo" style={{ textDecoration: "none" }}>
          <NexoraLogo variant="top" className="nx-auth-logo-img" />
        </Link>

        {/* Auth card */}
        <div className="nx-auth-card nx-pop">
          <div className="nx-auth-card-head">
            <div className="nx-auth-title">{title}</div>
            {subtitle && <div className="nx-auth-sub">{subtitle}</div>}
          </div>
          {children}
          {footer && <div className="nx-auth-below">{footer}</div>}
        </div>

        <p className="nx-auth-legal">
          By continuing, you agree to NexoraXS&apos;s{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
