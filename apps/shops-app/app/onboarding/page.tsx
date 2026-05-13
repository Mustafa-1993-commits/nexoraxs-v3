"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ModeCard } from "@/components/onboarding/ModeCard";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  completeOnboarding,
  getBranch,
  getCurrency,
  getMode,
  isOnboardingComplete,
  setBranch,
  setCurrency,
  setMode,
  type ShopsMode,
} from "@/lib/mode";

type OnboardingStep = 1 | 2 | 3;

function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const modes: {
  mode: ShopsMode;
  title: string;
  description: string;
  icon: IconName;
  features: string[];
  recommended?: boolean;
}[] = [
  {
    mode: "business",
    title: "Business Management",
    icon: "chart-bar",
    description:
      "Manage internal operations — inventory, staff, and reporting for a physical or hybrid business.",
    features: [
      "Inventory & staff management",
      "Daily sales reports",
      "Multi-branch support",
    ],
  },
  {
    mode: "store",
    title: "Storefront",
    icon: "shopping-bag",
    description:
      "Run a customer-facing storefront — product listings, cart, and orders for e-commerce.",
    features: [
      "Product catalogue & listings",
      "Customer orders tracking",
      "Cart & checkout flow",
    ],
  },
  {
    mode: "both",
    title: "Both",
    icon: "dashboard",
    description:
      "Access all Business Management and Storefront features in one unified workspace.",
    features: [
      "All Business Management features",
      "All Storefront features",
      "Unified workspace",
    ],
    recommended: true,
  },
];

const modeLabel: Record<ShopsMode, string> = {
  business: "Business Management",
  store: "Storefront",
  both: "Both",
};

const branchOptions = ["Maadi Main", "Nasr City", "New Cairo"] as const;
const currencyOptions = ["EGP", "USD", "SAR"] as const;

function StepIndicator({ currentStep }: { currentStep: OnboardingStep }) {
  const steps = [1, 2, 3] as const;

  return (
    <div className="mb-10 flex items-center gap-3">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 items-center gap-3">
          {index > 0 && <div className="h-px flex-1 bg-white/10" />}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              currentStep === step
                ? "bg-blue-600 text-white"
                : "border border-white/20 bg-transparent text-white/40"
            }`}
            aria-current={currentStep === step ? "step" : undefined}
          >
            <span>{step}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailRow({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="text-sm text-white/75">{label}</span>
    </div>
  );
}

function CompletionState() {
  return (
    <main className="mx-auto max-w-md px-4 pb-16 pt-14 text-center">
      <div className="card p-8">
        <p className="chip mb-3 text-white/30">{"// onboarding complete"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          You&apos;re all set
        </h1>
        <p className="mt-3 text-sm text-white/50">
          Your shop is configured and ready to use.
        </p>
        <a
          href="/dashboard"
          className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white"
        >
          Continue to dashboard →
        </a>
      </div>
    </main>
  );
}

function StepFlow({
  currentStep,
  selected,
  branch,
  currency,
  setSelected,
  setBranchSelection,
  setCurrencySelection,
  handleNext,
  handleBack,
  handleFinish,
}: {
  currentStep: OnboardingStep;
  selected: ShopsMode | null;
  branch: string;
  currency: string;
  setSelected: (mode: ShopsMode) => void;
  setBranchSelection: (value: string) => void;
  setCurrencySelection: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleFinish: () => void;
}) {
  const stepContent: Record<
    OnboardingStep,
    { heading: string; subtitle: string }
  > = {
    1: {
      heading: "Choose your shop mode",
      subtitle:
        "Select how you want to use NexoraXS Shops. You can change this later in Settings.",
    },
    2: {
      heading: "Set up your store",
      subtitle:
        "Choose a branch and default currency. You can update these later in Settings.",
    },
    3: {
      heading: "Review your setup",
      subtitle:
        "Confirm the details below before entering your dashboard.",
    },
  };

  return (
    <main className="mx-auto max-w-xl px-4 pb-16 pt-14">
      <div className="mb-10 text-center">
        <p className="chip mb-3 text-white/30">{"// onboarding"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {stepContent[currentStep].heading}
        </h1>
        <p className="mt-3 text-sm text-white/50">
          {stepContent[currentStep].subtitle}
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <section className="space-y-3">
          {modes.map((mode) => (
            <ModeCard
              key={mode.mode}
              mode={mode.mode}
              title={mode.title}
              description={mode.description}
              icon={mode.icon}
              features={mode.features}
              recommended={mode.recommended}
              selected={selected === mode.mode}
              onSelect={setSelected}
            />
          ))}

          <button
            type="button"
            onClick={handleNext}
            disabled={!selected}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition-all ${
              selected
                ? "btn-primary"
                : "cursor-not-allowed border border-white/10 bg-white/5 opacity-40"
            }`}
          >
            Next →
          </button>
        </section>
      )}

      {currentStep === 2 && (
        <section className="space-y-6">
          <div className="card p-6">
            <p className="chip mb-3 text-white/30">{"// store setup choices"}</p>
            <h2 className="text-2xl font-bold text-white">Choose defaults</h2>
            <p className="mt-2 text-sm text-white/50">
              Pick the branch and currency you want to start with. You can
              update them later in settings.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">Branch</h3>
                  <span className="text-xs text-white/40">Required</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {branchOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBranchSelection(option)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        branch === option
                          ? "border-blue-500/40 bg-blue-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="font-medium">{option}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">Currency</h3>
                  <span className="text-xs text-white/40">Required</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {currencyOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCurrencySelection(option)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        currency === option
                          ? "border-blue-500/40 bg-blue-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="font-medium">{option}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60">
                    <Icon name="dashboard" className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Mustafa&apos;s Co.
                    </div>
                    <div className="text-xs text-white/40">
                      Selected mode: {modeLabel[selected ?? "both"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="space-y-6">
          <div className="card p-6">
            <p className="chip mb-3 text-white/30">{"// review setup"}</p>
            <h2 className="text-2xl font-bold text-white">Review setup</h2>
            <p className="mt-2 text-sm text-white/50">
              Confirm the values below before entering your dashboard.
            </p>

            <div className="mt-6 space-y-3">
              <DetailRow icon="dashboard" label={`Mode: ${modeLabel[selected ?? "both"]}`} />
              <DetailRow icon="map-pin" label={`Branch: ${branch}`} />
              <DetailRow icon="banknote" label={`Currency: ${currency}`} />
              <DetailRow icon="dashboard" label="Store: Mustafa&apos;s Co." />
            </div>
          </div>

          <div className="card p-6">
            <p className="chip mb-3 text-white/30">{"// next after dashboard"}</p>
            <h3 className="text-lg font-semibold text-white">Next after dashboard</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Add first product",
                "Invite team member",
                "Review settings",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-white/20" />
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="btn-primary flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            >
              Finish setup
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default function OnboardingPage() {
  const mounted = useMounted();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [selected, setSelected] = useState<ShopsMode | null>(null);
  const [branch, setBranchState] = useState<string | null>(null);
  const [currency, setCurrencyState] = useState<string | null>(null);
  const router = useRouter();
  const persistedSelected = mounted ? getMode() : null;
  const persistedBranch = mounted ? getBranch() : null;
  const persistedCurrency = mounted ? getCurrency() : null;
  const isComplete = mounted ? isOnboardingComplete() : false;
  const resolvedSelected = selected ?? persistedSelected;
  const resolvedBranch = branch ?? persistedBranch ?? "Maadi Main";
  const resolvedCurrency = currency ?? persistedCurrency ?? "EGP";

  const handleNext = () => {
    if (currentStep === 1) {
      if (!resolvedSelected) return;
      setMode(resolvedSelected);
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setBranch(resolvedBranch);
      setCurrency(resolvedCurrency);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      return;
    }

    if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleFinish = () => {
    if (resolvedSelected) {
      setMode(resolvedSelected);
    }
    setBranch(resolvedBranch);
    setCurrency(resolvedCurrency);
    completeOnboarding();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)" }}
            >
              S
            </div>
            <span className="text-sm font-semibold text-white">
              Nexora<span className="gradient-text">XS</span>{" "}
              <span className="font-normal text-white/50">Shops</span>
            </span>
          </div>
        </div>
      </header>

      {!mounted ? (
        <main className="mx-auto max-w-xl px-4 pb-16 pt-14">
          <div className="card flex min-h-[320px] items-center justify-center p-8 text-center">
            <p className="text-sm text-white/50">Loading setup...</p>
          </div>
        </main>
      ) : isComplete ? (
        <CompletionState />
      ) : (
        <StepFlow
          currentStep={currentStep}
          selected={resolvedSelected}
          branch={resolvedBranch}
          currency={resolvedCurrency}
          setSelected={setSelected}
          setBranchSelection={setBranchState}
          setCurrencySelection={setCurrencyState}
          handleNext={handleNext}
          handleBack={handleBack}
          handleFinish={handleFinish}
        />
      )}
    </div>
  );
}
