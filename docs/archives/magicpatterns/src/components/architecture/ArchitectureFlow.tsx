import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Server,
  Store,
  ChevronDown,
  MousePointerClick,
  Key,
  Clock,
  Shield,
  Link as LinkIcon,
  ArrowRight,
  AlertCircle,
  GitBranch } from
'lucide-react';
import { FlowNode } from './FlowNode';
import { DataModel, ArchitectureRules } from './DataModel';
export function ArchitectureFlow() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 mb-6">
          Flow 021
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-100 mb-4 tracking-tight">
          NexoraXS · App Launch Architecture
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          End-to-end journey: workspace creation → app enablement → secure
          handoff → shops setup
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" /> core-platform · localhost:3001
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Server className="w-3.5 h-3.5" /> API · localhost:8080
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Store className="w-3.5 h-3.5" /> shops-app · localhost:3002
          </div>
        </div>
        <p className="text-[10px] font-mono text-slate-500 mt-4">
          {'//'} dev environment URLs — production routes through nexoraxs.com
        </p>
      </div>

      {/* Main Flow */}
      <div className="relative">
        <FlowNode
          step={1}
          title="Register / Login"
          lane="core"
          laneLabel="core-platform · localhost:3001"
          endpoint="POST /api/auth/login"
          details="User authenticates with email + password. Issues a session token."
          delay={0.05} />
        
        <Connector />

        <FlowNode
          step={2}
          title="Create workspace"
          lane="core"
          laneLabel="core-platform · localhost:3001"
          endpoint="POST /api/workspaces"
          details={
          <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <span className="font-mono text-xs">Workspace name</span>
              </li>
              <li>
                <span className="font-mono text-xs">Slug</span>
              </li>
              <li>
                <span className="font-mono text-xs">Region</span>
              </li>
              <li>
                <span className="font-mono text-xs">Default currency</span>
              </li>
            </ul>
          }
          note={
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-slate-400 italic">
              Workspace = company / tenant. NOT a shop or a branch.
            </div>
          }
          delay={0.1} />
        
        <Connector />

        <FlowNode
          step={3}
          title="Workspace settings"
          lane="core"
          laneLabel="core-platform · localhost:3001"
          route="/dashboard/settings"
          details={
          <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <span className="font-mono text-xs">Workspace name</span>
              </li>
              <li>
                <span className="font-mono text-xs">Slug</span>
              </li>
              <li>
                <span className="font-mono text-xs">Region</span>
              </li>
              <li>
                <span className="font-mono text-xs">Default currency</span>
              </li>
              <li>
                <span className="font-mono text-xs">Owner / team</span>
              </li>
              <li>
                <span className="font-mono text-xs">Enabled apps</span>
              </li>
            </ul>
          }
          note={
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-sm text-amber-200/80 flex gap-2 items-start italic">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <p>
                Workspace settings do NOT include branches, POS, inventory,
                storefront, products, or any shop-specific configuration. Those
                live in shops-app.
              </p>
            </div>
          }
          delay={0.15} />
        
        <Connector />

        <FlowNode
          step={4}
          title="App launcher / Apps page"
          lane="core"
          laneLabel="core-platform · localhost:3001"
          route="/dashboard/apps"
          endpoint="POST /api/workspaces/{workspaceId}/apps/enable"
          action={
          <div className="flex items-center gap-2 mt-2 text-slate-300">
              <MousePointerClick className="w-4 h-4 text-violet-400" />
              User clicks Enable on NexoraXS Shops
            </div>
          }
          delay={0.2} />
        
        <Connector />

        <FlowNode
          step={5}
          title="API creates launch token"
          lane="api"
          laneLabel="API · localhost:8080"
          endpoint="POST /api/launch-tokens (internal)"
          details={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded text-xs">
                <Key className="w-3.5 h-3.5 text-amber-400" /> UUID token
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Short expiry
                (~2 minutes)
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded text-xs">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Scoped to
                workspace + app + user
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded text-xs">
                <LinkIcon className="w-3.5 h-3.5 text-amber-400" /> One-time /
                single use
              </div>
            </div>
          }
          redirect={
          <>
              <ArrowRight className="w-3.5 h-3.5" /> Redirect →
              localhost:3002?launch_token=xxx
            </>
          }
          delay={0.25} />
        
        <Connector />

        <FlowNode
          step={6}
          title="Shops app verifies launch token"
          lane="shops"
          laneLabel="shops-app · localhost:3002"
          endpoint="POST /api/launch-tokens/verify"
          details={
          <div className="mt-3">
              <div className="text-xs font-mono text-slate-500 mb-2">
                Returns:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 border border-white/10 p-1.5 rounded text-xs text-center">
                  workspace context
                </div>
                <div className="bg-white/5 border border-white/10 p-1.5 rounded text-xs text-center">
                  user context
                </div>
                <div className="bg-white/5 border border-white/10 p-1.5 rounded text-xs text-center">
                  app access
                </div>
                <div className="bg-white/5 border border-white/10 p-1.5 rounded text-xs text-center">
                  setup_completed flag
                </div>
              </div>
            </div>
          }
          note={
          <div className="mt-6 border-t border-white/10 pt-4">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center justify-center gap-2">
                <GitBranch className="w-4 h-4 text-slate-400" /> Decision:
                setup_completed?
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <div className="flex-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 p-3 rounded-lg text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  false → Step 7A · Onboarding
                </div>
                <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-center text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  true → Step 7B · Dashboard
                </div>
              </div>
            </div>
          }
          delay={0.3} />
        
        <Connector />

        {/* Split 7A / 7B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
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
              delay: 0.35
            }}
            className="glass-card relative overflow-hidden flex flex-col">
            
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
            <div className="p-6 pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 bg-cyan-500">
                  7A
                </div>
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                  shops-app
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-1">
                Shops onboarding
              </h3>
              <p className="text-sm text-slate-400 mb-5">
                Commerce app setup inside existing workspace
              </p>

              <div className="space-y-2 mb-5">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs">
                  <span className="text-cyan-400 font-mono mr-2">01</span>{' '}
                  Choose business type — Mobile / Accessories / Clothing /
                  Supermarket / Electronics / Cosmetics / Other
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs">
                  <span className="text-cyan-400 font-mono mr-2">02</span>{' '}
                  Choose sales model — Physical / Online / Both
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs">
                  <span className="text-cyan-400 font-mono mr-2">03</span> Main
                  branch setup — Store display name, Main branch, Currency
                  (inherited), Country (inherited)
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs">
                  <span className="text-cyan-400 font-mono mr-2">04</span>{' '}
                  Review setup — Workspace, Business type, Sales model, Modules
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-slate-400 italic mb-4">
                Additional branches added later via Shops Settings → Branches
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded-lg text-xs font-mono">
                setup_completed = true → Shops Dashboard
              </div>
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
              delay: 0.4
            }}
            className="glass-card relative overflow-hidden flex flex-col">
            
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
            <div className="p-6 pl-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 bg-cyan-500">
                  7B
                </div>
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                  shops-app
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-1">
                Shops dashboard
              </h3>
              <p className="text-sm text-slate-400 mb-5">
                User already setup — straight to operations
              </p>

              <p className="text-sm text-slate-300 mb-6">
                Operations dashboard with sales metrics, recent orders, low
                stock, quick actions.
              </p>

              <div className="mt-auto bg-[#0A0C10] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-24 h-4 bg-white/10 rounded" />
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 h-16 rounded-lg border border-white/5" />
                  <div className="bg-white/5 h-16 rounded-lg border border-white/5" />
                  <div className="bg-white/5 h-16 rounded-lg border border-white/5" />
                  <div className="bg-white/5 h-16 rounded-lg border border-white/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DataModel />
      <ArchitectureRules />
    </div>);

}
function Connector() {
  return (
    <div className="flex flex-col items-center justify-center h-12 my-2">
      <div className="w-px h-full bg-gradient-to-b from-white/20 to-white/5" />
      <ChevronDown className="w-4 h-4 text-slate-500 -mt-2 bg-[#07080B]" />
    </div>);

}