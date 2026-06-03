"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@nexoraxs/ui";
import {
  getIdentity,
  setIdentity,
  subscribeToIdentity,
  DEFAULT_IDENTITY,
  type BusinessIdentity,
} from "@/lib/settings-store";
import { getLocale, subscribeToLocale, tSettings } from "@/lib/locale";

function useIdentity(): BusinessIdentity {
  const stored = useSyncExternalStore(subscribeToIdentity, getIdentity, () => null);
  return stored ?? DEFAULT_IDENTITY;
}

function useLocale() {
  return useSyncExternalStore(subscribeToLocale, getLocale, () => "en" as const);
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, required, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="ms-1 text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
    />
  );
}

export function BusinessIdentityForm() {
  const saved = useIdentity();
  const locale = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(saved.displayName);
  const [legalName, setLegalName] = useState(saved.legalName ?? "");
  const [logoState, setLogoState] = useState<"none" | "mock">(saved.logoState);
  const [logoFileName, setLogoFileName] = useState(saved.logoFileName ?? "");
  const [phone, setPhone] = useState(saved.phone);
  const [email, setEmail] = useState(saved.email);
  const [address, setAddress] = useState(saved.address);
  const [taxNumber, setTaxNumber] = useState(saved.taxNumber ?? "");
  const [commercialReg, setCommercialReg] = useState(saved.commercialReg ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved_, setSaved] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!displayName.trim()) errs.displayName = "Business display name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (!email.trim()) errs.email = "Email address is required.";
    else if (!email.includes("@") || !email.includes(".")) errs.email = "Enter a valid email address.";
    if (!address.trim()) errs.address = "Address is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    setIdentity({
      displayName: displayName.trim(),
      legalName: legalName.trim() || undefined,
      logoState,
      logoFileName: logoState === "mock" ? logoFileName : undefined,
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      taxNumber: taxNumber.trim() || undefined,
      commercialReg: commercialReg.trim() || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoState("mock");
      setLogoFileName(file.name);
    }
  }

  function handleRemoveLogo() {
    setLogoState("none");
    setLogoFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const initials = displayName.trim().slice(0, 2).toUpperCase() || "BN";

  return (
    <div className="space-y-6">
      <section className="card p-6 space-y-5">
        <div>
          <p className="chip mb-1 text-gray-500">{"// business identity"}</p>
          <h2 className="text-lg font-semibold text-white">{tSettings("settings.identity.title", locale)}</h2>
          <p className="mt-1 text-sm text-gray-400">
            This information appears on all receipts and tax invoices.
          </p>
        </div>

        {/* Logo */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/80">{tSettings("settings.identity.logo", locale)}</label>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] text-lg font-bold text-white/60">
              {initials}
            </div>
            <div className="space-y-1">
              {logoState === "mock" ? (
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                    {logoFileName}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon name="download" className="h-3.5 w-3.5" />
                  Upload Logo
                </button>
              )}
              <p className="text-xs text-gray-600">PNG, JPG or SVG · Mock upload only</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={tSettings("settings.identity.displayName", locale)} required error={errors.displayName}>
            <TextInput
              value={displayName}
              onChange={setDisplayName}
              placeholder="e.g. Mustafa's Pharmacy"
            />
          </Field>
          <Field label={tSettings("settings.identity.legalName", locale)}>
            <TextInput
              value={legalName}
              onChange={setLegalName}
              placeholder="Optional · Full legal entity name"
            />
          </Field>
          <Field label={tSettings("settings.identity.phone", locale)} required error={errors.phone}>
            <TextInput
              value={phone}
              onChange={setPhone}
              placeholder="+20 10 0000 0000"
              type="tel"
            />
          </Field>
          <Field label={tSettings("settings.identity.email", locale)} required error={errors.email}>
            <TextInput
              value={email}
              onChange={setEmail}
              placeholder="info@yourbusiness.com"
              type="email"
            />
          </Field>
        </div>

        <Field label={tSettings("settings.identity.address", locale)} required error={errors.address}>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, Country"
            rows={2}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06] resize-none"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={tSettings("settings.identity.taxNumber", locale)}>
            <TextInput
              value={taxNumber}
              onChange={setTaxNumber}
              placeholder="Optional"
            />
          </Field>
          <Field label={tSettings("settings.identity.commercialReg", locale)}>
            <TextInput
              value={commercialReg}
              onChange={setCommercialReg}
              placeholder="Optional"
            />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          {tSettings("settings.common.save", locale)}
        </button>
        {saved_ && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <Icon name="check-circle" className="h-4 w-4" />
            {tSettings("settings.common.saved", locale)}
          </span>
        )}
      </div>
    </div>
  );
}
