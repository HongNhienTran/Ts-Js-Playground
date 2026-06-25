'use client';

import React, { createContext, useContext } from 'react';
import { useGameState, GameState } from '@/hooks/useGameState';

interface GameStateContextProps extends GameState {
  isLoaded: boolean;
  addXP: (amount: number) => void;
  loseLife: () => void;
  healLife: (cost?: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  completeChallenge: (challengeId: string, xpReward: number) => void;
  toggleSound: () => void;
  setLanguage: (lang: any) => void;
  updateProfile: (nickname: string, avatarId: number) => void;
  resetProgress: () => void;
  user: any;
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
