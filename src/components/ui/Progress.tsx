import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'primary' | 'yellow' | 'pink' | 'green' | 'purple';
}

export function Progress({
  value,
  max = 100,
  className = '',
  color = 'primary'
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorStyles = {
    primary: 'bg-retro-orange',
    yellow: 'bg-pop-yellow',
    pink: 'bg-pop-pink',
    green: 'bg-pop-green',
    purple: 'bg-pop-purple'
  };

  return (
    <div className={`w-full h-5 bg-card border-[3px] border-border rounded-full overflow-hidden relative shadow-[2px_2px_0px_var(--shadow-color)] ${className}`}>
      <div
        className={`h-full transition-all duration-300 ease-out ${colorStyles[color]} ${
          percentage > 0 ? 'border-r-2 border-border' : ''
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
