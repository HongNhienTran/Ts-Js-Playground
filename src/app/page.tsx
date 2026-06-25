'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Flame, Trophy } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '@/lib/audio';
import { useEffect } from 'react';
import { useGame } from '@/context/GameStateContext';
import { i18n } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

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
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden game-grid font-sans">
      
      {/* Background glowing elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-retro-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-retro-pink/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main hero area */}
      <div className="flex-1 max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Magic Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="w-20 h-20 bg-pop-orange/20 border-[3px] border-border rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--shadow-color)] mb-8"
        >
          <Sparkles className="w-10 h-10 text-retro-orange animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-7xl font-game font-extrabold tracking-wide text-retro-orange mb-6 uppercase drop-shadow-[4px_4px_0px_var(--shadow-color)]"
        >
          JS / TS QUEST
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-2xl leading-relaxed mb-12 border-y-[3px] border-dashed border-border-muted py-6 font-semibold"
        >
          {t.homeSubtitle}
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Button
            onClick={handleStart}
            variant="primary"
            size="lg"
            className="px-10 py-5 rounded-2xl text-xs"
          >
            {t.homeStartBtn}
          </Button>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex hover:rotate-1 transition-transform"
          >
            <Card variant="pink" className="text-left group cursor-pointer w-full flex flex-col">
              <CardContent className="pt-2">
                <div className="w-12 h-12 rounded-full bg-card border-[3px] border-border flex items-center justify-center text-retro-pink mb-4 group-hover:scale-110 transition shadow-[2px_2px_0px_var(--shadow-color)]">
                  <Terminal className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-game font-extrabold text-slate-900 mb-3 tracking-wide uppercase">{t.featSkillTree}</h3>
                <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                  {t.featSkillTreeDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex hover:-rotate-1 transition-transform"
          >
            <Card variant="yellow" className="text-left group cursor-pointer w-full flex flex-col">
              <CardContent className="pt-2">
                <div className="w-12 h-12 rounded-full bg-card border-[3px] border-border flex items-center justify-center text-retro-orange mb-4 group-hover:scale-110 transition shadow-[2px_2px_0px_var(--shadow-color)]">
                  <Flame className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-game font-extrabold text-slate-900 mb-3 tracking-wide uppercase">{t.featSandbox}</h3>
                <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                  {t.featSandboxDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex hover:rotate-1 transition-transform"
          >
            <Card variant="green" className="text-left group cursor-pointer w-full flex flex-col">
              <CardContent className="pt-2">
                <div className="w-12 h-12 rounded-full bg-card border-[3px] border-border flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition shadow-[2px_2px_0px_var(--shadow-color)]">
                  <Trophy className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-game font-extrabold text-slate-900 mb-3 tracking-wide uppercase">{t.featBoss}</h3>
                <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                  {t.featBossDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>

      </div>

      {/* Footer bar */}
      <footer className="py-8 border-t-[3px] border-border bg-card text-center text-[10px] text-slate-500 font-game font-extrabold tracking-wider uppercase shadow-[0_-4px_0px_var(--shadow-color)] z-10">
        {t.footerText}
      </footer>
    </div>
  );
}
