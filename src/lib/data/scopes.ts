import type { Scope, UserLocation } from '@/types';

export const DEFAULT_LOCATION: UserLocation = { country: 'India', region: 'Rajasthan', city: 'Jaipur' };

export function buildScopes(loc: UserLocation = DEFAULT_LOCATION): Scope[] {
  const country = loc.country.trim() || 'India';
  const region = loc.region.trim() || 'Rajasthan';
  const city = loc.city.trim() || 'Jaipur';
  return [
    { id: 'global', type: 'global', label: 'Global', level: 0 },
    { id: 'india', type: 'national', label: `${country} / National`, level: 1, parentId: 'global' },
    { id: 'rajasthan', type: 'regional', label: `${region} / Regional`, level: 2, parentId: 'india' },
    { id: 'jaipur', type: 'local', label: `${city} / Local`, level: 3, parentId: 'rajasthan' },
    { id: 'ai', type: 'topic', label: 'AI / Topic', level: 0 },
  ];
}

// Backwards-compatible static list (default location).
export const SCOPES: Scope[] = buildScopes(DEFAULT_LOCATION);

export const TOPICS = ['AI', 'Technology', 'Science', 'Business', 'Health', 'Environment', 'Sports', 'Culture', 'Politics', 'Entertainment', 'Education', 'World'];

export function getScopeLabel(id?: string, loc: UserLocation = DEFAULT_LOCATION): string {
  if (!id) return 'Global';
  return buildScopes(loc).find((s) => s.id === id)?.label ?? id;
}
