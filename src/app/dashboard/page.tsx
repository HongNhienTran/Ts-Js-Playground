'use client';

import { useGame } from '@/context/GameStateContext';
import { getLevelTitle, getXPForNextLevel } from '@/hooks/useGameState';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Trophy, Flame, Check, Star, Settings, User } from 'lucide-react';
import { jsLessons } from '@/data/jsLessons';
import { tsLessons } from '@/data/tsLessons';
import { challenges } from '@/data/challenges';
import { i18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { PRESET_AVATARS, getAvatarSvg } from '@/lib/avatars';
import { playClickSound, playLevelUpSound } from '@/lib/audio';

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
      setNickname(game.nickname);
      setAvatarId(game.avatarId);
    }
  }, [game.isLoaded, game.nickname, game.avatarId]);

  if (!game.isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background font-mono text-slate-500">
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
    <div className="flex-1 bg-background text-foreground py-12 px-6 md:px-12 flex flex-col items-center font-mono">
      
      {/* Title */}
      <div className="text-center max-w-xl mb-12">
        <h2 className="text-xl md:text-3xl font-game font-bold tracking-wide text-retro-orange mb-6 uppercase drop-shadow-[2px_2px_0px_#000]">
          {t.statsTitle}
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
          {t.statsDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl items-start">
        
        {/* Left Column: Stats & Profile Editor */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Editable RPG Status Card */}
          <div className="p-6 pixel-box relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-retro-pink">
              <Star className="w-24 h-24" />
            </div>

            {/* Profile view or edit mode toggle */}
            {!isEditing ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 border-2 border-retro-orange rounded bg-slate-900 overflow-hidden shrink-0">
                  {getAvatarSvg(game.avatarId, 'w-full h-full')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] text-slate-500 font-bold uppercase">{t.charStatus}</h3>
                  <h4 className="text-sm font-game font-bold text-foreground mt-1 truncate uppercase">
                    {game.nickname}
                  </h4>
                  <p className="text-[9px] text-retro-pink mt-1 uppercase font-bold">
                    LV.{game.level} // {getLevelTitle(game.level)}
                  </p>
                </div>
                <button
                  onClick={handleToggleEdit}
                  className="p-2 border border-slate-800 hover:border-retro-orange rounded bg-slate-900 text-slate-400 hover:text-white cursor-pointer active:translate-y-0.5"
                  title="Configure Character"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-6 border-b border-indigo-950/40 pb-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-game font-bold text-retro-pink uppercase">{t.editProfile}</h4>
                  <button
                    onClick={handleToggleEdit}
                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {/* Nickname Input */}
                <div>
                  <label className="text-[9px] text-slate-500 font-bold uppercase block mb-1.5">{t.nicknameLabel}</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.substring(0, 16))}
                    placeholder="Enter nickname..."
                    className="w-full bg-slate-950 border-2 border-slate-900 p-2.5 rounded text-xs outline-none focus:border-retro-orange/40 text-slate-200"
                  />
                </div>

                {/* 8 preset avatar icons selectors grid */}
                <div>
                  <label className="text-[9px] text-slate-500 font-bold uppercase block mb-2">{t.selectAvatar}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_AVATARS.map((avatar) => {
                      const isSel = avatarId === avatar.id;
                      return (
                        <button
                          key={avatar.id}
                          onClick={() => { playClickSound(); setAvatarId(avatar.id); }}
                          className={`p-1.5 rounded bg-slate-950 border-2 transition-all cursor-pointer ${
                            isSel 
                              ? 'border-retro-orange shadow-[0_0_8px_rgba(255,106,28,0.4)] scale-105' 
                              : 'border-slate-900 hover:border-slate-800'
                          }`}
                          title={avatar.name}
                        >
                          {avatar.svg('w-full h-full')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full py-2.5 bg-retro-orange hover:bg-retro-orange/80 text-white font-game text-[9px] font-bold rounded border-2 border-retro-peach/40 pixel-btn active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  {t.saveProfile}
                </button>
              </div>
            )}

            <div className="space-y-4 text-[11px] font-bold uppercase text-slate-400">
              <div className="flex justify-between border-b border-indigo-950/20 pb-2">
                <span>{t.totalExp}</span>
                <span className="text-retro-orange font-bold">{game.xp} XP</span>
              </div>
              
              <div className="flex justify-between border-b border-indigo-950/20 pb-2">
                <span>{t.nextRank}</span>
                <span className="text-slate-300">{nextLevelXP - game.xp} {t.xpRemaining}</span>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                  <span>{t.levelProgress}</span>
                  <span>{Math.round(xpPercentage)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-950 border-2 border-slate-800 p-0.5 overflow-hidden">
                  <div 
                    className="h-full bg-retro-pink transition-all duration-300"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quest statistics */}
          <div className="p-6 pixel-box font-bold uppercase text-[11px] space-y-4">
            <h3 className="text-xs font-game font-bold text-foreground border-b border-indigo-950/20 pb-3 tracking-wider">{t.questLogs}</h3>
            <div className="flex justify-between text-slate-400">
              <span>{t.jsCompleted}</span>
              <span className="text-amber-400">{jsCompleted} / {jsLessons.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{t.tsCompleted}</span>
              <span className="text-cyan-400">{tsCompleted} / {tsLessons.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{t.bossCompleted}</span>
              <span className="text-rose-400">{bossesSlayed} / {challenges.length}</span>
            </div>
            <div className="flex justify-between border-t-2 border-indigo-950/20 pt-3 text-slate-300 font-bold">
              <span>{t.totalCompleted}</span>
              <span>{totalCompleted} / {jsLessons.length + tsLessons.length + challenges.length}</span>
            </div>
          </div>

          {/* Account Profile Card */}
          <div className="p-6 pixel-box space-y-4">
            <h3 className="text-xs font-game font-bold text-foreground border-b border-indigo-950/20 pb-3 tracking-wider uppercase">
              {game.language === 'vi' ? 'HỘI PHÁP SƯ 🔑' : 'GUILD ACCOUNT 🔑'}
            </h3>
            
            {game.isLoggedIn ? (
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>{game.language === 'vi' ? 'TRẠNG THÁI:' : 'STATUS:'}</span>
                  <span className="text-emerald-400 font-bold uppercase">{game.language === 'vi' ? 'ĐÃ ĐỒNG BỘ ☁️' : 'CLOUD SYNCED ☁️'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{game.language === 'vi' ? 'TÀI KHOẢN:' : 'ACCOUNT:'}</span>
                  <span className="text-slate-200 font-bold truncate max-w-[150px]">{game.user?.email}</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-relaxed pt-1">
                  {game.language === 'vi' 
                    ? 'Tiến trình của bạn đã được sao lưu tự động trên đám mây Supabase.' 
                    : 'Your spellcasting progress is securely backed up in the Supabase cloud.'}
                </div>
                <button
                  onClick={() => { playClickSound(); game.logout(); }}
                  className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-game text-[9px] font-bold rounded border-2 border-slate-800 pixel-btn active:translate-y-0.5 cursor-pointer"
                >
                  {game.language === 'vi' ? 'ĐĂNG XUẤT KHỎI HỘI' : 'LEAVE GUILD (LOGOUT)'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>{game.language === 'vi' ? 'TRẠNG THÁI:' : 'STATUS:'}</span>
                  <span className="text-retro-orange font-bold uppercase">{game.language === 'vi' ? 'CHƯA ĐĂNG NHẬP ⚠️' : 'GUEST MODE ⚠️'}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {game.language === 'vi'
                    ? 'Tiến trình hiện tại chỉ được lưu ở trình duyệt này. Hãy đăng nhập bằng Google hoặc tạo tài khoản để lưu trữ vĩnh viễn và đồng bộ trên mọi thiết bị!'
                    : 'Your progress is currently local-only. Register or log in via Google to sync your characters and streaks across all devices!'}
                </p>
                <button
                  onClick={() => { playClickSound(); game.setAuthModalOpen(true); }}
                  className="w-full mt-2 py-2.5 bg-retro-orange hover:bg-retro-orange/90 text-white font-game text-[9px] font-bold rounded border-2 border-retro-peach/40 pixel-btn active:translate-y-0.5 cursor-pointer uppercase tracking-wider"
                >
                  {game.language === 'vi' ? 'ĐĂNG NHẬP / ĐĂNG KÝ 🔑' : 'SIGN IN / REGISTER 🔑'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Achievements & Streak */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Streak tracker */}
          <div className="p-6 pixel-box border-amber-500/20 bg-amber-950/5 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
              <h3 className="font-game text-xs font-bold text-amber-400 uppercase tracking-wide">{t.streakTitle}</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6 font-mono">
              {t.streakDesc} <span className="text-amber-400 font-bold">{game.streak} {t.days.toLowerCase()}</span>.
            </p>

            {/* Visual calendar streak timeline */}
            <div className="grid grid-cols-7 gap-3 mt-2">
              {weekDays.map((day, idx) => {
                const isActive = isDayActive(day);
                const dayLabel = day.toLocaleDateString(game.language === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' }).toUpperCase();
                const dayNum = day.getDate();

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 text-[9px] font-bold">
                    <span className="text-slate-500">{dayLabel}</span>
                    <div className={`w-9 h-9 border-2 flex items-center justify-center font-bold text-xs select-none ${
                      isActive 
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]' 
                        : 'bg-slate-950 border-slate-900 text-slate-600'
                    }`}>
                      {dayNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements list */}
          <div className="p-6 pixel-box">
            <h3 className="text-xs font-game font-bold text-foreground border-b border-indigo-950/20 pb-3 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-retro-pink" />
              {t.accomplishments}
            </h3>

            <div className="space-y-4">
              {BADGES.map((badge) => {
                const isUnlocked = game.unlockedBadges.includes(badge.id);

                return (
                  <div 
                    key={badge.id}
                    className={`flex items-start gap-4 p-4 border-2 transition duration-200 ${
                      isUnlocked
                        ? 'bg-slate-900/60 border-retro-orange/20 text-slate-100'
                        : 'bg-slate-950/40 border-slate-900 opacity-50 text-slate-500'
                    }`}
                  >
                    <div className={`w-11 h-11 border-2 flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-retro-orange/10 border-retro-orange/30 text-retro-orange'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}>
                      <Trophy className={`w-5 h-5 ${isUnlocked ? 'animate-pulse' : ''}`} />
                    </div>

                    <div className="flex-1 font-mono">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-[11px] font-bold ${isUnlocked ? 'text-retro-yellow' : 'text-slate-500'}`}>
                          {getBadgeName(badge.nameKey)}
                        </h4>
                        {isUnlocked ? (
                          <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 uppercase tracking-wider">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-wider">
                            LOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{getBadgeDesc(badge.id)}</p>
                      <p className="text-[9px] text-slate-500 mt-1.5 uppercase font-bold">Requirement: {getBadgeReq(badge.requirementKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
