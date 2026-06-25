'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useGame } from '@/context/GameStateContext';
import { ArrowLeft, Award, ArrowRight, Zap } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import { tsLessons } from '@/data/tsLessons';
import { challenges } from '@/data/challenges';
import CodeEditor from '@/components/CodeEditor';
import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';

function CodingArenaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const game = useGame();

  const track = searchParams.get('track');
  const id = searchParams.get('id');

  const lessons = track === 'ts' ? tsLessons : track === 'ch' ? challenges : jsLessons;
  const lessonIndex = lessons.findIndex(l => l.id === id);
  const lesson = lessons[lessonIndex];

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const t = i18n[game.language || 'en'];

  if (!game.isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background font-mono text-slate-500">
        🧙‍♂️ Summoning local variables...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 text-center">
        <p className="text-rose-500 font-game font-bold text-sm mb-6 uppercase">🔮 SPELL NOT FOUND</p>
        <button 
          onClick={() => router.push('/practice')}
          className="px-5 py-2.5 bg-slate-900 border-2 border-slate-800 text-xs font-mono font-bold hover:bg-slate-800 text-white cursor-pointer pixel-btn"
        >
          {t.roadmapBack}
        </button>
      </div>
    );
  }

  const handleBack = () => {
    playClickSound();
    if (track === 'ch') {
      router.push('/challenges');
    } else {
      router.push(`/practice/${track}`);
    }
  };

  const handleSuccess = (xpReward: number) => {
    if (track === 'ch') {
      game.completeChallenge(lesson.id, xpReward);
    } else {
      game.completeLesson(lesson.id, xpReward);
    }
    setShowSuccessModal(true);
  };

  const handleFailure = () => {
    game.loseLife();
  };

  const handleHeal = () => {
    const cost = game.xp >= 15 ? 15 : 0;
    game.healLife(cost);
  };

  const handleNextQuest = () => {
    playClickSound();
    setShowSuccessModal(false);
    
    // Find next lesson
    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      router.push(`/practice/play?track=${track}&id=${nextLesson.id}`);
    } else {
      if (track === 'ch') {
        router.push('/challenges');
      } else {
        router.push(`/practice/${track}`);
      }
    }
  };

  // Convert custom markdown formatting to simple React elements
  const formatDescription = (desc: string) => {
    return desc.split('\n').map((line, idx) => {
      if (line.startsWith('###')) {
        return <h3 key={idx} className="text-xs font-game font-bold text-foreground mt-6 mb-3 border-b-2 border-indigo-950 pb-2 flex items-center gap-1.5 uppercase">{line.replace('###', '')}</h3>;
      }
      if (line.startsWith('-') || line.startsWith('*')) {
        return <li key={idx} className="ml-4 list-disc text-slate-300 font-mono text-xs mb-1.5 leading-relaxed">{line.replace(/^-\s*|^\*\s*/, '')}</li>;
      }
      if (line.startsWith('\`\`\`')) {
        return null;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      
      let formattedLine: React.ReactNode = line;
      if (line.includes('`')) {
        const parts = line.split('`');
        formattedLine = parts.map((part, pIdx) => {
          if (pIdx % 2 !== 0) {
            return <code key={pIdx} className="bg-slate-900 text-retro-pink font-bold px-1.5 py-0.5 border border-retro-orange/20 rounded font-mono text-[11px]">{part}</code>;
          }
          return part;
        });
      }

      return <p key={idx} className="text-xs text-slate-300 font-mono leading-relaxed mb-3">{formattedLine}</p>;
    });
  };

  const hasNextQuest = lessonIndex < lessons.length - 1;

  return (
    <div className="flex-1 bg-background text-foreground flex flex-col md:flex-row items-stretch overflow-hidden relative">
      
      {/* Dynamic Success Modal (Pixel Art style) */}
      <AnimatePresence>
        {showSuccessModal && (
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="max-w-md w-full pixel-box-emerald p-8 text-center"
            >
              <div className="w-16 h-16 rounded bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 text-emerald-400 glow-emerald animate-pulse">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-sm font-game font-bold text-foreground mb-2 uppercase tracking-wide leading-relaxed">
                {t.spellSuccessful}
              </h3>
              
              <p className="text-[11px] text-slate-400 font-mono mb-6">
                {t.spellSuccessDesc}
              </p>

              <div className="bg-slate-950 p-4 border-2 border-slate-900 mb-8 inline-flex items-center gap-6 font-mono text-xs">
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.rewardGained}</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    +{lesson.xpReward} XP
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.totalScore}</span>
                  <span className="text-sm font-bold text-retro-orange">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <button
                onClick={handleNextQuest}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-game text-xs font-bold border-2 border-emerald-400 shadow-md active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 pixel-btn"
              >
                <span>{hasNextQuest ? t.nextQuest : t.backToRoadmap}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Column: Lesson instructions */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r-4 border-indigo-950 bg-slate-950/40 p-6 md:p-8 overflow-y-auto max-h-[45vh] md:max-h-[calc(100vh-140px)]">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.back}
          </button>
          
          <div className="flex items-center gap-2 text-[9px] text-retro-orange font-game font-bold uppercase">
            {track === 'ts' ? (
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">TS</span>
            ) : track === 'ch' ? (
              <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/25 text-rose-400">BOSS</span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/25 text-amber-400">JS</span>
            )}
            <span className="hidden md:inline">{lessonIndex + 1}/{lessons.length}</span>
          </div>
        </div>

        {/* Lesson Title Card */}
        <div className="mb-6 border-b-2 border-indigo-950 pb-4">
          <span className="text-[9px] font-game text-slate-500 uppercase tracking-wider block mb-1">
            {`${t.conceptQuest} // ${lesson.concept}`}
          </span>
          <h2 className="text-lg md:text-xl font-game font-bold text-foreground tracking-wide uppercase mt-2">
            {game.language === 'vi' ? lesson.titleVi : lesson.titleEn}
          </h2>
        </div>

        {/* Scroll Details */}
        <div className="parchment p-6 border-2 border-slate-900 shadow-inner flex-1 leading-relaxed">
          {formatDescription(game.language === 'vi' ? lesson.descriptionVi : lesson.descriptionEn)}
        </div>
      </div>

      {/* Right Column: Code Editor Workspace */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 bg-slate-950/20 max-h-[55vh] md:max-h-[calc(100vh-140px)] justify-stretch overflow-hidden">
        <CodeEditor
          starterCode={lesson.starterCode}
          tests={lesson.tests}
          xpReward={lesson.xpReward}
          lives={game.lives}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          onHeal={handleHeal}
        />
      </div>

    </div>
  );
}

export default function Play() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-background font-mono text-slate-500">
        🧙‍♂️ Summoning local variables...
      </div>
    }>
      <CodingArenaContent />
    </Suspense>
  );
}
