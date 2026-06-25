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
        className={`w-20 h-20 rounded-full flex items-center justify-center border-4 relative transition-all duration-300 shadow-lg cursor-pointer ${
          isCompleted
            ? 'bg-emerald-950 border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105 hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]'
            : isLocked
            ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed opacity-60'
            : 'bg-indigo-950 border-indigo-400 text-indigo-300 shadow-[0_0_20px_rgba(129,140,248,0.3)] animate-pulse hover:animate-none hover:scale-110 hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_25px_rgba(244,114,182,0.6)]'
        }`}
      >
        {isCompleted ? (
          <Check className="w-8 h-8 stroke-[3]" />
        ) : isLocked ? (
          <Lock className="w-7 h-7" />
        ) : (
          <Play className="w-8 h-8 fill-indigo-400 stroke-indigo-400 translate-x-0.5 group-hover:fill-pink-400 group-hover:stroke-pink-400" />
        )}

        {/* Level XP Floating badge */}
        {!isLocked && !isCompleted && (
          <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-0.5 shadow-md">
            <Sparkles className="w-2.5 h-2.5" />
            +{xpReward}
          </span>
        )}
      </button>

      {/* Info card underneath the node */}
      <div className="text-center mt-3 max-w-[200px]">
        <h4 className={`font-mono text-sm font-bold tracking-tight ${
          isCompleted ? 'text-emerald-400' : isLocked ? 'text-slate-500' : 'text-indigo-200 group-hover:text-pink-300 transition-colors'
        }`}>
          {title}
        </h4>
        <p className="text-xs text-slate-400 font-medium mt-0.5 font-mono">{concept}</p>
        
        {/* Difficulty flag */}
        {!isLocked && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border mt-1.5 inline-block font-mono ${
            difficulty === 'Easy'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : difficulty === 'Medium'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {difficulty}
          </span>
        )}
      </div>
    </div>
  );
}
