import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../SectionLabel';
import {
  Store,
  Stethoscope,
  Users,
  Wrench,
  UtensilsCrossed,
  Check } from
'lucide-react';
export interface WorkspaceAppsData {
  shops: boolean;
  clinics: boolean;
  crm: boolean;
  maintenance: boolean;
  restaurants: boolean;
}
interface WsStepAppsProps {
  data: WorkspaceAppsData;
  onChange: (data: WorkspaceAppsData) => void;
}
const apps = [
{
  id: 'shops',
  icon: Store,
  title: 'NexoraXS Shops',
  desc: 'Retail, POS, and inventory management.',
  available: true,
  tint: 'text-cyan-400',
  bgTint: 'bg-cyan-400/10',
  borderTint: 'border-cyan-400/20'
},
{
  id: 'clinics',
  icon: Stethoscope,
  title: 'NexoraXS Clinics',
  desc: 'Appointments, EMR, and patient management.',
  available: false,
  tint: 'text-emerald-400',
  bgTint: 'bg-emerald-400/10',
  borderTint: 'border-emerald-400/20'
},
{
  id: 'maintenance',
  icon: Wrench,
  title: 'NexoraXS Maintenance',
  desc: 'Work orders, technicians, and assets.',
  available: false,
  tint: 'text-amber-400',
  bgTint: 'bg-amber-400/10',
  borderTint: 'border-amber-400/20'
},
{
  id: 'restaurants',
  icon: UtensilsCrossed,
  title: 'NexoraXS Restaurants',
  desc: 'Menu, orders, kitchen, and delivery.',
  available: false,
  tint: 'text-orange-400',
  bgTint: 'bg-orange-400/10',
  borderTint: 'border-orange-400/20'
},
{
  id: 'crm',
  icon: Users,
  title: 'NexoraXS CRM',
  desc: 'Client database, deals, and pipelines.',
  available: false,
  tint: 'text-blue-400',
  bgTint: 'bg-blue-400/10',
  borderTint: 'border-blue-400/20'
}] as
const;
export function WsStepApps({ data, onChange }: WsStepAppsProps) {
  const toggleApp = (id: keyof WorkspaceAppsData) => {
    onChange({
      ...data,
      [id]: !data[id]
    });
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel className="justify-center mb-4">STEP 02</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          Choose the apps you want to enable
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          You can add or remove apps later from your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {apps.map((app, idx) => {
          const isSelected = data[app.id as keyof WorkspaceAppsData];
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
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
              onClick={() =>
              app.available && toggleApp(app.id as keyof WorkspaceAppsData)
              }
              disabled={!app.available}
              className={`relative text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 flex items-start gap-4
                ${!app.available ? 'opacity-50 cursor-not-allowed glass-card' : ''}
                ${app.available && isSelected ? 'bg-violet-950/20 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.1)] ring-1 ring-violet-500/50' : app.available ? 'glass-card glass-card-hover group' : ''}
              `}>
              
              <div
                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border ${app.bgTint} ${app.borderTint} ${app.tint}`}>
                
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={`text-base sm:text-lg font-semibold ${isSelected ? 'text-violet-50' : 'text-slate-200'}`}>
                    
                    {app.title}
                  </h3>
                  {!app.available &&
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      Coming Soon
                    </span>
                  }
                  {app.available && isSelected &&
                  <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                      Enabled
                    </span>
                  }
                </div>
                <p className="text-sm text-slate-400">{app.desc}</p>
              </div>

              {app.available &&
              <div
                className={`w-6 h-6 shrink-0 rounded-full border flex items-center justify-center transition-colors mt-1
                  ${isSelected ? 'bg-violet-500 border-violet-500 text-white' : 'border-white/20 text-transparent group-hover:border-white/40'}
                `}>
                
                  <Check className="w-4 h-4" />
                </div>
              }
            </motion.button>);

        })}
      </div>

      <div className="text-center">
        <p className="text-xs font-mono text-slate-500">
          {'//'} MVP · Only NexoraXS Shops is available at launch
        </p>
      </div>
    </div>);

}