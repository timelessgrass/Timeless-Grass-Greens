#!/usr/bin/env python3
"""Brand + component board, generated from the real thing.

  python3 scripts/build-board.py [out.html]

Pulls every section and component out of the DEV-rendered pages (so photo slots
show as slots), inlines the source CSS, and lays them out with class-name labels.
Never part of the site build. Regenerate after any CSS or template change.
"""
import re, sys, base64, pathlib, urllib.request
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEV = 'http://localhost:4321'
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

def fetch(path):
    return urllib.request.urlopen(DEV + path, timeout=20).read().decode()

class Idx(HTMLParser):
    """Records (start_offset, end_offset, attrs) for every element, by walking a stack."""
    def __init__(self): super().__init__(); self.stack=[]; self.els=[]
    def handle_starttag(self, tag, attrs):
        pos = self.getpos(); off = self._off(pos)
        if tag in VOID: return
        self.stack.append((tag, off, dict(attrs)))
    def handle_startendtag(self, tag, attrs): pass
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                t, off, attrs = self.stack.pop(i)
                end = self._off(self.getpos()); end = self.raw.index('>', end) + 1
                self.els.append((off, end, t, attrs)); break
    def _off(self, pos):
        line, col = pos; return self.lineoff[line-1] + col
    def run(self, raw):
        self.raw = raw; self.lineoff=[0]
        for i,ch in enumerate(raw):
            if ch == '\n': self.lineoff.append(i+1)
        self.feed(raw); return self

def clean(s):
    s = re.sub(r'\s+data-astro-source-(?:file|loc)="[^"]*"', '', s)
    s = re.sub(r'\s+data-reveal(?:="[^"]*")?', '', s)
    s = re.sub(r'<p[^>]*>Build note:[^<]*</p>', '', s)
    s = re.sub(r'<(div|figcaption|p|span) class="fig__stock"[^>]*>.*?</\1>', '', s, flags=re.S)
    s = re.sub(r'\ssrc="https://images\.pexels\.com[^"]*"', ' src="' + PH + '"', s)
    s = re.sub(r'\sloading="lazy"', '', s)
    return s

PH = "data:image/svg+xml;utf8," + urllib.parse.quote("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'><rect width='3' height='2' fill='#2a5316'/><rect width='3' height='2' fill='url(#s)'/><defs><pattern id='s' width='.3' height='.3' patternUnits='userSpaceOnUse' patternTransform='rotate(-20)'><rect width='.15' height='.3' fill='#F2F0E8' opacity='.06'/></pattern></defs></svg>")

def elements(raw):
    return Idx().run(raw)

def first(idx, pred):
    c = [e for e in idx.els if pred(e)]
    c.sort(key=lambda e: e[0]); return c[0] if c else None

def has_class(attrs, tok):
    return tok in (attrs.get('class') or '').split()

def outer(raw, e): return clean(raw[e[0]:e[1]])

def child_of(raw, idx, parent_tok, tag):
    par = first(idx, lambda e: has_class(e[3], parent_tok))
    if not par: return ''
    kid = first(idx, lambda e: e[2]==tag and e[0] > par[0] and e[1] < par[1])
    return outer(raw, kid) if kid else ''

def by_class(raw, idx, tok, tag=None):
    e = first(idx, lambda e: has_class(e[3], tok) and (tag is None or e[2]==tag))
    return outer(raw, e) if e else ''

def sections(raw, idx):
    """Top-level <section> elements inside <main>, in order."""
    main = first(idx, lambda e: e[2]=='main')
    secs = [e for e in idx.els if e[2]=='section' and e[0]>main[0] and e[1]<main[1]]
    secs.sort(key=lambda e: e[0])
    top = [s for s in secs if not any(o[0] < s[0] and o[1] > s[1] for o in secs)]
    return top

def label(cls, name, rule=''):
    return f'<div class="bd-label"><code>{cls}</code><b>{name}</b><span>{rule}</span></div>'

def frame(inner, cls, name, rule='', full=False, wide=False):
    k = ' bd-frame--full' if full else (' bd-frame--wide' if wide else '')
    return f'<figure class="bd-frame{k}">{label(cls, name, rule)}<div class="bd-stage">{inner}</div></figure>'

# ---------- pull pages
home, hub, svc, guide, sidx = (fetch(p) for p in ['/', '/denver-metro/', '/services/putting-greens/', '/guides/colorado-turf-law/', '/services/'])
H, U, V, G, I = (elements(x) for x in (home, hub, svc, guide, sidx))
hs = sections(home, H); us = sections(hub, U); vs = sections(svc, V); gs = sections(guide, G); is_ = sections(sidx, I)

def sec_named(raw, secs, tok):
    for e in secs:
        if tok in raw[e[0]:e[1]]: return outer(raw, e)
    return ''

# ---------- tokens
css = ''.join((ROOT/'src/styles'/f).read_text() for f in ['tokens.css','base.css','components.css'])
logo = base64.b64encode((ROOT/'src/assets/brand/logo.png').read_bytes()).decode()

colors = [('--ground','#EFEDE7','chalk · page'),('--ground-band','#E7E4DC','band · alternate sections'),('--ink','#15150F','ink · text 1 / .68 / .56'),
          ('--accent','#307408','accent · buttons, links, dots'),('--accent-hover','#245A05','hover · deeper'),('--ground-dark','#0E0E0C','dark · hero, gallery, close'),
          ('--ground-green','#16330C','deep green · bands'),('--accent-on-dark','#8ACF35','bright green · text on dark only'),('--ink-on-dark','#F2F0E8','warm white · text on dark')]
sw = ''.join(f'<li><i style="background:{h}"></i><code>{v}</code><code>{h}</code><span>{u}</span></li>' for v,h,u in colors)
type_ramp = '''
<div class="bd-type">
  <div><span class="bd-k">h1 · Newsreader 500 · clamp(2.35rem, 8.5vw, 5.1rem) · −.022em</span><h1>Greens that roll true.</h1></div>
  <div><span class="bd-k">h2 · clamp(1.85rem, 5.4vw, 3.4rem)</span><h2>Anything that&rsquo;s turf.</h2></div>
  <div><span class="bd-k">h3 · clamp(1.2rem, 2.6vw, 1.6rem) · −.012em</span><h3>Roll is built underneath</h3></div>
  <div><span class="bd-k">number · Newsreader · −.035em · tabular</span><p class="bd-num">13 &middot; 2024 &middot; 3</p></div>
  <div><span class="bd-k">body · Instrument Sans 400 · 16px / 1.6</span><p class="bd-body">Artificial turf and backyard putting greens — installed, not sold from a catalog. Denver metro, the Grand Strand, northeast Florida.</p></div>
  <div><span class="bd-k">micro · 600 · .69rem · +.24em · uppercase</span><p class="micro">Prove it before I read</p></div>
  <div><span class="bd-k">button · 600 · 1rem · sentence case</span><p style="font-weight:600">Get a written number</p></div>
</div>'''
shape_row = '''
<ul class="bd-shapes">
  <li><span class="bd-r" style="border-radius:var(--radius-pill);width:120px;height:44px"></span><code>--radius-pill 999px</code><span>every button</span></li>
  <li><span class="bd-r" style="border-radius:var(--radius-card)"></span><code>--radius-card 1.1rem</code><span>cards · photos · form panel</span></li>
  <li><span class="bd-r" style="border-radius:var(--radius-input);height:48px"></span><code>--radius-input 8px</code><span>inputs · selects</span></li>
  <li><span class="bd-r" style="border-radius:0"></span><code>--radius 0</code><span>sections · bands · rules · header</span></li>
</ul>'''
motion = '''
<ul class="bd-kv">
  <li><code>--ease</code><span>cubic-bezier(.16, 1, .3, 1) — the only curve</span></li>
  <li><code>--dur</code><span>.62s</span></li>
  <li><code>[data-reveal] → .is-in</code><span>rise 28px, once, on enter (CSS transition)</span></li>
  <li><code>.hero--home</code><span>intro plays once on load</span></li>
  <li><code>.proc</code><span>pinned ≥900px, scroll advances steps</span></li>
  <li><code>.wipe</code><span>after wipes over before on scroll</span></li>
  <li><code>.strip__track</code><span>drifts on wide+pointer · native swipe on touch</span></li>
  <li><code>prefers-reduced-motion</code><span>everything at rest</span></li>
</ul>'''
spacing = '''
<ul class="bd-kv">
  <li><code>--wrap</code><span>1240px</span></li>
  <li><code>--bleed</code><span>clamp(1.15rem, 5vw, 5.5rem) · page edge</span></li>
  <li><code>--gut</code><span>clamp(1.15rem, 4vw, 2.5rem)</span></li>
  <li><code>.sec</code><span>padding-block clamp(3.4rem, 8vw, 6.5rem)</span></li>
  <li><code>--measure</code><span>62ch</span></li>
  <li><code>tap target</code><span>≥ 44px · inputs ≥ 16px text</span></li>
  <li><code>--shadow-float</code><span>0 18px 40px rgba(14,14,12,.35) · hero badge only</span></li>
</ul>'''

# ---------- components (small)
def comp(raw, idx, tok, name, rule='', tag=None, dark=False, wrap=None, wide=False, full=False):
    m = by_class(raw, idx, tok, tag)
    if not m: return ''
    if wrap: m = wrap % m
    inner = m if not dark else f'<div class="bd-dark on-dark">{m}</div>'
    return frame(inner, '.'+tok, name, rule, full=full, wide=wide)

small = ''.join([
    frame('<a class="btn btn--primary" href="#">Call 303-349-2368</a> <a class="btn btn--primary bd-hover" href="#">Call 303-349-2368</a>', '.btn--primary', 'Primary button', 'rest · hover'),
    frame('<a class="btn btn--ghost" href="#">Get a written number</a> <a class="btn btn--ghost bd-hover" href="#">Get a written number</a>', '.btn--ghost', 'Ghost button', 'rest · hover'),
    frame('<div class="bd-dark on-dark"><a class="btn btn--primary" href="#">Call 303-349-2368</a> <a class="btn btn--ghost" href="#">Get a written number</a></div>', '.on-dark .btn', 'Buttons on dark', ''),
    frame('<a class="btn btn--primary btn--lg" href="#">Request a quote</a>', '.btn--lg', 'Large button', 'form submit, close'),
    comp(home, H, 'hero__eyebrow', 'Hero eyebrow', 'pill, blurred', dark=True),
    comp(home, H, 'hero__badge', 'Hero badge', '≥1180px only', wrap='<div class="bd-dark on-dark bd-badge">%s</div>'),
    comp(hub, U, 'crumbs', 'Breadcrumbs', '44px targets', dark=True),
    comp(home, H, 'micro', 'Micro label', '', tag='p'),
    comp(home, H, 'num', 'Number tile', 'true numbers only', wrap='<div class="nums bd-one">%s</div>'),
    comp(home, H, 'card', 'Card', 'chalk', wrap='<div class="cards bd-one">%s</div>'),
    frame('<div class="bd-dark on-dark"><div class="cards bd-one">' + by_class(home, H, 'card') + '</div></div>', '.on-dark .card', 'Card on dark', ''),
    comp(hub, U, 'svc', 'Service card', 'links', wrap='<div class="svcs bd-one">%s</div>'),
    frame('<ul class="idx bd-one">' + child_of(sidx, I, 'idx', 'li') + '</ul>', '.idx > li', 'Index card', ''),
    comp(home, H, 'fig', 'Figure', 'photo slot · 18px', wrap='<div class="bd-fig">%s</div>'),
    frame('<figure class="fig fig--pending" style="--ratio:3/2"><div class="fig__slot"><p class="fig__kind">Finished</p><p class="fig__brief">Finished putting green, wide. Blown clean before the shutter.</p><p class="fig__id">fin-1</p></div></figure>', '.fig--pending', 'Figure, awaiting photo', 'dev only'),
    comp(home, H, 'qa', 'FAQ item', 'native details', wrap='<div class="faq bd-one">%s</div>'),
    comp(home, H, 'fld', 'Form field', '48px · 16px text', wrap='<form class="quote__form bd-one">%s</form>'),
    comp(home, H, 'quote__note', 'Form note', ''),
    comp(home, H, 'answer-box', 'Answer box', 'AEO · speakable', wide=True),
    comp(hub, U, 'towns', 'Towns list', '', wide=True),
    comp(hub, U, 'proof__note', 'Proof note', ''),
    comp(guide, G, 'srcs', 'Sources list', '44px links', wide=True),
    comp(guide, G, 'disclaim', 'Legal disclaimer', '', wide=True),
    comp(hub, U, 'law', 'Law band content', '', dark=True, wide=True),
    comp(home, H, 'wipe', 'Before / after', 'mid-wipe shown', wide=True),
    comp(home, H, 'proc__step', 'Process step', 'dimmed until scrolled to', dark=True),
    comp(home, H, 'diff', 'Differentiator', 'ruled list, not a card', dark=True),
    comp(home, H, 'hero__steps', 'Hero steps', '', dark=True, wide=True),
    comp(home, H, 'mkts', 'Market cards', '', wrap='<div class="bd-one">%s</div>', wide=True),
])

# ---------- chrome + sections (full width)
chrome = ''.join([
    frame(by_class(home, H, 'util'), '.util', 'Utility bar', 'markets · founder · phone; phones: markets only', full=True),
    frame(by_class(home, H, 'chrome'), '.chrome', 'Header', 'sticky · blur', full=True),
    frame(by_class(home, H, 'bar'), '.bar', 'Sticky call bar', 'phones only · fixed bottom', full=True),
])
def secframes(raw, secs, names):
    out=[]
    for e in secs:
        html = outer(raw, e); cls = '.' + ' .'.join((e[3].get('class') or '').split())
        m = re.search(r'<p class="micro[^"]*"[^>]*>(.*?)</p>', html); h = re.search(r'<h[12][^>]*>(.*?)</h[12]>', html, re.S)
        name = re.sub('<[^>]+>','', (m.group(1) if m else (h.group(1) if h else ''))).strip()
        out.append(frame(html, cls, name, '', full=True))
    return ''.join(out)
home_secs = secframes(home, hs, {})
hub_only = ''.join(frame(outer(hub, e), '.' + ' .'.join((e[3].get('class') or '').split()), n, '', full=True)
                   for e, n in [(x, y) for x in us for y in ['']] if any(t in hub[e[0]:e[1]] for t in ['law', 'towns', 'proof__grid']))
_g = [e for e in gs if any(t in guide[e[0]:e[1]] for t in ['doc__', 'srcs', 'disclaim'])]
_pick = []
for e in _g:
    body = guide[e[0]:e[1]]
    if 'srcs' in body or 'disclaim' in body or not _pick: _pick.append(e)
guide_only = ''.join(frame(outer(guide, e), '.' + ' .'.join((e[3].get('class') or '').split()), '', '', full=True) for e in _pick[:3])
hero_sub = frame(by_class(hub, U, 'hero'), '.hero.hero--sub', 'Sub-page hero', 'compact · dark · photo optional', full=True)
foot = frame(by_class(home, H, 'foot', 'footer'), '.foot', 'Footer', 'full directory', full=True)

board = f'''<title>TIMELESS Brand and Component Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Instrument+Sans:wght@400;500;600&display=swap">
<style>
{css}
/* ---- board chrome (bd-*) — never ships ---- */
html {{ background: var(--ground); color-scheme: light; }}
body {{ background: var(--ground); }}
.bd-head {{ background: var(--ground-dark); color: var(--ink-on-dark); padding: 1.4rem var(--bleed); display: flex; flex-wrap: wrap; gap: .6rem 2rem; align-items: baseline; }}
.bd-head h1 {{ font-size: 1.5rem; color: var(--ink-on-dark); margin: 0; }}
.bd-head img {{ height: 40px; width: auto; }}
.bd-head span {{ font-size: .8rem; color: var(--ink-on-dark-faint); }}
.bd-h {{ padding: 2.2rem var(--bleed) .6rem; display: flex; align-items: baseline; gap: 1rem; border-top: 1px solid var(--rule); }}
.bd-h h2 {{ font-size: 1.4rem; margin: 0; }} .bd-h span {{ font-size: .8rem; color: var(--ink-faint); }}
.bd-grid {{ display: grid; gap: 1.2rem; padding: 1rem var(--bleed) 2rem; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); align-items: start; }}
.bd-frame {{ margin: 0; border: 1px solid var(--rule); border-radius: 0; background: var(--ground-band); overflow: hidden; }}
.bd-frame--full {{ grid-column: 1 / -1; }} @media (min-width: 700px) {{ .bd-frame--wide {{ grid-column: span 2; }} }}
.bd-dark .crumbs, .bd-dark .crumbs a {{ color: var(--ink-on-dark-faint); }}
.bd-label {{ display: flex; gap: .8rem; align-items: baseline; padding: .5rem .8rem; background: var(--ground-band); border-bottom: 1px solid var(--rule); font-size: .76rem; color: var(--ink-faint); }}
.bd-label code {{ color: var(--accent); font-size: .74rem; }} .bd-label b {{ color: var(--ink); font-weight: 600; }}
.bd-stage {{ padding: 1.2rem; background: var(--ground); }}
.bd-frame--full .bd-stage {{ padding: 0; }}
.bd-dark {{ background: var(--ground-dark); padding: 1.2rem; }} .bd-badge .hero__badge {{ position: static; }}
.bd-hover.btn--primary {{ background: var(--accent-hover); }} .bd-hover.btn--ghost {{ border-color: var(--accent); color: var(--accent); }}
.bd-one {{ display: block; }} .bd-one > * {{ margin: 0; }} .bd-fig {{ max-width: 360px; }}
.bd-sw {{ list-style: none; margin: 0; padding: 1rem var(--bleed) 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 1rem; }}
.bd-sw li {{ display: grid; gap: .1rem; font-size: .78rem; color: var(--ink-dim); }} .bd-sw i {{ display: block; aspect-ratio: 5/3; border: 1px solid var(--rule); border-radius: var(--radius-card); margin-bottom: .4rem; }}
.bd-sw code {{ font-size: .74rem; color: var(--ink); }} .bd-sw code + code {{ color: var(--ink-dim); }}
.bd-type {{ display: grid; gap: 1.4rem; padding: 1rem var(--bleed) 2rem; max-width: 900px; }}
.bd-type > div {{ display: grid; gap: .3rem; }} .bd-k {{ font-family: ui-monospace, Menlo, monospace; font-size: .72rem; color: var(--ink-faint); }}
.bd-num {{ font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 4rem); letter-spacing: -.035em; line-height: 1; font-variant-numeric: tabular-nums; }}
.bd-body {{ max-width: 62ch; color: var(--ink-dim); }}
.bd-shapes {{ list-style: none; margin: 0; padding: 1rem var(--bleed) 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.2rem; }}
.bd-shapes li {{ display: grid; gap: .3rem; font-size: .78rem; color: var(--ink-dim); }} .bd-r {{ display: block; width: 100%; height: 90px; background: var(--ground-band); border: 1px solid var(--rule); margin-bottom: .3rem; }}
.bd-kv {{ list-style: none; margin: 0; padding: 1rem var(--bleed) 2rem; display: grid; gap: .4rem; max-width: 760px; }}
.bd-kv li {{ display: grid; grid-template-columns: 14rem 1fr; gap: 1rem; font-size: .84rem; color: var(--ink-dim); border-bottom: 1px solid var(--rule); padding: .45rem 0; }} .bd-kv code {{ color: var(--ink); }}
.bd-tex {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; padding: 1rem var(--bleed) 2rem; }}
.bd-tex > div {{ min-height: 150px; display: grid; align-content: end; padding: 1rem; font-size: .76rem; }} .bd-tex code {{ color: var(--accent-on-dark); }}
.bd-logo {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; padding: 1rem var(--bleed) 2rem; }}
.bd-logo div {{ display: grid; place-items: center; padding: 2rem; border: 1px solid var(--rule); }}
:root {{ --logo: url("data:image/png;base64,{logo}"); }}
.bd-logo-img {{ display: block; width: 70%; aspect-ratio: 1062/802; background: var(--logo) center / contain no-repeat; }}
/* make scroll-driven states legible at rest */
.bd-stage .chrome, .bd-stage .bar {{ position: static; }}
.bd-stage .hero--home {{ min-height: 640px; }}
.bd-stage .proc__step {{ position: static; }} .bd-stage .proc__steps {{ display: grid; gap: 1.2rem; min-height: 0; }}
@media (min-width: 900px) {{ .bd-stage .proc__steps {{ grid-template-columns: repeat(2, 1fr); }} }}
.bd-stage .proc__fill {{ transform: scaleX(.5); }}
.bd-stage .wipe__after {{ clip-path: inset(0 50% 0 0); }} .bd-stage .wipe__line {{ left: 50%; }}
.bd-stage .strip__track {{ transform: none; }}
</style>
<header class="bd-head"><span class="bd-logo-img" role="img" aria-label="TIMELESS Grass &amp; Greens" style="height:40px;width:53px"></span><h1>Brand and component board</h1><span>v1 · 2026-09-08 · generated from the site's own CSS and templates · scripts/build-board.py</span></header>

<div class="bd-h"><h2>Logo</h2><span>transparent PNG 1062×802 · vector still wanted for print</span></div>
<div class="bd-logo"><div style="background:var(--ground)"><span class="bd-logo-img"></span></div><div style="background:#fff"><span class="bd-logo-img"></span></div><div style="background:var(--ground-dark)"><span class="bd-logo-img"></span></div><div style="background:var(--ground-green)"><span class="bd-logo-img"></span></div></div>

<div class="bd-h"><h2>Color</h2><span>one accent · gold lives in the logo only</span></div>
<ul class="bd-sw">{sw}</ul>
<div class="bd-tex">
  <div class="mown-stripe mown-stripe--dark on-dark" style="background:var(--ground-dark)"><code>.mown-stripe--dark</code><span style="color:var(--ink-on-dark-dim)">on dark · drifts on scroll</span></div>
  <div class="mown-stripe mown-stripe--dark on-dark" style="background:var(--ground-green)"><code>.sec--green .mown-stripe--dark</code><span style="color:var(--ink-on-dark-dim)">on deep green</span></div>
  <div style="background:var(--ground-band);color:var(--ink)"><hr class="rule-ribbon" style="width:100%;margin:0 0 .6rem"><code style="color:var(--accent)">.rule-ribbon · --ribbon</code><span style="color:var(--ink-dim)">2px rule · progress fill only</span></div>
</div>

<div class="bd-h"><h2>Type</h2><span>Newsreader 400/500/600 · Instrument Sans 400/500/600 · Google Fonts</span></div>
{type_ramp}

<div class="bd-h"><h2>Shape</h2><span>four radii, fixed at the token</span></div>
{shape_row}

<div class="bd-h"><h2>Spacing</h2></div>
{spacing}

<div class="bd-h"><h2>Motion</h2></div>
{motion}

<div class="bd-h"><h2>Components</h2><span>real markup · real CSS</span></div>
<div class="bd-grid">{small}</div>

<div class="bd-h"><h2>Chrome</h2></div>
<div class="bd-grid">{chrome}</div>

<div class="bd-h"><h2>Sections · homepage</h2><span>in page order</span></div>
<div class="bd-grid">{home_secs}</div>

<div class="bd-h"><h2>Sections · market hub</h2></div>
<div class="bd-grid">{hero_sub}{hub_only}</div>

<div class="bd-h"><h2>Sections · guide</h2></div>
<div class="bd-grid">{guide_only}</div>

<div class="bd-h"><h2>Footer</h2></div>
<div class="bd-grid">{foot}</div>
'''
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT/'docs/board.html'
out.write_text(board)
print(f'{out} · {len(board)//1024} KB · home sections {len(hs)} · hub {len(us)} · guide {len(gs)}')
