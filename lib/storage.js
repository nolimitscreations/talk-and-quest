import { loadSettings } from './utils';

export function keyForProfile() {
  const s = loadSettings();
  const profile = s.profile || 'Samuel';
  return `tq_progress_${profile}`;
}

export function loadProgress() {
  if (typeof window === 'undefined') return { minutes:0, attempts:0, stickers: [] };
  try {
    const raw = localStorage.getItem(keyForProfile());
    return raw ? JSON.parse(raw) : { minutes:0, attempts:0, stickers: [] };
  } catch {
    return { minutes:0, attempts:0, stickers: [] };
  }
}

export function saveProgress(p) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(keyForProfile(), JSON.stringify(p));
}

export function addAttempt(n=1) {
  const p = loadProgress();
  p.attempts += n;
  saveProgress(p);
}

export function addMinutes(n=1) {
  const p = loadProgress();
  p.minutes += n;
  saveProgress(p);
}

export function addSticker(stickerPath) {
  const p = loadProgress();
  if (!p.stickers.includes(stickerPath)) p.stickers.push(stickerPath);
  saveProgress(p);
}
