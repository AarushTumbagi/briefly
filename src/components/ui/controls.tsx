import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md';

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...rest
}: { variant?: Variant; size?: Size; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 disabled:opacity-50 disabled:pointer-events-none';
  const variants: Record<Variant, string> = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700',
    secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-700',
    ghost: 'bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
    outline: 'border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800',
  };
  const sizes: Record<Size, string> = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>{children}</button>;
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'brand' | 'green' | 'amber' }) {
  const tones: Record<string, string> = {
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    brand: 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200',
    green: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200',
    amber: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">{title}</h2>
        {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Empty({ title, body }: { title: string; body?: string }) {
  return (
    <div className="card p-8 text-center">
      <p className="font-medium text-neutral-900 dark:text-neutral-50">{title}</p>
      {body && <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{body}</p>}
    </div>
  );
}
