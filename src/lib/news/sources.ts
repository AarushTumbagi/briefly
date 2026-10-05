// Curated free RSS feeds. No API keys, no scraping — publishers' own syndication feeds,
// fetched server-side by the /api/news route and cached for ~90 seconds.
export type FeedScope = 'global' | 'india' | 'rajasthan' | 'jaipur' | 'ai';

export interface NewsFeed {
  id: string;
  outlet: string;
  url: string;
  scope: FeedScope;
  defaultTopics: string[];
  research?: boolean;
}

export const FEEDS: NewsFeed[] = [
  // World
  { id: 'bbc-world', outlet: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', scope: 'global', defaultTopics: [] },
  { id: 'aljazeera', outlet: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', scope: 'global', defaultTopics: [] },
  { id: 'hindu-intl', outlet: 'The Hindu', url: 'https://www.thehindu.com/news/international/feeder/default.rss', scope: 'global', defaultTopics: [] },
  // India / national
  { id: 'hindu-national', outlet: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss', scope: 'india', defaultTopics: [] },
  { id: 'ie-india', outlet: 'Indian Express', url: 'https://indianexpress.com/section/india/feed/', scope: 'india', defaultTopics: [] },
  { id: 'ie-education', outlet: 'Indian Express', url: 'https://indianexpress.com/section/education/feed/', scope: 'india', defaultTopics: ['Education'] },
  // Business
  { id: 'bbc-business', outlet: 'BBC', url: 'https://feeds.bbci.co.uk/news/business/rss.xml', scope: 'global', defaultTopics: ['Business'] },
  { id: 'hindu-business', outlet: 'The Hindu', url: 'https://www.thehindu.com/business/feeder/default.rss', scope: 'india', defaultTopics: ['Business'] },
  // Technology + AI
  { id: 'bbc-tech', outlet: 'BBC', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', scope: 'global', defaultTopics: ['Technology'] },
  { id: 'ie-tech', outlet: 'Indian Express', url: 'https://indianexpress.com/section/technology/feed/', scope: 'india', defaultTopics: ['Technology'] },
  { id: 'arxiv-ai', outlet: 'arXiv', url: 'https://export.arxiv.org/rss/cs.AI', scope: 'ai', defaultTopics: ['AI', 'Technology'], research: true },
  // Science / environment / health
  { id: 'bbc-science', outlet: 'BBC', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', scope: 'global', defaultTopics: ['Science', 'Environment'] },
  { id: 'hindu-science', outlet: 'The Hindu', url: 'https://www.thehindu.com/sci-tech/feeder/default.rss', scope: 'india', defaultTopics: ['Science', 'Technology'] },
  { id: 'bbc-health', outlet: 'BBC', url: 'https://feeds.bbci.co.uk/news/health/rss.xml', scope: 'global', defaultTopics: ['Health'] },
  // Sports
  { id: 'ie-sports', outlet: 'Indian Express', url: 'https://indianexpress.com/section/sports/feed/', scope: 'india', defaultTopics: ['Sports'] },
  { id: 'cricinfo', outlet: 'ESPNcricinfo', url: 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml', scope: 'global', defaultTopics: ['Sports'] },
  // Culture / entertainment
  { id: 'ie-ent', outlet: 'Indian Express', url: 'https://indianexpress.com/section/entertainment/feed/', scope: 'india', defaultTopics: ['Culture', 'Entertainment'] },
];

export const FETCH_TIMEOUT_MS = 8000;
export const MAX_ITEMS_PER_FEED = 25;
