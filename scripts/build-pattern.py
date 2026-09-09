#!/usr/bin/env python3
"""Build the turf-marks tile: line icons from the trade, scattered on a staggered grid.

Six marks — a roll of turf, a cup with the flag in, a grass tuft, a rake, a mound with a
tree, and a circle of infill. Drawn as strokes so one SVG serves both the dark ground and
the deep green, tinted by currentColor at the CSS layer.

The tile is 560x224. Row two carries a mark centred on x=0 and the same mark centred on
x=560, so the seam lands through the middle of one icon and the repeat is invisible.
"""
import urllib.parse, pathlib

W, H = 560, 224

# each icon draws inside roughly a 48x36 box, origin top-left
ICONS = {
 'roll': (
   '<ellipse cx="12" cy="15" rx="9" ry="10.5"/>'
   '<circle cx="12" cy="15" r="3.4"/>'
   '<path d="M12 4.5H31"/><path d="M12 25.5H31"/>'
   '<path d="M31 25.5 46 27.6"/>'
   '<path d="M33.4 25.8v3.1M36.6 26.2v3.1M39.8 26.6v3.1M43 27v3.1M46 27.4v3.1"/>'
 ),
 'cup': (
   '<ellipse cx="22" cy="27" rx="17.5" ry="5.6"/>'
   '<ellipse cx="22" cy="27" rx="4.6" ry="1.7"/>'
   '<path d="M22 27V4"/>'
   '<path d="M22 4.4 35.5 8.4 22 12.4Z"/>'
 ),
 'grass': (
   '<path d="M5 31C7.5 22 8.5 14 6.5 6"/>'
   '<path d="M11 31C12 20 12.5 12 14.5 4.5"/>'
   '<path d="M17 31C17 20 16.6 11 17 4"/>'
   '<path d="M23 31C23 20 25 13 27 6.5"/>'
   '<path d="M29 31C28 22 30.5 15 32.5 8"/>'
 ),
 'rake': (
   '<path d="M3 3 19.5 19.5"/>'
   '<path d="M15 27.5 27.5 15"/>'
   '<path d="M15.6 28.1 12.4 31.3M19.6 24.1 16.4 27.3M23.6 20.1 20.4 23.3M27.6 16.1 24.4 19.3"/>'
 ),
 'mound': (
   '<path d="M2 29C10.5 19.5 27 17.5 45 25"/>'
   '<circle cx="23" cy="10.5" r="6.8"/>'
   '<path d="M23 17.3v6"/>'
 ),
 'infill': (
   '<circle cx="18" cy="18" r="14.6"/>'
   '<circle cx="12" cy="13" r="1.5"/><circle cx="19.5" cy="11" r="1.5"/>'
   '<circle cx="25" cy="16" r="1.5"/><circle cx="11" cy="21" r="1.5"/>'
   '<circle cx="17.5" cy="19" r="1.5"/><circle cx="23" cy="24" r="1.5"/>'
   '<circle cx="14.5" cy="27" r="1.5"/>'
 ),
}

# (icon, x, y) — row one at y=26, row two at y=136, offset by half a step
STEP = 140
PLACED = [
 ('roll',   14,  26), ('cup',   150,  22), ('grass', 300,  20), ('mound', 430,  24),
 ('rake',  -18, 136), ('grass', 108, 134), ('infill',248, 132), ('cup',   378, 130),
 ('mound', 486, 136),
 # the seam pair: same mark, both edges, so the repeat cannot be seen
 ('rake',  542, 136),
]

parts = []
for name, x, y in PLACED:
    parts.append(f'<g transform="translate({x} {y})">{ICONS[name]}</g>')

svg = (
  f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
  f'fill="none" stroke="%%C%%" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
  + ''.join(parts) + '</svg>'
)

def css_url(color: str) -> str:
    """A '#' left literal truncates the URI at the fragment, so encode everything."""
    s = svg.replace('%%C%%', color).replace('"', "'")
    return 'url("data:image/svg+xml,%s")' % urllib.parse.quote(s, safe='')

out = pathlib.Path(__file__).parent
(out / 'turf-marks.svg').write_text(svg.replace('%%C%%', '#8ACF35'))
(out / 'turf-marks-url.txt').write_text(css_url('#FFFFFF'))
print('tile', W, 'x', H, '·', len(PLACED), 'marks ·', len(css_url('#FFFFFF')), 'chars as a data URI')

# a preview page: the pattern on both grounds, beside the old stripes
prev = f'''<!doctype html><meta charset="utf-8"><title>turf marks</title>
<style>
body{{margin:0;font:14px/1.5 -apple-system,sans-serif;background:#EFEDE7;color:#15150F}}
h2{{font:500 15px/1 -apple-system;letter-spacing:.14em;text-transform:uppercase;margin:0;padding:14px 24px;color:#6b6b64}}
.b{{position:relative;isolation:isolate;height:300px;display:grid;place-items:center;overflow:hidden}}
.b::before{{content:"";position:absolute;inset:0;z-index:-1;background-image:{css_url('#FFFFFF')};background-size:560px 224px;opacity:.10}}
.dark{{background:#0E0E0C}} .green{{background:#16330C}}
.b p{{color:#F2F0E8;font-family:Georgia,serif;font-size:34px;margin:0}}
.old{{background:#16330C}}
.old::before{{content:"";position:absolute;inset:0;z-index:-1;opacity:.5;
 background-image:repeating-linear-gradient(97deg,rgba(242,240,232,.05) 0 46px,transparent 46px 92px)}}
</style>
<h2>New — turf marks on dark</h2><div class="b dark"><p>We judge a job by whether the green is clean.</p></div>
<h2>New — turf marks on deep green</h2><div class="b green"><p>You call. We measure.</p></div>
<h2>Old — mown stripes, for comparison</h2><div class="b old"><p>The pattern being replaced</p></div>
'''
(out / 'pattern-preview.html').write_text(prev)
print('preview written')
