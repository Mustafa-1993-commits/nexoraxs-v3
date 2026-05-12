export interface Workspace {
  id: string;
  name: string;
  type: string;
  initials: string;
  color: string;
  members: number;
  apps: number;
  region: string;
}

export const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Acme Retail Co.",
    type: "Retail",
    initials: "AR",
    color: "#3b82f6",
    members: 8,
    apps: 2,
    region: "eu-central-1",
  },
  {
    id: "2",
    name: "HealthFirst Clinics",
    type: "Healthcare",
    initials: "HF",
    color: "#8b5cf6",
    members: 5,
    apps: 1,
    region: "eu-central-1",
  },
  {
    id: "3",
    name: "TechNova Solutions",
    type: "Technology",
    initials: "TN",
    color: "#06b6d4",
    members: 3,
    apps: 1,
    region: "ap-southeast-1",
  },
];
