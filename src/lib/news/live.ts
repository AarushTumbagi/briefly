import { XMLParser } from 'fast-xml-parser';
import type { Story, Fact, Milestone, Source, Scope } from '@/types';
import { FEEDS, FETCH_TIMEOUT_MS, MAX_ITEMS_PER_FEED, type NewsFeed } from './sources';

interface RawItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  image: string;
  outlet: string;
  feed: NewsFeed;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  trimValues: true,
  processEntities: true,
});

// ---------- text helpers ----------

function stripHtml(s: string): string {
  return (s ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanTitle(s: string): string {
  let t = stripHtml(s);
  t = t.replace(/\s*[|\-–—]\s*(BBC News|BBC|Reuters|Al Jazeera|The Hindu|Indian Express|ESPNcricinfo|NDTV)$/i, '');
  t = t.replace(/^(Watch|Live|Breaking|Just in):\s*/i, '');
  return t.trim();
}

function cleanDesc(s: string, max = 240): string {
  let t = stripHtml(s);
  t = t.replace(/\s*(Read more|Continue reading|Click here.*)$/i, '');
  if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, '') + '…';
  return t.trim();
}

function uniq<T>(arr: T[]): T[] {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}

function hashId(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

function pickImage(node: Record<string, unknown>): string {
  const enc = node['enclosure'] as Record<string, string> | undefined;
  if (enc?.['@url'] && /\.(jpe?g|png|webp)/i.test(enc['@url'])) return enc['@url'];
  for (const key of ['media:content', 'media:thumbnail']) {
    const m = node[key] as Record<string, string> | Record<string, string>[] | undefined;
    const first = Array.isArray(m) ? m[0] : m;
    if (first?.['@url']) return first['@url'];
  }
  const desc = String(node['description'] ?? node['content:encoded'] ?? '');
  const img = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img?.[1] && /^https?:\/\//i.test(img[1])) return img[1];
  return '';
}

// ---------- fetch + parse ----------

async function fetchFeed(feed: NewsFeed): Promise<RawItem[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(feed.url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'BrieflyDemo/1.0 (+https://briefly-iota-one.vercel.app)', Accept: 'application/rss+xml, application/xml, text/xml' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const doc = parser.parse(xml);
    const channel = doc?.rss?.channel ?? doc?.feed ?? doc?.['rdf:RDF'];
    let items: Record<string, unknown>[] = channel?.item ?? channel?.entry ?? [];
    if (!Array.isArray(items)) items = items ? [items] : [];
    return items.slice(0, MAX_ITEMS_PER_FEED).map((n: Record<string, unknown>, i: number): (RawItem | null) => {
      const r = n as Record<string, any>;
      const linkRaw = r['link'];
      const link = typeof linkRaw === 'string' ? linkRaw : (linkRaw?.['@href'] ?? linkRaw?.['#text'] ?? '');
      const title = cleanTitle(String(r['title'] ?? ''));
      if (!title || !link) return null;
      const guidRaw = r['guid'];
      const guid = typeof guidRaw === 'string' ? guidRaw : (guidRaw?.['#text'] ?? r['id'] ?? link);
      return {
        title,
        link: String(link).trim(),
        guid: String(guid),
        pubDate: String(r['pubDate'] ?? r['published'] ?? r['updated'] ?? r['dc:date'] ?? ''),
        description: String(r['description'] ?? r['summary'] ?? r['content:encoded'] ?? ''),
        image: pickImage(n),
        outlet: feed.outlet,
        feed,
      } as RawItem;
    }).filter((r): r is RawItem => r !== null).map((r, i) => ({ ...r, guid: r.guid || `${feed.id}-${i}` }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

// ---------- classification ----------

const STOP = new Set('the,a,an,and,or,of,to,in,on,for,with,from,at,by,as,is,are,was,were,be,been,has,have,had,will,its,it,this,that,these,those,after,over,under,amid,among,vs,new,says,amid'.split(','));

const TOPIC_KEYWORDS: Record<string, string[]> = {
  AI: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'chatgpt', 'gemini', 'openai', 'anthropic', 'deepmind', 'chatbot', 'generative ai', 'copilot'],
  Technology: ['tech', 'software', 'app', 'smartphone', 'iphone', 'android', 'google', 'microsoft', 'apple', 'chip', 'semiconductor', 'startup', 'internet', 'cyber', 'data breach', '5g', 'satellite'],
  Science: ['scientists', 'research', 'study', 'space', 'nasa', 'isro', 'physics', 'discovery', 'fossil', 'quantum', 'telescope', 'experiment'],
  Business: ['market', 'stocks', 'shares', 'economy', 'inflation', 'rbi', 'profit', 'revenue', 'startup funding', 'ipo', 'trade', 'tariff', 'gdp', 'rupee', 'dollar'],
  Health: ['health', 'hospital', 'doctor', 'vaccine', 'disease', 'virus', 'covid', 'cancer', 'mental health', 'who', 'outbreak', 'drug'],
  Environment: ['climate', 'monsoon', 'rainfall', 'pollution', 'emission', 'forest', 'wildlife', 'heatwave', 'flood', 'drought', 'solar', 'renewable', 'tiger', 'mangrove'],
  Sports: ['cricket', 'football', 'match', 'tournament', 'olympics', 'wicket', 'goal', 'ipl', 'test', 'odi', ' Grand Prix', 'tennis', 'wrestling', 'hockey', 'medal'],
  Culture: ['film', 'movie', 'music', 'festival', 'art', 'concert', 'actor', 'actress', 'bollywood', 'hollywood', 'exhibition', 'theatre', 'dance'],
  Entertainment: ['box office', 'ott', 'netflix', 'trailer', 'web series', 'reality show', 'celebrity', 'album', 'streaming'],
  Politics: ['election', 'minister', 'parliament', 'lok sabha', 'bjp', 'congress', 'vote', 'bill passed', 'cabinet', 'cm ', 'pm modi', 'supreme court', 'policy'],
  Education: ['exam', 'jee', 'neet', 'cbse', 'university', 'college', 'school', 'students', 'upsc', 'results', 'admission', 'scholarship'],
};

function sigTokens(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
  );
}

function classifyTopics(item: RawItem): string[] {
  const hay = `${item.title} ${stripHtml(item.description).slice(0, 400)}`.toLowerCase();
  const hits: string[] = [];
  for (const [topic, words] of Object.entries(TOPIC_KEYWORDS)) {
    if (words.some((w) => hay.includes(w))) hits.push(topic);
  }
  for (const t of item.feed.defaultTopics) if (!hits.includes(t)) hits.push(t);
  return hits.slice(0, 2);
}

function toScope(feed: NewsFeed): Scope {
  switch (feed.scope) {
    case 'india': return { id: 'india', type: 'national', label: 'India / National', level: 1, parentId: 'global' };
    case 'rajasthan': return { id: 'rajasthan', type: 'regional', label: 'Rajasthan / Regional', level: 2, parentId: 'india' };
    case 'jaipur': return { id: 'jaipur', type: 'local', label: 'Jaipur / Local', level: 3, parentId: 'rajasthan' };
    case 'ai': return { id: 'ai', type: 'topic', label: 'AI / Topic', level: 0 };
    default: return { id: 'global', type: 'global', label: 'Global', level: 0 };
  }
}

// ---------- clustering: merge near-duplicate coverage into one story ----------

function similarity(a: Set<string>, b: Set<string>): number {
  if (a.size < 3 || b.size < 3) return 0;
  let inter = 0;
  a.forEach((w) => { if (b.has(w)) inter++; });
  return inter / Math.min(a.size, b.size);
}

export async function buildLiveStories(): Promise<Story[]> {
  const settled = await Promise.allSettled(FEEDS.map(fetchFeed));
  const items: RawItem[] = settled.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  // Drop items with unparseable/ancient dates (>7 days) and exact-link dupes.
  const seen = new Set<string>();
  const fresh = items.filter((it) => {
    if (seen.has(it.link)) return false;
    seen.add(it.link);
    const t = Date.parse(it.pubDate);
    return !Number.isNaN(t) && Date.now() - t < 7 * 86400000;
  });

  // Greedy clustering by title similarity (same topic bucket, 48h window).
  const tokenCache = new Map<RawItem, Set<string>>();
  const topicCache = new Map<RawItem, string[]>();
  const tok = (it: RawItem) => {
    let s = tokenCache.get(it);
    if (!s) { s = sigTokens(it.title); tokenCache.set(it, s); }
    return s;
  };
  const clusters: RawItem[][] = [];
  for (const it of fresh.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))) {
    const topics = classifyTopics(it);
    topicCache.set(it, topics);
    let placed = false;
    for (const c of clusters) {
      const head = c[0];
      const headTopics = topicCache.get(head) ?? [];
      const shareTopic = topics.some((t) => headTopics.includes(t)) || (topics.length === 0 && headTopics.length === 0);
      const dt = Math.abs(Date.parse(it.pubDate) - Date.parse(head.pubDate));
      if (shareTopic && dt < 48 * 3600000 && similarity(tok(it), tok(head)) >= 0.5) {
        c.push(it);
        placed = true;
        break;
      }
    }
    if (!placed) clusters.push([it]);
  }

  return clusters.map((c) => clusterToStory(c, topicCache)).filter(Boolean) as Story[];
}

function clusterToStory(c: RawItem[], topicCache: Map<RawItem, string[]>): Story | null {
  const sorted = [...c].sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
  const newest = sorted[0];
  const topics = uniq(sorted.flatMap((it) => topicCache.get(it) ?? [])).slice(0, 2);
  const outlets = uniq(sorted.map((it) => it.outlet));
  const id = `live-${hashId(sorted.map((it) => it.guid).sort().join('|'))}`;
  const img = sorted.find((it) => it.image)?.image ?? '';
  const when = Date.parse(newest.pubDate);
  const hoursAgo = Math.max(1, Math.round((Date.now() - when) / 3600000));

  const facts: Fact[] = sorted.slice(0, 8).map((it, i) => ({
    id: `${id}-f${hashId(it.guid)}`,
    storyId: id,
    content: it.title + (i === 0 && it.description ? ` — ${cleanDesc(it.description, 140)}` : ''),
    date: new Date(Date.parse(it.pubDate) || Date.now()).toISOString(),
    level: i < 2 ? 'quick' : 'developments',
  }));

  const milestones: Milestone[] = sorted.slice(0, 6).map((it, i) => ({
    id: `${id}-m${hashId(it.guid)}`,
    storyId: id,
    date: new Date(Date.parse(it.pubDate) || Date.now()).toISOString(),
    title: `${it.outlet}: ${it.title.slice(0, 90)}`,
    summary: cleanDesc(it.description, 140) || it.title,
    type: i === 0 ? 'current' : 'event',
    factIds: [],
  }));

  const sources: Source[] = sorted.slice(0, 8).map((it) => ({
    id: `${id}-s${hashId(it.guid)}`,
    name: `${it.outlet} — ${it.title.slice(0, 60)}`,
    url: it.link,
    type: it.feed.research ? 'research' : 'news',
  }));

  const words = sorted.reduce((a, it) => a + it.title.split(/\s+/).length + stripHtml(it.description).split(/\s+/).length, 0);
  const quickTake = cleanDesc(newest.description, 220) || newest.title;

  return {
    id,
    headline: newest.title,
    quickTake,
    keyDevelopments: sorted.slice(1, 5).map((it) => `${it.outlet}: ${it.title}`),
    whyItMatters: `Covered by ${outlets.join(', ')} in the last ${hoursAgo < 48 ? `${hoursAgo} hours` : 'few days'} — follow the timeline for each outlet's latest angle.`,
    contextDeepDive: 'Developing story assembled live from publisher feeds. Open the source links below for full reporting from each outlet.',
    scope: toScope(newest.feed),
    topicTags: topics.length ? topics : ['World'],
    imageUrl: img,
    imageAlt: newest.title,
    publishedAt: new Date(Date.parse(sorted[sorted.length - 1].pubDate) || Date.now()).toISOString(),
    updatedAt: new Date(when).toISOString(),
    readingTime: Math.max(2, Math.min(15, Math.round(words / 200))),
    facts,
    milestones,
    sources,
    origin: 'live',
  };
}
