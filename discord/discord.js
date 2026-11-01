/* =========================================================
   Vista Discord del manual — lógica (Fases 1, 2 y 3)
   Comparte con el manual clásico: content.js, el avance de tareas
   (progress-v3), el nombre del servidor y el sonido.
   ========================================================= */
'use strict';

const LEVELS = window.MANUAL.levels;
const MAP = window.SERVER_MAP;
const PAGES = (window.SERVER_PAGES && window.SERVER_PAGES.pages) || {};
const SETTINGS = (window.SERVER_PAGES && window.SERVER_PAGES.settings) || [];

/* ---------- utilidades ---------- */
const $ = (s) => document.querySelector(s);
const pad = (n) => (n < 10 ? '0' : '') + n;
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const store = {
  get(k, d) { try { const v = localStorage.getItem('dasodi-manual:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dasodi-manual:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
};
const serverName = () => (store.get('server', '') || '').trim() || '[nombre del servidor]';
const sub = (t) => String(t).split('{S}').join(serverName());
const TYPE_CLASS = { Texto: 'texto', Anuncios: 'anuncios', Foro: 'foro', Voz: 'voz', Escenario: 'escenario' };
const typeBadge = (t) => '<span class="type type-' + TYPE_CLASS[t] + '">' + t + '</span>';
function fmt(t) {
  return esc(sub(t))
    .replace(/\{T:(Texto|Anuncios|Foro|Voz|Escenario)\}/g, (_, x) => typeBadge(x))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

/* ---------- avance de tareas (mismo que el manual clásico) ---------- */
function loadProgress() {
  const saved = store.get('progress-v3', null);
  if (saved && typeof saved === 'object') return saved;
  // Misma migración que el manual clásico, por si esta vista se abre primero
  const LEGACY_ORDER = [["cuentas-1", "cuentas-2", "cuentas-3"], ["crear-1", "crear-2", "crear-3", "crear-4", "crear-5"], ["comunidad-1", "comunidad-2", "comunidad-3", "comunidad-4", "comunidad-5"], ["roles-1", "roles-2", "roles-3", "roles-4", "roles-5", "roles-6", "roles-7"], ["canales-1", "canales-2", "canales-3", "canales-4", "canales-5", "canales-6", "canales-7", "canales-8"], ["onboarding-1", "onboarding-2", "onboarding-3", "onboarding-4", "onboarding-5", "onboarding-6"], ["bienvenida-1", "bienvenida-2", "bienvenida-3", "bienvenida-4", "bienvenida-5", "bienvenida-6"], ["bots-1", "bots-2", "bots-3", "bots-4", "bots-5"], ["seguridad-1", "seguridad-2", "seguridad-3", "seguridad-4", "seguridad-5"], ["botpropio-1", "botpropio-2", "botpropio-3", "botpropio-4", "botpropio-5", "botpropio-6", "botpropio-7"], ["instalar-1", "instalar-2", "instalar-3", "instalar-4", "instalar-5", "instalar-6", "instalar-7", "instalar-8"], ["fondo-1", "fondo-2", "fondo-3", "fondo-4", "fondo-5", "fondo-6", "fondo-7"]];
  const old = store.get('checks-v2', {});
  const p = {};
  Object.keys(old).forEach((k) => {
    if (!old[k]) return;
    const [i, j] = k.split('-').map(Number);
    const id = LEGACY_ORDER[i] && LEGACY_ORDER[i][j];
    if (id) p[id] = 'done';
  });
  store.set('progress-v3', p);
  return p;
}
let progress = loadProgress();
const taskStatus = (id) => progress[id] || 'todo';
function setTask(id, v) {
  progress = store.get('progress-v3', progress) || {}; // por si el manual clásico cambió algo en otra pestaña
  if (v === 'todo') delete progress[id]; else progress[id] = v;
  store.set('progress-v3', progress);
}

const TASKS = {};
LEVELS.forEach((l, i) => l.steps.forEach((s) => { TASKS[s.id] = { step: s, level: i, levelTitle: l.title }; }));

/* ---------- elementos y su estado ---------- */
const EL = {};
const ORDER = [];
MAP.categories.forEach((c) => c.channels.forEach((ch) => { EL[ch.id] = Object.assign({ kind: 'channel', category: c.name }, ch); ORDER.push(ch.id); }));
MAP.roles.forEach((r) => { EL[r.id] = Object.assign({ kind: 'role' }, r); ORDER.push(r.id); });
MAP.bots.forEach((b) => { EL[b.id] = Object.assign({ kind: 'bot' }, b); ORDER.push(b.id); });
// Páginas de arriba (Eventos, Explorar canales…): no tienen estado ni cuentan en la leyenda
Object.keys(PAGES).forEach((id) => { EL[id] = Object.assign({ kind: 'page', id: id }, PAGES[id]); });
const TOP_ENTRIES = ['p-eventos', 'p-explorar', 'p-miembros', 'p-mejoras'].filter((id) => EL[id]);

let elState = store.get('elements-v1', {});
const stateOf = (id) => elState[id] || EL[id].state || 'pending';
function setState(id, st) {
  elState = store.get('elements-v1', elState) || {};
  elState[id] = st;
  store.set('elements-v1', elState);
}
const tasksDone = (el) => (el.tasks || []).length > 0 && el.tasks.every((t) => TASKS[t] && taskStatus(t) !== 'todo');

/* ---------- íconos propios (no son los oficiales de Discord) ---------- */
const ICONS = {
  texto: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M10.2 3.1a1 1 0 0 1 .8 1.1L10.5 8h4l.6-4.1a1 1 0 0 1 2 .3L16.5 8H20a1 1 0 1 1 0 2h-3.8l-.6 4H19a1 1 0 1 1 0 2h-3.7l-.6 4.1a1 1 0 0 1-2-.3l.6-3.8h-4l-.6 4.1a1 1 0 0 1-2-.3L7.3 16H4a1 1 0 1 1 0-2h3.6l.6-4H5a1 1 0 0 1 0-2h3.5l.6-4.1a1 1 0 0 1 1.1-.8ZM9.6 14h4l.6-4h-4l-.6 4Z"/></svg>',
  anuncios: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M19 3.5a1 1 0 0 1 1.5.9v14.2a1 1 0 0 1-1.5.9L13.7 16H8l.9 3.6a1 1 0 0 1-1 1.4H6.5a1 1 0 0 1-1-.8L4.3 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h9.7L19 3.5ZM22 11a1 1 0 0 1 0 2h-.5a1 1 0 1 1 0-2h.5Z"/></svg>',
  foro: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 3h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm15 5h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3l-4-3h-5a2 2 0 0 1-2-2v-1h7a3 3 0 0 0 3-3V8Z"/></svg>',
  voz: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3.3a1 1 0 0 1 .6.9v15.6a1 1 0 0 1-1.7.7L6.6 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.6l4.3-4.5a1 1 0 0 1 1.1-.2ZM15.3 8.3a1 1 0 0 1 1.4 0 5.2 5.2 0 0 1 0 7.4 1 1 0 0 1-1.4-1.4 3.2 3.2 0 0 0 0-4.6 1 1 0 0 1 0-1.4Zm2.8-2.8a1 1 0 0 1 1.4 0 9.2 9.2 0 0 1 0 13 1 1 0 0 1-1.4-1.4 7.2 7.2 0 0 0 0-10.2 1 1 0 0 1 0-1.4Z"/></svg>',
  reglas: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M5 3h11l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 6v2h8V9H8Zm0 4v2h8v-2H8Zm0 4v1.5h5V17H8Z"/></svg>',
  rol: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 7.5c2 0 3.8.9 4.6 2.3A7.8 7.8 0 0 1 12 20a7.8 7.8 0 0 1-4.6-3.2c.8-1.4 2.6-2.3 4.6-2.3Z"/></svg>',
  bot: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M11 2h2v3h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h4V2Zm-2 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM1 10h2v5H1v-5Zm20 0h2v5h-2v-5Z"/></svg>',
  gear: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M10.6 2h2.8l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.4 2.4-2 1.8a7 7 0 0 1 0 2.4l2 1.8-1.4 2.4-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-2.8l-.5-2.6a6.8 6.8 0 0 1-1.7-.9l-2.5.9-1.4-2.4 2-1.8a7 7 0 0 1 0-2.4l-2-1.8L5.4 4.6l2.5.9c.5-.4 1.1-.7 1.7-.9l.5-2.6ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.3 5.3a1 1 0 1 1 1.4 1.4L13.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4L12 13.4l-5.3 5.3a1 1 0 0 1-1.4-1.4l5.3-5.3-5.3-5.3a1 1 0 0 1 1.4-1.4l5.3 5.3 5.3-5.3Z"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M5.3 9.3a1 1 0 0 1 1.4 0L12 14.6l5.3-5.3a1 1 0 1 1 1.4 1.4l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M20 6 9 17l-5-5"/></svg>',
  headphones: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a7 7 0 0 1 14 0h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-6a9 9 0 0 0-9-9Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1ZM5 10v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8H5Zm2 2h4v4H7v-4Z"/></svg>',
  browse: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm12.5 0a3.5 3.5 0 0 1 2.9 5.5l1.8 1.8-1.4 1.4-1.8-1.8a3.5 3.5 0 1 1-1.5-6.9Zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>',
  members: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm-9 11c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5H5.5Zm12-11.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm1 7c2 .6 3.5 2.3 3.5 4.5h-3.2c-.2-1.8-1-3.3-2.2-4.4l1.9-.1Z"/></svg>',
  boost: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2 4 7v10l8 5 8-5V7l-8-5Zm0 4.3 4.5 2.8v5.8L12 17.7l-4.5-2.8V9.1L12 6.3Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 3a1 1 0 0 1 1 1v15h15a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 9h2v5H8v-5Zm4-4h2v9h-2V8Zm4 2h2v7h-2v-7Z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.6 3.6a2 2 0 0 1 2.8 0l2 2a2 2 0 0 1 0 2.8L9 19.8 3 21l1.2-6L15.6 3.6ZM6 15.8l-.5 2.7 2.7-.5 9.4-9.4-2.2-2.2L6 15.8Z"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1ZM4 19h16v2H4v-2Z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3a1 1 0 0 1 .7.3l5 5a1 1 0 1 1-1.4 1.4L13 6.4V16a1 1 0 1 1-2 0V6.4L7.7 9.7a1 1 0 0 1-1.4-1.4l5-5A1 1 0 0 1 12 3ZM4 19h16v2H4v-2Z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 4a8 8 0 1 1-7.7 10.1 1 1 0 0 1 1.9-.6A6 6 0 1 0 7.8 7.8H10a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v2.3A8 8 0 0 1 12 4Z"/></svg>',
  book: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v13H6a1 1 0 0 0 0 2h12v1a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5Zm4 1v2h7V6H8Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 3h10a2 2 0 0 1 2 2v10h-2V5H8V3ZM4 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M14.7 5.3a1 1 0 0 1 0 1.4L9.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0Z"/></svg>',
  headphonesOff: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a7 7 0 0 1 14 0h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-6a9 9 0 0 0-9-9Z"/><path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M3 3l18 18"/></svg>'
};
const iconFor = (el) => el.kind === 'page' ? ICONS[el.icon] : el.kind === 'role' ? ICONS.rol : el.kind === 'bot' ? ICONS.bot : ICONS[el.type] || ICONS.texto;
const TYPE_NAME = { texto: 'Texto', anuncios: 'Anuncios', foro: 'Foro', voz: 'Voz', reglas: 'Texto' };

const STATE_LABEL = { pending: 'Pendiente', delete: 'Por borrar', done: 'Listo', deleted: 'Borrado' };
const pill = (st) => '<span class="pill pill-' + st + '"><i></i>' + STATE_LABEL[st] + '</span>';

/* ---------- sonido (mismo ajuste que el manual clásico) ---------- */
let ac = null;
const SFX = {
  hover: [{ type: 'square', f: 1320, d: 0.025, v: 0.012 }],
  click: [{ type: 'square', f: 523, to: 1046, d: 0.07, v: 0.035 }],
  done: [{ type: 'square', f: 523, d: 0.09, v: 0.035 }, { type: 'square', f: 784, d: 0.18, v: 0.035, at: 0.09 }],
  del: [{ type: 'sawtooth', f: 220, to: 60, d: 0.25, v: 0.04 }]
};
function wakeAudio() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    if (!ac) ac = new C();
    if (ac.state === 'suspended') ac.resume();
  } catch (e) { /* sin audio */ }
}
function snd(kind) {
  if (store.get('muted', false) || !ac || ac.state !== 'running') return;
  (SFX[kind] || []).forEach((n) => {
    const t0 = ac.currentTime + (n.at || 0);
    const o = ac.createOscillator(); const g = ac.createGain();
    o.type = n.type; o.frequency.setValueAtTime(n.f, t0);
    if (n.to) o.frequency.exponentialRampToValueAtTime(n.to, t0 + n.d);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(n.v, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.d);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + n.d + 0.03);
  });
}
document.addEventListener('pointerdown', wakeAudio, { passive: true });
let lastHover = 0;
document.addEventListener('pointerover', (e) => {
  const el = e.target.closest('.ch, .mem, .btn, .cat, .top-entry, .menu-item, .set-tab');
  if (!el || el.contains(e.relatedTarget)) return;
  const t = performance.now();
  if (t - lastHover < 70) return;
  lastHover = t; snd('hover');
});

/* ---------- vista ---------- */
let current = null;
let collapsed = store.get('collapsed-cats', {});

function renderGuild() {
  const name = serverName();
  $('#guildName').textContent = name;
  $('#srvTip').textContent = name;
  const initials = name.replace(/\[.*?\]/g, '').split(/\s+/).filter((w) => /^[\p{L}\p{N}]/u.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  $('#srvInitials').textContent = initials || 'S';
  document.title = name + ' · Vista Discord';
}

function renderLegend() {
  const c = { pending: 0, delete: 0, done: 0 };
  ORDER.forEach((id) => { const s = stateOf(id); if (c[s] !== undefined) c[s]++; });
  $('#legend').innerHTML =
    '<span class="lg lg-done"><i></i>' + c.done + (c.done === 1 ? ' listo' : ' listos') + '</span>' +
    '<span class="lg lg-pending"><i></i>' + c.pending + (c.pending === 1 ? ' pendiente' : ' pendientes') + '</span>' +
    '<span class="lg lg-delete"><i></i>' + c.delete + ' por borrar</span>';
}

function channelRow(el) {
  const st = stateOf(el.id);
  const badge = st === 'delete' ? '<span class="ch-badge">BORRAR</span>'
    : st === 'done' ? '<span class="done-dot" title="Listo"></span>' : '';
  return '<button type="button" class="ch st-' + st + (current === el.id ? ' is-active' : '') + '" data-el="' + el.id + '"' +
    (current === el.id ? ' aria-current="page"' : '') + ' title="' + esc(STATE_LABEL[st]) + '">' +
    '<span class="ch-icon">' + iconFor(el) + '</span><span class="ch-name">' + esc(el.name) + '</span>' + badge + '</button>';
}

function topEntriesHtml() {
  if (!TOP_ENTRIES.length) return '';
  return '<div class="top-entries">' + TOP_ENTRIES.map((id) => {
    const el = EL[id];
    return '<button type="button" class="ch top-entry' + (current === id ? ' is-active' : '') + '" data-el="' + id + '"' + (current === id ? ' aria-current="page"' : '') + '>' +
      '<span class="ch-icon">' + ICONS[el.icon] + '</span><span class="ch-name">' + esc(el.name) + '</span></button>';
  }).join('') + '</div>';
}

function renderChannels() {
  let h = topEntriesHtml();
  MAP.categories.forEach((c, ci) => {
    const visible = c.channels.filter((ch) => stateOf(ch.id) !== 'deleted');
    if (!visible.length) return;
    if (c.name) {
      const open = !collapsed[c.id];
      h += '<button type="button" class="cat' + (ci === 0 ? ' cat-first' : '') + '" data-cat="' + c.id + '" aria-expanded="' + open + '">' +
        ICONS.chevron + '<span>' + esc(c.name) + '</span></button>';
      if (!open) {
        // Discord deja visible el canal activo aunque la categoría esté plegada
        visible.filter((ch) => ch.id === current).forEach((ch) => { h += channelRow(EL[ch.id]); });
        return;
      }
    }
    visible.forEach((ch) => { h += channelRow(EL[ch.id]); });
  });
  const deleted = ORDER.filter((id) => stateOf(id) === 'deleted');
  if (deleted.length) {
    const open = !collapsed.__trash;
    h += '<div class="trash-cat"><button type="button" class="cat" data-cat="__trash" aria-expanded="' + open + '">' + ICONS.chevron +
      '<span>Borrados (' + deleted.length + ')</span></button>';
    if (open) deleted.forEach((id) => {
      const el = EL[id];
      h += '<button type="button" class="ch st-deleted' + (current === id ? ' is-active' : '') + '" data-el="' + id + '">' +
        '<span class="ch-icon">' + iconFor(el) + '</span><span class="ch-name">' + esc(el.name) + '</span></button>';
    });
    h += '</div>';
  }
  $('#channels').innerHTML = h;
}

function memberRow(el) {
  const st = stateOf(el.id);
  if (st === 'deleted') return '';
  const initials = el.kind === 'bot' ? el.name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase() : '';
  const av = el.kind === 'role'
    ? '<span class="mem-av" style="background:' + el.color + '22"><span class="mem-role-dot" style="background:' + el.color + '"></span><span class="st st-' + st + '"></span></span>'
    : '<span class="mem-av" style="background:' + el.color + '">' + esc(initials) + '<span class="st st-' + st + '"></span></span>';
  const tag = el.kind === 'bot' ? ' <span class="app-tag">' + ICONS.check.replace('width="14" height="14"', 'width="9" height="9"') + 'APP</span>' : '';
  return '<button type="button" class="mem' + (current === el.id ? ' is-active' : '') + '" data-el="' + el.id + '" title="' + esc(STATE_LABEL[st]) + '">' +
    av + '<span class="mem-name" style="color:' + (el.kind === 'role' ? el.color : '#dbdee1') + '">' + esc(el.name) + tag + '</span></button>';
}

function renderMembers() {
  const roles = MAP.roles.filter((r) => stateOf(r.id) !== 'deleted');
  const bots = MAP.bots.filter((b) => stateOf(b.id) !== 'deleted');
  $('#members').innerHTML =
    '<div class="mem-group">ROLES — ' + roles.length + '</div>' + roles.map((r) => memberRow(EL[r.id])).join('') +
    '<div class="mem-group">BOTS — ' + bots.length + '</div>' + bots.map((b) => memberRow(EL[b.id])).join('');
}

function stepEmbed(s, n) {
  let h = '<div class="embed"><div class="embed-title"><span class="embed-num">' + pad(n) + '</span>' + fmt(s.t) + '</div>';
  if (s.where) h += '<div class="embed-row"><b class="lbl">Dónde</b><span>' + fmt(s.where) + '</span></div>';
  if (s.what) h += '<div class="embed-row"><b class="lbl">Qué hacer</b><span>' + fmt(s.what) + '</span></div>';
  if (s.check) h += '<div class="embed-row ok"><b class="lbl">Comprueba</b><span>' + fmt(s.check) + '</span></div>';
  if (s.warn) h += '<div class="embed-row warn"><b class="lbl">Ojo</b><span>' + fmt(s.warn) + '</span></div>';
  return h + '</div>';
}

function msg(inner) {
  return '<div class="msg"><img class="msg-avatar" src="../assets/megaman-idle.png" alt="">' +
    '<div class="msg-body"><div class="msg-head"><span class="msg-author">Manual</span><span class="app-tag">' +
    ICONS.check.replace('width="14" height="14"', 'width="9" height="9"') + 'APP</span><span class="msg-time">Hoy</span></div>' + inner + '</div></div>';
}

function taskRow(id) {
  const t = TASKS[id];
  if (!t) return '';
  const st = taskStatus(id);
  return '<div class="task is-' + st + '"><button type="button" class="task-check" role="checkbox" aria-checked="' + (st === 'done') + '" data-task="' + id + '">' + ICONS.check + '</button>' +
    '<div class="task-text">' + fmt(t.step.t) + '<div class="task-level">Nivel ' + pad(t.level + 1) + ' · ' + esc(t.levelTitle) + '</div></div>' +
    '<button type="button" class="task-skip" data-skip="' + id + '">' + (st === 'skip' ? 'Recuperar' : 'Descartar') + '</button></div>';
}

function actionsHtml(el, st) {
  const doneLabel = el.kind === 'bot' ? 'Ya está configurado' : 'Ya lo creé';
  let h = '<div class="actions">';
  if (st === 'pending') {
    h += '<button type="button" class="btn btn-green" data-act="done">' + ICONS.check + doneLabel + '</button>' +
      '<button type="button" class="btn btn-link" data-act="delete">Marcar para borrar</button>';
  } else if (st === 'delete') {
    h += '<button type="button" class="btn btn-red" data-act="deleted">Ya lo borré</button>' +
      '<button type="button" class="btn btn-link" data-act="pending">No borrar</button>';
  } else if (st === 'done') {
    h += pill('done') + '<button type="button" class="btn btn-link" data-act="pending">Deshacer</button>';
  } else {
    h += pill('deleted') + '<button type="button" class="btn" data-act="delete">Restaurar</button>';
  }
  if (el.kind === 'channel' && el.state !== 'delete') h += '<button type="button" class="btn btn-brand" data-modal="perms">' + ICONS.gear + 'Editar canal</button>';
  if (el.kind === 'role') h += '<button type="button" class="btn btn-brand" data-modal="perms">' + ICONS.gear + 'Editar rol</button>';
  if (el.kind === 'bot') h += '<button type="button" class="btn btn-brand" data-modal="perms">' + ICONS.gear + 'Permisos del bot</button>';
  return h + '</div>';
}

function renderMain() {
  if (EL[current].kind === 'page') { renderPage(EL[current]); return; }
  const el = EL[current];
  const st = stateOf(el.id);
  const isCh = el.kind === 'channel';

  $('#topIcon').innerHTML = iconFor(el);
  $('#topName').textContent = el.name;
  $('#topState').innerHTML = pill(st);
  $('#topTopic').innerHTML = fmt(el.topic || '');

  let title;
  if (isCh) title = '¡Te damos la bienvenida a ' + (el.type === 'voz' ? '' : '#') + esc(el.name) + '!';
  else if (el.kind === 'role') title = 'Rol <span style="color:' + el.color + '">@' + esc(el.name) + '</span>';
  else title = esc(el.name);

  let sub2 = fmt(el.topic || '');
  if (isCh) {
    sub2 += '<br>Tipo: ' + typeBadge(TYPE_NAME[el.type]) + (el.category ? ' · Categoría: <strong>' + esc(el.category) + '</strong>' : ' · <strong>Sin categoría</strong>');
    if (el.current && el.current !== el.type) sub2 += ' · Hoy es ' + typeBadge(TYPE_NAME[el.current]) + ', debe ser ' + typeBadge(TYPE_NAME[el.type]);
  }

  let h = '<section class="welcome"><div class="welcome-icon">' + iconFor(el).replace(/width="20" height="20"/, 'width="40" height="40"') + '</div>' +
    '<h2>' + title + '</h2><p>' + sub2 + '</p>' + actionsHtml(el, st) + '</section>';

  if (st === 'delete' && el.why) h += '<div class="why"><strong>Por qué borrarlo:</strong> ' + fmt(el.why) + '</div>';
  if (st === 'pending' && tasksDone(el)) {
    h += '<div class="suggest">Todas sus tareas están palomeadas. ¿Lo marcas como listo?' +
      '<button type="button" class="btn btn-green" data-act="done">' + ICONS.check + 'Marcar como listo</button></div>';
  }

  h += permsSummaryHtml(el);

  if (el.steps && el.steps.length) {
    h += '<div class="date-sep">' + (st === 'delete' ? 'Cómo borrarlo' : 'Pasos') + '</div>';
    h += msg('<div class="msg-text">Esto es lo que lleva ' + (isCh ? (el.type === 'voz' ? '' : '#') + esc(el.name) : '<strong>' + esc(el.name) + '</strong>') + ':</div>');
    el.steps.forEach((s, i) => { h += msg(stepEmbed(s, i + 1)); });
  }
  if (el.tasks && el.tasks.length) {
    h += '<div class="date-sep">Tareas del manual</div>';
    h += msg('<div class="msg-text">Se marcan igual que en el manual clásico: lo que palomees aquí aparece allá.</div><div class="tasks">' + el.tasks.map(taskRow).join('') + '</div>');
    if (!el.steps || !el.steps.length) {
      h += '<div class="date-sep">Detalle</div>';
      el.tasks.forEach((id, i) => { if (TASKS[id]) h += msg(stepEmbed(TASKS[id].step, i + 1)); });
    }
  }

  $('#chatInner').innerHTML = h;
  $('#composer').textContent = st === 'done' ? 'Listo. Si algo cambia, usa «Deshacer» arriba.'
    : st === 'delete' ? 'Pendiente de borrar en Discord. Cuando lo borres, toca «Ya lo borré».'
    : st === 'deleted' ? 'Ya está borrado. «Restaurar» lo regresa a la lista como Por borrar.'
    : 'Pendiente. Sigue los pasos y, cuando esté hecho en Discord, toca «' + (el.kind === 'bot' ? 'Ya está configurado' : 'Ya lo creé') + '».';
}

function renderSound() {
  const m = store.get('muted', false);
  const b = $('#soundBtn');
  b.innerHTML = m ? ICONS.headphonesOff : ICONS.headphones;
  b.setAttribute('aria-pressed', String(m));
  b.title = m ? 'Activar sonido' : 'Silenciar';
  $('#userSub').textContent = m ? 'Sonido apagado' : 'Vista Discord';
}

function renderAll() {
  renderGuild(); renderLegend(); renderChannels(); renderMembers(); renderMain(); renderSound();
}

function go(id, push) {
  if (!EL[id]) return;
  current = id;
  if (push !== false) { try { history.replaceState(null, '', '#' + id); } catch (e) { location.hash = id; } }
  document.querySelector('.app').classList.remove('show-channels', 'show-members');
  renderAll();
  $('#chat').scrollTop = 0;
}

/* ---------- permisos (Fase 2) ---------- */
const PERM = {};
window.PERMS.list.forEach((p) => { PERM[p.key] = p; });
const SP = window.SERVER_PERMS;
const CAT_OF = {};
MAP.categories.forEach((c) => c.channels.forEach((ch) => { CAT_OF[ch.id] = c; }));
const BOT_BY_NAME = {};
MAP.bots.forEach((b) => { BOT_BY_NAME[b.name] = b; });
const ROLE_BY_NAME = {};
MAP.roles.forEach((r) => { ROLE_BY_NAME[r.name] = r; });

const chScope = (el) => (el.type === 'voz' ? 'V' : 'T');

// Ajustes que aplican al canal: los propios, o los de su categoría si está sincronizado
function channelOverwrites(el) {
  const own = SP.channels[el.id] || {};
  const cat = CAT_OF[el.id];
  const catP = cat && SP.categories[cat.id];
  if (own.sync || !own.overwrites) {
    return { list: (catP && catP.overwrites) || [], synced: true, catName: cat && cat.name, catNotes: (catP && catP.notes) || [] };
  }
  return { list: own.overwrites, synced: false, catName: cat && cat.name, catNotes: [] };
}

function permLabel(p, el) {
  if (el && el.type === 'foro' && p.forumLabel) return p.forumLabel;
  return (el && el.kind === 'channel' && p.chLabel) ? p.chLabel : p.label;
}

function permRowHtml(p, value, el, mode) {
  const lbl = permLabel(p, el);
  const approx = p.verified ? '' : '<span class="approx" title="El nombre puede variar en tu Discord: guíate por la descripción y el nombre técnico">≈</span>';
  const fa = p.twoFA ? '<span class="tag2fa" title="Requiere 2FA si el server la exige">2FA</span>' : '';
  let ctrl;
  if (mode === 'tri') {
    ctrl = '<span class="tri" role="img" aria-label="' + (value === 'allow' ? 'Permitido' : value === 'deny' ? 'Denegado' : 'Heredado') + '">' +
      '<span class="tri-x' + (value === 'deny' ? ' on' : '') + '">✕</span>' +
      '<span class="tri-n' + (!value ? ' on' : '') + '">/</span>' +
      '<span class="tri-v' + (value === 'allow' ? ' on' : '') + '">✓</span></span>';
  } else {
    ctrl = '<span class="sw' + (value === 'on' ? ' on' : '') + (value === 'off-key' ? ' key' : '') + '" role="img" aria-label="' + (value === 'on' ? 'Encendido' : 'Apagado') + '"><i></i></span>';
  }
  return '<div class="perm' + (value && value !== 'off' ? ' is-set' : '') + '"><div class="perm-info"><div class="perm-name">' + esc(lbl) + approx + fa +
    '</div><div class="perm-key">' + p.key + '</div><div class="perm-desc">' + fmt(p.desc) + '</div></div>' + ctrl + '</div>';
}

function overwriteChips(o) {
  const chip = (k, cls) => '<span class="pchip ' + cls + '">' + (cls === 'allow' ? '✓ ' : '✕ ') + esc(PERM[k] ? (PERM[k].chLabel || PERM[k].label) : k) + '</span>';
  return (o.allow || []).map((k) => chip(k, 'allow')).join('') + (o.deny || []).map((k) => chip(k, 'deny')).join('');
}

function targetColor(name) {
  if (name === '@everyone') return '#b5bac1';
  if (ROLE_BY_NAME[name]) return ROLE_BY_NAME[name].color;
  if (BOT_BY_NAME[name]) return BOT_BY_NAME[name].color;
  return '#dbdee1';
}

function permsSummaryHtml(el) {
  if (stateOf(el.id) === 'delete' || stateOf(el.id) === 'deleted') return '';
  let inner = '';
  if (el.kind === 'channel') {
    const ow = channelOverwrites(el);
    if (ow.synced) inner += '<div class="msg-text">Permisos <strong>sincronizados con la categoría ' + esc(ow.catName || '') + '</strong>' + (ow.list.length ? ':' : ' (sin ajustes propios).') + '</div>';
    else inner += '<div class="msg-text">Este canal lleva <strong>permisos propios</strong>:</div>';
    if (ow.list.length) inner += '<div class="ptable">' + ow.list.map((o) => '<div class="prow"><span class="ptarget" style="color:' + targetColor(o.target) + '">' + (o.bot ? ICONS.bot.replace('width="20" height="20"', 'width="14" height="14"') : '@') + esc(o.target.replace(/^@/, '')) + '</span><span class="pchips">' + overwriteChips(o) + '</span></div>').join('') + '</div>';
  } else {
    const rp = (el.kind === 'role' ? SP.roles : SP.bots)[el.id];
    if (!rp) return '';
    inner += '<div class="msg-text">Permisos ' + (el.kind === 'bot' ? 'de su rol (lo crea la app al invitarla)' : 'del rol') + ':</div><div class="ptable"><div class="prow"><span class="ptarget">Encendidos</span><span class="pchips">' +
      (rp.on.length ? rp.on.map((k) => '<span class="pchip allow">✓ ' + esc(PERM[k].label) + '</span>').join('') : '<span class="pchip none">Ninguno</span>') + '</span></div>' +
      '<div class="prow"><span class="ptarget">Deben estar apagados</span><span class="pchips">' + rp.off.map((k) => '<span class="pchip deny">✕ ' + esc(PERM[k].label) + '</span>').join('') + '</span></div></div>';
    const where = channelsWithTarget(el.name);
    if (where.length) inner += '<div class="msg-text" style="margin-top:8px">Además tiene ajustes en: ' + where.map((w) => '<button type="button" class="linkbtn" data-el="' + w.id + '">' + (w.kind === 'cat' ? 'categoría ' : '#') + esc(w.name) + '</button>').join(', ') + '.</div>';
  }
  inner += '<div class="actions" style="margin-top:8px"><button type="button" class="btn btn-brand" data-modal="perms">' + ICONS.gear + 'Ver todos los permisos</button></div>';
  return '<div class="date-sep">Permisos</div>' + msg(inner);
}

function channelsWithTarget(name) {
  const out = [];
  MAP.categories.forEach((c) => {
    const cp = SP.categories[c.id];
    if (cp && (cp.overwrites || []).some((o) => o.target === name)) out.push({ kind: 'cat', id: c.channels[0].id, name: c.name });
    c.channels.forEach((ch) => {
      const p = SP.channels[ch.id];
      if (p && !p.sync && (p.overwrites || []).some((o) => o.target === name)) out.push({ kind: 'ch', id: ch.id, name: ch.name });
    });
  });
  return out;
}

/* ----- ventana estilo «Editar canal» de Discord ----- */
let modalState = null;
let lastFocus = null;

function openModal(id, tab) {
  const el = EL[id];
  lastFocus = document.activeElement;
  const defaultTab = el.kind === 'channel' ? 'perms' : 'perms';
  let target = '@everyone';
  if (el.kind === 'channel') { const ow = channelOverwrites(el); target = (ow.list[0] && ow.list[0].target) || '@everyone'; }
  modalState = { id: id, tab: tab || defaultTab, target: target, all: false };
  renderModal();
  const m = $('#modal');
  m.hidden = false;
  document.body.classList.add('modal-open');
  setTimeout(() => { const c = m.querySelector('.set-close'); if (c) c.focus(); }, 30);
}

function closeModal() {
  $('#modal').hidden = true;
  $('#modal').innerHTML = '';
  document.body.classList.remove('modal-open');
  modalState = null;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function renderModal() {
  if (modalState.kind === 'settings') { renderSettings(); return; }
  const el = EL[modalState.id];
  const isCh = el.kind === 'channel';
  const own = isCh ? (SP.channels[el.id] || {}) : null;
  const tabs = [];
  tabs.push(['general', isCh ? 'Vista general' : 'Mostrar']);
  tabs.push(['perms', 'Permisos']);
  if (isCh && own.commands) tabs.push(['commands', 'Comandos de bots']);

  const head = isCh ? '<div class="set-head">' + (el.type === 'voz' ? '' : '#') + esc(el.name) + '<small>' + esc(el.category || 'Sin categoría') + '</small></div>'
    : '<div class="set-head" style="color:' + el.color + '">' + esc(el.name) + '<small>' + (el.kind === 'bot' ? 'Rol de la app' : 'Rol') + '</small></div>';
  let nav = head + tabs.map(([k, t]) => '<button type="button" class="set-tab' + (modalState.tab === k ? ' on' : '') + '" data-mtab="' + k + '">' + t + '</button>').join('');
  if (isCh) nav += '<div class="set-sep"></div><span class="set-danger" title="En Discord: Editar canal › Eliminar canal">Eliminar canal</span>';

  let body = '';
  if (modalState.tab === 'general') body = isCh ? modalGeneralChannel(el, own) : modalGeneralRole(el);
  else if (modalState.tab === 'commands') body = modalCommands(el, own);
  else body = isCh ? modalPermsChannel(el) : modalPermsRole(el);

  $('#modal').innerHTML = '<div class="settings" role="dialog" aria-modal="true" aria-label="' + esc((isCh ? 'Editar canal ' : 'Editar rol ') + el.name) + '">' +
    '<nav class="set-nav">' + nav + '</nav><section class="set-body">' + body + '</section>' +
    '<button type="button" class="set-close" aria-label="Cerrar">' + ICONS.close + '<span>ESC</span></button></div>';
}

function modalGeneralChannel(el, own) {
  const rows = (own.settings || []).map(([k, v]) => '<div class="kv"><span>' + esc(k) + '</span><b>' + esc(v) + '</b></div>').join('');
  return '<h2>Vista general</h2><p class="set-sub">Así debe quedar este canal en Discord.</p>' +
    '<div class="kv"><span>Nombre</span><b>' + esc(el.name) + '</b></div>' +
    '<div class="kv"><span>Categoría</span><b>' + esc(el.category || 'Sin categoría') + '</b></div>' + rows +
    '<div class="kv"><span>Tema</span><b>' + fmt(el.topic || '—') + '</b></div>';
}

function modalGeneralRole(el) {
  const rp = (el.kind === 'role' ? SP.roles : SP.bots)[el.id] || {};
  return '<h2>Mostrar</h2><p class="set-sub">' + (el.kind === 'bot' ? 'El rol de una app lo crea Discord al invitarla: no se puede borrar ni asignar a personas, pero el owner sí puede cambiar sus permisos y su posición.' : 'Apariencia del rol en la lista de miembros.') + '</p>' +
    '<div class="kv"><span>Color</span><b><i class="swatch" style="background:' + el.color + '"></i>' + el.color + '</b></div>' +
    (el.kind === 'role' ? '<div class="kv"><span>Mostrar a los miembros por separado</span><b>' + (rp.hoist ? 'Sí' : 'No') + '</b></div>' +
      '<div class="kv"><span>Permitir que cualquiera lo mencione</span><b>No</b></div>' : '') +
    (rp.notes || []).map((n) => '<div class="set-note">' + fmt(n) + '</div>').join('');
}

function modalPermsChannel(el) {
  const ow = channelOverwrites(el);
  const ev = ow.list.find((o) => o.target === '@everyone');
  const isPrivate = !!(ev && (ev.deny || []).indexOf('VIEW_CHANNEL') >= 0);
  const targets = ['@everyone'].concat(ow.list.map((o) => o.target).filter((t) => t !== '@everyone'));
  if (targets.indexOf(modalState.target) < 0) modalState.target = targets[0];
  const sel = ow.list.find((o) => o.target === modalState.target) || { target: modalState.target };
  const valueOf = (k) => ((sel.allow || []).indexOf(k) >= 0 ? 'allow' : (sel.deny || []).indexOf(k) >= 0 ? 'deny' : '');
  const scope = chScope(el);
  const notes = ((SP.channels[el.id] || {}).notes || []).concat(ow.catNotes || []);

  let h = '<h2>Permisos del canal</h2><p class="set-sub">Usar permisos para indicar quién puede hacer qué en este canal.</p>';
  h += '<div class="sync-box ' + (ow.synced ? 'synced' : 'own') + '">' + (ow.synced
    ? '⟳ Permisos sincronizados con la categoría: <b>' + esc(ow.catName || 'ninguna') + '</b>'
    : '⚠ No sincronizado: este canal tiene ajustes propios (los cambios a la categoría ' + esc(ow.catName || '') + ' ya no le llegan).') + '</div>';
  h += '<div class="kv"><span>Canal privado</span><b>' + (isPrivate ? 'Sí' : 'No') + '</b></div>';
  h += notes.map((n) => '<div class="set-note">' + fmt(n) + '</div>').join('');
  h += '<div class="adv"><div class="adv-left"><div class="adv-title">Roles/Miembros</div>' + targets.map((t) => {
    const o = ow.list.find((x) => x.target === t);
    return '<button type="button" class="adv-target' + (t === modalState.target ? ' on' : '') + '" data-target="' + esc(t) + '" style="color:' + targetColor(t) + '">' +
      (o && o.bot ? ICONS.bot.replace('width="20" height="20"', 'width="14" height="14"') + ' ' : '') + esc(t) + '</button>';
  }).join('') + '</div><div class="adv-right">';
  h += '<label class="showall"><input type="checkbox" data-showall' + (modalState.all ? ' checked' : '') + '> Mostrar todos los permisos (no solo los que se cambian)</label>';
  window.PERMS.sections.forEach((sec) => {
    const items = window.PERMS.list.filter((p) => p.section === sec.id && p.scope && p.scope.indexOf(scope) >= 0 && (modalState.all || valueOf(p.key)));
    if (!items.length) return;
    h += '<div class="perm-sec">' + sec.title + '</div>' + items.map((p) => permRowHtml(p, valueOf(p.key), el, 'tri')).join('');
  });
  if (!(sel.allow || []).length && !(sel.deny || []).length && !modalState.all) h += '<div class="set-note">Sin ajustes para este rol aquí: todo queda en ／ (heredado). Marca «Mostrar todos» para ver la lista completa.</div>';
  h += '</div></div>';
  return h;
}

function modalPermsRole(el) {
  const rp = (el.kind === 'role' ? SP.roles : SP.bots)[el.id] || { on: [], off: [] };
  const valueOf = (k) => (rp.on.indexOf(k) >= 0 ? 'on' : rp.off.indexOf(k) >= 0 ? 'off-key' : 'off');
  let h = '<h2>Permisos</h2><p class="set-sub">' + (el.kind === 'bot' ? 'Permisos del rol de la app en todo el server. Encendido = verde. Los marcados en rojo deben quedar apagados sí o sí.' : 'Permisos del rol en todo el server. Encendido = verde. Los marcados en rojo deben quedar apagados sí o sí.') + '</p>';
  h += '<label class="showall"><input type="checkbox" data-showall' + (modalState.all ? ' checked' : '') + '> Mostrar todos los permisos</label>';
  window.PERMS.sections.forEach((sec) => {
    const items = window.PERMS.list.filter((p) => p.section === sec.id && (modalState.all || valueOf(p.key) !== 'off'));
    if (!items.length) return;
    h += '<div class="perm-sec">' + sec.title + '</div>' + items.map((p) => permRowHtml(p, valueOf(p.key), null, 'switch')).join('');
  });
  return h;
}

function modalCommands(el, own) {
  return '<h2>Comandos de bots</h2><p class="set-sub">Esto no está en Editar canal: se configura en <b>Ajustes del servidor › Integraciones › Jockie Music</b> (y luego en Jockie Music (1)), comando por comando.</p>' +
    '<div class="cmd-table"><div class="cmd-row cmd-head"><span>Comando</span><span>@everyone</span><span>STREAMERS y Administradores</span></div>' +
    own.commands.map((c) => '<div class="cmd-row"><span><code>' + esc(c.command) + '</code><small>' + esc(c.bot) + '</small></span>' +
      '<span class="' + c.everyone + '">' + (c.everyone === 'allow' ? '✓ Permitido' : '✕ Denegado') + '</span>' +
      '<span class="' + c.team + '">' + (c.team === 'allow' ? '✓ Permitido' : '✕ Denegado') + '</span></div>').join('') + '</div>' +
    '<div class="set-note">Discord deja permitir o negar cada comando por rol y por canal. Así cualquiera agrega canciones con /play, pero solo el equipo salta, para o cambia el volumen.</div>';
}

document.addEventListener('click', (e) => {
  if (!modalState) return;
  if (e.target.closest('.set-close') || e.target === $('#modal')) { snd('click'); closeModal(); return; }
  const t = e.target.closest('[data-mtab]');
  if (t) { snd('click'); modalState.tab = t.dataset.mtab; renderModal(); return; }
  const tg = e.target.closest('[data-target]');
  if (tg) { snd('click'); modalState.target = tg.dataset.target; renderModal(); return; }
  const sc = e.target.closest('[data-sec]');
  if (sc) { snd('click'); modalState.sec = sc.dataset.sec; modalState.body = true; renderModal(); const b = $('#modal .set-body'); if (b) b.scrollTop = 0; return; }
  if (e.target.closest('[data-back]')) { snd('click'); modalState.body = false; renderModal(); return; }
  const tk = e.target.closest('[data-task]');
  if (tk) { const id = tk.dataset.task; setTask(id, taskStatus(id) === 'done' ? 'todo' : 'done'); snd('click'); renderModal(); renderMain(); return; }
  const sk = e.target.closest('[data-skip]');
  if (sk) { const id = sk.dataset.skip; setTask(id, taskStatus(id) === 'skip' ? 'todo' : 'skip'); snd('click'); renderModal(); renderMain(); return; }
  const go1 = e.target.closest('[data-el]');
  if (go1) { snd('click'); const id = go1.dataset.el; closeModal(); go(id); return; }
});
document.addEventListener('change', (e) => {
  if (modalState && e.target.matches('[data-showall]')) { modalState.all = e.target.checked; renderModal(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (modalState) { closeModal(); return; }
  if (menuOpen()) { closeMenu(true); return; }
  const app = document.querySelector('.app');
  if (app.classList.contains('show-channels') || app.classList.contains('show-members')) app.classList.remove('show-channels', 'show-members');
});

/* ---------- páginas del server (Fase 3) ---------- */
const STATE_ORDER = ['delete', 'pending', 'done', 'deleted'];

function stateRow(id) {
  const el = EL[id];
  const st = stateOf(id);
  const color = el.kind === 'role' ? ' style="color:' + el.color + '"' : '';
  return '<button type="button" class="list-row st-' + st + '" data-el="' + id + '">' +
    '<span class="ch-icon">' + iconFor(el) + '</span><span class="list-name"' + color + '>' + (el.kind === 'channel' && el.type !== 'voz' ? '#' : '') + esc(el.name) + '</span>' +
    pill(st) + '</button>';
}

function channelsListHtml() {
  let h = '';
  MAP.categories.forEach((c) => {
    h += '<div class="list-cat">' + esc(c.name || 'Sin categoría') + '</div>';
    h += c.channels.map((ch) => stateRow(ch.id)).join('');
  });
  return '<div class="list">' + h + '</div>';
}

function membersListHtml() {
  return '<div class="list"><div class="list-cat">Roles — ' + MAP.roles.length + '</div>' + MAP.roles.map((r) => stateRow(r.id)).join('') +
    '<div class="list-cat">Bots — ' + MAP.bots.length + '</div>' + MAP.bots.map((b) => stateRow(b.id)).join('') + '</div>';
}

function tasksBlock(ids, intro) {
  const rows = (ids || []).filter((id) => TASKS[id]);
  if (!rows.length) return '';
  return '<div class="date-sep">Tareas del manual</div>' +
    msg('<div class="msg-text">' + (intro || 'Se marcan igual que en el manual clásico.') + '</div><div class="tasks">' + rows.map(taskRow).join('') + '</div>');
}

function taskTotals() {
  const t = { done: 0, skip: 0, todo: 0 };
  Object.keys(TASKS).forEach((id) => { t[taskStatus(id)]++; });
  return t;
}

let openLevels = new Set();

function resumenHtml() {
  const t = taskTotals();
  const total = t.done + t.skip + t.todo;
  const pct = total ? Math.round(((t.done + t.skip) / total) * 100) : 0;
  const e = { delete: [], pending: [], done: [], deleted: [] };
  ORDER.forEach((id) => { e[stateOf(id)].push(id); });

  let h = '<div class="sum-cards">' +
    '<div class="sum-card c-done"><b>' + t.done + '</b><span>Hechas</span></div>' +
    '<div class="sum-card c-skip"><b>' + t.skip + '</b><span>Descartadas</span></div>' +
    '<div class="sum-card c-todo"><b>' + t.todo + '</b><span>Pendientes</span></div>' +
    '<div class="sum-card c-pct"><b>' + pct + '%</b><span>Avance</span></div></div>' +
    '<div class="bar"><i style="width:' + pct + '%"></i></div>';

  h += '<div class="actions sum-actions">' +
    '<button type="button" class="btn btn-brand" data-do="copy">' + ICONS.copy + 'Copiar resumen</button>' +
    '<button type="button" class="btn" data-do="export">' + ICONS.download + 'Exportar progreso</button>' +
    '<button type="button" class="btn" data-do="import">' + ICONS.upload + 'Importar progreso</button>' +
    '<button type="button" class="btn btn-link" data-do="reset">Reiniciar tareas</button>' +
    '<button type="button" class="btn btn-link" data-do="reset-el">Reiniciar estados de canales</button></div>';

  let out = '<section class="welcome resumen">' + h + '</section>';

  out += '<div class="date-sep">Canales, roles y bots</div>';
  let eh = '<div class="msg-text">' + e.done.length + ' listos · ' + e.pending.length + ' pendientes · ' + e.delete.length + ' por borrar · ' + e.deleted.length + ' borrados.</div>';
  STATE_ORDER.forEach((st) => {
    if (!e[st].length) return;
    eh += '<div class="sum-el"><span class="sum-el-h">' + pill(st) + '</span><span class="sum-el-items">' +
      e[st].map((id) => '<button type="button" class="linkbtn chip-el st-' + st + '" data-el="' + id + '">' +
        (EL[id].kind === 'channel' && EL[id].type !== 'voz' ? '#' : EL[id].kind === 'role' ? '@' : '') + esc(EL[id].name) + '</button>').join('') + '</span></div>';
  });
  out += msg(eh);

  out += '<div class="date-sep">Tareas por nivel</div>';
  let lh = '<div class="msg-text">Toca un nivel para ver y marcar sus tareas.</div>';
  LEVELS.forEach((l, i) => {
    const ids = l.steps.map((s) => s.id);
    const done = ids.filter((id) => taskStatus(id) !== 'todo').length;
    const full = done === ids.length;
    lh += '<details class="sum-level' + (full ? ' is-full' : '') + '" data-lvl="' + i + '"' + (openLevels.has(i) ? ' open' : '') + '>' +
      '<summary><span class="sum-num">' + pad(i + 1) + '</span><span class="sum-title">' + fmt(l.title) + '</span>' +
      '<span class="sum-count">' + done + '/' + ids.length + '</span><span class="bar small"><i style="width:' + Math.round(done / ids.length * 100) + '%"></i></span></summary>' +
      '<div class="tasks">' + ids.map(taskRow).join('') + '</div></details>';
  });
  out += msg(lh);
  return out;
}

function resumenPlain() {
  const t = taskTotals();
  let s = 'RESUMEN DE AVANCE · ' + serverName() + '\nHechas: ' + t.done + ' · Descartadas: ' + t.skip + ' · Pendientes: ' + t.todo + '\n';
  const e = { delete: [], pending: [], done: [], deleted: [] };
  ORDER.forEach((id) => { e[stateOf(id)].push(EL[id].name); });
  s += '\nCanales, roles y bots\n';
  STATE_ORDER.forEach((st) => { if (e[st].length) s += '  ' + STATE_LABEL[st] + ': ' + e[st].join(', ') + '\n'; });
  LEVELS.forEach((l, i) => {
    s += '\n' + pad(i + 1) + ' · ' + sub(l.title) + '\n';
    l.steps.forEach((x) => {
      const st = taskStatus(x.id);
      s += '  ' + (st === 'done' ? '✔' : st === 'skip' ? '✕' : '·') + ' ' + sub(x.t).replace(/\*\*|`/g, '') + (st === 'skip' ? ' (descartado)' : '') + '\n';
    });
  });
  return s;
}

function renderPage(el) {
  $('#topIcon').innerHTML = ICONS[el.icon] || '';
  $('#topName').textContent = el.name;
  $('#topState').innerHTML = '';
  $('#topTopic').innerHTML = fmt(el.topic || '');

  let h;
  if (el.id === 'p-resumen') {
    h = '<section class="welcome"><div class="welcome-icon">' + ICONS.chart.replace(/width="20" height="20"/, 'width="40" height="40"') + '</div>' +
      '<h2>Resumen de avance</h2><p>' + esc(serverName()) + ' · Se arma solo con lo que marquen aquí o en el manual clásico.</p></section>' + resumenHtml();
  } else {
    h = '<section class="welcome"><div class="welcome-icon">' + (ICONS[el.icon] || '').replace(/width="20" height="20"/, 'width="40" height="40"') + '</div>' +
      '<h2>' + esc(el.name) + '</h2><p>' + fmt(el.topic || '') + '</p></section>';
    if (el.intro) h += msg('<div class="msg-text">' + fmt(el.intro) + '</div>');
    if (el.body) {
      h += '<div class="date-sep">Guía</div>';
      el.body.forEach((s, i) => { h += msg(stepEmbed(s, i + 1)); });
    }
    if (el.roles) {
      h += msg('<div class="msg-text">Roles relacionados: ' + el.roles.filter((id) => EL[id]).map((id) =>
        '<button type="button" class="linkbtn" data-el="' + id + '" style="color:' + EL[id].color + '">@' + esc(EL[id].name) + '</button>').join(', ') + '.</div>');
    }
    if (el.list === 'channels') h += '<div class="date-sep">Canales</div>' + msg(channelsListHtml());
    if (el.list === 'members') h += '<div class="date-sep">Roles y bots</div>' + msg(membersListHtml());
    h += tasksBlock(el.tasks);
  }
  $('#chatInner').innerHTML = h;
  $('#composer').textContent = el.id === 'p-resumen'
    ? 'Exporta el progreso de vez en cuando: con el archivo lo recuperas en otra PC o navegador.'
    : 'Página de consulta. Toca un canal, rol o bot para ir a sus pasos.';
}

document.addEventListener('toggle', (e) => {
  const d = e.target;
  if (!d.matches || !d.matches('details[data-lvl]')) return;
  const i = Number(d.dataset.lvl);
  if (d.open) openLevels.add(i); else openLevels.delete(i);
}, true);

/* ---------- avisos, copiar, exportar e importar ---------- */
let toastTimer = null;
function toast(text) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('on'), 4500);
}

async function copyPlain(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Respaldo para cuando se abre como archivo local y el navegador no deja usar el portapapeles moderno
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    ta.remove();
    return ok;
  }
}

function exportProgress() {
  const data = {
    app: 'manual-dasodi', version: 3, exportado: new Date().toISOString(),
    server: store.get('server', ''), progress: store.get('progress-v3', {}) || {}, elements: store.get('elements-v1', {}) || {}
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'progreso-manual-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Progreso exportado (tareas y estados de canales). Guarda el archivo.');
}

const VALID_EL_STATES = ['pending', 'delete', 'done', 'deleted'];
function importData(data) {
  if (!data || data.app !== 'manual-dasodi' || !data.progress || typeof data.progress !== 'object') throw new Error('formato');
  const valid = {};
  Object.keys(data.progress).forEach((id) => { if (data.progress[id] === 'done' || data.progress[id] === 'skip') valid[id] = data.progress[id]; });
  let validEl = null;
  if (data.elements && typeof data.elements === 'object') {
    validEl = {};
    Object.keys(data.elements).forEach((id) => { if (EL[id] && EL[id].kind !== 'page' && VALID_EL_STATES.indexOf(data.elements[id]) >= 0) validEl[id] = data.elements[id]; });
  }
  const msgTxt = 'Esto reemplaza el progreso actual por el del archivo (' + Object.keys(valid).length + ' tareas' +
    (validEl ? ' y ' + Object.keys(validEl).length + ' estados de canales' : '') + '). ¿Continuar?';
  if (!confirm(msgTxt)) return false;
  progress = valid; store.set('progress-v3', progress);
  if (validEl) { elState = validEl; store.set('elements-v1', elState); }
  if (typeof data.server === 'string') store.set('server', data.server);
  renderAll();
  const nv = Object.keys(valid).length;
  toast('Progreso importado: ' + nv + (nv === 1 ? ' tarea' : ' tareas') + (validEl ? '' : ' (el archivo no traía estados de canales; esos se quedaron igual)') + '.');
  return true;
}

function resetTasks() {
  if (!confirm('¿Borrar todas las palomitas y descartes? Exporta antes si quieres conservarlos.')) return;
  progress = {}; store.set('progress-v3', progress);
  renderAll(); toast('Tareas reiniciadas.');
}

function resetElements() {
  if (!confirm('¿Regresar todos los canales, roles y bots a su estado inicial (pendiente o por borrar)?')) return;
  elState = {}; store.set('elements-v1', elState);
  renderAll(); toast('Estados de canales reiniciados.');
}

function renameServer() {
  const now = store.get('server', '') || '';
  const v = prompt('Nombre del servidor (se usa en todo el manual):', now);
  if (v === null) return;
  store.set('server', v.trim());
  renderAll();
  toast('Nombre guardado.');
}

async function doAction(what) {
  if (what === 'copy') { const ok = await copyPlain(resumenPlain()); toast(ok ? 'Resumen copiado como texto.' : 'No se pudo copiar: tu navegador lo bloqueó.'); }
  else if (what === 'export') exportProgress();
  else if (what === 'import') $('#importFile').click();
  else if (what === 'reset') resetTasks();
  else if (what === 'reset-el') resetElements();
  else if (what === 'rename') renameServer();
}

/* ---------- menú del server (flecha junto al nombre) ---------- */
const MENU = [
  { id: 'p-mejoras', label: 'Mejoras del servidor', icon: 'boost', cls: 'boost' },
  'sep',
  { id: 'settings', label: 'Ajustes del servidor', icon: 'gear' },
  { id: 'p-resumen', label: 'Resumen de avance', icon: 'chart' },
  { id: 'rename', label: 'Cambiar nombre del servidor', icon: 'pencil' },
  'sep',
  { id: 'export', label: 'Exportar progreso', icon: 'download' },
  { id: 'import', label: 'Importar progreso', icon: 'upload' },
  'sep',
  { id: 'classic', label: 'Manual clásico', icon: 'book', href: '../index.html' }
];

function menuOpen() { return !$('#guildMenu').hidden; }
function openMenu() {
  $('#guildMenu').innerHTML = MENU.map((m) => m === 'sep' ? '<div class="menu-sep" role="separator"></div>'
    : m.href ? '<a class="menu-item" role="menuitem" href="' + m.href + '">' + esc(m.label) + '<span>' + ICONS[m.icon] + '</span></a>'
    : '<button type="button" class="menu-item' + (m.cls ? ' ' + m.cls : '') + '" role="menuitem" data-menu="' + m.id + '">' + esc(m.label) + '<span>' + ICONS[m.icon].replace(/width="\d+" height="\d+"/, 'width="18" height="18"') + '</span></button>').join('');
  $('#guildMenu').hidden = false;
  $('#guildBtn').setAttribute('aria-expanded', 'true');
  const first = $('#guildMenu .menu-item');
  if (first) first.focus();
}
function closeMenu(focusBtn) {
  if (!menuOpen()) return;
  $('#guildMenu').hidden = true;
  $('#guildBtn').setAttribute('aria-expanded', 'false');
  if (focusBtn) $('#guildBtn').focus();
}

/* ---------- ventana «Ajustes del servidor» ---------- */
const SEC = {};
let FIRST_SEC = null;
SETTINGS.forEach((g) => g.items.forEach((it) => { SEC[it.id] = it; if (!FIRST_SEC) FIRST_SEC = it.id; }));
const MAPA_INDEX = window.MANUAL.extras.findIndex((x) => x.title === (window.SERVER_PAGES && window.SERVER_PAGES.mapaTitle));
const MAPA = {};
if (MAPA_INDEX >= 0) window.MANUAL.extras[MAPA_INDEX].items.forEach((it) => { MAPA[it.q] = it.a; });
const secText = (it) => it.a || MAPA[it.mapa] || '';
const pendingIn = (it) => (it.tasks || []).filter((id) => TASKS[id] && taskStatus(id) === 'todo').length;

function openSettings(sec) {
  lastFocus = document.activeElement;
  modalState = { kind: 'settings', sec: SEC[sec] ? sec : FIRST_SEC, body: !!SEC[sec] };
  renderModal();
  $('#modal').hidden = false;
  document.body.classList.add('modal-open');
  setTimeout(() => { const c = $('#modal .set-close'); if (c) c.focus(); }, 30);
}

function renderSettings() {
  const it = SEC[modalState.sec];
  let nav = '<div class="set-head">' + esc(serverName()) + '</div>';
  SETTINGS.forEach((g, gi) => {
    if (gi > 0) nav += '<div class="set-sep"></div>';
    if (g.group) nav += '<div class="set-head">' + esc(g.group) + '</div>';
    g.items.forEach((x) => {
      const n = pendingIn(x);
      const all = (x.tasks || []).length > 0 && n === 0;
      nav += '<button type="button" class="set-tab' + (g.danger ? ' danger' : '') + (x.id === modalState.sec ? ' on' : '') + '" data-sec="' + x.id + '">' +
        '<span>' + esc(x.label) + '</span>' + (n ? '<i class="set-count" title="Tareas pendientes">' + n + '</i>' : all ? '<i class="set-ok" title="Tareas hechas">' + ICONS.check + '</i>' : '') + '</button>';
    });
  });

  let body = '<button type="button" class="set-back" data-back>' + ICONS.back + 'Ajustes</button>';
  body += '<h2>' + esc(it.label) + '</h2>';
  body += '<div class="set-text">' + fmt(secText(it)) + '</div>';
  if (it.list === 'roles') body += '<div class="perm-sec">Roles del mapa</div><div class="list">' + MAP.roles.map((r) => stateRow(r.id)).join('') + '</div>';
  if (it.list === 'bots') body += '<div class="perm-sec">Bots del mapa</div><div class="list">' + MAP.bots.map((b) => stateRow(b.id)).join('') + '</div>';
  const tk = (it.tasks || []).filter((id) => TASKS[id]);
  if (tk.length) body += '<div class="perm-sec">Tareas del manual en esta sección</div><div class="tasks">' + tk.map(taskRow).join('') + '</div>';
  else body += '<div class="set-note">Esta sección no tiene tareas en el manual: es de consulta.</div>';
  body += '<div class="actions" style="margin-top:16px">';
  if (it.page && EL[it.page]) body += '<button type="button" class="btn btn-brand" data-el="' + it.page + '">Abrir «' + esc(EL[it.page].name) + '»</button>';
  if (MAPA_INDEX >= 0) body += '<a class="btn" href="../index.html#extra-' + (MAPA_INDEX + 1) + '">' + ICONS.book + 'Ver en el manual clásico</a>';
  body += '</div>';

  $('#modal').innerHTML = '<div class="settings settings-server' + (modalState.body ? ' show-body' : '') + '" role="dialog" aria-modal="true" aria-label="Ajustes del servidor">' +
    '<nav class="set-nav">' + nav + '</nav><section class="set-body">' + body + '</section>' +
    '<button type="button" class="set-close" aria-label="Cerrar">' + ICONS.close + '<span>ESC</span></button></div>';
}

/* ---------- eventos ---------- */
document.addEventListener('click', (e) => {
  if (modalState) return;
  if (e.target.closest('#guildBtn')) { snd('click'); if (menuOpen()) closeMenu(); else openMenu(); return; }
  const mi = e.target.closest('[data-menu]');
  if (mi) {
    snd('click'); closeMenu();
    const id = mi.dataset.menu;
    if (id === 'settings') openSettings();
    else if (EL[id]) go(id);
    else doAction(id);
    return;
  }
  if (menuOpen() && !e.target.closest('#guildMenu')) closeMenu();
  const dob = e.target.closest('[data-do]');
  if (dob) { snd('click'); doAction(dob.dataset.do); return; }
  const elBtn = e.target.closest('[data-el]');
  if (elBtn) { snd('click'); go(elBtn.dataset.el); return; }

  const cat = e.target.closest('[data-cat]');
  if (cat) { snd('click'); collapsed[cat.dataset.cat] = !collapsed[cat.dataset.cat]; store.set('collapsed-cats', collapsed); renderChannels(); return; }

  const act = e.target.closest('[data-act]');
  if (act) {
    const to = act.dataset.act;
    setState(current, to);
    snd(to === 'done' ? 'done' : to === 'deleted' ? 'del' : 'click');
    renderAll();
    return;
  }

  const mb = e.target.closest('[data-modal]');
  if (mb) { snd('click'); openModal(current, mb.dataset.modal === 'perms' ? 'perms' : mb.dataset.modal); return; }

  const tk = e.target.closest('[data-task]');
  if (tk) { const id = tk.dataset.task; setTask(id, taskStatus(id) === 'done' ? 'todo' : 'done'); snd('click'); renderMain(); return; }

  const sk = e.target.closest('[data-skip]');
  if (sk) { const id = sk.dataset.skip; setTask(id, taskStatus(id) === 'skip' ? 'todo' : 'skip'); snd('click'); renderMain(); return; }
});

$('#soundBtn').addEventListener('click', () => { store.set('muted', !store.get('muted', false)); wakeAudio(); renderSound(); snd('click'); });
$('#menuBtn').addEventListener('click', () => document.querySelector('.app').classList.toggle('show-channels'));
$('#membersBtn').addEventListener('click', () => document.querySelector('.app').classList.toggle('show-members'));

// Si cambias algo en el manual clásico en otra pestaña, esta vista se actualiza sola
window.addEventListener('storage', (e) => {
  if (!e.key || e.key.indexOf('dasodi-manual:') !== 0) return;
  progress = store.get('progress-v3', progress) || {};
  elState = store.get('elements-v1', elState) || {};
  renderAll();
  if (modalState) renderModal();
});

$('#importFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try { importData(JSON.parse(await file.text())); }
  catch (err) { toast('Ese archivo no es un progreso válido del manual.'); }
});

// Celular: tocar fuera del panel abierto (canales o miembros) lo cierra sin activar lo que había debajo
document.addEventListener('click', (e) => {
  const app = document.querySelector('.app');
  if (!app.classList.contains('show-channels') && !app.classList.contains('show-members')) return;
  if (e.target.closest('.sidebar, .members, #menuBtn, #membersBtn, #modal')) return;
  app.classList.remove('show-channels', 'show-members');
  e.preventDefault(); e.stopPropagation();
}, true);

// Cartel: se encoge al bajar en la lista de canales, como en Discord
$('#channels').addEventListener('scroll', () => {
  document.querySelector('.sidebar').classList.toggle('banner-small', $('#channels').scrollTop > 8);
}, { passive: true });
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const b = $('#bannerImg'); if (b) b.src = '../assets/megaman-idle.png';
}
window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (EL[id] && id !== current) go(id, false); });

/* ---------- arranque ---------- */
(function init() {
  const fromHash = location.hash.slice(1);
  current = EL[fromHash] ? fromHash : (ORDER.find((id) => stateOf(id) === 'delete') || ORDER.find((id) => stateOf(id) === 'pending') || ORDER[0]);
  renderAll();
})();
