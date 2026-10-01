import type { Metadata } from 'next';
import '@/styles/globals.css';
import { PreferencesProvider } from '@/lib/hooks/usePreferences';
import Header from '@/components/layout/Header';
import WelcomeModal from '@/components/layout/WelcomeModal';

export const metadata: Metadata = {
  title: 'Briefly — Personal News Intelligence',
  description: 'Show me what matters to me, at the level I want, without repeating what I already know.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PreferencesProvider>
          <Header />
          <main className="pb-24 md:pb-12 min-h-[80vh]">{children}</main>
          <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 hidden md:block">
            <div className="section-container flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
              <span className="font-serif font-bold text-neutral-900 dark:text-neutral-50">Briefly.</span>
              <a className="hover:underline" href="/about">About</a>
              <a className="hover:underline" href="/interests">Interests</a>
              <a className="hover:underline" href="/settings">Settings</a>
              <span className="ml-auto">Demo with seeded data · No tracking</span>
            </div>
          </footer>
          <WelcomeModal />
        </PreferencesProvider>
      </body>
    </html>
  );
}
