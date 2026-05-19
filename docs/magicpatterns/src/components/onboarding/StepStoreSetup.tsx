import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Store, ChevronDown } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { BusinessType } from './StepBusinessType';
import { SalesModel } from './StepSalesModel';
export interface StoreSetupData {
  storeName: string;
  branch: string;
  currency: string;
  country: string;
}
interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType;
  salesModel: SalesModel;
  onEditPrevious: (step: number) => void;
}
export function StepStoreSetup({
  data,
  onChange,
  businessType,
  salesModel,
  onEditPrevious
}: StepStoreSetupProps) {
  const handleChange = (field: keyof StoreSetupData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };
  const formatType = (t: string | null) =>
  t ? t.charAt(0).toUpperCase() + t.slice(1) + ' Store' : 'Store';
  const formatModel = (m: string | null) => {
    if (m === 'both') return 'Physical + Online';
    if (m === 'physical') return 'Physical only';
    if (m === 'online') return 'Online only';
    return 'Not set';
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel className="justify-center mb-4">STEP 03</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          Set up your shop
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          A few details so we can create your store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Left: Form */}
        <motion.div
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="lg:col-span-3 space-y-6">
          
          <div className="glass-card p-6 sm:p-8 space-y-6">
            {/* Read-only summaries */}
            <div className="flex flex-wrap gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 w-full mb-2">
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                  Workspace:
                </span>
                Mustafa's Co.{' '}
                <span className="text-slate-500 text-xs ml-auto">
                  (Read-only)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                  Type:
                </span>
                {formatType(businessType)}
                <button
                  onClick={() => onEditPrevious(1)}
                  className="ml-2 text-slate-500 hover:text-cyan-400 transition-colors">
                  
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider">
                  Model:
                </span>
                {formatModel(salesModel)}
                <button
                  onClick={() => onEditPrevious(2)}
                  className="ml-2 text-slate-500 hover:text-cyan-400 transition-colors">
                  
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Store Display Name
                </label>
                <input
                  type="text"
                  value={data.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  className="w-full bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                  placeholder="e.g. Mustafa's Mobile Store" />
                
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Main Branch
                </label>
                <input
                  type="text"
                  value={data.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="w-full bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                  placeholder="e.g. Maadi Main" />
                
                <p className="text-xs text-slate-500 mt-2">
                  You can add more branches later from Shops Settings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex justify-between">
                    Currency <span className="text-slate-600">(Inherited)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={data.currency}
                      onChange={(e) => handleChange('currency', e.target.value)}
                      className="w-full appearance-none bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all">
                      
                      <option value="EGP">EGP - Egyptian Pound</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="SAR">SAR - Saudi Riyal</option>
                      <option value="AED">AED - UAE Dirham</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex justify-between">
                    Country / Market{' '}
                    <span className="text-slate-600">(Inherited)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={data.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="w-full appearance-none bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all">
                      
                      <option value="Egypt">Egypt</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="USA">United States</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Live Preview */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="lg:col-span-2">
          
          <div className="sticky top-24">
            <SectionLabel className="mb-4">LIVE PREVIEW</SectionLabel>

            {/* Mocked Workspace Card */}
            <div className="bg-[#0A0C10] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Topbar mock */}
              <div className="h-12 border-b border-white/[0.06] bg-white/[0.02] flex items-center px-4 gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>

              <div className="p-5">
                {/* Store switcher mock */}
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 mb-6">
                  <div className="w-10 h-10 rounded bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    {data.storeName ?
                    data.storeName.charAt(0).toUpperCase() :
                    'S'}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-0.5">
                      Store
                    </div>
                    <div className="text-sm font-semibold text-slate-200 truncate">
                      {data.storeName || 'Store Name'}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </div>

                {/* Branch chip mock */}
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 mb-6">
                  <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-slate-400 border border-white/10">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-0.5">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-slate-200 truncate">
                      {data.branch || 'Main Branch'}
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-transparent mb-6" />

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Currency:{' '}
                    <span className="text-slate-300 font-medium">
                      {data.currency}
                    </span>
                  </div>
                  <div>
                    Market:{' '}
                    <span className="text-slate-300 font-medium">
                      {data.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle glow inside preview */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

}