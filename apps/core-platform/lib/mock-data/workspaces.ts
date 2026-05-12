export interface Workspace {
  id: string;
  name: string;
  type: string;
  initials: string;
}

export const mockWorkspaces: Workspace[] = [
  { id: "1", name: "Acme Retail Co.", type: "Retail", initials: "AR" },
  { id: "2", name: "HealthFirst Clinics", type: "Healthcare", initials: "HF" },
  { id: "3", name: "TechNova Solutions", type: "Technology", initials: "TN" },
];
