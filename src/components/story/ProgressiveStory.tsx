'use client';
import { useEffect, useState } from 'react';
import type { Story } from '@/types';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { getStoryUpdateView, markFactsAsSeen } from '@/lib/utils/storage';

export function useUpdateAwareStory(story: Story) {
  const { prefs, setPrefs } = usePreferences();
  const seenIds = prefs.seenFacts[story.id] ?? [];
  const view = getStoryUpdateView(story, seenIds);
  const [open, setOpen] = useState({ key: false, why: false, deep: false });

  // Mark quick-take facts seen on mount (quick take is visible by default)
  useEffect(() => {
    const quickIds = story.facts.filter((f) => f.level === 'quick').map((f) => f.id);
    const unseenQuick = quickIds.filter((id) => !(prefs.seenFacts[story.id] ?? []).includes(id));
    if (unseenQuick.length > 0) {
      const t = setTimeout(() => setPrefs(markFactsAsSeen(prefs, story.id, unseenQuick)), 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.id]);

  const reveal = (section: 'key' | 'why' | 'deep') => {
    setOpen((o) => ({ ...o, [section]: !o[section as keyof typeof o] }));
    const levelMap = { key: 'developments', why: 'why', deep: 'context' } as const;
    const ids = story.facts.filter((f) => f.level === levelMap[section]).map((f) => f.id);
    setPrefs(markFactsAsSeen(prefs, story.id, ids));
  };

  return { view, open, reveal, seenIds };
}

export function ProgressiveStory({ story }: { story: Story }) {
  const { view, open, reveal } = useUpdateAwareStory(story);
  return (
    <div className="space-y-4">
      {view.hasNew ? (
        <section aria-labelledby="new-since" className="card p-5 border-l-4 border-l-emerald-500">
          <h3 id="new-since" className="font-semibold text-neutral-900 dark:text-neutral-50">New since you read</h3>
          <ul className="mt-3 space-y-2">
            {view.unseen.map((f) => (
              <li key={f.id} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">• {f.content}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="card p-5">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{view.statusLine}. Nothing new has been added since your last read.</p>
        </section>
      )}

      <section className="card p-5">
        <h3 className="font-semibold">Quick Take</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{story.quickTake}</p>
      </section>

      <Disclosure title="Show key points" open={open.key} onToggle={() => reveal('key')} label="Key Developments">
        <ul className="space-y-2">
          {story.keyDevelopments.slice(0, 4).map((d, i) => <li key={i} className="text-sm leading-relaxed">• {d}</li>)}
        </ul>
      </Disclosure>

      <Disclosure title="Why it matters" open={open.why} onToggle={() => reveal('why')} label="Why It Matters">
        <p className="text-sm leading-relaxed">{story.whyItMatters}</p>
      </Disclosure>

      <Disclosure title="Context and deep dive" open={open.deep} onToggle={() => reveal('deep')} label="Context and Deep Dive">
        <p className="text-sm leading-relaxed">{story.contextDeepDive}</p>
        <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-3">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Sources &amp; attribution</p>
          <ul className="mt-2 space-y-1">
            {story.sources.map((s) => (
              <li key={s.id} className="text-xs">
                <a className="underline underline-offset-2 text-sky-700 dark:text-sky-300" href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
                <span className="text-neutral-500"> · {s.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </Disclosure>

      {view.seen.length > 0 && (
        <details className="card p-5">
          <summary className="cursor-pointer text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded">Previously covered ({view.seen.length})</summary>
          <ul className="mt-3 space-y-2">
            {view.seen.map((f) => <li key={f.id} className="text-sm text-neutral-500 dark:text-neutral-400">• {f.content}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}

function Disclosure({ title, open, onToggle, label, children }: {
  title: string; open: boolean; onToggle: () => void; label: string; children: React.ReactNode;
}) {
  return (
    <section className="card p-5">
      <button onClick={onToggle} aria-expanded={open} aria-label={label} className="w-full flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
        <h3 className="font-semibold">{title}</h3>
        <span aria-hidden className="text-sky-600 dark:text-sky-400 text-sm font-medium">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && <div className="mt-3 text-neutral-700 dark:text-neutral-300">{children}</div>}
    </section>
  );
}
