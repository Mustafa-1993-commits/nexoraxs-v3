import React from 'react';
import { ChevronLeft, Store, Building2, GitBranch } from 'lucide-react';
import { OwnershipBadge } from './OwnershipBadge';
interface TopbarProps {
  activeFlow: 'workspace' | 'shops' | 'architecture';
}
export function Topbar({ activeFlow }: TopbarProps) {
  const isWorkspace = activeFlow === 'workspace';
  const isShops = activeFlow === 'shops';
  const isArchitecture = activeFlow === 'architecture';
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/[0.06] bg-[#07080B]/80 backdrop-blur-xl z-50 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 sm:gap-8">
        <button className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Platform</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded bg-gradient-to-br flex items-center justify-center text-white ${isWorkspace ? 'from-violet-500 to-fuchsia-600' : isShops ? 'from-cyan-500 to-blue-600' : 'from-slate-500 to-slate-700'}`}>
            
            {isWorkspace ?
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4" /> :
            isShops ?
            <Store className="w-3 h-3 sm:w-4 sm:h-4" /> :

            <GitBranch className="w-3 h-3 sm:w-4 sm:h-4" />
            }
          </div>
          <span className="font-semibold text-sm sm:text-base text-slate-200 tracking-tight">
            NexoraXS{' '}
            <span className="text-slate-400 font-normal">
              {isWorkspace ? 'Core' : isShops ? 'Shops' : 'Architecture'}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:block">
          {!isArchitecture &&
          <OwnershipBadge app={isWorkspace ? 'core-platform' : 'shops-app'} />
          }
          {isArchitecture &&
          <span className="text-xs text-slate-500 font-medium">
              Architecture · Visual prototype
            </span>
          }
        </div>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-white ring-2 ring-[#07080B]">
          MA
        </div>
      </div>
    </header>);

}