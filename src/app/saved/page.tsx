'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { getStory } from '@/lib/data/stories';
import { getUnseenFacts } from '@/lib/utils/storage';
import { readingBucket, timeAgo } from '@/lib/utils/format';
import { Badge, Empty } from '@/components/ui/controls';

export default function SavedPage() {
  const { prefs, update } = usePreferences();
  const items = useMemo(() => prefs.savedStories.map((id) => getStory(id)).filter(Boolean), [prefs.savedStories]);
  const groups = useMemo(() => ({
    quick: items.filter((s) => readingBucket(s!.readingTime) === 'quick'),
    medium: items.filter((s) => readingBucket(s!.readingTime) === 'medium'),
    deep: items.filter((s) => readingBucket(s!.readingTime) === 'deep'),
  }), [items]);

  const remove = (id: string) => update({ savedStories: prefs.savedStories.filter((x) => x !== id) });
  const markRead = (id: string) => {
    const story = getStory(id);
    if (!story) return;
    update({
      seenFacts: { ...prefs.seenFacts, [id]: story.facts.map((f) => f.id) },
      readingHistory: [...prefs.readingHistory, id],
    });
  };

  const Section = ({ title, desc, list }: { title: string; desc: string; list: typeof items }) => (
    <section>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-xs text-neutral-500 mb-3">{desc}</p>
      {list.length === 0 ? <p className="text-sm text-neutral-400">Nothing here yet.</p> : (
        <div className="space-y-3">
          {list.map((s) => {
            const unseen = getUnseenFacts(s!, prefs.seenFacts[s!.id] ?? []).length;
            return (
              <article key={s!.id} className="card p-4 flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex gap-1.5 flex-wrap">{unseen > 0 && <Badge tone="green">New update</Badge>}<Badge>{s!.readingTime} min</Badge></div>
                  <h3 className="font-medium mt-1.5">{s!.headline}</h3>
                  <p className="text-xs text-neutral-500 mt-1" suppressHydrationWarning>{s!.quickTake.slice(0, 110)}… · saved {timeAgo(s!.updatedAt)}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/story/${s!.id}`} className="btn-primary !py-1.5 !px-3 !text-xs">Open</Link>
                  <button onClick={() => markRead(s!.id)} className="btn-outline !py-1.5 !px-3 !text-xs">Mark read</button>
                  <button onClick={() => remove(s!.id)} aria-label={`Remove ${s!.headline}`} className="btn-ghost !py-1.5 !px-3 !text-xs">Remove</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );

  return (
    <div className="section-container py-8 max-w-4xl space-y-8">
      <div><h1 className="page-title">Saved</h1><p className="page-subtitle">Your reading queue, grouped by time cost. No duplicates.</p></div>
      {items.length === 0 ? <Empty title="Nothing saved yet" body="Tap the bookmark on any story to queue it here." /> : (
        <>
          <Section title="Quick reads" desc="5 minutes or less" list={groups.quick} />
          <Section title="Worth 10–15 minutes" desc="Standard explainers and developing stories" list={groups.medium} />
          <Section title="Deep dives" desc="More than 15 minutes or research" list={groups.deep} />
        </>
      )}
    </div>
  );
}
