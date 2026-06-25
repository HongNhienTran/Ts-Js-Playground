'use client';

import { useState } from 'react';
import { Flame, Heart, PlusCircle, Sun, Moon } from 'lucide-react';
import { getLevelTitle, getXPForNextLevel } from '@/hooks/useGameState';
import SoundToggle from './SoundToggle';
import { playClickSound } from '@/lib/audio';
import { Language, i18n } from '@/lib/i18n';
import { getAvatarSvg } from '@/lib/avatars';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';

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
    <div className="w-full bg-card border-b-[3px] border-border py-3 px-4 md:px-8 sticky top-0 z-50 shadow-[0_4px_0px_var(--shadow-color)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Player Profile & Stats */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Round Avatar Container */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-[3px] border-border shadow-[2px_2px_0px_var(--shadow-color)] bg-card">
              {getAvatarSvg(avatarId, 'w-full h-full')}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-game font-extrabold text-foreground text-sm tracking-wide uppercase">{nickname}</span>
                <span className="text-[9px] font-game px-2 py-0.5 rounded-full bg-retro-orange text-white border-2 border-border font-bold">
                  LV.{level}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans mt-0.5 uppercase font-bold tracking-wider">
                {getLevelTitle(level)}
              </p>
            </div>
          </div>

          {/* Streak indicator */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[3px] border-border font-game text-xs font-extrabold uppercase shadow-[2px_2px_0px_var(--shadow-color)] ${streak > 0
                ? 'bg-pop-yellow text-slate-900'
                : 'bg-card text-slate-400'
              }`}
          >
            <Flame className={`w-4 h-4 ${streak > 0 ? 'animate-bounce text-retro-orange' : ''}`} />
            <span>{streak} {t.streak}</span>
          </div>
        </div>

        {/* Center: XP Progress Bar (Brutalist style) */}
        <div className="w-full md:max-w-xs flex-1 flex flex-col gap-1.5">
          <div className="flex justify-between font-game text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
            <span>XP: {xp} / {nextLevelXP}</span>
            <span>{Math.round(xpPercentage)}%</span>
          </div>
          <Progress value={xpPercentage} color="primary" />
        </div>

        {/* Right: Lives, Language & Sound Controls */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">

          {/* Hearts / Lives */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((heartIdx) => (
                <Heart
                  key={heartIdx}
                  className={`w-5 h-5 transition-all duration-300 ${heartIdx <= lives
                      ? 'fill-red-500 text-red-500 drop-shadow-[1px_1px_0px_#000]'
                      : 'text-slate-300 dark:text-slate-800 scale-90 opacity-20'
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
                  className="flex items-center justify-center text-emerald-500 hover:text-emerald-400 p-0.5 rounded-full border-2 border-border bg-pop-green transition-all cursor-pointer shadow-[1px_1px_0px_var(--shadow-color)] active:translate-y-0.5 active:shadow-none"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>

                {showHealTooltip && (
                  <div className="absolute right-0 top-8 bg-card border-[3px] border-border text-foreground text-[10px] px-3 py-2 rounded-xl shadow-[4px_4px_0px_var(--shadow-color)] w-44 font-sans font-bold z-50">
                    {t.potionsUse}
                    <div className="text-[9px] text-slate-500 mt-1 font-mediumNormal">
                      {xp >= 15 ? t.potionCost : t.potionReq}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Account Status */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <span className="hidden lg:inline text-[9px] text-slate-500 font-sans max-w-[100px] truncate font-bold uppercase tracking-wider" title={userEmail || ''}>
                  {userEmail}
                </span>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="px-2.5 py-1.5 text-[9px]"
                >
                  {t.logout}
                </Button>
              </div>
            ) : (
              <Button
                onClick={onOpenAuth}
                variant="primary"
                size="sm"
                className="px-3 py-1.5 text-[9px]"
              >
                {t.signIn}
              </Button>
            )}

            {/* Language Toggle */}
            <Button
              onClick={handleLangToggle}
              variant="outline"
              size="sm"
              className="px-2 py-1.5 text-[9px]"
              title="Change Language"
            >
              {language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
            </Button>

            {/* Theme Toggle (Dark / Light) */}
            <Button
              onClick={() => { playClickSound(); onToggleTheme(); }}
              variant="outline"
              size="icon"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-retro-yellow stroke-[2.5]" />
              ) : (
                <Moon className="w-4 h-4 text-retro-orange stroke-[2.5]" />
              )}
            </Button>

            {/* Sound Toggle */}
            <SoundToggle soundEnabled={soundEnabled} onToggle={onToggleSound} />
          </div>
        </div>
      </div>
    </div>
  );
}
