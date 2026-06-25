'use client';

import React, { createContext, useContext } from 'react';
import { useGameState, GameState } from '@/hooks/useGameState';
import type { User } from '@supabase/supabase-js';
import { Language } from '@/lib/i18n';

interface GameStateContextProps extends GameState {
  isLoaded: boolean;
  addXP: (amount: number) => void;
  loseLife: () => void;
  healLife: (cost?: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  completeChallenge: (challengeId: string, xpReward: number) => void;
  toggleSound: () => void;
  setLanguage: (lang: Language) => void;
  updateProfile: (nickname: string, avatarId: number) => void;
  resetProgress: () => void;
  user: User | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

const GameStateContext = createContext<GameStateContextProps | undefined>(undefined);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const gameState = useGameState();

  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameStateProvider');
  }
  return context;
}
