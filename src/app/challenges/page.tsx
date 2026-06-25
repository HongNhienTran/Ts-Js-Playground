'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameStateContext';
import { Trophy, Swords, Flame, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { challenges } from '@/data/challenges';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

  const getChallengeEmblem = (id: string, isCompleted: boolean) => {
    const stroke = "stroke-[2.5]";
    if (id === 'ch-1') return <Flame className={`w-6 h-6 ${isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-orange-600 dark:text-orange-400'} ${stroke}`} />;
    if (id === 'ch-2') return <Sparkles className={`w-6 h-6 ${isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-pink-600 dark:text-pink-400'} ${stroke} animate-pulse`} />;
    return <Trophy className={`w-6 h-6 ${isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-purple-600 dark:text-purple-400'} ${stroke}`} />;
  };

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'Easy') return t.difficultyEasy;
    if (diff === 'Medium') return t.difficultyMedium;
    return t.difficultyHard;
  };

  const getCardVariant = (id: string, isLocked: boolean, isCompleted: boolean): 'default' | 'yellow' | 'orange' | 'pink' | 'green' | 'purple' | 'peach' => {
    if (isLocked) return 'default';
    if (isCompleted) return 'green';
    if (id === 'ch-1') return 'peach';
    if (id === 'ch-2') return 'pink';
    return 'purple';
  };

  const getButtonVariant = (id: string): 'default' | 'primary' | 'secondary' | 'accent' | 'green' | 'purple' | 'outline' | 'ghost' => {
    if (id === 'ch-1') return 'primary';
    if (id === 'ch-2') return 'accent';
    return 'purple';
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-sans">
      
      {/* Header title */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pop-pink/20 text-rose-600 dark:text-rose-400 border-[3px] border-border text-[9px] font-game font-extrabold uppercase mb-4 tracking-wider shadow-[2px_2px_0px_var(--shadow-color)]">
          <Swords className="w-3.5 h-3.5 stroke-[2.5]" />
          {t.bossArena}
        </div>
        <h2 className="text-2xl md:text-4xl font-game font-extrabold text-foreground uppercase drop-shadow-[2px_2px_0px_var(--shadow-color)]">
          {t.bossTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-lg mx-auto font-bold uppercase tracking-wider">
          {t.bossDesc}
        </p>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {challenges.map((ch) => {
          const isCompleted = game.completedChallenges.includes(ch.id);
          const minLevel = getMinLevelForChallenge(ch.id);
          const isLocked = game.level < minLevel;
          const variant = getCardVariant(ch.id, isLocked, isCompleted);

          return (
            <motion.div
              key={ch.id}
              whileHover={!isLocked ? { y: -4 } : {}}
              onClick={() => handleFightBoss(ch.id, minLevel)}
              className={`flex flex-col h-full ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Card 
                variant={variant} 
                className="flex flex-col justify-between h-full p-6 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl border-[3px] border-border flex items-center justify-center shadow-[2px_2px_0px_var(--shadow-color)] ${
                      isLocked 
                        ? 'bg-slate-900 text-slate-500' 
                        : 'bg-background'
                    }`}>
                      {isLocked ? <Lock className="w-5 h-5 stroke-[2.5] text-slate-500" /> : getChallengeEmblem(ch.id, isCompleted)}
                    </div>
                    
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[9px] font-game font-extrabold text-emerald-800 dark:text-emerald-300 bg-pop-green border-2 border-border px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[1px_1px_0px_var(--shadow-color)]">
                        <CheckCircle2 className="w-3 h-3 fill-emerald-800 text-emerald-100 dark:fill-emerald-300 dark:text-emerald-950 stroke-[1.5]" />
                        {t.slayed}
                      </span>
                    )}

                    {isLocked && (
                      <span className="text-[9px] font-game font-extrabold text-slate-500 border-2 border-border-muted px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {t.reqLvl} {minLevel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-game font-extrabold mb-3 uppercase tracking-wide transition-colors text-foreground">
                    {game.language === 'vi' ? ch.titleVi : ch.titleEn}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed line-clamp-3 mb-6 font-sans font-medium">
                    {ch.concept}
                  </p>
                </div>

                <div>
                  {/* Stats badge row */}
                  <div className="flex items-center justify-between border-t-2 border-dashed border-border-muted pt-4 font-sans text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <span>
                      {t.difficulty}:{' '}
                      <span className={
                        ch.difficulty === 'Easy' 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : ch.difficulty === 'Medium' 
                          ? 'text-amber-600 dark:text-amber-400' 
                          : 'text-rose-600 dark:text-rose-500'
                      }>
                        {getDifficultyLabel(ch.difficulty)}
                      </span>
                    </span>
                    <span className="text-retro-orange flex items-center gap-0.5">
                      <Sparkles className="w-3.5 h-3.5 fill-retro-orange stroke-[1.5]" />
                      +{ch.xpReward} XP
                    </span>
                  </div>

                  {isLocked ? (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full mt-5 text-[10px] py-2.5"
                    >
                      LOCKED
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFightBoss(ch.id, minLevel);
                      }}
                      variant={isCompleted ? 'outline' : getButtonVariant(ch.id)}
                      className="w-full mt-5 text-[10px] py-2.5"
                    >
                      {isCompleted ? t.replayBoss : t.fightBoss}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
