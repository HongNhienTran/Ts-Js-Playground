'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Sparkles, AlertTriangle, CheckCircle, Mail, Key } from 'lucide-react';
import { playClickSound, playLevelUpSound, playFailureSound } from '@/lib/audio';
import { Language, i18n } from '@/lib/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function AuthModal({ isOpen, onClose, lang }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const t = i18n[lang];

  if (!isOpen) return null;

  const handleClose = () => {
    playClickSound();
    // Remember prompt shown
    localStorage.setItem('auth_prompt_shown', 'true');
    onClose();
  };

  const handleGoogleLogin = async () => {
    playClickSound();
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      playFailureSound();
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  };

  const handleEmailAuth = async (type: 'login' | 'signup') => {
    playClickSound();
    if (!email || !password) {
      playFailureSound();
      setErrorMsg(lang === 'vi' ? 'Vui lòng điền đủ email và mật mã!' : 'Please enter both email and password!');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        playLevelUpSound();
        setSuccessMsg(t.authRegisterSuccess);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        playLevelUpSound();
        setSuccessMsg(t.authLoginSuccess);
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (err: unknown) {
      playFailureSound();
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-md pixel-box p-6 relative flex flex-col gap-6 text-zinc-100 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded bg-slate-900 border-2 border-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer shadow-md active:translate-y-0.5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Info */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-retro-orange/15 flex items-center justify-center text-retro-orange border-2 border-retro-orange/20 mx-auto mb-3">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-sm font-game font-bold tracking-tight text-retro-orange uppercase leading-relaxed">
            {t.authTitle}
          </h3>
          <p className="text-[11px] text-slate-400 font-mono mt-2 leading-relaxed">
            {t.authDesc}
          </p>
        </div>

        {/* Action Alerts */}
        {errorMsg && (
          <div className="flex items-start gap-2 bg-rose-500/10 border-2 border-rose-500/20 text-rose-400 p-2.5 rounded-lg text-[11px] font-mono leading-relaxed">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2 bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-400 p-2.5 rounded-lg text-[11px] font-mono leading-relaxed">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* OAuth Google Button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 bg-retro-orange hover:bg-retro-orange/90 text-white font-mono text-xs font-bold rounded border-2 border-retro-peach/30 flex items-center justify-center gap-2 pixel-btn active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <span>Google</span>
            <span>{t.authGoogle}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono text-[9px] text-slate-500 uppercase">
          <div className="flex-1 h-px bg-slate-900" />
          <span>OR</span>
          <div className="flex-1 h-px bg-slate-900" />
        </div>

        {/* Email form inputs */}
        <div className="space-y-3 font-mono text-xs">
          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1.5">{t.authEmail}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.authPlaceholderEmail}
                className="w-full bg-slate-950 border-2 border-slate-900 pl-10 pr-3 py-2.5 rounded outline-none focus:border-retro-orange/40 text-slate-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1.5">{t.authPassword}</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border-2 border-slate-900 pl-10 pr-3 py-2.5 rounded outline-none focus:border-retro-orange/40 text-slate-200 text-xs"
              />
            </div>
          </div>

          {/* Email controls */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={() => handleEmailAuth('login')}
              disabled={loading}
              className="py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border-2 border-slate-800 pixel-btn cursor-pointer text-xs"
            >
              {t.authLoginBtn}
            </button>
            <button
              onClick={() => handleEmailAuth('signup')}
              disabled={loading}
              className="py-2.5 rounded bg-retro-pink/10 hover:bg-retro-pink/20 text-retro-pink font-bold border-2 border-retro-pink/25 pixel-btn cursor-pointer text-xs"
            >
              {t.authSignupBtn}
            </button>
          </div>
        </div>

        {/* Footer closing link */}
        <button
          onClick={handleClose}
          className="text-center font-mono text-[10px] text-slate-500 hover:text-slate-400 underline cursor-pointer"
        >
          {t.authClose}
        </button>

      </div>
    </div>
  );
}
