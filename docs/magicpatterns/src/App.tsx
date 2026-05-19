import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGlow } from './components/onboarding/BackgroundGlow';
import { Topbar } from './components/onboarding/Topbar';
import { Stepper } from './components/onboarding/Stepper';
import { Button } from './components/onboarding/Button';
import { FlowSwitcher } from './components/onboarding/FlowSwitcher';
import { TransitionCard } from './components/onboarding/TransitionCard';
// Shops Flow Imports
import {
  StepBusinessType,
  BusinessType } from
'./components/onboarding/StepBusinessType';
import {
  StepSalesModel,
  SalesModel } from
'./components/onboarding/StepSalesModel';
import {
  StepStoreSetup,
  StoreSetupData } from
'./components/onboarding/StepStoreSetup';
import { StepReview } from './components/onboarding/StepReview';
// Workspace Flow Imports
import {
  WsStepCreate,
  WorkspaceData } from
'./components/onboarding/workspace/WsStepCreate';
import {
  WsStepApps,
  WorkspaceAppsData } from
'./components/onboarding/workspace/WsStepApps';
import { WsStepReviewSimple } from './components/onboarding/workspace/WsStepReviewSimple';
// Architecture Flow Import
import { ArchitectureFlow } from './components/architecture/ArchitectureFlow';
export function App() {
  const [activeFlow, setActiveFlow] = useState<
    'workspace' | 'shops' | 'architecture'>(
    'workspace');
  // Flow States
  const [wsStep, setWsStep] = useState(1);
  const [shopsStep, setShopsStep] = useState(1);
  const [wsFinished, setWsFinished] = useState(false);
  const [shopsFinished, setShopsFinished] = useState(false);
  // Workspace Data
  const [wsData, setWsData] = useState<WorkspaceData>({
    workspaceName: "Mustafa's Co.",
    slug: 'mustafa-co',
    region: 'eu-central-1',
    currency: 'EGP'
  });
  const [wsApps, setWsApps] = useState<WorkspaceAppsData>({
    shops: true,
    clinics: false,
    crm: false,
    maintenance: false,
    restaurants: false
  });
  // Shops Data
  const [businessType, setBusinessType] = useState<BusinessType>('mobile');
  const [salesModel, setSalesModel] = useState<SalesModel>('both');
  const [storeSetup, setStoreSetup] = useState<StoreSetupData>({
    storeName: "Mustafa's Mobile Store",
    branch: 'Maadi Main',
    currency: 'EGP',
    country: 'Egypt'
  });
  // Stepper Configs
  const wsSteps = [
  {
    num: 1,
    label: 'Create'
  },
  {
    num: 2,
    label: 'Apps'
  },
  {
    num: 3,
    label: 'Review'
  }];

  const shopsSteps = [
  {
    num: 1,
    label: 'Business Type'
  },
  {
    num: 2,
    label: 'Sales Model'
  },
  {
    num: 3,
    label: 'Shop Setup'
  },
  {
    num: 4,
    label: 'Review'
  }];

  const handleNext = () => {
    if (activeFlow === 'workspace') {
      if (wsStep < 3) setWsStep((prev) => prev + 1);else
      setWsFinished(true);
    } else if (activeFlow === 'shops') {
      if (shopsStep < 4) setShopsStep((prev) => prev + 1);else
      setShopsFinished(true);
    }
  };
  const handleBack = () => {
    if (activeFlow === 'workspace' && wsStep > 1) setWsStep((prev) => prev - 1);
    if (activeFlow === 'shops' && shopsStep > 1)
    setShopsStep((prev) => prev - 1);
  };
  const canProceed = () => {
    if (activeFlow === 'workspace') {
      if (wsStep === 1)
      return wsData.workspaceName.trim() !== '' && wsData.slug.trim() !== '';
      return true;
    } else if (activeFlow === 'shops') {
      if (shopsStep === 1) return businessType !== null;
      if (shopsStep === 2) return salesModel !== null;
      if (shopsStep === 3)
      return (
        storeSetup.storeName.trim() !== '' && storeSetup.branch.trim() !== '');

      return true;
    }
    return true;
  };
  const handleFlowSwitch = (flow: 'workspace' | 'shops' | 'architecture') => {
    setActiveFlow(flow);
    // Reset finished states when switching tabs for demo purposes
    if (flow === 'workspace') setWsFinished(false);
    if (flow === 'shops') setShopsFinished(false);
  };
  const isFinished =
  activeFlow === 'workspace' ?
  wsFinished :
  activeFlow === 'shops' ?
  shopsFinished :
  false;
  const currentStep = activeFlow === 'workspace' ? wsStep : shopsStep;
  const totalSteps = activeFlow === 'workspace' ? 3 : 4;
  return (
    <div className="min-h-screen bg-[#07080B] text-slate-200 font-sans selection:bg-cyan-500/30 relative overflow-x-hidden flex flex-col">
      <BackgroundGlow />
      <Topbar activeFlow={activeFlow} />

      <main className="flex-1 pt-24 pb-32 relative z-10 flex flex-col">
        {!isFinished &&
        <FlowSwitcher activeFlow={activeFlow} onChange={handleFlowSwitch} />
        }

        {activeFlow !== 'architecture' && !isFinished &&
        <Stepper
          currentStep={currentStep}
          steps={activeFlow === 'workspace' ? wsSteps : shopsSteps} />

        }

        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            {activeFlow === 'architecture' ?
            <motion.div
              key="architecture"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.3
              }}
              className="w-full">
              
                <ArchitectureFlow />
              </motion.div> :
            isFinished ?
            <motion.div key="finished" className="w-full">
                {activeFlow === 'workspace' ?
              <TransitionCard
                title="Workspace created successfully"
                primaryAction="Go to Core Platform Dashboard"
                secondaryAction="Open Shops from App Launcher"
                onPrimaryClick={() =>
                alert('Navigating to Core Platform Dashboard')
                }
                onSecondaryClick={() => handleFlowSwitch('shops')} /> :


              <TransitionCard
                title="Shop setup complete"
                primaryAction="Go to Shops Dashboard"
                onPrimaryClick={() =>
                alert('Navigating to Shops Dashboard')
                } />

              }
              </motion.div> :

            <motion.div
              key={`${activeFlow}-${currentStep}`}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.3
              }}
              className="w-full">
              
                {activeFlow === 'workspace' &&
              <>
                    {wsStep === 1 &&
                <WsStepCreate data={wsData} onChange={setWsData} />
                }
                    {wsStep === 2 &&
                <WsStepApps data={wsApps} onChange={setWsApps} />
                }
                    {wsStep === 3 &&
                <WsStepReviewSimple data={wsData} apps={wsApps} />
                }
                  </>
              }

                {activeFlow === 'shops' &&
              <>
                    {shopsStep === 1 &&
                <StepBusinessType
                  selected={businessType}
                  onSelect={setBusinessType} />

                }
                    {shopsStep === 2 &&
                <StepSalesModel
                  selected={salesModel}
                  onSelect={setSalesModel} />

                }
                    {shopsStep === 3 &&
                <StepStoreSetup
                  data={storeSetup}
                  onChange={setStoreSetup}
                  businessType={businessType}
                  salesModel={salesModel}
                  onEditPrevious={setShopsStep} />

                }
                    {shopsStep === 4 &&
                <StepReview
                  data={storeSetup}
                  businessType={businessType}
                  salesModel={salesModel} />

                }
                  </>
              }
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      {activeFlow !== 'architecture' && !isFinished &&
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-[#07080B]/90 backdrop-blur-xl border-t border-white/[0.06] z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={
            currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
            }>
            
              Back
            </Button>

            <div className="flex flex-col items-end gap-2">
              {currentStep < totalSteps ?
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}>
              
                  Continue
                </Button> :

            <Button variant="primary" onClick={handleNext}>
                  {activeFlow === 'workspace' ?
              'Continue to dashboard' :
              'Finish setup'}
                </Button>
            }
              {currentStep === totalSteps &&
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Visual prototype · no data is saved
                </span>
            }
            </div>
          </div>
        </div>
      }
    </div>);

}