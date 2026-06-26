import { useState, useEffect } from 'react';
import { playLevelUpSound, setSoundEnabled as setAudioEnabled } from '@/lib/audio';
import { Language } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  completedChallenges: string[];
  completedTheoryLessons: string[];
  unlockedBadges: string[];
  lives: number;
  soundEnabled: boolean;
  language: Language;
  nickname: string;
  avatarId: number;
  theme: 'dark' | 'light';
}

const DEFAULT_STATE: GameState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  completedChallenges: [],
  completedTheoryLessons: [],
  unlockedBadges: [],
  lives: 3,
  soundEnabled: true,
  language: 'en',
  nickname: 'Novice Mage',
  avatarId: 1,
  theme: 'dark',
};

export const LEVEL_TITLES = [
  "Syntax Squire",      // Level 1
  "Logic Knight",       // Level 2
  "Scope Ranger",       // Level 3
  "Async Alchemist",    // Level 4
  "TypeScript Titan",   // Level 5
  "Grandmaster Archmage" // Level 6+
];

export function getLevelTitle(level: number): string {
  if (level <= 0) return "Glitch";
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}

export function getXPForNextLevel(level: number): number {
  if (level === 1) return 100;
  if (level === 2) return 300;
  if (level === 3) return 600;
  if (level === 4) return 1000;
  return level * 300;
}

// Streak checker
export function checkAndMigrateStreak(currentState: GameState): GameState {
  if (!currentState.lastActiveDate) return currentState;
  
  const today = new Date().toISOString().split('T')[0];
  const lastActive = currentState.lastActiveDate;
  
  if (today === lastActive) {
    return currentState;
  }
  
  const lastDate = new Date(lastActive);
  const todayDate = new Date(today);
  const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) {
    return { ...currentState, streak: 0 };
  }
  
  return currentState;
}

export function useGameState() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Sync to Cloud helper
  const syncProgressToCloud = async (currentState: GameState, userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          xp: currentState.xp,
          level: currentState.level,
          streak: currentState.streak,
          last_active_date: currentState.lastActiveDate,
          completed_lessons: currentState.completedLessons,
          completed_challenges: currentState.completedChallenges,
          completed_theory_lessons: currentState.completedTheoryLessons,
          unlocked_badges: currentState.unlockedBadges,
          lives: currentState.lives,
          nickname: currentState.nickname,
          avatar_id: currentState.avatarId,
          updated_at: new Date().toISOString()
        });
      if (error) {
        console.log("Supabase profile sync skipped (table profiles might not exist yet):", error.message);
      }
    } catch (err) {
      console.error("Cloud sync error:", err);
    }
  };

  // Load from Cloud helper
  const loadCloudProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data && !error) {
        let currentLocal = DEFAULT_STATE;
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('codegame_state');
          if (saved) {
            try { currentLocal = JSON.parse(saved); } catch {}
          }
        }
        const mergedState: GameState = {
          xp: data.xp ?? 0,
          level: data.level ?? 1,
          streak: data.streak ?? 0,
          lastActiveDate: data.last_active_date ?? null,
          completedLessons: data.completed_lessons ?? [],
          completedChallenges: data.completed_challenges ?? [],
          completedTheoryLessons: data.completed_theory_lessons ?? [],
          unlockedBadges: data.unlocked_badges ?? [],
          lives: data.lives ?? 3,
          soundEnabled: currentLocal.soundEnabled ?? true,
          language: currentLocal.language ?? 'en',
          nickname: data.nickname ?? 'Novice Mage',
          avatarId: data.avatar_id ?? 1,
          theme: currentLocal.theme ?? 'dark',
        };
        setState(mergedState);
        if (typeof window !== 'undefined') {
          localStorage.setItem('codegame_state', JSON.stringify(mergedState));
        }
      }
    } catch (err) {
      console.error("Failed to load cloud profile:", err);
    }
  };

  // Load state and listen to auth on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codegame_state');
      let loadedLocalState = DEFAULT_STATE;
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as GameState;
          
          // Verify required fields for back-compat
          const language = parsed.language || 'en';
          const nickname = parsed.nickname || 'Novice Mage';
          const avatarId = parsed.avatarId || 1;
          const theme = parsed.theme || 'dark';
          const completedTheoryLessons = parsed.completedTheoryLessons || [];
          
          loadedLocalState = checkAndMigrateStreak({
            ...parsed,
            language,
            nickname,
            avatarId,
            theme,
            completedTheoryLessons
          });
          
          // Apply class on initial mount
          if (loadedLocalState.theme === 'light') {
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
          }
        } catch {
          loadedLocalState = DEFAULT_STATE;
          document.documentElement.classList.remove('light');
        }
      } else {
        loadedLocalState = DEFAULT_STATE;
        document.documentElement.classList.remove('light');
      }

      // Schedule state updates asynchronously to avoid synchronous setState inside useEffect warning
      const timer = setTimeout(() => {
        setState(loadedLocalState);
        setAudioEnabled(loadedLocalState.soundEnabled);
        setIsLoaded(true);
      }, 0);

      // Check current session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          loadCloudProgress(session.user.id);
        }
      });

      // Subscribe to auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setUser(session.user);
          loadCloudProgress(session.user.id);
        } else {
          setUser(null);
        }
      });

      return () => {
        clearTimeout(timer);
        subscription.unsubscribe();
      };
    }
  }, []);

  // Helper to save state
  const saveState = (newState: GameState) => {
    setState(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('codegame_state', JSON.stringify(newState));
    }
    if (user) {
      syncProgressToCloud(newState, user.id);
    }
  };



  // Action: Add XP
  const addXP = (amount: number, currentState: GameState = state) => {
    const newXp = currentState.xp + amount;
    let newLevel = currentState.level;
    let leveledUp = false;

    while (newXp >= getXPForNextLevel(newLevel)) {
      newLevel += 1;
      leveledUp = true;
    }

    const today = new Date().toISOString().split('T')[0];
    let newStreak = currentState.streak;
    if (currentState.lastActiveDate !== today) {
      if (currentState.lastActiveDate) {
        const lastDate = new Date(currentState.lastActiveDate);
        const todayDate = new Date(today);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
    }

    const updatedState: GameState = {
      ...currentState,
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      lastActiveDate: today,
    };

    const finalState = checkBadgeUnlocks(updatedState);
    saveState(finalState);

    if (leveledUp) {
      setTimeout(() => playLevelUpSound(), 200);
    }
  };

  // Action: Lose a life
  const loseLife = () => {
    if (state.lives > 0) {
      saveState({ ...state, lives: state.lives - 1 });
    }
  };

  // Action: Heal (restore life)
  const healLife = (costXp: number = 0) => {
    if (state.lives < 3) {
      saveState({
        ...state,
        lives: 3,
        xp: Math.max(0, state.xp - costXp)
      });
    }
  };

  // Action: Complete a lesson
  const completeLesson = (lessonId: string, xpReward: number) => {
    if (state.completedLessons.includes(lessonId)) {
      addXP(Math.round(xpReward * 0.25));
      return;
    }

    const updatedState: GameState = {
      ...state,
      completedLessons: [...state.completedLessons, lessonId]
    };
    
    addXP(xpReward, updatedState);
  };

  // Action: Complete a challenge
  const completeChallenge = (challengeId: string, xpReward: number) => {
    if (state.completedChallenges.includes(challengeId)) {
      addXP(Math.round(xpReward * 0.2));
      return;
    }

    const updatedState: GameState = {
      ...state,
      completedChallenges: [...state.completedChallenges, challengeId]
    };

    addXP(xpReward, updatedState);
  };

  // Action: Toggle Sound
  const toggleSound = () => {
    const newVal = !state.soundEnabled;
    saveState({ ...state, soundEnabled: newVal });
    setAudioEnabled(newVal);
  };

  // Action: Set Language
  const setLanguage = (language: Language) => {
    saveState({ ...state, language });
  };

  // Action: Update Profile Details
  const updateProfile = (nickname: string, avatarId: number) => {
    saveState({
      ...state,
      nickname: nickname.trim() || 'Novice Mage',
      avatarId
    });
  };

  // Action: Reset all progress
  const resetProgress = () => {
    saveState(DEFAULT_STATE);
  };

  // Action: Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Badge unlocks checker
  const checkBadgeUnlocks = (currentState: GameState): GameState => {
    const badges = [...currentState.unlockedBadges];
    
    if (!badges.includes('first_steps') && currentState.completedLessons.length > 0) {
      badges.push('first_steps');
    }
    if (!badges.includes('squire') && currentState.level >= 2) {
      badges.push('squire');
    }
    const hasTSLesson = currentState.completedLessons.some(id => id.startsWith('ts-'));
    if (!badges.includes('ts_scholar') && hasTSLesson) {
      badges.push('ts_scholar');
    }
    if (!badges.includes('boss_slayer') && currentState.completedChallenges.length > 0) {
      badges.push('boss_slayer');
    }
    if (!badges.includes('streak_3') && currentState.streak >= 3) {
      badges.push('streak_3');
    }

    return { ...currentState, unlockedBadges: badges };
  };

  // Action: Toggle Theme (Dark / Light)
  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    saveState({ ...state, theme: newTheme });
    if (typeof window !== 'undefined') {
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }
  };

  // Action: Toggle a theory lesson as completed or not
  const toggleTheoryLesson = (lessonId: string, isCompleted: boolean) => {
    let newCompleted: string[];
    if (isCompleted) {
      if (state.completedTheoryLessons.includes(lessonId)) return;
      newCompleted = [...state.completedTheoryLessons, lessonId];
    } else {
      newCompleted = state.completedTheoryLessons.filter(id => id !== lessonId);
    }
    saveState({ ...state, completedTheoryLessons: newCompleted });
  };

  return {
    ...state,
    isLoaded,
    addXP,
    loseLife,
    healLife,
    completeLesson,
    completeChallenge,
    toggleTheoryLesson,
    toggleSound,
    setLanguage,
    updateProfile,
    resetProgress,
    user,
    isLoggedIn: !!user,
    isAuthModalOpen,
    setAuthModalOpen,
    logout,
    toggleTheme,
  };
}
