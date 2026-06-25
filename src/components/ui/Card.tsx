import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'yellow' | 'orange' | 'pink' | 'green' | 'purple' | 'peach';
}

export function Card({ className = '', variant = 'default', children, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-card border-border',
    yellow: 'bg-pop-yellow text-slate-900 border-border',
    orange: 'bg-pop-orange text-white border-border',
    pink: 'bg-pop-pink text-slate-900 border-border',
    green: 'bg-pop-green text-slate-900 border-border',
    purple: 'bg-pop-purple text-white border-border',
    peach: 'bg-pop-peach text-slate-900 border-border',
  };

  return (
    <div
      className={`border-[3px] shadow-[4px_4px_0px_var(--shadow-color)] rounded-2xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col space-y-1.5 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg md:text-xl font-game font-extrabold uppercase tracking-wide text-foreground ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs text-slate-400 font-medium ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center pt-4 border-t-2 border-dashed border-border-muted mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
