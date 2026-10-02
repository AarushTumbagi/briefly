import type { Story, Fact, UserPreferences, ReadingMode } from '@/types';
import { STORIES, SEED_SEEN_FACTS, SEED_SAVED } from '@/lib/data/stories';

const KEY = 'briefly:profile:v1';
export const DEMO_REFRESH_DATE = '30 September 2026';

export const DEFAULT_PREFS: UserPreferences = {
  theme: 'system',
  defaultReadingMode: 'standard',
  location: { country: 'India', region: 'Rajasthan', city: 'Jaipur' },
  followedTopics: { AI: 'high', Science: 'medium' },
  followedPlaces: [{ id: 'jaipur', label: 'Jaipur / Local', level: 3 }],
  contentMix: 'both',
  defaultScope: 'global',
  readingHistory: [],
  savedStories: SEED_SAVED.map((s) => s.storyId),
  seenFacts: { ...SEED_SEEN_FACTS },
  lastVisit: new Date(Date.now() - 3 * 86400000).toISOString(),
  sessionScope: undefined,
  welcomeCompleted: false,
};

export function loadPrefs(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return { ...DEFAULT_PREFS, ...parsed, location: { ...DEFAULT_PREFS.location, ...(parsed.location ?? {}) } };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePrefs(p: UserPreferences) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch { /* ignore */ }
}

export function clearKeys(keys: string[]) {
  keys.forEach((k) => {
    try { window.localStorage.removeItem(k); } catch { /* ignore */ }
  });
}

// ---- No-repeat engine ----

export function getUnseenFacts(story: Story, seenIds: string[] = []): Fact[] {
  const seen = new Set(seenIds);
  return story.facts.filter((f) => !seen.has(f.id));
}

export function getSeenFacts(story: Story, seenIds: string[] = []): Fact[] {
  const seen = new Set(seenIds);
  return story.facts.filter((f) => seen.has(f.id));
}

export interface StoryUpdateView {
  unseen: Fact[];
  seen: Fact[];
  hasNew: boolean;
  statusLine: string;
}

export function getStoryUpdateView(story: Story, seenIds: string[] = []): StoryUpdateView {
  const unseen = getUnseenFacts(story, seenIds);
  const seen = getSeenFacts(story, seenIds);
  const hasNew = unseen.length > 0;
  const statusLine = hasNew
    ? `${unseen.length} new fact${unseen.length > 1 ? 's' : ''} since you read · updated ${new Date(story.updatedAt).toLocaleDateString()}`
    : `You're caught up · last update ${new Date(story.updatedAt).toLocaleDateString()}`;
  return { unseen, seen, hasNew, statusLine };
}

export function markFactAsSeen(prefs: UserPreferences, storyId: string, factId: string): UserPreferences {
  const seen = prefs.seenFacts[storyId] ?? [];
  if (seen.includes(factId)) return prefs;
  return { ...prefs, seenFacts: { ...prefs.seenFacts, [storyId]: [...seen, factId] } };
}

export function markFactsAsSeen(prefs: UserPreferences, storyId: string, factIds: string[]): UserPreferences {
  const seen = new Set(prefs.seenFacts[storyId] ?? []);
  factIds.forEach((id) => seen.add(id));
  return { ...prefs, seenFacts: { ...prefs.seenFacts, [storyId]: Array.from(seen) } };
}

// ---- Ranking ----

export function rankStories(stories: Story[], prefs: UserPreferences, scopeId?: string): Story[] {
  const activeScope = scopeId ?? prefs.sessionScope ?? prefs.defaultScope;
  return [...stories]
    .map((s) => {
      let score = 0;
      // Freshness: newer = higher
      const ageHrs = (Date.now() - new Date(s.updatedAt).getTime()) / 3600000;
      score += Math.max(0, 48 - ageHrs);
      // Scope match
      if (activeScope === 'global' || !activeScope) score += s.scope.id === 'global' ? 5 : 2;
      else if (s.scope.id === activeScope) score += 20;
      // Followed topics
      s.topicTags.forEach((t) => {
        const p = prefs.followedTopics[t];
        if (p === 'high') score += 10;
        else if (p === 'medium') score += 5;
        else if (p === 'low') score += 2;
      });
      // Followed places
      if (prefs.followedPlaces.some((pl) => pl.id === s.scope.id)) score += 8;
      // Unseen boost
      const unseen = getUnseenFacts(s, prefs.seenFacts[s.id] ?? []).length;
      score += Math.min(unseen * 2, 10);
      return { s, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}

export function filterByReadingMode(stories: Story[], mode: ReadingMode): Story[] {
  if (mode === 'standard') return stories;
  if (mode === '5min') return stories.filter((s) => s.readingTime <= 5);
  if (mode === '10min') return stories.filter((s) => s.readingTime <= 12);
  return stories; // deep: everything
}

export function dedupeStories(stories: Story[]): Story[] {
  const seen = new Set<string>();
  return stories.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

export { STORIES };
