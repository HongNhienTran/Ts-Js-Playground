'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useGame } from '@/context/GameStateContext';
import GameStatus from './GameStatus';
import AuthModal from './AuthModal';
import { Home, Compass, Trophy, BarChart2, RefreshCw, BookOpen } from 'lucide-react';
import { playClickSound } from '@/lib/audio';
import { useEffect } from 'react';
import { i18n } from '@/lib/i18n';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const game = useGame();
  


  const isLandingPage = pathname === '/';
  const t = i18n[game.language || 'en'];

  const { isLoaded, setAuthModalOpen } = game;

  // Trigger login invitation on first load sequence
  useEffect(() => {
    if (isLoaded && !isLandingPage) {
      const prompted = localStorage.getItem('auth_prompt_shown');
      if (!prompted) {
        // Delay slightly for visual effect
        const timer = setTimeout(() => {
          setAuthModalOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded, isLandingPage, setAuthModalOpen]);

  const handleNavClick = (href: string) => {
    playClickSound();
    router.push(href);
  };

  const handleReset = () => {
    if (confirm(t.resetConfirm)) {
      playClickSound();
      game.resetProgress();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground game-grid font-sans">
      
      {/* Game HUD (stats bar) */}
      {!isLandingPage && game.isLoaded && (
        <GameStatus
          xp={game.xp}
          level={game.level}
          streak={game.streak}
          lives={game.lives}
          soundEnabled={game.soundEnabled}
          onToggleSound={game.toggleSound}
          onHeal={game.healLife}
          language={game.language}
          onSetLanguage={game.setLanguage}
          nickname={game.nickname}
          avatarId={game.avatarId}
          isLoggedIn={game.isLoggedIn}
          userEmail={game.user?.email ?? null}
          onOpenAuth={() => game.setAuthModalOpen(true)}
          onLogout={game.logout}
          theme={game.theme}
          onToggleTheme={game.toggleTheme}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col ${!isLandingPage ? 'pb-24' : ''}`}>{children}</main>

      {/* Retro Nav Bar for subpages */}
      {!isLandingPage && (
        <nav className="bg-card border-t-[3px] border-border py-3 px-6 fixed bottom-0 left-0 right-0 z-40 shadow-[0_-4px_0px_var(--shadow-color)]">
          <div className="max-w-4xl mx-auto flex items-center justify-around">
            <button
              onClick={() => handleNavClick('/')}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase transition cursor-pointer select-none ${
                pathname === '/' ? 'text-retro-orange scale-105' : 'text-slate-500 hover:text-foreground'
              }`}
            >
              <Home className="w-5 h-5 stroke-[2.5]" />
              <span>{t.navHome}</span>
            </button>

            <button
              onClick={() => handleNavClick('/theory')}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase transition cursor-pointer select-none ${
                pathname.startsWith('/theory') ? 'text-retro-orange scale-105' : 'text-slate-500 hover:text-foreground'
              }`}
            >
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
              <span>{t.navTheory}</span>
            </button>

            <button
              onClick={() => handleNavClick('/practice')}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase transition cursor-pointer select-none ${
                pathname.startsWith('/practice') ? 'text-retro-orange scale-105' : 'text-slate-500 hover:text-foreground'
              }`}
            >
              <Compass className="w-5 h-5 stroke-[2.5]" />
              <span>{t.navPractice}</span>
            </button>

            <button
              onClick={() => handleNavClick('/challenges')}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase transition cursor-pointer select-none ${
                pathname.startsWith('/challenges') ? 'text-retro-orange scale-105' : 'text-slate-500 hover:text-foreground'
              }`}
            >
              <Trophy className="w-5 h-5 stroke-[2.5]" />
              <span>{t.navArena}</span>
            </button>

            <button
              onClick={() => handleNavClick('/dashboard')}
              className={`flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase transition cursor-pointer select-none ${
                pathname === '/dashboard' ? 'text-retro-orange scale-105' : 'text-slate-500 hover:text-foreground'
              }`}
            >
              <BarChart2 className="w-5 h-5 stroke-[2.5]" />
              <span>{t.navStats}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex flex-col items-center gap-1.5 text-[10px] font-game font-extrabold uppercase text-slate-500 hover:text-rose-500 transition cursor-pointer select-none"
              title="Reset progress"
            >
              <RefreshCw className="w-5 h-5 animate-spin-slow stroke-[2.5]" />
              <span>{t.navReset}</span>
            </button>
          </div>
        </nav>
      )}

      {/* Auth Invitation Modal */}
      {game.isLoaded && (
        <AuthModal
          isOpen={game.isAuthModalOpen}
          onClose={() => game.setAuthModalOpen(false)}
          lang={game.language}
        />
      )}
    </div>
  );
}
