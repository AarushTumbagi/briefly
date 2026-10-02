'use client';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { Modal } from '@/components/ui/Modal';

export default function WelcomeModal() {
  const { prefs, update } = usePreferences();
  if (prefs.welcomeCompleted) return null;
  const { country, region, city } = prefs.location;
  const options = [
    { id: 'global', label: 'Global news', desc: 'Top world stories' },
    { id: 'india', label: `${country} news`, desc: `${country} at a glance` },
    { id: 'jaipur', label: 'Near me', desc: `${city} & ${region}` },
    { id: 'ai', label: 'A topic', desc: 'Start with AI' },
    { id: 'global', label: 'Explore everything', desc: 'Full briefing mix' },
  ];
  const choose = (id: string) => update({ sessionScope: id, welcomeCompleted: true });
  return (
    <Modal title="What do you want to know right now?" onClose={() => update({ welcomeCompleted: true })}>
      <div className="space-y-2">
        {options.map((o) => (
          <button key={o.label} onClick={() => choose(o.id)}
            className="w-full text-left card p-3.5 hover:border-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
            <span className="font-medium text-sm">{o.label}</span>
            <span className="block text-xs text-neutral-500 mt-0.5">{o.desc}</span>
          </button>
        ))}
        <button onClick={() => update({ welcomeCompleted: true })} className="w-full text-center text-sm text-neutral-500 py-2 underline underline-offset-2">
          Skip for now
        </button>
      </div>
      <p className="text-xs text-neutral-400 mt-3">This sets a temporary reading scope. It won&apos;t change your permanent interests.</p>
    </Modal>
  );
}
