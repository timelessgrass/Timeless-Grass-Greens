#!/usr/bin/env python3
"""Built-site integrity checks: no broken routes, orphaned pages or buried content.

  python3 scripts/check-links.py dist

Word counts are editorial diagnostics. They cannot establish whether a page is useful,
original or factually supported; those decisions belong to content review.

Four rules, all measured on the built HTML:

  LENGTH-1 optional short-page review hint, enabled with --min-words; never fails a build
  ORPHAN-1 an indexable page with no inbound <a href> from any other page
  DEPTH-1  an indexable page more than N clicks from / (default 3)
  BROKEN-1 an internal href that resolves to no built file

noindex pages (/404/, /thanks/) are exempt from length hints, ORPHAN-1 and DEPTH-1 by design:
they are utility routes, deliberately unlinked and deliberately out of the sitemap.

Sitewide chrome (header, menu panel, footer) links every page from every page, which would
make ORPHAN-1 and DEPTH-1 vacuous. So both are measured on <main> links ONLY — a page has
to be reachable through the body of another page, not merely listed in the footer.
"""
import sys, re, html, json, pathlib, argparse
from collections import deque

VOID_HOSTS = re.compile(r'^(https?:)?//|^(mailto|tel|sms|javascript):', re.I)


def visible_main(raw):
    m = re.search(r'(?is)<main\b[^>]*>(.*?)</main>', raw)
    seg = m.group(1) if m else raw
    seg = re.sub(r'(?is)<(script|style|noscript|template)\b.*?</\1>', ' ', seg)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'(?s)<[^>]+>', ' ', seg))).strip()


def main_links(raw):
    """hrefs inside <main> only — chrome links do not count as editorial links."""
    m = re.search(r'(?is)<main\b[^>]*>(.*?)</main>', raw)
    if not m:
        return []
    return re.findall(r'<a\b[^>]*\bhref="([^"]+)"', m.group(1), re.I)


def all_links(raw):
    return re.findall(r'<a\b[^>]*\bhref="([^"]+)"', raw, re.I)


def route_of(path, root):
    rel = path.relative_to(root).as_posix()
    if rel == 'index.html':
        return '/'
    if rel.endswith('/index.html'):
        return '/' + rel[: -len('/index.html')] + '/'
    return '/' + rel[: -len('.html')]


def normalise(href, origin_host):
    """Return a site-root path, or None when the link leaves the site."""
    href = href.split('#')[0].split('?')[0]
    if not href:
        return None
    if href.startswith('//'):
        return None
    if re.match(r'^(mailto|tel|sms|javascript):', href, re.I):
        return None
    if re.match(r'^https?://', href, re.I):
        if origin_host and origin_host in href:
            href = re.sub(r'^https?://[^/]+', '', href) or '/'
        else:
            return None
    if not href.startswith('/'):
        return None
    return href


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('out', nargs='?', default='dist')
    ap.add_argument('--min-words', type=int, default=0, help='Optional editorial length hint; does not fail the build.')
    ap.add_argument('--max-depth', type=int, default=3)
    ap.add_argument('--warn-only', action='store_true')
    a = ap.parse_args()

    root = pathlib.Path(a.out)
    if not root.is_dir():
        print(f'error: {a.out} is not a directory', file=sys.stderr)
        return 2

    pages = {}
    for f in sorted(root.rglob('*.html')):
        raw = f.read_text(errors='ignore')
        route = route_of(f, root)
        noindex = bool(re.search(r'<meta[^>]+name="robots"[^>]+content="[^"]*noindex', raw, re.I))
        canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', raw, re.I)
        pages[route] = {
            'file': f,
            'words': len(visible_main(raw).split()),
            'noindex': noindex,
            'main_links': main_links(raw),
            'all_links': all_links(raw),
            'canonical': canon.group(1) if canon else None,
        }

    if '/' not in pages:
        print('error: no homepage in the build', file=sys.stderr)
        return 2

    host = None
    if pages['/']['canonical']:
        h = re.match(r'^https?://([^/]+)', pages['/']['canonical'])
        host = h.group(1) if h else None

    indexable = {r for r, p in pages.items() if not p['noindex']}

    def resolve(href):
        p = normalise(href, host)
        if p is None:
            return None
        if p in pages:
            return p
        for cand in (p + '/', p.rstrip('/') + '/', p.rstrip('/')):
            if cand in pages:
                return cand
        return p  # unresolved — reported as broken

    fails, warns = [], []

    # BROKEN-1 — every internal href resolves to a built file
    for route, p in pages.items():
        for href in p['all_links']:
            target = normalise(href, host)
            if target is None:
                continue
            got = resolve(href)
            if got not in pages:
                fails.append(f'BROKEN-1 {route} → {href} (no such page in the build)')

    # ORPHAN-1 / DEPTH-1 — reachability through page BODIES, not chrome
    inbound = {r: set() for r in pages}
    for route, p in pages.items():
        for href in p['main_links']:
            got = resolve(href)
            if got in pages and got != route:
                inbound[got].add(route)

    depth = {'/': 0}
    q = deque(['/'])
    while q:
        cur = q.popleft()
        for href in pages[cur]['main_links']:
            got = resolve(href)
            if got in pages and got not in depth:
                depth[got] = depth[cur] + 1
                q.append(got)

    for route in sorted(indexable):
        p = pages[route]
        if p['words'] < a.min_words:
            warns.append(f'LENGTH-1 {route} — {p["words"]} words in <main>; review usefulness, not padding')
        if route != '/' and not inbound[route]:
            fails.append(f'ORPHAN-1 {route} — no inbound link from the body of any page')
        d = depth.get(route)
        if d is None:
            warns.append(f'DEPTH-1 {route} — unreachable from / through page bodies')
        elif d > a.max_depth:
            fails.append(f'DEPTH-1 {route} — {d} clicks from /, max is {a.max_depth}')

    n_thin = sum(1 for r in indexable if pages[r]['words'] < a.min_words)
    words = [pages[r]['words'] for r in indexable]
    words.sort()
    print(f'{len(pages)} pages · {len(indexable)} indexable · '
          f'words in <main>: min {words[0]}, median {words[len(words)//2]}, max {words[-1]}')
    if a.min_words:
        print(f'{n_thin} below the optional {a.min_words}-word review threshold\n')

    for f_ in fails:
        print(f'  x FAIL {f_}')
    for w in warns:
        print(f'  ! WARN {w}')
    if fails:
        print(f'\nBUILD CHECK FAILED: {len(fails)} route or navigation failure(s).')
        return 0 if a.warn_only else 1
    print(f'\nSCALE OK ({len(warns)} warnings)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
