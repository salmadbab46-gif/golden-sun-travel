# The Golden Sun Travel

Multi-page static website for The Golden Sun Travel — quad adventures, camel rides,
a desert day pool, and a Moroccan dinner, traditional music & fire show in the
Agafay Desert near Marrakech.

No build step. No framework. Plain HTML/CSS/JS, deployed straight to GitHub Pages.

## Folder structure

```
/index.html                          → condensed home: hero, intro, 4 experience teasers, build-your-experience preview, final CTA
/experiences/index.html              → all 4 experiences as cards
/experiences/quad-adventure.html
/experiences/camel-ride.html
/experiences/day-pool.html
/experiences/dinner-fire-show.html
/build-your-experience.html          → interactive experience selector
/about.html                          → story, why us, journey (Marrakech → Agafay), testimonials
/gallery.html                        → full real photo set
/faq.html
/contact.html
/booking.html                        → reservation form + WhatsApp

/assets/css/style.css                → all styles, one shared stylesheet
/assets/js/main.js                   → shared JS (partial loading, nav, FAQ accordion, forms, animations)
/assets/images/{quad,camel,pool,dinner-fire,logo}/  → real activity photography

/partials/nav.html                   → shared header, fetched into every page
/partials/mobile-sticky.html         → shared mobile booking bar
/partials/footer.html                → shared footer
/partials/svg-sprite.html            → shared icon set (sun, dunes, palm, camel, lantern, etc.)

/site.config.js                      → single editable source for business/contact info
```

Every page fetches the three partials and the icon sprite at load time and injects them
into placeholder `<div>`s (`#nav-placeholder`, `#mobile-sticky-placeholder`,
`#footer-placeholder`, `#svg-sprite-placeholder`). Edit `partials/nav.html` once and
every page picks it up — no need to touch each page individually.

Partial links use a `{{ROOT}}` token that `main.js` replaces with `""` on root-level
pages or `"../"` on pages nested under `/experiences/`, so the same partial works from
any folder depth. Each page declares its own depth via `window.SITE_ROOT` in an inline
`<script>` tag before `main.js` loads.

## No pricing anywhere

There is no price display or pricing logic on this site by design — not on experience
cards, not in Build Your Own Experience, not on the Golden Sun Experience package card,
and not in the booking form/summary. Everything else from the original design (copy,
tags, duration, included/not-included, the WhatsApp integration) is intact.

## Photography

Real activity photos live under `assets/images/<activity>/`, one folder per experience
(`quad`, `camel`, `pool`, `dinner-fire`) plus `logo/` for the brand mark. Each folder has
a `hero.*` (used on the experience detail page, homepage teaser and Build Your Experience
picker) and a handful of `gallery-*` images (used on the experience detail page and on
`/gallery.html`). The homepage hero's animated illustrated sky (sun, camels, dunes,
stars) is a deliberate atmospheric layer, not a placeholder — it's kept even though real
photography is used everywhere else.

## Local preview

From the project root:

```
python3 -m http.server
```

Then open `http://localhost:8000`. A build step isn't needed, but the partials are
loaded via `fetch()`, which requires an actual HTTP server — opening the HTML files
directly from disk (`file://`) will not load the nav/footer/sprite.

## Editing business info

Open `site.config.js` at the project root. It's the single source of truth for:

- WhatsApp number, phone, email, Instagram, Facebook
- Location string
- Each experience's name, duration, tags, description and included/not-included lists

Change a value there and it updates everywhere the site reads it (nav, footer, WhatsApp
message templates, contact page, the Build Your Experience picker).

## Making changes (ongoing workflow)

This site is meant to keep being edited live via Claude Code:

1. Run Claude Code inside this cloned repo.
2. Describe the change you want in plain language (e.g. "update the WhatsApp number" or
   "add a fifth gallery photo to the camel ride page"). Thanks to the shared partials,
   most nav/footer/contact-info changes touch only `site.config.js` or one partial file.
3. Commit and push:
   ```
   git add -A
   git commit -m "describe the change"
   git push
   ```
4. GitHub Pages picks it up automatically — a push is a deploy, no separate deploy step.

For a risky or large change, open a pull request (`gh pr create`) and merge after review
instead of pushing straight to `main`. For routine content edits on a static site like
this, pushing directly to `main` is fine.
