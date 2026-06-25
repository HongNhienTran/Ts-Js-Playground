'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameStateContext';
import { Shield, BookOpen, Lock } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import { tsLessons } from '@/data/tsLessons';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';

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
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-mono">
      
      {/* Title section */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-xl md:text-3xl font-game font-bold tracking-wide text-retro-orange mb-6 uppercase drop-shadow-[2px_2px_0px_#000]">
          {t.practiceTitle}
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed max-w-lg mx-auto">
          {t.practiceDesc}
        </p>
      </div>

      {/* Track Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl flex-1 items-stretch">
        
        {/* JS Track Card */}
        <motion.div
          whileHover={{ y: -6 }}
          onClick={() => handleSelectTrack('js')}
          className="p-6 pixel-box flex flex-col justify-between group relative overflow-hidden cursor-pointer"
        >
          {/* Highlight line */}
          <div className="absolute left-0 top-0 right-0 h-1 bg-amber-500" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-110 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-game font-bold text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.jsTrack}
              </span>
            </div>

            <h3 className="text-base font-game font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors uppercase">
              {t.jsRealm}
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6 font-mono">
              {t.jsRealmDesc}
            </p>

            <ul className="text-[10px] text-slate-500 space-y-2 mb-8 uppercase font-bold">
              <li className="flex items-center gap-2">🤖 {t.jsPoints}</li>
              <li className="flex items-center gap-2">🔥 {t.jsXp}</li>
              <li className="flex items-center gap-2">🧪 {t.jsVerify}</li>
            </ul>
          </div>

          <div>
            {/* Progress meter */}
            <div className="w-full">
              <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1.5 font-bold">
                <span>{t.questCompletion}</span>
                <span>{jsCompleted}/{jsLessons.length} NODES ({jsProgress}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-900 border-2 border-slate-800 p-0.5 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${jsProgress}%` }}
                />
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 rounded bg-amber-900/20 hover:bg-amber-600 border-2 border-amber-500/30 text-amber-400 hover:text-white font-game text-[9px] font-bold transition-all pixel-btn active:translate-y-0.5 cursor-pointer">
              {t.enterRealm}
            </button>
          </div>
        </motion.div>

        {/* TS Track Card */}
        <motion.div
          whileHover={!isTSLocked ? { y: -6 } : {}}
          onClick={() => handleSelectTrack('ts')}
          className={`p-6 flex flex-col justify-between group relative overflow-hidden ${
            isTSLocked 
              ? 'pixel-box-slate opacity-60 cursor-not-allowed' 
              : 'pixel-box border-cyan-500 hover:shadow-[4px_4px_0px_#0891b2] cursor-pointer'
          }`}
        >
          {/* Highlight line */}
          <div className={`absolute left-0 top-0 right-0 h-1 ${isTSLocked ? 'bg-slate-700' : 'bg-cyan-500'}`} />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className={`w-10 h-10 rounded flex items-center justify-center border ${
                isTSLocked 
                  ? 'bg-slate-900 border-slate-800 text-slate-600' 
                  : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition'
              }`}>
                {isTSLocked ? <Lock className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
              </div>
              <span className={`text-[9px] font-game font-bold border px-2 py-0.5 rounded uppercase tracking-wider ${
                isTSLocked 
                  ? 'border-slate-800 text-slate-600' 
                  : 'border-cyan-500/30 text-cyan-400'
              }`}>
                {t.tsTrack}
              </span>
            </div>

            <h3 className={`text-base font-game font-bold mb-3 transition-colors uppercase ${
              isTSLocked ? 'text-slate-500' : 'text-foreground group-hover:text-cyan-400'
            }`}>
              {t.tsCitadel}
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6 font-mono">
              {t.tsCitadelDesc}
            </p>

            <ul className="text-[10px] text-slate-500 space-y-2 mb-8 uppercase font-bold">
              <li className="flex items-center gap-2">🤖 {t.tsPoints}</li>
              <li className="flex items-center gap-2">🛡️ {t.tsXp}</li>
              <li className="flex items-center gap-2">🧪 {t.tsVerify}</li>
            </ul>
          </div>

          <div>
            {isTSLocked ? (
              <div className="p-3 rounded bg-slate-950 border-2 border-slate-900 flex items-start gap-2">
                <Lock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.pathLocked}</p>
                  <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                    {t.pathLockedDesc}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {/* Progress meter */}
                <div className="w-full">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1.5 font-bold">
                    <span>{t.questCompletion}</span>
                    <span>{tsCompleted}/{tsLessons.length} NODES ({tsProgress}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 border-2 border-slate-800 p-0.5 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-500"
                      style={{ width: `${tsProgress}%` }}
                    />
                  </div>
                </div>
                
                <button className="w-full mt-6 py-3 rounded bg-cyan-900/20 hover:bg-cyan-600 border-2 border-cyan-500/30 text-cyan-400 hover:text-white font-game text-[9px] font-bold transition-all pixel-btn active:translate-y-0.5 cursor-pointer">
                  {t.enterRealm}
                </button>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
