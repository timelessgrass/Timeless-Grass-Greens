import { getCollection, type CollectionKey } from 'astro:content';
import { isPublished } from './content-policy.mjs';
import { townEligibility } from '../data/service-territory.mjs';

/** Routes, hubs, related links and sitemap all consume the same eligible records. */
export async function getPublishedCollection<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection, (entry) => isPublished(entry.data));
  if (collection === 'towns') {
    for (const entry of entries) {
      const result = townEligibility(entry.id, entry.data);
      if (!result.eligible) throw new Error(`${entry.id}: ${result.reason}`);
    }
  }
  return entries;
}
