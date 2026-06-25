'use client';

import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameStateContext';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import SkillNode from '@/components/SkillNode';
import { playClickSound } from '@/lib/audio';
import { i18n } from '@/lib/i18n';

export default function JSPathway() {
  const router = useRouter();
  const game = useGame();

  const t = i18n[game.language || 'en'];

  const handleBack = () => {
    playClickSound();
    router.push('/practice');
  };

  const handleSelectLesson = (lessonId: string) => {
    router.push(`/practice/play?track=js&id=${lessonId}`);
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 relative flex flex-col items-center font-mono">
      
      {/* Back button */}
      <button 
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition cursor-pointer bg-slate-900 border-2 border-slate-800 px-3.5 py-2 rounded shadow-md active:translate-y-0.5"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.roadmapBack}
      </button>

      {/* Header */}
      <div className="text-center max-w-xl mt-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 text-[9px] font-bold uppercase mb-4 tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          {t.jsTrack}
        </div>
        <h2 className="text-xl md:text-3xl font-game font-bold text-foreground uppercase drop-shadow-[2px_2px_0px_#000]">
          {t.jsRealm}
        </h2>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-sm mx-auto">
          {t.jsPathwaySubtitle}
        </p>
      </div>

      {/* Winding road map container */}
      <div className="w-full max-w-lg relative py-8 min-h-[500px]">
        
        {/* Winding dotted line */}
        <div className="absolute top-4 bottom-4 w-1 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-retro-pink/10 border-l-2 border-dashed border-amber-500/30 left-1/2 -translate-x-1/2 -z-10" />

        {/* Lesson Nodes list */}
        <div className="flex flex-col gap-12 relative">
          {jsLessons.map((lesson, idx) => {
            const isCompleted = game.completedLessons.includes(lesson.id);
            
            let isLocked = false;
            if (idx > 0) {
              const prevLessonId = jsLessons[idx - 1].id;
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
      <div className="mt-12 text-center text-[10px] text-slate-500 uppercase font-bold tracking-wider">
        {t.roadmapFinish}
      </div>
    </div>
  );
}
