import React from 'react';
interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`font-mono text-[10px] sm:text-xs font-medium tracking-widest uppercase text-slate-500 flex items-center gap-2 ${className}`}>
      
      <span className="text-slate-600">{'//'}</span>
      {children}
    </div>);

}