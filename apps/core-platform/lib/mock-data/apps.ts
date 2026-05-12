export interface App {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

export const mockApps: App[] = [
  {
    id: "shops",
    name: "Shops",
    description: "Commerce & POS — manage products, sales, and customers.",
    available: true,
  },
  {
    id: "clinics",
    name: "Clinics",
    description: "Healthcare management for appointments and billing.",
    available: false,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Field service — schedule jobs and track assets.",
    available: false,
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description: "Table management and kitchen operations.",
    available: false,
  },
  {
    id: "crm",
    name: "CRM",
    description: "Track leads, deals, and customer communications.",
    available: false,
  },
];
