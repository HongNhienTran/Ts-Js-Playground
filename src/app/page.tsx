'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Flame, Trophy } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '@/lib/audio';
import { useEffect } from 'react';
import { useGame } from '@/context/GameStateContext';
import { i18n } from '@/lib/i18n';

export default function Home() {
  const router = useRouter();
  const game = useGame();

  const lang = game.language || 'en';
  const t = i18n[lang];

  const handleStart = () => {
    playLevelUpSound();
    router.push('/practice');
  };

  useEffect(() => {
    setTimeout(() => playClickSound(), 400);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden game-grid font-mono">
      
      {/* Background glowing elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-retro-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-retro-pink/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main hero area */}
      <div className="flex-1 max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Magic Icon Container (Pixel Box) */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="w-20 h-20 bg-slate-900 border-4 border-double border-retro-orange flex items-center justify-center shadow-[4px_4px_0px_#000] mb-8"
        >
          <Sparkles className="w-10 h-10 text-retro-orange animate-pulse" />
        </motion.div>

        {/* Title (Pixel styled font) */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-6xl font-game font-bold tracking-wider text-retro-orange mb-6 uppercase drop-shadow-[4px_4px_0px_#000]"
        >
          JS / TS QUEST
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-xs md:text-sm max-w-2xl leading-relaxed mb-12 border-y-2 border-indigo-950/20 py-4"
        >
          {t.homeSubtitle}
        </motion.p>

        {/* Start Button (Pixel Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <button
            onClick={handleStart}
            className="group px-8 py-5 rounded bg-retro-orange hover:bg-retro-orange/90 text-white font-game text-xs font-bold shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-retro-peach/40 relative overflow-hidden transition-all cursor-pointer"
          >
            <span className="flex items-center gap-3">
              {t.homeStartBtn}
            </span>
          </button>
        </motion.div>

        {/* Feature Cards Grid (Pixel Box styles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 pixel-box text-left group"
          >
            <div className="w-10 h-10 rounded bg-retro-pink/10 border-2 border-retro-pink/20 flex items-center justify-center text-retro-pink mb-4 group-hover:scale-115 transition">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-game font-bold text-foreground mb-3 tracking-wide">{t.featSkillTree}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
              {t.featSkillTreeDesc}
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 pixel-box border-indigo-500 text-left group"
          >
            <div className="w-10 h-10 rounded bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-115 transition">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-game font-bold text-foreground mb-3 tracking-wide">{t.featSandbox}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
              {t.featSandboxDesc}
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 pixel-box border-cyan-500 text-left group"
          >
            <div className="w-10 h-10 rounded bg-cyan-500/10 border-2 border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-115 transition">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-game font-bold text-foreground mb-3 tracking-wide">{t.featBoss}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
              {t.featBossDesc}
            </p>
          </motion.div>

        </div>

      </div>

      {/* Footer bar */}
      <footer className="py-8 border-t-4 border-border-muted bg-card/40 text-center text-[10px] text-slate-600 font-mono tracking-wider">
        {t.footerText}
      </footer>
    </div>
  );
}
