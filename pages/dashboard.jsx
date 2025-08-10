
import Layout from '@/components/Layout';
import { loadProgress, saveProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function Dashboard(){
  const [p, setP] = useState({minutes:0, attempts:0, stickers:[]});

  useEffect(() => {
    setP(loadProgress());
  }, []);

  const reset = () => {
    const cleared = {minutes:0, attempts:0, stickers:[]};
    saveProgress(cleared);
    setP(cleared);
  };

  return (
    <Layout>
      <div className="card">
        <h2>Parent / SLP Dashboard</h2>
        <p className="small">We show small trends only—celebrating effort, not scores.</p>
        <div className="grid" style={{marginTop:12}}>
          <div className="card">
            <h3>Minutes practiced</h3>
            <p style={{fontSize:28, fontWeight:800}}>{p.minutes}</p>
          </div>
          <div className="card">
            <h3>Attempts (speaking events)</h3>
            <p style={{fontSize:28, fontWeight:800}}>{p.attempts}</p>
          </div>
          <div className="card">
            <h3>Stickers earned</h3>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {p.stickers.map((s, i) => <img key={i} src={s} className="sticker" alt="sticker"/>)}
              {p.stickers.length===0 && <p className="small">No stickers yet. Complete an activity to earn one!</p>}
            </div>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <button className="btn secondary" onClick={reset}>Reset progress</button>
        </div>
      </div>
    </Layout>
  );
}
