/* Site settings: the one file to edit for configuration. Run `node build.js` after changing it. */
window.INNITY_CONFIG = {
  // ── Languages ─────────────────────────────────────────────────────────────
  // One entry per src/content.<code>.js file. The switcher appears when there are two or more.
  languages: [{ code: 'en', label: 'English' }],
  defaultLang: 'en',

  // ── Contact form ──────────────────────────────────────────────────────────
  // Leave endpoint empty to show a copyable summary instead of sending.
  // Set it to your CRM, form service or API URL to POST the enquiry as JSON:
  // { intent, who, pillars[], name, email, company, message, lang, page }
  form: { endpoint: '', method: 'POST', headers: { 'Content-Type': 'application/json' } },

  // ── Search engines and link previews ──────────────────────────────────────
  seo: { description: 'Innity connects ads, social and commerce into one ecosystem. Four pillars: Seen, Trusted, Chosen, Enabled.' },

  // ── Home hero autorotation (milliseconds) ─────────────────────────────────
  // first: default sphere · step: each pillar · idle: resume after a selection sits untouched
  // resume: resume after the pointer leaves the headline · enabled: false switches it off
  hero: { autoplay: { enabled: true, first: 2000, step: 2000, resume: 4000, idle: 4000 } },

  // ── 3D particle counts by device class ────────────────────────────────────
  // Lower these if the site feels heavy on your audience's devices.
  particles: { desktop: 12000, laptop: 7500, phone: 5000, lowEnd: 3500 },
};
