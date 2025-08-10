
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProgressBar from '@/components/ProgressBar';
import questsData from '@/data/quests.json';
import { loadProgress } from '@/lib/storage';

export default function Home(){
  const p = typeof window !== 'undefined' ? loadProgress() : {minutes:0, attempts:0, stickers:[]};
  return (
    <Layout>
      <div className="card">
        <h1>Welcome, Samuel & Spencer 👋</h1>
        <p>Pick a quest. Practice for 8–12 minutes. Celebrate every try.</p>
        <div className="grid" style={{marginTop:12}}>
          {questsData.quests.map(q => (
            <div key={q.id} className="card">
              <h3>{q.title}</h3>
              <p className="small">Targets: {q.targets.join(', ')}</p>
              <Link href={`/quest/${q.id}`}><button className="btn">Start</button></Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <p className="small">Want a custom session? Try the <a href="/builder">Practice Builder</a>.</p>
        <h2>Today's vibe</h2>
        <div className="flex" style={{justifyContent:'space-between'}}>
          <div style={{flex:1}}>
            <p className="small">Practice minutes (total)</p>
            <ProgressBar value={Math.min(100, p.minutes*5)} />
          </div>
          <div style={{textAlign:'right'}}>
            <div className="badge">Attempts: {p.attempts}</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <p className="small">Want a custom session? Try the <a href="/builder">Practice Builder</a>.</p>
        <h2>Sticker Book</h2>
        <div className="flex" style={{flexWrap:'wrap'}}>
          {p.stickers.length === 0 && <p className="small">Earn a sticker by finishing an activity.</p>}
          {p.stickers.map((s, i) => <img key={i} className="sticker" src={s} alt="sticker"/>)}
        </div>
      </div>
    </Layout>
  );
}
