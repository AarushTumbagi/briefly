import type { Scope } from '@/types';

export const SCOPES: Scope[] = [
  { id: 'global', type: 'global', label: 'Global', level: 0 },
  { id: 'india', type: 'national', label: 'India / National', level: 1, parentId: 'global' },
  { id: 'rajasthan', type: 'regional', label: 'Rajasthan / Regional', level: 2, parentId: 'india' },
  { id: 'jaipur', type: 'local', label: 'Jaipur / Local', level: 3, parentId: 'rajasthan' },
  { id: 'ai', type: 'topic', label: 'AI / Topic', level: 0 },
];

export const TOPICS = ['AI', 'Technology', 'Science', 'Business', 'Health', 'Environment', 'Sports', 'Culture'];

export const SCOPE_LABELS: Record<string, string> = {
  global: 'Global',
  india: 'India / National',
  rajasthan: 'Rajasthan / Regional',
  jaipur: 'Jaipur / Local',
  ai: 'AI / Topic',
};

export function getScopeLabel(id?: string): string {
  if (!id) return 'Global';
  return SCOPE_LABELS[id] ?? id;
}
