import type { Story } from '@/types';
import { formatShortDate } from '@/lib/utils/format';

export default function EvolutionTimeline({ story }: { story: Story }) {
  const sorted = [...story.milestones].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const future = sorted.filter((m) => m.type === 'future');
  const past = sorted.filter((m) => m.type !== 'future');
  return (
    <div>
      <ol className="relative border-l-2 border-neutral-300 dark:border-neutral-700 ml-2 space-y-8">
        {past.map((m) => (
          <li key={m.id} className="ml-6 relative">
            <span aria-hidden className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 ${m.type === 'current' ? 'bg-sky-500 border-sky-500 ring-4 ring-sky-100 dark:ring-sky-950' : 'bg-white dark:bg-neutral-900 border-neutral-400'}`} />
            <div className={`card p-4 ${m.type === 'current' ? 'border-sky-400 dark:border-sky-600' : ''}`}>
              <p className="text-xs text-neutral-500">{formatShortDate(m.date)}{m.type === 'current' ? ' · Now' : ''}</p>
              <h3 className="font-semibold mt-1">{m.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{m.summary}</p>
            </div>
          </li>
        ))}
      </ol>
      {(story.futurePossibility || future.length > 0) && (
        <div className="mt-8 ml-2">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 mb-3">Possible next development — not a prediction</p>
          <ol className="relative border-l-2 border-dashed border-amber-400 ml-0 space-y-4">
            <li className="ml-6 relative">
              <span aria-hidden className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-amber-300 border-amber-400" />
              <div className="card p-4 border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20">
                <p className="text-sm">{story.futurePossibility?.text ?? future[0]?.summary}</p>
                {story.futurePossibility?.evidence && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-medium text-amber-800 dark:text-amber-200">Why this is plausible</summary>
                    <p className="text-xs mt-1 text-neutral-600 dark:text-neutral-400">{story.futurePossibility.evidence}</p>
                  </details>
                )}
              </div>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
