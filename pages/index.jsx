import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ⬇️ Works whether quests.json is an array `[...]` or an object `{ quests: [...] }`
import rawQuests from '@/data/quests.json';

function getQuests(q) {
  if (Array.isArray(q)) return q;
  if (q && Array.isArray(q.quests)) return q.quests;
  return [];
}

import {
  loadState,
  onStateChange,
  setProfile,
  getProgress,
  getStickers,
  getDyslexia,
  setDyslexia,
  getQuiet,
  setQuiet,
} from '@/lib/storage';

export default function Home() {
  const [state, setState] = useState(loadState());

  useEffect(() => {
    setState(loadState());
    const off = onStateChange((s) => setState(s));
    return off;
  }, []);

  const profile = state.profile;
  const progress = getProgress(profile);
  const stickers = getStickers(profile);

  const handleProfileChange = (e) => setProfile(e.target.value);
  const toggleQuiet = () => setQuiet(!getQuiet());
  const toggleDyslexia = () => setDyslexia(!getDyslexia());

  const quests = getQuests(rawQuests);
  const visibleQuests = quests.slice(0, 8);

  return (
    <div className="page">
      <div className="toolbar">
        <label className="lbl">Profile</label>
        <select value={profile} onChange={handleProfileChange} className="select">
          <option>Samuel</option>
          <option>Spencer</option>
          <option>Guest</option>
        </select>

        <button className="chip" onClick={toggleQuiet}>Quiet Mode: {getQuiet() ? 'On' : 'Off'}</button>
        <button className="chip" onClick={toggleDyslexia}>Dyslexia Mode: {getDyslexia() ? 'On' : 'Off'}</button>
        <Link href="/dashboard" className="btn">Dashboard</Link>
      </div>

      <section className="welcome card">
        <h1>Welcome, {profile} 👋</h1>
        <p>Pick a quest. Practice for 8–12 minutes. Celebrate every try.</p>
      </section>

      {/* Quests grid */}
      <section className="grid">
        {visibleQuests.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <strong>No quests found.</strong> Make sure <code>data/quests.json</code> exists in GitHub and has either
            an array <code>[...]</code> or an object <code>{`{ "quests": [...] }`}</code>.
          </div>
        ) : (
          visibleQuests.map((q) => (
            <article key={q.id} className="quest card">
              <div className="quest-top">
                <span className="quest-icon" aria-hidden="true">{q.icon || '🎯'}</span>
                <h3 className="quest-title">{q.title}</h3>
              </div>
              {q.targets && <p className="targets">Targets: {q.targets.join(', ')}</p>}
              <Link href={`/quest/${q.id}`} className="btn primary">Let&apos;s go!</Link>
            </article>
          ))
        )}
      </section>

      <section className="card">
        <h2>Today’s vibe</h2>
        <div className="row">
          <small>Practice minutes (total)</small>
          <span className="pill">Attempts: {progress.attempts || 0}</span>
        </div>
        <div className="bar"><div className="bar-fill" style={{ width: `${Math.min(progress.minutes || 0, 60) / 60 * 100}%` }} /></div>
      </section>

      <section className="card">
        <h2>Sticker Book</h2>
        <div className="sticker-row">
          {stickers.length === 0
            ? <small>No stickers yet. Complete an activity to earn one!</small>
            : stickers.map((src, i) => <Image key={i} src={src} alt="sticker" className="sticker" width={72} height={72} />)}
        </div>
      </section>

      <footer className="made">Made with calm vibes for Samuel &amp; Spencer • Local‑first • No pressure</footer>

      <style jsx>{`
        .page { padding:24px; max-width:1100px; margin:0 auto; }
        .toolbar { display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:16px; }
        .lbl { font-weight:600; }
        .select { padding:8px 10px; border-radius:10px; border:1px solid #e6e6f0; }
        .chip { padding:8px 12px; border-radius:999px; background:#f1efff; border:1px solid #e0dcff; }
        .btn { padding:10px 14px; border-radius:12px; background:#eee; display:inline-block; }
        .btn.primary { background:linear-gradient(180deg,#7b61ff,#6a42ff); color:#fff; box-shadow:0 10px 30px rgba(106,66,255,.25);}
        .card { background:#fff; border-radius:18px; padding:16px; box-shadow:0 12px 35px rgba(80,64,255,.08); margin-bottom:18px; }
        .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
        .quest { display:flex; flex-direction:column; gap:12px; min-height:220px; }
        .quest-top { display:flex; align-items:center; gap:10px; }
        .quest-icon { font-size:22px; }
        .targets { color:#667085; margin:0; min-height:36px; }
        .row { display:flex; justify-content:space-between; align-items:center; }
        .pill { background:#efeaff; color:#4737ff; padding:6px 10px; border-radius:999px; font-weight:700; font-size:12px; }
        .bar { height:8px; background:#eef0f7; border-radius:8px; overflow:hidden; }
        .bar-fill { height:100%; background:#9aa6ff; }
        .sticker-row { display:flex; gap:10px; flex-wrap:wrap; }
        .sticker { width:72px; height:72px; }
        .made { text-align:center; color:#8b8ea3; margin:18px 0 6px; font-size:13px; }
      `}</style>
    </div>
  );
}
