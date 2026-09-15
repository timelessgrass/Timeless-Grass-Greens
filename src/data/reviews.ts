/**
 * Customer reviews, quoted as written.
 *
 * TIMELESS: Google reviews of the Denver metro Business Profile, from screenshots Ty sent on
 * 2026-09-14. Every one is five stars.
 * NoCo Turf: Brian's sister company in northern Colorado. On the discovery call (00:40:38) Brian
 * offered its Google reviews for this site ("it's still us"), and Ty asked for them to be cited as
 * the sister company's (2026-09-14). The text and five-star ratings are as NoCo Turf's own site
 * shows them (nocoturf.com, read 2026-09-14). Each is labelled NoCo Turf wherever it appears.
 *
 * Reviewers are shown by first name and last initial. An ellipsis marks a shortened quote; nothing
 * is reworded. Kept out: reviews that mention financing or water savings, which this site cannot
 * source for TIMELESS. No aggregate rating or review count is shown, and there is no Review schema:
 * see the note in Base.astro.
 */
export type Review = {
  id: string;
  author: string;
  business: 'timeless' | 'noco';
  text: string;
  /** Service pages (services.ts slugs) this review is relevant to. */
  services: string[];
  /** A before/after pair (shotlist.ts pairId) that came with this review. */
  pairId?: string;
};

/* The Denver profile, where the TIMELESS reviews are posted. */
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?kgmid=/g/11vynn9dqg&q=TIMELESS+Grass+%26+Greens';

export const BUSINESS_LABEL: Record<Review['business'], string> = {
  timeless: 'Google review',
  noco: 'Google review of NoCo Turf, our sister company',
};

export const REVIEWS: Review[] = [
  {
    id: 'aria-v', author: 'Aria V.', business: 'timeless', pairId: 'ba-1', services: ['residential-turf'],
    text: 'Brian and his team did amazing work on our yard! He was professional, communicative, and the work is outstanding! Not to mention very fairly priced. I would recommend to anyone looking for artificial turf!',
  },
  {
    id: 'jp-w', author: 'JP W.', business: 'timeless', services: ['residential-turf'],
    text: 'I had a great experience with Timeless. I got 3 quotes and they were very competitive. The crew was friendly, communicative and did an amazing job transforming our backyard. Highly recommend!',
  },
  {
    id: 'harry-m', author: 'Harry M.', business: 'timeless', services: ['residential-turf'],
    text: 'Brian and his team were great! Brian was communicative every step of the way. His team did quick work and the lawn looks better than I could have hoped. Brian made sure I was 100% happy. I would recommend his team to anyone.',
  },
  {
    id: 'mary-t', author: 'Mary T.', business: 'timeless', services: ['residential-turf', 'turf-removal-and-replacement'],
    text: 'Timely and responsive service. The Timeless crew was professional and worked hard to make sure our new turf was installed the way we wanted it to be. Our yard looks great.',
  },
  {
    id: 'ally-p', author: 'Ally P.', business: 'noco', services: ['pet-turf'],
    text: 'My husband worked with Brian and we had such a great experience! … The crew showed up on time and did a fabulous job! They cleaned everything up, and were very professional!',
  },
  {
    id: 'kevin-a', author: 'Kevin A.', business: 'noco', services: ['putting-greens', 'pet-turf'],
    text: 'NOCO Turf Co did a phenomenal job transforming our backyard from a pile of dirt to a backyard escape for our dogs and family. … The putting green is challenging and perfect to practice in between tee times.',
  },
  {
    id: 'jim-w', author: 'Jim W.', business: 'noco', services: ['putting-greens'],
    text: 'Brian was terrific, No pressure to buy. Fair price. Quality material. His work crew were hardworking and very meticulous! Would recommend giving him a chance to earn your business!',
  },
];

export const review = (id: string) => REVIEWS.find((r) => r.id === id);
/** Reviews for a service page, TIMELESS first. */
export const reviewsFor = (service: string, max = 3) =>
  REVIEWS.filter((r) => r.services.includes(service))
    .sort((a, b) => Number(b.business === 'timeless') - Number(a.business === 'timeless'))
    .slice(0, max);
