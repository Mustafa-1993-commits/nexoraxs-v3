import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
interface TransitionCardProps {
  title: string;
  primaryAction: string;
  secondaryAction?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}
export function TransitionCard({
  title,
  primaryAction,
  secondaryAction,
  onPrimaryClick,
  onSecondaryClick
}: TransitionCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      className="w-full max-w-lg mx-auto mt-12">
      
      <div className="glass-card p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[40px]" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-semibold text-slate-100 mb-8">{title}</h2>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            onClick={onPrimaryClick}
            className="w-full py-3 text-base">
            
            {primaryAction} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {secondaryAction && onSecondaryClick &&
          <Button
            variant="secondary"
            onClick={onSecondaryClick}
            className="w-full py-3 text-base">
            
              {secondaryAction}
            </Button>
          }
        </div>
      </div>
    </motion.div>);

}