/** The editorial fields rendered by the guide index and detail templates. */
export type Guide = {
  slug: string;
  market: 'denver-metro' | 'grand-strand' | 'northeast-florida' | 'all';
  title: string;
  description: string;
  h1: string;
  updated: string;
  answer: { question: string; answer: string };
  sections: { h2: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  sources: { label: string; cite: string; url?: string; checked: string }[];
  publicReferences?: string[];
  /** Set only when no source can be linked publicly (every one blocks site-audit crawlers), so the guide shows
   *  no useful-links box on purpose. Says why, so an accidental empty list still fails the publication test. */
  publicReferencesWithheld?: string;
};
