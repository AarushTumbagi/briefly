'use client';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { TOPICS, SCOPES } from '@/lib/data/scopes';

export default function InterestsPage() {
  const { prefs, update } = usePreferences();
  const setTopic = (t: string, v: 'low' | 'medium' | 'high' | null) => {
    const next = { ...prefs.followedTopics };
    if (v === null) delete next[t]; else next[t] = v;
    update({ followedTopics: next });
  };
  const togglePlace = (id: string, label: string, level: number) => {
    const has = prefs.followedPlaces.some((p) => p.id === id);
    update({ followedPlaces: has ? prefs.followedPlaces.filter((p) => p.id !== id) : [...prefs.followedPlaces, { id, label, level }] });
  };

  return (
    <div className="section-container py-8 max-w-3xl space-y-8">
      <div>
        <h1 className="page-title">Interests</h1>
        <p className="page-subtitle">Changing these affects future recommendations. It does not change what you are reading right now.</p>
      </div>

      <section className="card p-5">
        <h2 className="font-semibold">Followed topics</h2>
        <div className="mt-3 space-y-2">
          {TOPICS.map((t) => (
            <div key={t} className="flex items-center gap-2 flex-wrap">
              <span className="text-sm w-28">{t}</span>
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button key={level} onClick={() => setTopic(t, prefs.followedTopics[t] === level ? null : level)}
                  aria-pressed={prefs.followedTopics[t] === level}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${prefs.followedTopics[t] === level ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>
                  {level}
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold">Followed places</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {SCOPES.filter((s) => s.type !== 'topic').map((s) => {
            const on = prefs.followedPlaces.some((p) => p.id === s.id);
            return (
              <button key={s.id} onClick={() => togglePlace(s.id, s.label, s.level)} aria-pressed={on}
                className={`px-3 py-1.5 rounded-lg text-sm border ${on ? 'bg-sky-600 text-white border-sky-600' : 'border-neutral-300 dark:border-neutral-700'}`}>
                {s.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-5 space-y-4">
        <div>
          <label className="label" htmlFor="mix">Content mix</label>
          <select id="mix" value={prefs.contentMix} onChange={(e) => update({ contentMix: e.target.value as 'news' | 'research' | 'both' })} className="input max-w-xs">
            <option value="news">News</option><option value="research">Research</option><option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="defscope">Default starting scope</label>
          <select id="defscope" value={prefs.defaultScope} onChange={(e) => update({ defaultScope: e.target.value })} className="input max-w-xs">
            {SCOPES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <button onClick={() => update({ readingHistory: [], seenFacts: {} })} className="btn-outline !py-2">Reset learned behaviour signals</button>
          <p className="text-xs text-neutral-500 mt-1.5">Clears reading history and seen-fact memory. Saved stories and follows are kept.</p>
        </div>
      </section>
    </div>
  );
}
