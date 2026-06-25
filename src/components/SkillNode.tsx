'use client';

import { Check, Lock, Play, Sparkles } from 'lucide-react';
import { playClickSound } from '@/lib/audio';

interface SkillNodeProps {
  id: string;
  title: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
  index: number;
}

export default function SkillNode({
  title,
  concept,
  difficulty,
  xpReward,
  isCompleted,
  isLocked,
  onClick,
  index,
}: SkillNodeProps) {
  const handleClick = () => {
    if (!isLocked) {
      playClickSound();
      onClick();
    }
  };

  // Alternating side displacement for Duolingo-like path layout
  const offsetClasses = [
    'translate-x-0',
    'translate-x-6 md:translate-x-12',
    'translate-x-0',
    '-translate-x-6 md:-translate-x-12',
  ];
  const offsetClass = offsetClasses[index % offsetClasses.length];

  return (
    <div className={`flex flex-col items-center select-none py-4 relative group ${offsetClass}`}>
      
      {/* Visual node circle */}
      <button
        onClick={handleClick}
        disabled={isLocked}
        className={`w-20 h-20 rounded-full flex items-center justify-center border-[3px] border-border relative transition-all duration-300 cursor-pointer shadow-[3px_3px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
          isCompleted
            ? 'bg-pop-green text-slate-900 hover:scale-105'
            : isLocked
            ? 'bg-card border-border-muted text-slate-500 cursor-not-allowed opacity-50 shadow-[1px_1px_0px_var(--shadow-color)]'
            : 'bg-pop-yellow text-slate-900 hover:scale-115 hover:-rotate-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_var(--shadow-color)]'
        }`}
      >
        {isCompleted ? (
          <Check className="w-8 h-8 stroke-[3]" />
        ) : isLocked ? (
          <Lock className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Play className="w-8 h-8 fill-slate-900 stroke-slate-900 translate-x-0.5 group-hover:fill-retro-orange group-hover:stroke-retro-orange transition-colors" />
        )}

        {/* Level XP Floating badge */}
        {!isLocked && !isCompleted && (
          <span className="absolute -top-2.5 -right-2.5 bg-retro-orange text-white text-[9px] font-game font-extrabold px-2.5 py-0.5 rounded-full border-2 border-border shadow-[1px_1px_0px_var(--shadow-color)] flex items-center gap-0.5 animate-pulse">
            <Sparkles className="w-2.5 h-2.5" />
            +{xpReward}
          </span>
        )}
      </button>

      {/* Info card underneath the node */}
      <div className="text-center mt-3 max-w-[200px]">
        <h4 className={`font-game text-xs font-extrabold uppercase tracking-wide ${
          isCompleted 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : isLocked 
            ? 'text-slate-400' 
            : 'text-retro-orange group-hover:text-retro-pink transition-colors'
        }`}>
          {title}
        </h4>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{concept}</p>
        
        {/* Difficulty flag */}
        {!isLocked && (
          <span className={`text-[8px] font-game font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border-2 border-border mt-1.5 inline-block ${
            difficulty === 'Easy'
              ? 'bg-pop-green/30 text-slate-800 dark:text-emerald-300'
              : difficulty === 'Medium'
              ? 'bg-pop-yellow/30 text-slate-800 dark:text-amber-300'
              : 'bg-pop-pink/30 text-slate-800 dark:text-rose-300'
          }`}>
            {difficulty}
          </span>
        )}
      </div>
    </div>
  );
}
