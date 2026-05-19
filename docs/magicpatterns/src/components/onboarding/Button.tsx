import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07080B] disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
    'bg-cyan-500 hover:bg-cyan-400 text-slate-950 focus:ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]',
    secondary:
    'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 focus:ring-slate-500'
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}>
      
      {children}
    </button>);

}