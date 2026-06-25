'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameStateContext';
import { Shield, BookOpen, Lock } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import { tsLessons } from '@/data/tsLessons';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';

export default function Practice() {
  const router = useRouter();
  const game = useGame();

  const t = i18n[game.language || 'en'];

  const jsCompleted = game.completedLessons.filter(id => id.startsWith('js-')).length;
  const jsProgress = Math.round((jsCompleted / jsLessons.length) * 100) || 0;

  const tsCompleted = game.completedLessons.filter(id => id.startsWith('ts-')).length;
  const tsProgress = Math.round((tsCompleted / tsLessons.length) * 100) || 0;

  const isTSLocked = jsProgress < 40 && game.level < 2;

  const handleSelectTrack = (track: 'js' | 'ts') => {
    if (track === 'ts' && isTSLocked) return;
    playClickSound();
    router.push(`/practice/${track}`);
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-sans">
      
      {/* Title section */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-2xl md:text-4xl font-game font-extrabold tracking-wide text-retro-orange mb-4 uppercase drop-shadow-[2px_2px_0px_var(--shadow-color)]">
          {t.practiceTitle}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-md mx-auto font-bold uppercase tracking-wider">
          {t.practiceDesc}
        </p>
      </div>

      {/* Track Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl flex-1 items-stretch">
        
        {/* JS Track Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => handleSelectTrack('js')}
          className="flex hover:rotate-1 transition-transform cursor-pointer"
        >
          <Card variant="yellow" className="flex flex-col justify-between group relative overflow-hidden w-full">
            <CardContent className="pt-2 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-card border-[3px] border-border flex items-center justify-center text-slate-900 group-hover:scale-110 transition shadow-[2px_2px_0px_var(--shadow-color)]">
                    <BookOpen className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-[9px] font-game font-extrabold text-slate-900 border-2 border-border bg-white/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {t.jsTrack}
                  </span>
                </div>

                <h3 className="text-lg font-game font-extrabold text-slate-950 mb-3 uppercase tracking-wide">
                  {t.jsRealm}
                </h3>
                
                <p className="text-xs text-slate-800 leading-relaxed mb-6 font-semibold">
                  {t.jsRealmDesc}
                </p>

                <ul className="text-[10px] text-slate-700 space-y-2 mb-8 uppercase font-bold tracking-wider">
                  <li className="flex items-center gap-2">• {t.jsPoints}</li>
                  <li className="flex items-center gap-2">• {t.jsXp}</li>
                  <li className="flex items-center gap-2">• {t.jsVerify}</li>
                </ul>
              </div>

              <div>
                {/* Progress meter */}
                <div className="w-full">
                  <div className="flex justify-between items-center text-[9px] text-slate-800 mb-1.5 font-extrabold uppercase tracking-wider">
                    <span>{t.questCompletion}</span>
                    <span>{jsCompleted}/{jsLessons.length} NODES ({jsProgress}%)</span>
                  </div>
                  <Progress value={jsProgress} color="primary" />
                </div>
                
                <Button variant="primary" className="w-full mt-6 py-3 font-game text-[10px] font-bold">
                  {t.enterRealm}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* TS Track Card */}
        <motion.div
          whileHover={!isTSLocked ? { scale: 1.01 } : {}}
          onClick={() => handleSelectTrack('ts')}
          className={`flex ${!isTSLocked ? 'hover:-rotate-1 transition-transform cursor-pointer' : ''}`}
        >
          <Card 
            variant={isTSLocked ? 'default' : 'green'} 
            className={`flex flex-col justify-between w-full relative overflow-hidden ${
              isTSLocked ? 'opacity-60 cursor-not-allowed shadow-[2px_2px_0px_var(--shadow-color)]' : ''
            }`}
          >
            <CardContent className="pt-2 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-full border-[3px] border-border flex items-center justify-center shadow-[2px_2px_0px_var(--shadow-color)] ${
                    isTSLocked 
                      ? 'bg-slate-800 border-slate-700 text-slate-500' 
                      : 'bg-card text-emerald-600 group-hover:scale-110 transition'
                  }`}>
                    {isTSLocked ? <Lock className="w-5 h-5 stroke-[2.5]" /> : <Shield className="w-5 h-5 stroke-[2.5]" />}
                  </div>
                  <span className={`text-[9px] font-game font-extrabold border-2 px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isTSLocked 
                      ? 'border-slate-300 text-slate-500 bg-slate-900/10' 
                      : 'border-border text-slate-900 bg-white/40'
                  }`}>
                    {t.tsTrack}
                  </span>
                </div>

                <h3 className={`text-lg font-game font-extrabold mb-3 uppercase tracking-wide ${
                  isTSLocked ? 'text-slate-500' : 'text-slate-950'
                }`}>
                  {t.tsCitadel}
                </h3>
                
                <p className={`text-xs leading-relaxed mb-6 font-semibold ${
                  isTSLocked ? 'text-slate-500' : 'text-slate-800'
                }`}>
                  {t.tsCitadelDesc}
                </p>

                <ul className={`text-[10px] space-y-2 mb-8 uppercase font-bold tracking-wider ${
                  isTSLocked ? 'text-slate-500' : 'text-slate-700'
                }`}>
                  <li className="flex items-center gap-2">• {t.tsPoints}</li>
                  <li className="flex items-center gap-2">• {t.tsXp}</li>
                  <li className="flex items-center gap-2">• {t.tsVerify}</li>
                </ul>
              </div>

              <div>
                {isTSLocked ? (
                  <div className="p-3.5 rounded-2xl bg-card border-[3px] border-border flex items-start gap-2.5 shadow-[2px_2px_0px_var(--shadow-color)]">
                    <Lock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-game font-extrabold text-slate-500 uppercase">{t.pathLocked}</p>
                      <p className="text-[9px] text-slate-500 mt-1 leading-relaxed font-bold">
                        {t.pathLockedDesc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Progress meter */}
                    <div className="w-full">
                      <div className="flex justify-between items-center text-[9px] text-slate-800 mb-1.5 font-extrabold uppercase tracking-wider">
                        <span>{t.questCompletion}</span>
                        <span>{tsCompleted}/{tsLessons.length} NODES ({tsProgress}%)</span>
                      </div>
                      <Progress value={tsProgress} color="purple" />
                    </div>
                    
                    <Button variant="purple" className="w-full mt-6 py-3 font-game text-[10px] font-bold">
                      {t.enterRealm}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
