import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'green' | 'purple' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className = '',
  variant = 'default',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-game font-bold uppercase transition-all duration-100 select-none cursor-pointer border-[3px] border-border rounded-xl active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--shadow-color)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0';

  const variantStyles = {
    default: 'bg-card text-foreground shadow-[3px_3px_0px_var(--shadow-color)] hover:bg-background',
    primary: 'bg-retro-orange text-white shadow-[3px_3px_0px_var(--shadow-color)] hover:opacity-95',
    secondary: 'bg-pop-yellow text-slate-900 shadow-[3px_3px_0px_var(--shadow-color)] hover:opacity-95',
    accent: 'bg-pop-pink text-slate-900 shadow-[3px_3px_0px_var(--shadow-color)] hover:opacity-95',
    green: 'bg-pop-green text-slate-900 shadow-[3px_3px_0px_var(--shadow-color)] hover:opacity-95',
    purple: 'bg-pop-purple text-white shadow-[3px_3px_0px_var(--shadow-color)] hover:opacity-95',
    outline: 'bg-transparent text-foreground border-[3px] border-border hover:bg-border/5 shadow-[2px_2px_0px_var(--shadow-color)]',
    ghost: 'bg-transparent text-foreground border-transparent hover:bg-border/5 shadow-none border-0 active:translate-y-0 active:shadow-none rounded-lg',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-3 text-sm tracking-wider',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
