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
import { Button } from '@/components/ui/Button';

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
      <div className="flex-1 flex items-center justify-center bg-background font-sans text-slate-500 font-bold uppercase">
        🧙‍♂️ Summoning local variables...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 text-center">
        <p className="text-rose-500 font-game font-extrabold text-sm mb-6 uppercase">🔮 SPELL NOT FOUND</p>
        <Button 
          onClick={() => router.push('/practice')}
          variant="outline"
          size="md"
        >
          {t.roadmapBack}
        </Button>
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
        return <h3 key={idx} className="text-xs font-game font-extrabold text-foreground mt-6 mb-3 border-b-[3px] border-dashed border-border-muted pb-2 flex items-center gap-1.5 uppercase">{line.replace('###', '')}</h3>;
      }
      if (line.startsWith('-') || line.startsWith('*')) {
        return <li key={idx} className="ml-5 list-disc text-slate-700 dark:text-slate-300 font-sans text-xs mb-1.5 leading-relaxed font-bold">{line.replace(/^-\s*|^\*\s*/, '')}</li>;
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
            return <code key={pIdx} className="bg-card text-retro-pink font-bold px-1.5 py-0.5 border-2 border-border rounded-lg font-mono text-[10px] shadow-[1px_1px_0px_var(--shadow-color)]">{part}</code>;
          }
          return part;
        });
      }

      return <p key={idx} className="text-xs text-slate-600 dark:text-slate-400 font-sans font-bold leading-relaxed mb-3">{formattedLine}</p>;
    });
  };

  const hasNextQuest = lessonIndex < lessons.length - 1;

  return (
    <div className="flex-1 bg-background text-foreground flex flex-col md:flex-row items-stretch overflow-hidden relative font-sans">
      
      {/* Dynamic Success Modal (Pop Art Style) */}
      <AnimatePresence>
        {showSuccessModal && (
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-card border-[3px] border-border shadow-[6px_6px_0px_var(--shadow-color)] rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-pop-green text-slate-900 border-[3px] border-border flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_var(--shadow-color)]">
                <Award className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="text-base font-game font-extrabold text-slate-950 dark:text-white mb-2 uppercase tracking-wide leading-relaxed">
                {t.spellSuccessful}
              </h3>
              
              <p className="text-xs text-slate-500 font-sans font-bold mb-6 uppercase tracking-wider">
                {t.spellSuccessDesc}
              </p>

              <div className="bg-background p-4 border-[3px] border-border rounded-2xl shadow-[3px_3px_0px_var(--shadow-color)] mb-8 inline-flex items-center gap-6 font-game font-extrabold text-xs">
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-extrabold">{t.rewardGained}</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-600 stroke-[2]" />
                    +{lesson.xpReward} XP
                  </span>
                </div>
                <div className="w-[3px] h-8 bg-border" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-extrabold">{t.totalScore}</span>
                  <span className="text-sm font-bold text-retro-orange">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <Button
                onClick={handleNextQuest}
                variant="green"
                size="lg"
                className="w-full py-4 flex items-center justify-center gap-2"
              >
                <span>{hasNextQuest ? t.nextQuest : t.backToRoadmap}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Column: Lesson instructions */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r-[3px] border-border bg-card/10 p-6 md:p-8 overflow-y-auto max-h-[45vh] md:max-h-[calc(100vh-140px)]">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            {t.back}
          </Button>
          
          <div className="flex items-center gap-2 text-[9px] text-retro-orange font-game font-extrabold uppercase">
            {track === 'ts' ? (
              <span className="px-2.5 py-1 rounded-full bg-pop-purple/20 text-indigo-600 border-2 border-border shadow-[1px_1px_0px_var(--shadow-color)]">TS</span>
            ) : track === 'ch' ? (
              <span className="px-2.5 py-1 rounded-full bg-pop-pink/20 text-rose-600 border-2 border-border shadow-[1px_1px_0px_var(--shadow-color)]">BOSS</span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-pop-yellow text-slate-900 border-2 border-border shadow-[1px_1px_0px_var(--shadow-color)]">JS</span>
            )}
            <span className="hidden md:inline font-bold ml-1">{lessonIndex + 1}/{lessons.length}</span>
          </div>
        </div>

        {/* Lesson Title Card */}
        <div className="mb-6 border-b-[3px] border-dashed border-border-muted pb-4">
          <span className="text-[9px] font-game font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
            {`${t.conceptQuest} // ${lesson.concept}`}
          </span>
          <h2 className="text-xl md:text-2xl font-game font-extrabold text-foreground tracking-wide uppercase mt-2">
            {game.language === 'vi' ? lesson.titleVi : lesson.titleEn}
          </h2>
        </div>

        {/* Scroll Details */}
        <div className="parchment p-6 border-[3px] border-border shadow-[4px_4px_0px_var(--shadow-color)] flex-1 leading-relaxed text-slate-700 dark:text-slate-300 font-bold font-sans text-xs">
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
      <div className="flex-1 flex items-center justify-center bg-background font-sans text-slate-500 font-bold uppercase">
        🧙‍♂️ Summoning local variables...
      </div>
    }>
      <CodingArenaContent />
    </Suspense>
  );
}
