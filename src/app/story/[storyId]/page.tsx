'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Bookmark, BookmarkCheck, Share2, Clock, GitBranch } from 'lucide-react';
import { getStory, getRelatedStories } from '@/lib/data/stories';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { ProgressiveStory } from '@/components/story/ProgressiveStory';
import StoryCard, { storyImage } from '@/components/story/StoryCard';
import { Badge } from '@/components/ui/controls';
import { timeAgo, formatShortDate } from '@/lib/utils/format';
import { useState } from 'react';

export default function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const story = getStory(storyId);
  const { prefs, update } = usePreferences();
  const [shared, setShared] = useState(false);
  if (!story) {
    return <div className="section-container py-16 text-center"><h1 className="page-title">Story not found</h1><Link href="/" className="btn-secondary mt-4 inline-flex">Back home</Link></div>;
  }
  const saved = prefs.savedStories.includes(story.id);
  const related = getRelatedStories(story.id, 3);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: story.headline, url });
      else { await navigator.clipboard.writeText(url); setShared(true); setTimeout(() => setShared(false), 2000); }
    } catch { /* dismissed */ }
  };

  return (
    <div className="section-container py-8 max-w-4xl space-y-6">
      <Link href="/" className="text-sm text-sky-700 dark:text-sky-300 underline underline-offset-2">← Back to briefing</Link>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={storyImage(story)} alt={story.imageAlt ?? story.headline} className="w-full h-60 sm:h-80 object-cover rounded-xl" />
      <header>
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="brand">{story.scope.label}</Badge>
          {story.topicTags.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight mt-3 text-balance">{story.headline}</h1>
        <p className="text-sm text-neutral-500 mt-2 flex items-center gap-3">
          <span suppressHydrationWarning>Updated {timeAgo(story.updatedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} aria-hidden />{story.readingTime} min</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={() => update({ savedStories: saved ? prefs.savedStories.filter((id) => id !== story.id) : [...prefs.savedStories, story.id] })}
            aria-pressed={saved} className="btn-outline !py-2">
            {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}{saved ? 'Saved' : 'Save'}
          </button>
          <button onClick={share} className="btn-outline !py-2"><Share2 size={15} />{shared ? 'Link copied!' : 'Share'}</button>
          <Link href={`/story/${story.id}/evolution`} className="btn-primary !py-2"><GitBranch size={15} />View Evolution</Link>
        </div>
      </header>

      <ProgressiveStory story={story} />

      <section className="card p-5" aria-label="Story so far">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Story so far</h2>
          <Link href={`/story/${story.id}/evolution`} className="text-sm text-sky-700 dark:text-sky-300 underline underline-offset-2">Full timeline</Link>
        </div>
        <ol className="mt-3 space-y-2">
          {[...story.milestones].sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 4).map((m) => (
            <li key={m.id} className="text-sm"><span className="text-neutral-500">{formatShortDate(m.date)} · </span><strong className="font-medium">{m.title}</strong> — {m.summary}</li>
          ))}
        </ol>
      </section>

      {story.futurePossibility && (
        <aside aria-label="Possible next development" className="rounded-xl border border-dashed border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">Possible next development — not a prediction</p>
          <p className="text-sm mt-1.5">{story.futurePossibility.text}</p>
        </aside>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="font-semibold text-lg mb-3">Related stories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r) => <StoryCard key={r.id} story={r} showUpdateBadge={false} />)}
          </div>
        </section>
      )}
    </div>
  );
}
