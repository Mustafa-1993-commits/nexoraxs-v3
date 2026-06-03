"use client";

import { useMemo } from "react";
import type { TemplateType, TemplateStyle, BusinessIdentity } from "@/lib/settings-store";
import { MOCK_PREVIEW_ITEMS, MOCK_IDENTITY, MOCK_DISCOUNT_RATE, type PreviewLineItem } from "@/lib/mock-data/preview-cart";

// ── Types ──────────────────────────────────────────────────────────────────

export interface TemplatePreviewData {
  business: BusinessIdentity | null;
  taxRegistered: boolean;
  taxRate: number;
  invoiceNumber: string;
  date: string;
}

interface DocumentPreviewProps {
  templateType: TemplateType;
  style: TemplateStyle;
  previewData: TemplatePreviewData;
  locale: "en" | "ar";
}

// ── Helpers ────────────────────────────────────────────────────────────────

const WIDTH_CLASS: Record<TemplateType, string> = {
  "receipt-58": "w-[220px]",
  "receipt-80": "w-[302px]",
  "invoice-a4": "w-full max-w-[794px]",
  "refund":     "w-[302px]",
};

function fmt(n: number) {
  return n.toFixed(2);
}

function BusinessBlock({
  business,
  style,
  templateType,
}: {
  business: NonNullable<TemplatePreviewData["business"]> | typeof MOCK_IDENTITY;
  style: TemplateStyle;
  templateType: TemplateType;
}) {
  const initials = business.displayName.slice(0, 2).toUpperCase();
  const isDetailed = style === "detailed";
  const isA4 = templateType === "invoice-a4";

  return (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-800 text-sm font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="font-bold text-gray-900">{business.displayName}</div>
          {isDetailed && business.legalName && (
            <div className="text-xs text-gray-500">{business.legalName}</div>
          )}
        </div>
      </div>
      {(isDetailed || isA4) && (
        <div className="space-y-0.5 text-xs text-gray-500">
          {business.address && <div>{business.address}</div>}
          {business.phone && <div>{business.phone}</div>}
          {business.email && <div>{business.email}</div>}
          {business.taxNumber && <div>Tax Reg: {business.taxNumber}</div>}
          {isA4 && business.commercialReg && <div>CR: {business.commercialReg}</div>}
        </div>
      )}
      {style === "classic" && (
        <div className="mt-1 space-y-0.5 text-xs text-gray-500">
          {business.address && <div>{business.address}</div>}
        </div>
      )}
    </div>
  );
}

function ItemsTable({
  items,
  style,
}: {
  items: PreviewLineItem[];
  style: TemplateStyle;
}) {
  if (style === "detailed") {
    return (
      <table className="w-full text-xs text-gray-700">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-1 text-start font-medium">Item</th>
            <th className="pb-1 text-end font-medium">Qty</th>
            <th className="pb-1 text-end font-medium">Price</th>
            <th className="pb-1 text-end font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b border-gray-100">
              <td className="py-1 text-start">{item.name}</td>
              <td className="py-1 text-end">{item.quantity}</td>
              <td className="py-1 text-end">{fmt(item.unitPrice)}</td>
              <td className="py-1 text-end">{fmt(item.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="space-y-1 text-xs text-gray-700">
      {items.map((item) => (
        <div
          key={item.name}
          className={[
            "flex justify-between",
            style === "classic" ? "border-b border-gray-100 pb-1" : "",
          ].join(" ")}
        >
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>{fmt(item.lineTotal)}</span>
        </div>
      ))}
    </div>
  );
}

function Totals({
  subtotal,
  discountAmount,
  afterDiscount,
  taxAmount,
  total,
  taxRate,
  taxRegistered,
  style,
}: {
  subtotal: number;
  discountAmount: number;
  afterDiscount: number;
  taxAmount: number;
  total: number;
  taxRate: number;
  taxRegistered: boolean;
  style: TemplateStyle;
}) {
  const showAll = style !== "minimal";

  return (
    <div className="mt-3 space-y-0.5 border-t border-gray-200 pt-3 text-xs">
      {showAll && (
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
      )}
      {showAll && discountAmount > 0 && (
        <div className="flex justify-between text-gray-500">
          <span>Discount ({(MOCK_DISCOUNT_RATE * 100).toFixed(0)}%)</span>
          <span>−{fmt(discountAmount)}</span>
        </div>
      )}
      {showAll && taxRegistered && taxAmount > 0 && (
        <div className="flex justify-between text-gray-500">
          <span>Tax ({taxRate}%)</span>
          <span>{fmt(taxAmount)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-gray-300 pt-1 font-bold text-gray-900">
        <span>Total</span>
        <span>{fmt(total)}</span>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function DocumentPreview({ templateType, style, previewData, locale }: DocumentPreviewProps) {
  const isRTL = locale === "ar";
  const business = previewData.business ?? MOCK_IDENTITY;
  const items = MOCK_PREVIEW_ITEMS;

  const { subtotal, discountAmount, afterDiscount, taxAmount, total } = useMemo(() => {
    const sub = items.reduce((s, i) => s + i.lineTotal, 0);
    const disc = sub * MOCK_DISCOUNT_RATE;
    const after = sub - disc;
    const tax = previewData.taxRegistered ? after * (previewData.taxRate / 100) : 0;
    return {
      subtotal: sub,
      discountAmount: disc,
      afterDiscount: after,
      taxAmount: tax,
      total: after + tax,
    };
  }, [items, previewData.taxRegistered, previewData.taxRate]);

  const isA4 = templateType === "invoice-a4";
  const isRefund = templateType === "refund";

  // Tax invoice notice when A4 but not tax-registered
  if (isA4 && !previewData.taxRegistered) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`${WIDTH_CLASS[templateType]} mx-auto rounded-lg bg-white p-6 shadow-sm`}
      >
        <BusinessBlock business={business} style={style} templateType={templateType} />
        <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Tax invoices require tax registration to be enabled in Tax Settings.
        </div>
      </div>
    );
  }

  const fontSize = templateType === "receipt-58" ? "text-[10px]" : "text-xs";
  const padding = isA4 ? "p-8" : "p-4";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`${WIDTH_CLASS[templateType]} mx-auto rounded-lg bg-white shadow-sm ${padding} ${fontSize}`}
    >
      {/* Header */}
      <BusinessBlock business={business} style={style} templateType={templateType} />

      {/* Document type label */}
      <div className="mb-3 flex justify-between text-xs text-gray-500">
        <span>
          {isRefund ? "REFUND RECEIPT" : isA4 ? "TAX INVOICE" : "RECEIPT"}
          {isRefund && " — VOID"}
        </span>
        <span>{previewData.date}</span>
      </div>

      {/* Doc number */}
      <div className="mb-3 text-xs text-gray-500">
        #{previewData.invoiceNumber}
      </div>

      {/* Items */}
      <ItemsTable items={items} style={style} />

      {/* Totals */}
      <Totals
        subtotal={subtotal}
        discountAmount={discountAmount}
        afterDiscount={afterDiscount}
        taxAmount={taxAmount}
        total={total}
        taxRate={previewData.taxRate}
        taxRegistered={previewData.taxRegistered}
        style={style}
      />

      {/* Footer */}
      {style === "classic" && (
        <div className="mt-4 text-center text-xs text-gray-400">Thank you for your business!</div>
      )}
      {style === "detailed" && (
        <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
          {isA4
            ? "This is a valid tax invoice issued in accordance with applicable regulations."
            : "Thank you — please retain this receipt for your records."}
        </div>
      )}
    </div>
  );
}
