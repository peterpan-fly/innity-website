# GitHub Pages

Run `node build.js`, then copy `dist/index.html` to `docs/index.html` and commit changes. Pages serves `/docs` from `main`.

# Innity website · Web v1.1 (pre-Studio): developer hand-off

A single-page site with seven views (home, four service pages, about, contact), a Three.js
particle centrepiece and scroll-driven storytelling. No framework and no build dependencies.

## Run and build

    node build.js          # writes dist/index.html (one self-contained file)

Open `dist/index.html` in a browser, or upload it to any static host. The build stops with a
clear message if a language listed in `config.js` has no content file, or an image is missing.

## Where things live

| To change                 | Edit                          | Notes |
|---------------------------|-------------------------------|-------|
| Any text                  | `src/content.en.js`           | Every word on the site. Keys describe what each string is. |
| Settings and parameters   | `src/config.js`               | Languages, contact form, search description, hero autorotation, particle counts. |
| Images and logos          | `assets/` + `src/images.json` | Replace a file, or point a key at a new file. WebP, AVIF, PNG, JPG, SVG. |
| Colours, type, layout     | `src/style.css`               | Brand tokens are the CSS variables on `:root` at the top. |
| Page structure            | `src/app.js`                  | Section 2 holds the templates, one function per page. |
| 3D centrepiece            | `src/scene.js`                | One formation per pillar in `F`; nucleus icons in `ICONS`. |
| Icons                     | `src/icons.json`              | Inline SVG paths, referenced by name from the content file. |

Run `node build.js` after any change.

## Settings (`src/config.js`)

| Setting                | What it does |
|------------------------|--------------|
| `languages`, `defaultLang` | Languages offered and the one shown first. |
| `form.endpoint`        | Where enquiries are POSTed. Empty = show a copyable summary instead. |
| `form.method`, `form.headers` | Request details for the endpoint. |
| `seo.description`      | Text for search results and link previews. |
| `hero.autoplay`        | `enabled`, and timings in milliseconds: `first` (default sphere), `step` (each pillar), `idle` (resume after a selection sits untouched), `resume` (resume after the pointer leaves). |
| `particles`            | Particle counts for `desktop`, `laptop`, `phone` and `lowEnd` devices. |

## Replace text

Edit the strings in `src/content.en.js`. Leave identifier fields alone: `key`, `icon`, `image`,
`product`, `pillar`, `intent`. Placeholders such as `{x}` and `{n}` are filled in by the site,
so keep them in the sentence.

## Replace images

1. Drop the new file into `assets/`.
2. In `src/images.json`, point the key at it, e.g. `"art": "assets/new-hero.avif"`.
3. Rebuild.

Recommended sizes: hero and closing artwork 1500 px wide; logos 500 px wide with transparency;
portraits 240 px square. Keep the hero artwork under about 80 KB.

## Connect the contact form

In `src/config.js`:

    form: { endpoint: 'https://your-api.example.com/enquiries', method: 'POST',
            headers: { 'Content-Type': 'application/json' } }

On submit the site POSTs this JSON:

    { "intent": "demo", "who": "Client or agency", "pillars": ["Media & Advertising"],
      "name": "...", "email": "...", "company": "...", "message": "...", "lang": "en", "page": "<url>" }

A 2xx response shows the "sent" confirmation. Anything else shows the error message plus a
copyable summary, so an enquiry is never lost. The endpoint must allow cross-origin requests
(CORS) from the site's domain. The form logic is section 8 of `src/app.js`.

## Add a language

1. Copy `src/content.en.js` to `src/content.<code>.js` (for example `content.ms.js`).
2. In the copy, change `window.INNITY_CONTENT.en` to `window.INNITY_CONTENT.<code>` and
   translate the strings (not the identifier fields).
3. In `src/config.js`, list it:
   `languages: [{ code: 'en', label: 'English' }, { code: 'ms', label: 'Bahasa Melayu' }]`.
4. Rebuild. A language switcher appears in the header, the choice is remembered in the
   visitor's browser, and `<html lang>` and the page title follow the language.

All visible text, labels and screen-reader text come from the content file; none is hard-coded
in the templates. Things to check per language:

- Hero headline (`home.headlineLine`) and the large pillar words, which are set very big.
- Fonts: Outfit, Figtree and JetBrains Mono cover Latin scripts. For Chinese, Thai, Arabic and
  similar, add a suitable font to the `<link>` in `build.js` and to `--disp` / `--body` in
  `style.css`.
- Right-to-left scripts need `dir="rtl"` handling added in `mount()` in `src/app.js`.
- The search description (`seo.description`) is one text for the whole site, not per language.

## Routes

Views use plain hash names: `#home`, `#seen`, `#trusted`, `#chosen`, `#enabled`, `#about`,
`#contact`. To move to real URLs later, swap the small router in section 6 of `src/app.js`.

## Behaviour worth knowing

- Home hero autorotation pauses on selection, when the hero is off-screen, when the tab is
  hidden, and for visitors who prefer reduced motion.
- Every appearance of the particle field starts at full size, facing the viewer, then eases
  into its own angle.
- While the field is only a faint backdrop it updates on every other frame, and rendering
  pauses when the tab is hidden.
- Without WebGL the site still works; the canvas is simply hidden.
- Layout breakpoints: phones in portrait below 900 px wide; short landscape screens (up to
  500 px tall) get a two-column layout that scales with the screen height.
- Three.js r128 loads from cdnjs and the fonts from Google Fonts, with system-font fallbacks.
