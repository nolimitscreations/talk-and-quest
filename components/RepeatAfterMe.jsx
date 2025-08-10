import { useState } from 'react';
import TTSButton from './TTSButton';
import MicButton from './MicButton';
import AzureMicButton from './AzureMicButton';
import { addSticker } from '@/lib/storage';

export default function RepeatAfterMe({ items=[], onComplete, reward }){
  const [i, setI] = useState(0);
  const [message, setMessage] = useState('');
  const word = items[i] || '';

  const next = () => {
    if (i+1 < items.length) setI(i+1);
    else {
      if (reward) addSticker(reward);
      onComplete && onComplete();
    }
  };

  const onTranscript = (t) => {
    // Gentle feedback: celebrate any attempt, show what was heard
    if (t && t.trim().length > 0) {
      setMessage(`Nice try! I heard: "${t}"`);
    } else {
      setMessage("Great effort! Let's try the next one.");
    }
    setTimeout(() => { setMessage(''); next(); }, 1000);
  };

  return (
    <div className="activity">
      <h3>Repeat After Me</h3>
      <p>Say the word when you're ready. You can listen first.</p>
      <div className="flex">
        <div className="card" style={{flex:1}}>
          <h1 style={{textAlign:'center'}}>{word}</h1>
          <div className="center" style={{gap:12, flexWrap:'wrap'}}>
            <TTSButton text={word} />
            <AzureMicButton onTranscript={onTranscript} />
            <MicButton onTranscript={onTranscript} />
            <button className="btn secondary" onClick={next}>Skip</button>
          </div>
          <p className="small" style={{marginTop:8}}>Tip: On iPad, use the Azure mic for best results.</p>
          {message && <p className="notice" style={{marginTop:12}}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
