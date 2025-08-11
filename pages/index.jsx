import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import ProgressBar from '@/components/ProgressBar';
import { loadState, getProfile, onStateChange } from '@/lib/storage';
import questsData from '../data/quests.json';

// Keep targets hidden for kids; flip to true if you want to see them.
const SHOW_TARGETS = false;

function getTitle(q) {
  return q?.title || q?.name || 'Untitled Quest';
}
function getIcon(q) {
  if (q?.icon) return q.icon;
  if (q?.emoji) return q.emoji;
  const t = getTitle(q).toLowerCase();
  if (t.includes('rocket')) return '🚀';
  if (t.includes('lighthouse')) return '🗼';
  if (t.includes('thunder')) return '⛈️';
  if (t.includes('ship')) return '🚢';
  return '🎯';
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({ active: 'Samuel' });
  const [p, setP] = useState({ minutes: 0, attempts: 0, stickers: [] });

  useEffect(() => {
    setMounted(true);
    setState(loadState());
    setP(getProfile());
    const off = onStateChange(() => {
      setState(loadState());
      setP(getProfile());
    });
    return () => { off && off(); };
  }, []);

  if (!mounted) {
    return (
      <Layout>
        <div className="card"><h1>Welcome 👋</h1><p>Loading…</p></div>
      </Layout>
    );
  }

  const active = state.active || 'Samuel';
  const allQuests = Array.isArray(questsData?.quests) ? questsData.quests : [];
  // ✅ Same 8 quests for every profile
  const viewQuests = allQuests.slice(0, 8);

  return (
    <Layout>
      <div className="card">
        <h1>Welcome, {active} 👋</h1>
        <p>Pick a quest. Practice for 8–12 minutes. Celebrate every try.</p>

        <div className="grid" style={{ marginTop: 12 }}>
          {viewQuests.map((q) => (
            <div key={q.id} className="quest-card">
              <div className="quest-header vertical">
                <span className="quest-icon" aria-hidden>{getIcon(q)}</span>
                <h3 className="quest-title">{getTitle(q)}</h3>
              </div>

              {SHOW_TARGETS && (
                <p className="quest-targets">
                  {Array.isArray(q.targets) ? q.targets.join(' • ') : '—'}
                </p>
              )}

              <Link href={`/quest/${q.id}`}>
                <button className="btn">Let&rsquo;s go!</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h2>Today&rsquo;s vibe</h2>
        <div className="flex" style={{ justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <p className="small">Practice minutes (total)</p>
            <ProgressBar value={Math.min(100, (p.minutes || 0) * 5)} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="badge">Attempts: {p.attempts || 0}</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h2>Sticker Book</h2>
        <div className="flex" style={{ flexWrap: 'wrap' }}>
          {(p.stickers || []).length === 0 && (
            <p className="small">Earn a sticker by finishing an activity.</p>
          )}
          {(p.stickers || []).map((s, i) => (
            <Image key={i} className="sticker" src={s} alt="sticker" width={72} height={72} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
