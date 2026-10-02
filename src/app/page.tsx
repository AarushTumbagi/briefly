'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { STORIES, rankStories, filterByReadingMode, dedupeStories, getUnseenFacts } from '@/lib/utils/storage';
import { getScopeLabel, buildScopes } from '@/lib/data/scopes';
import { formatDate, greeting, timeAgo } from '@/lib/utils/format';
import StoryCard, { storyImage } from '@/components/story/StoryCard';
import { Badge, SectionTitle } from '@/components/ui/controls';
import type { ReadingMode } from '@/types';

const MODE_LABEL: Record<ReadingMode, string> = { standard: 'Standard', '5min': '5 min', '10min': '10 min', deep: 'Deep' };
const VISIBLE_COUNT = 6;

export default function HomePage() {
  const { prefs, update } = usePreferences();
  const scope = prefs.sessionScope ?? prefs.defaultScope;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ranked = useMemo(() => dedupeStories(filterByReadingMode(rankStories(STORIES, prefs, scope), prefs.defaultReadingMode)), [prefs, scope]);
  const featured = ranked[0];
  const rest = ranked.slice(1, 1 + VISIBLE_COUNT);
  const totalMins = ranked.reduce((a, s) => a + s.readingTime, 0);
  const updates = STORIES.filter((s) => getUnseenFacts(s, prefs.seenFacts[s.id] ?? []).length > 0).length;

  const snapshot = useMemo(() => {
    const loc = prefs.location;
    return [
      { label: 'Global', href: '/explore?scope=global', count: STORIES.filter((s) => s.scope.id === 'global').length },
      { label: loc.country, href: '/explore?scope=national', count: STORIES.filter((s) => s.scope.id === 'india').length },
      { label: `Near ${loc.city}`, href: '/explore?scope=local', count: STORIES.filter((s) => ['jaipur', 'rajasthan'].includes(s.scope.id)).length },
      { label: 'AI', href: '/explore?topic=AI', count: STORIES.filter((s) => s.topicTags.includes('AI')).length },
      { label: 'Science', href: '/explore?topic=Science', count: STORIES.filter((s) => s.topicTags.includes('Science')).length },
    ];
  }, [prefs.location]);

  const scopeLabel = getScopeLabel(scope, prefs.location);
  const following = prefs.followedPlaces.some((p) => p.id === scope);
  const toggleFollow = () => {
    const meta = buildScopes(prefs.location).find((s) => s.id === scope);
    if (!meta || meta.type === 'global') return;
    update({ followedPlaces: following ? prefs.followedPlaces.filter((p) => p.id !== scope) : [...prefs.followedPlaces, { id: scope, label: meta.label, level: meta.level }] });
  };

  return (
    <div className="section-container py-8 space-y-8 max-w-5xl">
      {/* Greeting */}
      <section>
        <p className="text-sm text-neutral-500" suppressHydrationWarning>{mounted ? formatDate(new Date().toISOString()) : ' '}</p>
        <h1 className="page-title mt-1" suppressHydrationWarning>{mounted ? `${greeting()}. ` : ''}Here&apos;s your briefing.</h1>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge tone="brand">{scopeLabel}</Badge>
          <Badge>{MODE_LABEL[prefs.defaultReadingMode]} read</Badge>
          <button onClick={toggleFollow} className="text-xs font-medium text-sky-700 dark:text-sky-300 underline underline-offset-2">
            {following ? 'Following this lens ✓' : 'Follow this topic/place'}
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-2">This lens is temporary — it won&apos;t change your permanent interests.</p>
      </section>

      {/* One minute + plan */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-semibold">Today in one minute</h2>
          <p className="text-sm mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
            Frontier labs aligned on shared AI safety tests, {prefs.location.region}&apos;s reservoirs recovered enough to ease {prefs.location.city}&apos;s water schedule, and {prefs.location.country}&apos;s digital health network passed 500 million records. Shipping lanes steadied — open a story only if you want more.
          </p>
        </div>
        <div className="card p-5">
          <h2 className="font-semibold">Today&apos;s reading plan</h2>
          <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">{ranked.length} stories · about {totalMins} minutes</p>
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

      {updates > 0 && (
        <div className="card p-4 flex flex-wrap items-center gap-3 border-sky-200 dark:border-sky-900">
          <p className="text-sm"><strong>{updates} stories</strong> changed since you last read.</p>
          <Link href="/catch-up" className="btn-primary !py-2 ml-auto">Catch Me Up</Link>
        </div>
      )}

      {/* Featured top story with picture */}
      {featured && (
        <section>
          <SectionTitle title="Top story" />
          <article className="story-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={storyImage(featured)} alt={featured.imageAlt ?? featured.headline} className="w-full h-56 sm:h-72 object-cover" loading="eager" />
            <div className="p-5 sm:p-6">
              <div className="flex gap-1.5 flex-wrap">
                <Badge tone="brand">{scopeLabel}</Badge>
                {featured.topicTags.map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl leading-tight mt-3 text-balance">{featured.headline}</h2>
              <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">{featured.quickTake}</p>
              <p className="text-xs mt-2 text-neutral-500" suppressHydrationWarning>{timeAgo(featured.updatedAt)} · {featured.readingTime} min read</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link href={`/story/${featured.id}`} className="btn-primary">Open Story</Link>
                <Link href={`/story/${featured.id}/evolution`} className="btn-outline">How it developed</Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Snapshot as compact chips */}
      <section>
        <h2 className="font-semibold mb-1">Today&apos;s snapshot</h2>
        <p className="text-xs text-neutral-500 mb-3">Tap a lens to filter Explore.</p>
        <div className="flex flex-wrap gap-2">
          {snapshot.map((g) => (
            <Link key={g.label} href={g.href} className="px-3.5 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm hover:border-sky-400 transition-colors">
              <span className="font-medium">{g.label}</span> <span className="text-neutral-400">· {g.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Briefing grid, capped */}
      <section>
        <SectionTitle title="More in this lens" subtitle={`${scopeLabel} · newest first`} />
        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
        {rest.length === 0 && <p className="text-sm text-neutral-500">No stories match this reading depth. Try Standard or Deep mode.</p>}
        {ranked.length > VISIBLE_COUNT + 1 && (
          <Link href="/explore" className="btn-outline mt-4 w-full">See all {ranked.length} stories in Explore →</Link>
        )}
      </section>
    </div>
  );
}
