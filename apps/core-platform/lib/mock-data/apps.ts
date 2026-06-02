import type { OSState } from "@/lib/types";

export interface OSItem {
  id: string;
  name: string;
  description: string;
  state: OSState;
  href?: string;
}

const SHOPS_URL = process.env.NEXT_PUBLIC_SHOPS_APP_URL ?? "http://localhost:3002";

export const mockOS: OSItem[] = [
  {
    id: "commerce",
    name: "Commerce OS",
    description: "Retail, POS, inventory, and customer commerce operations.",
    state: "active",
    href: SHOPS_URL,
  },
  {
    id: "healthcare",
    name: "Healthcare OS",
    description: "Clinic, appointment, and patient management.",
    state: "coming-soon",
  },
  {
    id: "hr",
    name: "HR OS",
    description: "Employee, payroll, attendance, and leave management.",
    state: "coming-soon",
  },
  {
    id: "crm",
    name: "CRM OS",
    description: "Leads, pipelines, campaigns, and follow-ups.",
    state: "coming-soon",
  },
  {
    id: "gym",
    name: "Gym OS",
    description: "Memberships, trainers, classes, and renewals.",
    state: "coming-soon",
  },
  {
    id: "maintenance",
    name: "Maintenance OS",
    description: "Field service, repair tickets, and asset management.",
    state: "coming-soon",
  },
];
