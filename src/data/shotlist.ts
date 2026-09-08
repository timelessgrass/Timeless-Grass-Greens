/**
 * The proof inventory, as specs.
 *
 * turf floor (truth.py:464): finished 4 · pair 4 · team 2 · detail 1 · context 2
 *
 * Each entry is the shot we need, not a picture we have. Until `file` is set,
 * <Figure> renders a labelled placeholder in dev and NOTHING in production, so a
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
  file?: string;
};

export const SHOTS: Shot[] = [
  { id: 'fin-1', kind: 'finished', ratio: '3/2',
    brief: 'Finished putting green, wide. Whole surface in frame, flag in, cup visible. Blown clean before the shutter — that is the standard the page claims.' },
  { id: 'fin-2', kind: 'finished', ratio: '4/3',
    brief: 'Finished residential lawn, low and raking. Show the edge where turf meets hardscape — that seam is where a bad install shows.' },
  { id: 'fin-3', kind: 'finished', ratio: '3/2',
    brief: 'Finished pet area. Include the drainage edge if it is visible.' },
  { id: 'fin-4', kind: 'finished', ratio: '4/3',
    brief: 'Finished commercial or sports surface. Wide enough to read the scale of the job.' },

  { id: 'ba-1a', kind: 'before', pairId: 'ba-1', ratio: '3/2',
    brief: 'BEFORE — stand somewhere you can stand again. Note the spot.' },
  { id: 'ba-1b', kind: 'after',  pairId: 'ba-1', ratio: '3/2',
    brief: 'AFTER — same spot, same height, same time of day if you can.' },
  { id: 'ba-2a', kind: 'before', pairId: 'ba-2', ratio: '3/2', brief: 'BEFORE — second job. Same rule.' },
  { id: 'ba-2b', kind: 'after',  pairId: 'ba-2', ratio: '3/2', brief: 'AFTER — second job, matched angle.' },
  { id: 'ba-3a', kind: 'before', pairId: 'ba-3', ratio: '3/2', brief: 'BEFORE — third job.' },
  { id: 'ba-3b', kind: 'after',  pairId: 'ba-3', ratio: '3/2', brief: 'AFTER — third job, matched angle.' },
  { id: 'ba-4a', kind: 'before', pairId: 'ba-4', ratio: '3/2', brief: 'BEFORE — fourth job.' },
  { id: 'ba-4b', kind: 'after',  pairId: 'ba-4', ratio: '3/2', brief: 'AFTER — fourth job, matched angle.' },

  { id: 'team-1', kind: 'team', ratio: '3/2',
    brief: 'Crew actually working — cutting, seaming or screeding base. Not a posed line-up.' },
  { id: 'team-2', kind: 'team', ratio: '4/3',
    brief: 'Second crew shot, different stage of the job.' },

  { id: 'det-1', kind: 'detail', ratio: '1/1',
    brief: 'Close detail — the seam, the edge, or infill in the hand. Near enough to see the blade.' },

  { id: 'ctx-1', kind: 'context', ratio: '3/2',
    brief: 'The truck, or signage on a job.' },
  { id: 'ctx-2', kind: 'context', ratio: '3/2',
    brief: 'The property from the street — proves the job sits in a real place.' },
];

export const shotsBy = (k: Shot['kind']) => SHOTS.filter((s) => s.kind === k);
export const haveCount = () => SHOTS.filter((s) => s.file).length;
export const floorCount = SHOTS.length;
