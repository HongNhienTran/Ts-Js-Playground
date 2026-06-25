import React from 'react';

export interface AvatarPreset {
  id: number;
  name: string;
  colors: string; // Gradient color info or theme
  svg: (className?: string) => React.ReactNode;
}

export const PRESET_AVATARS: AvatarPreset[] = [
  {
    id: 1,
    name: "Wizard",
    colors: "from-retro-orange to-retro-pink",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background base */}
        <rect width="64" height="64" rx="12" fill="#312E81" />
        {/* Wizard beard */}
        <path d="M16 38 L32 58 L48 38 Z" fill="#E2E8F0" />
        {/* Beard texture */}
        <path d="M24 38 L32 50 L40 38 Z" fill="#CBD5E1" />
        {/* Wizard face */}
        <rect x="22" y="24" width="20" height="16" fill="#FDBA74" />
        {/* Eyes */}
        <rect x="25" y="28" width="3" height="3" fill="#1E293B" />
        <rect x="36" y="28" width="3" height="3" fill="#1E293B" />
        {/* Magic wizard hat */}
        <path d="M8 24 L56 24 L48 20 L40 6 L24 6 L16 20 Z" fill="#4338CA" />
        <rect x="12" y="20" width="40" height="4" fill="#A855F7" /> {/* Hat ribbon */}
        <circle cx="32" cy="6" r="3" fill="#F59E0B" /> {/* Star tip */}
      </svg>
    )
  },
  {
    id: 2,
    name: "Warrior",
    colors: "from-slate-600 to-slate-800",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#1E293B" />
        {/* Shoulders */}
        <path d="M12 52 L52 52 L44 40 L20 40 Z" fill="#475569" />
        {/* Warrior face */}
        <rect x="22" y="22" width="20" height="18" fill="#FDBA74" />
        {/* Iron Helmet */}
        <path d="M18 14 L46 14 L44 26 L20 26 Z" fill="#64748B" />
        <path d="M28 8 L36 8 L32 20 Z" fill="#DC2626" /> {/* Helmet crest plume */}
        <rect x="20" y="22" width="24" height="4" fill="#475569" /> {/* Helmet visor bar */}
        {/* Visor slit eyes */}
        <rect x="25" y="27" width="4" height="2" fill="#F59E0B" />
        <rect x="35" y="27" width="4" height="2" fill="#F59E0B" />
      </svg>
    )
  },
  {
    id: 3,
    name: "Rogue",
    colors: "from-zinc-800 to-zinc-950",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#09090B" />
        {/* Shadow Face */}
        <rect x="22" y="24" width="20" height="16" fill="#18181B" />
        {/* Glowing Rogue Eyes */}
        <rect x="24" y="28" width="4" height="2" fill="#10B981" className="animate-pulse" />
        <rect x="36" y="28" width="4" height="2" fill="#10B981" className="animate-pulse" />
        {/* Dark Hood */}
        <path d="M14 20 L50 20 L42 42 L22 42 Z" fill="#27272A" />
        <path d="M16 20 C24 8, 40 8, 48 20" fill="none" stroke="#27272A" strokeWidth="8" />
        <path d="M20 42 L32 58 L44 42 Z" fill="#18181B" /> {/* Cloak back */}
      </svg>
    )
  },
  {
    id: 4,
    name: "Alchemist",
    colors: "from-emerald-600 to-teal-800",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#064E3B" />
        {/* Face */}
        <rect x="22" y="22" width="20" height="20" fill="#FDBA74" />
        {/* Messy hair */}
        <path d="M18 16 L46 16 L48 22 L16 22 Z" fill="#B45309" />
        <rect x="16" y="22" width="6" height="12" fill="#B45309" />
        <rect x="42" y="22" width="6" height="12" fill="#B45309" />
        {/* Goggles */}
        <rect x="20" y="24" width="24" height="6" fill="#1F2937" />
        <circle cx="25" cy="27" r="4" fill="#06B6D4" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="39" cy="27" r="4" fill="#06B6D4" stroke="#F59E0B" strokeWidth="1.5" />
        {/* Collar / Flask emblem */}
        <path d="M24 44 L40 44 L32 54 Z" fill="#10B981" />
      </svg>
    )
  },
  {
    id: 5,
    name: "Slime",
    colors: "from-emerald-400 to-green-500",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#065F46" />
        {/* Cute Blob body */}
        <path d="M14 42 C14 26, 50 26, 50 42 C50 50, 14 50, 14 42 Z" fill="#34D399" />
        <ellipse cx="32" cy="42" rx="16" ry="7" fill="#10B981" />
        {/* Eyes */}
        <circle cx="26" cy="38" r="2.5" fill="#064E3B" />
        <circle cx="38" cy="38" r="2.5" fill="#064E3B" />
        {/* Blush cheeks */}
        <circle cx="21" cy="41" r="2" fill="#F43F5E" opacity="0.6" />
        <circle cx="43" cy="41" r="2" fill="#F43F5E" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 6,
    name: "Dragon",
    colors: "from-red-600 to-rose-700",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#7F1D1D" />
        {/* Dragon snout */}
        <path d="M16 34 L48 34 L44 48 L20 48 Z" fill="#DC2626" />
        {/* Horns */}
        <path d="M22 22 L14 10 L24 16 Z" fill="#F59E0B" />
        <path d="M42 22 L50 10 L40 16 Z" fill="#F59E0B" />
        {/* Head */}
        <rect x="20" y="20" width="24" height="16" fill="#EF4444" />
        {/* Yellow Dragon Eyes */}
        <path d="M23 26 L29 26 L26 29 Z" fill="#FBBF24" />
        <path d="M41 26 L35 26 L38 29 Z" fill="#FBBF24" />
        {/* Nostril dots */}
        <rect x="26" y="40" width="2" height="3" fill="#7F1D1D" />
        <rect x="36" y="40" width="2" height="3" fill="#7F1D1D" />
      </svg>
    )
  },
  {
    id: 7,
    name: "Cleric",
    colors: "from-amber-400 to-yellow-500",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#78350F" />
        {/* Face */}
        <rect x="22" y="24" width="20" height="18" fill="#FDBA74" />
        {/* Golden Halo */}
        <circle cx="32" cy="18" r="12" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 3" />
        {/* White Hood */}
        <path d="M16 24 L48 24 L42 48 L22 48 Z" fill="#F8FAFC" />
        <path d="M22 24 L32 34 L42 24 Z" fill="#E2E8F0" />
        {/* Eyes */}
        <rect x="26" y="29" width="3" height="3" fill="#1E293B" />
        <rect x="35" y="29" width="3" height="3" fill="#1E293B" />
      </svg>
    )
  },
  {
    id: 8,
    name: "Thief",
    colors: "from-zinc-700 to-zinc-900",
    svg: (className = "w-12 h-12") => (
      <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" fill="#27272A" />
        {/* Hair */}
        <rect x="20" y="16" width="24" height="10" fill="#71717A" />
        {/* Face */}
        <rect x="22" y="22" width="20" height="20" fill="#FDBA74" />
        {/* Shadow Mask */}
        <rect x="18" y="25" width="28" height="6" fill="#09090B" />
        {/* Eyes inside mask */}
        <circle cx="26" cy="28" r="1.5" fill="#EF4444" />
        <circle cx="38" cy="28" r="1.5" fill="#EF4444" />
        {/* Neck wrap */}
        <path d="M18 42 L46 42 L32 52 Z" fill="#3F3F46" />
      </svg>
    )
  }
];

export function getAvatarSvg(id: number, className = "w-12 h-12"): React.ReactNode {
  const avatar = PRESET_AVATARS.find(a => a.id === id) || PRESET_AVATARS[0];
  return avatar.svg(className);
}
