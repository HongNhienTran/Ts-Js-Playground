'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameStateContext';
import { Trophy, Swords, Flame, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { challenges } from '@/data/challenges';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';

export default function Challenges() {
  const router = useRouter();
  const game = useGame();

  const t = i18n[game.language || 'en'];

  const handleFightBoss = (challengeId: string, minLevel: number) => {
    if (game.level < minLevel) return;
    playClickSound();
    router.push(`/practice/play?track=ch&id=${challengeId}`);
  };

  const getMinLevelForChallenge = (id: string) => {
    if (id === 'ch-1') return 1;
    if (id === 'ch-2') return 2;
    return 3;
  };

  const getChallengeEmblem = (id: string) => {
    if (id === 'ch-1') return <Flame className="w-7 h-7 text-rose-400" />;
    if (id === 'ch-2') return <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />;
    return <Trophy className="w-7 h-7 text-cyan-400" />;
  };

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'Easy') return t.difficultyEasy;
    if (diff === 'Medium') return t.difficultyMedium;
    return t.difficultyHard;
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-mono">
      
      {/* Header title */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-game font-bold uppercase mb-4 tracking-wider">
          <Swords className="w-3.5 h-3.5" />
          {t.bossArena}
        </div>
        <h2 className="text-xl md:text-3xl font-game font-bold tracking-wide text-retro-orange mb-6 uppercase drop-shadow-[2px_2px_0px_#000]">
          {t.bossTitle}
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed max-w-lg mx-auto">
          {t.bossDesc}
        </p>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {challenges.map((ch) => {
          const isCompleted = game.completedChallenges.includes(ch.id);
          const minLevel = getMinLevelForChallenge(ch.id);
          const isLocked = game.level < minLevel;

          return (
            <motion.div
              key={ch.id}
              whileHover={!isLocked ? { y: -4 } : {}}
              onClick={() => handleFightBoss(ch.id, minLevel)}
              className={`p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isCompleted
                  ? 'pixel-box border-emerald-500/30'
                  : isLocked
                  ? 'pixel-box-slate opacity-50 cursor-not-allowed'
                  : 'pixel-box border-rose-500/20 hover:border-rose-500/40 hover:shadow-[4px_4px_0px_#f43f5e] cursor-pointer'
              }`}
            >
              {/* Highlight line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                isCompleted 
                  ? 'bg-emerald-500' 
                  : isLocked 
                  ? 'bg-slate-700' 
                  : 'bg-rose-500'
              }`} />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded border flex items-center justify-center ${
                    isLocked 
                      ? 'bg-slate-900 border-slate-800 text-slate-600' 
                      : isCompleted 
                      ? 'bg-emerald-500/10 border-emerald-500/25' 
                      : 'bg-rose-500/10 border-rose-500/25'
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : getChallengeEmblem(ch.id)}
                  </div>
                  
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[9px] font-game font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                      <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-emerald-950" />
                      {t.slayed}
                    </span>
                  )}

                  {isLocked && (
                    <span className="text-[9px] font-game font-bold text-slate-500 border border-slate-850 px-2 py-0.5 rounded uppercase">
                      {t.reqLvl} {minLevel}
                    </span>
                  )}
                </div>

                <h3 className={`text-sm font-game font-bold mb-3 uppercase tracking-wide transition-colors ${
                  isLocked ? 'text-slate-600' : 'text-foreground group-hover:text-rose-400'
                }`}>
                  {game.language === 'vi' ? ch.titleVi : ch.titleEn}
                </h3>
                
                <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-3 mb-6 font-mono">
                  {ch.concept}
                </p>
              </div>

              <div>
                {/* Stats badge row */}
                <div className="flex items-center justify-between border-t-2 border-indigo-950/20 pt-4 font-mono text-[9px] text-slate-500 font-bold uppercase">
                  <span>{t.difficulty}: <span className={
                    ch.difficulty === 'Easy' 
                      ? 'text-emerald-400' 
                      : ch.difficulty === 'Medium' 
                      ? 'text-amber-400' 
                      : 'text-rose-500'
                  }>{getDifficultyLabel(ch.difficulty)}</span></span>
                  <span className="text-rose-400 flex items-center gap-0.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    +{ch.xpReward} {t.xp}
                  </span>
                </div>

                {isLocked ? (
                  <div className="w-full mt-5 text-center py-2.5 rounded bg-slate-900 text-slate-600 border-2 border-slate-800 font-game text-[9px] font-bold select-none">
                    LOCKED
                  </div>
                ) : (
                  <button className={`w-full mt-5 py-2.5 rounded font-game text-[9px] font-bold transition-all pixel-btn active:translate-y-0.5 cursor-pointer ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white'
                  }`}>
                    {isCompleted ? t.replayBoss : t.fightBoss}
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
