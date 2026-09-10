#!/usr/bin/env python3
"""Consistency gate against DESIGN.md. Runs on the built HTML + source CSS. Exit 1 on any fail.

BTN-1    every .btn is a pill               HERO-1   .hero is dark
STRIPE-1 no light stripe on a dark hero     RHYTHM-1 no two adjacent sections share a ground (warn)
CTA-1    every data-cta link is a styled control
INLINE-1 no inline hex colours or radius    EASE-1   exactly one cubic-bezier in CSS
"""
import re, sys, pathlib
root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'dist')
# Sorted: glob order is whatever the filesystem returns, which differs between macOS and the
# Linux build image. The gate passed locally and failed on Netlify for exactly that reason.
css = ' '.join(p.read_text() for p in sorted(pathlib.Path('src/styles').glob('*.css')))
fails, warns = [], []

def own(selector):
    r"""Bodies of every rule whose selector list contains EXACTLY `selector`.

    The previous check was re.search(r'\.btn \{'), which also matches the tail of
    '.menu__cta .btn {'. Which rule it landed on then depended on file order: components.css
    first (macOS) found the real .btn and passed; base.css first (Linux) found the menu
    override, saw no radius, and failed every Netlify build from 8 Sep onward."""
    flat = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    return [body for sel, body in re.findall(r'([^{}]+)\{([^{}]*)\}', flat)
            if selector in [x.strip() for x in sel.split(',')]]

if not any('var(--radius-pill)' in b for b in own('.btn')): fails.append('BTN-1 .btn is not a pill')
if not any('var(--ground-dark)' in b for b in own('.hero')): fails.append('HERO-1 .hero is not dark')
if css.count('cubic-bezier(') != 1: fails.append(f'EASE-1 {css.count("cubic-bezier(")} cubic-bezier curves in CSS (must be 1)')

def ground(cls):
    s = cls.split()
    if 'hero' in s or 'sec--dark' in s or 'doc__head' in s: return 'dark'
    if 'sec--green' in s or 'proc' in s: return 'green'
    if 'sec--band' in s or 'sec--stone' in s: return 'band'
    return 'ground'

for html in sorted(root.rglob('index.html')):
    rel = str(html.relative_to(root)); h = html.read_text(errors='ignore')
    secs = re.findall(r'<(?:section|header|div)\b[^>]*class="([^"]*)"', h)
    secs = [c for c in secs if any(x in c.split() for x in ('sec', 'hero', 'doc__head', 'strip')) and 'doc__sec' not in c.split()]
    for c in secs:
        s = c.split()
        if ('hero' in s or 'doc__head' in s) and 'turf-marks' in s and 'turf-marks--dark' not in s:
            fails.append(f'STRIPE-1 {rel}: light stripe on a dark hero')
    g = [ground(c) for c in secs]
    for i in range(1, len(g)):
        if g[i] == g[i-1]: warns.append(f'RHYTHM-1 {rel}: sections {i}/{i+1} both "{g[i]}"')
    for tag in re.findall(r'<a\b[^>]*>', h):
        cta = re.search(r'data-cta="([^"]*)"', tag); cls = re.search(r'class="([^"]*)"', tag)
        if not cta: continue
        c = cls.group(1).split() if cls else []
        ok = any(x in c for x in ('btn', 'bar', 'chrome__tel', 'foot__tel', 'util__tel')) or re.match(r'(svc|market|guide)-', cta.group(1))
        if not ok: fails.append(f'CTA-1 {rel}: data-cta="{cta.group(1)}" is not a styled control')
    for st in re.findall(r'style="([^"]*)"', h):
        if re.search(r'#[0-9a-fA-F]{3,6}\b|border-radius', st) and 'var(' not in st and '--ratio' not in st:
            fails.append(f'INLINE-1 {rel}: inline "{st[:48]}"')

for w in warns: print('  ! WARN', w)
for f in fails: print('  x FAIL', f)
print(f'\n{"CONSISTENT" if not fails else "INCONSISTENT"}: {len(fails)} fail(s), {len(warns)} warn(s) across {len(list(root.rglob("index.html")))} pages')
sys.exit(1 if fails else 0)
