'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Story } from '@/types';
import { STORIES } from '@/lib/data/stories';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { markFactsAsSeen, rankStories, dedupeStories } from '@/lib/utils/storage';

// Module-level cache so story-detail/saved pages can resolve live stories
// synchronously after any page has fetched them.
let liveCache: Story[] = [];
let liveFetchedAt = 0;

export function getLiveStory(id: string): Story | undefined {
  return liveCache.find((s) => s.id === id);
}

export function useLiveNews(scopeId?: string) {
  const { prefs, setPrefs } = usePreferences();
  const [live, setLive] = useState<Story[]>(liveCache);
  const [loading, setLoading] = useState(liveCache.length === 0);
  const [fetchedAt, setFetchedAt] = useState(liveFetchedAt);
  const settledOld = useRef(false);

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (!res.ok) throw new Error('bad');
      const data = await res.json();
      const stories = (data.stories ?? []) as Story[];
      liveCache = stories;
      liveFetchedAt = data.fetchedAt ?? Date.now();
      setLive(stories);
      setFetchedAt(liveFetchedAt);
    } catch {
      // Offline or upstream down: keep seed-only feed.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (liveCache.length === 0) fetchLive();
    else setLoading(false);
    const t = setInterval(fetchLive, 120_000); // re-check every 2 minutes
    return () => clearInterval(t);
  }, [fetchLive]);

  // Treat live facts older than the last visit as already seen, so "New"
  // badges mean "new since you were here", not "everything is new".
  useEffect(() => {
    if (live.length === 0 || settledOld.current) return;
    settledOld.current = true;
    const last = new Date(prefs.lastVisit).getTime();
    let next = prefs;
    for (const s of live) {
      const old = s.facts.filter((f) => Date.parse(f.date) < last).map((f) => f.id);
      if (old.length) next = markFactsAsSeen(next, s.id, old);
    }
    if (next !== prefs) setPrefs(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  const scope = scopeId ?? prefs.sessionScope ?? prefs.defaultScope;
  const stories = dedupeStories(rankStories([...live, ...STORIES.map((s) => ({ ...s, origin: 'seed' as const }))], prefs, scope));

  return { stories, liveCount: live.length, loading, fetchedAt, refresh: fetchLive };
}
