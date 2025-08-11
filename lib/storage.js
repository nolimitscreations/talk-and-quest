// Central localStorage helpers for Talk & Quest (SSR-safe)

const KEY = 'tq_state_v2';

const DEFAULT = {
  profile: 'Samuel',
  quiet: false,
  dyslexia: false,
  stickers: {
    Samuel: [],
    Spencer: [],
    Guest: [],
  },
  progress: {
    Samuel: { minutes: 0, attempts: 0 },
    Spencer: { minutes: 0, attempts: 0 },
    Guest: { minutes: 0, attempts: 0 },
  },
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function parse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function mergeDefault(s) {
  // shallow merge so missing keys are filled
  return { ...DEFAULT, ...(s || {}) };
}

// === Core state API ===
export function loadState() {
  if (!isBrowser()) return DEFAULT;                // during SSR
  const raw = localStorage.getItem(KEY);
  const data = raw ? parse(raw) : null;
  return mergeDefault(data);
}

export function saveState(next) {
  if (!isBrowser()) return;
  const nextState = typeof next === 'function' ? next(loadState()) : next;
  localStorage.setItem(KEY, JSON.stringify(nextState));
  notify(nextState);
}

// pub/sub so pages can react to changes
const subs = new Set();
function notify(state) { subs.forEach(fn => { try { fn(state); } catch {} }); }
export function onStateChange(fn) { subs.add(fn); return () => subs.delete(fn); }

// === Convenience getters/setters ===
export function getProfile() { return loadState().profile; }
export function setProfile(name) { saveState(s => ({ ...s, profile: name })); }

export function getQuiet() { return !!loadState().quiet; }
export function setQuiet(on) { saveState(s => ({ ...s, quiet: !!on })); }

export function getDyslexia() { return !!loadState().dyslexia; }
export function setDyslexia(on) { saveState(s => ({ ...s, dyslexia: !!on })); }

export function getProgress(profile) {
  const s = loadState();
  const p = profile || s.profile;
  return s.progress[p] || { minutes: 0, attempts: 0 };
}
export function addMinutes(n = 1) {
  saveState(s => {
    const p = s.profile;
    const cur = s.progress[p] || { minutes: 0, attempts: 0 };
    return { ...s, progress: { ...s.progress, [p]: { ...cur, minutes: cur.minutes + n } } };
  });
}
export function addAttempts(n = 1) {
  saveState(s => {
    const p = s.profile;
    const cur = s.progress[p] || { minutes: 0, attempts: 0 };
    return { ...s, progress: { ...s.progress, [p]: { ...cur, attempts: cur.attempts + n } } };
  });
}

export function getStickers(profile) {
  const s = loadState();
  const p = profile || s.profile;
  return s.stickers[p] || [];
}
export function addSticker(sticker) {
  saveState(s => {
    const p = s.profile;
    const arr = [...(s.stickers[p] || []), sticker];
    return { ...s, stickers: { ...s.stickers, [p]: arr } };
  });
}

// (Optional) wipe all local progress for current profile
export function resetCurrentProfile() {
  saveState(s => {
    const p = s.profile;
    return {
      ...s,
      stickers: { ...s.stickers, [p]: [] },
      progress: { ...s.progress, [p]: { minutes: 0, attempts: 0 } },
    };
  });
}
