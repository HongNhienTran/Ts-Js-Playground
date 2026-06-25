'use client';

import { useState } from 'react';
import { useGame } from '@/context/GameStateContext';
import { theoryLessons, TheoryLesson } from '@/data/theoryLessons';
import { i18n } from '@/lib/i18n';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { BookOpen, Check, Clock, X, Award, CheckSquare, Square } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '@/lib/audio';
import { motion, AnimatePresence } from 'framer-motion';

export default function TheoryPage() {
  const game = useGame();
  const t = i18n[game.language || 'en'];
  const [selectedLesson, setSelectedLesson] = useState<TheoryLesson | null>(null);

  if (!game.isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background font-sans text-slate-500 font-bold uppercase">
        Summoning library scrolls...
      </div>
    );
  }

  const completedCount = game.completedTheoryLessons.length;
  const totalCount = theoryLessons.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0;

  const handleToggleDone = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyDone = game.completedTheoryLessons.includes(lessonId);
    if (!isCurrentlyDone) {
      playLevelUpSound();
    } else {
      playClickSound();
    }
    game.toggleTheoryLesson(lessonId, !isCurrentlyDone);
  };

  const handleOpenLesson = (lesson: TheoryLesson) => {
    playClickSound();
    setSelectedLesson(lesson);
  };

  const handleCloseLesson = () => {
    playClickSound();
    setSelectedLesson(null);
  };

  // Simple markdown renderer helper for custom theoretical guides
  const formatContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('###')) {
        return (
          <h3
            key={idx}
            className="text-xs font-game font-extrabold text-foreground mt-6 mb-3 border-b-[3px] border-dashed border-border-muted pb-2 flex items-center gap-1.5 uppercase"
          >
            {line.replace('###', '').trim()}
          </h3>
        );
      }
      if (line.startsWith('-') || line.startsWith('*')) {
        return (
          <li
            key={idx}
            className="ml-5 list-disc text-slate-700 dark:text-slate-300 font-sans text-xs mb-1.5 leading-relaxed font-bold"
          >
            {line.replace(/^-\s*|^\*\s*/, '')}
          </li>
        );
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
            return (
              <code
                key={pIdx}
                className="bg-card text-retro-pink font-bold px-1.5 py-0.5 border-2 border-border rounded-lg font-mono text-[10px] shadow-[1px_1px_0px_var(--shadow-color)]"
              >
                {part}
              </code>
            );
          }
          return part;
        });
      }

      return (
        <p
          key={idx}
          className="text-xs text-slate-600 dark:text-slate-400 font-sans font-bold leading-relaxed mb-3"
        >
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-sans">
      {/* Header section */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pop-purple/20 text-indigo-600 border-2 border-border text-[9px] font-game font-extrabold uppercase mb-4 tracking-wider shadow-[2px_2px_0px_var(--shadow-color)]">
          <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
          {t.navTheory}
        </div>
        <h2 className="text-2xl md:text-4xl font-game font-extrabold text-foreground uppercase drop-shadow-[2px_2px_0px_var(--shadow-color)]">
          {t.theoryTitle}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-md mx-auto font-bold uppercase tracking-wider mt-4">
          {t.theoryDesc}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-3xl bg-card border-[3px] border-border rounded-2xl p-6 mb-10 shadow-[4px_4px_0px_var(--shadow-color)]">
        <div className="flex justify-between items-center text-[10px] font-game font-extrabold text-slate-550 dark:text-slate-400 uppercase tracking-wide mb-3">
          <span>{t.theoryProgress}</span>
          <span>
            {completedCount}/{totalCount} ({progressPercentage}%)
          </span>
        </div>
        <Progress value={progressPercentage} color="purple" className="h-5" />
      </div>

      {/* Lessons grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {theoryLessons.map((lesson) => {
          const isDone = game.completedTheoryLessons.includes(lesson.id);

          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -2 }}
              onClick={() => handleOpenLesson(lesson)}
              className="cursor-pointer"
            >
              <Card
                variant={isDone ? 'green' : 'default'}
                className="h-full flex flex-col justify-between hover:border-retro-orange transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[8px] font-game font-extrabold border-2 px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isDone
                          ? 'border-emerald-800 text-emerald-800 bg-white/40'
                          : 'border-border text-slate-500 bg-card/40'
                      }`}
                    >
                      {game.language === 'vi' ? lesson.categoryVi : lesson.categoryEn}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.readTime}
                    </span>
                  </div>

                  <CardTitle
                    className={`text-sm tracking-wide leading-relaxed font-game font-extrabold ${
                      isDone ? 'text-emerald-950' : 'text-foreground'
                    }`}
                  >
                    {game.language === 'vi' ? lesson.titleVi : lesson.titleEn}
                  </CardTitle>
                </div>

                <div className="flex items-center justify-between mt-6 border-t-2 border-dashed border-border-muted/20 pt-4">
                  {/* Status checkbox indicator */}
                  <button
                    onClick={(e) => handleToggleDone(lesson.id, e)}
                    className={`flex items-center gap-2 text-[10px] font-game font-extrabold uppercase transition-all select-none cursor-pointer border-[3px] border-border py-1.5 px-3 rounded-xl shadow-[2px_2px_0px_var(--shadow-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                      isDone
                        ? 'bg-pop-yellow text-slate-900'
                        : 'bg-card text-slate-500 hover:text-foreground'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckSquare className="w-4 h-4 text-slate-900 fill-slate-900" />
                        <span>{t.theoryDone}</span>
                      </>
                    ) : (
                      <>
                        <Square className="w-4 h-4 text-slate-500" />
                        <span>{t.theoryDone}</span>
                      </>
                    )}
                  </button>

                  {isDone && (
                    <Award className="w-5 h-5 text-emerald-850 stroke-[2.5]" />
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Lesson Details popup modal */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-2xl w-full bg-card border-[3px] border-border shadow-[6px_6px_0px_var(--shadow-color)] rounded-2xl flex flex-col max-h-[85vh] overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLesson}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card border-[3px] border-border text-foreground hover:bg-background flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_var(--shadow-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b-[3px] border-dashed border-border-muted bg-slate-950/10">
                <span className="text-[9px] font-game font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  {game.language === 'vi' ? selectedLesson.categoryVi : selectedLesson.categoryEn}
                </span>
                <h2 className="text-lg md:text-xl font-game font-extrabold text-foreground uppercase tracking-wide leading-relaxed mr-8">
                  {game.language === 'vi' ? selectedLesson.titleVi : selectedLesson.titleEn}
                </h2>
              </div>

              {/* Modal Scroll Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 leading-relaxed text-slate-700 dark:text-slate-300 font-bold font-sans text-xs">
                <div className="parchment p-6 border-[3px] border-border shadow-[4px_4px_0px_var(--shadow-color)]">
                  {formatContent(
                    game.language === 'vi' ? selectedLesson.contentVi : selectedLesson.contentEn
                  )}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 border-t-[3px] border-dashed border-border-muted flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/10">
                <button
                  onClick={() => handleToggleDone(selectedLesson.id)}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 text-xs font-game font-extrabold uppercase transition-all select-none cursor-pointer border-[3px] border-border py-3 px-6 rounded-xl shadow-[3px_3px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    game.completedTheoryLessons.includes(selectedLesson.id)
                      ? 'bg-pop-green text-slate-900'
                      : 'bg-pop-yellow text-slate-900'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.theoryDone}</span>
                </button>

                <Button
                  onClick={handleCloseLesson}
                  variant="outline"
                  className="w-full md:w-auto py-3 px-6 text-xs tracking-wider"
                >
                  {t.back.toUpperCase()}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
