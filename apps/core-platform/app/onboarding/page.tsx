"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, type ComponentProps } from "react";

import { Icon } from "@nexoraxs/ui";
import {
  completeWorkspaceOnboarding,
  getMockUserName,
  isWorkspaceOnboardingComplete,
  saveWorkspaceCountry,
  saveWorkspaceSetup,
} from "@/lib/session";

const subscribeToNothing = () => () => {};

const regionOptions = [
  { value: "me-central", label: "Middle East (Central)" },
  { value: "eu-central", label: "EU (Central)" },
  { value: "us-east", label: "US East" },
  { value: "ap-southeast", label: "Asia Pacific (SE)" },
] as const;

const REGION_COUNTRIES: Record<string, readonly { value: string; label: string }[]> = {
  "me-central": [
    { value: "Egypt",                label: "Egypt"                },
    { value: "Saudi Arabia",         label: "Saudi Arabia"         },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Kuwait",               label: "Kuwait"               },
    { value: "Qatar",                label: "Qatar"                },
  ],
  "eu-central": [
    { value: "Germany",     label: "Germany"     },
    { value: "France",      label: "France"      },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Poland",      label: "Poland"      },
    { value: "Spain",       label: "Spain"       },
  ],
  "us-east": [
    { value: "United States", label: "United States" },
    { value: "Canada",        label: "Canada"        },
  ],
  "ap-southeast": [
    { value: "Singapore",   label: "Singapore"   },
    { value: "Malaysia",    label: "Malaysia"    },
    { value: "Thailand",    label: "Thailand"    },
    { value: "Indonesia",   label: "Indonesia"   },
    { value: "Philippines", label: "Philippines" },
  ],
};

const osCards = [
  {
    id: "commerce",
    name: "Commerce OS",
    description: "Retail, inventory, and point-of-sale management.",
    available: true,
    icon: "apps" as const,
  },
  {
    id: "healthcare",
    name: "Healthcare OS",
    description: "Clinic, appointment, and patient management — coming soon.",
    available: false,
    icon: "apps" as const,
  },
  {
    id: "hr",
    name: "HR OS",
    description: "Employee, payroll, and attendance management — coming soon.",
    available: false,
    icon: "apps" as const,
  },
  {
    id: "crm",
    name: "CRM OS",
    description: "Leads, pipelines, and customer communications — coming soon.",
    available: false,
    icon: "apps" as const,
  },
  {
    id: "gym",
    name: "Gym OS",
    description: "Memberships, trainers, and class management — coming soon.",
    available: false,
    icon: "apps" as const,
  },
  {
    id: "maintenance",
    name: "Maintenance OS",
    description: "Field service and repair ticket workflows — coming soon.",
    available: false,
    icon: "apps" as const,
  },
] as const;

type Step = 1 | 2 | 3;
type RegionValue = (typeof regionOptions)[number]["value"];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const items: { step: Step; label: string }[] = [
    { step: 1, label: "Workspace" },
    { step: 2, label: "Apps" },
    { step: 3, label: "Review" },
  ];

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-start gap-2 sm:gap-3">
        {items.map((item, index) => {
          const completed = currentStep > item.step;
          const active = currentStep === item.step;

          return (
            <div key={item.label} className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    completed
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : active
                        ? "border-blue-500/40 bg-blue-500 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/35",
                  ].join(" ")}
                >
                  {completed ? <Icon name="check" className="h-4 w-4" /> : item.step}
                </div>
                <div
                  className={[
                    "text-center text-[11px] font-medium sm:text-xs",
                    active || completed ? "text-white/90" : "text-white/35",
                  ].join(" ")}
                >
                  {item.label}
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="mt-4 h-px flex-1 rounded-full bg-white/10">
                  <div
                    className={[
                      "h-px w-full rounded-full",
                      currentStep > item.step
                        ? "bg-blue-500/70"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ComponentProps<typeof Icon>["name"];
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70">
        <Icon name={icon} className="h-4 w-4" />
      </div>
      <div className="text-xs font-medium text-white/40">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const mounted = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  const isComplete = mounted ? isWorkspaceOnboardingComplete() : false;
  const mockUserName = useSyncExternalStore(
    subscribeToNothing,
    () => getMockUserName() ?? "Workspace owner",
    () => "Workspace owner",
  );

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [region, setRegion] = useState<RegionValue>("me-central");
  const [country, setCountry] = useState<string>("Egypt");
  const [shopsEnabled, setShopsEnabled] = useState(true);

  const canProceed =
    currentStep === 1
      ? workspaceName.trim() !== "" && slug.trim() !== ""
      : currentStep === 2
        ? shopsEnabled
        : true;

  const handleNameChange = (value: string) => {
    setWorkspaceName(value);
    if (!slugManuallyEdited) {
      setSlug(toSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(value);
  };

  const handleRegionChange = (newRegion: RegionValue) => {
    setRegion(newRegion);
    const firstCountry = REGION_COUNTRIES[newRegion]?.[0]?.value ?? "";
    setCountry(firstCountry);
  };

  const handleBack = () => {
    setCurrentStep((step) => (step > 1 ? ((step - 1) as Step) : step));
  };

  const handleContinue = () => {
    if (currentStep === 3) {
      saveWorkspaceSetup({
        workspaceName,
        slug,
        region,
        country,
        shopsEnabled,
      });
      saveWorkspaceCountry(country);
      completeWorkspaceOnboarding();
      router.push("/dashboard/apps");
      return;
    }

    if (canProceed) {
      setCurrentStep((step) => ((step + 1) as Step));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">
              NexoraXS
            </div>
            <div className="text-[11px] text-white/35">
              Core workspace onboarding
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <div className="text-xs font-medium text-white/70">Workspace setup</div>
            <div className="text-[11px] text-white/35">Three-step flow</div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10 lg:px-8">
          {!mounted ? (
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6">
              <div className="h-10 w-full rounded-2xl border border-white/10 bg-white/[0.03]" />
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="h-6 w-40 rounded-full bg-white/10" />
                <div className="mt-4 h-24 rounded-2xl bg-white/[0.02]" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="h-24 rounded-2xl bg-white/[0.02]" />
                  <div className="h-24 rounded-2xl bg-white/[0.02]" />
                </div>
              </div>
            </div>
          ) : isComplete ? (
            <div className="mx-auto flex w-full max-w-xl flex-1 items-center">
              <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <Icon name="check" className="h-6 w-6" />
                </div>
                <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-white">
                  Workspace already set up
                </h1>
                <p className="mt-3 text-center text-sm leading-relaxed text-white/55">
                  Your workspace onboarding is complete. Go to the dashboard to
                  manage apps and workspace settings.
                </p>
                <div className="mt-7 flex justify-center">
                  <Link
                    href="/dashboard/apps"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    Go to dashboard
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6">
              <StepIndicator currentStep={currentStep} />

              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/15 sm:p-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/30">
                        Step 1
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                        Set up your workspace
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                        Your workspace is the account container for your team,
                        settings, and connected apps.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="sm:col-span-2">
                        <span className="mb-1.5 block text-xs font-medium text-white/45">
                          Workspace name
                        </span>
                        <input
                          autoFocus
                          value={workspaceName}
                          onChange={(event) =>
                            handleNameChange(event.target.value)
                          }
                          placeholder="Mustafa's Co."
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-blue-500/50"
                        />
                      </label>

                      <label className="sm:col-span-2">
                        <span className="mb-1.5 block text-xs font-medium text-white/45">
                          Workspace slug
                        </span>
                        <div className="flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors focus-within:border-blue-500/50">
                          <div className="flex items-center border-r border-white/10 px-4 text-sm text-white/35">
                            nexoraxs.com/
                          </div>
                          <input
                            value={slug}
                            onChange={(event) =>
                              handleSlugChange(event.target.value)
                            }
                            placeholder="mustafas-co"
                            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
                          />
                        </div>
                      </label>

                      <label>
                        <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/45">
                          <Icon name="globe" className="h-3.5 w-3.5" />
                          Region
                        </span>
                        <select
                          value={region}
                          onChange={(event) =>
                            handleRegionChange(event.target.value as RegionValue)
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                        >
                          {regionOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="bg-[#0f1017] text-white"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/45">
                          <Icon name="globe" className="h-3.5 w-3.5" />
                          Country
                        </span>
                        <select
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                        >
                          {(REGION_COUNTRIES[region] ?? []).map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="bg-[#0f1017] text-white"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <p className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-xs leading-relaxed text-blue-100/85">
                      Workspace name and slug identify your account. Region sets
                      the default data residency. Country sets your
                      workspace&apos;s primary operating region.
                    </p>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/30">
                        Step 2
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                        Choose your operating systems
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                        Select the operating systems you want to activate in this workspace.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {osCards.map((app) => {
                        const active = app.id === "commerce" && shopsEnabled;

                        return (
                          <button
                            key={app.id}
                            type="button"
                            disabled={!app.available}
                            onClick={() => {
                              if (app.available) {
                                setShopsEnabled((value) => !value);
                              }
                            }}
                            className={[
                              "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                              app.available
                                ? active
                                  ? "border-blue-500/60 bg-blue-500/10 shadow-[0_0_0_1px_rgba(59,130,246,0.25)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                                : "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-55",
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border text-white/70",
                                active
                                  ? "border-blue-500/30 bg-blue-500/15 text-blue-200"
                                  : "border-white/10 bg-white/[0.03]",
                              ].join(" ")}
                            >
                              <Icon name={app.icon} className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    {app.name}
                                  </div>
                                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                                    {app.description}
                                  </p>
                                </div>

                                {app.available ? (
                                  <span
                                    className={[
                                      "rounded-full px-2.5 py-1 text-[11px] font-medium",
                                      active
                                        ? "bg-blue-500/15 text-blue-100"
                                        : "bg-white/5 text-white/45",
                                    ].join(" ")}
                                  >
                                    {active ? "Selected" : "Available"}
                                  </span>
                                ) : (
                                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/40">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                            </div>

                            {active ? (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                                <Icon name="check" className="h-4 w-4" />
                              </div>
                            ) : app.available ? (
                              <div className="h-6 w-6 rounded-full border border-white/20" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>

                    {!shopsEnabled && (
                      <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-100/85">
                        At least one operating system must be selected to continue.
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                          <Icon name="check" className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/30">
                            Step 3
                          </p>
                          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                            Your workspace is ready
                          </h2>
                        </div>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                        Review your setup before entering the dashboard. You can
                        change workspace settings later.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <SummaryCard
                        icon="building"
                        label="Workspace name"
                        value={workspaceName || "Untitled workspace"}
                      />
                      <SummaryCard
                        icon="globe"
                        label="Workspace slug"
                        value={`nexoraxs.com/${slug || "workspace"}`}
                      />
                      <SummaryCard
                        icon="globe"
                        label="Region"
                        value={
                          regionOptions.find((option) => option.value === region)
                            ?.label ?? region
                        }
                      />
                      <SummaryCard
                        icon="globe"
                        label="Country"
                        value={country}
                      />
                      <SummaryCard
                        icon="users"
                        label="Team owner"
                        value={mockUserName}
                      />
                      <SummaryCard
                        icon="apps"
                        label="Active OS"
                        value={shopsEnabled ? "Commerce OS" : "None selected"}
                      />
                    </div>

                    <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs leading-relaxed text-emerald-100/85">
                      <span className="font-semibold text-emerald-200">
                        Ready to launch.
                      </span>{" "}
                      This saves a lightweight workspace setup snapshot to
                      session storage and takes you to the dashboard.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>

      {!mounted || isComplete ? null : (
        <nav className="sticky bottom-0 z-20 border-t border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="inline-flex min-w-[7.5rem] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!canProceed}
              className={[
                "inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors",
                currentStep === 3
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-blue-600 hover:bg-blue-500",
                !canProceed ? "cursor-not-allowed opacity-50 hover:bg-inherit" : "",
              ].join(" ")}
            >
              {currentStep === 3 ? (
                <>
                  <Icon name="zap" className="h-4 w-4" />
                  Continue to dashboard
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
