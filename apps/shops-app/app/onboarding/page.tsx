"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StepBusinessAndSales } from "@/components/onboarding/StepBusinessAndSales";
import { StepStoreSetup } from "@/components/onboarding/StepStoreSetup";
import { StepProducts } from "@/components/onboarding/StepProducts";
import { StepReview } from "@/components/onboarding/StepReview";
import {
  completeOnboarding,
  getBusinessType,
  getBusinessTypeCustom,
  getBranch,
  getBranchAddress,
  getMode,
  getOnboardingProducts,
  getStoreName,
  getTimezone,
  getCountry,
  getCurrency,
  isOnboardingComplete,
  setBranch,
  setBranchAddress,
  setBusinessType as persistBusinessType,
  setBusinessTypeCustom,
  setCountry,
  setCurrency,
  setMode,
  setOnboardingProducts,
  setStoreName,
  setTimezone,
  type BusinessType,
  type ShopsMode,
} from "@/lib/mode";
import type { OnboardingProduct, StoreSetupFormData } from "@/lib/onboarding-types";

type OnboardingStep = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<OnboardingStep, string> = {
  1: "Business & Sales",
  2: "Store Setup",
  3: "Products",
  4: "Review & Launch",
};

const DEFAULT_STORE_SETUP: StoreSetupFormData = {
  storeName: "",
  branch: "",
  branchAddress: "",
  branchCountry: "Egypt",
  branchCurrency: "EGP",
  branchTimezone: "Africa/Cairo",
};

const EMPTY_PRODUCT: OnboardingProduct = { name: "", price: 0, stock: 0 };

// All values read from sessionStorage on client mount
interface SessionSnapshot {
  businessType: BusinessType | null;
  customBusinessType: string;
  salesModel: ShopsMode;
  storeSetup: StoreSetupFormData;
  products: OnboardingProduct[];
  isComplete: boolean;
}

function readSessionSnapshot(): SessionSnapshot {
  const pp = getOnboardingProducts();
  return {
    businessType:       getBusinessType(),
    customBusinessType: getBusinessTypeCustom() ?? "",
    salesModel:         getMode() ?? "both",
    storeSetup: {
      storeName:      getStoreName()      ?? DEFAULT_STORE_SETUP.storeName,
      branch:         getBranch()         ?? DEFAULT_STORE_SETUP.branch,
      branchAddress:  getBranchAddress()  ?? DEFAULT_STORE_SETUP.branchAddress,
      branchCountry:  getCountry()        ?? DEFAULT_STORE_SETUP.branchCountry,
      branchCurrency: getCurrency()       ?? DEFAULT_STORE_SETUP.branchCurrency,
      branchTimezone: getTimezone()       ?? DEFAULT_STORE_SETUP.branchTimezone,
    },
    products:   pp.length > 0 ? pp : [{ ...EMPTY_PRODUCT }],
    isComplete: isOnboardingComplete(),
  };
}

// ─── Shell: reads sessionStorage after mount; server and first client render both get null ───

export default function OnboardingPage() {
  // Initial state is null on both server and client so the pre-rendered HTML
  // matches the first client render (no hydration mismatch).
  // useEffect runs after hydration and populates session from sessionStorage.
  const [session, setSession] = useState<SessionSnapshot | null>(null);

  useEffect(() => {
    setSession(readSessionSnapshot());
  }, []);

  if (session === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]" suppressHydrationWarning>
        <OnboardingHeader />
        <main className="mx-auto max-w-5xl px-4 pt-8 pb-32">
          <div className="card flex min-h-[320px] items-center justify-center p-8 text-center">
            <p className="text-sm text-white/50">Loading setup…</p>
          </div>
        </main>
      </div>
    );
  }

  if (session.isComplete) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]" suppressHydrationWarning>
        <OnboardingHeader />
        <CompletionState />
      </div>
    );
  }

  return <OnboardingFlow initialSession={session} />;
}

// ─── Flow: owns all interactive form state ───────────────────────────────────

function OnboardingFlow({ initialSession }: { initialSession: SessionSnapshot }) {
  const router = useRouter();

  const [currentStep, setCurrentStep]               = useState<OnboardingStep>(1);
  const [businessType, setBusinessType]             = useState<BusinessType | null>(initialSession.businessType);
  const [customBusinessType, setCustomBusinessType] = useState<string>(initialSession.customBusinessType);
  const [salesModel, setSalesModel]                 = useState<ShopsMode | null>(initialSession.salesModel);
  const [storeSetup, setStoreSetup]                 = useState<StoreSetupFormData>(initialSession.storeSetup);
  const [products, setProducts]                     = useState<OnboardingProduct[]>(initialSession.products);

  const canProceed: boolean =
    currentStep === 1
      ? businessType !== null &&
        salesModel !== null &&
        (businessType !== "other" || customBusinessType.trim() !== "")
      : currentStep === 2
        ? storeSetup.storeName.trim() !== "" && storeSetup.branchCountry.trim() !== ""
        : true;

  const handleContinue = (): void => {
    if (currentStep === 1) {
      if (!canProceed || !businessType || !salesModel) return;
      persistBusinessType(businessType);
      setMode(salesModel);
      setBusinessTypeCustom(customBusinessType);
      setCurrentStep(2);
      return;
    }
    if (currentStep === 2) {
      if (!canProceed) return;
      setStoreName(storeSetup.storeName.trim());
      setBranch(storeSetup.branch.trim());
      setBranchAddress(storeSetup.branchAddress.trim());
      setCurrency(storeSetup.branchCurrency);
      setCountry(storeSetup.branchCountry);
      setTimezone(storeSetup.branchTimezone);
      setCurrentStep(3);
      return;
    }
    if (currentStep === 3) {
      setOnboardingProducts(products.filter((p) => p.name.trim() !== ""));
      setCurrentStep(4);
    }
  };

  const handleSkipProducts = (): void => {
    setOnboardingProducts([]);
    setCurrentStep(4);
  };

  const handleBack = (): void => {
    if (currentStep === 1) return;
    setCurrentStep((s) => (s - 1) as OnboardingStep);
  };

  const handleFinish = (): void => {
    if (!businessType || !salesModel || storeSetup.storeName.trim() === "") return;
    persistBusinessType(businessType);
    setMode(salesModel);
    setBusinessTypeCustom(customBusinessType);
    setStoreName(storeSetup.storeName.trim());
    setBranch(storeSetup.branch.trim());
    setBranchAddress(storeSetup.branchAddress.trim());
    setCurrency(storeSetup.branchCurrency);
    setCountry(storeSetup.branchCountry);
    setTimezone(storeSetup.branchTimezone);
    setOnboardingProducts(products.filter((p) => p.name.trim() !== ""));
    completeOnboarding();
    router.push("/dashboard");
  };

  const validProductsCount = products.filter((p) => p.name.trim() !== "").length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]" suppressHydrationWarning>
      <OnboardingHeader />

      <main className="mx-auto max-w-5xl px-4 pt-8 pb-32">
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <StepBusinessAndSales
            businessType={businessType}
            customBusinessType={customBusinessType}
            salesModel={salesModel}
            onBusinessTypeChange={setBusinessType}
            onCustomBusinessTypeChange={setCustomBusinessType}
            onSalesModelChange={setSalesModel}
          />
        )}
        {currentStep === 2 && (
          <StepStoreSetup data={storeSetup} onChange={setStoreSetup} />
        )}
        {currentStep === 3 && (
          <StepProducts
            currency={storeSetup.branchCurrency}
            products={products}
            onChange={setProducts}
            onSkip={handleSkipProducts}
          />
        )}
        {currentStep === 4 && (
          <StepReview
            businessType={businessType}
            customBusinessType={customBusinessType}
            salesModel={salesModel}
            setup={storeSetup}
            productsCount={validProductsCount}
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

          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canProceed}
              className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all ${
                canProceed
                  ? "btn-primary"
                  : "cursor-not-allowed border border-white/10 bg-white/5 opacity-40"
              }`}
            >
              Continue →
            </button>
          )}

          {currentStep === 4 && (
            <button
              type="button"
              onClick={handleFinish}
              className="flex-1 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Launch Store →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

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
                <span className="mt-2 text-center font-mono text-[9px] leading-tight text-gray-600">
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
        <h1 className="text-3xl font-bold tracking-tight text-white">You&apos;re all set</h1>
        <p className="mt-3 text-sm text-white/50">Your shop workspace is ready.</p>
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

function OnboardingHeader() {
  return (
    <header className="border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-sm font-bold text-white">
            S
          </div>
          <span className="text-sm font-semibold text-white">
            Nexora<span className="text-cyan-300">XS</span>{" "}
            <span className="font-normal text-white/50">Commerce OS</span>
          </span>
        </div>
        <div className="chip text-gray-500">setup wizard</div>
      </div>
    </header>
  );
}
