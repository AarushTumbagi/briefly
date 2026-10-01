'use client';
import { useState } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { Confirm } from '@/components/ui/Modal';
import { DEMO_REFRESH_DATE, DEFAULT_PREFS } from '@/lib/utils/storage';
import type { ReadingMode, Theme } from '@/types';

export default function SettingsPage() {
  const { prefs, update, reset } = usePreferences();
  const [confirm, setConfirm] = useState<null | 'history' | 'saved' | 'reset'>(null);

  const doConfirm = () => {
    if (confirm === 'history') update({ readingHistory: [], seenFacts: {} });
    if (confirm === 'saved') update({ savedStories: [] });
    if (confirm === 'reset') reset();
    setConfirm(null);
  };

  return (
    <div className="section-container py-8 max-w-3xl space-y-6">
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Everything stays on this device. No account, no tracking.</p></div>

      <section className="card p-5">
        <h2 className="font-semibold">Appearance</h2>
        <div className="flex gap-2 mt-3" role="group" aria-label="Theme">
          {(['system', 'light', 'dark'] as Theme[]).map((t) => (
            <button key={t} onClick={() => update({ theme: t })} aria-pressed={prefs.theme === t}
              className={`px-3 py-1.5 rounded-lg text-sm border capitalize ${prefs.theme === t ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>{t}</button>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">Reading</h2>
        <label className="label mt-3" htmlFor="rmode">Default reading mode</label>
        <select id="rmode" value={prefs.defaultReadingMode} onChange={(e) => update({ defaultReadingMode: e.target.value as ReadingMode })} className="input max-w-xs">
          <option value="standard">Standard</option><option value="5min">5 min</option><option value="10min">10 min</option><option value="deep">Deep</option>
        </select>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="font-semibold">Data</h2>
        <p className="text-xs text-neutral-500">Demo-data refresh date: {DEMO_REFRESH_DATE}</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setConfirm('history')} className="btn-outline !py-2">Clear reading history</button>
          <button onClick={() => setConfirm('saved')} className="btn-outline !py-2">Clear saved stories</button>
          <button onClick={() => setConfirm('reset')} className="btn !py-2 bg-red-600 text-white hover:bg-red-700">Reset full demo profile</button>
        </div>
      </section>

      {confirm && (
        <Confirm
          title={confirm === 'history' ? 'Clear reading history?' : confirm === 'saved' ? 'Clear saved stories?' : 'Reset demo profile?'}
          body={confirm === 'reset' ? 'This restores seed follows, saved stories and reading memory to defaults.' : 'This cannot be undone on this device.'}
          confirmLabel={confirm === 'reset' ? 'Reset everything' : 'Clear'}
          onConfirm={doConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      <p className="text-xs text-neutral-400">Defaults restored: {JSON.stringify(Object.keys(DEFAULT_PREFS).length)} preference fields.</p>
    </div>
  );
}
