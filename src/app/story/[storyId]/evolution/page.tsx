'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getStory } from '@/lib/data/stories';
import { getLiveStory, useLiveNews } from '@/lib/hooks/useLiveNews';
import EvolutionTimeline from '@/components/story/EvolutionTimeline';

export default function EvolutionPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { loading } = useLiveNews();
  const story = getLiveStory(storyId) ?? getStory(storyId);
  if (!story && loading) return <div className="section-container py-16 text-center"><p className="text-neutral-500">Loading timeline…</p></div>;
  if (!story) return <div className="section-container py-16 text-center"><h1 className="page-title">Story not found</h1></div>;
  return (
    <div className="section-container py-8 max-w-3xl space-y-6">
      <Link href={`/story/${story.id}`} className="text-sm text-sky-700 dark:text-sky-300 underline underline-offset-2">← Back to story</Link>
      <div>
        <h1 className="page-title !text-2xl sm:!text-3xl">How this story developed</h1>
        <p className="page-subtitle !text-base">{story.headline}</p>
      </div>
      <p className="text-xs text-neutral-500">Solid line = verified past events · <strong>Now</strong> = latest confirmed state · Dashed line = one possible next development, never a prediction.</p>
      <EvolutionTimeline story={story} />
    </div>
  );
}
