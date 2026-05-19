import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../SectionLabel';
import { ChevronDown, Info } from 'lucide-react';
export interface WorkspaceData {
  workspaceName: string;
  slug: string;
  region: string;
  currency: string;
}
interface WsStepCreateProps {
  data: WorkspaceData;
  onChange: (data: WorkspaceData) => void;
}
function slugify(text: string): string {
  return text.
  toLowerCase().
  replace(/[^\w\s-]/g, '').
  replace(/\s+/g, '-').
  replace(/-+/g, '-').
  replace(/^-+|-+$/g, '');
}
export function WsStepCreate({ data, onChange }: WsStepCreateProps) {
  const [slugTouched, setSlugTouched] = useState(false);
  useEffect(() => {
    if (!slugTouched && data.workspaceName) {
      onChange({
        ...data,
        slug: slugify(data.workspaceName)
      });
    }
  }, [data.workspaceName, slugTouched]);
  const handleChange = (field: keyof WorkspaceData, value: string) => {
    if (field === 'slug') {
      setSlugTouched(true);
    }
    onChange({
      ...data,
      [field]: value
    });
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel className="justify-center mb-4">STEP 01</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          Create your workspace
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Set up your company's central account on NexoraXS.
        </p>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="glass-card p-6 sm:p-8 space-y-6 mb-6">
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Workspace Name
          </label>
          <input
            type="text"
            value={data.workspaceName}
            onChange={(e) => handleChange('workspaceName', e.target.value)}
            className="w-full bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-slate-600"
            placeholder="e.g. Mustafa's Co." />
          
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Workspace Slug
          </label>
          <div className="flex items-center">
            <div className="bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-4 py-3 text-slate-500 font-mono text-sm">
              nexoraxs.com/
            </div>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="flex-1 bg-[#07080B] border border-white/10 rounded-r-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-slate-600 font-mono text-sm"
              placeholder="mustafa-co" />
            
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Region
            </label>
            <div className="relative">
              <select
                value={data.region}
                onChange={(e) => handleChange('region', e.target.value)}
                className="w-full appearance-none bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all">
                
                <option value="eu-central-1">EU Central (Frankfurt)</option>
                <option value="me-south-1">Middle East (Bahrain)</option>
                <option value="us-east-1">US East (N. Virginia)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Default Currency
            </label>
            <div className="relative">
              <select
                value={data.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full appearance-none bg-[#07080B] border border-white/10 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all">
                
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="EUR">EUR - Euro</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-sm text-blue-200">
        <Info className="w-5 h-5 shrink-0 text-blue-400" />
        <p>
          Region controls data residency. Default currency applies across the
          workspace — individual apps can override later.
        </p>
      </div>
    </div>);

}