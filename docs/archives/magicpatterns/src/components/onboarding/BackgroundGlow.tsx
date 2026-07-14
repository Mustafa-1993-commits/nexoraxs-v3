import React from 'react';
export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
      <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-violet-900/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
    </div>);

}