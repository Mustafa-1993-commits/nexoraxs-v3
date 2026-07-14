import React from 'react';
import {
  Database,
  Users,
  Building2,
  Layers,
  Lock,
  AlertTriangle,
  ShieldOff,
  Store } from
'lucide-react';
import { SectionLabel } from '../onboarding/SectionLabel';
export function DataModel() {
  return (
    <div className="mt-16 mb-16">
      <SectionLabel className="mb-6">
        DATA MODEL · TENANT ISOLATION
      </SectionLabel>
      <h2 className="text-2xl font-semibold text-slate-100 mb-8">
        How the data is structured
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
        <TableCard
          name="users"
          columns={[
          {
            name: 'id',
            type: 'uuid',
            pk: true
          },
          {
            name: 'email',
            type: 'string'
          }]
          } />
        
        <TableConnector />
        <TableCard
          name="workspaces"
          columns={[
          {
            name: 'id',
            type: 'uuid',
            pk: true
          },
          {
            name: 'name',
            type: 'string'
          },
          {
            name: 'slug',
            type: 'string'
          }]
          } />
        
        <TableConnector />
        <TableCard
          name="workspace_apps"
          columns={[
          {
            name: 'workspace_id',
            type: 'uuid',
            fk: true
          },
          {
            name: 'app_id',
            type: 'string'
          },
          {
            name: 'setup_completed',
            type: 'boolean'
          }]
          } />
        
        <TableConnector />
        <TableCard
          name="shops_settings"
          columns={[
          {
            name: 'workspace_id',
            type: 'uuid',
            fk: true
          },
          {
            name: 'business_type',
            type: 'string'
          },
          {
            name: 'sales_model',
            type: 'string'
          }]
          } />
        
        <TableConnector />
        <TableCard
          name="branches"
          columns={[
          {
            name: 'id',
            type: 'uuid',
            pk: true
          },
          {
            name: 'workspace_id',
            type: 'uuid',
            fk: true
          },
          {
            name: 'name',
            type: 'string'
          }]
          } />
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-300">
            Users own or belong to workspaces
          </p>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-300">
            Workspaces are isolated tenants
          </p>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-300">
            workspace_apps stores enabled apps + setup_completed status
          </p>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-300">
            shops_settings + branches are scoped via workspace_id
          </p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl text-center">
        <p className="text-cyan-400 font-medium text-sm">
          Every business table includes{' '}
          <span className="font-mono bg-cyan-500/20 px-1.5 py-0.5 rounded">
            workspace_id
          </span>{' '}
          for strict multi-tenant isolation.
        </p>
      </div>
    </div>);

}
function TableCard({ name, columns }: {name: string;columns: any[];}) {
  return (
    <div className="glass-card p-4 w-full lg:w-48 shrink-0">
      <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
        <Database className="w-4 h-4 text-slate-400" />
        <span className="font-mono text-sm font-semibold text-slate-200">
          {name}
        </span>
      </div>
      <div className="space-y-2">
        {columns.map((col, i) =>
        <div
          key={i}
          className="flex items-center justify-between text-[10px] font-mono">
          
            <span className="text-slate-300">{col.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">{col.type}</span>
              {col.pk &&
            <span className="bg-amber-500/20 text-amber-400 px-1 rounded">
                  PK
                </span>
            }
              {col.fk &&
            <span className="bg-cyan-500/20 text-cyan-400 px-1 rounded">
                  FK
                </span>
            }
            </div>
          </div>
        )}
      </div>
    </div>);

}
function TableConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center w-8 text-slate-600">
      →
    </div>);

}
export function ArchitectureRules() {
  return (
    <div>
      <SectionLabel className="mb-6">ARCHITECTURE RULES</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 flex gap-4">
          <Layers className="w-6 h-6 text-violet-400 shrink-0" />
          <p className="text-sm text-slate-300">
            core-platform owns auth, workspace, app launcher, billing, general
            workspace settings
          </p>
        </div>
        <div className="glass-card p-5 flex gap-4">
          <Store className="w-6 h-6 text-cyan-400 shrink-0" />
          <p className="text-sm text-slate-300">
            shops-app owns business type, sales model, branches, products,
            inventory, POS, storefront
          </p>
        </div>
        <div className="glass-card p-5 flex gap-4 border-amber-500/20 bg-amber-500/5">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          <p className="text-sm text-slate-300">
            A branch is NOT a workspace. Additional branches are added in Shops
            Settings → Branches.
          </p>
        </div>
        <div className="glass-card p-5 flex gap-4 border-slate-500/20 bg-slate-500/5">
          <ShieldOff className="w-6 h-6 text-slate-400 shrink-0" />
          <p className="text-sm text-slate-300">
            No localhost hardcoding in production. URLs above are dev only.
          </p>
        </div>
      </div>
    </div>);

}