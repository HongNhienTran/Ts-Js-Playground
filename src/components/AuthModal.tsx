'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Sparkles, AlertTriangle, CheckCircle, Mail, Key } from 'lucide-react';
import { playClickSound, playLevelUpSound, playFailureSound } from '@/lib/audio';
import { Language, i18n } from '@/lib/i18n';
import { Button } from './ui/Button';

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
      setErrorMsg(t.authErrorFields);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-md pixel-box p-6 relative flex flex-col gap-6 text-foreground animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border-[3px] border-border text-foreground hover:bg-background flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_var(--shadow-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Modal Info */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-pop-orange/20 flex items-center justify-center text-retro-orange border-[3px] border-border mx-auto mb-3 shadow-[2px_2px_0px_var(--shadow-color)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-base font-game font-extrabold tracking-tight text-retro-orange uppercase leading-relaxed">
            {t.authTitle}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed font-semibold">
            {t.authDesc}
          </p>
        </div>

        {/* Action Alerts */}
        {errorMsg && (
          <div className="flex items-start gap-2 bg-rose-500/10 border-2 border-rose-500/20 text-rose-500 p-2.5 rounded-xl text-xs font-sans font-bold leading-relaxed shadow-[1px_1px_0px_var(--shadow-color)]">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2 bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl text-xs font-sans font-bold leading-relaxed shadow-[1px_1px_0px_var(--shadow-color)]">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* OAuth Google Button */}
        <div>
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="primary"
            className="w-full py-3 flex items-center justify-center gap-2"
          >
            <span>{t.authGoogle}</span>
          </Button>
        </div>

        <div className="flex items-center gap-3 font-game text-[9px] font-bold text-slate-400 uppercase">
          <div className="flex-1 h-0.5 bg-border/10" />
          <span>{t.or}</span>
          <div className="flex-1 h-0.5 bg-border/10" />
        </div>

        {/* Email form inputs */}
        <div className="space-y-4 text-xs font-semibold font-sans">
          <div>
            <label className="text-[10px] font-game font-extrabold text-slate-400 uppercase block mb-1.5">{t.authEmail}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.authPlaceholderEmail}
                className="w-full bg-card border-[3px] border-border pl-10 pr-3 py-2.5 rounded-xl outline-none focus:border-retro-orange text-foreground text-xs shadow-[2px_2px_0px_var(--shadow-color)]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-game font-extrabold text-slate-400 uppercase block mb-1.5">{t.authPassword}</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-card border-[3px] border-border pl-10 pr-3 py-2.5 rounded-xl outline-none focus:border-retro-orange text-foreground text-xs shadow-[2px_2px_0px_var(--shadow-color)]"
              />
            </div>
          </div>

          {/* Email controls */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              onClick={() => handleEmailAuth('login')}
              disabled={loading}
              variant="outline"
              size="md"
              className="py-2.5"
            >
              {t.authLoginBtn}
            </Button>
            <Button
              onClick={() => handleEmailAuth('signup')}
              disabled={loading}
              variant="accent"
              size="md"
              className="py-2.5"
            >
              {t.authSignupBtn}
            </Button>
          </div>
        </div>

        {/* Footer closing link */}
        <button
          onClick={handleClose}
          className="text-center font-game text-[9px] font-extrabold text-slate-500 hover:text-slate-400 underline cursor-pointer uppercase tracking-wider mt-2"
        >
          {t.authClose}
        </button>

      </div>
    </div>
  );
}
