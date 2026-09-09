#!/usr/bin/env python3
"""Turn the research archive into a typed town data model.

  python3 scripts/extract-towns.py

Reads archive/research/{denver-metro,grand-strand,jacksonville}.json and writes
src/data/cities/{market}.json — one record per town that is worth a page.

This extracts FACTS AND SOURCES, not copy. The research prose is field notes: it shouts in
capitals, argues with itself, and carries explicit caveats ("characterised, not sourced —
verify against the Denver Zoning Code before publishing"). None of it is publishable as
written. Page copy is written from these records in a later step, and any field flagged
`caveat: true` may not be stated as fact without checking the source first.

Exclusions, in the researchers' own words:
  - a name or angle marked THIN / RESEARCH PROBLEM / NOT BUILDING → dropped
  - a neighborhood, former town, or place that straddles a city limit → rolled up
"""
import json, re, pathlib, unicodedata

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'src/data/cities'

MARKETS = [
    ('denver-metro', 'denver-metro.json'),
    ('grand-strand', 'grand-strand.json'),
    ('northeast-florida', 'jacksonville.json'),
]

DROP = re.compile(r'\bTHIN\b|RESEARCH PROBLEM|NOT BUILDING|DO NOT BUILD', re.I)
ROLLUP = re.compile(r'neighborhood|neighbourhood|former town, now within|straddling the city limits'
                    r'|^Springmaid|^Arcadian', re.I)
CAVEAT = re.compile(r'not sourced|unsourced|verify (against|before)|could not (be )?(verif|reach)'
                    r'|unreachable all session|characterised, not', re.I)

# fields worth carrying to a page, in the order a page would use them
FIELDS = ['strongest_angle', 'ordinance_or_hoa', 'water_and_rules', 'soil_and_yard',
          'turf_specifics', 'housing_stock', 'who_lives_there', 'golf',
          'commercial_targets', 'landmarks']

STATE_OF = {'denver-metro': 'CO', 'grand-strand': None, 'northeast-florida': 'FL'}


def slugify(s: str) -> str:
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    s = re.sub(r"[''`]", '', s).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def parse_name(raw: str, market: str):
    """'North Myrtle Beach, SC (Horry County, incorporated city)' → name, state, county, kind."""
    head = raw.split('(')[0].strip().rstrip(',').strip()
    paren = raw[raw.find('(') + 1:raw.rfind(')')] if '(' in raw else ''
    state = None
    m = re.search(r',\s*([A-Z]{2})\s*$', head)
    if m:
        state, head = m.group(1), head[: m.start()].strip()
    if not state:
        m2 = re.search(r'\b([A-Z]{2})\b', paren)
        state = m2.group(1) if m2 and m2.group(1) in ('SC', 'NC', 'CO', 'FL') else STATE_OF[market]
    county = None
    c = re.search(r'([A-Z][A-Za-z.\s]+?)\s+Count(?:y|ies)', paren)
    if c:
        county = c.group(1).strip()
    kind = 'city'
    low = paren.lower()
    if 'cdp' in low or 'unincorporated' in low:
        kind = 'unincorporated'
    elif 'town' in low:
        kind = 'town'
    return head, state, county, kind


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    grand = {'build': 0, 'rollup': 0, 'drop': 0}
    index = []

    for market, fname in MARKETS:
        src = json.load(open(ROOT / 'archive/research' / fname))
        towns = []
        for blk in src['result']['towns']:
            towns += blk.get('towns', []) if isinstance(blk, dict) and 'towns' in blk else [blk]

        out, seen = [], set()
        for t in towns:
            raw_name = t.get('name', '')
            angle = t.get('strongest_angle', '') or ''
            if DROP.search(raw_name) or DROP.search(angle):
                grand['drop'] += 1
                continue
            if ROLLUP.search(raw_name):
                grand['rollup'] += 1
                continue

            name, state, county, kind = parse_name(raw_name, market)
            slug = slugify(f'{name}-{state}') if state else slugify(name)
            if slug in seen:
                grand['rollup'] += 1
                continue
            seen.add(slug)

            facts, caveats, words = {}, [], 0
            for f in FIELDS:
                v = t.get(f)
                if not isinstance(v, str) or len(v.split()) < 12:
                    continue
                facts[f] = v.strip()
                words += len(v.split())
                if CAVEAT.search(v):
                    caveats.append(f)

            sources = [s for s in (t.get('sources') or []) if isinstance(s, str) and s.startswith('http')]
            if words < 250 or len(facts) < 3:
                grand['rollup'] += 1
                continue

            out.append({
                'slug': slug, 'name': name, 'state': state, 'county': county,
                'kind': kind, 'market': market,
                'research_words': words,
                'facts': facts,
                'caveat_fields': caveats,
                'sources': sources,
            })

        out.sort(key=lambda r: -r['research_words'])
        (OUT / f'{market}.json').write_text(json.dumps(out, indent=1, ensure_ascii=False))
        grand['build'] += len(out)
        srcs = [len(r['sources']) for r in out]
        w = sorted(r['research_words'] for r in out)
        print(f'{market:20} {len(out):3} towns  '
              f'research words min {w[0]} / median {w[len(w)//2]} / max {w[-1]}  '
              f'sources median {sorted(srcs)[len(srcs)//2]}')
        index.append({'market': market, 'count': len(out)})

    print(f'\nBUILD {grand["build"]} town pages · rolled up {grand["rollup"]} · dropped {grand["drop"]}')
    print(f'written to {OUT.relative_to(ROOT)}/')
    flagged = 0
    for market, _ in MARKETS:
        for r in json.load(open(OUT / f'{market}.json')):
            flagged += len(r['caveat_fields'])
    print(f'{flagged} field(s) carry a research caveat and must be checked before being stated as fact')


if __name__ == '__main__':
    main()
