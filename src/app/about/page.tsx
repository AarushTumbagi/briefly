export default function AboutPage() {
  return (
    <div className="section-container py-8 max-w-3xl space-y-6">
      <div><h1 className="page-title">About Briefly</h1><p className="page-subtitle">A calm daily news intelligence demo — story-first, no repeats, no noise.</p></div>
      <section className="card p-6 space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">Story-first, not article-first</h2>
          <p className="mt-1">One event, many articles. Briefly unifies coverage into a single evolving story card with one clear explanation, instead of a pile of near-duplicate headlines.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">The no-repeat concept</h2>
          <p className="mt-1">Every story is made of facts with stable IDs. Once you&apos;ve seen a fact, it moves to “Previously covered.” Return visits show only what&apos;s new — never the same paragraph twice.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">Verified history vs possible futures</h2>
          <p className="mt-1">Timelines use a solid line for verified events and highlight “Now.” At most one future possibility appears, on a dashed amber line labelled “Possible next development — not a prediction,” with evidence only when seed data includes it.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">Demo scope</h2>
          <p className="mt-1">This version uses 12 hand-written seed stories, localStorage for preferences, saved items, theme and fact-level reading memory. No API keys, no scraping, no account. Deploy anywhere Next.js runs.</p>
        </div>
      </section>
    </div>
  );
}
