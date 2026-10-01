'use client';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import type { Story } from '@/types';
import { Badge } from '@/components/ui/controls';
import { timeAgo } from '@/lib/utils/format';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { getUnseenFacts } from '@/lib/utils/storage';

function FallbackVisual({ title }: { title: string }) {
  return (
    <div className="w-full h-44 bg-gradient-to-br from-sky-100 via-neutral-100 to-emerald-50 dark:from-sky-950 dark:via-neutral-900 dark:to-emerald-950 flex items-center justify-center p-6" role="img" aria-label={`Illustration for ${title}`}>
      <span className="font-serif text-lg text-neutral-500 dark:text-neutral-400 text-center line-clamp-3">{title}</span>
    </div>
  );
}

export function whyLine(story: Story): string {
  if (story.scope.type === 'local' || story.scope.type === 'regional') return `Because you follow ${story.scope.label}`;
  const t = story.topicTags[0];
  if (t) return `Because you follow ${t}`;
  return 'Top story in this scope';
}

export default function StoryCard({ story, showUpdateBadge = true }: { story: Story; showUpdateBadge?: boolean }) {
  const { prefs, update } = usePreferences();
  const saved = prefs.savedStories.includes(story.id);
  const unseen = getUnseenFacts(story, prefs.seenFacts[story.id] ?? []).length;

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = saved ? prefs.savedStories.filter((id) => id !== story.id) : [...prefs.savedStories, story.id];
    update({ savedStories: next });
  };

  return (
    <article className="story-card flex flex-col">
      {story.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={story.imageUrl} alt={story.imageAlt ?? story.headline} className="story-card-image" loading="lazy" />
      ) : (
        <FallbackVisual title={story.headline} />
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="brand">{story.scope.label}</Badge>
          {story.topicTags.map((t) => <Badge key={t}>{t}</Badge>)}
          {showUpdateBadge && unseen > 0 && <Badge tone="green">New update</Badge>}
        </div>
        <Link href={`/story/${story.id}`} className="group">
          <h3 className="text-lg font-semibold leading-snug text-neutral-900 dark:text-neutral-50 group-hover:underline underline-offset-4">{story.headline}</h3>
        </Link>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{story.quickTake}</p>
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span suppressHydrationWarning>{timeAgo(story.updatedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden />{story.readingTime} min</span>
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">Why you&apos;re seeing this: {whyLine(story)}.</p>
        <div className="flex items-center gap-2 mt-auto pt-2">
          <Link href={`/story/${story.id}`} className="btn-primary flex-1 text-center">Open Story</Link>
          <button onClick={toggleSave} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save story'} className="btn-outline !px-3">
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}
