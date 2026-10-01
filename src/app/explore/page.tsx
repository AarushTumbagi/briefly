'use client';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { STORIES, rankStories, dedupeStories } from '@/lib/utils/storage';
import StoryCard from '@/components/story/StoryCard';
import { TOPICS } from '@/lib/data/scopes';
import { Empty } from '@/components/ui/controls';

const EXAMPLES = ['What should I know about AI today?', 'What changed in Rajasthan this week?', 'Catch me up on science'];

function parseQuery(q: string): { topic?: string; place?: string; time?: string } {
  const lower = q.toLowerCase();
  const out: { topic?: string; place?: string; time?: string } = {};
  for (const t of TOPICS) if (lower.includes(t.toLowerCase())) out.topic = t;
  if (lower.includes('rajasthan')) out.place = 'rajasthan';
  else if (lower.includes('jaipur')) out.place = 'jaipur';
  else if (lower.includes('india')) out.place = 'india';
  if (lower.includes('today')) out.time = 'today';
  else if (lower.includes('week')) out.time = 'week';
  return out;
}

function ExploreInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { prefs, update } = usePreferences();
  const [query, setQuery] = useState(params.get('q') ?? '');

  const scopeTab = params.get('scope') ?? 'all';
  const topic = params.get('topic') ?? '';
  const dateF = params.get('date') ?? 'all';
  const content = params.get('content') ?? prefs.contentMix;
  const depth = params.get('depth') ?? prefs.defaultReadingMode;

  const set = (k: string, v: string) => {
    const sp = new URLSearchParams(params.toString());
    if (!v || v === 'all') sp.delete(k); else sp.set(k, v);
    router.replace(`/explore?${sp.toString()}`, { scroll: false });
  };

  const results = useMemo(() => {
    let list = dedupeStories(rankStories(STORIES, prefs));
    if (scopeTab !== 'all') {
      list = list.filter((s) => {
        if (scopeTab === 'global') return s.scope.type === 'global';
        if (scopeTab === 'national') return s.scope.type === 'national';
        if (scopeTab === 'regional') return s.scope.type === 'regional';
        if (scopeTab === 'local') return s.scope.type === 'local';
        if (scopeTab === 'topics') return s.scope.type === 'topic';
        return true;
      });
    }
    if (topic) list = list.filter((s) => s.topicTags.includes(topic));
    if (dateF === 'today') list = list.filter((s) => Date.now() - +new Date(s.updatedAt) < 86400000 * 1.5);
    if (dateF === 'week') list = list.filter((s) => Date.now() - +new Date(s.updatedAt) < 86400000 * 7.5);
    if (content === 'news') list = list.filter((s) => !s.sources.some((x) => x.type === 'research') || s.topicTags.length > 0);
    if (content === 'research') list = list.filter((s) => s.sources.some((x) => x.type === 'research'));
    if (depth === '5min') list = list.filter((s) => s.readingTime <= 5);
    if (depth === '10min') list = list.filter((s) => s.readingTime <= 12);
    return list;
  }, [prefs, scopeTab, topic, dateF, content, depth]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseQuery(query);
    const sp = new URLSearchParams();
    if (parsed.topic) sp.set('topic', parsed.topic);
    if (parsed.time) sp.set('date', parsed.time === 'today' ? 'today' : 'week');
    if (parsed.place) {
      const map: Record<string, string> = { india: 'national', rajasthan: 'regional', jaipur: 'local' };
      sp.set('scope', map[parsed.place] ?? 'all');
    }
    sp.set('q', query);
    router.replace(`/explore?${sp.toString()}`, { scroll: false });
  };

  return (
    <div className="section-container py-8 space-y-6">
      <div>
        <h1 className="page-title">Explore</h1>
        <p className="page-subtitle">Switch lenses freely — exploring never changes your permanent interests.</p>
      </div>

      <form onSubmit={submit} className="card p-4">
        <label htmlFor="ask" className="label">What should I know?</label>
        <div className="flex gap-2">
          <input id="ask" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try: What should I know about AI today?" className="input" />
          <button type="submit" className="btn-primary whitespace-nowrap">Apply</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => setQuery(ex)} className="text-xs px-2.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
              {ex}
            </button>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-2">This version matches supported topic, place and time phrases into filters — no free-form chatbot answers.</p>
      </form>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Scope tabs">
        {['all', 'global', 'national', 'regional', 'local', 'topics'].map((t) => (
          <button key={t} onClick={() => set('scope', t)} aria-pressed={scopeTab === t}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border capitalize ${scopeTab === t ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>{t}</button>
        ))}
      </div>

      <div>
        <p className="label">Region drilldown</p>
        <div className="flex items-center gap-1 text-sm flex-wrap" aria-label="Region drilldown">
          {['World', 'India', 'Rajasthan', 'Jaipur'].map((r, i) => (
            <span key={r} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden className="text-neutral-400">→</span>}
              <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">{r}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Topic chips">
        <button onClick={() => set('topic', '')} aria-pressed={!topic} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${!topic ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700'}`}>All</button>
        {TOPICS.map((t) => (
          <button key={t} onClick={() => set('topic', topic === t ? '' : t)} aria-pressed={topic === t}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${topic === t ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>{t}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="label" htmlFor="date">Date</label>
          <select id="date" value={dateF} onChange={(e) => set('date', e.target.value)} className="input">
            <option value="all">All</option><option value="today">Today</option><option value="week">This week</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="content">Content</label>
          <select id="content" value={content} onChange={(e) => set('content', e.target.value)} className="input">
            <option value="both">Both</option><option value="news">News</option><option value="research">Research</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="depth">Reading depth</label>
          <select id="depth" value={depth} onChange={(e) => set('depth', e.target.value)} className="input">
            <option value="standard">Standard</option><option value="5min">5 min</option><option value="10min">10 min</option><option value="deep">Deep</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-neutral-500" role="status">{results.length} stor{results.length === 1 ? 'y' : 'ies'} found</p>
      {results.length === 0 ? <Empty title="No stories match these filters" body="Try widening the date range or clearing a topic." /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
      )}
      <button onClick={() => update({ sessionScope: scopeTab === 'all' ? 'global' : scopeTab })} className="btn-outline">Read this lens for now (session only)</button>
    </div>
  );
}

export default function ExplorePage() {
  return <Suspense fallback={<div className="section-container py-8">Loading filters…</div>}><ExploreInner /></Suspense>;
}
