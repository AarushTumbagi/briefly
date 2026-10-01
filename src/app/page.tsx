'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { STORIES, rankStories, filterByReadingMode, dedupeStories, getUnseenFacts } from '@/lib/utils/storage';
import { getScopeLabel } from '@/lib/data/scopes';
import { formatDate, greeting, timeAgo } from '@/lib/utils/format';
import StoryCard from '@/components/story/StoryCard';
import { Badge, SectionTitle } from '@/components/ui/controls';
import type { ReadingMode } from '@/types';

const MODE_LABEL: Record<ReadingMode, string> = { standard: 'Standard', '5min': '5 min', '10min': '10 min', deep: 'Deep' };

export default function HomePage() {
  const { prefs, update } = usePreferences();
  const scope = prefs.sessionScope ?? prefs.defaultScope;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ranked = useMemo(() => dedupeStories(filterByReadingMode(rankStories(STORIES, prefs, scope), prefs.defaultReadingMode)), [prefs, scope]);
  const featured = ranked[0];
  const rest = ranked.slice(1);
  const totalMins = ranked.reduce((a, s) => a + s.readingTime, 0);
  const updates = STORIES.filter((s) => getUnseenFacts(s, prefs.seenFacts[s.id] ?? []).length > 0).length;

  const snapshot = useMemo(() => {
    const groups = [
      { label: 'Global', href: '/explore?scope=global', count: STORIES.filter((s) => s.scope.id === 'global').length },
      { label: 'National', href: '/explore?scope=national', count: STORIES.filter((s) => s.scope.id === 'india').length },
      { label: 'Near You', href: '/explore?scope=local', count: STORIES.filter((s) => ['jaipur', 'rajasthan'].includes(s.scope.id)).length },
      { label: 'AI', href: '/explore?topic=AI', count: STORIES.filter((s) => s.topicTags.includes('AI')).length },
      { label: 'Science', href: '/explore?topic=Science', count: STORIES.filter((s) => s.topicTags.includes('Science')).length },
    ];
    return groups;
  }, []);

  const followTopic = (topic: string) => {
    if (topic === scope) return;
    // Session-only helper: switch session scope when topic story exists
    update({ sessionScope: scope });
  };

  return (
    <div className="section-container py-8 space-y-10">
      {/* Greeting */}
      <section>
        <p className="text-sm text-neutral-500" suppressHydrationWarning>{mounted ? formatDate(new Date().toISOString()) : ' '}</p>
        <h1 className="page-title mt-1" suppressHydrationWarning>{mounted ? `${greeting()}. ` : ''}Here&apos;s your briefing.</h1>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge tone="brand">{getScopeLabel(scope)}</Badge>
          <Badge>{MODE_LABEL[prefs.defaultReadingMode]} read</Badge>
          {(Object.keys(prefs.followedTopics).slice(0, 3)).map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </section>

      {/* One minute + plan */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-semibold">Today in one minute</h2>
          <p className="text-sm mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
            Frontier labs aligned on shared AI safety tests, Rajasthan&apos;s reservoirs recovered enough to ease Jaipur&apos;s water schedule, and India&apos;s digital health network passed 500 million records. Shipping lanes steadied — the rest is detail you can open only if you want it.
          </p>
        </div>
        <div className="card p-5">
          <h2 className="font-semibold">Today&apos;s reading plan</h2>
          <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">{ranked.length} important stories · about {totalMins} minutes</p>
          <div className="flex gap-2 mt-3" role="group" aria-label="Reading mode">
            {(Object.keys(MODE_LABEL) as ReadingMode[]).map((m) => (
              <button key={m} onClick={() => update({ defaultReadingMode: m })} aria-pressed={prefs.defaultReadingMode === m}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${prefs.defaultReadingMode === m ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>
                {MODE_LABEL[m]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section>
        <SectionTitle title="Today's snapshot" subtitle="Jump to any lens. Each opens filtered Explore results." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {snapshot.map((g) => (
            <Link key={g.label} href={g.href} className="card p-4 hover:border-sky-400 transition-colors">
              <p className="font-medium text-sm">{g.label}</p>
              <p className="text-xs text-neutral-500 mt-1">{g.count} stories</p>
            </Link>
          ))}
        </div>
      </section>

      {updates > 0 && (
        <div className="card p-5 flex flex-wrap items-center gap-3 border-sky-200 dark:border-sky-900">
          <p className="text-sm"><strong>{updates} stories</strong> changed since you last read. See only what&apos;s new.</p>
          <Link href="/catch-up" className="btn-primary !py-2 ml-auto">Catch Me Up</Link>
        </div>
      )}

      {/* Featured */}
      {featured && (
        <section>
          <SectionTitle title="Top story" />
          <div className="grid lg:grid-cols-2 gap-0 card overflow-hidden">
            <div className="bg-gradient-to-br from-sky-100 to-emerald-50 dark:from-sky-950 dark:to-emerald-950 p-8 flex flex-col justify-center min-h-[240px]">
              <div className="flex gap-1.5 flex-wrap">{featured.topicTags.map((t) => <Badge key={t} tone="brand">{t}</Badge>)}</div>
              <h2 className="font-serif text-2xl sm:text-3xl leading-tight mt-3">{featured.headline}</h2>
              <p className="text-sm mt-3 text-neutral-600 dark:text-neutral-400">{featured.quickTake}</p>
              <p className="text-xs mt-2 text-neutral-500" suppressHydrationWarning>{timeAgo(featured.updatedAt)} · {featured.readingTime} min read</p>
              <div className="flex gap-2 mt-4">
                <Link href={`/story/${featured.id}`} className="btn-primary">Open Story</Link>
                <Link href={`/story/${featured.id}/evolution`} className="btn-outline">View Evolution</Link>
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-neutral-900 flex flex-col justify-center">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-neutral-500">Why this leads today</h3>
              <p className="text-sm mt-2 leading-relaxed">{featured.whyItMatters}</p>
              <ul className="mt-3 space-y-1.5">
                {featured.keyDevelopments.slice(0, 3).map((d, i) => <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400">• {d}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      <section>
        <SectionTitle title="Your briefing" subtitle={`Scope: ${getScopeLabel(scope)} · no duplicates, newest first`} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
        {rest.length === 0 && <p className="text-sm text-neutral-500">No stories match this reading depth. Try Standard or Deep mode.</p>}
      </section>

      <section className="card p-5 flex flex-wrap items-center gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Reading a different lens right now won&apos;t change your permanent interests.</p>
        <Link href="/explore" className="btn-outline ml-auto">Explore all scopes</Link>
        <button onClick={() => followTopic(scope)} className="btn-ghost !py-2">Follow this topic/place →</button>
      </section>
    </div>
  );
}
