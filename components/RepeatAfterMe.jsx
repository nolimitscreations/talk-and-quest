import { useState } from 'react';
import TTSButton from './TTSButton';
import MicButton from './MicButton';
import AzureMicButton from './AzureMicButton';
import { addSticker } from '@/lib/storage';

export default function RepeatAfterMe({ items = [], onComplete, reward }) {
  const [i, setI] = useState(0);
  const [message, setMessage] = useState('');
  const word = items[i] || '';

  const next = () => {
    if (i + 1 < items.length) {
      setI(i + 1);
    } else {
      if (reward) addSticker(reward);
      if (onComplete) onComplete();
    }
  };

  const onTranscript = (t) => {
    if (t && t.trim().length > 0) {
      setMessage(`Nice try! I heard: "${t}"`);
    } else {
      setMessage("Great effort! Let\u2019s try the next one.");
    }

    // ✨ random sparkle celebration (client only)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const sparkles = ['✨', '🌟', '💖', '💎'];
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      el.style.left = '50%';
      el.style.top = '20px';
      el.style.transform = 'translateX(-50%)';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 750);
    }

    setTimeout(() => {
      setMessage('');
      next();
    }, 1000);
  };

  return (
    <div className="activity">
      <h3>Repeat After Me</h3>
      <p>Say the word when you&rsquo;re ready. You can listen first.</p>
      <div className="flex">
        <div className="card" style={{ flex: 1 }}>
          <h1 style={{ textAlign: 'center' }}>{word}</h1>
          <div className="center" style={{ gap: 12, flexWrap: 'wrap' }}>
            <TTSButton text={word} />
            <AzureMicButton onTranscript={onTranscript} />
            <MicButton onTranscript={onTranscript} />
            <button className="btn secondary" onClick={next}>Skip</button>
          </div>
          <p className="small" style={{ marginTop: 8 }}>
            Tip: On iPad, use the Azure mic for best results.
          </p>
          {message && (
            <p className="notice" style={{ marginTop: 12 }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
