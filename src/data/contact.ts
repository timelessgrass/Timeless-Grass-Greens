/**
 * Which phone number a page shows and dials.
 *
 * Every page defaults to the shared line in brief.ts. A market can override it for its own
 * pages — so far only the Grand Strand (src/data/markets.ts, `phone`), set to that market's own
 * Google Business Profile number by the owner on 2026-09-14 — while every other page, and the
 * Organization schema telephone in Base.astro, keeps the brief.ts number.
 *
 * Takes a market SLUG rather than a Market object so callers don't need to import markets.ts
 * themselves, and so this module can sit between brief.ts and markets.ts without either of
 * those needing to know it exists: brief.ts stays market-agnostic, markets.ts stays
 * contact-formatting-agnostic, and nothing here imports back into either in a cycle.
 */
import { phone as briefPhone, phoneHref as briefPhoneHref } from './brief';
import { marketBySlug } from './markets';

export type Contact = { phone: string | null; phoneHref: string | null };

/** The phone/phoneHref pair a page should render. Pass the market slug when the page belongs to
 *  one (e.g. Astro.props.market); omit it for shared pages (services, articles, guides, home). */
export function contactFor(marketSlug?: string | null): Contact {
  const override = marketSlug ? marketBySlug(marketSlug)?.phone : undefined;
  if (!override) return { phone: briefPhone, phoneHref: briefPhoneHref };
  return { phone: override, phoneHref: `tel:${override.replace(/\D/g, '')}` };
}
