'use client';

import { useState } from 'react';
import { Flame, Heart, Sparkles, PlusCircle, Sun, Moon } from 'lucide-react';
import { getLevelTitle, getXPForNextLevel } from '@/hooks/useGameState';
import SoundToggle from './SoundToggle';
import { playClickSound } from '@/lib/audio';
import { Language, i18n } from '@/lib/i18n';
import { getAvatarSvg } from '@/lib/avatars';

interface GameStatusProps {
  xp: number;
  level: number;
  streak: number;
  lives: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onHeal: (cost: number) => void;
  language: Language;
  onSetLanguage: (lang: Language) => void;
  nickname: string;
  avatarId: number;
  isLoggedIn: boolean;
  userEmail: string | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function GameStatus({
  xp,
  level,
  streak,
  lives,
  soundEnabled,
  onToggleSound,
  onHeal,
  language,
  onSetLanguage,
  nickname,
  avatarId,
  isLoggedIn,
  userEmail,
  onOpenAuth,
  onLogout,
  theme,
  onToggleTheme,
}: GameStatusProps) {
  const [showHealTooltip, setShowHealTooltip] = useState(false);

  const t = i18n[language];

  const prevLevelXP = level === 1 ? 0 : getXPForNextLevel(level - 1);
  const nextLevelXP = getXPForNextLevel(level);
  const xpInCurrentLevel = xp - prevLevelXP;
  const xpRequiredForNext = nextLevelXP - prevLevelXP;
  const xpPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequiredForNext) * 100));

  const handleHeal = () => {
    playClickSound();
    const cost = xp >= 15 ? 15 : 0;
    onHeal(cost);
  };

  const handleLangToggle = () => {
    playClickSound();
    onSetLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <div className="w-full bg-card border-b-4 border-retro-peach/30 py-3 px-4 md:px-6 sticky top-0 z-50 shadow-[0_4px_20px_var(--shadow-color)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Player Profile, Title & Stats */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Display SVG avatar */}
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-retro-orange shadow-[2px_2px_0px_#000] bg-slate-900">
              {getAvatarSvg(avatarId, 'w-full h-full')}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-mono text-sm tracking-wide">{nickname}</span>
                <span className="text-[9px] font-game px-2 py-0.5 rounded bg-retro-orange/10 text-retro-orange border border-retro-orange/30">
                  LV.{level}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">
                {getLevelTitle(level)}
              </p>
            </div>
          </div>

          {/* Streak indicator */}
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border-2 font-mono text-xs ${
              streak > 0 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-slate-900 border-slate-800 text-slate-600'
            }`}
          >
            <Flame className={`w-4 h-4 ${streak > 0 ? 'animate-bounce text-amber-500' : ''}`} />
            <span className="font-bold">{streak} {t.streak.toUpperCase()}</span>
          </div>
        </div>

        {/* Center: XP Progress Bar (Retro) */}
        <div className="w-full md:max-w-xs flex-1 flex flex-col gap-1">
          <div className="flex justify-between font-mono text-[9px] text-slate-500">
            <span>XP: {xp} / {nextLevelXP}</span>
            <span>{Math.round(xpPercentage)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-900 border-2 border-slate-800 p-0.5 overflow-hidden">
            <div 
              className="h-full bg-retro-orange transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        {/* Right: Lives, Language flag toggle & Sound */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          
          {/* Hearts / Lives */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((heartIdx) => (
                <Heart
                  key={heartIdx}
                  className={`w-5 h-5 transition-all duration-300 ${
                    heartIdx <= lives
                      ? 'fill-red-500 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]'
                      : 'text-slate-800 scale-90 opacity-30'
                  }`}
                />
              ))}
            </div>

            {lives < 3 && (
              <div className="relative">
                <button
                  onClick={handleHeal}
                  onMouseEnter={() => setShowHealTooltip(true)}
                  onMouseLeave={() => setShowHealTooltip(false)}
                  className="flex items-center justify-center text-emerald-400 hover:text-emerald-300 p-0.5 rounded border border-emerald-500/20 bg-emerald-950/20 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 animate-pulse" />
                </button>
                
                {showHealTooltip && (
                  <div className="absolute right-0 top-8 bg-card border-2 border-emerald-500/40 text-emerald-300 text-[10px] px-2.5 py-1.5 rounded shadow-xl w-44 font-mono z-50">
                    {t.potionsUse}
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      {xp >= 15 ? t.potionCost : t.potionReq}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Account Status Badge */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <span className="hidden lg:inline text-[9px] text-slate-500 font-mono max-w-[100px] truncate" title={userEmail || ''}>
                  {userEmail}
                </span>
                <button
                  onClick={onLogout}
                  className="px-2 py-1.5 rounded border-2 border-slate-800 hover:border-retro-pink text-slate-400 hover:text-white font-mono text-[9px] font-bold bg-slate-900 cursor-pointer active:translate-y-0.5"
                >
                  {language === 'vi' ? 'ĐĂNG XUẤT' : 'LOGOUT'}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2 py-1.5 rounded border-2 border-retro-orange bg-retro-orange/10 hover:bg-retro-orange text-retro-orange hover:text-white font-mono text-[9px] font-bold active:translate-y-0.5 cursor-pointer uppercase tracking-wider animate-pulse hover:animate-none"
              >
                {language === 'vi' ? 'ĐĂNG NHẬP 🔑' : 'SIGN IN 🔑'}
              </button>
            )}

            {/* Language Flag Toggle */}
            <button
              onClick={handleLangToggle}
              className="p-1.5 rounded border-2 border-slate-800 hover:border-retro-orange text-slate-300 font-mono text-[10px] font-bold bg-slate-900 active:translate-y-0.5 cursor-pointer uppercase select-none"
              title="Change Language"
            >
              {language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => { playClickSound(); onToggleTheme(); }}
              className="p-2 rounded border-2 border-slate-800 hover:border-retro-orange text-slate-300 bg-slate-900 active:translate-y-0.5 flex items-center justify-center cursor-pointer select-none"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-retro-yellow" />
              ) : (
                <Moon className="w-4 h-4 text-retro-orange" />
              )}
            </button>

            {/* Sound Toggle */}
            <SoundToggle soundEnabled={soundEnabled} onToggle={onToggleSound} />
          </div>
        </div>
      </div>
    </div>
  );
}
