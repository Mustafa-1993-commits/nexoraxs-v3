import React from 'react';
import { motion } from 'framer-motion';
interface FlowNodeProps {
  step: number;
  title: string;
  lane: 'core' | 'api' | 'shops';
  laneLabel: string;
  endpoint?: string;
  route?: string;
  details?: React.ReactNode;
  note?: React.ReactNode;
  action?: React.ReactNode;
  redirect?: React.ReactNode;
  delay?: number;
}
export function FlowNode({
  step,
  title,
  lane,
  laneLabel,
  endpoint,
  route,
  details,
  note,
  action,
  redirect,
  delay = 0
}: FlowNodeProps) {
  const laneColors = {
    core: 'bg-violet-500',
    api: 'bg-amber-500',
    shops: 'bg-cyan-500'
  };
  const laneTextColors = {
    core: 'text-violet-400',
    api: 'text-amber-400',
    shops: 'text-cyan-400'
  };
  const laneBgColors = {
    core: 'bg-violet-500/10',
    api: 'bg-amber-500/10',
    shops: 'bg-cyan-500/10'
  };
  const laneBorderColors = {
    core: 'border-violet-500/20',
    api: 'border-amber-500/20',
    shops: 'border-cyan-500/20'
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay
      }}
      className="relative w-full max-w-3xl mx-auto mb-8">
      
      <div
        className={`glass-card overflow-hidden flex flex-col sm:flex-row relative`}>
        
        {/* Left edge bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${laneColors[lane]}`} />
        

        <div className="p-5 sm:p-6 pl-6 sm:pl-8 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 ${laneColors[lane]}`}>
              
              {step}
            </div>
            <div
              className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${laneTextColors[lane]} ${laneBgColors[lane]} ${laneBorderColors[lane]}`}>
              
              {laneLabel}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-100 mb-4">{title}</h3>

          <div className="space-y-3">
            {endpoint &&
            <div className="flex items-center gap-2">
                <div className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-xs font-mono text-slate-300 flex items-center gap-2">
                  <span
                  className={`w-1.5 h-1.5 rounded-full ${laneColors[lane]}`} />
                
                  {endpoint}
                </div>
              </div>
            }

            {route &&
            <div className="flex items-center gap-2">
                <div className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-xs font-mono text-slate-400">
                  Route: {route}
                </div>
              </div>
            }

            {action && <div className="text-sm text-slate-300">{action}</div>}

            {details && <div className="text-sm text-slate-400">{details}</div>}

            {redirect &&
            <div className="mt-4 inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-lg text-xs font-mono">
                {redirect}
              </div>
            }

            {note && <div className="mt-4">{note}</div>}
          </div>
        </div>
      </div>
    </motion.div>);

}