/** Service eligibility, independent of whether an article is ready to publish.
 * The existing site is preserved as a baseline, not fresh geographic verification.
 * New Grand Strand coverage follows the client's Shallotte–Loris–Conway–Burgess/coast outline.
 * Border candidates stay in plans/seo-aeo until their location is reconciled.
 */
export const MARKET_STATES = {
  'denver-metro': ['CO'],
  'grand-strand': ['SC', 'NC'],
  'northeast-florida': ['FL'],
};
export const STATE_NAMES = { CO: 'Colorado', SC: 'South Carolina', NC: 'North Carolina', FL: 'Florida' };

export const EXISTING_TOWN_IDS = new Set([
  "amelia-city-fl",
  "amelia-island-fl",
  "anastasia-island-fl",
  "applewood-co",
  "arvada-co",
  "asbury-lake-lake-asbury-fl",
  "atlantic-beach-fl",
  "aurora-co",
  "baldwin-fl",
  "boulder-co",
  "bow-mar-co",
  "briarcliffe-acres-sc",
  "brighton-co",
  "butler-beach-fl",
  "carolina-forest-sc",
  "castle-pines-co",
  "castle-rock-co",
  "centennial-co",
  "cherry-creek-co",
  "cherry-hills-village-co",
  "columbine-co",
  "columbine-valley-co",
  "commerce-city-co",
  "denver-co",
  "doctors-inlet-fl",
  "dove-valley-co",
  "edgewater-co",
  "englewood-co",
  "erie-co",
  "fairmount-co",
  "fernandina-beach-fl",
  "fleming-island-fl",
  "foxfield-co",
  "fruit-cove-fl",
  "golden-co",
  "greenwood-village-co",
  "gunbarrel-co",
  "hibernia-fl",
  "highlands-ranch-co",
  "holly-hills-co",
  "inverness-co",
  "jacksonville-beach-fl",
  "jacksonville-fl",
  "julington-creek-plantation-fl",
  "ken-caryl-co",
  "lafayette-co",
  "lakeside-fl",
  "lakewood-co",
  "little-river-sc",
  "littleton-co",
  "lone-tree-co",
  "longs-sc",
  "loris-sc",
  "louisville-co",
  "meridian-co",
  "middleburg-fl",
  "mill-creek-fl",
  "myrtle-beach-sc",
  "nassau-village-ratliff-fl",
  "nassauville-fl",
  "neptune-beach-fl",
  "nixonville-sc",
  "nocatee-fl",
  "north-myrtle-beach-sc",
  "northglenn-co",
  "oakleaf-plantation-fl",
  "orange-park-fl",
  "palm-valley-fl",
  "ponte-vedra-beach-fl",
  "sawgrass-fl",
  "south-ponte-vedra-beach-fl",
  "st-augustine-beach-fl",
  "st-augustine-fl",
  "st-augustine-shores-fl",
  "st-johns-fl",
  "sterling-ranch-co",
  "stonegate-co",
  "superior-co",
  "switzerland-fl",
  "thornton-co",
  "todd-creek-co",
  "vilano-beach-fl",
  "westminster-co",
  "wheat-ridge-co",
  "world-golf-village-fl"
]);

// Interior municipalities/localities and the recorded boundary anchors. This does not
// extend service to every address using a town's postal name or approve its entire county.
export const GRAND_STRAND_INTERIOR_IDS = new Set([
  'myrtle-beach-sc', 'north-myrtle-beach-sc', 'carolina-forest-sc', 'little-river-sc',
  'longs-sc', 'loris-sc', 'conway-sc', 'burgess-sc', 'socastee-sc', 'red-hill-sc',
  'forestbrook-sc', 'surfside-beach-sc', 'briarcliffe-acres-sc', 'atlantic-beach-sc',
  'nixonville-sc', 'nixons-crossroads-sc', 'arcadian-shores-sc',
  'cherry-grove-beach-sc', 'ocean-drive-beach-sc', 'crescent-beach-sc', 'windy-hill-beach-sc',
  'shallotte-nc', 'calabash-nc', 'carolina-shores-nc', 'sunset-beach-nc', 'ocean-isle-beach-nc',
]);

export function townEligibility(id, data) {
  if (!MARKET_STATES[data.market]?.includes(data.state) || !id.endsWith(`-${data.state?.toLowerCase()}`)) {
    return { eligible: false, reason: 'State, market and town slug must agree.' };
  }
  if (EXISTING_TOWN_IDS.has(id)) {
    const expected = id.endsWith('-co') ? 'denver-metro' : id.endsWith('-fl') ? 'northeast-florida' : 'grand-strand';
    return { eligible: data.market === expected, reason: 'Existing site coverage retained; not a new boundary determination.' };
  }
  if (data.market === 'grand-strand' && GRAND_STRAND_INTERIOR_IDS.has(id)) {
    return { eligible: true, reason: 'Recorded Grand Strand outline anchor or interior locality.' };
  }
  return { eligible: false, reason: 'Resolve service-area eligibility before publishing this locality.' };
}
