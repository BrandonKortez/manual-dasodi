/* =========================================================
   Manual del server · Dasodi — lógica de la página
   ========================================================= */
'use strict';

/* ---------------------------------------------------------
   TIEMPOS DE LA ANIMACIÓN (en milisegundos)
   Ajusta aquí para sincronizar con el GIF.
   El ciclo empieza cuando el GIF arranca desde su primer cuadro.
   --------------------------------------------------------- */
const TIMING = {
  esperaInicial: 600,    // reposo (imagen fija) antes de arrancar el GIF
  sonidoCarga: 900,      // desde que arranca el GIF: empieza a cargar el disparo
  sonidoDisparo: 1020,   // desde que arranca el GIF: suelta el disparo
  salidaBala: 1150,      // desde que arranca el GIF: la bala sale por la derecha del GIF
  balaDuracion: 160,     // lo que tarda la bala en llegar a las letras
  polvoDuracion: 1400,   // cuánto dura la pulverización de cada letra
  polvoEscalonado: 90,   // retraso entre una letra y la siguiente
  duracionGif: 1320,     // lo que dura una vuelta del GIF en el navegador
  pausaRepeticion: 1800, // tiempo con las letras desaparecidas antes de que regresen
  repetir: true          // false = dispara una sola vez
};

const ASSETS = { idle: 'assets/megaman-idle.png', gif: 'assets/megaman.gif' };

/* ---------------------------------------------------------
   CONTENIDO: vive en content.js
   --------------------------------------------------------- */
const LEVELS = window.MANUAL.levels;
const EXTRAS = window.MANUAL.extras;

/* ---------------------------------------------------------
   SONIDOS (Web Audio, sin archivos)
   --------------------------------------------------------- */
const SFX = {
  hover: [{ type: 'square', f: 1320, d: 0.025, v: 0.015 }],
  click: [{ type: 'square', f: 523, to: 1046, d: 0.07, v: 0.04 }, { type: 'triangle', f: 180, to: 90, d: 0.08, v: 0.08 }],
  win: [{ type: 'square', f: 523, d: 0.09, v: 0.04 }, { type: 'square', f: 659, d: 0.09, v: 0.04, at: 0.09 }, { type: 'square', f: 784, d: 0.09, v: 0.04, at: 0.18 }, { type: 'square', f: 1047, d: 0.22, v: 0.04, at: 0.27 }],
  charge: [{ type: 'square', f: 300, to: 1400, d: 0.12, v: 0.02 }],
  shot: [{ type: 'square', f: 1600, to: 500, d: 0.12, v: 0.035 }],
  boom: [{ type: 'sawtooth', f: 220, to: 40, d: 0.45, v: 0.06 }, { type: 'square', f: 90, to: 30, d: 0.5, v: 0.05, at: 0.03 }]
};

/* ---------------------------------------------------------
   Utilidades
   --------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const pad = (n) => (n < 10 ? '0' : '') + n;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CHECK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
const SPK_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a9 9 0 0 1 0 14"></path></svg>';
const MUTE_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"></path><path d="m22 9-6 6"></path><path d="m16 9 6 6"></path></svg>';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('dasodi-manual:' + key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('dasodi-manual:' + key, JSON.stringify(value)); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }
};

/* ---------------------------------------------------------
   Estado
   --------------------------------------------------------- */
const state = {
  view: 'level',        // 'level' o 'extra'
  index: 0,
  tab: 'pasos',
  muted: store.get('muted', false),
  checks: store.get('checks-v2', {}),
  server: store.get('server', '')
};

const isOn = (i, j) => !!state.checks[i + '-' + j];
const levelDone = (i) => LEVELS[i].steps.every((_, j) => isOn(i, j));
const totals = () => {
  let done = 0, total = 0;
  LEVELS.forEach((l, i) => l.steps.forEach((_, j) => { total++; if (isOn(i, j)) done++; }));
  return { done, total };
};

/* Texto: reemplaza {S}, escapa HTML y aplica **negritas** y `código` */
const serverName = () => state.server.trim() || '[nombre del servidor]';
const sub = (txt) => String(txt).split('{S}').join(serverName());
function fmt(txt) {
  return escapeHtml(sub(txt))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

/* Textos para los botones Copiar */
let copyMap = [];
function copyButton(text) {
  const id = copyMap.push(sub(text)) - 1;
  return '<button type="button" class="btn btn-sm copy-btn" data-copy="' + id + '">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>' +
    '<span>Copiar</span></button>';
}

/* ---------------------------------------------------------
   Audio
   --------------------------------------------------------- */
let ac = null;
function wakeAudio() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    if (!ac) ac = new C();
    if (ac.state === 'suspended') ac.resume();
  } catch (e) { /* sin audio */ }
}
function snd(kind) {
  if (state.muted || !ac || ac.state !== 'running') return;
  const notes = SFX[kind];
  if (!notes) return;
  notes.forEach((n) => {
    const t0 = ac.currentTime + (n.at || 0);
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = n.type;
    o.frequency.setValueAtTime(n.f, t0);
    if (n.to) o.frequency.exponentialRampToValueAtTime(n.to, t0 + n.d);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(n.v, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.d);
    o.connect(g); g.connect(ac.destination);
    o.start(t0); o.stop(t0 + n.d + 0.03);
  });
}
document.addEventListener('pointerdown', wakeAudio, { passive: true });
document.addEventListener('keydown', wakeAudio);

let lastHover = 0;
document.addEventListener('pointerover', (e) => {
  const el = e.target.closest('button, summary');
  if (!el || el.contains(e.relatedTarget)) return;
  const t = performance.now();
  if (t - lastHover < 70) return;
  lastHover = t;
  snd('hover');
});

/* ---------------------------------------------------------
   Render
   --------------------------------------------------------- */
function renderHud() {
  const { done, total } = totals();
  $('#xpText').textContent = done + ' / ' + total;
  $('#xpFill').style.width = Math.round((done / total) * 100) + '%';
  $('#masterCount').textContent = done + ' / ' + total;
  $('#brandSub').textContent = state.server.trim() ? state.server.trim() : 'Comunidad de streams en Discord';
  document.title = 'Manual del server · ' + serverName();
  const mute = $('#mute');
  mute.innerHTML = (state.muted ? MUTE_SVG : SPK_SVG) + '<span>' + (state.muted ? 'Sonido apagado' : 'Sonido') + '</span>';
  mute.setAttribute('aria-pressed', String(state.muted));
  mute.setAttribute('aria-label', state.muted ? 'Activar sonido' : 'Silenciar');
}

function renderNav() {
  $('#levels').innerHTML = LEVELS.map((l, i) => {
    const active = state.view === 'level' && state.index === i;
    const doneCount = l.steps.filter((_, j) => isOn(i, j)).length;
    const meta = levelDone(i) ? 'Completado' : (active ? 'En curso · ' : '') + doneCount + ' de ' + l.steps.length;
    const cls = 'lvl' + (active ? ' is-active' : '') + (levelDone(i) ? ' is-done' : '');
    return '<button type="button" class="' + cls + '" data-level="' + i + '"' + (active ? ' aria-current="page"' : '') + '>' +
      '<span class="num">' + pad(i + 1) + '</span>' +
      '<span class="lvl-text"><span class="lvl-title">' + escapeHtml(l.title) + '</span><span class="lvl-meta">' + meta + '</span></span>' +
      '</button>';
  }).join('');
  $('#extras').innerHTML = EXTRAS.map((x, i) => {
    const active = state.view === 'extra' && state.index === i;
    return '<button type="button" class="lvl lvl-extra' + (active ? ' is-active' : '') + '" data-extra="' + i + '"' + (active ? ' aria-current="page"' : '') + '>' +
      '<span class="num">+</span><span class="lvl-text"><span class="lvl-title">' + escapeHtml(x.title) + '</span></span></button>';
  }).join('');
}

function checkButton(i, j, text) {
  return '<button type="button" class="check" role="checkbox" aria-checked="' + isOn(i, j) + '" data-check="' + i + '-' + j + '">' +
    '<span class="box">' + CHECK_SVG + '</span><span class="lbl">' + fmt(text) + '</span></button>';
}

function renderMaster() {
  $('#masterList').innerHTML = LEVELS.map((l, i) =>
    '<div class="master-group"><h3>' + pad(i + 1) + ' · ' + escapeHtml(l.title) + '</h3>' +
    '<div class="tabpanel">' + l.steps.map((s, j) => checkButton(i, j, s.t)).join('') + '</div></div>'
  ).join('');
}

function tableHtml(tb) {
  return '<div class="table-wrap"><table class="tbl"><thead><tr>' +
    tb.head.map((h) => '<th scope="col">' + fmt(h) + '</th>').join('') + '</tr></thead><tbody>' +
    tb.rows.map((r) => '<tr>' + r.map((c) => '<td>' + fmt(c) + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
}

function stepHtml(st, j) {
  let h = '<li class="step"><span class="step-n">' + pad(j + 1) + '</span><div class="step-body">';
  h += '<h3 class="step-title">' + fmt(st.t) + '</h3>';
  if (st.where) h += '<p class="row"><span class="tag tag-where">Dónde</span><span>' + fmt(st.where) + '</span></p>';
  if (st.what) h += '<p class="row"><span class="tag tag-what">Qué hacer</span><span>' + fmt(st.what) + '</span></p>';
  if (st.check) h += '<p class="row"><span class="tag tag-check">Comprueba</span><span>' + fmt(st.check) + '</span></p>';
  if (st.warn) h += '<p class="row row-warn"><span class="tag tag-warn">Ojo</span><span>' + fmt(st.warn) + '</span></p>';
  if (st.copy) h += '<div class="row-copy"><code class="copy-preview">' + escapeHtml(sub(st.copy)) + '</code>' + copyButton(st.copy) + '</div>';
  return h + '</div></li>';
}

function renderMain(animate) {
  copyMap = [];
  const panel = $('#panel');
  const tabs = $('#tabs');
  let html = '';

  if (state.view === 'extra') {
    const x = EXTRAS[state.index];
    $('#levelBadge').textContent = 'Extra';
    $('#levelTitle').textContent = x.title;
    $('#levelDesc').innerHTML = fmt(x.desc);
    tabs.hidden = true;
    panel.removeAttribute('aria-labelledby');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', x.title);
    html = '<div class="cards">' + x.items.map((it) => {
      let c = '<article class="card"><h3 class="step-title">' + fmt(it.q) + '</h3><p>' + fmt(it.a) + '</p>';
      if (it.copy) c += '<pre class="copy-block">' + escapeHtml(sub(it.copy)) + '</pre><div>' + copyButton(it.copy) + '</div>';
      if (it.link) c += '<a class="btn btn-sm" href="' + escapeHtml(it.link) + '" target="_blank" rel="noopener noreferrer">Abrir ' + escapeHtml(it.link.replace(/^https?:\/\//, '')) + '</a>';
      return c + '</article>';
    }).join('') + '</div>';
    $('#prev').disabled = state.index === 0;
    $('#next').disabled = state.index === EXTRAS.length - 1;
    $('#prev').textContent = 'Anterior';
    $('#next').textContent = 'Siguiente';
  } else {
    const i = state.index;
    const l = LEVELS[i];
    $('#levelBadge').textContent = 'Nivel ' + pad(i + 1) + ' / ' + pad(LEVELS.length);
    $('#levelTitle').textContent = l.title;
    $('#levelDesc').innerHTML = fmt(l.desc);
    tabs.hidden = false;
    panel.setAttribute('role', 'tabpanel');
    panel.removeAttribute('aria-label');
    panel.setAttribute('aria-labelledby', 'tab-' + state.tab);
    document.querySelectorAll('.tab').forEach((t) => {
      const on = t.dataset.tab === state.tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });

    if (state.tab === 'pasos') {
      if (l.intro) html += '<p class="intro">' + fmt(l.intro) + '</p>';
      if (l.table) html += tableHtml(l.table);
      html += '<ol class="steps">' + l.steps.map(stepHtml).join('') + '</ol>';
    } else if (state.tab === 'check') {
      html = '<p class="intro">Marca cada tarea cuando la termines. Se guarda en este navegador.</p>' +
        l.steps.map((s, j) => checkButton(i, j, s.t)).join('') +
        (levelDone(i) ? '<div class="levelup">Stage clear</div>' : '');
    } else {
      html = (l.tips || []).map((t) => '<div class="tipcard"><span class="badge">Tip</span><p>' + fmt(t) + '</p></div>').join('');
    }
    $('#prev').disabled = i === 0;
    $('#next').disabled = i === LEVELS.length - 1;
    $('#prev').textContent = 'Nivel anterior';
    $('#next').textContent = 'Siguiente nivel';
  }

  panel.innerHTML = html;
  panel.classList.remove('enter');
  if (animate) { void panel.offsetWidth; panel.classList.add('enter'); }
}

function renderAll(animate) {
  renderHud();
  renderNav();
  renderMaster();
  renderMain(animate);
}

/* ---------------------------------------------------------
   Acciones
   --------------------------------------------------------- */
function go(view, idx, opts) {
  const list = view === 'extra' ? EXTRAS : LEVELS;
  state.view = view;
  state.index = Math.max(0, Math.min(list.length - 1, idx));
  state.tab = 'pasos';
  if (!opts || !opts.fromHash) {
    const hash = '#' + (view === 'extra' ? 'extra-' : 'nivel-') + (state.index + 1);
    try { history.replaceState(null, '', hash); }
    catch (e) { skipHash = true; location.hash = hash; } // algunos navegadores lo bloquean al abrir el archivo local
  }
  renderNav();
  renderMain(true);
}

function toggleCheck(key) {
  const i = Number(key.split('-')[0]);
  const wasDone = levelDone(i);
  state.checks[key] = !state.checks[key];
  store.set('checks-v2', state.checks);
  snd(!wasDone && levelDone(i) ? 'win' : 'click');
  renderHud();
  renderNav();
  renderMaster();
  if (state.view === 'level' && i === state.index && state.tab === 'check') renderMain(false);
}

async function copyText(text, btn) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; }
  catch (e) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove();
    } catch (e2) { ok = false; }
  }
  const label = btn.querySelector('span');
  const old = label.textContent;
  label.textContent = ok ? 'Copiado' : 'No se pudo copiar';
  setTimeout(() => { label.textContent = old; }, 1500);
}

document.addEventListener('click', (e) => {
  const lvl = e.target.closest('[data-level]');
  if (lvl) { snd('click'); go('level', Number(lvl.dataset.level)); $('#main').scrollIntoView({ block: 'start' }); return; }

  const ext = e.target.closest('[data-extra]');
  if (ext) { snd('click'); go('extra', Number(ext.dataset.extra)); $('#main').scrollIntoView({ block: 'start' }); return; }

  const chk = e.target.closest('[data-check]');
  if (chk) { toggleCheck(chk.dataset.check); return; }

  const tab = e.target.closest('[data-tab]');
  if (tab) { snd('click'); state.tab = tab.dataset.tab; renderMain(true); return; }

  const cp = e.target.closest('[data-copy]');
  if (cp) { snd('click'); copyText(copyMap[Number(cp.dataset.copy)] || '', cp); return; }
});

$('#tabs').addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const ids = ['pasos', 'check', 'tips'];
  const k = ids.indexOf(state.tab) + (e.key === 'ArrowRight' ? 1 : -1);
  state.tab = ids[(k + ids.length) % ids.length];
  renderMain(true);
  $('#tab-' + state.tab).focus();
});

$('#prev').addEventListener('click', () => { snd('click'); go(state.view, state.index - 1); });
$('#next').addEventListener('click', () => { snd('click'); go(state.view, state.index + 1); });

$('#mute').addEventListener('click', () => {
  state.muted = !state.muted;
  store.set('muted', state.muted);
  renderHud();
  if (!state.muted) { wakeAudio(); setTimeout(() => snd('click'), 30); }
});

$('#serverForm').addEventListener('submit', (e) => {
  e.preventDefault();
  state.server = $('#serverInput').value.trim();
  store.set('server', state.server);
  snd('click');
  renderAll(false);
  $('#serverStatus').textContent = state.server ? 'Guardado: el manual ya usa «' + state.server + '».' : 'Sin nombre: el manual mostrará [nombre del servidor].';
  setTimeout(() => { $('#serverStatus').textContent = ''; }, 3500);
});

$('#copy').addEventListener('click', () => {
  snd('click');
  const url = location.href.split('#')[0] + '#' + (state.view === 'extra' ? 'extra-' : 'nivel-') + (state.index + 1);
  copyText(url, $('#copy'));
});

$('#master').addEventListener('toggle', () => snd('click'));

function readHash() {
  const m = location.hash.match(/^#(nivel|extra)-(\d+)$/);
  return m ? { view: m[1] === 'extra' ? 'extra' : 'level', idx: Number(m[2]) - 1 } : null;
}
let skipHash = false;
window.addEventListener('hashchange', () => {
  if (skipHash) { skipHash = false; return; }
  const h = readHash();
  if (h) go(h.view, h.idx, { fromHash: true });
});

/* ---------------------------------------------------------
   Mega Man vs DASODI
   --------------------------------------------------------- */
const mm = {
  img: $('#megaman'),
  bullet: $('#bullet'),
  spark: $('#spark'),
  word: $('#word'),
  letters: [],
  timers: []
};

function buildWord() {
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const colors = ['#FFB020', '#FFE45C', '#FF4FA3', '#F4EAFF', '#5AC8FA', '#9DFF5C'];
  const frag = document.createDocumentFragment();
  'DASODI'.split('').forEach((ch, i) => {
    const letter = document.createElement('span');
    letter.className = 'letter';
    letter.setAttribute('aria-hidden', 'true');
    const glyph = document.createElement('span');
    glyph.className = 'glyph';
    glyph.textContent = ch;
    const dust = document.createElement('span');
    dust.className = 'dust';
    for (let k = 0; k < 24; k++) {
      const p = document.createElement('i');
      p.className = 'pt';
      const size = rnd() < 0.3 ? 9 : 6;
      p.style.cssText =
        'left:' + (8 + rnd() * 80).toFixed(1) + '%;top:' + (12 + rnd() * 76).toFixed(1) + '%;' +
        'width:' + size + 'px;height:' + size + 'px;background:' + colors[Math.floor(rnd() * colors.length)] + ';' +
        '--dx:' + Math.round(50 + rnd() * 190) + 'px;--dy:' + Math.round(-150 + rnd() * 150) + 'px;--r:' + Math.round(-180 + rnd() * 360) + 'deg;';
      p.dataset.d = String(rnd());
      dust.appendChild(p);
    }
    letter.appendChild(glyph);
    letter.appendChild(dust);
    frag.appendChild(letter);
    mm.letters.push(letter);
  });
  mm.word.appendChild(frag);
}

function setLetters(cls) {
  mm.letters.forEach((letter, i) => {
    letter.className = 'letter ' + cls;
    const glyph = letter.firstChild;
    if (cls === 'is-dust') {
      glyph.style.animationDelay = (i * TIMING.polvoEscalonado) + 'ms';
      glyph.style.animationDuration = Math.round(TIMING.polvoDuracion * 0.55) + 'ms';
      letter.querySelectorAll('.pt').forEach((p) => {
        const d = Number(p.dataset.d);
        p.style.animationDelay = Math.round(i * TIMING.polvoEscalonado + d * TIMING.polvoDuracion * 0.35) + 'ms';
        p.style.animationDuration = Math.round(TIMING.polvoDuracion * (0.55 + d * 0.45)) + 'ms';
      });
    } else {
      glyph.style.animationDelay = '';
      glyph.style.animationDuration = '';
    }
  });
}

function at(ms, fn) { mm.timers.push(setTimeout(fn, ms)); }
function clearTimers() { mm.timers.forEach(clearTimeout); mm.timers = []; }

function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

function runCycle() {
  clearTimers();
  mm.img.src = ASSETS.idle;
  mm.bullet.classList.remove('is-flying');
  mm.spark.classList.remove('is-on');
  setLetters('is-whole');

  at(TIMING.esperaInicial, () => {
    // Reinicia el GIF desde su primer cuadro (la URL nueva lo obliga)
    mm.img.src = ASSETS.gif + '?t=' + Date.now();

    at(TIMING.sonidoCarga, () => snd('charge'));
    at(TIMING.sonidoDisparo, () => snd('shot'));
    at(TIMING.salidaBala, () => {
      mm.bullet.style.animationDuration = TIMING.balaDuracion + 'ms';
      replay(mm.bullet, 'is-flying');
    });
    at(TIMING.salidaBala + TIMING.balaDuracion, () => {
      mm.bullet.classList.remove('is-flying');
      replay(mm.spark, 'is-on');
      snd('boom');
      setLetters('is-dust');
    });
    // Devuelve la imagen fija para que no vuelva a disparar
    at(TIMING.duracionGif, () => { mm.img.src = ASSETS.idle; });

    const gone = TIMING.salidaBala + TIMING.balaDuracion + TIMING.polvoDuracion + TIMING.polvoEscalonado * 5 + 200;
    at(gone, () => setLetters('is-gone'));
    at(gone + TIMING.pausaRepeticion, () => setLetters('is-reform'));
    at(gone + TIMING.pausaRepeticion + 700, () => {
      setLetters('is-whole');
      if (TIMING.repetir) runCycle();
    });
  });
}

// Precarga para que el primer disparo no tarde
[ASSETS.idle, ASSETS.gif].forEach((src) => { const im = new Image(); im.src = src; });

$('#replay').addEventListener('click', () => { snd('click'); if (!reduceMotion) runCycle(); });

// Pausa la animación cuando la pestaña no está visible
document.addEventListener('visibilitychange', () => {
  if (reduceMotion) return;
  if (document.hidden) { clearTimers(); }
  else { runCycle(); }
});

/* ---------------------------------------------------------
   Arranque
   --------------------------------------------------------- */
(function init() {
  $('#serverInput').value = state.server;
  const h = readHash();
  if (h) {
    state.view = h.view;
    state.index = Math.max(0, Math.min((h.view === 'extra' ? EXTRAS : LEVELS).length - 1, h.idx));
  } else {
    const firstOpen = LEVELS.findIndex((_, i) => !levelDone(i));
    state.view = 'level';
    state.index = firstOpen === -1 ? 0 : firstOpen;
  }
  renderAll(false);
  buildWord();
  if (!reduceMotion) runCycle();
})();
