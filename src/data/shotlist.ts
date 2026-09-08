/**
 * The proof inventory, as specs.
 *
 * turf floor (truth.py:464): finished 4 · pair 4 · team 2 · detail 1 · context 2
 *
 * Each entry is the shot we need, not a picture we have. Until `file` is set,
 * <Figure> renders a labeled placeholder in dev and NOTHING in production, so a
 * placeholder cannot reach a live page. These specs are also the shot list the
 * client shoots against — one source, two jobs.
 */
export type Shot = {
  id: string;
  kind: 'finished' | 'before' | 'after' | 'team' | 'detail' | 'context';
  pairId?: string;
  /** What the frame must actually contain. Written for whoever holds the phone. */
  brief: string;
  /** Caption if and when the real photograph lands. Specific, never decorative. */
  caption?: string;
  ratio: '4/3' | '3/2' | '16/9' | '1/1';
  /** The client's own photograph. The only thing that renders in production. */
  file?: string;
  /** A licensed stock stand-in for DESIGN REVIEW ONLY. Renders in dev with a visible
   *  STOCK label; a production build ignores it entirely. Never captioned as our work. */
  stock?: { src: string; credit: string };
};

export const SHOTS: Shot[] = [
  { id: 'fin-1', kind: 'finished', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/4475691/pexels-photo-4475691.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #4475691' },
    brief: 'Finished putting green, wide. Whole surface in frame, flag in, cup visible. Blown clean before the shutter — that is the standard the page claims.' },
  { id: 'fin-2', kind: 'finished', ratio: '4/3', stock: { src: 'https://images.pexels.com/photos/23070382/pexels-photo-23070382.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #23070382' },
    brief: 'Finished residential lawn, low and raking. Show the edge where turf meets hardscape — that seam is where a bad install shows.' },
  { id: 'fin-3', kind: 'finished', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/16630711/pexels-photo-16630711.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #16630711' },
    brief: 'Finished pet area. Include the drainage edge if it is visible.' },
  { id: 'fin-4', kind: 'finished', ratio: '4/3', stock: { src: 'https://images.pexels.com/photos/39222204/pexels-photo-39222204.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #39222204' },
    brief: 'Finished commercial or sports surface. Wide enough to read the scale of the job.' },

  { id: 'ba-1a', kind: 'before', pairId: 'ba-1', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/11654274/pexels-photo-11654274.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #11654274' },
    brief: 'BEFORE — stand somewhere you can stand again. Note the spot.' },
  { id: 'ba-1b', kind: 'after',  pairId: 'ba-1', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/15413574/pexels-photo-15413574.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #15413574' },
    brief: 'AFTER — same spot, same height, same time of day if you can.' },
  { id: 'ba-2a', kind: 'before', pairId: 'ba-2', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/6729124/pexels-photo-6729124.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #6729124' }, brief: 'BEFORE — second job. Same rule.' },
  { id: 'ba-2b', kind: 'after',  pairId: 'ba-2', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/5231242/pexels-photo-5231242.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #5231242' }, brief: 'AFTER — second job, matched angle.' },
  { id: 'ba-3a', kind: 'before', pairId: 'ba-3', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/3999647/pexels-photo-3999647.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #3999647' }, brief: 'BEFORE — third job.' },
  { id: 'ba-3b', kind: 'after',  pairId: 'ba-3', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/38478448/pexels-photo-38478448.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #38478448' }, brief: 'AFTER — third job, matched angle.' },
  { id: 'ba-4a', kind: 'before', pairId: 'ba-4', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/37554739/pexels-photo-37554739.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #37554739' }, brief: 'BEFORE — fourth job.' },
  { id: 'ba-4b', kind: 'after',  pairId: 'ba-4', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/36346063/pexels-photo-36346063.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #36346063' }, brief: 'AFTER — fourth job, matched angle.' },

  { id: 'team-1', kind: 'team', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/4107278/pexels-photo-4107278.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #4107278' },
    brief: 'Crew actually working — cutting, seaming or screeding base. Not a posed line-up.' },
  { id: 'team-2', kind: 'team', ratio: '4/3', stock: { src: 'https://images.pexels.com/photos/33162373/pexels-photo-33162373.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #33162373' },
    brief: 'Second crew shot, different stage of the job.' },

  { id: 'det-1', kind: 'detail', ratio: '1/1', stock: { src: 'https://images.pexels.com/photos/6573260/pexels-photo-6573260.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #6573260' },
    brief: 'Close detail — the seam, the edge, or infill in the hand. Near enough to see the blade.' },

  { id: 'ctx-1', kind: 'context', ratio: '3/2',
    brief: 'The truck, or signage on a job.' },
  { id: 'ctx-2', kind: 'context', ratio: '3/2', stock: { src: 'https://images.pexels.com/photos/8960427/pexels-photo-8960427.jpeg?auto=compress&cs=tinysrgb&w=1600', credit: 'Pexels #8960427' },
    brief: 'The property from the street — proves the job sits in a real place.' },
];

/** Hero background: the first finished shot's image, real or stock (dev). */
export const heroSrc = () => {
  const f = SHOTS.find((x) => x.kind === 'finished');
  if (f?.file) return f.file;
  return import.meta.env.DEV ? (f?.stock?.src ?? null) : null; // stock is dev-only, same rule as <Figure>
};

export const shotsBy = (k: Shot['kind']) => SHOTS.filter((s) => s.kind === k);
export const haveCount = () => SHOTS.filter((s) => s.file).length;
export const floorCount = SHOTS.length;
