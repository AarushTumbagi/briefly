'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { useLiveNews } from '@/lib/hooks/useLiveNews';
import { getStoryUpdateView } from '@/lib/utils/storage';
import { timeAgo } from '@/lib/utils/format';

const RANGES = [
  { id: 'last', label: 'Since last visit' },
  { id: '24h', label: '24 hours', hours: 24 },
  { id: '3d', label: '3 days', hours: 72 },
  { id: '7d', label: '7 days', hours: 168 },
];

export default function CatchUpPage() {
  const { prefs } = usePreferences();
  const [range, setRange] = useState('last');

  const { stories: allStories } = useLiveNews();
  const groups = useMemo(() => {
    const cfg = RANGES.find((r) => r.id === range);
    const since = range === 'last'
      ? new Date(prefs.lastVisit).getTime()
      : Date.now() - (cfg?.hours ?? 24) * 3600000;
    return allStories.map((s) => ({ s, view: getStoryUpdateView(s, prefs.seenFacts[s.id] ?? []) }))
      .filter(({ s, view }) => view.hasNew && new Date(s.updatedAt).getTime() >= since - 86400000)
      .sort((a, b) => b.view.unseen.length - a.view.unseen.length || +new Date(b.s.updatedAt) - +new Date(a.s.updatedAt));
  }, [allStories, prefs, range]);

  return (
    <div className="section-container py-8 max-w-4xl space-y-6">
      <div>
        <h1 className="page-title">Since you last checked in</h1>
        <p className="page-subtitle">Here are the developments that changed the picture.</p>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Time range">
        {RANGES.map((r) => (
          <button key={r.id} onClick={() => setRange(r.id)} aria-pressed={range === r.id}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${range === r.id ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>
            {r.label}
          </button>
        ))}
      </div>
      {groups.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-medium">You&apos;re all caught up.</p>
          <p className="text-sm text-neutral-500 mt-2">No story has materially changed in this window. Enjoy the quiet.</p>
          <Link href="/" className="btn-secondary mt-4 inline-flex">Back to briefing</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map(({ s, view }) => (
            <article key={s.id} className="card p-5">
              <p className="text-xs text-neutral-500" suppressHydrationWarning>{s.scope.label} · {timeAgo(s.updatedAt)}</p>
              <h2 className="font-semibold text-lg mt-1">{s.headline}</h2>
              <div className="mt-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">New since you read</p>
                <ul className="mt-2 space-y-1.5">
                  {view.unseen.map((f) => <li key={f.id} className="text-sm">• {f.content}</li>)}
                </ul>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3"><strong className="font-medium">Current status:</strong> {s.quickTake}</p>
              {view.seen.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-neutral-500">Previously covered ({view.seen.length})</summary>
                  <ul className="mt-2 space-y-1">{view.seen.map((f) => <li key={f.id} className="text-sm text-neutral-500">• {f.content}</li>)}</ul>
                </details>
              )}
              <div className="flex gap-2 mt-4">
                <Link href={`/story/${s.id}`} className="btn-primary !py-2">Open update</Link>
                <Link href={`/story/${s.id}/evolution`} className="btn-outline !py-2">View timeline</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
