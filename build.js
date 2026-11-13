/* Builds dist/index.html: one self-contained file with CSS, scripts, content and images inlined.
   Run:  node build.js     (no dependencies) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Settings and languages (read as data so the page title, language and description come from them)
const win = { INNITY_CONTENT: {} }, ctx = vm.createContext({ window: win });
vm.runInContext(read('src/config.js'), ctx);
const langFiles = fs.readdirSync(path.join(__dirname, 'src')).filter(f => /^content\.[\w-]+\.js$/.test(f)).sort();
langFiles.forEach(f => vm.runInContext(read('src/' + f), ctx));
const cfg = win.INNITY_CONFIG, lang = cfg.defaultLang || 'en', main = win.INNITY_CONTENT[lang];
if (!main) throw new Error(`config.js defaultLang is "${lang}" but src/content.${lang}.js was not found`);
for (const l of cfg.languages) if (!win.INNITY_CONTENT[l.code]) throw new Error(`config.js lists language "${l.code}" but src/content.${l.code}.js was not found`);

// Images: inlined as data URLs
const images = JSON.parse(read('src/images.json'));
const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.avif': 'image/avif' };
const inlined = {};
for (const [key, file] of Object.entries(images)) {
  const type = mime[path.extname(file).toLowerCase()];
  if (!type) throw new Error(`images.json: unsupported image type for "${key}" (${file})`);
  inlined[key] = `data:${type};base64,${fs.readFileSync(path.join(__dirname, file)).toString('base64')}`;
}

const html = `<!doctype html>
<!-- Innity Website · Web v1.1 (pre-Studio) -->
<html lang="${attr(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${attr(main.ui.titleHome)}</title>
<meta name="description" content="${attr((cfg.seo && cfg.seo.description) || '')}">
<meta name="theme-color" content="#06272f">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${read('src/style.css')}</style>
</head>
<body>
<div id="loader" role="status"><div>${['seen', 'trusted', 'chosen', 'enabled'].map((k, i) => `<i style="--i:${i};--c:var(--${k})"></i>`).join('')}</div><span></span></div>
<div class="bg" aria-hidden="true"></div>
<canvas id="scene" aria-hidden="true"></canvas>
<div class="prog" aria-hidden="true"></div>
<div class="wipe" aria-hidden="true"></div>
<header class="nav"></header>
<div class="menu"></div>
<div id="app"></div>
<footer></footer>
<script>window.INNITY_IMAGES=${JSON.stringify(inlined)};window.INNITY_ICONS=${read('src/icons.json')};</script>
<script>${read('src/config.js')}</script>
<script>${langFiles.map(f => read('src/' + f)).join('\n')}</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>${read('src/scene.js')}</script>
<script>${read('src/app.js')}</script>
</body>
</html>`;
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist/index.html'), html);
console.log('dist/index.html', (html.length / 1024).toFixed(0) + ' KB', '| languages:', cfg.languages.map(l => l.code).join(', '));
