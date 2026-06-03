export type Locale = "en" | "ar";

const LOCALE_KEY = "nexoraxs_locale";
const LOCALE_EVENT = "nexoraxs:locale-change";

// ── Settings translation keys ──────────────────────────────────────────────

const SETTINGS_STRINGS: Record<string, Record<Locale, string>> = {
  // Business Identity
  "settings.identity.title":        { en: "Business Identity",          ar: "هوية العمل"             },
  "settings.identity.displayName":  { en: "Display Name",               ar: "الاسم التجاري"          },
  "settings.identity.legalName":    { en: "Legal Name",                  ar: "الاسم القانوني"         },
  "settings.identity.logo":         { en: "Logo",                        ar: "الشعار"                 },
  "settings.identity.phone":        { en: "Phone",                       ar: "الهاتف"                 },
  "settings.identity.email":        { en: "Email",                       ar: "البريد الإلكتروني"      },
  "settings.identity.address":      { en: "Address",                     ar: "العنوان"                },
  "settings.identity.taxNumber":    { en: "Tax Registration Number",     ar: "رقم التسجيل الضريبي"   },
  "settings.identity.commercialReg":{ en: "Commercial Registration",     ar: "رقم السجل التجاري"     },
  // Tax Settings
  "settings.tax.title":             { en: "Tax Settings",                ar: "إعدادات الضريبة"        },
  "settings.tax.registered":        { en: "Tax / VAT Registered",        ar: "مسجل لضريبة القيمة المضافة" },
  "settings.tax.rate":              { en: "Default Tax Rate (%)",        ar: "معدل الضريبة الافتراضي (%)" },
  "settings.tax.priceMode":         { en: "Price Mode",                  ar: "نمط السعر"              },
  "settings.tax.exclusive":         { en: "Tax Exclusive",               ar: "سعر بدون ضريبة"         },
  "settings.tax.inclusive":         { en: "Tax Inclusive",               ar: "سعر شامل الضريبة"       },
  "settings.tax.discountNote":      { en: "Discounts are applied before tax in all POS calculations.", ar: "يتم تطبيق الخصومات قبل الضريبة في جميع عمليات نقطة البيع." },
  // Invoice Numbering
  "settings.invoicing.title":       { en: "Invoice Numbering",           ar: "ترقيم الفواتير"         },
  "settings.invoicing.receiptPrefix":{ en: "Receipt Prefix",             ar: "بادئة الإيصال"          },
  "settings.invoicing.invoicePrefix":{ en: "Invoice Prefix",             ar: "بادئة الفاتورة"         },
  "settings.invoicing.startingNumber":{ en: "Starting Number",           ar: "رقم البداية"            },
  "settings.invoicing.example":     { en: "Example Numbers",             ar: "أمثلة على الأرقام"      },
  // Document Templates
  "settings.templates.title":       { en: "Document Templates",          ar: "قوالب المستندات"        },
  "settings.templates.style.minimal":{ en: "Minimal",                    ar: "مبسط"                   },
  "settings.templates.style.classic":{ en: "Classic",                    ar: "كلاسيكي"                },
  "settings.templates.style.detailed":{ en: "Detailed",                  ar: "مفصل"                   },
  "settings.templates.taxNotice":   { en: "Tax invoices require tax registration to be enabled in Tax Settings.", ar: "تتطلب فواتير الضريبة تمكين التسجيل الضريبي في إعدادات الضريبة." },
  // Common
  "settings.common.save":           { en: "Save",                        ar: "حفظ"                    },
  "settings.common.saved":          { en: "Saved",                       ar: "تم الحفظ"               },
};

export function tSettings(key: string, locale: Locale): string {
  return SETTINGS_STRINGS[key]?.[locale] ?? key;
}

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = sessionStorage.getItem(LOCALE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

export function subscribeToLocale(cb: () => void): () => void {
  window.addEventListener(LOCALE_EVENT, cb);
  return () => window.removeEventListener(LOCALE_EVENT, cb);
}
