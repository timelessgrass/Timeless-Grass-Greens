import type { Guide } from './guides.types';
export type { Guide } from './guides.types';

/** Populated by the regulatory-guides run. Empty until then; the route builds nothing. */
export const GUIDES: Guide[] = [];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
