import { NextResponse } from 'next/server';
import type { Story } from '@/types';
import { buildLiveStories } from '@/lib/news/live';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TTL_MS = 90_000; // refresh upstream at most every 90 seconds
let cache: { at: number; stories: Story[] } | null = null;
let inFlight: Promise<Story[]> | null = null;

async function getStories(force: boolean): Promise<{ stories: Story[]; fresh: boolean; fetchedAt: number }> {
  if (!force && cache && Date.now() - cache.at < TTL_MS) {
    return { stories: cache.stories, fresh: false, fetchedAt: cache.at };
  }
  try {
    inFlight ??= buildLiveStories();
    const stories = await inFlight;
    cache = { at: Date.now(), stories };
    return { stories, fresh: true, fetchedAt: cache.at };
  } catch {
    if (cache) return { stories: cache.stories, fresh: false, fetchedAt: cache.at };
    return { stories: [], fresh: false, fetchedAt: Date.now() };
  } finally {
    inFlight = null;
  }
}

export async function GET(req: Request) {
  const force = new URL(req.url).searchParams.get('refresh') === '1';
  const { stories, fresh, fetchedAt } = await getStories(force);
  return NextResponse.json(
    { stories, count: stories.length, fresh, fetchedAt },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
  );
}
