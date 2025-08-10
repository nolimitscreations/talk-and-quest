
import { addAttempt } from '@/lib/storage';

export default function MicButton({ onTranscript }){
  const start = () => {
    if (typeof window === 'undefined') return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Speech recognition not supported in this browser. You can still practice out loud!');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      addAttempt(1);
      onTranscript && onTranscript(t);
    };
    rec.onerror = () => { /* gentle fail */ };
    rec.onend = () => { /* done */ };
    rec.start();
  };
  return <button className="btn" onClick={start}>🎙️ Say it</button>;
}
