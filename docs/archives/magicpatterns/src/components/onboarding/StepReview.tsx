import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Store,
  MapPin,
  DollarSign,
  Globe,
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  Receipt,
  CreditCard,
  BarChart3,
  ShoppingBag,
  Plus,
  ArrowRight,
  Building2 } from
'lucide-react';
import { SectionLabel } from './SectionLabel';
import { StoreSetupData } from './StepStoreSetup';
import { BusinessType } from './StepBusinessType';
import { SalesModel } from './StepSalesModel';
interface StepReviewProps {
  data: StoreSetupData;
  businessType: BusinessType;
  salesModel: SalesModel;
}
export function StepReview({
  data,
  businessType,
  salesModel
}: StepReviewProps) {
  const formatType = (t: string | null) =>
  t ? t.charAt(0).toUpperCase() + t.slice(1) + ' Store' : 'Store';
  const formatModel = (m: string | null) => {
    if (m === 'both') return 'Physical + Online';
    if (m === 'physical') return 'Physical only';
    if (m === 'online') return 'Online only';
    return 'Not set';
  };
  const summaryCards = [
  {
    label: 'Workspace',
    value: "Mustafa's Co.",
    icon: Building2
  },
  {
    label: 'Business Type',
    value: formatType(businessType),
    icon: Store
  },
  {
    label: 'Sales Model',
    value: formatModel(salesModel),
    icon: ShoppingBag
  },
  {
    label: 'Store Name',
    value: data.storeName,
    icon: LayoutDashboard
  },
  {
    label: 'Main Branch',
    value: data.branch,
    icon: MapPin
  },
  {
    label: 'Currency',
    value: data.currency,
    icon: DollarSign
  },
  {
    label: 'Country',
    value: data.country,
    icon: Globe
  }];

  const baseModules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    desc: 'Overview & metrics'
  },
  {
    id: 'products',
    name: 'Products',
    icon: Package,
    desc: 'Catalog management'
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Boxes,
    desc: 'Stock tracking'
  },
  {
    id: 'customers',
    name: 'Customers',
    icon: Users,
    desc: 'CRM & profiles'
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: Receipt,
    desc: 'Orders & invoices'
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: BarChart3,
    desc: 'Analytics & exports'
  }];

  const modules = [...baseModules];
  if (salesModel === 'physical' || salesModel === 'both') {
    modules.splice(5, 0, {
      id: 'pos',
      name: 'POS',
      icon: CreditCard,
      desc: 'Point of sale'
    });
  }
  if (salesModel === 'online' || salesModel === 'both') {
    modules.push({
      id: 'storefront',
      name: 'Storefront',
      icon: Globe,
      desc: 'E-commerce site'
    });
  }
  const nextActions = [
  {
    title: 'Add first product',
    desc: 'Create items to sell'
  },
  {
    title: 'Set opening stock',
    desc: 'Initialize your inventory'
  },
  {
    title: 'Add another branch',
    desc: 'Expand your physical locations'
  },
  {
    title: 'Invite team member',
    desc: 'Add staff and assign roles'
  },
  {
    title: 'Review shop settings',
    desc: 'Configure taxes and receipts'
  }];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-12">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mb-6 ring-1 ring-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          Your shop workspace is ready
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Review your setup. You can change anything later from Settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Summary & Modules */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}>
            
            <SectionLabel className="mb-4">SETUP SUMMARY</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {summaryCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="glass-card p-4 flex flex-col gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-0.5">
                        {card.label}
                      </div>
                      <div className="text-sm font-medium text-slate-200 truncate">
                        {card.value}
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </motion.div>

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
              delay: 0.1
            }}>
            
            <SectionLabel className="mb-4">ENABLED MODULES</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {modules.map((mod, idx) => {
                const Icon = mod.icon;
                const isOnline = mod.id === 'storefront';
                return (
                  <div
                    key={idx}
                    className="glass-card p-4 relative overflow-hidden group">
                    
                    {isOnline &&
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-500/20">
                        Online
                      </div>
                    }
                    <Icon className="w-5 h-5 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-medium text-slate-200 mb-1">
                      {mod.name}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {mod.desc}
                    </div>
                  </div>);

              })}
            </div>
          </motion.div>
        </div>

        {/* Right Col: Next Actions */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: 0.2
          }}
          className="lg:col-span-1">
          
          <SectionLabel className="mb-4">NEXT RECOMMENDED ACTIONS</SectionLabel>
          <div className="glass-card p-2">
            {nextActions.map((action, idx) =>
            <button
              key={idx}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group text-left">
              
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors shrink-0">
                  0{idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {action.title}
                  </div>
                  <div className="text-xs text-slate-500">{action.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>);

}