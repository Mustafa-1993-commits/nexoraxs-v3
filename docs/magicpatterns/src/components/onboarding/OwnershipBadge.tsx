import React from 'react';
import { Layers, Store } from 'lucide-react';
interface OwnershipBadgeProps {
  app: 'core-platform' | 'shops-app';
}
export function OwnershipBadge({ app }: OwnershipBadgeProps) {
  const isCore = app === 'core-platform';
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${isCore ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
      
      {isCore ? <Layers className="w-3 h-3" /> : <Store className="w-3 h-3" />}
      {app}
    </div>);

}