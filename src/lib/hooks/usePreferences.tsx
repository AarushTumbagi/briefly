'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserPreferences } from '@/types';
import { loadPrefs, savePrefs, DEFAULT_PREFS } from '@/lib/utils/storage';

interface PrefsCtx {
  prefs: UserPreferences;
  setPrefs: (p: UserPreferences) => void;
  update: (patch: Partial<UserPreferences>) => void;
  reset: () => void;
}

const Ctx = createContext<PrefsCtx | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<UserPreferences>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPrefsState(loadPrefs());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) savePrefs(prefs);
  }, [prefs, ready]);

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: string) => {
      if (t === 'dark') root.classList.add('dark');
      else if (t === 'light') root.classList.remove('dark');
      else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    apply(prefs.theme);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const fn = () => { if (prefs.theme === 'system') apply('system'); };
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [prefs.theme, ready]);

  const setPrefs = (p: UserPreferences) => setPrefsState(p);
  const update = (patch: Partial<UserPreferences>) => setPrefsState((prev) => ({ ...prev, ...patch }));
  const reset = () => setPrefsState({ ...DEFAULT_PREFS, welcomeCompleted: true });

  return <Ctx.Provider value={{ prefs, setPrefs, update, reset }}>{children}</Ctx.Provider>;
}

export function usePreferences(): PrefsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePreferences must be used inside PreferencesProvider');
  return ctx;
}
