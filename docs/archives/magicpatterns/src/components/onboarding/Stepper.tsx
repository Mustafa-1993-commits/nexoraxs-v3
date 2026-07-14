import React from 'react';
import { Check } from 'lucide-react';
interface StepItem {
  num: number;
  label: string;
}
interface StepperProps {
  currentStep: number;
  steps: StepItem[];
}
export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting line background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/10 z-0 hidden sm:block" />

        {/* Active connecting line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-cyan-500 to-violet-500 z-0 transition-all duration-500 hidden sm:block"
          style={{
            width: `${(currentStep - 1) / (steps.length - 1) * 100}%`
          }} />
        

        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;
          const isUpcoming = currentStep < step.num;
          return (
            <div
              key={step.num}
              className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
              
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300
                  ${isCompleted ? 'bg-cyan-500 text-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : ''}
                  ${isActive ? 'bg-[#07080B] border-2 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''}
                  ${isUpcoming ? 'bg-[#07080B] border border-white/20 text-slate-500' : ''}
                `}>
                
                {isCompleted ?
                <Check className="w-3 h-3 sm:w-4 sm:h-4" /> :

                step.num
                }
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium hidden sm:block
                  ${isActive ? 'text-slate-200' : 'text-slate-500'}
                `}>
                
                {step.label}
              </span>
            </div>);

        })}
      </div>
    </div>);

}