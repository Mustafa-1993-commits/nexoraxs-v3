// ============================================================
// NexoraXS — Router + Root
// ============================================================

/* ---------- Branded splash (first load) ---------- */
function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1500);
    const t2 = setTimeout(() => onDone(), 2050);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className={"nx-splash" + (leaving ? " leaving" : "")}>
      <div className="nx-splash-glow" />
      <div className="nx-splash-grid" />
      <img className="nx-splash-logo" src="assets/nexoraxs-lockup.png" alt="NexoraXS Platform" />
      <div className="nx-splash-bar"><span /></div>
      <div className="nx-splash-tag">Business Operating Platform</div>
    </div>
  );
}
const SCREENS = {
  landing: Landing,
  register: Register, verify: Verify, login: Login, forgot: Forgot, reset: Reset, welcome: Welcome,
  "workspace-welcome": CoreOnboarding, "workspace-create": CoreOnboarding,
  "os-launcher": OsLauncher, "commerce-setup": CommerceSetup,
  dashboard: Dashboard, products: Products, "product-new": ProductNew, inventory: Inventory,
  pos: POS, "sale-success": SaleSuccess,
  orders: Orders, "order-details": OrderDetails, invoices: Invoices, "invoice-details": InvoiceDetails,
  reports: Reports, customers: Customers, "customer-profile": CustomerProfilePage, "commerce-settings": CommerceSettings,
  billing: Billing, team: Team, integrations: Integrations, "platform-settings": PlatformSettings,
};

function Router() {
  const { route } = useApp();
  const Screen = SCREENS[route.screen] || Landing;
  return <Screen key={route.screen} />;
}

function Root() {
  const [splash, setSplash] = useState(() => {
    try { return !sessionStorage.getItem("nx_splash_seen"); } catch (e) { return true; }
  });
  const done = () => { try { sessionStorage.setItem("nx_splash_seen", "1"); } catch (e) {} setSplash(false); };
  return (
    <AppProvider>
      {splash && <Splash onDone={done} />}
      <Router />
      <ToastHost />
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
