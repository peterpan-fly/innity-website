/* Innity signal field: one particle system, six formations.
   core    – one ecosystem, four colour quadrants (home)
   seen    – concentric attention rings, pulsing outward
   trusted – community clusters joined by links
   chosen  – a vortex converging on a single point of choice
   enabled – three interlocking orbits around a shared core
   calm    – a slow horizon wave (about / contact)                    */
(function () {
  const noop = { set() {}, pulse() {}, ready: false };
  const canvas = document.getElementById('scene');
  if (!window.THREE || !canvas) { document.documentElement.classList.add('no-webgl'); window.Scene = noop; return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); }
  catch (e) { document.documentElement.classList.add('no-webgl'); window.Scene = noop; return; }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = Math.min(innerWidth, innerHeight) < 700;
  const cores = navigator.hardwareConcurrency || 4;
  const lowEnd = (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) || cores <= 2;
  const PC = Object.assign({ desktop: 12000, laptop: 7500, phone: 5000, lowEnd: 3500 }, (window.INNITY_CONFIG && window.INNITY_CONFIG.particles) || {});
  const N = small ? (lowEnd ? PC.lowEnd : PC.phone) : cores <= 4 ? PC.laptop : PC.desktop;
  const DPR = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 9);
  const group = new THREE.Group(); scene.add(group);

  const PAL = {
    seen: [[0.30, 0.56, 1.0], [0.55, 0.78, 1.0], [0.12, 0.37, 0.68]],
    trusted: [[0.62, 0.45, 1.0], [0.85, 0.70, 1.0], [0.34, 0.22, 0.65]],
    chosen: [[0.30, 0.95, 0.84], [0.72, 1.0, 0.95], [0.08, 0.66, 0.60]],
    enabled: [[0.52, 0.85, 0.30], [0.80, 0.98, 0.45], [0.18, 0.54, 0.15]],
  };
  const KEYS = ['seen', 'trusted', 'chosen', 'enabled'];
  const rnd = (function () { let s = 1337; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

  // per-particle random seeds
  const seed = new Float32Array(N * 4);
  for (let i = 0; i < N * 4; i++) seed[i] = rnd();

  /* Every particle has one role for its whole life, in every formation:
       body    – re-forms into each pillar's shape
       halo    – the "ecosystem orbit": one ring in four pillar-coloured arcs that re-orients per pillar
       nucleus – the Innity six-dot mark, always at the heart of the form                     */
  const ROLE = new Uint8Array(N), WB = new Float32Array(N);
  for (let i = 0; i < N; i++) { const w = seed[i * 4 + 2]; ROLE[i] = w < 0.76 ? 0 : w < 0.88 ? 1 : 2; WB[i] = w < 0.76 ? w / 0.76 : w < 0.88 ? (w - 0.76) / 0.12 : (w - 0.88) / 0.12; }

  // network nodes for "trusted" (node 0 is the hub, where the nucleus sits)
  const nodes = [[0, 0, 0, 0.3]]; for (let i = 1; i < 11; i++) { const a = i * 2.39996, r = 0.95 + 1.55 * Math.sqrt(i / 10); nodes.push([Math.cos(a) * r, Math.sin(a) * r * 0.82, (rnd() - 0.5) * 1.5, 0.15 + rnd() * 0.18]); }
  const edges = []; for (let i = 1; i < nodes.length; i++) { const d = nodes.map((n, j) => [j, Math.hypot(n[0] - nodes[i][0], n[1] - nodes[i][1], n[2] - nodes[i][2])]).filter(x => x[0] !== i && x[0] !== 0).sort((a, b) => a[1] - b[1]); edges.push([i, d[0][0]], [i, 0]); if (i % 2) edges.push([i, d[1][0]]); }
  // surface clusters on the home sphere (an echo of the Trusted network)
  const sph = []; for (let i = 0; i < 9; i++) { const y = 1 - (i + 0.5) / 4.5, r = Math.sqrt(1 - y * y), a = i * 2.39996; sph.push([Math.cos(a) * r, y, Math.sin(a) * r]); }

  /* Nucleus = the Innity mark: six circles in a ring (the upper-left one lime, with its outline ring)
     and the cursor arrow in the centre pointing at it. It is drawn in view space (NM cancels the
     group's rotation) so it always faces the viewer and reads as the logo in every formation. */
  const NM = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  /* Pillar icons share the nucleus particles, so the logo morphs into each icon.
     Each icon is a list of parts (polylines, circles, filled areas). Particles are scattered around
     the strokes, with sparse fill and a little dust, so the icon reads as particles, not a solid glyph.
     Seen = eye, Trusted = group of people, Chosen = shopping cart, Enabled = handshake.           */
  const ell = (cx, cy, rx, ry, a0, a1, n) => { const p = []; for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return p; };
  const ICONS = {
    seen: [
      { w: 3, pts: ell(0, 0, 0.86, 0.46, 0, Math.PI, 24).map(([x]) => [x, 0.46 * Math.cos(x / 0.86 * 1.5708)]) },
      { w: 3, pts: ell(0, 0, 0.86, 0.46, 0, Math.PI, 24).map(([x]) => [x, -0.46 * Math.cos(x / 0.86 * 1.5708)]) },
      { w: 2, hi: 1, pts: ell(0, 0, 0.27, 0.27, 0, 6.2832, 32) },
      { w: 1.2, fill: 'disk', c: [0, 0], r: 0.13 },
    ],
    trusted: [
      { w: 2.2, hi: 1, pts: ell(0, 0.3, 0.21, 0.21, 0, 6.2832, 28) },
      { w: 2.6, hi: 1, pts: ell(0, -0.46, 0.42, 0.42, 0, Math.PI, 26).concat([[-0.42, -0.46], [0.42, -0.46]]) },
      { w: 1.2, fill: 'quad', q: [[-0.36, -0.2], [0.36, -0.2], [0.4, -0.45], [-0.4, -0.45]] },
      { w: 1.4, pts: ell(-0.58, 0.2, 0.15, 0.15, 0, 6.2832, 20) },
      { w: 1.4, pts: ell(0.58, 0.2, 0.15, 0.15, 0, 6.2832, 20) },
      { w: 1.5, pts: ell(-0.62, -0.38, 0.3, 0.3, Math.PI * 0.45, Math.PI, 14).concat([[-0.92, -0.38], [-0.5, -0.38]]) },
      { w: 1.5, pts: ell(0.62, -0.38, 0.3, 0.3, 0, Math.PI * 0.55, 14).reverse().concat([[0.92, -0.38], [0.5, -0.38]]) },
    ],
    chosen: [
      { w: 2.4, pts: [[-0.96, 0.56], [-0.72, 0.56], [-0.46, -0.34], [0.78, -0.34]] },
      { w: 3, hi: 1, pts: [[-0.62, 0.34], [0.92, 0.34], [0.74, -0.14], [-0.49, -0.14], [-0.62, 0.34]] },
      { w: 1.6, fill: 'quad', q: [[-0.58, 0.3], [0.86, 0.3], [0.7, -0.1], [-0.47, -0.1]] },
      { w: 1, pts: ell(-0.33, -0.58, 0.11, 0.11, 0, 6.2832, 16) },
      { w: 1, pts: ell(0.62, -0.58, 0.11, 0.11, 0, 6.2832, 16) },
    ],
    enabled: [ // line-art handshake: angled cuffs, upper hand with thumb, lower fist and fingers
      { w: 1.2, pts: [[-0.62, 0.6], [-0.99, 0.03]] },
      { w: 0.5, pts: [[-0.7, 0.66], [-0.54, 0.54]] }, { w: 0.5, pts: [[-1.05, 0.09], [-0.92, -0.02]] },
      { w: 1.2, pts: [[0.55, 0.6], [0.92, 0.03]] },
      { w: 0.5, pts: [[0.47, 0.54], [0.63, 0.66]] }, { w: 0.5, pts: [[0.86, -0.02], [0.99, 0.09]] },
      { w: 0.8, hi: 1, pts: [[-0.56, 0.52], [-0.3, 0.42]] },
      { w: 0.8, hi: 1, pts: [[-0.93, -0.02], [-0.7, -0.1]] },
      { w: 3.2, white: 1, pts: [[0.5, 0.53], [0.3, 0.46], [-0.1, 0.48], [-0.28, 0.41], [-0.42, 0.24], [-0.36, 0.09], [-0.14, 0.11], [0.0, 0.22], [0.2, 0.13], [0.48, 0.06]] },
      { w: 1.6, hi: 1, pts: [[0.86, 0.0], [0.6, -0.26], [0.36, -0.5], [0.06, -0.6], [-0.08, -0.56]] },
      { w: 1.0, white: 1, pts: [[-0.06, -0.2], [0.28, -0.47]] },
      { w: 1.0, white: 1, pts: [[0.08, -0.08], [0.44, -0.36]] },
      { w: 1.0, white: 1, pts: [[0.22, 0.03], [0.56, -0.22]] },
      { w: 0.9, hi: 1, pts: ell(-0.62, -0.14, 0.1, 0.1, 0, 6.2832, 16) },
      { w: 0.9, hi: 1, pts: ell(-0.46, -0.31, 0.1, 0.1, 0, 6.2832, 16) },
      { w: 0.9, hi: 1, pts: ell(-0.3, -0.45, 0.1, 0.1, 0, 6.2832, 16) },
      { w: 0.9, hi: 1, pts: ell(-0.13, -0.56, 0.09, 0.09, 0, 6.2832, 16) },
    ],
  };
  for (const k in ICONS) { // precompute segment lengths and cumulative weights
    let tot = 0; ICONS[k].forEach(pt => { tot += pt.w; if (pt.pts) { pt.L = []; let l = 0; for (let m = 1; m < pt.pts.length; m++) { l += Math.hypot(pt.pts[m][0] - pt.pts[m - 1][0], pt.pts[m][1] - pt.pts[m - 1][1]); pt.L.push(l); } pt.len = l; } });
    let c = 0; ICONS[k].forEach(pt => { c += pt.w / tot; pt.cw = c; });
  }
  const dustOf = (shape) => (shape === 'enabled' ? 0.05 : 0.14);
  const partOf = (shape, u) => { const DUST = dustOf(shape); if (u < DUST) return -1; const f = (u - DUST) / (1 - DUST), P2 = ICONS[shape]; for (let m = 0; m < P2.length; m++) if (f <= P2[m].cw) return m; return P2.length - 1; };
  function icon2d(shape, i, out) {
    const u = seed[i * 4], v = seed[i * 4 + 1], q = seed[i * 4 + 3], w = WB[i], m = partOf(shape, u);
    let x, y;
    if (m < 0) { const a = q * 6.28318, r = 0.55 + 0.6 * v; x = Math.cos(a) * r; y = Math.sin(a) * r * 0.85; }
    else {
      const pt = ICONS[shape][m];
      if (pt.fill === 'disk') { const a = q * 6.28318, r = pt.r * Math.sqrt(v); x = pt.c[0] + Math.cos(a) * r; y = pt.c[1] + Math.sin(a) * r; }
      else if (pt.fill === 'quad') { const Q = pt.q, tx = q, ty = v, ax = Q[0][0] + (Q[1][0] - Q[0][0]) * tx, ay = Q[0][1] + (Q[1][1] - Q[0][1]) * tx, bx = Q[3][0] + (Q[2][0] - Q[3][0]) * tx, by = Q[3][1] + (Q[2][1] - Q[3][1]) * tx; x = ax + (bx - ax) * ty; y = ay + (by - ay) * ty; }
      else { const d = q * pt.len; let k = 0; while (k < pt.L.length - 1 && pt.L[k] < d) k++; const l0 = k ? pt.L[k - 1] : 0, f = (d - l0) / Math.max(1e-6, pt.L[k] - l0), A = pt.pts[k], B = pt.pts[k + 1]; x = A[0] + (B[0] - A[0]) * f; y = A[1] + (B[1] - A[1]) * f; }
      if (!pt.fill) { const sc = (0.035 + 0.05 * w * w) * (shape === 'enabled' ? 0.55 : 1); x += (v - 0.5) * sc * 2; y += (w - 0.5) * sc; }
    }
    out[0] = x; out[1] = y;
  }
  function iconColor(shape, i, pillar, c) {
    const u = seed[i * 4], q = seed[i * 4 + 3], m = partOf(shape, u), pt = m >= 0 ? ICONS[shape][m] : null;
    let s, d = 1;
    if (!pt) { s = pillar[2]; d = 0.75; }
    else if (pt.white || q > 0.9) { c[0] = 0.92; c[1] = 0.98; c[2] = 1; return; }
    else if (pt.fill) { s = pt.hi ? pillar[1] : pillar[0]; d = 0.8; }
    else if (pt.hi && shape === 'enabled') { const a = pillar[1]; c[0] = (a[0] + 1) / 2; c[1] = (a[1] + 1) / 2; c[2] = (a[2] + 1) / 2; return; }
    else s = pt.hi ? pillar[1] : pillar[0];
    c[0] = Math.min(1, s[0] * d); c[1] = Math.min(1, s[1] * d); c[2] = Math.min(1, s[2] * d);
  }
  const i2 = [0, 0];
  function nucleus(i, t, o, sc, cx, cy, cz, shape) {
    const u = seed[i * 4], v = seed[i * 4 + 1], q = seed[i * 4 + 3], w = WB[i];
    let x, y;
    if (shape) { icon2d(shape, i, i2); x = i2[0]; y = i2[1]; }
    else if (u < 0.8) { // six circles
      const k = Math.floor(u / 0.8 * 6), a = 2.0944 - k * 1.0472, th = q * 6.28318;
      const rr = k === 0 ? (w < 0.55 ? 0.125 * Math.sqrt(v) : 0.215 + (v - 0.5) * 0.02) : 0.2 * Math.sqrt(v);
      x = Math.cos(a) * 0.62 + Math.cos(th) * rr; y = Math.sin(a) * 0.62 + Math.sin(th) * rr;
    } else { // cursor arrow: head + tail, pointing up-left
      let ax, ay;
      if (w < 0.72) { let b1 = v, b2 = q; if (b1 + b2 > 1) { b1 = 1 - b1; b2 = 1 - b2; } ax = -0.17 * b1 + 0.17 * b2; ay = 0.3 - 0.33 * (b1 + b2); }
      else { ax = (v - 0.5) * 0.1; ay = -0.03 - q * 0.24; }
      x = (ax - ay) * 0.7071 + 0.03; y = (ax + ay) * 0.7071 - 0.03;
    }
    x *= sc; y *= sc; const z = (w - 0.5) * 0.05 * sc;
    o[0] = cx + NM[0] * x + NM[1] * y + NM[2] * z; o[1] = cy + NM[3] * x + NM[4] * y + NM[5] * z; o[2] = cz + NM[6] * x + NM[7] * y + NM[8] * z;
  }
  function halo(i, t, o, R, ang, cy) {
    const u = seed[i * 4], q = seed[i * 4 + 3], qd = Math.floor(u * 4), fr = u * 4 - qd;
    const a = (qd + 0.05 + 0.9 * fr) * 1.5708 + t * 0.07, r = R + (q - 0.5) * 0.07;
    const x = Math.cos(a) * r, y = Math.sin(a) * r, z = (WB[i] - 0.5) * 0.06, c = Math.cos(ang), s = Math.sin(ang);
    o[0] = x; o[1] = cy + y * c - z * s; o[2] = y * s + z * c;
  }

  const F = {
    core(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 1.08, 0, 0, 0);
      if (ROLE[i] === 1) return halo(i, t, o, 2.85, 1.2, 0);
      const u = seed[i * 4], v = seed[i * 4 + 1], q = seed[i * 4 + 3], w = WB[i];
      if (q < 0.58) { // soft shell
        const th = u * 6.28318 + t * 0.05, ph = Math.acos(2 * v - 1), r = 2.25 + (w - 0.5) * 0.12 + Math.sin(t * 0.8 + u * 20) * 0.03;
        o[0] = r * Math.sin(ph) * Math.cos(th); o[1] = r * Math.cos(ph); o[2] = r * Math.sin(ph) * Math.sin(th);
      } else if (q < 0.82) { // latitude bands: an echo of the Seen rings
        const m = Math.floor(v * 5), ph = (m + 1) / 6 * 3.14159, th = u * 6.28318 + t * (m % 2 ? 0.1 : -0.08), r = 2.25;
        o[0] = r * Math.sin(ph) * Math.cos(th); o[1] = r * Math.cos(ph) + (w - 0.5) * 0.03; o[2] = r * Math.sin(ph) * Math.sin(th);
      } else { // surface clusters: an echo of the Trusted network
        const n = sph[Math.floor(u * 9)], a = v * 6.28318, rr = 0.2 * Math.sqrt(w);
        let x = n[0] * 2.25 + Math.cos(a) * rr, y = n[1] * 2.25 + Math.sin(a) * rr, z = n[2] * 2.25 + Math.sin(a * 3) * rr; const l = 2.27 / Math.sqrt(x * x + y * y + z * z);
        const c = Math.cos(t * 0.05), s = Math.sin(t * 0.05); o[0] = (x * c - z * s) * l; o[1] = y * l; o[2] = (x * s + z * c) * l;
      }
    },
    seen(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 0.88, 0, 0, 0, 'seen');
      if (ROLE[i] === 1) return halo(i, t, o, 2.8, 0, 0);
      const u = seed[i * 4], v = seed[i * 4 + 1], ring = 1 + Math.floor(v * 5);
      const r = (0.42 + ring * 0.4 + (WB[i] - 0.5) * 0.06) * (1 + 0.045 * Math.sin(t * 1.6 - ring * 0.9)), a = u * 6.28318 + t * (ring % 2 ? 0.12 : -0.09);
      o[0] = Math.cos(a) * r; o[1] = Math.sin(a) * r; o[2] = Math.sin(r * 2.4 - t * 1.6) * 0.16 + (seed[i * 4 + 3] - 0.5) * 0.05;
    },
    trusted(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 0.7, 0, 0, 0, 'trusted');
      if (ROLE[i] === 1) return halo(i, t, o, 2.9, 1.15, 0);
      const u = seed[i * 4], v = seed[i * 4 + 1], w = WB[i], q = seed[i * 4 + 3];
      if (w < 0.66) { const n = nodes[1 + Math.floor(u * (nodes.length - 1))], rr = n[3] * Math.cbrt(v) * (1 + 0.08 * Math.sin(t * 1.3 + u * 30)), th = q * 6.28318, ph = Math.acos(2 * ((u * 97) % 1) - 1);
        o[0] = n[0] + rr * Math.sin(ph) * Math.cos(th); o[1] = n[1] + rr * Math.cos(ph); o[2] = n[2] + rr * Math.sin(ph) * Math.sin(th);
      } else { const e = edges[Math.floor(u * edges.length)], a = nodes[e[0]], b = nodes[e[1]], k = (v + t * 0.06) % 1;
        o[0] = a[0] + (b[0] - a[0]) * k + (q - 0.5) * 0.03; o[1] = a[1] + (b[1] - a[1]) * k + (q - 0.5) * 0.03; o[2] = a[2] + (b[2] - a[2]) * k; }
    },
    chosen(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 0.56 * (1 + 0.05 * Math.sin(t * 2.2)), 0, -1.5, 0, 'chosen');
      if (ROLE[i] === 1) return halo(i, t, o, 2.75, 1.5708, 1.55);
      const u = seed[i * 4], v = seed[i * 4 + 1];
      const k = (v + t * 0.045) % 1, r = 2.7 * Math.pow(1 - k, 1.7) + 0.05, a = u * 6.28318 + k * 9.5 + Math.floor(u * 5) * 1.2566;
      o[0] = Math.cos(a) * r; o[2] = Math.sin(a) * r; o[1] = 1.55 - 3.0 * Math.pow(k, 0.8) + (seed[i * 4 + 3] - 0.5) * 0.06;
    },
    enabled(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 0.9, 0, 0, 0, 'enabled');
      if (ROLE[i] === 1) return halo(i, t, o, 2.6, 1.5708, 0);
      const u = seed[i * 4], v = seed[i * 4 + 1], q = seed[i * 4 + 3];
      const k = Math.floor(v * 3), a = u * 6.28318 + t * (0.1 + k * 0.03), R = 1.95 + (q - 0.5) * 0.09, tube = (WB[i] - 0.5) * 0.1;
      const x = Math.cos(a) * R, y = Math.sin(a) * R, ca = Math.cos(k * 1.0472 + 0.3), sa = Math.sin(k * 1.0472 + 0.3), cb = Math.cos(k * 2.0944), sb = Math.sin(k * 2.0944);
      const y1 = y * ca - tube * sa, z1 = y * sa + tube * ca; o[0] = x * cb + z1 * sb; o[1] = y1; o[2] = -x * sb + z1 * cb;
    },
    calm(i, t, o) {
      if (ROLE[i] === 2) return nucleus(i, t, o, 0.5, 0, 0.9, -1.2);
      const u = seed[i * 4], v = seed[i * 4 + 1], x = (u - 0.5) * 9, z = (v - 0.5) * 6;
      o[0] = x; o[2] = z; o[1] = -1.2 + Math.sin(x * 0.9 + t * 0.6) * 0.28 + Math.cos(z * 1.3 - t * 0.45) * 0.22;
    },
  };
  function colorFor(name, i, c) {
    const u = seed[i * 4], q = seed[i * 4 + 3], pillar = PAL[name];
    if (ROLE[i] === 2 && pillar) { iconColor(name, i, pillar, c); return; }
    if (ROLE[i] === 2) { if (u < 0.8 / 6) { c[0] = 0.66; c[1] = 0.82; c[2] = 0.18; } else { c[0] = 0.95; c[1] = 0.99; c[2] = 1; } return; }
    if (ROLE[i] === 1 && name !== 'calm') { // halo keeps all four colours; the active pillar's arc brightens
      const key = KEYS[Math.floor(u * 4)], p = PAL[key], on = !pillar || key === name, s = pillar && on ? p[1] : p[0], d = on ? 1 : 0.32;
      c[0] = s[0] * d; c[1] = s[1] * d; c[2] = s[2] * d; return;
    }
    const p = pillar || PAL[KEYS[Math.floor(u * 4)]], s = q < 0.62 ? p[0] : q < 0.82 ? p[1] : p[2], dm = name === 'enabled' ? 0.7 : 1;
    c[0] = s[0] * dm; c[1] = s[1] * dm; c[2] = s[2] * dm;
  }

  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), tcol = new Float32Array(N * 3), size = new Float32Array(N);
  const tmp = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    F.core(i, 0, tmp); pos[i * 3] = tmp[0]; pos[i * 3 + 1] = tmp[1]; pos[i * 3 + 2] = tmp[2];
    colorFor('core', i, tmp); tcol[i * 3] = col[i * 3] = tmp[0]; tcol[i * 3 + 1] = col[i * 3 + 1] = tmp[1]; tcol[i * 3 + 2] = col[i * 3 + 2] = tmp[2];
    const q = seed[i * 4 + 3]; size[i] = (q > 0.985 ? 3.4 : q > 0.9 ? 1.9 : 0.75 + q * 0.7) * (ROLE[i] === 2 ? 1.0 : ROLE[i] === 1 ? 0.9 : 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    uniforms: { uScale: { value: 1 }, uOpacity: { value: 1 } },
    vertexShader: 'attribute vec3 aColor; attribute float aSize; uniform float uScale; varying vec3 vC; varying float vF; void main(){ vC=aColor; vec4 mv=modelViewMatrix*vec4(position,1.0); vF=clamp(1.25-(-mv.z-6.0)*0.11,0.25,1.0); gl_PointSize=aSize*uScale/(-mv.z); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'precision mediump float; uniform float uOpacity; varying vec3 vC; varying float vF; void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.0,d); a=a*a*(0.55+0.45*step(d,0.14)); gl_FragColor=vec4(vC*vF,a*uOpacity); }',
  });
  const points = new THREE.Points(geo, mat); points.frustumCulled = false; group.add(points);

  // far dust for depth
  const DN = small ? 260 : 620, dpos = new Float32Array(DN * 3), dcol = new Float32Array(DN * 3), dsize = new Float32Array(DN);
  for (let i = 0; i < DN; i++) { dpos[i * 3] = (rnd() - 0.5) * 26; dpos[i * 3 + 1] = (rnd() - 0.5) * 15; dpos[i * 3 + 2] = -3 - rnd() * 12; const b = 0.25 + rnd() * 0.4; dcol[i * 3] = 0.4 * b; dcol[i * 3 + 1] = 0.9 * b; dcol[i * 3 + 2] = b; dsize[i] = 0.8 + rnd() * 1.6; }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3)); dgeo.setAttribute('aColor', new THREE.BufferAttribute(dcol, 3)); dgeo.setAttribute('aSize', new THREE.BufferAttribute(dsize, 1));
  const dust = new THREE.Points(dgeo, mat); dust.frustumCulled = false; scene.add(dust);

  // state
  let form = 'core', want = { x: 0, y: 0, s: 1, o: 1 }, cur = { x: 0, y: 0, s: 1, o: 0 };
  let morph = 0, yaw = 0, tiltC = 0, yawC = 0, front = 1.4, first = true;
  const TILT = { core: 0.12, seen: -0.55, trusted: 0.1, chosen: 0.28, enabled: 0.2, calm: 0.2 }, YAW = { seen: -0.35 }, SPIN = { seen: 0.02, calm: 0.03 };
  let mx = 0, my = 0, rx = 0, ry = 0, spinX = 0, spinY = 0, dragging = false, lx = 0, ly = 0, pulse = 0, t = 0, last = performance.now(), running = true, dirty = true;
  const mouseW = new THREE.Vector3(99, 99, 0), mouseL = new THREE.Vector3(), inv = new THREE.Matrix4(), ray = new THREE.Vector3();

  function resize() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    mat.uniforms.uScale.value = Math.max(h, w * 0.6) * DPR * 0.052; dirty = true;
  }
  addEventListener('resize', resize); resize();

  addEventListener('pointermove', (e) => {
    mx = (e.clientX / innerWidth) * 2 - 1; my = -((e.clientY / innerHeight) * 2 - 1);
    if (dragging) { spinY += (e.clientX - lx) * 0.006; spinX += (e.clientY - ly) * 0.006; lx = e.clientX; ly = e.clientY; }
    ray.set(mx, my, 0.5).unproject(camera).sub(camera.position).normalize();
    const d = -camera.position.z / ray.z; mouseW.copy(camera.position).add(ray.multiplyScalar(d)); dirty = true;
  }, { passive: true });
  addEventListener('pointerdown', (e) => { if (e.target.closest && e.target.closest('[data-drag]')) { dragging = true; lx = e.clientX; ly = e.clientY; document.documentElement.classList.add('dragging'); } });
  addEventListener('pointerup', () => { if (dragging) { dragging = false; document.documentElement.classList.remove('dragging'); } });
  document.documentElement.addEventListener('pointerleave', () => { mouseW.set(99, 99, 0); }); // window never receives pointerleave
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(frame); } });

  let skip = false;
  function frame(now) {
    if (!running) return;
    // while the field is only a faint backdrop, update it on every other frame to save battery
    if (!reduce && cur.o < 0.2 && want.o < 0.2 && (skip = !skip)) { requestAnimationFrame(frame); return; }
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    if (!reduce) t += dt;
    const k = reduce ? 1 : 1 - Math.exp(-dt * 3.2), kc = reduce ? 1 : 1 - Math.exp(-dt * 2.4);
    cur.x += (want.x - cur.x) * kc; cur.y += (want.y - cur.y) * kc; cur.s += (want.s - cur.s) * kc; cur.o += (want.o - cur.o) * kc;
    if (!dragging) { spinX *= 0.94; spinY *= 0.94; }
    rx += ((-my * 0.22 + spinX) - rx) * 0.08; ry += ((mx * 0.34 + spinY) - ry) * 0.08;
    group.position.set(cur.x, cur.y, 0); group.scale.setScalar(cur.s);
    if (front > 0) { front -= dt; const kf = reduce ? 1 : 1 - Math.exp(-dt * 6), tw = Math.round(yaw / 6.28318) * 6.28318; yaw += (tw - yaw) * kf; tiltC += (0 - tiltC) * kf; yawC += (0 - yawC) * kf; }
    else { yaw += reduce ? 0 : dt * (SPIN[form] != null ? SPIN[form] : 0.07); const ka = 1 - Math.exp(-dt * 1.2); tiltC += ((TILT[form] || 0) - tiltC) * ka; yawC += ((YAW[form] || 0) - yawC) * ka; }
    morph *= Math.exp(-dt * 2.4);
    group.rotation.set(rx + tiltC, ry + yaw + yawC, 0);
    group.updateMatrixWorld(); inv.copy(group.matrixWorld).invert(); mouseL.copy(mouseW).applyMatrix4(inv);
    { const e = inv.elements, k2 = cur.s; NM[0] = e[0] * k2; NM[1] = e[4] * k2; NM[2] = e[8] * k2; NM[3] = e[1] * k2; NM[4] = e[5] * k2; NM[5] = e[9] * k2; NM[6] = e[2] * k2; NM[7] = e[6] * k2; NM[8] = e[10] * k2; }
    mat.uniforms.uOpacity.value = cur.o;
    pulse *= 0.93;
    const f = F[form], R2 = 0.85, mxl = mouseL.x, myl = mouseL.y, mzl = mouseL.z;
    for (let i = 0; i < N; i++) {
      f(i, t, tmp);
      let tx = tmp[0], ty = tmp[1], tz = tmp[2];
      const dx = tx - mxl, dy = ty - myl, dz = (tz - mzl) * 0.35, d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < R2 && ROLE[i] !== 2) { const p = (1 - d2 / R2), l = Math.sqrt(d2) + 0.0001, s2 = p * p * 0.55; tx += dx / l * s2; ty += dy / l * s2; }
      if (morph > 0.01 && ROLE[i] !== 2) { const an = morph * (0.7 + seed[i * 4 + 1] * 1.5), c = Math.cos(an), s1 = Math.sin(an), e = 1 + morph * 0.22, x = (tx * c - tz * s1) * e, z = (tx * s1 + tz * c) * e; tx = x; tz = z; ty *= 1 + morph * 0.1; }
      if (pulse > 0.01) { const l = Math.sqrt(tx * tx + ty * ty + tz * tz) + 0.001, s3 = pulse * 0.55 * (0.5 + seed[i * 4 + 3]); tx += tx / l * s3; ty += ty / l * s3; tz += tz / l * s3; }
      const j = i * 3, kk = k * (0.55 + seed[i * 4 + 2] * 0.9);
      pos[j] += (tx - pos[j]) * kk; pos[j + 1] += (ty - pos[j + 1]) * kk; pos[j + 2] += (tz - pos[j + 2]) * kk;
      col[j] += (tcol[j] - col[j]) * kc; col[j + 1] += (tcol[j + 1] - col[j + 1]) * kc; col[j + 2] += (tcol[j + 2] - col[j + 2]) * kc;
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.aColor.needsUpdate = true;
    dust.rotation.y = mx * 0.03 + t * 0.004; dust.position.y = (window.scrollY || 0) * 0.0006;
    renderer.render(scene, camera);
    if (!reduce || dirty) { dirty = false; requestAnimationFrame(frame); }
  }
  function kick() { if (reduce) { dirty = true; last = performance.now(); requestAnimationFrame(frame); } }

  window.Scene = {
    ready: true, count: N,
    set(name, o) {
      if (F[name] && name !== form) { form = name; front = 1.4; if (!reduce && !first) morph = 1; if (first) { for (let i = 0; i < N; i++) { F[name](i, t, tmp); pos[i * 3] = tmp[0]; pos[i * 3 + 1] = tmp[1]; pos[i * 3 + 2] = tmp[2]; } } for (let i = 0; i < N; i++) { colorFor(name, i, tmp); tcol[i * 3] = tmp[0]; tcol[i * 3 + 1] = tmp[1]; tcol[i * 3 + 2] = tmp[2]; } }
      if (o) { if (o.x != null) want.x = o.x; if (o.y != null) want.y = o.y; if (o.s != null) want.s = o.s; if (o.o != null) want.o = o.o; if (first) { cur.x = want.x; cur.y = want.y; cur.s = want.s; first = false; front = 1.4; } }
      kick();
    },
    pulse() { if (!reduce) pulse = 1; },
    get form() { return form; },
  };
  requestAnimationFrame(frame);
})();
