export interface ActivityEvent {
  who: string;
  action: string;
  when: string;
  color: string;
}

export const mockActivity: ActivityEvent[] = [
  {
    who: "Sara M.",
    action: "enabled the CRM app",
    when: "2m ago",
    color: "#10b981",
  },
  {
    who: "You",
    action: "invited 3 team members to Shops",
    when: "1h ago",
    color: "#3b82f6",
  },
  {
    who: "System",
    action: "auto-renewed your Beta plan",
    when: "Today, 09:00",
    color: "#8b5cf6",
  },
  {
    who: "Omar K.",
    action: 'created workspace "Cairo branch"',
    when: "Yesterday",
    color: "#06b6d4",
  },
];
