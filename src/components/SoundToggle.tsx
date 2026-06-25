'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { playClickSound } from '@/lib/audio';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export default function SoundToggle({ soundEnabled, onToggle }: SoundToggleProps) {
  const handleClick = () => {
    onToggle();
    // Play a click sound if the user is unmuting
    if (!soundEnabled) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2.5 rounded border border-retro-orange/30 bg-retro-orange/10 text-retro-orange hover:text-retro-yellow hover:bg-retro-orange/20 transition-all duration-200 shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer select-none"
      title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span className="hidden md:inline font-mono">SOUND: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-5 h-5 opacity-70" />
          <span className="hidden md:inline font-mono text-slate-500">SOUND: OFF</span>
        </>
      )}
    </button>
  );
}
