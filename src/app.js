/* Innity site application.
   Text comes from src/content.<lang>.js, images from src/images.json, settings from src/config.js.
   Sections: 1 helpers · 2 templates · 3 mount + language · 4 scene placement · 5 scroll engine
             6 router · 7 interactions · 8 contact form · 9 boot                              */
(function () {
  const CFG = window.INNITY_CONFIG, ALL = window.INNITY_CONTENT, IMG = window.INNITY_IMAGES, IC = window.INNITY_ICONS;

  /* 1 ── helpers */
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const I = (n) => `<svg class="ic" viewBox="${IC[n][0]}" aria-hidden="true">${IC[n][1]}</svg>`;
  const img = (k, alt, cls = '') => `<img class="${cls}" src="${IMG[k]}" alt="${alt}" loading="lazy" decoding="async">`;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const fill = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
  const root = document.documentElement;
  root.style.setProperty('--art', `url(${IMG.art})`); root.style.setProperty('--art2', `url(${IMG.art2})`);

  let lang = CFG.defaultLang;
  try { const s = localStorage.getItem('innity-lang'); if (s && ALL[s]) lang = s; } catch (e) {}
  if (!ALL[lang]) lang = Object.keys(ALL)[0];
  let L = ALL[lang], P = L.pillars, U = L.ui;

  /* 2 ── templates */
  const head = (t, s) => `<div class="sec-head"><h2 data-rv>${t}</h2>${s ? `<p class="lede" data-rv>${s}</p>` : ''}</div>`;
  const pc = (i) => `style="--pc:var(--${P[i].key})"`;
  const go = (k, label, cls = 'link') => `<a class="${cls}" href="#${k}" data-go="${k}">${label}${I('arrow')}</a>`;
  const ucGrid = (idx) => `<div class="grid g2">${idx.map((i, d) => { const u = L.useCases[i]; return `<div class="card glow" data-rv style="--d:${d};--pc:var(--${P[u.pillar].key})"><h3>${u.title}</h3><div class="chips">${u.products.map(x => `<span class="chip">${x}</span>`).join('')}</div></div>`; }).join('')}</div>`;
  const cta = (t) => `<section class="sec"><div class="wrap"><div class="cta-sec" data-rv><h2>${t || L.home.closing}</h2><div class="cta-row"><a class="btn" href="#contact" data-go="contact" data-intent="demo" data-mag>${U.cta.demo}${I('arrow')}</a><a class="btn ghost" href="#contact" data-go="contact" data-intent="enquiry" data-mag>${U.cta.enquiry}</a><a class="btn ghost" href="#contact" data-go="contact" data-intent="partnership" data-mag>${U.cta.partnership}</a></div></div></div></section>`;
  const whyBlock = () => `<div class="grid g3">${L.why.map((w, d) => `<div class="card glow" data-rv style="--d:${d % 3};--pc:var(--${P[w.pillar].key})"><span class="ico">${I(w.icon)}</span><div style="display:grid;gap:6px"><h3>${w.title}</h3><p>${w.text}</p></div></div>`).join('')}</div><div class="outs" data-rv>${L.outcomes.map((o, i) => `<div><span>0${i + 1}</span><b>${o}</b></div>`).join('')}</div>`;
  const pipeBlock = () => `<div class="pipe" data-scrub>${L.delivery.map((d, i) => `<div><h3><small>0${i + 1}</small>${d.title}</h3><p>${d.text}</p><span class="pill" style="--pc:var(--teal);justify-self:start">${d.trait}</span></div>`).join('')}</div>`;
  const advBlock = () => `<div class="venn" data-rv>${L.advantage.map(a => `<div>${I(a.icon)}<h3>${a.title}</h3><p>${a.text}</p></div>`).join('')}</div><div class="prod-row" data-rv>${[0, 1, 2].map(i => `<a href="#${P[i].key}" data-go="${P[i].key}">${img(P[i].product, P[i].productName)}</a>`).join('')}</div>`;

  // Shared by all five heroes: colour aura behind the field, and the pillar rail that previews each form.
  const dotted = (t, c) => t.replace(/([.!?。！？])$/, '<i>$1</i>');
  const rail = () => `<nav class="prail" aria-label="${L.home.pillarsLabel}"><div class="prail-line"><i></i></div>${P.map(p => `<a href="#${p.key}" data-go="${p.key}" data-form="${p.key}" style="--c:var(--${p.key})"><b></b><span>${p.word}</span><small>${p.short}</small></a>`).join('')}<div class="prail-cap" aria-hidden="true"><span data-cap="core">${L.home.rail}</span>${P.map(p => `<span data-cap="${p.key}"><b>${p.label}</b>${p.service}</span>`).join('')}</div></nav>`;
  const stage = () => `<div class="stage" data-drag aria-hidden="true"><span class="aura"></span></div>`;

  function home() {
    const H = L.home;
    return `
<section class="hero" data-scene="core" data-mode="hero" data-base="">
  <div class="hero-art" aria-hidden="true"></div>
  <div class="hero-copy">
    <span class="kick">${H.kicker}</span>
    ${H.intro ? `<p class="hero-intro">${H.intro}</p>` : ''}
    <h1 aria-label="${P.map(p => fill(H.headlineLine, { x: p.word.toLowerCase() }) + ' ' + p.category + '.').join(' ')}">${P.map((p, i) => `<button type="button" data-form="${p.key}" style="--i:${i};--c:var(--${p.key})"><span class="hl">${dotted(fill(H.headlineLine, { x: p.word.toLowerCase() }))}</span><span class="cat">${p.category}</span></button>`).join('')}</h1>
    <p class="lede">${H.lede}</p>
    <div class="cta"><a class="btn" href="#contact" data-go="contact" data-intent="demo" data-mag>${U.cta.demo}${I('arrow')}</a><button class="btn ghost" data-jump="pillars" data-mag>${H.secondary}${I('down')}</button></div>
  </div>
  ${stage()}
  ${rail()}
</section>

<section class="sec what" id="what"><div class="wrap">${head(H.what.title, H.what.sub)}
  <div class="grid g4">${P.map((p, i) => `<a class="card glow tilt what-card" href="#${p.key}" data-go="${p.key}" data-rv style="--d:${i};--pc:var(--${p.key})"><div class="wtop"><span class="pill">${p.num} · ${p.word}</span><span class="ico">${I(p.icon)}</span></div><h3>${p.category}</h3><p>${p.catDesc}</p><ul>${p.services.map(x => `<li>${x}</li>`).join('')}</ul><div class="wfoot"><span class="wprod wordmark-${p.product}">${img("original_" + p.product, p.productName)}${p.product !== "innity" ? `<img class="wordmark-ink" src="${IMG["original_" + p.product]}" alt="" aria-hidden="true" loading="lazy" decoding="async">` : ""}</span><span class="link">${fill(U.common.explore, { x: p.short })}${I('arrow')}</span></div></a>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap brief">
  <div>${head(H.brief.title, H.brief.sub)}<div class="duo" data-rv><div>${I('heart')}<b>${H.brief.a}</b></div><span class="plus">${I('plus')}</span><div>${I('chart')}<b>${H.brief.b}</b></div></div></div>
  <div style="display:grid;gap:26px;align-content:center"><p class="quote" data-words>${H.brief.quote}</p><p class="lede" data-rv>${H.brief.answer}</p></div>
</div></section>

<section class="pin" id="pillars" data-scene="pin" data-mode="stage" aria-label="${H.pillarsLabel}">
  <div class="pin-sticky">
    <div class="ghost-word" aria-hidden="true">${P[0].word}</div>
    <div class="steps">${P.map((p, i) => `<article class="step" ${pc(i)}>
      <span class="num"><span>${fill(U.common.of, { n: p.num })}</span><span class="numcat">${p.category}</span></span><h2>${p.word}</h2><h3>${p.label}</h3><p class="lede">${p.desc}</p><p class="svcs">${p.services.join(' · ')}</p>
      <div class="svc">${img(p.product, p.productName)}<span>${p.service}</span></div>
      <div class="flow"><span class="pill">${p.signal}</span>${I('arrow')}<span>${p.outcome}</span></div>
      <div>${go(p.key, fill(U.common.explore, { x: p.word }), 'btn pc sm')}</div></article>`).join('')}</div>
    <div class="stage" data-drag aria-hidden="true"></div>
    <div class="rail">${P.map((p, i) => `<button type="button" data-step="${i}" style="--c:var(--${p.key})" aria-label="${p.word}"><span>${p.word}</span></button>`).join('')}</div>
  </div>
</section>

<section class="sec ai-section"><div class="wrap">${head(H.ai.title, H.ai.sub)}
  <div class="grid g3">${L.ai.map((a, d) => { const p = P[a.pillar]; return `<a class="card glow tilt ai" href="#${p.key}" data-go="${p.key}" data-rv style="--d:${d};--pc:var(--${p.key})"><div class="top"><span class="ico">${I(a.icon)}</span>${img(p.product, p.productName)}</div><h3>${a.name}</h3><span class="tag">${p.service}</span><p>${a.text}</p><div class="chips">${a.tags.map(x => `<span class="chip">${x}</span>`).join('')}</div></a>`; }).join('')}</div>
</div></section>

<section class="sec problem-section"><div class="wrap">${head(H.useCases.title, H.useCases.sub)}
  <div class="xp"><div><div class="filters" role="group" aria-label="${H.useCases.filterLabel}">${H.useCases.filters.map((f, i) => `<button type="button" data-filter="${i - 1}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div>
    <div class="probs" role="listbox" aria-label="${H.useCases.listLabel}">${L.useCases.map((u, i) => `<button type="button" class="prob" role="option" data-uc="${i}" aria-selected="${i === 0}" style="--c:var(--${P[u.pillar].key})"><i></i>${u.title}</button>`).join('')}</div></div>
    <aside class="xp-detail" id="xpd" aria-live="polite"></aside></div>
</div></section>

<section class="sec"><div class="wrap">${head(H.channels.title, H.channels.sub)}
  <div class="tabs" data-tabs><div class="tablist" role="tablist"><span class="tab-ind"></span>${L.channels.map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-c="var(--${P[c.pillar].key})">${c.name}</button>`).join('')}</div>
  ${L.channels.map((c, i) => `<div class="tabpanel split${i === 0 ? ' on' : ''}" role="tabpanel" ${pc(c.pillar)}><div style="display:grid;gap:14px;align-content:start"><h3 style="font-size:clamp(1.6rem,3vw,2.6rem);color:var(--pc)">${c.name}</h3>${go(P[c.pillar].key, fill(U.common.partOf, { x: P[c.pillar].word }))}</div><div class="rows">${c.items.map(x => `<div><i></i><span>${x}</span></div>`).join('')}</div></div>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap why">${head(H.why.title, H.why.sub)}${whyBlock()}</div></section>
<section class="sec"><div class="wrap">${head(H.delivery.title, H.delivery.sub)}${pipeBlock()}</div></section>

<section class="sec"><div class="wrap">${head(H.measure.title, H.measure.sub)}
  <div class="measure"><div>${L.measure.map((m, d) => `<div class="mrow" data-rv style="--d:${d};--c:var(--${P[m.pillar].key})"><b>${I(m.icon)}${m.title}</b><span>${m.text}</span></div>`).join('')}</div>
  <div class="loop" data-rv><span class="spin">${I('sync')}</span><h3>${H.measure.loop}</h3><ol>${H.measure.steps.map(x => `<li>${x}</li>`).join('')}</ol></div></div>
</div></section>

<section class="sec"><div class="wrap" ${pc(3)}>${head(H.partners.title, H.partners.sub)}
  <div class="logos">${L.partners.map((p, d) => `<a class="logo-tile" href="#enabled" data-go="enabled" data-rv style="--d:${d}" aria-label="${p.name}: ${p.title}">${img(p.image, p.name)}</a>`).join('')}</div>
  <p style="margin-top:26px">${go('enabled', H.partners.link)}</p>
</div></section>

<section class="sec"><div class="wrap">${head(H.audiences.title)}
  <div class="tabs" data-tabs><div class="tablist" role="tablist"><span class="tab-ind"></span>${L.audiences.map((a, i) => `<button role="tab" aria-selected="${i === 0}">${a.tab}</button>`).join('')}</div>
  ${L.audiences.map((a, i) => `<div class="tabpanel${i === 0 ? ' on' : ''}" role="tabpanel"><div class="aud"><h3 style="font-size:clamp(1.5rem,2.8vw,2.3rem)">${a.title}</h3><p class="lede">${a.text}</p><div><a class="btn sm" href="#contact" data-go="contact" data-intent="${a.intent}" data-who="${i}" data-mag>${U.cta[a.intent]}${I('arrow')}</a></div></div></div>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap">${head(H.advantage.title, H.advantage.sub)}${advBlock()}</div></section>
${cta()}`;
  }

  function pillarPage(i) {
    const p = P[i], nx = P[(i + 1) % 4], d = L.pages[p.key], G = L.pillarPage, isE = i === 3;
    const hero = `<section class="phero" ${pc(i)} data-scene="${p.key}" data-mode="hero" data-base="${p.key}">
      <div class="copy"><div class="crumb"><a href="#home" data-go="home">${U.nav.home}</a><span>/</span><span>${p.short}</span></div>
      <h1>${p.word}</h1><h2 class="pcat">${p.category}</h2><div class="svc">${img(p.product, p.productName)}<span>${isE ? L.enabled.heroTitle : p.service}</span></div><p class="lede">${p.hero}</p>
      <div class="cta" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><a class="btn pc" href="#contact" data-go="contact" data-intent="${isE ? 'partnership' : 'demo'}" data-pillar="${i}" data-mag>${isE ? U.cta.partnership : U.cta.demo}${I('arrow')}</a><span class="pill">${fill(U.common.to, { a: p.signal, b: p.outcome.toLowerCase() })}</span></div></div>
      ${stage()}${rail()}</section>`;
    const next = `<a class="next" href="#${nx.key}" data-go="${nx.key}" style="--c:var(--${nx.key})"><span class="muted">${fill(U.common.nextPillar, { n: nx.num })}</span><b>${nx.word}${I('arrow')}</b></a>`;
    if (isE) return hero + enabledBody() + cta(L.enabled.closing) + next;
    const mods = `<section class="sec" ${pc(i)}><div class="wrap">${head(d.modTitle, d.modSub)}<div class="grid ${d.modules.length === 5 ? 'g5' : 'g3'}">${d.modules.map((m, k) => `<div class="card glow" data-rv style="--d:${k % 3}"><span class="ico">${I(m.icon)}</span><h3>${m.title}</h3>${m.product ? `<span class="tag">${m.product}</span>` : ''}<ul>${m.items.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></div></section>`;
    const steps = d.steps ? `<section class="sec" ${pc(i)}><div class="wrap split" style="display:grid">${head(d.stepTitle, d.stepSub)}<div class="tl" data-scrub>${d.steps.map(s => `<div><h3>${s.title}</h3>${s.tools ? `<span class="tools">${s.tools}</span>` : ''}<p class="muted">${s.text}</p>${s.tag ? `<span class="pill" style="justify-self:start">${s.tag}</span>` : ''}</div>`).join('')}${d.loop ? `<div><h3>${I('sync')} ${G.loopTitle}</h3><p class="muted">${G.loopText}</p></div>` : ''}</div></div></section>` : '';
    const acts = d.activations ? `<section class="sec" ${pc(i)}><div class="wrap">${head(G.activationsTitle, G.activationsSub)}<div class="grid g4">${d.activations.map((a, k) => `<div class="card glow" data-rv style="--d:${k % 4}"><span class="ico">${I(a.icon)}</span><h3>${a.title}</h3><span class="tag">${a.tag}</span></div>`).join('')}<div class="card" data-rv style="background:color-mix(in srgb,var(--pc) 18%,transparent);align-content:center"><h3>${G.journeyTitle}</h3><p>${G.journeyText}</p></div></div><div class="journey" data-rv>${G.journey.map((x, k) => `<div style="--i:${k}">${x.toUpperCase()}</div>`).join('')}</div></div></section>` : '';
    const ch = `<section class="sec" ${pc(i)}><div class="wrap">${head(G.whereTitle, G.whereSub)}${d.channels.map(c => `<div class="split" style="display:grid;margin-bottom:34px"><h3 style="font-size:clamp(1.5rem,2.8vw,2.3rem);color:var(--pc)" data-rv>${L.channels[c].name}</h3><div class="rows">${L.channels[c].items.map(x => `<div><i></i><span>${x}</span></div>`).join('')}</div></div>`).join('')}</div></section>`;
    const uc = `<section class="sec"><div class="wrap">${head(G.useCasesTitle, G.useCasesSub)}${ucGrid(d.useCases)}</div></section>`;
    return hero + mods + steps + acts + ch + uc + cta() + next;
  }

  function enabledBody() {
    const E = L.enabled, ang = (k) => { const a = -Math.PI / 2 + k * Math.PI / 3; return `--x:${Math.cos(a).toFixed(3)};--y:${Math.sin(a).toFixed(3)}`; };
    return `<div ${pc(3)}>
<section class="sec"><div class="wrap">${head(E.eco.title, E.eco.sub)}
  <div class="hub"><div class="orbit" role="tablist" aria-label="${E.eco.label}"><div class="core">${img('innity', 'Innity')}<span>${E.eco.core}</span></div>${E.ecosystem.map((e, k) => `<button type="button" role="tab" data-eco="${k}" aria-selected="${k === 0}" aria-label="${e.title}" style="${ang(k)}">${I(e.icon)}</button>`).join('')}</div>
  <div class="hub-detail" id="ecod" aria-live="polite"></div></div>
</div></section>
<section class="sec"><div class="wrap">${head(E.consult.title, E.consult.sub)}
  <div class="grid g3">${E.services.map((c, k) => `<div class="card glow" data-rv style="--d:${k % 3}"><span class="ico">${I(c.icon)}</span><h3>${c.title}</h3><span class="tag">${c.scope}</span><p>${c.action}</p><p style="color:var(--text);font-weight:600;display:flex;gap:10px;align-items:center"><span style="color:var(--lime);display:inline-flex">${I('arrow')}</span>${c.result}</p></div>`).join('')}</div>
</div></section>
<section class="sec"><div class="wrap">${head(E.process.title, E.process.sub)}
  <div class="tabs" data-tabs><div class="tablist" role="tablist"><span class="tab-ind"></span>${E.stages.map((s, k) => `<button role="tab" aria-selected="${k === 0}">0${k + 1} ${s.name}</button>`).join('')}</div>
  ${E.stages.map((s, k) => `<div class="tabpanel split${k === 0 ? ' on' : ''}" role="tabpanel"><div style="display:grid;gap:12px;align-content:start"><h3 style="font-size:clamp(1.6rem,3vw,2.5rem);color:var(--pc)">${s.title}</h3><p class="lede">${s.text}</p></div><div class="card" style="background:color-mix(in srgb,var(--pc) 12%,transparent)"><span class="tag">${U.common.clientOutput}</span><h3>${s.output}</h3></div></div>`).join('')}</div>
  <p class="quote" style="margin-top:40px;max-width:none" data-words>${E.process.quote}</p>
</div></section>
<section class="sec"><div class="wrap">${head(E.growth.title, E.growth.sub)}
  <div class="table">${E.opportunities.map((g, k) => `<div class="trow" data-rv style="--d:${k}"><div><h3>${g.title}</h3><small>${g.sub}</small></div>${I('arrow')}<p>${g.how}</p><div class="g"><b>${g.gain}</b><small>${g.gainSub}</small></div></div>`).join('')}</div>
  <p class="muted" style="margin-top:18px;font-size:.88rem;max-width:none">${E.growth.note}</p>
</div></section>
<section class="sec"><div class="wrap">${head(E.voicesHead.title, E.voicesHead.sub)}
  <div class="grid g3">${E.voices.map((v, k) => `<div class="card glow voice" data-rv style="--d:${k % 3}">${img(v.image, '')}<div style="display:grid;gap:5px"><h3>${v.title}</h3><span class="tag">${v.role}</span><p>${v.text}</p></div></div>`).join('')}</div>
</div></section>
<section class="sec"><div class="wrap">${head(E.partnersHead.title, E.partnersHead.sub)}
  <div class="grid" style="gap:12px">${L.partners.map((p, k) => `<div class="acc${k === 0 ? ' open' : ''}" data-rv><button type="button" aria-expanded="${k === 0}"><span class="lt">${img(p.image, p.name)}</span><h3>${p.title}</h3><span class="pill">${p.badge}</span><span class="x">${I('plus')}</span></button><div class="acc-body"><div><div class="acc-in"><p>${p.text}</p><ul>${p.advantages.map(x => `<li>${I('check')}<span>${x}</span></li>`).join('')}</ul></div></div></div></div>`).join('')}</div>
</div></section></div>`;
  }

  function about() {
    const A = L.about, H = L.home;
    return `<section class="phero" data-scene="calm" data-mode="calm" style="min-height:78svh;grid-template-columns:1fr"><div class="copy" style="max-width:900px"><div class="crumb"><a href="#home" data-go="home">${U.nav.home}</a><span>/</span><span>${A.crumb}</span></div><h1 style="font-size:clamp(3rem,9vw,7.5rem);color:#fff">${A.title}</h1><p class="lede">${A.lede}</p></div></section>
<section class="sec"><div class="wrap brief"><div class="story" data-words>${A.story}</div>
  <div style="display:grid;gap:20px;align-content:start"><p class="lede" data-rv>${A.p1}</p><p class="lede" data-rv>${A.p2}</p><p data-rv>${P.map(p => `<a class="pill" href="#${p.key}" data-go="${p.key}" style="--pc:var(--${p.key});margin:0 6px 8px 0">${p.word}</a>`).join('')}</p></div></div></section>
<section class="sec"><div class="wrap why">${head(H.why.title, H.why.sub)}${whyBlock()}</div></section>
<section class="sec"><div class="wrap">${head(A.howTitle, H.delivery.sub)}${pipeBlock()}</div></section>
<section class="sec"><div class="wrap">${head(H.advantage.title, H.advantage.sub)}${advBlock()}</div></section>${cta()}`;
  }

  function contact() {
    const C = L.contact, live = !!(CFG.form && CFG.form.endpoint);
    const seg = (name, opts, type = 'radio') => `<div class="seg">${opts.map((o, i) => `<label ${o.c ? `style="--c:var(--${o.c})"` : ''}><input type="${type}" name="${name}" value="${o.v}" ${type === 'radio' && i === 0 ? 'checked' : ''}><span>${o.l}</span></label>`).join('')}</div>`;
    const fs = (q, inner) => `<fieldset style="border:0;padding:0;margin:0"><legend style="font:600 .9rem var(--disp);padding:0;margin-bottom:10px">${q}</legend>${inner}</fieldset>`;
    return `<section class="phero" data-scene="calm" data-mode="calm" style="min-height:auto;grid-template-columns:1fr;padding-bottom:20px"><div class="copy" style="max-width:900px"><div class="crumb"><a href="#home" data-go="home">${U.nav.home}</a><span>/</span><span>${C.crumb}</span></div><h1 style="font-size:clamp(2.8rem,8vw,6.5rem);color:#fff">${C.title}</h1><p class="lede">${C.lede}</p></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap" style="max-width:860px;margin-left:0">
  <form id="cform" novalidate>
    ${fs(C.intentQuestion, seg('intent', C.intents.map(x => ({ v: x.value, l: x.label }))))}
    ${fs(C.whoQuestion, seg('who', C.whos.map(x => ({ v: x, l: x }))))}
    ${fs(C.pillarQuestion, seg('pillar', P.map(p => ({ v: p.category, l: `${p.category} (${p.word})`, c: p.key })), 'checkbox'))}
    <div class="frow"><label>${C.name}<input name="name" autocomplete="name" required></label><label>${C.email}<input name="email" type="email" autocomplete="email" required></label></div>
    <label>${C.company}<input name="company" autocomplete="organization"></label>
    <label>${C.goal}<textarea name="msg"></textarea></label>
    <p class="err" role="alert" id="cerr"></p>
    <div><button class="btn" type="submit" data-mag>${live ? C.submitLive : C.submit}${I('arrow')}</button></div>
  </form>
  <div id="cdone" hidden></div>
</div></section>`;
  }

  function chrome() {
    const langs = CFG.languages || [];
    const sw = langs.length > 1 ? `<label class="lang"><span class="sr">${U.nav.language}</span><select id="langsel" aria-label="${U.nav.language}">${langs.map(l => `<option value="${l.code}" ${l.code === lang ? 'selected' : ''}>${l.label}</option>`).join('')}</select></label>` : '';
    $('.nav').innerHTML = `<a class="logo" href="#home" data-go="home" aria-label="Innity ${U.nav.home}">${img('innity', 'Innity')}</a>
      <nav aria-label="${U.nav.primary}">${P.map(p => `<a href="#${p.key}" data-go="${p.key}" style="--c:var(--${p.key})" title="${p.category}: ${p.word}"><i></i>${p.short}</a>`).join('')}<a href="#about" data-go="about" style="--c:#fff">${U.nav.about}</a></nav>${sw}
      <a class="btn sm" href="#contact" data-go="contact" data-intent="demo" data-mag>${U.cta.demo}</a>
      <button class="burger" type="button" aria-label="${U.nav.menu}" aria-expanded="false"><span></span></button>`;
    const items = [['home', U.nav.home, ''], ...P.map(p => [p.key, p.short, p.word]), ['about', U.nav.about, ''], ['contact', U.nav.contact, '']];
    $('.menu').innerHTML = items.map((m, i) => `<a href="#${m[0]}" data-go="${m[0]}" style="--i:${i}${m[2] ? `;--c:var(--${m[0]})` : ''}">${m[1]}${m[2] ? `<small>${m[2]}</small>` : ''}</a>`).join('');
    $('footer').innerHTML = `<div style="display:grid;gap:14px;align-content:start">${img('innity', 'Innity')}<p class="muted" style="max-width:38ch">${U.footer.blurb}</p></div>
      <div><h4>${U.footer.pillars}</h4>${P.map(p => `<a href="#${p.key}" data-go="${p.key}">${p.category}</a>`).join('')}</div>
      <div><h4>${U.footer.company}</h4><a href="#about" data-go="about">${U.nav.about}</a><a href="#contact" data-go="contact" data-intent="demo">${U.cta.demo}</a><a href="#contact" data-go="contact" data-intent="partnership">${U.cta.partner}</a></div>
      <small>${U.footer.copyright}</small>`;
    $('#loader span').textContent = U.loader;
  }

  /* 3 ── mount + language */
  const app = $('#app');
  let VIEWS = {}, view = 'home', vh = innerHeight, heroForm = null, intent = null, who = null, pillarPick = null, pinIdx = 0;
  function mount() {
    L = ALL[lang]; P = L.pillars; U = L.ui; root.lang = lang;
    VIEWS = { home: home(), seen: pillarPage(0), trusted: pillarPage(1), chosen: pillarPage(2), enabled: pillarPage(3), about: about(), contact: contact() };
    app.innerHTML = Object.entries(VIEWS).map(([k, h]) => `<main class="view" id="v-${k}" data-view="${k}">${h}</main>`).join('');
    // Opaque editorial surfaces keep the particle field within the dark chapters.
    $$('.view').forEach(page => {
      const sections = $$('.sec', page);
      sections.forEach((section, i) => {
        const light = page.dataset.view === 'home' ? [0, 1, 2, 4, 6, 8, 9].includes(i) : page.dataset.view === 'enabled' ? [1, 2, 4, 5].includes(i) : i % 2 === 0;
        if (light && !$('.cta-sec', section)) {
          section.classList.add('surface-light');
          if (page.dataset.view === 'home' && [1, 4, 9].includes(i)) section.classList.add('surface-ivory');
        }
      });
    });
    chrome();
    $$('[data-words]').forEach(el => { el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(' '); });
    bindHero(); bindForm(); pickUC(0); pickEco(0);
  }
  function setLang(code) { if (!ALL[code] || code === lang) return; lang = code; try { localStorage.setItem('innity-lang', code); } catch (e) {} mount(); show(view, true); $$('[data-rv]').forEach(e => e.classList.add('in')); }
  window.InnitySite = { setLang, get lang() { return lang; } };

  /* 4 ── scene placement */
  const wide = () => innerWidth > 900;
  const cur = () => $('#v-' + view);
  let el0 = '';
  function place(mode) {
    const asp = innerWidth / innerHeight, halfW = 3.45 * asp;
    if (mode === 'calm') return { x: 0, y: -0.2, s: wide() ? 1.25 : 0.8, o: 0.7 };
    if (mode === 'ambient') return wide() ? { x: halfW * 0.98, y: -0.3, s: 1.25, o: 0.1 } : { x: 0, y: 0, s: 1, o: 0.07 };
    const land = innerWidth > innerHeight && innerHeight <= 500;
    if (land && (mode === 'hero' || mode === 'stage')) return { x: halfW * (mode === 'hero' ? 0.5 : 0.52), y: mode === 'hero' ? -0.05 : 0.05, s: mode === 'hero' ? (el0 === 'core' ? 1.45 : 1.38) : 1.2, o: 1 };
    if (!wide() && mode === 'hero') return { x: 0, y: 1.3, s: clamp(halfW / 2.2, 0.55, 0.78), o: 0.92 };
    if (mode === 'hero' && el0 === 'core') return wide() ? { x: halfW * 0.445, y: 0.32, s: clamp(halfW / 5.35, 0.72, 1.04), o: 1 } : { x: 0, y: 2.0, s: clamp(halfW / 2.65, 0.45, 0.66), o: 1 };
    if (!wide()) return { x: 0, y: 2.3, s: clamp(halfW / 3.1, 0.4, 0.54) * Math.min(1, innerHeight / 844), o: 1 };
    return { x: halfW * (mode === 'hero' ? 0.46 : 0.5), y: mode === 'hero' ? 0.32 : 0.15, s: clamp(halfW / 6.1, 0.62, 1.0), o: 1 };
  }
  // Portrait phones, pinned pillars: fit each form into the space above the current step's label.
  // EXT = each form's on-screen extent at scale 1 (top, bottom, horizontal half-width), body only.
  const EXT = { seen: { t: 2.15, b: -2.15, r: 2.45 }, trusted: { t: 2.35, b: -2.3, r: 2.55 }, chosen: { t: 2.3, b: -1.75, r: 2.75 }, enabled: { t: 2.1, b: -2.1, r: 2.15 } };
  function placePin(key) {
    if (wide() || innerWidth > innerHeight) return place('stage');
    if (!Q) requery();
    const steps = Q.stepsBox, step = Q.steps[pinIdx], num = step && $('.num', step);
    if (!steps || !num) return place('stage');
    const Hh = 3.455, halfW = Hh * innerWidth / innerHeight, toW = (py) => Hh - py / innerHeight * 2 * Hh;
    const labelTop = steps.getBoundingClientRect().top + step.offsetTop + num.offsetTop;
    const wTop = toW(10), wBot = toW(labelTop - 18), e = EXT[key] || EXT.seen;
    const sc = clamp(Math.min((wTop - wBot) / (e.t - e.b), halfW / (e.r * 0.94)), 0.3, 0.9);
    return { x: 0, y: wBot - e.b * sc, s: sc, o: 1 };
  }
  function updateScene() {
    if (!window.Scene) return;
    let el = null;
    if (!Q) requery();
    for (const e of Q.scenes) { const r = e.getBoundingClientRect(); if (r.top < vh * 0.55 && r.bottom > vh * 0.45) { el = e; break; } }
    if (!el) { Scene.set(null, place('ambient')); return; }
    if (el.dataset.scene === 'pin') Scene.set(P[pinIdx].key, placePin(P[pinIdx].key));
    else if (el.dataset.scene === 'core') { el0 = 'core'; Scene.set(heroForm || 'core', place('hero')); el0 = ''; }
    else Scene.set((el.dataset.mode === 'hero' && heroForm) || el.dataset.scene, place(el.dataset.mode));
  }

  /* 5 ── scroll engine: progress bar, nav, pinned pillars, scrubbed lines, word-by-word statements */
  let ticking = false, lastY = 0;
  // Elements the scroll engine touches, looked up once per view (requery) instead of on every frame.
  let Q = null;
  function requery() {
    const v = cur(), pin = $('.pin', v);
    Q = { nav: $('.nav'), hero: $('.hero', v), pin, sticky: pin && $('.pin-sticky', pin), ghost: pin && $('.ghost-word', pin), stepsBox: pin && $('.steps', pin),
      steps: pin ? $$('.step', pin) : [], rail: pin ? $$('.rail button', pin) : [], scrub: $$('[data-scrub]', v).map(el => ({ el, kids: Array.from(el.children), pipe: el.classList.contains('pipe') })),
      words: $$('[data-words]', v), scenes: $$('[data-scene]', v) };
  }
  function onScroll() {
    if (!Q) requery();
    const y = window.scrollY, max = root.scrollHeight - vh;
    root.style.setProperty('--sp', max > 0 ? clamp(y / max) : 0);
    Q.nav.classList.toggle('solid', y > 40); Q.nav.classList.toggle('hide', y > lastY && y > 300 && !root.classList.contains('menu-open')); lastY = y;
    if (Q.hero) Q.hero.style.setProperty('--hy', (y * 0.22).toFixed(1));
    if (Q.pin) {
      const r = Q.pin.getBoundingClientRect(), p = clamp(-r.top / (r.height - vh)), idx = Math.min(3, Math.floor(p * 4)), st = Q.sticky;
      st.style.setProperty('--gx', (p * 60).toFixed(2));
      if (idx !== pinIdx || !st.dataset.init) {
        pinIdx = idx; st.dataset.init = 1; st.style.setProperty('--pc', `var(--${P[idx].key})`);
        Q.ghost.textContent = P[idx].word;
        // inactive steps are hidden from assistive tech and from keyboard focus (inert)
        Q.steps.forEach((s, i) => { s.classList.toggle('on', i === idx); s.classList.toggle('past', i < idx); s.setAttribute('aria-hidden', i !== idx); s.inert = i !== idx; });
        Q.rail.forEach((b, i) => b.classList.toggle('on', i === idx));
      }
    }
    Q.scrub.forEach(({ el, kids, pipe }) => {
      const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      const horiz = pipe && innerWidth > 1080;
      const s = horiz ? clamp((vh * 0.82 - r.top) / (vh * 0.45)) : clamp((vh * 0.72 - r.top) / r.height);
      el.style.setProperty('--s', s.toFixed(3));
      kids.forEach((k, i) => k.classList.toggle('lit', horiz ? s > (i + 0.15) / kids.length : k.getBoundingClientRect().top < vh * 0.74));
    });
    Q.words.forEach(el => {
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const s = clamp((vh * 0.88 - r.top) / (vh * 0.5)), w = el.children;
      for (let i = 0; i < w.length; i++) w[i].classList.toggle('lit', i / w.length < s);
    });
    updateScene(); ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { vh = innerHeight; onScroll(); placeTabs(); });

  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  function observe() { $$('[data-rv]:not(.in)', cur()).forEach(el => io.observe(el)); }
  let counted = false;
  const sio = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting && !counted) { counted = true; counters(); } }), { threshold: 0.4 });
  function counters() { $$('[data-count]').forEach(el => { const n = +el.dataset.count, t0 = performance.now(); (function f(t) { const k = clamp((t - t0) / 1400), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(n * e); if (k < 1) requestAnimationFrame(f); })(t0); }); }

  /* 6 ── router: one view per plain #name */
  const wipe = $('.wipe'); let busy = false;
  function show(name, instant) {
    if (!VIEWS[name]) name = 'home';
    const apply = () => {
      $$('.view').forEach(v => v.classList.toggle('on', v.dataset.view === name)); view = name; window.scrollTo(0, 0);
      $$('.nav nav a,.menu a').forEach(a => a.classList.toggle('cur', a.dataset.go === name));
      const p = P.find(x => x.key === name);
      document.title = name === 'home' ? U.titleHome : (p ? `${p.category}: ${p.word}` : name === 'about' ? L.about.crumb : L.contact.crumb) + U.titleSuffix;
      const st = $('.pin-sticky', cur()); if (st) delete st.dataset.init;
      resetHeroes();
      if (name === 'home') autoStart(); else { clearTimeout(autoTimer); }
      if (name === 'contact') prefill();
      requery(); observe(); placeTabs(); onScroll(); const sx = $('.stats', cur()); if (sx) { if (counted) $$('[data-count]', sx).forEach(e => e.textContent = e.dataset.count); else sio.observe(sx); }
    };
    if (instant || matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(); return; }
    if (busy) return; busy = true;
    const p = P.find(x => x.key === name); wipe.style.setProperty('--c', p ? `var(--${p.key})` : 'var(--teal)');
    wipe.className = 'wipe a';
    setTimeout(() => { apply(); wipe.className = 'wipe b'; setTimeout(() => { wipe.className = 'wipe'; busy = false; route(); }, 520); }, 460);
  }
  function route() { const h = (location.hash || '#home').slice(1); if (h !== view || !$('.view.on')) show(h, !$('.view.on')); }
  addEventListener('hashchange', route);

  /* 7 ── interactions (delegated, so they survive a language switch) */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go],[data-jump],[data-step],[data-uc],[data-filter],[data-eco],[role=tab],.acc>button,.burger,.stage');
    if (!t) return;
    if (t.matches('.burger')) { const o = root.classList.toggle('menu-open'); t.setAttribute('aria-expanded', o); return; }
    if (t.dataset.go) {
      if (t.dataset.intent) intent = t.dataset.intent; if (t.dataset.who != null) who = +t.dataset.who; if (t.dataset.pillar != null) pillarPick = +t.dataset.pillar;
      root.classList.remove('menu-open');
      if (t.dataset.go === view) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); if (view === 'contact') prefill(); }
      return;
    }
    if (t.dataset.jump) { const el = document.getElementById(t.dataset.jump); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'smooth' }); return; }
    if (t.dataset.step != null) { const pin = t.closest('.pin'), r = pin.getBoundingClientRect(); window.scrollTo({ top: r.top + scrollY + (r.height - vh) * ((+t.dataset.step + 0.5) / 4), behavior: 'smooth' }); return; }
    if (t.dataset.uc != null) { pickUC(+t.dataset.uc); return; }
    if (t.dataset.filter != null) { const f = +t.dataset.filter; $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', b === t)); let first = -1; $$('.prob').forEach((b, i) => { const hit = f < 0 || L.useCases[i].pillar === f; b.classList.toggle('dim', !hit); if (hit && first < 0) first = i; }); pickUC(first); return; }
    if (t.dataset.eco != null) { pickEco(+t.dataset.eco); return; }
    if (t.matches('[role=tab]') && t.closest('[data-tabs]')) { const box = t.closest('[data-tabs]'), tabs = $$('[role=tab]', box), i = tabs.indexOf(t); tabs.forEach((b, k) => b.setAttribute('aria-selected', k === i)); $$('.tabpanel', box).forEach((p, k) => p.classList.toggle('on', k === i)); moveInd(box); return; }
    if (t.matches('.acc>button')) { const a = t.parentElement, o = !a.classList.contains('open'); $$('.acc', a.parentElement).forEach(x => { x.classList.remove('open'); x.firstElementChild.setAttribute('aria-expanded', false); }); if (o) { a.classList.add('open'); t.setAttribute('aria-expanded', true); } return; }
    if (t.matches('.stage') && window.Scene) Scene.pulse();
  });
  document.addEventListener('change', (e) => { if (e.target.id === 'langsel') setLang(e.target.value); });
  function pickUC(i) {
    const d = $('#xpd'); if (i < 0 || !d) return; const u = L.useCases[i], p = P[u.pillar];
    $$('.prob').forEach((b, k) => b.setAttribute('aria-selected', k === i));
    d.style.setProperty('--pc', `var(--${p.key})`);
    d.innerHTML = `<span class="tag">${fill(U.common.problem, { n: String(i + 1).padStart(2, '0') })}</span><h3>${u.title}</h3><p class="muted">${U.common.solvedBy}</p><div class="parts">${u.products.map((x, k) => `<span style="--i:${k}">${I('check')}${x}</span>`).join('')}</div><div>${go(p.key, fill(U.common.see, { x: p.word }))}</div>`;
  }
  function pickEco(i) {
    const d = $('#ecod'); if (!d) return; const e = L.enabled.ecosystem[i]; $$('[data-eco]').forEach((b, k) => b.setAttribute('aria-selected', k === i));
    d.innerHTML = `<span class="ico" style="background:var(--pc);color:#04101f">${I(e.icon)}</span><h3 style="font-size:clamp(1.4rem,2.4vw,2rem)">${e.title}</h3><p>${e.who}</p><p class="tag" style="font-size:.95rem;line-height:1.4">${e.examples}</p><p class="lede" style="color:#fff">${e.benefit}</p>`;
  }
  function moveInd(box) { const b = $('[role=tab][aria-selected="true"]', box), ind = $('.tab-ind', box); if (!b || !ind) return; ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`; ind.style.background = box.closest('.surface-light') ? '#123b45' : (b.dataset.c || '#fff'); }
  function placeTabs() { $$('[data-tabs]', cur()).forEach(moveInd); }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') root.classList.remove('menu-open');
    const t = e.target; if (!t.matches || !t.matches('[role=tab]') || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const tabs = $$('[role=tab]', t.parentElement), i = (tabs.indexOf(t) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length; tabs[i].focus(); tabs[i].click();
  });

  // pointer feedback: cursor-following glow, card tilt, magnetic buttons
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  let magEl = null;
  if (fine) document.addEventListener('pointermove', (e) => {
    const g = e.target.closest && e.target.closest('.glow');
    if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); if (g.classList.contains('tilt')) { g.style.setProperty('--tx', (((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2)); g.style.setProperty('--ty', ((0.5 - (e.clientY - r.top) / r.height) * 9).toFixed(2)); } }
    const m = e.target.closest && e.target.closest('[data-mag]');
    if (magEl && magEl !== m) magEl.style.transform = ''; magEl = m;
    if (m) { const r = m.getBoundingClientRect(); m.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`; }
  }, { passive: true });
  document.addEventListener('pointerout', (e) => { const g = e.target.closest && e.target.closest('.tilt'); if (g && !g.contains(e.relatedTarget)) { g.style.setProperty('--tx', 0); g.style.setProperty('--ty', 0); } });

  // Hero previews: hovering a headline line or a rail node morphs the field into that pillar.
  // Leaving returns to the hero's own form (the sphere on home, the page's pillar elsewhere).
  function paintHero(h, k) {
    const on = k || h.dataset.base || 'core', idx = P.findIndex(p => p.key === on);
    h.dataset.on = on === 'core' ? '' : on;
    $$('[data-form]', h).forEach(b => { const i = P.findIndex(p => p.key === b.dataset.form); b.classList.toggle('on', b.dataset.form === on); b.classList.toggle('past', idx >= 0 && i < idx); });
    $$('[data-cap]', h).forEach(c => c.classList.toggle('on', c.dataset.cap === on));
    const h1 = $('h1', h); if (h1 && h.classList.contains('hero')) h1.classList.toggle('has-on', !!k);
  }
  /* Hero autorotation (home hero only): Default 2 s, then each pillar 2 s, looping.
     Selecting a pillar (hover, focus or tap) pauses it; after 4 s with no further interaction it
     resumes from that pillar. Leaving the headline returns to Default and resumes after 4 s.
     Dragging pauses until 4 s after release. Paused when the hero is off-screen, the tab is hidden,
     another page is open, or the visitor prefers reduced motion. Timings come from config.js (hero.autoplay).           */
  const AUTO = Object.assign({ enabled: true, first: 2000, step: 2000, resume: 4000, idle: 4000 }, (CFG.hero && CFG.hero.autoplay) || {});
  const ORDER = () => ['core', ...P.map(p => p.key)];
  let autoIdx = 0, autoTimer = null, autoHeld = false, heroSeen = true;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches || AUTO.enabled === false;
  const homeHero = () => (view === 'home' ? $('#v-home .hero') : null);
  function autoShow(k) { const h = homeHero(); if (!h) return; heroForm = k === 'core' ? null : k; paintHero(h, heroForm); updateScene(); }
  function autoQueue(delay) {
    clearTimeout(autoTimer); if (reduceMotion || autoHeld || !homeHero() || !heroSeen || document.hidden) return;
    autoTimer = setTimeout(() => { const o = ORDER(); autoIdx = (autoIdx + 1) % o.length; autoShow(o[autoIdx]); autoQueue(autoIdx === 0 ? AUTO.first : AUTO.step); }, delay != null ? delay : (autoIdx === 0 ? AUTO.first : AUTO.step));
  }
  function autoHold() { autoHeld = true; clearTimeout(autoTimer); }
  function autoRelease(fromKey, delay) { autoHeld = false; autoIdx = Math.max(0, ORDER().indexOf(fromKey || 'core')); autoQueue(delay); }
  function idleResume(k) { clearTimeout(autoTimer); autoTimer = setTimeout(() => autoRelease(k, 0), AUTO.idle); }
  function autoStart() { autoHeld = false; autoIdx = 0; autoShow('core'); autoQueue(AUTO.first); }
  const heroIO = new IntersectionObserver((es) => es.forEach(e => { heroSeen = e.intersectionRatio > 0.35; if (heroSeen) autoQueue(); else clearTimeout(autoTimer); }), { threshold: [0, 0.35, 0.6] });
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(autoTimer); else autoQueue(); });

  let dragHold = false;
  addEventListener('pointerup', () => { if (dragHold) { dragHold = false; if (homeHero()) autoRelease(ORDER()[autoIdx], AUTO.resume); } });
  function resetHeroes() { heroForm = null; $$('.hero,.phero[data-base]').forEach(h => paintHero(h, null)); }
  function bindHero() {
    $$('.hero,.phero[data-base]').forEach(h => {
      const isHome = h.classList.contains('hero');
      const set = (k) => { heroForm = k && k !== h.dataset.base ? k : null; paintHero(h, heroForm); updateScene(); if (isHome) { if (k) { autoHold(); idleResume(k); } else autoRelease('core', AUTO.resume); } };
      $$('[data-form]', h).forEach(b => {
        b.addEventListener('pointerenter', () => { if (fine) set(b.dataset.form); });
        b.addEventListener('focus', () => { if (fine) set(b.dataset.form); });
        if (b.tagName === 'BUTTON') b.addEventListener('click', () => { if (fine) { location.hash = b.dataset.form; return; } const k = heroForm === b.dataset.form ? null : b.dataset.form; heroForm = k; paintHero(h, k); updateScene(); if (isHome) { if (k) { autoHold(); idleResume(k); } else autoRelease('core', AUTO.step); } });
      });
      $$('h1,.prail', h).forEach(g => {
        g.addEventListener('pointerleave', () => { if (fine) set(null); });
        g.addEventListener('focusout', (e) => { if (!g.contains(e.relatedTarget)) set(null); });
      });
      paintHero(h, null);
      if (isHome) {
        heroIO.observe(h);
        $$('h1,.prail', h).forEach(g => g.addEventListener('pointermove', () => { if (autoHeld && heroForm) idleResume(heroForm); }, { passive: true }));
        const st = $('.stage', h);
        if (st) st.addEventListener('pointerdown', () => { dragHold = true; autoHold(); });
      }
    });
  }

  /* 8 ── contact form. Sends to CONFIG.form.endpoint when set; otherwise shows a copyable summary. */
  function prefill() {
    const f = $('#cform'); if (!f) return;
    if (intent) { const r = f.querySelector(`[name=intent][value="${intent}"]`); if (r) r.checked = true; }
    if (who != null) { const r = f.querySelectorAll('[name=who]')[who]; if (r) r.checked = true; }
    if (pillarPick != null) { const r = f.querySelectorAll('[name=pillar]')[pillarPick]; if (r) r.checked = true; pillarPick = null; }
  }
  function bindForm() {
    const f = $('#cform'); if (!f) return;
    f.addEventListener('submit', async (e) => {
      e.preventDefault(); const C = L.contact, fd = new FormData(f), err = $('#cerr'), d = $('#cdone');
      const name = (fd.get('name') || '').trim(), email = (fd.get('email') || '').trim();
      if (!name) { err.textContent = C.errName; f.name.focus(); return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = C.errEmail; f.email.focus(); return; }
      err.textContent = '';
      const data = { intent: fd.get('intent'), who: fd.get('who'), pillars: fd.getAll('pillar'), name, email, company: (fd.get('company') || '').trim(), message: (fd.get('msg') || '').trim(), lang, page: location.href };
      const S = C.summary, il = (C.intents.find(x => x.value === data.intent) || {}).summary || data.intent;
      const sum = [fill(S.from, { a: il, b: name }), `${S.email}: ${email}`, data.company ? `${S.company}: ${data.company}` : '', `${S.who}: ${data.who}`, `${S.pillars}: ${data.pillars.join(', ') || S.notSure}`, data.message ? `${S.goal}: ${data.message}` : ''].filter(Boolean).join('\n');
      let sent = false, failed = false; const ep = CFG.form && CFG.form.endpoint, btn = f.querySelector('[type=submit]');
      if (ep) {
        btn.disabled = true; const keep = btn.innerHTML; btn.textContent = C.sending;
        try { const r = await fetch(ep, { method: CFG.form.method || 'POST', headers: CFG.form.headers || { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); sent = r.ok; failed = !r.ok; } catch (x) { failed = true; }
        btn.disabled = false; btn.innerHTML = keep;
      }
      f.hidden = true; d.hidden = false;
      d.innerHTML = `<div class="done"><h3>${sent ? C.sentTitle : C.preparedTitle}</h3><p>${sent ? C.sentText : failed ? C.errSend : C.preparedText}</p><pre></pre><div class="cta-row"><button class="btn sm" type="button" id="ccopy">${C.copy}</button><button class="btn ghost sm" type="button" id="cedit">${C.edit}</button></div></div>`;
      $('pre', d).textContent = sum;
      $('#ccopy').onclick = async (ev) => { try { await navigator.clipboard.writeText(sum); ev.target.textContent = C.copied; } catch (x) { const r = document.createRange(); r.selectNodeContents($('pre', d)); const s = getSelection(); s.removeAllRanges(); s.addRange(r); ev.target.textContent = C.selected; } };
      $('#cedit').onclick = () => { d.hidden = true; f.hidden = false; };
      d.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  }

  /* 9 ── boot */
  mount(); route();
  const boot = () => { root.classList.add('loaded'); placeTabs(); onScroll(); };
  const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(r => setTimeout(r, 1800))]).then(() => setTimeout(boot, 350));
})();
