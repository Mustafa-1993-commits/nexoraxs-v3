import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Watch,
  Shirt,
  ShoppingCart,
  Cpu,
  Sparkles,
  Store,
  Check } from
'lucide-react';
import { SectionLabel } from './SectionLabel';
export type BusinessType =
'mobile' |
'accessories' |
'clothing' |
'supermarket' |
'electronics' |
'cosmetics' |
'other' |
null;
interface StepBusinessTypeProps {
  selected: BusinessType;
  onSelect: (type: BusinessType) => void;
}
const categories = [
{
  id: 'mobile',
  icon: Smartphone,
  title: 'Mobile Store',
  desc: 'Phones, tablets, and repairs',
  examples: 'iPhone, Samsung, accessories, repairs',
  tint: 'text-cyan-400',
  bgTint: 'bg-cyan-400/10',
  borderTint: 'border-cyan-400/20'
},
{
  id: 'accessories',
  icon: Watch,
  title: 'Accessories Store',
  desc: 'Tech and lifestyle add-ons',
  examples: 'Cases, chargers, cables, headphones',
  tint: 'text-violet-400',
  bgTint: 'bg-violet-400/10',
  borderTint: 'border-violet-400/20'
},
{
  id: 'clothing',
  icon: Shirt,
  title: 'Clothing Store',
  desc: 'Apparel and fashion',
  examples: 'Apparel, shoes, sizes, seasonal',
  tint: 'text-pink-400',
  bgTint: 'bg-pink-400/10',
  borderTint: 'border-pink-400/20'
},
{
  id: 'supermarket',
  icon: ShoppingCart,
  title: 'Supermarket',
  desc: 'Groceries and daily needs',
  examples: 'Groceries, FMCG, fresh, household',
  tint: 'text-emerald-400',
  bgTint: 'bg-emerald-400/10',
  borderTint: 'border-emerald-400/20'
},
{
  id: 'electronics',
  icon: Cpu,
  title: 'Electronics Store',
  desc: 'Computers and home appliances',
  examples: 'Laptops, TVs, appliances, gadgets',
  tint: 'text-blue-400',
  bgTint: 'bg-blue-400/10',
  borderTint: 'border-blue-400/20'
},
{
  id: 'cosmetics',
  icon: Sparkles,
  title: 'Cosmetics Store',
  desc: 'Beauty and personal care',
  examples: 'Makeup, skincare, fragrance',
  tint: 'text-fuchsia-400',
  bgTint: 'bg-fuchsia-400/10',
  borderTint: 'border-fuchsia-400/20'
},
{
  id: 'other',
  icon: Store,
  title: 'Other Retail',
  desc: 'General retail business',
  examples: 'Tell us more in settings',
  tint: 'text-slate-400',
  bgTint: 'bg-slate-400/10',
  borderTint: 'border-slate-400/20'
}] as
const;
export function StepBusinessType({
  selected,
  onSelect
}: StepBusinessTypeProps) {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel className="justify-center mb-4">STEP 01</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          What type of shop do you run?
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          We'll tailor your workspace based on the products you sell.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {categories.map((cat) => {
          const isSelected = selected === cat.id;
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              variants={item}
              onClick={() => onSelect(cat.id as BusinessType)}
              className={`relative text-left p-5 rounded-2xl transition-all duration-200 group
                ${isSelected ? 'bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)] ring-1 ring-cyan-500/50' : 'glass-card glass-card-hover'}
              `}>
              
              {isSelected &&
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-cyan-500/20">
                  <Check className="w-3 h-3" /> Selected
                </div>
              }

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${cat.bgTint} ${cat.borderTint} ${cat.tint}`}>
                
                <Icon className="w-6 h-6" />
              </div>

              <h3
                className={`text-base sm:text-lg font-semibold mb-1 ${isSelected ? 'text-cyan-50' : 'text-slate-200 group-hover:text-white'}`}>
                
                {cat.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-1">
                {cat.desc}
              </p>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 flex items-baseline gap-1.5">
                  <span className="font-mono uppercase tracking-wider text-[10px] text-slate-600">
                    Ex:
                  </span>
                  <span className="truncate">{cat.examples}</span>
                </p>
              </div>
            </motion.button>);

        })}
      </motion.div>
    </div>);

}