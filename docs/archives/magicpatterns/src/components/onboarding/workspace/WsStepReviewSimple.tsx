import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Building2,
  Link as LinkIcon,
  Server,
  DollarSign,
  User,
  LayoutGrid,
  Rocket } from
'lucide-react';
import { SectionLabel } from '../SectionLabel';
import { WorkspaceData } from './WsStepCreate';
import { WorkspaceAppsData } from './WsStepApps';
interface WsStepReviewSimpleProps {
  data: WorkspaceData;
  apps: WorkspaceAppsData;
}
export function WsStepReviewSimple({ data, apps }: WsStepReviewSimpleProps) {
  const enabledAppsList = Object.entries(apps).
  filter(([_, enabled]) => enabled).
  map(([id]) => {
    const names: Record<string, string> = {
      shops: 'NexoraXS Shops',
      clinics: 'NexoraXS Clinics',
      maintenance: 'NexoraXS Maintenance',
      restaurants: 'NexoraXS Restaurants',
      crm: 'NexoraXS CRM'
    };
    return names[id] || id;
  });
  const summaryCards = [
  {
    label: 'Workspace Name',
    value: data.workspaceName,
    icon: Building2
  },
  {
    label: 'Slug',
    value: `nexoraxs.com/${data.slug}`,
    icon: LinkIcon
  },
  {
    label: 'Region',
    value: data.region,
    icon: Server
  },
  {
    label: 'Default Currency',
    value: data.currency,
    icon: DollarSign
  },
  {
    label: 'Team Owner',
    value: 'Mustafa Ahmed',
    icon: User
  },
  {
    label: 'Enabled Apps',
    value: enabledAppsList.length > 0 ? enabledAppsList.join(', ') : 'None',
    icon: LayoutGrid
  }];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mb-6 ring-1 ring-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 mb-3 tracking-tight">
          Your workspace is ready
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          {data.workspaceName} is now set up on NexoraXS.
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
        }}>
        
        <SectionLabel className="mb-4">WORKSPACE SUMMARY</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
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

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
            <Rocket className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              Ready to go
            </h3>
            <p className="text-sm text-slate-300">
              Continue to your workspace dashboard to enable apps and invite
              your team.
            </p>
          </div>
        </div>
      </motion.div>
    </div>);

}