'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, RefreshCw, Compass, Bookmark, Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useState } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { SCOPES, getScopeLabel } from '@/lib/data/scopes';
import type { ReadingMode } from '@/types';

const NAV = [
  { href: '/', label: 'Briefing', icon: Home },
  { href: '/catch-up', label: 'Catch Up', icon: RefreshCw },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/saved', label: 'Saved', icon: Bookmark },
];

const MODES: { id: ReadingMode; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: '5min', label: '5 min' },
  { id: '10min', label: '10 min' },
  { id: 'deep', label: 'Deep' },
];

export default function Header() {
  const path = usePathname();
  const { prefs, update } = usePreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeScope = prefs.sessionScope ?? prefs.defaultScope;

  const cycleTheme = () => {
    const next = prefs.theme === 'light' ? 'dark' : prefs.theme === 'dark' ? 'system' : 'light';
    update({ theme: next });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
        <div className="section-container flex items-center gap-3 h-16">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight" aria-label="Briefly home">
            Briefly<span className="text-sky-600">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Primary">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${path === href ? 'bg-neutral-100 dark:bg-neutral-800' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <label className="sr-only" htmlFor="scope">Current scope</label>
            <select id="scope" value={activeScope} onChange={(e) => update({ sessionScope: e.target.value })}
              className="input !w-auto text-sm !py-1.5" aria-label={`Current scope: ${getScopeLabel(activeScope)}`}>
              {SCOPES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="mode">Reading time</label>
            <select id="mode" value={prefs.defaultReadingMode} onChange={(e) => update({ defaultReadingMode: e.target.value as ReadingMode })}
              className="input !w-auto text-sm !py-1.5 hidden sm:block" aria-label="Reading time">
              {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
            <button onClick={cycleTheme} aria-label={`Theme: ${prefs.theme}. Activate to change.`} className="btn-ghost !px-2.5">
              {prefs.theme === 'dark' ? <Moon size={18} /> : prefs.theme === 'light' ? <Sun size={18} /> : <Monitor size={18} />}
            </button>
            <button onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label="More options" className="btn-ghost !px-2.5">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 section-container py-2 flex gap-1">
            <Link href="/interests" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Interests</Link>
            <Link href="/settings" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">Settings</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">About</Link>
          </div>
        )}
      </header>
      {/* Mobile bottom nav */}
      <nav aria-label="Mobile" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-5">
          {[...NAV, { href: '/interests', label: 'More', icon: Menu }].map(({ href, label, icon: Icon }) => (
            <Link key={href + label} href={href} aria-current={path === href ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${path === href ? 'text-sky-600' : 'text-neutral-500'}`}>
              <Icon size={19} aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
