/**
 * The fact base, gated.
 *
 * Every value the site renders comes through here. A fact whose status is not
 * renderable, or which carries no source, returns null — and a component handed
 * null renders NOTHING rather than a placeholder. That is the whole point: the
 * hole ships, and the reason sits in the source comment.
 *
 * Statuses (truth.py): VERIFIED · CLIENT_STATED · CLIENT_CONFIRMED ·
 *                      EXTERNAL_SOURCE · INFERENCE · UNKNOWN
 * INFERENCE and UNKNOWN never render, by design.
 *
 * NOTE: site-tools/template/src/lib/brief.ts expects a legacy `src.kind` shape
 * that truth.py does not emit. This reads the canonical shape instead.
 */
import raw from '../../.site/truth/brief.json';

const RENDERABLE = new Set([
  'VERIFIED', 'CLIENT_STATED', 'CLIENT_CONFIRMED', 'EXTERNAL_SOURCE',
]);

export type Fact<T = string> = {
  value: T | null;
  status?: string;
  source?: string | null;
  source_detail?: string | null;
  date?: string | null;
  note?: string;
};

/** The value if it may render, else null. Null means: render nothing. */
export function fact<T = string>(node: Fact<T> | undefined | null): T | null {
  if (!node) return null;
  if (!RENDERABLE.has(String(node.status))) return null;
  if (node.value === null || node.value === undefined || node.value === '') return null;
  if (!node.source) return null;
  return node.value;
}

/** Why a fact is absent — for a source comment in the rendered HTML. */
export function why(node: Fact<any> | undefined | null): string {
  if (!node) return 'not in the fact base';
  if (!RENDERABLE.has(String(node.status))) return `status ${node.status}${node.note ? ` — ${node.note}` : ''}`;
  if (!node.source) return 'no source on file';
  return 'present';
}

/** Map a list of fact nodes to their renderable values, dropping the rest. */
export function facts<T = string>(nodes: Fact<T>[] | undefined): T[] {
  return (nodes ?? []).map((n) => fact<T>(n)).filter((v): v is T => v !== null);
}

const b = raw as any;

export const identity = b.identity;
export const positioning = b.positioning ?? {};
export const location = (b.identity?.locations ?? [])[0] ?? {};

export const businessName = fact<string>(identity?.display_name);
export const foundedYear  = fact<number>(identity?.founded_year);
export const phone        = fact<string>(location?.phone);
export const email        = fact<string>(location?.email);

export const services     = facts<string>(b.services);
export const serviceAreas = facts<string>(b.service_areas);

/** tel: href from the rendered number — never a tracking number, never divergent.
 *  No +1 country code: all three markets are US, and check-entity.py PHONE-1
 *  compares raw digits against the brief, where a country code reads as a
 *  different number. Byte-consistency with the GBP matters more than E.164 here. */
export const phoneHref = phone ? `tel:${phone.replace(/\D/g, '')}` : null;

export default b;
