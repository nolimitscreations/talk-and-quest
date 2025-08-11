import { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { loadState, getProfile, saveState } from '@/lib/storage';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({ active: 'Samuel' });
  const [p, setP] = useState({ minutes: 0, attempts: 0, stickers: [] });

  useEffect(() => {
    setMounted(true);
    setState(loadState());
    setP(getProfile());
  }, []);

  if (!mounted) {
    return (
      <Layout>
        <div className="card"><h2>Loading dashboard…</h2></div>
      </Layout>
    );
  }

  const reset = () => {
    const s = loadState();
    s.profiles[s.active] = {
      minutes: 0,
      attempts: 0,
      stickers: [],
      dyslexia: s.profiles[s.active]?.dyslexia || {}
    };
    saveState(s);
    setState(s);
    setP(s.profiles[s.active]);
  };

  return (
    <Layout>
      <div className="card">
        <h2>Parent / SLP Dashboard — {state.active}</h2>
        <p className="small">We celebrate effort, not scores.</p>

        <div className="grid" style={{ marginTop: 12 }}>
          <div className="card">
            <h3>Minutes practiced</h3>
            <p style={{ fontSize: 28, fontWeight: 800 }}>{p.minutes || 0}</p>
          </div>
          <div className="card">
            <h3>Attempts (speaking events)</h3>
            <p style={{ fontSize: 28, fontWeight: 800 }}>{p.attempts || 0}</p>
          </div>
          <div className="card">
            <h3>Stickers earned</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(p.stickers || []).map((s, i) => (
                <Image key={i} src={s} alt="sticker" width={72} height={72} className="sticker" />
              ))}
              {(p.stickers || []).length === 0 && (
                <p className="small">No stickers yet. Complete an activity to earn one!</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="btn secondary" onClick={reset}>
            Reset {state.active}&rsquo;s progress
          </button>
        </div>
      </div>
    </Layout>
  );
}
