
import TTSButton from './TTSButton';
import { useState } from 'react';

export default function SightWordSprint({ words=[], onComplete }){
  const [i, setI] = useState(0);
  const word = words[i] || '';
  const next = () => {
    if (i+1 < words.length) setI(i+1);
    else onComplete && onComplete();
  };

  return (
    <div className="activity">
      <h3>Sight-Word Sprint (gentle)</h3>
      <p>Tap to hear the word. Read it with me if you want. No timers here.</p>
      <div className="card">
        <h1 style={{textAlign:'center'}}>{word}</h1>
        <div className="center" style={{gap:12}}>
          <TTSButton text={word} label="🔊 Say it together" />
          <button className="btn" onClick={next}>Next</button>
        </div>
      </div>
    </div>
  );
}
