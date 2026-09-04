# Timeless Grass & Greens

Website for Timeless Grass & Greens, built by [To The Max Media](https://tothemaxmedia.com).

## Status

Placeholder "coming soon" page. This exists so the repo can be connected to Netlify
for continuous deployment — the real site replaces it.

## Local preview

No build step and no dependencies. Open `index.html` directly, or serve it:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploying

Connected to Netlify. Every push to `main` triggers a deploy.

Netlify build settings (also declared in `netlify.toml`):

| Setting | Value |
| --- | --- |
| Build command | _(none)_ |
| Publish directory | `.` |

## Before launch

- [ ] Replace the placeholder with the real site
- [ ] Remove `Disallow: /` from `robots.txt`
- [ ] Remove `<meta name="robots" content="noindex">` from the page head
- [ ] Point the production domain at Netlify and enable HTTPS
