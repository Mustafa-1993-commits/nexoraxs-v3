import type { AppStatus } from "@/lib/types";

export interface App {
  id: string;
  name: string;
  description: string;
  status: AppStatus;
  href?: string;
  subtitle?: string;
}

const SHOPS_URL = process.env.NEXT_PUBLIC_SHOPS_APP_URL ?? "http://localhost:3002";

export const mockApps: App[] = [
  {
    id: "shops",
    name: "Shops",
    description: "Commerce & POS — manage products, sales, and customers.",
    status: "active",
    subtitle: "Business management · POS · Commerce",
    href: SHOPS_URL,
  },
  {
    id: "clinics",
    name: "Clinics",
    description: "Healthcare management for appointments and billing.",
    status: "coming-soon",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Field service — schedule jobs and track assets.",
    status: "coming-soon",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description: "Table management and kitchen operations.",
    status: "coming-soon",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Track leads, deals, and customer communications.",
    status: "upgrade",
  },
];
