import React from 'react';
import { motion } from 'framer-motion';
import { Store, Globe, Layers, Check } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
export type SalesModel = 'physical' | 'online' | 'both' | null;
interface StepSalesModelProps {
  selected: SalesModel;
  onSelect: (model: SalesModel) => void;
}
const models = [
{
  id: 'physical',
  icon: Store,
  title: 'Physical store only',
  desc: 'Sell in-person at a brick-and-mortar location.',
  features: ['POS', 'Branch operations', 'Inventory', 'Walk-in customers'],
  tint: 'text-emerald-400',
  bgTint: 'bg-emerald-400/10',
  borderTint: 'border-emerald-400/20'
},
{
  id: 'online',
  icon: Globe,
  title: 'Online store only',
  desc: 'Sell exclusively through your e-commerce website.',
  features: [
  'Product catalog',
  'Online orders',
  'Storefront',
  'Customer checkout'],

  tint: 'text-blue-400',
  bgTint: 'bg-blue-400/10',
  borderTint: 'border-blue-400/20'
},
{
  id: 'both',
  icon: Layers,
  title: 'Both physical + online',
  desc: 'Manage in-store and online sales from one place.',
  features: ['Unified inventory', 'POS', 'Storefront', 'Reports'],
  tint: 'text-cyan-400',
  bgTint: 'bg-cyan-400/10',
  borderTint: 'border-cyan-400/20',
  recommended: true
}] as
const;
export function StepSalesModel({ selected, onSelect }: StepSalesModelProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel className="justify-center mb-4">STEP 02</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          How do you sell?
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Choose how customers reach your products. This shapes which modules we
          turn on.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {models.map((model, idx) => {
          const isSelected = selected === model.id;
          const Icon = model.icon;
          return (
            <motion.button
              key={model.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: idx * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 24
              }}
              onClick={() => onSelect(model.id as SalesModel)}
              className={`relative w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 group flex flex-col md:flex-row gap-6 md:items-center
                ${isSelected ? 'bg-cyan-950/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.05)] ring-1 ring-cyan-500/50' : 'glass-card glass-card-hover'}
              `}>
              
              {/* Left accent border for selected state */}
              {isSelected &&
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-cyan-500 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              }

              <div className="flex items-start md:items-center gap-5 flex-1 pl-2">
                <div
                  className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center border ${model.bgTint} ${model.borderTint} ${model.tint}`}>
                  
                  <Icon className="w-7 h-7" />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className={`text-lg sm:text-xl font-semibold ${isSelected ? 'text-cyan-50' : 'text-slate-200 group-hover:text-white'}`}>
                      
                      {model.title}
                    </h3>
                    {model.recommended &&
                    <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-cyan-500/20">
                        Recommended
                      </span>
                    }
                  </div>
                  <p className="text-sm text-slate-400">{model.desc}</p>
                </div>
              </div>

              <div className="md:w-[300px] shrink-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 pl-2 md:pl-6 md:border-l border-white/10">
                {model.features.map((feature, fIdx) =>
                <div
                  key={fIdx}
                  className="flex items-center gap-2 text-sm text-slate-300">
                  
                    <Check
                    className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  
                    {feature}
                  </div>
                )}
              </div>

              {isSelected &&
              <div className="absolute top-4 right-4 md:static md:ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-slate-900">
                  <Check className="w-4 h-4" />
                </div>
              }
            </motion.button>);

        })}
      </div>
    </div>);

}