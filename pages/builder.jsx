import Layout from '@/components/Layout';
import targets from '@/data/targets.json';
import sightwords from '@/data/sightwords_grade4.json';
import Link from 'next/link';
import { useState } from 'react';

export default function Builder(){
  const [phoneme, setPhoneme] = useState('R');
  const [position, setPosition] = useState('initial');
  const [count, setCount] = useState(6);

  const words = targets[phoneme]?.[position] || [];

  const sampleWords = words.slice(0, count);
  const sampleSight = sightwords.slice(0, 7);

  const session = {
    id: `custom-${phoneme}-${position}`,
    title: `${phoneme} ${position} (Custom)`,
    targets: [`${phoneme}-${position}`],
    activities: [
      {"type":"repeat_after_me","items": sampleWords},
      {"type":"sight_word_sprint","words": sampleSight}
    ],
    reward: "/stickers/sticker_3.png"
  };

  return (
    <Layout>
      <div className="card">
        <h2>Practice Builder</h2>
        <p className="small">Pick a target sound and position to generate a quick session.</p>
        <div className="grid" style={{marginTop:12}}>
          <div className="card">
            <label>Phoneme</label>
            <select value={phoneme} onChange={e=>setPhoneme(e.target.value)}>
              {Object.keys(targets).map(k => <option key={k}>{k}</option>)}
            </select>
            <label style={{marginTop:8}}>Position</label>
            <select value={position} onChange={e=>setPosition(e.target.value)}>
              <option>initial</option>
              <option>medial</option>
              <option>final</option>
            </select>
            <label style={{marginTop:8}}>Words to practice</label>
            <input type="text" value={count} onChange={e=>setCount(Number(e.target.value)||1)} />
          </div>
          <div className="card">
            <h3>Preview</h3>
            <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(session, null, 2)}</pre>
          </div>
        </div>
        <p className="small" style={{marginTop:8}}>To make it permanent, copy this JSON into <code>data/quests.json</code>.</p>
      </div>
    </Layout>
  );
}
