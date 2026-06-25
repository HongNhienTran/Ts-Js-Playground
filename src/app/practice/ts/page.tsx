'use client';

import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameStateContext';
import { ArrowLeft, Shield } from 'lucide-react';
import { tsLessons } from '@/data/tsLessons';
import SkillNode from '@/components/SkillNode';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';

export default function TSPathway() {
  const router = useRouter();
  const game = useGame();

  const t = i18n[game.language || 'en'];

  const handleBack = () => {
    playClickSound();
    router.push('/practice');
  };

  const handleSelectLesson = (lessonId: string) => {
    router.push(`/practice/play?track=ts&id=${lessonId}`);
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 relative flex flex-col items-center font-sans">
      
      {/* Back button */}
      <Button 
        onClick={handleBack}
        variant="outline"
        size="sm"
        className="absolute top-6 left-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        {t.roadmapBack}
      </Button>

      {/* Header */}
      <div className="text-center max-w-xl mt-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pop-green text-slate-900 border-2 border-border text-[9px] font-game font-extrabold uppercase mb-4 tracking-wider shadow-[2px_2px_0px_var(--shadow-color)]">
          <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
          {t.tsTrack}
        </div>
        <h2 className="text-2xl md:text-4xl font-game font-extrabold text-foreground uppercase drop-shadow-[2px_2px_0px_var(--shadow-color)]">
          {t.tsCitadel}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-sm mx-auto font-bold uppercase tracking-wider">
          {t.tsPathwaySubtitle}
        </p>
      </div>

      {/* Winding road map container */}
      <div className="w-full max-w-lg relative py-8 min-h-[400px]">
        
        {/* Winding dotted line */}
        <div className="absolute top-4 bottom-4 w-0 border-l-[3px] border-dashed border-border left-1/2 -translate-x-1/2 -z-10 opacity-30" />

        {/* Lesson Nodes list */}
        <div className="flex flex-col gap-12 relative">
          {tsLessons.map((lesson, idx) => {
            const isCompleted = game.completedLessons.includes(lesson.id);
            
            let isLocked = false;
            if (idx > 0) {
              const prevLessonId = tsLessons[idx - 1].id;
              isLocked = !game.completedLessons.includes(prevLessonId);
            }

            return (
              <SkillNode
                key={lesson.id}
                id={lesson.id}
                title={game.language === 'vi' ? lesson.titleVi : lesson.titleEn}
                concept={lesson.concept}
                difficulty={lesson.difficulty}
                xpReward={lesson.xpReward}
                isCompleted={isCompleted}
                isLocked={isLocked}
                onClick={() => handleSelectLesson(lesson.id)}
                index={idx}
              />
            );
          })}
        </div>

      </div>

      {/* Finishing guide */}
      <div className="mt-12 text-center text-[10px] text-slate-500 uppercase font-game font-extrabold tracking-wider">
        {t.roadmapTSFinish}
      </div>
    </div>
  );
}
