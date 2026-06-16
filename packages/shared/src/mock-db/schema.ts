// ---- storage keys ----

export const STORAGE_KEYS = {
  // session (sessionStorage)
  currentUserId: "nexoraxs.session.currentUserId",
  currentWorkspaceId: "nexoraxs.session.currentWorkspaceId",
  currentOSSubscriptionId: "nexoraxs.session.currentOSSubscriptionId",
  currentBusinessUnitId: "nexoraxs.session.currentBusinessUnitId",
  currentBranchId: "nexoraxs.session.currentBranchId",
  currentOSId: "nexoraxs.session.currentOSId",
  onboardingState: "nexoraxs.session.onboardingState",
  entryContext: "nexoraxs.session.entryContext",
  locale: "nexoraxs.session.locale",
  demo: "nexoraxs.session.demo",
  posLastOrderId: "nx_last_order_id",
  // db (localStorage)
  users: "nexoraxs.db.users",
  workspaces: "nexoraxs.db.workspaces",
  branches: "nexoraxs.db.branches",
  osSubscriptions: "nexoraxs.db.osSubscriptions",
  businessUnits: "nexoraxs.db.businessUnits",
  commerceSetups: "nexoraxs.db.commerceSetups",
  teamMembers: "nexoraxs.db.teamMembers",
  products: "nexoraxs.db.commerceProducts",
  orders: "nexoraxs.db.commerceOrders",
  customers: "nexoraxs.db.commerceCustomers",
  invoices: "nexoraxs.db.commerceInvoices",
  branchInventory: "nexoraxs.db.branchInventory",
  stockMovements: "nexoraxs.db.stockMovements",
  stockTransfers: "nexoraxs.db.stockTransfers",
  commerceReturns: "nexoraxs.db.commerceReturns",
  mediaAssets: "nexoraxs.db.mediaAssets",
  workspaceStorageUsage: "nexoraxs.db.workspaceStorageUsage",
  // ui (localStorage)
  theme: "nexoraxs.ui.theme",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ---- i18n ----

export type Lang = "en" | "ar";

const DICT: Record<Lang, Record<string, string>> = {
  en: {
    platform: "Platform", operating_systems: "Operating Systems", pricing: "Pricing", faq: "FAQ",
    sign_in: "Sign in", start_trial: "Start Free Trial", view_commerce: "View Commerce OS",
    home: "Home", billing: "Billing", team: "Team & Access", integrations: "Integrations", settings: "Settings",
    dashboard: "Dashboard", pos: "POS", products: "Products", inventory: "Inventory",
    orders: "Orders", invoices: "Invoices", customers: "Customers", reports: "Reports",
    workspace: "Workspace", notifications: "Notifications", search: "Search", add_product: "Add Product",
    open_pos: "Open POS", view_invoices: "View Invoices", save: "Save", cancel: "Cancel", next: "Next",
    back: "Back", finish_setup: "Finish Setup", checkout: "Checkout", complete_sale: "Complete Sale",
    subtotal: "Subtotal", discount: "Discount", vat: "VAT", total: "Total", net: "Net",
    cash: "Cash", card: "Card", wallet: "Wallet", category: "Category", price: "Price", stock: "Stock",
    today_sales: "Today's sales", orders_today: "Orders today", gross_sales: "Gross sales",
    vat_collected: "VAT collected", net_sales: "Net sales", low_stock: "Low stock",
    top_products: "Top products", recent_orders: "Recent orders", quick_actions: "Quick actions",
    cart: "Cart", empty_cart: "Cart is empty", scan_or_search: "Scan barcode or search products",
    customer: "Customer", payment_method: "Payment method", new_sale: "New Sale",
    choose_os: "Choose an operating system", available: "Available", coming_soon: "Coming Soon",
    setup_required: "Setup required", set_up: "Set up Commerce OS",
    language: "Language", english: "English", arabic: "العربية",
    product_hub: "Product Hub", branch: "Branch", business_unit: "Business",
    walk_in: "Walk-in", no_customer: "No customer", add_customer: "Add / select customer",
    name: "Name", email: "Email", phone: "Phone", address: "Address", city: "City", country: "Country",
    tax_number: "Tax Number", registration_number: "Registration Number", logo: "Logo",
    legal_name: "Legal Name", display_name: "Display Name",
    vat_rate: "VAT Rate", tax_label: "Tax Label", prices_include_tax: "Prices include tax",
    invoice_prefix: "Invoice Prefix", receipt_prefix: "Receipt Prefix",
    invoice_start: "Invoice Start", receipt_start: "Receipt Start",
    footer_text: "Footer Text", return_policy: "Return Policy",
    receipt_size: "Receipt Size", receipt_style: "Receipt Style", invoice_template: "Invoice Template",
    categories: "Categories", add_category: "Add category",
    identity: "Identity", tax: "Tax", numbering: "Numbering", templates: "Templates",
    mode: "Business Mode", physical: "Physical Store", online: "Online Only", both: "Physical & Online",
    preset: "Business Type", review: "Review",
    sign_out: "Sign out", account: "Account",
    today: "Today", this_week: "This Week", this_month: "This Month",
    no_orders: "No orders yet", no_products: "No products yet", no_customers: "No customers yet",
    no_invoices: "No invoices yet", no_data: "No data",
    order: "Order", invoice: "Invoice", receipt: "Receipt",
    sku: "SKU", barcode: "Barcode", cost: "Cost", taxable: "Taxable",
    low_stock_threshold: "Low Stock Threshold", unit: "Unit", notes: "Notes",
    print: "Print", view_document: "View Document", view_invoice: "View Invoice",
    new_order: "New Order", new_customer: "New Customer", stock_adjustment: "Stock Adjustment",
    z_report: "Z-Report", all: "All", out_of_stock: "Out of Stock", ok: "OK",
    lifetime_spend: "Lifetime Spend", total_orders: "Total Orders",
    first_order: "First Order", last_order: "Last Order", purchase_history: "Purchase History",
    edit: "Edit", delete: "Delete", update: "Update",
    storage_used: "Storage used", media_storage_used: "Media storage used",
    image_too_large: "This image is too large to use — try a smaller photo.",
    storage_limit_reached: "Storage limit reached — the item was saved without an image.",
    cashier: "Cashier",
    branch_inventory: "Branch Inventory", stock_transfer: "Stock Transfer",
    transfer_history: "Transfer History", new_transfer: "New Transfer",
    from_branch: "From Branch", to_branch: "To Branch",
    return: "Return", returns: "Returns", process_return: "Process Return",
    restock: "Restock", restocked: "Restocked", not_restocked: "Not restocked",
    refund_method: "Refund Method", return_receipt: "Return Receipt", credit_note: "Credit Note",
    returns_refunds: "Returns / Refunds", return_status: "Return Status",
    partially_returned: "Partially Returned", returned: "Returned",
    remaining_returnable: "Remaining Returnable",
    transfer_rejected: "Transfer rejected", return_rejected: "Return rejected",
    insufficient_stock: "Insufficient stock", select_branch: "Select Branch",
    sale_rejected: "Could not complete sale",
    return_not_found: "Return not found", back_to_orders: "Back to Orders",
    order_number: "Order #", invoice_number: "Invoice #", return_number: "Return #",
    date: "Date", in_store: "In-store", point_of_sale: "Point of Sale",
    description: "Description", qty: "Qty", amount: "Amount", reason: "Reason",
    total_refunded: "Total refunded", add_branch_for_transfers: "Add another branch in Settings to enable stock transfers.",
    items: "Items", no_items_added: "No items added yet.", select_product: "Select product",
    in_stock: "in stock", note: "Note", optional: "Optional", add_item: "Add item",
    remove_item: "Remove item", transfer_completed: "Transfer completed", completed: "Completed",
    no_transfers_yet: "No transfers yet", transfers_empty: "Stock transfers between branches will appear here.",
    transfer: "Transfer", created: "Created", branch_transfer: "Branch transfer",
    review_transfer_stock: "Review and transfer stock between branches",
    example_transfer_note: "e.g. Restock for weekend",
  },
  ar: {
    platform: "المنصة", operating_systems: "الأنظمة التشغيلية", pricing: "التسعير", faq: "الأسئلة الشائعة",
    sign_in: "تسجيل الدخول", start_trial: "ابدأ التجربة المجانية", view_commerce: "عرض Commerce OS",
    home: "الرئيسية", billing: "الفواتير والاشتراك", team: "الفريق والصلاحيات",
    integrations: "التكاملات", settings: "الإعدادات",
    dashboard: "لوحة التحكم", pos: "نقطة البيع", products: "المنتجات", inventory: "المخزون",
    orders: "الطلبات", invoices: "الفواتير", customers: "العملاء", reports: "التقارير",
    workspace: "مساحة العمل", notifications: "الإشعارات", search: "بحث", add_product: "إضافة منتج",
    open_pos: "فتح نقطة البيع", view_invoices: "عرض الفواتير", save: "حفظ", cancel: "إلغاء",
    next: "التالي", back: "رجوع", finish_setup: "إنهاء الإعداد", checkout: "الدفع",
    complete_sale: "إتمام البيع", subtotal: "المجموع الجزئي", discount: "الخصم",
    vat: "ضريبة القيمة المضافة", total: "الإجمالي", net: "الصافي",
    cash: "نقداً", card: "بطاقة", wallet: "محفظة", category: "الفئة", price: "السعر", stock: "المخزون",
    today_sales: "مبيعات اليوم", orders_today: "طلبات اليوم", gross_sales: "إجمالي المبيعات",
    vat_collected: "ضريبة القيمة المضافة المحصلة", net_sales: "صافي المبيعات", low_stock: "مخزون منخفض",
    top_products: "أفضل المنتجات", recent_orders: "أحدث الطلبات", quick_actions: "إجراءات سريعة",
    cart: "السلة", empty_cart: "السلة فارغة", scan_or_search: "امسح الباركود أو ابحث عن منتج",
    customer: "العميل", payment_method: "طريقة الدفع", new_sale: "بيع جديد",
    choose_os: "اختر نظاماً تشغيلياً", available: "متاح", coming_soon: "قريباً",
    setup_required: "الإعداد مطلوب", set_up: "إعداد Commerce OS",
    language: "اللغة", english: "English", arabic: "العربية",
    product_hub: "مركز المنتجات", branch: "الفرع", business_unit: "النشاط التجاري",
    walk_in: "عميل عابر", no_customer: "بدون عميل", add_customer: "إضافة / اختيار عميل",
    name: "الاسم", email: "البريد الإلكتروني", phone: "الهاتف", address: "العنوان",
    city: "المدينة", country: "الدولة",
    tax_number: "الرقم الضريبي", registration_number: "رقم السجل التجاري", logo: "الشعار",
    legal_name: "الاسم القانوني", display_name: "الاسم التجاري",
    vat_rate: "نسبة ضريبة القيمة المضافة", tax_label: "تسمية الضريبة", prices_include_tax: "الأسعار تشمل الضريبة",
    invoice_prefix: "بادئة الفاتورة", receipt_prefix: "بادئة الإيصال",
    invoice_start: "بداية ترقيم الفواتير", receipt_start: "بداية ترقيم الإيصالات",
    footer_text: "نص التذييل", return_policy: "سياسة الإرجاع",
    receipt_size: "حجم الإيصال", receipt_style: "نمط الإيصال", invoice_template: "قالب الفاتورة",
    categories: "التصنيفات", add_category: "إضافة تصنيف",
    identity: "الهوية", tax: "الضريبة", numbering: "الترقيم", templates: "القوالب",
    mode: "نمط العمل", physical: "متجر فعلي", online: "إلكتروني فقط", both: "فعلي وإلكتروني",
    preset: "نوع النشاط التجاري", review: "مراجعة",
    sign_out: "تسجيل الخروج", account: "الحساب",
    today: "اليوم", this_week: "هذا الأسبوع", this_month: "هذا الشهر",
    no_orders: "لا توجد طلبات بعد", no_products: "لا توجد منتجات بعد", no_customers: "لا يوجد عملاء بعد",
    no_invoices: "لا توجد فواتير بعد", no_data: "لا توجد بيانات",
    order: "طلب", invoice: "فاتورة", receipt: "إيصال",
    sku: "رمز المنتج", barcode: "الباركود", cost: "التكلفة", taxable: "خاضع للضريبة",
    low_stock_threshold: "حد المخزون المنخفض", unit: "الوحدة", notes: "ملاحظات",
    print: "طباعة", view_document: "عرض المستند", view_invoice: "عرض الفاتورة",
    new_order: "طلب جديد", new_customer: "عميل جديد", stock_adjustment: "تعديل المخزون",
    z_report: "تقرير Z", all: "الكل", out_of_stock: "نفد المخزون", ok: "مناسب",
    lifetime_spend: "إجمالي الإنفاق", total_orders: "إجمالي الطلبات",
    first_order: "أول طلب", last_order: "آخر طلب", purchase_history: "سجل المشتريات",
    edit: "تعديل", delete: "حذف", update: "تحديث",
    storage_used: "التخزين المستخدم", media_storage_used: "تخزين الوسائط المستخدم",
    image_too_large: "هذه الصورة كبيرة جداً — جرّب صورة أصغر.",
    storage_limit_reached: "تم بلوغ حد التخزين — تم حفظ العنصر بدون صورة.",
    cashier: "الكاشير",
    branch_inventory: "مخزون الفرع", stock_transfer: "تحويل المخزون",
    transfer_history: "سجل التحويلات", new_transfer: "تحويل جديد",
    from_branch: "من فرع", to_branch: "إلى فرع",
    return: "مرتجع", returns: "المرتجعات", process_return: "تنفيذ مرتجع",
    restock: "إعادة للمخزون", restocked: "تمت إعادته للمخزون", not_restocked: "لم تتم إعادته للمخزون",
    refund_method: "طريقة رد المبلغ", return_receipt: "إيصال مرتجع", credit_note: "إشعار دائن",
    returns_refunds: "المرتجعات / المبالغ المستردة", return_status: "حالة المرتجع",
    partially_returned: "مرتجع جزئيًا", returned: "مرتجع بالكامل",
    remaining_returnable: "الكمية المتبقية للمرتجع",
    transfer_rejected: "تم رفض التحويل", return_rejected: "تم رفض المرتجع",
    insufficient_stock: "المخزون غير كافٍ", select_branch: "اختر الفرع",
    sale_rejected: "تعذر إتمام البيع",
    return_not_found: "لم يتم العثور على المرتجع", back_to_orders: "العودة إلى الطلبات",
    order_number: "رقم الطلب", invoice_number: "رقم الفاتورة", return_number: "رقم المرتجع",
    date: "التاريخ", in_store: "داخل المتجر", point_of_sale: "نقطة البيع",
    description: "الوصف", qty: "الكمية", amount: "المبلغ", reason: "السبب",
    total_refunded: "إجمالي المبلغ المسترد", add_branch_for_transfers: "أضف فرعاً آخر من الإعدادات لتفعيل تحويلات المخزون.",
    items: "الأصناف", no_items_added: "لم تتم إضافة أصناف بعد.", select_product: "اختر المنتج",
    in_stock: "في المخزون", note: "ملاحظة", optional: "اختياري", add_item: "إضافة صنف",
    remove_item: "حذف الصنف", transfer_completed: "تم التحويل بنجاح", completed: "مكتمل",
    no_transfers_yet: "لا توجد تحويلات بعد", transfers_empty: "ستظهر تحويلات المخزون بين الفروع هنا.",
    transfer: "تحويل", created: "تاريخ الإنشاء", branch_transfer: "تحويل بين الفروع",
    review_transfer_stock: "راجع وحوّل المخزون بين الفروع",
    example_transfer_note: "مثال: إعادة تعبئة مخزون نهاية الأسبوع",
  },
};

export function t(key: string, lang: Lang = "en"): string {
  return DICT[lang]?.[key] ?? DICT.en[key] ?? key;
}

// ---- OS + plan catalogs ----

export const OS_CATALOG = [
  { id: "commerce", name: "Commerce OS", availability: "available" },
  { id: "healthcare", name: "Healthcare OS", availability: "coming_soon" },
  { id: "hr", name: "HR OS", availability: "coming_soon" },
  { id: "crm", name: "CRM OS", availability: "coming_soon" },
  { id: "gym", name: "Gym OS", availability: "coming_soon" },
  { id: "maintenance", name: "Maintenance OS", availability: "coming_soon" },
] as const;

export const OPERATING_SYSTEMS = [
  {
    id: "commerce", name: "Commerce OS", icon: "store", status: "available", accent: "#4f46e5",
    tagline: "POS · Inventory · Orders · Invoices · Taxes · Reports",
    desc: "Run sales, inventory, invoices, taxes and daily operations from one place.",
  },
  {
    id: "healthcare", name: "Healthcare OS", icon: "stethoscope", status: "soon", accent: "#0d9488",
    tagline: "Clinics · Hospitals · Patients · Appointments · Medical Records",
    desc: "Patient records, appointments and prescriptions for clinics and hospitals.",
  },
  {
    id: "hr", name: "HR OS", icon: "users-round", status: "soon", accent: "#d97706",
    tagline: "Employees · Attendance · Payroll · Leaves",
    desc: "The master employee system — attendance, payroll, contracts and shifts.",
  },
  {
    id: "crm", name: "CRM OS", icon: "git-branch", status: "soon", accent: "#7c3aed",
    tagline: "Leads · Deals · Campaigns · Follow-ups",
    desc: "Pipelines, campaigns and follow-ups to grow customer relationships.",
  },
  {
    id: "gym", name: "Gym OS", icon: "dumbbell", status: "soon", accent: "#0891b2",
    tagline: "Members · Memberships · Trainers · Classes",
    desc: "Memberships, classes, trainers and renewals for fitness businesses.",
  },
  {
    id: "maintenance", name: "Maintenance OS", icon: "wrench", status: "soon", accent: "#dc2626",
    tagline: "Repair Centers · Tickets · Technicians · Warranty",
    desc: "Job cards, repair tickets and spare-parts usage for service centers.",
  },
];

export const PLAN_CATALOG = [
  {
    id: "commerce_starter", osId: "commerce", tier: "Starter", price: 0, currency: "EGP",
    limits: { businessUnits: 1, branches: 1, users: 3, storageLimitBytes: 500 * 1024 * 1024 },
  },
  {
    id: "commerce_pro", osId: "commerce", tier: "Pro", price: 1400, currency: "EGP",
    limits: { businessUnits: 3, branches: 5, users: 10, storageLimitBytes: 5 * 1024 * 1024 * 1024 },
  },
  {
    id: "commerce_business", osId: "commerce", tier: "Business", price: null, currency: "EGP",
    limits: { businessUnits: 99, branches: 99, users: 99, storageLimitBytes: 50 * 1024 * 1024 * 1024 },
  },
];

export const OS_BU_PRESETS = {
  commerce: [
    { id: "retail", label: "Retail Store", icon: "shopping-bag", desc: "General merchandise retail" },
    { id: "pharmacy", label: "Pharmacy", icon: "pill", desc: "Medicines, supplements, health products" },
    { id: "supermarket", label: "Supermarket", icon: "shopping-cart", desc: "Grocery and household items" },
    { id: "restaurant_cafe", label: "Restaurant / Cafe", icon: "utensils", desc: "Food & beverage service" },
    { id: "electronics_mobile", label: "Electronics / Mobile", icon: "cpu", desc: "Devices, accessories, repairs" },
    { id: "clothing_fashion", label: "Clothing / Fashion", icon: "shirt", desc: "Apparel and accessories" },
    { id: "cosmetics", label: "Cosmetics", icon: "sparkles", desc: "Beauty and skincare products" },
    { id: "medical_supplies", label: "Medical Supplies", icon: "heart-pulse", desc: "Medical devices and supplies" },
    { id: "other", label: "Other", icon: "box", desc: "Other type of business" },
  ],
};

export const ONB_PLANS = [
  {
    key: "starter" as const,
    name: "Starter",
    price: "Free",
    tagline: "Perfect for trying out",
    features: ["1 business", "1 branch", "Up to 3 users", "Core Commerce features", "Community support"],
    popular: false,
  },
  {
    key: "pro" as const,
    name: "Pro",
    price: "1,400 EGP/mo",
    tagline: "For growing businesses",
    features: ["3 businesses", "5 branches", "Up to 10 users", "All Commerce features", "Priority support", "Advanced reports"],
    popular: true,
  },
  {
    key: "business" as const,
    name: "Business",
    price: "Custom",
    tagline: "Enterprise-grade scale",
    features: ["Unlimited businesses", "Unlimited branches", "Unlimited users", "Dedicated support", "Custom integrations", "SLA guarantee"],
    popular: false,
  },
];

export const COUNTRIES = [
  "Egypt", "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Bahrain", "Oman", "Jordan",
  "Lebanon", "Tunisia", "Morocco", "Algeria", "Libya", "Sudan", "Iraq",
];

export const CURRENCIES = [
  { code: "EGP", name: "Egyptian Pound" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "AED", name: "UAE Dirham" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
];

export const TIMEZONES = [
  "Africa/Cairo", "Asia/Riyadh", "Asia/Dubai", "Asia/Kuwait", "Asia/Qatar",
  "Asia/Bahrain", "Asia/Muscat", "Asia/Amman", "Asia/Beirut",
  "Africa/Tunis", "Africa/Casablanca", "Africa/Algiers", "Africa/Tripoli",
  "Africa/Khartoum", "Asia/Baghdad", "UTC",
];

export function planIdFor(osId: string, key: string | null): string {
  if (!key) return `${osId}_pro`;
  return `${osId}_${key}`;
}

export function prettyPreset(id: string | null | undefined): string {
  if (!id) return "—";
  const known: Record<string, string> = {
    retail: "Retail Store", pharmacy: "Pharmacy", restaurant_cafe: "Restaurant / Cafe",
    supermarket: "Supermarket", electronics_mobile: "Electronics / Mobile Store",
    clothing_fashion: "Clothing / Fashion", cosmetics: "Cosmetics",
    medical_supplies: "Medical Supplies", other: "Other",
  };
  return known[id] ?? id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
