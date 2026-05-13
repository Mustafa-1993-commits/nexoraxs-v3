const steps = [
  "Choose shop mode",
  "Add business profile",
  "Add first product",
  "Invite team member",
  "Review settings",
];

export function SetupChecklist() {
  return (
    <div className="card p-5">
      <p className="chip mb-1 text-gray-500">{"// setup checklist"}</p>
      <h3 className="text-base font-semibold text-white">Get started</h3>
      <p className="mt-0.5 font-mono text-xs text-gray-500">0 of 5 complete</p>
      <ul className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step} className="flex items-center gap-3">
            <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-white/20" />
            <span className="text-sm text-white/70">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
