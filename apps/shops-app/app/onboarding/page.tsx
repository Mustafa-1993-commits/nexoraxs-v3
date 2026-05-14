"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { StepBusinessType } from "@/components/onboarding/StepBusinessType";
import { StepReview } from "@/components/onboarding/StepReview";
import { StepSalesModel } from "@/components/onboarding/StepSalesModel";
import {
  StepStoreSetup,
  type StoreSetupData,
} from "@/components/onboarding/StepStoreSetup";
import {
  completeOnboarding,
  getBusinessType,
  getBranch,
  getMode,
  getStoreName,
  isOnboardingComplete,
  setBranch,
  setBusinessType as persistBusinessType,
  setCountry,
  setCurrency,
  setMode,
  setStoreName,
  type BusinessType,
  type ShopsMode,
} from "@/lib/mode";

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  "Egypt":                 "EGP",
  "Saudi Arabia":          "SAR",
  "United Arab Emirates":  "AED",
  "Kuwait":                "KWD",
  "Qatar":                 "QAR",
};
const DEFAULT_WORKSPACE_COUNTRY = "Egypt";
const DEFAULT_WORKSPACE_CURRENCY = "EGP";

function getCurrencyForCountry(c: string): string {
  return COUNTRY_CURRENCY_MAP[c] ?? DEFAULT_WORKSPACE_CURRENCY;
}

type OnboardingStep = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<OnboardingStep, string> = {
  1: "Business",
  2: "Sales",
  3: "Setup",
  4: "Review",
};

function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function useSessionValue<T>(
  getSnapshot: () => T,
  serverSnapshot: () => T,
): T {
  return useSyncExternalStore(() => () => {}, getSnapshot, serverSnapshot);
}

function Stepper({ currentStep }: { currentStep: OnboardingStep }) {
  const steps = [1, 2, 3, 4] as const;

  return (
    <div className="mb-10 space-y-4">
      <div className="chip text-gray-500">{`Step ${currentStep} of 4`}</div>
      <div className="flex items-start gap-3 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex min-w-0 flex-1 items-start gap-3">
              {index > 0 && (
                <div
                  className={`mt-5 h-px flex-1 rounded ${
                    step <= currentStep ? "bg-blue-500/40" : "bg-white/10"
                  }`}
                />
              )}
              <div className="flex min-w-0 flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isCurrent
                      ? "bg-blue-600 text-white"
                      : isComplete
                        ? "bg-blue-600/30 text-blue-400"
                        : "border border-white/20 text-white/30"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {step}
                </div>
                <span className="mt-2 font-mono text-[10px] text-gray-600">
                  {STEP_LABELS[step]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompletionState() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-14">
      <div className="card w-full p-8 text-center">
        <p className="chip mb-3 text-white/30">{"// onboarding complete"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          You&apos;re all set
        </h1>
        <p className="mt-3 text-sm text-white/50">
          Your shop workspace is ready.
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

export default function OnboardingPage() {
  const mounted = useMounted();
  const router = useRouter();
  const persistedBusinessType = useSessionValue(getBusinessType, () => null);
  const persistedSalesModel = useSessionValue(getMode, () => null);
  const persistedStoreName = useSessionValue(getStoreName, () => "");
  const persistedBranch = useSessionValue(getBranch, () => "");
  const workspaceCountry =
    useSessionValue(
      () => (typeof window !== "undefined" ? sessionStorage.getItem("core_workspace_country") : null),
      () => DEFAULT_WORKSPACE_COUNTRY,
    ) ?? DEFAULT_WORKSPACE_COUNTRY;
  const workspaceCurrency = getCurrencyForCountry(workspaceCountry);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [businessType, setBusinessType] = useState<BusinessType | null>(
    persistedBusinessType,
  );
  const [salesModel, setSalesModel] = useState<ShopsMode | null>(
    persistedSalesModel,
  );
  const [storeSetup, setStoreSetup] = useState<StoreSetupData>({
    storeName: persistedStoreName ?? "",
    branch: persistedBranch ?? "",
  });

  const isComplete = mounted ? isOnboardingComplete() : false;

  const canProceed =
    (currentStep === 1 && businessType !== null) ||
    (currentStep === 2 && salesModel !== null) ||
    (currentStep === 3 &&
      storeSetup.storeName.trim() !== "" &&
      storeSetup.branch.trim() !== "") ||
    currentStep === 4;

  const handleContinue = (): void => {
    if (currentStep === 1) {
      if (!businessType) {
        return;
      }

      persistBusinessType(businessType);
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!salesModel) {
        return;
      }

      setMode(salesModel);
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!canProceed) {
        return;
      }

      setStoreName(storeSetup.storeName.trim());
      setBranch(storeSetup.branch.trim());
      setCurrency(workspaceCurrency);
      setCountry(workspaceCountry);
      setCurrentStep(4);
    }
  };

  const handleBack = (): void => {
    if (currentStep === 1) {
      return;
    }

    setCurrentStep((step) => (step - 1) as OnboardingStep);
  };

  const handleFinish = (): void => {
    if (
      !businessType ||
      !salesModel ||
      storeSetup.storeName.trim() === "" ||
      storeSetup.branch.trim() === ""
    ) {
      return;
    }

    persistBusinessType(businessType);
    setMode(salesModel);

    setStoreName(storeSetup.storeName.trim());
    setBranch(storeSetup.branch.trim());
    setCurrency(workspaceCurrency);
    setCountry(workspaceCountry);
    completeOnboarding();
    router.push("/dashboard");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                S
              </div>
              <span className="text-sm font-semibold text-white">
                Nexora<span className="text-cyan-300">XS</span>{" "}
                <span className="font-normal text-white/50">Shops</span>
              </span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 pt-8 pb-32">
          <div className="card flex min-h-[320px] items-center justify-center p-8 text-center">
            <p className="text-sm text-white/50">Loading setup...</p>
          </div>
        </main>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                S
              </div>
              <span className="text-sm font-semibold text-white">
                Nexora<span className="text-cyan-300">XS</span>{" "}
                <span className="font-normal text-white/50">Shops</span>
              </span>
            </div>
          </div>
        </header>
        <CompletionState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-sm font-bold text-white">
              S
            </div>
            <span className="text-sm font-semibold text-white">
              Nexora<span className="text-cyan-300">XS</span>{" "}
              <span className="font-normal text-white/50">Shops</span>
            </span>
          </div>
          <div className="chip text-gray-500">visual onboarding</div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-8 pb-32">
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <StepBusinessType
            selected={businessType}
            onSelect={setBusinessType}
          />
        )}

        {currentStep === 2 && (
          <StepSalesModel
            selected={salesModel}
            onSelect={setSalesModel}
          />
        )}

        {currentStep === 3 && (
          <StepStoreSetup
            data={storeSetup}
            onChange={setStoreSetup}
            businessType={businessType}
            salesModel={salesModel}
            onGoToStep={(step) => setCurrentStep(step as OnboardingStep)}
            workspaceCountry={workspaceCountry}
            workspaceCurrency={workspaceCurrency}
          />
        )}

        {currentStep === 4 && (
          <StepReview
            businessType={businessType}
            salesModel={salesModel}
            setup={storeSetup}
            workspaceCountry={workspaceCountry}
            workspaceCurrency={workspaceCurrency}
          />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={handleBack}
            className={`rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white ${
              currentStep === 1 ? "pointer-events-none opacity-0" : ""
            }`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={currentStep === 4 ? handleFinish : handleContinue}
            disabled={currentStep !== 4 && !canProceed}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all ${
              currentStep === 4 || canProceed
                ? "btn-primary"
                : "cursor-not-allowed border border-white/10 bg-white/5 opacity-40"
            }`}
          >
            {currentStep === 4 ? "Finish setup" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
