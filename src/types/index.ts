export type Theme = 'light' | 'dark' | 'system';

export type ScopeType = 'global' | 'national' | 'regional' | 'local' | 'topic';

export interface Scope {
  id: string;
  type: ScopeType;
  label: string;
  parentId?: string;
  level: number;
}

export type ReadingMode = 'standard' | '5min' | '10min' | 'deep';

export interface Fact {
  id: string;
  storyId: string;
  content: string;
  date: string;
  level: 'quick' | 'developments' | 'why' | 'context';
  sourceIds?: string[];
  isNew?: boolean;
}

export interface Milestone {
  id: string;
  storyId: string;
  date: string;
  title: string;
  summary: string;
  type: 'event' | 'current' | 'future';
  factIds: string[];
}

export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'news' | 'research' | 'official';
  credibility?: 'high' | 'medium' | 'low';
}

export interface Story {
  id: string;
  headline: string;
  quickTake: string;
  keyDevelopments: string[];
  whyItMatters: string;
  contextDeepDive: string;
  scope: Scope;
  topicTags: string[];
  imageUrl?: string;
  imageAlt?: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  facts: Fact[];
  milestones: Milestone[];
  sources: Source[];
  futurePossibility?: {
    text: string;
    evidence: string;
    plausibility: 'low' | 'medium' | 'high';
  };
  isSaved?: boolean;
  isRead?: boolean;
  origin?: 'seed' | 'live';
}

export interface UserLocation {
  country: string;
  region: string;
  city: string;
}

export interface UserPreferences {
  theme: Theme;
  defaultReadingMode: ReadingMode;
  location: UserLocation;
  followedTopics: Record<string, 'low' | 'medium' | 'high'>;
  followedPlaces: Array<{ id: string; label: string; level: number }>;
  contentMix: 'news' | 'research' | 'both';
  defaultScope: string;
  readingHistory: string[];
  savedStories: string[];
  seenFacts: Record<string, string[]>;
  lastVisit: string;
  sessionScope?: string;
  welcomeCompleted: boolean;
}

export interface ExploreFilters {
  scope: ScopeType;
  region?: string;
  topic?: string;
  dateRange: 'today' | 'week' | 'all';
  contentType: 'news' | 'research' | 'both';
  readingDepth: ReadingMode;
  query?: string;
}

export interface CatchUpPeriod {
  id: string;
  label: string;
  days?: number;
  sinceLastVisit?: boolean;
}

export interface SavedStory {
  storyId: string;
  savedAt: string;
  readingTimeCategory: 'quick' | 'medium' | 'deep';
  notes?: string;
}

export interface ReadingHistoryEntry {
  storyId: string;
  readAt: string;
  factsSeen: string[];
  readingTimeSpent: number;
}