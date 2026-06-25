'use client';

import { useGame } from '@/context/GameStateContext';
import { getLevelTitle, getXPForNextLevel } from '@/hooks/useGameState';
import { Trophy, Flame, Star, Settings } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import { tsLessons } from '@/data/tsLessons';
import { challenges } from '@/data/challenges';
import { i18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { PRESET_AVATARS, getAvatarSvg } from '@/lib/avatars';
import { playClickSound, playLevelUpSound } from '@/lib/audio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';

interface Badge {
  id: string;
  nameKey: 'firstSteps' | 'squire' | 'tsScholar' | 'bossSlayer' | 'streak3';
  requirementKey: 'reqLesson' | 'reqLevel2' | 'reqTS' | 'reqBoss' | 'reqStreak3';
}

const BADGES: Badge[] = [
  { id: "first_steps", nameKey: 'firstSteps', requirementKey: 'reqLesson' },
  { id: "squire", nameKey: 'squire', requirementKey: 'reqLevel2' },
  { id: "ts_scholar", nameKey: 'tsScholar', requirementKey: 'reqTS' },
  { id: "boss_slayer", nameKey: 'bossSlayer', requirementKey: 'reqBoss' },
  { id: "streak_3", nameKey: 'streak3', requirementKey: 'reqStreak3' }
];

export default function Dashboard() {
  const game = useGame();
  const t = i18n[game.language || 'en'];

  // Edit profile states
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [avatarId, setAvatarId] = useState(1);

  // Sync state values on load/ready
  useEffect(() => {
    if (game.isLoaded) {
      const timer = setTimeout(() => {
        setNickname(game.nickname);
        setAvatarId(game.avatarId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [game.isLoaded, game.nickname, game.avatarId]);

  if (!game.isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background font-sans text-slate-500 font-bold uppercase">
        🧙‍♂️ Reading scroll of stats...
      </div>
    );
  }

  const totalCompleted = game.completedLessons.length + game.completedChallenges.length;
  const jsCompleted = game.completedLessons.filter(id => id.startsWith('js-')).length;
  const tsCompleted = game.completedLessons.filter(id => id.startsWith('ts-')).length;
  const bossesSlayed = game.completedChallenges.length;

  const prevLevelXP = game.level === 1 ? 0 : getXPForNextLevel(game.level - 1);
  const nextLevelXP = getXPForNextLevel(game.level);
  const xpInCurrentLevel = game.xp - prevLevelXP;
  const xpRequiredForNext = nextLevelXP - prevLevelXP;
  const xpPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequiredForNext) * 100));

  const today = new Date();
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const isDayActive = (date: Date) => {
    if (!game.lastActiveDate) return false;
    const dateStr = date.toISOString().split('T')[0];
    if (dateStr === game.lastActiveDate) return true;
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= game.streak;
  };

  const handleSaveProfile = () => {
    playLevelUpSound();
    game.updateProfile(nickname, avatarId);
    setIsEditing(false);
  };

  const handleToggleEdit = () => {
    playClickSound();
    setIsEditing(!isEditing);
  };

  // Translations for badges
  const getBadgeName = (key: string) => {
    const names = {
      firstSteps: game.language === 'vi' ? 'Bước Đầu Tiên' : 'First Steps',
      squire: game.language === 'vi' ? 'Học Việc Cú Pháp' : 'Syntax Squire',
      tsScholar: game.language === 'vi' ? 'Môn Đồ TypeScript' : 'TypeScript Apprentice',
      bossSlayer: game.language === 'vi' ? 'Thợ Săn Rồng' : 'Boss Slayer',
      streak3: game.language === 'vi' ? 'Giữ Lửa Luyện Tập' : 'Streak Keeper'
    };
    return names[key as keyof typeof names];
  };

  const getBadgeDesc = (id: string) => {
    const descs = {
      first_steps: game.language === 'vi' ? 'Đã thi triển câu lệnh biến đầu tiên của bạn.' : 'Declared your first variables and compiled initial code.',
      squire: game.language === 'vi' ? 'Chứng tỏ năng lực làm chủ các logic cú pháp.' : 'Proven your capability in basic code logic operations.',
      ts_scholar: game.language === 'vi' ? 'Gia nhập thành trì của kiểu dữ liệu tĩnh kiểm tra.' : 'Ventured into the Citadel of type checking and structures.',
      boss_slayer: game.language === 'vi' ? 'Đánh bại rồng hoặc thử thách đệ quy trong đấu trường.' : 'Defeated one or more legendary challenges in the Arena.',
      streak_3: game.language === 'vi' ? 'Duy trì học tập liên tục 3 ngày để khắc sâu trí nhớ.' : 'Maintained a study routine of 3 days to forge muscle memory.'
    };
    return descs[id as keyof typeof descs];
  };

  const getBadgeReq = (key: string) => {
    const reqs = {
      reqLesson: game.language === 'vi' ? 'Hoàn thành bài học bất kỳ' : 'Complete any lesson',
      reqLevel2: game.language === 'vi' ? 'Đạt nhân vật Cấp độ 2' : 'Reach character Level 2',
      reqTS: game.language === 'vi' ? 'Hoàn thành bài học TS bất kỳ' : 'Complete any TypeScript lesson',
      reqBoss: game.language === 'vi' ? 'Hoàn thành Boss Arena bất kỳ' : 'Complete any Boss Challenge',
      reqStreak3: game.language === 'vi' ? 'Đạt chuỗi học tập 3 ngày' : 'Reach a 3-Day streak'
    };
    return reqs[key as keyof typeof reqs];
  };

  return (
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-sans">
      
      {/* Title */}
      <div className="text-center max-w-xl mb-12">
        <h2 className="text-2xl md:text-4xl font-game font-extrabold text-foreground uppercase drop-shadow-[2px_2px_0px_var(--shadow-color)]">
          {t.statsTitle}
        </h2>
        <p className="text-xs text-slate-550 dark:text-slate-400 mt-4 leading-relaxed max-w-sm mx-auto font-bold uppercase tracking-wider">
          {t.statsDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl items-start">
        
        {/* Left Column: Stats & Profile Editor */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Editable RPG Status Card */}
          <Card variant="peach" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-retro-pink pointer-events-none">
              <Star className="w-24 h-24" />
            </div>

            {/* Profile view or edit mode toggle */}
            {!isEditing ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 border-[3px] border-border rounded-xl bg-slate-900 overflow-hidden shrink-0 shadow-[2px_2px_0px_var(--shadow-color)]">
                  {getAvatarSvg(game.avatarId, 'w-full h-full')}
                </div>
                <div className="flex-1 min-w-0 text-slate-950">
                  <h3 className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">{t.charStatus}</h3>
                  <h4 className="text-sm font-game font-extrabold text-slate-955 mt-1 truncate uppercase">
                    {game.nickname}
                  </h4>
                  <p className="text-[9px] text-retro-orange mt-1 uppercase font-extrabold tracking-wide">
                    {`LV.${game.level} // ${getLevelTitle(game.level)}`}
                  </p>
                </div>
                <Button
                  onClick={handleToggleEdit}
                  variant="outline"
                  size="sm"
                  className="p-2 border-2 border-border shadow-[1.5px_1.5px_0px_var(--shadow-color)]"
                  title="Configure Character"
                >
                  <Settings className="w-4 h-4 stroke-[2.5]" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4 mb-6 border-b-2 border-dashed border-border-muted pb-5 text-slate-950">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-game font-extrabold text-retro-orange uppercase">{t.editProfile}</h4>
                  <button
                    onClick={handleToggleEdit}
                    className="text-[10px] font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {/* Nickname Input */}
                <div>
                  <label className="text-[9px] text-slate-700 font-extrabold uppercase block mb-1.5">{t.nicknameLabel}</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.substring(0, 16))}
                    placeholder="Enter nickname..."
                    className="w-full bg-white border-[3px] border-border p-2.5 rounded-xl text-xs font-bold outline-none focus:border-retro-orange/40 text-slate-900"
                  />
                </div>

                {/* 8 preset avatar icons selectors grid */}
                <div>
                  <label className="text-[9px] text-slate-700 font-extrabold uppercase block mb-2">{t.selectAvatar}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_AVATARS.map((avatar) => {
                      const isSel = avatarId === avatar.id;
                      return (
                        <button
                          key={avatar.id}
                          onClick={() => { playClickSound(); setAvatarId(avatar.id); }}
                          className={`p-1.5 rounded-xl bg-white border-[3px] transition-all cursor-pointer ${
                            isSel 
                              ? 'border-retro-orange shadow-[2px_2px_0px_var(--shadow-color)] scale-105' 
                              : 'border-border-muted hover:border-border'
                          }`}
                          title={avatar.name}
                        >
                          {avatar.svg('w-full h-full')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  variant="primary"
                  className="w-full py-2.5"
                >
                  {t.saveProfile}
                </Button>
              </div>
            )}

            <div className="space-y-4 text-[11px] font-bold uppercase text-slate-800">
              <div className="flex justify-between border-b-2 border-dashed border-border-muted pb-2">
                <span>{t.totalExp}</span>
                <span className="text-retro-orange font-extrabold">{game.xp} XP</span>
              </div>
              
              <div className="flex justify-between border-b-2 border-dashed border-border-muted pb-2">
                <span>{t.nextRank}</span>
                <span className="text-slate-800 font-extrabold">{nextLevelXP - game.xp} {t.xpRemaining}</span>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-700 mb-1.5 font-extrabold">
                  <span>{t.levelProgress}</span>
                  <span>{Math.round(xpPercentage)}%</span>
                </div>
                <Progress value={xpPercentage} color="pink" className="h-4" />
              </div>
            </div>
          </Card>

          {/* Quest statistics */}
          <Card variant="yellow" className="font-bold uppercase text-[11px] space-y-4">
            <h3 className="text-xs font-game font-extrabold text-slate-955 border-b-2 border-dashed border-border-muted pb-3 tracking-wider">{t.questLogs}</h3>
            <div className="flex justify-between text-slate-800 font-bold">
              <span>{t.jsCompleted}</span>
              <span className="text-slate-950 font-extrabold">{jsCompleted} / {jsLessons.length}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-bold">
              <span>{t.tsCompleted}</span>
              <span className="text-slate-950 font-extrabold">{tsCompleted} / {tsLessons.length}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-bold">
              <span>{t.bossCompleted}</span>
              <span className="text-slate-950 font-extrabold">{bossesSlayed} / {challenges.length}</span>
            </div>
            <div className="flex justify-between border-t-2 border-dashed border-border-muted pt-3 text-slate-900 font-extrabold">
              <span>{t.totalCompleted}</span>
              <span>{totalCompleted} / {jsLessons.length + tsLessons.length + challenges.length}</span>
            </div>
          </Card>

          {/* Account Profile Card */}
          <Card variant="default" className="space-y-4">
            <h3 className="text-xs font-game font-extrabold text-foreground border-b-2 border-dashed border-border-muted pb-3 tracking-wider uppercase">
              {game.language === 'vi' ? 'HỘI PHÁP SƯ 🔑' : 'GUILD ACCOUNT 🔑'}
            </h3>
            
            {game.isLoggedIn ? (
              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between text-slate-550 dark:text-slate-400 font-bold uppercase">
                  <span>{game.language === 'vi' ? 'TRẠNG THÁI:' : 'STATUS:'}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">{game.language === 'vi' ? 'ĐÃ ĐỒNG BỘ ☁️' : 'CLOUD SYNCED ☁️'}</span>
                </div>
                <div className="flex justify-between text-slate-550 dark:text-slate-400 font-bold uppercase">
                  <span>{game.language === 'vi' ? 'TÀI KHOẢN:' : 'ACCOUNT:'}</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold truncate max-w-[150px]">{game.user?.email}</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-relaxed pt-1 font-semibold uppercase tracking-wide">
                  {game.language === 'vi' 
                    ? 'Tiến trình của bạn đã được sao lưu tự động trên đám mây Supabase.' 
                    : 'Your spellcasting progress is securely backed up in the Supabase cloud.'}
                </div>
                <Button
                  onClick={() => { playClickSound(); game.logout(); }}
                  variant="outline"
                  className="w-full mt-2 py-2.5 text-[10px]"
                >
                  {game.language === 'vi' ? 'ĐĂNG XUẤT KHỎI HỘI' : 'LEAVE GUILD (LOGOUT)'}
                </Button>
              </div>
            ) : (
              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between text-slate-550 dark:text-slate-400 font-bold uppercase">
                  <span>{game.language === 'vi' ? 'TRẠNG THÁI:' : 'STATUS:'}</span>
                  <span className="text-retro-orange font-extrabold uppercase">{game.language === 'vi' ? 'CHƯA ĐĂNG NHẬP ⚠️' : 'GUEST MODE ⚠️'}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold uppercase tracking-wide">
                  {game.language === 'vi'
                    ? 'Tiến trình hiện tại chỉ được lưu ở trình duyệt này. Hãy đăng nhập bằng Google hoặc tạo tài khoản để lưu trữ vĩnh viễn và đồng bộ trên mọi thiết bị!'
                    : 'Your progress is currently local-only. Register or log in via Google to sync your characters and streaks across all devices!'}
                </p>
                <Button
                  onClick={() => { playClickSound(); game.setAuthModalOpen(true); }}
                  variant="primary"
                  className="w-full mt-2 py-2.5 text-[10px] tracking-wider"
                >
                  {game.language === 'vi' ? 'ĐĂNG NHẬP / ĐĂNG KÝ 🔑' : 'SIGN IN / REGISTER 🔑'}
                </Button>
              </div>
            )}
          </Card>

        </div>

        {/* Right Column: Achievements & Streak */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Streak tracker */}
          <Card variant="orange" className="relative overflow-hidden text-white">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-white fill-white animate-bounce" />
              <CardTitle className="text-white">{t.streakTitle}</CardTitle>
            </div>
            <p className="text-xs text-orange-100 leading-relaxed mb-6 font-semibold uppercase tracking-wider">
              {t.streakDesc} <span className="text-white font-extrabold">{game.streak} {t.days.toLowerCase()}</span>.
            </p>

            {/* Visual calendar streak timeline */}
            <div className="grid grid-cols-7 gap-3 mt-2">
              {weekDays.map((day, idx) => {
                const isActive = isDayActive(day);
                const dayLabel = day.toLocaleDateString(game.language === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' }).toUpperCase();
                const dayNum = day.getDate();

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 text-[9px] font-extrabold uppercase">
                    <span className="text-orange-100">{dayLabel}</span>
                    <div className={`w-9 h-9 border-[3px] rounded-xl flex items-center justify-center font-extrabold text-xs select-none shadow-[2px_2px_0px_var(--shadow-color)] ${
                      isActive 
                        ? 'bg-pop-yellow text-slate-900 border-border' 
                        : 'bg-[#140b07]/50 border-orange-900/40 text-orange-300'
                    }`}>
                      {dayNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Achievements list */}
          <Card variant="default">
            <h3 className="text-xs font-game font-extrabold text-foreground border-b-2 border-dashed border-border-muted pb-3 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-retro-pink" />
              {t.accomplishments}
            </h3>

            <div className="space-y-4">
              {BADGES.map((badge) => {
                const isUnlocked = game.unlockedBadges.includes(badge.id);

                return (
                  <div 
                    key={badge.id}
                    className={`flex items-start gap-4 p-4 border-[3px] rounded-2xl transition duration-200 shadow-[2px_2px_0px_var(--shadow-color)] ${
                      isUnlocked
                        ? 'bg-card border-border text-foreground'
                        : 'bg-card/50 border-border-muted opacity-50 text-slate-500'
                    }`}
                  >
                    <div className={`w-11 h-11 border-[3px] rounded-xl flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_var(--shadow-color)] ${
                      isUnlocked
                        ? 'bg-pop-yellow text-slate-900 border-border'
                        : 'bg-background border-border-muted text-slate-500'
                    }`}>
                      <Trophy className={`w-5 h-5 ${isUnlocked ? 'animate-pulse' : ''} stroke-[2.5]`} />
                    </div>

                    <div className="flex-1 font-sans text-xs">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-game font-extrabold ${isUnlocked ? 'text-retro-orange' : 'text-slate-500'}`}>
                          {getBadgeName(badge.nameKey)}
                        </h4>
                        {isUnlocked ? (
                          <span className="text-[8px] font-game font-extrabold text-emerald-800 dark:text-emerald-300 bg-pop-green border-2 border-border px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="text-[8px] font-game font-extrabold text-slate-500 border-2 border-border-muted px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                            LOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-550 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">{getBadgeDesc(badge.id)}</p>
                      <p className="text-[9px] text-slate-500 mt-1.5 uppercase font-bold tracking-wider">Requirement: {getBadgeReq(badge.requirementKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
