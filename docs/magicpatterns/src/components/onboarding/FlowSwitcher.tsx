import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, GitBranch } from 'lucide-react';
interface FlowSwitcherProps {
  activeFlow: 'workspace' | 'shops' | 'architecture';
  onChange: (flow: 'workspace' | 'shops' | 'architecture') => void;
}
export function FlowSwitcher({ activeFlow, onChange }: FlowSwitcherProps) {
  return (
    <div className="flex flex-col items-center mb-8 sm:mb-12">
      <div className="bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-2xl flex gap-1 relative z-20 flex-wrap justify-center">
        <button
          onClick={() => onChange('workspace')}
          className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${activeFlow === 'workspace' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
          
          {activeFlow === 'workspace' &&
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6
            }} />

          }
          <div className="relative z-10 flex items-center gap-2 text-sm sm:text-base font-medium">
            <Building2 className="w-4 h-4" />
            Workspace Onboarding
          </div>
          <div className="relative z-10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest opacity-70">
            019 · CORE-PLATFORM
          </div>
        </button>

        <button
          onClick={() => onChange('shops')}
          className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${activeFlow === 'shops' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
          
          {activeFlow === 'shops' &&
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6
            }} />

          }
          <div className="relative z-10 flex items-center gap-2 text-sm sm:text-base font-medium">
            <Store className="w-4 h-4" />
            Shops Onboarding
          </div>
          <div className="relative z-10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest opacity-70">
            020 · SHOPS-APP
          </div>
        </button>

        <button
          onClick={() => onChange('architecture')}
          className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${activeFlow === 'architecture' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
          
          {activeFlow === 'architecture' &&
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6
            }} />

          }
          <div className="relative z-10 flex items-center gap-2 text-sm sm:text-base font-medium">
            <GitBranch className="w-4 h-4" />
            Architecture Flow
          </div>
          <div className="relative z-10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest opacity-70">
            021 · ARCHITECTURE
          </div>
        </button>
      </div>
    </div>);

}